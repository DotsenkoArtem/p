let busSlider = undefined;
initBusSlider();
window.addEventListener("resize", initBusSlider);

function initBusSlider() {
  unLockedDocumentWidth = document.documentElement.clientWidth;
  let busSlideContainer = document.querySelector(".bus-slider__container");
  let advSlides = document.querySelectorAll(
    ".bus-slider__container .swiper-slide"
  );
  if (unLockedDocumentWidth <= 1000 && busSlider == undefined) {
    busSlider = new Swiper(".bus-slider", {
      slidesPerView: 2,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      // navigation: {
      //   nextEl: "#sb-next",
      //   prevEl: "#sb-prev",
      // },
      spaceBetween: 30,
      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 1,
          cssMode: true,
        },
        // when window width is >= 480px
        480: {
          slidesPerView: 1,
          cssMode: true,
        },
        // when window width is >= 640px
        640: {
          slidesPerView: 2,
          cssMode: false,
        },
      },
    });
  } else if (unLockedDocumentWidth > 1000 && busSlider != undefined) {
    busSlider.destroy();
    busSlider = undefined;
    busSlideContainer.removeAttribute("style");
    advSlides.forEach((item) => item.removeAttribute("style"));
  }
}
