import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [cookies, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const r = await axios.post("http://localhost:5000/login", {
        email: email,
        password: password,
      });
      setCookie("token", r.data.token);
      console.log(r.data.token);
      localStorage.setItem("token", r.data.users);
      navigate("/");
      console.log(r);
      alert("Login Successfully");
    } catch (err) {
      console.log(err);
      if (err) {
        alert("Error");
      }
    }
  };
  return (
    <div>
      <div className="container">
        <h1>Login</h1>
        <form>
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

export default Login;
