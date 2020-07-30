import React, { Component } from 'react';
import {Route,Switch } from "react-router-dom";
import NavBar from './Components/NavBar';
import Cart from './Components/Cart';
import Details from './Components/Details';
import ProductList from './Components/ProductList';
import Default from './Components/Default';
import './App.css';
import Modal from './Components/Modal';

class App extends Component{
  render(){
  return(
   
    <React.Fragment>
        <NavBar/>       
        <Switch>
            <Route  path="/" exact component={ProductList} />
            <Route  path="/details" component={Details} />
            <Route  path="/cart" component={Cart} />      
            <Route component={Default} />           
            </Switch>
            <Modal/>
     </React.Fragment>

  );
  
}
  
}
  

export default App;
