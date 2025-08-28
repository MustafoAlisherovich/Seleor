'use client'

import { updateOrder } from '@/actions/admin.action'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import UseAction from '@/hooks/use-action'
import { IOrder } from '@/types'
import { EllipsisVertical } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

interface Props {
	order: IOrder
}

const OrderActions = ({ order }: Props) => {
	const [open, setOpen] = useState(false)
	const { isLoading, setIsLoading, onError } = UseAction()

	const onUpdateSatus = async (status: string) => {
		setIsLoading(true)
		const res = await updateOrder({ id: order._id, status })
		if (res?.serverError || res?.validationErrors || !res?.data) {
			return onError('Something went wrong')
		}
		if (res.data?.failure) {
			return onError(res.data.failure)
		}
		toast.success('Order updated successfully')
		setIsLoading(false)
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button size={'icon'} className='size-6' variant={'outline'}>
					<EllipsisVertical />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-50 p-1' side='right'>
				<div className='flex flex-col space-y-0'>
					<Button
						size={'sm'}
						variant={'ghost'}
						className='justify-start'
						disabled={isLoading || order.status === 'Order confirmed'}
						onClick={() => onUpdateSatus('Order confirmed')}
					>
						1. Confirm order
					</Button>
					<Button
						size={'sm'}
						variant={'ghost'}
						className='justify-start'
						disabled={isLoading || order.status === 'Order started to delivery'}
						onClick={() => onUpdateSatus('Order started to delivery')}
					>
						2. Start delivery
					</Button>
					<Button
						size={'sm'}
						variant={'ghost'}
						className='justify-start'
						onClick={() => onUpdateSatus('Deliver in progress')}
						disabled={isLoading || order.status === 'Deliver in progress'}
					>
						3. Delivery in progress
					</Button>
					<Button
						size={'sm'}
						variant={'ghost'}
						className='justify-start'
						onClick={() => onUpdateSatus('Delivery completed')}
						disabled={isLoading || order.status === 'Delivery completed'}
					>
						4. Complete delivery
					</Button>
					<Button
						size={'sm'}
						variant={'ghost'}
						className='justify-start'
						onClick={() => onUpdateSatus('Order delivered')}
						disabled={isLoading || order.status === 'Order delivered'}
					>
						5. Mark as delivered
					</Button>
				</div>
			</PopoverContent>
		</Popover>
	)
}

export default OrderActions
