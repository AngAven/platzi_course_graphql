'use strict'

const connectDB = require('./db')
const { ObjectId } = require('mongodb')
const errorHandler = require('./errorhandler')

module.exports = {
  createCourse: async (root, {input}) => {
    const defaults = {
      teacher: '',
      topic: '',
    }
    const newCourse = Object.assign(defaults, input)

    let db
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').insertOne(newCourse)
      newCourse._id = course.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return newCourse
  },
  editCourse: async (root, {_id, input}) => {
    let db
    let course

    try {
      db = await connectDB()
      await db.collection('courses').updateOne(
        {_id: ObjectId(_id)},
        {$set: input}
      )

      course = await db.collection('courses').findOne({_id: ObjectId(_id)})
    } catch (error) {
      errorHandler(error)
    }

    return course
  },
  deleteCourse: async (root, {_id}) => {
    let db

    try {
      db = await connectDB()
      await db.collection('courses').deleteOne({_id: ObjectId(_id)})

    } catch (error) {
      errorHandler(error)
    }

    return _id
  },
  createStudent: async (root, {input}) => {
    const defaults = {
      teacher: '',
      topic: '',
    }

    let db
    let student

    try {
      db = await connectDB()
      student = await db.collection('students').insertOne(input)
      input._id = student.insertedId
    } catch (error) {
      errorHandler(error)
    }

    return input
  },
  editStudent: async (root, {_id, input}) => {
    let db
    let student

    try {
      db = await connectDB()
      await db.collection('students').updateOne(
        {_id: ObjectId(_id)},
        {$set: input}
      )

      student = await db.collection('students').findOne({_id: ObjectId(_id)})
    } catch (error) {
      errorHandler(error)
    }

    return student
  },
  deleteStudent: async (root, {_id}) => {
    let db

    try {
      db = await connectDB()
      await db.collection('students').deleteOne({_id: ObjectId(_id)})

    } catch (error) {
      errorHandler(error)
    }

    return _id
  },
  addPeople: async (root, {courseID, personID}) => {
    let db
    let person
    let course

    try {
      db = await connectDB()
      course = await db.collection('courses').findOne({_id: ObjectId(courseID)})
      person = await db.collection('students').findOne({_id: ObjectId(personID)})

      if(!course || !person) throw new Error('Course or person not found')

      await db.collection('courses').updateOne(
        {_id: ObjectId(courseID)},
        {$addToSet: {people: ObjectId(personID)}}
      )

    } catch (error) {
      errorHandler(error)
    }

    return course
  },
}
