import { Pokemon } from "@/dto/pokemon-api";
import { EmbedBuilder } from "discord.js";

export function pokemonEmbed(pokemonData: Pokemon | { error: string }) {
  if ('error' in pokemonData) {
    // Handle error
    const embed = new EmbedBuilder()
      .setTitle('Error')
      .setDescription(pokemonData.error)
      .setColor('#ff0000');
    return embed;
  }

  const embed = new EmbedBuilder()
    .setTitle(pokemonData.name.toLocaleUpperCase())
    // .setImage(pokemonData.image)
    .setThumbnail(pokemonData.image)
    .addFields(
      { name: 'Description', value: pokemonData.description },
      { name: '\u200B', value: '\u200B' },
    )
    .setTimestamp()
  return embed;
}