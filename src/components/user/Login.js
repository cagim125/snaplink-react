import React from 'react'


export default function Login() {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');

  // const handleLogin = async () => {
  //   const formData = {username: username, password: password}
  //   try {
  //     const response = await axios.post('/users/login', formData)
  //     console.log(response.data)
  //   } catch(err) {
  //     console.log(err)
  //   }
  // }

  return (
    <div>
      <h4>Login Form</h4>
      <form action='/users/login' method='post'>
        <input type='text' placeholder='아이디' name='username' />
        <input type='password' placeholder='비밀번호' name='password' />
        <button type='submit'>로그인</button>
      </form>
    </div>
    
    
  )
}
