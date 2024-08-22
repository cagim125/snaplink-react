import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

import styles from './Mypage.module.scss';

export default function Mypage() {
  const [data, setData] = useState(null);
  const [posts, setPosts] = useState();
  // eslint-disable-next-line
  const [userId, _] = useState(22);
  const navigate = useNavigate();

  const handleMyPost = useCallback(async () => {
    try {
      const response = await axios.get(`/api/my-page/${userId}`);
      const result = response.data;

      console.log(result);

      setData(result.data);
      setPosts(result.data.posts);

    } catch (err) {
      console.log(err.response.status);
      if (err.response.status === 409) {
        Swal.fire("로그인 해주세요", "", "warning")
        navigate('/login')
      }
    }

  }, [navigate, userId])

  const handleDeletePost = (postId) => {
    Swal.fire({
      title: "삭제하시겠습니까?",
      text: "삭제 시 복구 할 수 없습니다.",
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: "취소하기",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제하기"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete('/api/posts', {
            params: {
              postId: postId
            }
          })
          console.log(response)
          if (response.status === 200) {
            Swal.fire({
              title: "삭제완료!",
              text: response.data.message,
              icon: "success",
              timer: 3000
            });
            // 삭제 시 Data 다시 로드
            handleMyPost();
          }

        } catch (err) {
          console.log(err)
        }
      }
    });
  }

  useEffect(() => {
    handleMyPost();
  }, [handleMyPost])


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

        <div className={styles.profile}>
          <img src={data.profileImgUrl} alt="Profile" />
          <span>{data.username}님</span>
        </div>

        <div className={styles.posts}>
          <h1>Posts</h1>
          <ul className={styles.card}>
            {posts && posts.length > 0 ? (
              posts.map((post, index) => (
                <li key={index} className={styles.item}>
                  <div className={styles.title}>
                    <h5>Post #{index + 1}</h5>
                    <div>
                      <span><Link to={`/update/` + post.id} >수정</Link></span>
                      <span onClick={() => handleDeletePost(post.id)}>삭제</span>
                    </div>
                  </div>
                  <img src={post.imageUrl} alt='post'></img>
                  <h4>{post.content}</h4>
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
