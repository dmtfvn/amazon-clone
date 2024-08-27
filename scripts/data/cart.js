export let cart = JSON.parse(localStorage.getItem('cart')) || '[]';

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId) {
  let matchItem;

  cart.forEach((cartObj) => {
    if (cartObj.productId === productId) {
      matchItem = cartObj;
    }
  });

  if (matchItem) {
    matchItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToLocalStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartObj) => {
    if (cartObj.productId !== productId) {
      newCart.push(cartObj);
    }
  });

  cart = newCart;

  saveToLocalStorage();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchItem;

  cart.forEach((cartObj) => {
    if (cartObj.productId === productId) {
      matchItem = cartObj;
    }
  });

  matchItem.deliveryOptionId = deliveryOptionId;

  saveToLocalStorage();
}