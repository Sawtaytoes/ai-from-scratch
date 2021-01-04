import {
	BehaviorSubject,
	fromEvent,
	race,
} from 'rxjs'
import {
	distinctUntilChanged,
	scan,
} from 'rxjs/operators'

import { aiDataUpdated } from './aiActionCreators'
import aiLearningReducer from './aiLearningReducer'
import createAiEventBusObservable from './createAiEventBusObservable'
import { dispatchAiEvent } from './eventBusDispatchers'

const startAiLearningMode = (
	subscriber,
	initialAiLearningData,
) => {
	const aiDataStore$ = (
		new BehaviorSubject(
			initialAiLearningData
		)
	)

	const aiEventBusSubscription = (
		createAiEventBusObservable()
		.pipe(
			scan(
				aiLearningReducer,
				initialAiLearningData,
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

	const browserCloseSubscription = (
		race(
			(
				fromEvent(
					window,
					'beforeunload',
				)
			),
			(
				fromEvent(
					window,
					'unload',
				)
			),
		)
		.subscribe(() => {
			subscriber(
				aiDataStore$
				.value
			)
		})
	)

	return () => {
		aiEventBusSubscription
		.unsubscribe()

		browserCloseSubscription
		.unsubscribe()
	}
}

export default startAiLearningMode
