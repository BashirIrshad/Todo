import React, { Component } from 'react';
import axios from 'axios';
import MyModal from './MyModal';
import {Card, Button, Container} from 'react-bootstrap';
import '../style/tasks.css';
import {MdSettingsBackupRestore } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';

let counter= 0;

class Done extends Component{
    constructor(props){
        super(props);
    
        this.state = {
        
          data: [],
          isEdit: false,
          title: '',
         body: '',
         
        }
      }
    
      getData= async()=>{
        try {
          
          await axios.get(process.env.REACT_APP_BACKEND_URL+'/todo/done').then(data =>{
             this.setState({data: data.data});
           });
        } catch (error) {
          toast.error('No data retreived');
        }
      }

      onDelete = (id) => {

        return async() =>  {

          try {
            
            await axios.delete(process.env.REACT_APP_BACKEND_URL+`/todo/${id}`).then(() => {
                 // this.getData();
                 this.setState({
                   data: this.state.data.filter((x) => x.id !== id)
                 })
             });
             toast.warning('Content Deleted')
            } catch (error) {
              
              toast.error('Could not Delete!! please try again')
          }
        }
    
      }

      OnUnDone=async(id)=>{
        try{

          await axios.put(process.env.REACT_APP_BACKEND_URL+`/todo/undone/${id}`).then(() => {
                  this.setState({
                    data: this.state.data.filter((x) => x.id !== id)
                  })
              });
  
           toast.success('Todo was sent to Tasks')   
          }catch(err){
            
            toast.error('Oops!! Something went wrong')   
        }
      }

      componentDidMount(){
        counter= 0;
          this.getData();
      }
      componentDidUpdate(){
        counter= 0;
      }
 render(){

    return(
      <React.Fragment>
        <ToastContainer />
      <Container>
           
                  <br/>
                {this.state.data.map((r,i)=>{
                    if(r){

                      counter= counter +1
                    }
                  

            return(
              
                <Card key= {i}>
                  <Card.Body className="c_body" >
                    <Button  className="btn" variant="outline-primary" onClick= {()=>{this.OnUnDone(r.id)}} >< MdSettingsBackupRestore/>   </Button>
                     <MyModal id={r.id} delete={this.onDelete(r.id)} /> 
                    <div id="done">  {r.title}  </div> 
                    {r.body && <p className="body_p">{r.body}</p>}
                  </Card.Body>
                </Card>
                 )
              })}

            <p>There are <b>{counter}</b> done Todos</p>
    </Container>

    
    </React.Fragment>  
            )


        }

}


export default Done;
