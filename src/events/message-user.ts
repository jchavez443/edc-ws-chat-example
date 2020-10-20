import { Event } from 'edc-ws'

export default class MessageUserEvent extends Event<{ message: string; target: string }, undefined> {
    static type: string = `message-user`

    constructor(target: string, message: string) {
        super(MessageUserEvent.type)

        this.details = {
            message,
            target
        }
    }
}
