'use client'

import { updateUser } from '@/actions/user.actions'
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { Skeleton } from '@/components/ui/skeleton'
import UseAction from '@/hooks/use-action'
import { UploadDropzone } from '@/lib/uploadthing'
import { IUser } from '@/types'
import { Edit2, Loader } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { toast } from 'sonner'
import EmailForm from './email.form'
import FullNameForm from './full-name.form'

interface Props {
	user: IUser
}

const EditInformation = ({ user }: Props) => {
	const { isLoading, setIsLoading, onError } = UseAction()
	const { update } = useSession()
	const [open, setOpen] = useState(false)

	const onUpdateAvatar = async (avatar: string, avatarKey: string) => {
		setIsLoading(true)
		const res = await updateUser({ avatar, avatarKey })

		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data?.failure) {
			return onError(res.data.failure)
		}
		if (res.data.status === 200) {
			toast.success('Avatar successfully updated')
			update()
			setOpen(false)
			setIsLoading(false)
		}
	}

	return (
		<>
			<div className='w-full h-52 bg-secondary flex justify-center items-center'>
				<div className='relative'>
					{isLoading && (
						<Skeleton className='absolute inset-0 bg-secondary z-50 flex items-center justify-center'>
							<Loader className='animate-spin' />
						</Skeleton>
					)}

					{/* Avatar */}
					<Avatar className='size-24 md:size-32'>
						<AvatarImage src={user.avatar} alt={user.fullName} />
						<AvatarFallback className='bg-primary text-white text-4xl md:text-6xl'>
							{user.fullName.charAt(0).toUpperCase()}
						</AvatarFallback>
					</Avatar>

					{/* Edit button */}
					<Dialog open={open} onOpenChange={setOpen}>
						<DialogTrigger asChild>
							<Button
								size='icon'
								className='absolute right-0 bottom-0 rounded-full border border-primary cursor-pointer'
								variant='secondary'
							>
								<Edit2 className='h-4 w-4 md:h-5 md:w-5' />
							</Button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle />
							</DialogHeader>
							<UploadDropzone
								endpoint='imageUploader'
								config={{ appendOnPaste: true, mode: 'auto' }}
								appearance={{ container: { height: 200, padding: 10 } }}
								onClientUploadComplete={res =>
									onUpdateAvatar(res[0].url, res[0].key)
								}
							/>
						</DialogContent>
					</Dialog>
				</div>
			</div>

			{/* User info (accordion) */}
			<div className='my-3 bg-secondary px-2 md:px-4'>
				<Accordion type='single' collapsible>
					<AccordionItem value='item-1'>
						<AccordionTrigger className='cursor-pointer'>
							<div className='flex flex-col space-y-0 text-sm md:text-base'>
								<h2 className='font-bold'>Full Name</h2>
								<p className='text-muted-foreground break-all max-w-full sm:max-w-[200px] sm:truncate lg:max-w-none lg:truncate-0'>
									{user.fullName}
								</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className='border-l border-l-primary pl-2 md:pl-4'>
							<FullNameForm user={user} />
						</AccordionContent>
					</AccordionItem>

					<AccordionItem value='item-2'>
						<AccordionTrigger className='cursor-pointer'>
							<div className='flex flex-col space-y-0 text-sm md:text-base'>
								<h2 className='font-bold'>Email</h2>
								<p className='text-muted-foreground break-all max-w-full sm:max-w-[200px] sm:truncate lg:max-w-none lg:truncate-0'>
									{user.email}
								</p>
							</div>
						</AccordionTrigger>
						<AccordionContent className='border-l border-l-primary pl-2 md:pl-4'>
							<EmailForm user={user} />
						</AccordionContent>
					</AccordionItem>
				</Accordion>
			</div>
		</>
	)
}

export default EditInformation
