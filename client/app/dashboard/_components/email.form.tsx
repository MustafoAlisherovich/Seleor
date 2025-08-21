'use client'

import { sendOtp, verifyOtp } from '@/actions/auth.action'
import { updateUser } from '@/actions/user.actions'
import { Button } from '@/components/ui/button'
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
import UseAction from '@/hooks/use-action'
import { emailSchema, otpSchema } from '@/lib/validation'
import { IUser } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react'
import { signOut } from 'next-auth/react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface Props {
	user: IUser
}

const EmailForm = ({ user }: Props) => {
	const { isLoading, setIsLoading, onError } = UseAction()
	const [isVerifying, setIsVerifying] = useState(false)
	const [isResend, setResend] = useState(false)

	const form = useForm<z.infer<typeof emailSchema>>({
		resolver: zodResolver(emailSchema),
		defaultValues: { email: user.email },
	})

	const otpForm = useForm<z.infer<typeof otpSchema>>({
		resolver: zodResolver(otpSchema),
		defaultValues: { otp: '' },
	})

	async function onSubmit(values: z.infer<typeof emailSchema>) {
		setIsLoading(true)
		const res = await sendOtp({ email: values.email })

		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data?.failure) {
			return onError(res.data.failure)
		}

		if (res.data.status === 200) {
			toast.success('OTP sent successfully')
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
			const response = await updateUser({ email: form.getValues('email') })

			if (response?.serverError || res?.validationErrors || !res?.data) {
				return onError('Something went wrong')
			}
			if (response.data?.failure) {
				return onError(res.data.failure)
			}

			if (response.data?.status === 200) {
				toast.success('Email updated successsfully!')
				signOut({ callbackUrl: '/sign-in' })
			}
		}
	}

	return (
		<>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label className='text-xs'>Email</Label>
								<FormControl>
									<Input
										placeholder='example@gmail.com'
										className='bg-white'
										{...field}
										disabled={isLoading || isVerifying}
									/>
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					{!isVerifying && (
						<Button type='submit' className='mt-4' disabled={isLoading}>
							Submit {isLoading && <Loader className='animate-spin' />}
						</Button>
					)}
				</form>
			</Form>

			{isVerifying && (
				<Form {...otpForm}>
					<form onSubmit={otpForm.handleSubmit(onVerify)}>
						<FormField
							control={otpForm.control}
							name='otp'
							render={({ field }) => (
								<FormItem className='space-y-0 '>
									<Label>Enter OTP</Label>
									<FormControl className='w-full'>
										<InputOTP maxLength={6} {...field}>
											<InputOTPGroup>
												<InputOTPSlot index={0} />
												<InputOTPSlot index={1} />
												<InputOTPSlot index={2} />
											</InputOTPGroup>
											<InputOTPSeparator />
											<InputOTPGroup>
												<InputOTPSlot index={3} />
												<InputOTPSlot index={4} />
												<InputOTPSlot index={5} />
											</InputOTPGroup>
										</InputOTP>
									</FormControl>
									<FormMessage className='text-xs text-red-500' />
								</FormItem>
							)}
						/>
						<div className='flex items-center gap-1'>
							<Button
								type='submit'
								className='mt-2'
								disabled={isLoading || isResend}
							>
								Verify {isLoading && <Loader className='animate-spin' />}
							</Button>
							{isResend && (
								<Button
									type='button'
									onClick={() => onSubmit(form.getValues())}
									disabled={isLoading}
									className='mt-2'
								>
									Resend OTP {isLoading && <Loader className='animate-spin' />}
								</Button>
							)}
						</div>
					</form>
				</Form>
			)}
		</>
	)
}

export default EmailForm
