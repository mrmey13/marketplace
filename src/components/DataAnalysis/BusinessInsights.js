import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import FilterData from "./FilterData";
import KeyMatrics from "./KeyMatrics";
import SalesAnalysis from "./Sales/SalesAnalysis";
import "./DataAnalysis.css";

const BusinessInsights = (props) => {
  const { match, history, t, i18n } = props;

  const d = new Date();
  const maxDate = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`;
  const [filterData, setFilterData] = useState({
    startDate: maxDate,
    endDate: maxDate,
    statisticsTypeId: "",
    objectFilter: null
  });

  // console.log(match)
  const [title, setTitle] = useState(match.params.title);
  useEffect(() => {
    setTitle(match.params.title || "dashboard");
  }, [match.params.title])
  return <div style={{ minWidth: "956px" }}>
    <div
      className="card shadow-sm m-0 mb-3"
      style={{
        position: "-webkit-sticky",
        position: "sticky",
        zIndex: "3",
        top: "53px",
        // boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
        backgroundColor: "#fff"
      }}
    >
      <div className="card-header">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <Link
              className={title === "dashboard" ? "nav-link px-4 text-danger" : "nav-link text-dark px-4"}
              style={title === "dashboard"
                ? { borderBottom: "3px solid red" }
                : {}}
              to={`/datacenter/dashboard`}
            >
              {t("business_insights.tabs.dashboard")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={title === "product" ? "nav-link px-4 text-danger" : "nav-link text-dark px-4"}
              style={title === "product"
                ? { borderBottom: "3px solid red" }
                : {}}
              to="/datacenter/product"
            >
              {t("business_insights.tabs.product")}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={title === "sales" ? "nav-link px-4 text-danger" : "nav-link text-dark px-4"}
              style={title === "sales"
                ? { borderBottom: "3px solid red" }
                : {}}
              to="/datacenter/sales/overview"
            >
              {t("business_insights.tabs.sales")}
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div
      style={{
        position: "-webkit-sticky",
        position: "sticky",
        zIndex: "2",
        top: "106px",
        // boxShadow: "0px 1px 3px rgba(0,0,0,0.2)",
        backgroundColor: "#fff"
      }}
    >
      <FilterData {...props} filterData={filterData} setFilterData={setFilterData} />
    </div>
    {title === "sales" && <SalesAnalysis {...props} filterData={filterData} />}
  </div>
}

export default withTranslation()(BusinessInsights);