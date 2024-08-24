import React, { useState } from 'react'
import axios from 'axios';
import styles from './Comment.module.scss'
import Swal from 'sweetalert2';

export default function Comment(
  { setModal, postId, userId, commentList }
) {
  const [input, setInput] = useState('');
  const [comments, setComments] = useState(commentList);
  
  // console.log("postId : " + postId, "UserId : " + userId)
  
  const addComment = async () => {
    const lastIndex = comments.length;
    const addedIndex = lastIndex + 1;
    const newComment = {
      id: addedIndex,
      username: "omg_9494",
      content: input
    }
    
    setComments([...comments, newComment])

    try {
      const response = await axios.post(`/api/${postId}/comments`,{
        userId: userId,
        content: input
      })

      console.log(response)

    } catch (err) {
      console.log(err)
    }

    setInput('')
  }
  const handleInput = (e) => {
    if(e.target.value.length > 40) {
      setInput(e.target.value.slice(0, 30))
      Swal.fire({
        title: "40자 이하로 입력해주세요.",
        icon: "warning",
        timer: "1500"
      })
    } else {
      setInput(e.target.value)
    }
  }

  const handleClose = (e) => {
    // console.log(e.target)
    // console.log(e.currentTarget);

    if (e.target === e.currentTarget) {
      setModal(false)
    }
  }

  return (
    <div onClick={(e) => handleClose(e)} className={styles.container}>
      <div className={styles.modal}>
        <div>
          <img style={{float:'right', padding:'5px', cursor:'pointer'}} 
          src={`${process.env.PUBLIC_URL}/images/close.png`} 
          alt='close' 
          onClick={() => setModal(false)}
          />
        </div>
        <h3 style={{textAlign:'center'}}>댓글</h3>
        <div className={styles.commentList}>
          <ul>
            {comments.length === 0 ? (
              <li>댓글이 없습니다.</li>
            ) : (
              comments.map((comment, index) => (
                <li key={index}><span>{comment.userName}</span>  {comment.content}</li>
              ))
            )
            }
          </ul>
        </div>

        <div className={styles.commentContainer}>
          <input type='text'
            placeholder='댓글 달기...'
            value={input}
            onChange={e => handleInput(e)}
            onKeyDown={e => (e.key === 'Enter' ? addComment() : null)} />
          <button onClick={() => addComment()}>게시</button>
        </div>
      </div>
    </div>
  )
}
