const express = require('express')
const connectDb = require('./config/db')

const app = express()
// Connect db
connectDb()
app.use(express.json({ extended: false }))

app.use('/post', require('./router/post'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log('listening . . .'))
