// Import express
const express = require('express')
const app = express()

// Middleware to interpret JSON in request
app.use(express.json())

// Import the routes
const taskRouter = require('./routes/tasks')
app.use('/tasks', taskRouter)

// LIstening port
const PORT = 3000
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`)
})
