import {createSlice} from '@reduxjs/toolkit'

const initialState={
    usercollectedData:[],
    Selected:0,
    NotSelected:0,
    lastSelectedId: null,
    skippedQuestions: [],
    userChoicedData:[],

}
const QuizSlice=createSlice({
    name:"quiz",
    initialState,
    reducers:{
        userSelected(state,action){
            const {id}=action.payload
            if (state.skippedQuestions.includes(id)) {
                // If the question was skipped before, remove it from the skippedQuestions array
                state.skippedQuestions = state.skippedQuestions.filter(
                    skippedId => skippedId !== id
                );}
           
            if (state.lastSelectedId !== id) {
                state.Selected += 1;
                state.lastSelectedId = id; 
                
                if (state.NotSelected > 0) {
                    state.NotSelected -= 1; 
                }
            }
            
        },
        userNotSelected(state,action){
            const {id}=action.payload
            if (!state.skippedQuestions.includes(id)) {
                // Increment NotSelected count only if the question hasn't been skipped before
                state.NotSelected += 1;
                state.skippedQuestions.push(id); // Add the skipped question to the array
            }
            state.skippedQuestions = state.skippedQuestions.filter((qid) => qid !== id);

    },
    collectedData(state,action){
            state.usercollectedData=[action.payload]
    },
    userChoiced(state,action){
        state.userChoicedData=[action.payload]
       
    }
}
})

export const {userNotSelected,userSelected,collectedData,userChoiced}=QuizSlice.actions

export default QuizSlice.reducer