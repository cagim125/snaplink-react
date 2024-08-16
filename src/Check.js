import axios from 'axios'
import React from 'react'

export default function Check() {

  const handleApiCheck = async () => {
    try {
      const response = await axios.get("/api/check")

      if (response.status === 200) {
        console.log('@check success : ', response.data);
      } else {
        console.error('@check failed');
      }

    } catch (error) {
      console.error('@check error', error);
    }
  }

  return (
    <div>
      <h4>Check</h4>
      <button onClick={() => handleApiCheck()}>CheckApi</button>
    </div>

  )
}
