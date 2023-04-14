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

blockHorizontalScroll("bus-slider", "bus-slider__container", 1000);

function blockHorizontalScroll(
  sectionClassName,
  scrollingElemClassName,
  transition
) {
  if (unLockedDocumentWidth > 1000) {
    let section = document.querySelector(`.${sectionClassName}`);
    let scrollingElem = section.querySelector(`.${scrollingElemClassName}`);
    let elTranslateX = 0;
    let startPoint = window.innerHeight * 0.75;
    let stopPoint =
      scrollingElem.getBoundingClientRect().height + window.innerHeight * 0.55;

    let scrollDirection = 0;
    let startY = window.pageYOffset;
    let currentY = 0;
    function getScrollDirection() {
      currentY = window.pageYOffset;
      scrollDirection = startY - currentY;
      startY = currentY;
    }

    window.addEventListener("scroll", lockBySectionPosition);

    function lockBySectionPosition() {
      getScrollDirection();
      let scrollingElemTop = scrollingElem.getBoundingClientRect().top;
      let scrollingElemBottom = scrollingElem.getBoundingClientRect().bottom;
      let scrollingElemWIdth = scrollingElem.scrollWidth;

      if (
        (scrollingElemTop < startPoint &&
          scrollingElemBottom > startPoint &&
          scrollDirection < 0 &&
          elTranslateX !== -(scrollingElemWIdth - scrollingElem.offsetWidth)) ||
        (scrollingElemBottom > stopPoint &&
          scrollingElemTop < stopPoint &&
          scrollDirection > 0 &&
          elTranslateX !== 0)
      ) {
        lockPage(unLockedDocumentWidth, header);

        let content = document.querySelector(".content");
        content.addEventListener("wheel", scrollBlock);
        function scrollBlock(e) {
          e.preventDefault();
          scrollingElem.style.transition = `${transition}ms`;
          elTranslateX -= e.deltaY * 0.75;
          if (elTranslateX >= 0) {
            elTranslateX = 0;
            scrollingElem.style.transform = `translateX(${elTranslateX}px)`;

            setTimeout(() => {
              unLockPage(header);
              content.removeEventListener("wheel", scrollBlock);
              scrollingElem.style.transition = ``;
              window.addEventListener("scroll", lockBySectionPosition);
            }, transition);
          }

          if (
            Math.abs(elTranslateX) >=
            scrollingElemWIdth - scrollingElem.offsetWidth
          ) {
            elTranslateX = -(scrollingElemWIdth - scrollingElem.offsetWidth);
            scrollingElem.style.transform = `translateX(${elTranslateX}px)`;

            setTimeout(() => {
              unLockPage(header);
              content.removeEventListener("wheel", scrollBlock);
              scrollingElem.style.transition = ``;
              window.addEventListener("scroll", lockBySectionPosition);
            }, transition);
          } else {
            scrollingElem.style.transform = `translateX(${elTranslateX}px)`;
          }
        }
      }
    }
  }
}
