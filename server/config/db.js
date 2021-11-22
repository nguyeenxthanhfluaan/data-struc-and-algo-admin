const mongoose = require('mongoose')

const mongoURI =
	'mongodb+srv://user:algo_pass@cluster0.e7kbo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

const connectDb = async () => {
	try {
		await mongoose.connect(mongoURI, { useNewUrlParser: true })
		console.log('mongodb connecting . . .')
	} catch (err) {
		console.log(err)
		process.exit(1)
	}
}

module.exports = connectDb
