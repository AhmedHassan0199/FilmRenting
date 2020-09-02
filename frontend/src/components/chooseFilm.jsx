import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilms } from "../redux/film";
import * as ReactBootStrap from "react-bootstrap";
import { AwesomeButton } from "react-awesome-button";
import rentFilm from "./rentFilm";
import "react-awesome-button/dist/styles.css";
const AddFilm = (props) => {
  const { history } = props;
  var filmArray = [];
  function reply_click(e) {
    var ChoosenFilm = {
      filmTitle: filmArray[e.target.id].filmTitle,
      price: filmArray[e.target.id].price,
      genre: filmArray[e.target.id].genre,
      initialRelease: filmArray[e.target.id].initialRelease,
    };
    localStorage.setItem("choosenFilm", JSON.stringify(ChoosenFilm));
    history.push("/rentFilm");
  }
  const dispatch = useDispatch();
  const filmListStore = useSelector(({ filmReducer }) => filmReducer.filmList);
  if (filmListStore.films.length === 0) {
    dispatch(getFilms());
  }
  filmArray = filmListStore.films;
  const renderList = (film, index) => {
    var tempDate = new Date(film.initialRelease);
    return (
      <tr key={index + 1}>
        <td>{index + 1}</td>
        <td>{film.filmTitle}</td>
        <td>{film.price}</td>
        <td>{film.genre}</td>
        <td>
          {tempDate.getDate() +
            "/" +
            (tempDate.getMonth() + 1) +
            "/" +
            tempDate.getFullYear()}
        </td>
        <td>
          <button id={index} onClick={reply_click}>
            Rent
          </button>
        </td>
      </tr>
    );
  };
  return (
    <div className="container">
      <div className="title">
        <h1>Choose a film to Rent</h1>
      </div>
      <div className="dataTable">
        <ReactBootStrap.Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Film Title</th>
              <th>Price</th>
              <th>Genre</th>
              <th>Release Date</th>
              <th>Rent Now</th>
            </tr>
          </thead>
          <tbody>{filmArray.map(renderList)}</tbody>
        </ReactBootStrap.Table>
      </div>
      <div className="createNew">
        <h2>Or create a new film</h2>
        <AwesomeButton href="/addFilm">Create Film</AwesomeButton>
      </div>
    </div>
  );
};

export default AddFilm;
