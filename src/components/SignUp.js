import React, { useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import color from "../theme/color";
import "./Login.css";
import axios from "axios";
import cs from "../const";

const signUpApiUrl = cs.BaseURL + "/api/buyer/account/sign-up"

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });

  const onChangeForm = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const [errorMessage, setErrorMessage] = useState({
    open: false,
    content: ""
  })

  const setOpenMessage = (message) => {
    setErrorMessage({
      open: true,
      content: message,
    })
    setTimeout(() => setErrorMessage({
      open: false,
      content: "",
    }), 2000)
  }

  const validate = () => {
    let reg = new RegExp('^(?=.*[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=\\S+$).{8,}$');
    return reg.test(form.password);
  }

  const handleSignUp = async () => {
    if (!form.username) {
      setOpenMessage("Please enter your username");
      return;
    }
    if (!validate()) {
      setOpenMessage("Password must have at least 8 characters with at least 1 Upper Case, 1 lower case, and 1 numeric character")
      return;
    }

    try {
      const response = await axios({
        method: "post",
        url: `${signUpApiUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          username: form.username,
          password: form.password
        }
      });
      console.log(response.data);
      if (response.data.desc === "Success") {

      }
    } catch (error) {
      console.log(error);
    }
  }


  return <div>
    <div className="topnav" style={{ backgroundColor: color.tanhide }}>
      <a class="active" href="http://www.credito.vn">Marketplace</a>
      <a href="http://hr.credito.vn">HR</a>
      <a href="http://etraining.credito.vn">eTraining</a>
      <a href="http://wwww.credito.vn">CRM</a>
    </div>
    <div className="" style={{ height: "80vh" }}>
      <div className="container-fluid d-flex" style={{ width: "90%", height: "100%" }}>
        <div className="d-flex align-items-center justify-content-center" style={{ width: "50%" }}>
          <div
            className="border" style={{ width: "300px", height: "300px" }}
          >
            LOGO
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center" style={{ width: "50%" }}>
          <div className="signup-card">
            <div className="mb-3">
              <h3 style={{ color: color.tanhide, fontWeight: 600 }}>SignUp</h3>
            </div>
            <div className="form-floating mb-3" style={{ width: "85%" }}>
              <input
                type="text"
                className="form-control"
                id="floatingInput" p
                name="username"
                value={form.username}
                onChange={onChangeForm}
                placeholder="Username"
              />
              <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating" style={{ width: "85%" }}>
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                name="password"
                value={form.password}
                onChange={onChangeForm}
                placeholder="Password" />
              <label for="floatingPassword">Password</label>
            </div>
            <div
              className="text-danger text-start px-2"
              style={{ position: "", width: "85%", fontSize: "12px" }}
              hidden={!errorMessage.open}
            >
              {errorMessage.content}
            </div>
            <button
              className="btn btn-primary my-3"
              style={{ width: "85%" }}
              onClick={handleSignUp}
            >
              Sign Up
            </button>
            <div>
              Have an account? <a href="#aa">Login</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
}

export default withTranslation()(SignUp)