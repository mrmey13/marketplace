import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { Link } from "react-router-dom";

import ActiveProduct from "./ActiveProduct";
import AllProduct from "./AllProduct";
import BannedProduct from "./BannedProduct";
import SoldOutProduct from "./SoldOutProduct";

const SellerProduct = ({ match }) => {
  const { t,i18n } = useTranslation();
  const [status, setStatus] = useState(match.params.status);
  useEffect(() => {
    setStatus(match.params.status || "all")
  }, [match.params.status])
  return <div className="card shadow-sm" style={{ minWidth: "956px" }}>
    <div
      className="card-header"
      style={{
        position: "-webkit-sticky",
        position: "sticky",
        zIndex: "2",
        top: "53px",
        boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
        backgroundColor: "#efefef"
      }}
    >
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className={status === "all" ? "nav-link active px-4 text-danger" : "nav-link text-dark px-4"}
            to="all"
          >
            {t('product.all')}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={status === "active" ? "nav-link active px-4 text-danger" : "nav-link text-dark px-4"}
            to="active">
            {t('product.live')}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={status === "soldout" ? "nav-link active px-4 text-danger" : "nav-link text-dark px-4"}
            to="soldout">
            {t('product.sold_out')}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={status === "banned" ? "nav-link active px-4 text-danger" : "nav-link text-dark px-4"}
            to="banned"
          >
            {t('product.violation')}
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link
            className={status === "denisted" ? "nav-link active px-4 text-danger" : "nav-link text-dark px-4"}
            to="denisted"
          >
            Delisted
          </Link>
        </li> */}
      </ul>
    </div>
    <div className="card-body">
      {status === "all" && <AllProduct />}
      {status === "active" && <ActiveProduct />}
      {status === "banned" && <BannedProduct />}
      {status === "soldout" && <SoldOutProduct />}
    </div>
  </div>
}

export default withTranslation()(SellerProduct)