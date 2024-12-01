let listOfProducts = [
    {
       productId: 0, 
       productImage: './assets/images/image-waffle-desktop.jpg' ,
       productName: 'Waffle',
       productDescription: 'Waffle with Berries',
       productPrice: 6.50,
       productQuantity: 1
    },
    {
        productId: 1, 
        productImage: './assets/images/image-creme-brulee-desktop.jpg' ,
        productName: 'Crème Brûlée',
        productDescription: 'Vanilla Bean Crème Brûlée',
        productPrice: 7.00,
        productQuantity: 1
     },
     {
        productId: 2, 
        productImage: './assets/images/image-macaron-tablet.jpg' ,
        productName: 'Macaron',
        productDescription: 'Macaron Mix of Five',
        productPrice: 8.00,
        productQuantity: 1
     },
     {
        productId: 3, 
        productImage: './assets/images/image-tiramisu-desktop.jpg' ,
        productName: 'Tiramisu',
        productDescription: 'Classic Tiramisu',
        productPrice: 5.50,
        productQuantity: 1
     },
     {
        productId: 4, 
        productImage: './assets/images/image-baklava-tablet.jpg' ,
        productName: 'Baklava',
        productDescription: 'Pistachio Baklava',
        productPrice: 4.00,
       productQuantity: 1
     },
     {
        productId: 5, 
        productImage: './assets/images/image-meringue-desktop.jpg' ,
        productName: 'Pie',
        productDescription: 'Lemon Meringue Pie',
        productPrice: 5.00,
        productQuantity: 1
     },
     {
        productId: 6, 
        productImage: './assets/images/image-cake-tablet.jpg' ,
        productName: 'Cake',
        productDescription: 'Red Velvet Cake',
        productPrice: 4.50,
        productQuantity: 1
     },
     {
        productId: 7, 
        productImage: './assets/images/image-brownie-tablet.jpg' ,
        productName: 'Brownie',
        productDescription: 'Salted Caramel Brownie',
        productPrice: 4.50,
        productQuantity: 1
     },
     {
        productId: 8, 
        productImage: './assets/images/image-panna-cotta-tablet.jpg' ,
        productName: 'Panna Cotta',
        productDescription: 'Vanilla Panna Cotta',
        productPrice: 6.50,
        productQuantity: 1
     }
]

const Products = document.getElementById('products');
listOfProducts.forEach((element, index) => {
    Products.innerHTML += `
        <div class="product col-lg-4 col-md-6 col-sm"> 
            <div class="product-image position-relative">
                <div class="img">
                    <img src="${element.productImage}" alt="${element.productName}" width="100%" class="rounded-3">
                </div>
                <button 
                    type="button" 
                    class="btn btn-light rounded-5 dtc-btn position-absolute px-4 d-flex align-items-center justify-content-center gap-2" 
                    id="addToCart" 
                    onclick="showAndHide(${index})">
                    <i class="fa-solid fa-cart-plus"></i>Add to Cart
                </button>
                <div 
                    class="bg-light rounded-5 dtc-btn position-absolute px-4 d-flex align-items-center justify-content-center gap-3 inc-1" 
                    id="addToCart2">
                    <span class="inc pb-1 fs-3 minus">-</span>
                    <span class="amount">01</span>
                    <span class="inc pb-1 plus"><b>+</b></span>
                </div>
            </div>
            <div class="description mt-4">
                <p class="name-of-item">${element.productName}</p>
                <p><b>${element.productDescription}</b></p>
                <p class="price"><b>$${element.productPrice.toFixed(2)}</b></p>
            </div>
        </div>
    `;
});

const showAndHide = (index) => {
   console.log("clicked", index);
   
   const addToCart2 = document.querySelectorAll('#addToCart2')[index];
   const addToCart = document.querySelectorAll('#addToCart')[index];

   addToCart2.classList.add("d-flex");
   addToCart2.style.zIndex = '10';
   addToCart.style.display = "none";

   increment(index)
   placeOrder(index)
};

