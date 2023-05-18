let sectorSlider = undefined;
initSectorSlider();
window.addEventListener("resize", initSectorSlider);

function initSectorSlider() {
  // unLockedDocumentWidth = document.documentElement.clientWidth;
  let sectorSliderContainer = document.querySelector(".sector-slider__container");
  let sectorSlides = document.querySelectorAll(
    ".sector-slider__container .swiper-slide"
  );
  if (unLockedDocumentWidth <= 1000 && sectorSlider == undefined) {
    sectorSlider = new Swiper(".sector-slider", {
      slidesPerView: 2,
      loop: true,
      pagination: {
        el: ".swiper-pagination.sector-slider__pagination",
        clickable: true,
      },
      // navigation: {
      //   nextEl: "#sb-next2",
      //   prevEl: "#sb-prev2",
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
  } 
  else if (unLockedDocumentWidth > 1000 && sectorSlider != undefined) {
    sectorSlider.destroy();
    sectorSlider = undefined;
    sectorSliderContainer.removeAttribute("style");
    sectorSlides.forEach((item) => item.removeAttribute("style"));
  }
}

window.addEventListener("load", sectorHorizontalScroll);

function sectorHorizontalScroll() {
  if (unLockedDocumentWidth > 1000) {
    setTimeout(function () {
      const block = document.querySelector(`.js-sector`);
      let blockTop = block.getBoundingClientRect().top;
      let blockBottom = block.getBoundingClientRect().bottom;

      const content = document.querySelector(".content");

      let slider = document.querySelector(`.sector-slider`);
      let sliderTop = slider.getBoundingClientRect().top.toFixed();

      const scrollingElem = slider.querySelector(`.sector-slider__container`);
      let scrollingElemWIdth = scrollingElem.scrollWidth;
      let targetScroll = undefined;
      let transition = 1000;
      let elTranslateX = 0;

      const sliderFixPoint = (
        document.documentElement.clientHeight * 0.5
      ).toFixed();
      const topPoint = (document.documentElement.clientHeight * 0).toFixed();
      const bottomPoint = (document.documentElement.clientHeight * 1).toFixed();

//       // FLAGS
      let isAnimating = false;
      let isAfterHorizScroll = false;
      let isInFixPoint = false;

//       // FUNCTIONS
      function isInRange() {
        return sliderTop < bottomPoint && sliderTop > topPoint ? true : false;
      }

      function animateScrollToCenter({ timing, draw, duration }) {
        let start = performance.now();

        requestAnimationFrame(function animateScrollToCenter(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;
          // Линейная функция
          let progress = timing(timeFraction);
          draw(progress); // отрисовать её
          if (timeFraction < 1) {
            requestAnimationFrame(animateScrollToCenter);
          }
        });
      }

      function scrollToCenter() {
        animateScrollToCenter({
          timing(timeFraction) {
            return timeFraction;
          },
          draw(progress) {
            window.scrollTo(0, currentScroll + targetScroll * progress);
          },
          duration: Math.abs(targetScroll),
        });
        isAnimating = true;

        setTimeout(() => {
          isAnimating = false;
          isInFixPoint = true;
          isAfterHorizScroll = false;

          content.addEventListener("wheel", scrollHandle);
        }, Math.abs(targetScroll));
      }

      window.addEventListener("scroll", function () {
        sliderTop = slider.getBoundingClientRect().top;
        targetScroll = sliderTop - sliderFixPoint;

        if (
          // Движение сверху к середине
          (isInRange() && scrollDirection > 0 && sliderTop < sliderFixPoint) ||
          // Движение снизу к середине
          (isInRange() && scrollDirection < 0 && sliderTop > sliderFixPoint)
        ) {
          lockPage(unLockedDocumentWidth, header);
          if (isAnimating === false) {
            this.setTimeout(scrollToCenter, 0);
          }
        }
      });

      function scrollHandle(e) {
        if (isInFixPoint === true) {
          let sliderTranslateX = +parseInt(
            scrollingElem.style.transform.slice(11, -1)
          );

//           // Скролл вверх, слайдер в начале
          if (e.deltaY < 0 && !sliderTranslateX) {
            if (isAfterHorizScroll === true) {
              setTimeout(() => {
                unLockPage(header);
                isAfterHorizScroll === false;
              }, transition);
            } else {
              unLockPage(header);
            }
            isInFixPoint = false;
          }

//           // Скролл вниз, слайдер в конце
          if (
            e.deltaY > 0 &&
            sliderTranslateX === scrollingElem.offsetWidth - scrollingElemWIdth
          ) {
            if (isAfterHorizScroll === true) {
              setTimeout(() => {
                unLockPage(header);
                isAfterHorizScroll === false;
              }, transition);
            } else {
              unLockPage(header);
            }
            isInFixPoint = false;
          }

//           // Скролл вниз, слайдер в начале
          if (
            (e.deltaY > 0 && !sliderTranslateX) ||
            (e.deltaY > 0 &&
              sliderTranslateX > scrollingElem.offsetWidth - scrollingElemWIdth)
          ) {
            e.preventDefault();
            lockPage(unLockedDocumentWidth, header);
            scrollBlock();
            isAfterHorizScroll = true;
          }

//           // Скролл вверх, слайдер в конце
          if (
            e.deltaY < 0 &&
            sliderTranslateX >=
              scrollingElem.offsetWidth - scrollingElemWIdth &&
            sliderTranslateX < 0
          ) {
            e.preventDefault();
            lockPage(unLockedDocumentWidth, header);
            scrollBlock();
            isAfterHorizScroll = true;
          }
        }

        function scrollBlock() {
          scrollingElem.style.transition = `${transition}ms`;
          elTranslateX -= e.deltaY * 0.75;

          if (elTranslateX >= 0) {
            elTranslateX = 0;
          }

          if (elTranslateX <= scrollingElem.offsetWidth - scrollingElemWIdth) {
            elTranslateX = scrollingElem.offsetWidth - scrollingElemWIdth;
          }

          scrollingElem.style.transform = `translateX(${elTranslateX}px)`;
        }
      }
    }, 0);
  }
}