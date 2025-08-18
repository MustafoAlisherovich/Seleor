import jwt from 'jsonwebtoken'

export const generateToken = async (userId: string) => {
	console.log(userId)
	const token = jwt.sign({ userId }, process.env.NEXT_PUBLIC_JWT_SECRET!, {
		expiresIn: '30s',
	})
	return token
}
