const express = require('express')
const connectDb = require('./config/db')

const app = express()
// Connect db
connectDb()
// Translate json
app.use(express.json({ extended: false }))



// route
app.use('/api/post', require('./router/post'))
app.use('/api/category', require('./router/category'))
app.use('/api/subject', require('./router/subject'))
app.use('/api/type', require('./router/type'))

// listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('listening . . .'))
