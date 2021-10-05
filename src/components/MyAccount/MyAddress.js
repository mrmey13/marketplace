import React from "react";
import { useTranslation, withTranslation } from "react-i18next";

const MyAddress = () => {
  let fake = [];
  for (let i = 0; i <= 10; i++) fake.push(i)

  return <div className="_3D9BVC">
    <div className="h4QDlo" role="main">
      <div className="_2YiVnW">
        <div className="_2w2H6X d-flex">
          <h1 className="_3iiDCN" style={{ width: "75%" }}>My address</h1>
          <div className="d-flex m-2 align-items-center justify-content-end" style={{ width: "25%" }}>
            <button
              className="btn btn-danger"
            // onClick={handleAddClick}
            >
              Add a new Address
            </button>
          </div>
        </div>
        <div className="">
          {
            fake.map(item => <div className="pJout2 border-bottom card-body row px-0 mx-1">
              <div className="col-1 text-end">
                <img src="https://img.icons8.com/external-flatart-icons-outline-flatarticons/32/000000/external-location-map-location-flatart-icons-outline-flatarticons-13.png" />
              </div>
              <div className="col-10 row">
                <div className="col-2">Full Name</div>
                <div className="col-10 d-flex align-items-baseline">
                  <span className="me-5">{item.fullName}</span>
                  {item.isDefault === 1 && <span className="d-block mx-1 px-1 text-success" style={{ fontSize: "12px", backgroundColor: "#90ee90", borderRadius: "3px" }}>Default Address</span>}
                  {item.isPickUp === 1 && <span className="d-block mx-1 px-1 text-danger" style={{ fontSize: "12px", backgroundColor: "#ee9090", borderRadius: "3px" }}>Pickup Address</span>}
                  {item.isReturn === 1 && <span className="d-block mx-1 px-1 text-warning" style={{ fontSize: "12px", backgroundColor: "#eeee90", borderRadius: "3px" }}>Return Address</span>}
                </div>
                <div className="col-2">Phone Number</div>
                <div className="col-10">{item.telephone}</div>
                <div className="col-2">Address</div>
                <div className="col-10">{item.fullAddress && `${item.fullAddress}, `} {item.communeName}, {item.districtName}, {item.provinceName}</div>
              </div>
              <div className="col-1 p-0 d-flex flex-column justify-content-start align-items-end">
                <button
                  className="p-0 btn btn-sm text-end link-btn"
                // onClick={() => handleModClick(item)}
                >
                  Edit
                </button>
                {!(item.isDefault || item.isPickUp || item.isReturn) && <button
                  className="p-0 btn btn-sm text-end link-btn"
                // onClick={() => handleDelClick(item)}
                >
                  Delete
                </button>}
                <button
                  className="p-0 btn btn-sm text-end link-btn"
                // onClick={() => handleModClick(item)}
                >
                  Set default
                </button>
              </div>
            </div>
            )}
        </div>
      </div>
    </div>
  </div>
}

export default withTranslation()(MyAddress)