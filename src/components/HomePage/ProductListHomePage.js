import React, { useState, useEffect } from "react";
import Product from "../ProductList/Product";
import axios from "axios";
import cs from "../../const";
import Pagination from "../shared/Pagination";
import Pagin from "../shared/Pagin";

const loadProductListUrl = cs.BaseURL + "/api/buyer/product/list";

function ProductListHomePage() {

  const ITEMS_PER_PAGE = 30;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [listType, setListType] = useState(1);
  const [productList, setProductList] = useState([]);

  const loadProductList = async (conditions) => {
    const response = await axios({
      method: "post",
      url: `${loadProductListUrl}`,
      //   headers: {
      //     Authorization: localStorage.getItem(cs.System_Code + "-token"),
      //   },
      data: {
        //categoryLevel1Id: 100017,
        page: currentPage,
        size: ITEMS_PER_PAGE,
      },
    });
    setProductList(response.data.data);
    setTotalItems(response.data.total_count);
    console.log("res", response.data);
  };

  useEffect(() => {
    loadProductList();
  }, [currentPage]);

  return (
    <div
      className="container homepage-product-list-container"
      style={{ minWidth: "1320px", marginLeft: "27px" }}
    >
      <div
        className="container homepage-product-list-tab"
        style={{
          backgroundColor: "white",
          height: "85px",
          fontSize: "25px",
          paddingTop: "20px",
          minWidth: "1320px",
        }}
      >
        <button
          className={
            listType === 1
              ? "btn btn-outline-none tab-button active-tab"
              : "btn btn-outline-none tab-button"
          }
          onClick={() => setListType(1)}
          style={{ fontSize: "17px" }}
        >
          GỢI Ý HÔM NAY
        </button>
        {/* <button
          className={
            listType === 2
              ? "btn btn-outline-none tab-button active-tab"
              : "btn btn-outline-none tab-button"
          }
          onClick={() => setListType(2)}
          style={{ fontSize: "17px" }}
        >
          SIÊU SALE 10 THÁNG 10
        </button> */}
      </div>
      <div
        className="container homepage-product-list-product-list mt-3 p-0"
        style={{ minWidth: "1320px" }}
      >
        <div
          className="row homepage-product-list-product-list-row"
          style={{ minWidth: "1320px" }}
        >
          {productList.map((item) => (
            <div className="col-2 p-0">
              <Product useFor="buyer" data={item} />
            </div>
          ))}
        </div>
        <div className="d-flex justify-content-end">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            ItemsPerPage={ITEMS_PER_PAGE}
            totalItems={totalItems}
          />
        </div>

      </div>
    </div>
  );
}

export default ProductListHomePage;
