import Image from 'next/image'

function Loading() {
	return <Image src={'/loading.gif'} width={200} height={200} alt='loading' />
}

export default Loading
