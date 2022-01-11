import React, { Component } from 'react';

import Tasks from './component/Tasks';
import Done from './component/Done';
import mainForm from './component/mainForm';
import Head from './component/Head';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';

class App extends Component {

 

  render() {


    return (
      <div>
        
        <Router>
          
          <Head/>

      <Switch>
        <Route exact path= {"/"} component={Tasks} />
          
        <Route exact path="/Tasks" component={Tasks} />
        <Route exact path="/Done" component={Done} /> 
        <Route exact path="/mainForm/:id" component={mainForm} /> 
       
        <Route exact path="/mainForm" component={mainForm} /> 

        </Switch>

        </Router>

              
      </div>
    )
  }

}


export default App;
