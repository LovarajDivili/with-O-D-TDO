const express = require('express')
const uuid = require('uuid')
const usersData = require('../../data')

const router = express.Router()
// Getting all the users
router.get('/',(request,response) => {
    response.json(usersData)
})

//Get single member

router.get('/:id', (request,response) => {
    const isFound = usersData.some(user=>user.id===parseInt(request.params.id))
    if (isFound) {
        response.json(usersData.filter((user) => user.id === parseInt(request.params.id)))
    } else {
        response.status(400).json({msg: `User with ID: ${request.params.id} not found`})
    }
    
})

//Create a user

router.post('/', (request,response) =>{
    const newTodo = {
        id : uuid.v4(),
        todo: request.body.todo,
        completed:request.body.completed,
        userId:request.body.userId
    }

    if (!newTodo.todo || !newTodo.completed || !newTodo.userId) {
        return response.status(400).json({msg:"Please give values to todo, completed and userId."})
    } else {
        usersData.push(newTodo)
        response.send(newTodo)
    }
})

//Update a todo

router.put('/:id', (request,response) => {
    const isFound = usersData.some(user=>user.id===parseInt(request.params.id))
    if (isFound) {
       const updatedTodo = request.body
       console.log(updatedTodo)
       usersData.forEach(eachTodo => {
        if (eachTodo.id === parseInt(request.params.id)) {
            eachTodo.todo = updatedTodo.todo ? updatedTodo.todo : eachTodo.todo
            eachTodo.completed = updatedTodo.completed ? updatedTodo.completed : eachTodo.completed
            eachTodo.todo = updatedTodo.userId ? updatedTodo.userId : eachTodo.userId

            response.json({msg: "Todo updated", eachTodo})
        }
       })
    } else { 
        response.status(400).json({msg: `User with ID: ${request.params.id} not found`})
    }
    
})

//Deleting a todo

router.delete('/:id', (request,response) => {
    const isFound = usersData.some(user=>user.id===parseInt(request.params.id))
    if (isFound) {
        response.json({msg: "Todo is deleted successfully",todos: usersData.filter((user) => user.id !== parseInt(request.params.id))})
    } else {
        response.status(400).json({msg: `User with ID: ${request.params.id} not found`})
    }
    
})

module.exports = router;