import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lip/prisma'
import z from 'zod'

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (request, reply) => {
    const getPolls = z.object({
      pollId: z.string().uuid()
    })

    const { pollId } = getPolls.parse(request.params)

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId
      },
      include: {
        options: {
          select: {
            id: true,
            title: true
          }
        }
      }
    })

    return reply.send({ poll })
  })
}
