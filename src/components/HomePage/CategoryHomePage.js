import React, { useState, useEffect } from "react";
import "./HomePage.css";
import Color from "../../theme/color";
import { Link } from "react-router-dom";
import axios from "axios";
import cs from "../../const";


function CategoryHomePage() {
  const List = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43,
  ];
  const [categoriesList, setCategoriesList] = useState([]);
  const loadCategoryList = async (conditions) => {
    const response = await axios({
      method: "get",
      url: `${cs.BaseURL}`+"/api/common/product/category/list",
      //   headers: {
      //     Authorization: localStorage.getItem(cs.System_Code + "-token"),
      //   },
    });
    if (
      response.data.error_desc === "Success" &&
      response.data.data.length !== 0
    ) {
      setCategoriesList(response.data.data);
    }
  };
  useEffect(() => {
    loadCategoryList();
  }, []);
  const [categoriesPerPage, setCategoriesPerPage] = useState(18);
  const [curPage, setCurPage] = useState(1);
  const indexOfLastCategory = curPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const curPosts = categoriesList.slice(
    indexOfFirstCategory,
    indexOfLastCategory
  );
  return (
    <div
      className="container homepage-category-container my-3 p-2"
      style={{
        backgroundColor: "white",
        height: "fit-content", //370
        fontSize: "25px",
        paddingTop: "10px",
        minWidth: "1320px",
      }}
    >
      <div
        className="container homepage-category-title-container mb-2"
        style={{
          height: "40px",
          borderBottom: "2px solid", //+ Color.tanhide,
          color: Color.tanhide,
          fontSize: "18px",
          fontWeight: "bold",
          minWidth: "1320px",
        }}
      >
        DANH MỤC
      </div>
      <div
        className="d-flex justify-content-between position-relative categories-list-path"
        // style={{ alignItems: "center" }}
      >
        <div className="d-flex flex-row start-path ">
          <button
            class={
              curPage === 1
                ? "btn btn-category opacity-0 category-next"
                : "btn btn-category category-next"
            }
            type="button"
            // style={{ marginTop: "100px" }}
            onClick={() => {
              if (curPage > 1) setCurPage(curPage - 1);
            }}
          >
            <ion-icon name="chevron-back-outline"></ion-icon>
          </button>
          <div className="homepage-category-item d-flex flex-row row mx-4">
            {curPosts.map((data) => (
              <div
                className="card homepage-category-card p-1"
                style={{
                  width: "123px",
                  height: "150px",
                  marginLeft: "10px",
                  marginBottom: "5px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Link
                  className="category-link flex-column"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    //color: Color.tanhide,
                    color: "black",
                    width: "123px",
                    height: "150px",
                  }}
                  to={
                    "/category/" +
                      data.categoryEngName +
                      "/" +
                      data.categoryId || "/"
                  }
                >
                  <img
                    className="homepage-category-image"
                    src={`${cs.MediaURL}/media/category_img/${JSON.parse(data.displayImagePath)[0]}.png`}
                    alt=""
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "60px",
                    }}
                  />
                  <div
                    className="homepage-category-name"
                    style={{
                      fontWeight: "bold",
                      fontSize: "14px",
                      marginTop: "40px",
                      textAlign: "center",
                    }}
                  >
                    {data.categoryVieName}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        <button
          class={
            curPage == Math.floor(List.length / categoriesPerPage)
              ? "btn btn-category opacity-0 "
              : "btn btn-category  "
          }
          type="button"
          //   style={{ marginTop: "100px" }}
          onClick={() => {
            if (curPage < Math.floor(List.length / categoriesPerPage))
              setCurPage(curPage + 1);
          }}
        >
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </button>
      </div>
    </div>
  );
}

export default CategoryHomePage;
