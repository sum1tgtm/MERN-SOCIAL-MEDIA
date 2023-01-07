const router = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

// router.get('/', (req, res) => {
//     res.send('User route')
// })

//update user
router.put('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt = await bcrypt.genSalt(10)
                req.body.password = await bcrypt.hash(req.body.password, salt)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            res.status(200).json('Account has been updated')
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You can only update your account')
    }
})

//delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            // const user = await User.deleteOne({ _id: req.params.id })
            const user = await User.findByIdAndDelete(req.params.id)
            res.status(200).json('Account has been deleted successfully')
        } catch (err) {
            return res.status(500).json(err)
        }
    } else {
        return res.status(403).json('You can delete only your account')
    }
})

//get a user
router.get('/', async (req, res) => {
    const userId = req.query.userId
    const username = req.query.username
    try {
        const user = userId
            ? await User.findById(userId)
            : await User.findOne({ username: username })
        const { password, updatedAt, ...other } = user._doc   //_doc carries all object
        res.status(200).json(other)
    } catch (err) {
        return res.status(500).json(err)
    }
})

//unfollow a user
router.put('/:id/unfollow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $pull: {
                        followers: req.body.userId
                    }
                })
                await currentUser.updateOne({
                    $pull: {
                        followings: req.params.id
                    }
                })
                res.status(200).json("User unfollowed")
            } else {
                res.status(403).json('You are not following this user')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You cant unfollow yourself')
    }
})

//follow a user
router.put('/:id/follow', async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({
                    $push: {
                        followers: req.body.userId
                    }
                })
                await currentUser.updateOne({
                    $push: {
                        followings: req.params.id
                    }
                })
                res.status(200).json("User followed")
            } else {
                res.status(403).json('You already follow this user')
            }
        } catch (err) {
            res.status(500).json(err)
        }
    } else {
        res.status(403).json('You cant follow yourself')
    }
})

module.exports = router