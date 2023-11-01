import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Login from "./Login";
const Register = () => {
  const [username, setusername] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/register", {
        username,
        email,
        password,
      });
      console.log(res);
      alert("Registered Successfully");
    } catch (err) {
      console.log(err);
      if (err == "Error: Request failed with status code 409") {
        alert("Email already exists");
      } else {
        alert("Error");
      }
    }
  };
  return (
    <div>
      <div className="container">
        <h1>Register</h1>
        <form>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              User Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={username}
              onChange={(e) => setusername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          <p>
            already have an account{" "}
            <span>
              <Link to={"/login"}>Login</Link>{" "}
            </span>{" "}
          </p>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handlesubmit}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
