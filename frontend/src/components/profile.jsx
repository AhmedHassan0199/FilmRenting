import React from "react";
import jwt_decode from "jwt-decode";

const Profile = () => {
  var addFilm = (e) => {
    //Go to profile
    window.location.href = "/addFilm";
    //
  };
  var rentFilm = (e) => {
    //Go to profile
    window.location.href = "/rentFilm";
    //
  };
  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center">Welcome</h1>
        </div>
        <button onClick={addFilm} className="btn btn-lg btn-primary btn-block">
          Add film
        </button>
        <button onClick={rentFilm} className="btn btn-lg btn-primary btn-block">
          Rent film
        </button>
      </div>
    </div>
  );
};
export default Profile;
