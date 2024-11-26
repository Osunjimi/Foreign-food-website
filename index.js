let listOfProducts = [
    {
       productImage: './assets/images/image-waffle-desktop.jpg' ,
       productName: 'Waffle',
       productDescription: 'Waffle with Berries',
       productPrice: 6.50,
       productQuantity: 1
    },
    {
        productImage: './assets/images/image-creme-brulee-desktop.jpg' ,
        productName: 'Crème Brûlée',
        productDescription: 'Vanilla Bean Crème Brûlée',
        productPrice: 7.00,
       productQuantity: 1
     },
     {
        productImage: './assets/images/image-macaron-tablet.jpg' ,
        productName: 'Macaron',
        productDescription: 'Macaron Mix of Five',
        productPrice: 8.00,
       productQuantity: 1
     },
     {
        productImage: './assets/images/image-tiramisu-desktop.jpg' ,
        productName: 'Tiramisu',
        productDescription: 'Classic Tiramisu',
        productPrice: 5.50,
       productQuantity: 1
     },
     {
        productImage: './assets/images/image-baklava-tablet.jpg' ,
        productName: 'Baklava',
        productDescription: 'Pistachio Baklava',
        productPrice: 4.00,
       productQuantity: 1
     },
     {
        productImage: './assets/images/image-meringue-desktop.jpg' ,
        productName: 'Pie',
        productDescription: 'Lemon Meringue Pie',
        productPrice: 5.00,
       productQuantity: 1
     },
     {
        productImage: './assets/images/image-cake-tablet.jpg' ,
        productName: 'Pie',
        productDescription: 'Lemon Meringue Pie',
        productPrice: 5.00,
       productQuantity: 1
     },
     {
        productImage: './assets/images/image-brownie-tablet.jpg' ,
        productName: 'Pie',
        productDescription: 'Lemon Meringue Pie',
        productPrice: 5.00,
       productQuantity: 1
     },
     {
        productImage: './assets/images/image-panna-cotta-tablet.jpg' ,
        productName: 'Pie',
        productDescription: 'Lemon Meringue Pie',
        productPrice: 5.00,
       productQuantity: 1
     }
]

const Products = document.getElementById('products');
listOfProducts.forEach((element, index) => {
    Products.innerHTML += `
        <div class="product col-lg-4 col-md-6 col-sm"> 
            <div class="product-image position-relative">
                <div class="img">
                    <img src="${element.productImage}" alt="" width="100%" class="rounded-3">
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
   let minus = document.querySelectorAll('.minus')[index];
   let plus = document.querySelectorAll('.plus')[index];
   let amount = document.querySelectorAll('.amount')[index];

   amount.innerText = a < 10 ? "0" + a : a;

   plus.addEventListener('click', () => {
       a++;
       a = a < 10 ? "0" + a : a; 
       amount.innerText = a; 
       listOfProducts[index].productQuantity = a;
       console.log("after increasing", listOfProducts[index].productQuantity);

       // Update the quantity in the cart
       updateCartQuantity(index, a);
   });

   minus.addEventListener('click', () => {
       a--;
       if (a < 1) a = 1; 
       a = a < 10 ? "0" + a : a; 
       amount.innerText = a;
       listOfProducts[index].productQuantity = a;
       console.log("after decreasing", listOfProducts[index].productQuantity);
       

       // Update the quantity in the cart
       updateCartQuantity(index, listOfProducts[index].productQuantity);
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
          cartQuantity.textContent = quantity < 10 ? quantity : quantity;
          cartPrice.textContent = `$${cartItem.totalPrice}`;
      }

      // Recalculate total price for all products
      totalProduct(cartProduct);
  }
};



const cartProduct = []
console.log(cartProduct)


//This my placeOrder adds a product to the cart and updates the UI
const placeOrder = (index) => {
  document.getElementById("all").style.display = "block";
  document.getElementById("preall").style.display = "none";

  const selectedProduct = listOfProducts[index];
  const existingProduct = cartProduct.find(product => product.productName === selectedProduct.productName);

  if (existingProduct) {
      // Update quantity if already in the cart
      existingProduct.productQuantity = selectedProduct.productQuantity;
      existingProduct.totalPrice = (selectedProduct.productPrice * selectedProduct.productQuantity).toFixed(2);
      updateCartQuantity(index, existingProduct.productQuantity);
  } else {
      // Calculate and set total price
      selectedProduct.totalPrice = (selectedProduct.productPrice * selectedProduct.productQuantity).toFixed(2);
      cartProduct.push(selectedProduct);

      let onOrder = document.getElementById('onOrder');
      onOrder.innerHTML += `
      <div class='d-flex justify-content-between align-items-center'>
          <div class="left">
              <h6><b>${selectedProduct.productDescription}</b></h6>
              <div class="ordered-description d-flex justify-content-between align-items-center gap-3">
                  <h6 class="m-0 p-0 ordered-number"><span id="theQuantity">${selectedProduct.productQuantity}</span>X</h6>
                  <p class="m-0 p-0">@<del>$${(selectedProduct.productPrice * 1.5).toFixed(2)}</del></p>
                  <p class="m-0 p-0"><b>$${selectedProduct.totalPrice}</b></p>
              </div>
          </div>
          <div class="cancel">
              <p class="fs-4 p-0 m-0 cancel-icon"><i class="fa-regular fa-circle-xmark"></i></p>
          </div>
      </div>
      <hr>
      `;
  }

  document.getElementById('item-num').innerHTML = cartProduct.length;
  console.log(cartProduct.length);
  

  // Save updated cart to localStorage
  localStorage.setItem('cart items', JSON.stringify(cartProduct));

  // Recalculate total price
  totalProduct(cartProduct);
};

 

// let arrayOfPrice = []
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


let retrieve = () =>{
   let retrieve = JSON.parse(localStorage.getItem('cart items'))
   if (retrieve) {
      console.log(("item found in storage"),retrieve);
      document.getElementById('item-num').innerHTML = retrieve.length;

      let total = document.getElementById('Total');
      let totalPrice = 0;
      
      document.getElementById("all").style.display="block";
      document.getElementById("preall").style.display="none";

      retrieve.forEach(element => {
         onOrder.innerHTML += `
         <div class='d-flex justify-content-between align-items-center'>
               <div class="left">
                  <h6><b>${element.productDescription}</b></h6>
                  <div class="ordered-description d-flex justify-content-between align-items-center gap-3">
                    <h6 class="m-0 p-0 ordered-number">${element.productQuantity}X</h6>
                    <p class="m-0 p-0">@<del>$${(element.productPrice * 1.5)}</del></p>
                    <p class="m-0 p-0"><b>$${(element.productPrice * element.productQuantity).toFixed(2)}</b></p>
                  </div>
                </div>
                <div class="cancel">
                  <p class="fs-4 p-0 m-0 cancel-icon"><i class="fa-regular fa-circle-xmark"></i></p>
                </div>
                </div>
                <hr>
          `
          totalPrice += element.productPrice
          total.innerHTML = `
              <div class="left">
                  <p class="p-0 m-0">Total</p>
              </div>
              <div class="cancel">
                  <h3>$${totalPrice.toFixed(2)}</h3>
              </div>
          `;
          console.log(element.productPrice);
          
      });
   } else {
      console.log("empty");
      
   }
}



