const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const helmet = require('helmet')
const morgan = require('morgan')
const multer = require('multer')
const path = require('path')
// const router = require('express').Router()

const userRoute = require('./routes/users')
const authRoute = require('./routes/auth')
const postRoute = require('./routes/posts')
const profileRoute = require('./routes/profile')
const app = express()


const cors = require('cors');
const corsOptions = {
    // origin: 'http://localhost:3000',
    origin: '*',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));
// app.use(cors());



dotenv.config()

mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGO_URL, () => {
    console.log('Connected to MongoDB')
});

// router.use('/', router);a

// app.use(
//     express.urlencoded({ extended: true })
// );

app.use('/images', express.static(path.join(__dirname, 'public/images')))
// if we use localhost:4000/images path in url, then instead of making normal 'get' request it goes to the directory path

//middlewares
app.use(express.json())
app.use(helmet())
app.use(morgan('common'))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name) //it means we are sending this 'name' to the frontend react app
        // cb(null, file.originalname)
    }
})

const upload = multer({ storage })
app.post('/api/upload', upload.single('file'), (req, res) => {
    try {
        return res.status(200).json('File Uploaded Successfully')
    } catch (err) {
        console.log(err)
    }
})



app.use('/api/users', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/profile', profileRoute)

app.get('/', (req, res) => {
    res.send('Helo')
})

app.listen(4000, () => {
    console.log('Listening on port 4000')
})
