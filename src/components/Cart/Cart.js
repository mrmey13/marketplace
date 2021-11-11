import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cs from '../../const';

import './Cart.css';
import './Sp.css';
import ShopCart from './ShopCart';

const GET_CART_LIST_URL = cs.BaseURL + '/api/buyer/cart/list';
const CHECK_OUT_URL = cs.BaseURL + '/api/buyer/cart/checkout';

function Cart(props) {
  const { history } = props;
  const [checkOutList, setCheckOutList] = useState([]);
  // [{id: 160,productVariationId: 8, cost:15000, quantity: 2},..]

  const [checkAll, setCheckAll] = useState(false);

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
    } catch (error) { }
  };

  const checkOut = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: CHECK_OUT_URL,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: {
          cartItems: getCheckOutVariationList()
        }
      })
      // console.log(response.data)
      if (response.data.error_code === 0) {
        history.push("/place-order", { orderId: response.data.data })
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getCheckOutVariationList = () => {
    let cartItems = []
    for (let i of checkOutList) {
      cartItems.push({
        productVariationId: i.productVariationId,
        quantity: i.quantity
      })
    }
    // console.log("tmp", cartItems)
    return cartItems;
  }

  const [checkOutInfo, setCheckOutInfo] = useState({ totalProduct: 0, totalPrice: 0 });

  useEffect(() => {
    let tmpQuantity = 0;
    let tmpPrice = 0;
    for (let e of checkOutList) {
      tmpQuantity += e.quantity;
      tmpPrice += e.price * e.quantity;
    }
    setCheckOutInfo({
      totalProduct: tmpQuantity,
      totalPrice: tmpPrice
    })
  }, [checkOutList])

  return (
    <div id="main">
      <div>
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
                          className="stardust-checkbox__box"
                          type="checkbox"
                          checked={checkAll}
                          onChange={() => setCheckAll(!checkAll)}
                        />
                      </label>
                    </div>
                    <div className="_27GGo9">Sản phẩm</div>
                    <div className="_3hJbyz">Đơn giá</div>
                    <div className="_155Uu2">Số lượng</div>
                    <div className="_10ZkNr">Số tiền</div>
                    <div className="_1coJFb">Thao tác</div>
                  </div>
                  {shopCart.map((item) => (
                    <ShopCart
                      item={item}
                      checkAll={checkAll}
                      setCheckAll={setCheckAll}
                      getCartList={getCartList}
                      checkOutList={checkOutList}
                      setCheckOutList={setCheckOutList}
                    />
                  ))}
                  <div className="_2jol0L _3GVi82">
                    <div className="_1ri0rT _3c0xgj"></div>
                    <div className="_1ri0rT _2amAdj"></div>
                    <div className="W2HjBQ zzOmij">
                      <div className="_1E2dyV">
                        <input
                          className="stardust-checkbox__box"
                          type="checkbox"
                          id="check-all"
                          checked={checkAll}
                          onChange={() => setCheckAll(!checkAll)}
                        />
                      </div>
                      <label className="_28e55C clear-btn-style" htmlFor="check-all">
                        Chọn tất cả
                      </label>
                      <div className="_2ntEgZ"></div>
                      <div className="_2BT_es">
                        <div className="_3BPMNN">
                          <div className="_2LMWss">
                            <div className="_10A7e2">
                              Tổng thanh toán ({checkOutInfo.totalProduct} Sản phẩm):
                            </div>
                            <div className="nBHs8H">₫ {checkOutInfo.totalPrice}</div>
                          </div>
                        </div>
                        <div className="_1TwgPm"></div>
                      </div>
                      <button
                        className="shopee-button-solid shopee-button-solid--primary "
                        onClick={checkOut}
                      >
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
