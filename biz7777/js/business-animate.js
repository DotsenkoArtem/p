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
    const block = document.querySelector(`.block6`);
    let blockTop = block.getBoundingClientRect().top;
    let blockBottom = block.getBoundingClientRect().bottom;

    let content = document.querySelector(".content");
    let section = document.querySelector(`.${sectionClassName}`);
    let sectionTop = section.getBoundingClientRect().top;
    let scrollingElem = section.querySelector(`.${scrollingElemClassName}`);
    let elTranslateX = 0;
    let startPoint = window.innerHeight * 0.75;
    let stopPoint =
      scrollingElem.getBoundingClientRect().height + window.innerHeight * 0.55;





    let isInWindow = false
    let isLocked = false

    // window.addEventListener("scroll", lockBySectionPosition);

    window.addEventListener("scroll", () => {
      blockTop = block.getBoundingClientRect().top;
      blockBottom = block.getBoundingClientRect().bottom;
      sectionTop = section.getBoundingClientRect().top;

      if(blockTop > document.documentElement.clientHeight * .6 && scrollDirection < 0 || blockBottom < document.documentElement.clientHeight * .4 && scrollDirection > 0) {
        isInWindow = false
      }
      // if(sectionTop > document.documentElement.clientHeight / 2 && scrollDirection > 0
      // ||
      // sectionTop < document.documentElement.clientHeight / 2 && scrollDirection < 0) {
      //   isInWindow = false
      // }
      console.log('scrollDirection: ', scrollDirection);

      if (
        (blockTop <= document.documentElement.clientHeight && blockTop >= 0 && !isInWindow) ||
        (blockBottom >= 0 &&
          blockBottom <= document.documentElement.clientHeight  && !isInWindow)
      ) {

  
        lockPage(unLockedDocumentWidth, header);

        setTimeout(()=>{
          scrollToCenter()
        },0)
        

      }
    });

    // content.addEventListener("wheel", scrollToCenter);
    let scrolledToCenter = false;
    let currentScroll = undefined;
    let targetScroll = undefined;
    function scrollToCenter() {
      if(!isInWindow) { 
        // let sectionTop = section.getBoundingClientRect().top;
        currentScroll = window.scrollY;
        targetScroll = sectionTop - document.documentElement.clientHeight / 2;

        
        animateScrollToCenter({
          timing(timeFraction) {
            return timeFraction;
          },
          draw(progress) {
            window.scrollTo(
              0,
              currentScroll + targetScroll * progress
            );
          },
          duration: Math.abs(targetScroll * .6),
          // duration: 750,
        });
        isInWindow = true
        setTimeout(()=>{
          isLocked = true
          // unLockPage(header)
        }, Math.abs(targetScroll * .6))
        // }, 2000)
      }




    }

    function animateScrollToCenter({ timing, draw, duration }) {
      let start = performance.now();

      requestAnimationFrame(function animateScrollToCenter(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) timeFraction = 1;
        // Линейная функция
        let progress = timing(timeFraction);
        // let progress =
        //   timing(timeFraction) < 0.5
        //     ? 4 *
        //       timing(timeFraction) *
        //       timing(timeFraction) *
        //       timing(timeFraction)
        //     : 1 - Math.pow(-2 * timing(timeFraction) + 2, 3) / 2;
        draw(progress); // отрисовать её
        if (timeFraction < 1) {
          requestAnimationFrame(animateScrollToCenter);
        }
      });
    }

    content.addEventListener("wheel", lockBySectionPosition);

    function lockBySectionPosition(e) {
      // console.log('scrollDirection: ', scrollDirection);

      if(isInWindow && isLocked) {


        let scrollingElemTop = scrollingElem.getBoundingClientRect().top;
        let scrollingElemBottom = scrollingElem.getBoundingClientRect().bottom;
        let scrollingElemWIdth = scrollingElem.scrollWidth;

        // if (
          // // Скроллим вниз
          // (
          //   scrollDirection < 0 
          //   && elTranslateX <= 0 && elTranslateX > (scrollingElem.offsetWidth - scrollingElemWIdth)
          //   )
          //   ||
          //   // Скроллим вверх
          // (
          //   scrollDirection > 0 
          //   && elTranslateX >= (scrollingElem.offsetWidth - scrollingElemWIdth) && elTranslateX < 0
          //   )
        // ) {
          
          


          scrollBlock()
          // content.addEventListener("wheel", scrollBlock);
          function scrollBlock() {
            // e.preventDefault();
            scrollingElem.style.transition = `${transition}ms`;
            elTranslateX -= e.deltaY * 0.75;
            console.log('elTranslateX: ', elTranslateX);
            
            if (elTranslateX >= 0 && e.deltaY < 0) {
              elTranslateX = 0;
              scrollingElem.style.transform = `translateX(${0}px)`;
              isLocked = false
              // unLockPage(header);
              console.log('elTranslateX: ', elTranslateX);
              console.log('e.defaultPrevented: ', e.defaultPrevented);
             

              setTimeout(() => {
                unLockPage(header);
                // content.removeEventListener("wheel", scrollBlock);
                scrollingElem.style.transition = ``;
              //   window.addEventListener("scroll", lockBySectionPosition);
              }, transition);
            }

            else if (
              Math.abs(elTranslateX) >=  Math.abs(scrollingElem.offsetWidth - scrollingElemWIdth) && e.deltaY > 0
            ) {
              elTranslateX = scrollingElem.offsetWidth - scrollingElemWIdth;
              scrollingElem.style.transform = `translateX(${elTranslateX}px)`;
              isLocked = false
              console.log('В КОНЦЕ МЫ: ');
              // unLockPage(header);
              setTimeout(() => {
                unLockPage(header);
              //   content.removeEventListener("wheel", scrollBlock);
                scrollingElem.style.transition = ``;
              //   window.addEventListener("scroll", lockBySectionPosition);
              }, transition);
            } else {
              // isLocked = true
              lockPage(unLockedDocumentWidth, header);
              e.preventDefault();
              scrollingElem.style.transform = `translateX(${elTranslateX}px)`;
              console.log('elTranslateX: ', elTranslateX);
            }

            

          }
        // }
        // if(elTranslateX)







      }





    }
  }
}
