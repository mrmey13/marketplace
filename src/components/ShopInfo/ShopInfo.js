import React, { useState } from "react";
import { withTranslation } from "react-i18next";
import color from "../../theme/color";
import cs from "../../const";
import { Link } from "react-router-dom";
import Product from "../ProductList/Product";

const list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const ShopInfo = (props) => {
  console.log(props.match)
  const [sortTab, setSortTab] = useState("");
  return <div className="container-fluid" style={{ width: "90%", minWidth: "1200px" }} >
    <div className="card card-body shadow-sm mb-3">
      <div className="row">
        <div
          className=""
          style={{
            maxWidth: "400px",
            height: "150px",
            backgroundImage: `url("${"aaa"}")`,
            backgroundColor: color.jaffa,
            margin: "5px",
            borderRadius: "5px"
          }}>
          <div className="d-flex align-items-center" style={{ height: "100%" }}>
            <div className="" style={{ width: "30%", height: "100px" }}>
              <img
                className="border rounded-circle"
                width="100px"
                height="100px"
                src={`${cs.MediaURL}/media/${"shopDetail.avatarPath"}`}
                style={{}}
              // alt="shop avatar"
              />
            </div>
            <div className="" style={{ width: "70%" }}>
              <div className="row-title d-none d-sm-block">
                <h6 className="mb-0">shopDetail.shopName</h6>
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
            Sản phẩm: __
          </div>
          <div className="col">
            Đánh giá:
          </div>
          <div className="col">
            Theo dõi:
          </div>
          <div className="col">
            Lượt theo dõi:
          </div>
          <div className="col">
            Tham gia:
          </div>
        </div>
      </div>
    </div>

    <div className="card card-body shadow-sm mb-2">
      <div className="text-uppercase mb-1" style={{ color: color.tanhide, fontSize: "17px" }}>Sản phẩm nổi bật</div>
      <div className="row">
        {list.map((item) => <div className="col-2 p-0">
          <Product useFor="buyer" data={item} />
        </div>)}
      </div>
    </div>

    <div className="card card-body shadow-sm mb-2">
      <div className="row">
        <div className="col-2">
          <div className="text-uppercase" style={{ fontSize: "16px" }}>DANH MUC</div>
          {list.map(item => <div>
            {`danh muc ${item}`}
          </div>)}
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
          </div>
          <div className="row row-cols-5">
            {list.map((item) => <div className="col p-0">
              <Product useFor="buyer" data={item} />
            </div>)}
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default withTranslation()(ShopInfo);