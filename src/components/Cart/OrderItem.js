import React from "react";
import cs from "../../const";

const OrderItem = ({ item }) => {

  const mediaURL =
    item.productImages.length != 0
      ? `${cs.MediaURL}/media/${item.productImages[0].path}`
      : '';
  // console.log(item);
  return <div className="r2jApx">
    <div className="_216OLk MDvvnL">
      <div className="_1GcTXp">
        <div className="uUhc_B"></div>
        <div className="_2pPbjQ" style={{ opacity: "1" }}>
          <div className="YxpsCR">
            <a title={item.productName}>
              <div
                className="_3SWf-5 border"
                style={{ backgroundImage: `url(${mediaURL})` }}
              ></div>
            </a>
            <div className="_3OrWGt">
              <a className="_2fQT1K" title="" href="">
                {item.productName}
              </a>
              <div className="_2o95Vf"></div>
              <div className="_931iK8">
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div className="_30hIFE">
          <div className="_3b-8ro">
            <div className="ns42ir" role="button" tabindex="0">
              <div className="aXmvTj">
                Phân loại hàng: {item.variationName}
              </div>
              {/* <div className="GU_XoN"></div> */}
            </div>
          </div>
        </div>

        <div className="Ra8lP2">
          <div>
            <span className="_1CXksa">{item.price}</span>
          </div>
        </div>
        <div className="_2ZUrV7">
          <div className="eLoUcd shopee-input-quantity">
            {item.amount}
          </div>
        </div>
        <div className="dn3H7Y">
          <span>{item.price * item.amount}</span>
        </div>
      </div>
      <div className="_2aRlry"></div>
    </div>
  </div>
}

export default OrderItem;