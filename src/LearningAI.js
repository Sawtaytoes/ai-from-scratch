import {
	memo,
	useContext,
	useEffect,
} from 'react'

import AiContext from './AiContext'
import startAiLearningMode from './startAiLearningMode'

const LearningAi = () => {
	const {
		aiDataStore$,
	} = (
		useContext(
			AiContext
		)
	)

	useEffect(
		() => {
			const stopAiLearningMode = (
				startAiLearningMode(
					aiDataStore$
				)
			)

			return () => {
				stopAiLearningMode()
			}
		},
		[
			aiDataStore$,
		],
	)

	return null
}

const MemoizedLearningAi = memo(LearningAi)

export default MemoizedLearningAi
