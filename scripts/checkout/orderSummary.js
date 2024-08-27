import { getProduct } from '../data/products.js';
import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { formatCurrency } from '../utils/money.js';
import { deliveryOptions, getDeliveryOption } from '../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';

import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function renderOrderSummary () {
  let cartSummaryHTML = '';

  cart.forEach((cartObj) => {
    const productId = cartObj.productId;

    const matchPtoduct = getProduct(productId);

    const deliveryOptionId = cartObj.deliveryOptionId;

    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const curDate = dayjs();
    const deliveryDate = curDate.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM, D');

    cartSummaryHTML += `
      <div class="cart-item-container js-cart-item-container-${matchPtoduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchPtoduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchPtoduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchPtoduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartObj.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link"
              data-product-id="${matchPtoduct.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchPtoduct, cartObj)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(matchPtoduct, cartObj) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const curDate = dayjs();
      const deliveryDate = curDate.add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM, D');

      const priceString = deliveryOption.priceCents === 0
        ? 'FREE'
        : `%${formatCurrency(deliveryOption.priceCents)}`
      ;

      const isChecked = deliveryOption.id === cartObj.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option"
        data-product-id="${matchPtoduct.id}"
        data-delivery-option-id="${deliveryOption.id}">
          <input type="radio"
            ${isChecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchPtoduct.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              $${priceString} - Shipping
            </div>
          </div>
        </div>
      `;
    });

    return html;
  }

  const checkoutList = document.querySelector('.js-order-summary');
  checkoutList.innerHTML = cartSummaryHTML;

  const deleteButtons = document.querySelectorAll('.js-delete-link');
  deleteButtons.forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      renderPaymentSummary();
    });
  });

  const radioButtons = document.querySelectorAll('.js-delivery-option');
  radioButtons.forEach((elem) => {
    elem.addEventListener('click', () => {
      const {productId, deliveryOptionId} = elem.dataset;

      updateDeliveryOption(productId, deliveryOptionId);

      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}