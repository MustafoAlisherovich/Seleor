const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const transactionModel = require('../models/transaction.model')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')

class UserController {
	// [GET] /user/products
	async getProducts(req, res, next) {
		try {
			const products = await productModel.find()
			res.json(pruducts)
		} catch (error) {
			next(error)
		}
	}
	// [GET] /user/product/:id
	async getProduct(req, res, next) {
		try {
			const product = await productModel.findById(req.params.id)
		} catch (error) {
			next(error)
		}
	}

	// GET /user/profile/:id
	async getProfile(req, res, next) {
		try {
			const profile = await userModel.findById(req.params.id)
			return res.json(profile)
		} catch (error) {
			next(error)
		}
	}

	// [GET] /user/orders
	async getOrders(req, res, next) {
		try {
			const userId = '689efa151051c1578aeb243e'
			const orders = await orderModel.find({ user: userId })
			return res.json(orders)
		} catch (error) {
			next(error)
		}
	}

	// [GET] /user/transactions
	async getTransactions(req, res, next) {
		try {
			const userId = '689efa151051c1578aeb243e'
			const transactions = await transactionModel.find({ user: userId })
			return res.json(transactions)
		} catch (error) {
			next(error)
		}
	}

	// [GET] /user/favorites
	async getFavorites(req, res, next) {
		try {
			const userId = '689efa151051c1578aeb243e'
			const user = await userModel.findById(userId).populate('favorites')
		} catch (error) {
			next(error)
		}
	}

	// [GET] /user/statistics
	async getStatistics(req, res, next) {
		try {
			const userId = '689efa151051c1578aeb243e'
			const user = await userModel.findById(userId)
			const totalOrders = await orderModel.countDocuments({ user: userId })
			const totalTransactions = await transactionModel.countDocuments({
				user: userId,
			})
			const totalFavorites = user.favorites.length
			return res.json({ totalOrders, totalTransactions, totalFavorites })
		} catch (error) {
			next(error)
		}
	}

	// [POST] /user/add-favorite
	async addFavorite(req, res, next) {
		try {
			const { productId } = req.body
			const userId = '689efa151051c1578aeb243e'
			const user = await userModel.findById(userId)
			user.favorites.push(productId)
			await user.save()
			return res.json(user)
		} catch (error) {
			next(error)
		}
	}

	// [PUT] /user/update-profile
	async updateProfile(req, res, next) {
		try {
			const { name, email } = req.body
			const userId = '689efa151051c1578aeb243e'
			const user = await userModel.findById(userId)
			user.set(req.body)
			await user.save()
			return res.json(user)
		} catch (error) {
			next(error)
		}
	}

	// [PUT] /user/update-password
	async updatePassword(req, res, next) {
		try {
			const { oldPassword, newPassword } = req.body
			const userId = '689efa151051c1578aeb243e'
			const user = await userModel.findById(userId)
			const isMatch = await bcrypt.compare(oldPassword, user.password)
			if (!isMatch)
				return res.status(400).json({ message: 'Old password is incorrect' })
			const hashedPassword = await bcrypt.hash(newPassword, 10)
			await userModel.findByIdAndUpdate(userId, { password: hashedPassword })
			await user.save()
			return res.json({ message: 'Password updated successfully' })
		} catch (error) {
			next(error)
		}
	}

	// [DELETE] /user/delete-favorite/:id
	async deleteFavorite(req, res, next) {
		try {
			const { id } = req.params
			const userId = '689efa151051c1578aeb243e'
			const user = await userModel.findById(userId)
			user.favorites.pull(id)
			await user.save()
			return res.json({ message: 'Favorite deleted successfully' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new UserController()
