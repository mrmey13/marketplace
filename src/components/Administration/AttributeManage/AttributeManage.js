import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import cs from "../../../const";
import { makeStyles, Snackbar } from "@material-ui/core";
import Modal from "@material-ui/core/Snackbar";

const http = 0;
const getAttributeDataUrl = cs.BaseURL + "/api/manager/attribute/list?";
const createAttributeUrl = cs.BaseURL + "/api/manager/attribute/create";
const editAttributeUrl = cs.BaseURL + "/api/manager/attribute/edit";
const deleteAttributeUrl = cs.BaseURL + "/api/manager/attribute/delete?";
const getAttributeValueDataUrl = cs.BaseURL + "/api/manager/attribute-option/list?";
const addAttributeValueUrl = cs.BaseURL + "/api/manager/attribute-option/create";
const editAttributeValueUrl = cs.BaseURL + "/api/manager/attribute-option/edit";
const deleteAttributeValueUrl = cs.BaseURL + "/api/manager/attribute-option/delete?";

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

const AttributeManage = ({ t, i18n, history }) => {
  const [responseMessage, setResponseMessage] = useState({
    type: "",
    content: "",
  });
  const [openMessage, setOpenMessage] = useState(false);
  const handleOpenMessage = (type, message) => {
    setResponseMessage({
      type: type,
      content: message,
    });
    setOpenMessage(true);
  }
  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setResponseMessage({ type: "", content: "" });
    setOpenMessage(false);
  };

  const [tab, setTab] = useState("add")
  const [form, setForm] = useState({
    attributeId: "",
    attributeVieName: "",
    attributeEngName: "",
  })
  const onChangeData = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  }
  const resetData = () => {
    setForm({
      attributeId: "",
      attributeVieName: "",
      attributeEngName: "",
    })
  }

  const [attributeList, setAttributeList] = useState([]);

  const loadAttributeData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${getAttributeDataUrl}page=0&size=0`, //page=0, size=0 => getFullData
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      })
      // console.log("attrbute-list", response.data);
      setAttributeList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadAttributeData();
  }, []);
  return <div className="container-fluid w-80vw minw-80em my-3">
    <div className="card card-body d-flex flex-row shadow">
      <div className="p-3" style={{ width: "50%" }}>
        <h4 className="fw-bold text-capitalize">Configuration Attribute</h4>
      </div>
      <div className="d-flex m-2 align-items-center justify-content-end" style={{ width: "50%" }}>
        <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio1"
            checked={tab === "add"}
            onClick={() => { setTab("add"); resetData(); }}
          />
          <label class="btn btn-outline-danger" for="btnradio1">Add</label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            checked={tab === "edit"}
            onClick={() => { setTab("edit"); resetData(); }}
          />
          <label class="btn btn-outline-danger" for="btnradio2">Edit</label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio3"
            checked={tab === "delete"}
            onClick={() => { setTab("delete"); resetData(); }}
          />
          <label class="btn btn-outline-danger" for="btnradio3">Delete</label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio4"
            checked={tab === "apply"}
            onClick={() => { setTab("apply"); resetData(); }}
          />
          <label class="btn btn-outline-danger" for="btnradio4">Apply</label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio5"
            checked={tab === ""}
            onClick={() => { setTab(""); history.push("/attribute/list") }}
          />
          <label class="btn btn-outline-danger" for="btnradio5">Go Back Attribute List</label>
        </div>
      </div>
    </div>
    {tab === "add" && <Add
      form={form}
      resetData={resetData}
      setTab={setTab}
      onChangeData={onChangeData}
      handleOpenMessage={handleOpenMessage}
      loadAttributeData={loadAttributeData}
    />}
    {tab === "edit" && <Edit
      form={form}
      attributeList={attributeList}
      setForm={setForm}
      onChangeData={onChangeData}
      handleOpenMessage={handleOpenMessage}
      loadAttributeData={loadAttributeData}
    />}
    {tab === "delete" && <Delete
      form={form}
      attributeList={attributeList}
      resetData={resetData}
      onChangeData={onChangeData}
      handleOpenMessage={handleOpenMessage}
      loadAttributeData={loadAttributeData}
    />}
    {tab === "apply" && <Apply
      handleOpenMessage={handleOpenMessage}
    />}

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
}

const Add = ({ form, resetData, setTab, loadAttributeData, onChangeData, handleOpenMessage }) => {
  const createAttribute = async () => {
    if (!form.attributeVieName || !form.attributeEngName) {
      handleOpenMessage("warning", "Please fill in empty fields");
      return;
    }
    try {
      const response = await axios({
        method: "post",
        url: `${createAttributeUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          attributeVieName: form.attributeVieName,
          attributeEngName: form.attributeEngName,
        }
      });
      // console.log(response.data);
      if (response.data.error_desc === "Success") {
        handleOpenMessage("success", "Create success");
        loadAttributeData();
        resetData();
        setTab("edit");
      } else {
        handleOpenMessage("error", response.data.error_desc)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return <div className="card card-body d-flex flex-row shadow">
    <div className="container-fluid">
      <div className="row mb-2">
        <h4>Add Attribute</h4>
      </div>
      <div className="row mb-2">
        <label className="col-2" for="attributeVieName">attributeVieName</label>
        <div className="col-10">
          <input
            type="text"
            className="form-control"
            id="attributeVieName"
            name="attributeVieName"
            value={form.attributeVieName}
            onChange={onChangeData}
          />
        </div>
      </div>
      <div className="row mb-2">
        <label className="col-2" for="attributeEngName">attributeEngName</label>
        <div className="col-10">
          <input
            type="text"
            className="form-control"
            id="attributeEngName"
            name="attributeEngName"
            value={form.attributeEngName}
            onChange={onChangeData}
          />
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-danger"
          style={{ width: "80px" }}
          onClick={createAttribute}
        >
          Save
        </button>
        {/* <button
          className="btn btn-outline-secondary text-dark"
          style={{ width: "80px" }}>
          Cancel
        </button> */}
      </div>
    </div>
  </div>
}

