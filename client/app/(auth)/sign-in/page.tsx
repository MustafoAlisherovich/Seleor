'use client'

import { login } from '@/actions/auth.action'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

function Page() {
	const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	})

	function onError(message: string) {
		toast.error(message)
		setLoading(false)
	}

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		setLoading(true)
		const res = await login(values)
		console.log(res)

		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data?.failure) {
			return onError(res.data.failure)
		}
		if (res.data?.user) {
			toast.success('Login successful')
			signIn('credentials', { userId: res.data.user._id, callbackUrl: '/' })
			setLoading(false)
		}
	}

	return (
		<Card className='w-[40vw] p-4 mx-auto shadow-lg'>
			<h1 className='text-xl font-bold'>Sign-In</h1>
			<p className='text-sm text-muted-foreground'>
				Welcome back! Please sign in your account
			</p>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>Email</Label>
								<FormControl>
									<Input
										placeholder='example@gmail.com'
										{...field}
										disabled={loading}
									/>
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label className='mt-4'>Password</Label>
								<FormControl>
									<Input
										placeholder='****'
										type='password'
										{...field}
										disabled={loading}
									/>
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full mt-4' disabled={loading}>
						Submit {loading && <Loader className='animate-spin' />}
					</Button>
				</form>
			</Form>

			<div className='mt-4'>
				<div className='text-sm text-muted-foreground'>
					Don&apos;t have an account?{' '}
					<Button asChild variant={'link'} className='p-0'>
						<Link href='/sign-up'>Sign up</Link>
					</Button>
				</div>
			</div>
		</Card>
	)
}

export default Page
