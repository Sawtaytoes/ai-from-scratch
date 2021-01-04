import aiLearningReducer from './aiLearningReducer'
import { aiJudgment } from './aiActionCreators'

describe(
	'aiLearningReducer',
	() => {
		test(
			'should return initial state',
			() => {
				const initialState = []

				expect(
					aiLearningReducer(
						initialState,
						{
							type: '',
						},
					)
				)
				.toBe(
					initialState
				)
			},
		)

		test(
			'should concat judgments when `aiJudgment` action occurs',
			() => {
				const initialState = []

				const payload = {}

				expect(
					aiLearningReducer(
						initialState,
						{
							payload,
							type: 'aiJudgment',
						},
					)
				)
				.toEqual(
					expect
					.arrayContaining(
						[payload]
					)
				)
			},
		)
	},
)
