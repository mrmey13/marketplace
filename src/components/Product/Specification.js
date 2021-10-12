import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import { CheckIcon, XIcon } from "@primer/octicons-react";
import cs from "../../const";

const getCategoryAttributeUrl = cs.BaseURL + "/api/manager/category-attribute/list?"
const getAttributeUrl = cs.BaseURL + "/api/manager/attribute-option/list?"

const Specification = ({ form, attributeData, setAttributeData, t, i18n, match }) => {
  const productId = match.params.productId;

  const [categoryAttributeList, setCategoryAttributeList] = useState([]);

  const onChangeAttributeData = (event, index, item) => {
    let newArr = [...attributeData];
    if (newArr[index].attributeData.length) {
      let check = !newArr[index].chosenAttributeValue.filter(e => e.attributeOptionId === item.attributeOptionId).length;
      if (check) {
        newArr[index].chosenAttributeValue = newArr[index].chosenAttributeValue.concat(item)
      } else {
        newArr[index].chosenAttributeValue = newArr[index].chosenAttributeValue.filter(e => e.attributeOptionId !== item.attributeOptionId)
      }
    } else {
      newArr[index].inputAttributeValue = event.target.value;
    }
    setAttributeData(newArr);
  }

  const onChangeCustomAttributeData = (event, index, item) => {
    let newArr = [...attributeData];
    let check = !newArr[index].chosenCustomAttributeValue.filter(e => e === item).length;
    if (check) {
      newArr[index].chosenCustomAttributeValue = newArr[index].chosenCustomAttributeValue.concat(item);
    } else {
      newArr[index].chosenCustomAttributeValue = newArr[index].chosenCustomAttributeValue.filter(e => e !== item);
    }
    setAttributeData(newArr);
  }

  const onChangeInput = (event, index) => {
    let newArr = [...attributeData];
    newArr[index][event.target.name] = event.target.value;
    setAttributeData(newArr);
  }

  const onAddAttributeItem = (index) => {
    let newArr = [...attributeData];
    newArr[index].customBoxInput = true;
    setAttributeData(newArr);
  }

  const onConfirmAddAttributeItem = (index) => {
    let newArr = [...attributeData];
    let temp = { value: newArr[index].customInput, id: "" };
    newArr[index].customValueData = newArr[index].customValueData.concat(temp);
    newArr[index].customInput = "";
    newArr[index].customBoxInput = false;
    // console.log(newArr);
    setAttributeData(newArr);
  }

  const onCancelAddAttributeItem = (index) => {
    let newArr = [...attributeData];
    newArr[index].customInput = "";
    newArr[index].customBoxInput = false;
    // console.log(newArr);
    setAttributeData(newArr);
  }

  const getFilterAttributeData = (attribute) => {
    switch (i18n.language) {
      case "en":
        return attribute.attributeData.filter(e => e.attributeEngValue.toLowerCase().includes(attribute.searchInput.toLowerCase()));
        break;
      case "vi":
        return attribute.attributeData.filter(e => e.attributeViValue.toLowerCase().includes(attribute.searchInput.toLowerCase()));
        break;
      default:
        return attribute.attributeData.filter(e => e.attributeEngValue.toLowerCase().includes(attribute.searchInput.toLowerCase()));
        break;
    }
  }

  const getFilterCustomAttributeData = (attribute) => {
    return attribute.customValueData.filter(e => e.value.toLowerCase().includes(attribute.searchInput.toLowerCase()));
  }

  const loadCategoryAttributeData = async () => {
    try {
      const response = await axios({
        method: "get",
        url: `${getCategoryAttributeUrl}categoryId=${form.category.categoryId}&page=0&size=0`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        }
      });
      // console.log("cate-attr", response.data);
      setCategoryAttributeList(response.data.data)
    } catch (error) {
      console.log(error);
    }
  }


  const loadAttributeData = async () => {
    let tmpAttributeData = [];
    if (productId) {
      try {
        const response = await axios({
          method: 'get',
          url: `http://192.168.1.127:9555/api/seller/product/attribute/detail?productId=${productId}`,
          headers: {
            Authorization: localStorage.getItem(cs.System_Code + "-token"),
          }
        });
        console.log("attr-data", response.data.data);
        tmpAttributeData = response.data.data;
      } catch (error) {
        console.log(error)
      }
    }

    let result = []
    for (let item of categoryAttributeList) {
      try {
        const response = await axios({
          method: "get",
          url: `${getAttributeUrl}attributeId=${item.attributeId}&page=0&size=0`,
          headers: {
            Authorization: localStorage.getItem(cs.System_Code + '-token'),
          }
        });
        if (response.data.error_desc === "Success") {
          if (!productId) {
            result = result.concat({
              attributeId: item.attributeId,
              searchInput: "",
              attributeData: response.data.data,
              chosenAttributeValue: [],
              inputAttributeValue: "",
              customValueData: [], //[{ value: "string", id: }, ...]
              chosenCustomAttributeValue: [],
              customInput: "",
              customBoxInput: false,
            })
          } else {
            let tmpAttributeValueData = tmpAttributeData.filter(e => e.attributeId === item.attributeId)[0];
            let tmpChosenAttributeValue = (tmpAttributeValueData === undefined)
              ? []
              : tmpAttributeValueData.attributeOptions.filter(e => e.attributeOptionId > 0);
            let tmpChosenCustomAttributeValue = [];
            if (tmpAttributeValueData !== undefined) {
              tmpAttributeValueData.attributeOptions.filter(e => e.attributeOptionId < 0).forEach(element => {
                tmpChosenCustomAttributeValue = tmpChosenCustomAttributeValue.concat({
                  value: element.attributeEngValue,
                  id: element.attributeOptionId
                })
              });
            }

            result = result.concat({
              attributeId: item.attributeId,
              searchInput: "",
              attributeData: response.data.data,
              chosenAttributeValue: tmpChosenAttributeValue,
              inputAttributeValue: "",
              customValueData: tmpChosenCustomAttributeValue, //[{ value: "string", id: }, ...]
              chosenCustomAttributeValue: tmpChosenCustomAttributeValue,
              customInput: "",
              customBoxInput: false,
            })
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    setAttributeData(result);
  }

  useEffect(() => {
    loadCategoryAttributeData();
  }, [form.category.categoryId])

  useEffect(() => {
    loadAttributeData();
  }, [categoryAttributeList])
  return <div className="card card-body mb-3 shadow">
    <h5>{t("product_config.tabs.specification")}</h5>
    <div className="row">
      {attributeData.map((item, index) => {
        return <>
          <label className="col-2 text-muted text-end p-2" for="category-Id">
            {i18n.language === "en" && categoryAttributeList[index].attributeEngName}
            {i18n.language === "vi" && categoryAttributeList[index].attributeViName}
          </label>
          <div className="col-4 mb-2">
            {
              (item.attributeData.length + item.customValueData.length) !== 0 && <div className="dropdown" style={{ width: "100%" }}>
                <button
                  className="form-control text-start overflow-hidden text-nowrap text-muted"
                  id="dropdownMenuButton1"
                  // data-bs-auto-close="true"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-auto-close="outside"
                >
                  {
                    (!(attributeData[index].chosenAttributeValue.length || attributeData[index].chosenCustomAttributeValue.length)) && t("product_config.message.please_select")
                  }
                  {i18n.language === "en" && attributeData[index].chosenAttributeValue.map((e) => <span>
                    {e.attributeEngValue + ", "}
                  </span>)}
                  {i18n.language === "vi" && attributeData[index].chosenAttributeValue.map((e) => <span>
                    {(e.attributeViValue || e.attributeVieValue) + ", "}
                  </span>)}
                  {attributeData[index].chosenCustomAttributeValue.map(e => <span>
                    {e.value + ", "}
                  </span>
                  )}
                </button>

                <div className="dropdown-menu dropdown-menu-end mt-2 shadow" aria-labelledby="dropdownMenuButton1" style={{ width: "100%" }}>
                  <div className="px-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      // style={{ width: "95%" }}
                      placeholder={t("product_config.message.please_input")}
                      name="searchInput"
                      value={item.searchInput}
                      onChange={(event) => onChangeInput(event, index)}
                    />
                  </div>
                  <div
                    style={{
                      marginTop: "5px",
                      maxHeight: "19em",
                      overflow: "auto"
                    }}
                  >
                    {getFilterAttributeData(item).map(obj => <button
                      className={
                        (item.chosenAttributeValue.filter(e => e.attributeOptionId === obj.attributeOptionId).length)
                          ? "dropdown-item text-danger"
                          : "dropdown-item"
                      }
                      // value={item}
                      onClick={(event) => onChangeAttributeData(event, index, obj)}
                    >
                      {i18n.language === "en" && obj.attributeEngValue}
                      {i18n.language === "vi" && obj.attributeViValue}
                    </button>
                    )}
                    {item.customValueData.length !== 0 && <div
                      className="dropdown-header"
                    >
                      {t("product_config.others.self_fill")}
                    </div>}
                    {getFilterCustomAttributeData(item).map(obj => <button
                      className={
                        (item.chosenCustomAttributeValue.filter(e => e === obj).length)
                          ? "dropdown-item text-danger"
                          : "dropdown-item"
                      }
                      onClick={(event) => onChangeCustomAttributeData(event, index, obj)}
                    >
                      {obj.value}
                    </button>
                    )}

                  </div>
                  <hr class="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    hidden={item.customBoxInput}
                    onClick={() => onAddAttributeItem(index)}
                  >
                    {"+ " + t("product_config.others.add_new_attribute")}
                  </button>
                  <div
                    className="px-2 d-flex"
                  >
                    <input
                      type="text"
                      className="form-control form-control-sm me-1"
                      // style={{ width: "95%" }}
                      placeholder={t("product_config.message.please_input")}
                      name="customInput"
                      value={item.customInput}
                      onChange={(event) => onChangeInput(event, index)}
                      hidden={!item.customBoxInput}
                    />
                    <button
                      className="btn-outline-secondary btn-sm me-1"
                      onClick={() => onConfirmAddAttributeItem(index)}
                      disabled={!item.customInput}
                      hidden={!item.customBoxInput}
                    ><CheckIcon size={12} /></button>
                    <button
                      className="btn-outline-secondary btn-sm"
                      onClick={() => onCancelAddAttributeItem(index)}
                      hidden={!item.customBoxInput}
                    ><XIcon size={12} /></button>
                  </div>
                </div>
              </div>
            }
            {
              !item.attributeData.length && <input
                type="text"
                className="form-control text-muted"
                placeholder={t("product_config.message.please_input")}
                value={attributeData[index].inputAttributeValue}
                onChange={(event) => onChangeAttributeData(event, index)}
              />
            }
          </div>
        </>
      })}
    </div>
  </div>
}

export default withTranslation()(Specification);