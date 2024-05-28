import React from "react";
import "./adminLogin.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
    const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(
        event.target.elements.uname.value,
        event.target.elements.psw.value
      );
      const res = await axios.post("http://localhost:8080/admin/login", {
        email: event.target.elements.uname.value,
        password: event.target.elements.psw.value,
      });
      console.log(res.data)
      if (res.status === 200) {
        localStorage.setItem("adminToken", res.data.token);
        navigate("/")
        window.location.reload();
        return
      } if(res.status===201) {
        // Handle other status codes
        alert("Invalid email or password");
        console.error("Unexpected status code:", res.status);
      }
    } catch (err) {
      console.log();
      alert(err.message);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="login-form-container" style={{ maxWidth: "400px" }}>
        <h2 style={{ textAlign: "center" }}>Login Form</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="container">
            <label htmlFor="uname">
              <b>Email</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="uname"
              required
            />

            <label htmlFor="psw">
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              required
            />

            <button type="submit" className="button">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
