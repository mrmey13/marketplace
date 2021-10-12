import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import cs from "../../../const";
import { makeStyles, Snackbar } from "@material-ui/core";
import Modal from "@material-ui/core/Snackbar";

const getAttributeDataUrl = cs.BaseURL + "/api/manager/attribute/list?";
const createAttributeUrl = cs.BaseURL + "/api/manager/attribute/create";
const editAttributeUrl = cs.BaseURL + "/api/manager/attribute/edit";
const deleteAttributeUrl = cs.BaseURL + "/api/manager/attribute/delete?";
const getAttributeValueDataUrl = cs.BaseURL + "/api/manager/attribute-option/list?";
const addAttributeValueUrl = cs.BaseURL + "/api/manager/attribute-option/create";
const editAttributeValueUrl = cs.BaseURL + "/api/manager/attribute-option/edit";
const deleteAttributeValueUrl = cs.BaseURL + "/api/manager/attribute-option/delete?";
const addCategoryAttributeUrl = cs.BaseURL + "/api/manager/category-attribute/create";
const editCategoryAttributeUrl = cs.BaseURL + "/api/manager/category-attribute/edit";
const deleteCategoryAttributeUrl = cs.BaseURL + "/api/manager/category-attribute/delete?";
const loadCategoryDataUrl = cs.BaseURL +"/api/common/product/category/list?categoryLevel=0&hasNoChild=true";
const loadAttributeOfCategoryDataUrl = cs.BaseURL + "/api/manager/category-attribute/list?";

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

