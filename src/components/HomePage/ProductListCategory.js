import React, { useState, useEffect } from "react";
import Color from "../../theme/color";
import axios from "axios";
import cs from "../../const";
import "../ProductList/Product.css";
import Product from "../ProductList/Product";
import Pagin from "../../components/shared/Pagin";
import { useParams, Link } from "react-router-dom";
const URL = cs.BaseURL + "/api/seller/shop/detail";
const Product_URL = cs.BaseURL + "/api/seller/product/list";
const mediaURL = cs.MediaURL + "/material";
function ProductListCategory() {
  const { name, id } = useParams();
  console.log(id);
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
  const [productList, setProductList] = useState([]);

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
      method: "post",
      url: `${cs.BaseURL}/api/buyer/product/list`,
      //   headers: {
      //     Authorization: localStorage.getItem(cs.System_Code + "-token"),
      //   },
      data: {
        categoryId: id,
        page: 0,
        size: 0,
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
  const [categoriesList, setCategoriesList] = useState([1, 2, 3, 4]);
  const loadCategoryList = async (conditions) => {
    const response = await axios({
      method: "get",
      url: `${cs.BaseURL}/api/common/product/category/list`,
      //   headers: {
      //     Authorization: localStorage.getItem(cs.System_Code + "-token"),
      //   },
    });
    if (
      response.data.error_desc === "Success" &&
      response.data.data.length !== 0
    ) {
      setCategoriesList(response.data.data);
      console.log("cate", categoriesList);
    }
  };

  useEffect(() => {
    loadCategoryList();
    loadShopDetail();
    loadProductList();
  }, []);
  //Pagin
  const [postsPerPage, setpostPerPage] = useState(6);
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
  //console.log(sortPrice);
  function onChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSortPrice({ ...sortPrice, [e.target.name]: e.target.value });
    }
  }
  return (
    <div className="product-container-saleplus" style={{ minWidth: "1420px" }}>
      {/* <div className=" mb-3 component-top-title">
        <h3>PRODUCT LIST CATEGORY</h3>{" "}
      </div> */}
      <div class="row" style={{ minWidth: "1420px" }}>
        <div class="col-2 scroller" data-bs-spy="scroll">
          <div className="marketplace-credito-filter mt-2 d-flex flex-column">
            <b>TẤT CẢ DANH MỤC</b>
            {categoriesList.map((item) => (
              <a
                component={Link}
                className={
                  name === item.categoryEngName
                    ? "collection-filter_collection active"
                    : "collection-filter_collection text-black "
                }
                style={{ textDecoration: "none" }}
                href={
                  "/category/" + item.categoryEngName + "/" + item.categoryId
                }
                onClick={() => loadProductList()}
              >
                {item.categoryVieName}{" "}
              </a>
            ))}
          </div>
          {/* <div className="marketplace-credito-filter facet-filter mt-2">
            <b>THEO DANH MỤC</b>
            <div class="form-check products-checkbox-filter pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault4"
              />
              <label class="form-check-label" for="flexCheckDefault4">
                Quần Áo Nam
              </label>
            </div>
          </div> */}
          <div className="marketplace-credito-filter location-filter mt-2">
            <b>NƠI BÁN</b>
            <div class="form-check products-checkbox-filter pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault5"
              />
              <label class="form-check-label" for="flexCheckDefault5">
                Hà Nội
              </label>
            </div>
          </div>
          {/* <div className="marketplace-credito-filter logistics-filter mt-2">
            <b>ĐƠN VỊ VẬN CHUYỂN</b>
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
          </div> */}
          <div className="marketplace-credito-filter brands-filter mt-2">
            <b>THƯƠNG HIỆU</b>
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
              <b>KHOẢNG GIÁ</b>
              <div className="pt-2marketplace-credito-filter ">
                {/* <input
                  className="sort-salary"
                  type="text"
                  placeholder=" Từ"
                  onkeypress={(e) => isNumberKey(e)}
                  style={{ width: "100px", height: "35px" }}
                /> */}
                <input
                  className="sort-salary"
                  type="text"
                  placeholder=" Từ"
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
                  placeholder=" Đến"
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
              Áp Dụng
            </button>
          </div>
          <div className="marketplace-credito-filter state-filter mt-2">
            <b>TÌNH TRẠNG</b>
            <div class="form-check products-checkbox-filter pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="old"
              />
              <label class="form-check-label" for="old">
                Cũ
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
                Mới
              </label>
            </div>
          </div>
          <div className="marketplace-credito-filter rate-filter  mt-2">
            <b>ĐÁNH GIÁ</b>
            <div>
              <button className="btn rate-button 5-star d-flex flex-row justify-content-start">
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
              <button className="btn rate-button 4-star d-flex flex-row justify-content-start">
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
              <button className="btn rate-button 3-star d-flex flex-row justify-content-start">
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
              <button className="btn rate-button 2-star d-flex flex-row justify-content-start">
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
              <button className="btn rate-button 1-star d-flex flex-row justify-content-start">
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
              Xóa tất cả
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
                Phổ Biến
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
                Mới Nhất
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
                Bán Chạy
              </button>
              <select
                className="form-select select-sort"
                aria-label="Default select example"
              >
                <option selected>Giá</option>
                <option value="1">Từ thấp tới cao</option>
                <option value="2">Từ cao tới thấp</option>
              </select>
            </div>
            <Pagin
              ItemsPerPage={postsPerPage}
              paginate={paginate}
              totalItems={productList.length}
              currentPage={currentPage}
            />
          </div>
          <div className="product-card">
            <div className="row g-0 ">
              {currentPosts.map((data) => (
                <div className="col-2">
                  <Product data={data} useFor="buyer" />
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

export default ProductListCategory;
