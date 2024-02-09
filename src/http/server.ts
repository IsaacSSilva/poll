import { PrismaClient } from '@prisma/client'
import fastify from 'fastify'
import { z } from 'zod'

const app = fastify()

const prisma = new PrismaClient()

app.post('/polls', async request => {
  const createPolls = z.object({
    title: z.string()
  })

  const { title } = createPolls.parse(request.body)

  const poll = await prisma.poll.create({
    data: {
      title
    }
  })

  return poll
})

app.get('/polls', () => {
  return prisma.poll.findMany()
})

app.listen({ port: 3333 }).then(() => {
  console.log('Hello Word')
})
