import { makeStyles } from "@material-ui/core";
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
import SalesInformation from "./SalesInformation";

const LIMIT_IMAGE_UPLOAD = 9;
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
      console.log("HERE", variationArray[0].options);
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

const CreateProduct = (props) => {

  const classes = useStyles();
  const { productId } = useParams();
  let imageList = []
  for (let i = 0; i < LIMIT_IMAGE_UPLOAD; i++) imageList.push(i)

  // console.log(location.state);
  // console.log(history);
  const [form, setForm] = useState({
    categoryId: "",
    categoryPath: "",
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
    imgFile: [],
    imgFileUrl: [],
    videoFile: {},
  });

  const [variationArray, setVariationArray] = useState([]);
  const [inventoryArray, setInventoryArray] = useState([]);

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

  const removeDuplicate = (imageList) => {
    let checkDup = false;
    let dupElement = {};
    for (const iterator of imageList) {
      for (const iterator2 of form.imgFile) {
        if (iterator.name === iterator2.name
          && iterator.lastModified === iterator2.lastModified
          && iterator.size === iterator2.size
          && iterator.type === iterator2.type
        ) {
          dupElement = iterator;
          checkDup = true;
          break;
        }
      }
    }
    if (checkDup) {
      return removeDuplicate(imageList.filter(element => element != dupElement));
      //mess
    } else {
      return imageList
    }
  }

  const onChangeFile = (event) => {
    // console.log([])
    const fileList = event.target.files
    const newImageList = removeDuplicate([...fileList]);
    let newImageListUrl = [];
    for (const iterator of newImageList) {
      newImageListUrl = newImageListUrl.concat(URL.createObjectURL(iterator));
    }
    // console.log(newImageListUrl);
    if (form.imgFileUrl.length + newImageListUrl.length <= LIMIT_IMAGE_UPLOAD) {
      setForm({
        ...form,
        imgFileUrl: form.imgFileUrl.concat(newImageListUrl),
        imgFile: [...form.imgFile, ...newImageList],
      });
    } else {
      //mess
    }
    // console.log(form.imgFileUrl)
  }

  const handleChangeCategoryPath = () => {
    props.history.push("/product/category", { productName: form.name })
  }

  const createProduct = async () => {
    console.log(form);
    console.log("variationArray", variationArray);
    console.log("inventoryArray", inventoryArray);
    //error mess
    editVariation(productId)
  }

  const editVariation = async (productId) => {
    let requestBody = {
      productId,
      variationArray,
      inventoryArray
    }
    console.log(requestBody);
    try {
      const response = await axios({
        method: "POST",
        url: editVariationURL,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: requestBody
      })
      console.log(response.data);
      if (response.data.error_desc === "Success") {

      }
    } catch (error) {
      console.log(error);
    }
  }

  const saveCoverImage = async (productId) => {
    const formData = new FormData();
    console.log(form.imgFile[0])
    formData.append('file', form.imgFile[0]);
    formData.append('productId', productId);
    try {
      const response = await axios({
        method: "post",
        url: `http://192.168.1.127:9555/api/seller/product/cover-image/upload`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: formData,
      })
      console.log("saveCoverImage", response.data)
    } catch (error) {
      console.log(error);
    }
  }

  const saveImages = async (productId) => {
    const formData = new FormData();
    console.log("files", form.imgFile.slice(1, form.imgFile.length))
    const files = form.imgFile.slice(1, form.imgFile.length);
    files.forEach(file => { formData.append("files", file) })
    formData.append('productId', productId);
    // formData.append('files', form.imgFile.slice(1, form.imgFile.length));
    try {
      const response = await axios({
        method: "post",
        url: `http://192.168.1.127:9555/api/seller/product/image/upload`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
        data: formData,
      })
      // console.log("formData", formData)
      console.log("saveImages", response.data)
    } catch (error) {
      console.log("image", error)
    }
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
    console.log(response.data.data);
    let data = response.data.data;
    // let tmp = {
    //   categoryId: "",
    //   categoryPath: "",
    //   name: item.productName,
    //   description: "",
    //   price: 1000,
    //   inventoryCount: 10,
    //   weight: 1,
    //   width: 2,
    //   height: 3,
    //   depth: 4,
    //   isPreorderedProduct: 1,
    //   isNewProduct: 1,
    //   videoUrl: "",
    //   imgFile: [],
    //   imgFileUrl: [],
    //   videoFile: {},
    // };
    let tmp = {...form};
    tmp.name = data.productName;
    tmp.description = data.productDescription;
    setForm(tmp);
    console.log(tmp);
    setVariationArray(data.variationArray);
    setInventoryArray(data.inventoryArray);
  }
  useEffect(() => {
    loadData();
  }, [])

  return <div className="d-flex flex-row justify-content-center align-items-baseline">
    <div className="container-fluid w-70vw minw-80em my-3">
      <BasicInformation
        imageList={imageList}
        form={form}
        onChangeData={onChangeData}
        onChangeFile={onChangeFile}
        handleChangeCategoryPath={handleChangeCategoryPath}
        setModalVideo={setModalVideo}
      />
      <Specification />
      <SalesInformation
        form={form}
        onChangeData={onChangeData}
        variationArray={variationArray}
        inventoryArray={inventoryArray}
        setVariationArray={setVariationArray}
        setInventoryArray={setInventoryArray}
        salesData={formatData(variationArray, inventoryArray)}
      />
      <Shipping />
      <Others />
      <div className="d-flex justify-content-end">
        <button
          className="btn border bg-white me-2"
        >
          Cancel
        </button>
        <button
          className="btn border bg-white me-2"
        // onClick={saveImages(11111)}
        >
          Save and Delish
        </button>
        <button
          className="btn btn-danger"
          onClick={createProduct}
        >
          Save and Publish
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
  </div>
}

