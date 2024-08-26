export const cart = [];

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
      productId,
      quantity: 1
    });
  }
}