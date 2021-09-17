import React from "react";
import "./ShopView.css";

function ShopView() {
  return (
    <div>
      <div className="row infor-row">
        <div className="col-4 col-avatar">
          <div className="card card-shop-avatar">
            <div className="card-body ">
              <div className="card-body-top d-flex">
                <img
                  className="shop-avatar"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                  alt="shop avatar"
                />
                <div
                  className="row-title"
                  style={{ width: "fit-content", color: "black" }}
                >
                  <h6>Tên shop: </h6>
                  <h6>
                    <sub>Online:</sub>
                  </h6>
                </div>
              </div>
              <div className="card-body-bottom d-flex mt-2 justify-content-between">
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
          </div>
          <div className="row-title">
            <img
              className="icon-item"
              src="https://cdn-icons-png.flaticon.com/512/748/748004.png"
            />
            Đang Theo Dõi:
          </div>
          <div className="row-title">
            <img
              className="icon-item"
              src="https://cdn-icons-png.flaticon.com/512/892/892228.png"
            />
            Tỉ Lệ Phản Hồi Chat:
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
          </div>
          <div className="row-title">
            <img
              className="icon-item"
              src="https://cdn-icons-png.flaticon.com/512/2097/2097705.png"
            />
            Người Theo Dõi:
          </div>
          <div className="row-title">
            <img
              className="icon-item"
              src="https://cdn-icons-png.flaticon.com/512/747/747310.png"
            />
            Tham Gia:
          </div>
        </div>
      </div>
      <div className="container row tab-row mb-3">
        <div class="btn-group" role="group" aria-label="Basic outlined example">
          <button
            type="button"
            className="btn btn-none active tab-button "
            autoFocus="true"
          >
            Dạo
          </button>
          <button type="button" className="btn btn-outline-none tab-button">
            Tất Cả Sản Phẩm
          </button>
          <button type="button" className="btn btn-outline-none tab-button">
            Giày Dép
          </button>
          <button type="button" className="btn btn-outline-none tab-button">
            Quần Áo
          </button>
          <button type="button" className="btn btn-outline-none tab-button">
            Mũ Nón
          </button>
          <button type="button" className="btn btn-outline-none tab-button">
            Phụ Kiện
          </button>
          <div class="dropdown">
            <button
              class="btn btn-outline-none tab-button dropdown-toggle "
              type="button"
              id="additionDropdown1"
              data-bs-toggle="dropdown"
            >
              Thêm
            </button>
            <ul class="dropdown-menu" aria-labelledby="additionDropdown1">
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
          </div>
        </div>
      </div>
      <div className="container description-row d-flex justify-content-between">
        <div className="col-6 shop-image-description">
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
            style={{ width: "80%" }}
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src="https://images.unsplash.com/photo-1611465577672-8fc7be1dc826?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div class="carousel-item">
                <img
                  src="https://images.unsplash.com/photo-1631664393319-2824b4f7277d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  className="d-block w-100"
                  alt="..."
                />
              </div>
              <div className="carousel-item">
                <video
                  className="video-intro"
                  id="video"
                  controls
                  autoPlay
                  // currentTime={11.3}
                  // width={1000}
                  // height={500}
                  src="https://www.youtube.com/watch?v=0I647GU3Jsc"
                  // onProgress={checkProgress}
                  // controlsList="nodownload"
                />
              </div>
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
            Tên shop:
          </div>
          <div className="row row-shop-description">Mô tả</div>
        </div>
      </div>
    </div>
  );
}

export default ShopView;
