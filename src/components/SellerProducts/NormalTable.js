import { height } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";
import cs from "../../const";
import { useTranslation } from 'react-i18next';

const NormalTable = ({ data }) => {
  const { t, i18n } = useTranslation();
  return <div className="card">
    <div className="card-header">
      <div className="row text-muted" style={{ fontSize: "14px" }}>
        <div className="border-start" style={{ width: "4%" }}>

        </div>
        <div className="border-start" style={{ width: "29%" }}>
          {t('product.product_name')}
        </div>
        <div className="border-start" style={{ width: "10%" }}>
          {t('product.sku')}
        </div>
        <div className="border-start" style={{ width: "15%" }}>
          {t('product.variation')}
        </div>
        <div className="border-start" style={{ width: "15%" }}>
          {t('product.price')}
        </div>
        <div className="border-start" style={{ width: "10%" }}>
          {t('product.stock')}
        </div>
        <div className="border-start" style={{ width: "10%" }}>
          {t('product.sale')}
        </div>
        <div className="border-start" style={{ width: "7%" }}>
          {/* Options */}
        </div>
      </div>
    </div>
    <div className="card-body pt-1">
      {data.map((item, index) =>
        <div className="row border-bottom" style={{ fontSize: "13px" }}>
          <div className="" style={{ width: "4%" }}>
            {index + 1}
          </div>
          <div className="d-flex justify-content-start" style={{ width: "29%" }}>
            <div className="border my-1" style={{ width: "80px", height: "60px" }}>
              <Link
                className="fw-bold text-dark"
                to={`/product/edit/${item.productId}`}
              >
                <img
                  src={`${cs.MediaURL}/media/${item.productImageCover}`}
                  style={{
                    width: "80px",
                    height: "60px",
                    objectFit: "cover"
                  }}
                />
              </Link>
            </div>
            <div className="m-1 ps-2">
              <Link
                className="fw-bold text-dark"
                to={`/product/edit/${item.productId}`}
              >
                {item.productName}
              </Link>
            </div>
          </div>
          <div className="row m-0 p-0" style={{ width: "60%" }}>
            {!item.inventoryArray.length && <>
              <div className="" style={{ width: "16.67%" }}>
                {item.SKU || "-"}
              </div>
              <div className="" style={{ width: "25%" }}>
                {item.variations || "-"}
              </div>
              <div className="" style={{ width: "25%" }}>
                {item.price}
              </div>
              <div className="" style={{ width: "16.66%" }}>
                {item.inventoryCount ? item.inventoryCount : <span className="text-danger fw-bold">Sold out</span>}
              </div>
              <div className="" style={{ width: "16.66%", height: "60px" }}>
                {item.sales || "-"}
              </div>
            </>}
            {item.inventoryArray.map(i => <>
              <div className="" style={{ width: "16.67%" }}>
                {i.sku || "-"}
              </div>
              <div className="" style={{ width: "25%" }}>
                {i.variationName || "-"}
              </div>
              <div className="" style={{ width: "25%" }}>
                {i.price || "-"}
              </div>
              <div className="" style={{ width: "16.66%" }}>
                {item.inventoryCount ? item.inventoryCount : <span className="text-danger fw-bold">Sold out</span>}
              </div>
              <div className="" style={{ width: "16.66%", height: "60px" }}>
                {item.sales || "-"}
              </div>
            </>)}
          </div>
          <div className="d-flex align-items-start" style={{ width: "7%" }}>
            <Link
              className="btn link-btn"
              to={`/product/edit/${item.productId}`}
            >
              {t('commons.button.edit')}
            </Link>
          </div>
        </div>
      )}
      {!data.length && <div className="row border-bottom" style={{ fontSize: "15px" }}>No Product</div>}
    </div>
  </div>
}

export default NormalTable;