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
    let sectionTop = section.getBoundingClientRect().top.toFixed();
    let scrollingElem = section.querySelector(`.${scrollingElemClassName}`);
    let scrollingElemWIdth = scrollingElem.scrollWidth;
    let elTranslateX = 0;

    let windowMiddle = (document.documentElement.clientHeight / 2).toFixed()






    let isInWindow = false
    let isLocked = false

    // window.addEventListener("scroll", lockBySectionPosition);

    window.addEventListener("scroll", (ev) => {
      blockTop = block.getBoundingClientRect().top;
      blockBottom = block.getBoundingClientRect().bottom;
      sectionTop = section.getBoundingClientRect().top.toFixed();
      // console.log('sectionTop: ', sectionTop);

      if(blockTop > document.documentElement.clientHeight * 1 && scrollDirection < 0 || blockBottom < document.documentElement.clientHeight * 0 && scrollDirection > 0) {
        isInWindow = false
      }

      if (
        (blockTop <= document.documentElement.clientHeight && blockTop >= 0 && !isInWindow) ||
        (blockBottom >= 0 &&
          blockBottom <= document.documentElement.clientHeight  && !isInWindow)
      ) {


        lockPage(unLockedDocumentWidth, header);
        console.log(ev);
        ev.preventDefault()
        
        setTimeout(()=>{
          scrollToCenter()
        },0)
      }
    });

    let currentScroll = undefined;
    let targetScroll = undefined;
    function scrollToCenter() {
      if(!isInWindow) { 
        currentScroll = window.scrollY;
        targetScroll = sectionTop - windowMiddle;

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
          unLockPage(header)
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
     
      if(isInWindow && isLocked) {
        let sliderTranslateX = +parseInt(scrollingElem.style.transform.slice(11, -1));

        // Скролл вверх, слайдер в начале
        if(e.deltaY < 0 && !sliderTranslateX
          ) {
          // console.log('e.deltaY: ', e.deltaY);
          unLockPage(header)
          isLocked = false
          // console.log('isLocked: ', isLocked);
        }


        // Скролл вниз, слайдер в конце
        if(e.deltaY > 0 && sliderTranslateX === scrollingElem.offsetWidth - scrollingElemWIdth) {
          unLockPage(header)
          isLocked = false
          // console.log('isLocked: ', isLocked);
        }

      
    
        // Скролл вниз, слайдер в начале
        if(e.deltaY > 0 && !sliderTranslateX 
          ||
          e.deltaY > 0 && sliderTranslateX >= scrollingElem.offsetWidth - scrollingElemWIdth
        
        ) {
          e.preventDefault()
          lockPage(unLockedDocumentWidth, header);
          scrollBlock()
          // if(sliderTranslateX === scrollingElem.offsetWidth - scrollingElemWIdth) {
          //   setTimeout(()=>{
          //     unLockPage(header)
          //   }, transition)
          // }
          // console.log('isLocked: ', isLocked);
        }


        // Скролл вверх, слайдер в конце
        if(
          e.deltaY < 0 && sliderTranslateX >= scrollingElem.offsetWidth - scrollingElemWIdth && sliderTranslateX <= 0
          ) {
          e.preventDefault()
          lockPage(unLockedDocumentWidth, header);
          scrollBlock()
          // console.log('sliderTranslateX: ', sliderTranslateX);
          // if(!sliderTranslateX) {
          //   setTimeout(()=>{
          //     unLockPage(header)
          //   }, transition)
          // }
          // console.log('isLocked: ', isLocked);
        }


        if(
          !sliderTranslateX 
          ||
          sliderTranslateX === scrollingElem.offsetWidth - scrollingElemWIdth
          ) {
          setTimeout(()=>{
            unLockPage(header)
          }, transition)
        }

    }






      function scrollBlock() {
        scrollingElem.style.transition = `${transition}ms`;
        elTranslateX -= e.deltaY * 0.75;



        if (elTranslateX >= 0 ) {
          elTranslateX = 0;
        }
    
    
        if (elTranslateX <=  scrollingElem.offsetWidth - scrollingElemWIdth) {
          elTranslateX = scrollingElem.offsetWidth - scrollingElemWIdth;
        }




        // lockPage(unLockedDocumentWidth, header);
        scrollingElem.style.transform = `translateX(${elTranslateX}px)`;
      }



    }
  }
}


// if(isInWindow && isLocked) {


//   let scrollingElemTop = scrollingElem.getBoundingClientRect().top;
//   let scrollingElemBottom = scrollingElem.getBoundingClientRect().bottom;
  
    
  // scrollBlock()
  // function scrollBlock() {
    // e.preventDefault();
    // scrollingElem.style.transition = `${transition}ms`;
    // elTranslateX -= e.deltaY * 0.75;


    // if (elTranslateX >= 0 ) {
    //   elTranslateX = 0;
    // }


    // if (elTranslateX <=  scrollingElem.offsetWidth - scrollingElemWIdth) {
    //   elTranslateX = scrollingElem.offsetWidth - scrollingElemWIdth;
    // }

    // lockPage(unLockedDocumentWidth, header);
    // scrollingElem.style.transform = `translateX(${elTranslateX}px)`;

    // console.log('scrollDirection: ', scrollDirection);




    // if(scrollingElem.style.transform == 0 && e.deltaY < 0) {
    //   isLocked = false
    //   console.log('scrollingElem.style.transform: ', scrollingElem.style.transform);
    //   setTimeout(() => {
    //     unLockPage(header);
    //     scrollingElem.style.transition = ``;
    //   }, transition);
    //   console.log('БЫЛ В ВЫХОДЕ ВВЕРХ');
    // }


    // }
  // }


// }
