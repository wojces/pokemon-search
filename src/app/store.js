import { configureStore } from '@reduxjs/toolkit'
import pokemonsReducer from '../features/pokemons/pokemonsSlice'
import app2Reducer from '../features/app2/app2Slice'

export default configureStore({
  reducer: {
    pokemons: pokemonsReducer,
    app2: app2Reducer
  }
})