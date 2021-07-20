import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditMod({
  handleCloseEditMod,
  handleShowEditMod,
  showEditMod,
  updateList,
  setUpdateList,
  setIsLoading,
  isLoading,
}) {
  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setUpdateList({ ...updateList, [name]: value });
  };

  const toggleChecked = () => {
    setUpdateList({ ...updateList, isDone: !updateList.isDone });
  };

  const handleSubmit = () => {
    handleCloseEditMod();
    console.log(updateList.id);
    let tempobject = {
      todo: updateList.todo,
      dueDate: updateList.dueDate,
      importance: updateList.importance,
      isDone: updateList.isDone,
    };

    if (updateList.todo.trim() !== "") {
      fetch(
        `https://60b5a271fe923b0017c84482.mockapi.io/todo/${updateList.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tempobject),
        }
      ).then((result) => {
        result.json().then((resp) => {
          console.log(resp);
          toast("Todo Updated..", { className: "blue" });
          window.location.reload();
        });
      });
    } else {
      alert("You are inserting blank todo!");
    }

    console.log(tempobject);
  };

  return (
    <>
      <Modal show={showEditMod} onHide={handleCloseEditMod}>
        <Modal.Header closeButton>
          <Modal.Title>Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group">
            <label for="exampleInputEmail1">Todo:</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              value={updateList.todo}
              name="todo"
              onChange={handleChange}
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlSelect1">Priority Level:</label>
            <select
              class="form-control"
              value={updateList.importance}
              name="importance"
              onChange={handleChange}
            >
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>

            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={updateList.isDone}
                    onChange={toggleChecked}
                  />
                }
                label={updateList.isDone ? "Done" : "Not Done"}
              />
            </FormGroup>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseEditMod}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditMod;
