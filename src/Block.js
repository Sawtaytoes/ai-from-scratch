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
	interval,
} from 'rxjs'
import {
	tap,
} from 'rxjs/operators'

const blockBaseStyles = css`
	background-color: #ff69b4;
	bottom: 20vh;
	height: 10vh;
	position: absolute;
	width: 5vw;
`

const propTypes = {
	blockRef: PropTypes.object,
}

const Block = ({
	blockRef,
}) => {
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

	const blockStyles = (
		useMemo(
			() => (
				css`
					${blockBaseStyles}
					${
						css`
							left: ${xPosition};
						`
					}
				`
			),
			[
				xPosition,
			],
		)
	)

	return (
		<div
			css={blockStyles}
			ref={blockRef}
		/>
	)
}

Block.propTypes = propTypes

const MemoizedBlock = memo(Block)

export default MemoizedBlock
