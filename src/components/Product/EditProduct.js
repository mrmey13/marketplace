import { makeStyles, Snackbar } from "@material-ui/core";
import Modal from "@material-ui/core/Snackbar";
import axios from "axios";
import { element } from "prop-types";
import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import {
  Link, withRouter,
  useLocation,
  useHistory,
  Route, useParams
} from 'react-router-dom';

import cs from "../../const";
import { LIMIT_IMAGE_UPLOAD } from "./CreateProduct";

import BasicInformation from "./BasicInformation";
import SalesInformation from "./SalesInformation";
import Specification from "./Specification";
import Shipping from "./Shipping";
import Others from "./Others";

const editVariationURL = cs.BaseURL + "/api/seller/product/variation/edit"
const productDetailURL = cs.BaseURL + "/api/seller/product/detail";

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

const formatData = (variationArray, inventoryArray) => {
  let level1 = null;
  let level1Attribute = null;
  let level2 = null;
  let level2Options = null;
  let level2Attribute = null;

  if (variationArray) {
    if (variationArray.length == 1) {
      level1Attribute = variationArray[0].name;
      level1 = inventoryArray.map((e, i) => ({
        valueName: e.variationName || "",
        price: e.price || 0,
        inventoryCount: e.inventoryCount || 0,
        sku: e.sku || ""
      }));
    }

    if (variationArray.length == 2) {
      level1Attribute = variationArray[0].name;
      level2Attribute = variationArray[1].name;
      level1 = variationArray[0].options.map((e, i) => ({
        valueName: e.optionValue || "",
        price: 0,
        inventoryCount: 0,
        sku: ""
      }))
      // level1 = inventoryArray.map((e, i) => ({
      // 	valueName: e.variationName.split("_")[0],
      // 	price: 0,
      // 	inventoryCount: 0,
      // 	sku: ""
      // }))
      level2Options = variationArray[1].options.map((e, i) => ({ valueName: e.optionValue }))
      level2 = inventoryArray.map((e, i) => {
        return ({
          valueName1: e.variationName.split("_")[0] || "",
          valueName2: e.variationName.split("_")[1] || "",
          price: e.price || 0,
          inventoryCount: e.inventoryCount || 0,
          sku: e.sku || ""
        });
      })
    }
  }

  return { level1Attribute, level1, level2Attribute, level2Options, level2 };
}

