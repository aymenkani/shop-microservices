import React from "react";
import ReactDOM from "react-dom";
import { Switch, Route, Routes, NavLink  } from 'react-router-dom'
import Container from "./components/Container";
import Signin from "./components/pages/Signin";
import Signup from "./components/pages/Signup";

import "./index.scss";

const App = () => {


  return (
    
  <Routes>
      <Route path="auth/signin" element={
        <Container>
          <Signin />
        </Container>
        
      } />
        
      
      <Route path="auth/signup" element={
        <Container>
          <Signup />
        </Container>
        
       } />
    
    
    </Routes>

  );
}
    

export default App

// ReactDOM.render(<App />, document.getElementById("app"));

