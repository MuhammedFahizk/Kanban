import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { deleteTask } from "../redux/todoSlice";

const Todo = ({setShowModal}) => {
  const dispatch = useDispatch()
  const { task } = useSelector((state) => state.task);
  console.log(task);
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const categories = ["PENDING", "PROGRESS", "COMPLETED"];
  const handleDelete = (taskId) => {
    const confirmed = window.confirm("Are you sure you want to delete this?");
    if (confirmed) {
      console.log("hai");
      dispatch(deleteTask(taskId))
      // Add your delete logic here
    }
  };
  return (
    <div className="mx-40 my-5 border rounded-lg flex">
      {categories.map((category, categoryIndex) => (
        <Droppable droppableId={category} key={category}>
          {(provided) => (
            <div
              className="w-1/3  justify-center "
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <h1 className="flex justify-center text-2xl font-mono">
                {category}
              </h1>
              <hr />
              <div>
                {task
                  .filter((item) => item.status === category)
                  .map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="border m-2 rounded-md p-2 hover:bg-neutral-100 shadow-lg hover:-translate-x-2"
                          onMouseEnter={() => setHoveredTaskId(item.id)}
                          onMouseLeave={() => setHoveredTaskId(null)}
                        >
                          <div className="flex justify-between gap-1">
                            <h1 className="font-bold">Task Name:</h1>
                            <p>{item.taskName}</p>
                          </div>
                          <div className="flex justify-between gap-1">
                            <h1 className="font-bold">Description:</h1>
                            <p>{item.description}</p>
                          </div>
                          <div className="flex justify-between gap-1">
                            <h1 className="font-bold">Due Date:</h1>
                            <p>{item.date}</p>
                          </div>
                          <div
                            className={
                              hoveredTaskId == item.id
                                ? "flex justify-center gap-3 items-center pt-2 "
                                : "hidden"
                            }
                          >
                            <hr />

                            <FaPencilAlt onClick={() => setShowModal(true)} className="hover:text-green-600" />
                            <MdDelete
                              onClick={() => handleDelete(item.id)}
                              className="text-2xl text-red-500 hover:text-red-900" />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      ))}
    </div>
  );
};

export default Todo;
