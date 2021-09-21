import React, { useState, useEffect } from "react";
import Color from "../../theme/color";
import axios from "axios";
import cs from "../../const";
import Product from "./Product";
import Pagin from "../../components/shared/Pagin";
// import ProductList from "../ProductList/ProductList";
function ProductList() {
  const getProductListUrl = cs.BaseURL + "/api/course/list";
  const [productList, setProductList] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
  ]);
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

  const [sortTab, setSortTab] = useState("popular");
  const [sortProduct, setSortProduct] = useState({
    popular: "",
    newest: "",
    selling: "",
    price: "",
  });
  // const getCoursesData = async () => {
  //   try {
  //     const response = await axios({
  //       method: "get",
  //       url: `${getProductListUrl}`,
  //       headers: {
  //         Authorization: localStorage.getItem(cs.System_Code + "-token"),
  //       },
  //     });
  //     console.log("course", response.data);
  //     setProductList(response.data.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  // useEffect(() => {
  //   getCoursesData();
  // }, []);

  const [sortSlary, setSortSalary] = useState({ value1: "", value2: "" });
  console.log(sortSlary);
  function onChange(e) {
    const re = /^[0-9\b]+$/;
    if (e.target.value === "" || re.test(e.target.value)) {
      setSortSalary({ ...sortSlary, [e.target.name]: e.target.value });
    }
  }
  return (
    <div>
      <div className=" mb-3 component-top-title">
        <h3>PRODUCT LIST</h3>{" "}
      </div>
      <div class="row">
        <div class="col-2">
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
            <div className="card-body ">
              <div
                className="card-body-shop"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  JustifyContent: "center",
                }}
              >
                <img
                  className="shop-avatar"
                  // src={`${cs.MediaURL}/media/${shopDetail.avatarPath}`}
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
                  alt="shop avatar"
                />
                <div
                  className="row-title"
                  style={{
                    width: "fit-content",
                    color: "black",
                  }}
                >
                  <h6>Tên shop:</h6>
                  <h6>
                    <sub>Online:</sub>
                  </h6>
                </div>
              </div>
              {/* <div className="card-body-bottom d-xl-flex mt-2 justify-content-between d-none">
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
                </div> */}
            </div>
          </div>
          <div className="pt-2">
            <b>DANH MỤC SHOP</b>
            <div className="d-flex" style={{ borderBottom: "1px solid black" }}>
              {/* <button
                className="btn"
                style={{ border: "none", boxShadow: "none" }}
              >
                Sản phẩm
              </button> */}
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
            </div>
          </div>
          <div className="pt-2">
            <b>THEO DANH MỤC</b>
            <div class="form-check pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault4"
              />
              <label class="form-check-label" for="flexCheckDefault4">
                Default checkbox
              </label>
            </div>
          </div>
          <div className="pt-2">
            <b>NƠI BÁN</b>
            <div class="form-check pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault5"
              />
              <label class="form-check-label" for="flexCheckDefault5">
                Default checkbox
              </label>
            </div>
          </div>
          <div className="pt-2">
            <b>ĐƠN VỊ VẬN CHUYỂN</b>
            <div class="form-check pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault6"
              />
              <label class="form-check-label" for="flexCheckDefault6">
                Default checkbox
              </label>
            </div>
          </div>
          <div className="pt-2">
            <b>THƯƠNG HIỆU</b>
            <div class="form-check pt-2">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault7"
              />
              <label class="form-check-label" for="flexCheckDefault7">
                Default checkbox
              </label>
            </div>
          </div>
          <div>
            <div className="pt-2">
              <b>KHOẢNG GIÁ</b>
              <div className="pt-2">
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
                  maxlength="12"
                  name="value1"
                  value={sortSlary.value1}
                  onChange={(e) => onChange(e)}
                  // onkeypress={(event) => isNumberKey(event)}
                  style={{ width: "100px", height: "35px" }}
                />
                {" - "}
                <input
                  className="sort-salary"
                  type="text"
                  placeholder=" Đến"
                  maxlength="12"
                  size="20"
                  name="value2"
                  value={sortSlary.value2}
                  onChange={(e) => onChange(e)}
                  style={{ width: "100px", height: "35px" }}
                />
              </div>
            </div>
            <button
              className="btn mt-3"
              style={{ backgroundColor: Color.tanhide }}
            >
              Áp Dụng
            </button>
          </div>
          <div className="pt-2">
            <b>TÌNH TRẠNG</b>
            <div class="form-check pt-2">
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
            <div class="form-check pt-2">
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
          <div className="pt-2">
            <b>ĐÁNH GIÁ</b>
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
              className="btn mt-4"
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
        <div class="col-10">
          <div className="card sort-card mb-2">
            <button
              className="btn btn-outline-dark btn-sort"
              style={
                sortTab == "popular"
                  ? {
                      width: "fit-content",
                      backgroundColor: "#F69756",
                      color: "black",
                    }
                  : { width: "fit-content", backgroundColor: "white" }
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
                      width: "fit-content",
                      backgroundColor: "#F69756",
                      color: "black",
                    }
                  : { width: "fit-content", backgroundColor: "white" }
              }
              onClick={() => setSortTab("newest")}
            >
              Mới Nhất
            </button>
            <button
              className="btn btn-outline-dark btn-sort"
              style={
                sortTab == "selling"
                  ? {
                      width: "fit-content",
                      backgroundColor: "#F69756",
                      color: "black",
                    }
                  : { width: "fit-content", backgroundColor: "white" }
              }
              onClick={() => setSortTab("selling")}
            >
              Bán Chạy
            </button>
            <select
              class="form-select select-sort"
              aria-label="Default select example"
              style={{ width: "fit-content", margin: "5px" }}
            >
              <option selected>Giá</option>
              <option value="1">Từ thấp tới cao</option>
              <option value="2">Từ cao tới thấp</option>
            </select>
          </div>
          <div className="product-card">
            <div className="row g-0">
              {currentPosts.map((data) => (
                <Product data={data} />
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-center mt-5">
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
  );
}

export default ProductList;
