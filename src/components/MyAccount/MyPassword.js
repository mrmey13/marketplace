import axios from "axios";
import React, { useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import cs from "../../const";

const apiChangePasswordUrl = cs.BaseURL + "/api/buyer/account/change-password"

const MyPassword = ({ t, i18n }) => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const onChangeData = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  const validate = () => {
    let reg = new RegExp('^(?=.*[0-9])(?=.*?[A-Z])(?=.*?[a-z])(?=\\S+$).{8,}$');
    if (!reg.test(form.newPassword)) {
      setMessage("danger", t("password_settings.message.validate_error"));
      return;
    }
  }
  const [responseMessage, setResponseMessage] = useState({
    type: "", content: ""
  });
  const setMessage = (type, message) => {
    setResponseMessage({ type: type, content: message });
    setTimeout(() => {
      setResponseMessage("");
    }, 2000)
  }

  const changePassword = async () => {
    if (!form.currentPassword) {
      setMessage("danger", t("password_settings.message.fill_current_password"));
      return;
    }
    if (!form.newPassword) {
      setMessage("danger", t("password_settings.message.fill_new_password"));
      return;
    }
    validate();
    if (!form.confirmPassword) {
      setMessage("danger", t("password_settings.message.fill_confirm_password"));
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setMessage("danger", t("password_settings.message.password_different"));
      return;
    }
    try {
      const response = await axios({
        method: "post",
        url: `${apiChangePasswordUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        },
        data: {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        }
      })
      console.log(response.data);
      if (response.data.error_desc === "Success") {
        setMessage("success", "Change password successfully!")
        setTimeout(() => {
          window.location.reload();
        }, 2000)
      } else {
        // setMessage("danger", response.data.error_desc);
      }
    } catch (error) {
      console.log(error)
    }
  }

  return <div className="_3D9BVC">
    <div className="h4QDlo" role="main">
      <div className="_2YiVnW">
        <div className="_2w2H6X">
          <h1 className="_3iiDCN">{t("password_settings.title")}</h1>
          <div className="TQG40c">
            {t("password_settings.description")}
          </div>
        </div>
        <div className="goiz20">
          <div className="pJout2 my-4 row">
            <div className="col-3 text-end text-muted">
              <label htmlFor="current-password">{t("password_settings.fields.current_password")}</label>
            </div>
            <div className="col-7 input-with-validator">
              <input
                type="password"
                id="current-password"
                name="currentPassword"
                value={form.currentPassword}
                onChange={onChangeData}
              />
            </div>
          </div>
          <div className="pJout2 my-4 row">
            <div className="col-3 text-end text-muted">
              <label htmlFor="new-password">{t("password_settings.fields.new_password")}</label>
            </div>
            <div className="col-7 input-with-validator">
              <input
                type="password"
                id="new-password"
                name="newPassword"
                value={form.newPassword}
                onChange={onChangeData}
              />
            </div>
          </div>
          <div className="pJout2 my-4 row">
            <div className="col-3 text-end text-muted">
              <label htmlFor="confirm-password">{t("password_settings.fields.confirm_password")}</label>
            </div>
            <div className="col-7 input-with-validator">
              <input
                type="password"
                id="confirm-password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={onChangeData}
              />
            </div>
          </div>
          <div className="pJout2 my-4 row">
            <div className="col-3 text-end text-muted"></div>
            <div className="col-7 px-0">
              <button
                className="btn btn-danger"
                onClick={changePassword}
                style={{ width: "90px" }}
              >
                {t("commons.button.confirm")}
              </button>
              <div className={`text-${responseMessage.type} mt-1`}>{responseMessage.content}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default withTranslation()(MyPassword);