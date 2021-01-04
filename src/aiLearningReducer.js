import createReducer from './createReducer'
import { aiJudgment } from './aiActionCreators'

const initialState = []

const reducerActions = {
	[aiJudgment]: (
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
