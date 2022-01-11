import React from "react";
import {Modal,Button} from 'react-bootstrap'
import { MdDelete } from "react-icons/md";

class MyModal extends React.Component{

    constructor(props){
        super(props)
       

        this.state= {
                isOpen: false,
                id: this.props.id
        }
    }

      
openModal = () => this.setState({ isOpen: true });
closeModal = () => this.setState({ isOpen: false });

HandleDelete=()=>{
    this.setState({isOpen:false})
    this.props.delete(this.props.id)
}

        render(){

                    return(
                            <>
                       <Button className="btn" variant="outline-danger"   onClick={this.openModal}> <MdDelete/> </Button>
        
                        <Modal  show={this.state.isOpen} centered onHide={this.closeModal}>
                          <Modal.Header >
                            <Modal.Title>Attention!!!</Modal.Title>
                          </Modal.Header>
                          <Modal.Body> Are you sure you want to delete this Todo?</Modal.Body>
                          <Modal.Footer>
                            <Button variant="success" onClick={this.closeModal}>
                              No
                            </Button>
                            <Button   onClick={()=>{this.HandleDelete() }}>
                             Yes
                            </Button>
                          </Modal.Footer>
                        </Modal>
                 
                  </>

                    )
        }

}


export default MyModal;