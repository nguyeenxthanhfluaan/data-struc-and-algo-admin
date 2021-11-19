const express = require('express')
const connectDb = require('./config/db')
const multiparty = require('connect-multiparty')
const cookieParser = require('cookie-parser')
const path = require('path')
const fs = require('fs')

const app = express()

const multipartMiddleware = multiparty({ uploadDir: './images' })

// Connect db
connectDb()

// Translate json
app.use(express.json({ extended: false }))
// Static file
app.use('/', express.static('uploads'))
app.use(cookieParser())

// route
app.use('/api/post', require('./routes/post'))
app.use('/api/category', require('./routes/category'))
app.use('/api/subject', require('./routes/subject'))
app.use('/api/type', require('./routes/type'))
app.use('/api/auth', require('./routes/auth'))

// Upload image
app.post('/img/upload', multipartMiddleware, (req, res) => {
	const tempFile = req.files.upload
	const tempPathFile = tempFile.path

	const targetPathUrl = path.join(__dirname, './uploads/' + tempFile.name)

	if (
		path.extname(tempFile.originalFilename).toLowerCase() === '.png' ||
		'.jpg' ||
		'.jpeg' ||
		'.gif'
	) {
		fs.rename(tempPathFile, targetPathUrl, (err) => {
			res.json({
				uploaded: true,
				url: `http://localhost:5000/${tempFile.originalFilename}`
			})
			if (err) console.log(err)
		})
	}
})

// listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`listening at port ${PORT}`))
