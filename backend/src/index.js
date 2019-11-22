const { GraphQLServer } = require('graphql-yoga')
const { makeSchema, objectType, idArg, stringArg } = require('nexus')
const { Photon } = require('@generated/photon')
const { nexusPrismaPlugin } = require('nexus-prisma')

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.posts()
    t.crud.post({
      alias: 'post',
    })
    t.field('me', {
      type: 'User',
      args: {
        auth0Id: stringArg({ nullable: true }),
      },
      resolve: (_, _args, ctx) => {
        console.log('---------------------')
        console.log('me resolver _args', _args)
        console.log('---------------------')
        // return ctx.photon.posts.findMany({
        //   where: { published: true },
        // })
        return { id: '1', email: 'cool@cool.com' }
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

new GraphQLServer({
  schema: makeSchema({
    types: [Query, Mutation, Post, User],
    plugins: [nexusPrismaPlugin()],
  }),
  context: { photon },
}).start(
  {
    endpoint: '/graphql',
    playground: '/graphql',
    subscriptions: false,
    cors: {
      credentials: true,
      // origin: 'http://localhost:3000',
      origin: process.env.FRONTEND_URL,
    },
  },
  () =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql#5-using-the-graphql-api`,
    ),
)

module.exports = { User, Post }
