import Link from 'next/link'

export default function SuccessPage() {
	return (
		<div className='flex items-center justify-center min-h-screen bg-gray-50'>
			<div className='bg-white p-8 rounded-2xl shadow-lg text-center max-w-md'>
				<h1 className='text-2xl font-bold text-green-600 mb-4'>
					Thank you for your purchase!
				</h1>
				<p className='text-gray-600 mb-6'>
					Your payment was successful. We appreciate your trust in us.
				</p>
				<Link
					href='/dashboard'
					className='inline-block bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition'
				>
					Back to Dashboard
				</Link>
			</div>
		</div>
	)
}
