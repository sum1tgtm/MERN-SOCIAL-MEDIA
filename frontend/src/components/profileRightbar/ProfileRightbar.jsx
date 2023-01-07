import '../rightbar/rightbar.css'
import { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'
import { Link } from 'react-router-dom'
import { Add, Remove } from '@mui/icons-material'


export const ProfileRightbar = ({ user }) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [friends, setFriends] = useState([])
    const { user: loggedUser, dispatch } = useContext(AuthContext)

    const [followed, setFollowed] = useState(loggedUser.followings.includes(user?._id))

    // OK ILL IMPLEMENT FOLLOW AND UNFOLLOW AS SAME API REQUEST JUST AS LIKE/UNLIKE API PUT REQUEST // LATER

    // const [followed, setFollowed] = useState(false)

    // useEffect(() => {
    //     // console.log(user._id)
    //     // if (user._id) {
    //     // console.log(followed)
    //     setFollowed(loggedUser.followings.includes(user?._id))
    //     // console.log(followed)
    //     // }
    // }, [loggedUser, user])

    // console.log(followed)

    // useEffect(() => {
    //     setFollowed(loggedUser.followings.includes(user?._id))
    //     console.log(followed)
    // }, [loggedUser, user._id])

    // console.log(user)

    useEffect(() => {
        if (user._id) { //cant use user coz idk // maybe it comes as a promise or sth // but meanwhile id can be checked if its undefined // user prop comes from another api call in parent so that maybe the reason
            // console.log(user._id)
            // setFollowed(loggedUser.followings.includes(user._id))
            const getFriends = async () => {
                try {
                    const friendsList = await axios.get(`http://localhost:4000/api/profile/friends/${user._id}`)
                    setFriends(friendsList.data)
                } catch (err) {
                    console.log(err)
                }
            }
            getFriends()
        }
    }, [user])


    const handleClick = async () => {
        // console.log(`button: ${followed}`)
        try {
            if (followed) {
                await axios.put(`http://localhost:4000/api/users/${user._id}/unfollow`, { userId: loggedUser._id })
                dispatch({ type: "UNFOLLOW", payload: loggedUser._id })
                // setFollowed(false)
            } else {
                await axios.put(`http://localhost:4000/api/users/${user._id}/follow`, { userId: loggedUser._id })
                dispatch({ type: "FOLLOW", payload: loggedUser._id })
                // setFollowed(true)
            }
            // setFollowed(!followed) //idk this should work but the setFollowed after try-catch is doing atleast 50% this one 0%
            // console.log(`button: ${followed}`)
        } catch (err) {
            console.log(err)
        }
        // setFollowed(!followed)
        setFollowed(prev => !prev)
    }

    // const handleFollow = async () => {
    //     try {
    //         await axios.put(`http://localhost:4000/api/users/${user._id}/follow`, { userId: loggedUser._id })
    //         dispatch({ type: "FOLLOW", payload: loggedUser._id })
    //         setFollowed(true)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    // const handleUnfollow = async () => {
    //     try {
    //         await axios.put(`http://localhost:4000/api/users/${user._id}/unfollow`, { userId: loggedUser._id })
    //         dispatch({ type: "UNFOLLOW", payload: loggedUser._id })
    //         setFollowed(false)
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }


    return (
        <div className='rightbar'>
            <div className="rightbarWrappper">
                {loggedUser.username !== user.username && (
                    <button className="rightbarFollowButton" onClick={handleClick}>
                        {followed ? "Unfollow" : "Follow"}
                        {followed ? <Remove /> : <Add />}
                    </button>
                    // <>
                    //     {!followed &&
                    //         <button className="rightbarFollowButton" onClick={handleFollow}>
                    //             Follow <Add />
                    //         </button>
                    //     }
                    //     {followed &&
                    //         <button className="rightbarFollowButton" onClick={handleUnfollow}>
                    //             Unfollow <Remove />
                    //         </button>
                    //     }
                    // </>
                )}
                <h4 className="rightbarTitle">User Information</h4>
                <div className="rightbarInfo">
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">City:</span>
                        <span className="rightbarInfoValue">{user.city}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">From:</span>
                        <span className="rightbarInfoValue">{user.from}</span>
                    </div>
                    <div className="rightbarInfoItem">
                        <span className="rightbarInfoKey">Relationship:</span>
                        <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "Divorced"}</span>
                    </div>
                </div>
                <h4 className="rightbarTitle">User Friends</h4>
                <div className="rightbarFollowings">
                    {
                        friends.map(friend => (
                            <Link key={friend._id} to={`/profile/${friend.username}`} style={{ textDecoration: 'none' }}>
                                <div className="rightbarFollowing">
                                    <img src={friend.profilePicture ? `${PF}${friend.profilePicture}` : `${PF}person/noAvatar.png`} alt="" className="rightbarFollowingImg" />
                                    <span className="rightbarFollowingName">{friend.username}</span>
                                </div>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </div>

    )
}