const BasicInformation = ({ imageList, form, onChangeData, onChangeFile, handleChangeCategoryPath, setModalVideo }) => {
  // console.log(form.videoFile);
  return <div className="card card-body mb-3 shadow">
    <h5>Basic Information</h5>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        Product images
      </div>
      <div className="col-9 row">
        {imageList.map((item, index) => <div className="col-2 d-flex flex-column align-items-center">
          <div className="border" style={{ width: "90px", height: "90px" }}>
            {form.imgFileUrl[index] && <img style={{ width: "89px", height: "89px", objectFit: "contain" }} src={form.imgFileUrl[index] || ""} />}
            {!form.imgFileUrl[index] && <label className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "100%" }}>
              <img src="https://img.icons8.com/material-outlined/24/000000/add.png" />
              <input
                type="file"
                accept="image/*"
                // id="input-file"
                hidden
                multiple
                onChange={onChangeFile}
              />
            </label>}
          </div>
          <div className="text-center">{!index || "Image"} {index || "* Cover Image"}</div>
        </div>
        )}
      </div>
    </div>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        Product Video
      </div>
      <div className="col-9 d-flex align-items-baseline">
        <div className="">
          <button
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={() => setModalVideo(true)}
          >
            Browse
          </button>
        </div>
        <div className="">
          {
            form.videoUrl && <a href={form.videoUrl} >{form.videoUrl}</a>
            || form.videoFile.name && <div>{form.videoFile.name}</div>
          }
        </div>
      </div>
    </div>
    <div className="row mb-2">
      <label className="col-3 form-label text-muted text-end" for="product-name">* Product Name</label>
      <div className="col-9">
        <input
          className="form-control form-control-sm"
          id="product-name"
          name="name"
          value={form.name}
          onChange={onChangeData}
        />
      </div>
    </div>
    <div className="row mb-2">
      <label className="col-3 text-muted text-end" for="product-description">* Product Description</label>
      <div className="col-9">
        <textarea
          className="form-control form-control-sm"
          id="product-description"
          rows={5}
          name="description"
          value={form.description}
          onChange={onChangeData}
        />
      </div>
    </div>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        Category
      </div>
      <div className="col-9">
        {form.categoryPath} <button
          className="btn p-0 ms-2"
          onClick={() => handleChangeCategoryPath()}
        >
          <img src="https://img.icons8.com/fluency-systems-regular/16/000000/pencil--v1.png" />
        </button>
      </div>
    </div>
  </div>
}

const Specification = () => {
  let fakeList = [];

  return <div className="card card-body mb-3 shadow">
    <h5>Specification</h5>
    <div className="row">
      <div className="col-2 text-muted text-end">
        * Brand
      </div>
      <div className="col-4">
        Photo
      </div>
      {fakeList.map(item => {
        return <>
          <div className="col-2 text-muted text-end">
            Specification Name
          </div>
          <div className="col-4">
            Photo
          </div>
        </>
      })}
    </div>
  </div>
}



const Shipping = () => {
  return <div className="card card-body mb-3 shadow">
    <h5>Shipping</h5>
    <div className="row">
      <div className="col-3 text-muted text-end">
        Product images
      </div>
      <div className="col-9">
        Photo
      </div>

      <div className="col-3 text-muted text-end">
        Product Video
      </div>
      <div className="col-9">
        Photo
      </div>

    </div>
  </div>
}

const Others = () => {
  return <div className="card card-body mb-3 shadow">
    <h5>Others</h5>
    <div className="row">
      <div className="col-3 text-muted text-end">
        Product images
      </div>
      <div className="col-9">
        Photo
      </div>

      <div className="col-3 text-muted text-end">
        Product Video
      </div>
      <div className="col-9">
        Photo
      </div>
    </div>
  </div>
}



export default withTranslation()(CreateProduct);