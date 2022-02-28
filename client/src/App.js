import './App.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {

  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data,setData] = useState("");

  const register = () => {
    axios({
      method:"POST",
      data:{
        registerUsername,
        registerPassword
      },
      withCredentials:true,
      url:"http://localhost:4000/register"
    })
    .then(res => console.log(res))


  };
  const login = () => {
    axios({
      method:"POST",
      data:{
        username:loginUsername,
        password:loginPassword
      },
      withCredentials:true,
      url:"http://localhost:4000/login"
    }).then(res => setData(res.data))
  };

  const logout = () => {
    console.log('axios logout')
    axios({
      method:"POST",
      withCredentials:true,
      url:"http://localhost:4000/logout"
    }).then(res => console.log(res))
  }

  return (
    <div className="App">
      <div className="register">
        <h1>Register</h1>
        <input type="text" name="registerUsername" placeholder="Username" onChange={e => setRegisterUsername(e.target.value)} />
        <input type="password" name="registerPassword" placeholder="Password" onChange={e => setRegisterPassword(e.target.value)} />
        <button onClick={register}>Submit</button>

      </div>

      <div className="login">
        <h1>Login</h1>
        <input type="text" name="loginUsername" placeholder="Username" onChange={e => setLoginUsername(e.target.value)} />
        <input type="password" name="loginPassword" placeholder="Password" onChange={e => setLoginPassword(e.target.value)} />
        <button onClick={login}>Submit</button>

      </div>

      <div className="getUser">
        <h1>Get User</h1>
          {data?"welcome "+data.username:null}
      <button onClick={logout}>Logout</button>
      </div>


    </div>
  );
}

export default App;
