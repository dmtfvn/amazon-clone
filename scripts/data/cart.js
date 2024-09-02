export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, quantity) {
  let matchItem;

  cart.forEach((cartObj) => {
    if (cartObj.productId === productId) {
      matchItem = cartObj;
    }
  });

  if (matchItem) {
    matchItem.quantity += quantity;
  } else {
    cart.push({
      productId,
      quantity,
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