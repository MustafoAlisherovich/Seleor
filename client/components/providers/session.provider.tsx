'use client'

import { ChildProps } from '@/types'
import { SessionProvider as Session } from 'next-auth/react'
import { Suspense } from 'react'

function SessionProvider({ children }: ChildProps) {
	return (
		<Session>
			<Suspense fallback={null}>{children}</Suspense>
		</Session>
	)
}

export default SessionProvider
