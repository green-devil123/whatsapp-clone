import React, { useState } from 'react';
import "./App.css"
import Sidebar from './Sidebar';
import Chat from './Chat';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

const App = ()=>{

  const [{user},dispatch] = useStateValue();

  return (
    <>
      {/* BEM naming convention */}
      <div className="app">
        <div className="app_body">
          {
            !user ? (<Login/>):(
              <Router>
                <Sidebar/>
                <Switch>
                  <Route path="/rooms/:roomId">
                    <Chat/>
                  </Route>
                  <Route path="/">
                    <Chat/>
                  </Route>
                </Switch>
              </Router>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App;

// Tech in today's build

// React
// Firebase Firestore Realtime db
// Material UI
// React Router
// React Context API
// ^^^^REDUX
// Google Authentication
// Deploy using Firebase
