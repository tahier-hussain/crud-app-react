import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { 
  BrowserRouter as Router, 
  Route, 
  Link, 
  Switch 
} from 'react-router-dom'; 
import Login from './components/login/login';
import Signup from './components/signup/signup';
import HomePage from './components/home/home';
import MyPosts from './components/myposts/myposts';
import PrivateRoute from './components/PrivateRoutes';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route path="/" component={Login} exact/>
            <Route path="/signup" component={Signup} exact />
            <Route path="/home" component={HomePage} exact/>
            <Route path="/myposts" component={MyPosts} exact/>
          </Switch>
        </Router>
        <div className="container text-center mt-5 mb-3 p-3 border-top">
          Basic CRUD App using MERN stack
        </div>
      </div>
    );
  }
}

export default App;
