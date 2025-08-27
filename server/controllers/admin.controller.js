const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const transactionModel = require('../models/transaction.model')
const userModel = require('../models/user.model')
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

class AdminController {
	constructor() {}

	// [GET] /admin/porudcts
	async getProducts(req, res, next) {
		try {
			const { searchQuery, filter, category, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize
			const query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&'
				)
				query.$or = [{ title: { $regex: new RegExp(escapedSearchQuery, 'i') } }]
			}

			if (category === 'All') query.category = { $exists: true }
			else if (category !== 'All') {
				if (category) query.category = category
			}

			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const products = await productModel
				.find(query)
				.sort(sortOptions)
				.skip(skipAmount)
				.limit(+pageSize)

			const totalProducts = await productModel.countDocuments(query)
			const isNext = totalProducts > skipAmount + +products.length

			return res.json({ products, isNext })
		} catch (error) {
			next(error)
		}
	}

	// [GET] /admin/customers
	async getCustomers(req, res, next) {
		try {
			const { searchQuery, filter, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize
			const query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&'
				)
				query.$or = [
					{ fullName: { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ email: { $regex: new RegExp(escapedSearchQuery, 'i') } },
				]
			}

			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const customers = await userModel.aggregate([
				{ $match: query },
				{
					$lookup: {
						from: 'orders',
						localField: '_id',
						foreignField: 'user',
						as: 'orders',
					},
				},
				{ $addFields: { orderCount: { $size: '$orders' } } },
				{ $unwind: { path: '$orders', preserveNullAndEmptyArrays: true } },
				{
					$unwind: {
						path: '$orders.products',
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$group: {
						_id: '$_id',
						email: { $first: '$email' },
						fullName: { $first: '$fullName' },
						role: { $first: '$role' },
						createdAt: { $first: '$createdAt' },
						updatedAt: { $first: '$updatedAt' },
						orderCount: { $first: '$orderCount' },
						isDeleted: { $first: '$isDeleted' },
						totalPrice: {
							$sum: {
								$multiply: [
									{ $ifNull: ['$orders.products.price', 0] },
									{ $ifNull: ['$orders.products.quantity', 0] },
								],
							},
						},
					},
				},
				{ $sort: sortOptions },
				{ $skip: skipAmount },
				{ $limit: +pageSize },
			])

			console.log(customers)

			const totalCustomers = await userModel.countDocuments(query)
			const isNext = totalCustomers > skipAmount + +customers.length

			return res.json({ customers, isNext })
		} catch (error) {
			next(error)
		}
	}

	// [GET] /admin/orders
	async getOrders(req, res, next) {
		try {
			const { searchQuery, filter, page, pageSize } = req.query
			const skipAmount = (+page - 1) * +pageSize
			const query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&'
				)
				query.$or = [
					{ 'user.fullName': { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ 'user.email': { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ 'products.title': { $regex: new RegExp(escapedSearchQuery, 'i') } },
				]
			}

			let sortOptions = { createdAt: -1 }
			if (filter === 'newest') sortOptions = { createdAt: -1 }
			else if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const orders = await orderModel.aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'user',
						foreignField: '_id',
						as: 'user',
					},
				},
				{ $unwind: '$user' },

				{
					$lookup: {
						from: 'products',
						localField: 'products.product',
						foreignField: '_id',
						as: 'productDocs',
					},
				},

				{
					$addFields: {
						products: {
							$map: {
								input: '$products',
								as: 'p',
								in: {
									quantity: '$$p.quantity',
									product: {
										$arrayElemAt: [
											{
												$filter: {
													input: '$productDocs',
													as: 'doc',
													cond: { $eq: ['$$doc._id', '$$p.product'] },
												},
											},
											0,
										],
									},
								},
							},
						},
					},
				},

				{ $project: { productDocs: 0 } },

				{ $match: query },
				{ $sort: sortOptions },
				{ $skip: skipAmount },
				{ $limit: +pageSize },

				{
					$project: {
						'user.fullName': 1,
						'user.email': 1,
						products: 1,
						status: 1,
						price: 1,
						createdAt: 1,
					},
				},
			])

			const totalOrders = await orderModel.countDocuments(query)
			const isNext = totalOrders > skipAmount + +orders.length

			return res.json({ orders, isNext })
		} catch (error) {
			next(error)
		}
	}

	// [GET] /admin/transactions
	async getTransactions(req, res, next) {
		try {
			const { searchQuery, filter, page = 1, pageSize = 10 } = req.query
			const skipAmount = (+page - 1) * +pageSize

			let query = {}

			if (searchQuery) {
				const escapedSearchQuery = searchQuery.replace(
					/[.*+?^${}()|[\]\\]/g,
					'\\$&'
				)
				query.$or = [
					{
						'usproductModeler.fullName': {
							$regex: new RegExp(escapedSearchQuery, 'i'),
						},
					},
					{ 'user.email': { $regex: new RegExp(escapedSearchQuery, 'i') } },
					{ 'product.title': { $regex: new RegExp(escapedSearchQuery, 'i') } },
				]
			}

			let sortOptions = { createdAt: -1 }
			if (filter === 'oldest') sortOptions = { createdAt: 1 }

			const transactions = await transactionModel.aggregate([
				{
					$lookup: {
						from: 'users',
						localField: 'user',
						foreignField: '_id',
						as: 'user',
					},
				},
				{ $unwind: '$user' },

				{
					$unwind: '$products',
				},
				{
					$lookup: {
						from: 'products',
						localField: 'products.product',
						foreignField: '_id',
						as: 'productDetails',
					},
				},
				{ $unwind: '$productDetails' },

				{
					$group: {
						_id: '$_id',
						user: {
							$first: { fullName: '$user.fullName', email: '$user.email' },
						},
						provider: { $first: '$provider' },
						state: { $first: '$state' },
						amount: { $first: '$amount' },
						createdAt: { $first: '$createdAt' },
						products: {
							$push: {
								title: '$productDetails.title',
								price: '$productDetails.price',
								quantity: '$products.quantity',
							},
						},
					},
				},

				query.$or ? { $match: query } : { $match: {} },

				{ $sort: sortOptions },
				{ $skip: skipAmount },
				{ $limit: Number(pageSize) },
			])

			console.log(JSON.stringify(transactions, null, 2))

			const totalTransactions = await transactionModel.countDocuments(query)
			const isNext = totalTransactions > skipAmount + +transactions.length

			return res.json({ transactions, isNext })
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
			const userId = req.user._id

			const newProduct = await productModel.create(req.body)

			const product = await stripe.products.create({
				name: newProduct.title,
				images: [newProduct.image],
				metadata: {
					productId: newProduct._id.toString(),
					userId: userId.toString(),
				},
			})

			const amountInUSD = newProduct.price
			const price = await stripe.prices.create({
				product: product.id,
				unit_amount: Math.round(amountInUSD * 100),
				currency: 'usd',
				metadata: {
					productId: newProduct._id.toString(),
					userId: userId.toString(),
				},
			})

			await productModel.findByIdAndUpdate(newProduct._id, {
				stripeProductId: product.id,
				stripePriceId: price.id,
			})

			if (!newProduct)
				return res.json({ failure: 'Failed while creating product' })

			return res.json({ status: 201 })
		} catch (error) {
			console.log(error)
			next(error)
		}
	}

	// [PUT] /admin/update-product/:id
	async updateProduct(req, res, next) {
		try {
			const data = req.body
			const { id } = req.params
			const userId = req.user._id
			const updatedProduct = await productModel.findByIdAndUpdate(id, data, {
				new: true,
			})
			const amountInUSD = updatedProduct.price
			const price = await stripe.prices.create({
				product: updatedProduct.stripeProductId,
				unit_amount: amountInUSD.toFixed(0) * 100,
				currency: 'usd',
				metadata: {
					productId: updatedProduct._id.toString(),
					userId: userId.toString(),
				},
			})
			await productModel.findByIdAndUpdate(updatedProduct._id, {
				stripePriceId: price.id,
			})
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}

	// [DELETE] /admin/delete-product/:id
	async deleteProduct(req, res, next) {
		try {
			const { id } = req.params
			const product = await productModel.findById(id)
			await stripe.prices.update(product.stripePriceId, { active: false })
			await stripe.products.update(product.stripeProductId, { active: false })
			await productModel.findByIdAndDelete(id)
			return res.json({ status: 200 })
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new AdminController()
