window.addEventListener("load", function () {
  interestBlockAnimate("js-interest");
});

function interestBlockAnimate(elemClass) {
  const block = document.querySelector(`.${elemClass}`);
  if (block) {
    this.setTimeout(() => {
      // РАЗМЕТКА ГРАНИЦ АНИМАЦИИ
      // Точка, после пересечения которой блоком появляются элементы анимации
      // const intLandingPoint = +(document.documentElement.clientHeight * .75).toFixed();
      const intLandingPoint = +(document.documentElement.clientHeight * 1).toFixed();

      const intMeetingPoint =  +(document.documentElement.clientHeight * .4).toFixed()
      const intHandShakingPoint = +(document.documentElement.clientHeight * .2).toFixed()
      const intExitPoint = +(document.documentElement.clientHeight * 0).toFixed()



      // Получение элементов
      // Сцена
      const intScene = block.querySelector('.interest__scene')
      // Верхнее облако
      const intTopCloud = block.querySelector('.interest__tp-cloud-5')
      // Летающий человек
      const intFlyMan = block.querySelector('.interest__man-fly-wrap')
      // Облако под человеком
      const intTpCloud4 = block.querySelector('.interest__tp-cloud-4')
      


      // ТЕКУЩИЕ КООРДИНАТЫ ЭЛЕМЕНТОВ
      // Блок
      let currentBlockTop = block.getBoundingClientRect().top;
      // Сцена
      let currentIntSceneBottom = intScene.getBoundingClientRect().bottom;
      // Верхнее облако
      let currentIntTopCloudTop = intTopCloud.getBoundingClientRect().top;
      // Облако под человеком
      let intTpCloud4Coords = intTpCloud4.getBoundingClientRect();
      let intTpCloud4Top = intTpCloud4.getBoundingClientRect().top;



      // ФЛАГИ
      let isLanded = false





      // FUNCTIONS
      // ДИАПАЗОН - ПЕРЕД НАЧАЛОМ ДЕЙСТВИЙ БЛОКА
      function isBeforeIntAction() {
        return intTpCloud4Top > intLandingPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - ПРИЗЕМЛЕНИЕ
      function isInIntLandingRange() {
        return intTpCloud4Top <= intLandingPoint &&
        intTpCloud4Top > intMeetingPoint
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
          if(intTpCloud4Top < intLandingPoint) {
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
        currentIntSceneBottom = intScene.getBoundingClientRect().bottom;
        currentIntTopCloudTop = intTopCloud.getBoundingClientRect().top;
        intTpCloud4Top = intTpCloud4.getBoundingClientRect().top;
        console.log('currentIntSceneBottom: ', currentIntSceneBottom);

        intLanding()
      })


      // ПРИЗЕМЛЕНИЕ
      let currentLandingScroll = undefined
      let targetLandingScroll = undefined
      const landingTransition =1500
      function intLanding() {
        if(isInIntLandingRange() && !isLanded && scrollDirection < 0) {
          lockPage(unLockedDocumentWidth, header)
          
          setTimeout(()=>{
            // intFlyMan.style.transition = `transform ${landingTransition}ms`
            // intFlyMan.classList.add('is-landed')
  
            if(!currentLandingScroll) {
              currentLandingScroll = this.window.scrollY
              targetLandingScroll = currentLandingScroll + (currentIntSceneBottom - intLandingPoint)
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
          }, 750)


          isLanded = true
          setTimeout(()=> {
            unLockPage(header)
          }, landingTransition + 750)
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
          // let progress = 1 - Math.abs(Math.pow(timing(timeFraction) - 1, 3));
          let progress = timing(timeFraction) < .5 ? 4 * timing(timeFraction) * timing(timeFraction) * timing(timeFraction) : 1 - Math.pow(-2 * timing(timeFraction) + 2, 3) / 2;
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