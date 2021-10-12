import React, { useState } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { Backdrop, Box, makeStyles, Snackbar } from "@material-ui/core";
import Modal from "@material-ui/core/Snackbar";
import { useTranslation, withTranslation } from "react-i18next";
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from "react-google-maps"
import axios from "axios";
import cs from "../../const";
import { useEffect } from "react";

const loadAddressesDataUrl = cs.BaseURL + "/api/seller/shop-address/list";
const loadAddressTypeDataUrl = cs.BaseURL + "/api/common/shop-address-type";
const loadCityDataUrl = cs.BaseURL + "/api/common/all-provinces";
const loadDistrictDataUrl = cs.BaseURL + "/api/common/districts?";
const loadWardtDataUrl = cs.BaseURL + "/api/common/communes?";
const createAddressUrl = cs.BaseURL + "/api/seller/shop-address/create";
const editAddressUrl = cs.BaseURL + "/api/seller/shop-address/edit";
const deleteAddressUrl = cs.BaseURL + "/api/seller/shop-address/delete?";

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

const MyAddresses = ({ t, i18n }) => {
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
  const [address, setAddress] = useState({});
  const [openDelModal, setOpenDelModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    fullname: "",
    telephone: "",
    city: 0,
    district: 0,
    ward: 0,
    detailAddress: "",
    defaultAddress: false,
    pickupAddress: false,
    returnAddress: false,
    longtitude: 0,
    latitude: 0
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
      defaultAddress: false,
      pickupAddress: false,
      returnAddress: false,
      longtitude: 0,
      latitude: 0
    });
    setAddress({});
    setOpenModal(false);
  };
  const onChangeModal = (event) => {
    setModalForm({ ...modalForm, [event.target.name]: event.target.value });
  };
  const onChangeCheckBox = (event) => {
    setModalForm({ ...modalForm, [event.target.name]: event.target.checked });
  };
  const onChangeCoordinates = (event) => {
    console.log(event);
    setModalForm({ ...modalForm, latitude: event.latLng.lat(), longtitude: event.latLng.lng() })
  }
  const handleOpenDelModal = () => {
    setOpenDelModal(true);
  };
  const handleCloseDelModal = () => {
    setAddress({});
    setOpenDelModal(false);
  };
  const handleShopType = () => {
    let typeList = [];
    typeList = (modalForm.defaultAddress) ? typeList.concat(1) : typeList;
    typeList = (modalForm.returnAddress) ? typeList.concat(2) : typeList;
    typeList = (modalForm.pickupAddress) ? typeList.concat(3) : typeList;
    return typeList;
  }
  const handleConfirmData = () => {
    console.log(modalForm);
  };


  const handleAddClick = () => {
    if (addressList.length === 0) { setModalForm({ ...modalForm, defaultAddress: true, pickupAddress: true, returnAddress: true }) };
    handleOpenModal("add");
  };

  const handleConfirmAddClick = async () => {
    if (!modalForm.fullname || !modalForm.telephone || !modalForm.detailAddress) {
      setResponseMessage({ type: "warning", content: t("address_settings.message.fill_empty_fields") });
      setOpenMessage(true);
      return;
    }
    if (!modalForm.city || !modalForm.district || !modalForm.ward) {
      setResponseMessage({ type: "warning", content: t("address_settings.message.choose_address") });
      setOpenMessage(true);
      return;
    }
    try {
      const response = await axios({
        method: "post",
        url: `${createAddressUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          provinceId: modalForm.city,
          districtId: modalForm.district,
          communeId: modalForm.ward,
          fullAddress: modalForm.detailAddress,
          fullName: modalForm.fullname,
          telephone: modalForm.telephone,
          shopAddressTypeList: handleShopType(),
          longtitude: modalForm.longtitude,
          latitude: modalForm.latitude
        }
      });
      // console.log(response.data);
      // console.log("modalForm", modalForm);
      if (response.data.error_desc === "Success") {
        loadAddressesData();
        setResponseMessage({ type: "success", content: t("address_settings.message.create_success") });
        setOpenMessage(true);
        handleCloseModal();
      } else {
        setResponseMessage({ type: "error", content: response.data.error_desc });
        setOpenMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleModClick = (item) => {
    setModalForm({
      fullname: item.fullName,
      telephone: item.telephone,
      city: item.provinceId,
      district: item.districtId,
      ward: item.communeId,
      detailAddress: item.fullAddress,
      defaultAddress: item.isDefault,
      pickupAddress: item.isPickUp,
      returnAddress: item.isReturn,
      longtitude: item.longtitude,
      latitude: item.latitude
    });
    setAddress(item);
    handleOpenModal("edit");
  };

  const handleConfirmModClick = async () => {
    if (!modalForm.fullname || !modalForm.telephone || !modalForm.detailAddress) {
      setResponseMessage({ type: "warning", content: t("address_settings.message.fill_empty_fields") });
      setOpenMessage(true);
      return;
    }
    if (!modalForm.city || !modalForm.district || !modalForm.ward) {
      setResponseMessage({ type: "warning", content: t("address_settings.message.choose_address") });
      setOpenMessage(true);
      return;
    }
    try {
      const response = await axios({
        method: "post",
        url: `${editAddressUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          addressId: address.addressId,
          provinceId: modalForm.city,
          districtId: modalForm.district,
          communeId: modalForm.ward,
          fullAddress: modalForm.detailAddress,
          fullName: modalForm.fullname,
          telephone: modalForm.telephone,
          shopAddressTypeList: handleShopType(),
          longtitude: modalForm.longtitude,
          latitude: modalForm.latitude
        }
      });
      // console.log(response.data);
      // console.log("modalForm", modalForm);
      if (response.data.error_desc === "Success") {
        loadAddressesData();
        setResponseMessage({ type: "success", content: t("address_settings.message.edit_success") });
        setOpenMessage(true);
        handleCloseModal();
      } else {
        setResponseMessage({ type: "error", content: response.data.error_desc });
        setOpenMessage(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleDelClick = (item) => {
    setAddress(item);
    handleOpenDelModal();
  }

  const handleConfirmDelClick = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${deleteAddressUrl}addressId=${address.addressId}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        }
      });
      // console.log(response.data);
      if (response.data.error_desc === "Success") {
        loadAddressesData();
        setResponseMessage({ type: "success", content: t("address_settings.message.delete_success") });
        setOpenMessage(true);
        handleCloseDelModal();
      } else {
        setResponseMessage({ type: "error", content: response.data.error_desc });
        setOpenMessage(true);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [addressList, setAddressList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);

  const loadAddressesData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${loadAddressesDataUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        }
      });
      // console.log("addresses", response.data);
      setAddressList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadCityData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${loadCityDataUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        }
      });
      // console.log("city", response.data);
      setCityList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadDistrictData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${loadDistrictDataUrl}provinceId=${modalForm.city}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        }
      });
      // console.log("district", response.data);
      setDistrictList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadWardtData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${loadWardtDataUrl}districtId=${modalForm.district}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        }
      });
      // console.log("ward", response.data);
      setWardList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadAddressTypeData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${loadAddressTypeDataUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        }
      });
      // console.log("addr-type", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadAddressesData();
    loadCityData();
    loadAddressTypeData();
    loadDistrictData();
    loadWardtData();
  }, [modalForm.city, modalForm.district]);

  return (
    <ThemeContext.Consumer>
      {({ isDark }) => {
        return <div className="container-fluid w-80vw minw-80em my-3">
          <div className="card card-body d-flex flex-row shadow">
            <div className="p-3" style={{ width: "75%" }}>
              <h4 className="fw-bold">{t("address_settings.title")}</h4>
              <p className="text-muted">{t("address_settings.description")}</p>
            </div>
            <div className="d-flex m-2 align-items-center justify-content-end" style={{ width: "25%" }}>
              <button
                className="btn btn-danger"
                onClick={handleAddClick}
              >
                {t("address_settings.add_new_address")}
              </button>
            </div>
          </div>
          <div className="card pb-2 shadow">
            {addressList.map(item => {
              return <div className="card-body row">
                <div className="col-1 text-end">
                  <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/32/000000/external-location-map-location-flatart-icons-outline-flatarticons-13.png" />
                </div>
                <div className="col-10 row">
                  <div className="col-2">{t("address_settings.fields.fullname")}</div>
                  <div className="col-10 d-flex align-items-baseline">
                    <span className="me-5">{item.fullName}</span>
                    {item.isDefault === 1 && <span className="d-block mx-1 px-1 text-success" style={{ fontSize: "12px", backgroundColor: "#90ee90", borderRadius: "3px" }}>{t("address_settings.fields.default_address")}</span>}
                    {item.isPickUp === 1 && <span className="d-block mx-1 px-1 text-danger" style={{ fontSize: "12px", backgroundColor: "#ee9090", borderRadius: "3px" }}>{t("address_settings.fields.pickup_address")}</span>}
                    {item.isReturn === 1 && <span className="d-block mx-1 px-1 text-warning" style={{ fontSize: "12px", backgroundColor: "#eeee90", borderRadius: "3px" }}>{t("address_settings.fields.return_address")}</span>}
                  </div>
                  <div className="col-2">{t("address_settings.fields.phone_number")}</div>
                  <div className="col-10">{item.telephone}</div>
                  <div className="col-2">{t("address_settings.fields.address")}</div>
                  <div className="col-10">{item.fullAddress && `${item.fullAddress}, `} {item.communeName}, {item.districtName}, {item.provinceName}</div>
                </div>
                <div className="col-1 p-0 d-flex flex-column justify-content-start align-items-end">
                  <button
                    className="p-0 btn btn-sm text-end link-btn"
                    onClick={() => handleModClick(item)}
                  >
                    {t("commons.button.edit")}
                  </button>
                  {!(item.isDefault || item.isPickUp || item.isReturn) && <button
                    className="p-0 btn btn-sm text-end link-btn"
                    onClick={() => handleDelClick(item)}
                  >
                    {t("commons.button.delete")}
                  </button>}
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
                {reqType === "add" && t("address_settings.add_new_address")}
                {reqType === "edit" && t("address_settings.edit_address")}
              </h4>
              <div className="row mb-2">
                <label className="col-2" for="fullname">{t("address_settings.fields.fullname")}: </label>
                <div className="col-10">
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    id="fullname"
                    name="fullname"
                    value={modalForm.fullname}
                    onChange={onChangeModal}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-2 text-nowrap" for="telephone">{t("address_settings.fields.phone_number")}: </label>
                <div className="col-10">
                  <input
                    className="form-control form-control-sm"
                    type="text"
                    id="telephone"
                    name="telephone"
                    value={modalForm.telephone}
                    onChange={onChangeModal}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-2" for="city">{t("address_settings.fields.city")}: </label>
                <div className="col-10">
                  <select
                    className="form-select form-select-sm"
                    id="city"
                    name="city"
                    value={modalForm.city}
                    onChange={(event) => { onChangeModal(event); }}
                  >
                    <option value={0}
                      onClick={() => setModalForm({ ...modalForm, district: 0, ward: 0 })}
                    >{t("address_settings.message.select_city")}</option>
                    {cityList.map(item =>
                      <option value={item.id} onClick={() => setModalForm({ ...modalForm, district: 0, ward: 0 })}>{item.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-2" for="district">{t("address_settings.fields.district")}: </label>
                <div className="col-10">
                  <select
                    className="form-select form-select-sm"
                    id="district"
                    name="district"
                    value={modalForm.district}
                    onChange={(event) => { onChangeModal(event); }}
                    disabled={modalForm.city === 0}
                  >
                    <option value={0}>{t("address_settings.message.select_district")}</option>
                    {districtList.map(item =>
                      <option value={item.id}>{item.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-2" for="ward">{t("address_settings.fields.ward")}: </label>
                <div className="col-10">
                  <select
                    className="form-select form-select-sm"
                    id="ward"
                    name="ward"
                    value={modalForm.ward}
                    onChange={onChangeModal}
                    disabled={modalForm.district === 0}
                  >
                    <option value={0}>{t("address_settings.message.select_ward")}</option>
                    {wardList.map(item =>
                      <option value={item.id}>{item.name}</option>
                    )}
                  </select>
                </div>
              </div>
              <div className="row mb-2">
                <label className="col-2 text-nowrap" for="detail-address">{t("address_settings.fields.detail_address")}: </label>
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
                <div className="col-2 text-nowrap">{t("address_settings.fields.select_location")}:</div>
                <div className="col-10">
                  <MyMapComponent
                    isMarkerShown
                    googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=`}
                    loadingElement={<div style={{ height: `100%` }} />}
                    containerElement={<div style={{ height: `250px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                    modalForm={modalForm}
                    onChangeCoordinates={onChangeCoordinates}
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="default-address"
                    name="defaultAddress"
                    checked={modalForm.defaultAddress}
                    onChange={onChangeCheckBox}
                    disabled={!addressList.length || address.isDefault}
                  />
                  <label className="form-label ms-4" for="default-address">
                    {t("address_settings.fields.set_default_address")}
                  </label>
                </div>

                <div className="">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="pickup-address"
                    name="pickupAddress"
                    checked={modalForm.pickupAddress}
                    onChange={onChangeCheckBox}
                    disabled={!addressList.length || address.isPickUp}
                  />
                  <label className="form-label ms-4" for="pickup-address">
                    {t("address_settings.fields.set_pickup_address")}
                  </label>
                </div>
                <div className="">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="return-address"
                    name="returnAddress"
                    checked={modalForm.returnAddress}
                    onChange={onChangeCheckBox}
                    disabled={!addressList.length || address.isReturn}
                  />
                  <label className="form-label ms-4" for="return-address">
                    {t("address_settings.fields.set_return_address")}
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                {reqType === "add" && <button
                  className="btn btn-sm btn-primary me-1"
                  style={{ width: "60px" }}
                  onClick={() => { handleConfirmAddClick(); }}
                >
                  {t("commons.button.add")}
                </button>}
                {reqType === "edit" && <button
                  className="btn btn-sm btn-primary me-1"
                  style={{ width: "60px" }}
                  onClick={() => { handleConfirmModClick(); }}
                >
                  {t("commons.button.edit")}
                </button>}
                <button
                  type="reset"
                  className="btn btn-sm btn-danger"
                  style={{ width: "60px" }}
                  onClick={handleCloseModal}
                >
                  {t("commons.button.cancel")}
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
                <h4 className="">
                  {t("address_settings.delete_address")}
                </h4>
                <p className="mt-3 mb-4">{t("address_settings.message.confirm_delete")}</p>
                <div className="d-flex justify-content-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary me-1"
                    style={{ width: "60px" }}
                    onClick={() => handleConfirmDelClick()}
                  >
                    {t("commons.button.delete")}
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm btn-danger"
                    style={{ width: "60px" }}
                    onClick={handleCloseDelModal}
                  >
                    {t("commons.button.cancel")}
                  </button>
                </div>
              </div>
            </div>
          </Modal>

          <Snackbar
            open={openMessage}
            autoHideDuration={2000}
            onClose={handleCloseMessage}
          >
            <div className={"alert-popup text-" + responseMessage.type}>
              {responseMessage.content}
            </div>
          </Snackbar>


        </div>
      }}
    </ThemeContext.Consumer>
  )
}

const MyMapComponent = withScriptjs(withGoogleMap((props) => {
  const { modalForm, onChangeCoordinates } = props;
  const [mark, setMark] = useState({ x: modalForm.latitude, y: modalForm.longtitude });
  return <GoogleMap
    defaultZoom={5}
    defaultCenter={{ lat: modalForm.latitude, lng: modalForm.longtitude }}
    onClick={(event) => { setMark({ x: event.latLng.lat(), y: event.latLng.lng() }); onChangeCoordinates(event) }}
  >
    {<Marker position={{ lat: mark.x, lng: mark.y }} />}
  </GoogleMap>
}
))

export default withTranslation()(MyAddresses);