/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */
  const express = require('express')
  const bodyParser = require('body-parser')
const { stringify } = require('uuid')
  
  const app = express()
  
  app.use(bodyParser.json())

  let todos = []

  let id = 0
  function generateId() {
    id += 1
    return id.toString()
  }

  app.get('/todos', (req, res) => {
    res.status(200).send(todos)
  })

  app.get('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(todo => todo.id === req.params.id)

    if (todoIndex == -1) {
        return res.status(404).send('Not found')
    }
      
    res.status(200).send(todos[todoIndex])

  })

  app.post('/todos', (req, res) => {
    const id = generateId()
    const newItem = {id, ...req.body}
    todos.push(newItem)
    res.status(201).send(`{id: ${id}}`)
  })

  app.put('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(todo => todo.id === req.params.id)

    if (todoIndex == -1) {
        return res.status(404).send('Not found')
    }

    todos[todoIndex] = { ...todos[todoIndex], ...req.body }
    res.status(200).send('OK')
  })

  app.delete('/todos/:id', (req, res) => {
    const todoIndex = todos.findIndex(todo => todo.id === req.params.id)

    if (todoIndex == -1) {
        return res.status(404).send('Not found')
    }

    todos = todos.slice(todoIndex, 1)
    res.status(200).send('OK')
  })

  app.use((req, res, next) => {
    res.status(404).send('Route not found');
  })

  // app.listen(3000, () => {
  //   console.log('server started!')
  // })
  
  module.exports = app