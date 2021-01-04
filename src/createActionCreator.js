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
	.toString = () => (
		type
	)

	return actionCreator
}

export default createActionCreator
