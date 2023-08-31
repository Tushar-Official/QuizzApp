import { configureStore } from "@reduxjs/toolkit";
import QuizSlice from './Slice'

export const store=configureStore({
    reducer:{
        quiz:QuizSlice,
    }
})