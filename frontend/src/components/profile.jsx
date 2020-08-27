import React from "react";
import jwt_decode from "jwt-decode";

const Profile = () => {
  const token = localStorage.usertoken;
  const decoded = jwt_decode(token);
  const firstName = decoded.firstName;
  const lastName = decoded.lastName;
  const username = decoded.username;
  const phoneNumber = decoded.phoneNumber;

  return (
    <div className="container">
      <div className="jumbotron mt-5">
        <div className="col-sm-8 mx-auto">
          <h1 className="text-center"> PROFILE</h1>
        </div>
        <table className="table col-md-6 mx-auto">
          <tbody>
            <tr>
              <td>First Name</td>
              <td>{firstName}</td>
            </tr>

            <tr>
              <td>Last Name</td>
              <td>{lastName}</td>
            </tr>

            <tr>
              <td>UserName</td>
              <td>{username}</td>
            </tr>

            <tr>
              <td>Phone Number</td>
              <td>{phoneNumber}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Profile;
