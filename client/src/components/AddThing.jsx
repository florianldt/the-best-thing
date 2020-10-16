import React, { useState } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import FetchThings from "../apis/FetchThings";
import { ThingsContext } from "../context/ThingsContext";

const AddThing = ({ isAuthenticated }) => {
  const { addThings } = useContext(ThingsContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [scorePlus, setScorePlus] = useState(0);
  const [scoreMinus, setScoreMinus] = useState(0);

  const handleSumbit = async (e) => {
    e.preventDefault();
    try {
      const response = await FetchThings.post("/", {
        name,
        description,
        score_plus: scorePlus,
        score_minus: scoreMinus,
      });
      addThings(response.data.data.things[0]);
    } catch (error) {
      console.error(error.message);
    }
  };

  function Add() {
    if (!isAuthenticated) {
      return (
        <Link type="button" className="btn btn-primary" to="/login">
          Add
        </Link>
      );
    }
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Add
        </button>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add a Thing
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <form action="">
                <div className="modal-body">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                  <br />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></input>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSumbit}
                    type="submit"
                    className="btn btn-primary"
                    data-dismiss="modal"
                  >
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Add />
    </div>
  );
};

export default AddThing;
