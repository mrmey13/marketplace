import { makeStyles, Snackbar } from "@material-ui/core";
import Modal from "@material-ui/core/Snackbar";
import "./Product.css";

import axios from "axios";
import { element } from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { Link, withRouter, useLocation, useHistory, Route } from 'react-router-dom';

import cs from "../../const";
import BasicInformation from "./BasicInformation";
import SalesInformation from "./SalesInformation";
import Specification from "./Specification";
import Shipping from "./Shipping";
import Others from "./Others";

export const LIMIT_IMAGE_UPLOAD = 9;

const createVariationURL = cs.BaseURL + "/api/seller/product/variation/create";
const createProductUrl = cs.BaseURL + "/api/seller/product/create";
const createCoverImageUrl = cs.BaseURL + "/api/seller/product/image/upload";
const createImagesUrl = cs.BaseURL + "/api/seller/product/image/upload";
const createAttributeUrl = cs.BaseURL + "/api/seller/product/attribute/create";
const createCustomAttributeUrl = cs.BaseURL + "/api/seller/product/attribute-custom/create";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: "50vw",
    minWidth: "40em",
    maxHeight: "95vh",
    overflow: "auto",
    backgroundColor: theme.palette.background.paper,
    border: "1px solid #888",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CreateProduct = (props) => {
  const classes = useStyles();
  const { t, i18n } = props;

  const [responseMessage, setResponseMessage] = useState({
    type: "",
    content: "",
  });
  const [openMessage, setOpenMessage] = useState(false);
  const handleOpenMessage = (type, message) => {
    setResponseMessage({
      type: type,
      content: message,
    });
    setOpenMessage(true);
  }
  const handleCloseMessage = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setResponseMessage({ type: "", content: "" });
    setOpenMessage(false);
  };

  let imageList = []
  for (let i = 0; i < LIMIT_IMAGE_UPLOAD - 1; i++) imageList.push(i)

  const [form, setForm] = useState({
    category: {
      categoryId: 0,
      categoryLevel1Id: 0,
      categoryLevel2Id: 0,
      categoryLevel3Id: 0,
      categoryLevel4Id: 0,
      categoryLevel5Id: 0,
      categoryEngPath: "",
      categoryViePath: ""
    },
    name: "",
    description: "",
    price: 0,
    inventoryCount: 0,
    weight: 0,
    width: 0,
    height: 0,
    depth: 0,
    isPreorderedProduct: 1,
    isNewProduct: 1,
    videoUrl: "",
    videoFile: {},
  });

  const [imgData, setImgData] = useState({
    coverImg: { file: null, path: "" },
    imgs: [], // [{ file: {}, path: "", id: "" }, ...]
    delImgsId: [] // [id, ...]
  })

  const [variationArray, setVariationArray] = useState([]);
  const [inventoryArray, setInventoryArray] = useState([]);

  const [attributeData, setAttributeData] = useState([]);
  // [{
  //   attributeId: item.attributeId,
  //   searchInput: "",
  //   attributeData: response.data.data,
  //   chosenAttributeValue: [],
  //   inputAttributeValue: "",
  //   customValueData: [], //[{ value: "string", id: }, ...]
  //   chosenCustomAttributeValue: [],
  //   customInput: "",
  //   customBoxInput: false,
  // }, {...}]

  const onChangeData = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const [modalVideo, setModalVideo] = useState(false);
  const handleCloseModalVideo = () => {
    setForm({ ...form, videoUrl: "" });
    setModalVideo(false)
  }
  const handleSaveVideo = () => {
    setModalVideo(false);
  }

  const handleChangeCategoryPath = () => {
    props.history.push("/product/category", {
      productName: form.name,
      category: form.category
    })
  }

  const createProduct = async () => {
    if (!imgData.coverImg.path) {
      handleOpenMessage("warning", t("product_config.message.choose_cover_image"))
      return;
    }
    if (!form.name) {
      handleOpenMessage("warning", t("product_config.message.enter_product_name"))
      return;
    }
    if (!form.description) {
      handleOpenMessage("warning", t("product_config.message.enter_product_description"))
      return;
    }
    if (form.price == 0) {
      handleOpenMessage("warning", t("product_config.message.enter_product_price"))
      return;
    }
    if (form.inventoryCount == 0) {
      handleOpenMessage("warning", t("product_config.message.enter_inventory_count"))
      return;
    }
    if (form.weight == 0) {
      handleOpenMessage("warning", t("product_config.message.enter_product_weight"))
      return;
    }
    //error mess
    try {
      const response = await axios({
        method: "post",
        url: createProductUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: {
          categoryId: form.category.categoryId,
          name: form.name,
          description: form.description,
          price: form.price,
          inventoryCount: form.inventoryCount,
          weight: form.weight,
          width: form.width,
          height: form.height,
          depth: form.depth,
          isPreorderedProduct: form.isPreorderedProduct,
          isNewProduct: form.isNewProduct,
          videoYoutubeURL: form.videoUrl,
        }
      })
      // console.log("create", response.data);
      if (response.data.error_desc === "Success") {
        let productId = response.data.data.productId;
        saveCoverImage(productId);
        saveImages(productId);
        createVariation(productId);
        createAttributeProduct(productId);
        createCustomAttributeProduct(productId);
        props.history.push("/seller-product-list/all");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const createVariation = async (productId) => {
    let requestBody = {
      productId,
      variationArray,
      inventoryArray
    }
    // console.log(requestBody);
    try {
      const response = await axios({
        method: "POST",
        url: createVariationURL,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: requestBody
      })
      // console.log(response.data);
      if (response.data.error_desc === "Success") {

      }
    } catch (error) {
      console.log(error);
    }
  }

  const saveCoverImage = async (productId) => {
    const formData = new FormData();
    // console.log(imgData.coverImg.file)
    formData.append('file', imgData.coverImg.file);
    formData.append('productId', productId);
    try {
      const response = await axios({
        method: "post",
        url: createCoverImageUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: formData,
      })
      // console.log("saveCoverImage", response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const saveImages = async (productId) => {
    const formData = new FormData()
    imgData.imgs.forEach(img => formData.append("files", img.file));
    formData.append('productId', productId);
    try {
      const response = await axios({
        method: "post",
        url: createImagesUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: formData,
      })
      // console.log("saveImages", response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getArrayAttribute = () => {
    let resultArr = [];
    for (let item of attributeData) {
      // console.log("item", item)
      for (let element of item.chosenAttributeValue) {
        // console.log("e", element)
        resultArr = resultArr.concat(element.attributeOptionId);
      }
    }
    return resultArr;
  }

  const getArrayCustomAttribute = () => {
    let resultArr = [];
    for (let item of attributeData) {
      if (item.inputAttributeValue) {
        resultArr = resultArr.concat({
          attributeId: item.attributeId,
          attributeValue: item.inputAttributeValue
        });
      }
      for (let element of item.chosenCustomAttributeValue) {
        resultArr = resultArr.concat({
          attributeId: item.attributeId,
          attributeValue: element.value,
        })
      }
    }
    // console.log("custom-value", resultArr);
    return resultArr;
  }

  const createAttributeProduct = async (productId) => {
    // console.log(getArrayAttribute())
    try {
      const response = await axios({
        method: "post",
        url: createAttributeUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: {
          productId: productId,
          attributeOptionIdList: getArrayAttribute()
        }
      });
      // console.log("attr-value", response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const createCustomAttributeProduct = async (productId) => {
    // console.log(getArrayCustomAttribute())
    try {
      const response = await axios({
        method: "post",
        url: createCustomAttributeUrl,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: {
          productId: productId,
          customAttributes: getArrayCustomAttribute()
        }
      });
      // console.log("custom-attr-value", response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const loadData = () => {
    const { location, history } = props;
    if (location.state !== undefined) {
      const { state } = location;
      setForm({
        ...form,
        category: state.category,
        name: state.productName
      })
    } else {
      history.push("/product/category")
    }
  }
  useEffect(() => {
    loadData();
  }, [])

  return <div className="">
    <div className="container-fluid minw-80em my-3">
      <BasicInformation
        {...props}
        imageList={imageList}
        limitImg={LIMIT_IMAGE_UPLOAD}
        form={form}
        imgData={imgData}
        setImgData={setImgData}
        onChangeData={onChangeData}
        handleChangeCategoryPath={handleChangeCategoryPath}
        setModalVideo={setModalVideo}
      />
      <Specification
        {...props}
        form={form}
        attributeData={attributeData}
        setAttributeData={setAttributeData}
      />
      <SalesInformation
        form={form}
        onChangeData={onChangeData}
        setVariationArray={setVariationArray}
        setInventoryArray={setInventoryArray}
      />
      <Shipping
        {...props}
        form={form}
        onChangeData={onChangeData}
      />
      <Others
        {...props}
        form={form}
        onChangeData={onChangeData}
      />
    </div>
    <div className="container-fluid d-flex justify-content-end">
      <button
        className="btn border bg-white me-2"
        style={{ width: "90px" }}
      >
        {t("commons.button.cancel")}
      </button>
      <button
        className="btn btn-danger"
        onClick={createProduct}
        style={{ width: "90px" }}
      >
        {t("commons.button.save")}
      </button>
    </div>


    <Modal
      style={{ top: 0 }}
      open={modalVideo}
      onClose={handleCloseModalVideo}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div className={classes.paper}>
        <div className="container-fluid p-0">
          <div className="mb-2">
            <input
              className="form-control form-control-sm mb-1"
              type="text"
              name="videoUrl"
              value={form.videoUrl}
              onChange={onChangeData}
              placeholder={t("product_config.fields.video_url")}
              disabled={!Object.keys(form.videoFile).length === 0}
            />
            <input
              className="form-control form-control-sm"
              type="file"
              disabled={form.videoUrl}
            />
          </div>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-sm btn-primary me-1"
              style={{ width: "60px" }}
              onClick={() => handleSaveVideo()}
            >
              {t("commons.button.save")}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              style={{ width: "60px" }}
              onClick={handleCloseModalVideo}
            >
              {t("commons.button.cancel")}
            </button>
          </div>
        </div>
      </div>
    </Modal>

    <Snackbar
      open={openMessage}
      autoHideDuration={2000}
      onClose={handleCloseMessage}
    >
      <div className={"alert-popup text-" + responseMessage.type}>
        {responseMessage.content}
      </div>
    </Snackbar>
  </div>
}

export default withTranslation()(CreateProduct);
