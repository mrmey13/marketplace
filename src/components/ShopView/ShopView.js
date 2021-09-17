import React, { useState, useEffect } from "react";
import axios from "axios";
import cs from "../../const";
import "./ShopView.css";
const URL = cs.BaseURL + "/api/seller/shop/detail";
const mediaURL = cs.MediaURL + "/material";

function ShopView() {
  const [tab, setTab] = useState(1);
  const [shopDetail, setShopDetail] = useState({});
  const [media, setMedia] = useState([]);

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
  console.log("tab", tab);
  return (
    <div>
      <div className="row infor-row">
        <div className="col-4 col-avatar">
          <div
            className="card card-shop-avatar"
            style={{ height: "fit-content" }}
          >
            <div className="card-body ">
              <div className="card-body-top d-flex">
                <img
                  className="shop-avatar"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                  alt="shop avatar"
                />
                <div
                  className="row-title d-none d-sm-block"
                  style={{
                    width: "fit-content",
                    color: "black",
                  }}
                >
                  <h6>Tên shop: {shopDetail.shopName}</h6>
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
          <div className="row-title">
            <img
              className="icon-item"
              src="https://cdn-icons-png.flaticon.com/512/2827/2827585.png"
            />
            Sản Phẩm:
            <b style={{ color: "black" }}>{shopDetail.numberOfProducts}</b>
          </div>
          <div className="row-title">
            <img
              className="icon-item"
              src="https://cdn-icons-png.flaticon.com/512/748/748004.png"
            />
            Đang Theo Dõi:
            <b style={{ color: "black" }}>{shopDetail.numberOfReviews}</b>
          </div>
          <div className="row-title">
            <img
              className="icon-item"
              src="https://cdn-icons-png.flaticon.com/512/892/892228.png"
            />
            Tỉ Lệ Phản Hồi Chat:
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
          <div className="row-title">
            <img
              className="icon-item"
              src="https://cdn-icons-png.flaticon.com/512/1828/1828970.png"
            />
            Đánh Giá:
            <b style={{ color: "black" }}>{shopDetail.averageRating}</b>
          </div>
          <div className="row-title">
            <img
              className="icon-item"
              src="https://cdn-icons-png.flaticon.com/512/2097/2097705.png"
            />
            Người Theo Dõi:{" "}
            <b style={{ color: "black" }}>{shopDetail.numberOfFollowers}</b>
          </div>
          <div className="row-title">
            <img
              className="icon-item"
              src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
            />
            Tham Gia:
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

      <div className="container row tab-row mb-2">
        <div
          className="btn-group row-tab"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            className="btn btn-outline-none tab-button "
            style={
              tab == 1
                ? { borderBottom: "3px solid #F69756" }
                : { borderBottom: "none" }
            }
            autoFocus="true"
            onClick={() => setTab(1)}
          >
            Hồ Sơ Shop
          </button>
          <button
            className="btn btn-outline-none tab-button "
            onClick={() => setTab(2)}
            style={
              tab == 2
                ? { borderBottom: "3px solid #F69756" }
                : { borderBottom: "none" }
            }
          >
            Tất Cả Sản Phẩm
          </button>
          <button
            className="btn btn-outline-none tab-button "
            onClick={() => setTab(3)}
            style={
              tab == 3
                ? { borderBottom: "3px solid #F69756" }
                : { borderBottom: "none" }
            }
          >
            Giày Dép
          </button>
          <button
            className="btn btn-outline-none tab-button "
            onClick={() => setTab(4)}
            style={
              tab == 4
                ? { borderBottom: "3px solid #F69756" }
                : { borderBottom: "none" }
            }
          >
            Quần Áo
          </button>
          <button
            className="btn btn-outline-none tab-button "
            onClick={() => setTab(5)}
            style={
              tab == 5
                ? { borderBottom: "3px solid #F69756" }
                : { borderBottom: "none" }
            }
          >
            Phụ Kiện
          </button>
          <div class="dropdown">
            <button
              class="btn btn-outline-none tab-button dropdown-toggle "
              id="additionDropdown1"
              data-bs-toggle="dropdown"
              onClick={() => setTab(6)}
              style={
                tab == 6
                  ? { borderBottom: "3px solid #F69756" }
                  : { borderBottom: "none" }
              }
            >
              Thêm
            </button>
            <ul class="dropdown-menu" aria-labelledby="additionDropdown1">
              <li>
                <a class="dropdown-item " href="#">
                  Đồ Dùng Em Bé
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Đồ Dùng Bà Bầu
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Đồ Dùng Trẻ Sơ Sinh
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* <div>
          <ul class="nav nav-pills">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" href="#">
                Active
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">
                Link
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled">Disabled</a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                data-bs-toggle="dropdown"
                href="#"
                role="button"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul class="dropdown-menu">
                <li>
                  <a class="dropdown-item" href="#">
                    Đồ Dùng Em Bé
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Đồ Dùng Bà Bầu
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="#">
                    Đồ Dùng Trẻ Sơ Sinh
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div> */}
      </div>
      <div className="container description-row d-flex justify-content-between">
        <div className="col-6 shop-image-description">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ width: "80%" }}
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleControls"
                data-bs-slide-to="1"
                className="active button-indicator"
                aria-current="true"
                aria-label="Slise 1"
              ></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  // src={encodeURI(`${mediaURL}/${item.path}`)}
                  src={encodeURI(
                    mediaURL + "/shop_media/test/file_example_PNG_3MB.png"
                  )}
                  className="d-block w-100 carousel-img"
                  alt="..."
                />
              </div>
              {/* <div class="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1631664393319-2824b4f7277d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  className="d-block w-100 carousel-img"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <video
                  className="video-intro d-block w-100"
                  id="video"
                  controls
                  autoPlay
                  // currentTime={11.3}
                  // width={1000}
                  // height={500}
                  src="https://www.youtube.com/watch?v=elQDIQqKx3o"
                  // onProgress={checkProgress}
                  // controlsList="nodownload"
                />
              </div> */}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-6 shop-infor-description">
          <div
            className="row row-title "
            style={{ fontSize: "20px", marginBottom: "2%" }}
          >
            Mô tả shop:
          </div>
          <div
            className="row row-shop-name"
            style={{
              borderBottom: "1px solid black",
              marginBottom: "5px",
            }}
          >
            Tên shop: {shopDetail.shopName}
          </div>
          <div className="row row-shop-description">
            {shopDetail.description}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopView;
