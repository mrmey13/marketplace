import React from "react";
import "./ShopSetting.css";
import axios from "axios";
import cs from "../../const";
import color from "../../theme/color";
import { useState, useEffect } from "react";
import { useTranslation, withTranslation } from "react-i18next";

const laguageURL = cs.BaseURL + "/api/common/language_definition";
const settingURL = cs.BaseURL + "/api/seller/shop-setting";

const lngs = {
  en: { nativeName: "language.english" },
  vi: { nativeName: "language.vietnamese" },
};

let i = 0;

class ShopSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // const [language, setLanguage] = useState([]);
  // const loadLanguage = async () => {
  //   try {
  //     const response = await axios({
  //       method: "get",
  //       url: `http://192.168.1.127:9555/api/common/language_definition`,
  //       headers: {
  //         Authorization: localStorage.getItem(cs.System_Code + "-token")
  //       }
  //     });
  //     console.log("language", response.data);
  //     setLanguage(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // const [setting, setSetting] = useState([]);
  // const loadSetting = async () => {
  //   try {
  //     const response = await axios({
  //       method: "get",
  //       url: `http://192.168.1.127:9555/api/seller/shop-setting`,
  //       headers: {
  //         Authorization: localStorage.getItem(cs.System_Code + "-token")
  //       }
  //     });
  //     console.log("setting", response.data);
  //     setSetting(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  changeClick = () => {
    if (i % 2 === 0) {
      alert(
        "Người mua sẽ không thể đặt hàng trong khi Shop bạn tạm nghỉ bán. Bạn chắc chắn muốn bật tạm nghỉ bán chứ?"
      );
      i++;
    } else {
      alert("Bạn chắc chắn muốn tắt tạm nghỉ bán chứ?");
      i++;
    }
  };

  render() {
    const { classes, t, i18n } = this.props;

    return (
      <div className="page-container has-siderbar">
        <div className="page-content-wrapper">
          <div className="page">
            <div className="header">
              <div className="title">
                {/* Thiết Lập Shop */}
                {t("shop_settings.shop_settings")}
              </div>
              <div className="desc">
                {/* Thay đổi các cài đặt cho shop của bạn. */}
                {t("shop_settings.change_settings")}
              </div>
            </div>
            <div className="shop-tabs shop-tabs-line shop-tabs-noraml shop-tabs-top">
              <div className="shop-tabs__nav">
                <div className="shop_tap__nav_wrap">
                  <div
                    className="shop-tabs__nav-tabs"
                    style={{ transform: "translateX(0px)" }}
                  >
                    <div
                      className="shop-tabs__nav-tab active"
                      style={{ whiteSpace: "normal" }}
                    >
                      {/* Thiết Lập Cơ Bản */}
                      {t("shop_settings.basic_settings.basic_settings")}
                    </div>
                    <div
                      className="shop-tabs__nav-tab"
                      style={{ whiteSpace: "normal" }}
                    >
                      {/* Cài đặt riêng tư */}
                      {t("shop_settings.privacy_settings")}
                    </div>
                    <div
                      className="shop-tabs__nav-tab"
                      style={{ whiteSpace: "normal" }}
                    >
                      <span id="">
                        {/* Cài đặt Chat */}
                        {t("shop_settings.chat_settings")}
                      </span>
                    </div>
                    <div
                      className="shop-tabs__nav-tab"
                      style={{ whiteSpace: "normal" }}
                    >
                      {/* Cài đặt thông báo */}
                      {t("shop_settings.notification_settings")}
                    </div>
                  </div>
                  <div
                    className="shop-tabs__ink-bar"
                    style={{ width: "149px", transform: "translateX(0px)" }}
                  ></div>
                </div>
              </div>
              <div className="shop-tabs__content">
                <div className="shop-tabs-tabpane" style={{}}></div>
                <div
                  className="shop-tabs-tabpane"
                  style={{ display: "none" }}
                ></div>
                <div
                  className="shop-tabs-tabpane"
                  style={{ display: "none" }}
                ></div>
                <div
                  className="shop-tabs-tabpane"
                  style={{ display: "none" }}
                ></div>
              </div>
            </div>
            <div>
              <div className="setting-card">
                <div className="setting-card-inner">
                  <div className="">
                    <div className="setting-card-row">
                      <div className="main">
                        <i className="icon shop-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M8.165 0c.062 0 .123.016.17.056l.324.24c.293.2 1.205.788 2.481 1.312a9.43 9.43 0 0 0 3.022.656l.376.008c.162 0 .285.128.285.288v5.472C14.83 11.416 10.495 15 8.165 15S1.5 11.416 1.5 8.024V2.552c0-.16.13-.28.284-.288l.512-.014a9.548 9.548 0 0 0 2.886-.65C6.751.96 7.758.224 7.765.216l.223-.16A.29.29 0 0 1 8.165 0zm-.009 1.168c-.543.371-1.584.945-2.596 1.358-1.12.456-2.285.672-3.06.72v4.778C2.5 10.565 6.078 14 8.165 14s5.664-3.433 5.658-5.968v-4.78a10.231 10.231 0 0 1-3.062-.719c-1.013-.415-2.064-.995-2.605-1.365zm3.172 4.478a.5.5 0 0 1 .058.638l-.058.07-3.535 3.535a.499.499 0 0 1-.146.101l-.062.024-.062.015a.504.504 0 0 1-.2-.007l-.094-.033-.04-.02-.059-.04-.022-.02-1.965-1.998a.5.5 0 0 1 .645-.76l.069.06 1.585 1.613 3.18-3.178a.5.5 0 0 1 .706 0z"
                            ></path>
                          </svg>
                        </i>
                        <div className="desc">
                          <div className="title">
                            {/* Bảo vệ tài khoản của bạn ngay bây giờ bằng cách xác
                            minh hoạt động đáng ngờ */}
                            {t(
                              "shop_settings.basic_settings.protect_your_account"
                            )}
                          </div>
                          <div className="subtitle">
                            {/* Trong trường hợp hoạt động có rủi ro cao, hãy xác
                            minh hoạt động với OTP */}
                            {t(
                              "shop_settings.basic_settings.protect_your_account_otp"
                            )}
                          </div>
                        </div>
                        <div className="operations">
                          {/* <div
                            className="
                                          shop-switch
                                          shop-switch--open
                                          //shop-switch--close
                                          shop-switch--normal
                                      "
                          ></div> */}
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckChecked"
                              style={{ width: "50px", height: "25px" }}
                              checked
                              //onClick={() =>() }
                            />
                            <label
                              class="form-check-label"
                              for="flexSwitchCheckChecked"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="setting-card-row off">
                      <div className="main">
                        <i className="icon shop-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M9 1c.34 0 .551-.012 1 .07.448.084.448.628.003.927C8.745 2.843 8 4.363 8 6a5 5 0 0 0 5 5c.567 0 1.103-.125 1.619-.268.528-.146.643.439.392.857A7 7 0 1 1 9 1zm-.491 1.02l-.177.017a6 6 0 1 0 4.962 10.155l.198-.214-.185.014L13 12a6 6 0 0 1-4.517-9.95l.026-.03z"
                            ></path>
                          </svg>
                        </i>
                        <div className="desc">
                          <div className="title">
                            {/* Chế độ Tạm nghỉ */}
                            {t("shop_settings.basic_settings.vacation_mode")}
                          </div>
                          <div className="subtitle">
                            {/* Kích hoạt Chế độ Tạm nghỉ để ngăn khách hàng đặt đơn
                            hàng mới. Những đơn hàng đang tiến hành vẫn phải
                            được xử lý. */}
                            {t("shop_settings.basic_settings.vacation_mode_p")}
                          </div>
                        </div>
                        <div className="operations">
                          {/* <div
                            className="
                                          shop-switch
                                          shop-switch--close
                                          shop-switch--normal
                                      "
                          ></div> */}
                          <div class="form-check form-switch">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              id="flexSwitchCheckDefault"
                              style={{ width: "50px", height: "25px" }}
                              onClick={() => this.changeClick()}
                            />
                            <label
                              class="form-check-label"
                              for="flexSwitchCheckDefault"
                            ></label>
                          </div>
                        </div>
                      </div>
                      <div className="extra">
                        <div className="autoreply">
                          <div className="autoreply-prompt">
                            {/* Bạn vẫn chưa kích hoạt Trả lời tự động. */}
                            {t("shop_settings.basic_settings.chat_auto")}
                          </div>
                          <button
                            type="button"
                            className="
                                          shop-button
                                          shop-button--link
                                          shop-button--normal
                                      "
                            onClick={() =>
                              alert(
                                "1.Trả lời tự động mặc định sẽ chỉ được kích hoạt 24 giờ một lần cho mỗi người mua." +
                                  "  " +
                                  "2.Trả lời tự động ngoại tuyến sẽ chỉ được kích hoạt mỗi ngày một lần cho mỗi người mua."
                              )
                            }
                          >
                            <span>
                              {/* Thiết lập ngay */}
                              {t("shop_settings.basic_settings.set_now")}
                            </span>
                            <i className="shop-icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 1024 1024"
                              >
                                <path d="M288 864a32 32 0 0 0 53.6 23.6l384-352A32.11 32.11 0 0 0 736 512a32.39 32.39 0 0 0-10.3-23.6l-383-352a32 32 0 1 0-43.3 47.1L656.7 512 298.4 840.44A32 32 0 0 0 288 864z"></path>
                              </svg>
                            </i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="setting-card-row">
                      <div className="main">
                        <i className="icon shop-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                          >
                            <path
                              fill-rule="evenodd"
                              d="M7.587 1.012l.233-.01L8 1c.13 0 .261.004.39.01l.115.008.195.017.15.016.184.025.303.052a7.009 7.009 0 0 1 4.722 3.364l.181.333A6.97 6.97 0 0 1 15 8a6.97 6.97 0 0 1-.494 2.587l-.14.327a6.954 6.954 0 0 1-.166.34l-.142.256-.174.283a7.01 7.01 0 0 1-4.263 3.018l-.284.061-.167.03-.263.04-.19.022-.257.021-.195.01L8 15a7.12 7.12 0 0 1-.302-.006L8 15c-.13 0-.261-.004-.39-.01l-.115-.008-.195-.017-.15-.016-.184-.025-.303-.052a7.01 7.01 0 0 1-4.732-3.38l-.172-.318A6.97 6.97 0 0 1 1 8c0-.925.18-1.807.505-2.615l.128-.3c.055-.12.114-.237.175-.353l.144-.258.164-.268A7.01 7.01 0 0 1 6.38 1.189l.284-.061.15-.027.268-.041.222-.026.284-.022zM8 10.5c-.595 0-1.181.037-1.757.11.216 1.144.57 2.24 1.047 3.268l.042.085a6.066 6.066 0 0 0 1.336 0l.042-.084a13.897 13.897 0 0 0 1.047-3.27A14.138 14.138 0 0 0 8 10.5zm2.745.269l-.078.39a14.885 14.885 0 0 1-.788 2.54 6.013 6.013 0 0 0 3.066-2.3 13.772 13.772 0 0 0-2.2-.63zm-5.49.002l-.314.064c-.647.144-1.277.333-1.886.564a6.016 6.016 0 0 0 3.065 2.3 14.91 14.91 0 0 1-.865-2.928zm-2.702-5.29l-.081.184A5.981 5.981 0 0 0 2 8c0 .9.198 1.755.554 2.522.817-.321 1.67-.57 2.55-.743a15.093 15.093 0 0 1 0-3.56c-.88-.17-1.733-.42-2.55-.739zm10.893-.002l-.033.015c-.808.312-1.65.557-2.518.727a15.025 15.025 0 0 1 0 3.56c.88.17 1.734.42 2.552.739C13.802 9.754 14 8.9 14 8c0-.9-.198-1.754-.554-2.52zm-7.352.901l-.031.286a14.173 14.173 0 0 0 .03 2.956 15.145 15.145 0 0 1 3.813-.002 14.148 14.148 0 0 0 .001-3.242 15.145 15.145 0 0 1-3.813.002zM8 2a5.89 5.89 0 0 0-.668.037l-.042.084a13.902 13.902 0 0 0-1.047 3.27 14.139 14.139 0 0 0 3.514 0A13.864 13.864 0 0 0 8.71 2.12l-.042-.084A6.066 6.066 0 0 0 8 2zm-1.88.3l-.057.02A6.016 6.016 0 0 0 3.056 4.6c.707.269 1.442.48 2.199.63.19-1.017.482-1.997.866-2.93zm3.76 0l.005.014c.38.929.67 1.904.86 2.915.757-.149 1.492-.36 2.2-.627A6.015 6.015 0 0 0 9.88 2.3z"
                            ></path>
                          </svg>
                        </i>
                        <div className="desc">
                          <div className="title">
                            {/* Ngôn ngữ */}
                            {t("shop_settings.basic_settings.language")}
                          </div>
                        </div>
                        {/* <div
                                  className="
                                      shop-radio-group
                                      shop-radio-group--normal
                                      shop-radio-group--solid
                                      "
                                >
                                  <label className="shop-radio">
                                    <input
                                      type="radio"
                                      className="shop-radio__input"
                                      value="vi"
                                    />
                                    <span className="shop-radio__indicator"></span>
                                    <span className="shop-radio__label">
                                      Tiếng Việt (Vietnamese)
                                    </span>
                                  </label>
                                  <label className="shop-radio">
                                    <input
                                      type="radio"
                                      className="shop-radio__input"
                                      value="en"
                                    />
                                    <span className="shop-radio__indicator"></span>
                                    <span className="shop-radio__label">English</span>
                                  </label>
                                </div> */}
                        <div>
                          {Object.keys(lngs).map((lng) => (
                            <button
                              key={lng}
                              style={{
                                fontWeight:
                                  i18n.language === lng ? "bold" : "normal",
                                backgroundColor: "#F69756",
                                width: "82px",
                                height: "30px",
                                border: "1px solid",
                                borderRadius: "15px",
                                marginLeft: "10px",
                              }}
                              type="submit"
                              onClick={() => {
                                i18n.changeLanguage(lng);
                                localStorage.setItem("currentLanguage", lng);
                              }}
                            >
                              {t(lngs[lng].nativeName)}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(ShopSetting);
