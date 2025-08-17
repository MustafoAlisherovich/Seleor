const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const otpModel = require('../models/otp.model')

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
		console.log(`Generated OTP: ${otp}`)

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
			html: `<!doctype html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <title>OTP Verification</title>
    <!-- Invisible preheader -->
    <style>
      .preheader { display:none!important; visibility:hidden; opacity:0; color:transparent; height:0; width:0; overflow:hidden; mso-hide:all; }
      a { text-decoration:none; }
    </style>
  </head>
  <body style="margin:0; padding:0; background:#f3f6fb;">
    <div class="preheader">Your one-time verification code: ${otp}</div>

    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#f3f6fb;">
      <tr>
        <td align="center" style="padding:24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px; background:#ffffff; border-radius:12px; box-shadow:0 4px 18px rgba(0,0,0,0.06); overflow:hidden;">
            <!-- Header -->
            <tr>
              <td style="background:#0d6efd; padding:16px 24px;" align="left">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="left" style="font:600 18px/1.2 -apple-system,Segoe UI,Roboto,Arial,sans-serif; color:#ffffff;">
                     Seleor
                    </td>
                    <td align="right" style="font:400 12px/1.2 -apple-system,Segoe UI,Roboto,Arial,sans-serif; color:#dbe7ff;">
                      Secure Sign-In
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:28px 24px 8px 24px; font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif; color:#111827;">
                <h1 style="margin:0 0 8px; font-size:22px; line-height:1.3; font-weight:700; color:#0b5ed7;">
                  Verification Code
                </h1>
                <p style="margin:0 0 16px; font-size:15px; line-height:1.6; color:#374151;">
                  Hi! Use the one-time code below to verify your sign-in.
                  This code is valid for 10&nbsp;minutes.
                </p>

                <!-- OTP Box -->
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:12px auto 4px;">
                  <tr>
                    <td style="
                      font:700 28px/1 -apple-system,Segoe UI,Roboto,Arial,sans-serif;
                      letter-spacing:4px;
                      color:#0d6efd;
                      background:#eff5ff;
                      border:1px solid #cfe2ff;
                      border-radius:10px;
                      padding:16px 20px;
                      text-align:center;
                    ">
                      ${otp}
                    </td>
                  </tr>
                </table>

                <p style="margin:16px 0 0; font-size:13px; color:#6b7280;" align="center">
                  Copy the code and paste it into the verification screen on the site.
                </p>

                <p style="margin:20px 0 0; font-size:12px; line-height:1.6; color:#6b7280;">
                  If you didn’t request this, you can safely ignore this email.
                  For security, never share your code with anyone.
                </p>
              </td>
            </tr>

            <!-- Divider -->
            <tr>
              <td style="padding:0 24px;">
                <hr style="border:none; border-top:1px solid #eef2f7; margin:8px 0 0;" />
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="padding:14px 24px 24px; font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif; color:#6b7280; font-size:12px;">
                © ${new Date().getFullYear()} Seleor • Please do not reply to this email
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`,
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
