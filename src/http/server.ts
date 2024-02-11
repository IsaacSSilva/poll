import fastify from 'fastify'
import { creatPolls } from './routers/creat-polls'
import { getPoll } from './routers/get-poll'
import { creatVoto } from './routers/creat-on-votos'
import cookie from '@fastify/cookie'

const app = fastify()

app.register(cookie, {
  secret: 'Poll-Vote-Node.js',
  hook: 'onRequest'
})

app.register(creatPolls)
app.register(getPoll)
app.register(creatVoto)

app.listen({ port: 3333 }).then(() => {
  console.log('Runner Server HTTP! 🔥')
})
