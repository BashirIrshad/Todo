const express = require('express');
const bodyparser= require('body-parser');
const Todo= require('../models/todo');
const router = express.Router();
const App= express();

App.use(bodyparser.json());

router.post('/', async(req, res, next)=>{
  
  const createdTodo = new Todo({
          title: req.body.title,
          body: req.body.body
    
        });
        
        let result;
          try{
            result = await createdTodo.save();
          }catch(err){
              res.json({message: 'Some thing went wrong'})
          }
        res.send(result);

} )




router.get('/', async(req, res, next)=>{

    const result= await Todo.find({status: 'undone'}).sort([['date', -1]])
    res.status(200).send( result.map(todo => todo.toObject({ getters: true })));
   
})
router.get('/done', async(req, res, next)=>{

    const result= await Todo.find({status: 'done'}).sort([['date', -1]]);
    res.status(200).send( result.map(todo => todo.toObject({ getters: true })));
   
})



router.get('/:id', async(req, res, next)=>{
    const result= await Todo.findById(req.params.id)
      
    res.status(200).send(result.toObject({ getters: true }) );
})


router.put('/:id', async(req, res, next)=>{
   let todo;
    try {
        todo = await Todo.findById(req.params.id);
      } catch (err) {
        // const error = new HttpError(
        //   'Something went wrong, could not update place.',
        //   500
        // );
        return next(error);
      }

      todo.title = req.body.title;
      todo.body = req.body.body;
    
      try {
        await todo.save();
      } catch (err) {
    //     // const error = new HttpError(
    //     //   'Something went wrong, could not update place.',
    //     //   500
        // );
        return next(err);
      }

      res.status(200).json({ todo: todo.toObject({ getters: true }) });
    // res.send('data updated')

})

router.put('/done/:id', async(req,res, next)=>{
        let todo= await Todo.findById(req.params.id)
        todo.status= 'done';
        todo.title= todo.title;
        await todo.save()
         
        res.send('updated')

})
router.put('/undone/:id', async(req,res, next)=>{
    let todo= await Todo.findById(req.params.id)
    todo.status= 'undone';
    todo.title= todo.title;
    await todo.save()
     
    res.send('updated')

})

router.delete('/:id', async(req, res, next)=>{

  let todo= await Todo.findById(req.params.id);
        todo.remove();
  res.send('deleted');
    


})
 
module.exports= router;


