import { height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import cs from "../../const";
import { useTranslation } from 'react-i18next';
import { PAGE_SIZE } from "./AllProduct";
import { makeStyles, Modal } from "@material-ui/core";
import axios from "axios";

const deleteProductUrl = cs.BaseURL + "/api/seller/product/delete";

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

const NormalTable = ({ data, loadProductData }) => {
  const classes = useStyles();

  const [openModal, setOpenModal] = useState(false);

  const { t, i18n } = useTranslation();
  const [checkAll, setCheckAll] = useState(false)
  const [check, setCheck] = useState(new Array(PAGE_SIZE).fill(false));
  const changeCheckAll = () => {
    if (checkAll) {
      setCheck(check.fill(false));
    } else {
      setCheck(check.fill(true));
    }
    setCheckAll(!checkAll);
  }

  const changeCheck = (index) => {
    let tmp = [...check];
    if (tmp[index]) {
      setCheckAll(false);
    }
    tmp[index] = !tmp[index];
    setCheck(tmp);
  }

  const [chosenArray, setChosenArray] = useState([]);

  const changeChosenArray = () => {
    let tmp = [];
    for (let i in data) {
      if (check[i]) {
        tmp.push(data[i].productId);
      }
    }
    setChosenArray(tmp);
  }

  useEffect(() => {
    changeChosenArray();
  }, [checkAll, check])

  const delProduct = async () => {
    try {
      const response = await axios({
        method: "POST",
        url: deleteProductUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: {
          productIds: chosenArray
        }
      });
      // console.log(response.data);
      if (response.data.error_code === 0) {
        loadProductData();
        setChosenArray([]);
        setOpenModal(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setCheckAll(false);
    setCheck(check.fill(false));
    setChosenArray([])
  }, [data])

  return <div>
    <div className="card">
      <div className="card-header">
        <div className="row text-muted" style={{ fontSize: "14px" }}>
          <div className="border-start" style={{ width: "4%" }}>
            <input
              type="checkbox"
              checked={checkAll}
              onChange={changeCheckAll}
            />
          </div>
          <div className="border-start" style={{ width: "29%" }}>
            {t('product.product_name')}
          </div>
          <div className="border-start" style={{ width: "10%" }}>
            {t('product.sku')}
          </div>
          <div className="border-start" style={{ width: "15%" }}>
            {t('product.variation')}
          </div>
          <div className="border-start" style={{ width: "15%" }}>
            {t('product.price')}
          </div>
          <div className="border-start" style={{ width: "10%" }}>
            {t('product.stock')}
          </div>
          <div className="border-start" style={{ width: "10%" }}>
            {t('product.sale')}
          </div>
          <div className="border-start" style={{ width: "7%" }}>
            {/* Options */}
          </div>
        </div>
      </div>
      <div className="card-body pt-1">
        {data.map((item, index) =>
          <div className="row border-bottom" style={{ fontSize: "13px" }}>
            <div className="" style={{ width: "4%" }}>
              <input
                type="checkbox"
                className="mt-2"
                checked={check[index]}
                onChange={() => changeCheck(index)}
              />
            </div>
            <div className="d-flex justify-content-start" style={{ width: "29%" }}>
              <div className="border my-1" style={{ width: "80px", height: "60px" }}>
                <Link
                  className="fw-bold text-dark"
                  to={`/product/edit/${item.productId}`}
                >
                  <img
                    src={`${cs.MediaURL}/media/${item.productImageCover}`}
                    style={{
                      width: "80px",
                      height: "60px",
                      objectFit: "cover"
                    }}
                  />
                </Link>
              </div>
              <div className="m-1 ps-2">
                <Link
                  className="fw-bold text-dark"
                  to={`/product/edit/${item.productId}`}
                >
                  {item.productName}
                </Link>
              </div>
            </div>
            <div className="row m-0 p-0" style={{ width: "60%" }}>
              {item.inventoryArray.length && <>
                <div className="" style={{ width: "16.67%" }}>
                  {item.SKU || "-"}
                </div>
                <div className="" style={{ width: "25%" }}>
                  {item.variations || "-"}
                </div>
                <div className="" style={{ width: "25%" }}>
                  {item.price}
                </div>
                <div className="" style={{ width: "16.66%" }}>
                  {item.inventoryCount ? item.inventoryCount : <span className="text-danger fw-bold">Sold out</span>}
                </div>
                <div className="" style={{ width: "16.66%", height: "60px" }}>
                  {item.soldCount}
                </div>
              </>}
              {item.inventoryArray.map(i => <>
                <div className="" style={{ width: "16.67%" }}>
                  {i.sku || "-"}
                </div>
                <div className="" style={{ width: "25%" }}>
                  {i.variationName || "-"}
                </div>
                <div className="" style={{ width: "25%" }}>
                  {i.price || "-"}
                </div>
                <div className="" style={{ width: "16.66%" }}>
                  {i.inventoryCount ? i.inventoryCount : <span className="text-danger fw-bold">Sold out</span>}
                </div>
                <div className="" style={{ width: "16.66%", height: "60px" }}>
                  {i.sales || "-"}
                </div>
              </>)}
            </div>
            <div className="d-flex align-items-start" style={{ width: "7%" }}>
              <Link
                className="btn link-btn"
                to={`/product/edit/${item.productId}`}
              >
                {t('commons.button.edit')}
              </Link>
            </div>
          </div>
        )}
        {!data.length && <div className="row border-bottom" style={{ fontSize: "15px" }}>No Product</div>}
      </div>
    </div>
    <div hidden={!chosenArray.length}>
      <div
        className="d-flex align-items-baseline my-2 mx-4"
        hidden={!chosenArray.length}
      >
        <div className="d-flex" >
          <input
            type="checkbox"
            id="select-all"
            checked={checkAll}
            onChange={changeCheckAll}
          />
          <label htmlFor="select-all" className="ms-3">
            {t("all_products.message.select_all")}
          </label>
        </div>

        <div className="ms-auto">
          {t("all_products.message.choose_product", { quantity: chosenArray.length })}
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="btn btn-sm btn-outline-secondary border border-secondary ms-3"
          style={{ width: "65px" }}
        >
          {t("commons.button.delete")}
        </button>
      </div>
    </div>

    <Modal
      open={openModal}
      onClose={() => setOpenModal(false)}
      aria-labelledby="server-modal-title"
      aria-describedby="server-modal-description"
      className={classes.modal}
    >
      <div className={classes.paper}>
        <h4 className="card-title">
          {t("all_products.tabs.delete_product")}
        </h4>
        <div className="mb-4">
          {t("all_products.message.delete_product", { quantity: chosenArray.length })}
        </div>

        <div className="d-flex justify-content-end px-2">
          <button
            className="btn btn-sm btn-danger me-1"
            style={{ width: "65px" }}
            onClick={() => { delProduct() }}
          >
            {t("commons.button.delete")}
          </button>
          <button
            type="reset"
            className="btn btn-sm btn-outline-secondary border border-secondary"
            style={{ width: "65px" }}
            onClick={() => setOpenModal(false)}
          >
            {t("commons.button.close")}
          </button>
        </div>
      </div>
    </Modal>
  </div>
}

export default NormalTable;