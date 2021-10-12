import React, { useEffect, useState } from 'react';
import Button from "@material-ui/core/Button";
import color from "../../theme/color";
import { useTranslation, withTranslation } from "react-i18next";

const formatData = (variationArray, inventoryArray) => {
	let level1 = null;
	let level1Attribute = null;
	let level2 = null;
	let level2Options = null;
	let level2Attribute = null;

	if (variationArray) {
		if (variationArray.length === 1) {
			level1Attribute = variationArray[0].name;
			level1 = inventoryArray.map((e, i) => ({
				valueName: e.variationName,
				price: e.price,
				inventoryCount: e.inventoryCount,
				sku: e.sku
			}));
		}

		if (variationArray.length === 2) {
			level1Attribute = variationArray[0].name;
			level2Attribute = variationArray[1].name;
			// console.log("HERE", variationArray[0].options);
			level1 = variationArray[0].options.map((e, i) => ({
				valueName: e.optionValue,
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
					valueName1: e.variationName.split("_")[0],
					valueName2: e.variationName.split("_")[1],
					price: e.price,
					inventoryCount: e.inventoryCount,
					sku: e.sku
				});
			})
		}
	}

	return { level1Attribute, level1, level2Attribute, level2Options, level2 };
}

const SalesInformation = ({ form, onChangeData,
	variationArray, setVariationArray,
	inventoryArray, setInventoryArray, salesData }) => {
	// console.log("salesData", salesData);
	// let { level1Attribute, level1, level2Attribute, level2Options, level2 } = formatData(variationArray, inventoryArray);
	// let { level1Attribute, level1, level2Attribute, level2Options, level2 } = {
	// 	...salesData,
	// 	level1Attribute: salesData && salesData.level1Attribute || "",
	// 	level1: salesData && salesData.level1 || [],
	// 	level2Attribute: salesData && salesData.level2Attribute || "",
	// 	level2Options: salesData && salesData.level2Options || [],
	// 	level2: salesData && salesData.level2 || []
	// };
	let level1Attribute = salesData && salesData.level1Attribute || "";
	let level1 = salesData && salesData.level1 || [];

	let level2Attribute = salesData && salesData.level2Attribute || "";
	let level2Options = salesData && salesData.level2Options || [];
	let level2 = salesData && salesData.level2 || [];
	// console.log("level1Attrbute", level1Attribute ? level1Attribute : "");
	// console.log("level1", level1);
	// console.log("level2Attrbute", level2Attribute);
	// console.log("level2Options", level2Options);
	// console.log("level2", level2);

	const [autoPrice, setAutoPrice] = useState(0);
	const [autoInventoryCount, setAutoInventoryCount] = useState(0);
	const [autoSKU, setAutoSKU] = useState("");
	const { t, i18n } = useTranslation();

	const [hidden1, sethidden1] = useState(false);
	const [hidden2, sethidden2] = useState(false);

	const [Attribute1, setAttribute1] = useState("");
	const [Attribute2, setAttribute2] = useState("");

	const [ValueList1, setValueList1] = useState([""]);
	const [ValueList2, setValueList2] = useState([]);
	const [inputList, setInputList] = useState([{ valueName: "", price: 0, inventoryCount: 0, sku: "" }]);
	const [inputList2, setInputList2] = useState([]);

	// console.log("hidden1", hidden1);
	// console.log("hidden2", hidden2);

	useEffect(() => {
		// let { level1Attribute, level1, level2Attribute, level2Options, level2 } = formatData(variationArray, inventoryArray);
		// console.log("level1Attribute", level1Attribute);
		// console.log("level1", level1);
		// console.log("level2Attribute", level2Attribute);
		// console.log("level2Options", level2Options);
		// console.log("level2", level2);
		// console.log(inventoryArray, variationArray);
		if (inventoryArray && variationArray) {
			if (salesData) {
				setAttribute1(level1Attribute || "");
				setAttribute2(level2Attribute || "");
				if (level1 != null && level1.length > 0) {
					sethidden1(true);
					sethidden2(false);
					// console.log("HERE");
					setInputList(level1);
					if (level2 != null && level2.length > 0) {
						// console.log("HERE level2", level2);
						sethidden2(true);
						setValueList2(level2Options);
						setInputList2(level2);
					}
				}
			}
		} else {

		}

	}, [salesData])

	const handleInputChangeLevel1 = (e, idx) => {
		// console.log("ADD TO inputList");
		const { name, value } = e.target;
		let tmp = [...inputList];
		tmp[idx][name] = value;
		setInputList(tmp);

		let tmp2 = [...inputList2];
		let value1Length = tmp.length;
		let value2Length = ValueList2.length;
		tmp2.forEach((element, index) => {
			// console.log("HERE", element, index, value2Length, idx);
			// console.log("element", element);
			// console.log("value2Length", value2Length);
			// console.log("index", index);
			// console.log("idx", idx);
			if (index >= idx * value2Length && index < (idx + 1) * value2Length) {
				// console.log("THERE", element);
				// element.valueName1 = value;
				tmp2[index].valueName1 = value;
			}
		});

		setInputList2(tmp2);
	}

	const addToInputListLevel1 = () => {
		setInputList([
			...inputList,
			{ valueName: "", price: 0, inventoryCount: 0, sku: "" }
		]);

		let tmp = [];
		ValueList2.forEach(element => {
			tmp.push(
				{ valueName1: "", valueName2: element.valueName, price: 0, inventoryCount: 0, sku: "" }
			)
		});
		// console.log("ADD TO inputList2", tmp, inputList2);
		setInputList2([...inputList2, ...tmp]);
	}

	const deleteLevel1Value = (idx) => {
		const list = [...inputList];
		let value2Length = ValueList2.length
		list.splice(idx, 1);
		setInputList(list);

		let list2 = [...inputList2];
		list2 = list2.filter((e, i) => Math.floor(i / value2Length) != idx);
		// console.log("list2", list2);
		setInputList2(list2);
	}

	const addLevel2 = (e) => {
		sethidden2(true);
		setValueList2([...ValueList2, { valueName: "" }]);
		let tmp = [...inputList2];
		inputList.forEach(item => {
			tmp.push({
				valueName1: item.valueName,
				valueName2: "",
				price: 0,
				inventoryCount: 0,
				sku: ""
			})
		})

		setInputList2(tmp);
	}

	const handleInputChangeLevel2 = (e, idx) => {
		const { name, value } = e.target;
		// console.log("EVENT", name, value, idx);
		let tmp = [...ValueList2];
		// console.log("ValueList2:", tmp);
		tmp[idx].valueName = value;
		setValueList2(tmp);

		let tmp2 = [...inputList2];
		let value1Length = tmp.length;
		let value2Length = ValueList2.length;
		tmp2.forEach((element, index) => {
			// console.log("HERE", element, index, value2Length, idx);
			// console.log("element", element);
			// console.log("value2Length", value2Length);
			// console.log("index", index);
			// console.log("idx", idx);
			if (index % value2Length === idx) {
				// console.log("THERE", element);
				// element.valueName1 = value;
				tmp2[index].valueName2 = value;
			}
		});
	}

	const addToInputListLevel2 = (e) => {
		let value1Length = inputList.length;
		let value2Length = ValueList2.length;

		// console.log("ValueList2", ValueList2);
		setValueList2([...ValueList2, { valueName: "" }]);

		let oldInputList2 = [...inputList2];
		let tmp = new Array(value1Length * (value2Length + 1)).fill().map((e, i) => {
			// let value1 = inputList[Math.floor(i / value2Length)].valueName;
			let level1Index = Math.floor(i / (value2Length + 1));
			// console.log("level1", i, level1Index, inputList[level1Index]);
			return {
				valueName1: inputList[level1Index].valueName,
				valueName2: "",
				price: 0,
				inventoryCount: 0,
				sku: ""
			}
		});
		oldInputList2.forEach((element, index) => {
			let newIndex = index + Math.floor(index / value2Length);
			tmp[newIndex] = oldInputList2[index];
		});
		// console.log(tmp);
		setInputList2(tmp);
	}

	const deleteLevel2Value = (idx) => {
		let tmp = [...ValueList2];
		tmp.splice(idx, 1);
		setValueList2(tmp);

		let list2 = [...inputList2];
		let value2Length = ValueList2.length
		list2 = list2.filter((e, i) => Math.floor(i % value2Length) != idx);
		// console.log("list2", list2);
		setInputList2(list2);
	}

	const fixValue = (name, value) => {
		let list = [...inputList];
		inputList.forEach((e1, i1) => {
			list[i1][name] = value;
		});
		setInputList(list);

		let list2 = [...inputList2];
		inputList2.forEach((e2, i2) => {
			list2[i2][name] = value;
		});
		setInputList2(list2);
	}

	const saveData = () => {
		// if (salesData && Attribute1 == "") {
		// 	return;
		// }
		let variationArray = [];
		let inventoryArray = [];

		// set variationArray
		if (inputList.length > 0) {
			let level1Value = [];
			inputList.forEach(element => {
				level1Value.push({
					optionValue: element.valueName
				})
			});
			variationArray.push({
				name: Attribute1,
				options: level1Value
			})

			if (ValueList2.length > 0) {
				let level2Value = [];
				ValueList2.forEach(element => {
					level2Value.push({
						optionValue: element.valueName
					})
				});
				variationArray.push({
					name: Attribute2,
					options: level2Value
				})
			}
		}

		// console.log("variationArray", variationArray);
		setVariationArray(variationArray);

		let tmpData = [...(inputList2.length > 0 && inputList2 || inputList)];
		tmpData.forEach(item => {
			let variationName = inputList2.length > 0 ? [item.valueName1, item.valueName2].join("_") : item.valueName;
			inventoryArray.push({
				variationName: variationName,
				inventoryCount: item.inventoryCount,
				price: item.price,
				sku: item.sku
			})
		});

		console.log(inventoryArray);
		setInventoryArray(inventoryArray)
	}

	return <div className="card card-body mb-3 shadow">
		<h5>{t("product_config.tabs.sales_info")} {level1Attribute} {level2Attribute}</h5>
		<div className="row">
			<div className="row mb-2" hidden={hidden1}>
				<label className="col-3 form-label text-muted text-end" for="product-price">{"* " + t("product_config.fields.product_price")}</label>
				<div className="col-9">
					<input
						type="number"
						className="form-control form-control-sm"
						id="product-price"
						name="price"
						value={form.price}
						onChange={onChangeData}
					/>
				</div>
			</div>
			<div className="row mb-2" hidden={hidden1}>
				<label className="col-3 form-label text-muted text-end" for="inventoryCount">{"* " + t("product_config.fields.inventory_count")}</label>
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
					{t("product_config.fields.variations")}
				</div>
				<div className="col-9 d-flex align-items-baseline">
					<div style={{ width: "800px" }}>
						<button
							className="btn btn-outline-secondary btn-sm me-3"
							style={{ width: "inherit" }}
							onClick={() => {
								sethidden1(true);
								setInputList([{ valueName: "", price: 0, inventoryCount: 0, sku: "" }]);
							}}
						>
							{t("product_config.others.enable_variations")}
						</button>
					</div>

				</div>
			</div>

			{/* Nhom phan loai 1  */}
			<div style={{ backgroundColor: "#FAFAFA", marginBottom: "24px" }} hidden={!hidden1} className="border">
				<div className="row my-2">
					<div className="col-3 text-muted text-start">
						{t("product_config.fields.variation") + " 1"}
					</div>
					<div className="col-9 text-muted text-end">
						<button
							className="me-3 btn btn-sm btn-danger"
							// className="btn btn-outline-secondary btn-sm me-3"
							style={{ width: "30px", width: "30px" }}
							onClick={() => {
								setAttribute1("");
								setAttribute2("");
								sethidden1(false);
								sethidden2(false);
								setInputList([]);
								setInputList2([]);
							}}
						>
							X
						</button>
					</div>
				</div>

				<div className="row mb-2">
					<div className="col-3 text-muted text-end">
						{t("product_config.fields.variation_name")}
					</div>
					<div className="col-9">
						<input
							className="form-control form-control-sm"
							id="product-price"
							name="price"
							value={Attribute1}
							onChange={(e) => setAttribute1(e.target.value)}
							maxLength={20}
						/>
					</div>
				</div>

				{inputList.map((item, idx) => (
					<div className="row mb-2">
						<div className="col-3 text-muted text-end">
							{idx === 0 && t("product_config.fields.variation_option")}
						</div>
						<div className="col-8">
							<input
								className="form-control form-control-sm"
								id="valueName"
								name="valueName"
								value={item.valueName}
								onChange={(e) => {
									handleInputChangeLevel1(e, idx);
								}}
							/>
						</div>
						{
							idx > 0 &&
							<div className="col-1">
								<button
									className="btn btn-danger btn-sm"
									style={{ width: "60px" }}
									onClick={(e) => {
										deleteLevel1Value(idx)
									}}
								>
									{t("commons.button.delete")}
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
									addToInputListLevel1();
								}}

							>
								{t("product_config.others.add_option")}
							</button>
						</div>
					</div>
				</div>

				<div className="row mb-2" hidden={hidden2}>
					<div className="col-3 text-muted text-end">
						{t("product_config.fields.variation") + " 2"}
					</div>
					<div className="col-9 d-flex align-items-baseline">
						<div style={{ width: "800px" }}>
							<button
								className="btn btn-outline-secondary btn-sm me-3"
								style={{ width: "inherit" }}
								onClick={() => {
									addLevel2();
								}}
							>
								{t("commons.button.add")}
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Nhom phan loai 2  */}
			<div style={{ backgroundColor: "#FAFAFA", marginBottom: "24px" }} hidden={!hidden2} className="border">
				<div className="row my-2">
					<div className="col-3 text-muted text-start">
						{t("product_config.fields.variation") + " 2"}
					</div>
					<div className="col-9 text-muted text-end">
						<button
							className="me-3 btn btn-sm btn-danger"
							// className="btn btn-outline-secondary btn-sm me-3"
							style={{ width: "30px", width: "30px" }}
							onClick={() => {
								setAttribute2("");
								sethidden2(false);
								setValueList2([]);
								setInputList2([]);
							}}
						>
							X
						</button>
					</div>
				</div>

				<div className="row mb-2">
					<div className="col-3 text-muted text-end">
						{t("product_config.fields.variation_name")}
					</div>
					<div className="col-9">
						<input
							className="form-control form-control-sm"
							id="product-price"
							name="price"
							value={Attribute2}
							onChange={(e) => setAttribute2(e.target.value)}
							maxLength={20}
						/>
					</div>
				</div>

				{ValueList2.map((item, idx) => (
					<div className="row mb-2">
						<div className="col-3 text-muted text-end">
							{idx === 0 && t("product_config.fields.variation_option")}
						</div>
						<div className="col-8">
							<input
								className="form-control form-control-sm"
								id="valueName2"
								name="valueName2"
								value={item.valueName}
								onChange={(e) => {
									handleInputChangeLevel2(e, idx);
								}}
							/>
						</div>
						{
							idx > 0 &&
							<div className="col-1">
								<button
									className="btn btn-danger btn-sm"
									style={{ width: "60px" }}
									onClick={(e) => {
										deleteLevel2Value(idx)
										// const list = [...inputList2];
										// list.splice(idx, 1);
										// setInputList2(list);
									}}
								>
									{t("commons.button.delete")}
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
									// setInputList2([
									//   ...inputList2,
									//   { valueName: "", price: 0, inventoryCount: 0, sku: "" }
									// ]);
									addToInputListLevel2()
								}}
							>
								{t("product_config.others.add_option")}
							</button>
						</div>
					</div>
				</div>

			</div>


			<div style={{ backgroundColor: "#FAFAFA", marginBottom: "24px" }} hidden={!hidden1} className="border">
				<div className="row my-2">
					<div className="col-3 text-muted text-start">
						{t("product_config.fields.variation_information")}
					</div>
					<div className="col-9 text-muted text-end">
					</div>
				</div>


				<div className="row mb-2">
					<div className="col-3">
						<input
							className="form-control form-control-sm"
							id="autoPrice"
							name="autoPrice"
							value={autoPrice}
							type="number"
							onChange={(e) => setAutoPrice(e.target.value)}
							min={0}
							max={999999999}
						/>
					</div>

					<div className="col-3">
						<input
							className="form-control form-control-sm"
							id="product-inventory-count"
							name="autoInventoryCount"
							value={autoInventoryCount}
							type="number"
							onChange={(e) => setAutoInventoryCount(e.target.value)}
							min={0}
							max={999999999}
						/>
					</div>

					<div className="col-3">
						<input
							className="form-control form-control-sm"
							id="product-sku"
							name="autoSKU"
							value={autoSKU}
							onChange={(e) => setAutoSKU(e.target.value)}
							maxLength={20}
						/>
					</div>

					<div className="col-3">
						<button
							style={{ width: "120px", borderStyle: "solid", backgroundColor: color.casablanca }}
							className="btn btn-sm "
							onClick={() => {
								if (autoPrice != 0) {
									fixValue("price", autoPrice)
								}
								if (autoInventoryCount != 0) {
									fixValue("inventoryCount", autoInventoryCount)
								}
								if (autoSKU != "") {
									fixValue("sku", autoSKU)
								}
							}}
						>
							{t("commons.button.apply")}
						</button>
					</div>
				</div>

			</div>

			{/* Data table for attributes */}
			<div style={{ backgroundColor: "#FAFAFA", marginBottom: "24px" }} hidden={!hidden1} className="border">
				<div className="row my-2">
					<div className="col-3 text-muted text-start">
						{t("product_config.fields.variation_list")}
					</div>
					<div className="col-9 text-muted text-end">

					</div>
				</div>

				<div className="row my-2" hidden={hidden2}>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th scope="col" style={{ maxWidth: "90px" }}>{Attribute1 || t("product_config.fields.variation_name")}</th>
								<th scope="col">{t("product_config.fields.product_price")}</th>
								<th scope="col">{t("product_config.fields.inventory_count")}</th>
								<th scope="col">{t("product_config.fields.SKU")}</th>
							</tr>
						</thead>
						<tbody>
							{inputList.map((item, idx) => {
								return (
									<tr>
										<th scope="row">{item.valueName}</th>
										<td>
											<input
												type="number"
												className="form-control form-control-sm"
												id="price"
												name="price"
												value={item.price}
												onChange={(e) => {
													const { name, value } = e.target;
													let tmp = [...inputList];
													tmp[idx][name] = value;
													setInputList(tmp);
												}}
											/>
										</td>
										<td>
											<input
												type="number"
												className="form-control form-control-sm"
												id="inventoryCount"
												name="inventoryCount"
												value={item.inventoryCount}
												onChange={(e) => {
													const { name, value } = e.target;
													let tmp = [...inputList];
													tmp[idx][name] = value;
													setInputList(tmp);
												}}
											/>
										</td>
										<td>
											<input
												type="text"
												className="form-control form-control-sm"
												id="sku"
												name="sku"
												value={item.sku}
												onChange={(e) => {
													const { name, value } = e.target;
													let tmp = [...inputList];
													tmp[idx][name] = value;
													setInputList(tmp);
												}}
											/>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>

				<div className="row my-2" hidden={!hidden2}>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th scope="col" style={{ maxWidth: "90px" }}>{Attribute1 || t("product_config.fields.variation_name")}</th>
								<th scope="col" style={{ maxWidth: "90px" }}>{Attribute1 || t("product_config.fields.variation_name")}</th>
								<th scope="col">{t("product_config.fields.product_price")}</th>
								<th scope="col">{t("product_config.fields.inventory_count")}</th>
								<th scope="col">{t("product_config.fields.SKU")}</th>
							</tr>
						</thead>
						<tbody>
							{inputList2.map((item, idx) => {
								return (
									<tr>
										<th scope="row">{item.valueName1}</th>
										<th scope="row">{item.valueName2}</th>
										<td>
											<input
												type="number"
												className="form-control form-control-sm"
												id="price"
												name="price"
												value={item.price}
												onChange={(e) => {
													const { name, value } = e.target;
													let tmp = [...inputList2];
													tmp[idx][name] = value;
													setInputList2(tmp);
												}}
											/>
										</td>
										<td>
											<input
												type="number"
												className="form-control form-control-sm"
												id="inventoryCount"
												name="inventoryCount"
												value={item.inventoryCount}
												onChange={(e) => {
													const { name, value } = e.target;
													let tmp = [...inputList2];
													tmp[idx][name] = value;
													setInputList2(tmp);
												}}
											/>
										</td>
										<td>
											<input
												type="text"
												className="form-control form-control-sm"
												id="sku"
												name="sku"
												value={item.sku}
												onChange={(e) => {
													const { name, value } = e.target;
													let tmp = [...inputList2];
													tmp[idx][name] = value;
													setInputList2(tmp);
												}}
											/>
										</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>

			</div>

			<div className="row mb-2">
				<div className="col-3 text-muted text-end">
					{t("product_config.fields.wholesale")}
				</div>
				<div className="col-9 d-flex align-items-baseline">
					<div style={{ width: "800px" }}>
						<button
							className="btn btn-outline-secondary btn-sm me-3"
							style={{ width: "inherit" }}
							onClick={() => { }}
						>
							{t("product_config.others.add_price_tier")}
						</button>
					</div>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "flex-end",
					// justifyContent: "center",
				}}>
				<Button
					onClick={() => saveData()}
					style={{ width: "120px", borderStyle: "solid", backgroundColor: color.casablanca }}>
					{t("commons.button.ok")}
				</Button>
			</div>
		</div>
	</div>
}

export default SalesInformation
