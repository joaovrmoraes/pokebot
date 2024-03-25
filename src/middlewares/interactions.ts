import { getPokemon } from "@/commands/get-pokemon";

export async function interactions(interaction: any) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }

  if (interaction.commandName === 'beep') {
    await interaction.reply('Boop!');
  }

  if (interaction.commandName === 'pokemon') {
    const pokemon = interaction.options.getString('pokemon')

    const pokemonData = await getPokemon(pokemon)

    await interaction.reply(`Name: ${pokemonData.name} \nImage: ${pokemonData.image}`)
  }
}