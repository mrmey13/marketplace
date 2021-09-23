import React from "react";
import { Popover, Button, OverlayTrigger } from "react-bootstrap";
import "./Product.css";
import { Link } from "react-router-dom";
function Product({ data }) {
  // const isDark = localStorage.getItem("aidriven-general-theme");
  return (
    <div className="col-lg-2 col-sm-4 col-6 col-md-3">
      <div className="card-course">
        <img
          src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <div className="card-content">
            <div className="card-top">
              <button className="card-star">
                <b style={{ marginLeft: "5px" }}>3,4</b>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt="star-icon"
                  style={{ width: "15px", marginLeft: "5px" }}
                />
              </button>
              <h6
                className="card-title card-product-name"
                style={{ fontSize: "14px" }}
              >
                Giày thể thao Nike mới nhất trong năm 2021 thanh vu dinh
              </h6>
              {/* <div className="card-user">
                <img
                  src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"
                  alt=""
                  className="card-user-avatar"
                />
                <div className="card-user-info">
                  <div className="card-user-top">
                    <h4 className="card-user-name">{data.trainerFullname}</h4>
                    <ion-icon name="checkmark-circle"></ion-icon>
                  </div>
                </div>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={
                    <Popover id="popover-basic">
                      <Popover.Header className="popover-header" as="h3">
                        More Information
                      </Popover.Header>
                      <Popover.Body>
                        <p>
                          <b>Description: </b>
                          {data.moduleDescription}
                        </p>
                        <p>
                          <b>Schedule: </b>
                          {data.scheduleInfo}
                        </p>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Button variant="outline-none" id="popovers-icon">
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                  </Button>
                </OverlayTrigger>
              </div> */}
              <div className="card-time"></div>
            </div>
            <div className="card-salary d-flex">
              <div className="product-salary">
                <h6
                  style={{
                    color: "#F26A0D",
                    width: "fit-content",
                    marginRight: "5px",
                  }}
                >
                  150000
                  <sub
                    style={{
                      width: "fit-content",
                      marginLeft: "5px",
                      color: "black",
                    }}
                  >
                    <u>đ</u>
                  </sub>
                </h6>
              </div>
              <img
                className="free-ship-img"
                src="https://cdn-icons-png.flaticon.com/512/3306/3306060.png"
                alt="free ship"
              />
            </div>
            <div className="card-bottom">
              {/* <button
                className="btn card-live"
                style={{ backgroundColor: "red" }}
              >
                <span>Mua Ngay!</span>
              </button>
              <button className="btn card-live">
                <span>Thêm vào giỏ hàng</span>
              </button> */}
              <div className="card-watching text-align-end">4.2k lượt mua</div>
              <div className="card-watching text-align-end">Hà Nội</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
