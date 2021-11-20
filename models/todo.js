const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    isDone:{
        type:Boolean,
        require:true,
        default:false
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
        ref: 'User'
    }
})

module.exports = new mongoose.model('todo',todoSchema)