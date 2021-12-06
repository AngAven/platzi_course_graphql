'use strict'

const dotenv = require('dotenv').config()
const { makeExecutableSchema } = require('graphql-tools')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const { readFileSync } = require('fs')
const { join } = require('path')
const resolvers = require('./lib/resolvers')

const app = express()
const port = process.env.PORT || 3000

// definir esquema
const typeDefs = readFileSync(join(__dirname, 'lib', 'schema.graphql'), 'UTF-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true
}))

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
