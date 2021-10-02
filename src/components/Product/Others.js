import React from "react";
import { useTranslation, withTranslation } from "react-i18next";

const Others = ({ form, onChangeData, t, i18n }) => {
  return <div className="card card-body mb-3 shadow">
    <h5>Others</h5>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        {"Pre-Order"}
      </div>
      <div className="col-9 row">
        <div className="col-2">
          <input
            type="radio"
            className="form-check-input"
            name="isPreorderedProduct"
            value={0}
            id="no"
            onChange={(event) => { onChangeData(event) }}
            defaultChecked={form.isPreorderedProduct === 0}
          />
          <label className="ms-2" htmlFor="no">{"No"}</label>
        </div>
        <div className="col-2">
          <input
            type="radio"
            className="form-check-input"
            name="isPreorderedProduct"
            value={1}
            id="yes"
            onChange={(event) => { onChangeData(event) }}
            defaultChecked={form.isPreorderedProduct === 1}
          />
          <label className="ms-2" htmlFor="yes">{"Yes"}</label>
        </div>
      </div>
    </div>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        {"Condition"}
      </div>
      <div className="col-9 row">
        <div className="col-2">
          <input
            type="radio"
            className="form-check-input"
            name="isNewProduct"
            value={1}
            id="new"
            onChange={(event) => { onChangeData(event) }}
            defaultChecked={form.isNewProduct === 1}
          />
          <label className="ms-2" htmlFor="new">{"New"}</label>
        </div>
        <div className="col-2">
          <input
            type="radio"
            className="form-check-input"
            name="isNewProduct"
            value={0}
            id="used"
            onChange={(event) => { onChangeData(event) }}
            defaultChecked={form.isNewProduct === 0}
          />
          <label className="ms-2" htmlFor="uesd">{"Used"}</label>
        </div>

      </div>
    </div>
  </div>
}

export default withTranslation()(Others)