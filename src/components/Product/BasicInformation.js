import React from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { TrashIcon } from "@primer/octicons-react";

const BasicInformation = ({ imageList, form, limitImg, onChangeData, imgData, setImgData, handleChangeCategoryPath, setModalVideo, t, i18n }) => {

  const handleAddCoverImage = (event) => {
    let tmpCoverImg = imgData.coverImg;
    tmpCoverImg.file = event.target.files[0];
    tmpCoverImg.path = URL.createObjectURL(event.target.files[0]);
    setImgData({
      ...imgData,
      coverImg: tmpCoverImg,
    });
  }

  const handleDelCoverImg = () => {
    setImgData({
      ...imgData,
      coverImg: {
        file: null,
        path: ""
      }
    })
  }

  const removeDuplicate = (imageList) => {
    let checkDup = false;
    let dupElement = {};
    for (const iterator of imageList) {
      for (const iterator2 of imgData.imgs) {
        if (iterator2.file !== null
          && iterator.name === iterator2.file.name
          && iterator.lastModified === iterator2.file.lastModified
          && iterator.size === iterator2.file.size
          && iterator.type === iterator2.file.type
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

  const handleAddImg = (event) => {
    const fileList = event.target.files
    const newImageList = removeDuplicate([...fileList]);
    let newImgs = [];
    for (const iterator of newImageList) {
      newImgs = newImgs.concat({
        file: iterator,
        path: URL.createObjectURL(iterator),
        id: "",
      });
    }
    // console.log(newImageListUrl);
    if (imgData.imgs.length + newImgs.length < limitImg) {
      setImgData({
        ...imgData,
        imgs: imgData.imgs.concat(newImgs)
      })
    } else {
      // mess
    }
  }

  const handleDelImg = (event, index) => {
    let tmpImgs = [...imgData.imgs];
    let tmpDelImgsId = [...imgData.delImgsId]
    tmpDelImgsId = (tmpImgs[index].id !== "") ? tmpDelImgsId.concat(tmpImgs[index].id) : tmpDelImgsId;
    tmpImgs = tmpImgs.filter((img, idx) => idx != index);
    setImgData({
      ...imgData,
      imgs: tmpImgs,
      delImgsId: tmpDelImgsId,
    })
  }

  return <div className="card card-body mb-3 shadow">
    <h5>{t("product_config.tabs.basic_info")}</h5>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        {t("product_config.fields.product_images")}
      </div>
      <div className="col-9 row">
        <div className="col-2 d-flex flex-column align-items-center">
          <div className="border" style={{ width: "90px", height: "90px" }}>
            {imgData.coverImg.path && <div className="overlay-container">
              <img style={{ width: "89px", height: "89px", objectFit: "contain" }} src={imgData.coverImg.path || ""} />
              <div className="overlay">
                <div className="overlay-content text-white d-flex justify-content-center p-1" style={{ width: "100%" }}>
                  <button
                    className="btn btn-sm"
                    onClick={() => handleDelCoverImg()}
                  >
                    <TrashIcon size={18} fill="white" />
                  </button>
                </div>
              </div>
            </div>}
            {!imgData.coverImg.path && <label className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "100%" }}>
              <img src="https://img.icons8.com/material-outlined/24/000000/add.png" />
              <input
                type="file"
                accept="image/*"
                // id="input-file"
                hidden
                onChange={(event) => handleAddCoverImage(event)}
              />
            </label>}
          </div>
          <div className="text-center">{"* " + t("product_config.others.cover_image")}</div>
        </div>

        {imageList.map((item, index) => <div className="col-2 d-flex flex-column align-items-center">
          <div className="border" style={{ width: "90px", height: "90px" }}>
            {imgData.imgs[index]
              && imgData.imgs[index].path
              && <div className="overlay-container">
                <img style={{ width: "89px", height: "89px", objectFit: "contain" }} src={imgData.imgs[index].path || ""} />
                <div className="overlay">
                  <div className="overlay-content text-white d-flex justify-content-center p-1" style={{ width: "100%" }}>
                    <button
                      className="btn btn-sm"
                      onClick={(event) => handleDelImg(event, index)}
                    >
                      <TrashIcon size={18} fill="white" />
                    </button>
                  </div>
                </div>
              </div>}
            {!(imgData.imgs[index]
              && imgData.imgs[index].path)
              && <label className="d-flex justify-content-center align-items-center" style={{ width: "100%", height: "100%" }}>
                <img src="https://img.icons8.com/material-outlined/24/000000/add.png" />
                <input
                  type="file"
                  accept="image/*"
                  // id="input-file"
                  hidden
                  multiple
                  onChange={handleAddImg}
                />
              </label>}
          </div>
          <div className="text-center">{t("product_config.others.image") + " " + (index + 1)}</div>
        </div>
        )}
      </div>
    </div>
    <div className="row mb-2">
      <div className="col-3 text-muted text-end">
        {t("product_config.fields.product_video")}
      </div>
      <div className="col-9 d-flex align-items-baseline">
        <div className="">
          <button
            className="btn btn-outline-secondary btn-sm me-3"
            onClick={() => setModalVideo(true)}
            style={{ width: "70px"}}
          >
            {t("commons.button.browse")}
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
      <label className="col-3 form-label text-muted text-end" for="product-name">{"* " + t("product_config.fields.product_name")}</label>
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
      <label className="col-3 text-muted text-end" for="product-description">{"* " + t("product_config.fields.product_description")}</label>
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
        {t("product_config.fields.category")}
      </div>
      <div className="col-9">
        {i18n.language === "en" && form.category.categoryEngPath}
        {i18n.language === "vi" && form.category.categoryViePath}
        <button
          className="btn p-0 ms-2"
          onClick={() => handleChangeCategoryPath()}
        >
          <img src="https://img.icons8.com/fluency-systems-regular/16/000000/pencil--v1.png" />
        </button>
      </div>
    </div>
  </div>
}

export default withTranslation()(BasicInformation)