'use server'

import { axiosClient } from '@/http/axios'
import { authOptions } from '@/lib/auth-options'
import { generateToken } from '@/lib/generate-token'
import { productSchema } from '@/lib/validation'
import { ReturnActionType } from '@/types'
import { getServerSession } from 'next-auth'
import { revalidatePath } from 'next/cache'
import { UTApi } from 'uploadthing/server'
import { actionClient } from './safe.action'

const utapi = new UTApi()

export const getProducts = actionClient.action(async () => {
	const session = await getServerSession(authOptions)
	if (!session?.currentUser?._id) {
		throw new Error('User ID is required to generate token')
	}
	const token = await generateToken(session.currentUser._id)
	const { data } = await axiosClient.get('/api/admin/products', {
		headers: { Authorization: `Bearer ${token}` },
	})

	return JSON.parse(JSON.stringify(data))
})

export const createProduct = actionClient
	.schema(productSchema)
	.action<ReturnActionType>(async ({ parsedInput }) => {
		const session = await getServerSession(authOptions)
		if (!session?.currentUser?._id) {
			throw new Error('User ID is required to generate token')
		}
		const token = await generateToken(session.currentUser._id)
		const { data } = await axiosClient.post(
			'/api/admin/create-product',
			{
				...parsedInput,
				price: parseFloat(parsedInput.price),
			},
			{ headers: { Authorization: `Bearer ${token}` } }
		)
		revalidatePath('/admin/products')
		return JSON.parse(JSON.stringify(data))
	})

export const deleteFile = async (key: string) => {
	await utapi.deleteFiles(key)
}
