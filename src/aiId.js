const urlSearchParams = (
	new URLSearchParams(
		window
		.location
		.search
	)
)

const aiId = (
	urlSearchParams
	.get('aiId')
)

export default aiId
