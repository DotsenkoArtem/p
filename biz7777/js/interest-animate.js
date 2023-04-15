window.addEventListener("load", function () {
  interestBlockAnimate("js-interest");
});

function interestBlockAnimate(elemClass) {
  const block = document.querySelector(`.${elemClass}`);
  if (block) {
    this.setTimeout(() => {
      // РАЗМЕТКА ГРАНИЦ АНИМАЦИИ
      // Точка, после пересечения которой блоком появляются элементы анимации
      const intLandingPoint = +(document.documentElement.clientHeight * .75).toFixed();
      // Точка появления ручки (отступ по оси Y от верхней грницы окна)
      const intMeetingPoint =  +(document.documentElement.clientHeight * .4).toFixed()
      const intHandShakingPoint = +(document.documentElement.clientHeight * .2).toFixed()
      const intExitPoint = +(document.documentElement.clientHeight * 0).toFixed()




      console.log('intMeetingPoint: ', intMeetingPoint);


      // Получение элементов
      // Верхнее облако
      const intTopCloud = block.querySelector('.interest__tp-cloud-5')
      // Летаущий человек
      const intFlyMan = block.querySelector('.interest__man-fly-wrap')
      


      // ТЕКУЩИЕ КООРДИНАТЫ ЭЛЕМЕНТОВ
      // Блок
      let currentBlockTop = block.getBoundingClientRect().top;
      // Верхнее облако
      let currentIntTopCloudTop = intTopCloud.getBoundingClientRect().top;



      let currentLandingScroll = undefined
      let targetLandingScroll = undefined


      // ФЛАГИ
      let isLanded = false





      // FUNCTIONS
      // ДИАПАЗОН - ПЕРЕД НАЧАЛОМ ДЕЙСТВИЙ БЛОКА
      function isBeforeIntAction() {
        return currentIntTopCloudTop > intLandingPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - ПРИЗЕМЛЕНИЕ
      function isInIntLandingRange() {
        return currentIntTopCloudTop <= intLandingPoint &&
        currentIntTopCloudTop > intMeetingPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - ВСТРЕЧА
      function isInIntMeetingRange() {
        return currentIntTopCloudTop <= intMeetingPoint &&
        currentIntTopCloudTop > intHandShakingPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - РУКОПОЖАТИЕ
      function isInIntHandShakingRange() {
        return currentIntTopCloudTop <= intHandShakingPoint &&
        currentIntTopCloudTop >= intExitPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - ПОСЛЕ ДЕЙСТВИЙ БЛОКА
      function isAfterIntAction() {
        return currentIntTopCloudTop < intExitPoint
          ? true
          : false;
      }

      // ПОКАЗАТЬ БЛОК
      function blockFadeIn() {
        block.classList.remove('interest_transparent')
      }


      // ЕСЛИ ЗАГРУКА ДО НАЧАЛА БЛОКА
      if(isBeforeIntAction()) {
        window.addEventListener('scroll', ()=>{
          if(currentIntTopCloudTop < intLandingPoint) {
            blockFadeIn()
          }
        })
      }


      // ЕСЛИ ЗАГРУКА В ПРЕДЕЛАХ ПРИЗЕМЛЕНИЯ
      if(isInIntLandingRange()) {
        blockFadeIn()
      }


      // ЕСЛИ ЗАГРУКА В ПРЕДЕЛАХ ВСТРЕЧИ
      if(isInIntMeetingRange()) {
        blockFadeIn()
      }


      // ЕСЛИ ЗАГРУКА В ПРЕДЕЛАХ РУКОПОЖАТИЯ
      if(isInIntHandShakingRange()) {
        blockFadeIn()
      }


      // ЕСЛИ ЗАГРУКА ПОСЛЕ ДЕЙТВИЙ БЛОКА
      if(isAfterIntAction()) {
        blockFadeIn()
      }



      window.addEventListener('scroll', function() {
        currentBlockTop = block.getBoundingClientRect().top;
        currentIntTopCloudTop = intTopCloud.getBoundingClientRect().top;

        intLanding()
      })


      // ПРИЗЕМЛЕНИЕ
      const landingTransition =2000
      function intLanding() {
        if(isInIntLandingRange() && !isLanded && scrollDirection < 0) {
          lockPage(unLockedDocumentWidth, header)
          
          setTimeout(()=>{
            // intFlyMan.style.transition = `transform ${landingTransition}ms`
            // intFlyMan.classList.add('is-landed')
  
            if(!currentLandingScroll) {
              currentLandingScroll = this.window.scrollY
              targetLandingScroll = currentLandingScroll + intMeetingPoint
            }
            
            animateScrollLanding({
              timing(timeFraction) {
                return timeFraction;
              },
              draw(progress) {
                window.scrollTo(
                  0,
                  currentLandingScroll - (currentLandingScroll - targetLandingScroll) * progress
                );
                intFlyMan.style.transform = `translate(${-10 * progress}%, ${130 * progress}%) rotate(${21 * progress}deg)`
              },
              // duration: Math.abs(currentLandingScroll - targetLandingScroll),
              duration: landingTransition,
            });
          }, 1000)


          isLanded = true
          setTimeout(()=> {
            unLockPage(header)
          }, landingTransition + 1000)
        }
      }





      function animateScrollLanding({ timing, draw, duration }) {
        let start = performance.now();
      
        requestAnimationFrame(function animateScrollLanding(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;
          // вычисление текущего состояния анимации
      
          // Линейная функция
          // let progress = timing(timeFraction);
      
          // Пример функции ease-out
          // Зашпаргалил здесь: https://easings.net/ru
          let progress = 1 - Math.abs(Math.pow(timing(timeFraction) - 1, 3));
          draw(progress); // отрисовать её
          if (timeFraction < 1) {
            requestAnimationFrame(animateScrollLanding);
          }
        });
      }















    }, 0)
  } else {
    console.log(
      `HTML-элемент с классом "${elemClass}" не найден. Пожалуйста убедитель в правильности написания класса элемента.`
    );
  }
}