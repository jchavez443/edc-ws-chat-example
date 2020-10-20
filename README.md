# Chat Room
This is example use of the [edc-ws]() npm package.

> Don't forget to run `npm install` & `npm run build`
## Running the Chat Room
First you must run the server:
```bash
npm run server
```

Then start up as many clients as you would like:
```bash
npm run client
```
The client will prompt you with a `username` & `password`
```bash
Username?  testUser
Password?  password
Connecting to server, testUser
testUser: Hello!
```

As users join the server they will brodcast the message `<username>: Hello!`

### Sending a Message

To send a message to a user type `>` followed by a username (no spaces); enter and type your message on the next line.

User: `jake`
```bash
Username?  jake
Password?  password
Connectiong to server, jake
jake: Hello!
>john
> How are you today?
```

The other user `john` should see this
```bash
Username?  john
Password?  password
Connectiong to server, john
john: Hello!
jake: Hello!
jake: How are you today?
```