warrantyBlockAnimate("js-warranty");

function warrantyBlockAnimate(elemClass) {

  const block = document.querySelector(`.${elemClass}`);
  if (block) {
    // начальная координата ручки по оси Х
    let initialWarrantyPenLeft = undefined
    if(initialWarrantyPenLeft) initialWarrantyPenLeft = warrantyPen.getBoundingClientRect().left;
    // Начальная координата ручки по оси Y
    let initialWarrantyPenTop = undefined
    if(initialWarrantyPenTop) initialWarrantyPenTop = warrantyPen.getBoundingClientRect().top;
    // Начальные координаты блока
    let initialBlockCoords = undefined
    if(initialBlockCoords) initialBlockCoords = block.getBoundingClientRect();
    // Начальный отступ блока от верхней границы экрана
    let initialWarrantyBlockTop = undefined
    if(initialWarrantyBlockTop) initialWarrantyBlockTop = initialBlockCoords.top
    // Отступ от ручки до верхней границы блока
    let warrantyPenTopBlockOffset = undefined
    if(warrantyPenTopBlockOffset) warrantyPenTopBlockOffset = initialWarrantyPenTop - initialWarrantyBlockTop


    // Текущее положение блока
    let currentBlockTop = undefined
    if(currentBlockTop) currentBlockTop = block.getBoundingClientRect().top;
    // Текущее положение ручки
    let currentPenBottom = undefined
    if(currentPenBottom) currentPenBottom = warrantyPen.getBoundingClientRect().bottom;



    // ФЛАГИ
    let penIsUnsticked = false
    let penIsDown = true
    let penIsWrite = true




    // РАЗМЕТКА ГРАНИЦ АНИМАЦИИ
    // Точка, после пересечения которой блоком .js-warranty появляется ручка 
    let warrantyPenAppearPoint = window.innerHeight * .75;
    // Точка появления ручки (отступ по оси Y от верхней грницы окна)
    let warrantyAnimStartPoint = warrantyPenAppearPoint - 100;
    let warrantyAnimStopPoint = warrantyPenAppearPoint - 500;



    // ДЛЯ АНИМАЦИИ
    let warrantyPenStopStyles = {}




    window.addEventListener("load", function () {
      this.setTimeout(()=>{


        // Получение элементов
        const block = document.querySelector(".js-warranty");
        const warrantyPen = block.querySelector(".warranty-pen");
        const warrantyText = block.querySelector(".warranty-text-wrap");
        const warrantyPenUpTime = 1000
        // const penAnimateDuration = 4000
        const penAnimateDuration = 4000
        
        // Начальные координаты блока
        initialBlockCoords = block.getBoundingClientRect();
        // Начальный отступ блока от верхней границы экрана
        initialWarrantyBlockTop = initialBlockCoords.top;
        // Начальная координата ручки по оси Y
        initialWarrantyPenTop = warrantyPen.getBoundingClientRect().top;
        // Отступ от ручки до верхней границы блока
        warrantyPenTopBlockOffset = initialWarrantyPenTop - initialWarrantyBlockTop


      
        // Первоначально определить координату ручки по оси X в position: absolute
        initialWarrantyPenLeft = warrantyPen.getBoundingClientRect().left;
        // Затем приклеить ее, добавив класс, содержащий position: fixed
        warrantyPen.classList.add("sticky");
        // Задать отступы для фиксированного положения ручки
        warrantyPen.style.top = `${warrantyAnimStartPoint}px`;
        warrantyPen.style.left = `${initialWarrantyPenLeft}px`;


        // Определение текущего положения блока
        currentBlockTop = block.getBoundingClientRect().top;
        // Определение текущего положения ручки
        currentPenBottom = warrantyPen.getBoundingClientRect().bottom;


        // ПАРАМЕТРЫ АНИМАЦИИ
        // Идентификаторы анимаций
        let writePenId;

        // Время, прошедшее между остановкой анимации и ее последующим началом
        // let deltaTimeClouds = 0;

        const writePenOptions = {
          timing(timeFraction) {
            // return 1 - Math.abs(1 - timeFraction * 2);
            return timeFraction;
          },

          duration: penAnimateDuration,
          // editTime: 0,
        };
        // Значения трансформации для каждого шага относительно положния поднятой ручки, в %
        let transfOffset = [
          {num: 1,x: -11, y: -6},
          {num: 2,x: -14, y: 2},
          {num: 3,x: -13, y: 8},
          {num: 4,x: -10, y: 7},
          {num: 5,x: -8, y: 0},
          {num: 6,x: -6, y: 3},
          {num: 7,x: -4, y: -3},
          {num: 8,x: -2, y: -6},
          {num: 9,x: -1, y: -18},
          {num: 10,x: -4, y: 6},
          {num: 11,x: -1, y: -16},
          {num: 12,x: 1, y: -12},
          {num: 13,x: 3, y: -18},
          {num: 14,x: 5, y: -12},
          {num: 15,x: 7, y: -22},
        ]
        // Количество шагов анимации
        let stepLot = 16
        // Продолжительность 1 шага (относительно прогресса анимации)
        let fract = 1 / stepLot;
        let startX = -9
        let startY = -2

        let steps = {}
        for(let i = 1; i <= transfOffset.length; i++) {
          steps[`step${i}`] = {
            num: i,
            end: +((i * fract).toFixed(2)),
            x: transfOffset[i - 1].x,
            y: transfOffset[i - 1].y,
          }
        }
        // console.log('steps: ', steps);
       

        // Функция анимации
        // function writePen({ timing, draw, duration, editTime }) {
        function writePen({ timing, duration }) {
          
          // let start = performance.now() + editTime;
          let start = performance.now();
          requestAnimationFrame(function writePen(time) {
            let timeFraction = (time - start) / duration;
            if (timeFraction > 1) start = time;
            // deltaTimeGear = time - start;
            let progress = timing(timeFraction);



            // // Шаг 1
            if((progress < steps.step1.end)){
              step1X = startX + ((steps.step1.x  - startX) * stepLot * progress)
              step1Y = startY + ((steps.step1.y  - startY) * stepLot * progress)
              warrantyPen.style.transform = `translate(${step1X}%, ${step1Y}%) rotate(17deg)`
              // console.log('transform1: ', step1X, step1Y);
            }
            // Шаг 2
            if(progress >= steps.step1.end && progress < steps.step2.end) {
              step2X = Math.round(step1X) + ((steps.step2.x  - steps.step1.x) * stepLot * (progress - steps.step1.end))
              step2Y = Math.round(step1Y) + ((steps.step2.y  - steps.step1.y) * stepLot * (progress - steps.step1.end))
              warrantyPen.style.transform = `translate(${step2X}%, ${step2Y}%) rotate(17deg)`
            }

            // Шаг 3
            if(progress >= steps.step2.end && progress < steps.step3.end) {
              step3X = Math.round(step2X) + ((steps.step3.x  - steps.step2.x) * stepLot * (progress - steps.step2.end))
              step3Y = Math.round(step2Y) + ((steps.step3.y  - steps.step2.y) * stepLot * (progress - steps.step2.end))
              warrantyPen.style.transform = `translate(${step3X}%, ${step3Y}%) rotate(17deg)`
            }

            // Шаг 4
            if(progress >= steps.step3.end && progress < steps.step4.end) {
              step4X = Math.round(step3X) + ((steps.step4.x  - steps.step3.x) * stepLot * (progress - steps.step3.end))
              step4Y = Math.round(step3Y) + ((steps.step4.y  - steps.step3.y) * stepLot * (progress - steps.step3.end))
              warrantyPen.style.transform = `translate(${step4X}%, ${step4Y}%) rotate(17deg)`
            }

            // Шаг 5
            if(progress >= steps.step4.end && progress < steps.step5.end) {
              step5X = Math.round(step4X) + ((steps.step5.x  - steps.step4.x) * stepLot * (progress - steps.step4.end))
              step5Y = Math.round(step4Y) + ((steps.step5.y  - steps.step4.y) * stepLot * (progress - steps.step4.end))
              warrantyPen.style.transform = `translate(${step5X}%, ${step5Y}%) rotate(17deg)`
            }

            // Шаг 6
            if(progress >= steps.step5.end && progress < steps.step6.end) {
              step6X = Math.round(step5X) + ((steps.step6.x  - steps.step5.x) * stepLot * (progress - steps.step5.end))
              step6Y = Math.round(step5Y) + ((steps.step6.y  - steps.step5.y) * stepLot * (progress - steps.step5.end))
              warrantyPen.style.transform = `translate(${step6X}%, ${step6Y}%) rotate(17deg)`
            }

            // Шаг 7
            if(progress >= steps.step6.end && progress < steps.step7.end) {
              step7X = Math.round(step6X) + ((steps.step7.x  - steps.step6.x) * stepLot * (progress - steps.step6.end))
              step7Y = Math.round(step6Y) + ((steps.step7.y  - steps.step6.y) * stepLot * (progress - steps.step6.end))
              warrantyPen.style.transform = `translate(${step7X}%, ${step7Y}%) rotate(17deg)`
            }

            // Шаг 8
            if(progress >= steps.step7.end && progress < steps.step8.end) {
              step8X = Math.round(step7X) + ((steps.step8.x  - steps.step7.x) * stepLot * (progress - steps.step7.end))
              step8Y = Math.round(step7Y) + ((steps.step8.y  - steps.step7.y) * stepLot * (progress - steps.step7.end))
              warrantyPen.style.transform = `translate(${step8X}%, ${step8Y}%) rotate(17deg)`
            }

            // Шаг 9
            if(progress >= steps.step8.end && progress < steps.step9.end) {
              step9X = Math.round(step8X) + ((steps.step9.x  - steps.step8.x) * stepLot * (progress - steps.step8.end))
              step9Y = Math.round(step8Y) + ((steps.step9.y  - steps.step8.y) * stepLot * (progress - steps.step8.end))
              warrantyPen.style.transform = `translate(${step9X}%, ${step9Y}%) rotate(17deg)`
            }

            // Шаг 10
            if(progress >= steps.step9.end && progress < steps.step10.end) {
              step10X = Math.round(step9X) + ((steps.step10.x  - steps.step9.x) * stepLot * (progress - steps.step9.end))
              step10Y = Math.round(step9Y) + ((steps.step10.y  - steps.step9.y) * stepLot * (progress - steps.step9.end))
              warrantyPen.style.transform = `translate(${step10X}%, ${step10Y}%) rotate(17deg)`
              
            }

            // Шаг 11
            if(progress >= steps.step10.end && progress < steps.step11.end) {
              step11X = Math.round(step10X) + ((steps.step11.x  - steps.step10.x) * stepLot * (progress - steps.step10.end))
              step11Y = Math.round(step10Y) + ((steps.step11.y  - steps.step10.y) * stepLot * (progress - steps.step10.end))
              warrantyPen.style.transform = `translate(${step11X}%, ${step11Y}%) rotate(17deg)`
            }

            // Шаг 12
            if(progress >= steps.step11.end && progress < steps.step12.end) {
              step12X = Math.round(step11X) + ((steps.step12.x  - steps.step11.x) * stepLot * (progress - steps.step11.end))
              step12Y = Math.round(step11Y) + ((steps.step12.y  - steps.step11.y) * stepLot * (progress - steps.step11.end))
              warrantyPen.style.transform = `translate(${step12X}%, ${step12Y}%) rotate(17deg)`
            }

            // Шаг 13
            if(progress >= steps.step12.end && progress < steps.step13.end) {
              step13X = Math.round(step12X) + ((steps.step13.x  - steps.step12.x) * stepLot * (progress - steps.step12.end))
              step13Y = Math.round(step12Y) + ((steps.step13.y  - steps.step12.y) * stepLot * (progress - steps.step12.end))
              warrantyPen.style.transform = `translate(${step13X}%, ${step13Y}%) rotate(17deg)`
            }

            // Шаг 14
            if(progress >= steps.step13.end && progress < steps.step14.end) {
              step14X = Math.round(step13X) + ((steps.step14.x  - steps.step13.x) * stepLot * (progress - steps.step13.end))
              step14Y = Math.round(step13Y) + ((steps.step14.y  - steps.step13.y) * stepLot * (progress - steps.step13.end))
              warrantyPen.style.transform = `translate(${step14X}%, ${step14Y}%) rotate(17deg)`
            }

            // Шаг 15
            if(progress >= steps.step14.end && progress < steps.step15.end) {
              step15X = Math.round(step14X) + ((steps.step15.x  - steps.step14.x) * stepLot * (progress - steps.step14.end))
              step15Y = Math.round(step14Y) + ((steps.step15.y  - steps.step14.y) * stepLot * (progress - steps.step14.end))
              warrantyPen.style.transform = `translate(${step15X}%, ${step15Y}%) rotate(17deg)`
            }

            // Шаг последний
            if(progress >= steps.step15.end && progress < 1) {
              stepEndX = Math.round(step15X) + ((startX - steps.step15.x) * (stepLot) * (progress - steps.step15.end))
              stepEndY = Math.round(step15Y) + ((startY - steps.step15.y) * (stepLot) * (progress - steps.step15.end))
              warrantyPen.style.transform = `translate(${stepEndX}%, ${stepEndY}%) rotate(17deg)`
              // console.log('stepEndX: ', stepEndX);
            }
            writePenId = requestAnimationFrame(writePen);
          });
        }



        
       
        // Если загрузка блока до точки появления ручки
        if(isBeforePenAction()){
          // console.log('warrantyPenAppearPoint: ', warrantyPenAppearPoint);
          // console.log('currentBlockTop: ', currentBlockTop);



          window.addEventListener('scroll', showWarrantyPen)
          window.addEventListener('scroll', getUpPen)


          window.addEventListener("scroll", function () {
            // Кждый раз при скролле переопределем переменные ниже
            currentBlockTop = block.getBoundingClientRect().top;
            warrantyPenTopBlockOffset = initialWarrantyPenTop - initialWarrantyBlockTop
            currentPenBottom = warrantyPen.getBoundingClientRect().bottom;


            if(currentPenBottom > warrantyPenAppearPoint) {
            // if(isBeforePenAction()) {
              console.log('Перред блоком анимации');
              cancelAnimationFrame(writePenId);
              getDownPen()
            }
            if(isAfterPenAction()) {
              console.log('Выход из анимации');
              cancelAnimationFrame(writePenId);
              getDownPen()
            }

            
            // if(isInPenEntryRange()) {
            //   console.log('isInPenEntryRange(): ', isInPenEntryRange());
            //   // getUpPen()
            // }

            // if(isInPenAnimRange()) {
            //   console.log('isInPenAnimRange(): ', isInPenAnimRange());
            //   // getUpPen()
            // }


          });


        }

        if(currentBlockTop < warrantyPenAppearPoint - 500) {
          warrantyPen.classList.remove('unvisible')
          unstickPen()
        }



        window.addEventListener('resize', function(){
          warrantyBlockAnimate("js-warranty")
        })






        // FUNCTIONS
        // ДИАПАЗОН - ПЕРЕД НАЧАЛОМ ДЕЙСТВИЙ БЛОКА
        function isBeforePenAction() {
          return currentBlockTop > warrantyPenAppearPoint
            ? true
            : false;
        }
        // ДИАПАЗОН - ПОЯВЛЕНИЕ РУЧКИ
        function isInPenEntryRange() {
          return currentPenBottom <= warrantyPenAppearPoint && currentBlockTop > warrantyAnimStartPoint
            ? true
            : false;
        }
        // ДИАПАЗОН - АНИМАЦИИ
        // function isInPenAnimRange() {
        //   return currentBlockTop <= warrantyAnimStartPoint && currentBlockTop >= warrantyAnimStopPoint
        //     ? true
        //     : false;
        // }
        // ДИАПАЗОН - АНИМАЦИИ
        function isInPenAnimRange() {
          // return currentBlockTop <= warrantyAnimStartPoint && currentBlockTop >= warrantyAnimStopPoint
          return currentPenBottom <= warrantyPenAppearPoint && currentBlockTop >= warrantyAnimStopPoint
            ? true
            : false;
        }
        // ДИАПАЗОН - ПОСЛЕ ДЕЙСТВИЙ БЛОКА
        function isAfterPenAction() {
          return currentBlockTop < warrantyAnimStopPoint
            ? true
            : false;
        }



        // ПОКАЗАТЬ РУЧКУ
        function showWarrantyPen() {
          // Если блок выше точки появления ручки
          if(warrantyPenAppearPoint >= currentBlockTop) {
            warrantyPen.classList.remove('unvisible')
            // Если докрутили до точки отлипания
            if(
              currentBlockTop + warrantyPenTopBlockOffset <= warrantyAnimStartPoint
            ) {
              // Отклеиваем и удаляем слушатель функции появления ручки (showWarrantyPen())
              unstickPen()
              // console.log('ОТКЛЕЙИТЬ');
            }
          }
          if(warrantyPenAppearPoint < currentBlockTop) {
            warrantyPen.classList.add('unvisible')
          }
        }

        // ОТКЛЕИТЬ РУЧКУ
        function unstickPen() {
          warrantyPen.classList.remove("sticky");
          warrantyPen.style.top = ``;
          warrantyPen.style.left = ``;
          window.removeEventListener('scroll', showWarrantyPen)
          penIsUnsticked = true
        }

        // ПОДНЯТЬ РУЧКУ
        function getUpPen() {
          if(penIsUnsticked && penIsDown) {

            // if(isInPenAnimRange() || isInPenEntryRange()) {
            if(isInPenAnimRange()) {

              // if(penIsDown) {

                setTimeout(function() {
                  // lockPage(unLockedDocumentWidth, header);
                  warrantyPen.style.transform = `translate(-9%, -2%) rotate(17deg)`;
                  warrantyPen.style.left = `115px`;
                  warrantyPen.style.top = `150px`;
                  warrantyPen.style.transition = `1000ms`;
                  penAnimate()


                  penIsDown = false
                  // window.removeEventListener('scroll', getUpPen)
                }, 0)

              // }

            }

          }
        }

        // ПОЛОЖИТЬ РУЧКУ
        function getDownPen() {
          if(penIsUnsticked) {
            warrantyPen.style.transition = `1000ms`;
            warrantyPen.style.transform = `rotate(0deg)`;
            warrantyPen.style.top = `211px`;
            warrantyPen.style.left = `85px`;
            penIsDown = true;
          }
        }

        // РИСОВАТЬ
        function penAnimate() {
          // if(penIsUp) {
          // console.log('РИСУЕМ!');
            if(penIsWrite) {
              
              setTimeout(()=>{
                warrantyPen.style.transition = `0ms`;
                showText()
                writePen(writePenOptions)
                // penIsWrite = false
              }, warrantyPenUpTime)
            }
          // }
        }

        // ПОКАЗАТЬ ТЕКСТ
        function showText() {
          warrantyText.style.transition = `${penAnimateDuration * 3}ms`
          warrantyText.style.maxWidth = `143px`
        }



        


      }, 0)
    });







  } else {
    console.log(
      `HTML-элемент с классом "${elemClass}" не найден. Пожалуйста убедитель в правильности написания класса элемента.`
    );
  }
}
