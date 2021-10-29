import React, { useState, useEffect } from "react";
import axios from "axios";
import cs from "../../const";
import Color from "../../theme/color";
import "./Product.css";
import Product from "./Product";
import { useParams } from "react-router-dom";

const URL = cs.BaseURL + "/api/seller/shop/detail";
const Seller_product_detail = cs.BaseURL + "/api/seller/product/detail";
const Buyer_product_detail = cs.BaseURL + "/api/buyer/product/detail";
const loadProductListUrl = cs.BaseURL + "/api/buyer/product/list";
const mediaURL = cs.MediaURL + "/media/";


function ShopProductDetail({ match }) {
  // console.log("productId", match.params.productId);
  const [productId, setProductId] = match.params.productId;
  const [quantityProduct, setQuantityProduct] = useState(1);
  const [variation, setVariation] = useState({ 0: "0" });
  // console.log("variation", variation);
  const ChooseOption = (e) => {
    setVariation({ ...variation, [e.target.name]: e.target.value });
  };
  // const [chooseOption, setChooseOption] = useState(0);
  // console.log("setQuantityProduct", quantityProduct);
  const [buttonRateState, setButtonRateState] = useState("all");
  const [introImage, setIntroImage] = useState("");
  const [firstImage, setFirstImage] = useState("");
  const [productImage, setProductImage] = useState([{ path: "", id: 0 }]);

  const [imagesPerPage, setimagesPerPage] = useState(4);
  const [curPage, setCurPage] = useState(1);
  const indexOfLastImage = curPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const curPosts = productImage.slice(indexOfFirstImage, indexOfLastImage);

  const [imageTab, setImageTab] = useState(0);
  const [shopDetail, setShopDetail] = useState({});
  const [productDetail, setProductDetail] = useState({
    variationArray: [],
    productName: "",
  });

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
      response.data.data.length !== 0
    ) {
      setShopDetail(response.data.data);
      setMedia(response.data.data.mediaDescriptionsList);
      console.log("data", response.data.data);
    }
  };
  const loadProductDetail = async (conditions) => {
    const response = await axios({
      method: "get",
      url: `${cs.BaseURL}/api/seller/product/detail?productId=${productId}`,
      headers: {
        Authorization: localStorage.getItem(cs.System_Code + "-token"),
      },
    });
    if (
      response.data.error_desc === "Success" &&
      response.data.data.length !== 0
    ) {
      setProductDetail(response.data.data);
      setIntroImage(response.data.data.productImageCover);
      setFirstImage(response.data.data.productImageCover);
      setProductImage(response.data.data.productImages);
    }
  };

  const [productList, setProductList] = useState([]);

  const loadProductList = async (conditions) => {
    const response = await axios({
      method: "post",
      url: `${loadProductListUrl}`,
      data: {
        page: 1,
        size: 10,
      },
    });
    setProductList(response.data.data);
    console.log("res", response.data);
  };

  useEffect(() => {
    setProductId(match.params.productId);
  }, [match.params.productId]);

  useEffect(() => {
    loadProductDetail();
    loadShopDetail();
    loadProductList();
  }, [productId]);

  console.log("introimage", introImage);
  console.log("intro", productImage);
  const QuantityFunctionSub = () => {
    if (quantityProduct > 1) setQuantityProduct(quantityProduct - 1);
    else setQuantityProduct(quantityProduct);
  };
  const QuantityFunctionAdd = () => {
    if (quantityProduct < 100) setQuantityProduct(quantityProduct + 1);
    else setQuantityProduct(quantityProduct);
  };
  function onChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      e.preventDefault();
      setQuantityProduct(e.target.value);
    }
  }

  return (
    <div className="product-detail-container container">
      <div
        className="card path-link d-flex flex-row mb-3 py-2 px-5"
        style={{ height: "40px" }}
      >
        <a style={{ color: Color.tanhide }} href="/">
          SalePlus
        </a>
        <div className="px-2">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
        <a>{productDetail.categoryLevel1VieName}</a>
        <div className="px-2">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
        <a>{productDetail.categoryLevel2VieName}</a>
        <div className="px-2 ">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
        <a>{productDetail.categoryLevel3VieName}</a>
        {productDetail.categoryLevel4VieName != "" && (
          <div className="px-2">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        )}
        <a>{productDetail.categoryLevel4VieName}</a>
        {productDetail.categoryLevel4VieName != "" && (
          <div className="px-2">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        )}
        <a>{productDetail.categoryLevel5VieName}</a>
      </div>
      <div className="card card-product-detail-main">
        <div className="row main-row-product-detail d-flex justify-content-between mt-2">
          <div
            className="col-5 img-product-detail-intro "
            style={{ borderRight: "1px solid black" }}
          >
            <div
              className="img-main-product-detail-intro d-block p-2"
              style={{ width: "fit-content", margin: "10px auto" }}
            >
              <img
                className="product-img"
                src={`${cs.MediaURL}/media/${introImage}`}
                alt=""
                style={{ width: "100%", height: "400px" }}
              />
            </div>
            <div
              className="row img-carousel-product-detail-intro m-3 d-flex flex-row justify-content-between"
              style={{ height: "80px", alignItems: "center" }}
            >
              <div
                className="d-flex flex-row"
                style={{ width: "fit-content", alignItems: "center" }}
              >
                <button
                  class={
                    curPage === 1
                      ? "btn btn-category opacity-0 category-next"
                      : "btn btn-category category-next"
                  }
                  type="button"
                  style={{ width: "15px", height: "30px", marginRight: "10px" }}
                  onClick={() => {
                    if (curPage > 1) setCurPage(curPage - 1);
                  }}
                // style={{ position: "absolute", zIndex: 1 }}
                >
                  <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <img
                  className="product-img intro-img"
                  onMouseOver={() => {
                    setImageTab(0);
                    setIntroImage(firstImage);
                  }}
                  src={`${cs.MediaURL}/media/${firstImage}`}
                  alt=""
                  style={
                    imageTab === 0
                      ? {
                        width: "87px",
                        height: "80px",
                        border: "1px solid" + Color.tanhide,
                      }
                      : {
                        width: "87px",
                        height: "80px",
                        border: "1px solid silver",
                      }
                  }
                />
                {curPosts.map((item, index) => (
                  <img
                    className="product-img"
                    onMouseOver={() => {
                      setImageTab(item.id);
                      setIntroImage(item.path);
                    }}
                    // src={`${cs.MediaURL}/media/${item.path}`}
                    src={`${cs.MediaURL}/media/${item.path}`}
                    alt="productIm"
                    style={
                      imageTab === item.id
                        ? {
                          width: "87px",
                          height: "80px",
                          border: "1px solid" + Color.tanhide,
                        }
                        : {
                          width: "87px",
                          height: "80px",
                          border: "1px solid silver",
                        }
                    }
                  />
                ))}
              </div>
              <button
                class={
                  curPage === Math.ceil(productImage.length / imagesPerPage)
                    ? "btn btn-category opacity-0 category-next "
                    : "btn btn-category category-next "
                }
                type="button"
                style={{ width: "15px", height: "30px" }}
                onClick={() => {
                  if (curPage < Math.ceil(productImage.length / imagesPerPage))
                    setCurPage(curPage + 1);
                }}
              // style={{ position: "absolute", zIndex: 1, left: "477px" }}
              >
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </button>

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
              style={{ width: "fit-content", textTransform: "uppercase" }}
            >
              {productDetail.productName}
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
                href="#rate"
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
                href="#rate"
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
              {productDetail.price}
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
            {productDetail.variationArray.map((item) => (
              <div className="row product-product-detail-variation mt-3">
                <div className="col-4">{item.name}</div>
                <div className="col-8">
                  {item.options.map((option) => (
                    <input
                      type="button"
                      name={item.id}
                      className={
                        Object.entries(variation).map((it) => {
                          if ((it[0] = item.id && it[1] == option.optionValue))
                            return "sort-rate-button rate-active me-3 ";
                          else return "sort-rate-button me-3 ";
                        })

                        // ? "btn sort-rate-button rate-active me-3 "
                        // : "btn sort-rate-button me-3"}
                      }
                      onClick={(e) => {
                        ChooseOption(e);
                      }}
                      value={option.optionValue}
                    // style={{ backgroundColor: Color.tanhide }}
                    />
                  ))}
                </div>
              </div>
            ))}
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
                  onClick={() => QuantityFunctionSub()}
                >
                  <ion-icon name="remove-outline"></ion-icon>
                </button>
                <input
                  className="sort-salary"
                  type="text"
                  placeholder=" "
                  size="3"
                  value={quantityProduct}
                  maxlength="2"
                  name="value1"
                  //   value={sortPrice.value1}
                  //   onChange={(e) => onChange(e)}
                  // onkeypress={(event) => isNumberKey(event)}
                  onChange={(e) => onChange(e)}
                  style={{
                    textAlign: "center",
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
                  onClick={() => QuantityFunctionAdd()}
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
        <div className="card product-detail-product-detail-card p-5 mt-3">
          <h5 className="card-product-detail-title">Chi Tiết Sản Phẩm</h5>
          <div className="p-2 d-flex flex-row path-link">
            <a style={{ marginRight: "10px" }}>Danh Mục: </a>
            {"  "}
            <a style={{ color: Color.tanhide }} href="/">
              SalePlus
            </a>
            <div className="px-2">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <a>{productDetail.categoryLevel1VieName}</a>
            <div className="px-2">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <a>{productDetail.categoryLevel2VieName}</a>
            <div className="px-2 ">
              <ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
            <a>{productDetail.categoryLevel3VieName}</a>
            {productDetail.categoryLevel4VieName != "" && (
              <div className="px-2">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </div>
            )}
            <a>{productDetail.categoryLevel4VieName}</a>
            {productDetail.categoryLevel4VieName != "" && (
              <div className="px-2">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </div>
            )}
            <a>{productDetail.categoryLevel5VieName}</a>
          </div>
          <div className="p-2">Kho Hàng:</div>
          <div className="p-2">
            Kích Thước(cm): {productDetail.height} X {productDetail.width} X{" "}
            {productDetail.depth}
          </div>
          <div className="p-2">
            Tình Trạng: {productDetail.isNewProduct == 1 ? "Mới" : "Cũ"}
          </div>
          <div className="p-2">
            Cho Đặt Trước:{" "}
            {productDetail.isPreorderedProduct == 1 ? "Có" : "Không"}
          </div>
          <div className="p-2">Gửi Từ:</div>
        </div>
        <div className="card product-detail-description-card p-5 mt-3">
          <h5 className="card-product-detail-title">Mô Tả Sản Phẩm</h5>
          <div className="p-2">{productDetail.productDescription}</div>
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
                  buttonRateState === "all"
                    ? "sort-rate-button rate-active"
                    : "sort-rate-button"
                }
                onClick={() => setButtonRateState("all")}
              >
                Tất Cả
              </button>
              <button
                className={
                  buttonRateState === "5star"
                    ? "sort-rate-button rate-active"
                    : "sort-rate-button"
                }
                onClick={() => setButtonRateState("5star")}
              >
                5 Sao
              </button>
              <button
                className={
                  buttonRateState === "4star"
                    ? "sort-rate-button rate-active"
                    : "sort-rate-button"
                }
                onClick={() => setButtonRateState("4star")}
              >
                4 Sao
              </button>
              <button
                className={
                  buttonRateState === "3star"
                    ? "sort-rate-button rate-active"
                    : "sort-rate-button"
                }
                onClick={() => setButtonRateState("3star")}
              >
                3 Sao
              </button>
              <button
                className={
                  buttonRateState === "2star"
                    ? "sort-rate-button rate-active"
                    : "sort-rate-button"
                }
                onClick={() => setButtonRateState("2star")}
              >
                2 Sao
              </button>
              <button
                className={
                  buttonRateState === "1star"
                    ? "sort-rate-button rate-active"
                    : "sort-rate-button"
                }
                onClick={() => setButtonRateState("1star")}
              >
                1 Sao
              </button>
              <button
                className={
                  buttonRateState === "hascmt"
                    ? "sort-rate-button rate-active"
                    : "sort-rate-button"
                }
                onClick={() => setButtonRateState("hascmt")}
              >
                Có Bình Luận
              </button>
              <button
                className={
                  buttonRateState === "hasimg"
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
        <div className="card product-detail-description-card p-5 mt-3">
          <h5 className="card-product-detail-title">sản phẩm của shop</h5>
          <div className="row p-1">
            {productList.map((item) => {
              return <div className="col p-0" style={{ width: "20%" }}>
                <Product useFor="buyer" data={item} />
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShopProductDetail;
