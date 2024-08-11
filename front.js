let currencySymbol = '$';

// Draws product list
function drawProducts() {
    const productList = document.querySelector('.products');
    let productItems = '';
    products.forEach((element) => {
        productItems += `
            <div data-productId='${element.productId}'>
                <img src='${element.image}' alt='${element.name}'>
                <h3>${element.name}</h3>
                <p>Price: ${currencySymbol}${element.price}</p>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        `;
    });
    productList.innerHTML = productItems;
}

// Draws cart
function drawCart() {
    const cartList = document.querySelector('.cart');
    let cartItems = '';
    cart.forEach((element) => {
        const itemTotal = element.price * element.quantity;

        cartItems += `
            <div data-productId='${element.productId}'>
                <h3>${element.name}</h3>
                <p>Price: ${currencySymbol}${element.price}</p>
                <p>Quantity: ${element.quantity}</p>
                <p>Total: ${currencySymbol}${itemTotal.toFixed(2)}</p>
                <button class="qup">+</button>
                <button class="qdown">-</button>
                <button class="remove">Remove</button>
            </div>
        `;
    });
    cartList.innerHTML = cart.length ? cartItems : 'Cart Empty';
}

// Draws checkout
function drawCheckout() {
    const checkout = document.querySelector('.cart-total');
    checkout.innerHTML = '';

    const cartSum = cartTotal();

    const div = document.createElement('div');
    div.innerHTML = `<p>Cart Total: ${currencySymbol}${cartSum.toFixed(2)}</p>`;
    checkout.append(div);
}

// Initialize store with products, cart, and checkout
drawProducts();
drawCart();
drawCheckout();

document.querySelector('.products').addEventListener('click', (e) => {
    const button = e.target;
    if (button.classList.contains('add-to-cart')) {
        const productId = parseInt(button.parentNode.getAttribute('data-productId'));
        addProductToCart(productId);
        drawCart();
        drawCheckout();
    }
});

// Event delegation for dynamically added cart items
document.querySelector('.cart').addEventListener('click', (e) => {
    const button = e.target;
    if (button.classList.contains('remove')) {
        const productId = parseInt(button.parentNode.getAttribute('data-productId'));
        removeProductFromCart(productId);
    } else if (button.classList.contains('qup')) {
        const productId = parseInt(button.parentNode.getAttribute('data-productId'));
        increaseQuantity(productId);
    } else if (button.classList.contains('qdown')) {
        const productId = parseInt(button.parentNode.getAttribute('data-productId'));
        decreaseQuantity(productId);
    }
    drawCart();
    drawCheckout();
});

document.querySelector('.pay').addEventListener('click', (e) => {
    e.preventDefault();

    const amount = parseFloat(document.querySelector('.received').value);
    const cashReturn = pay(amount);

    const paymentSummary = document.querySelector('.pay-summary');
    const div = document.createElement('div');

    if (cashReturn >= 0) {
        div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount.toFixed(2)}</p>
            <p>Cash Returned: ${currencySymbol}${cashReturn.toFixed(2)}</p>
            <p>Thank you!</p>
        `;
    } else {
        document.querySelector('.received').value = '';
        div.innerHTML = `
            <p>Cash Received: ${currencySymbol}${amount.toFixed(2)}</p>
            <p>Remaining Balance: ${currencySymbol}${Math.abs(cashReturn).toFixed(2)}</p>
            <p>Please pay additional amount.</p>
            <hr/>
        `;
    }

    paymentSummary.innerHTML = ''; // Clear previous content
    paymentSummary.append(div);
});

// Standout suggestions
// Begin remove all items from cart
function dropCart() {
    const emptyCartButton = document.createElement('button');
    emptyCartButton.classList.add('empty');
    emptyCartButton.innerHTML = 'Empty Cart';
    document.querySelector('.empty-btn').append(emptyCartButton);
}
dropCart();

document.querySelector('.empty-btn').addEventListener('click', (e) => {
    if (e.target.classList.contains('empty')) {
        emptyCart();
        drawCart();
        drawCheckout();
    }
});

// Begin currency converter
function currencyBuilder() {
    const currencyPicker = document.querySelector('.currency-selector');
    const select = document.createElement('select');
    select.classList.add('currency-select');
    select.innerHTML = `
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="YEN">YEN</option>
    `;
    currencyPicker.append(select);
}
currencyBuilder();

document.querySelector('.currency-select').addEventListener('change', function handleChange(event) {
    switch(event.target.value) {
        case 'EUR':
            currencySymbol = '€';
            break;
        case 'YEN':
            currencySymbol = '¥';
            break;
        default:
            currencySymbol = '$';
            break;
    }

    drawProducts();
    drawCart();
    drawCheckout();
});
