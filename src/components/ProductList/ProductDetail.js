import React, { useState } from "react";
import Color from "../../theme/color";
import "./Product.css";
function ProductDetail() {
  const [introImage, setIntroImage] = useState(
    "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
  );
  const [imageTab, setImageTab] = useState(1);
  return (
    <div className="product-detail-container container">
      <div className="card card-product-detail-main">
        <div className="row main-row-product-detail d-flex justify-content-between mt-5">
          <div
            className="col-5 img-product-detail-intro "
            style={{ borderRight: "1px solid black" }}
          >
            <div
              className="row img-main-product-detail-intro d-flex justify-content-center mx-5"
              style={{ width: "fit-content" }}
            >
              <img
                src={introImage}
                alt=""
                style={{ width: "100%", height: "400px" }}
              />
            </div>
            <div className="row img-carousel-product-detail-intro m-3">
              <img
                onMouseOver={() => {
                  setImageTab(1);
                  setIntroImage(
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                  );
                }}
                src="https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
                alt=""
                style={
                  imageTab == 1
                    ? {
                        width: "20%",
                        height: "80px",
                        border: "1px solid" + Color.tanhide,
                      }
                    : { width: "20%", height: "80px" }
                }
              />
              <img
                onMouseOver={() => {
                  setImageTab(2);
                  setIntroImage(
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                  );
                }}
                src="https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
                alt=""
                style={
                  imageTab == 2
                    ? {
                        width: "20%",
                        height: "80px",
                        border: "1px solid" + Color.tanhide,
                      }
                    : { width: "20%", height: "80px" }
                }
              />
              <img
                onMouseOver={() => {
                  setImageTab(3);
                  setIntroImage(
                    "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
                  );
                }}
                src="https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
                alt=""
                style={
                  imageTab == 3
                    ? {
                        width: "20%",
                        height: "80px",
                        border: "1px solid" + Color.tanhide,
                      }
                    : { width: "20%", height: "80px" }
                }
              />
              <img
                onMouseOver={() => {
                  setImageTab(4);
                  setIntroImage(
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                  );
                }}
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                alt=""
                style={
                  imageTab == 4
                    ? {
                        width: "20%",
                        height: "80px",
                        border: "1px solid" + Color.tanhide,
                      }
                    : { width: "20%", height: "80px" }
                }
              />
              <img
                onMouseOver={() => {
                  setImageTab(5);
                  setIntroImage(
                    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80"
                  );
                }}
                src="https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
                alt=""
                style={
                  imageTab == 5
                    ? {
                        width: "20%",
                        height: "80px",
                        border: "1px solid" + Color.tanhide,
                      }
                    : { width: "20%", height: "80px" }
                }
              />
            </div>
            <div className="row share-product-detail-intro d-flex justify-content-center">
              <div style={{ width: "fit-content", paddingTop: "10px" }}>
                Share
              </div>
              <button
                className="btn btn-outline-none "
                style={{ width: "fit-content" }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                  alt="fbicon"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
              <button
                className="btn btn-outline-none "
                style={{ width: "fit-content" }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                  alt="fbicon"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
              <button
                className="btn btn-outline-none "
                style={{ width: "fit-content" }}
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
                  alt="fbicon"
                  style={{ width: "20px", height: "20px" }}
                />
              </button>
            </div>
          </div>
          <div className="col-7 info-product-detail-intro">
            <div
              className="product-product-detail-name"
              style={{ width: "fit-content" }}
            >
              Giày thể thao Nike hot nhất năm 2021
            </div>
            <div className="product-product-detail-rate">
              <div style={{ width: "fit-content" }}>5 sao</div>
              <div style={{ width: "fit-content" }}>9 đánh giá</div>
              <div style={{ width: "fit-content" }}>9 Đã bán</div>
            </div>
            <div className="product-product-detail-price mt-4">
              1.000.000{" "}
              <sub>
                <u>đ</u>
              </sub>
            </div>
            <div className="row product-product-detail-logistic mt-5">
              <div className="col-4">Vận Chuyển</div>
              <div className="col-8 ">
                <div className="free-shipping">
                  {" "}
                  <img
                    className="free-ship-img"
                    src="https://cdn-icons-png.flaticon.com/512/3306/3306060.png"
                    alt="free ship"
                  />{" "}
                  Miễn Phí Vận Chuyển
                </div>
                <div className="free-shipping">
                  <img
                    className="free-ship-img"
                    src="https://cdn-icons-png.flaticon.com/512/664/664468.png"
                    alt="free ship"
                  />{" "}
                  Vận Chuyển Tới
                </div>
                <div className="free-shipping"> Phí Vận Chuyển</div>
              </div>
            </div>
            <div className="row product-product-detail-quantity mt-5">
              <div className="col-4">Số Lượng</div>
              <div className="col-8 ">
                <button
                  className="btn"
                  style={{
                    width: "40px",
                    height: "35px",
                    backgroundColor: Color.tanhide,
                    fontSize: "20px",
                  }}
                >
                  <ion-icon name="remove-outline"></ion-icon>
                </button>
                <input
                  className="sort-salary"
                  type="text"
                  placeholder=" Từ"
                  size="10"
                  maxlength="2"
                  name="value1"
                  //   value={sortPrice.value1}
                  //   onChange={(e) => onChange(e)}
                  // onkeypress={(event) => isNumberKey(event)}
                  style={{
                    width: "45px",
                    height: "35px",
                    paddingLeft: "1px",
                    marginTop: "1px",
                    marginLeft: "5px",
                    marginRight: "5px",
                  }}
                />
                <button
                  className="btn"
                  style={{
                    fontSize: "20px",
                    width: "40px",
                    height: "35px",
                    backgroundColor: Color.tanhide,
                  }}
                >
                  <ion-icon name="add-outline"></ion-icon>
                </button>
              </div>
            </div>
            <div className="product-product-detail-buy d-flex flex-row justify-content-center my-5">
              <button
                className="btn btn-outline-dark py-2 d-flex flex-row"
                style={{
                  backgroundColor: Color.corvette,
                  width: "fit-content",
                  marginRight: "15px",
                }}
              >
                <ion-icon name="medkit-outline"></ion-icon>
                <div
                  className=""
                  style={{ width: "fit-content", marginLeft: "5px" }}
                >
                  Thêm Vào Giỏ Hàng
                </div>
              </button>
              <button
                className="btn btn-outline-dark py-2"
                style={{
                  backgroundColor: Color.tanhide,
                  width: "fit-content",
                }}
              >
                Mua Ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
