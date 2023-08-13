import { configureStore } from '@reduxjs/toolkit'
import sliceItems from './todos/sliceItems'

export const store = configureStore({
    reducer: {

        item: sliceItems
    }
})