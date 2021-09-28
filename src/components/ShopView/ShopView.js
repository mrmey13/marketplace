import React, { useState, useEffect } from "react";
import axios from "axios";
import cs from "../../const";
import "./ShopView.css";
const URL = cs.BaseURL + "/api/seller/shop/detail";
const mediaURL = cs.MediaURL + "/material";

function ShopView() {
  const [tab, setTab] = useState(1);
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
  console.log("shopDetail", shopDetail);
  const [media, setMedia] = useState([]);
  console.log(media);

  // function getId(url) {
  //   const regExp =
  //     /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  //   const match = url.match(regExp);

  //   const endpoint = match && match[2].length === 11 ? match[2] : null;
  //   const link = "//www.youtube.com/embed/" + endpoint;
  //   return link;
  // }

  function getYoutubeId(url) {
    var regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);

    if (match && match[2].length == 11) {
      return match[2];
    } else {
      return "error";
    }
  }
  // const videoId = getId("http://www.youtube.com/watch?v=zbYf5_S7oJo");
  // console.log("Video ID:", videoId);

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

  function ConvertBR(input) {
    var output = "";
    for (var i = 0; i <= input.length; i++) {
      if (input.charCodeAt(i) == 13 && input.charCodeAt(i + 1) == 10) {
        i++;
        output += "<br />";
        console.log(2222);
      } else {
        output += input.charAt(i);
      }
    }
    console.log("output", output);
    return output;
  }
  console.log("tab", tab);
  return (
    <div className="shop-view-container">
      <div className="row infor-row">
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

      <div className="container row tab-row mb-5">
        <div
          className="btn-group row-tab"
          role="group"
          aria-label="Basic outlined example"
        >
          <button
            className={
              tab == 1
                ? "btn btn-outline-none tab-button active-tab"
                : "btn btn-outline-none tab-button"
            }
            // style={
            //   tab == 1
            //     ? { borderBottom: "3px solid #F69756", color: "#F69756" }
            //     : { borderBottom: "none" }
            // }
            autoFocus="true"
            onClick={() => setTab(1)}
          >
            Hồ Sơ Shop
          </button>
          <a
            className={
              tab == 2
                ? "btn btn-outline-none tab-button active-tab"
                : "btn btn-outline-none tab-button"
            }
            href="/products"
            onClick={() => setTab(2)}
            // style={
            //   tab == 2
            //     ? { borderBottom: "3px solid #F69756", color: "#F69756" }
            //     : null
            // }
          >
            Tất Cả Sản Phẩm
          </a>
          <button
            className={
              tab == 3
                ? "btn btn-outline-none tab-button active-tab"
                : "btn btn-outline-none tab-button"
            }
            onClick={() => setTab(3)}
            // style={
            //   tab == 3
            //     ? { borderBottom: "3px solid #F69756", color: "#F69756" }
            //     : null
            // }
          >
            Giày Dép
          </button>
          <button
            className={
              tab == 4
                ? "btn btn-outline-none tab-button active-tab"
                : "btn btn-outline-none tab-button"
            }
            onClick={() => setTab(4)}
            // style={
            //   tab == 4
            //     ? { borderBottom: "3px solid #F69756", color: "#F69756" }
            //     : null
            // }
          >
            Quần Áo
          </button>
          <button
            className={
              tab == 5
                ? "btn btn-outline-none tab-button active-tab"
                : "btn btn-outline-none tab-button"
            }
            onClick={() => setTab(5)}
            // style={
            //   tab == 5
            //     ? { borderBottom: "3px solid #F69756", color: "#F69756" }
            //     : { borderBottom: "none" }
            // }
          >
            Phụ Kiện
          </button>
        </div>
      </div>
      <div
        className="container description-row d-flex justify-content-between"
        style={{ boxShadow: "3px 0px 3px 0px silver", paddingTop: "5px" }}
      >
        <div className="col-8 shop-image-description d-none d-md-flex">
          <div
            id="carouselExampleIndicators"
            className="carousel slide carousel-intro"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              {media.map((item, index) => (
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to={index}
                  class={index == 0 ? "active" : null}
                  aria-current="true"
                  aria-label="Slide 1"
                  style={{
                    width: "15px",
                    height: "15px",
                    borderRadius: "100px",
                    backgroundColor: "#FF6600",
                  }}
                ></button>
              ))}
            </div>
            <div class="carousel-inner">
              {media.map((item, index) => (
                <div
                  className={
                    index == 0 ? "carousel-item active" : "carousel-item"
                  }
                >
                  {item.type === 11 && (
                    <img
                      className="carousel-img"
                      id={item.id}
                      style={{ height: "400px", width: "800px" }}
                      src={`${cs.MediaURL}/media/${item.path}`}
                      srcSet={`${cs.MediaURL}/media/${item.path}`}
                      alt={item.title}
                      loading="lazy"
                    />
                  )}
                  {item.type === 22 && (
                    <iframe
                      className="carousel-img"
                      style={{ height: "400px", width: "800px" }}
                      src={`//www.youtube.com/embed/${getYoutubeId(item.path)}`}
                      frameborder="0"
                      allowfullscreen
                    ></iframe>
                  )}
                </div>
              ))}
            </div>
            <button
              class="carousel-control-prev nav-button"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next nav-button"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
        <div className="col-3 shop-infor-description d-block  ">
          <div
            className="row row-title "
            style={{ fontSize: "20px", marginBottom: "2%" }}
          >
            Mô tả shop
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
            {/* {shopDetail.description} */}
            {ConvertBR(shopDetail.description)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopView;
