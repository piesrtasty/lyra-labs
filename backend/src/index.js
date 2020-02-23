const { GraphQLServer } = require('graphql-yoga')
const {
  makeSchema,
  objectType,
  idArg,
  stringArg,
  booleanArg,
} = require('nexus')
const { PrismaClient } = require('@prisma/client')
const { nexusPrismaPlugin } = require('nexus-prisma')
const { checkJwt } = require('../middleware/checkJwt')
const { getUser } = require('../middleware/getUser')
const { createUser } = require('../utils/create-user')

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.avatar()
    t.model.username()
    t.model.headline()
    t.model.name()
    t.model.followedTopics()
  },
})

const Comment = objectType({
  name: 'Comment',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.text()
    t.model.post()
    t.model.author()
    t.model.replies()
    t.model.votes()
    t.int('votesCount', {
      resolve: async (_, _args, ctx) => {
        return 11
        // const votes = await ctx.prisma.votes.findMany({
        //   where: { post: { id: _.id } },
        // })
        // return votes.length
      },
    })
  },
})

const Reply = objectType({
  name: 'Reply',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.text()
    t.model.parent()
    t.model.author()
    t.model.votes()
    t.int('votesCount', {
      resolve: async (_, _args, ctx) => {
        return 11
        // const votes = await ctx.prisma.votes.findMany({
        //   where: { post: { id: _.id } },
        // })
        // return votes.length
      },
    })
  },
})

const CommentVote = objectType({
  name: 'CommentVote',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.user()
    t.model.comment()
  },
})

const ReplyVote = objectType({
  name: 'ReplyVote',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.user()
    t.model.reply()
  },
})

const Topic = objectType({
  name: 'Topic',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.name()
    t.model.slug()
    t.model.description()
    t.model.image()
    t.model.followersCount()
    t.model.postsCount()
    t.model.trending()
    t.model.posts()
    t.model.followedBy()
  },
})

const Vote = objectType({
  name: 'Vote',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.user()
    t.model.post()
  },
})

// query relationOrdering {
//   user(where: { id: 1643 }) {
//     posts(orderBy: { title: dsc }) {
//       title
//       body
//     }
//   }
// }
const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.name()
    t.model.slug()
    t.model.link()
    t.model.thumbnail()
    t.model.description()
    t.model.tagline()
    t.model.submitter()
    t.model.creators()
    t.model.galleryThumbs()
    t.model.comments({ ordering: true })
    t.model.day()
    t.model.featured()
    t.model.topics()
    t.model.votes()
    t.boolean('upvoted', {
      resolve: async (_, _args, ctx) => {
        const currentUser = ctx.request.user
        if (currentUser) {
          const votes = await ctx.prisma.vote.findMany({
            where: {
              post: { id: _.id },
              user: { id: currentUser.id },
            },
          })
          if (votes.length > 0) {
            return true
          }
        }
        return false
      },
    })
    t.int('votesCount', {
      resolve: async (_, _args, ctx) => {
        const votes = await ctx.prisma.vote.findMany({
          where: { post: { id: _.id } },
        })
        return votes.length
      },
    })
  },
})

const Section = objectType({
  name: 'Section',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.date()
    t.model.posts()
  },
})

