import React, { useState } from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const userData = {username: username, password: password}
    try {
      const response = await axios.post('/users/login', userData)
      console.log(response.data)
      
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <h4>Login Form</h4>
      <input type='text' placeholder='아이디' onChange={(e) => setUsername(e.target.value)} />
      <input type='password' placeholder='비밀번호' onChange={(e) => setPassword(e.target.value)} />
      <button onClick={() => handleLogin()}>로그인</button>
      {/* <form action='/users/login' method='post'>
        <input type='text' placeholder='아이디' name='username' />
        <input type='password' placeholder='비밀번호' name='password' />
        <button type='submit'>로그인</button>
      </form> */}
    </div>


  )
}
