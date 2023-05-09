// nav bar
document.addEventListener("DOMContentLoaded", function() {
  const navbarToggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector(".navbar-collapse");
  navbarToggler.addEventListener("click", () => {
    navbarToggler.classList.toggle("active");
    navbarCollapse.classList.toggle("show");
  });
});
// carrusel
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
  fade(slides[slideIndex - 1]);
}

function fade(slide) {
  var caption = slide.querySelector(".caption");
  var opacity = 0;
  var timer = setInterval(function() {
    if (opacity >= 1) {
      clearInterval(timer);
    }
    caption.style.opacity = opacity;
    opacity += 0.1;
  }, 50);
}
