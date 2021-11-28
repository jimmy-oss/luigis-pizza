(function(){
    const cartInfo = document.getElementById("cart-info");
    const cart = document.getElementById("cart");
    cartInfo.addEventListener("click",function(){
        cart.classList.toggle("show-cart");
    });
})();
if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}
function ready(){
    var addToCartButtons =  document.getElementsByClassName("ADD-TO-CART");
     for(var  i = 0; i < addToCartButtons.length;  i++) {
      var button = addToCartButtons[i];
      button.addEventListener("click",addToCartClicked);
  }
   var quantityInputs = document.getElementsByClassName("cart-quantity-input");
   for  (var  i = 0; i < quantityInputs.length; i++){
    var input = quantityInputs[i];
    input.addEventListener("change",quantityChanged);
   }

  // remove items

  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++){
      var button = removeCartItemButtons[i];
      button.addEventListener("click",removeCartItem);
  }
 // end
  document
  .getElementsByClassName("btn-purchase")[0]
  .addEventListener('click', purchaseClicked);
}
 // delivery functionality
 function myFunction() {
    var delivery = (confirm( "Would you like us deliver your pizza to your doorstep? transport cost ksh 200."));
    if 
    (delivery){   
        (alert( "Thank you for shopping with us."));
        var person = prompt("Please enter your delivery location",);
        if (person != null) {
      document.getElementById("delivery").innerHTML =
    "Success! <span class='txtColor'> " + person  + " </span> we will be waiting for you to pick your pizza. Thank you for shopping with us.";
    alert("Thank you for your purchase");
    var cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
    updateItemsTotal();
       }
    }
    else{
        (alert(" Thank you for shopping with us."));
 }
 var cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
    updateItemsTotal();
     
    }

    // Purchasing functionality
function purchaseClicked(){
    var proceed = confirm(" Do you want to purchase a pizza?");
    if 
    (proceed){   
        (alert( "Thank you for your purchase"));
    }
     else{
           (alert(" Thank you for shopping with us."));
    }
    var cartItems = document.getElementsByClassName("cart-items")[0];
    while (cartItems.hasChildNodes()){
        cartItems.removeChild(cartItems.firstChild);
    }
    updateCartTotal();
    updateItemsTotal();
}

// remove items 2
function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.parentElement.remove();
    updateCartTotal();
    updateItemsTotal();
}

 
function addToCartClicked(event) {
    var button = event.target;
    var product = button.parentElement.parentElement;
    var title = product.getElementsByClassName("product-title") [0].innerText;
    var price = product.getElementsByClassName("product__price")[0].innerText;
    var ImageSrc = product.getElementsByClassName("product_image")[0].src;
    addItemToCart(title,price,ImageSrc);
   updateCartTotal( );
   updateItemsTotal();
}
function quantityChanged(event){
    var  input = event.target;
    if (isNaN(input.value) | input.value <= 0){
        input.value = 1;  
    }
    updateCartTotal();
    updateItemsTotal();
   
}
function addItemToCart(title,price,ImageSrc){
      var cartRow = document.createElement('div');
      cartRow.classList.add('cart-row');
      var cartItems = document.getElementsByClassName('cart-items')[0];
      var cartItemsTitles = cartItems.getElementsByClassName('cart-item-title');
       for(var  i = 0; i <cartItemsTitles.length; i ++)  {
        if (cartItemsTitles[i].innerText == title){
            alert("This Pizza is already added to the cart");
            return;
        }
        
    }
    var cartRowContents = `
   <div class = "cart-item cart-column">
   <img class = "cart-item-image" src ="${ImageSrc}">
   <span class = "cart-item-title">${title}</span>
   </div>
   <span class = "cart-price cart-column">${price}</span>
   <div class = "cart-quantity cart-column">
   <input class =  "cart-quantity-input" type = "number" value = "1">
   <button class = "btn btn-danger" type = "button">REMOVE</button>
   </div> `;
   cartRow.innerHTML = cartRowContents;
   cartItems.append(cartRow);
   cartRow
   .getElementsByClassName("btn-danger")[0]
   .addEventListener("click",removeCartItem);
   cartRow
   .getElementsByClassName("cart-quantity-input")[0]
   .addEventListener("change",quantityChanged);
}
function updateCartTotal(){
       var cartItemContainer = document.getElementsByClassName("cart-items")[0];
       var cartRows = cartItemContainer.getElementsByClassName("cart-row");
       var total = 0;
        for(var i = 0; i< cartRows.length;i++){
        var cartRow = cartRows[i];
        var priceElement = cartRow.getElementsByClassName("cart-price")[0];
        var quantityElement =  cartRow.getElementsByClassName("cart-quantity-input")[0];
        var price = parseFloat(priceElement.innerText.replace("Ksh", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("cart-total-price")[0].innerText = "Ksh" + total;
}
function updateItemsTotal(){
    var cartItemContainer = document.getElementsByClassName("cart-items")[0];
    var cartRows =  cartItemContainer.getElementsByClassName("cart-row"); 
    var total = 0;
    for(let  i = 0; i< cartRows.length;i++){
        var cartRow = cartRows[i];
        var quantityElement = cartRow.getElementsByClassName("cart-quantity-input")[0];
        var quantity = quantityElement.value;
        var total = total + parseInt(quantity);
    }
    document.getElementById("item-count") .innerText = total;
}
