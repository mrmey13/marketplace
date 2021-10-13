import React, { useEffect, useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Portal from '@mui/material/Portal';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import axios from 'axios';

import cs from '../../const';

const UPDATE_CART_URL = cs.BaseURL + '/api/buyer/cart/edit';
const REMOVE_ITEM_FROM_CART_URL = cs.BaseURL + '/api/buyer/cart/delete';

function CartItem({ item }) {
  const [open, setOpen] = useState(false);
  const [variation1, setVariation1] = useState(
    item.variationArray.filter((item) => item.id == 1)
  );
  const [variation2, setVariation2] = useState(
    item.variationArray.filter((item) => item.id == 2)
  );
  const [variationIndex1, setVariationIndex1] = useState('');
  const [variationIndex2, setVariationIndex2] = useState('');
  const [quantity, setQuantity] = useState(item.quantity);
  const [variationIndex, setVariationIndex] = useState('');

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevQuantity = usePrevious(quantity);
  const prevVariationIndex = usePrevious(variationIndex);

  useEffect(() => {
    if (prevQuantity != quantity || prevVariationIndex != variationIndex) {
      updateCart();
    }
  }, [quantity, variationIndex]);

  const updateCart = async () => {
    let url = '';
    if (prevQuantity != quantity)
      url = `${UPDATE_CART_URL}?id=${item.id}&quantity=${quantity}`;
    if (prevVariationIndex != variationIndex)
      url = `${UPDATE_CART_URL}?id=${item.id}&variationIndex=${variationIndex}`;
    try {
      const res = await axios({
        method: 'POST',
        url: url,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
      });
      if (res.data.error_code == 0) {
      } else {
      }
    } catch (error) {}
  };

  const mediaURL =
    item.productImages.length != 0
      ? `${cs.MediaURL}/media/${item.productImages[0].path}`
      : '';

  const handleClickOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleClickVariation1 = (e) => {
    setVariationIndex1(e.target.value);
  };

  const handleClickVariation2 = (e) => {
    setVariationIndex2(e.target.value);
  };

  const decreaseQuantity = async () => {
    if (quantity == 1) {
      removeItemFromCart();
    } else {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = async () => {
    setQuantity(quantity + 1);
    console.log(quantity);
  };

  const handleClickAgree = () => {
    console.log(variationIndex1);
    console.log(variationIndex2);

    let variationIndex = '';
    if (variationIndex1 == '') return alert('Chọn phân loại hàng');
    if (variation2.length != 0) {
      if (variationIndex2 == '') return alert('Chọn phân loại hàng');
      variationIndex = variationIndex1 + '_' + variationIndex2;
    } else {
      variationIndex = variationIndex1;
    }
    setVariationIndex(variationIndex);
  };

  const removeItemFromCart = async () => {
    try {
      const res = await axios({
        method: 'POST',
        url: `${REMOVE_ITEM_FROM_CART_URL}?id=${item.id}`,
        headers: {
          Authorization: localStorage.getItem(cs.System_Code + '-token'),
        },
      });
      if (res.data.error_code == 0) {
        alert('Success');
        window.location.reload();
      } else {
        alert('Error');
      }
    } catch (error) {}
  };

  return (
    <div className="r2jApx">
      <div className="_216OLk MDvvnL">
        <div className="_1GcTXp">
          <div className="uUhc_B">
            <label className="stardust-checkbox">
              <input className="stardust-checkbox__input" type="checkbox" />
              <div className="stardust-checkbox__box"></div>
            </label>
          </div>
          <div className="_2pPbjQ">
            <div className="YxpsCR">
              <a title={item.productName}>
                <div
                  className="_3SWf-5"
                  style={{ backgroundImage: `url(${mediaURL})` }}
                ></div>
              </a>
              <div className="_3OrWGt">
                <a className="_2fQT1K" title="" href="">
                  {item.productName}
                </a>
                <div className="_2o95Vf"></div>
                <div className="_931iK8">
                  <span></span>
                </div>
              </div>
            </div>
          </div>
          <div className="_30hIFE">
            <div className="_3b-8ro">
              <div className="ns42ir" role="button" tabindex="0">
                <div className="aXmvTj">
                  Phân loại hàng:
                  <ClickAwayListener onClickAway={handleClickAway}>
                    <Box sx={{ position: 'relative' }}>
                      <button
                        type="button"
                        className="_2Ipt-j"
                        onClick={handleClickOpen}
                      ></button>
                      {open ? (
                        <Box>
                          <div class="xVCpY7 shopee-modal__transition-enter-done">
                            <div class="shopee-arrow-box__container">
                              <div class="shopee-arrow-box__arrow shopee-arrow-box__arrow--center">
                                <div class="shopee-arrow-box__arrow-outer">
                                  <div class="shopee-arrow-box__arrow-inner"></div>
                                </div>
                              </div>
                              <div class="shopee-arrow-box__content">
                                <div class="sgHDOS">
                                  <div class="_3VArGP">
                                    {variation1.map((item) => (
                                      <div class="_2dGEqA">
                                        <div class="-wGaUX">{item.name}</div>
                                        {item.options.map((option) => (
                                          <button
                                            class="product-variation"
                                            value={option.optionId}
                                            onClick={handleClickVariation1}
                                          >
                                            {option.optionValue}
                                          </button>
                                        ))}
                                      </div>
                                    ))}

                                    {variation2.map((item) => (
                                      <div class="_2dGEqA">
                                        <div class="-wGaUX">{item.name}</div>
                                        {item.options.map((option) => (
                                          <button
                                            class="product-variation"
                                            value={option.optionId}
                                            onClick={handleClickVariation2}
                                          >
                                            {option.optionValue}
                                          </button>
                                        ))}
                                      </div>
                                    ))}

                                    <div class="_1_zHs0">
                                      <button
                                        class="cancel-btn"
                                        onClick={handleClickOpen}
                                      >
                                        Trở Lại
                                      </button>
                                      <button
                                        class="shopee-button-solid shopee-button-solid--primary"
                                        onClick={handleClickAgree}
                                      >
                                        Xác nhận
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Box>
                      ) : null}
                    </Box>
                  </ClickAwayListener>
                </div>
                <div className="GU_XoN">{item.variationName}</div>
              </div>
            </div>
          </div>

          <div className="Ra8lP2">
            <div>
              <span className="_1CXksa">{item.price}</span>
            </div>
          </div>
          <div className="_2ZUrV7">
            <div className="eLoUcd shopee-input-quantity">
              <button className="_2sBbZC" onClick={decreaseQuantity}>
                <svg
                  enable-background="new 0 0 10 10"
                  viewBox="0 0 10 10"
                  x="0"
                  y="0"
                  className="shopee-svg-icon "
                >
                  <polygon points="4.5 4.5 3.5 4.5 0 4.5 0 5.5 3.5 5.5 4.5 5.5 10 5.5 10 4.5"></polygon>
                </svg>
              </button>
              <input
                className="_2sBbZC k-s4Da"
                type="text"
                role="spinbutton"
                aria-valuenow="1"
                value={quantity}
              />
              <button className="_2sBbZC" onClick={increaseQuantity}>
                <svg
                  enable-background="new 0 0 10 10"
                  viewBox="0 0 10 10"
                  x="0"
                  y="0"
                  className="shopee-svg-icon icon-plus-sign"
                >
                  <polygon points="10 4.5 5.5 4.5 5.5 0 4.5 0 4.5 4.5 0 4.5 0 5.5 4.5 5.5 4.5 10 5.5 10 5.5 5.5 10 5.5"></polygon>
                </svg>
              </button>
            </div>
          </div>
          <div className="dn3H7Y">
            <span>{item.price * quantity}</span>
          </div>
          <div className="_2y8iJi _2qPRqW">
            <button className="RCd1Gx" onClick={removeItemFromCart}>
              Xóa
            </button>
          </div>
        </div>
        <div className="_2aRlry"></div>
      </div>
    </div>
  );
}

export default CartItem;
