import { createSlice } from "@reduxjs/toolkit";

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    pokemonList: [],
    selectedPokemonDetails: null,
  },
  reducers: {
    fetchPokemonList(state, action) { state.pokemonList = action.payload },
    findSelectedPokemonDetails: (state, action) => {
      state.selectedPokemonDetails = action.payload
    },

  }
})

export const { fetchPokemonList, findSelectedPokemonDetails } = pokemonsSlice.actions

export default pokemonsSlice.reducer