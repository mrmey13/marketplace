import React from "react";

const Overview = () => {
  return <div>
    <div className="card card-body mb-1">
      <h5>Sales Overview</h5>
      <div className="card px-2 py-1">
        <div className="d-flex border-bottom row row-cols-5" style={{}}>
          <div className="col d-flex align-items-center justify-content-center">
            <div>Visitor</div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">Visitor</div>
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
            <div>Placed Order</div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">Visitor</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">Sales</div>
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
            <div>Confirmed Order</div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">Visitor</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">Sales</div>
            <div className="data-value">0</div>
            <div> -- </div>
          </div>
          <div className="col d-flex align-items-center justify-content-center">
            <div className="data-title">Sales Per Buyer</div>
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
      <div className="card">
        <div className="px-3">
          <div className="border-bottom">
            Visit: Visitor
          </div>

        </div>
        <div className="bg-light text-secondary p-1">
          Metric Selected: 2/4
        </div>
      </div>
    </div>
  </div>
}

export default Overview