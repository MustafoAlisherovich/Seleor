export interface ChildProps {
	children: React.ReactNode
}

export type SearchParams = Promise<{
	[key: string]: string | string[] | undefined
}>

export interface IProduct {
	title: string
	category: string
	price: number
	image: string
	description: string
	imageKey: string
	_id: string
}

export interface QueryProps {
	params: string
	key: string
	value?: string | null
}

export interface ReturnActionType {
	user: IUser
	failure: string
	status: number
	products: IProduct[]
	isNext: boolean
	customers: IUser[]
	orders: IOrder[]
}

export interface IUser {
	_id: string
	fullName: string
	email: string
	password: string
	role: string
	orderCount: number
	totalPrice: number
	avatar: string
	avatarKey: string
	isDeleted: boolean
	deletedAt: Date
	favorites: IProduct[]
}

export interface IOrder {
	_id: string
	user: IUser
	product: IProduct
	createdAt: Date
	price: number
	status: string
	updateAt: Date
}
