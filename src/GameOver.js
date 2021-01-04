/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
	memo,
	useEffect,
	useState,
} from 'react'
import {
	interval,
} from 'rxjs'
import {
	tap,
} from 'rxjs/operators'

const gameOverStyles = css`
	align-items: center;
	color: lightgray;
	display: flex;
	font-size: 10vw;
	font-weight: bold;
	height: 100%;
	justify-content: center;
	text-transform: uppercase;
	width: 100%;
`

const Block = () => {
	const [
		xPosition,
		setXPosition,
	] = (
		useState(
			'100vw'
		)
	)

	useEffect(
		() => {
			const blockSubscription = (
				// TODO: This needs to be based on block movements.
				interval(50)
				.pipe(
					tap(() => {
						setXPosition((
							previousXPosition,
						) => {
							const nextXPosition = (
								Number(
									previousXPosition
									.replace(
										'vw',
										''
									)
								)
								- 1
							)

							return (
								nextXPosition
								> -1
								? `${nextXPosition}vw`
								: '105vw'
							)
						})
					}),
				)
				.subscribe()
			)

			return () => {
				blockSubscription
				.unsubscribe()
			}
		},
		[],
	)

	return (
		<div css={gameOverStyles}>
			Game Over
		</div>
	)
}

const MemoizedBlock = memo(Block)

export default MemoizedBlock
