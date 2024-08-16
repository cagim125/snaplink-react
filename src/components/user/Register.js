import React, { useState } from 'react'
import styles from './Register.module.scss'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [isActive, setIsActive] = useState(false);
  const [isValid, setIsValid] = useState(null);

  const handleRegister = async () => {
    const formData = {
      username: username,
      email: email,
      password: password
    }
    try{
      const response = await axios.post('/api/auth/signUp', formData)
      console.log(response);

      if(response.status === 200) {
        Swal.fire({
          title: "회원가입 성공",
          text: "회원가입이 정상적으로 처리되었습니다.",
          icon: "success"
        })
        navigate('/')
      } 

    } catch (err) {
      console.log(err.response);
      const res = err.response;
      if(res.status === 409) {
        Swal.fire({
          title: "이미 존재하는 아이디입니다.",
          text: "이미 존재하는 아이디 입니다.",
          icon: "error"
        })

        setUsername('');
        
      }

      
    }
  }

  const handleCurrentPW = (e) => {
    if (e.target.value === password) {
      setIsActive(true)
    } else {
      setIsActive(false)
    }
  }

  const currentEmail = () => {
    setIsValid(validateEmail(email))
  }

  // 정규 표현식을 사용한 이메일 검증 함수
  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  // const handleAlert = () => {
  //   Swal.fire({
  //     title: "회원가입 성공",
  //     text: "회원가입이 정상적으로 처리되었습니다.",
  //     icon: "success"
  //   })
  // }


  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div>
          <input type='text' placeholder='아이디' value={username}
          onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input className={isActive ? styles.active : styles.inactive} 
            type='password' placeholder='비밀번호' value={password}
            onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <input className={isActive ? styles.active : styles.inactive} 
            type='password' placeholder='비밀번호 확인' 
            onChange={(e) => handleCurrentPW(e)} />
        </div>
        <div>
          <input type='email' placeholder='이메일' onChange={(e) => setEmail(e.target.value)} />
          {isValid === true && <p style={{ color: 'green' }}>Valid email!</p>}
          {isValid === false && <p style={{ color: 'red' }}>Invalid email format.</p>}
        </div>
        <button onClick={() => currentEmail()} style={{cursor:'pointer', border:'none', backgroundColor:'green', color:'white', padding:'10px'}}>이메일 인증</button>
        {/* <button onClick={() => handleAlert()}>sweetalert2 테스트</button> */}
        <input type='button' value='회원가입' onClick={() => handleRegister()} />
      </div>
    </div>
  )
}
