import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Mod({ show, handleClose, setListProps, ListProps }) {
  const [NewTodoPost, setNewTodoPost] = useState({
    todo: "",
    dueDate: new Date().toJSON().slice(0, 10).replace(/-/g, "/"),
    importance: "Medium",
    isDone: false,
  });

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setNewTodoPost({ ...NewTodoPost, [name]: value });
  };

  const handlePost = () => {
    handleClose();

    if (NewTodoPost.todo.trim() !== "") {
      fetch("https://60b5a271fe923b0017c84482.mockapi.io/todo", {
        method: "POST",

        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(NewTodoPost),
      }).then((result) =>
        result.json().then((response) => {
          // setListProps(...ListProps, response);
          setListProps([...ListProps, response]);
          setNewTodoPost({ ...NewTodoPost, todo: "" });

          toast("New todo sucessfully added...", { className: "green" });
        })
      );
    } else {
      alert("cant save on blank....");
    }
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handlePost();
    }
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label for="exampleFormControlInput1">Todo</label>
            <input
              type="text"
              class="form-control"
              placeholder="enter todo task..."
              name="todo"
              onChange={handleChange}
              value={NewTodoPost.todo}
            />
          </div>

          <div className="form-group">
            <label for="exampleFormControlInput1">Priority Level</label>
            <select
              className="form-control"
              name="importance"
              onChange={handleChange}
              value={NewTodoPost.importance}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handlePost}
            onKeyDown={handleKeyDown}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Mod;
