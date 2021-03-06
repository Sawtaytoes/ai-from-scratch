const hasNamespace = namespace => (
	namespace !== undefined
)

const hasState = state => (
	state !== undefined
)

const createNamespaceReducerCreator = (
	reducer,
	initialNamespaceState,
	{
		getPreviousState,
		removeNamespaceFromState,
		updateNamespaceState,
	},
) => {
	if (!reducer) {
		throw new Error(
			'Missing `reducer` argument in `createNamespaceReducerCreator`.'
		)
	}

	if (!initialNamespaceState) {
		throw new Error(
			'Missing `initialNamespaceState` argument in `createNamespaceReducerCreator`.'
		)
	}

	const initialState = (
		reducer(
			undefined,
			{},
		)
	)

	return (
		previousNamespaceState = initialNamespaceState,
		action,
	) => {
		const { namespace } = action

		// Added for early-fail performance improvments.
		// Namespace Reducers only care when there is a `namespace`.
		if (!hasNamespace(namespace)) {
			return previousNamespaceState
		}

		const prevState = (
			getPreviousState({
				namespace,
				previousNamespaceState,
			})
		)

		const nextState = (
			reducer(
				prevState,
				action,
			)
		)

		// If `nextState` didn't change after reducing, that means `action.type` wasn't used in `reducer` and we don't need to do any further complex calculations.
		const isStateUnchanged = (
			nextState === prevState
		)

		if (isStateUnchanged) {
			return previousNamespaceState
		}

		// Setting `nextState` to `initialState` means "remove me".
		// If the namespace state is back to its initial values, it can be safely removed.
		const isStateReset = (
			nextState === initialState
		)

		// If there wasn't already a state for this namespace, there are no changes.
		if (
			isStateReset
			&& !hasState(prevState)
		) {
			return previousNamespaceState
		}

		// We can remove this namespace from our `nextState` since it no longer has values we care about.
		if (isStateReset) {
			return (
				removeNamespaceFromState({
					namespace,
					previousNamespaceState,
				})
			)
		}

		// We've determined this namespace needs to be updated in our state.
		return (
			updateNamespaceState({
				namespace,
				nextState,
				previousNamespaceState,
			})
		)
	}
}

export default createNamespaceReducerCreator
