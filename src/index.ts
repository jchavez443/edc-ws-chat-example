/* eslint-disable no-use-before-define */
import Edc, { Event } from 'edc-ws'

const server = new Edc.Server(800, {
    onAck: async (cause, info, reply, send) => {
        reply(cause)
        send(info, cause)
    },
    onError: async () => {},
    onEvent: async () => {}
})
