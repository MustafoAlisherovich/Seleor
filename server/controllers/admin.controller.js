const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const transactionModel = require('../models/transaction.model')
const userModel = require('../models/user.model')

class AdminController {
	constructor() {
		this.userId = '689efa151051c1578aeb243e'
		this.createProduct = this.createProduct.bind(this)
		this.updateProduct = this.updateProduct.bind(this)
		this.getProducts = this.getProducts.bind(this)
		this.deleteProduct = this.deleteProduct.bind(this)
		this.getCustomers = this.getCustomers.bind(this)
		this.getOrders = this.getOrders.bind(this)
		this.getTransactions = this.getTransactions.bind(this)
		this.updateOrder = this.updateOrder.bind(this)
	}
	// [GET] /admin/porudcts
	async getProducts(req, res, next) {
		try {
			const products = await productModel.find()
			return res.json({ products })
		} catch (error) {
			next(error)
		}
	}

	// [GET] /admin/customers
	async getCustomers(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ message: 'User not found' })
			if (user.role !== 'admin') return res.json({ message: 'User not admin' })
			const customers = await userModel.find({ role: 'user' })
			return res.json({ success: 'Get customers successfully', customers })
		} catch (error) {
			next(error)
		}
	}

	// [GET] /admin/orders
	async getOrders(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ message: 'User not found' })
			if (user.role !== 'admin') return res.json({ message: 'User not admin' })
			const orders = await orderModel.find()
			return res.json({ success: 'Get orders successfully', orders })
		} catch (error) {
			next(error)
		}
	}

	// [GET] /admin/transactions
	async getTransactions(req, res, next) {
		try {
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ message: 'User not found' })
			if (user.role !== 'admin') return res.json({ message: 'User not admin' })
			const transactions = await transactionModel.find()
			return res.json({
				success: 'Get transactions successfully',
				transactions,
			})
		} catch (error) {
			next(error)
		}
	}

	// [PUT] /admin/update-order/:id
	async updateOrder(req, res, next) {
		try {
			const { id } = req.params
			const { status } = req.body
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) return res.json({ message: 'User not found' })
			if (user.role !== 'admin') return res.json({ message: 'User not admin' })
			const updatedOrder = await orderModel.findByIdAndUpdate(id, { status })
			if (!updatedOrder) return res.json({ message: 'Order update failed' })
			return res.json({ message: 'Order updated successfully' })
		} catch (error) {
			next(error)
		}
	}

	// [POST] /admin/create-product
	async createProduct(req, res, next) {
		try {
			const newProduct = await productModel.create(req.body)
			if (!newProduct) {
				return res.json({ message: 'Product creation failed' })
			}
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}

	// [PUT] /admin/update-product/:id
	async updateProduct(req, res, next) {
		try {
			const data = req.body
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) {
				return res.json({ message: 'User not found' })
			}
			if (user.role !== 'admin') {
				return res.json({ message: 'User not admin' })
			}
			const updatedProduct = await productModel.findByIdAndUpdate(id, data)
			if (!updatedProduct) {
				return res.json({ message: 'Product update failed' })
			}
			return res.json({ message: 'Product updated successfully' })
		} catch (error) {
			next(error)
		}
	}

	// [DELETE] /admin/delete-product/:id
	async deleteProduct(req, res, next) {
		try {
			const { id } = req.params
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) {
				return res.json({ message: 'User not found' })
			}
			if (user.role !== 'admin') {
				return res.json({ message: 'User not admin' })
			}
			const deletedProduct = await productModel.findByIdAndDelete(id)
			if (!deletedProduct) {
				return res.json({ message: 'Product deletion failed' })
			}
			return res.json({ message: 'Product deleted successfully' })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AdminController()
