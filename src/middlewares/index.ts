import { Interaction } from "discord.js";
import { getPokemonInteraction } from "./interactions/get-pokemon-interaction";
import { pingInteraction } from "./interactions/ping-interaction";

export async function interactions(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  pingInteraction({ interaction })


  getPokemonInteraction({ interaction });

}