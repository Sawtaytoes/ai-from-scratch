import { memo } from 'react'

import AiIdProvider from './AiIdProvider'
import App from './App'

const Root = () => (
	<AiIdProvider>
		<App />
	</AiIdProvider>
)

const MemoizedRoot = memo(Root)

export default MemoizedRoot
