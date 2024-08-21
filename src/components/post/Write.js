import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Write() {
  const navigate = useNavigate()

  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState();

  const handleWritePost = async () => {
    const data = {
      content: content,
      imageUrl: imgUrl,
      userId: 16
    }

    try {
      const response = await axios.post("/api/posts/save", data)

      if( response.status === 200) {
        const responseS3 = await axios.put(uploadUrl, file);

        console.log(responseS3)

        Swal.fire({
          title: response.data.message,
          icon: "success"
        })
        navigate('/mypage')
      }

    } catch (err) {
      console.log(err)
    }

  }

  const handleImgUrl = async (e) => {
    const file = e.target.files[0]
    const name = encodeURIComponent(file.name);
    console.log(file);
    
    const response = await axios.get("/api/posts/presigned-url?filename=" + name)

    console.log(response);

    const url = response.data

    if (response.status === 200) {
      setUploadUrl(url)
      setImgUrl(url.split("?")[0])
      setFile(file)
    }
  }
  return (
    <div>
      <h4>Write</h4>
      <div>
        <input type='file' onChange={(e) => handleImgUrl(e)}/>
      </div>
      <div>
        <input type='text' placeholder='글내용' onChange={(e) => {setContent(e.target.value)}} />
      </div>
      <button onClick={handleWritePost}>글작성</button>
    </div>
  )
}
