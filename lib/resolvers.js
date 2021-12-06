const courses = [
  {
    _id: 'anyid_1',
    title: 'Title 1',
    description: 'Description 1',
    topic: 'Toopic 1',
    teacher: 'Teacher name 1',
  },
  {
    _id: 'anyid_2',
    title: 'Title 2',
    description: 'Description 2',
    topic: 'Toopic 2',
    teacher: 'Teacher name 2',
  },
  {
    _id: 'anyid_3',
    title: 'Title 3',
    description: 'Description 3',
    topic: 'Toopic 3',
    teacher: 'Teacher name 3',
  }
]

module.exports = {
  Query: {
    getCourses: () => {
      return courses
    },
    getCourse: (root, args) => {
      const course = courses.filter(course => course._id === args._id)
      return course.pop()
    }
  }
}
