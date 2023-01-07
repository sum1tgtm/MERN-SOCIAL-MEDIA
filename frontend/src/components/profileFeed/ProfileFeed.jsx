// import '../feed/feed.css'
// import Share from '../share/Share'
// import Post from '../post/Post'
// import { useEffect, useState } from 'react'
// import axios from 'axios'

// export default function ProfileFeed({ userId }) {
//     const [posts, setPosts] = useState([])

//     useEffect(() => {
//         const fetchPosts = async () => {
//             //   const res = userId ? await axios.get(`http://localhost:4000/api/posts/profile/${userId}`)
//             //     : await axios.get('http://localhost:4000/api/posts/timeline/639dd730533cf053f2266c56')
//             // console.log(res)
//             await axios.get(`http://localhost:4000/api/posts/profile/${userId}`).then(res=>setPosts(res.data))
//         }
//         fetchPosts()
//     }, [userId])
//     return (
//         <div className='feed'>
//             <div className="feedWrapper">
//                 <Share />
//                 {posts.map(post => (<Post key={post._id} post={post} />))}
//             </div>
//         </div>
//     )
// }
import '../feed/feed.css'
import Share from '../share/Share'
import Post from '../post/Post'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'

export default function ProfileFeed({ username }) {
    const [posts, setPosts] = useState([])
    const [user, setUser] = useState({})

    const { user: loggedUser } = useContext(AuthContext)

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/profile/${username}`)
                const { user, posts } = await response.data
                setPosts(posts.sort((post1, post2) => {
                    return (new Date(post2.createdAt) - new Date(post1.createdAt))
                }))
                setUser(user)
                // await axios.get(`http://localhost:4000/api/posts/${userId}`).then(res => setPosts(res.data))

            } catch (error) {
                console.error(error)
            }
        }
        fetchPosts()
    }, [username])
    return (
        <div className='feed'>
            <div className="feedWrapper">
                {
                    loggedUser.username === username
                    && <Share />
                }
                {posts.map(post => (<Post key={post._id} post={post} />))}
            </div>
        </div>
    )
}
