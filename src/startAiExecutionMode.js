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
import judgmentTypes from './judgmentTypes'
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
								.closestApproachingObstacleDistance
							),
							(
								input
								.closestApproachingObstacleDistance
							),
						)
					))
				)
				: [
					{},
				]
			)),
			// This will have lots of complex calcluations in the future determining what action to take.
			// Right now, this is random.
			map((
				possibleOutputs,
			) => (
				possibleOutputs[
					(
						Math
						.floor(
							Math
							.random()
						)
					)
					* (
						possibleOutputs
						.length
					)
				]
			)),
			map(({
				judgmentType,
				output,
			}) => (
				output === undefined
				? (
					Math.round(
						Math.random()
					)
					? 'Space'
					: null
				)
				: (
					// eslint-disable-next-line @getify/proper-ternary/nested
					Object
					.is(
						judgmentType,
						(
							judgmentTypes
							.negative
						),
					)
					? (
						output === null
						? 'Space'
						: null
					)
					: output
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
			) => {
				console.info(
					'Keyboard Input:',
					code,
				)
			}),
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
