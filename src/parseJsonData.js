const parseJsonData = (
	jsonData,
) => (
	jsonData === undefined
	|| jsonData === ''
	? jsonData
	: (
		JSON
		.parse(
			jsonData
		)
	)
)

export default parseJsonData
