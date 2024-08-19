import axios from 'axios';
import React, { useState } from 'react'

export default function Write() {

  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');

  const handleWritePost = async () => {

  }

  const handleImgUrl = async (e) => {
    const file = e.target.files[0]
    const name = encodeURIComponent(file.name);
    console.log(file);
    
    const response = await axios.get("/api/presigned-url?filename=" + name)

    console.log(response);

    const url = response.data

    if (response.status === 200) {
      setUploadUrl(url)
      setImgUrl(url.split("?")[0])
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
      <button>글작성</button>
    </div>
  )
}
