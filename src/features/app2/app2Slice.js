import { createSlice } from "@reduxjs/toolkit";

export const app2Slice = createSlice({
  name: 'app2',
  initialState: {
    localOrganizations: [],
    dataOrganizations: [],
    token: null,
  },
  reducers: {
    fetchLocalOrganizations(state, action) {
      state.localOrganizations = action.payload
    },
    fetchDataOrganizations: (state, action) => {
      state.dataOrganizations = action.payload
    },
    setToken(state, action) {
      state.token = action.payload
    }
  }
})

export const { fetchLocalOrganizations, fetchDataOrganizations, setToken } = app2Slice.actions

export default app2Slice.reducer