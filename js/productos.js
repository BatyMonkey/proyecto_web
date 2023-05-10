const productImagesList = $('.product-images-list');
const productImages = $('.product-images-list li');
const productImageWidth = productImages.eq(0).width();
let currentImage = 0;


productImagesList.width(`${productImageWidth * productImages.length}px`);

function moveToNextImage() {
  if (currentImage < productImages.length - 1) {
    currentImage++;
    productImagesList.css('transform', `translateX(-${currentImage * productImageWidth}px)`);
  } else {
    currentImage = 0;
    productImagesList.css('transform', 'translateX(0)');
  }
}


const carouselInterval = setInterval(moveToNextImage, 3000);
