import PropTypes from 'prop-types'
import {
	memo,
	useCallback,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useState,
} from 'react'
import {
	fromEvent,
	of,
	race,
} from 'rxjs'
import {
	filter,
	map,
	pluck,
	tap,
} from 'rxjs/operators'

import AiContext from './AiContext'
import AiIdContext from './AiIdContext'
import getAiDataStoreBehaviorSubject from './getAiDataStoreBehaviorSubject'
import parseJsonData from './parseJsonData'

const propTypes = {
	children: PropTypes.node,
}

const AiProvider = ({
	children,
}) => {
	const {
		aiId,
	} = (
		useContext(
			AiIdContext
		)
	)

	const [
		aiDataStore$,
		setAiDataStore$,
	] = (
		useState()
	)

	const localStorageKey = (
		useMemo(
			() => (
				`aiId: ${aiId}`
			),
			[
				aiId,
			],
		)
	)

	const saveAiDataStore = (
		useCallback(
			(
				data,
			) => {
				localStorage
				.setItem(
					(
						localStorageKey
					),
					(
						JSON
						.stringify(
							data
						)
					),
				)
			},
			[
				localStorageKey,
			],
		)
	)

	useLayoutEffect(
		() => {
			const aiDataStoreSubscription = (
				of(null)
				.pipe(
					map(() => (
						localStorage
						.getItem(
							localStorageKey
						)
					)),
					map(parseJsonData),
					map(getAiDataStoreBehaviorSubject),
					tap(setAiDataStore$),
				)
				.subscribe()
			)

			return () => {
				aiDataStoreSubscription
				.unsubscribe()
			}
		},
		[
			localStorageKey,
		],
	)

	useEffect(
		() => {
			const storageSubscriber = (
				fromEvent(
					window,
					'storage',
				)
				.pipe(
					filter(({
						key,
					}) => (
						key === localStorageKey
					)),
					pluck('newValue'),
					map(parseJsonData),
					map(getAiDataStoreBehaviorSubject),
					tap(setAiDataStore$),
				)
				.subscribe()
			)

			return () => {
				storageSubscriber
				.unsubscribe()
			}
		},
		[
			localStorageKey,
		],
	)

	useEffect(
		() => {
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
				.pipe(
					tap(() => {
						saveAiDataStore(
							aiDataStore$
							.value
						)
					}),
				)
				.subscribe()
			)

			return () => {
				browserCloseSubscription
				.unsubscribe()
			}
		},
		[
			aiDataStore$,
			localStorageKey,
			saveAiDataStore,
		],
	)

	const aiProviderValue = (
		useMemo(
			() => ({
				aiDataStore$,
			}),
			[
				aiDataStore$,
			],
		)
	)

	return (
		<AiContext.Provider
			value={aiProviderValue}
		>
			{
				aiDataStore$
				&& children
			}
		</AiContext.Provider>
	)
}

AiProvider.propTypes = propTypes

const MemoizedAiProvider = memo(AiProvider)

export default MemoizedAiProvider
