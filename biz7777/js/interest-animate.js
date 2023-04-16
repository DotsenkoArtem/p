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

      // const intMeetingPoint =  +(document.documentElement.clientHeight * .4).toFixed()
      const intMeetingPoint =  +(document.documentElement.clientHeight * .75).toFixed()

      const intHandShakingPoint = +(document.documentElement.clientHeight * .2).toFixed()
      const intExitPoint = +(document.documentElement.clientHeight * 0).toFixed()



      // Получение элементов
      // Content
      let content = document.querySelector(".content");
      // Сцена
      const intScene = block.querySelector('.interest__scene')


      // ОБЛАКА
      // Верхнее облако - 1
      const intTopCloud1 = block.querySelector('.interest__tp-cloud-1')
      // Верхнее облако - 2
      const intTopCloud2 = block.querySelector('.interest__tp-cloud-2')
      // Верхнее облако - 3
      const intTopCloud3 = block.querySelector('.interest__tp-cloud-3')
      // Облако под человеком (верхнее облако - 5)
      const intTpCloud4 = block.querySelector('.interest__tp-cloud-4')
      // Верхнее облако - 5
      const intTopCloud = block.querySelector('.interest__tp-cloud-5')
      // Верхнее облако - 6
      const intTpCloud6 = block.querySelector('.interest__tp-cloud-6')
      // Среднее облако - 1
      const intMdCloud1 = block.querySelector('.interest__md-cloud-1')
      // Среднее облако - 2
      const intMdCloud2 = block.querySelector('.interest__md-cloud-2')
      // Среднее облако - 3
      const intMdCloud3 = block.querySelector('.interest__md-cloud-3')
      // Среднее облако - 4
      const intMdCloud4 = block.querySelector('.interest__md-cloud-4')
      // Среднее облако - 5
      const intMdCloud5 = block.querySelector('.interest__md-cloud-5')


      // Стоящий человек
      const intUpMan = block.querySelector('.interest__man-up-wrap')
      // Стоящий человек - рука
      const intUpHand = block.querySelector('.interest__man-up-hand')
      // Стоящий человек - нога левая
      const intUpLegLeft = block.querySelector('.interest__man-up-leg-l')
      // Стоящий человек - нога правая прямая
      const intUpLegRight = block.querySelector('.interest__man-up-leg-r')
      // Стоящий человек - нога правая согнутая
      const intUpLegRightStep = block.querySelector('.interest__man-up-leg-r-step')
      // Летающий человек
      const intFlyMan = block.querySelector('.interest__man-fly-wrap')
      // Летающий человек - рука
      const intFlyManHand = block.querySelector('.interest__man-fly-hand')
      // Стрелка малая (слева)
      const intArrowSm = block.querySelector('.interest__int-arrow-sm')
      // Стрелка синяя
      const intArrowBlue = block.querySelector('.interest__int-arrow-blue')
      // Стрелка средняя (справа)
      const intArrowMd = block.querySelector('.interest__int-arrow-md')
      // Два облака внизу
      const intBtmClouds = block.querySelector('.interest__btm-clouds')


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
      let canMeet = false
      let canHandShake = false
      let isMeetingAnimated = false
      let isHandShakeAnimated = false





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
        // console.log('currentIntSceneBottom: ', currentIntSceneBottom);

        intLanding()
        intMeeting()
        
      })

      let requestAnimationFrameId
      // ПРИЗЕМЛЕНИЕ
      let currentLandingScroll = undefined
      let targetLandingScroll = undefined
      const landingTransition = 1500
      const meetingTransition = 1500
      const handShakeTransition = 2000
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
                intFlyMan.style.transform = `translate(${-10 * progress}%, ${134 * progress}%) rotate(${21 * progress}deg)`
              },
              // duration: Math.abs(currentLandingScroll - targetLandingScroll),
              duration: landingTransition,
            });
          }, 750)


          isLanded = true
          setTimeout(()=> {
            unLockPage(header)
            canMeet = true
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
            requestAnimationFrameId = requestAnimationFrame(animateScrollLanding);
          }
        });
      }


      // ВСТРЕЧА
      let animateScrollMeetingId
      function intMeeting() {

        if(canMeet && !isMeetingAnimated) {
          // console.log('ВЫзов функции:');
          if(scrollDirection < 0) {
            
            lockPage(unLockedDocumentWidth, header)
            isMeetingAnimated = true
            animateScrollMeeting({
              timing(timeFraction) {
                return timeFraction;
              },
              draw(progress) {
                intFlyManHand.style.transformOrigin = `7% 8%`
                intFlyManHand.style.transform = `rotate(${46 * progress}deg)`

                intUpMan.style.transform = `translate(${44 * progress}%, ${-23 * progress}%)`
                intUpHand.style.transformOrigin = `62% 2%`
                intUpHand.style.transform = `rotate(${-57 * progress}deg)`
                intUpLegLeft.style.transformOrigin = `51% 57%`
                intUpLegLeft.style.transform = `rotate(${15 * progress}deg)`
                intUpLegRight.style.transform = `translate(0%, ${150 * progress}%)`
                intUpLegRight.style.opacity = `${1 - 1 * progress}`
                intUpLegRightStep.style.transform = `translate(0%, ${-100 + 100 * progress}%)`
                intUpLegRightStep.style.opacity = `${1 * progress}`

                intArrowSm.style.transform = `translate(${75 * progress}%, ${-81 * progress}%)`
                intArrowSm.style.opacity = `${.5 + .5 * progress}`
                intArrowBlue.style.transform = `translate(${101 * progress}%, ${-97.4 * progress}%)`
                intArrowBlue.style.opacity = `${.5 + .5 * progress}`
                intArrowMd.style.transform = `translate(${67 * progress}%, ${-59 * progress}%)`
                intArrowMd.style.opacity = `${.5 + .5 * progress}`

                intBtmClouds.style.transform = `translate(0%, ${-5 * progress}%)`
              },
              duration: meetingTransition,
            });


            function animateScrollMeeting({ timing, draw, duration }) {
              let start = performance.now();
            
              requestAnimationFrame(function animateScrollMeeting(time) {
                let timeFraction = (time - start) / duration;
                if (timeFraction > 1) timeFraction = 1;
                // вычисление текущего состояния анимации
            
                // Линейная функция
                let progress = timing(timeFraction);
            
                // Пример функции ease-out
                // Зашпаргалил здесь: https://easings.net/ru
                // let progress = 1 - Math.abs(Math.pow(timing(timeFraction) - 1, 3));
                // let progress = timing(timeFraction) < .5 ? 4 * timing(timeFraction) * timing(timeFraction) * timing(timeFraction) : 1 - Math.pow(-2 * timing(timeFraction) + 2, 3) / 2;
                draw(progress); // отрисовать её
                if (timeFraction < 1) {
                  animateScrollMeetingId = requestAnimationFrame(animateScrollMeeting);
                }
              });
            }

            setTimeout(()=>{
              unLockPage(header)
              canHandShake = true
              intHandShake()
            } ,meetingTransition)
          }
          



        

          
          

        }
      }





      // РУКОПОЖАТИЕ
      let animateHandShakeId
      function intHandShake() {
        if(canHandShake && !isHandShakeAnimated) {


          isHandShakeAnimated = true

          
          animateHandShake({
            timing(timeFraction) {
              return 1 - Math.abs(1 - timeFraction * 2);
            },
            timing2(timeFraction2) {
              return 1 - Math.abs(1 - timeFraction2 * 2);
            },
            draw(progress, progress2) {
              intTopCloud1.style.transform = `translate(${12 * progress}%, ${-3 * progress}%)`;
              intTopCloud2.style.transform = `translate(${5 * progress}%, ${0 * progress}%)`;
              intTopCloud3.style.transform = `translate(${18 * progress}%, ${0 * progress}%)`;
              intTpCloud4.style.transform = `translate(${-16 * progress}%, ${5 * progress}%)`;
              intTopCloud.style.transform = `translate(${-30 * progress}%, ${0 * progress}%)`;
              intTpCloud6.style.transform = `translate(${-40 * progress}%, ${-10 * progress}%)`;

              intMdCloud1.style.transform = `translate(${60 * progress}%, ${-10 * progress}%)`;
              intMdCloud2.style.transform = `translate(${12 * progress}%, ${-5 * progress}%)`;
              intMdCloud3.style.transform = `translate(${-50 * progress}%, ${25 * progress}%)`;
              intMdCloud4.style.transform = `translate(${-35 * progress}%, ${-15 * progress}%)`;
              intMdCloud5.style.transform = `translate(${-35 * progress}%, ${0 * progress}%)`;

              // intFlyManHand.style.transformOrigin = `75% 75%`
              intFlyManHand.style.transform = `translateY(${2 * progress2}%) rotate(${46 - 10 * progress2}deg)`
              intUpHand.style.transform = `translateX(${0}%) rotate(${-57 + 10 * progress2}deg)`
            },
            duration: handShakeTransition * 2,
          })
        }
      }



      function animateHandShake({ timing, timing2, draw, duration }) {
        let start = performance.now();

        
            
        requestAnimationFrame(function animateScrollMeeting(time) {
          if (start > time) {
            start = time;
          }
          let timeFraction = (time - start) / duration;
          let timeFraction2 = Math.abs(1 - Math.abs(1 - Math.abs(1 - (4 * (time - start) / duration))));
          if (timeFraction > 1) start = time;
          // вычисление текущего состояния анимации
      
          // Линейная функция
          let progress = timing(timeFraction);
          let progress2 = timing2(timeFraction2);
          draw(progress, progress2); // отрисовать её
          
            animateScrollMeetingId = requestAnimationFrame(animateScrollMeeting);
          
        });
      }

      













    }, 0)
  } else {
    console.log(
      `HTML-элемент с классом "${elemClass}" не найден. Пожалуйста убедитель в правильности написания класса элемента.`
    );
  }
}