import React from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { TrashIcon } from "@primer/octicons-react";

const BasicInformation = ({ imageList, form, onChangeData, onChangeFile, handleDeleteFile, handleChangeCategoryPath, setModalVideo, t, i18n }) => {
  // console.log(form.videoFile);
  return <div className="card card-body mb-3 shadow">
    <h5>Basic Information</h5>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        Product images
      </div>
      <div className="col-9 row">
        {imageList.map((item, index) => <div className="col-2 d-flex flex-column align-items-center">
          <div className="border" style={{ width: "90px", height: "90px" }}>
            {form.imgFileUrl[index] && <div className="overlay-container">
              <img style={{ width: "89px", height: "89px", objectFit: "contain" }} src={form.imgFileUrl[index] || ""} />
              <div className="overlay">
                <div className="overlay-content text-white d-flex justify-content-center p-1" style={{ width: "100%" }}>
                  <button
                    className="btn btn-sm"
                    onClick={(event) => handleDeleteFile(event, index)}
                  >
                    <TrashIcon size={18} fill="white" />
                  </button>
                </div>
              </div>
            </div>}
            {!form.imgFileUrl[index] && <label className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "100%" }}>
              <img src="https://img.icons8.com/material-outlined/24/000000/add.png" />
              <input
                type="file"
                accept="image/*"
                // id="input-file"
                hidden
                multiple
                onChange={onChangeFile}
              />
            </label>}
          </div>
          <div className="text-center">{!index || "Image"} {index || "* Cover Image"}</div>
        </div>
        )}
      </div>
    </div>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        Product Video
      </div>
      <div className="col-9 d-flex align-items-baseline">
        <div className="">
          <button
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={() => setModalVideo(true)}
          >
            Browse
          </button>
        </div>
        <div className="">
          {
            form.videoUrl && <a href={form.videoUrl} >{form.videoUrl}</a>
            || form.videoFile.name && <div>{form.videoFile.name}</div>
          }
        </div>
      </div>
    </div>
    <div className="row mb-2">
      <label className="col-3 form-label text-muted text-end" for="product-name">* Product Name</label>
      <div className="col-9">
        <input
          className="form-control form-control-sm"
          id="product-name"
          name="name"
          value={form.name}
          onChange={onChangeData}
        />
      </div>
    </div>
    <div className="row mb-2">
      <label className="col-3 text-muted text-end" for="product-description">* Product Description</label>
      <div className="col-9">
        <textarea
          className="form-control form-control-sm"
          id="product-description"
          rows={5}
          name="description"
          value={form.description}
          onChange={onChangeData}
        />
      </div>
    </div>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        Category
      </div>
      <div className="col-9">
        {i18n.language === "en" && form.category.categoryEngPath}
        {i18n.language === "vi" && form.category.categoryViePath}
        <button
          className="btn p-0 ms-2"
          onClick={() => handleChangeCategoryPath()}
        >
          <img src="https://img.icons8.com/fluency-systems-regular/16/000000/pencil--v1.png" />
        </button>
      </div>
    </div>
  </div>
}

export default withTranslation()(BasicInformation)