import React, { useEffect, useState } from "react";
import { withTranslation } from "i18next";
import cs from "../../const";
import axios from "axios";
import Order from "./Order";

const loadAddressesDataUrl = cs.BaseURL + "/api/buyer/address/list";
const loadOrderListUrl = cs.BaseURL + "/api/buyer/order/list";
const placeOrderUrl = cs.BaseURL + "/api/buyer/order/place-order";

const PlaceOrder = (props) => {
  const { location, history } = props;
  // console.log(location)
  const [addressId, setAddressId] = useState("");
  const [orderId, setOrderId] = useState([""]);

  const getPlaceOrderItems = () => {
    let placeOrderItems = [];
    for (let e of orderId) {
      placeOrderItems.push({
        maDonHang: e,
        buyerAddressId: parseInt(addressId)
      })
    }
    return placeOrderItems;
  }

  const placeOrder = async () => {
    if (!addressId) {
      alert("Hãy chọn địa chỉ!")
      return
    }
    try {
      const response = await axios({
        method: "POST",
        url: placeOrderUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }, data: {
          placeOrderItems: getPlaceOrderItems()
        }
      })
      // console.log(response.data);
      history.push("/payment");
    } catch (error) {
      console.log(error);
    }
  }

  const [addressList, setAddressList] = useState([]);
  const [orderList, setOrderList] = useState([]);

  const loadAddressesData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${loadAddressesDataUrl}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      });
      // console.log("list-addr", response.data);
      setAddressList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const loadOrderList = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: loadOrderListUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }, data: {
          maDonHang: orderId,
          statusId: 0,
          page: 0,
          size: 0
        }
      })
      // console.log(response.data)
      setOrderList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    loadAddressesData();
    loadOrderList();
    if (location.state && location.state.orderId) {
      setOrderId(location.state.orderId);
    }
  }, [location.state])


  return <div>
    {/* <div className="shopee-progress-bar shopee-progress-bar--reset">sasdasda</div> */}
    <div style={{ display: 'content' }}>
      <div className="_164M6a">
        <div className="cart-page-header-wrapper container-wrapper">
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="cart-page-header">
                <a className="cart-page-logo" href="/">
                  <div className="cart-page-logo__page-name">
                    Đặt hàng
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
            <div className="" style={{
              boxShadow: "0 1px 1px 0 rgba(0, 0, 0, .05)",
              borderRadius: ".125rem",
              borderRadius: "3px",
              fontSize: "14px",
              background: "#fff",
              textTransform: "capitalize",
              padding: "20px",
            }}
            >
              <div>
                <div style={{ color: "#ee4d2d", fontSize: "1.125rem", marginBottom: "5px" }}>
                  Địa chỉ nhận hàng
                </div>
              </div>
              <select
                className="form-control"
                value={addressId}
                onChange={(event) => setAddressId(event.target.value)}
              >
                <option value="" disabled>Chọn địa chỉ</option>
                {addressList.map(item => <option
                  value={item.id}
                >
                  {`${item.fullName} - `}
                  {item.telephone && `${item.telephone} - `}
                  {item.fullAddress && `${item.fullAddress}, `}
                  {`${item.communeName}, ${item.districtName}, ${item.provinceName}`}
                  {/* <span className="fw-bold">{item.fullName}</span> */}
                </option>)}
              </select>
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
              <div className="_1zPSKE"></div>
              <div className="_27GGo9">Sản phẩm</div>
              <div className="_3hJbyz">Đơn giá</div>
              <div className="_155Uu2">Số lượng</div>
              <div className="_10ZkNr ms-5">Số tiền</div>
            </div>
            {
              orderList.map(item => <Order
                item={item}
              />)
            }
            <div className="_2jol0L _3GVi82">
              <div className="W2HjBQ zzOmij justify-content-end">
                <button
                  className="shopee-button-solid shopee-button-solid--primary "
                  onClick={() => placeOrder()}
                >
                  <span className="kcsswk">Đặt hàng</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default PlaceOrder;