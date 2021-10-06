import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation, withTranslation } from "react-i18next";
import cs from "../../const";

const getCategoryAttributeUrl = cs.BaseURL + "/api/manager/category-attribute/list?"
const getAttributeUrl = cs.BaseURL + "/api/manager/attribute-option/list?"

const Specification = ({ form, attributeData, setAttributeData, t, i18n }) => {
  // console.log("Specification-pr", i18n)
  // const [attributeData, setAttributeData] = useState([]);
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
      console.log(newArr[index].chosenAttributeValue)
    } else {
      newArr[index].inputAttributeValue = event.target.value;
    }
    setAttributeData(newArr);
  }

  const onChangeSearchInput = (event, index) => {
    let newArr = [...attributeData];
    newArr[index].searchInput = event.target.value;
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

  const loadCategoryAttributeData = async () => {
    // console.log("cateId", form.categoryId);
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
    let result = []
    for (let item of categoryAttributeList) {
      // console.log("item", item);
      try {
        const response = await axios({
          method: "get",
          url: `${getAttributeUrl}attributeId=${item.attributeId}&page=0&size=0`,
          headers: {
            Authorization: localStorage.getItem(cs.System_Code + '-token'),
          }
        });
        // console.log("attr-value-data", response.data);
        if (response.data.error_desc === "Success") {
          result = result.concat({
            attributeId: item.attributeId,
            attributeData: response.data.data,
            chosenAttributeValue: [],
            inputAttributeValue: "",
            searchInput: ""
          })
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
    <h5>Specification</h5>
    <div className="row">
      {attributeData.map((item, index) => {
        return <>
          <label className="col-2 text-muted text-end p-2" for="category-Id">{categoryAttributeList[index].attributeEngName}</label>
          <div className="col-4 mb-2">
            {
              item.attributeData.length !== 0 && <div className="dropdown" style={{ width: "100%" }}>
                <button
                  className="form-control text-start overflow-hidden text-nowrap"
                  id="dropdownMenuButton1"
                  // data-bs-auto-close="true"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  data-bs-auto-close="outside"
                >
                  {
                    (!attributeData[index].chosenAttributeValue.length) && "Please select"
                  }
                  {i18n.language === "en" && attributeData[index].chosenAttributeValue.map((e) => <span>
                    {e.attributeEngValue + ", "}
                  </span>)}
                  {i18n.language === "vi" && attributeData[index].chosenAttributeValue.map((e) => <span>
                    {e.attributeViValue + ", "}
                  </span>)}
                </button>

                <div className="dropdown-menu dropdown-menu-end mt-2 shadow" aria-labelledby="dropdownMenuButton1" style={{ width: "100%" }}>
                  <div className="px-2">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      // style={{ width: "95%" }}
                      placeholder="Please input"
                      value={item.searchInput}
                      onChange={(event) => onChangeSearchInput(event, index)}
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
                  </div>
                  <div
                    className="dropdown-header"
                  >
                    Self-fill Option
                  </div>
                  <hr class="dropdown-divider" />
                  <button
                    className="dropdown-item"
                    hidden={false}
                  >
                    + Add a New item
                  </button>
                  <div className="px-2 d-flex">
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      // style={{ width: "95%" }}
                      placeholder="Please input"
                      value={item.searchInput}
                      onChange={(event) => onChangeSearchInput(event, index)}
                    />
                    <button className="btn-outline-secondary btn-sm">v</button>
                    <button className="btn-outline-secondary btn-sm">v</button>
                  </div>
                </div>
              </div>
            }
            {
              !item.attributeData.length && <input
                type="text"
                className="form-control"
                placeholder="Please input"
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