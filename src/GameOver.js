/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
	memo,
} from 'react'

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

const GameOver = () => (
	<div css={gameOverStyles}>
		Game Over
	</div>
)

const MemoizedGameOver = memo(GameOver)

export default MemoizedGameOver
