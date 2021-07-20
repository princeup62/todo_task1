import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faCheck } from "@fortawesome/free-solid-svg-icons";
import Mod from "./components/Mod";
import EditMod from "./components/EditMod";
import Spinner from "../src/assests/images/Hourglass.gif";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../src/index.css";

const App = () => {
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [List, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [updateList, setUpdateList] = useState({
    todo: "",
    dueDate: "",
    importance: "",
    isDone: false,
  });

  const [showEditMod, setShowEditMod] = useState(false);
  const handleCloseEditMod = () => setShowEditMod(false);
  const handleShowEditMod = (pid) => {
    setShowEditMod(true);

    fetch(`https://60b5a271fe923b0017c84482.mockapi.io/todo/${pid}`).then(
      (response) =>
        response.json().then((result) => {
          setUpdateList({
            id: pid,
            todo: result.todo,
            dueDate: result.dueDate,
            importance: result.importance,
            isDone: result.isDone,
          });
        })
    );
  };

  useEffect(() => {
    setIsLoading(true);
    fetch("https://60b5a271fe923b0017c84482.mockapi.io/todo").then((response) =>
      response.json().then((result) => {
        setList(result);
        setIsLoading(false);
      })
    );
  }, []);

  const handleDelete = (eventID) => {
    fetch(`https://60b5a271fe923b0017c84482.mockapi.io/todo/${eventID}`, {
      method: "DELETE",
    }).then(() => {
      let tempArray = List.filter((item) => item.id !== eventID);
      setList([...tempArray]);

      toast("Data deleted..", { className: "red" });
      // alert("deleted");
    });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="container-fluid">
      <div className="row">
        {/* ---------------------title-start----------------------------- */}
        <div className="title shadow-sm">
          <div className="col-md-12 d-flex justify-content-between align-items-center py-4">
            <h1>TODO</h1>
            <Fab
              size="small"
              color="primary"
              aria-label="add"
              onClick={handleShow}
            >
              <AddIcon />
            </Fab>
          </div>
        </div>
        {/* ------------------------title-end--------------------------- */}

        <Mod
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          setListProps={setList}
          ListProps={List}
        />
        <ToastContainer autoClose={1000} />

        <EditMod
          handleCloseEditMod={handleCloseEditMod}
          handleShowEditMod={handleShowEditMod}
          showEditMod={showEditMod}
          updateList={updateList}
          setUpdateList={setUpdateList}
        />

        {/* -------------------------body-start----------------------------------*/}
        <div className="col-md-12 all-todo-wrapper text-lg-center d-lg-flex justify-lg-content-center flex-lg-wrap ">
          {isLoading ? (
            <div className="my-5 mx-auto text-center">
              <img src={Spinner} alt="" />
            </div>
          ) : (
            List.map((el) => (
              <div className="card shadow-md  my-5 col-md-3 mx-lg-5">
                <div className="card-body  ">
                  <div className="d-flex  justify-content-between align-items-center">
                    <h4>{el.todo}</h4>
                    <h6 className="text-primary">{el.importance}</h6>
                  </div>
                  <p className="text-muted">Due: {el.dueDate}</p>

                  <div
                    className=" btn-group"
                    role="group"
                    aria-label="Basic example"
                  >
                    <button
                      type="button"
                      className="btn btn-light "
                      onClick={() => handleDelete(el.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} color="blue" />
                    </button>
                    <button type="button" className="btn btn-light">
                      <FontAwesomeIcon
                        icon={faPen}
                        color="blue"
                        onClick={() => handleShowEditMod(el.id)}
                      />
                    </button>
                    <span
                      style={{ color: el.isDone ? "green" : "red" }}
                      className="mx-5"
                    >
                      {el.isDone ? "Done" : "Not Done"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* -------------------------body-end-------------------------------------- */}

        {/* ----------------------------toasters------------------------------------ */}

        {/* ------------------------end-toasters------------------------------------- */}
      </div>
    </div>
  );
};

export default App;
