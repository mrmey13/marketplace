import React, { useEffect, useState } from "react";
import { withTranslation } from "i18next";
import cs from "../../const";
import axios from "axios";
import Order from "./Order";
import { makeStyles, Modal } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    // padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: "absolute",
    width: "60vw",
    minWidth: "50em",
    maxHeight: "95vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #888",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const loadOrderListUrl = cs.BaseURL + "/api/buyer/order/list";
const getPaymentInfoUrl = cs.BaseURL + "/api/buyer/order/payment-info";
const confirmToPayUrl = cs.BaseURL + "/api/buyer/order/confirm-to-pay";
const Payment = () => {
  const classes = useStyles();
  const [orderList, setOrderList] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({});

  const [openModal, setOpenModal] = useState(false);

  const getPaymentInfo = async (orderId) => {
    try {
      const response = await axios({
        method: "GET",
        url: `${getPaymentInfoUrl}?maDonHang=${orderId}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      })
      // console.log(response.data.data);
      setPaymentInfo(response.data.data);
      setOpenModal(true);
    } catch (error) {
      console.log(error)
    }
  }

  const confirmToPay = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${confirmToPayUrl}?maDonHang=${paymentInfo.orders[0].maDonHang}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }
      })
      console.log(response.data);
      if (response.data.error_code === 0) {
        loadOrderList();
        setOpenModal(false);
        alert("Success");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const closeModal = () => {
    setPaymentInfo({});
    setOpenModal(false);
  }

  const loadOrderList = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: loadOrderListUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token"),
        }, data: {
          statusId: 3,
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
    loadOrderList();
  }, [])


  return <div>
    <div style={{ display: 'content' }}>
      <div className="_164M6a">
        <div className="cart-page-header-wrapper container-wrapper">
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div className="cart-page-header">
                <a className="cart-page-logo" href="/">
                  <div className="cart-page-logo__page-name">
                    Thanh to??n
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
              <div className="_1zPSKE"></div>
              <div className="_27GGo9">S???n ph???m</div>
              <div className="_3hJbyz">????n gi??</div>
              <div className="_155Uu2">S??? l?????ng</div>
              <div className="_10ZkNr ms-5">S??? ti???n</div>
            </div>
            {
              orderList.map(item => <div className="mb-3">
                <Order
                  item={item}
                />
                <div className="_1nrPtQ">
                  <div className="W2HjBQ justify-content-end">
                    <button
                      className="shopee-button-solid shopee-button-solid--primary"
                      style={{ width: "150px", height: "40px" }}
                      onClick={() => getPaymentInfo(item.maDonHang)}
                    >
                      <span className="kcsswk">Thanh To??n</span>
                    </button>
                  </div>
                </div>
              </div>
              )
            }
          </div>
        </div>
      </div>
    </div>

    <Modal
      open={openModal}
      onClose={closeModal}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      className={classes.modal}
    >
      <div className={classes.paper}>
        <h5 className="card-title">
          Th??ng tin thanh to??n
        </h5>
        <div className="mb-4">
          <div>M?? ????n H??ng: {paymentInfo.orders && paymentInfo.orders[0].maDonHang}</div>
          <div>Th??nh ti???n: {paymentInfo.totalPrice}??</div>
          <div>Shop: {paymentInfo.shop && paymentInfo.shop.shopName}</div>
          <div>Ng??n h??ng: </div>
          <div>{paymentInfo.shopBankAccounts && paymentInfo.shopBankAccounts.map((item, index) => (
            <div>
              <div>{`${index + 1}. ${item.bankAccountHolderName}`}</div>
              <div>{`Ng??n h??ng: ${item.bankName}`}</div>
              <div>{`S??? t??i kho???n: ${item.bankAccountNumber}`}</div>
            </div>
          ))}
          </div>
        </div>
        <div className="d-flex justify-content-end px-2">
          <button
            className="btn btn-sm btn-danger me-1"
            style={{ width: "100px" }}
            onClick={() => { confirmToPay(); }}
          >
            X??c nh???n
          </button>
          <button
            type="reset"
            className="btn btn-sm btn-outline-secondary border border-secondary"
            style={{ width: "100px" }}
            onClick={closeModal}
          >
            ????ng
          </button>
        </div>
      </div>
    </Modal>

  </div>
}

export default Payment;