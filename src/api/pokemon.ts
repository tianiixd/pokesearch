import axios from "axios";
import type { PokemonData } from "../types/pokemon.types";

const BASE_URL: string = "https://pokeapi.co/api/v2";

export const fetchPokemonByName = async (
  pokemonName: string,
): Promise<PokemonData> => {
  try {
    const response = await axios.get<PokemonData>(
      `${BASE_URL}/pokemon/${pokemonName.toLowerCase()}`,
    );

    const data = response.data;

    return data;
  } catch (error) {
    console.error("API Fetch Error:", error);
    throw error;
  }
};
