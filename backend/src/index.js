require('dotenv').config()

const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const { PrismaClient } = require('@prisma/client')
const bodyParser = require('body-parser')

const { checkJwt } = require('../middleware/checkJwt')
const { getUser } = require('../middleware/getUser')

const { schema } = require('./schema')

const prisma = new PrismaClient()

const apollo = new ApolloServer({
  context: req => ({ ...req, prisma }),
  schema,
})

const app = express()

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })) // support encoded bodies

app.get('/healthz', async (req, res, done) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
  }
  res.json(healthcheck)
})

app.use((err, req, res, next) => {
  console.log('BBBBBBBBBBBBBB')
  console.log('BBBBBBBBBBBBBB')
  console.log('BBBBBBBBBBBBBB')
  console.log('BBBBBBBBBBBBBB')
})

app.post('/save', checkJwt, async (req, res, done) => {
  // getUser(req, res, next, prisma)
  console.log('-------req.body------')
  console.log(req.body)
  console.log('-------------')
  console.log('-------req.headers------')
  console.log(req.headers)
  console.log('---------------')
  const { givenUrl, title } = req.body
  // const title = req.body.givenUrl
  const user = req.user
  const auth0id = req.user.sub
  const currentUser = await prisma.user.findOne({ where: { auth0id } })
  console.log('---currentUser---', currentUser)
  const response = await saveUrl(givenUrl, currentUser)
  console.log('---- response test ----', response)
  // console.log('...givenUrl...', givenUrl)

  res.json({ sendUrl: givenUrl })
})

app.post('/graphql', checkJwt, (err, req, res, next) => {
  console.log('AAAAAAAAAAAA')
  console.log('AAAAAAAAAAAA')
  console.log('AAAAAAAAAAAA')
  console.log('in the checkJWT')
  console.log('AAAAAAAAAAAA')
  console.log('AAAAAAAAAAAA')
  console.log('AAAAAAAAAAAA')
  if (err) return res.status(401).send(err.message)
  next()
})

const test = () => {
  console.log('TEST TEST TEST')
}

const test2 = () => {
  console.log('TEST2 TEST2 TEST2')
}

app.post('/graphql', test2, (req, res, next) => {
  //   console.log('-------- calling get user ------')
  //   getUser(req, res, next, prisma)
  next()
})

app.use('/graphql', test, (req, res, next) => {
  console.log('-------- calling get user ------')
  getUser(req, res, next, prisma)
})

apollo.applyMiddleware({ app })

app.listen(4000, () => {
  console.log(`🚀 GraphQL service ready at http://localhost:4000/graphql`)
})
