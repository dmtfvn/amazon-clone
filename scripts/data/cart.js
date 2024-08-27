// export let cart = JSON.parse(localStorage.getItem('cart')) || '[]';
export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionId: '2'
  }];
}

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