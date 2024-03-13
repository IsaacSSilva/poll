import fastify from 'fastify'
import { creatPolls } from './routers/creat-polls'
import { getPoll } from './routers/get-poll'
import { creatVoto } from './routers/creat-on-votos'
import cookie from '@fastify/cookie'
import websocket from '@fastify/websocket'
import { pollResults } from './ws/poll-results'
import { getAllPoll } from './routers/get-all-polls'
import { deletePolls } from './routers/delete-poll'

const app = fastify()

app.register(cookie, {
  secret: 'Poll-Vote-Node.js',
  hook: 'onRequest'
})

app.register(websocket)

app.register(deletePolls)
app.register(getAllPoll)
app.register(getPoll)
app.register(creatPolls)
app.register(creatVoto)
app.register(pollResults)

app.listen({ port: 3333 }).then(() => {
  console.log('Runner Server HTTP! 🔥')
})
