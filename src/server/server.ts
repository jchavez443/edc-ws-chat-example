/* eslint-disable no-use-before-define */
/* eslint-disable import/no-extraneous-dependencies */
import Edc, {
    BasicAuth
    // eslint-disable-next-line import/no-unresolved
} from 'edc-ws'
import WebSocket from 'ws'
import { MessageUserEvent, UserMessageEvent, UserNotFoundErrorEvent } from '../events'

const port = 8081
const server = new Edc.Server(port)

server.authenticate = (request) => {
    const auth = new BasicAuth(request.headers.authorization || '')
    auth.authenticated = auth.password === 'password'

    return auth
}
server.onClose = async (event, connection) => {
    remove(connection)
}
server.onConnect = async (connection, auth: BasicAuth, arg3, that) => {
    add(auth.username, connection)
    that.broadCast(new UserMessageEvent(auth.username, 'Hello!'))
}
server.onError = async (cause, info, reply, send) => {
    console.log(cause.details.message)
}

server.onEvent(MessageUserEvent.type, async (cause, conn, reply, send) => {
    const messageUser = <MessageUserEvent>cause
    if (messageUser.details === undefined) return

    const { target, message } = messageUser.details

    const sender = getUsername(conn)
    const targetConn = getConnection(target)

    if (!sender || !targetConn) {
        reply(new UserNotFoundErrorEvent(target, cause))
        return
    }

    const userMsg = new UserMessageEvent(sender, message).inherit(cause)

    send(targetConn, userMsg)
})

/**
 * This is stands in place of the connection manager role
 */
const map1: Map<string, WebSocket> = new Map()
const map2: Map<WebSocket, string> = new Map()

function add(username: string, connection: WebSocket) {
    console.log(`Adding user '${username}'`)
    map1.set(username, connection)
    map2.set(connection, username)
}

function remove(connection: WebSocket) {
    const username = map2.get(connection)
    map2.delete(connection)
    console.log(`Removing user '${username}'`)
    map1.delete(username || '')
}

function getConnection(username: string): WebSocket | undefined {
    return map1.get(username)
}

function getUsername(ws: WebSocket) {
    return map2.get(ws)
}
