import './topbar.css'
import { Search, Person, Chat, Notifications, Logout } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { logoutCall } from '../../apiCalls'

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext)
  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  const handleClick = () => { //logout
    logoutCall(
      // dispatch({ type: "LOGOUT" })
      logoutCall(dispatch)
    )
    // localStorage.clear()
    // localStorage.setItem("user", null)
  }

  // const handleClick = () => {
  //   localStorage.clear();
  //   // window.location.reload();
  // };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to='/' style={{ textDecoration: 'none' }}>
          <span className="logo">Sum1tbook</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className='searchIcon' />
          <input placeholder='Search for friend or post' className="searchInput" />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink"><Link to={`/profile/ram`}>Homepage</Link></span>
          <span className="topbarLink"><Link to={`/profile/shyam`}>Timeline</Link></span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img src={
            user.profilePicture
              ? `${PF + user.profilePicture}`
              : `${PF}person/noAvatar.png`
          }
            alt="" className="topbarImg" />
        </Link>

        <span className="topbarLink" onClick={handleClick}><Logout /></span>
        {/* logout */}

      </div>
    </div>
  )
}
