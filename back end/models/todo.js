const mongoose= require('mongoose');

const todoSchema= new mongoose.Schema({
    title: {type: String, required: true},
    body: {type: String}, 
    date: {type: Date, default: Date.now},
    status: {type: String , default: 'undone'}
})


module.exports= mongoose.model('Todo', todoSchema);