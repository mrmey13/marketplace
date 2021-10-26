import axios from "axios";
import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import $ from "jquery";
import 'react-calendar/dist/Calendar.css';
import cs from "../../const";

const loadAgentUrl = cs.BaseURL + "/api/statistics/get-agent-list";
const loadTeamUrl = cs.BaseURL + "/api/statistics/get-team-list";
const loadSupplierUrl = cs.BaseURL + "/api/statistics/get-supplier-list";

const statisticsType = [
  { name: "business_insights.statistics_type.agent", value: 1 },
  { name: "business_insights.statistics_type.team", value: 2 },
  { name: "business_insights.statistics_type.supplier", value: 3 },
  { name: "business_insights.statistics_type.merchant", value: 4 }
]

const timeType = [
  { key: 0, name: "business_insights.time_type.real_time" },
  { key: 1, name: "business_insights.time_type.yesterday" },
  { key: 2, name: "business_insights.time_type.past_7_days" },
  { key: 3, name: "business_insights.time_type.past_30_days" },
  { key: 4, name: "business_insights.time_type.by_day" },
  { key: 5, name: "business_insights.time_type.by_week" },
  { key: 6, name: "business_insights.time_type.by_month" },
]


const FilterData = ({ filterData, setFilterData, t, i18n }) => {
  // console.log(statisticsType.find(e => e.value === 1))
  const today = new Date();
  const past7days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const past30days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [chosenDay, setChosenDay] = useState(new Date())

  const onChangeData = (event) => {
    setFilterData({ ...filterData, [event.target.name]: event.target.value });
  }

  const [chosenType, setChosenType] = useState(0);
  const [hoverType, setHoverType] = useState(null);

  const onMouseHover = (event) => {
    // console.log(event);
    setHoverType(event.target.value);
  }

  const onChooseType = (event) => {
    switch (event.target.value) {
      case "2":
        setChosenType(event.target.value);
        setFilterData({
          ...filterData,
          startDate: `${past7days.getFullYear()}-${("0" + (past7days.getMonth() + 1)).slice(-2)}-${("0" + past7days.getDate()).slice(-2)}`,
          endDate: `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(-2)}-${("0" + today.getDate()).slice(-2)}`
        })
        break;
      case "3":
        setChosenType(event.target.value);
        setFilterData({
          ...filterData,
          startDate: `${past30days.getFullYear()}-${("0" + (past30days.getMonth() + 1)).slice(-2)}-${("0" + past30days.getDate()).slice(-2)}`,
          endDate: `${today.getFullYear()}-${("0" + (today.getMonth() + 1)).slice(-2)}-${("0" + today.getDate()).slice(-2)}`
        })
        break;
      default:
        setChosenType(event.target.value);
    }
  }

  const onChooseWeek = (value, event) => {
    setChosenDay(value);
    setChosenType("5");
    let beginOfWeek;
    let endOfWeek;
    if (value.getDay() === 0) {
      beginOfWeek = new Date(value.getTime() - 6 * 24 * 60 * 60 * 1000);
      endOfWeek = value
    } else {
      beginOfWeek = new Date(value.getTime() - (value.getDay() - 1) * 24 * 60 * 60 * 1000);
      endOfWeek = new Date(value.getTime() + (7 - value.getDay()) * 24 * 60 * 60 * 1000);
    }
    setFilterData({
      ...filterData,
      startDate: `${beginOfWeek.getFullYear()}-${("0" + (beginOfWeek.getMonth() + 1)).slice(-2)}-${("0" + beginOfWeek.getDate()).slice(-2)}`,
      endDate: `${endOfWeek.getFullYear()}-${("0" + (endOfWeek.getMonth() + 1)).slice(-2)}-${("0" + endOfWeek.getDate()).slice(-2)}`
    })
  }

  const onChooseMonth = (value, event) => {
    setChosenDay(value);
    setChosenType("6");
    let beginOfMonth = value;
    let endOfMonth;
    switch (value.getMonth() + 1) {
      case 1:
      case 3:
      case 5:
      case 7:
      case 8:
      case 10:
      case 12:
        endOfMonth = new Date(value.getTime() + 30 * 24 * 60 * 60 * 1000);
        break;
      case 2:
        if (value.getFullYear() % 4 === 0) {
          if (value.getFullYear() % 100 === 0 && value.getFullYear() % 400 !== 0) {
            endOfMonth = new Date(value.getTime() + 27 * 24 * 60 * 60 * 1000);
          } else {
            endOfMonth = new Date(value.getTime() + 28 * 24 * 60 * 60 * 1000);
          }
        } else {
          endOfMonth = new Date(value.getTime() + 27 * 24 * 60 * 60 * 1000);
        }
        break;
      default:
        endOfMonth = new Date(value.getTime() + 29 * 24 * 60 * 60 * 1000);
    }
    setFilterData({
      ...filterData,
      startDate: `${beginOfMonth.getFullYear()}-${("0" + (beginOfMonth.getMonth() + 1)).slice(-2)}-${("0" + beginOfMonth.getDate()).slice(-2)}`,
      endDate: `${endOfMonth.getFullYear()}-${("0" + (endOfMonth.getMonth() + 1)).slice(-2)}-${("0" + endOfMonth.getDate()).slice(-2)}`
    })
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
    <div className="row align-items-center mb-2">
      <label className="col-2 text-nowrap">{t("business_insights.fields.data_period")}:</label>
      <div className="col-4 d-flex align-items-center">
        <button
          className="form-control form-control-sm text-start"
          id="dropdownDataPeriod"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          data-bs-auto-close="outside"
          style={{ paddingLeft: "12px" }}
        >
          {t(timeType.find(e => e.key == chosenType).name)}:
          {` ${filterData.startDate.slice(7 - 9)}-${filterData.startDate.slice(5, 7)}-${filterData.startDate.slice(0, 4)} - ${filterData.endDate.slice(7 - 9)}-${filterData.endDate.slice(5, 7)}-${filterData.endDate.slice(0, 4)}`}
        </button>
        <div
          className="dropdown-menu"
          aria-labelledby="dropdownDataPeriod"
        >
          <div
            className="d-flex px-1"
            style={{ minHeight: "250px", minWidth: "450px" }}
          >
            <div className="border-end px-2" style={{ width: "160px" }}>
              <div className="border-bottom">
                <li><button
                  className={chosenType == timeType[0].key ? "dropdown-item text-danger" : "dropdown-item"}
                  onMouseOver={onMouseHover}
                  disabled
                >
                  {t(timeType[0].name)}
                </button></li>
                <li><button
                  className={chosenType == timeType[1].key ? "dropdown-item text-danger" : "dropdown-item"}
                  onMouseOver={onMouseHover}
                  disabled
                >
                  {t(timeType[1].name)}
                </button></li>
                <li><button
                  className={chosenType == timeType[2].key ? "dropdown-item text-danger" : "dropdown-item"}
                  onMouseOver={onMouseHover}
                  onClick={onChooseType}
                  value={timeType[2].key}
                >
                  {t(timeType[2].name)}
                </button></li>
                <li><button
                  className={chosenType == timeType[3].key ? "dropdown-item text-danger" : "dropdown-item"}
                  onMouseOver={onMouseHover}
                  onClick={onChooseType}
                  value={timeType[3].key}
                >
                  {t(timeType[3].name)}
                </button></li>
              </div>
              <div>
                <li><button
                  className={chosenType == timeType[4].key ? "dropdown-item text-danger" : "dropdown-item"}
                  disabled
                >
                  {t(timeType[4].name)}
                </button></li>
                <li><button
                  className={chosenType == timeType[5].key ? "dropdown-item text-danger" : "dropdown-item"}
                  onMouseOver={onMouseHover}
                  value={timeType[5].key}
                >
                  {t(timeType[5].name)}
                </button></li>
                <li><button
                  className={chosenType == timeType[6].key ? "dropdown-item text-danger" : "dropdown-item"}
                  onMouseOver={onMouseHover}
                  value={timeType[6].key}
                >
                  {t(timeType[6].name)}
                </button></li>
              </div>
            </div>
            <div className="">
              {hoverType === "2" && <div className="px-4">
                {`${("0" + (past7days.getDate())).slice(-2)}-${("0" + (past7days.getMonth() + 1)).slice(-2)}-${past7days.getFullYear()} - ${("0" + (today.getDate())).slice(-2)}-${("0" + (today.getMonth() + 1)).slice(-2)}-${today.getFullYear()}`}
              </div>}
              {hoverType === "3" && <div className="px-4">
                {`${("0" + (past30days.getDate())).slice(-2)}-${("0" + (past30days.getMonth() + 1)).slice(-2)}-${past30days.getFullYear()} - ${("0" + (today.getDate() - 1)).slice(-2)}-${("0" + (today.getMonth() + 1)).slice(-2)}-${today.getFullYear()}`}
              </div>}
              {hoverType === "5" && <Calendar
                maxDate={today}
                value={chosenDay}
                onChange={(value, event) => onChooseWeek(value, event)}
              />}
              {hoverType === "6" && <Calendar
                maxDate={today}
                onChange={(value, event) => onChooseMonth(value, event)}
                maxDetail="year"
              />}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="row align-items-center">
      <label className="col-2 text-nowrap" htmlFor="statisticsTypeId">{t("business_insights.fields.statistics_type")}:</label>
      <div className="col-2">
        <select
          className="form-control form-control-sm"
          id="statisticsTypeId"
          name="statisticsTypeId"
          value={filterData.statisticsTypeId}
          onChange={onChangeData}
        >
          <option value={""}>{t("business_insights.message.please_select")}</option>
          {statisticsType.map(item => <option value={item.value}>{t(item.name)}</option>)}
        </select>
      </div>
      <div className="col-2" />
      {(statisticsType.find(e => e.value == filterData.statisticsTypeId) && filterData.statisticsTypeId != 4)
        && <>
          <label className="col-1 text-nowrap" htmlFor="objectFilter">
            {t(statisticsType.find(e => e.value == filterData.statisticsTypeId).name)}:
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