const courses = [
  {
    _id: 'anyid',
    title: 'mi titulo 1',
    description: 'mi descripcion',
    topic: 'mi tema'
  },
  {
    _id: 'anyid',
    title: 'mi titulo 2',
    description: 'mi descripcion',
    topic: 'mi tema'
  },
  {
    _id: 'anyid',
    title: 'mi titulo 3',
    description: 'mi descripcion',
    topic: 'mi tema'
  }
]

module.exports = {
  getCourses: () => {
    return courses
  },
}
