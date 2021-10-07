import React from "react";
import { useTranslation, withTranslation } from "react-i18next";
import color from "../theme/color";
import "./Login.css";

const SignUp = () => {
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
            <div class="form-floating mb-3" style={{ width: "85%" }}>
              <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com" />
              <label for="floatingInput">Username</label>
            </div>
            <div class="form-floating mb-3" style={{ width: "85%" }}>
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password" />
              <label for="floatingPassword">Password</label>
            </div>
            <button className="btn btn-primary mb-3" style={{ width: "85%" }}>Sign Up</button>
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