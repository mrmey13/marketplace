import axios from "axios";
import React, { useEffect, useState } from "react";
import cs from "../../const";

const loadAgentUrl = cs.BaseURL + "/api/statistics/get-agent-list";
const loadTeamUrl = cs.BaseURL + "/api/statistics/get-team-list";
const loadSupplierUrl = cs.BaseURL + "/api/statistics/get-supplier-list";

const statisticsType = [
  { name: "Agent", value: 1 },
  { name: "Team", value: 2 },
  { name: "Supplier", value: 3 },
  { name: "Merchant", value: 4 }
]

const FilterData = ({ filterData, setFilterData, t, i18n }) => {
  // console.log(statisticsType.find(e => e.value === 1))
  const onChangeData = (event) => {
    setFilterData({ ...filterData, [event.target.name]: event.target.value });
  }

  const [agentData, setAgentData] = useState([]);
  const [teamData, setTeamData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);

  const loadAgent = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: loadAgentUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      })
      // console.log("Agent", response.data);
      setAgentData(response.data.data);
    } catch (error) {
      console.log(error)
    }
  }

  const loadTeam = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: loadTeamUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      });
      // console.log("Team", response.data.data);
      setTeamData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadSupplier = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: loadSupplierUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      });
      // console.log("Supplier", response.data);
      setSupplierData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadAgent();
    loadTeam();
    loadSupplier();
  }, [])

  return <div className="card card-body shadow-sm d-flex mb-3 py-2">
    <div className="row align-items-center">
      <div className="col-5 row align-items-center">
        <label className="col-2 text-end" htmlFor="startDate">{t("business_insights.fields.from")}:</label>
        <div className="col-4">
          <input
            type="date"
            className="form-control form-control-sm"
            id="startDate"
            name="startDate"
            value={filterData.startDate}
            onChange={onChangeData}
          />
        </div>
        <label className="col-2 text-end" htmlFor="endDate">{t("business_insights.fields.to")}:</label>
        <div className="col-4">
          <input
            type="date"
            className="form-control form-control-sm"
            id="endDate"
            name="endDate"
            value={filterData.endDate}
            onChange={onChangeData}
          />
        </div>
      </div>

      {/* <label className="col-1 text-nowrap">Data Period:</label>
      <div className="col-4 d-flex align-items-center">
        <button
          className="form-control form-control-sm"
          id="dropdownDataPeriod"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Data Period
        </button>
        <div
          className="dropdown-menu"
          aria-labelledby="dropdownDataPeriod"
        >
          <div
            className="d-flex"
            style={{ width: "400px" }}
          >
            <div style={{ width: "120px" }}>
              <li><a className="dropdown-item" href="#">Action</a></li>
              <li><a className="dropdown-item" href="#">Another</a></li>
              <li><a className="dropdown-item" href="#">Something</a></li>
            </div>
          </div>
        </div>
      </div> */}

      <label className="col-2 text-nowrap text-end" htmlFor="statisticsTypeId">{t("business_insights.fields.statistics_type")}:</label>
      <div className="col-2">
        {/* <button
          className="form-control form-control-sm"
        >
          Order Type
        </button> */}
        <select
          className="form-control form-control-sm"
          id="statisticsTypeId"
          name="statisticsTypeId"
          value={filterData.statisticsTypeId}
          onChange={onChangeData}
        >
          <option value={""}>{t("business_insights.message.please_select")}</option>
          {statisticsType.map(item => <option value={item.value}>{item.name}</option>)}
        </select>
      </div>
      {(statisticsType.find(e => e.value == filterData.statisticsTypeId) && filterData.statisticsTypeId != 4)
        && <>
          <label className="col-1 text-nowrap text-end" htmlFor="objectFilter">
            {statisticsType.find(e => e.value == filterData.statisticsTypeId).name}:
          </label>
          <div className="col-2">
            <select
              className="form-control form-control-sm"
              id="objectFilter"
              name="objectFilter"
              value={filterData.objectFilter}
              onChange={onChangeData}
            >
              <option value={""}>{t("business_insights.message.please_select")}</option>
              {filterData.statisticsTypeId == 1 && agentData.map(item => <option value={item.code}>{item.code}</option>)}
              {filterData.statisticsTypeId == 2 && teamData.map(item => <option value={item.value}>{item.displayName}</option>)}
              {filterData.statisticsTypeId == 3 && supplierData.map(item => <option value={item.supplierId}>{item.supplierName}</option>)}
            </select>
          </div>
        </>
      }
    </div>
  </div>
}

export default FilterData;