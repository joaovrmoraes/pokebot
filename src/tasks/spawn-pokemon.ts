import { getPokemon } from "@/commands/get-pokemon";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Channel } from "discord.js";
import { pokemonEmbed} from "@/components/pokemon-embed"

export async function spanwPokemon({ channel }: { channel: Channel }) {
  const randomNumber = Math.floor(Math.random() * 151) + 1;

  const pokemonData = await getPokemon(randomNumber);
  
  const buttonConfirm = new ButtonBuilder().setCustomId('confirm').setLabel('🔴 GO POKEBALL').setStyle(ButtonStyle.Success);

  const row = new ActionRowBuilder().addComponents(buttonConfirm);

  if (channel.isTextBased()) { 
    const message = await channel.send({components: [row], embeds: [ pokemonEmbed(pokemonData)]})
  }
  
}