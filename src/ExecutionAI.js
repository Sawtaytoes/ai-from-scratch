import {
	memo,
	useContext,
	useEffect,
} from 'react'

import AiContext from './AiContext'
import startAiExecutionMode from './startAiExecutionMode'

const ExecutionAi = () => {
	const {
		aiDataStore$,
	} = (
		useContext(
			AiContext
		)
	)

	useEffect(
		() => {
			const stopAiExecutionMode = (
				startAiExecutionMode(
					aiDataStore$
				)
			)

			return () => {
				stopAiExecutionMode()
			}
		},
		[
			aiDataStore$,
		],
	)

	return null
}

const MemoizedExecutionAi = memo(ExecutionAi)

export default MemoizedExecutionAi
