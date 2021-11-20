const express = require('express')
const router = express.Router()
const middleware = require('../middleware')
const todo = require('../models/todo')

router.get('/add',middleware.onlyAuthenticatedUsers, (req,res)=>{
        let params = {
            loggedIn: false 
        }
        if(req.user)
        {   
            params.loggedIn = true ,
            params.username = req.user.username
        }
        res.render('todo_views/addTodo',params)
})
// handing post request by doing it
router.post('/add',middleware.onlyAuthenticatedUsers,async (req,res)=>{
    try{
       let user_id =  req.user.id 
       let todo_obj = {}
       todo_obj.title = req.body.title 
       todo_obj.user  = user_id 
       await todo.create(todo_obj)
       res.redirect('/')
    }
    catch{
        res.redirect('/todo/add')
    }
})
// getting the done todo data 
router.get('/doneTodos',middleware.onlyAuthenticatedUsers,async (req,res)=>{
    let params = {
        loggedIn: false 
    }
    if(req.user)
    {   
        params.todo_list = await todo.find({user:req.user.id,isDone:true})
        params.loggedIn = true 
        params.username = req.user.username
    }
    res.render('todo_views/doneTodo',params)
})
//updating the todo to mark as done
router.put('/:id/update',middleware.onlyAuthenticatedUsers,async (req,res)=>{
    try{
        let obj = await todo.findOne({user:req.user.id,_id:req.params.id})
        console.log(obj)
        if(obj)
        {
            obj.isDone= true
            await obj.save()
        }
        res.redirect('/')
    }
    catch{
        res.redirect('/')
    }
})
//delete the todo 
router.delete('/:id/delete',middleware.onlyAuthenticatedUsers, async (req,res)=>{
    try{
        let obj = await todo.findOne({user:req.user.id,_id:req.params.id})
        console.log(obj)
        await obj.remove()
        res.redirect('/')
    }
    catch{
        res.redirect('/')
    }
})



module.exports = router 