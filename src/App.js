import axios from 'axios';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
// components
import Login from './components/user/Login';
import Register from './components/user/Register';



function App() {
  const handleGetUser = async () => {
    try {
      const response = await axios.get('/users');
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <button onClick={() => handleGetUser()}>GetUsers</button>
      <Link to="/register">회원가입</Link>
      <Link to="/login">로그인</Link>


      <Routes>
        <Route path='/' element={<div>처음 페이지</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
