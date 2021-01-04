/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import PropTypes from 'prop-types'
import {
	memo,
	useEffect,
	useMemo,
	useState,
} from 'react'
import {
	fromEvent,
	timer,
} from 'rxjs'
import {
	filter,
	tap,
} from 'rxjs/operators'

const playerBaseStyles = css`
	height: 10vh;
	left: 10vw;
	position: absolute;
	width: 5vw;
`

const propTypes = {
	playerRef: PropTypes.object,
}

const Player = ({
	playerRef,
}) => {
	const [
		isJumping,
		setIsJumping,
	] = (
		useState(
			false
		)
	)

	useEffect(
		() => {
			const keyCodeSubscription = (
				fromEvent(
					window,
					'keydown',
				)
				.pipe(
					filter(({
						code,
					}) => (
						code === 'Space'
					)),
					tap(() => {
						setIsJumping(
							true,
						)
					}),
				)
				.subscribe()
			)

			return () => {
				keyCodeSubscription
				.unsubscribe()
			}
		},
		[],
	)

	useEffect(
		() => {
			const jumpingSubscription = (
				// TODO: This needs to be based on block movements.
				timer(150)
				.pipe(
					tap(() => {
						setIsJumping(
							false,
						)
					}),
				)
				.subscribe()
			)

			return () => {
				jumpingSubscription
				.unsubscribe()
			}
		},
		[
			isJumping,
		],
	)

	const playerStyles = (
		useMemo(
			() => (
				css`
					${playerBaseStyles}
					${
						isJumping
						? (
							css`
								background-color: lightgray;
								bottom: 30vh;
							`
						)
						: (
							css`
								background-color: gray;
								bottom: 20vh;
							`
						)
					}
				`
			),
			[
				isJumping,
			],
		)
	)

	return (
		<div
			css={playerStyles}
			ref={playerRef}
		/>
	)
}

Player.propTypes = propTypes

const MemoizedPlayer = memo(Player)

export default MemoizedPlayer
