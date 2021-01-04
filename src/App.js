import {
	Fragment,
	useContext,
} from 'react'

import Ai from './Ai'
import AiIdContext from './AiIdContext'
import Game from './Game'
import Host from './Host'
import PageTitle from './PageTitle'

const App = () => {
	const {
		isGame,
		isHost,
	} = (
		useContext(
			AiIdContext
		)
	)

	return (
		<Fragment>
			<PageTitle />

			{
				isGame
				&& <Ai />
			}

			{
				isGame
				&& <Game />
			}

			{
				isHost
				&& <Host />
			}
		</Fragment>
	)
}

export default App