const AttributeManage = (props) => {
  const { t, i18n, history } = props;
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
        <h4 className="fw-bold text-capitalize">{t("attribute.attribute_config")}</h4>
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
          <label class="btn btn-outline-danger" for="btnradio1" style={{ minWidth: "70px" }}>{t("commons.button.add")}</label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio2"
            checked={tab === "edit"}
            onClick={() => { setTab("edit"); resetData(); }}
          />
          <label class="btn btn-outline-danger" for="btnradio2" style={{ minWidth: "70px" }}>{t("commons.button.edit")}</label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio3"
            checked={tab === "delete"}
            onClick={() => { setTab("delete"); resetData(); }}
          />
          <label class="btn btn-outline-danger" for="btnradio3" style={{ minWidth: "70px" }}>{t("commons.button.delete")}</label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio4"
            checked={tab === "apply"}
            onClick={() => { setTab("apply"); resetData(); }}
          />
          <label class="btn btn-outline-danger" for="btnradio4" style={{ minWidth: "70px" }}>{t("commons.button.apply")}</label>

          <input
            type="radio"
            className="btn-check"
            name="btnradio"
            id="btnradio5"
            checked={tab === ""}
            onClick={() => { setTab(""); history.push("/attribute/list") }}
          />
          <label class="btn btn-outline-danger" for="btnradio5">{t("attribute.tabs.go_back_attribute")}</label>
        </div>
      </div>
    </div>
    {tab === "add" && <Add
      {...props}
      form={form}
      resetData={resetData}
      setTab={setTab}
      onChangeData={onChangeData}
      handleOpenMessage={handleOpenMessage}
      loadAttributeData={loadAttributeData}
    />}
    {tab === "edit" && <Edit
      {...props}
      form={form}
      attributeList={attributeList}
      setForm={setForm}
      onChangeData={onChangeData}
      handleOpenMessage={handleOpenMessage}
      loadAttributeData={loadAttributeData}
    />}
    {tab === "delete" && <Delete
      {...props}
      form={form}
      attributeList={attributeList}
      resetData={resetData}
      onChangeData={onChangeData}
      handleOpenMessage={handleOpenMessage}
      loadAttributeData={loadAttributeData}
    />}
    {tab === "apply" && <Apply
      {...props}
      attributeList={attributeList}
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

const Add = ({ form, resetData, setTab, loadAttributeData, onChangeData, handleOpenMessage, t, i18n }) => {
  const createAttribute = async () => {
    if (!form.attributeVieName || !form.attributeEngName) {
      handleOpenMessage("warning", t("attribute.message.fill_empty_fields"));
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
        handleOpenMessage("success", t("attribute.message.create_success"));
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
        <h4>{t("attribute.tabs.add_attribute")}</h4>
      </div>
      <div className="row mb-2">
        <label className="col-2" for="attributeVieName">{t("attribute.fields.attribute_vie_name")}</label>
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
        <label className="col-2" for="attributeEngName">{t("attribute.fields.attribute_eng_name")}</label>
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
          {t("commons.button.save")}
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

const Edit = ({ form, setForm, handleOpenMessage, attributeList, onChangeData, loadAttributeData, t, i18n }) => {
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
      handleOpenMessage("warning", t("attribute.message.select_attribute"));
      return;
    }
    if (!form.attributeVieName || !form.attributeEngName) {
      handleOpenMessage("warning", t("attribute.message.fill_empty_fields"));
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
        handleOpenMessage("success", t("attribute.message.edit_success"));
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
      handleOpenMessage("warning", t("attribute.message.fill_empty_fields"));
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
        handleOpenMessage("success", t("attribute.message.create_success"));
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
      handleOpenMessage("warning", t("attribute.message.fill_empty_fields"));
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
        handleOpenMessage("success", t("attribute.message.edit_success"));
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
        handleOpenMessage("success", t("attribute.message.delete_success"));
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
          <h4>{t("attribute.tabs.edit_attribute")}</h4>
        </div>
        <div className="row mb-2">
          <label className="col-3" for="attributeVieName">{t("attribute.fields.attribute_vie_name")}</label>
          <div className="col-9">
            <select
              className="form-control"
              id="attributeVieName"
              name="attributeId"
              value={form.attributeId}
              onChange={onChangeData}
            >
              <option value={""}>{"Chọn thuộc tính"}</option>
              {attributeList.map(item => <option value={item.attributeId}>{item.attributeViName}</option>)}
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-3" for="attributeEngName">{t("attribute.fields.attribute_eng_name")}</label>
          <div className="col-9">
            <select
              className="form-control"
              id="attributeEngName"
              name="attributeId"
              value={form.attributeId}
              onChange={onChangeData}
            >
              <option value={""}>{"Select attribute"}</option>
              {attributeList.map(item => <option value={item.attributeId}>{item.attributeEngName}</option>)}
            </select>
          </div>
        </div>
        <div className="row mb-2">
          <label className="col-3" for="attributeVieName">{t("attribute.fields.attribute_new_vie_name")}</label>
          <div className="col-9">
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
          <label className="col-3" for="attributeEngName">{t("attribute.fields.attribute_new_eng_name")}</label>
          <div className="col-9">
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
            {t("commons.button.save")}
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
          <h4>{t("attribute.tabs.detail_attribute")}</h4>
        </div>
        {
          !form.attributeId && <div>{t("attribute.message.select_attribute")}</div>
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
                  <th className="">{t("attribute.fields.attribute_eng_value")}</th>
                  <th className="">{t("attribute.fields.attribute_vie_value")}</th>
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
                      {t("commons.button.edit")}
                    </button>
                    <button
                      className="p-0 btn btn-sm text-end link-btn"
                      onClick={() => {
                        handleDelClick(item);
                      }}
                    >
                      {t("commons.button.delete")}
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
                      {t("attribute.attribute_value.add_attribute_value")}
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
          {reqType === "add" && t("attribute.attribute_value.add_attribute_value")}
          {reqType === "edit" && t("attribute.attribute_value.edit_attribute_value")}
          {reqType === "delete" && t("attribute.attribute_value.delete_attribute_value")}
        </h4>
        {reqType !== "delete" && <div>
          <div className="row mb-2">
            <label className="col-2" for="attributeVieOption">{t("attribute.fields.attribute_vie_value")}</label>
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
            <label className="col-2" for="attributeEngOption">{t("attribute.fields.attribute_eng_value")}</label>
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
          <p className="mt-3 mb-4">{t("attribute.message.confirm_delete")}</p>
        </div>}
        <div className="d-flex justify-content-end">
          {reqType === "add" && <button
            type="button"
            className="btn btn-sm btn-primary me-1"
            style={{ width: "60px" }}
            onClick={() => handleConfirmAddClick()}
          >
            {t("commons.button.save")}
          </button>}
          {reqType === "edit" && <button
            type="button"
            className="btn btn-sm btn-primary me-1"
            style={{ width: "60px" }}
            onClick={() => handleConfirmEditClick()}
          >
            {t("commons.button.save")}
          </button>}
          {reqType === "delete" && <button
            type="button"
            className="btn btn-sm btn-primary me-1"
            style={{ width: "60px" }}
            onClick={() => handleConfirmDelClick()}
          >
            {t("commons.button.delete")}
          </button>}
          <button
            type="button"
            className="btn btn-sm btn-danger"
            style={{ width: "60px" }}
            onClick={handleCloseModal}
          >
            {t("commons.button.cancel")}
          </button>
        </div>
      </div>
    </Modal>
  </>
}

const Delete = ({ form, resetData, attributeList, onChangeData, loadAttributeData, handleOpenMessage, t, i18n }) => {
  const deleteAttribute = async () => {
    if (!form.attributeId) {
      handleOpenMessage("warning", t("attribute.message.select_attribute"));
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
        handleOpenMessage("success", t("attribute.message.delete_success"));
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
        <h4>{t("attribute.tabs.delete_attribute")}</h4>
      </div>
      <div className="row mb-2">
        <label className="col-2" for="attributeVieName">{t("attribute.fields.attribute_vie_name")}</label>
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
        <label className="col-2" for="attributeEngName">{t("attribute.fields.attribute_eng_name")}</label>
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
          {t("commons.button.delete")}
        </button>
        {/* <button className="btn btn-outline-secondary text-dark" style={{ width: "80px" }}>
          Cancel
        </button> */}
      </div>
    </div>
  </div>
}

const Apply = ({ attributeList, handleOpenMessage, t, i18n }) => {

  const classes = useStyles();

  const [modalForm, setModalForm] = useState({
    categoryId: "",
    categoryAttributeId: "",
    attributeId: ""
  });
  const [reqType, setReqType] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const onChangeForm = (event) => {
    setModalForm({ ...modalForm, [event.target.name]: event.target.value });
  }
  const handleCloseModal = () => {
    setModalForm({ ...modalForm, attributeId: "", categoryAttributeId: "" });
    setOpenModal(false);
  }
  const handleAddClick = () => {
    setReqType("add");
    setOpenModal(true);
  }

  const handleConfirmAddClick = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${addCategoryAttributeUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          categoryId: modalForm.categoryId,
          attributeId: modalForm.attributeId
        }
      });
      // console.log(response.data)
      if (response.data.error_desc === "Success") {
        handleOpenMessage("success", t("attribute.message.add_success"));
        // setModalForm({ ...modalForm, attributeId: "", categoryAttributeId: "" });
        loadAttributeOfCategoryData();
        handleCloseModal();
      } else {
        handleOpenMessage("error", response.data.error_desc)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleEditClick = (item) => {
    setModalForm({ ...modalForm, categoryAttributeId: item.categoryAttributeId })
    setReqType("edit");
    setOpenModal(true);
  }

  const handleConfirmEditClick = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `${editCategoryAttributeUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          categoryAttributeId: modalForm.categoryAttributeId,
          attributeId: modalForm.attributeId
        }
      });
      // console.log(response.data);
      if (response.data.error_desc === "Success") {
        handleOpenMessage("success", t("attribute.message.edit_success"));
        // setModalForm({ ...modalForm, attributeId: "", categoryAttributeId: "" });
        loadAttributeOfCategoryData();
        handleCloseModal();
      } else {
        handleOpenMessage("error", response.data.error_desc)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelClick = (item) => {
    setModalForm({ ...modalForm, categoryAttributeId: item.categoryAttributeId })
    setReqType("delete");
    setOpenModal(true);
  }

  const handleConfirmDelClick = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${deleteCategoryAttributeUrl}categoryAttributeId=${modalForm.categoryAttributeId}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      });
      // console.log(response.data)
      if (response.data.error_desc === "Success") {
        handleOpenMessage("success", t("attribute.message.delete_success"));
        // setModalForm({ ...modalForm, attributeId: "", categoryAttributeId: "" });
        loadAttributeOfCategoryData();
        handleCloseModal();
      } else {
        handleOpenMessage("error", response.data.error_desc)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const [categoryList, setCategoryList] = useState([]);
  const [attributeListOfCategory, setAttributeListOfCategory] = useState([]);


  const loadCategoryData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: loadCategoryDataUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      });
      // console.log("cate-nochild", response.data);
      setCategoryList(response.data.data);
    } catch (error) {
      console.log(error)
    }
  }

  const loadAttributeOfCategoryData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${loadAttributeOfCategoryDataUrl}categoryId=${modalForm.categoryId}&page=0&size=0`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      })
      // console.log(response.data);
      setAttributeListOfCategory(response.data.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadCategoryData();
    loadAttributeOfCategoryData();
  }, [modalForm.categoryId])

  return <div className="card card-body d-flex flex-row shadow">
    <div className="container-fluid">
      <div className="row mb-2">
        <h4>{t("attribute.tabs.apply_attribute")}</h4>
      </div>
      <div className="row mb-2">
        <label className="col-2" for="categoryId">{t("attribute.category")}</label>
        <div className="col-10">
          <select
            className="form-control"
            id="categoryId"
            name="categoryId"
            value={modalForm.categoryId}
            onChange={onChangeForm}
          >
            <option value={""}>{t("attribute.message.select_category")}</option>
            {categoryList.map(item => <option value={item.categoryId}>
              {i18n.language == "en" && item.categoryEngName}
              {i18n.language == "vi" && item.categoryVieName}
            </option>)}
          </select>
        </div>
      </div>
      {
        !modalForm.categoryId && <div className="mt-5 mb-3 text-center">{t("attribute.message.please_select_category")}</div>
      }
      {
        modalForm.categoryId && <div>
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
                <th className="">{t("attribute.fields.attribute_eng_name")}</th>
                <th className="">{t("attribute.fields.attribute_vie_name")}</th>
                <th className="" style={{ width: "5%" }} scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {attributeListOfCategory.map((item, index) => <tr key={item}>
                <td>{index + 1}</td>
                <td>{item.attributeEngName}</td>
                <td>{item.attributeViName}</td>
                <td className="d-flex flex-column align-items-start">
                  <button
                    className="p-0 btn btn-sm text-end link-btn"
                    onClick={() => {
                      handleEditClick(item);
                    }}
                  >
                    {t("commons.button.edit")}
                  </button>
                  <button
                    className="p-0 btn btn-sm text-end link-btn"
                    onClick={() => {
                      handleDelClick(item);
                    }}
                  >
                    {t("commons.button.delete")}
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
                    {t("attribute.tabs.add_attribute")}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      }
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
          {reqType === "add" && "Add a new Attribute"}
          {reqType === "edit" && "Edit Attribute of Category"}
          {reqType === "delete" && "Delete Attribute of Category"}
        </h4>
        {reqType === "add" && <div>
          <div className="row mb-2">
            <label className="col-2" for="category-Id">Category</label>
            <div className="col-10">
              <select
                className="form-control"
                id="category-Id"
                name="categoryId"
                value={modalForm.categoryId}
                onChange={onChangeForm}
                disabled
              >
                <option value={""}>Select category</option>
                {categoryList.map(item => <option value={item.categoryId}>{item.categoryEngName}</option>)}
              </select>
            </div>
          </div>
          <div className="row mb-2">
            <label className="col-2" for="attribute-Id">Attribute</label>
            <div className="col-10">
              <select
                className="form-control"
                id="attribute-Id"
                name="attributeId"
                value={modalForm.attributeId}
                onChange={onChangeForm}
              >
                <option value={""}>Select attribute</option>
                {attributeList.map(item => <option value={item.attributeId}>{item.attributeEngName}</option>)}
              </select>
            </div>
          </div>
        </div>}
        {reqType === "edit" && <div>
          <div className="row mb-2">
            <label className="col-2" for="category-Id">Category</label>
            <div className="col-10">
              <select
                className="form-control"
                id="category-Id"
                name="categoryId"
                value={modalForm.categoryId}
                onChange={onChangeForm}
                disabled
              >
                <option value={""}>Select category</option>
                {categoryList.map(item => <option value={item.categoryId}>{item.categoryEngName}</option>)}
              </select>
            </div>
          </div>
          <div className="row mb-2">
            <label className="col-2" for="categoryAttributeId-Id">Current Attribute</label>
            <div className="col-10">
              <select
                className="form-control"
                id="categoryAttributeId-Id"
                name="categoryAttributeId"
                value={modalForm.categoryAttributeId}
                onChange={onChangeForm}
              >
                <option value={""}>Select attribute</option>
                {attributeListOfCategory.map(item => <option value={item.categoryAttributeId}>{item.attributeEngName}</option>)}
              </select>
            </div>
          </div>
          <div className="row mb-2">
            <label className="col-2" for="attribute-Id">New Attribute</label>
            <div className="col-10">
              <select
                className="form-control"
                id="attribute-Id"
                name="attributeId"
                value={modalForm.attributeId}
                onChange={onChangeForm}
              >
                <option value={""}>Select attribute</option>
                {attributeList.map(item => <option value={item.attributeId}>{item.attributeEngName}</option>)}
              </select>
            </div>
          </div>
        </div>}
        {reqType === "delete" && <div>
          <div className="row mb-2">
            <label className="col-2" for="category-Id">Category</label>
            <div className="col-10">
              <select
                className="form-control"
                id="category-Id"
                name="categoryId"
                value={modalForm.categoryId}
                onChange={onChangeForm}
                disabled
              >
                <option value={""}>Select category</option>
                {categoryList.map(item => <option value={item.categoryId}>{item.categoryEngName}</option>)}
              </select>
            </div>
          </div>
          <div className="row mb-2">
            <label className="col-2" for="categoryAttributeId-Id">Attribute</label>
            <div className="col-10">
              <select
                className="form-control"
                id="categoryAttributeId-Id"
                name="categoryAttributeId"
                value={modalForm.categoryAttributeId}
                onChange={onChangeForm}
              >
                <option value={""}>Select attribute</option>
                {attributeListOfCategory.map(item => <option value={item.categoryAttributeId}>{item.attributeEngName}</option>)}
              </select>
            </div>
          </div>
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
  </div>
}

export default withTranslation()(AttributeManage);