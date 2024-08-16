import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Mypage() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleAuthtication = useCallback(async () => {
    try {
      const response = await axios.get('/users/my-page');
      const data = response.data;

      console.log(data);

      setUsername(data.name);

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


  return (
    <div>
      <h4>Mypage</h4>
      <p>안녕하세요. {username}님</p>
    </div>
  )
}
