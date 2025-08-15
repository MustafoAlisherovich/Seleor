const productModel = require('../models/product.model')
const userModel = require('../models/user.model')

class AdminController {
	constructor() {
		this.userId = '689efa151051c1578aeb243e'
		this.createProduct = this.createProduct.bind(this)
		this.updateProduct = this.updateProduct.bind(this)
		this.getProducts = this.getProducts.bind(this)
		this.deleteProduct = this.deleteProduct.bind(this)
	}
	// [GET] /admin/porudcts
	async getProducts(req, res, next) {
		const userId = this.userId
		const user = await userModel.findById(userId)
		if (!user) return res.json({ message: 'User not found' })
		if (user.role !== 'admin') return res.json({ message: 'User not admin' })
		const products = await productModel.find()
		return res.json({ success: 'Get products successfully', products })
	}

	// [POST] /admin/create-product
	async createProduct(req, res, next) {
		try {
			const data = req.body
			const userId = this.userId
			const user = await userModel.findById(userId)
			if (!user) {
				return res.json({ message: 'User not found' })
			}
			if (user.role !== 'admin') {
				return res.json({ message: 'User not admin' })
			}
			const newProduct = await productModel.create(data)
			if (!newProduct) {
				return res.json({ message: 'Product creation failed' })
			}
			return res.json({ message: 'Product created successfully' })
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
