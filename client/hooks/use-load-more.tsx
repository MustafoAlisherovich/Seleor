import { IProduct } from '@/types'
import { create } from 'zustand'

type Store = {
	products: IProduct[]
	setProducts: (products: IProduct[]) => void
	addProducts: (newProducts: IProduct[]) => void
	page: number
	nextPage: () => void
}

export const useLoadMore = create<Store>(set => ({
	products: [],
	setProducts: products => set({ products }),
	addProducts: newProducts =>
		set(state => ({ products: [...state.products, ...newProducts] })),
	page: 1,
	nextPage: () => set(state => ({ page: state.page + 1 })),
}))
