import { Client, GatewayIntentBits, REST, Routes } from 'discord.js';
import { env } from '@/env'
import { commands } from './commands';
import { interactions } from './middlewares/interactions';

const { TOKEN, CLIENT_ID } = env

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });

export const rest = new REST({ version: '10' }).setToken(TOKEN);

client.on('ready', () => {
  if(client.user === null) return

  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
  interactions(interaction)
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
