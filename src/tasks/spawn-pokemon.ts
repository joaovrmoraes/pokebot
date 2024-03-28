import { getPokemon } from "@/commands/get-pokemon";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Channel } from "discord.js";
import { pokemonEmbed } from "@/components/pokemon-embed"

export async function spanwPokemon({ channel }: { channel: Channel }) {
  const randomNumber = Math.floor(Math.random() * 151) + 1;

  const pokemonData = await getPokemon(randomNumber);

  if (channel.isTextBased()) {
    const message = await channel.send({ components: [], embeds: [pokemonEmbed(pokemonData)], stickers: [] });
    message.react('🔴');

    message.awaitReactions({ filter: (reaction, user) => reaction.emoji.name === '🔴' && user.id !== message.author.id, max: 1, time: 30000, errors: ['time'] })

  }
}