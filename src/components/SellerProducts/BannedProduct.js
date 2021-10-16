import axios from "axios";
import React, { useEffect, useState } from "react";
import cs from "../../const";
import NormalTable from "./NormalTable";

const BANNED_STATUS_CODE = 4; // 5
const productListURL = cs.BaseURL + "/api/seller/product/list";

const BannedProduct = () => {
  const [productData, setProductData] = useState([]);
  const [pageSize, setPageSize] = useState(24);
  const [currentPage, setCurrentPage] = useState(1);

  const loadProductData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${productListURL}?size=${pageSize}&page=${currentPage}&status=${BANNED_STATUS_CODE}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        }
      });
      console.log("all-product", response.data);
      setProductData(response.data.data);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadProductData();
  }, [currentPage])

  return <div>
    <NormalTable data={productData} />
  </div>
}

export default BannedProduct;