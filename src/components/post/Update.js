import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios';
import Swal from 'sweetalert2';

export default function Update() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [postData, setPostData] = useState();


  const handleGetPost = useCallback(
    async () => {

      try {
        const response = await axios.get(`/api/posts/${id}`)
        console.log(response.data.data);
        setPostData(response.data.data);
      } catch (err) {
        console.log(err)
      }
    }
    , [id])

  const handleGetImgUrl = async (e) => {
    const file = e.target.files[0]
    const name = encodeURIComponent(file.name);

    // console.log(file, name)

    try {
      const response = await axios.get("/api/posts/presigned-url", {
        params: {
          filename: name
        }
      })

      console.log(response);

      const uploadUrl = response.data
      if (response.status === 200) {

        // eslint-disable-next-line
        const responseS3 = await axios.put(uploadUrl, file);

        const updatePost = {
          ...postData,
          imageUrl: response.data.split("?")[0]
        }

        setPostData(updatePost)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const handleChagneContent = (e) => {
    const newContent = e.target.value;

    const newPost = {
      ...postData,
      content: newContent
    }

    setPostData(newPost)
  }

  const handleUpdatePost = () => {
    Swal.fire({
      title: "업데이트 하실 건가요?",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "업데이트"
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.put('/api/posts', postData) 
          console.log(response)
          if (response.status === 200) {
            Swal.fire({
              title: "업데이트 완료!",
              text: response.data.message,
              icon: "success",
              timer: 3000
            });
            // 수정 후 마이페이지로 이동
            navigate("/mypage")
            
          }

        } catch (err) {
          console.log(err)
        }
      }
    });
  }


useEffect(() => {
  handleGetPost();
}, [handleGetPost])

return (
  <div>
    <h4>Update</h4>
    {postData &&
      <>
        <div>
          <span>글내용 : </span>
          <input type='text' placeholder={postData.content} onChange={(e) => handleChagneContent(e)} />
        </div>
        <input type='file' onChange={(e) => handleGetImgUrl(e)} />
        <div>
          <img src={postData.imageUrl} alt='postImg' />
        </div>
        <button style={{ backgroundColor: 'black', padding: '20px', color: 'white', fontWeight: '800', fontSize: '18px', boxSizing: 'border-box' }}
          onClick={() => handleUpdatePost()}
        >수정하기</button>
      </>
    }

  </div>

)
}
