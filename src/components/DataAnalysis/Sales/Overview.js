import React, { useState } from "react";
import { LineChart, Line, YAxis, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    "name": "Page A",
    "uv": 4000,
    "pv": 2400,
    "amt": 6
  },
  {
    "name": "Page B",
    "uv": 3000,
    "pv": 1398,
    "amt": 70
  },
  {
    "name": "Page C",
    "uv": 2000,
    "pv": 9800,
    "amt": 80
  },
  {
    "name": "Page D",
    "uv": 2780,
    "pv": 3908,
    "amt": 4
  },
  {
    "name": "Page E",
    "uv": 1890,
    "pv": 4800,
    "amt": 30
  },
  {
    "name": "Page F",
    "uv": 2390,
    "pv": 3800,
    "amt": 20
  },
  {
    "name": "Page G",
    "uv": 3490,
    "pv": 4300,
    "amt": 21
  }
]

const Overview = () => {

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
    console.log(numberSelectedCharts);
    console.log(event);
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

  return <div>
    <div className="card card-body mb-1">
      <h5>Sales Overview</h5>
      <div className="card px-2 py-1">
        <div className="d-flex border-bottom row row-cols-5" style={{}}>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">Visitor</div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">Visitor</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col" />
          <div className="col" />
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-desc">Conversion Rate (Visit to Placed)</div>
            <div>0%</div>
          </div>
        </div>
        <div className="d-flex border-bottom row row-cols-5" style={{}}>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">Placed Order</div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">Visitor</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">Sales</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col" />
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-desc">Conversion Rate (Placed to Confirmed)</div>
            <div>0%</div>
          </div>
        </div>
        <div className="d-flex row row-cols-5" style={{}}>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">Confirmed Order</div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">Visitor</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">Sales</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-label">Sales Per Buyer</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-desc">Conversion Rate (Visit to Confirmed)</div>
            <div>0%</div>
          </div>
        </div>
      </div>
    </div>

    <div className="card card-body mb-1">
      <h5>Metric trend</h5>
      <div className="card mb-5">
        <div className="px-3">
          <div className="d-flex border-bottom row py-3">
            <div className="col-2 d-flex align-items-baseline justify-content-end">
              <div className="data-title">Visitor: </div>
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
                    {"Visitors"}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex border-bottom row py-3">
            <div className="col-2 d-flex align-items-baseline justify-content-end">
              <div className="data-title">Placed Order: </div>
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
                    {"Buyers"}
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
                    {"Units"}
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
                    {"Orders"}
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
                    {"Sales"}
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
                    {"Conversion Rate (Visit to Placed)"}
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex border-bottom row py-3">
            <div className="col-2 d-flex align-items-baseline justify-content-end">
              <div className="data-title">Confirmed Order:</div>
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
                    {"Buyers"}
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
                    {"Units"}
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
                    {"Orders"}
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
                    {"Sales"}
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
                    {"Sales Per Buyer"}
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
                    {"Conversion Rate (Visit to Confirmed)"}
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
                    {"Conversion Rate (Placed to Confirmed)"}
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-light text-secondary p-1 px-3">
          Metric Selected: {`${numberSelectedCharts}/${SELECTED_CHARTS_LIMIT}`}
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <ResponsiveContainer width='95%' height={300}>
          <LineChart data={data}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 'auto']} yAxisId="number" hide />
            <YAxis domain={[0, 100]} yAxisId="percent" hide />
            <Line type="linear" dataKey="uv" stroke="red" yAxisId="number" dot={false} hide={false} />
            {/* <CartesianGrid stroke="#ccc" /> */}
            <Line type="linear" dataKey="amt" stroke="blue" yAxisId="percent" dot={false} />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
}

export default Overview