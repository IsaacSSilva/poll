type Message = {
  pollOptionId: string
  voto: number
}
type Subscriber = (messege: Message) => void

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {}

  subscribe(pollId: string, subscriber: Subscriber) {
    if (!this.channels[pollId]) this.channels[pollId] = []
    this.channels[pollId].push(subscriber)
  }

  publish(pollId: string, messege: Message) {
    if (!this.channels[pollId]) {
      return
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(messege)
    }
  }
}

export const voting = new VotingPubSub()
