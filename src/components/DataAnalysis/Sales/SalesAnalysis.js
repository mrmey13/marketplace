import React, { useEffect, useState } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import Overview from "./Overview";

const SalesAnalysis = (props) => {
  const { match } = props
  let { path, url } = useRouteMatch()
  // console.log(url)
  // console.log(match);
  const [tab, setTab] = useState(match.params.tab);
  useEffect(() => {
    setTab(match.params.tab || "overview");
  }, [match.params.tab])
  return <>
    <div className="card card-body shadow-sm py-2 mb-1">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link
            className={tab === "overview" ? "nav-link active px-4 text-danger" : "nav-link text-dark px-4"}
            to={`overview`}
          >
            {"Overview"}
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className={tab === "composition" ? "nav-link active px-4 text-danger" : "nav-link text-dark px-4"}
            to={`composition`}
          >
            {"Composition"}
          </Link>
        </li>
      </ul>
    </div>
    {tab === "overview" && <Overview {...props}/>}
  </>
}

export default SalesAnalysis