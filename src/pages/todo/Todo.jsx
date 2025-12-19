import React, { useState, useEffect, useRef } from "react";
import "./Todo.css";
import axios from "axios";
import Navbar from "../navbar/navbar";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Todo = () => {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const firstRender = useRef(true);
  const navigate = useNavigate();

  // Helper to get config with token
  const getConfig = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first!");
      navigate("/login");
      return null;
    }
    return {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    };
  };

  // Fetch todos on component mount
  useEffect(() => {
    const fetchTodos = async () => {
      const config = getConfig();
      if (!config) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/todo/get`, config);
        settodos(res.data.todos);
      } catch (err) {
        console.error("Failed to fetch todos:", err);
        toast.error(err.response?.data?.message || "Could not fetch todos");
      }
    };

    fetchTodos();
  }, []);

  // Save todos to localStorage on change (skip first render)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  // SAVE TODO
  const handleSave = async () => {
    const regex = /^[A-Za-z0-9\s.,!?-]{1,100}$/;

    if (!todo) {
      toast.error("Please enter the todo");
      return;
    }

    if (!regex.test(todo)) {
      toast.error("Invalid Todo! Only letters, numbers, spaces, and . , ! ? - allowed, 1-100 chars.");
      return;
    }

    const isDuplicate = todos.some(
      (item) => item.title.toLowerCase() === todo.trim().toLowerCase()
    );
    if (isDuplicate) {
      toast.error("Todo already exists");
      return;
    }

    const config = getConfig();
    if (!config) return;

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/todo/save`,
        { title: todo },
        config
      );
      settodo("");

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/todo/get`, config);
      settodos(res.data.todos);
      toast.success("Todo added successfully!");
    } catch (err) {
      console.error("Save todo error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  // DELETE ONE TODO
  const handleDelete = async (id) => {
    const ok = window.confirm("Do you want to delete this todo?");
    if (!ok) return;

    const config = getConfig();
    if (!config) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/todo/delete/${id}`,
        config
      );

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/todo/get`, config);
      settodos(res.data.todos);
      toast.success("Todo deleted successfully!");
    } catch (err) {
      console.error("Delete todo error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  // EDIT TODO
  const handleEdit = async (id, currentTitle) => {
    settodo(currentTitle);

    const config = getConfig();
    if (!config) return;

    try {
      // Delete the existing todo
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/todo/delete/${id}`,
        config
      );

      // Refresh todos
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/todo/get`, config);
      settodos(res.data.todos);

      toast.info("Todo is ready to edit. Update the text and click Save.");
    } catch (err) {
      console.error("Edit todo error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  // TOGGLE COMPLETED
  const handleCheckbox = async (id) => {
    const index = todos.findIndex((item) => item._id === id);
    if (index === -1) return;

    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);

    const config = getConfig();
    if (!config) return;

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/todo/update/${id}`,
        { isCompleted: newTodos[index].isCompleted },
        config
      );
    } catch (err) {
      console.error("Failed to update todo status:", err);
      toast.error(err.response?.data?.message || "Could not update todo status");

      // Revert on failure
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      settodos(newTodos);
    }
  };

  // DELETE ALL TODOS
  const deleteAll = async () => {
    if (todos.length === 0) {
      toast.error("You don't have any todos");
      return;
    }

    const ok = window.confirm("Do you really want to delete all todos?");
    if (!ok) return;

    const config = getConfig();
    if (!config) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/todo/delete-all`,
        config
      );
      settodos([]);
      toast.success("All todos deleted successfully!");
    } catch (err) {
      console.error("Delete all todos error:", err);
      toast.error(err.response?.data?.message || "Something went wrong!");
    }
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    settodo(e.target.value);
  };

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="Background">
        <h2>Add a Todo</h2>

        <div className="container1">
          <input
            className="w-125 border-transparent border-b-2 rounded-3xl border-b-black text-center"
            type="text"
            value={todo}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Enter a Todo"
            required
          />
          <input type="button" value="Save" onClick={handleSave} className="btn1" />
        </div>

        <div className="buttonToDeleteAll">
          <input type="button" value="Delete All Todos" className="btn100" onClick={deleteAll} />
        </div>

        <h3>Your Todos</h3>

        {todos.map((item) => (
          <div key={item._id} className={item.isCompleted ? "line-through" : "no-line"}>
            <div className="displayitems">
              <input
                name={item._id}
                type="checkbox"
                checked={item.isCompleted}
                onChange={() => handleCheckbox(item._id)}
              />
              <div className="item1">{item.title}</div>
              <div className="button">
                <input
                  type="button"
                  value="Edit"
                  onClick={() => handleEdit(item._id, item.title)}
                  className="item3"
                />
                <input
                  type="button"
                  value="Delete"
                  onClick={() => handleDelete(item._id)}
                  className="item2"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Todo;
