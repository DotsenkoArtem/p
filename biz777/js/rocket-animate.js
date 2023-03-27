const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
const cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

let isTransitioned = false

rocketBlockAnimate("js-rocket");

function rocketBlockAnimate(elemClass) {
  /* 
  Условно анимация данного блока разделена на III этапа:
    I ЭТАП- появление
    II ЭТАП- основной
    III ЭТАП- при скролле
  */
  // Получение блока анимации
  const block = document.querySelector(`.${elemClass}`);
  if (block) {
    window.addEventListener("load", function () {

      // НАСТРОЙКИ БЛОКА АНИМАЦИИ
      /* 
    Точки начала и окончания анимации при скролле, соответственно SCROLL_ANIM_ENTRY_POINT и SCROLL_ANIM_EXIT_POINT
    В данном контексте значениями начала и окончания являются отступы от верхней границы окна браузера
    */
      const ROCKET_MAIN_ANIM_ENTRY_POINT = block.getBoundingClientRect().top;
      // Диапазон работы анимации "при скролле"
      const SCROLL_ANIM_RANGE = 120;
      const SCROLL_ANIM_ENTRY_POINT =
      ROCKET_MAIN_ANIM_ENTRY_POINT - SCROLL_ANIM_RANGE;

      // Точка окончания анимации при скролле
      const SCROLL_ANIM_EXIT_POINT = 0;
      // Максимальная величина поворота ракеты при скролле, в градусах
      const ROCKET_MAX_ROTATE = 25;

      // // Текущее значение отступа блока анимации по оси Y от внерхней границы окна
      let currentAnimationBlockTop;

      // Массив динамических (которые анимируются в II ЭТАПе) элементов блока анимации
      let movingBlockItems = [];
      // Получение динамических элементов блока анимации
      const skyLg = document.querySelector(".rocket-sky-lg");
      movingBlockItems.push(skyLg);
      const gear = document.querySelector(".rocket-gear");
      movingBlockItems.push(gear);
      const sheetClockGlobe = document.querySelector(
        ".rocket-sheet-clock-globe"
      );
      movingBlockItems.push(sheetClockGlobe);
      const skyMdTop = document.querySelector(".rocket-sky-md-top");
      movingBlockItems.push(skyMdTop);
      const skyMd = document.querySelector(".rocket-sky-md");
      movingBlockItems.push(skyMd);

      // Массив, содержащий все элементы блока независимо от их поведения после появления блока
      let animationBlockItems = [];
      // Наполнение массива [animationBlockItems] элементами
      for (let item of movingBlockItems) {
        animationBlockItems.push(item);
      }
      // Получение и добавление в массив элемента 'ракета'
      const rocket = document.querySelector(".rocket-roket");
      animationBlockItems.push(rocket);

      // Значения конечных трансформаций элементов после анимации скрола
      const elemsEndStyles = {
        skyLg: {
          translateX: 30,
          translateY: 40,
        },
        skyMdTop: {
          translateX: 50,
          translateY: 150,
        },
        skyMd: {
          translateX: 12,
          translateY: 170,
        },
        gear: {
          translateX: 100,
          translateY: -300,
          scale: 0.05,
        },
        sheetClockGlobe: {
          translateX: -160,
          translateY: -60,
          scale: 0.05,
        },
      };

      // Функция проверки на нахождение элемента в пределах диапазона анимации "II ЭТАПа"
      function isInRocketMainAnimRange(elem) {
        return elem.getBoundingClientRect().top <=
          ROCKET_MAIN_ANIM_ENTRY_POINT &&
          elem.getBoundingClientRect().top >= SCROLL_ANIM_ENTRY_POINT
          ? true
          : false;
      }

      // Функция проверки на нахождение элемента в пределах диапазона анимации "При скролле"
      function isInScrollAnimRange(elem) {
        return elem.getBoundingClientRect().top < SCROLL_ANIM_ENTRY_POINT &&
          elem.getBoundingClientRect().top >= SCROLL_ANIM_EXIT_POINT
          ? true
          : false;
      }

      // Функция проверки на нахождение элемента за пределами диапазонов анимаций (в данном случае выше - стр прокручена вниз)
      function isAboveAnimRanges(elem) {
        return elem.getBoundingClientRect().top < SCROLL_ANIM_EXIT_POINT
          ? true
          : false;
      }
      
      // Флаг состояния анимации (для II ЭТАПа)
      let isAnimated = true;

      // Идентификаторы анимаций
      let animateCloudsId;
      let animateGearId;
      let animateSheetClockGlobeId;

      // Время, прошедшее между остановкой анимации и ее последующим началом
      let deltaTimeClouds = 0;
      let deltaTimeGear = 0;
      let deltaTimeSheetClockGlobe = 0;

      // Параметры для анимации "Облака"
      const animateCloudsOptions = {
        timing(timeFraction) {
          return 1 - Math.abs(1 - timeFraction * 2);
        },
        draw(progress) {
          skyLg.style.transform = `translate(${18.5 * progress}%, ${
            -5 * progress
          }%)`;
          skyMdTop.style.transform = `translate(${18.5 * progress}%, ${
            -5 * progress
          }%)`;
          skyMd.style.transform = `translateX(${-5 * progress}%)`;
        },
        duration: 4000,
        editTime: 0,
      };

      // Параметры для анимации "Шестерня"
      const animateGearOptions = {
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          gear.style.transform = `rotate(${360 * progress}deg)`;
          gear.style.transformOrigin = `center center`;
        },
        duration: 7000,
        editTime: 0,
      };

      // Параметры для анимации "Часы, лист, глобус"
      const animateSheetClockGlobeOptions = {
        timing(timeFraction) {
          return timeFraction;
        },
        draw(progress) {
          sheetClockGlobe.style.transform = `translate(${
            10 * Math.sin((360 * progress * Math.PI) / 180)
          }px, ${
            10 * Math.cos(((360 * progress + 180) * Math.PI) / 180) + 10
          }px)`;
          sheetClockGlobe.style.transformOrigin = `center center`;
        },
        duration: 4000,
        editTime: 0,
      };

      // Функция анимации облаков
      function animateClouds({ timing, draw, duration, editTime }) {
        // editTime необходимо для возобновления анимации с того же кадра, на котором она была остановлена
        let start = performance.now() + editTime;

        requestAnimationFrame(function animateClouds(time) {
          if (start > time) {
            start = time;
          }
          let timeFraction = (time - start) / duration;
          // Использую для зацикливания анимаций
          if (timeFraction > 1) start = time;
          // Разница между текущим временем и временем начала текущего кадра анимации
          deltaTimeClouds = time - start;
          // Прогресс
          let progress = timing(timeFraction);
          // Отрисовка
          draw(progress);
          animateCloudsId = requestAnimationFrame(animateClouds);
        });
      }

      // Функция анимации "Шестерня"
      function animateGear({ timing, draw, duration, editTime }) {
        let start = performance.now() + editTime;
        requestAnimationFrame(function animateGear(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) start = time;
          deltaTimeGear = time - start;
          let progress = timing(timeFraction);
          draw(progress);
          animateGearId = requestAnimationFrame(animateGear);
        });
      }

      // Функция анимации "Часы, лист, глобус"
      function animateSheetClockGlobe({ timing, draw, duration, editTime }) {
        let start = performance.now() + editTime;
        requestAnimationFrame(function animateSheetClockGlobe(time) {
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) start = time;
          deltaTimeSheetClockGlobe = time - start;
          let progress = timing(timeFraction);
          draw(progress);
          animateSheetClockGlobeId = requestAnimationFrame(
            animateSheetClockGlobe
          );
        });
      }

      // При прокпутке страницы > 0. Без setTimeout при перезагрузке страницы значения window.pageYOffset определяюися то правильно (в соответствии с текущей прокруткой страницы), то равно 0. Соответственно сбивается определение всех исходных координат элементов.
      setTimeout(function () {

        // Текущее значение отступа блока анимации по оси Y от внерхней границы окна
        currentAnimationBlockTop = block.getBoundingClientRect().top;
        // Прогресс анимации скролла - изначально был предназначен для вычисления положения ракеты и других элементов анимации в зависимости от величины прокрутки страницы
        let scrollProgress = 0;
        // Стили в момент остановки анимации
        let animationStopStyles = undefined;

        // ЕСЛИ БЛОК В ДИАПАЗОНЕ АНИМАЦИИ (II ЭТАПа)
        if (isInRocketMainAnimRange(block)) {

          // I ЭТАП: ПОЯВЛЕНИЕ БЛОКА С ЭЛЕМЕНТАМИ
          block.classList.add("smooth-entry");

          // II ЭТАП: АНИМИРОВАНИЕ ЭЛЕМЕНТОВ БЛОКА (БЛОК НЕ В ПРЕДЕЛАХ ДИАПАЗОНА SCROLL_ANIM_RANGE)
          // АНИМАЦИЯ - ОСНОВНАЯ
          setTimeout(function () {
            block.classList.remove("smooth-entry");
            block.classList.add("visible");
            animateClouds(animateCloudsOptions);
            animateGear(animateGearOptions);
            animateSheetClockGlobe(animateSheetClockGlobeOptions);
            isAnimated = true;
          }, 1000);
          // console.log("В ПОЛЕ АНИМАЦИИ!!!!!!!!!!");
        }

        // ЕСЛИ БЛОК В ДИАПАЗОНЕ АНИМАЦИИ СКРОЛЛА(III ЭТАПа) ИЛИ ВЫШЕ
        if (isInScrollAnimRange(block) || isAboveAnimRanges(block)) {
          isAnimated = false;
          // Прогресс скролла
          scrollProgress = 1;

          rocket.style.transform = `rotate(${
            ROCKET_MAX_ROTATE * scrollProgress
          }deg)`;

          animationStopStyles = 0;
          scrollRocket(scrollProgress, animationStopStyles);
          block.classList.add("visible");

          // console.log("ОКНО В ПОЛЕ АНИМАЦИИ СКРОЛЛА ИЛИ НИЖЕ");
        }

        // III ЭТАП: АНИМАЦИЯ ПРИ СКРОЛЛЕ
          window.addEventListener("scroll", blockScrollAction);

     

        function blockScrollAction() {
          currentAnimationBlockTop = block.getBoundingClientRect().top;
          
          if(!isTransitioned) {
          
            

            // ЕСЛИ В ПРЕДЕЛАХ ДИАПАЗОНА АНИМАЦИИ СКРОЛЛА
            if (isInScrollAnimRange(block)) {
              console.log('isTransitioned: ', isTransitioned);
              // Для каждого блока устанавливается время перехода
              movingBlockItems.forEach(function (item) {
                item.style.transition = "1s";
              });
              // И если анимация проигрывается - останавливаем её
              if (isAnimated) {
                cancelAnimationFrame(animateCloudsId);
                cancelAnimationFrame(animateGearId);
                cancelAnimationFrame(animateSheetClockGlobeId);
                isAnimated = false;

                // Если не забраны стили анимации - забераем их и парсим
                animationStopStyles = {};
                animationStopStyles.skyLg = {
                  translateX: parseFloat(
                    skyLg.style.transform.slice(10, -1).split(", ")[0]
                  ),
                  translateY: parseFloat(
                    skyLg.style.transform.slice(10, -1).split(", ")[1]
                  ),
                };

                animationStopStyles.sheetClockGlobe = {
                  translateX: parseFloat(
                    sheetClockGlobe.style.transform.slice(10, -1).split(", ")[0]
                  ),
                  translateY: parseFloat(
                    sheetClockGlobe.style.transform.slice(10, -1).split(", ")[1]
                  ),
                };

                animationStopStyles.skyMdTop = {
                  translateX: parseFloat(
                    skyMdTop.style.transform.slice(10, -1).split(", ")[0]
                  ),
                  translateY: parseFloat(
                    skyMdTop.style.transform.slice(10, -1).split(", ")[1]
                  ),
                };

                animationStopStyles.skyMd = {
                  translateX: parseFloat(skyMd.style.transform.slice(11, -1)),
                  translateY: 0,
                };

                animationStopStyles.gear = {
                  rotate: parseFloat(gear.style.transform.slice(7, -4)),
                };
                // End of getAnimationStopStyles
              }

              // Прогресс скролла
              scrollProgress = 1;
              // Поворачиваем ракету
              rocket.style.transform = `rotate(${
                ROCKET_MAX_ROTATE * scrollProgress
              }deg)`;
              // Двигаем облака и скрываем детальки
              scrollRocket(scrollProgress, animationStopStyles);
            }
          }








          // ЕСЛИ В ПРЕДЕЛАХ ДИАПАЗОНА ОСНОВНОЙ АНИМАЦИИ (II ЭТАП)
          if (isInRocketMainAnimRange(block)) {

            if(!isTransitioned) {

              // Для каждого блока устанавливается время перехода
              movingBlockItems.forEach(function (item) {
                item.style.transition = "0s";
              });
              if (!isAnimated) {
                isTransitioned = true
                console.log('isTransitioned: ', isTransitioned);
                // Для каждого блока устанавливается время перехода
                movingBlockItems.forEach(function (item) {
                  item.style.transition = "1s";
                });
                scrollProgress = 0;
                scrollRocket(scrollProgress, animationStopStyles);
                rocket.style.transform = `rotate(${scrollProgress}deg)`;

                isAnimated = true;

                this.setTimeout(function () {
                  // console.log('SheetClockGlobeStyles: ', sheetClockGlobe.style);

                  animateCloudsOptions.editTime = -deltaTimeClouds;
                  animateGearOptions.editTime = -deltaTimeGear;
                  animateSheetClockGlobeOptions.editTime =
                    -deltaTimeSheetClockGlobe;

                  deltaTimeClouds = 0;
                  deltaTimeGear = 0;
                  deltaTimeSheetClockGlobe = 0;

                  // Для каждого блока устанавливается время перехода
                  movingBlockItems.forEach(function (item) {
                    item.style.transition = "0s";
                  });

                  animateClouds(animateCloudsOptions);
                  animateGear(animateGearOptions);
                  animateSheetClockGlobe(animateSheetClockGlobeOptions);


                  isTransitioned = false
                  console.log('isTransitioned: ', isTransitioned);
                }, 1000);
              }

            }



          }
        }

        function scrollRocket(scrollProgress, animationStopStyles) {
          if (typeof animationStopStyles == "object") {
            // Установка трансформации при скролле страницы с учетом стилей на момент остановки анимации
            skyLg.style.transform = `translate(${
              elemsEndStyles.skyLg.translateX * scrollProgress +
              animationStopStyles.skyLg.translateX
            }%, ${
              elemsEndStyles.skyLg.translateY * scrollProgress +
              animationStopStyles.skyLg.translateY
            }%)`;

            skyMdTop.style.transform = `translate(${
              elemsEndStyles.skyMdTop.translateX * scrollProgress +
              animationStopStyles.skyMdTop.translateX
            }%, ${
              elemsEndStyles.skyMdTop.translateY * scrollProgress +
              animationStopStyles.skyMdTop.translateY
            }%)`;

            skyMd.style.transform = `translate(${
              elemsEndStyles.skyMd.translateX * scrollProgress +
              animationStopStyles.skyMd.translateX
            }%, ${
              elemsEndStyles.skyMd.translateY * scrollProgress +
              animationStopStyles.skyMd.translateY
            }%)`;

            gear.style.transform = `translate(${
              elemsEndStyles.gear.translateX * scrollProgress
            }%, ${elemsEndStyles.gear.translateY * scrollProgress}%) scale(${
              1 - (1 - elemsEndStyles.gear.scale) * scrollProgress
            }) rotate(${animationStopStyles.gear.rotate}deg)`;

            sheetClockGlobe.style.transform = `translate(${
              elemsEndStyles.sheetClockGlobe.translateX * scrollProgress +
              animationStopStyles.sheetClockGlobe.translateX
            }px, ${
              elemsEndStyles.sheetClockGlobe.translateY * scrollProgress +
              animationStopStyles.sheetClockGlobe.translateY
            }px) scale(${
              1 - (1 - elemsEndStyles.sheetClockGlobe.scale) * scrollProgress
            })`;
          }
          if (typeof animationStopStyles == "number") {
            // console.log('Тип данных: number');

            skyLg.style.transform = `translate(${
              elemsEndStyles.skyLg.translateX * scrollProgress +
              animationStopStyles
            }%, ${
              elemsEndStyles.skyLg.translateY * scrollProgress +
              animationStopStyles
            }%)`;

            skyMdTop.style.transform = `translate(${
              elemsEndStyles.skyMdTop.translateX * scrollProgress +
              animationStopStyles
            }%, ${
              elemsEndStyles.skyMdTop.translateY * scrollProgress +
              animationStopStyles
            }%)`;

            skyMd.style.transform = `translate(${
              elemsEndStyles.skyMd.translateX * scrollProgress +
              animationStopStyles
            }%, ${
              elemsEndStyles.skyMd.translateY * scrollProgress +
              animationStopStyles
            }%)`;

            gear.style.transform = `translate(${
              elemsEndStyles.gear.translateX * scrollProgress
            }%, ${elemsEndStyles.gear.translateY * scrollProgress}%) scale(${
              1 - (1 - elemsEndStyles.gear.scale) * scrollProgress
            }) rotate(${animationStopStyles}deg)`;

            sheetClockGlobe.style.transform = `translate(${
              elemsEndStyles.sheetClockGlobe.translateX * scrollProgress
            }px, ${
              elemsEndStyles.sheetClockGlobe.translateY * scrollProgress
            }px) scale(${
              1 - (1 - elemsEndStyles.sheetClockGlobe.scale) * scrollProgress
            })`;
          }
        }

        // ДЕЙСТВИЯ ПРИ ПЕРЕХОДЕ ПО ВКЛАДКАМ БРАУЗЕРА
        // let exit, entry;
        // this.window.addEventListener("blur", function () {
        //   exit = new Date().getTime();

        //   // if(isAnimated) {
        //     cancelAnimationFrame(animateCloudsId);
        //     cancelAnimationFrame(animateGearId);
        //     cancelAnimationFrame(animateSheetClockGlobeId);
        //   //   isAnimated = false
        //   // }

        //   // console.log("Ушел с вкладки: ", exit);
        //   // console.log('isAnimated: ', isAnimated);
        // });

        // this.window.addEventListener("focus", function () {
        //   entry = new Date().getTime();

        //   switchDelta = entry - exit

        //   // if(!isAnimated) {
        //     // animateCloudsOptions.editTime = -deltaTimeClouds - switchDelta;
        //     // animateGearOptions.editTime = -deltaTimeGear - switchDelta;
        //     // animateSheetClockGlobeOptions.editTime = -deltaTimeSheetClockGlobe - switchDelta;

        //     // console.log('Вернулся: ', entry);
        //     // console.log('isAnimated: ', isAnimated);

        //     // console.log('Вернулся: ', deltaTimeClouds);
        //     // console.log('deltaTimeGear: ', deltaTimeGear);
        //     // console.log('deltaTimeSheetClockGlobe: ', deltaTimeSheetClockGlobe);

        //     // deltaTimeClouds = 0
        //     // deltaTimeGear = 0
        //     // deltaTimeSheetClockGlobe = 0

        //     animateClouds(animateCloudsOptions);
        //     animateGear(animateGearOptions);
        //     animateSheetClockGlobe(animateSheetClockGlobeOptions);
        //   // }
        // });
        // ===========================================

        // End of Timeout
      }, 0);
    });
  } else {
    console.log(
      "HTML-элемент не найден. Пожалуйста убедитель в правильности написания класса элемента."
    );
  }
}