const SignedUpload = objectType({
  name: 'SignedUpload',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.signedRequest()
    t.model.url()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.sections()
    t.crud.posts()
    // t.crud.post()
    t.field('post', {
      type: 'Post',
      nullable: true,
      args: {
        slug: stringArg(),
      },
      resolve: async (_, { slug }, ctx) => {
        const post = await ctx.prisma.post.findOne({
          where: { slug },
        })
        return post
      },
    })
    t.field('comment', {
      type: 'Comment',
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: async (_, { id }, ctx) => {
        const comment = await ctx.prisma.comment.findOne({
          where: { id },
        })
        return comment
      },
    })
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: async (_, _args, ctx) => {
        const user = ctx.request.user
        if (user) {
          if (!user.token) {
            const currentUser = await ctx.prisma.user.findOne({
              where: { id: user.id },
            })
            return currentUser
          } else {
            return createUser(ctx)
          }
        }
        return null
      },
    })
    t.list.field('userSearch', {
      type: 'User',
      args: {
        keyword: stringArg(),
      },
      resolve: (_, { keyword }, ctx) => {
        return ctx.prisma.user.findMany({
          first: 3,
          where: {
            OR: [
              { username_lower: { contains: keyword } },
              { name_lower: { contains: keyword } },
            ],
          },
        })
      },
    })
    t.list.field('feed', {
      type: 'Post',
      resolve: (_, _args, ctx) => {
        return ctx.prisma.post.findMany({
          where: { published: true },
        })
      },
    })
    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.prisma.post.findMany({
          where: {
            OR: [
              { title: { contains: searchString } },
              { content: { contains: searchString } },
            ],
          },
        })
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
    t.crud.deleteOnePost()
    t.field('vote', {
      type: 'Vote',
      args: {
        postId: idArg(),
        userId: idArg(),
      },
      resolve: async (_, { userId, postId }, ctx) => {
        const votes = await ctx.prisma.vote.findMany({
          where: {
            user: {
              id: userId,
            },
            post: {
              id: postId,
            },
          },
        })
        if (votes.length > 0) {
          return ctx.prisma.vote.delete({
            where: {
              id: votes[0].id,
            },
          })
        }
        return ctx.prisma.vote.create({
          data: {
            user: { connect: { id: userId } },
            post: { connect: { id: postId } },
          },
        })
      },
    })
    t.field('createComment', {
      type: 'Comment',
      args: {
        body: stringArg(),
        postId: idArg(),
      },
      resolve: async (_, { body, postId }, ctx) => {
        const currentUser = ctx.request.user
        const comment = await prisma.comment.create({
          data: {
            author: { connect: { username: currentUser.username } },
            post: { connect: { id: postId } },
            text: body,
          },
        })
        return comment
      },
    })
    t.field('createReply', {
      type: 'Reply',
      args: {
        body: stringArg(),
        parentId: idArg(),
      },
      resolve: async (_, { body, parentId }, ctx) => {
        console.log('parentId', parentId)
        const currentUser = ctx.request.user
        const reply = await prisma.reply.create({
          data: {
            author: { connect: { username: currentUser.username } },
            parent: { connect: { id: parentId } },
            text: body,
          },
        })
        return reply
      },
    })
    t.field('createDraft', {
      type: 'Post',
      args: {
        title: stringArg(),
        content: stringArg({ nullable: true }),
        authorEmail: stringArg(),
      },
      resolve: (_, { title, content, authorEmail }, ctx) => {
        return ctx.prisma.post.create({
          data: {
            title,
            content,
            published: false,
            author: {
              connect: { email: authorEmail },
            },
          },
        })
      },
    })

    t.field('publish', {
      type: 'Post',
      nullable: true,
      args: {
        id: idArg(),
      },
      resolve: (_, { id }, ctx) => {
        return ctx.prisma.post.update({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})

// const photon = new Photon()
const prisma = new PrismaClient()

console.log('process.env.FRONTEND_URL', process.env.FRONTEND_URL)

const server = new GraphQLServer({
  schema: makeSchema({
    types: [
      Query,
      Mutation,
      Post,
      User,
      Section,
      Comment,
      Reply,
      CommentVote,
      ReplyVote,
      Topic,
      Vote,
      SignedUpload,
    ],
    plugins: [nexusPrismaPlugin()],
  }),
  context: req => ({ ...req, prisma }),
  middlewares: [],
})

server.express.post('/graphql', checkJwt, (err, req, res, next) => {
  if (err) return res.status(401).send(err.message)
  next()
})

server.express.use('/graphql', (req, res, next) => {
  getUser(req, res, next, prisma)
})

server.start(
  {
    endpoint: '/graphql',
    playground: '/graphql',
    subscriptions: false,
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL,
    },
  },
  () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql#5-using-the-graphql-api`,
    ),
)

module.exports = { User, Post }
