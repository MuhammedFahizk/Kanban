import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  task: []
};

const todoSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    addToTask(state, action) {
      state.task.push(action.payload);
    },
    reOrderTask(state, action) {
      console.log(action.payload);
      
      const { sourceIndex, destIndex, sourceDropId, destinationDropId ,draggableId} = action.payload;
      
      // Find the moved task
      const task = state.task.find(task => task.id === draggableId);
      if (task) {
          task.status = destinationDropId
      }
    
  },
  deleteTask(state, action) {
    state.task = state.task.filter(task => task.id !== action.payload);
  }
}});

export const { addToTask, reOrderTask, deleteTask } = todoSlice.actions;
export default todoSlice.reducer;
