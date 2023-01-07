import './feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function Feed() {
  const [posts, setPosts] = useState([])

  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchPosts = async () => {
      // const res = userId ? await axios.get(`http://localhost:4000/api/posts/profile/${userId}`)
      //   : await axios.get('http://localhost:4000/api/posts/timeline/639dd730533cf053f2266c56')
      const res = await axios.get(`http://localhost:4000/api/posts/timeline/${user._id}`)
      // console.log(res)
      setPosts(res.data.sort((post1, post2) => {
        return (new Date(post2.createdAt) - new Date(post1.createdAt))
      }))
    }
    fetchPosts()
  }, [user._id])
  return (
    <div className='feed'>
      <div className="feedWrapper">
        <Share />
        {posts.map(post => (<Post key={post._id} post={post} />))}
      </div>
    </div>
  )
}
