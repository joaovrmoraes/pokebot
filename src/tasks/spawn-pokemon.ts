import { getPokemon } from "@/commands/get-pokemon";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, Channel, ComponentType } from "discord.js";
import { pokemonEmbed } from "@/components/pokemon-embed"
import { prisma } from "@/lib/prisma";

export async function spanwPokemon({ channel }: { channel: Channel }) {
  const randomNumber = Math.floor(Math.random() * 151) + 1;

  const pokemonData = await getPokemon(randomNumber);

  const button = new ButtonBuilder()
    .setCustomId('catch')
    .setLabel('Catch')
    .setStyle(ButtonStyle.Danger);

  const actionRow = new ActionRowBuilder().addComponents([button]).toJSON();


  if (channel.isTextBased()) {
    const message = await channel.send({ components: [actionRow], embeds: [pokemonEmbed(pokemonData)], fetchReply: true });

    const collector = message.createMessageComponentCollector({ componentType: ComponentType.Button });

    collector.on('collect', async interaction => {
      if (interaction.customId === 'catch') {
        const randomNumber = Math.floor(Math.random() * 200) + 1;

        console.log("randomNumber", randomNumber, "pokemonData.chance", pokemonData.chance)

        if (randomNumber <= pokemonData.chance) {
          await interaction.reply({ content: 'Você pegou o Pokémon!', ephemeral: true });

          await prisma.pCPokemon.create({
            data: {
              name: pokemonData.name,
              image: pokemonData.image,
              userId: interaction.user.id,
            }
          });

        } else {
          await interaction.reply({ content: 'O Pokémon escapou!', ephemeral: true });

        }

        collector.stop();
      }
    });

  }
}