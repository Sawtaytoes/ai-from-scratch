import { memo } from 'react'

import AiIdProvider from './AiIdProvider'
import App from './App'
import './Root.css'

const Root = () => (
	<div className="Root">
		<AiIdProvider>
			<App />
		</AiIdProvider>
	</div>
)

const MemoizedRoot = memo(Root)

export default MemoizedRoot
