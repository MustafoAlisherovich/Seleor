require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()

// Middleware
app.use(express.json())
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api', require('./routes/index'))

const bootstrap = async () => {
	try {
		const PORT = process.env.PORT || 5000
		mongoose
			.connect(process.env.MONGO_URI)
			.then(() => console.log('MongoDB connected successfully'))
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`)
		})
	} catch (error) {
		console.log('Error connecting Mongodb:', error)
	}
}

bootstrap()
