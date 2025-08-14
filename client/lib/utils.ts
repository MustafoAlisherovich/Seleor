import { QueryProps } from '@/types'
import { clsx, type ClassValue } from 'clsx'
import qs from 'query-string'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function formatPrice(price: number) {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
	}).format(price)
}

export function formUrlQuery({ key, params, value }: QueryProps) {
	const currentUrl = qs.parse(params)
	currentUrl[key] = value!

	return qs.stringifyUrl(
		{ url: window.location.pathname, query: currentUrl },
		{ skipNull: true }
	)
}

export function removeUrlQuery({ key, params }: QueryProps) {
	const currentUrl = qs.parse(params)
	delete currentUrl[key]
	return qs.stringifyUrl(
		{ url: window.location.pathname, query: currentUrl },
		{ skipNull: true }
	)
}
