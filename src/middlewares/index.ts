import { Interaction } from "discord.js";
import { getPokemonInteraction } from "./interactions/get-pokemon-interaction";
import { pingInteraction } from "./interactions/ping-interaction";
import { getPcPokemonsInteraction } from "./interactions/get-pc-pokemons";

export async function interactions(interaction: Interaction) {
  if (!interaction.isChatInputCommand()) return;

  pingInteraction({ interaction })


  getPokemonInteraction({ interaction });

  getPcPokemonsInteraction({ interaction });

}