import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

import styles from './Mypage.module.scss';

export default function Mypage() {
  const [data, setData] = useState(null);
  const [posts, setPosts] = useState();
  const [userId, _] = useState(22);
  const navigate = useNavigate();

  const handleAuthtication = useCallback(async () => {
    try {
      const response = await axios.get(`/api/my-page/${userId}`);
      const result = response.data;

      console.log(result);

      setData(result.data);
      setPosts(result.data.posts);



    } catch (err) {
      console.log(err.response.status);
      if (err.response.status === 409) {
        Swal.fire({
          title: '로그인 해주세요.',
          icon: 'warning'
        })
        navigate('/login')
      }
    }

  }, [navigate, userId])

  useEffect(() => {
    handleAuthtication();
  }, [handleAuthtication])


  if (!data) {
    return <div>
      {/* <input type='text' placeholder='유저아이디' onInput={(e) => setUsername(e.target.value)}/> */}
      Loading...
    </div>; // 데이터가 로드되지 않은 경우 로딩 메시지
  }

  return (
    <div className={styles.container} >
      <div className={styles.info}>
        <h1>Mypage</h1>

        <img src={data.profileImageUrl} alt="Profile" style={{ backgroundColor: 'black', borderRadius: '50%' }} />
        <h3> username : {data.username}님 </h3>

        <div style={{backgroundColor:'white'}} className={styles.posts}>
          <h5>Posts</h5>
          <ul className={styles.card}>
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <li key={index} className={styles.item}>
                <h6>Post #{index + 1}</h6>
                <p>{post.content}</p>
              </li>
            ))
          ) : (
            <p>No posts available.</p>
          )}
          </ul>
        </div>
      </div>


    </div>
  )
}
