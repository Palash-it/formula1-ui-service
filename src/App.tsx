import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

//constants
import {JWT_TOKEN} from './components/utils/constants';

//React components
import { Suspense, useEffect, useState } from 'react';
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
import SeasonFinalStandings from './components/SeasonFinalStandings';
import SeasonRaces from './components/SeasonRaces';
import RaceQualifyingTime from './components/RaceQualifyingTime';
import RaceResults from './components/RaceResults';
import SupportedScoringSystem from './components/SupportedScoringSystem';

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
  },[token, isAuthenticated]);
  return (
    <>
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
                path="/supported-scoring-systems"
                element = {
                  <SupportedScoringSystem/>
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
              <Route
                path="/season/:season/finalStandings"
                element = {
                  <PriveRoute isAuthenticated={isAuthenticated}>
                    <SeasonFinalStandings/>
                  </PriveRoute>
                } 
              />
              <Route
                path="/season/:season/races"
                element = {
                  <PriveRoute isAuthenticated={isAuthenticated}>
                    <SeasonRaces/>
                  </PriveRoute>
                } 
              />

              <Route
                path="/season/:season/:round/qualifying"
                element = {
                  <PriveRoute isAuthenticated={isAuthenticated}>
                    <RaceQualifyingTime/>
                  </PriveRoute>
                } 
              />

              <Route
                path="/season/:season/:round/results"
                element = {
                  <PriveRoute isAuthenticated={isAuthenticated}>
                    <RaceResults/>
                  </PriveRoute>
                } 
              />
          </Routes>
        </Suspense>
      <Footer />
    </Router>
    
    </>
  );
}

export default App;
