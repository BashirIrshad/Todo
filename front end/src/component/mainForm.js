
import React, { Component } from 'react';
import {Form, Container, Button} from 'react-bootstrap';
import axios from 'axios';

class mainForm extends Component{

    constructor(props){
        super(props);
        
        this.state = {       
          data: [],
          title: '',
          body: '', 
          EditId: this.props.match.params.id,
         isEdit: false,     
        }
      }
   

      onReset = () => {
        this.setState({title: '', body: ''});
      }

      getData(){
        axios.get(process.env.REACT_APP_BACKEND_URL+`/todo/${this.state.EditId}`).then(data =>{
          this.setState({
            
            title: data.data.title,
            body: data.data.body,      
          });
        
        
        });
      }
   componentDidMount(){

    if(this.props.match.params.id){
      this.getData();
      this.setState({
        isEdit: true
      })
    }
   }
   componentDidUpdate(){
    //  this.getData()
   }
    
      handleSubmit = (e) => {
        e.preventDefault();

        let data = {
          title: this.state.title,
          body: this.state.body
        
        }

if(!this.state.isEdit){

  axios.post(process.env.REACT_APP_BACKEND_URL+'/todo', data).then(() => {
     this.onReset();
     this.props.history.push('/Tasks');
     
  })

}else{

  axios.put(process.env.REACT_APP_BACKEND_URL+`/todo/${this.state.EditId}`, data).then(() => {
    this.onReset();
    this.props.history.push('/Tasks');
  })
}


    }
 

        render(){
        
            return(

                <React.Fragment>
                  
                    <br/>
                    <Container>
                  <Form onSubmit= {this.handleSubmit} id="form">
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" name="title" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} required placeholder="Enter the title" />
                        </Form.Group>
             
                        <Form.Group>
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" name="body" value={this.state.body ? this.state.body : ''} onChange={(e) => this.setState({body: e.target.value})}  rows="5" />
                        </Form.Group>

                            <Button variant="dark" type="submit" value={this.state.isEdit ? 'update' : 'save'}>submit</Button>
                    
                    </Form>
                    </Container>
                </React.Fragment>
            )


        }

}


export default mainForm;