import { ErrorEvent, IEvent } from 'edc-ws'

export default class UnknownEventErrorEvent extends ErrorEvent<undefined> {
    constructor(failed: IEvent<any, any>) {
        super(failed, {
            cn: 'user-not-found',
            code: 4040,
            message: `Unknown event type ${failed.type}`,
            data: undefined
        })
    }
}
