import {
	memo,
	useEffect,
} from 'react'

import aiId from './aiId'
import aiLearningMode from './aiLearningMode'

const storeAiLearningData = (
	data,
) => {
	localStorage
	.setItem(
		(
			aiId
		),
		(
			JSON
			.stringify(
				data
			)
		),
	)
}

const LearningAI = () => {
	useEffect(
		() => {
			const unsubscribeFromAiLearningMode = (
				aiLearningMode(
					storeAiLearningData
				)
			)

			return () => {
				unsubscribeFromAiLearningMode()
			}
		},
		[],
	)

	return null
}

const MemoizedLearningAI = memo(LearningAI)

export default MemoizedLearningAI
