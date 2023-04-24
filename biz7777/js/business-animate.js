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

window.addEventListener("load", blockHorizontalScroll);

// blockHorizontalScroll("bus-slider", "bus-slider__container", 1000);
// blockHorizontalScroll()

function blockHorizontalScroll() {
  if (unLockedDocumentWidth > 1000) {
    setTimeout(function () {
      const block = document.querySelector(`.block6`);
      let blockTop = block.getBoundingClientRect().top;
      let blockBottom = block.getBoundingClientRect().bottom;

      const content = document.querySelector(".content");

      let slider = document.querySelector(`.bus-slider`);
      let sliderTop = slider.getBoundingClientRect().top.toFixed();

      const scrollingElem = slider.querySelector(`.bus-slider__container`);
      let scrollingElemWIdth = scrollingElem.scrollWidth;
      let currentScroll = undefined;
      let targetScroll = undefined;
      let transition = 1000;
      let elTranslateX = 0;

      const sliderFixPoint = (
        document.documentElement.clientHeight * 0.5
      ).toFixed();
      const topPoint = (document.documentElement.clientHeight * 0).toFixed();
      const bottomPoint = (document.documentElement.clientHeight * 1).toFixed();

      // FLAGS
      let isAnimating = false;
      let isAfterHorizScroll = false;
      let isInFixPoint = false;

      // FUNCTIONS
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
            requestId = requestAnimationFrame(animateScrollToCenter);
          }
        });
      }
      let requestId

      function scrollToCenter() {
        if(!requestId) {
          console.log('РАБОТАю');
          lockPage(unLockedDocumentWidth, header);

          currentScroll = window.scrollY;
          targetScroll = sliderTop - sliderFixPoint;
  
          animateScrollToCenter({
            timing(timeFraction) {
              return timeFraction;
            },
            draw(progress) {
              window.scrollTo(0, currentScroll + targetScroll * progress);
            },
            // duration: Math.abs(targetScroll),
            duration: 500,
          });
          isAnimating = true;
          // isInWindow = true
          setTimeout(() => {
            isAnimating = false;
            isInFixPoint = true;
            unLockPage(header);
            cancelAnimationFrame(requestId)
            console.log('ЗАКОНЧИЛ');
            requestId = undefined
            
            // }, Math.abs(targetScroll))
          }, 500);
        } 
        
      }

      // ЗАГРУЗКА СЛАЙДЕРА В ПРЕДЕЛАХ ОКНА
      // if (isInRange()) {
      //   scrollToCenter();
      // }

      window.addEventListener("scroll", function getCurrentCoords() {
        sliderTop = slider.getBoundingClientRect().top;
      });

      window.addEventListener("scroll", function () {
        if (
          // Движение сверху к середине
          (isInRange() && scrollDirection > 0 && sliderTop < sliderFixPoint) ||
          // Движение снизу к середине
          (isInRange() && scrollDirection < 0 && sliderTop > sliderFixPoint)
        ) {
          if (isAnimating === false) {
            scrollToCenter();
          }
        }
      });

      // content.addEventListener("wheel", disableWheel);
      // function disableWheel(e) {
      //   if (isAnimating === true) {
      //     e.preventDefault();
      //   }
      // }

      window.addEventListener('scroll', (e)=> {
        if (isAnimating === true) {
          e.preventDefault();
        }
      })


      content.addEventListener("wheel", function (e) {


        if (isAnimating === true) {
          e.preventDefault();
          // return
        }






        if (isInFixPoint === true) {
          let sliderTranslateX = +parseInt(
            scrollingElem.style.transform.slice(11, -1)
          );

          // Скролл вверх, слайдер в начале
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

          // Скролл вниз, слайдер в конце
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
            // console.log('csr-isAfterHorizScroll: ', isAfterHorizScroll);
          }

          // Скролл вниз, слайдер в начале
          if (
            (e.deltaY > 0 && !sliderTranslateX) ||
            (e.deltaY > 0 &&
              sliderTranslateX > scrollingElem.offsetWidth - scrollingElemWIdth)
          ) {
            e.preventDefault();
            lockPage(unLockedDocumentWidth, header);
            scrollBlock();
            isAfterHorizScroll = true;
            // console.log('csr-isAfterHorizScroll: ', isAfterHorizScroll);
          }

          // Скролл вверх, слайдер в конце
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

            console.log("scrollDirection: ", scrollDirection);
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

          // lockPage(unLockedDocumentWidth, header);
          scrollingElem.style.transform = `translateX(${elTranslateX}px)`;
        }

        // console.log("sliderTranslateX: ", sliderTranslateX);
      });
    }, 0);
  }
}
