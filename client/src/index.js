import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Member from './Member';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';


async function requireAuth() {
  await axios({
    method:"GET",
    withCredentials: true,
    url:"http://localhost:4000/user"
  })
  .then(response => {
      console.log(response.data.isAuthenticated)
      if(response.data.isAuthenticated){
          return true
      }else {
        return false
      }
  })
}


ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/member"  element={requireAuth()?<Member/>:<Navigate to="/"/>} />
    </Routes>


  </BrowserRouter>

  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
