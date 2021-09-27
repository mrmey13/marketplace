import React, { useState, useEffect } from "react";
import axios from "axios";
import cs from "../../const";
import Color from "../../theme/color";
import "./Product.css";
import Product from "./Product";

const URL = cs.BaseURL + "/api/seller/shop/detail";
const mediaURL = cs.MediaURL + "/material";
function ProductDetail() {
  const [buttonRateState, setButtonRateState] = useState("all");
  const [introImage, setIntroImage] = useState(
    "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80"
  );
  const [imageTab, setImageTab] = useState(1);
  const [shopDetail, setShopDetail] = useState({
    numberOfFollowers: 0,
    pertcentageOfChatFeedbacks: 0,
    numberOfReviews: 0,
    description: "",
    shopName: "",
    numberOfProducts: 0,
    userName: "",
    followingCount: 0,
    averageRating: 0,
    mediaDescriptionsList: [],
    createdTime: "",
    shopId: 1,
    id: 0,
  });
  const [media, setMedia] = useState([]);
  console.log(media);
  const loadShopDetail = async (conditions) => {
    const response = await axios({
      method: "get",
      url: `${URL}`,
      headers: {
        Authorization: localStorage.getItem(cs.System_Code + "-token"),
      },
    });
    if (
      response.data.error_desc === "Success" &&
      response.data.data.length != 0
    ) {
      setShopDetail(response.data.data);
      setMedia(response.data.data.mediaDescriptionsList);
      // console.log("res", response.data.data);
    }
  };
  useEffect(() => {
    loadShopDetail();
  }, []);
  const List = [1, 2, 3, 4, 5];
  return (
    <div className="product-detail-container container">
      <div className="card card-product-detail-main">
        <div className="row main-row-product-detail d-flex justify-content-between mt-5">
          <div
            className="col-5 img-product-detail-intro "
            style={{ borderRight: "1px solid black" }}
          >
            <div
              className="img-main-product-detail-intro d-block p-2"
              style={{ width: "fit-content", margin: "10px auto" }}
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
              <a
                style={{
                  color: Color.tanhide,
                  width: "fit-content",
                  textDecoration: "none",
                  marginRight: "10px",
                  borderRight: "1px solid black",
                  paddingRight: "5px",
                }}
                href="#scrollspyHeading1"
              >
                5 sao
              </a>
              <a
                style={{
                  color: Color.tanhide,
                  width: "fit-content",
                  textDecoration: "none",
                  marginRight: "10px",
                  borderRight: "1px solid black",
                  paddingRight: "5px",
                }}
                href="#scrollspyHeading1"
              >
                9 đánh giá
              </a>
              <a
                style={{
                  width: "fit-content",
                  textDecoration: "none",
                  marginRight: "10px",
                  paddingRight: "5px",
                }}
              >
                9 Đã bán
              </a>
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
      <div className="card card-shop-info-product-detail mt-3">
        <div className="row infor-row" style={{ borderBottom: "none" }}>
          <div className="col-4 col-avatar">
            <div
              className="card card-shop-avatar"
              style={{
                height: "fit-content",
                backgroundImage:
                  "url(" + cs.MediaURL + "/media/" + shopDetail.coverPath + ")",
              }}
            >
              <div className="card-body ">
                <div className="card-body-top d-flex">
                  <img
                    className="shop-avatar"
                    src={`${cs.MediaURL}/media/${shopDetail.avatarPath}`}
                    alt="shop avatar"
                  />
                  <div
                    className="row-title d-none d-sm-block"
                    style={{
                      width: "fit-content",
                      color: "black",
                    }}
                  >
                    <h5>{shopDetail.shopName}</h5>
                    <h6>
                      <sub>Online:</sub>
                    </h6>
                  </div>
                </div>
                <div className="card-body-bottom d-xl-flex mt-2 justify-content-between d-none">
                  <button className="btn btn-outline-light text-black">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2097/2097705.png"
                      className="icon-button"
                    />
                    Theo dõi
                  </button>
                  <button className="btn btn-outline-light text-black">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/589/589708.png"
                      className="icon-button"
                    />
                    Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="col-4"
            style={{
              borderLeft: "2px solid rgb(219, 97, 16)",
              marginBottom: "5px",
            }}
          >
            <div className="row-title-shopview">
              <img
                className="icon-item"
                src="https://cdn-icons-png.flaticon.com/512/2827/2827585.png"
              />
              Sản Phẩm:{" "}
              <b style={{ color: "black" }}>{shopDetail.numberOfProducts}</b>
            </div>
            <div className="row-title-shopview">
              <img
                className="icon-item"
                src="https://cdn-icons-png.flaticon.com/512/748/748004.png"
              />
              Đang Theo Dõi:{" "}
              <b style={{ color: "black" }}>{shopDetail.numberOfReviews}</b>
            </div>
            <div className="row-title-shopview">
              <img
                className="icon-item"
                src="https://cdn-icons-png.flaticon.com/512/892/892228.png"
              />
              Tỉ Lệ Phản Hồi Chat:{" "}
              <b style={{ color: "black" }}>
                {shopDetail.pertcentageOfChatFeedbacks}
              </b>
            </div>
          </div>
          <div
            className="col-4"
            style={{
              borderLeft: "2px solid rgb(219, 97, 16)",
              marginBottom: "5px",
            }}
          >
            <div className="row-title-shopview">
              <img
                className="icon-item"
                src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png"
              />
              Đánh Giá:{" "}
              <b style={{ color: "black" }}>{shopDetail.averageRating}</b>
            </div>
            <div className="row-title-shopview">
              <img
                className="icon-item"
                src="https://cdn-icons-png.flaticon.com/512/2097/2097705.png"
              />
              Người Theo Dõi:{" "}
              <b style={{ color: "black" }}>{shopDetail.numberOfFollowers}</b>
            </div>
            <div className="row-title-shopview">
              <img
                className="icon-item"
                src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
              />
              Tham Gia:{" "}
              <b style={{ color: "black" }}>
                {shopDetail.createdTime &&
                  shopDetail.createdTime.slice(8, 10) +
                    " - " +
                    shopDetail.createdTime.slice(4, 7) +
                    " - " +
                    shopDetail.createdTime.slice(23, 28)}
              </b>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container product-detail-product-detail-container"
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-offset="0"
        class="scrollspy-example"
        tabindex="0"
      >
        <div className="row product-detail-row mt-3 ms-1">
          <div className="col-10 g-0">
            <div className="card product-detail-product-detail-card p-5">
              <h5 className="card-product-detail-title">Chi Tiết Sản Phẩm</h5>
              <div className="p-2">
                Danh Mục: Shopee / Sản Phẩm Thể Thao / Giày Dép
              </div>
              <div className="p-2">Kho Hàng:</div>
              <div className="p-2">Gửi Từ:</div>
            </div>
            <div className="card product-detail-description-card p-5 mt-3">
              <h5 className="card-product-detail-title">Mô Tả Sản Phẩm</h5>
              <div className="p-2">
                ✔️ Ưu điểm của usb bluetooth receiver BT118 <br /> 1. Thiết kế
                nhỏ gọn và thanh lịch, được cắm trực tiếp vào cổng USB của hệ
                thống âm thanh trên xe mà không yêu cầu bất kỳ kết nối bên ngoài
                nào khác, như dây nguồn,cáp âm thanh, giắc aux… Khoảng cách hoạt
                động lên tới 10m giúp bạn dễ dàng kết nối và chia sẻ nhạc với
                mọi người. <br />
                2. Công nghệ bluetooth V5.0 cho chất lượng âm thanh và đường
                truyền ổn định tốt nhất hiện nay. <br />
                3. Đầu vào qua cổng usb cho chất lượng âm thanh hoàn hảo, rút
                ngắn được thời gian truyền dữ liệu để giảm tổn thất điện năng.{" "}
                <br />
                4. Chip xử lý và ghi nhớ thông minh cung cấp băng thông lớn cho
                thiết bị, cho phép usb bluetooth BT118 có thể ghi nhớ tới 6
                thiết bị kết nối cùng lúc.
              </div>
            </div>
            <div
              className="card product-detail-rate-card p-5 mt-3"
              id="scrollspyHeading1"
            >
              <h5 className="card-product-detail-title">ĐÁNH GIÁ SẢN PHẨM</h5>
              <div className="row product-detail-rate-row">
                <div className="col-4"> ĐÁNH GIÁ SẢN PHẨM : TRÊN 5 SAO</div>
                <div className="col-8">
                  <button
                    className={
                      buttonRateState == "all"
                        ? "sort-rate-button rate-active"
                        : "sort-rate-button"
                    }
                    onClick={() => setButtonRateState("all")}
                  >
                    Tất Cả
                  </button>
                  <button
                    className={
                      buttonRateState == "5star"
                        ? "sort-rate-button rate-active"
                        : "sort-rate-button"
                    }
                    onClick={() => setButtonRateState("5star")}
                  >
                    5 Sao
                  </button>
                  <button
                    className={
                      buttonRateState == "4star"
                        ? "sort-rate-button rate-active"
                        : "sort-rate-button"
                    }
                    onClick={() => setButtonRateState("4star")}
                  >
                    4 Sao
                  </button>
                  <button
                    className={
                      buttonRateState == "3star"
                        ? "sort-rate-button rate-active"
                        : "sort-rate-button"
                    }
                    onClick={() => setButtonRateState("3star")}
                  >
                    3 Sao
                  </button>
                  <button
                    className={
                      buttonRateState == "2star"
                        ? "sort-rate-button rate-active"
                        : "sort-rate-button"
                    }
                    onClick={() => setButtonRateState("2star")}
                  >
                    2 Sao
                  </button>
                  <button
                    className={
                      buttonRateState == "1star"
                        ? "sort-rate-button rate-active"
                        : "sort-rate-button"
                    }
                    onClick={() => setButtonRateState("1star")}
                  >
                    1 Sao
                  </button>
                  <button
                    className={
                      buttonRateState == "hascmt"
                        ? "sort-rate-button rate-active"
                        : "sort-rate-button"
                    }
                    onClick={() => setButtonRateState("hascmt")}
                  >
                    Có Bình Luận
                  </button>
                  <button
                    className={
                      buttonRateState == "hasimg"
                        ? "sort-rate-button rate-active"
                        : "sort-rate-button"
                    }
                    onClick={() => setButtonRateState("hasimg")}
                  >
                    Có Hình Ảnh/ Video
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-2">
            <div className="card product-detail-best-seller-card px-2">
              <h6 className="card-product-detail-title">
                Top Sản Phẩm Bán Chạy
              </h6>
              {List.map((item) => (
                <Product useFor="bestseller" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
