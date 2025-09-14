import { getProducts } from '@/actions/user.actions'
import Footer from '@/components/shared/footer'
import { SearchParams } from '@/types'
import FeaturedSection from './_components/featured-section'
import Hero from './_components/hero'
import Products from './_components/products'

interface Props {
	searchParams: SearchParams
}

const Page = async (props: Props) => {
	const searchParams = await props.searchParams

	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || ''}`,
		category: `${searchParams.category || ''}`,
		page: '1',
	})

	const products = res?.data?.products || []
	const totalProducts = res?.data?.totalProducts || 0

	return (
		<>
			<Hero />
			<FeaturedSection />
			<Products products={products} totalProducts={totalProducts} />
			<Footer />
		</>
	)
}

export default Page
