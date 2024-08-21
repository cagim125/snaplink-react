import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function Update() {
  const {id} = useParams();

  const handleGetPost = async () => {
    
    try {
      const response = await axios.get(`/api/posts/${id}`)
      console.log(response.data);
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(()=>{
    handleGetPost();
  }, [])

  return (
    <div>Update</div>

  )
}
