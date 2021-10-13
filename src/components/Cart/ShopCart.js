import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';

function ShopCart({ item }) {
  console.log(item);

  const [cartItem, setCartItem] = useState({});

  return (
    <div className="aCSbhb">
      <div className="_3ApheT -AIs4J">
        <div className="_2zUYwP">
          <div className="_3HHh5A">
            <label className="stardust-checkbox">
              <input className="stardust-checkbox__input" type="checkbox" />
              <div className="stardust-checkbox__box"></div>
            </label>
          </div>
          <a
            className="eQP4g3"
            href="/dancameras?categoryId=100635&amp;entryPoint=cart&amp;itemId=2302298723"
          >
            <div className="_2KLJmk">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="62"
                height="16"
                fill="none"
              ></svg>
            </div>
            <span style={{ marginLeft: '10px' }}>{item.shopName}</span>
          </a>
          <button className="_13iGI_">
            <svg viewBox="0 0 16 16" className="shopee-svg-icon _2KYoW7 "></svg>
          </button>
          <div className="_10IR5M"></div>
        </div>
      </div>
      <div className="_2qN5oG">
        {item.cartObjs.map((item) => (
          <CartItem item={item} />
        ))}
      </div>
    </div>
  );
}

export default ShopCart;
