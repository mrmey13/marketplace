import React from "react";
import { useTranslation, withTranslation } from "react-i18next";

const Shipping = ({ form, onChangeData, t, i18n }) => {
  return <div className="card card-body mb-3 shadow">
    <h5>{t("product_config.tabs.shipping")}</h5>
    <div className="row mb-2">
      <label className="col-3 form-label text-muted text-end" for="weight">{"* " + t("product_config.fields.weight")}</label>
      <div className="col-6">
        <div className="input-group">
          <input
            type="number"
            className="form-control form-control-sm"
            id="weight"
            name="weight"
            value={form.weight}
            onChange={onChangeData}
            placeholder={t("product_config.message.please_input")}
          />
          <span className="input-group-text bg-white text-muted">gr</span>
        </div>
      </div>
    </div>
    <div className="row mb-2">
      <label className="col-3 form-label text-muted text-end">{t("product_config.fields.parcel_size")}</label>
      <div className="col-2">
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            name="width"
            value={form.width}
            onChange={onChangeData}
            placeholder={t("product_config.others.width")}
          />
          <span className="input-group-text bg-white text-muted">cm</span>
        </div>
      </div>
      <div className="col-2">
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            name="depth"
            value={form.depth}
            onChange={onChangeData}
            placeholder={t("product_config.others.length")}
          />
          <span className="input-group-text bg-white text-muted">cm</span>
        </div>
      </div>
      <div className="col-2">
        <div className="input-group">
          <input
            type="number"
            className="form-control"
            name="height"
            value={form.height}
            onChange={onChangeData}
            placeholder={t("product_config.others.height")}
          />
          <span className="input-group-text bg-white text-muted">cm</span>
        </div>
      </div>
    </div>
  </div>
}

export default withTranslation()(Shipping);