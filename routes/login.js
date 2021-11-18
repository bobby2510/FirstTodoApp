const express = require('express')
const router = express.Router()


//home screen here 
router.get('/', (req,res)=>{
    res.send('First TodoApp')
})


module.exports = router 