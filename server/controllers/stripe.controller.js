const { TransactionState } = require('../enum/transaction.enum')
const orderModel = require('../models/order.model')
const productModel = require('../models/product.model')
const transactionModel = require('../models/transaction.model')
const userModel = require('../models/user.model')
const mailService = require('../services/mail.service')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

class StripeController {
	async webhook(req, res, next) {
		try {
			let data
			let eventType
			let event
			const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

			if (webhookSecret) {
				const signature = req.headers['stripe-signature']

				try {
					event = stripe.webhooks.constructEvent(
						req.body,
						signature,
						webhookSecret
					)
				} catch (err) {
					console.error('Webhook signature verification failed:', err.message)
					return res.status(400).send(`Webhook Error: ${err.message}`)
				}

				data = event.data.object
				eventType = event.type
			} else {
				data = req.body.data.object
				eventType = req.body.type
				event = req.body
			}

			if (eventType === 'payment_intent.payment_failed') {
				const intent = data
				const cart = JSON.parse(intent.metadata.cart)
				const user = await userModel.findById(intent.metadata.userId)

				await transactionModel.create({
					user: intent.metadata.userId,
					products: cart.map(item => ({
						product: item.productId,
						quantity: item.quantity,
					})),
					amount: intent.amount_received / 100,
					state: TransactionState.PaidCanceled,
					provider: 'stripe',
					stripeSessionId: intent.id,
					stripePaymentIntentId: intent.payment_intent,
				})
				const products = await Promise.all(
					cart.map(async item => {
						const productDoc = await productModel.findById(item.productId)
						return {
							title: productDoc.title,
							image: productDoc.image,
							quantity: item.quantity,
							price: item.price,
						}
					})
				)
				await mailService.sendCancelMail({ user, products })
			}

			if (eventType === 'payment_intent.succeeded') {
				const intent = data
				const cart = JSON.parse(intent.metadata.cart)

				const user = await userModel.findById(intent.metadata.userId)

				await orderModel.create({
					user: intent.metadata.userId,
					products: cart.map(item => ({
						product: item.productId,
						quantity: item.quantity,
						price: item.price,
					})),
				})

				await transactionModel.create({
					user: intent.metadata.userId,
					products: cart.map(item => ({
						product: item.productId,
						quantity: item.quantity,
					})),
					amount: intent.amount_received / 100,
					state: TransactionState.Paid,
					provider: 'stripe',
					stripeSessionId: intent.id,
					stripePaymentIntentId: intent.payment_intent,
				})
				const products = await Promise.all(
					cart.map(async item => {
						const productDoc = await productModel.findById(item.productId)
						return {
							title: productDoc.title,
							image: productDoc.image,
							quantity: item.quantity,
							price: item.price,
						}
					})
				)
				await mailService.sendSuccessMail({ user, products })
			}

			return res.status(200).end()
		} catch (error) {
			next(error)
		}
	}
}

module.exports = new StripeController()
