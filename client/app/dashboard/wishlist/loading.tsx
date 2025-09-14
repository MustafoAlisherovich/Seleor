import CardLoader from '@/components/loaders/card.loader'
import { Separator } from '@/components/ui/separator'

function Loading() {
	return (
		<>
			<h1 className='text-xl font-bold'>Watch list</h1>
			<Separator className='my-3' />

			<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3'>
				{Array.from({ length: 4 }).map((_, i) => (
					<CardLoader key={i} />
				))}
			</div>
		</>
	)
}

export default Loading
