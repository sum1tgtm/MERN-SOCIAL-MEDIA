import './rightbar.css'
import { Users } from '../../userData'
import Online from '../online/Online'


export default function Rightbar() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER
  // const [friends, setFriends] = useState([])
  // const { user: loggedUser, dispatch } = useContext(AuthContext)

  // useEffect(() => {
  //   if (user) {
  //     console.log(user._id)
  //     const getFriends = async () => {
  //       try {
  //         const friendsList = await axios.get(`http://localhost:4000/api/profile/friends/${user._id}`)
  //         setFriends(friendsList.data)
  //       } catch (err) {
  //         console.log(err)
  //       }
  //     }
  //     getFriends()
  //   }
  // }, [])

  // const HomeRightBar = () => {
  //   return (
  //     <>
  //       <div className="birthdayContainer">
  //         <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
  //         <span className="birthdayText">
  //           <b>Sagar, Kisne</b> and <b>6 other friends</b> have birthday today.
  //         </span>
  //       </div>
  //       <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
  //       <h4 className="rightbarTitle">Online Friends</h4>
  //       <ul className="rightbarFriendList">
  //         {Users.map(user => <Online key={user.id} user={user} />)}
  //       </ul>
  //     </>
  //   )
  // }

  // const ProfileRightBar = () => {
  //   return (
  //     <>
  //       <h4 className="rightbarTitle">User Information</h4>
  //       <div className="rightbarInfo">
  //         <div className="rightbarInfoItem">
  //           <span className="rightbarInfoKey">City:</span>
  //           <span className="rightbarInfoValue">{user.city}</span>
  //         </div>
  //         <div className="rightbarInfoItem">
  //           <span className="rightbarInfoKey">From:</span>
  //           <span className="rightbarInfoValue">{user.from}</span>
  //         </div>
  //         <div className="rightbarInfoItem">
  //           <span className="rightbarInfoKey">Relationship:</span>
  //           <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "Divorced"}</span>
  //         </div>
  //       </div>
  //       <h4 className="rightbarTitle">User Friends</h4>
  //       <div className="rightbarFollowings">
  //         {
  //           friends.map(friend => (
  //             <div key={friend._id} className="rightbarFollowing">
  //               <img src={friend.profilePicture ? `${PF}${friend.profilePicture}` : `${PF}person/noAvatar.png`} alt="" className="rightbarFollowingImg" />
  //               <span className="rightbarFollowingName">{friend.username}</span>
  //             </div>
  //           ))
  //         }
  //       </div>
  //     </>
  //   )
  // }

  return (
    <div className='rightbar'>
      <div className="rightbarWrappper">
        {/* {user ? <ProfileRightBar /> : <HomeRightBar />} */}
        <div className="birthdayContainer">
          <img src={`${PF}gift.png`} alt="" className="birthdayImg" />
          <span className="birthdayText">
            <b>Sagar, Kisne</b> and <b>6 other friends</b> have birthday today.
          </span>
        </div>
        <img src={`${PF}ad.png`} alt="" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map(user => <Online key={user.id} user={user} />)}
        </ul>
      </div>
    </div>
  )
}
