const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const otpModel = require('../models/otp.model')
const otpTemplate = require('../template/otp.template')
const successTemplate = require('../template/success.template')
const cancelTemplate = require('../template/cancel.template')
const updateTemplate = require('../template/update.template')

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			},
		})
	}

	async sendOtpMail(email) {
		const otp = Math.floor(100000 + Math.random() * 900000).toString()

		const hashedOtp = await bcrypt.hash(otp.toString(), 10)
		await otpModel.deleteMany({ email })
		await otpModel.create({
			email,
			otp: hashedOtp,
			expiresAt: new Date(Date.now() + 10 * 60 * 1000),
		})
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: email,
			subject: `Otp for Verification ${new Date().toLocaleDateString()}`,
			html: otpTemplate(otp),
		})
	}

	async sendSuccessMail({ user, products }) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: user.email,
			subject: `Order confirmation ${new Date().toLocaleString()}`,
			html: successTemplate({ user, products }),
		})
	}

	async sendCancelMail({ user, products }) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: user.email,
			subject: `Order cancelled ${new Date().toLocaleString()}`,
			html: cancelTemplate({ user, products }),
		})
	}

	async sendUpdateMail({ user, products, status }) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to: user.email,
			subject: `Order updated ${new Date().toLocaleString()}`,
			html: updateTemplate({ user, products, status }),
		})
	}

	async verifyOtp(email, otp) {
		const record = await otpModel.find({ email })
		if (!record) return { failure: 'No OTP found for this email' }
		const lastRecord = record[record.length - 1]
		if (!lastRecord) return { failure: 'No OTP found for this email' }

		if (lastRecord.expiresAt < new Date()) {
			return { status: 301 }
		}

		const isValid = await bcrypt.compare(otp, lastRecord.otp)
		if (!isValid) {
			return { failure: 'Invalid OTP' }
		}

		await otpModel.delete

		return { status: 200 }
	}
}

module.exports = new MailService()
