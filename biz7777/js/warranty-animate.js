window.addEventListener("load", function () {
  warrantyBlockAnimate("js-warranty");
});

function warrantyBlockAnimate(elemClass) {
  const block = document.querySelector(`.${elemClass}`);
  if (block) {
    this.setTimeout(() => {

      // РАЗМЕТКА ГРАНИЦ АНИМАЦИИ
      // Точка, после пересечения которой блоком .js-warranty появляется ручка
      const warrantyPenAppearPoint = window.innerHeight * 0.75;
      // Точка появления ручки (отступ по оси Y от верхней грницы окна)
      const warrantyAnimStartPoint = warrantyPenAppearPoint - 100;
      const warrantyAnimStopPoint = window.innerHeight * 0.25;

      // ФЛАГИ
      let penIsUnsticked = false;
      let penIsDown = true;
      let textIsWritten = false;

      // Получение элементов
      const block = document.querySelector(".js-warranty");
      const warrantyPen = block.querySelector(".warranty-pen");
      const warrantyScene = block.querySelector(".warranty-scene");
      const warrantyText = block.querySelector(".warranty-text-wrap");
      const warrantyTextImg = warrantyText.querySelector(".warranty-text");

      // НАЧАЛЬНЫЕ КООРДИНАТЫ ЭЛЕМЕНТОВ
      // БЛОК
      // Начальные координаты блока
      const initialBlockCoords = block.getBoundingClientRect();
      // Начальный отступ блока от верхней границы экрана
      const initialWarrantyBlockTop = initialBlockCoords.top;

      // РУЧКА
      // Начальная координата ручки по оси Y
      const initialWarrantyPenTop = warrantyPen.getBoundingClientRect().top;
      // Отступ от ручки до верхней границы блока
      const warrantyPenTopBlockOffset =
        initialWarrantyPenTop - initialWarrantyBlockTop;



      // ТЕКУЩИЕ КООРДИНАТЫ ЭЛЕМЕНТОВ
      // БЛОК
      // Текущий отступ блока по оси Y от верхней границы окна
      let currentBlockTop = block.getBoundingClientRect().top;
      //  РУЧКА
      // Текущий отступ ручки по оси Y от верхней границы окна
      let currentPenBottom = warrantyPen.getBoundingClientRect().bottom;
      // Текущий отступ оснвоного изображения по оси Y от верхней границы окна
      let currentWarrantySceneTop = warrantyScene.getBoundingClientRect().top;



      // ПАРАМЕТРЫ АНИМАЦИИ
      // Время подъема/падения ручки
      const warrantyPenUpTime = 1000;
      // Продолжительность анимации
      const penAnimateDuration = 4000;
      // Идентификаторы анимаций
      let writePenId;

      const writePenOptions = {
        timing(timeFraction) {
          return timeFraction;
        },
        duration: penAnimateDuration,
      };

      // Значения трансформации для каждого шага относительно положения поднятой ручки, в %
      let transfOffset = [
        { num: 1, x: 20, y: -81 },
        { num: 2, x: 16, y: -73 },
        { num: 3, x: 12, y: -55 },
        { num: 4, x: 20, y: -56 },
        { num: 5, x: 26, y: -73 },
        { num: 6, x: 26, y: -64 },
        { num: 7, x: 31, y: -78 },
        { num: 8, x: 31, y: -70 },
        { num: 9, x: 41, y: -97 },
        { num: 10, x: 35, y: -61 },
        { num: 11, x: 44, y: -87 },
        { num: 12, x: 43, y: -85 },
        { num: 13, x: 48, y: -95 },
        { num: 14, x: 50, y: -91 },
        { num: 15, x: 58, y: -103 },
      ];
      // Количество шагов анимации
      let stepLot = 16;
      // Продолжительность 1 шага (относительно прогресса анимации)
      let fract = 1 / stepLot;
      // Начальные значения трансформации translate - соответствуют положению поднятой ручки
      let startX = 23;
      let startY = -75;

      // Объект с даннми каждого шага (num: номер, end: значение progress, соответствует окончанию данного шага, x: значение трансформации по оси X относительно изначально нетрансформирванной ручки, y: тоже самое по оси Y)
      let steps = {};
      for (let i = 1; i <= transfOffset.length; i++) {
        steps[`step${i}`] = {
          num: i,
          end: +(i * fract).toFixed(2),
          x: transfOffset[i - 1].x,
          y: transfOffset[i - 1].y,
        };
      }

      function writePen({ timing, duration }) {
        let start = performance.now();
        requestAnimationFrame(function writePen(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) start = time;

          let progress = timing(timeFraction);

          // Шаг 1
          if (progress < steps.step1.end) {
            step1X = startX + (steps.step1.x - startX) * stepLot * progress;
            step1Y = startY + (steps.step1.y - startY) * stepLot * progress;
            warrantyPen.style.transform = `translate(${step1X}%, ${step1Y}%) rotate(17deg)`;
          }
          // Шаг 2
          if (progress >= steps.step1.end && progress < steps.step2.end) {
            step2X =
              Math.round(step1X) +
              (steps.step2.x - steps.step1.x) *
                stepLot *
                (progress - steps.step1.end);
            step2Y =
              Math.round(step1Y) +
              (steps.step2.y - steps.step1.y) *
                stepLot *
                (progress - steps.step1.end);
            warrantyPen.style.transform = `translate(${step2X}%, ${step2Y}%) rotate(17deg)`;
          }

          // Шаг 3
          if (progress >= steps.step2.end && progress < steps.step3.end) {
            step3X =
              Math.round(step2X) +
              (steps.step3.x - steps.step2.x) *
                stepLot *
                (progress - steps.step2.end);
            step3Y =
              Math.round(step2Y) +
              (steps.step3.y - steps.step2.y) *
                stepLot *
                (progress - steps.step2.end);
            warrantyPen.style.transform = `translate(${step3X}%, ${step3Y}%) rotate(17deg)`;
          }

          // Шаг 4
          if (progress >= steps.step3.end && progress < steps.step4.end) {
            step4X =
              Math.round(step3X) +
              (steps.step4.x - steps.step3.x) *
                stepLot *
                (progress - steps.step3.end);
            step4Y =
              Math.round(step3Y) +
              (steps.step4.y - steps.step3.y) *
                stepLot *
                (progress - steps.step3.end);
            warrantyPen.style.transform = `translate(${step4X}%, ${step4Y}%) rotate(17deg)`;
          }

          // Шаг 5
          if (progress >= steps.step4.end && progress < steps.step5.end) {
            step5X =
              Math.round(step4X) +
              (steps.step5.x - steps.step4.x) *
                stepLot *
                (progress - steps.step4.end);
            step5Y =
              Math.round(step4Y) +
              (steps.step5.y - steps.step4.y) *
                stepLot *
                (progress - steps.step4.end);
            warrantyPen.style.transform = `translate(${step5X}%, ${step5Y}%) rotate(17deg)`;
          }

          // Шаг 6
          if (progress >= steps.step5.end && progress < steps.step6.end) {
            step6X =
              Math.round(step5X) +
              (steps.step6.x - steps.step5.x) *
                stepLot *
                (progress - steps.step5.end);
            step6Y =
              Math.round(step5Y) +
              (steps.step6.y - steps.step5.y) *
                stepLot *
                (progress - steps.step5.end);
            warrantyPen.style.transform = `translate(${step6X}%, ${step6Y}%) rotate(17deg)`;
          }

          // Шаг 7
          if (progress >= steps.step6.end && progress < steps.step7.end) {
            step7X =
              Math.round(step6X) +
              (steps.step7.x - steps.step6.x) *
                stepLot *
                (progress - steps.step6.end);
            step7Y =
              Math.round(step6Y) +
              (steps.step7.y - steps.step6.y) *
                stepLot *
                (progress - steps.step6.end);
            warrantyPen.style.transform = `translate(${step7X}%, ${step7Y}%) rotate(17deg)`;
          }

          // Шаг 8
          if (progress >= steps.step7.end && progress < steps.step8.end) {
            step8X =
              Math.round(step7X) +
              (steps.step8.x - steps.step7.x) *
                stepLot *
                (progress - steps.step7.end);
            step8Y =
              Math.round(step7Y) +
              (steps.step8.y - steps.step7.y) *
                stepLot *
                (progress - steps.step7.end);
            warrantyPen.style.transform = `translate(${step8X}%, ${step8Y}%) rotate(17deg)`;
          }

          // Шаг 9
          if (progress >= steps.step8.end && progress < steps.step9.end) {
            step9X =
              Math.round(step8X) +
              (steps.step9.x - steps.step8.x) *
                stepLot *
                (progress - steps.step8.end);
            step9Y =
              Math.round(step8Y) +
              (steps.step9.y - steps.step8.y) *
                stepLot *
                (progress - steps.step8.end);
            warrantyPen.style.transform = `translate(${step9X}%, ${step9Y}%) rotate(17deg)`;
          }

          // Шаг 10
          if (progress >= steps.step9.end && progress < steps.step10.end) {
            step10X =
              Math.round(step9X) +
              (steps.step10.x - steps.step9.x) *
                stepLot *
                (progress - steps.step9.end);
            step10Y =
              Math.round(step9Y) +
              (steps.step10.y - steps.step9.y) *
                stepLot *
                (progress - steps.step9.end);
            warrantyPen.style.transform = `translate(${step10X}%, ${step10Y}%) rotate(17deg)`;
          }

          // Шаг 11
          if (progress >= steps.step10.end && progress < steps.step11.end) {
            step11X =
              Math.round(step10X) +
              (steps.step11.x - steps.step10.x) *
                stepLot *
                (progress - steps.step10.end);
            step11Y =
              Math.round(step10Y) +
              (steps.step11.y - steps.step10.y) *
                stepLot *
                (progress - steps.step10.end);
            warrantyPen.style.transform = `translate(${step11X}%, ${step11Y}%) rotate(17deg)`;
          }

          // Шаг 12
          if (progress >= steps.step11.end && progress < steps.step12.end) {
            step12X =
              Math.round(step11X) +
              (steps.step12.x - steps.step11.x) *
                stepLot *
                (progress - steps.step11.end);
            step12Y =
              Math.round(step11Y) +
              (steps.step12.y - steps.step11.y) *
                stepLot *
                (progress - steps.step11.end);
            warrantyPen.style.transform = `translate(${step12X}%, ${step12Y}%) rotate(17deg)`;
          }

          // Шаг 13
          if (progress >= steps.step12.end && progress < steps.step13.end) {
            step13X =
              Math.round(step12X) +
              (steps.step13.x - steps.step12.x) *
                stepLot *
                (progress - steps.step12.end);
            step13Y =
              Math.round(step12Y) +
              (steps.step13.y - steps.step12.y) *
                stepLot *
                (progress - steps.step12.end);
            warrantyPen.style.transform = `translate(${step13X}%, ${step13Y}%) rotate(17deg)`;
          }

          // Шаг 14
          if (progress >= steps.step13.end && progress < steps.step14.end) {
            step14X =
              Math.round(step13X) +
              (steps.step14.x - steps.step13.x) *
                stepLot *
                (progress - steps.step13.end);
            step14Y =
              Math.round(step13Y) +
              (steps.step14.y - steps.step13.y) *
                stepLot *
                (progress - steps.step13.end);
            warrantyPen.style.transform = `translate(${step14X}%, ${step14Y}%) rotate(17deg)`;
          }

          // Шаг 15
          if (progress >= steps.step14.end && progress < steps.step15.end) {
            step15X =
              Math.round(step14X) +
              (steps.step15.x - steps.step14.x) *
                stepLot *
                (progress - steps.step14.end);
            step15Y =
              Math.round(step14Y) +
              (steps.step15.y - steps.step14.y) *
                stepLot *
                (progress - steps.step14.end);
            warrantyPen.style.transform = `translate(${step15X}%, ${step15Y}%) rotate(17deg)`;
          }

          // Шаг последний
          if (progress >= steps.step15.end && progress < 1) {
            stepEndX =
              Math.round(step15X) +
              (startX - steps.step15.x) *
                stepLot *
                (progress - steps.step15.end);
            stepEndY =
              Math.round(step15Y) +
              (startY - steps.step15.y) *
                stepLot *
                (progress - steps.step15.end);
            warrantyPen.style.transform = `translate(${stepEndX}%, ${stepEndY}%) rotate(17deg)`;
          }
          writePenId = requestAnimationFrame(writePen);
        });
      }

      // Если загрузка ручки перед точкой ее появления warrantyPenAppearPoint
      if (isBeforePenAction()) {
        // ПРИКЛЕИТЬ РУЧКУ
        // Первоначально определить координату ручки по оси X в position: absolute
        const initialWarrantyPenLeft = warrantyPen.getBoundingClientRect().left;
        // Затем приклеить ее, добавив класс, содержащий position: fixed
        warrantyPen.classList.add("sticky");
        // Задать отступы для фиксированного положения ручки
        warrantyPen.style.top = `${warrantyAnimStartPoint}px`;
        warrantyPen.style.left = `${initialWarrantyPenLeft}px`;

        window.addEventListener("scroll", showWarrantyPen);
      }

      // Если загрузка ручки в пределах диапазона анимации
      if (isInPenAnimRange()) {
        warrantyPen.classList.remove("unvisible");
        unstickPen();
        penIsUnsticked = true;
        getUpPen();
      }

      // Если загрузка ручки после точки окончания анимации warrantyAnimStopPoint
      if (isAfterPenAction()) {
        warrantyPen.classList.remove("unvisible");
        unstickPen();
        penIsUnsticked = true;
      }

      window.addEventListener("scroll", function () {
        // Кждый раз при скролле переопределем переменные ниже
        currentBlockTop = block.getBoundingClientRect().top;
        currentPenBottom = warrantyPen.getBoundingClientRect().bottom;
        currentWarrantySceneTop = warrantyScene.getBoundingClientRect().top;

        // Если вне блока анимации - отменяем анимацию, кладем ручку
        if (isAfterPenAction() || isBeforePenAction()) {
          cancelAnimationFrame(writePenId);
          // if(!penIsDown) getDownPen();
          getDownPen();
        }
      });
      window.addEventListener("scroll", getUpPen);

      // FUNCTIONS
      // ДИАПАЗОН - ПЕРЕД НАЧАЛОМ ДЕЙСТВИЙ БЛОКА
      function isBeforePenAction() {
        return currentBlockTop + warrantyPenTopBlockOffset >
          warrantyPenAppearPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - ПОЯВЛЕНИЕ РУЧКИ
      function isInPenEntryRange() {
        return currentBlockTop + warrantyPenTopBlockOffset <=
          warrantyPenAppearPoint &&
          currentBlockTop + warrantyPenTopBlockOffset > warrantyAnimStartPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - АНИМАЦИИ
      function isInPenAnimRange() {
        // return currentBlockTop <= warrantyAnimStartPoint && currentBlockTop >= warrantyAnimStopPoint
        return currentBlockTop + warrantyPenTopBlockOffset <=
          warrantyPenAppearPoint &&
          currentBlockTop + warrantyPenTopBlockOffset >= warrantyAnimStopPoint
          ? true
          : false;
      }
      // ДИАПАЗОН - ПОСЛЕ ДЕЙСТВИЙ БЛОКА
      function isAfterPenAction() {
        return currentBlockTop + warrantyPenTopBlockOffset <
          warrantyAnimStopPoint
          ? true
          : false;
      }

      // ПОКАЗАТЬ РУЧКУ
      function showWarrantyPen() {
        // Если блок выше точки появления ручки
        if (warrantyPenAppearPoint >= currentWarrantySceneTop + warrantyScene.getBoundingClientRect().height / 4 + 120) {
          // if(isInPenAnimRange()) {
          warrantyPen.classList.remove("unvisible");
          // Если докрутили до точки отлипания
          if (currentBlockTop + warrantyPenTopBlockOffset <= warrantyAnimStartPoint) {
            // Отклеиваем и удаляем слушатель функции появления ручки (showWarrantyPen())
            unstickPen();
          }
        }
        // Если не докрутили до диапазона приклеивания ручки "isInPenEntryRange"
        if (warrantyPenAppearPoint < currentWarrantySceneTop + warrantyScene.getBoundingClientRect().height / 4 + 120) {
          warrantyPen.classList.add("unvisible");
        }
      }

      // ОТКЛЕИТЬ РУЧКУ
      function unstickPen() {
        warrantyPen.classList.remove("sticky");
        warrantyPen.style.top = ``;
        warrantyPen.style.left = ``;
        window.removeEventListener("scroll", showWarrantyPen);
        penIsUnsticked = true;
      }

      // ПОДНЯТЬ РУЧКУ
      function getUpPen() {
        if (penIsUnsticked && penIsDown) {
          if (isInPenAnimRange()) {
            setTimeout(function () {
              // lockPage(unLockedDocumentWidth, header);
              warrantyPen.style.transform = `translate(${startX}%, ${startY}%) rotate(17deg)`;
              warrantyPen.style.transition = `1000ms`;
              penAnimate();
              penIsDown = false;
            }, 0);
          }
        }
      }

      // ПОЛОЖИТЬ РУЧКУ
      function getDownPen() {
        if (penIsUnsticked) {
          textCompleted()
          if(!textIsWritten) {
            warrantyText.style.maxWidth = ``
            warrantyText.style.transition = `200ms`
          }

          warrantyPen.style.transition = `1000ms`;
          warrantyPen.style.transform = `rotate(0deg)`;
          penIsDown = true;
        }
      }

      // РИСОВАТЬ
      function penAnimate() {
        if (!textIsWritten) {
          showText();
          textIsWritten = true;
        }

        if (textIsWritten) {
          setTimeout(() => {
            warrantyText.style.transition = `0ms`;
          }, penAnimateDuration);
        }

        setTimeout(() => {
          warrantyPen.style.transition = `0ms`;
          writePen(writePenOptions);
        }, warrantyPenUpTime);
      }

      // textIsWritten = false

      function textCompleted() {
        return (warrantyText.getBoundingClientRect().width * .8 >= parseInt(getComputedStyle(warrantyTextImg).width)) ? textIsWritten = true : textIsWritten = false
      }


      // ПОКАЗАТЬ ТЕКСТ
      function showText() {
        warrantyText.style.maxWidth = `143px`;

        if(lockedDocumentWidth >= 1250) {
          warrantyText.style.transition = `${penAnimateDuration * 5}ms ${
            warrantyPenUpTime * 0
          }ms`;
        }
        if(unLockedDocumentWidth >= 1100 && unLockedDocumentWidth < 1250) {
          warrantyText.style.transition = `${penAnimateDuration * 6}ms ${
            warrantyPenUpTime * 0.2
          }ms`;
        }
        if(unLockedDocumentWidth >= 1000 && unLockedDocumentWidth < 1100) {
          warrantyText.style.transition = `${penAnimateDuration * 6.5}ms ${
            warrantyPenUpTime * 0.4
          }ms`;
        }
        if(unLockedDocumentWidth >= 768 && unLockedDocumentWidth < 1000) {
          warrantyText.style.transition = `${penAnimateDuration * 3}ms ${
            warrantyPenUpTime * 0.5
          }ms`;
        }
        if(unLockedDocumentWidth >= 415 && unLockedDocumentWidth < 768) {
          warrantyText.style.transition = `${penAnimateDuration * 4.5}ms ${
            warrantyPenUpTime * 0.5
          }ms`;
        }
        if(unLockedDocumentWidth >= 360 && unLockedDocumentWidth < 415) {
          warrantyText.style.transition = `${penAnimateDuration * 5}ms ${
            warrantyPenUpTime * 0.4
          }ms`;
        }
        if(unLockedDocumentWidth < 360) {
          warrantyText.style.transition = `${penAnimateDuration * 5.5}ms ${
            warrantyPenUpTime * 0.5
          }ms`;
        }
      }
    }, 0);
  } else {
    console.log(
      `HTML-элемент с классом "${elemClass}" не найден. Пожалуйста убедитель в правильности написания класса элемента.`
    );
  }
}
