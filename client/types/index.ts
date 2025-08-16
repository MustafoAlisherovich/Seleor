export interface ChildProps {
	children: React.ReactNode
}

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
}

export interface IUser {
	_id: string
	fullName: string
	email: string
	password: string
	role: string
	orderCount: number
	totalSpent: number
	avatar: string
	avatarKey: string
	isDeleted: boolean
	deletedAt: Date
	favorites: IProduct[]
}
