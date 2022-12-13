
import './App.css';

import { Navigate, Route, Routes } from 'react-router-dom';

import Chatbtn from './chatbot';
import {React,useState,useRef,useEffect} from 'react'
import Policy from './policy';
function App() {

  return (
    <div className="App">
      
      <Routes>
                  <Route path="/" element={<Policy/>} />

      </Routes> 

      
    </div>
  );
}

export default App;
