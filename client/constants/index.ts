import {
	Banknote,
	Barcode,
	Headset,
	Heart,
	Settings2,
	ShieldCheck,
	Shuffle,
	Star,
	Truck,
	User,
} from 'lucide-react'

export const categoriesBar = [
	{ name: 'Shoes' },
	{ name: 'T-Shirts' },
	{ name: 'Clothes' },
	{ name: 'Books' },
	{ name: 'Accessories' },
	{ name: 'Electronics' },
	{ name: 'Health' },
	{ name: "Children's products" },
	{ name: 'Sports and recreation' },
	{ name: 'Pet Products' },
]

export const products = [
	{
		_id: '1',
		title: 'Welcome to Our Store',
		description: 'Best products, best prices',
		image: '/slider1.jpg',
		category: 'Category 1',
		price: 10,
	},
	{
		_id: '2',
		title: 'Product 2',
		description: 'Description 2',
		image: '/slider1.jpg',
		category: 'Category 2',
		price: 20,
	},
	{
		_id: '3',
		title: 'Product 3',
		description: 'Description 3',
		image: '/slider1.jpg',
		category: 'Category 3',
		price: 30,
	},
	{
		_id: '4',
		title: 'Product 4',
		description: 'Description 4',
		image: '/slider1.jpg',
		category: 'Category 3',
		price: 30,
	},
]

export const categories = [
	'All',
	'Shoes',
	'T-Shirts',
	'Clothes',
	'Books',
	'Accessories',
	'Universal',
]

export const features = [
	{
		title: 'Fast Delivery',
		desc: 'We ensure your orders arrive quickly and safely to your doorstep.',
		icon: Truck,
	},
	{
		title: 'Quality Products',
		desc: 'We only provide genuine and high-quality products you can trust.',
		icon: Star,
	},
	{
		title: 'Secure Payments',
		desc: 'All transactions are protected with top-level security.',
		icon: ShieldCheck,
	},
	{
		title: '24/7 Support',
		desc: 'Our team is always ready to help you with any questions.',
		icon: Headset,
	},
]

export const dashboardSidebar = [
	{ name: 'Personal Information', route: '/dashboard', icon: User },
	{ name: 'Orders', route: '/dashboard/orders', icon: Shuffle },
	{ name: 'Payments', route: '/dashboard/payments', icon: Banknote },
	{ name: 'Wishlist', route: '/dashboard/wishlist', icon: Heart },
	{ name: 'Settings', route: '/dashboard/settings', icon: Settings2 },
]

export const navLinks = [
	{ name: 'Home', route: '/' },
	{ name: 'Services', route: '/services' },
	{ name: 'Products', route: '/products' },
	{ name: 'Contact', route: '/contact' },
]

export const adminSidebar = [
	{ name: 'Customers', route: '/admin', icon: User },
	{ name: 'Products', route: '/admin/products', icon: Barcode },
	{ name: 'Orders', route: '/admin/orders', icon: Shuffle },
	{ name: 'Payments', route: '/admin/payments', icon: Banknote },
]

export const TransactionState = {
	Paid: 2,
	Pending: 1,
	PendingCanceled: -1,
	PaidCanceled: -2,
}
