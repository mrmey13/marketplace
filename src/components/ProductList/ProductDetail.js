import React, { useState, useEffect } from 'react';
import axios from 'axios';
import cs from '../../const';
import Color from '../../theme/color';
import './Product.css';
import Product from './Product';
import { Link, useParams } from 'react-router-dom';
import { hasToken } from '../../service';

const shopDetailUrl = cs.BaseURL + '/api/buyer/shop/info?';
const loadProductListUrl = cs.BaseURL + "/api/buyer/product/list";
const Seller_product_detail = cs.BaseURL + '/api/seller/product/detail';
const Buyer_product_detail = cs.BaseURL + '/api/buyer/product/detail';

const mediaURL = cs.MediaURL + '/media/';

const ADD_TO_CART_URL = cs.BaseURL + '/api/buyer/cart/add';

function ProductDetail(props) {
  const { productId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [buttonRateState, setButtonRateState] = useState('all');
  const [introImage, setIntroImage] = useState('');
  const [firstImage, setFirstImage] = useState('');
  const [productImage, setProductImage] = useState([
    { path: '', id: 0 },
    { path: '', id: 0 },
    { path: '', id: 0 },
    { path: '', id: 0 },
    { path: '', id: 0 },
  ]);
  const [imagesPerPage, setimagesPerPage] = useState(4);
  const [curPage, setCurPage] = useState(1);
  const indexOfLastImage = curPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const curPosts = productImage.slice(indexOfFirstImage, indexOfLastImage);

  const [imageTab, setImageTab] = useState(0);

  const [productDetail, setProductDetail] = useState({});
  const [shopId, setShopId] = useState();
  const [shopDetail, setShopDetail] = useState({});

  const [variation1, setVariation1] = useState([]);
  const [variation2, setVariation2] = useState([]);
  const [variationIndex1, setVariationIndex1] = useState('');
  const [variationIndex2, setVariationIndex2] = useState('');
  const [inventoryArray, setInventoryArray] = useState([]);

  const [media, setMedia] = useState([]);

  const loadProductDetail = async (conditions) => {
    const response = await axios({
      method: 'get',
      url: `${cs.BaseURL}/api/buyer/product/detail?productId=${productId}`,
      headers: {
        Authorization: localStorage.getItem(cs.System_Code + '-token'),
      },
    });
    if (
      response.data.error_desc === 'Success' &&
      response.data.data.length !== 0
    ) {
      console.log("data-product", response.data)
      setProductDetail(response.data.data);
      setShopId(response.data.data.shopId)
      setIntroImage(response.data.data.productImageCover);
      setFirstImage(response.data.data.productImageCover);
      setProductImage(response.data.data.productImages);
      setVariation1(response.data.data.variationArray.filter((item) => item.id == 1));
      setVariation2(response.data.data.variationArray.filter((item) => item.id == 2));
      setInventoryArray(response.data.data.inventoryArray);
    }
  };

  const loadShopDetail = async () => {
    try {
      const response = await axios({
        method: "GET",
        url: `${shopDetailUrl}shopId=${shopId}`
      });
      console.log("shopInfo", response.data);
      setShopDetail(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const [productList, setProductList] = useState([]);

  const loadProductList = async (conditions) => {
    const response = await axios({
      method: "post",
      url: `${loadProductListUrl}`,
      data: {
        page: 1,
        size: 10,
      },
    });
    setProductList(response.data.data);
    // console.log("res", response.data);
  };

  useEffect(() => {
    loadProductDetail();
    loadProductList();
  }, [productId]);

  useEffect(() => {
    if (shopId) {
      loadShopDetail();
    }
  }, [shopId]);

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
    else setQuantity(quantity);
  };
  const increaseQuantity = async () => {
    if (quantity <= productDetail.inventoryCount - 1) setQuantity(quantity + 1);
  };

  const addToCart = async () => {
    let variationIndex = '';
    if (variationIndex1 == '') return alert('Ch???n ph??n lo???i h??ng');
    if (variation2.length != 0) {
      if (variationIndex2 == '') return alert('Ch???n ph??n lo???i h??ng');
      variationIndex = variationIndex1 + '_' + variationIndex2;
    } else {
      variationIndex = variationIndex1;
    }
    if (!hasToken()) {
      props.history.push("/login", {
        prePath: props.location.pathname
      })
    }
    const productVariation = inventoryArray.find(
      (i) => i.variationIndex == variationIndex
    );
    const productVariationId = productVariation.productVariationId;
    try {
      const res = await axios({
        method: 'POST',
        url: `${ADD_TO_CART_URL}?productVariationId=${productVariationId}&quantity=${quantity}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
      });
      if (res.data.error_code == 0) {
        alert('Success');
      } else {
        alert('Error');
      }
    } catch (error) { }
  };
  const [selected, setSelected] = useState(false);
  const handleVariation1 = (e) => {
    setVariationIndex1(e.target.value);
    setSelected(true);
  };
  const handleVariation2 = (e) => {
    setVariationIndex2(e.target.value);
    setSelected(true);
  };

  return (
    <div className="product-detail-container container">
      <div
        className="card path-link d-flex flex-row mb-3 py-2 px-5"
        style={{ height: '40px' }}
      >
        <a style={{ color: Color.tanhide }} href="/">
          SalePlus
        </a>
        <div className="px-2">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
        <a>{productDetail.categoryLevel1VieName}</a>
        <div className="px-2">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
        <a>{productDetail.categoryLevel2VieName}</a>
        <div className="px-2 ">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </div>
        <a>{productDetail.categoryLevel3VieName}</a>
        {productDetail.categoryLevel4VieName != '' && (
          <div className="px-2">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        )}
        <a>{productDetail.categoryLevel4VieName}</a>
        {productDetail.categoryLevel4VieName != '' && (
          <div className="px-2">
            <ion-icon name="chevron-forward-outline"></ion-icon>
          </div>
        )}
        <a>{productDetail.categoryLevel5VieName}</a>
      </div>
      <div className="card card-product-detail-main">
        <div className="row main-row-product-detail d-flex justify-content-between mt-2">
          <div
            className="col-5 img-product-detail-intro "
            style={{ borderRight: '1px solid black' }}
          >
            <div
              className="img-main-product-detail-intro d-block p-2"
              style={{ width: 'fit-content', margin: '10px auto' }}
            >
              <img
                className="product-img"
                src={`${cs.MediaURL}/media/${introImage}`}
                alt=""
                style={{ width: '100%', height: '400px' }}
              />
            </div>
            <div
              className="row img-carousel-product-detail-intro m-3 d-flex flex-row justify-content-between"
              style={{ height: '80px', alignItems: 'center' }}
            >
              <div
                className="d-flex flex-row"
                style={{ width: 'fit-content', alignItems: 'center' }}
              >
                <button
                  class={
                    curPage == 1
                      ? 'btn btn-category visually-hidden category-next'
                      : 'btn btn-category category-next'
                  }
                  type="button"
                  style={{ width: '15px', height: '30px', marginRight: '10px' }}
                  onClick={() => {
                    if (curPage > 1) setCurPage(curPage - 1);
                  }}
                // style={{ position: "absolute", zIndex: 1 }}
                >
                  <ion-icon name="chevron-back-outline"></ion-icon>
                </button>
                <img
                  className="product-img intro-img"
                  onMouseOver={() => {
                    setImageTab(0);
                    setIntroImage(firstImage);
                  }}
                  src={`${cs.MediaURL}/media/${firstImage}`}
                  alt=""
                  style={
                    imageTab == 0
                      ? {
                        width: '87px',
                        height: '80px',
                        border: '1px solid' + Color.tanhide,
                      }
                      : {
                        width: '87px',
                        height: '80px',
                        border: '1px solid silver',
                      }
                  }
                />
                {curPosts.map((item, index) => (
                  <img
                    className="product-img"
                    onMouseOver={() => {
                      setImageTab(item.id);
                      setIntroImage(item.path);
                    }}
                    // src={`${cs.MediaURL}/media/${item.path}`}
                    src={`${cs.MediaURL}/media/${item.path}`}
                    alt="productIm"
                    style={
                      imageTab == item.id
                        ? {
                          width: '87px',
                          height: '80px',
                          border: '1px solid' + Color.tanhide,
                        }
                        : {
                          width: '87px',
                          height: '80px',
                          border: '1px solid silver',
                        }
                    }
                  />
                ))}
              </div>
              <button
                class={
                  curPage === Math.ceil(productImage.length / imagesPerPage)
                    ? 'btn-category visually-hidden category-next '
                    : 'btn-category category-next '
                }
                type="button"
                style={{ width: '15px', height: '30px' }}
                onClick={() => {
                  if (curPage < Math.ceil(productImage.length / imagesPerPage))
                    setCurPage(curPage + 1);
                }}
              >
                <ion-icon name="chevron-forward-outline" />
              </button>
            </div>
            <div className="row share-product-detail-intro">
              <div className="d-flex mb-2 align-items-center">
                <div style={{ width: 'fit-content' }}>
                  Share:
                </div>
                <button
                  className="btn p-0 ms-2"
                  style={{ width: 'fit-content' }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                    alt="fbicon"
                    style={{ width: '20px', height: '20px' }}
                  />
                </button>
                <button
                  className="btn p-0 ms-2"
                  style={{ width: 'fit-content' }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                    alt="fbicon"
                    style={{ width: '20px', height: '20px' }}
                  />
                </button>
                <button
                  className="btn p-0 ms-2"
                  style={{ width: 'fit-content' }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111646.png"
                    alt="fbicon"
                    style={{ width: '20px', height: '20px' }}
                  />
                </button>
              </div>
            </div>
          </div>


          <div className="col-7 info-product-detail-intro">
            <div
              className="product-product-detail-name"
              style={{ width: 'fit-content', textTransform: 'uppercase' }}
            >
              {productDetail.productName}
            </div>
            <div className="product-product-detail-rate">
              <a
                style={{
                  color: Color.tanhide,
                  width: 'fit-content',
                  textDecoration: 'none',
                  marginRight: '10px',
                  borderRight: '1px solid black',
                  paddingRight: '5px',
                }}
                href="#rate"
              >
                5 sao
              </a>
              <a
                style={{
                  color: Color.tanhide,
                  width: 'fit-content',
                  textDecoration: 'none',
                  marginRight: '10px',
                  borderRight: '1px solid black',
                  paddingRight: '5px',
                }}
                href="#rate"
              >
                9 ????nh gi??
              </a>
              <a
                style={{
                  width: 'fit-content',
                  textDecoration: 'none',
                  marginRight: '10px',
                  paddingRight: '5px',
                }}
              >
                9 ???? b??n
              </a>
            </div>
            <div className="product-product-detail-price mt-4">
              {productDetail.price}
              <sub>
                <u>??</u>
              </sub>
            </div>
            <div className="row product-product-detail-logistic mt-5">
              <div className="col-4">V???n Chuy???n</div>
              <div className="col-8 ">
                <div className="free-shipping">
                  {' '}
                  <img
                    className="free-ship-img"
                    src="https://cdn-icons-png.flaticon.com/512/3306/3306060.png"
                    alt="free ship"
                  />{' '}
                  Mi???n Ph?? V???n Chuy???n
                </div>
                <div className="free-shipping">
                  <img
                    className="free-ship-img"
                    src="https://cdn-icons-png.flaticon.com/512/664/664468.png"
                    alt="free ship"
                  />{' '}
                  V???n Chuy???n T???i
                </div>
                <div className="free-shipping">Ph?? V???n Chuy???n</div>
              </div>
            </div>

            {variation1.map((item) => (
              <div className="row product-product-detail-variation mt-3">
                <div className="col-4">{item.name}</div>
                <div className="col-8">
                  <div className="flex items-center _2oeDUI">
                    {item.options.map((option) => (
                      <button
                        className={
                          !selected
                            ? 'product-variation'
                            : 'product-variation product-variation--selected'
                        }
                        value={option.optionId}
                        onClick={handleVariation1}
                      >
                        {option.optionValue}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {variation2.map((item) => (
              <div className="row product-product-detail-variation mt-3">
                <div className="col-4">{item.name}</div>
                <div className="col-8">
                  <div className="flex items-center _2oeDUI">
                    {item.options.map((option) => (
                      <button
                        className={
                          !selected
                            ? 'product-variation'
                            : 'product-variation-selected'
                        }
                        value={option.optionId}
                        onClick={handleVariation2}
                      >
                        {option.optionValue}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="row product-product-detail-quantity mt-5">
              <div className="col-4">S??? L?????ng</div>
              <button
                className="_2KdYzP"
                onClick={decreaseQuantity}
              >
                -
              </button>
              <div class="_2KdYzP iRO3yj">{quantity}</div>
              {/* <input class="_2KdYzP iRO3yj" type="text" value={quantity} onChange={onChange}  /> */}
              <button
                className="_2KdYzP"
                onClick={increaseQuantity}
              >
                +
              </button>
              <div>{productDetail.inventoryCount} s???n ph???m c?? s???n</div>
            </div>

            <div className="product-product-detail-buy d-flex flex-row justify-content-center my-5">
              <button
                className="btn btn-outline-dark py-2 d-flex flex-row"
                style={{
                  backgroundColor: Color.corvette,
                  width: 'fit-content',
                  marginRight: '15px',
                }}
                onClick={addToCart}
              >
                <ion-icon name="medkit-outline" />
                <div
                  className=""
                  style={{ width: 'fit-content', marginLeft: '5px' }}
                >
                  Th??m V??o Gi??? H??ng
                </div>
              </button>
              <button
                className="btn btn-outline-dark py-2"
                style={{
                  backgroundColor: Color.tanhide,
                  width: 'fit-content',
                }}
                onClick={() => {
                  if (hasToken()) {
                    props.history.push("/cart");
                  } else {
                    props.history.push("/login", {
                      prePath: props.location.pathname
                    })
                  }
                }}
              >
                Mua Ngay
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="card card-shop-info-product-detail mt-3">
        <div className="row infor-row" style={{ borderBottom: 'none' }}>
          <div className="col-4">
            <div className="">
              <div className="card-body ">
                <div className="card-body-top d-flex">
                  <img
                    className="shop-avatar me-1"
                    src={`${cs.MediaURL}/media/${shopDetail.avatarPath}`}
                    alt="shop avatar"
                  />
                  <div style={{ width: "80%" }}>
                    <div className="row-title d-none d-sm-block">
                      <h6 className="mb-0">{shopDetail.shopName}</h6>
                      <sub>Online:</sub>
                    </div>
                    <div className="card-body-bottom d-xl-flex mt-2 justify-content-between d-flex">
                      <button className="btn border p-1 col-4 mx-1">
                        Theo d??i
                      </button>
                      <button className="btn border p-1 col-4 mx-1">
                        Chat
                      </button>
                      <Link
                        className="btn border p-1 col-4 mx-1"
                        to={`/shop-detail/${shopId}`}
                      >
                        Xem shop
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8 border-start d-flex justify-content-center align-items-center">
            <div className="row" style={{ width: "80%" }}>
              <div className="col-4 d-flex align-items-center mb-2">
                S???n Ph???m:
                <b className="ms-1">{shopDetail.numberOfProducts || "-"}</b>
              </div>
              <div className="col-4 d-flex align-items-center mb-2">
                ??ang Theo D??i:
                <b className="ms-1">{shopDetail.numberOfReviews}</b>
              </div>
              <div className="col-4 d-flex align-items-center mb-2">
                T??? L??? Ph???n H???i Chat:
                <b className="ms-1  d-flex align-items-center ">
                  {shopDetail.pertcentageOfChatFeedbacks || "-"}
                </b>
              </div>
              <div className="col-4 d-flex align-items-center">
                ????nh Gi??:
                <b className="ms-1">{shopDetail.averageRating || "-"}</b>
              </div>
              <div className="col-4 d-flex align-items-center">
                Ng?????i Theo D??i:
                <b className="ms-1">{shopDetail.numberOfFollowers}</b>
              </div>
              <div className="col-4 d-flex align-items-center">
                Tham Gia:
                <b className="ms-1">
                  {shopDetail.createdTime &&
                    shopDetail.createdTime.slice(8, 10) + '-' + shopDetail.createdTime.slice(5, 7) + '-' + shopDetail.createdTime.slice(0, 4)}
                </b>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="container product-detail-product-detail-container"
        data-bs-spy="scroll"
        data-bs-target="#navbar-example2"
        data-bs-offset="0"
        class="scrollspy-example"
        tabindex="0"
      >
        <div className="row product-detail-row mt-3 px-1">
          <div className="card product-detail-product-detail-card p-5">
            <h5 className="card-product-detail-title">Chi Ti???t S???n Ph???m</h5>
            <div className="p-2 d-flex flex-row path-link">
              <a style={{ marginRight: '10px' }}>Danh M???c: </a>
              {'  '}
              <a style={{ color: Color.tanhide }} href="/">
                SalePlus
              </a>
              <div className="px-2">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </div>
              <a>{productDetail.categoryLevel1VieName}</a>
              <div className="px-2">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </div>
              <a>{productDetail.categoryLevel2VieName}</a>
              <div className="px-2 ">
                <ion-icon name="chevron-forward-outline"></ion-icon>
              </div>
              <a>{productDetail.categoryLevel3VieName}</a>
              {productDetail.categoryLevel4VieName != '' && (
                <div className="px-2">
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
              )}
              <a>{productDetail.categoryLevel4VieName}</a>
              {productDetail.categoryLevel4VieName != '' && (
                <div className="px-2">
                  <ion-icon name="chevron-forward-outline"></ion-icon>
                </div>
              )}
              <a>{productDetail.categoryLevel5VieName}</a>
            </div>
            <div className="p-2">Kho H??ng:</div>
            <div className="p-2">
              K??ch Th?????c(cm): {productDetail.height} X {productDetail.width} X{' '}
              {productDetail.depth}
            </div>
            <div className="p-2">
              T??nh Tr???ng: {productDetail.isNewProduct == 1 ? 'M???i' : 'C??'}
            </div>
            <div className="p-2">
              Cho ?????t Tr?????c:{' '}
              {productDetail.isPreorderedProduct == 1 ? 'C??' : 'Kh??ng'}
            </div>
            <div className="p-2">G???i T???:</div>
          </div>
          <div className="card product-detail-description-card p-5 mt-3">
            <h5 className="card-product-detail-title">M?? T??? S???n Ph???m</h5>
            <div className="p-2" style={{ whiteSpace: "pre-line", fontSize: "14px" }}>
              {productDetail.productDescription}
            </div>
          </div>
          <div
            className="card product-detail-rate-card p-5 mt-3"
            id="scrollspyHeading1"
          >
            <h5 className="card-product-detail-title">????NH GI?? S???N PH???M</h5>
            <div className="row product-detail-rate-row">
              <div className="col-4"> ????NH GI?? S???N PH???M:</div>
              <div className="col-8">
                <button
                  className={
                    buttonRateState == 'all'
                      ? 'sort-rate-button rate-active'
                      : 'sort-rate-button'
                  }
                  onClick={() => setButtonRateState('all')}
                >
                  T???t C???
                </button>
                <button
                  className={
                    buttonRateState == '5star'
                      ? 'sort-rate-button rate-active'
                      : 'sort-rate-button'
                  }
                  onClick={() => setButtonRateState('5star')}
                >
                  5 Sao
                </button>
                <button
                  className={
                    buttonRateState == '4star'
                      ? 'sort-rate-button rate-active'
                      : 'sort-rate-button'
                  }
                  onClick={() => setButtonRateState('4star')}
                >
                  4 Sao
                </button>
                <button
                  className={
                    buttonRateState == '3star'
                      ? 'sort-rate-button rate-active'
                      : 'sort-rate-button'
                  }
                  onClick={() => setButtonRateState('3star')}
                >
                  3 Sao
                </button>
                <button
                  className={
                    buttonRateState == '2star'
                      ? 'sort-rate-button rate-active'
                      : 'sort-rate-button'
                  }
                  onClick={() => setButtonRateState('2star')}
                >
                  2 Sao
                </button>
                <button
                  className={
                    buttonRateState == '1star'
                      ? 'sort-rate-button rate-active'
                      : 'sort-rate-button'
                  }
                  onClick={() => setButtonRateState('1star')}
                >
                  1 Sao
                </button>
                <button
                  className={
                    buttonRateState == 'hascmt'
                      ? 'sort-rate-button rate-active'
                      : 'sort-rate-button'
                  }
                  onClick={() => setButtonRateState('hascmt')}
                >
                  C?? B??nh Lu???n
                </button>
                <button
                  className={
                    buttonRateState == 'hasimg'
                      ? 'sort-rate-button rate-active'
                      : 'sort-rate-button'
                  }
                  onClick={() => setButtonRateState('hasimg')}
                >
                  C?? H??nh ???nh/ Video
                </button>
              </div>
            </div>
          </div>
          <div className="card product-detail-description-card p-5 mt-3">
            <h5 className="card-product-detail-title">s???n ph???m c???a shop</h5>
            <div className="row p-1">
              {productList.map((item) => {
                return <div className="col p-0" style={{ width: "20%" }}>
                  <Product useFor="buyer" data={item} />
                </div>
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