const increment = (index) => {
    let a = listOfProducts[index].productQuantity; 
    const minus = document.querySelectorAll('.minus')[index];
    const plus = document.querySelectorAll('.plus')[index];
    const amount = document.querySelectorAll('.amount')[index];

    amount.innerText = a < 10 ? "0" + a : a;

    plus.addEventListener('click', () => {
        a++;
        listOfProducts[index].productQuantity = a; // Update the product's quantity
        amount.innerText = a < 10 ? "0" + a : a; 

        // Update the cart UI immediately
        updateCartQuantity(index, a);
    });

    minus.addEventListener('click', () => {
        if (a > 1) {
            a--;
            listOfProducts[index].productQuantity = a; // Update the product's quantity
            amount.innerText = a < 10 ? "0" + a : a; 

            // Update the cart UI immediately
            updateCartQuantity(index, a);
        }
    });
};

const updateCartQuantity = (index, quantity) => {
    const cartItem = cartProduct.find(product => product.productName === listOfProducts[index].productName);
    if (cartItem) {
        cartItem.productQuantity = quantity;
        cartItem.totalPrice = (cartItem.productPrice * quantity).toFixed(2);

        // Update the DOM for quantity and price
        const cartQuantity = document.querySelectorAll('#onOrder .ordered-number span')[cartProduct.indexOf(cartItem)];
        const cartPrice = document.querySelectorAll('#onOrder .ordered-description b')[cartProduct.indexOf(cartItem)];

        if (cartQuantity && cartPrice) {
            cartQuantity.textContent = quantity < 10 ? "0" + quantity : quantity;
            cartPrice.textContent = `$${cartItem.totalPrice}`;
        }

        // Recalculate the total price for all products in the cart
        totalProduct(cartProduct);
        saveCartToLocalStorage()
    }
};

const saveCartToLocalStorage = () => {
    localStorage.setItem('cart items', JSON.stringify(cartProduct));
};


const cartProduct = []
console.log(cartProduct)


//This my placeOrder adds a product to the cart and updates the UI
const placeOrder = (index) => {
    document.getElementById("all").style.display = "block";
    document.getElementById("preall").style.display = "none";

    const selectedProduct = { ...listOfProducts[index] }; // Clone product to avoid shared reference
    const existingProduct = cartProduct.find(product => product.productName === selectedProduct.productName);

    if (existingProduct) {
        existingProduct.productQuantity = selectedProduct.productQuantity;
        existingProduct.totalPrice = (selectedProduct.productPrice * selectedProduct.productQuantity).toFixed(2);
        updateCartQuantity(index, existingProduct.productQuantity);
    } else {
        selectedProduct.totalPrice = (selectedProduct.productPrice * selectedProduct.productQuantity).toFixed(2);
        cartProduct.push(selectedProduct);

        // Add to DOM
        let onOrder = document.getElementById('onOrder');
        onOrder.innerHTML += `
        <div class='d-flex justify-content-between align-items-center'>
            <div class="left">
                <h6><b>${selectedProduct.productDescription}</b></h6>
                <div class="ordered-description d-flex justify-content-between align-items-center gap-3">
                    <h6 class="m-0 p-0 ordered-number"><span>${selectedProduct.productQuantity}</span>X</h6>
                    <p class="m-0 p-0">@<del>$${(selectedProduct.productPrice * 1.5).toFixed(2)}</del></p>
                    <p class="m-0 p-0"><b>$${selectedProduct.totalPrice}</b></p>
                </div>
            </div>
            <div class="cancel">
                <p class="fs-4 p-0 m-0 cancel-icon" onclick="removeFromCart('${selectedProduct.productName}')">
                    <i class="fa-regular fa-circle-xmark"></i>
                </p>
            </div>
        </div>
        <hr>
        `;
    }

    document.getElementById('item-num').innerHTML = cartProduct.length;
    totalProduct(cartProduct);
    saveCartToLocalStorage();
};
 

