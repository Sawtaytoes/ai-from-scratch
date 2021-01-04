/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
	createRef,
	memo,
	useMemo,
} from 'react'
// TODO: All UUIDs to each Ai in the future, so they can be individualized in a larger database. Problem is knowing which UUIDs are the current generation.
// import { v4 as uuidV4 } from 'uuid'

const iframeStyles = css`
	border: 0;
	display: block;
	height: 20%;
	width: 100%;
`

const Host = () => {
	const iframes = (
		useMemo(
			() => (
				Array(5)
				.fill()
				.map((
					value,
					index,
				) => (
					index
				))
				.map((
					aiId,
				) => {
					const url = (
						new URL(
							window
							.location
							.href
						)
					)

					url
					.searchParams
					.append(
						'aiId',
						aiId,
					)

					return url
				})
				.map((
					url,
				) => ({
					ref: createRef(),
					src: url,
				}))
			),
			[],
		)
	)

	return (
		iframes
		.map(({
			ref,
			src,
		}) => (
			<iframe
				css={iframeStyles}
				key={src}
				ref={ref}
				src={src}
			/>
		))
	)
}

const MemoizedHost = memo(Host)

export default MemoizedHost
