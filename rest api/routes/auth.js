const router = require('express').Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')

//register
router.post('/register', async (req, res) => {

    try {
        //it generates new hashed password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        //this creates new user
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            // password: req.body.password
        })

        //for saving user and respond
        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        // console.log(err)
        res.status(500).json(err)
    }
})



//login 
router.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(404).json('User Not Found')
        } else {
            const validPassword = await bcrypt.compare(req.body.password, user.password)
            if (!validPassword) {
                res.status(400).json('Wrong Password')
            } else {
                res.status(200).json(user)
            }
        }
    } catch (err) {
        // console.log(err)
        res.status(500).json(err)
    }
})

// router.post('/login', async (req,res)=>{
//     try{
//         const user = await User.findOne({email: req.body.email})
//         !user && res.status(404).json('User Not Found')

//         const validPassword = await bcrypt.compare(req.body.password, user.password)
//         !validPassword && res.status(400).json('Wrong Password')

//         res.status(200).json(user)
//     }catch(err){
//         // console.log(err)
//         res.status(500).json(err)
//     }
// })

module.exports = router