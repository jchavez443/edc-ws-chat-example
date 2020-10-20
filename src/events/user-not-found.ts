import { ErrorEvent, IEvent } from 'edc-ws'

export default class UserNotFoundErrorEvent extends ErrorEvent {
    data: {
        username: string | undefined
    }

    constructor(username: string | undefined, failed: IEvent<any>) {
        super(failed, {
            cn: 'user-not-found',
            code: 4040,
            message: `User '${username}' was not found`
        })

        this.data = {
            username
        }
    }
}
