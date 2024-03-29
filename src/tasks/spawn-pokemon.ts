import { getPokemon } from "@/commands/get-pokemon";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Channel, ComponentType } from "discord.js";
import { pokemonEmbed } from "@/components/pokemon-embed"

export async function spanwPokemon({ channel }: { channel: Channel }) {
  const randomNumber = Math.floor(Math.random() * 151) + 1;

  const pokemonData = await getPokemon(randomNumber);

  const button = new ButtonBuilder()
    .setCustomId('catch')
    .setLabel('Catch')
    .setStyle(ButtonStyle.Primary);

  const actionRow = new ActionRowBuilder().addComponents([button]).toJSON();

  if (channel.isTextBased()) {
    const message = await channel.send({ components: [actionRow], embeds: [pokemonEmbed(pokemonData)] });

    const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button });

    collector.on('collect', async interaction => {
      if (interaction.customId === 'catch') {
        const randomNumber = Math.floor(Math.random() * 100) + 1;

        if (randomNumber <= 100) {
          await interaction.reply({ content: 'Você pegou o Pokémon!', ephemeral: true });
        } else {
          await interaction.reply({ content: 'O Pokémon escapou!', ephemeral: true });

          await interaction.message.delete();
        }

        collector.stop();
      }
    });

  }
}