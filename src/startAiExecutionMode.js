import {
	BehaviorSubject,
} from 'rxjs'
import {
	filter,
	map,
	pluck,
	tap,
} from 'rxjs/operators'

import {
	aiDataUpdated,
	aiInput,
	aiOutput,
} from './aiActionCreators'
import createAiEventBusObservable from './createAiEventBusObservable'
import { dispatchAiEvent } from './eventBusDispatchers'
import ofType from './ofType'

const startAiExecutionMode = () => {
	const aiDataStore$ = (
		new BehaviorSubject([])
	)

	const aiInputSubscription = (
		createAiEventBusObservable()
		.pipe(
			ofType(
				aiInput
				.type
			),
		)
		.pipe(
			pluck(
				'payload'
			),
			map((
				input
			) => ({
				aiDataStore: (
					aiDataStore$
					.value
				),
				input,
			})),
			filter(({
				aiDataStore,
			}) => (
				Array
				.isArray(aiDataStore)
			)),
			map(({
				aiDataStore,
				input,
			}) => (
				(
					aiDataStore
					.length > 0
				)
				? (
					aiDataStore
					.filter(({
						input: judgedInput,
					}) => (
						// We need to eventually know about:
						// yHeight for physics.
						// If a block is underneath us and how long it is relative to our position.
						// All blocks on the screen and their relative distance to each other (or maybe just the ones up close).
						Object
						.is(
							(
								judgedInput
								.closestBlockDistance
							),
							(
								input
								.closestBlockDistance
							),
						)
					))
				)
				: [{}]
			)),
			map((
				possibleOutputs,
			) => (
				(
					possibleOutputs[0]
					.output
				)
				|| (
					Math.round(
						Math.random()
					)
					? 'space'
					: null
				)
			)),
			tap((
				output
			) => (
				dispatchAiEvent(
					aiOutput(
						output
					)
				)
			)),
			filter(Boolean),
			tap((
				code,
			) => (
				window
				.dispatchEvent(
					new KeyboardEvent(
						'keydown',
						{
							code,
						}
					)
				)
			)),
		)
		.subscribe()
	)

	const aiDataSubscription = (
		createAiEventBusObservable()
		.pipe(
			ofType(
				aiDataUpdated
				.type
			),
		)
		.pipe(
			pluck(
				'payload'
			),
		)
		.subscribe((
			aiDataStore,
		) => {
			aiDataStore$
			.next(
				aiDataStore
			)
		})
	)

	return () => {
		aiInputSubscription
		.unsubscribe()

		aiDataSubscription
		.unsubscribe()
	}
}

export default startAiExecutionMode