const Edit = ({ form, setForm, handleOpenMessage, attributeList, onChangeData, loadAttributeData }) => {
  const classes = useStyles();

  const [modalForm, setModalForm] = useState({
    attributeOptionId: "",
    attributeVieOption: "",
    attributeEngOption: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [reqType, setReqType] = useState("");
  const handleOpenModal = (reqType) => {
    setReqType(reqType);
    setOpenModal(true);
  }
  const handleCloseModal = () => {
    setModalForm({
      attributeOptionId: "",
      attributeVieOption: "",
      attributeEngOption: "",
    })
    setOpenModal(false);
  }
  const onChangeAttributeOptions = (event) => {
    setModalForm({ ...modalForm, [event.target.name]: event.target.value })
  }

  const editAttribute = async () => {
    if (!form.attributeId) {
      handleOpenMessage("warning", "Please select attribute");
      return;
    }
    if (!form.attributeVieName || !form.attributeEngName) {
      handleOpenMessage("warning", "Please fill in empty fields");
      return;
    }
    try {
      const response = await axios({
        method: "post",
        url: `${editAttributeUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          attributeId: form.attributeId,
          attributeEngName: form.attributeEngName,
          attributeVieName: form.attributeVieName
        }
      });
      // console.log(response.data)
      if (response.data.error_desc === "Success") {
        handleOpenMessage("success", "Edit success");
        setForm({ ...form, attributeEngName: "", attributeVieName: "" });
        loadAttributeData();
      } else {
        handleOpenMessage("error", response.data.error_desc)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddClick = () => {
    handleOpenModal("add");
  }

  const handleConfirmAddClick = async () => {
    if (!modalForm.attributeEngOption || !modalForm.attributeVieOption) {
      handleOpenMessage("warning", "Please fill in empty fields");
      return;
    }
    try {
      const response = await axios({
        method: "post",
        url: `${addAttributeValueUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          attributeId: form.attributeId,
          attributeEngValue: modalForm.attributeEngOption,
          attributeVieValue: modalForm.attributeVieOption,
        }
      });
      // console.log(response.data)
      if (response.data.error_desc === "Success") {
        handleOpenMessage("success", "Create success");
        loadAttributeOptions();
        handleCloseModal();
      } else {
        handleOpenMessage("error", response.data.error_desc)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditClick = (item) => {
    setModalForm({
      attributeOptionId: item.attributeOptionId,
      attributeEngOption: item.attributeEngValue,
      attributeVieOption: item.attributeViValue
    })
    handleOpenModal("edit");
  }

  const handleConfirmEditClick = async () => {
    if (!modalForm.attributeEngOption || !modalForm.attributeVieOption) {
      handleOpenMessage("warning", "Please fill in empty fields");
      return;
    }
    try {
      const response = await axios({
        method: "post",
        url: `${editAttributeValueUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          attributeOptionId: modalForm.attributeOptionId,
          attributeEngValue: modalForm.attributeEngOption,
          attributeVieValue: modalForm.attributeVieOption
        }
      });
      // console.log(response.data);
      if (response.data.error_desc === "Success") {
        handleOpenMessage("success", "Edit success");
        loadAttributeOptions();
        handleCloseModal();
      } else {
        handleOpenMessage("error", response.data.error_desc)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelClick = (item) => {
    setModalForm({
      attributeOptionId: item.attributeOptionId,
      attributeEngOption: item.attributeEngValue,
      attributeVieOption: item.attributeViValue
    });
    handleOpenModal("delete");
  }

  const handleConfirmDelClick = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${deleteAttributeValueUrl}attributeOptionId=${modalForm.attributeOptionId}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      });
      // console.log(response.data);
      if (response.data.error_desc === "Success") {
        handleOpenMessage("success", "Delete success");
        loadAttributeOptions();
        handleCloseModal();
      } else {
        handleOpenMessage("error", response.data.error_desc)
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [attributeOptions, setAttributeOptions] = useState([]);
  const loadAttributeOptions = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${getAttributeValueDataUrl}attributeId=${form.attributeId}&page=0&size=0`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      });
      // console.log("attr-options", response.data);
      setAttributeOptions(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadAttributeOptions();
  }, [form.attributeId]);
  return <>
    <div className="card card-body d-flex flex-row shadow">
      <div className="container-fluid">
        <div className="row mb-2">
          <h4>Edit Attribute</h4>
        </div>
        <div className="row mb-2">
          <label className="col-2" for="attributeVieName">attributeVieName</label>
          <div className="col-10">
            <select
              className="form-control"
              id="attributeVieName"
              name="attributeId"
              value={form.attributeId}
              onChange={onChangeData}
            >
              <option value={""}>Chọn thuộc tính</option>
              {attributeList.map(item => <option value={item.attributeId}>{item.attributeViName}</option>)}
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-2" for="attributeEngName">attributeEngName</label>
          <div className="col-10">
            <select
              className="form-control"
              id="attributeEngName"
              name="attributeId"
              value={form.attributeId}
              onChange={onChangeData}
            >
              <option value={""}>Select attribute</option>
              {attributeList.map(item => <option value={item.attributeId}>{item.attributeEngName}</option>)}
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-2" for="attributeVieName">attributeVieName</label>
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              id="attributeVieName"
              name="attributeVieName"
              value={form.attributeVieName}
              onChange={onChangeData}
            />
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-2" for="attributeEngName">attributeEngName</label>
          <div className="col-10">
            <input
              type="text"
              className="form-control"
              id="attributeEngName"
              name="attributeEngName"
              value={form.attributeEngName}
              onChange={onChangeData}
            />
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-danger"
            style={{ width: "80px" }}
            onClick={editAttribute}
          >
            Save
          </button>
          {/* <button className="btn btn-outline-secondary text-dark" style={{ width: "80px" }}>
            Cancel
          </button> */}
        </div>
      </div>
    </div>

    <div className="card card-body d-flex flex-row shadow">
      <div className="container-fluid">
        <div className="row mb-2">
          <h4>Detail Attribute</h4>
        </div>
        {
          !form.attributeId && <div>Please select attribute</div>
        }
        {
          form.attributeId && <div>
            <table className="table table-sm table-striped table-hover">
              <thead
                className="text-white"
                style={{
                  backgroundColor: "#F69756",
                  fontSize: "15px",
                  color: "black",
                }}
              >
                <tr>
                  <th className="" style={{ width: "5%" }} scope="col">#</th>
                  <th className="">attributeValueEngName</th>
                  <th className="">attributeValueVieName</th>
                  <th className="" style={{ width: "5%" }} scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {attributeOptions.map((item, index) => <tr key={item}>
                  <td>{index + 1}</td>
                  <td>{item.attributeEngValue}</td>
                  <td>{item.attributeViValue}</td>
                  <td className="d-flex flex-column align-items-start">
                    <button
                      className="p-0 btn btn-sm text-end link-btn"
                      onClick={() => {
                        handleEditClick(item);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="p-0 btn btn-sm text-end link-btn"
                      onClick={() => {
                        handleDelClick(item);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                )}
                <tr>
                  <td colSpan={5} className="text-center">
                    <button
                      className="p-0 btn btn-sm link-btn"
                      style={{ width: "100%" }}
                      onClick={() => {
                        handleAddClick()
                      }}
                    >
                      Add attribute value
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        }
      </div>
    </div>
    <Modal
      style={{ top: 0 }}
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <h4 className="mb-4">
          {reqType === "add" && "Add a new Attribute value"}
          {reqType === "edit" && "Edit Attribute value"}
          {reqType === "delete" && "Delete Attribute value"}
        </h4>
        {reqType !== "delete" && <div>
          <div className="row mb-2">
            <label className="col-2" for="attributeVieOption">attributeVieOption</label>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                id="attributeVieOption"
                name="attributeVieOption"
                value={modalForm.attributeVieOption}
                onChange={onChangeAttributeOptions}
              />
            </div>
          </div>
          <div className="row mb-2">
            <label className="col-2" for="attributeEngOption">attributeEngOption</label>
            <div className="col-10">
              <input
                type="text"
                className="form-control"
                id="attributeEngOption"
                name="attributeEngOption"
                value={modalForm.attributeEngOption}
                onChange={onChangeAttributeOptions}
              />
            </div>
          </div>
        </div>}
        {reqType === "delete" && <div>
          <p className="mt-3 mb-4">{"Are you sure you want to delete"}</p>
        </div>}
        <div className="d-flex justify-content-end">
          {reqType === "add" && <button
            type="button"
            className="btn btn-sm btn-primary me-1"
            style={{ width: "60px" }}
            onClick={() => handleConfirmAddClick()}
          >
            {"Save"}
          </button>}
          {reqType === "edit" && <button
            type="button"
            className="btn btn-sm btn-primary me-1"
            style={{ width: "60px" }}
            onClick={() => handleConfirmEditClick()}
          >
            {"Save"}
          </button>}
          {reqType === "delete" && <button
            type="button"
            className="btn btn-sm btn-primary me-1"
            style={{ width: "60px" }}
            onClick={() => handleConfirmDelClick()}
          >
            {"Delete"}
          </button>}
          <button
            type="button"
            className="btn btn-sm btn-danger"
            style={{ width: "60px" }}
            onClick={handleCloseModal}
          >
            {"Cancel"}
          </button>
        </div>
      </div>
    </Modal>
  </>
}

const Delete = ({ form, resetData, attributeList, onChangeData, loadAttributeData, handleOpenMessage }) => {
  const deleteAttribute = async () => {
    if (!form.attributeId) {
      handleOpenMessage("warning", "Please select attribute");
      return;
    }
    try {
      const response = await axios({
        method: "get",
        url: `${deleteAttributeUrl}attributeId=${form.attributeId}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      });
      // console.log(response.data);
      if (response.data.error_desc === "Success") {
        handleOpenMessage("success", "Delete success");
        loadAttributeData();
      } else {
        handleOpenMessage("error", response.data.error_desc)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return <div className="card card-body d-flex flex-row shadow">
    <div className="container-fluid">
      <div className="row mb-2">
        <h4>Delete Attribute</h4>
      </div>
      <div className="row mb-2">
        <label className="col-2" for="attributeVieName">attributeVieName</label>
        <div className="col-10">
          <select
            className="form-control"
            id="attributeVieName"
            name="attributeId"
            value={form.attributeId}
            onChange={onChangeData}
          >
            <option value={""}>Chọn thuộc tính</option>
            {attributeList.map(item => <option value={item.attributeId}>{item.attributeViName}</option>)}
          </select>
        </div>
      </div>
      <div className="row mb-2">
        <label className="col-2" for="attributeEngName">attributeEngName</label>
        <div className="col-10">
          <select
            className="form-control"
            id="attributeEngName"
            name="attributeId"
            value={form.attributeId}
            onChange={onChangeData}
          >
            <option value={""}>Select attribute</option>
            {attributeList.map(item => <option value={item.attributeId}>{item.attributeEngName}</option>)}
          </select>
        </div>
      </div>
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-danger"
          style={{ width: "80px" }}
          onClick={deleteAttribute}
        >
          Delete
        </button>
        {/* <button className="btn btn-outline-secondary text-dark" style={{ width: "80px" }}>
          Cancel
        </button> */}
      </div>
    </div>
  </div>
}

const Apply = ({ }) => {
  return <div className="card card-body d-flex flex-row shadow">
    <div className="container-fluid">
      <div className="row mb-2">
        <h4>Apply Attribute</h4>
      </div>
    </div>
  </div>
}

export default withTranslation()(AttributeManage);