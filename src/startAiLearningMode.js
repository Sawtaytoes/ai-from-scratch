import {
	distinctUntilChanged,
	scan,
} from 'rxjs/operators'

import { aiDataUpdated } from './aiActionCreators'
import aiLearningReducer from './aiLearningReducer'
import createAiEventBusObservable from './createAiEventBusObservable'
import { dispatchAiEvent } from './eventBusDispatchers'

const startAiLearningMode = (
	aiDataStore$,
) => {
	const aiEventBusSubscription = (
		createAiEventBusObservable()
		.pipe(
			scan(
				aiLearningReducer,
				(
					aiDataStore$
					.value
				),
			),
			distinctUntilChanged(),
		)
		.subscribe((
			aiDataStore,
		) => {
			aiDataStore$
			.next(
				aiDataStore
			)

			dispatchAiEvent(
				aiDataUpdated(
					aiDataStore
				)
			)
		})
	)

	return () => {
		aiEventBusSubscription
		.unsubscribe()
	}
}

export default startAiLearningMode
