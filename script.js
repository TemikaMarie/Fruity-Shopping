/* Create an array named products which you will use to add all of your product object literals that you create in the next step. */

const products = [
  {
    name: "Orange",
    price: 9,
    quantity: 0,
    productId: 101,
    image: "../images/orange.jpg",
  },
  {
    name: "Cherry",
    price: 7,
    quantity: 0,
    productId: 102,
    image: "../images/cherry.jpg",
  },
  {
    name: "Strawberry",
    price: 5,
    quantity: 0,
    productId: 103,
    image: "../images/strawberry.jpg",
  },
];

/* Declare an empty array named cart to hold the items in the cart */
const cart = [];

/* Create a function named addProductToCart that takes in the product productId as an argument */
const productMap = new Map(products.map((prod) => [prod.productId, prod]));

function addProductToCart(productId) {
  const product = productMap.get(productId);
  if (!product) {
    return;
  }
  if (product.quantity === 0) {
    cart.push(product);
  }
  product.quantity += 1;
}

/* Create a function named increaseQuantity that takes in the productId as an argument */
function increaseQuantity(productId) {
  const product = productMap.get(productId);
  if (product) {
    product.quantity += 1;
  }
}

/* Create a function named decreaseQuantity that takes in the productId as an argument */
function decreaseQuantity(productId) {
  const product = productMap.get(productId);
  if (product && product.quantity > 0) {
    product.quantity -= 1;
    if (product.quantity === 0) {
      removeFromCart(product);
    }
  }
}

function removeFromCart(product) {
  const prodIdx = cart.indexOf(product);
  if (prodIdx > -1) {
    cart.splice(prodIdx, 1);
  }
}

/* Create a function named removeProductFromCart that takes in the productId as an argument */
function removeProductFromCart(productId) {
  const product = productMap.get(productId);
  if (product) {
    product.quantity = 0;
    removeFromCart(product);
  }
}

/* Create a function named cartTotal that has no parameters */
function cartTotal() {
  return cart.reduce((sum, product) => {
    return sum + product.quantity * product.price;
  }, 0);
}

/* Create a function called emptyCart that empties the products from the cart */
function emptyCart() {
  cart.forEach(product => product.quantity = 0);
  cart.length = 0; // Clears the cart array
}

/* Create a function named pay that takes in an amount as an argument */
let totalPaid = 0;

function pay(amount) {
  const total = cartTotal();
  totalPaid += amount;
  const remainingBalance = totalPaid - total;

  if (remainingBalance >= 0) {
    emptyCart();         // Empty the cart
    totalPaid = 0;       // Reset totalPaid to 0
  }

  return remainingBalance;
}

/* Exporting modules for testing */
module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay, 
  emptyCart,
  /* Uncomment the following line if completing the currency converter bonus */
  // currency
};
