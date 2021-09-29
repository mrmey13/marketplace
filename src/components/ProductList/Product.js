import React, { useState } from "react";
import { Popover, Button, OverlayTrigger } from "react-bootstrap";
import "./Product.css";
import Color from "../../theme/color";
import { Link } from "react-router-dom";
function Product({ data, useFor }) {
  const List = [
    "https://images.unsplash.com/photo-1521093470119-a3acdc43374a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1518417823698-91652324a3f3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80",
    "https://images.unsplash.com/photo-1521903062400-b80f2cb8cb9d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80",
  ];
  const Statement = useState(List[Math.floor(Math.random() * 4)]);
  // const isDark = localStorage.getItem("aidriven-general-theme");
  return (
    <div
      className={
        useFor == "bestseller"
          ? "product_container"
          : "col-2  product_container"
      }
    >
      <div
        className="card-course"
        style={useFor == "seller" ? { marginRight: "10px" } : null}
      >
        <Link
          className="h5 text-dark fw-bold text-decoration-none stretched-link"
          to={
            useFor == "seller"
              ? "/product_detail/" + data.productId
              : "/product_detail"
          }
        ></Link>
        <span
          class="badge discount-badge"
          style={{ backgroundColor: Color.christine }}
        >
          <div style={{ fontSize: "10px" }}>DISCOUNT</div>{" "}
          <div style={{ color: "black", marginTop: "2px", fontSize: "12px" }}>
            <b>20%</b>
          </div>
        </span>
        <img src={Statement} className="card-img-top" alt="..." />
        <div className="card-body">
          <div className="card-content">
            <div className="card-top">
              <button className="card-star">
                <b style={{ marginLeft: "5px" }}>3,4</b>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png"
                  alt="star-icon"
                  style={{ width: "15px", marginLeft: "5px" }}
                />
              </button>
              <h6
                className="card-title card-product-name"
                style={{ fontSize: "14px" }}
              >
                Giày thể thao Nike mới nhất trong năm 2021 thanh vu dinh
              </h6>
              {/* <div className="card-user">
                <img
                  src="https://images.unsplash.com/photo-1554151228-14d9def656e4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=633&q=80"
                  alt=""
                  className="card-user-avatar"
                />
                <div className="card-user-info">
                  <div className="card-user-top">
                    <h4 className="card-user-name">{data.trainerFullname}</h4>
                    <ion-icon name="checkmark-circle"></ion-icon>
                  </div>
                </div>
                <OverlayTrigger
                  trigger="click"
                  placement="bottom"
                  overlay={
                    <Popover id="popover-basic">
                      <Popover.Header className="popover-header" as="h3">
                        More Information
                      </Popover.Header>
                      <Popover.Body>
                        <p>
                          <b>Description: </b>
                          {data.moduleDescription}
                        </p>
                        <p>
                          <b>Schedule: </b>
                          {data.scheduleInfo}
                        </p>
                      </Popover.Body>
                    </Popover>
                  }
                >
                  <Button variant="outline-none" id="popovers-icon">
                    <ion-icon name="ellipsis-vertical-outline"></ion-icon>
                  </Button>
                </OverlayTrigger>
              </div> */}
              <div className="card-time"></div>
            </div>
            <div className="card-price d-flex">
              <div className="product-price d-flex">
                <div className="disc-price">
                  <h6
                    style={{
                      color: "#F26A0D",
                      width: "fit-content",
                      marginRight: "5px",
                    }}
                  >
                    150000
                    <sub
                      style={{
                        width: "fit-content",
                        marginLeft: "5px",
                        color: "black",
                      }}
                    >
                      <u>đ</u>
                    </sub>
                  </h6>
                </div>
                {/* <div className="price ">
                  <del
                    style={{
                      fontSize: "14px",
                      color: "#000000",
                      width: "fit-content",
                      marginRight: "5px",
                    }}
                  >
                    150000
                    <sub
                      style={{
                        width: "fit-content",
                        marginLeft: "5px",
                        color: "black",
                      }}
                    >
                      <u>đ</u>
                    </sub>
                  </del>
                </div> */}
              </div>
              <img
                className="free-ship-img"
                src="https://cdn-icons-png.flaticon.com/512/3306/3306060.png"
                alt="free ship"
              />
            </div>
            <div className="card-bottom">
              <div className="card-watching text-align-end">Đã bán</div>
              <div className="card-watching text-align-end">
                Hà Nội
                {/* <div class="_1LYq_U ">
                  <div class="rating-stars__container d-flex">
                    <svg
                      viewBox="0 0 9.5 8"
                      class="shopee-svg-icon rating-stars__star icon-rating-colored"
                      style={{ width: "14px", height: "14px" }}
                    >
                      <defs>
                        <linearGradient
                          id="ratingStarGradient"
                          x1="50%"
                          x2="50%"
                          y1="0%"
                          y2="100%"
                        >
                          <stop offset="0" stop-color="#ffca11"></stop>
                          <stop offset="1" stop-color="#ffad27"></stop>
                        </linearGradient>
                        <polygon
                          id="ratingStar"
                          points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"
                        ></polygon>
                      </defs>
                      <g
                        fill="url(#ratingStarGradient)"
                        fill-rule="evenodd"
                        stroke="none"
                        stroke-width="1"
                      >
                        <g transform="translate(-876 -1270)">
                          <g transform="translate(155 992)">
                            <g transform="translate(600 29)">
                              <g transform="translate(10 239)">
                                <g transform="translate(101 10)">
                                  <use stroke="#ffa727" stroke-width=".5"></use>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <svg
                      viewBox="0 0 9.5 8"
                      class="shopee-svg-icon rating-stars__star icon-rating-colored"
                    >
                      <defs>
                        <linearGradient
                          id="ratingStarGradient"
                          x1="50%"
                          x2="50%"
                          y1="0%"
                          y2="100%"
                        >
                          <stop offset="0" stop-color="#ffca11"></stop>
                          <stop offset="1" stop-color="#ffad27"></stop>
                        </linearGradient>
                        <polygon
                          id="ratingStar"
                          points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"
                        ></polygon>
                      </defs>
                      <g
                        fill="url(#ratingStarGradient)"
                        fill-rule="evenodd"
                        stroke="none"
                        stroke-width="1"
                      >
                        <g transform="translate(-876 -1270)">
                          <g transform="translate(155 992)">
                            <g transform="translate(600 29)">
                              <g transform="translate(10 239)">
                                <g transform="translate(101 10)">
                                  <use stroke="#ffa727" stroke-width=".5"></use>
                                </g>
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </svg>
                    <div
                      class="rating-stars__star _2Jb05n"
                      style={{ width: "14px", height: "14px" }}
                    >
                      <svg viewBox="0 0 30 30" class="_3c6iA8">
                        <defs>
                          <linearGradient
                            id="star__hollow"
                            x1="50%"
                            x2="50%"
                            y1="0%"
                            y2="99.0177926%"
                          >
                            <stop offset="0%" stop-color="#FFD211"></stop>
                            <stop offset="100%" stop-color="#FFAD27"></stop>
                          </linearGradient>
                        </defs>
                        <path
                          fill="none"
                          fill-rule="evenodd"
                          stroke="url(#star__hollow)"
                          stroke-width="2"
                          d="M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z"
                        ></path>
                      </svg>
                      <svg
                        viewBox="0 0 30 30"
                        class="_3c6iA8"
                        style={{ width: "14px", height: "14px" }}
                      >
                        <defs>
                          <linearGradient
                            id="star__solid"
                            x1="50%"
                            x2="50%"
                            y1="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stop-color="#FFCA11"></stop>
                            <stop offset="100%" stop-color="#FFAD27"></stop>
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#star__solid)"
                          fill-rule="evenodd"
                          d="M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z"
                        ></path>
                      </svg>
                    </div>
                    <div
                      class="rating-stars__star _2Jb05n"
                      style={{ width: "14px", height: "14px" }}
                    >
                      <svg viewBox="0 0 30 30" class="_3c6iA8">
                        <defs>
                          <linearGradient
                            id="star__hollow"
                            x1="50%"
                            x2="50%"
                            y1="0%"
                            y2="99.0177926%"
                          >
                            <stop offset="0%" stop-color="#FFD211"></stop>
                            <stop offset="100%" stop-color="#FFAD27"></stop>
                          </linearGradient>
                        </defs>
                        <path
                          fill="none"
                          fill-rule="evenodd"
                          stroke="url(#star__hollow)"
                          stroke-width="2"
                          d="M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z"
                        ></path>
                      </svg>
                      <svg
                        viewBox="0 0 30 30"
                        class="_3c6iA8"
                        style={{ width: "14px", height: "14px" }}
                      >
                        <defs>
                          <linearGradient
                            id="star__solid"
                            x1="50%"
                            x2="50%"
                            y1="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stop-color="#FFCA11"></stop>
                            <stop offset="100%" stop-color="#FFAD27"></stop>
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#star__solid)"
                          fill-rule="evenodd"
                          d="M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z"
                        ></path>
                      </svg>
                    </div>
                    <div
                      class="rating-stars__star _2Jb05n"
                      style={{ width: "14px", height: "14px" }}
                    >
                      <svg viewBox="0 0 30 30" class="_3c6iA8">
                        <defs>
                          <linearGradient
                            id="star__hollow"
                            x1="50%"
                            x2="50%"
                            y1="0%"
                            y2="99.0177926%"
                          >
                            <stop offset="0%" stop-color="#FFD211"></stop>
                            <stop offset="100%" stop-color="#FFAD27"></stop>
                          </linearGradient>
                        </defs>
                        <path
                          fill="none"
                          fill-rule="evenodd"
                          stroke="url(#star__hollow)"
                          stroke-width="2"
                          d="M23.226809 28.390899l-1.543364-9.5505903 6.600997-6.8291523-9.116272-1.4059447-4.01304-8.63019038-4.013041 8.63019038-9.116271 1.4059447 6.600997 6.8291523-1.543364 9.5505903 8.071679-4.5038874 8.071679 4.5038874z"
                        ></path>
                      </svg>
                      <svg
                        viewBox="0 0 30 30"
                        class="_3c6iA8"
                        style={{ width: "14px", height: "14px" }}
                      >
                        <defs>
                          <linearGradient
                            id="star__solid"
                            x1="50%"
                            x2="50%"
                            y1="0%"
                            y2="100%"
                          >
                            <stop offset="0%" stop-color="#FFCA11"></stop>
                            <stop offset="100%" stop-color="#FFAD27"></stop>
                          </linearGradient>
                        </defs>
                        <path
                          fill="url(#star__solid)"
                          fill-rule="evenodd"
                          d="M14.9988798 25.032153l-8.522024 4.7551739c-.4785069.2670004-.7939037.0347448-.7072938-.5012115l1.6339124-10.1109185-6.8944622-7.1327607c-.3871203-.4005006-.2499178-.7947292.2865507-.8774654l9.5090982-1.46652789L14.5740199.51703028c.2346436-.50460972.6146928-.50543408.8497197 0l4.2693588 9.18141263 9.5090986 1.46652789c.545377.0841102.680337.4700675.28655.8774654l-6.894462 7.1327607 1.633912 10.1109185c.08788.5438118-.232337.7662309-.707293.5012115l-8.5220242-4.7551739z"
                        ></path>
                      </svg>
                    </div>
                  </div>{" "}
                  trở lên
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
