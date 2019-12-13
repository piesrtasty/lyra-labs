const { GraphQLServer } = require('graphql-yoga')
const { makeSchema, objectType, idArg, stringArg } = require('nexus')
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

const Section = objectType({
  name: 'Section',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
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
        console.log('ctx.request.user', ctx.request.user)
        const auth0id = ctx.request.user ? ctx.request.user.sub : null
        console.log('auth0id', auth0id)
        if (auth0id) {
          const user = await ctx.photon.users.findOne({ where: { auth0id } })
          console.log('user to return', user)
          if (!user) {
            console.log('AAAAA')
            return createUser(ctx)
          }
          return user
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
    types: [Query, Mutation, Post, User, Section],
    plugins: [nexusPrismaPlugin()],
  }),
  // context: { photon },
  context: req => ({ ...req, photon }),
  middlewares: [],
})
// console.log('COOL')
// console.log('server server.options.endpoint', server.options.endpoint)

// server.express.use((req, res, next) => {
//   console.log('MY MIDDLWARE', req.headers.authorization)
//   next()
// })

server.express.post('/graphql', checkJwt, (err, req, res, next) => {
  if (err) return res.status(401).send(err.message)
  next()
})

// server.express.post('/graphql', (req, res, next) => {
//   console.log('in middle ware!!!!!!', req.user)
//   // console.log('req', req)
//   // console.log("At get User", req.user);
//   // If there is a user on the request (get that)
//   getUser(req, res, next)
//   // next()
//   // getLyraClient(req, res, next, prisma);

//   // next();
//   // Otherwise check if there is a cookie to get the user
// })

// server.express.use((req, res, next) => {
//   console.log('MY MIDDLWARE')
//   next()
// })

server.start(
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

// new GraphQLServer({
//   schema: makeSchema({
//     types: [Query, Mutation, Post, User],
//     plugins: [nexusPrismaPlugin()],
//   }),
//   context: { photon },
//   middlewares: [],
// }).start(
//   {
//     endpoint: '/graphql',
//     playground: '/graphql',
//     subscriptions: false,
//     cors: {
//       credentials: true,
//       // origin: 'http://localhost:3000',
//       origin: process.env.FRONTEND_URL,
//     },
//   },
//   () =>
//     console.log(
//       `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql#5-using-the-graphql-api`,
//     ),
// )

module.exports = { User, Post }
