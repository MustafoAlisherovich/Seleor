const { Schema, model } = require('mongoose')

const transactionSchema = new Schema(
	{
		user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		products: [
			{
				product: {
					type: Schema.Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: { type: Number, required: true },
			},
		],
		amount: { type: Number, required: true },
		state: { type: Number, default: 1 },
		provider: { type: String, default: 'stripe' },
		stripeSessionId: { type: String, required: true },
		stripePaymentIntentId: { type: String },
	},
	{ timestamps: true }
)

module.exports = model('Transaction', transactionSchema)
