const { GraphQLServer } = require('graphql-yoga')
const {
  makeSchema,
  objectType,
  idArg,
  stringArg,
  booleanArg,
} = require('nexus')
const { Photon } = require('@prisma/photon')
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
    t.model.parent()
    t.model.author()
    t.model.replies()
    t.model.votes()
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
    t.model.comments()
    t.model.day()
    t.model.featured()
    t.model.topics()
    t.model.votes()
    t.boolean('upvoted', {
      resolve: async (_, _args, ctx) => {
        const currentUser = ctx.request.user
        if (currentUser) {
          const votes = await ctx.photon.votes.findMany({
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
        const votes = await ctx.photon.votes.findMany({
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
    t.crud.post({
      alias: 'post',
    })
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: async (_, _args, ctx) => {
        const user = ctx.request.user
        if (user) {
          if (!user.token) {
            const currentUser = await ctx.photon.users.findOne({
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

    t.list.field('feed', {
      type: 'Post',
      resolve: (_, _args, ctx) => {
        return ctx.photon.posts.findMany({
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
        return ctx.photon.posts.findMany({
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
        const votes = await ctx.photon.votes.findMany({
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
          return ctx.photon.votes.delete({
            where: {
              id: votes[0].id,
            },
          })
        }
        return ctx.photon.votes.create({
          data: {
            user: { connect: { id: userId } },
            post: { connect: { id: postId } },
          },
        })
      },
    })
    t.field('updateFollowedTopic', {
      type: 'Topic',
      args: {
        userId: idArg(),
        topicId: idArg(),
        following: booleanArg(),
      },
      resolve: async (_, { userId, topicId, following }, ctx) => {
        const action = following ? 'connect' : 'disconnect'
        await ctx.photon.users.update({
          where: { id: userId },
          data: {
            followedTopics: {
              [action]: { id: topicId },
            },
          },
        })
        return ctx.photon.topics.findOne({ where: { id: topicId } })
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
        return ctx.photon.posts.create({
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
        return ctx.photon.posts.update({
          where: { id },
          data: { published: true },
        })
      },
    })
  },
})

const photon = new Photon()

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
      CommentVote,
      Topic,
      Vote,
      SignedUpload,
    ],
    plugins: [nexusPrismaPlugin()],
  }),
  context: req => ({ ...req, photon }),
  middlewares: [],
})

server.express.post('/graphql', checkJwt, (err, req, res, next) => {
  if (err) return res.status(401).send(err.message)
  next()
})

server.express.use('/graphql', (req, res, next) => {
  getUser(req, res, next, photon)
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
