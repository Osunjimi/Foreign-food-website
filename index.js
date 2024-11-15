let listOfProducts = [
    {
       productImage: './assets/images/image-waffle-desktop.jpg' ,
       productName: 'Waffle',
       productDescription: 'Waffle with Berries',
       productPrice: 6.50
    },
    {
        productImage: './assets/images/image-creme-brulee-desktop.jpg' ,
        productName: 'Crème Brûlée',
        productDescription: 'Vanilla Bean Crème Brûlée',
        productPrice: 7.00
     },
     {
        productImage: './assets/images/image-macaron-tablet.jpg' ,
        productName: 'Macaron',
        productDescription: 'Macaron Mix of Five',
        productPrice: 8.00
     },
     {
        productImage: './assets/images/image-tiramisu-desktop.jpg' ,
        productName: 'Tiramisu',
        productDescription: 'Classic Tiramisu',
        productPrice: 5.50
     },
     {
        productImage: './assets/images/image-baklava-tablet.jpg' ,
        productName: 'Baklava',
        productDescription: 'Pistachio Baklava',
        productPrice: 4.00
     },
     {
        productImage: './assets/images/image-meringue-desktop.jpg' ,
        productName: 'Pie',
        productDescription: 'Lemon Meringue Pie',
        productPrice: 5.00
     },
     {
        productImage: './assets/images/image-cake-tablet.jpg' ,
        productName: 'Pie',
        productDescription: 'Lemon Meringue Pie',
        productPrice: 5.00
     },
     {
        productImage: './assets/images/image-brownie-tablet.jpg' ,
        productName: 'Pie',
        productDescription: 'Lemon Meringue Pie',
        productPrice: 5.00
     },
     {
        productImage: './assets/images/image-panna-cotta-tablet.jpg' ,
        productName: 'Pie',
        productDescription: 'Lemon Meringue Pie',
        productPrice: 5.00
     }
]



const Products = document.getElementById('products')
listOfProducts.forEach((element, index) => {
    Products.innerHTML += `
     <div data-aos="zoom-in-up" class="product col-lg-4 col-md-6 col-sm">
        <div class="product-image position-relative">
          <div class="img"><img src="${element.productImage}" alt="" width="100%" class="rounded-3"></div>
          <button type="button" class="btn btn-light rounded-5 dtc-btn position-absolute px-4 d-flex align-items-center justify-content-center gap-2" id="addToCart" onclick ="placeOrder(${index})"><i class="fa-solid fa-cart-plus"></i>Add to Cart</button>
        </div>
        <div class="description mt-4">
          <p class="name-of-item">${element.productName}</p>
          <p><b>${element.productDescription}</b></p>
          <p class="price"><b>$${element.productPrice}</b></p>
        </div>
      </div>
    `
});



// let addToCart = document.getElementById('addToCart')
const cartProduct = []

const placeOrder = (index) =>{
  document.getElementById("all").style.display="block";
  document.getElementById("preall").style.display="none";
   let onOrder = document.getElementById('onOrder')
   const selectedProduct = listOfProducts[index]
   cartProduct.push(selectedProduct)

    onOrder.innerHTML += `
   <div class='d-flex justify-content-between align-items-center'>
         <div class="left">
            <h6><b>${selectedProduct.productDescription}</b></h6>
            <div class="ordered-description d-flex justify-content-betwee align-items-center gap-3">
              <h6 class="m-0 p-0 ordered-number">1X</h6>
              <p class="m-0 p-0">@<del>$${(selectedProduct.productPrice * 1.5)}</del></p>
              <p class="m-0 p-0"><b>$${selectedProduct.productPrice}</b></p>
            </div>
          </div>
          <div class="cancel">
            <p class="fs-4 p-0 m-0 cancel-icon"><i class="fa-regular fa-circle-xmark"></i></p>
          </div>
          </div>
          <hr>
    `
    console.log(cartProduct);
    console.log(cartProduct.length);
    
    document.getElementById('Item-num').innerHTML = cartProduct.length

    localStorage.setItem('cart items', JSON.stringify(cartProduct))
   // console.log(selectedProduct.productDescription)
   // console.log(selectedProduct.productPrice)
   // let savedProduct = JSON.parse(localStorage.getItem('savedProduct')) || [];
   // savedProduct.push({
   //    productName : selectedProduct.productDescription,
   //    productPrice: selectedProduct.productPrice,
   // })
   // localStorage.setItem('savedItem', JSON.stringify(savedProduct))
   // console.log(savedProduct);
   
    totalProduct(cartProduct)
}
// let arrayOfPrice = []
const totalProduct = (arrayOfPrice) =>{
   let totalPrice = 0;
   arrayOfPrice.forEach(obj => {
      // console.log(obj.productPrice);
   
      totalPrice += obj.productPrice

      // console.log("This is the total ",totalPrice);
      
   });

  let total = document.getElementById('Total')
  total.innerHTML = `
      <div class="left">
          <p class="p-0 m-0">Total</p>
          </div>
          <div class="cancel">
            <h3>$${totalPrice}</h3>
          </div>
  `
}

let retrieve = () =>{
   let retrieve = JSON.parse(localStorage.getItem('cart items'))
   if (retrieve) {
      console.log(("item found in storage"),retrieve);
      
      document.getElementById("all").style.display="block";
      document.getElementById("preall").style.display="none";

      retrieve.forEach(element => {
         onOrder.innerHTML += `
         <div class='d-flex justify-content-between align-items-center'>
               <div class="left">
                  <h6><b>${element.productDescription}</b></h6>
                  <div class="ordered-description d-flex justify-content-between align-items-center gap-3">
                    <h6 class="m-0 p-0 ordered-number">1X</h6>
                    <p class="m-0 p-0">@<del>$${(element.productPrice * 1.5)}</del></p>
                    <p class="m-0 p-0"><b>$${element.productPrice}</b></p>
                  </div>
                </div>
                <div class="cancel">
                  <p class="fs-4 p-0 m-0 cancel-icon"><i class="fa-regular fa-circle-xmark"></i></p>
                </div>
                </div>
                <hr>
          `
          console.log(element.productPrice);
          
      });
   } else {
      console.log("empty");
      
   }
}



