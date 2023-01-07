const router = require('express').Router()
const Post = require('../models/Post')
const User = require('../models/User')
// router.get('/',(req,res)=>{
//     console.log('ksadfklasdf')
// })

//create a new post
router.post('/', async (req, res) => {
    const newPost = new Post(req.body)
    try {
        const savedPost = await newPost.save()
        res.status(200).json(savedPost)
    } catch (err) {
        res.status(500).json(err)
    }
})

//update post
router.put('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("The post is updated successfully")
        } else {
            res.status(403).json("You can update only your post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (post.userId === req.body.userId) {
            await post.deleteOne()
            res.status(200).json("The post is deleted successfully")
        } else {
            res.status(403).json("You can only delete your own post")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//like or dislike a post
router.put('/:id/like', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            // for like
            await post.updateOne({
                $push: {
                    likes: req.body.userId
                }
            })
            res.status(200).json("Post liked successfully")
        } else {
            // for dislike
            await post.updateOne({
                $pull: {
                    likes: req.body.userId
                }
            })
            res.status(200).json("Post disliked successfully")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

//get a post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        // console.log(post.userId)
        res.status(200).json(post)
    } catch (err) {
        res.status(500).json(err)
    }
})

//get timeline posts - get posts of following users only
// router.get('/timeline/all', async (req, res) => {  //had to user 'timeline/all' because it was conficting (taking 'timline' string as id and doing the 'get a post' action)
//     try {
//         const currentUser = await User.findById(req.body.userId)
//         // console.log(currentUser)
//         const userPosts = await Post.find({ userId: currentUser._id }) //find all posts of current user | idk what '._id' does
//         const friendPosts = await Promise.all(  // ok ._id is property of currentUser object, i forgot currentUser is an object here
//             currentUser.followings.map(friendId => { // so its comparing userId property of Posts with '_id' property of currentUser 
//                 return Post.find({ userId: friendId })
//             })
//         ) //if we are using any loop we should use Promise otherwise its not gonna fetch all data
//         res.status(200).json(userPosts.concat(...friendPosts))
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

//get timeline posts
router.get('/timeline/:userId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const userPosts = await Post.find({ userId: currentUser._id })
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId => {
                return Post.find({ userId: friendId })
            })
        )
        res.status(200).json(userPosts.concat(...friendPosts))
    } catch (err) {
        res.status(500).json(err)
    }
})


//get user's all posts
// router.get('/profile/:userId', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.userId)
//         const posts = await Post.find({ userId: user._id })
//         res.status(200).json(posts)
//     } catch (err) {
//         return res.status(500).json(err)
//     }
// })


module.exports = router