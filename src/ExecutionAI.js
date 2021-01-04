import {
	memo,
	useEffect,
} from 'react'

import startAiExecutionMode from './startAiExecutionMode'

const ExecutionAI = () => {
	useEffect(
		() => {
			const stopAiExecutionMode = (
				startAiExecutionMode()
			)

			return () => {
				stopAiExecutionMode()
			}
		},
		[],
	)

	return null
}

const MemoizedExecutionAI = memo(ExecutionAI)

export default MemoizedExecutionAI
