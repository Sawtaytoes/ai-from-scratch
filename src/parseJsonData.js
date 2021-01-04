const parseJsonData = (
	jsonData,
) => (
	jsonData === undefined
	? jsonData
	: (
		JSON
		.parse(
			jsonData
		)
	)
)

export default parseJsonData
