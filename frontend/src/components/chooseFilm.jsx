import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Space, Tag } from "antd";
import { getFilms } from "../redux/auth";

const AddFilm = () => {
  var filmArray = [];
  const columns = [
    {
      title: "Film Title",
      dataIndex: "filmTitle",
      key: "filmTitle",
      className: "mb-2 font-weight-bold",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Genre",
      dataIndex: "genre",
      key: "genre",
    },
    {
      title: "Release Date",
      dataIndex: "initialRelease",
      key: "initialRelease",
    },
    {
      title: "Buy Now",
      dataIndex: "createdBy",
      key: "createdBy",
      render: (tag) => {
        return (
          <Tag color={"volcano"} key={tag}>
            {"Buy"}
          </Tag>
        );
      },
    },
  ];
  const dispatch = useDispatch();
  const filmListStore = useSelector(({ auth }) => auth.filmList);
  dispatch(getFilms());
  filmArray = filmListStore.films;
  return (
    <div className="container">
      <div className="col-md-10 mt-2 mx-auto">
        <h1 className="h3 mb-10 font-weight-bold">
          Create a new film for rent
        </h1>
        <Table columns={columns} dataSource={filmArray} />
      </div>
    </div>
  );
};

export default AddFilm;
