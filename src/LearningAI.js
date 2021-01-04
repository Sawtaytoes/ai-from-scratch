import {
	memo,
	useEffect,
} from 'react'

import aiId from './aiId'
import startAiLearningMode from './startAiLearningMode'

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
			const initialAiLearningData = (
				JSON
				.parse(
					localStorage
					.getItem(
						aiId
					)
				)
			)

			const stopAiLearningMode = (
				startAiLearningMode(
					storeAiLearningData,
					initialAiLearningData,
				)
			)

			return () => {
				stopAiLearningMode()
			}
		},
		[],
	)

	return null
}

const MemoizedLearningAI = memo(LearningAI)

export default MemoizedLearningAI
