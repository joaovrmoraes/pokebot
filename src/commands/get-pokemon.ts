import { pokemonApi } from "@/lib/axios"

export async function getPokemon(pokemon: string|number) {
  try {
    const pokemonResponse = await pokemonApi.get(`pokemon/${pokemon}`)
    const pokemonSpecie = await pokemonApi.get(`pokemon-species/${pokemon}/`)

    const pokemonData = pokemonResponse.data

    const pokemonId = pokemonData.id
    const pokemonName = pokemonData.name
    const pokemonImage = pokemonData.sprites.other['official-artwork'].front_default
    const pokemonHeight = pokemonData.height
    const pokemonWeight = pokemonData.weight
    const pokemonColor = pokemonSpecie.data.color.name
    const pokemonDescription = pokemonSpecie.data.flavor_text_entries[0].flavor_text
    const pokemonChance = pokemonSpecie.data.capture_rate

    return {
      id: pokemonId,
      name: pokemonName,
      image: pokemonImage,
      height: pokemonHeight,
      weight: pokemonWeight,
      color: pokemonColor,
      description: pokemonDescription,
      chance: pokemonChance
    }
  } catch (error: any) {
    if (error.response && error.response.status === 404) {
      return { error: 'Pokemon not found' }
    }
    throw error
  }
}