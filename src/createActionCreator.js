const createActionCreator = (
	type,
) => {
	const actionCreator = (
		payload,
	) => (
		payload === undefined
		? {
			type,
		}
		: {
			payload,
			type,
		}
	)

	actionCreator
	.type = type

	actionCreator
	.__proto__
	.toString = () => (
		type
	)

	return actionCreator
}

export default createActionCreator
