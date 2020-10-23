// eslint-disable-next-line import/no-extraneous-dependencies
import { ErrorEvent, IEvent } from 'edc-ws'

export default class UserNotFoundErrorEvent extends ErrorEvent<{ username: string | undefined }> {
    constructor(username: string | undefined, failed: IEvent<any, any>) {
        super(failed, {
            cn: 'user-not-found',
            code: 4040,
            message: `User '${username}' was not found`,
            data: {
                username
            }
        })
    }
}
