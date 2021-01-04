import PropTypes from 'prop-types'
import {
	memo,
	useMemo,
} from 'react'

import AiIdContext from './AiIdContext'

const propTypes = {
	children: PropTypes.node,
}

const AiIdProvider = ({
	children,
}) => {
	const aiId = (
		useMemo(
			() => (
				new URLSearchParams(
					window
					.location
					.search
				)
				.get('aiId')
			),
			[],
		)
	)

	const aiIdProviderValue = (
		useMemo(
			() => ({
				aiId,
				isGame: typeof aiId === 'string',
				isHost: !aiId,
			}),
			[
				aiId,
			],
		)
	)

	return (
		<AiIdContext.Provider
			value={aiIdProviderValue}
		>
			{children}
		</AiIdContext.Provider>
	)
}

AiIdProvider.propTypes = propTypes

const MemoizedAiIdProvider = memo(AiIdProvider)

export default MemoizedAiIdProvider
