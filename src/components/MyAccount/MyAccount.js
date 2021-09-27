import React from "react";
import "./MyAccount.css";
import axios from "axios";
import cs from "../../const";
import color from "../../theme/color";
import Button from "@material-ui/core/Button";
import { useState, useEffect } from "react";
import { useTranslation, withTranslation } from "react-i18next";

function MyAccount() {

  const [Edit, setEdit] = useState({});
  const [searchUser, setSearchUser] = useState({
    sort: "1",
    fullName: "",
  });
  console.log("searchUser", searchUser);
  const onChangeSearchUser = (event) => {
    setSearchUser({
      ...searchUser,
      [event.target.name]: event.target.value,
    });
  };

  const [totalItems, setTotalItems] = useState(0);

  const [ItemsPerPage] = useState(10);
  const [CurrentPage, setCurrentPage] = useState(1);

  const [UserRoleList, setUserRoleList] = useState([]);
  const [stateList, setstateList] = useState([]);
  const [districtList, setdistrictList] = useState([]);
  const [wardList, setwardList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onEdit = (e) => {
    let value = "";
    if (e.target.name === "changedPassword") {
      value = e.target.checked ? 1 : 0;
    } else {
      value = e.target.value;
    }
  };

  const [EditError, setEditError] = useState({});

  return (
    <div className="_3D9BVC">
      <div className="h4QDlo" role="main">
        <div className="_2YiVnW">
          <div className="_2w2H6X">
            <h1 className="_3iiDCN">Hồ sơ của tôi</h1>
            <div className="TQG40c">
              Quản lý thông tin hồ sơ để bảo mật tài khoản
            </div>
          </div>
          <div className="goiz2O">
            <div className="pJout2">
              <form>
                <div className="_3BlbUs">
                  <div className="_1iNZU3">
                    <div className="_2PfA-y">
                      <label>Tên đăng nhập</label>
                    </div>
                    <div className="_2_JugQ">
                      <div className="input-with-validator-wrapper">
                        <div className="input-with-validator">
                          <input
                            type="text"
                            placeholder=""
                            maxlength="255"
                            value={searchUser.generalId}
                            onChange={(e) => onChangeSearchUser(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="_1iNZU3">
                    <div className="_1LvCQN">
                      Tên Đăng nhập chỉ có thể thay đổi một lần.
                    </div>
                  </div> */}
                </div>
                <div className="_3BlbUs">
                  <div className="_1iNZU3">
                    <div className="_2PfA-y">
                      <label>Tên</label>
                    </div>
                    <div className="_2_JugQ">
                      <div className="input-with-validator-wrapper">
                        <div className="input-with-validator">
                          <input
                            type="text"
                            placeholder=""
                            maxlength="255"
                            value={searchUser.generalId}
                            onChange={(e) => onChangeSearchUser(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="_3BlbUs">
                  <div className="_1iNZU3">
                    <div className="_2PfA-y">
                      <label>Email</label>
                    </div>
                    <div className="_2_JugQ">
                      <input
                        onSubmit={(e) => handleSubmit(e)}
                        type="text"
                        className="form-control"
                        name="email"
                        required
                        value={Edit.email}
                        onChange={(e) => onEdit(e)}
                      />
                      {EditError.noEmail && (
                        <div className="text-danger">Email required</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="_3BlbUs">
                  <div className="_1iNZU3">
                    <div className="_2PfA-y">
                      <label>Số điện thoại</label>
                    </div>
                    <div className="_2_JugQ">
                      <input
                        //disabled
                        onSubmit={(e) => handleSubmit(e)}
                        type="text"
                        className="form-control"
                        name="phone"
                        required
                        value={Edit.phone}
                        onChange={(e) => onEdit(e)}
                      />
                      {EditError.noPhone && (
                        <div className="text-danger">Phone number required</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="_3BlbUs">
                  <div className="_1iNZU3">
                    <div className="_2PfA-y">
                      <label>Tên Shop</label>
                    </div>
                    <div className="_2_JugQ">
                      <div className="input-with-validator-wrapper">
                        <div className="input-with-validator">
                          <input
                            type="text"
                            placeholder=""
                            maxlength="255"
                            value={searchUser.generalId}
                            onChange={(e) => onChangeSearchUser(e)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="_3BlbUs">
                  <div className="_1iNZU3">
                    <div className="_2PfA-y">
                      <label>Giới tính</label>
                    </div>
                    <div className="_2_JugQ">
                      <select
                        onSubmit={(e) => handleSubmit(e)}
                        className="form-select"
                        aria-label="Default select example"
                        name="gender"
                        required
                        onChange={(e) => onEdit(e)}
                        value={Edit.gender}
                      >
                        <option value="" disabled>
                          -- SELECT --
                        </option>
                        <option value="1">Nam</option>
                        <option value="2">Nữ</option>
                        <option value="3">Khác</option>
                      </select>
                      {EditError.noGender && (
                        <div className="text-danger">Gender required</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="_3BlbUs">
                  <div className="_1iNZU3">
                    <div className="_2PfA-y">
                      <label>Ngày sinh</label>
                    </div>
                    <div className="_2_JugQ">
                      <input
                        onSubmit={(e) => handleSubmit(e)}
                        type="date"
                        className="form-control"
                        name="dob"
                        required
                        defaultValue={Edit.dob}
                        onChange={(e) => onEdit(e)}
                      />
                      {EditError.noDOB && (
                        <div className="text-danger">Birthdate required</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="_31PFen">
                  <button
                    //onClick={() => createUser()}
                    type="button"
                    className="btn btn-solid-primary btn--m btn--inline"
                    aria-disabled="false"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
            <div className="_1aIEbS">
              <div className="X1SONv">
                <div className="_1FzaUZ">
                  <div
                    className="TgSfgo"
                    style={{
                      backgroundImage:
                        "url(&quot;https://cf.shopee.vn/file/618f73ed29dd4b324d705834e86cbe4b&quot;)",
                    }}
                  ></div>
                </div>
                <input
                  className="_2xS5eV"
                  type="file"
                  accept=".jpg,.jpeg,.png"
                />
                <button
                  type="button"
                  className="btn btn-light btn--m btn--inline"
                  // onClick={() => this.addAvatar()}
                >
                  Chọn ảnh
                </button>

                <div className="_3Jd4Zu">
                  <div className="_3UgHT6">Dụng lượng file tối đa 1 MB</div>
                  <div className="_3UgHT6">Định dạng:.JPEG, .PNG</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MyAccount;
