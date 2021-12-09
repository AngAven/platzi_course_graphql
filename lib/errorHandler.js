'use strict'

function errorHandler(error){
  console.error(error)
  throw new Error('Operation failed, server error')
}

module.exports = errorHandler
