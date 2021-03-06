import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomePage from './components/HomePage/HomePage';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/popper.js';
import 'bootstrap/dist/js/bootstrap.min.js';
import '@fortawesome/fontawesome-free/css/fontawesome.css';
import { MainMenu, MainMenuItem } from './components/MainMenu/MainMenu';
import { HashRouter, Switch, Route } from 'react-router-dom';
import ContactPage from './components/ContactPage/ContactPage';
import UserLoginPage from './components/UserLoginPage/UserLoginPage';
import ClientPage from './components/ClientPage/ClientPage';
import RoomPage from './components/RoomPage/RoomPage';
import RentablePage from './components/RentablePage/RentablePage';
import { AddRoomPage } from './components/AddRoomPage/AddRoomPage';

const menuItems = [
  new MainMenuItem("Home","/"),
  new MainMenuItem("Contact","/contact/"),
  new MainMenuItem("About us","/about/"),
  new MainMenuItem("Clients","/clients/"),
  new MainMenuItem("Log in/out","/user/login/"),
  new MainMenuItem("Add room","/addroom/"),
  //new MainMenuItem("Client 1","/client/1/"),
  //new MainMenuItem("Client 2","/client/2/"),
  //new MainMenuItem("Client 3","/client/3/")
  //<Route exact path="/client/:id" component = { ClientPage } />
];
ReactDOM.render(
  
  <React.StrictMode>
    <MainMenu items={ menuItems}></MainMenu>
    <HashRouter>
      <Switch>
        <Route exact path="/" component={ HomePage } />
        <Route exact path="/contact" component={ ContactPage } />
        <Route exact path="/user/login" component={ UserLoginPage } />
        <Route exact path="/clients" component = { ClientPage } />
        <Route exact path="/rooms" component = { RoomPage } />
        <Route exact path="/addroom" component = { AddRoomPage } />
        <Route exact path="/rentables" component = { RentablePage } />
      </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
