import React from "react";
import OrderItem from "./OrderItem";

const Order = ({ item }) => {
  // console.log(item)
  return <div className="aCSbhb">
    <div className="_3ApheT -AIs4J">
      <div className="_2zUYwP">
        <div className="_3HHh5A">

        </div>
        <label className="eQP4g3">
          <span style={{ marginLeft: '10px' }}>{item.maDonHang}</span>
        </label>
        <button className="_13iGI_">
          <svg viewBox="0 0 16 16" className="shopee-svg-icon _2KYoW7 "></svg>
        </button>
        <div className="_10IR5M"></div>
      </div>
    </div>
    <div className="_2qN5oG">
      {
        item.orderItems.map(item => <OrderItem item={item} />)
      }
    </div>
  </div>
}

export default Order;