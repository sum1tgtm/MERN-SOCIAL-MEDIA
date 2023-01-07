const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')

//get a user and the user's all posts for user's profile page
router.get('/:username', async (req, res) => {
    // const userId = req.query.userId
    // const username = req.query.username
    try {
        // const user = await User.findById(req.params.userId)
        const user = await User.findOne({ username: req.params.username })
        // const user = userId
        //     ? await User.findById(userId)
        //     : await User.findOne({ username: req.params.username })
        const posts = await Post.find({ userId: user._id })
        res.status(200).json({ user, posts })
    } catch (err) {
        return res.status(500).json(err)
    }
})

//get friends
router.get('/friends/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId)
        const friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )
        let friendList = []
        friends.map(friend => {
            const { _id, username, profilePicture } = friend
            friendList.push({
                _id: _id,
                username: username,
                profilePicture: profilePicture
            })
        })
        // console.log(friends)
        // console.log(friendList)
        res.status(200).json(friendList)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router