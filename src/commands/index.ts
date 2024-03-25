export const commands = [
  {
    name: 'ping',
    description: 'Replies with Pong!',
  },
  {
    name: 'beep',
    description: 'Replies with Boop!',
  },
  {
    name: 'pokemon',
    description: 'Replies with the pokemon name',
    options: [
      {
        name: 'pokemon',
        description: 'The pokemon name',
        type: 3,
        required: true
      }
    ]
  }
]