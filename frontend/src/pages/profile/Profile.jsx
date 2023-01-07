import './profile.css'
import ProfileFeed from '../../components/profileFeed/ProfileFeed'
// import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

// export default function Profile() {
//     const PF = process.env.REACT_APP_PUBLIC_FOLDER

//     return (
//         <>
//             <Topbar />
//             <div className="profile">x  
//                 <Sidebar />
//                 <div className="profileRight">
//                     <div className="profileRightTop">
//                         <div className="profileCover">
//                             <img src={`${PF}post/5.jpeg`} alt="" className="profileCoverImg" />
//                             <img src={`${PF}person/1.jpeg`} alt="" className="profileUserImg" />
//                         </div>
//                     </div>
//                     <div className="profileInfo">
//                         <h4 className="profileInfoName">Sumit Gautam</h4>
//                         <span className="profileInfoDesc">Allo guys elle giggle</span>
//                     </div>
//                     <div className="profileRightBottom">
//                         <ProfileFeed userId='639dd3a231ef41f70e518537' />
//                         <Rightbar profile />
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ProfileRightbar } from '../../components/profileRightbar/ProfileRightbar';

export default function Profile() {
    const { username } = useParams()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const [user, setUser] = useState({})
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`http://localhost:4000/api/users?username=${username}`)
            setUser(res.data)
        }
        fetchUser()
    }, [username])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img src={user.coverPicture ? `${PF}${user.coverPicture}` : `${PF}person/noCover.png`} alt="" className="profileCoverImg" />
                            <img src={user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}person/noAvatar.png`} alt="" className="profileUserImg" />
                        </div>
                    </div>
                    <div className="profileInfo">
                        <h4 className="profileInfoName">{user.username}</h4>
                        <span className="profileInfoDesc">{user.desc}</span>
                    </div>
                    <div className="profileRightBottom">
                        <ProfileFeed username={username} />
                        <ProfileRightbar user={user} />
                    </div>
                </div>
            </div>
        </>
    )
}