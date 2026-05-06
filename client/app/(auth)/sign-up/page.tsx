'use client'

import { register, sendOtp, verifyOtp } from '@/actions/auth.action'
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
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import UseAction from '@/hooks/use-action'
import { otpSchema, registerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'

function Page() {
	const { isLoading, setIsLoading, onError } = UseAction()
	const [isVerifying, setIsVerifying] = useState(false)
	const [isResend, setResend] = useState(false)

	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: '', password: '', fullName: '' },
	})

	const otpForm = useForm<z.infer<typeof otpSchema>>({
		resolver: zodResolver(otpSchema),
		defaultValues: { otp: '' },
	})

	async function onSubmit(values: z.infer<typeof registerSchema>) {
		setIsLoading(true)

		const res = await sendOtp({ email: values.email })

		if (res?.serverError || res?.validationErrors || !res.data) {
			return onError('Something went wrong!')
		}

		if (res.data?.failure) {
			return onError(res.data.failure)
		}

		if (res.data.status === 200) {
			toast.success('OTP sent successfully!')
			setIsVerifying(true)
			setIsLoading(false)
			setResend(false)
		}
	}

	async function onVerify(values: z.infer<typeof otpSchema>) {
		setIsLoading(true)
		const res = await verifyOtp({
			otp: values.otp,
			email: form.getValues('email'),
		})

		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data?.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 301) {
			setResend(true)
			toast.error('OTP was expired, Please resend OTP')
			setIsLoading(false)
		}
		if (res.data.status === 200) {
			const response = await register(form.getValues())

			if (response?.serverError || res?.validationErrors || !res?.data) {
				return onError('Something went wrong')
			}
			if (response.data?.failure) {
				return onError(response.data.failure)
			}

			if (response.data?.user._id) {
				toast.success('User created successsfully!')
				signIn('credentials', {
					userId: response.data.user._id,
					callbackUrl: '/',
				})
			}
		}
	}

	return (
		<Card className='mx-auto w-full max-w-xl p-7 md:p-8'>
			<div className='space-y-2'>
				<p className='text-xs font-semibold uppercase tracking-[0.24em] text-primary'>
					Create account
				</p>
				<h1 className='text-3xl font-bold tracking-tight'>Sign up</h1>
				<p className='text-sm leading-6 text-muted-foreground'>
					Create your account and continue with the updated premium experience.
				</p>
			</div>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
					<FormField
						control={form.control}
						name='fullName'
						render={({ field }) => (
							<FormItem className='space-y-2'>
								<Label>Full Name</Label>
								<FormControl>
									<Input
										placeholder='John Doe'
										{...field}
										disabled={isLoading || isVerifying}
									/>
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
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
										disabled={isLoading || isVerifying}
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
										disabled={isLoading || isVerifying}
									/>
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					{!isVerifying && (
						<Button type='submit' className='w-full' disabled={isLoading}>
							Continue {isLoading && <Loader className='animate-spin' />}
						</Button>
					)}
				</form>
			</Form>

			{isVerifying && (
				<Form {...otpForm}>
					<form onSubmit={otpForm.handleSubmit(onVerify)} className='space-y-4'>
						<FormField
							control={otpForm.control}
							name='otp'
							render={({ field }) => (
								<FormItem className='space-y-2 w-full'>
									<Label>Enter OTP</Label>
									<FormControl className='w-full'>
										<InputOTP maxLength={6} {...field}>
											<InputOTPGroup className='w-full'>
												<InputOTPSlot index={0} className='w-full' />
												<InputOTPSlot index={1} className='w-full' />
												<InputOTPSlot index={2} className='w-full' />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup className='w-full'>
												<InputOTPSlot index={3} className='w-full' />
												<InputOTPSlot index={4} className='w-full' />
												<InputOTPSlot index={5} className='w-full' />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage className='text-xs text-red-500' />
								</FormItem>
							)}
						/>
						<div className='flex flex-wrap items-center gap-2'>
							<Button type='submit' disabled={isLoading || isResend}>
								Verify {isLoading && <Loader className='animate-spin' />}
							</Button>
							{isResend && (
								<Button
									type='button'
									variant='outline'
									onClick={() => onSubmit(form.getValues())}
									disabled={isLoading}
								>
									Resend OTP {isLoading && <Loader className='animate-spin' />}
								</Button>
							)}
						</div>
					</form>
				</Form>
			)}

			<div className='text-sm text-muted-foreground'>
				Already have an account?{' '}
				<Button asChild variant='link' className='h-auto p-0'>
					<Link href='/sign-in'>Sign in</Link>
				</Button>
			</div>
		</Card>
	)
}

export default Page
