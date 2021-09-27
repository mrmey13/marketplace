import React, { useState } from 'react'

const SalesInformation = ({ form, onChangeData }) => {
	const [Attribute1, setAttribute1] = useState("");
	const [Attribute2, setAttribute2] = useState("");
	const [hidden1, sethidden1] = useState(false);
	const [hidden2, sethidden2] = useState(false);
	const [NumberOfValue, setNumberOfValue] = useState(1);
	const [ValueList1, setValueList1] = useState([""]);
	const [ValueList2, setValueList2] = useState([]);
	const [indexes, setindexes] = useState([...Array(NumberOfValue).keys()]);
	const [inputList, setInputList] = useState([{ valueName: "", price: 0, inventoryCount: 0, sku: "" }]);
	// const [inputList2, setInputList2] = useState([{ valueName1: "", valueName2: "", price: 0, inventoryCount: 0, sku: "" }]);
	const [inputList2, setInputList2] = useState([]);

	console.log("inputList", inputList);

	const handleInputChangeLevel1 = (e, idx) => {
		console.log("ADD TO inputList");
		const { name, value } = e.target;
		let tmp = [...inputList];
		tmp[idx][name] = value;
		setInputList(tmp);

		let tmp2 = [...inputList2];
		let value1Length = tmp.length;
		let value2Length = ValueList2.length;
		tmp2.forEach((element, index) => {
			console.log("HERE", element, index, value2Length, idx);
			console.log("element", element);
			console.log("value2Length", value2Length);
			console.log("index", index);
			console.log("idx", idx);
			if (index >= idx * value2Length && index < (idx + 1) * value2Length) {
				console.log("THERE", element);
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
		console.log("ADD TO inputList2", tmp, inputList2);
		setInputList2([...inputList2, ...tmp]);
	}

	const deleteLevel1Value = (idx) => {
		const list = [...inputList];
		let value2Length = ValueList2.length
		list.splice(idx, 1);
		setInputList(list);

		let list2 = [...inputList2];
		list2 = list2.filter((e, i) => Math.floor(i / value2Length) != idx);
		console.log("list2", list2);
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
		console.log("EVENT", name, value, idx);
		let tmp = [...ValueList2];
		console.log("ValueList2:", tmp);
		tmp[idx].valueName = value;
		setValueList2(tmp);

		let tmp2 = [...inputList2];
		let value1Length = tmp.length;
		let value2Length = ValueList2.length;
		tmp2.forEach((element, index) => {
			console.log("HERE", element, index, value2Length, idx);
			console.log("element", element);
			console.log("value2Length", value2Length);
			console.log("index", index);
			console.log("idx", idx);
			if (index % value2Length === idx) {
				console.log("THERE", element);
				// element.valueName1 = value;
				tmp2[index].valueName2 = value;
			}
		});
	}

	const addToInputListLevel2 = (e) => {
		let value1Length = inputList.length;
		let value2Length = ValueList2.length;

		console.log("ValueList2", ValueList2);
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
		console.log("list2", list2);
		setInputList2(list2);
	}

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
							style={{ width: "30px", width: "30px" }}
							onClick={() => {
								sethidden1(false);
								sethidden2(false);
								setInputList([{ valueName: "", price: 0, inventoryCount: 0, sku: "" }]);
								setInputList2([]);
							}}
						>
							X
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
							value={Attribute1}
							onChange={(e) => setAttribute1(e.target.value)}
							maxLength={20}
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
									handleInputChangeLevel1(e, idx);
								}}
							/>
						</div>
						{
							idx > 0 &&
							<div className="col-1">
								<button
									onClick={(e) => {
										deleteLevel1Value(idx)
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
									addToInputListLevel1();
								}}

							>
								Thêm phân loại hàng
							</button>
						</div>
					</div>
				</div>

				<div className="row mb-2" hidden={hidden2}>
					<div className="col-3 text-muted text-end">
						Nhóm phân loại 2
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
								Thêm
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Nhom phan loai 2  */}
			<div style={{ backgroundColor: "#FAFAFA", marginBottom: "24px" }} hidden={!hidden2} className="border">
				<div className="row my-2">
					<div className="col-3 text-muted text-start">
						Nhóm phân loại 2
					</div>
					<div className="col-9 text-muted text-end">
						<button
							className="me-3 btn btn-sm btn-danger"
							// className="btn btn-outline-secondary btn-sm me-3"
							style={{ width: "30px", width: "30px" }}
							onClick={() => {
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
						Tên nhóm phân loại
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
							{idx === 0 && 'Phân loại hàng'}
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
									onClick={(e) => {
										deleteLevel2Value(idx)
										// const list = [...inputList2];
										// list.splice(idx, 1);
										// setInputList2(list);
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
									// setInputList2([
									//   ...inputList2,
									//   { valueName: "", price: 0, inventoryCount: 0, sku: "" }
									// ]);
									addToInputListLevel2()
								}}
							>
								Thêm phân loại hàng
							</button>
						</div>
					</div>
				</div>

			</div>

			{/* Data table for attributes */}
			<div style={{ backgroundColor: "#FAFAFA", marginBottom: "24px" }} hidden={!hidden1} className="border">
				<div className="row my-2">
					<div className="col-3 text-muted text-start">
						Danh sách phân loại hàng
					</div>
					<div className="col-9 text-muted text-end">

					</div>
				</div>

				<div className="row my-2" hidden={hidden2}>
					<table class="table table-bordered">
						<thead>
							<tr>
								<th scope="col" style={{ maxWidth: "90px" }}>{Attribute1 || 'Tên'}</th>
								<th scope="col">Giá</th>
								<th scope="col">Kho hàng</th>
								<th scope="col">SKU phân loại</th>
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
								<th scope="col" style={{ maxWidth: "90px" }}>{Attribute1 || 'Tên'}</th>
								<th scope="col" style={{ maxWidth: "90px" }}>{Attribute2 || 'Tên'}</th>
								<th scope="col">Giá</th>
								<th scope="col">Kho hàng</th>
								<th scope="col">SKU phân loại</th>
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
					Mua nhiều giảm giá
				</div>
				<div className="col-9 d-flex align-items-baseline">
					<div style={{ width: "800px" }}>
						<button
							className="btn btn-outline-secondary btn-sm me-3"
							style={{ width: "inherit" }}
							onClick={() => { }}
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
