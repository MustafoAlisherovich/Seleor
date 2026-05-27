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
import UseAction from '@/hooks/use-action'
import { loginSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

function Page() {
	const { isLoading, setIsLoading, onError } = UseAction()

	const form = useForm<z.infer<typeof loginSchema>>({
		resolver: zodResolver(loginSchema),
		defaultValues: { email: '', password: '' },
	})

	async function onSubmit(values: z.infer<typeof loginSchema>) {
		setIsLoading(true)
		const res = await login(values)

		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data?.failure) {
			return onError(res.data.failure)
		}
		if (res.data?.user) {
			toast.success('Login Successfull')
			signIn('credentials', { userId: res.data?.user._id, callbackUrl: '/' })
			setIsLoading(false)
		}
	}

	return (
		<Card className='mx-auto w-full max-w-xl p-5 sm:p-7 md:p-8'>
			<div className='space-y-2'>
				<p className='text-xs font-semibold uppercase text-primary'>
					Welcome back
				</p>
				<h1 className='text-2xl font-bold tracking-tight sm:text-3xl'>Sign in</h1>
				<p className='text-sm leading-6 text-muted-foreground'>
					Access your account and continue shopping with the refreshed
					experience.
				</p>
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<Label>Email</Label>
								<FormControl>
									<Input
										placeholder='example@gmail.com'
										{...field}
										disabled={isLoading}
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
							<FormItem className='space-y-2'>
								<Label>Password</Label>
								<FormControl>
									<Input
										placeholder='****'
										type='password'
										{...field}
										disabled={isLoading}
									/>
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<Button type='submit' className='mt-2 w-full' disabled={isLoading}>
						Submit {isLoading && <Loader className='animate-spin' />}
					</Button>
				</form>
			</Form>

			<div className='text-sm text-muted-foreground'>
				Don&apos;t have an account?{' '}
				<Button asChild variant='link' className='h-auto p-0'>
					<Link href='/sign-up'>Sign up</Link>
				</Button>
			</div>
		</Card>
	)
}

export default Page
