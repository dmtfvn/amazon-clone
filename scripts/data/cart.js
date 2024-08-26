export let cart = [{
  productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
  quantity: 2
}, {
  productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
  quantity: 1
}];

export function addToCart(productId) {
  let matchItem;

  cart.forEach((cartObj) => {
    if (productId === cartObj.productId) {
      matchItem = cartObj;
    }
  });

  if (matchItem) {
    matchItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartObj) => {
    if (cartObj.productId !== productId) {
      newCart.push(cartObj);
    }
  });

  cart = newCart;
}