import React from "react";

const FilterData = () => {
  return <div className="card card-body shadow-sm d-flex mb-3 py-2">
    <div className="row align-items-center">
      <label className="col-1 text-nowrap">Data Period:</label>
      <div className="col-3">
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
              <li><a className="dropdown-item" href="#">Another action</a></li>
              <li><a className="dropdown-item" href="#">Something</a></li>
            </div>
          </div>
        </div>
      </div>
      <label className="col-1">Order Type:</label>
      <div className="col-2">
        <button
          className="form-control form-control-sm"
        >
          Order Type
        </button>
      </div>
    </div>
  </div>
}

export default FilterData;