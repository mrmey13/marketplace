import React, { useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Backdrop, Box, makeStyles, Snackbar } from "@material-ui/core";
import Modal from "@material-ui/core/Snackbar";
import { useTranslation, withTranslation } from "react-i18next";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import axios from "axios";
import cs from "../../const";
import { useEffect } from "react";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "60vw",
    minWidth: "50em",
    maxHeight: "95vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #888",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{ lat: -34.397, lng: 150.644 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: -34.397, lng: 150.644 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
))

const MyAddresses = () => {
  let fakeList = [];
  for (let i = 0; i < 4; i++) fakeList.push(i);


  const classes = useStyles();

  const [responseMessage, setResponseMessage] = useState({
    type: "",
    content: "",
  });
  const [openMessage, setOpenMessage] = useState(false);
  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setResponseMessage({ type: "", content: "" });
    setOpenMessage(false);
  };

  const [openModal, setOpenModal] = useState(false);
  const [reqType, setReqType] = useState("");
  const [addressId, setAddressId] = useState();
  const [openDelModal, setOpenDelModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    fullname: "",
    telephone: "",
    city: 0,
    district: 0,
    ward: 0,
    detailAddress: "",
    type: "",
    longtitude: "",
    latitude: ""
  });

  const handleOpenModal = (reqType) => {
    setReqType(reqType);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setModalForm({
      fullname: "",
      telephone: "",
      city: 0,
      district: 0,
      ward: 0,
      detailAddress: "",
      type: "",
      longtitude: "",
      latitude: ""
    });
    setOpenModal(false);
  };
  const onChangeModal = (event) => {
    setModalForm({ ...modalForm, [event.target.name]: event.target.value });
  };
  const handleOpenDelModal = () => {
    setOpenDelModal(true);
  };
  const handleCloseDelModal = () => {
    setOpenDelModal(false);
  };
  const handleConfirmData = () => {
    console.log(modalForm);
  };
  const handleAddClick = () => {
    handleOpenModal("add");
  };

  const handleConfirmAddClick = async () => {

    try {

    } catch (error) {
      console.log(error);
    }
  }

  const handleModClick = (item) => {
    console.log(item);
    setModalForm({

    });
    setAddressId(item);
    handleOpenModal("edit");
  };

  const handleConfirmModClick = async () => {

  }

  const [addressList, setAddressList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const loadAddressesData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://192.168.1.127:9555/api/seller/shop-address/list`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        }
      });
      console.log("addresses", response.data);
      setAddressList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadCityData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://192.168.1.127:9555/api/common/all-provinces`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        }
      });
      console.log("city", response.data);
      setCityList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadDistrictData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://192.168.1.127:9555/api/common/districts?provinceId=${modalForm.city}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        }
      });
      console.log("district", response.data);
      setDistrictList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadWardtData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://192.168.1.127:9555/api/common/communes?districtId=${modalForm.district}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        }
      });
      console.log("ward", response.data);
      setWardList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadAddressTypeData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `http://192.168.1.127:9555/api/common/shop-address-type`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        }
      });
      console.log("addr-type", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadAddressesData();
    loadCityData();
    loadAddressTypeData();
  }, []);

  useEffect(() => {
    loadDistrictData();
  }, [modalForm.city])

  useEffect(() => {
    loadWardtData();
  }, [modalForm.district])
  return (
    <ThemeContext.Consumer>
      {({ isDark }) => {
        return <div className="container-fluid w-80vw minw-80em my-3">
          <div className="card card-body d-flex flex-row">
            <div className="p-3" style={{ width: "75%" }}>
              <h4 className="fw-bold">My Addresses</h4>
              <p className="text-muted">Manage your shipping and pickup addresses </p>
            </div>
            <div className="d-flex m-2 align-items-center justify-content-end" style={{ width: "25%" }}>
              <button
                className="btn btn-danger"
                onClick={handleAddClick}
              >
                Add a new Address
              </button>
            </div>
          </div>
          <div className="card">
            {addressList.map(item => {
              return <div className="card-body row">
                <div className="col-1 text-end">
                  <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/32/000000/external-location-map-location-flatart-icons-outline-flatarticons-13.png" />
                </div>
                <div className="col-10 row">
                  <div className="col-2">Full Name</div>
                  <div className="col-10 d-flex align-items-baseline">
                    {"Nguyen Anh Tuan"}
                    <span className="d-block ms-5 me-1 px-1 text-success" style={{ fontSize: "12px", backgroundColor: "#90ee90", borderRadius: "3px" }}>Default Address</span>
                    <span className="d-block mx-1 px-1 text-danger" style={{ fontSize: "12px", backgroundColor: "#ee9090", borderRadius: "3px" }}>Pickup Address</span>
                    <span className="d-block mx-1 px-1 text-warning" style={{ fontSize: "12px", backgroundColor: "#eeee90", borderRadius: "3px" }}>Return Address</span>
                  </div>
                  <div className="col-2">Phone Number</div>
                  <div className="col-10">0123456789</div>
                  <div className="col-2">Address</div>
                  <div className="col-10">Lien Xuan, Nam Son, Soc Son, Ha Noi</div>
                </div>
                <div className="col-1 p-0 d-flex flex-column justify-content-start align-items-end">
                  <button
                    className="p-0 btn btn-sm text-end link-btn"
                    onClick={() => handleModClick(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="p-0 btn btn-sm text-end link-btn"

                  >
                    Delete
                  </button>
                </div>
              </div>
            })}
          </div>

          <Modal
            style={{ top: 0 }}
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className={classes.paper}>
              <h4 className="">
                {reqType === "add" && "Add a new Address"}
                {reqType === "edit" && "Edit Address"}
              </h4>
              <div className="row mb-2">
                <label className="col-2" for="fullname">Full Name: </label>
                <div className="col-10">
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={modalForm.fullname}
                    onChange={onChangeModal}
                    required
                  />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-2 text-nowrap" for="telephone">Phone Number: </label>
                <div className="col-10">
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    id="telephone"
                    name="telephone"
                    value={modalForm.telephone}
                    onChange={onChangeModal}
                    required
                  />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-2" for="city">City: </label>
                <div className="col-10">
                  <select
                    className="form-select form-select-sm"
                    id="city"
                    name="city"
                    value={modalForm.city}
                    onChange={(event) => { onChangeModal(event); }}
                  >
                    <option value={0} onClick={() => setModalForm({ district: 0, ward: 0 })}>{"city"}</option>
                    {cityList.map(item =>
                      <option value={item.id} onClick={() => setModalForm({ district: 0, ward: 0 })}>{item.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-2" for="district">District: </label>
                <div className="col-10">
                  <select
                    className="form-select form-select-sm"
                    id="district"
                    name="district"
                    value={modalForm.district}
                    onChange={(event) => { onChangeModal(event); }}
                    disabled={modalForm.city === 0}
                  >
                    <option value={0}>{"district"}</option>
                    {districtList.map(item =>
                      <option value={item.id}>{item.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-2" for="ward">Ward: </label>
                <div className="col-10">
                  <select
                    className="form-select form-select-sm"
                    id="ward"
                    name="ward"
                    value={modalForm.ward}
                    onChange={onChangeModal}
                    disabled={modalForm.district === 0}
                  >
                    <option value={0}>{"ward"}</option>
                    {wardList.map(item =>
                      <option value={item.id}>{item.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-2 text-nowrap" for="detail-address">Detail Address: </label>
                <div className="col-10">
                  <textarea
                    className="form-control form-control-sm"
                    type="text"
                    id="detail-address"
                    name="detailAddress"
                    value={modalForm.detailAddress}
                    onChange={onChangeModal}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-2" for="type">Type: </label>
                <div className="col-10">
                  <select
                    className="form-select form-select-sm"
                    id="type"
                    name="type"
                    value={modalForm.type}
                    onChange={onChangeModal}
                  >
                    <option value="">{"type"}</option>
                    {fakeList.map(item =>
                      <option value={item}>{item}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                {reqType === "add" && <button
                  className="btn btn-sm btn-primary me-1"
                  style={{ width: "60px" }}
                // onClick={() => { handleConfirmAddClick(); }}
                >
                  {"Add"}
                </button>}
                {reqType === "edit" && <button
                  className="btn btn-sm btn-primary me-1"
                  style={{ width: "60px" }}
                // onClick={() => { handleConfirmModClick(); }}
                >
                  {"Edit"}
                </button>}
                <button
                  type="reset"
                  className="btn btn-sm btn-danger"
                  style={{ width: "60px" }}
                  onClick={handleCloseModal}
                >
                  {"Cancel"}
                </button>
              </div>
            </div>
          </Modal>

          <Modal
            style={{ top: 0 }}
            open={openDelModal}
            onClose={handleCloseDelModal}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <div className={classes.paper}>
              <div className="container-fluid p-0">
                <p className="mt-3 mb-4">{"Are you sure you want to delete"}</p>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary me-1"
                    style={{ width: "60px" }}
                  // onClick={() => handleConfirmDelClick()}
                  >
                    {"Delete"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    style={{ width: "60px" }}
                    onClick={handleCloseDelModal}
                  >
                    {"Cancel"}
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          <Snackbar
            open={openMessage}
            autoHideDuration={1500}
            onClose={handleCloseMessage}
          >
            <div className={"alert-popup text-" + responseMessage.type}>
              {responseMessage.content}
            </div>
          </Snackbar>

          <MyMapComponent
            isMarkerShown
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `400px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />

        </div>
      }}
    </ThemeContext.Consumer>
  )
}

export default MyAddresses;