import React, { useState } from "react";
import Product from "../ProductList/Product";
function ProductListHomePage() {
  const [listType, setListType] = useState(1);
  const List = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  return (
    <div className="container homepage-product-list-container">
      <div
        className="container homepage-product-list-tab"
        style={{
          backgroundColor: "white",
          height: "85px",
          fontSize: "25px",
          paddingTop: "20px",
        }}
      >
        <button
          className={
            listType == 1
              ? "btn btn-outline-none tab-button active-tab"
              : "btn btn-outline-none tab-button"
          }
          onClick={() => setListType(1)}
        >
          GỢI Ý HÔM NAY
        </button>
        <button
          className={
            listType == 2
              ? "btn btn-outline-none tab-button active-tab"
              : "btn btn-outline-none tab-button"
          }
          onClick={() => setListType(2)}
        >
          SIÊU SALE 10 THÁNG 10
        </button>
      </div>
      <div className="container homepage-product-list-product-list mt-3 p-0">
        <div className="row homepage-product-list-product-list-row">
          {List.map((item) => (
            <Product useFor="none" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductListHomePage;
