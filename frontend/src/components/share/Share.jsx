import './share.css'
import { PermMedia, Label, Room, EmojiEmotions, Cancel } from '@mui/icons-material';
import { useContext, useRef, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import axios from 'axios';
export default function Share() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const { user } = useContext(AuthContext)

    const desc = useRef()

    const [file, setFile] = useState(null)

    const submitHandler = async (e) => {
        e.preventDefault()
        const newPost = {
            userId: user._id,
            desc: desc.current.value,
        }
        if (file) {
            const formData = new FormData()
            const fileName = `${Date.now()}${file.name}`
            formData.append('name', fileName)
            formData.append('file', file)
            //changed the order of these 2 append methods coz it was coausing some error
            newPost.img = fileName // 'img' attrribute of posts in database
            // console.log(newPost)
            try {
                await axios.post('http://localhost:4000/api/upload', formData)
            } catch (err) {
                console.log(err)
            }
        }
        try {
            await axios.post('http://localhost:4000/api/posts/', newPost)
            window.location.reload() // refreshes the window after posting a new post
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img src={user.profilePicture ? `${PF}${user.profilePicture}` : `${PF}person/noAvatar.png`} alt="" className="shareProfileImg" />
                    <input placeholder={`Whats on your mind ${user.username} ?!`} className="shareInput" ref={desc} />
                </div>
                <hr className="shareHr" />
                {file && (
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        {/* allows use to create pseudo URL to see our file/image before uploading */}
                        <Cancel className='shareCancelImg' onClick={()=>setFile(null)} />
                        {/* to cancel/remove the uploaded image before posting */}
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor='file' className="shareOption">
                            <PermMedia htmlColor='tomato' className='shareIcon' />
                            <span className="shareOptionText">Photo or Video</span>
                            <input style={{ display: "none" }} type="file" id="file" accept='.png, .jpeg, .jpg' onChange={(e) => setFile(e.target.files[0])} />
                            {/* files[0] allows to upload only one file */}
                        </label>
                        <div className="shareOption">
                            <Label htmlColor='blue' className='shareIcon' />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor='green' className='shareIcon' />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor='goldenrod' className='shareIcon' />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button type='submit' className='shareButton'>Share</button>
                </form>
            </div>
        </div>
    )
}
