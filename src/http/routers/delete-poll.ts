import { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../../lip/prisma'

export async function deletePolls(app: FastifyInstance) {
  app.delete('/polls/:pollId', async (request, reply) => {
    const idPolls = z.object({
      pollId: z.string().uuid()
    })

    const approvalPolls = z.object({
      approval: z.boolean()
    })

    const { pollId } = idPolls.parse(request.params)

    const { approval } = approvalPolls.parse(request.body)

    console.log(approval)

    if (approval) {
      await prisma.voto.deleteMany({
        where: {
          pollId
        }
      })

      await prisma.pollOption.deleteMany({
        where: {
          pollId
        }
      })

      await prisma.poll.delete({
        where: {
          id: pollId
        }
      })

      return reply.status(200).send()
    }

    return reply
      .status(400)
      .send({ message: 'Was not approved to delete the poll.' })
  })
}
