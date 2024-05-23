import React from 'react';
import './App.css';
import Head from './Component/Head';
import Todo from './Component/Todo';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { DragDropContext } from 'react-beautiful-dnd';
import todoSlice, { reOrderTask } from './redux/todoSlice';
import Modal from './Component/Modal';

const store = configureStore({
  reducer: {
    task: todoSlice,
  }
});

const onDragEnd = (result) => {
  if (!result.destination) return;

  const { source, destination, draggableId } = result;

  store.dispatch(reOrderTask({
    sourceIndex: source.index,
    destIndex: destination.index,
    sourceDropId: source.droppableId,
    destinationDropId: destination.droppableId,
    draggableId : draggableId
  }));
};

function App() {
  const [showModal, setShowModal] = React.useState(true);

  return (
    <Provider store={store}>
      <Head />
      <DragDropContext onDragEnd={onDragEnd}>
        <Todo setShowModal = {setShowModal} />
        {/* {showModal? 
        <Modal setShowModal = {setShowModal}/>:
        null
      } */}
      </DragDropContext>
    </Provider>
  );
}

export default App;
