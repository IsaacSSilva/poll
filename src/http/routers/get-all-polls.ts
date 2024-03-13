import { FastifyInstance } from 'fastify'
import { prisma } from '../../lip/prisma'

export async function getAllPoll(app: FastifyInstance) {
  app.get('/polls/all', async (request, reply) => {
    const poll = await prisma.poll.findMany()

    return reply.send({
      poll
    })
  })
}
