import './post.css'
import { MoreVert } from '@mui/icons-material';
// import { Users } from '../../userData'
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { format } from 'timeago.js'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export default function Post({ post }) {
    // const user = Users.filter(x => x.id === post.userId)[0]
    const [user, setUser] = useState({})

    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const { user: loggedUser } = useContext(AuthContext) //coz of variable name conflict 'user' is called as 'loggedUser' -> nickname


    const PF = process.env.REACT_APP_PUBLIC_FOLDER  //PF -> public folder

    useEffect(() => {
        setIsLiked(post.likes.includes(loggedUser._id))
    }, [loggedUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:4000/api/users?userId=${post.userId}`) //BTW it took me 2 days to solve the problem that was here
            // const res = await axios.get(`users/${post.userId}`) and this was the problem also CORS had its hand in it
            // console.log(res)
            setUser(res.data)
        }
        fetchUser()
    }, [post.userId])

    const likeHandler = async () => {
        try {
            await axios.put(`http://localhost:4000/api/posts/${post._id}/like`, { userId: loggedUser._id })
        } catch (err) {
            console.log(err)
        }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(prev => !prev)
    }

    return (
        <div className='post'>
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        {/* <Link to={`/profile/${user._id}`} >
                            <img src={user.profilePicture || `${PF}person/noAvatar.png`} alt="" className="postProfileImg" />
                            <img src={`${PF}person/noAvatar.png`} alt="" className="postProfileImg" />
                        </Link> */}
                        {/* <Link to={`/profile/${user ? user._id : ''}`} >
                            <img src={`${PF}person/noAvatar.png`} alt="" className="postProfileImg" />
                        </Link> */}
                        <Link to={`/profile/${user.username}`} >
                            {/* <Link to={`/profile/${user ? user.username : ''}`} > */}
                            <img src={user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}person/noAvatar.png`} alt="" className="postProfileImg" />
                        </Link>
                        <span className="postUsername">{user.username}</span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img src={PF + post.img} alt="" className="postImg" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img src={`${PF}like.png`} onClick={likeHandler} alt="" className='likeIcon' />
                        <img src={`${PF}heart.png`} onClick={likeHandler} alt="" className='likeIcon' />
                        <span className="postLikeCounter">{like} people like it!</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
