if(process.env.NODE_ENV != 'production')
{
    require('dotenv').config()
}
const express = require('express')
const path = require('path')
const loginRoutes = require('./routes/login')
const todoRoutes = require('./routes/todo')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const passport = require('passport')
const initializePassport = require('./passport-config')
const flash = require('express-flash')
const session = require('express-session')


initializePassport(passport)
const mongoose = require('mongoose')
mongoose.connect(process.env.DATA_BASE_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('connected to the Data Base!'))


app.set('view engine','ejs')
app.set('views',path.join(__dirname,'views'))
app.set('layout','layouts/layout')
app.use(flash())
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(express.urlencoded({extended:false}))
app.use(passport.session())
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
const port = process.env.PORT || 5000; 
app.use('/',loginRoutes)
app.use('/todo',todoRoutes)
app.listen(port,()=>{
    console.log('server is up and running at port : '+port)
})