import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//constants
import {JWT_TOKEN} from './components/utils/constants';

//React components
import { lazy, Suspense, useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

//App Components
import Header from './components/template/Header';
import Footer from './components/template/Footer';
import Login from './components/auth/Login';
import PublicRoute from './components/routes/PublicRoute';
import PriveRoute from './components/routes/PrivateRoute';

import Home from './components/Home';

// helpers,libs
import {getToken, hasValidToken, signOut} from './components/helpers/authhelper';



function App() {
  const [token, setToken] = useState(getToken());
  const [isAuthenticated, setAuthenticated] = useState(hasValidToken());

  /**
   * Call after successfull login
   * 
   * @param token 
   * @param isValidAuth 
   */
  const updateTokenHandler = (token:string, isValidAuth:boolean) => {
    setToken(token);
    setAuthenticated(isValidAuth);
  }

  const handleSignOut = () => {
    //make a REST call to Server to delete jwt. do will later
    signOut();
    updateTokenHandler("", false);
  }

  useEffect(() => {
    localStorage.setItem(JWT_TOKEN, token);
    if(!isAuthenticated){
      
    }
  },[token, isAuthenticated]);
  return (
    <Router>
      <Header isAuthenticated = {isAuthenticated} handleSignOut = {handleSignOut}/>
        <Suspense fallback = {<Spinner animation="grow"/>}>
          <Routes>
            <Route
                path="/"
                element = {
                  <PublicRoute isAuthenticated={isAuthenticated}>
                    <Login updateTokenHandler = {updateTokenHandler} isAuthenticated = {isAuthenticated}/>
                  </PublicRoute>
                } 
              />
            <Route
                path="/signin"
                element = {
                  <PublicRoute isAuthenticated={isAuthenticated}>
                    <Login updateTokenHandler = {updateTokenHandler} isAuthenticated = {isAuthenticated}/>
                  </PublicRoute>
                } 
              />
              <Route
                path="/home"
                element = {
                  <PriveRoute isAuthenticated={isAuthenticated}>
                    <Home/>
                  </PriveRoute>
                } 
              />
          </Routes>
        </Suspense>
      <Footer />
    </Router>
  );
}

export default App;
