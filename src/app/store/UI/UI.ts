import { createSlice } from '@reduxjs/toolkit'

export const UISlice = createSlice({
    name: 'UI',
    initialState: {
        location: "/main",
    },
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { setLocation } = UISlice.actions

export default UISlice.reducer
