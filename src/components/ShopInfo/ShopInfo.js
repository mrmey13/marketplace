import React, { useEffect, useState } from "react";
import { withTranslation } from "react-i18next";
import color from "../../theme/color";
import cs from "../../const";
import { Link } from "react-router-dom";
import Product from "../ProductList/Product";
import Pagination from "../shared/Pagination";
import axios from "axios";

const list = [1, 2, 3, 4, 5, 6, 7];
const loadProductListUrl = cs.BaseURL + "/api/buyer/product/list";
const shopDetailUrl = cs.BaseURL + '/api/buyer/shop/info?';

const FEATURED_PRODUCT_SIZE = 6 * 2;
const PRODUCT_BY_CATEGORY_SIZE = 5 * 3;

const ShopInfo = (props) => {
  const { match } = props;
  console.log(props.match)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const itemsPerPage = PRODUCT_BY_CATEGORY_SIZE;

  const [featuredProductList, setFeaturedProductList] = useState([]);
  const [productByCategoryList, setProductByCategoryList] = useState([]);

  const [shopDetail, setShopDetail] = useState({});

  const loadShopDetail = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${shopDetailUrl}shopId=${match.params.shopCode}`
      });
      console.log("shopInfo", response.data);
      setShopDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadFeatureProductList = async (conditions) => {
    const response = await axios({
      method: "post",
      url: `${loadProductListUrl}`,
      //   headers: {
      //     Authorization: localStorage.getItem(cs.System_Code + "-token"),
      //   },
      data: {
        //categoryLevel1Id: 100017,
        page: 1,
        size: FEATURED_PRODUCT_SIZE,
      },
    });
    setFeaturedProductList(response.data.data);
    setTotalItems(response.data.total_count);
    // console.log("res", response.data);
  };

  const loadProductByCategoryList = async (conditions) => {
    const response = await axios({
      method: "post",
      url: `${loadProductListUrl}`,
      //   headers: {
      //     Authorization: localStorage.getItem(cs.System_Code + "-token"),
      //   },
      data: {
        //categoryLevel1Id: 100017,
        page: currentPage,
        size: itemsPerPage,
      },
    });
    setProductByCategoryList(response.data.data);
    setTotalItems(response.data.total_count);
    // console.log("res", response.data);
  };

  useEffect(() => {
    loadFeatureProductList();
    loadShopDetail();
  }, [match.params.shopCode]);

  useEffect(() => {
    loadProductByCategoryList();
  }, [currentPage, match.params.shopCode]);

  const [sortTab, setSortTab] = useState("");
  return <div className="container-fluid" style={{ width: "90%", minWidth: "1200px" }} >
    <div className="card card-body shadow-sm mb-3">
      <div className="row">
        <div
          className=""
          style={{
            maxWidth: "400px",
            height: "150px",
            backgroundImage: `url("${cs.MediaURL}/media/${shopDetail.coverPath}")`,
            backgroundSize: "400px 150px",
            // backgroundColor: color.jaffa,
            margin: "5px",
            borderRadius: "5px"
          }}>
          <div className="d-flex align-items-center" style={{ height: "100%" }}>
            <div className="" style={{ width: "30%", height: "100px" }}>
              <img
                className="border rounded-circle"
                width="100px"
                height="100px"
                src={`${cs.MediaURL}/media/${shopDetail.avatarPath}`}
                style={{}}
              // alt="shop avatar"
              />
            </div>
            <div className="" style={{ width: "70%" }}>
              <div className="row-title d-none d-sm-block">
                <h6 className="mb-0">{shopDetail.shopName}</h6>
                <sub>Online:</sub>
              </div>
              <div className="card-body-bottom d-xl-flex mt-2 d-flex">
                <button className="btn btn-light border p-1 col-4 mx-1">
                  Theo dõi
                </button>
                <button className="btn btn-light border p-1 col-4 mx-1">
                  Chat
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="col-7 mx-auto row row-cols-2 mt-3 py-4" style={{ fontSize: "14px" }}>
          <div className="col">
            Sản phẩm: {shopDetail.numberOfProducts || "-"}
          </div>
          <div className="col">
            Đánh giá: {shopDetail.averageRating}
          </div>
          <div className="col">
            Theo dõi: {shopDetail.followingCount}
          </div>
          <div className="col">
            Lượt theo dõi: {shopDetail.numberOfFollowers}
          </div>
          <div className="col">
            Tham gia: {shopDetail.createdTime &&
              shopDetail.createdTime.slice(8, 10) + ' - '
              + shopDetail.createdTime.slice(5, 7) + ' - '
              + shopDetail.createdTime.slice(0, 4)}
          </div>
        </div>
      </div>
    </div>

    <div className="card card-body shadow-sm mb-2">
      <div className="text-uppercase mb-1" style={{ color: color.tanhide, fontSize: "17px" }}>Sản phẩm nổi bật</div>
      <div className="row">
        {featuredProductList.map((item) => <div className="col-2 p-0">
          <Product useFor="buyer" data={item} />
        </div>)}
      </div>
    </div>

    <div className="card card-body shadow-sm mb-2">
      <div className="row">
        <div className="col-2">
          <div className="text-uppercase border-bottom" style={{ fontSize: "16px" }}>DANH MUC</div>
          {list.map(item => <button className="button-category">
            {`danh muc ${item}`}
          </button>)}
        </div>
        <div className="col-10">
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
              {/* <input className="form-control form-control-sm"  value="0" /> */}
              <select
                className="form-control form-control-sm my-1"
              >
                <option selected>Giá</option>
                <option value="1">Từ thấp tới cao</option>
                <option value="2">Từ cao tới thấp</option>
              </select>
            </div>
            <div className="mt-2">
              <Pagination ItemsPerPage={itemsPerPage} totalItems={totalItems} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            </div>
          </div>
          <div className="row row-cols-5">
            {productByCategoryList.map((item) => <div className="col p-0">
              <Product useFor="buyer" data={item} />
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default withTranslation()(ShopInfo);