import { Event } from 'edc-ws'

export default class UserMessageEvent extends Event<{ message: string; sender: string }> {
    details: {
        message: string
        sender: string
    }

    static type = `user-message`

    constructor(sender: string, message: string) {
        super(UserMessageEvent.type)

        this.details = {
            message,
            sender
        }
    }
}
