import React, { useState } from 'react'

const SalesInformation = ({ form, onChangeData }) => {
    const [hidden1, sethidden1] = useState(false);
    const [NumberOfValue, setNumberOfValue] = useState(1);
    const [ValueList, setValueList] = useState(["test"]);
    const [indexes, setindexes] = useState([...Array(NumberOfValue).keys()]);
    const [inputList, setInputList] = useState([{ valueName: "", price: 0, inventoryCount: 0, sku: "" }]);
    const [inputList2, setInputList2] = useState([{ valueName1: "", valueName2: "", price: 0, inventoryCount: 0, sku: "" }]);
  
  
    console.log(inputList);
    return <div className="card card-body mb-3 shadow">
      <h5>SalesInformation</h5>
      <div className="row">
        <div className="row mb-2" hidden={hidden1}>
          <label className="col-3 form-label text-muted text-end" for="product-price">* Product Price</label>
          <div className="col-9">
            <input
              className="form-control form-control-sm"
              id="product-price"
              name="price"
              value={form.price}
              onChange={onChangeData}
            />
          </div>
        </div>
        <div className="row mb-2" hidden={hidden1}>
          <label className="col-3 form-label text-muted text-end" for="inventoryCount">* Inventory count</label>
          <div className="col-9">
            <input
              type="number"
              className="form-control form-control-sm"
              id="inventoryCount"
              name="inventoryCount"
              value={form.inventoryCount}
              onChange={onChangeData}
              min={0}
              max={999999999}
            />
          </div>
        </div>
  
        <div className="row mb-2" hidden={hidden1}>
          <div className="col-3 text-muted text-end">
            Phân loại hàng
          </div>
          <div className="col-9 d-flex align-items-baseline">
            <div style={{ width: "800px" }}>
              <button
                className="btn btn-outline-secondary btn-sm me-3"
                style={{ width: "inherit" }}
                onClick={() => sethidden1(true)}
              >
                Thêm nhóm phân loại
              </button>
            </div>
  
          </div>
        </div>
  
        {/* Nhom phan loai 1  */}
        <div style={{ backgroundColor: "#FAFAFA", marginBottom: "24px" }} hidden={!hidden1} className="border">
          <div className="row my-2">
            <div className="col-3 text-muted text-start">
              Nhóm phân loại 1
            </div>
            <div className="col-9 text-muted text-end">
              <button
                className="me-3 btn btn-sm btn-danger"
                // className="btn btn-outline-secondary btn-sm me-3"
                // style={{ width: "inherit" }}
                onClick={() => sethidden1(false)}
              >
                x
              </button>
            </div>
          </div>
  
          <div className="row mb-2">
            <div className="col-3 text-muted text-end">
              Tên nhóm phân loại
            </div>
            <div className="col-9">
              <input
                className="form-control form-control-sm"
                id="product-price"
                name="price"
                value={form.price}
                onChange={onChangeData}
              />
            </div>
          </div>
  
          {inputList.map((item, idx) => (
            <div className="row mb-2">
              <div className="col-3 text-muted text-end">
                {idx === 0 && 'Phân loại hàng'}
              </div>
              <div className="col-8">
                <input
                  className="form-control form-control-sm"
                  id="valueName"
                  name="valueName"
                  value={item.valueName}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    let tmp = [...inputList];
                    tmp[idx][name] = value;
                    setInputList(tmp);
                  }}
                />
              </div>
              {
                idx > 0 &&
                <div className="col-1">
                  <button
                    onClick={(e) => {
                      const list = [...inputList];
                      list.splice(idx, 1);
                      setInputList(list);
                    }}
                  >
                    Delete
                  </button>
                </div>
              }
  
            </div>
          ))}
  
          <div className="row mb-2">
            <div className="col-3 text-muted text-end">
            </div>
            <div className="col-9 d-flex align-items-baseline">
              <div style={{ width: "800px" }}>
                <button
                  className="btn btn-outline-secondary btn-sm me-3"
                  style={{ width: "inherit" }}
                  onClick={() => {
                    setInputList([
                      ...inputList,
                      { valueName: "", price: 0, inventoryCount: 0, sku: "" }
                    ]);
                  }}
                >
                  Thêm phân loại hàng
                </button>
              </div>
            </div>
          </div>
        </div>
  
  
        <div className="row mb-2">
          <div className="col-3 text-muted text-end">
            Mua nhiều giảm giá
          </div>
          <div className="col-9 d-flex align-items-baseline">
            <div style={{ width: "800px" }}>
              <button
                className="btn btn-outline-secondary btn-sm me-3"
                style={{ width: "inherit" }}
                onClick={() => {}}
              >
                Thêm khoảng giá
              </button>
            </div>
          </div>
        </div>
  
      </div>
    </div>
  }

export default SalesInformation
