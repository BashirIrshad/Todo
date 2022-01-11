const express= require('express');
const bodyParser= require('body-parser');
const cors= require('cors');
const mongoose= require('mongoose');
const app= express();
const TodoRouter= require('./controllers/todoController')
app.use(bodyParser.json());
app.use(cors());
const config= require('config')


app.use('/api/todo', TodoRouter);
const db= config.get('db')
mongoose.connect(db).
then(()=>{
    app.listen(process.env.PORT || 5000);
    console.log('conndected to mongoo db', db)
}).catch(()=>{
    console.log('connection failed');
})
