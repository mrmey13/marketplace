import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cs from '../../const';

import './Cart.css';
import './Sp.css';
import ShopCart from './ShopCart';

const GET_CART_LIST_URL = cs.BaseURL + '/api/buyer/cart/list';

function Cart() {
  useEffect(() => {
    getCartList();
  }, []);

  const [shopCart, setShopCart] = useState([]);

  const getCartList = async () => {
    try {
      const res = await axios({
        method: 'GET', 
        url: GET_CART_LIST_URL,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
      });
      if (res.data.error_code == 0) {
        setShopCart(res.data.data.shopCarts);
      }
    } catch (error) {}
  };

  return (
    <div id="main">
      <div>
        <div className="shopee-progress-bar shopee-progress-bar--reset"></div>
        <div style={{ display: 'content' }}>
          <div className="_164M6a">
            <div>
              <div className="cart-page-header-wrapper container-wrapper">
                <div className="container">
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="cart-page-header">
                      <a className="cart-page-logo" href="/">
                        <div className="cart-page-logo__page-name">
                          Giỏ hàng
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container">
                <div
                  role="main"
                  className="_1nft6V"
                  style={{ marginBottom: '0px' }}
                >
                  <div className="_1nrPtQ">
                    <div className="_1zPSKE">
                      <label className="stardust-checkbox">
                        <input
                          className="stardust-checkbox__input"
                          type="checkbox"
                        />
                        <div className="stardust-checkbox__box"></div>
                      </label>
                    </div>
                    <div className="_27GGo9">Sản phẩm</div>
                    <div className="_3hJbyz">Đơn giá</div>
                    <div className="_155Uu2">Số lượng</div>
                    <div className="_10ZkNr">Số tiền</div>
                    <div className="_1coJFb">Thao tác</div>
                  </div>
                  {shopCart.map((item) => (
                    <ShopCart item={item} />
                  ))}
                  <div className="_2jol0L _3GVi82">
                    <div className="_1ri0rT _3c0xgj"></div>
                    <div className="_1ri0rT _2amAdj"></div>
                    <div className="W2HjBQ zzOmij">
                      <div className="_1E2dyV">
                        <label className="stardust-checkbox">
                          <input
                            className="stardust-checkbox__input"
                            type="checkbox"
                          />
                          <div className="stardust-checkbox__box"></div>
                        </label>
                      </div>
                      <button className="_28e55C clear-btn-style">
                        Chọn tất cả (4)
                      </button>
                      <button className="clear-btn-style j9RJQY">Xóa</button>
                      <div className="_2ntEgZ"></div>
                      <div className="_2BT_es">
                        <div className="_3BPMNN">
                          <div className="_2LMWss">
                            <div className="_10A7e2">
                              Tổng thanh toán (0 Sản phẩm):
                            </div>
                            <div className="nBHs8H">₫0</div>
                          </div>
                        </div>
                        <div className="_1TwgPm"></div>
                      </div>
                      <button className="shopee-button-solid shopee-button-solid--primary ">
                        <span className="kcsswk">Mua hàng</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
          <div className="qgeUgW" id="BackgroundImagePortalAnchor"></div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
