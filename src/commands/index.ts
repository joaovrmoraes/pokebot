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
    description: 'Replies with the pokemon name or id',
    options: [
      {
        name: 'pokemon',
        description: 'The pokemon name or id',
        type: 3,
        required: true
      }
    ]
  },
  {
    name: 'pc',
    description: 'Replies yours pokemons in PC',
  }
]