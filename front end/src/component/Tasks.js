import React from 'react';
import axios from 'axios';
import {Card, Button, Container, Form} from 'react-bootstrap';
import {FaCheck} from "react-icons/fa";
import MyModal from './MyModal';
import { FiEdit } from "react-icons/fi";
import '../style/tasks.css';
import { ToastContainer, toast } from 'react-toastify';




  let counter2= 0;
 
class Tasks extends React.Component{
  
   
 
    constructor(props){
        super(props);
        this.state = {
          counter: 1,
          data: [],
          isEdit: false,
          title: '',
          body: '',
         
         
        }
      }
    
      getData= async()=>{
   
        try {
          await axios.get(process.env.REACT_APP_BACKEND_URL+'/todo').then(data =>{
          this.setState({data: data.data});
       
        });
        } catch (error) {
          toast.error('No data retrieved')
        }
       
      }
  
      onReset(){
        this.setState({
          title: '',
          body: ''
        })
      }
      onDelete = (id) => {

        return async() =>  {
          try{
            await axios.delete(process.env.REACT_APP_BACKEND_URL+`/todo/${id}`).then(() => {
                
                 this.setState({
                   data: this.state.data.filter((x) => x.id !== id)
                 })
             });
             toast.warning('Content Deleted')
             
            }catch(err){
              
              toast.error('Could not delete!! Please try again later')
            
            

          }
        }
    
      }

      handleSubmit = async(e)=>{
        
          e.preventDefault();

          let data= {
              title :this.state.title

          }

        try{

          await axios.post(process.env.REACT_APP_BACKEND_URL+'/todo', data).then((res)=>{
             this.onReset();
             this.getData();
            
         
 
               toast.success('Task added')
           
           })
        }catch(err){
              toast.error('something went wrong')
        }  
      }

      onDone= async(id)=>{
          try {
            
            await axios.put(process.env.REACT_APP_BACKEND_URL+`/todo/done/${id}`).then(() => {
                 this.setState({
                   data: this.state.data.filter((x) => x.id !== id)
                 })
             });
             toast.success('Todo sent to Done')
            } catch (error) {
              toast.error('Something went worng!')
            
          }
      }

      sendToForm=(id)=>{
     
        this.props.history.push(`/mainForm/${id}`);
     
        
      }
      
      mainForm=()=>{
     
        this.props.history.push(`/mainForm`);
        
      }
     
        componentDidMount(){
        
          counter2= 0;
          this.getData();        
      }
      // componentDidUpdate prevents the values of counter1 and 2 to be added on the old values; 
      componentDidUpdate(){
       
        counter2= 0;
      }
    
   
     
        render(){
        
            return(
                
                <React.Fragment>
                  <ToastContainer />
                  <Container>
                  <br/>
                
                  <Form onSubmit= {this.handleSubmit} id="form">
                        <Form.Group controlId="formGroupEmail">

                            <Form.Control type="text" name="title" value={this.state.title} required onChange={(e) => this.setState({title: e.target.value})} placeholder="Quick Todo Insertion" />
                            <Button className="check" variant="success" onClick= {()=>{this.mainForm()}} >Descriptive</Button> 
                            <Button className="check" variant="outline-success" type="submit">Quick</Button> 
                           
                        </Form.Group>
                 
                  </ Form> 
                
                    {this.state.data.map((r,i)=>{
                      
                       if(r){

                         counter2= counter2 +1
                       }
                     
                       return(
                         <div key= {i}>
                          <br/>
              <Container >
            
                             
                <Card style={{margin: '0'}} >
                    <Card.Body>
                       <Button className="btn" variant="outline-success" onClick= {() => this.onDone(r.id)}>< FaCheck/>  </Button> 
                       <Button  className="btn" variant="outline-primary" onClick= {()=>{this.sendToForm(r.id)}}>< FiEdit/>   </Button> 
                      <MyModal id={r.id} delete={this.onDelete(r.id)}/>  
                        <div id="tasks"> {r.title} </div>
                        {r.body && <p className="body_p">{r.body}</p>}
                    </Card.Body>
                </Card>
               
                   
              </Container>
             
                     </div>

                     ) }) 
              }
                   
                   <p>There are <b> {counter2}</b>  Todos</p>
                     </Container>
                   
                </React.Fragment>
            )
          
        }

}


export default Tasks;
