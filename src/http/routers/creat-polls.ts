import { FastifyInstance } from 'fastify'
import z from 'zod'
import { prisma } from '../../../lip/prisma'

export async function creatPolls(app: FastifyInstance) {
  app.post('/polls', async (request, reply) => {
    const createPolls = z.object({
      title: z.string(),
      options: z.array(z.string())
    })

    const { title, options } = createPolls.parse(request.body)

    const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map(option => {
              return { title: option }
            })
          }
        }
      }
    })

    return reply.status(201).send(poll)
  })
}
