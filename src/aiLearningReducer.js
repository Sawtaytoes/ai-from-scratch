import aiId from './aiId'
import createReducer from './createReducer'
import { aiJudgement } from './aiActionCreators'

const initialState = (
	(
		localStorage
		.getItem(
			aiId
		)
	)
	|| []
)

const reducerActions = {
	[aiJudgement]: (
		state,
		{ payload },
	) => (
		state
		.concat(
			payload
		)
	),
}

const aiLearningReducer = (
	createReducer(
		reducerActions,
		initialState,
	)
)

export default aiLearningReducer
