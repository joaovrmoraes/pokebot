import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { env } from '@/env'
import { commands } from './commands';
import { interactions } from './middlewares';
import { spanwPokemon } from './tasks/spawn-pokemon';

const { TOKEN, CLIENT_ID } = env

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => {
  if (client.user === null) return

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  interactions(interaction)
});


client.once('ready', () => {
  console.log('Bot is ready');

  const channelId = '889178136011501611';
  const channel = client.channels.cache.get(channelId);

  if (!channel) {
    console.error(`Channel with ID ${channelId} not found`);
    return;
  }

  spanwPokemon({ channel });
});

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();
