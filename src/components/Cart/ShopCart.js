import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';

function ShopCart({ item, checkAll, setCheckAll, getCartList, checkOutList, setCheckOutList }) {
  const [checkAllShop, setCheckAllShop] = useState(checkAll);

  useEffect(() => {
    setCheckAllShop(checkAll)
  }, [checkAll]);

  useEffect(() => {
    if (checkAllShop === false) {
      setCheckAll(checkAllShop);
    }
  }, [checkAllShop]);

  return (
    <div className="aCSbhb">
      <div className="_3ApheT -AIs4J">
        <div className="_2zUYwP">
          <div className="_3HHh5A">
            <label className="stardust-checkbox">
              <input
                className="stardust-checkbox__box"
                type="checkbox"
                // id="checkAllShop"
                checked={checkAllShop}
                onChange={() => setCheckAllShop(!checkAllShop)}
              />
            </label>
          </div>
          <label className="eQP4g3">
            <span style={{ marginLeft: '10px' }}>{item.shopName}</span>
          </label>
          <button className="_13iGI_">
            <svg viewBox="0 0 16 16" className="shopee-svg-icon _2KYoW7 "></svg>
          </button>
          <div className="_10IR5M"></div>
        </div>
      </div>
      <div className="_2qN5oG">
        {item.cartObjs.map((item) => (
          <CartItem
            item={item}
            checkAllShop={checkAllShop}
            setCheckAllShop={setCheckAllShop}
            getCartList={getCartList}
            checkOutList={checkOutList}
            setCheckOutList={setCheckOutList}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopCart;
