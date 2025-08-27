const { Schema, model, Types } = require('mongoose')

const orderSchema = new Schema(
	{
		user: { type: Types.ObjectId, ref: 'User', required: true },
		products: [
			{
				product: {
					type: Types.ObjectId,
					ref: 'Product',
					required: true,
				},
				quantity: { type: Number, required: true },
				price: { type: Number, required: true },
			},
		],
		status: { type: String, default: 'Pending confirm' },
	},
	{ timestamps: true }
)

module.exports = model('Order', orderSchema)
