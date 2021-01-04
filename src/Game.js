/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
	memo,
	useEffect,
	useRef,
	useState,
} from 'react'
import {
	interval,
} from 'rxjs'
import {
	delay,
	filter,
	map,
	pluck,
	tap,
} from 'rxjs/operators'

import {
	aiInput,
	aiJudgment,
	aiOutput,
} from './aiActionCreators'
import Block from './Block'
import createAiEventBusObservable from './createAiEventBusObservable'
import { dispatchAiEvent } from './eventBusDispatchers'
import GameOver from './GameOver'
import judgmentTypes from './judgmentTypes'
import ofType from './ofType'
import Player from './Player'

const gameStates = {
	started: 'started',
	stopped: 'stopped',
}

const gameStyles = css`
	background-color: #282c34;
	border: 1vh solid darkgray;
	color: white;
	height: 100%;
	position: fixed;
	width: 100%;
`

const Game = () => {
	// const [
	// 	currentScore,
	// 	setCurrentScore,
	// ] = (
	// 	useState(0)
	// )
	const [
		gameState,
		setGameState,
	] = (
		useState(
			gameStates
			.started
		)
	)

	const gameStateRef = useRef()

	gameStateRef
	.current = (
		gameState
	)

	const blockRef = useRef()
	const playerRef = useRef()

	useEffect(
		() => {
			if (
				!(
					playerRef
					.current
				)
			) {
				return
			}

			const intersectionObserver = (
				new IntersectionObserver(
					([
						intersectionObserverEntry,
					]) => {
						!(
							intersectionObserverEntry
							.isVisible
						)
						&& (
							setGameState(
								gameStates
								.stopped
							)
						)
					},
					{
						delay: 100,
						trackVisibility: true,
					},
				)
			)

			intersectionObserver
			.observe(
				playerRef
				.current
			)

			return () => {
				intersectionObserver
				.disconnect()
			}
		},
		[],
	)

	useEffect(
		() => {
			if (
				gameState
				!== gameStates.started
			) {
				return
			}

			const aiInputSubscription = (
				interval(50)
				.pipe(
					filter(() => (
						gameStateRef.current
						=== gameStates.started
					)),
					map(() => (
						(
							blockRef
							.current
							.offsetLeft
						)
						- (
							playerRef
							.current
							.offsetLeft
						)
					)),
					tap((
						closestApproachingObstacleDistance,
					) => {
						dispatchAiEvent(
							aiInput({
								closestApproachingObstacleDistance,
							})
						)
					})
				)
				.subscribe()
			)

			return () => {
				aiInputSubscription
				.unsubscribe()
			}
		},
		[
			gameState,
		],
	)

	useEffect(
		() => {
			const aiJudgmentSubscription = (
				createAiEventBusObservable()
				.pipe(
					ofType(
						aiOutput
						.type
					),
					delay(100),
					pluck(
						'payload'
					),
					tap(({
						input,
						output,
					}) => {
						dispatchAiEvent(
							aiJudgment({
								input,
								judgmentType: (
									gameStateRef.current
									=== gameStates.started
									? (
										judgmentTypes
										.neutral
									)
									: (
										judgmentTypes
										.negative
									)
								),
								output,
							})
						)
					})
				)
				.subscribe()
			)

			return () => {
				aiJudgmentSubscription
				.unsubscribe()
			}
		},
		[],
	)

	// useEffect(
	// 	() => {
	// 		if (
	// 			gameState
	// 			=== gameStates.stopped
	// 		) {
	// 			dispatchAiEvent(
	// 				aiJudgment({
	// 					input: {
	// 						closestApproachingObstacleDistance: 0,
	// 					},
	// 					judgmentType: (
	// 						judgmentTypes
	// 						.negative
	// 					),
	// 					output: null,
	// 				})
	// 			)
	// 		}
	// 	},
	// 	[
	// 		gameState,
	// 	],
	// )

	return (
		<div css={gameStyles}>
			{
				gameState === gameStates.started
				&& (
					<div>
						<Player playerRef={playerRef} />
						<Block blockRef={blockRef} />
					</div>
				)
			}

			{
				gameState === gameStates.stopped
				&& (
					<GameOver />
				)
			}
		</div>
	)
}

const MemoizedGame = memo(Game)

export default MemoizedGame
