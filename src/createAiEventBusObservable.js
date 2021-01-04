import {
	fromEvent,
} from 'rxjs'
import {
	pluck,
} from 'rxjs/operators'

import aiEventBusName from './aiEventBusName'

const createAiEventBusObservable = () => (
	fromEvent(
		window,
		aiEventBusName,
	)
	.pipe(
		pluck(
			'detail'
		),
	)
)

export default createAiEventBusObservable
