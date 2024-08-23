import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import styles from './Write.module.scss';

export default function Write() {
  const navigate = useNavigate()

  const [content, setContent] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [uploadUrl, setUploadUrl] = useState('');
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState('');

  const handleWritePost = async () => {
    const data = {
      content: content,
      imageUrl: imgUrl,
      userId: 22
    }

    try {
      const response = await axios.post("/api/posts/save", data)

      if (response.status === 200) {
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
      setFileName(name)
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1>Write</h1>
        <label htmlFor='file'>
          <div className={styles.btn_upload}>파일 업로드하기</div>
        </label>
        <p>{fileName}</p>
        <input type='file' id='file' onChange={(e) => handleImgUrl(e)} />
        
        <div>
          <input type='text' placeholder='글내용' onChange={(e) => { setContent(e.target.value) }} />
        </div>
        <button onClick={handleWritePost}>글작성</button>
      </div>
    </div>
  )
}