const totalProduct = (arrayOfPrice) => {
  let totalPrice = 0;
  arrayOfPrice.forEach(product => {
      totalPrice += parseFloat(product.totalPrice);
  });

  let total = document.getElementById('Total');
  total.innerHTML = `
      <div class="left">
          <p class="p-0 m-0">Total</p>
      </div>
      <div class="cancel">
          <h3>$${totalPrice.toFixed(2)}</h3>
      </div>
  `;
};


const retrieveProducts = JSON.parse(localStorage.getItem('cart items')) || [];
const retrieve = () => {
    const storedProducts = JSON.parse(localStorage.getItem('cart items')) || [];

    if (storedProducts.length > 0) {
        storedProducts.forEach(product => {
            const existingProduct = cartProduct.find(item => item.productName === product.productName);

            if (existingProduct) {
                existingProduct.productQuantity += product.productQuantity;
                existingProduct.totalPrice = (existingProduct.productQuantity * existingProduct.productPrice).toFixed(2);
            } else {
                cartProduct.push(product);
            }
        });

        updateCartUI();
    }
};

const updateCartUI = () => {
    const onOrder = document.getElementById('onOrder');
    onOrder.innerHTML = ""; // Clear existing UI
    cartProduct.forEach(product => {
        onOrder.innerHTML += `
        <div class='d-flex justify-content-between align-items-center'>
            <div class="left">
                <h6><b>${product.productDescription}</b></h6>
                <div class="ordered-description d-flex justify-content-between align-items-center gap-3">
                    <h6 class="m-0 p-0 ordered-number"><span>${product.productQuantity}</span>X</h6>
                    <p class="m-0 p-0">@<del>$${(product.productPrice * 1.5).toFixed(2)}</del></p>
                    <p class="m-0 p-0"><b>$${product.totalPrice}</b></p>
                </div>
            </div>
            <div class="cancel">
                <p class="fs-4 p-0 m-0 cancel-icon" onclick="removeFromCart('${product.productName}')">
                    <i class="fa-regular fa-circle-xmark"></i>
                </p>
            </div>
        </div>
        <hr>
        `;
    });

    document.getElementById('item-num').innerHTML = cartProduct.length;
    totalProduct(cartProduct);
};

const removeFromCart = (productName) => {
    const index = cartProduct.findIndex(item => item.productName === productName);
    if (index !== -1) {
        cartProduct.splice(index, 1);
        updateCartUI();
        saveCartToLocalStorage();
    }
};

let modalAspect = document.getElementById('modal-aspect');

const modal = () => {
    console.log('Product Ordered!!!!');
    
    let modalContent = `
    <div class="modal fade" id="orderModal" tabindex="-1" aria-labelledby="orderModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="orderModalLabel">
                        <span class="text-success fs-2"><strong>&#10003;</strong></span> Order Confirmed
                    </h5>
                </div>
                <div class="modal-body">
                    <p>We hope you enjoy your food!</p>
    `;

    let orderTotal = 0;

    cartProduct.forEach(product => {
        modalContent += `
        <div class="d-flex align-items-center justify-content-between modal-bg rounded mb-2">
            <img src="${product.productImage}" alt="${product.productName}" class="rounded" width="60">
            <div>
                <p class="mb-1">${product.productDescription}</p>
                <small>Quantity: ${product.productQuantity}</small>
            </div>
            <p class="fw-bold">$${product.totalPrice}</p>
        </div>
        `;
        orderTotal += parseFloat(product.totalPrice);
    });

    modalContent += `
                    <hr>
                    <p class="fw-bold">Order Total: $${orderTotal.toFixed(2)}</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-new-order" data-bs-dismiss="modal" id="startNewOrder">Start New Order</button>
                </div>
            </div>
        </div>
    </div>
    `;

    modalAspect.innerHTML = modalContent;

    document.getElementById('startNewOrder').addEventListener('click', () => {
        localStorage.removeItem('cart items'); // Remove cart items from local storage
        cartProduct.length = 0; // Clear the in-memory cart
        updateCartUI(); // Update the UI to reflect an empty cart
    });
};


