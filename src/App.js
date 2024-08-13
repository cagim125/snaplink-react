import axios from 'axios';
import './App.css';
import Register from './components/user/Register';
import { Routes, Route, Link } from 'react-router-dom';

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


      <Routes>
        <Route path='/' element={<div>처음 페이지</div>} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
