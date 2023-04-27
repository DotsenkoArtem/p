window.addEventListener("load", function () {
  interestBlockAnimate("js-interest");
});

function interestBlockAnimate(elemClass) {
  const block = document.querySelector(`.${elemClass}`);
  if (block) {
    this.setTimeout(() => {




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
      // Летающий человек - ранец
      const intBag = block.querySelector('.interest__man-fly-bag')
      // Летающий человек - ранец с огнями
      const intBagFire = block.querySelector('.interest__man-fly-bag-fire')



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
      // Сцена - верх
      let currentIntSceneTop = intScene.getBoundingClientRect().top;
      // Сцена
      let currentIntSceneBottom = intScene.getBoundingClientRect().bottom;
      // Верхнее облако
      let currentIntTopCloudTop = intTopCloud.getBoundingClientRect().top;
      // Облако под человеком
      let intTpCloud4Coords = intTpCloud4.getBoundingClientRect();
      let intTpCloud4Top = intTpCloud4.getBoundingClientRect().top;


      // РАЗМЕТКА ГРАНИЦ АНИМАЦИИ
      // Точка, после пересечения которой блоком появляются элементы анимации
      const intLandingPoint = +(document.documentElement.clientHeight * 1 + intScene.clientHeight).toFixed();
      

      // const intMeetingPoint =  +(document.documentElement.clientHeight * .75).toFixed()
      const intMeetingPoint =  +(document.documentElement.clientHeight * 1).toFixed()

      // const intHandShakingPoint = +(document.documentElement.clientHeight * .5).toFixed()
      const intHandShakingPoint = intMeetingPoint - 50
      // console.log('intHandShakingPoint: ', intHandShakingPoint);

      const intExitPoint = +(document.documentElement.clientHeight * 0).toFixed()



      // ФЛАГИ
      let isLanded = false
      let canMeet = false
      let canHandShake = false
      let isMeetingAnimated = false
      let isHandShakeAnimated = false


            // let currentLandingScroll = undefined
      // let targetLandingScroll = undefined
      let blockFadeInTransition = 1500
      const landingTransition = 1500
      const meetingTransition = 1500
      const handShakeTransition = 2000



      
      // FUNCTIONS
      // ДИАПАЗОН - ПЕРЕД НАЧАЛОМ ДЕЙСТВИЙ БЛОКА
      function isBeforeIntAction() {
        // return intTpCloud4Top > intLandingPoint
        return currentIntSceneBottom > intLandingPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - ПРИЗЕМЛЕНИЕ
      function isInIntLandingRange() {
        // return intTpCloud4Top <= intLandingPoint &&
        // intTpCloud4Top > intMeetingPoint
        return currentIntSceneBottom <= intLandingPoint &&
        currentIntSceneBottom > intMeetingPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - ВСТРЕЧА
      function isInIntMeetingRange() {
        // return currentIntTopCloudTop <= intMeetingPoint &&
        // currentIntTopCloudTop > intHandShakingPoint
        return currentIntSceneBottom <= intMeetingPoint &&
        currentIntSceneBottom > intHandShakingPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - РУКОПОЖАТИЕ
      function isInIntHandShakingRange() {
        return currentIntSceneBottom <= intHandShakingPoint &&
        currentIntSceneBottom >= intExitPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - ПОСЛЕ ДЕЙСТВИЙ БЛОКА
      function isAfterIntAction() {
        // return currentIntTopCloudTop < intExitPoint
        return currentIntSceneBottom < intExitPoint
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
          if(intTpCloud4Top < intLandingPoint - intScene.clientHeight) {
            blockFadeIn()
            if(isInIntLandingRange() && !isLanded && scrollDirection < 0) {
              intLanding()
              
            }
            if(isInIntMeetingRange() && scrollDirection < 0) {
              intMeeting()
            }
            
          }
        })
      }


      // ЕСЛИ ЗАГРУКА В ПРЕДЕЛАХ ПРИЗЕМЛЕНИЯ
      if(isInIntLandingRange()) {
        blockFadeIn()
        intLanding()
        setTimeout(intMeeting, landingTransition + blockFadeInTransition)
        
        // console.log('ПОЛЕ ПРИЗЕМЛЕНИЯ');
      }


      // ЕСЛИ ЗАГРУКА В ПРЕДЕЛАХ ВСТРЕЧИ
      if(isInIntMeetingRange()) {
        blockFadeIn()
        intLanding()
        setTimeout(intMeeting, landingTransition + blockFadeInTransition)
        // console.log('ПОЛЕ ВСТРЕЧИ');
      }


      // ЕСЛИ ЗАГРУКА В ПРЕДЕЛАХ РУКОПОЖАТИЯ
      if(isInIntHandShakingRange()) {
        blockFadeIn()
        intLanding()
        setTimeout(intMeeting, landingTransition + blockFadeInTransition)
        console.log('ПОЛЕ РУКОПОЖАТИЯ');
      }


      // ЕСЛИ ЗАГРУКА ПОСЛЕ ДЕЙТВИЙ БЛОКА
      if(isAfterIntAction()) {
        blockFadeInTransition = 0
        blockFadeIn()
        window.addEventListener('scroll', ()=>{
          // console.log('scrollDirection: ', scrollDirection);
          if(currentIntTopCloudTop > intExitPoint) {
            
            // if(isInIntLandingRange() && !isLanded) {
              intLanding()
              // console.log('ЭТО ЯЯЯЯЯЯ');
              setTimeout(intMeeting, landingTransition + blockFadeInTransition)
              
            // }
            
          }
          // intMeeting()
        })
        // console.log('ПОСЛЕ ДЕЙСТВИЙ');
      }



      window.addEventListener('scroll', function() {
        console.log('isBeforeIntAction: ', isBeforeIntAction());
        // console.log('isInIntMeetingRange: ', isInIntMeetingRange());

        currentBlockTop = block.getBoundingClientRect().top;
        currentIntSceneTop = intScene.getBoundingClientRect().top;
        currentIntSceneBottom = intScene.getBoundingClientRect().bottom;
        currentIntTopCloudTop = intTopCloud.getBoundingClientRect().top;
        intTpCloud4Top = intTpCloud4.getBoundingClientRect().top;

        // intLanding()
        // intMeeting()
        if(currentIntSceneBottom < intExitPoint && animateHandShakeId || currentIntTopCloudTop > intLandingPoint && animateHandShakeId) {
          cancelAnimationFrame(animateHandShakeId)
          animateHandShakeId = undefined
          console.log('ОТМЕНЕНА');
        } 
        if(currentIntSceneBottom > intExitPoint && currentIntSceneBottom < intLandingPoint && canHandShake && !animateHandShakeId
          ||
          currentIntTopCloudTop > intExitPoint && currentIntTopCloudTop < intLandingPoint && canHandShake && !animateHandShakeId
          ) {
          animateHandShake(animateHandShakeOptions)
          console.log('ВКЛЮЧЕНА');
        }
      })

      let requestAnimationFrameId
      // ПРИЗЕМЛЕНИЕ


      function intLanding() {
        // if(isInIntLandingRange() && !isLanded && scrollDirection < 0) {
        if(isInIntLandingRange() && !isLanded || isInIntMeetingRange() && !isLanded || isInIntHandShakingRange() && !isLanded) {
          lockPage(unLockedDocumentWidth, header)
          
          setTimeout(()=>{

            let landingScrollStart = currentScroll || window.scrollY
            // let targetLandingScroll = landingScrollStart + (currentIntSceneBottom - intLandingPoint)
            let targetLandingScroll = landingScrollStart + (currentIntSceneBottom - intMeetingPoint)
            
            animateScrollLanding({
              timing(timeFraction) {
                return timeFraction;
              },
              draw(progress) {
                window.scrollTo(
                  0,
                  landingScrollStart - (landingScrollStart - targetLandingScroll) * progress
                );
                intFlyMan.style.transform = `translate(${-10 * progress}%, ${134 * progress}%) rotate(${21 * progress}deg)`
                intTpCloud4.style.transform = `rotate(${-180 * progress}deg)`;
              },
              // duration: Math.abs(landingScrollStart - targetLandingScroll),
              duration: landingTransition,
            });
          }, blockFadeInTransition)

          isLanded = true

          setTimeout(()=> {
            unLockPage(header)
            canMeet = true
          }, landingTransition + blockFadeInTransition)
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
          } else if (timeFraction >= 1) {
            cancelAnimationFrame(requestAnimationFrameId)
            requestAnimationFrameId = undefined
          }
        });
      }


      // ВСТРЕЧА
      let animateScrollMeetingId
      function intMeeting() {

        if(canMeet && !isMeetingAnimated) {
          // if(scrollDirection < 0) {
            
            lockPage(unLockedDocumentWidth, header)
            intBagFire.style.transition = `unset`
            intBag.classList.remove('hidden')
            isMeetingAnimated = true
            animateScrollMeeting({
              timing(timeFraction) {
                return timeFraction;
              },
              draw(progress) {
                intFlyManHand.style.transformOrigin = `7% 8%`
                intFlyManHand.style.transform = `rotate(${46 * progress}deg)`

                intBagFire.style.transform = `translate(-${70 * progress}%, -${100 * progress}%) rotate(-46deg)`
                intBagFire.style.opacity = `${2 * progress > 1 ? 0 : 1 - 2 * progress}`

                intBag.style.transform = `translate(${70 - 70 * progress}%, ${150 - 150 * progress}%) rotate(-46deg)`
                intBag.style.opacity = `${2 * progress <= 1 ? 0 : 2 * progress - 1}`


                intUpMan.style.transform = `translate(${44 * progress}%, ${-23 * progress}%)`
                intUpHand.style.transformOrigin = `62% 2%`
                intUpHand.style.transform = `rotate(${-57 * progress}deg)`
                intUpLegLeft.style.transformOrigin = `51% 57%`
                intUpLegLeft.style.transform = `rotate(${15 * progress}deg)`

                intUpLegRight.style.transform = `translate(${0}%, ${0}%)`
                intUpLegRight.style.opacity = `${5 * progress > 1 ? 0 : 1 - 5 * progress}`

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
                } else if (timeFraction >= 1) {
                  cancelAnimationFrame(animateScrollMeetingId)
                  animateScrollMeetingId = undefined
                }
              });
            }

            setTimeout(()=>{
              unLockPage(header)
              canHandShake = true
              intBagFire.classList.add('hidden')
              intHandShake()
            } , meetingTransition)
          // }
          
        }
      }





      // РУКОПОЖАТИЕ
      let animateHandShakeId

      let animateHandShakeOptions = {
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
          intTpCloud4.style.transform = `translate(${-16 * progress}%, ${5 * progress}%) rotate(${-180}deg)`;

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
      }



      function intHandShake() {
        if(canHandShake && !isHandShakeAnimated) {


          isHandShakeAnimated = true

          
          animateHandShake(animateHandShakeOptions)
        }
      }



      function animateHandShake({ timing, timing2, draw, duration }) {
        let start = performance.now();

        
            
        requestAnimationFrame(function animateHandShake(time) {
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
          
          animateHandShakeId = requestAnimationFrame(animateHandShake);
          
        });
      }

      













    }, 0)
  } else {
    console.log(
      `HTML-элемент с классом "${elemClass}" не найден. Пожалуйста убедитель в правильности написания класса элемента.`
    );
  }
}