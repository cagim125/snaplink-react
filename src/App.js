import styles from './App.module.scss';
import { Routes, Route, Link } from 'react-router-dom';

// components
import Login from './components/user/Login';
import Register from './components/user/Register';
import Mypage from './components/user/Mypage';
import Check from './Check';
import Write from './components/post/Write';
import Update from './components/post/Update';
import Main from './components/Main';

import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';



function App() {
  const [posts, setPosts] = useState();

  const handleGetAllPost = useCallback(async () => {
    try {
      const response = await axios.get('/api/posts',{
        params: {
          currentUserId: 22
        },
        headers: {
          "Content-Type" : "application/json"
        }
      });
      console.log(response.data);

      if(response.status === 200) {
        setPosts(response.data.data);
      }

    } catch (err) {
      console.log(err);
    }
  },[]) 

  useEffect(()=> {
    handleGetAllPost()
  },[handleGetAllPost])

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <ul>
          <li><Link to='/'><img src={`${process.env.PUBLIC_URL}/favicon-32x32.png`} alt='logo'/></Link></li>
          <li><Link to="/write">글작성</Link></li>
        </ul>
        <ul>
          <li><Link to="/register">회원가입</Link></li>
          <li><Link to="/login">로그인</Link></li>
          <li><Link to="/mypage">마이페이지</Link></li>
        </ul>
      </div>



      <Routes>
        <Route path='/' element={<Main posts={posts} />} />
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
