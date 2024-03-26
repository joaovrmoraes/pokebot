import { Interaction, EmbedBuilder } from "discord.js";
import { getPokemon } from "@/commands/get-pokemon";
import { pokemonEmbed } from "@/components/pokemon-embed";

export async function getPokemonInteraction({
  interaction
}: {
  interaction: Interaction
}) {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'pokemon') {
    const pokemon = interaction.options.getString('pokemon')

    if (!pokemon) {
      await interaction.reply('Please provide a pokemon name')
      return
    }

    const pokemonData = await getPokemon(pokemon)

    if (pokemonData.error) {
      await interaction.reply('Pokemon not found')
      return
    }

    await interaction.reply({ embeds: [pokemonEmbed(pokemonData)], ephemeral: true })

  }

}