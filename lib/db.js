'use strict'

const { MongoClient } = require('mongodb')
const {
  ENVIROMENT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

let mongoUrl = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`

if (ENVIROMENT === 'local') {
  mongoUrl = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`
}

let connection

async function connectDB () {
  if (connection) {
    return connection
  }

  let client

  try {
    client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true })
    connection = client.db(DB_NAME)
  } catch (err) {
    console.error('Could not connect to database', mongoUrl, err)
    process.exit(1)
  }

  return connection
}

module.exports = connectDB
