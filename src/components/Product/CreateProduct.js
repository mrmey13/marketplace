import axios from "axios";
import { element } from "prop-types";
import React, { useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { Link, withRouter, useLocation, useHistory, Route } from 'react-router-dom';

import cs from "../../const";

const LIMIT_IMAGE_UPLOAD = 9;

const CreateProduct = () => {
  let imageList = []
  for (let i = 0; i < 9; i++) imageList.push(i)
  let location = useLocation();
  let history = useHistory();

  console.log(location.state);
  // console.log(history);
  const [form, setForm] = useState({
    categoryId: location && location.state && location.state.category ? location.state.category.categoryId : "100350",
    name: location && location.state && location.state.name ? location.state.name : "",
    description: "desc",
    price: 1000,
    inventoryCount: 10,
    weight: 1,
    width: 2,
    height: 3,
    depth: 4,
    isPreorderedProduct: 1,
    isNewProduct: 1,
    videoUrl: "https://www.youtube.com/watch?v=sca4VG9b0NY&t=3122s",
    imgFile: [],
    imgFileUrl: [],
    videoFile: {},
  });

  console.log("form",form);

  const removeDuplicate = (imageList) => {
    let checkDup = false;
    let dupElement = {};
    // console.log(imageList);
    console.log(form.imgFile);
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
    console.log(newImageListUrl);
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

  const createProduct = async () => {
    //error mess
    try {
      const response = await axios({
        method: "post",
        url: `http://localhost:9555/api/seller/product/create`,
        data: {
          categoryId: form.categoryId,
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
        },
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        }
      })
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  return <div className="d-flex flex-row justify-content-center align-items-baseline">
    <div className="container-fluid w-70vw minw-80em my-3">
      <BasicInformation
        imageList={imageList}
        onChangeFile={onChangeFile}
        form={form}
      />
      <Specification />
      <SalesInformation />
      <Shipping />
      <Others />
      <div className="d-flex justify-content-end">
        <button
          className="btn btn-outline-secondary"
        >
          Cancel
        </button>
        <button
          className="btn btn-outline-secondary"
        >
          Save and Publish
        </button>
        <button
          className="btn btn-danger"
        >
          Save and Publish
        </button>
      </div>
    </div>
    <div className="border card card-body w-20vw maxw-15em">aaa</div>
  </div>
}

const BasicInformation = ({ imageList, form, onChangeFile }) => {
  console.log(form.videoFile);
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
          <div className="text-center">{!index || "Image"} {index || "Cover Image"}</div>
        </div>
        )}
      </div>
    </div>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        Product Video
      </div>
      <div className="col-9 row">
        <div className="col-2 d-flex flex-column align-items-center">
          <div className="border" style={{ width: "90px", height: "90px" }}>
            {/* {form.videoFile && <iframe style={{ width: "89px", height: "89px", objectFit: "contain" }} src={form.videoFile || ""} />} */}
            {!form.videoFile && <label className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "100%" }}>
              <img src="https://img.icons8.com/material-outlined/24/000000/add.png" />
              <input
                type="file"
                accept="video/*"
                // id="input-file"
                hidden
                multiple
                onChange={onChangeFile}
              />
            </label>}
          </div>
          <div className="text-center">{"Cover Image"}</div>
        </div>
      </div>
    </div>
    <div className="row mb-2">
      <label className="col-3 form-label text-muted text-end" for="product-name">* Product Name</label>
      <div className="col-9">
        <input
          className="form-control form-control-sm"
          id="product-name"
          name="productName"
          value={form.name}
        />
      </div>
    </div>
    <div className="row mb-2">
      <label className="col-3 text-muted text-end" for="product-description">* Product Description</label>
      <div className="col-9">
        <textarea
          className="form-control form-control-sm"
          id="product-description"
          name="productDescription"
          rows={5}
        />
      </div>
    </div>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        Category
      </div>
      <div className="col-9">
        Photo
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

const SalesInformation = () => {
  return <div className="card card-body mb-3 shadow">
    <h5>SalesInformation</h5>
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
