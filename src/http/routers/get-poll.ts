import { FastifyInstance } from 'fastify'
import { prisma } from '../../lip/prisma'
import z from 'zod'
import { redis } from '../../lip/redis'

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

    if (!poll) {
      return reply.status(400).send({ message: 'poll not fund.' })
    }

    const result = await redis.zrange(pollId, 0, -1, 'WITHSCORES')

    const votos = result.reduce((obj, line, index) => {
      if (index % 2 === 0) {
        const score = result[index + 1]

        Object.assign(obj, { [line]: Number(score) })
      }

      return obj
    }, {} as Record<string, number>)

    return reply.send({
      poll: {
        id: poll.id,
        title: poll.title,
        options: poll.options.map(option => {
          return {
            id: option.id,
            title: option.title,
            score: option.id in votos ? votos[option.id] : 0
          }
        })
      }
    })
  })
}
