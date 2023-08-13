import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = 'https://64d2182ff8d60b17436172a3.mockapi.io/contacts'  //Q

export const getItems = createAsyncThunk(
    'item/getItems',
    async (_,) => {

        const resp = await axios.get(API_URL)
        return resp.data
    }
)

export const addItems = createAsyncThunk(
    'item/addItems',
    async ([newName, newNumber], { rejectWithValue, dispatch }) => {

        const resp = await axios.post(API_URL, {
            name: newName,
            phone: newNumber
        })
        dispatch(addListItems(resp.data))
    }
)

export const deleteItems = createAsyncThunk(
    'item/deleteItems',
    async (id, { dispatch }) => {

        await axios.delete(`${API_URL}/${id}`)
        dispatch(deleteListItems(id))
    }
)

//---------Helper--------------------
const setError = (state) => {
    state.isLoading = false
    state.error = true
}

export const sliceItems = createSlice({

    name: 'item',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        sorted: []
    },

    reducers: {
        sortListItems: (state, action) => {
            try {
                state.sorted = state.items.filter(todo =>
                    todo.name.toLowerCase().includes(action.payload.toLowerCase()))

            } catch (error) {
                console.error(error)
            }

        },
        addListItems: (state, action) => {

            state.items.push(action.payload)
        },
        deleteListItems: (state, action) => {
            state.items = state.items.filter(todo => todo.id !== action.payload)
            state.sorted = state.sorted.filter(todo => todo.id !== action.payload)
        }
    },
    extraReducers: {
        [getItems.pending]: (state) => { state.isLoading = false },
        [getItems.fulfilled]: (state, action) => {
            state.items = action.payload
            state.isLoading = true
        },
        [getItems.rejected]: setError,
        [addItems.rejected]: setError,
        [deleteItems.rejected]: setError
    }
})

export const { sortListItems, addListItems, deleteListItems } = sliceItems.actions
export default sliceItems.reducer
