import React from 'react'
import styles from './Main.module.scss'

export default function Main({ posts }) {

  console.log(posts);
  return (

    <div className={styles.container}>
      <div className={styles.item}>
        <h1>Main</h1>
        {posts && posts.length > 0 ?
          (
            <div className={styles.card}>
              {posts.map((post, index) => (
                <>
                  <div key={index} className={styles.profile}>
                    <div className={styles.name}>
                      <div>
                        <img src={post.user.profileImageUrl !== null
                          ? post.user.profileImageUrl :
                          "https://spring-test-bucket-123.s3.ap-northeast-2.amazonaws.com/user/profile-user.png"
                        }
                          alt='profile' />
                        <span>{post.user.username}</span>
                      </div>
                      <div >
                        <img src={`${process.env.PUBLIC_URL}/images/more_white.png`} alt='more' />
                      </div>

                    </div>
                    <div className={styles.postImage}>
                      <img src={post.imageUrl} alt='postImg' />
                    </div>
                    <div className={styles.postContent}>
                        {post.content}
                    </div>
                  </div>


                </>
              ))}

            </div>

          ) :
          (
            <div>
              <p>No 게시물</p>
            </div>
          )
        }
      </div>
    </div>
  )
}
