import axios from "axios";
import React, { useEffect, useState } from "react";
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import cs from "../../../const";

const loadDataUrl = cs.BaseURL + "/api/statistics/get";

const Overview = ({ filterData, t, i18n }) => {
  // console.log(filterData)
  const [chartsDisplay, setChartsDisplay] = useState({
    visitors: true,
    buyersPO: false,
    unitsPO: false,
    ordersPO: false,
    salesPO: false,
    conversionRateVtoP: false,
    buyersCO: false,
    unitsCO: false,
    ordersCO: false,
    salesCO: false,
    salesPerBuyer: false,
    conversionRateVtoC: false,
    conversionRatePtoC: false
  })

  const [numberSelectedCharts, setNumberSelectedCharts] = useState(1);
  const SELECTED_CHARTS_LIMIT = 4;

  const onSelectCharts = (event) => {
    // console.log(numberSelectedCharts);
    // console.log(event);
    if (chartsDisplay[event.target.name]) {
      if (numberSelectedCharts <= 1) {
        return
      } else {
        setNumberSelectedCharts(numberSelectedCharts - 1)
      }
    } else {
      if (numberSelectedCharts >= SELECTED_CHARTS_LIMIT) {
        return
      } else {
        setNumberSelectedCharts(numberSelectedCharts + 1)
      }
    }
    setChartsDisplay({ ...chartsDisplay, [event.target.name]: event.target.checked })
  }

  const formatter = (value, name, props) => {
    switch (name) {
      case `${t("business_insights.fields.orders")} (${t("business_insights.fields.placed_order")})`:
        return value;
      case `${t("business_insights.fields.sales")} (${t("business_insights.fields.placed_order")})`:
        return value + "đ";
      default:
        return value;
    }
  }

  const [data, setData] = useState([]);
  const [chartsData, setChartsData] = useState([]);

  const loadData = async () => {
    // console.log(filterData.statisticsTypeId);
    if (!filterData.statisticsTypeId) {
      // console(null)
      setData([]);
      return
    }
    try {
      const response = await axios({
        method: "POST",
        url: loadDataUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        },
        data: {
          inputStartDateStr: filterData.startDate,
          inputEndDateStr: filterData.endDate,
          timeGroupTypeId: 1,
          statisticsTypeId: filterData.statisticsTypeId
        }
      });
      if (response.data.error_code === 0) {
        setData(response.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  }

  const loadChartsData = () => {
    // console.log("Data", data)
    switch (filterData.statisticsTypeId) {
      case "4":
        if (data[0] && data[0].statisticsObj.length) {
          setChartsData(data[0].statisticsObj[0].chartObjList);
        }
        break;
      default:
        if (data[0] && data[0].statisticsObj.length && data[0].statisticsObj.find(e => e.valueField === filterData.objectFilter)) {
          setChartsData(data[0].statisticsObj.find(e => e.valueField === filterData.objectFilter).chartObjList)
        } else {
          setChartsData([])
        }
        break;
    }
  }

  useEffect(() => {
    loadData();
  }, [filterData.startDate, filterData.endDate, filterData.statisticsTypeId]);

  useEffect(() => {
    loadChartsData();
  }, [data, filterData.objectFilter])

  return <div>
    <div className="card card-body mb-1">
      <h5>{t("business_insights.title.sales_overview")}</h5>
      <div className="card px-2 py-1">
        <div className="d-flex border-bottom row row-cols-5" style={{}}>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">{t("business_insights.fields.visit")}</div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">{t("business_insights.fields.visitors")}</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col" />
          <div className="col" />
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-desc">{`${t("business_insights.fields.conversion_rate")} (${t("business_insights.fields.visit_to_placed")})`}</div>
            <div>0%</div>
          </div>
        </div>
        <div className="d-flex border-bottom row row-cols-5" style={{}}>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">{t("business_insights.fields.placed_order")}</div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">{t("business_insights.fields.buyers")}</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">{t("business_insights.fields.sales")}</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col" />
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-desc">{`${t("business_insights.fields.conversion_rate")} (${t("business_insights.fields.visit_to_confirmed")})`}</div>
            <div>0%</div>
          </div>
        </div>
        <div className="d-flex row row-cols-5" style={{}}>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">{t("business_insights.fields.confirmed_order")}</div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">{t("business_insights.fields.buyers")}</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">{t("business_insights.fields.sales")}</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">{t("business_insights.fields.sales_per_buyer")}</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-desc">{`${t("business_insights.fields.conversion_rate")} (${t("business_insights.fields.placed_to_confirmed")})`}</div>
            <div>0%</div>
          </div>
        </div>
      </div>
    </div>

    <div className="card card-body mb-1">
      <h5>{t("business_insights.title.metric_trend")}</h5>
      <div className="card mb-5">
        <div className="px-3">
          <div className="d-flex border-bottom row py-3">
            <div className="col-2 d-flex align-items-baseline justify-content-end">
              <div className="data-title">{t("business_insights.fields.visit")}: </div>
            </div>
            <div className="col-10 row row-cols-4">
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="visitors"
                    name="visitors"
                    checked={chartsDisplay.visitors}
                    onChange={onSelectCharts}
                  // disabled={!addressList.length || address.isReturn}
                  />
                  <label className="data-label ms-2" for="visitors">
                    {t("business_insights.fields.visitors")}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex border-bottom row py-3">
            <div className="col-2 d-flex align-items-baseline justify-content-end">
              <div className="data-title">{t("business_insights.fields.placed_order")}: </div>
            </div>
            <div className="col-10 row row-cols-4">
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="buyersPO"
                    name="buyersPO"
                    checked={chartsDisplay.buyersPO}
                    onChange={onSelectCharts}
                  // disabled={!addressList.length || address.isReturn}
                  />
                  <label className="data-label ms-2" for="buyersPO">
                    {t("business_insights.fields.buyers")}
                  </label>
                </div>
              </div>
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="unitsPO"
                    name="unitsPO"
                    checked={chartsDisplay.unitsPO}
                    onChange={onSelectCharts}
                  // disabled={!addressList.length || address.isReturn}
                  />
                  <label className="data-label ms-2" for="unitsPO">
                    {t("business_insights.fields.units")}
                  </label>
                </div>
              </div>
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="ordersPO"
                    name="ordersPO"
                    checked={chartsDisplay.ordersPO}
                    onChange={onSelectCharts}
                  // disabled={!addressList.length || address.isReturn}
                  />
                  <label className="data-label ms-2" for="ordersPO">
                    {t("business_insights.fields.orders")}
                  </label>
                </div>
              </div>
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="salesPO"
                    name="salesPO"
                    checked={chartsDisplay.salesPO}
                    onChange={onSelectCharts}
                  // disabled={!addressList.length || address.isReturn}
                  />
                  <label className="data-label ms-2" for="salesPO">
                    {t("business_insights.fields.sales")}
                  </label>
                </div>
              </div>
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="conversionRateVtoP"
                      name="conversionRateVtoP"
                      checked={chartsDisplay.conversionRateVtoP}
                      onChange={onSelectCharts}
                    // disabled={!addressList.length || address.isReturn}
                    />
                  </div>
                  <label className="data-label text-start ms-2" for="conversionRateVtoP">
                    {`${t("business_insights.fields.conversion_rate")} (${t("business_insights.fields.visit_to_placed")})`}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex border-bottom row py-3">
            <div className="col-2 d-flex align-items-baseline justify-content-end">
              <div className="data-title">{t("business_insights.fields.confirmed_order")}:</div>
            </div>
            <div className="col-10 row row-cols-4">
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="buyersCO"
                    name="buyersCO"
                    checked={chartsDisplay.buyersCO}
                    onChange={onSelectCharts}
                  // disabled={!addressList.length || address.isReturn}
                  />
                  <label className="data-label ms-2" for="buyersCO">
                    {t("business_insights.fields.buyers")}
                  </label>
                </div>
              </div>
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="unitsCO"
                    name="unitsCO"
                    checked={chartsDisplay.unitsCO}
                    onChange={onSelectCharts}
                  // disabled={!addressList.length || address.isReturn}
                  />
                  <label className="data-label ms-2" for="unitsCO">
                    {t("business_insights.fields.units")}
                  </label>
                </div>
              </div>
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="ordersCO"
                    name="ordersCO"
                    checked={chartsDisplay.ordersCO}
                    onChange={onSelectCharts}
                  // disabled={!addressList.length || address.isReturn}
                  />
                  <label className="data-label ms-2" for="ordersCO">
                    {t("business_insights.fields.orders")}
                  </label>
                </div>
              </div>
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="salesCO"
                    name="salesCO"
                    checked={chartsDisplay.salesCO}
                    onChange={onSelectCharts}
                  // disabled={!addressList.length || address.isReturn}
                  />
                  <label className="data-label ms-2" for="salesCO">
                    {t("business_insights.fields.sales")}
                  </label>
                </div>
              </div>
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="salesPerBuyer"
                    name="salesPerBuyer"
                    checked={chartsDisplay.salesPerBuyer}
                    onChange={onSelectCharts}
                  // disabled={!addressList.length || address.isReturn}
                  />
                  <label className="data-label ms-2" for="salesPerBuyer">
                    {t("business_insights.fields.sales_per_buyer")}
                  </label>
                </div>
              </div>
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="conversionRateVtoC"
                      name="conversionRateVtoC"
                      checked={chartsDisplay.conversionRateVtoC}
                      onChange={onSelectCharts}
                    // disabled={!addressList.length || address.isReturn}
                    />
                  </div>
                  <label className="data-label text-start ms-2" for="conversionRateVtoC">
                    {`${t("business_insights.fields.conversion_rate")} (${t("business_insights.fields.visit_to_confirmed")})`}
                  </label>
                </div>
              </div>
              <div className="col mb-2 px-1">
                <div className="d-flex">
                  <div>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="conversionRatePtoC"
                      name="conversionRatePtoC"
                      checked={chartsDisplay.conversionRatePtoC}
                      onChange={onSelectCharts}
                    // disabled={!addressList.length || address.isReturn}
                    />
                  </div>
                  <label className="data-label text-start ms-2" for="conversionRatePtoC">
                    {`${t("business_insights.fields.conversion_rate")} (${t("business_insights.fields.placed_to_confirmed")})`}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-light text-secondary p-1 px-3">
          {t("business_insights.fields.metric_selected")}: {`${numberSelectedCharts}/${SELECTED_CHARTS_LIMIT}`}
        </div>
      </div>
      <div className="d-flex justify-content-center mb-5">
        <ResponsiveContainer width='95%' height={300}>
          <LineChart data={chartsData}>
            <XAxis dataKey="time" />
            <YAxis domain={[0, 'dataMax + 5']} yAxisId="number" hide />
            <YAxis domain={[0, 'dataMax + 10000']} yAxisId="currency" hide />
            <YAxis domain={[0, 100]} yAxisId="percent" hide />
            <CartesianGrid stroke="#ccc" />
            <Line name={`${t("business_insights.fields.orders")} (${t("business_insights.fields.placed_order")})`} type="linear" dataKey="totalOrder" stroke="red" yAxisId="number" dot={false} hide={false} />
            <Line name={`${t("business_insights.fields.sales")} (${t("business_insights.fields.placed_order")})`} type="linear" dataKey="totalRevenue" stroke="blue" yAxisId="currency" dot={false} />
            <Line name={`${t("business_insights.fields.units")} (${t("business_insights.fields.placed_order")})`} type="linear" dataKey="totalSoldProducts" stroke="green" yAxisId="number" dot={false} />
            <Tooltip
              formatter={formatter}
            />
            <Legend iconType="circle" iconSize={10} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <table className="table table-striped table-bordered table-hover">
        <thead className="text-center">
          <tr className="table-warning">
            <th style={{ width: "25%" }}>{t("business_insights.fields.time")}</th>
            <th style={{ width: "25%" }}>{`${t("business_insights.fields.orders")} (${t("business_insights.fields.placed_order")})`}</th>
            <th style={{ width: "25%" }}>{`${t("business_insights.fields.units")} (${t("business_insights.fields.placed_order")})`}</th>
            <th style={{ width: "25%" }}>{`${t("business_insights.fields.sales")} (${t("business_insights.fields.placed_order")})`}</th>
          </tr>
        </thead>
        <tbody className="text-end">
          {chartsData.map((item) => {
            return <tr>
              <td className="text-center">{item.time}</td>
              <td>{item.totalOrder}</td>
              <td>{item.totalSoldProducts}</td>
              <td>{item.totalRevenue + "đ"}</td>
            </tr>
          })}
          {!chartsData.length && <tr className="text-start">{t("commons.no_data")}</tr>}
        </tbody>
      </table>
    </div>
  </div>
}

export default Overview