import axios from "axios";
import React, { useEffect, useState } from "react";
import cs from "../../const";
import NormalTable from "./NormalTable";
import Pagination from "../shared/Pagination";
import { PAGE_SIZE } from "./AllProduct";

const SOLDOUT_STATUS_CODE = 20;
const productListURL = cs.BaseURL + "/api/seller/product/list";

const SoldOutProduct = () => {
  const [productData, setProductData] = useState([]);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState();

  const loadProductData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${productListURL}?size=${pageSize}&page=${currentPage}&status=${SOLDOUT_STATUS_CODE}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        }
      });
      // console.log("all-product", response.data);
      setProductData(response.data.data);
      setTotalItems(response.data.total_count)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    loadProductData();
  }, [currentPage])

  return <div>
    <NormalTable data={productData} loadProductData={loadProductData} />
    <div className="d-flex justify-content-end">
      <Pagination
        ItemsPerPage={pageSize}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalItems={totalItems}
      />
    </div>
  </div>
}

export default SoldOutProduct;