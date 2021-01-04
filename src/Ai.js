import {
	memo,
} from 'react'

import AiProvider from './AiProvider'
import ExecutionAi from './ExecutionAi'
import LearningAi from './LearningAi'

const Ai = () => (
	<AiProvider>
		<LearningAi />
		<ExecutionAi />
	</AiProvider>
)

const MemoizedAi = memo(Ai)

export default MemoizedAi
