export interface ChildProps {
	children: React.ReactNode
}

export interface IProduct {
	title: string
	category: string
	price: number
	image: string
	excerpt: string
	imageKey: string
	_id: string
}

export interface QueryProps {
	params: string
	key: string
	value?: string | null
}
