import { Interaction } from "discord.js"
import { listPokemon } from '@/commands/list-pokemon'

export async function getPcPokemonsInteraction({
  interaction
}: {
  interaction: Interaction
}) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'pc') {
    const userId = interaction.user.id

    const pokemons = await listPokemon({ userId })

    if (pokemons.length === 0) {
      await interaction.reply('You dont have any pokemon in your PC')
      return
    }

    await interaction.reply({ content: 'Your pokemons in PC:', ephemeral: true })
    await interaction.followUp({ content: pokemons.map(pokemon => `**${pokemon.name}**`).join('\n') })
  }

}