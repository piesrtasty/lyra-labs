require('dotenv').config()

const express = require('express')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')
const md5 = require('md5')

const { ApolloServer } = require('apollo-server-express')
const bodyParser = require('body-parser')
const pg = require('pg')
const cors = require('cors')
const PgStore = require('connect-pg-simple')(session)

const {
  makeSchema,
  objectType,
  idArg,
  intArg,
  stringArg,
  booleanArg,
} = require('@nexus/schema')

const { PrismaClient } = require('@prisma/client')
const { nexusPrisma } = require('nexus-plugin-prisma')

const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')(),
])

const got = require('got')

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.avatar()
    t.model.username()
    t.model.headline()
    t.model.walletAddress()
    t.model.walletIsSetup()
    t.model.showOnboarding()
    t.model.name()
  },
})

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.model.id()
    t.model.author()
    t.model.date()
    t.model.description()
    t.model.image()
    t.model.logo()
    t.model.publisher()
    t.model.title()
    t.model.url()
    t.model.archived()
    t.model.pinned()
    t.model.submitterId()
    t.model.submitter()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.posts({ pagination: true, ordering: true, filtering: true })
    t.list.field('savedPosts', {
      type: 'Post',
      args: {
        take: intArg(),
        cursor: idArg(),
      },
      resolve: async (_, { take = 10, cursor = null }, ctx) => {
        const currentUser = ctx.req.user
        const where = currentUser
          ? { where: { submitterId: currentUser.id, archived: false } }
          : {}
        const baseArgs = { take, ...where }
        const args = cursor
          ? { ...baseArgs, skip: 1, cursor: { id: cursor } }
          : baseArgs
        const posts = await ctx.prisma.post.findMany(args)
        return posts
      },
    })
    t.list.field('archivedPosts', {
      type: 'Post',
      args: {
        take: intArg(),
        cursor: idArg(),
      },
      resolve: async (_, { take = 10, cursor = null }, ctx) => {
        const currentUser = ctx.req.user
        const where = currentUser
          ? { where: { submitterId: currentUser.id, archived: true } }
          : {}
        const baseArgs = { take, ...where }
        const args = cursor
          ? { ...baseArgs, skip: 1, cursor: { id: cursor } }
          : baseArgs
        const posts = await ctx.prisma.post.findMany(args)
        return posts
      },
    })
    t.list.field('feedPosts', {
      type: 'Post',
      args: {
        take: intArg(),
        cursor: idArg(),
      },
      resolve: async (_, { take = 10, cursor = null }, ctx) => {
        const currentUser = ctx.req.user
        if (currentUser) {
          const userSavedPosts = await ctx.prisma.post.findMany({
            where: { submitterId: currentUser.id },
            select: {
              url: true,
            },
          })
          const excludedUrls = userSavedPosts.map(p => p.url)
          const where = currentUser
            ? {
                where: {
                  submitterId: { not: currentUser.id },
                  url: { notIn: excludedUrls },
                },
              }
            : {}
          const baseArgs = { take, ...where }
          const args = cursor
            ? { ...baseArgs, skip: 1, cursor: { id: cursor } }
            : baseArgs
          const posts = await ctx.prisma.post.findMany(args)
          return posts
        } else {
          return await ctx.prisma.post.findMany({
            orderBy: {
              createdAt: 'desc',
            },
          })
        }
      },
    })
    t.field('post', {
      type: 'Post',
      args: {
        slug: stringArg(),
      },
      resolve: async (_, { slug }, ctx) => {
        const post = await ctx.prisma.post.findUnique({
          where: { slug },
        })
        return post
      },
    })
    t.field('me', {
      type: 'User',
      resolve: async (_, _args, ctx) => {
        const currentUser = ctx.req.user ? ctx.req.user : null
        return currentUser
      },
    })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
    t.field('removePost', {
      type: 'Post',
      args: {
        postId: idArg(),
      },
      resolve: async (_, { postId }, ctx) => {
        return ctx.prisma.post.delete({
          where: {
            id: postId,
          },
        })
      },
    })
    t.field('restorePost', {
      type: 'Post',
      args: {
        postId: idArg(),
      },
      resolve: async (_, { postId }, ctx) => {
        return await ctx.prisma.post.update({
          where: { id: postId },
          data: {
            archived: false,
          },
        })
      },
    })
    t.field('archivePost', {
      type: 'Post',
      args: {
        postId: idArg(),
      },
      resolve: async (_, { postId }, ctx) => {
        return await ctx.prisma.post.update({
          where: { id: postId },
          data: {
            archived: true,
          },
        })
      },
    })

    t.field('saveExistingPost', {
      type: 'Post',
      args: {
        postId: idArg(),
      },
      resolve: async (_, { postId }, ctx) => {
        const currentUser = ctx.req.user
        const post = await ctx.prisma.post.findUnique({
          where: { id: postId },
        })
        const {
          author,
          date,
          description,
          image,
          logo,
          publisher,
          title,
          url,
        } = post
        return await prisma.post.create({
          data: {
            submitter: { connect: { id: currentUser.id } },
            author,
            date,
            description,
            image,
            logo,
            publisher,
            title,
            url,
          },
        })
      },
    })
    t.field('updateUserOnboarding', {
      type: 'User',
      args: {
        showOnboarding: booleanArg(),
      },
      resolve: async (_, { showOnboarding }, ctx) => {
        console.log('showOnboarding', showOnboarding)
        const currentUser = ctx.req.user
        return await ctx.prisma.user.update({
          where: { id: currentUser.id },
          data: {
            showOnboarding,
          },
        })
      },
    })
    t.field('associateWallet', {
      type: 'User',
      args: {
        address: stringArg(),
      },
      resolve: async (_, { address }, ctx) => {
        const currentUser = ctx.req.user
        return await ctx.prisma.user.update({
          where: { id: currentUser.id },
          data: {
            walletAddress: address,
            walletIsSetup: true,
          },
        })
      },
    })

    t.field('createPost', {
      type: 'Post',
      args: {
        givenUrl: stringArg(),
      },
      resolve: async (_, { givenUrl }, ctx) => {
        const currentUser = ctx.req.user
        // const { walletIsSetup, walletAddress } = currentUser
        const response = await saveUrl(givenUrl, currentUser)
        // Send 1 token to user that created the post
        // if (walletIsSetup && walletAddress && process.env.FLOW_ENABLED) {
        //   FlowClient.mintAndSendTokens({
        //     quantity: 1,
        //     address: walletAddress,
        //   })
        // }
        return response
      },
    })
  },
})

