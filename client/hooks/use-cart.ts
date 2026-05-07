import { IProduct } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ICart extends IProduct {}

interface ICartStore {
	carts: ICart[]
	addToCart: (product: IProduct) => void
	removeFromCart: (id: string) => void
	increment: (id: string) => void
	decrement: (id: string) => void
	totalPrice: () => number
	cartsLength: () => number
	clearCart: () => void
}

export const useCart = create<ICartStore>()(
	persist(
		(set, get) => ({
			carts: [],

			addToCart: (product: IProduct) => {
				const { carts } = get()

				const existing = carts.find(cart => cart._id === product._id)

				if (existing) {
					set(state => ({
						carts: state.carts.map(cart =>
							cart._id === product._id
								? {
										...cart,
										quantity: cart.quantity + 1,
									}
								: cart,
						),
					}))
				} else {
					set({
						carts: [...carts, { ...product, quantity: 1 }],
					})
				}
			},

			removeFromCart: (id: string) => {
				set(state => ({
					carts: state.carts.filter(cart => cart._id !== id),
				}))
			},

			increment: (id: string) => {
				set(state => ({
					carts: state.carts.map(cart =>
						cart._id === id
							? {
									...cart,
									quantity: cart.quantity + 1,
								}
							: cart,
					),
				}))
			},

			decrement: (id: string) => {
				set(state => ({
					carts: state.carts
						.map(cart =>
							cart._id === id
								? {
										...cart,
										quantity: cart.quantity - 1,
									}
								: cart,
						)
						.filter(cart => cart.quantity > 0),
				}))
			},

			totalPrice: () => {
				return get().carts.reduce(
					(acc, cart) => acc + cart.price * cart.quantity,
					0,
				)
			},

			cartsLength: () => {
				return get().carts.reduce((acc, cart) => acc + cart.quantity, 0)
			},

			clearCart: () => set({ carts: [] }),
		}),
		{
			name: 'cart-storage',
		},
	),
)
