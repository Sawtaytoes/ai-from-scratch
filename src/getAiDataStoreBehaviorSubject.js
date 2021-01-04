import {
	BehaviorSubject,
} from 'rxjs'

const getAiDataStoreBehaviorSubject = (
	initialAiDataStore,
) => {
	const sanitizedAiDataStore = (
		Array
		.isArray(
			initialAiDataStore
		)
		? initialAiDataStore
		: []
	)

	const aiDataStore$ = (
		new BehaviorSubject(
			sanitizedAiDataStore
		)
	)

	return aiDataStore$
}

export default getAiDataStoreBehaviorSubject