const saveUrl = async (givenUrl, currentUser) => {
  const { body: html, url } = await got(givenUrl)
  const metadata = await metascraper({ html, url })
  return await prisma.post.create({
    data: {
      submitter: { connect: { id: currentUser.id } },
      ...metadata,
    },
  })
}

const prisma = new PrismaClient()

const schema = makeSchema({
  types: [Query, Mutation, Post, User],
  plugins: [nexusPrisma({ experimentalCRUD: true })],
})

const app = express()
app.enable('trust proxy')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

const SESSION_SECRET = process.env.SESSION_SECRET

const isDevelopment = process.env.NODE_ENV === 'development'

const sessionStore = new PgStore({
  pool: new pg.Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    ssl: isDevelopment
      ? false
      : {
          rejectUnauthorized: false,
        },
  }),
  ttl: 30 * 24 * 60 * 60, // 30 days, in sec. Gets reset on each user visit
  disableTouch: false,
})

const sessionMiddleware = session({
  secret: SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false, // setting this to true results in 2 session objects, known issue with passport
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days, in ms
    // secure: false,
    sameSite: true,
  },
})

var corsOptions = {
  origin: [process.env.FRONTEND_URL, 'https://lyralabs.io'],
  credentials: true, // <-- REQUIRED backend setting
}

app.use(cors(corsOptions))

const { Magic } = require('@magic-sdk/admin')

const magic = new Magic(process.env.MAGIC_SECRET_KEY)

const passport = require('passport')

app.use(sessionMiddleware)

app.use(passport.initialize())
app.use(passport.session())

const MagicStrategy = require('passport-magic').Strategy

const strategy = new MagicStrategy(async (user, done) => {
  const userMetadata = await magic.users.getMetadataByIssuer(user.issuer)
  const existingUser = await prisma.user.findUnique({
    where: { issuer: user.issuer },
  })
  if (!existingUser) {
    /* Create new user if doesn't exist */
    return signup(user, userMetadata, done)
  } else {
    /* Login user if otherwise */
    return login(user, done)
  }
})

passport.use(strategy)

/* 3️⃣ Implement Auth Behaviors */

