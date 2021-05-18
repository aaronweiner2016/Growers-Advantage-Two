var productButton = document.getElementById('productButton');
var productName = document.getElementById('productName').textContent;

productButton.addEventListener('click', () => {
    console.log(productName)
    location.replace('/product');
})