const EditProduct = (props) => {

  const classes = useStyles();
  const { productId } = useParams();

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
    price: 1000,
    inventoryCount: 10,
    weight: 1,
    width: 2,
    height: 3,
    depth: 4,
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

  const [attributeData, setAttributeData] = useState([]); // []

  const onChangeData = (event) => {
    console.log(event.target);
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
      productId: productId,
      productName: form.name,
      category: form.category,
    })
  }

  const editProduct = async () => {
    //error mess
    if (!imgData.coverImg.path) {
      handleOpenMessage("warning", "Please choose cover image")
      return;
    }
    if (!form.name) {
      handleOpenMessage("warning", "Please enter product name")
      return;
    }
    if (!form.description) {
      handleOpenMessage("warning", "Please enter product description")
      return;
    }
    if (form.price == 0) {
      handleOpenMessage("warning", "Please enter product price")
      return;
    }
    if (form.inventoryCount == 0) {
      handleOpenMessage("warning", "Please enter inventory count")
      return;
    }
    if (form.weight == 0) {
      handleOpenMessage("warning", "Please enter product weight")
      return;
    }
    editBasicInformation();
    editVariation(productId);
    changeCoverImage();
    deleteImages();
    addImages();
    editAttribute();
    createCustomAttributeProduct();
  }

  const editBasicInformation = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `http://192.168.1.127:9555/api/seller/product/edit`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: {
          productId: productId,
          name: form.name,
          videoYoutubeURL: form.videoUrl,
          description: form.description,
          price: form.price,
          inventoryCount: form.inventoryCount,
          weight: form.weight,
          width: form.width,
          height: form.height,
          depth: form.depth,
          isPreorderedProduct: form.isPreorderedProduct,
          isNewProduct: form.isNewProduct,
        }
      })
      console.log("basicInf", response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const editVariation = async (productId) => {
    let requestBody = {
      productId,
      variationArray,
      inventoryArray
    }
    try {
      const response = await axios({
        method: "POST",
        url: editVariationURL,
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

  const changeCoverImage = async () => {
    if (!imgData.coverImg.path) {
      console.log("CoverImages ?");
      return;
    }
    if (imgData.coverImg.file === null) {
      console.log("No Change");
      return;
    }
    const formData = new FormData();
    formData.append('file', imgData.coverImg.file);
    formData.append('productId', productId);
    try {
      const response = await axios({
        method: "post",
        url: `http://192.168.1.127:9555/api/seller/product/cover-image/edit`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: formData,
      })
      console.log("changeCoverImage", response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const deleteImages = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `http://192.168.1.127:9555/api/seller/product/image/delete`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: {
          productId: productId,
          imageIdList: imgData.delImgsId
        }
      });
      console.log("delImg", response.data);
    } catch (error) {
      console.log(error)
    }
  }

  const addImages = async () => {
    const formData = new FormData();
    imgData.imgs.forEach(img => { if (img.file !== null) formData.append("files", img.file) });
    formData.append('productId', productId);
    try {
      const response = await axios({
        method: "post",
        url: `http://192.168.1.127:9555/api/seller/product/image/upload`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: formData,
      })
      console.log("addImages", response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const getArrayAttribute = () => {
    let resultArr = [];
    for (let item of attributeData) {
      let resultEle = {
        attributeId: item.attributeId,
        attributeOptionIdList: [],
      }
      for (let element of item.chosenAttributeValue) {
        resultEle.attributeOptionIdList = resultEle.attributeOptionIdList.concat(element.attributeOptionId);
      }
      for (let element of item.chosenCustomAttributeValue) {
        if (element.id !== "") {
          resultEle.attributeOptionIdList = resultEle.attributeOptionIdList.concat(element.id);
        }
      }
      if (resultEle.attributeOptionIdList.length) {
        resultArr = resultArr.concat(resultEle);
      }
    }
    return resultArr;
  }

  const editAttribute = async () => {
    try {
      const response = await axios({
        method: "post",
        url: `http://192.168.1.127:9555/api/seller/product/attribute/edit`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + "-token")
        },
        data: {
          productId: productId,
          productAttributes: getArrayAttribute(),
        }
      });
      console.log("edit", response.data)
    } catch (error) {
      console.log(error)
    }
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
        if (element.id === "") {
          resultArr = resultArr.concat({
            attributeId: item.attributeId,
            attributeValue: element.value,
          })
        }
      }
    }
    console.log("custom-value", resultArr);
    return resultArr;
  }

  const createCustomAttributeProduct = async () => {
    // console.log(getArrayCustomAttribute())
    try {
      const response = await axios({
        method: "post",
        url: `http://192.168.1.127:9555/api/seller/product/attribute-custom/create`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: {
          productId: productId,
          customAttributes: getArrayCustomAttribute()
        }
      });
      console.log("custom-attr-value", response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const loadCategory = (product) => {
    let tmp = {
      categoryId: 0,
      categoryLevel1Id: product.categoryLevel1Id,
      categoryLevel2Id: product.categoryLevel2Id,
      categoryLevel3Id: product.categoryLevel3Id,
      categoryLevel4Id: product.categoryLevel4Id,
      categoryLevel5Id: product.categoryLevel5Id,
      categoryEngPath: "",
      categoryViePath: ""
    };
    if (product.categoryLevel1Id !== 0) {
      tmp.categoryId = product.categoryLevel1Id;
      tmp.categoryEngPath = product.categoryLevel1EngName;
      tmp.categoryViePath = product.categoryLevel1VieName;
    }
    if (product.categoryLevel2Id !== 0) {
      tmp.categoryId = product.categoryLevel2Id;
      tmp.categoryEngPath += " > " + product.categoryLevel2EngName;
      tmp.categoryViePath += " > " + product.categoryLevel2VieName;
    }
    if (product.categoryLevel3Id !== 0) {
      tmp.categoryId = product.categoryLevel3Id;
      tmp.categoryEngPath += " > " + product.categoryLevel3EngName;
      tmp.categoryViePath += " > " + product.categoryLevel3VieName;
    }
    if (product.categoryLevel4Id !== 0) {
      tmp.categoryId = product.categoryLevel4Id;
      tmp.categoryEngPath += " > " + product.categoryLevel4EngName;
      tmp.categoryViePath += " > " + product.categoryLevel4VieName;
    }
    if (product.categoryLevel5Id !== 0) {
      tmp.categoryId = product.categoryLevel5Id;
      tmp.categoryEngPath += " > " + product.categoryLevel5EngName;
      tmp.categoryViePath += " > " + product.categoryLevel5VieName;
    }
    return tmp;
  }

  const loadData = async () => {
    const response = await axios({
      method: "get",
      url: productDetailURL,
      params: { productId },
      headers: {
        Authorization: localStorage.getItem(cs.System_Code + "-token")
      }
    });
    console.log("data", response.data.data);
    let data = response.data.data;

    let tmp = { ...form };
    if (props.location.state) {
      tmp.name = (props.location.state.productName) ? props.location.state.productName : data.productName;
      tmp.category = (props.location.state.category) ? props.location.state.category : loadCategory(data);
    } else {
      tmp.name = data.productName;
      tmp.category = loadCategory(data);
    }
    tmp.description = data.productDescription;
    tmp.price = data.price;
    tmp.inventoryCount = data.inventoryCount;
    tmp.isNewProduct = data.isNewProduct;
    tmp.isPreorderedProduct = data.isPreorderedProduct;
    tmp.weight = data.weight;
    tmp.width = data.width;
    tmp.height = data.height;
    tmp.depth = data.depth;
    tmp.videoUrl = data.videoyoutubeURL;
    setForm(tmp);

    let tmpImgs = { ...imgData }
    tmpImgs.coverImg = {
      file: null,
      path: `${cs.MediaURL}/media/${data.productImageCover}`
    }
    for (let img of data.productImages) {
      tmpImgs.imgs = tmpImgs.imgs.concat({
        file: null,
        path: `${cs.MediaURL}/media/${img.path}`,
        id: img.id,
      });
    };
    setImgData(tmpImgs);

    setVariationArray(data.variationArray);
    setInventoryArray(data.inventoryArray);
  }

  useEffect(() => {
    loadData();
  }, [])

  return <div className="d-flex flex-row justify-content-center align-items-baseline">
    <div className="container-fluid w-70vw minw-80em my-3">
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
        variationArray={variationArray}
        inventoryArray={inventoryArray}
        setVariationArray={setVariationArray}
        setInventoryArray={setInventoryArray}
        salesData={formatData(variationArray, inventoryArray)}
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
      <div className="d-flex justify-content-end">
        <button
          className="btn border bg-white me-2"
        >
          Cancel
        </button>
        <button
          className="btn btn-danger"
          onClick={editProduct}
        >
          Update
        </button>
      </div>
    </div>
    <div className="border card card-body w-20vw maxw-15em">aaa</div>

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
              placeholder={"Video Youtube Url"}
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
              {"Save"}
            </button>
            <button
              type="button"
              className="btn btn-sm btn-danger"
              style={{ width: "60px" }}
              onClick={handleCloseModalVideo}
            >
              {"Cancel"}
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

export default withTranslation()(EditProduct);