/* Implement User Signup */
const signup = async (user, userMetadata, done) => {
  const email = userMetadata.email
  const avatar = `https://gravatar.com/avatar/${md5(
    email.toLowerCase(),
  )}?d=retro`
  await prisma.user.create({
    data: {
      avatar,
      email,
      publicEthAddress: userMetadata.publicAddress,
      issuer: userMetadata.issuer,
      lastLoginAt: user.claim.iat,
    },
  })
  return done(null, user)
}

/* Implement User Login */
const login = async (user, done) => {
  /* Replay attack protection (https://go.magic.link/replay-attack) */
  if (user.claim.iat <= user.lastLoginAt) {
    return done(null, false, {
      message: `Replay attack detected for user ${user.issuer}}.`,
    })
  }
  await prisma.user.update({
    where: { issuer: user.issuer },
    data: {
      publicEthAddress: user.publicAddress,
      lastLoginAt: user.claim.iat,
    },
  })
  return done(null, user)
}

/* Attach middleware to login endpoint */
app.post('/login', passport.authenticate('magic'), async (req, res) => {
  if (req.user) {
    const user = await prisma.user.findUnique({
      where: { issuer: req.user.issuer },
    })
    const name = req.body && req.body.name ? req.body.name : null
    // If a name is passed in and user doesn't have one set assume it's a signup
    if (name && !user.name) {
      await prisma.user.update({
        where: { issuer: req.user.issuer },
        data: {
          name,
        },
      })
    }
    res.json({ showOnboarding: user.showOnboarding })
  } else {
    return res.status(401).end('Could not log user in.')
  }
})

/* 4️⃣ Implement Session Behavior */

/* Defines what data are stored in the user session */
passport.serializeUser((user, done) => {
  done(null, user.issuer)
})

/* Populates user data in the req.user object */
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { issuer: id },
    })
    done(null, user)
  } catch (err) {
    done(err, null)
  }
})

const requireAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.sendStatus(401)
  }
}

app.get('/healthz', async (req, res, done) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  }
  res.json(healthcheck)
})

app.get(
  '/check-authentication',
  requireAuthenticated,
  async (req, res, done) => {
    res.status(200).end()
  },
)

/* Implement Logout Endpoint */
app.post('/logout', async (req, res) => {
  if (req.isAuthenticated()) {
    await magic.users.logoutByIssuer(req.user.issuer)
    req.logout()
    return res.status(200).end()
  } else {
    return res.status(401).end(`User is not logged in.`)
  }
})

// app.post('/graphql', (err, req, res, next) => {
//   console.log('---- in the GRAPGHQL ENDPOINT ----- req.user', req.user)
//   if (err) return res.status(401).send(err.message)
//   next()
// })

const savePost = () => {
  console.log('Calling save POST!!!!!')
}

// SEt a longer tpken validity (default is 15 min)
// pull issuer from token in /save endpoint

const validateToken = DIDToken => {
  console.log('calling validate Token', DIDToken)
  try {
    console.log('A')
    magic.token.validate(DIDToken)
    const [proof, claim] = magic.token.decode(DIDToken)
    console.log('proof', proof)
    console.log('claim', claim)
    console.log('B')
  } catch (e) {
    console.log('e', e)
  }
}

app.post('/validate-token', async (req, res, done) => {
  console.log('Hit the validate token endpoint')
  const authHeader = req.headers.authorization
  if (authHeader) {
    const DIDToken = authHeader.substring(7)
    const tokenIsValid = validateToken(DIDToken)
    console.log(' >>>> tokenIsValid', tokenIsValid)
    res.status(200).json({ name: 'LUKE', tokenIsValid })
  } else {
    res.status(401).json({ err: 'Missing auth header' })
  }
})

app.post('/test-cookie-auth', requireAuthenticated, async (req, res, done) => {
  console.log('test cookie auth req.user', req.user)
  res.status(200).end()
})

app.post('/save', async (req, res, done) => {
  res.sendStatus(200)
  const authHeader = req.headers.authorization
  if (authHeader) {
    const DIDToken = authHeader.substring(7)
    try {
      magic.token.validate(DIDToken)
      savePost()
    } catch (err) {
      res.status(401).send(err)
    }
  } else {
    res.status(401).send('Missing auth header')
  }
})

const apollo = new ApolloServer({
  context: req => {
    return { ...req, prisma }
  },
  schema,
})

apollo.applyMiddleware({
  app,
  cors: false,
})

app.listen(4000, () => {
  console.log(`🚀 GraphQL service ready at http://localhost:4000/graphql`)
})
