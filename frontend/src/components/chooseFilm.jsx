import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFilms } from "../redux/auth";
import * as ReactBootStrap from "react-bootstrap";
import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";

const AddFilm = () => {
  var filmArray = [];

  const dispatch = useDispatch();
  const filmListStore = useSelector(({ auth }) => auth.filmList);
  dispatch(getFilms());
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
        <AwesomeButton>
          <td>Buy</td>
        </AwesomeButton>
      </tr>
    );
  };
  return (
    <div className="container">
      <ReactBootStrap.Table striped bordered hover variant="dark" responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Film Title</th>
            <th>Price</th>
            <th>Genre</th>
            <th>Release Date</th>
            <th>Buy Now</th>
          </tr>
        </thead>
        <tbody>{filmArray.map(renderList)}</tbody>
      </ReactBootStrap.Table>
    </div>
  );
};

export default AddFilm;
