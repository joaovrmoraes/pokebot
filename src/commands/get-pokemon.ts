import { pokemonApi } from "@/lib/axios"

export async function getPokemon(pokemon: string) {
  const pokemonResponse = await pokemonApi.get(`pokemon/${pokemon}`)
   
  const pokemonData = pokemonResponse.data

  const pokemonName = pokemonData.name
  const pokemonImage = pokemonData.sprites.front_default

  return {
    name: pokemonName,
    image: pokemonImage
  }
}