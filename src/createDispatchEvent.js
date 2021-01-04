const createDispatchEvent = (
	eventBusName,
) => (
	action,
) => {
	window
	.dispatchEvent(
		new CustomEvent(
			eventBusName,
			{
				detail: action,
			},
		)
	)
}

export default createDispatchEvent
