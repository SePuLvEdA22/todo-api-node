// Import express
const express = require('express')
const router = express.Router()

// temporary array in memory (Not Database)
const tasks = []

// Create - POST /tasks
router.post('/', (req, res) => {
  const { title, description } = req.body
  if (!title) {
    return res.status(400).json({ error: 'The title is required' })
  }

  const existingTask = tasks.find(task => task.title === title)
  if (existingTask) {
    return res.status(400).json({ error: 'Title already exists' })
  }
  const newTask = { id: tasks.length + 1, title, description, completed: false }
  tasks.push(newTask)
  res.status(201).json(newTask)
})

// Read - GET /tasks
router.get('/', (req, res) => {
  res.json(tasks)
})

router.get('/:completed', (req, res) => {
  const { completed } = req.params

  // String to boolean
  const isCompleted = completed === 'true'

  // find() -> return only the first matching element
  // filter() -> return all the matching tasks
  const filteredTasks = tasks.filter(t => t.completed === isCompleted)
  if (filteredTasks.length === 0) {
    return res.status(404).json({ error: 'Not found' })
  }
  return res.json(filteredTasks)
})

router.get('/:id', (req, res) => {
  const { id } = req.params

  const task = tasks.find((t) => t.id === parseInt(id))
  if (!task) {
    return res.status(404).json({ error: 'Not found' })
  }

  return res.json(task)
})

router.put('/:id', (req, res) => {
  const { id } = req.params

  const { title, completed, description } = req.body

  const task = tasks.find((t) => t.id === parseInt(id))
  if (!task) {
    return res.status(400).json({ error: 'Not found' })
  }

  if (title !== undefined) task.title = title
  if (completed !== undefined) task.completed = completed
  if (description !== undefined) task.description = description
  res.json(task)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params

  const index = tasks.findIndex((t) => t.id === parseInt(id))
  if (index === -1) {
    return res.status(404).json({ error: 'Not found' })
  }

  const deleteTask = tasks.splice(index, 1)
  res.json(deleteTask[0])
})

module.exports = router
