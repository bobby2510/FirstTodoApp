if(process.env.NODE_ENV != 'production')
{
    require('dotenv').config()
}
const express = require('express')
const loginRoutes = require('./routes/login')
const app = express()
const port = process.env.PORT || 5000; 
app.use('/',loginRoutes)
app.listen(port,()=>{
    console.log('server is up and running at port : '+port)
})