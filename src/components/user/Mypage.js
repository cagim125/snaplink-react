import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Mypage() {
  const [data, setData] = useState(null);
  const [username, _] = useState("cagim25")
  const navigate = useNavigate();

  const handleAuthtication = useCallback(async () => {
    try {
      const response = await axios.get(`/api/my-page/${username}`);
      const result = response.data;

      console.log(result);

      setData(result.data);

      setTimeout(() => {
        console.log(data);
      }, 3000);


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

  }, [navigate])

  useEffect(() => {
    handleAuthtication();
  }, [handleAuthtication])


  if (!data) {
    return <div>Loading...</div>; // 데이터가 로드되지 않은 경우 로딩 메시지
  }

  return (
    <div>
      <h4>Mypage</h4>
      <img src={data.profileImageUrl} alt="Profile" style={{backgroundColor:'black', borderRadius:'50%'}}/>
      <p> username : {data.username} </p>
      <p> email : {data.email}</p>
    </div>
  )
}
