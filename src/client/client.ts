/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import Edc, { TimeoutError, AckedErrorEvent, ClientHandlers } from 'edc-ws'
import readline from 'readline'
import prompt from 'prompt-sync'
import { MessageUserEvent, UserMessageEvent, UnknownEventErrorEvent } from '../events'

const input = prompt()

const username = input('Username?  ')
const password = input('Password?  ')
console.log(`Connectiong to server, ${username}`)

const clientHandlers: ClientHandlers = {
    onEvent: async (cause, reply) => {
        if (cause.type === UserMessageEvent.type) {
            const userMsg = <UserMessageEvent>cause

            if (userMsg.details === undefined) return

            const { sender, message } = userMsg.details

            console.log(`${sender}: ${message}`)
        } else {
            console.log(`Unknown event recieved: ${cause.type}`)
            reply(new UnknownEventErrorEvent(cause))
        }
    },
    onError: async (cause, reply) => {
        console.log(cause.details.message)
    },
    onAck: async (cause, reply) => {}
}

const client = new Edc.Client('ws://localhost:8081', clientHandlers, {
    auth: `${username}:${password}`
})

/**
 * User input and main loop here
 */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
async function main() {
    rl.question('', (targetStr) => {
        if (targetStr.startsWith('>')) {
            const target = targetStr.substring(1)
            rl.question('> ', async (message) => {
                const event = new MessageUserEvent(target, message)

                try {
                    await client.sendEvent(event)
                } catch (e) {
                    if (e instanceof TimeoutError) {
                        console.log(e.message)
                    } else if (e instanceof AckedErrorEvent) {
                        if (e.code === 4040) {
                            const user = e.data.username
                            console.log(`${e.cn} on ${user}`)
                        }
                        console.log(e.cn)
                        console.log(e.message)
                    } else {
                        console.log(e.message)
                    }
                }
                main()
            })
        }
    })
}

main()
