import React, { useState, useEffect } from "react";
import Color from "../../theme/color";
import axios from "axios";
import cs from "../../const";
import Product from "./Product";
import Pagin from "../../components/shared/Pagin";
const URL = cs.BaseURL + "/api/seller/shop/detail";
const Product_URL = cs.BaseURL + "/api/seller/product/list";
const mediaURL = cs.MediaURL + "/material";
function ProductList() {
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
    productId: 0,
  });
  const [productList, setProductList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
  console.log("productlist", productList);

  const [sortTab, setSortTab] = useState("popular");
  const [sortProduct, setSortProduct] = useState({
    popular: "",
    newest: "",
    selling: "",
    price: "",
  });
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
      // console.log("res", response.data.data);
    }
  };
  const loadProductList = async (conditions) => {
    const response = await axios({
      method: "get",
      url: `${Product_URL}?page=${currentPage}&size=0`,
      headers: {
        Authorization: localStorage.getItem(cs.System_Code + "-token"),
      },
    });
    if (
      response.data.error_desc === "Success" &&
      response.data.data.length !== 0
    ) {
      setProductList(response.data.data);
      console.log("res", response.data.data);
    }
  };
  useEffect(() => {
    loadShopDetail();
    loadProductList();
  }, []);
  //Pagin
  const [postsPerPage, setpostPerPage] = useState(24);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = productList.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    // console.log(currentPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const [sortPrice, setSortPrice] = useState({ value1: "", value2: "" });
  console.log(sortPrice);
  function onChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSortPrice({ ...sortPrice, [e.target.name]: e.target.value });
    }
  }
  return (
    <div className="product-container-saleplus" style={{ minWidth: "1420px" }}>
      <div className=" mb-3 component-top-title">
        <h3>PRODUCT LIST</h3>{" "}
      </div>
      <div class="row" style={{ minWidth: "1420px" }}>
        <div class="col-2 scroller" data-bs-spy="scroll">
          <div
            className="card card-shop-intro"
            style={{
              height: "fit-content",
              width: "100%",
              marginLeft: "0",
              marginRight: "5px",

              // backgroundImage:
              //   "url(" + cs.MediaURL + "/media/" + shopDetail.coverPath + ")",
            }}
          >
            <div
              className="card-body"
              style={{
                borderRadius: "10px",
                backgroundImage:
                  "url(" + cs.MediaURL + "/media/" + shopDetail.coverPath + ")",
              }}
            >
              <div className="card-body-shop">
                <img
                  className="shop-avatar"
                  src={`${cs.MediaURL}/media/${shopDetail.avatarPath}`}
                  // src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                  alt="shop avatar"
                  style={{
                    width: "85px",
                    height: "85px",
                  }}
                />
                <div
                  className="row-title"
                  style={{
                    width: "fit-content",
                    color: "black",
                  }}
                >
                  <h6>{shopDetail.shopName}</h6>
                  {/* <h6>
                    <sub>Online:</sub>
                  </h6> */}
                </div>
              </div>
              {/* <div className="card-body-bottom d-xl-flex mt-2 justify-content-between d-none">
                  <button className="btn btn-outline-light text-black">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/2097/2097705.png"
                      className="icon-button"
                    />
                    Theo d??i
                  </button>
                  <button className="btn btn-outline-light text-black">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/589/589708.png"
                      className="icon-button"
                    />
                    Chat
                  </button>
                </div> */}
            </div>
          </div>
          <div className="marketplace-credito-filter mt-2">
            <b>DANH M???C SHOP</b>
            <div className="collection-filter_collection active">Qu???n ??o</div>
            <div className="collection-filter_collection">Qu???n ??o</div>
            {/* <div className="d-flex" style={{ borderBottom: "1px solid black" }}>
             
              <ul
                class="nav nav-pills fex-column mb-3"
                id="pills-tab"
                role="tablist"
              >
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link text-black"
                    id="pills-home-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-home"
                    type="button"
                    role="tab"
                    aria-controls="pills-home"
                    aria-selected="true"
                  >
                    Home
                  </button>
                </li>
                <li class="nav-item" role="presentation">
                  <button
                    class="nav-link text-black"
                    id="pills-profile-tab"
                    data-bs-toggle="pill"
                    data-bs-target="#pills-profile"
                    type="button"
                    role="tab"
                    aria-controls="pills-profile"
                    aria-selected="false"
                  >
                    Profile
                  </button>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="marketplace-credito-filter facet-filter mt-2">
            <b>THEO DANH M???C</b>
            <div class="form-check products-checkbox-filter pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault4"
              />
              <label class="form-check-label" for="flexCheckDefault4">
                Qu???n ??o Nam
              </label>
            </div>
          </div>
          <div className="marketplace-credito-filter location-filter mt-2">
            <b>N??I B??N</b>
            <div class="form-check products-checkbox-filter pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault5"
              />
              <label class="form-check-label" for="flexCheckDefault5">
                H?? N???i
              </label>
            </div>
          </div>
          <div className="marketplace-credito-filter logistics-filter mt-2">
            <b>????N V??? V???N CHUY???N</b>
            <div class="form-check products-checkbox-filter pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault6"
              />
              <label class="form-check-label" for="flexCheckDefault6">
                Grab
              </label>
            </div>
          </div>
          <div className="marketplace-credito-filter brands-filter mt-2">
            <b>TH????NG HI???U</b>
            <div class="form-check products-checkbox-filter pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault7"
              />
              <label class="form-check-label" for="flexCheckDefault7">
                Luis Vuiton
              </label>
            </div>
          </div>
          <div>
            <div className="marketplace-credito-filter price-filter mt-2">
              <b>KHO???NG GI??</b>
              <div className="pt-2marketplace-credito-filter ">
                {/* <input
                  className="sort-salary"
                  type="text"
                  placeholder=" T???"
                  onkeypress={(e) => isNumberKey(e)}
                  style={{ width: "100px", height: "35px" }}
                /> */}
                <input
                  className="sort-salary"
                  type="text"
                  placeholder=" T???"
                  size="20"
                  maxLength="12"
                  name="value1"
                  value={sortPrice.value1}
                  onChange={(e) => onChange(e)}
                  // onkeypress={(event) => isNumberKey(event)}
                  style={{ width: "100px", height: "35px" }}
                />
                {" - "}
                <input
                  className="sort-salary"
                  type="text"
                  placeholder=" ?????n"
                  maxLength="12"
                  size="20"
                  name="value2"
                  value={sortPrice.value2}
                  onChange={(e) => onChange(e)}
                  style={{ width: "100px", height: "35px" }}
                />
              </div>
            </div>
            <button
              className="btn btn-outline-dark mt-3"
              style={{
                width: "fit-content",
                backgroundColor: Color.tanhide,
                color: "black",
              }}
            >
              ??p D???ng
            </button>
          </div>
          <div className="marketplace-credito-filter state-filter mt-2">
            <b>T??NH TR???NG</b>
            <div class="form-check products-checkbox-filter pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="old"
              />
              <label class="form-check-label" for="old">
                C??
              </label>
            </div>
            <div class="form-check products-checkbox-filter pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="new"
              />
              <label class="form-check-label" for="new">
                M???i
              </label>
            </div>
          </div>
          <div className="marketplace-credito-filter rate-filter  mt-2">
            <b>????NH GI??</b>
            <div>
              <button className="btn rate-button 5-star">
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
              </button>
              <button className="btn rate-button 4-star">
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
              </button>
              <button className="btn rate-button 3-star">
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
              </button>
              <button className="btn rate-button 2-star">
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
              </button>
              <button className="btn rate-button 1-star">
                <img
                  className="sort-star-img"
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt=""
                />
              </button>
            </div>
          </div>
          <div className="pt-2">
            <button
              className="btn btn btn-outline-dark mt-4"
              style={{
                width: "100%",
                backgroundColor: "#F69756",
                color: "black",
              }}
            >
              X??a t???t c???
            </button>
          </div>
        </div>
        <div class="col-md-10 col-8">
          <div className="sort-card mb-2 d-flex align-items-center">
            <div className="saleplus-credito sort-card">
              <button
                className="btn btn-outline-dark btn-sort"
                style={
                  sortTab == "popular"
                    ? {
                      width: "160px",
                      backgroundColor: "#F69756",
                      color: "black",
                    }
                    : { width: "160px", backgroundColor: "white" }
                }
                onClick={() => setSortTab("popular")}
              >
                Ph??? Bi???n
              </button>
              <button
                className="btn btn-outline-dark btn-sort"
                style={
                  sortTab == "newest"
                    ? {
                      width: "160px",
                      backgroundColor: "#F69756",
                      color: "black",
                    }
                    : { width: "160px", backgroundColor: "white" }
                }
                onClick={() => setSortTab("newest")}
              >
                M???i Nh???t
              </button>
              <button
                className="btn btn-outline-dark btn-sort"
                style={
                  sortTab === "selling"
                    ? {
                      width: "160px",
                      backgroundColor: "#F69756",
                      color: "black",
                    }
                    : { width: "160px", backgroundColor: "white" }
                }
                onClick={() => setSortTab("selling")}
              >
                B??n Ch???y
              </button>
              <select
                class="form-select select-sort"
                aria-label="Default select example"
              >
                <option selected>Gi??</option>
                <option value="1">T??? th???p t???i cao</option>
                <option value="2">T??? cao t???i th???p</option>
              </select>
            </div>
            <div className="saleplus-credito pagin-card d-none d-md-flex">
              <Pagin
                ItemsPerPage={postsPerPage}
                paginate={paginate}
                totalItems={productList.length}
                currentPage={currentPage}
              />
            </div>
          </div>
          <div className="product-card">
            <div className="row g-0 ">
              {currentPosts.map((data) => (
                <div className="col-2">
                  <Product data={data} useFor="seller" />
                </div>
              ))}
            </div>
            <div className="saleplus-credito pagin-card mt-5 d-flex justify-content-center ">
              <Pagin
                ItemsPerPage={postsPerPage}
                paginate={paginate}
                totalItems={productList.length}
                currentPage={currentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
