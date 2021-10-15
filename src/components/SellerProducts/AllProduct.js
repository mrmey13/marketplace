import axios from "axios";
import React, { useEffect, useState } from "react";
import cs from "../../const";
import NormalTable from "./NormalTable";

const productListURL = cs.BaseURL + "/api/seller/product/list";

const AllProduct = () => {
  const [productData, setProductData] = useState([]);
  const [pageSize, setPageSize] = useState(24);
  const [currentPage, setCurrentPage] = useState(3);

  const loadProductData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${productListURL}?size=${pageSize}&page=${currentPage}`,
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
  }, [])

  return <div>
    <NormalTable data={productData} />
  </div>
}

export default AllProduct;