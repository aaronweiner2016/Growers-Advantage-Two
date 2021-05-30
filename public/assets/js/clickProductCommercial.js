var productButton = document.getElementById('productButton');
var productId = document.getElementById('productName').dataset.id;

productButton.addEventListener('click', () => {
    console.log(productId)
    location.replace('/product/' + productId);
})