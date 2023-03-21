rocketBlockAnimate();

function rocketBlockAnimate() {
  /* 
  Условно анимация данного блока разделена на III этапа:
    - появление
    - основной
    - при скролле
  */

  // Получение блока анимации
  const animationBlock = document.querySelector(".block1__right");
  // Массив динамических (которые анимируются в основном этапе, после этапа появления блока) элементов блока анимации
  let movingBlockItems = [];
  // Получение динамических элементов блока анимации и запись в соответствующий массив
  const skyLg = document.querySelector(".block1-sky-lg");
  movingBlockItems.push(skyLg);
  const gear = document.querySelector(".block1-gear");
  movingBlockItems.push(gear);
  const sheetClockGlobe = document.querySelector(".block1-sheet-clock-globe");
  movingBlockItems.push(sheetClockGlobe);
  const skyMdTop = document.querySelector(".block1-sky-md-top");
  movingBlockItems.push(skyMdTop);
  const skyMd = document.querySelector(".block1-sky-md");
  movingBlockItems.push(skyMd);

  // Массив, содержащий все элементы блока независимо от их поведения после появления блока
  let animationBlockItems = [];
  // Наполнение массива [animationBlockItems] элементами
  for (let item of movingBlockItems) {
    animationBlockItems.push(item);
  }
  // Получение и добавление в массив элемента 'ракета'
  const rocket = document.querySelector(".block1-roket");
  animationBlockItems.push(rocket);

  // Начальные координаты блока анимации
  const INITIAL_ANIMATION_BLOCK_COORDS = animationBlock.getBoundingClientRect();
  // Начальный отступ блока анимации по оси Y от внерхней границы окна
  const INITIAL_ANIMATION_BLOCK_TOP = INITIAL_ANIMATION_BLOCK_COORDS.top;
  // Отступ по оси Y от верхней грницы блока анимации - устанавливает задержку начала анимации при скролле
  const ANIMATION_START_Y_OFFSET = 120;
  /* 
  Точки начала и окончания анимации при скролле, соответственно ANIMATION_START_POINT и ANIMATION_STOP_POINT
  В данном контексте значениями начала и окончания являются отступы от верхней границы окна браузера
  */
  const ANIMATION_START_POINT =
    INITIAL_ANIMATION_BLOCK_TOP - ANIMATION_START_Y_OFFSET;
  const ANIMATION_STOP_POINT = 0;
  // Диапазон работы анимации при скролле
  const ANIMATION_RANGE_VALUE = Math.abs(
    ANIMATION_START_POINT - ANIMATION_STOP_POINT
  );
  // Максимальная величина поворота ракеты при скролле, в градусах
  const ROCKET_SCROLL_MAX_ROTATE_VALUE = 60;

  window.addEventListener("load", function () {
    // I Этап: Появление блока с анимациями
    animationBlock.classList.add("smooth-entry");
    // II Этап: Добавление класса с анимациями после появления блока
    setTimeout(function () {
      animationBlock.classList.add("animated");
    }, 1000);

    // III Этап: Анимация при скролле
    // Текущее значение отступа блока анимации по оси Y от внерхней границы окна
    let currentAnimationBlockTop;
    // Флаг определяет состояния проигрывания анимации (приигрывается / на паузе)
    let isRunnig = true;

    window.addEventListener("scroll", function () {
      currentAnimationBlockTop = animationBlock.getBoundingClientRect().top;
      rocket.style.transition = "0.3s";

      if (currentAnimationBlockTop < ANIMATION_START_POINT) {
        if (isRunnig) {
          // movingBlockItems.forEach((item) => {
            // item.style.animationPlayState = "paused";
            // item.style.transition = '0'
          // });

          freezeElem(movingBlockItems);
          isRunnig = false;

          function freezeElem(elemsArr) {
            elemsArr.forEach(function (elem) {
              // let animationBlockCoords = animationBlock.getBoundingClientRect()
              // let elemCoords = elem.getBoundingClientRect()
              // elem.style.top = `${elemCoords.top - animationBlockCoords.top}px`
              // elem.style.left = `${elemCoords.left - animationBlockCoords.left}px`
              elem.style.visibility = `visible`;
              elem.style.opacity = `1`;
            });

            rocket.style.visibility = `visible`;
            rocket.style.opacity = `1`;

            animationBlock.classList.remove("smooth-entry");
            animationBlock.classList.remove("animated");
          }
        }

        // if (
        //   currentAnimationBlockTop > ANIMATION_STOP_POINT &&
        //   currentAnimationBlockTop < ANIMATION_START_POINT
        // ) {
        if (
          currentAnimationBlockTop > ANIMATION_STOP_POINT
        ) {
          let scrollProgress =
            (ANIMATION_START_POINT - currentAnimationBlockTop) /
            ANIMATION_RANGE_VALUE;
          rocket.style.transform = `rotate(${
            ROCKET_SCROLL_MAX_ROTATE_VALUE * scrollProgress
          }deg)`;

          // Для каждого блока устанавливается точка трансформации через css с помощью класса .transform-on-scroll
          movingBlockItems.forEach(function (item) {
            item.classList.add("transform-on-scroll");
            item.style.transition = ".5s";
          });
          // Скрытие деталей при скролле
          hideDetails(gear, sheetClockGlobe);
          // И двигаем облака
          translateСlouds();

          function hideDetails(...elem) {
            elem.forEach(function (item) {
              item.style.transform = `scale(${1 - 0.8 * scrollProgress})`;
              item.style.opacity = `${1 - 1 * scrollProgress}`;
            });
          }

          function translateСlouds() {
            skyLg.style.transform = `translate(${75 * scrollProgress}px, ${
              25 * scrollProgress
            }px)`;
            skyMdTop.style.transform = `translate(${-25 * scrollProgress}px, ${
              35 * scrollProgress
            }px)`;
            skyMd.style.transform = `translate(${25 * scrollProgress}px, ${
              30 * scrollProgress
            }px)`;
          }
        }

      } else if(
        currentAnimationBlockTop <= ANIMATION_STOP_POINT ||
        currentAnimationBlockTop >= ANIMATION_START_POINT
      ) {
        // movingBlockItems.forEach((item) => {
        //   item.style.animationPlayState = ''
        // })

        // Дополнительно обеспечивает адекватное положение при нервном-резком скролле
        if (currentAnimationBlockTop >= ANIMATION_START_POINT) {
          rocket.style.transform = `rotate(0deg)`;
          animationBlockItems.forEach((item) => {
            item.style.transform = ``
            item.style.opacity = `1`
          });
        }
        if (currentAnimationBlockTop <= ANIMATION_STOP_POINT) {
          rocket.style.transform = `rotate(${ROCKET_SCROLL_MAX_ROTATE_VALUE}deg)`;
        }

        animationBlock.classList.add("animated");
        isRunnig = true;
      }
    });
  });
}
