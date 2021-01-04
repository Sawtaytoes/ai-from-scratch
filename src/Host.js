/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import {
	createRef,
	memo,
	useMemo,
} from 'react'
// import { v4 as uuidV4 } from 'uuid'

const iframeStyles = css`
	border: 0;
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
