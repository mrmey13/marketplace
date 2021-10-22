import { border, borderRadius, display } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { formatMs, makeStyles, Modal } from '@material-ui/core';
import cs from "../../const";
import "./Finance.css"

const getBankDataUrl = cs.BaseURL + "/api/common/bank";
const getBankCardDataUrl = cs.BaseURL + "/api/seller/shop/bank-account/list";
const addBankAccountUrl = cs.BaseURL + "/api/seller/shop/bank-account/create";
const deleteBankAccountUrl = cs.BaseURL + "/api/seller/shop/bank-account/delete";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    // padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
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

const BankAccounts = ({ t, i18n }) => {
  const classes = useStyles();

  const [reqType, setReqType] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [modalForm, setModalForm] = useState({
    cardId: "",
    bankAccountHolderName: "",
    bankAccountNumber: "",
    bankId: "",
    bankName: ""
  });

  const handleOpenModal = (reqType) => {
    setReqType(reqType);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setModalForm({
      cardId: "",
      bankAccountHolderName: "",
      bankAccountNumber: "",
      bankId: "",
      bankName: ""
    });
    // setAddress({});
    setOpenModal(false);
  };

  const onChangeModal = (event) => {
    setModalForm({ ...modalForm, [event.target.name]: event.target.value });
  }

  const onChangeBank = (item) => {
    setModalForm({
      ...modalForm,
      bankName: item.shortName + " - " + item.fullName
    })
    console.log(modalForm)
  }

  const handleAddClick = () => {
    handleOpenModal("add");
  }

  const handleConfirmAddClick = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: addBankAccountUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          bankAccountHolderName: modalForm.bankAccountHolderName,
          bankAccountNumber: modalForm.bankAccountNumber,
          bankId: modalForm.bankId,
          bankName: modalForm.bankName
        }
      });
      if (response.data.error_code == 0) {
        loadBankCardData();
        handleCloseModal();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChooseClick = (item) => {
    setModalForm({
      ...modalForm,
      cardId: item.id,
      bankAccountHolderName: item.bankAccountHolderName,
      bankAccountNumber: item.bankAccountNumber,
      bankId: item.bankId,
      bankName: item.bankName
    })
    handleOpenModal("choose");
  }

  const handleConfirmDelClick = async () => {
    console.log("del")
    try {
      const response = await axios({
        method: "POST",
        url: `${deleteBankAccountUrl}?id=${modalForm.cardId}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
      });
      if (response.data.error_code == 0) {
        loadBankCardData();
        handleCloseModal();
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [bankData, setBankData] = useState([]);
  const [bankCardData, setBankCardData] = useState([]);

  const loadBankData = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: getBankDataUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      });
      console.log("bank", response.data);
      setBankData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadBankCardData = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: getBankCardDataUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          page: 0,
          size: 0,
        }
      });
      console.log("bank-card", response.data);
      setBankCardData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadBankData();
    loadBankCardData()
  }, [])

  return <div className="card card-body shadow-sm" style={{ minWidth: "956px" }}>
    <h4 className="card- mb-3">Bank Accounts</h4>
    <div className="d-flex flex-wrap justify-content-between">
      <button
        className="mb-3 d-flex justify-content-center align-items-center credit-card"
        style={{
          border: "1px dashed #aaa",
        }}
        onClick={() => handleAddClick()}
      >
        <div style={{ fontSize: "16px", color: "#777777" }}>
          <div>
            <img src="https://img.icons8.com/material/24/777777/plus-math--v2.png" />
          </div>
          Add Bank Account
        </div>
      </button>
      {bankCardData.map(item => {
        return <button
          className="card mb-3 credit-card"
          onClick={() => handleChooseClick(item)}
        >
          <div className="card-header d-flex" style={{ height: "80px" }}>
            <div className="card-title text-uppercase ms-auto mt-auto" style={{ fontSize: "20px", color: "GrayText" }}>
              {item.bankName.slice(0, 20) + (item.bankName.length >= 21 ? "..." : "")}
            </div>
          </div>
          <div
            className="card-body d-flex flex-column justify-content-end align-items-start"
            style={{
              fontSize: "18px",
              fontFamily: "'Courier New', 'Roboto', monospace"
            }}
          >
            <div>{"**** " + item.bankAccountNumber.slice(item.bankAccountNumber.length - 4, item.bankAccountNumber.length)}</div>
            <div className="text-uppercase">{item.bankAccountHolderName}</div>
          </div>
        </button>
      })}
      <div style={{ width: "336px", height: "" }} />
      <div style={{ width: "336px", height: "" }} />
      <div style={{ width: "336px", height: "" }} />
      <div style={{ width: "336px", height: "" }} />
    </div>

    <Modal
      // disablePortal
      // disableEnforceFocus
      // disableAutoFocus
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      className={classes.modal}
    >
      <div className={classes.paper}>
        <h4 className="card-title">
          {reqType === "add" && "Add Bank Account"}
          {reqType === "choose" && "Bank Account"}
        </h4>
        {reqType === "add" && <>
          <div className="row mb-2">
            <label className="col-3" for="fullname">Full Name</label>
            <div className="col-9">
              <input
                type="text"
                className="form-control form-control-sm text-uppercase"
                id="fullname"
                name="bankAccountHolderName"
                value={modalForm.bankAccountHolderName}
                onChange={onChangeModal}
              />
            </div>
          </div>
          <div className="row mb-2">
            <label className="col-3" for="bank">Bank Name</label>
            <div className="col-9">
              <select
                className="form-select form-select-sm"
                id="bank"
                name="bankId"
                value={modalForm.bankId}
                onChange={onChangeModal}
              >
                <option value="">Select</option>
                {bankData.map(item =>
                  <option value={item.id} onClick={() => onChangeBank(item)}>{item.shortName + " - " + item.fullName}</option>
                )}
              </select>
            </div>
          </div>
          <div className="row mb-2">
            <label className="col-3" for="bankAccount">Account No</label>
            <div className="col-9">
              <input
                type="text"
                className="form-control form-control-sm"
                id="bankAccount"
                name="bankAccountNumber"
                value={modalForm.bankAccountNumber}
                onChange={onChangeModal}
              />
            </div>
          </div>
        </>}

        {reqType === "choose" && <>
          <div className="row mb-2">
            <label className="col-3" for="fullname">Full Name</label>
            <div className="col-9 text-uppercase">
              {modalForm.bankAccountHolderName}
            </div>
          </div>
          <div className="row mb-2">
            <label className="col-3" for="bank">Bank Name</label>
            <div className="col-9">
              {modalForm.bankName}
            </div>
          </div>
          <div className="row mb-2">
            <label className="col-3" for="bankAccount">Account No</label>
            <div className="col-9">
              {modalForm.bankAccountNumber}
            </div>
          </div>
        </>}

        <div className="d-flex justify-content-end px-2">
          {reqType === "add" && <button
            className="btn btn-sm btn-danger me-1"
            style={{ width: "65px" }}
            onClick={() => { handleConfirmAddClick(); }}
          >
            {t("commons.button.add")}
          </button>}
          {reqType === "choose" && <button
            className="btn btn-sm btn-danger me-1"
            style={{ width: "65px" }}
            onClick={() => { handleConfirmDelClick(); }}
          >
            {t("commons.button.delete")}
          </button>}
          <button
            type="reset"
            className="btn btn-sm btn-outline-secondary border border-secondary"
            style={{ width: "65px" }}
            onClick={handleCloseModal}
          >
            {t("Close")}
          </button>
        </div>
      </div>
    </Modal>
  </div>
}

export default withTranslation()(BankAccounts);