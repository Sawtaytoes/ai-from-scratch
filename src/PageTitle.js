import {
	memo,
	useContext,
	useEffect,
} from 'react'

import AiIdContext from './AiIdContext'

const PageTitle = () => {
	const {
		aiId,
	} = (
		useContext(
			AiIdContext
		)
	)

	useEffect(
		() => {
			document
			.title = (
				aiId
				? `aiId: ${aiId}`
				: 'Host App'
			)
		},
		[
			aiId,
		],
	)

	return null
}

const MemoizedPageTitle = memo(PageTitle)

export default MemoizedPageTitle
