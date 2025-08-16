'use client'

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
import { registerSchema } from '@/lib/validation'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import z from 'zod'

function Page() {
	const form = useForm<z.infer<typeof registerSchema>>({
		resolver: zodResolver(registerSchema),
		defaultValues: { email: '', password: '', fullName: '' },
	})

	function onSubmit(values: z.infer<typeof registerSchema>) {
		console.log(values)
	}

	return (
		<Card className='w-[40vw] p-4 mx-auto shadow-lg'>
			<h1 className='text-xl font-bold'>Sign Up</h1>
			<p className='text-sm text-muted-foreground'>
				Welcome to our platform! Please sign up to create an
			</p>
			<Separator />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-2'>
					<FormField
						control={form.control}
						name='fullName'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label>Full Name</Label>
								<FormControl>
									<Input placeholder='John Doe' {...field} />
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem className='space-y-0'>
								<Label className='mt-4'>Email</Label>
								<FormControl>
									<Input placeholder='example@gmial.com' {...field} />
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
									<Input placeholder='****' type='password' {...field} />
								</FormControl>
								<FormMessage className='text-xs text-red-500' />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full mt-4'>
						Submit
					</Button>
				</form>
			</Form>

			<div className='mt-4'>
				<div className='text-sm text-muted-foreground'>
					Already have an account?{' '}
					<Button asChild variant={'link'} className='p-0'>
						<Link href='/sign-in'>Sign in</Link>
					</Button>
				</div>
			</div>
		</Card>
	)
}

export default Page
