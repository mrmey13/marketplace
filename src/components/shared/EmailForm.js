import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core";
import Modal from '@material-ui/core/Snackbar';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "70vw",
    maxHeight: "95vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #888',
    borderRadius: '4px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EmailForm = ({ open, emailAddr, handleCloseModal }) => {
  const classes = useStyles();
  const [emailForm, setEmailForm] = useState({
    emailAddress: "",
    title: "",
    content: "",
  });

  
  const onChangeForm = (event) => {
    setEmailForm({ ...emailForm, [event.target.name]: event.target.value });
  }
  
  const handleSendClick = () => {
    
  }
  
  const handleCancelClick = () => {
    setEmailForm({
      emailAddress: "",
      title: "",
      content: "",
    })
  }
  
  useEffect(() => {
    setEmailForm({ emailAddress: emailAddr })
  }, [emailAddr])

  return (
    <Modal
      style={{ top: 0 }}
      open={open}
      onClose={handleCloseModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <div className="container-fluid p-0 my-2">
          <h5 className="mb-2">GỬI EMAIL</h5>
          <div className="row mb-2">
            <label className="col-md-2" for="email-address">Tới: </label>
            <div className="col-md-10">
              <input
                className="form-control form-control-sm"
                type="text"
                id="email-address"
                name="emailAddress"
                value={emailForm.emailAddress}
                onChange={onChangeForm}
              />
            </div>
          </div>
          <div className="row mb-2">
            <label className="col-md-2" for="title">Tiêu đề: </label>
            <div className="col-md-10">
              <input
                className="form-control form-control-sm"
                type="text"
                id="title"
                name="title"
                value={emailForm.title}
                onChange={onChangeForm}
              />
            </div>
          </div>
          <div className="row mb-2">
            <label className="col-md-2" for="content">Nội dung: </label>
            <div className="col-md-10">
              <textarea
                className="form-control form-control-sm"
                rows="4"
                id="content"
                name="content"
                value={emailForm.content}
                onChange={onChangeForm}
              />
            </div>
          </div>
          <div className="d-flex justify-content-end mt-1">
            <button
              className="btn btn-sm btn-primary me-1"
              style={{ width: "60px" }}
              onClick={() => {
                handleSendClick();
              }}
            >
              Gửi
            </button>
            <button
              type="reset"
              className="btn btn-sm btn-danger"
              style={{ width: "60px" }}
              onClick={() => { handleCancelClick(); handleCloseModal(); }}
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}

export default EmailForm;