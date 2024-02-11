import fastify from 'fastify'
import { creatPolls } from './routers/creatPolls'
import { getPoll } from './routers/getPoll'

const app = fastify()

app.register(creatPolls)
app.register(getPoll)

app.listen({ port: 3333 }).then(() => {
  console.log('Runner Server HTTP! 🔥')
})
