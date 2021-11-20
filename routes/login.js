const express = require('express')
const router = express.Router()
const User = require('../models/login')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const middleware = require('../middleware')
const todo = require('../models/todo')

//home page 
router.get('/', async (req,res)=>{
    let params = {
        loggedIn: false 
    }
    if(req.user)
    {   
        params.todo_list = await todo.find({user:req.user.id,isDone:false})
        params.loggedIn = true ,
        params.username = req.user.username
    }
    res.render('index',params)
})
//login get page 
router.get('/login',middleware.onlyUnAuthenticatedUsers, (req,res)=>{
    let params = {
        loggedIn: false 
    }
    res.render('login_views/login',params)
})
//register get page 
router.get('/register', middleware.onlyUnAuthenticatedUsers, (req,res)=>{
    let params = {
        loggedIn: false 
    }
    res.render('login_views/register',params)
})
//login post page 
router.post('/login',middleware.onlyUnAuthenticatedUsers, passport.authenticate('local'), (req,res)=>{
   res.redirect('/')
})
//register post page 
router.post('/register', middleware.onlyUnAuthenticatedUsers, async (req,res)=>{
    try{
        let user_obj = {}
        user_obj.username = req.body.username 
        user_obj.email = req.body.email 
        user_obj.password = await bcrypt.hash(req.body.password,10)
        await User.create(user_obj)
        res.redirect('/login')
    }
    catch(e){
        console.log(e)
        res.render('login_views/register',{errorMessage:"Registration Failed!"})
    }
})
router.delete('/logout',(req,res)=>{
    req.logOut()
    res.redirect('/login')
})
module.exports = router 