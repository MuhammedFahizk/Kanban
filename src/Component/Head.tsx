import { useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { useDispatch } from 'react-redux';
import { addToTask } from "../redux/todoSlice";
import { v4 as uuidv4 } from 'uuid';

const Head = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    taskName: '',
    description: '',
    date: '',
    status: 'PENDING'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      ...formData,
      id: uuidv4() 
    };
    dispatch(addToTask(newTask));
    setFormData({
      id: '',
      taskName: '',
      description: '',
      date: '',
      status: 'PENDING'
    });
    setOpen(false); 
  };

  return (
    <div className="">
      <div className="flex justify-center h-fit mt-20 items-center">
        <button
          onClick={() => setOpen(!open)}
          className="bg-green-300 rounded-md w-1/6 p-2 flex justify-between items-center from-neutral-400"
        >
          Add Task <IoIosAddCircle className="text-2xl" />
        </button>
      </div>
      <div className={open ? '' : 'hidden'}>
        <div>
          <form
            className="border mx-40 rounded-lg p-6 flex gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Enter Task Name"
              name="taskName"
              className="border rounded-md p-2"
              value={formData.taskName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Enter Task Description"
              name="description"
              className="border rounded-md p-2"
              value={formData.description}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              placeholder="Pick The Date"
              name="date"
              className="border rounded-md p-2 px-10"
              value={formData.date}
              onChange={handleChange}
              required
            />
            <button type="submit" className="bg-green-200 px-20 rounded hover:bg-green-600">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
    
  );
};

export default Head;
