const express = require('express')
const connectDb = require('./config/db')
const multiparty = require('connect-multiparty')
const cookieParser = require('cookie-parser')
const { cloudinary } = require('./config/cloudinary')
const path = require('path')
const fs = require('fs')

const app = express()

const multipartMiddleware = multiparty({ uploadDir: './images' })

// Connect db
connectDb()

// Translate json
app.use(express.json({ limit: '50mb' }))
// Static file
app.use('/upload', express.static('uploads'))
app.use(cookieParser())

// route
app.use('/api/post', require('./routes/post'))
app.use('/api/category', require('./routes/category'))
app.use('/api/subject', require('./routes/subject'))
app.use('/api/type', require('./routes/type'))
app.use('/api/auth', require('./routes/auth'))

// Upload image
app.post('/img/upload', multipartMiddleware, async (req, res) => {
	try {
		const pathFile = req.files.upload.path
		const uploadRes = await cloudinary.uploader.upload(pathFile, {
			upload_preset: 'ml_default',
		})
		fs.unlink(path)
		res.json({
			uploaded: true,
			url: `${uploadRes.url}`,
		})
	} catch (error) {
		console.log(error)
		res.sendStatus(500)
	}
})

// Hosting
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'))
	app.get('*', (req, res) => {
		console.log(__dirname)
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	})
}

// listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`listening at port ${PORT}`))
