import createActionCreator from './createActionCreator'

describe(
	'createActionCreator',
	() => {
		test(
			'should return an action creator',
			() => {
				const doSomething = (
					createActionCreator(
						'doSomething'
					)
				)

				expect(
					doSomething
				)
				.toBeInstanceOf(
					Function
				)
			},
		)

		test(
			'should return an action creator with the given type',
			() => {
				const expectedType = 'doSomething'

				const doSomething = (
					createActionCreator(
						expectedType
					)
				)

				expect(
					doSomething
					.type
				)
				.toBe(
					expectedType
				)

				expect(
					doSomething
					.toString()
				)
				.toBe(
					expectedType
				)
			},
		)

		test(
			'action creator should return an action when called',
			() => {
				const doSomething = (
					createActionCreator(
						'doSomething'
					)
				)

				const action = (
					doSomething()
				)

				expect(
					typeof action
				)
				.toBe(
					'object'
				)

				expect(
					action
				)
				.toHaveProperty(
					'type'
				)
			},
		)

		test(
			'action creator should return the action type',
			() => {
				const expectedType = 'doSomething'

				const doSomething = (
					createActionCreator(
						expectedType
					)
				)

				expect(
					doSomething()
					.type
				)
				.toBe(
					expectedType
				)
			},
		)

		test(
			'action creator should return a payload if provided',
			() => {
				const expectedPayload = {}

				const doSomething = (
					createActionCreator(
						'doSomething'
					)
				)

				expect(
					doSomething(
						expectedPayload
					)
					.payload
				)
				.toBe(
					expectedPayload
				)
			},
		)

		test(
			'action creator should return no payload if none provided',
			() => {
				const doSomething = (
					createActionCreator(
						'doSomething'
					)
				)

				const action = (
					doSomething()
				)

				expect(
					action
				)
				.not
				.toHaveProperty(
					'payload'
				)
			},
		)
	},
)
