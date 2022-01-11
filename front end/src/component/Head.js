import React, { Component } from 'react';
import {Nav} from 'react-bootstrap';
import '../style/head.css';
import {Link}  from "react-router-dom";



class Head extends Component{

        render(){
            return(
        
                <div>
                    
                    <Nav fill variant="tabs" defaultActiveKey="/Tasks">
                <Nav.Item>
                   <Link to= "/Tasks"> Tasks</Link>
                </Nav.Item>
                <Nav.Item>
                   <Link to= "/Done"> Done</Link>
                </Nav.Item>
              
                </Nav>
           
                </div>
               
            )


        }

}


export default Head;
// module.exports= Head;
