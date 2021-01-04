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

const aiLearningMode = (
	subscriber,
) => {
	const initialState = (
		aiLearningReducer(
			undefined,
			{
				type: '',
			},
		)
	)

	const aiDataStore$ = (
		new BehaviorSubject(
			initialState
		)
	)

	const aiEventBusSubscription = (
		createAiEventBusObservable()
		.pipe(
			scan(
				aiLearningReducer,
				initialState,
			),
			distinctUntilChanged(),
		)
		.subscribe((
			state,
		) => {
			aiDataStore$
			.next(
				state
			)

			dispatchAiEvent(
				aiDataUpdated,
				state,
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

export default aiLearningMode
