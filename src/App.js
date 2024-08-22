
import { Routes, Route, Link } from 'react-router-dom';
// components
import Login from './components/user/Login';
import Register from './components/user/Register';
import Mypage from './components/user/Mypage';
import Check from './Check';
import Write from './components/post/Write';
import Update from './components/post/Update';

import styles from './App.module.scss'



function App() {
  // const handleGetUser = async () => {
  //   try {
  //     const response = await axios.get('/users');
  //     console.log(response);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <ul>
          <li><Link to="/write">글작성</Link></li>
        </ul>
        <ul>
          <li><Link to="/register">회원가입</Link></li>
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/mypage">마이페이지</Link></li>
        </ul>
      </div>



      <Routes>
        <Route path='/' element={<div>처음 페이지</div>} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path='/check' element={<Check />} />
        <Route path='/write' element={<Write />} />
        <Route path="/update/:id" element={<Update />} />
      </Routes>
    </div>
  );
}

export default App;
