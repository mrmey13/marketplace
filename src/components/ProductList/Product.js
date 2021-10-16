import React, { useState } from "react";
import { Popover, Button, OverlayTrigger } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import "./Product.css";
import Color from "../../theme/color";
import cs from "../../const";
import { Link } from "react-router-dom";
const mediaURL = cs.MediaURL + "/material";
function Product({ data, useFor }) {
  let fakeRating = (Math.floor(Math.random() * 20) / 10) + 3;
  return (
    <div
      className="card-course"
      style={{ margin: "5px" }}
    >
      <Link
        className="h5 text-dark fw-bold text-decoration-none stretched-link"
        to={
          useFor === "seller"
            ? "/seller" + "/product_detail/" + data.productId
            : "/product_detail/" + data.productId
        }
      ></Link>

      <img
        src={`${cs.MediaURL}/media/${data.productImageCover}`}
        className="card-img-top"
        alt=""
      />
      <div className="card-body">
        <div className="card-content">
          <div className="card-top">
            <h6
              className="card-title card-product-name"
              style={{ fontSize: "14px", textTransform: "capitalize" }}
            >
              {data.productName}
            </h6>
            <div className="card-time"></div>
          </div>
          <div className="card-price d-flex">
            <div className="product-price d-flex">
              <div className="disc-price">
                <h6
                  style={{
                    color: "#F26A0D",
                    width: "fit-content",
                    marginRight: "5px",
                  }}
                >
                  {data.price}
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
              {/* <div className="price ">
                  <del
                    style={{
                      fontSize: "14px",
                      color: "#000000",
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
                  </del>
                </div> */}
            </div>
            <img
              className="free-ship-img"
              src="https://cdn-icons-png.flaticon.com/512/3306/3306060.png"
              alt="free ship"
            />
          </div>
          <div className="card-bottom px-0">
            <ReactStars isHalf={true} value={fakeRating} />
            <div className="card-watching text-align-end">
              -Địa chỉ Shop-
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
