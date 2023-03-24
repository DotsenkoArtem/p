const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
const cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;

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
    // НАСТРОЙКИ БЛОКА АНИМАЦИИ
    /* 
    Точки начала и окончания анимации при скролле, соответственно SCROLL_ANIM_ENTRY_POINT и SCROLL_ANIM_EXIT_POINT
    В данном контексте значениями начала и окончания являются отступы от верхней границы окна браузера
    */
    const SCROLL_ANIM_ENTRY_POINT = 210;
    const SCROLL_ANIM_EXIT_POINT = 0;
    // Диапазон работы анимации "при скролле"
    const SCROLL_ANIM_RANGE = SCROLL_ANIM_ENTRY_POINT - SCROLL_ANIM_EXIT_POINT;
    // Максимальная величина поворота ракеты при скролле, в градусах
    const ROCKET_MAX_ROTATE = 25;

    // ИСХОДНЫЕ КООРДИНАТЫ ЭЛЕМЕНТОВ
    const INITIAL_BLOCK_COORDS = block.getBoundingClientRect();
    // Исходный отступ блока по оси Y от внерхней границы окна
    const INITIAL_BLOCK_TOP = INITIAL_BLOCK_COORDS.top;
    // Отступ по оси Y от верхней грницы блока анимации - в данном диапазоне проигрывается анимация "II ЭТАП"
    const SCROLL_ANIM_OFFSET_BLOCK =
      INITIAL_BLOCK_TOP - SCROLL_ANIM_ENTRY_POINT;

    // Текущее значение отступа блока анимации по оси Y от внерхней границы окна
    let currentAnimationBlockTop;

    // Массив динамических (которые анимируются в II ЭТАПе) элементов блока анимации
    let movingBlockItems = [];
    // Получение динамических элементов блока анимации
    const skyLg = document.querySelector(".rocket-sky-lg");
    movingBlockItems.push(skyLg);
    const gear = document.querySelector(".rocket-gear");
    movingBlockItems.push(gear);
    const sheetClockGlobe = document.querySelector(".rocket-sheet-clock-globe");
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

    // Значения конечных трансформаций элементов
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
        scale: 0.2,
      },
      sheetClockGlobe: {
        translateX: -160,
        translateY: -60,
        scale: 0.05,
      },
    };

    // Функция проверки на нахождение элемента в пределах диапазона анимации "II ЭТАПа"
    function isInAnimRange(elem) {
      return elem.getBoundingClientRect().top <= INITIAL_BLOCK_TOP &&
        elem.getBoundingClientRect().top >= SCROLL_ANIM_ENTRY_POINT
        ? true
        : false;
    }

    // Функция проверки на нахождение элемента в пределах диапазона анимации "При скролле"
    function isInScrollAnimRange(elem) {
      return elem.getBoundingClientRect().top < SCROLL_ANIM_ENTRY_POINT &&
        elem.getBoundingClientRect().top > SCROLL_ANIM_EXIT_POINT
        ? true
        : false;
    }

    let animateCloudsId;
    let animateGearId;

    // Флаг состояния анимации (для II ЭТАПа)
    let isAnimated = true;
    // Время, прошедшее между остановкой анимации и ее последующим началом
    let deltaTime = 0;

    // Параметры для анимации "Облака"
    const animateCloudsOptions = {
      timingForward(timeFractionForward) {
        return timeFractionForward;
      },
      timing(timeFraction) {
        return 1 - timeFraction;
      },
      draw(progress, progressForward) {
        skyLg.style.transform = `translate(${18.5 * progress}%, ${
          -5 * progress
        }%)`;
        skyMdTop.style.transform = `translate(${18.5 * progress}%, ${
          -5 * progress
        }%)`;
        skyMd.style.transform = `translateX(${-5 * progress}%)`;

        sheetClockGlobe.style.transform = `translate(${
          10 * Math.sin((360 * progressForward * Math.PI) / 180)
        }px, ${
          10 * Math.cos(((360 * progressForward + 180) * Math.PI) / 180) + 10
        }px)`;
        sheetClockGlobe.style.transformOrigin = `center center`;
      },
      duration: 2000,
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
      duration: 2000,
      // editTime: 0,
    };

    // Функция анимации облаков
    function animateClouds({
      timing,
      timingForward,
      draw,
      duration,
      editTime,
    }) {
      // editTime необходимо для возобновления анимации с того же кадра
      let start = performance.now() + editTime;

      requestAnimationFrame(function animateClouds(time) {
        // Дл облаков
        let timeFraction = Math.abs((time - start) / duration - 1);
        // Для книги и глобуса
        let timeFractionForward = (time - start) / (2 * duration) - 1;
        if (timeFractionForward > 1) timeFractionForward = 1;
        if (timeFraction > 1) start = time;
        // Зацикливание
        deltaTime = time - start;
        // Прогресс
        let progress = timing(timeFraction);
        let progressForward = timingForward(timeFractionForward);
        // Отрисовка
        draw(progress, progressForward); // отрисовать её
        if (timeFraction < 1.1) {
          animateCloudsId = requestAnimationFrame(animateClouds);
        }
      });
    }
    // Функция анимации "Шестерня"
    // function animateGear({ timing, draw, duration, editTime }) {
    function animateGear({ timing, draw, duration }) {
      let start = performance.now();
      requestAnimationFrame(function animateGear(time) {
        let timeFraction = (time - start) / duration;
        if (timeFraction > 1) start = time;
        let progress = timing(timeFraction);
        draw(progress);
          animateGearId = requestAnimationFrame(animateGear);
      });
    }

    window.addEventListener("load", function () {
      if(isInAnimRange(block)) {
        console.log('В ПОЛЕ АНИМАЦИИ!!!!!!!!!!');
      } else console.log('ННЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕЕТ');







      // I ЭТАП: ПОЯВЛЕНИЕ БЛОКА С ЭЛЕМЕНТАМИ
      block.classList.add("smooth-entry");

      // II ЭТАП: АНИМИРОВАНИЕ ЭЛЕМЕНТОВ БЛОКА (БЛОК НЕ В ПРЕДЕЛАХ ДИАПАЗОНА SCROLL_ANIM_RANGE)
      // АНИМАЦИЯ - ОСНОВНАЯ
      setTimeout(function () {
        block.classList.remove("smooth-entry");
        block.classList.add("visible");
        animateClouds(animateCloudsOptions);
        animateGear(animateGearOptions);
        isAnimated = true
      }, 1000);

      // III ЭТАП: АНИМАЦИЯ ПРИ СКРОЛЛЕ
      // Стили в момент остановки анимации
      let animationStopStyles = null;

      window.addEventListener("scroll", function () {
        currentAnimationBlockTop = block.getBoundingClientRect().top;
        rocket.style.transition = "0.3s";

        // Если в пределах диапазона
        if (currentAnimationBlockTop < SCROLL_ANIM_ENTRY_POINT) {
          // И если анимация проигрывается
          if (isAnimated) {
            cancelAnimationFrame(animateCloudsId);
            cancelAnimationFrame(animateGearId);
            isAnimated = false;
          }
        }
        // ЕСЛИ НЕ В ПРЕДЕЛАХ ДИАПАЗОНА АНИМАЦИИ
        else {
          if (!isAnimated) {
            animateCloudsOptions.editTime = -deltaTime;
            deltaTime = 0
            animateClouds(animateCloudsOptions);
            animateGear(animateGearOptions);
            isAnimated = true;
            animationStopStyles = null;
          }
        }

        function scrollRocket(scrollProgress) {
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


          // Детальки
          gear.style.transform = `translate(${elemsEndStyles.gear.translateX * scrollProgress}%, ${
            elemsEndStyles.gear.translateY * scrollProgress
          }%) scale(${1 - (1 - elemsEndStyles.gear.scale) * scrollProgress}) rotate(${
            animationStopStyles.gear.rotate
          }deg)`;

          sheetClockGlobe.style.transform = `translate(${
            elemsEndStyles.sheetClockGlobe.translateX * scrollProgress
          }%, ${
            elemsEndStyles.sheetClockGlobe.translateY * scrollProgress
          }%) scale(${
            1 - (1 - elemsEndStyles.sheetClockGlobe.scale) * scrollProgress
          })`;
        }

        // ЕСЛИ В ПРЕДЕЛАХ ДИАПАЗОНА АНИМАЦИИ ПРИ СКРОЛЛЕ
        if (isInScrollAnimRange(block)) {
          // Если не забраны стили анимации - забераем их и парсим
          if (!animationStopStyles) {
            animationStopStyles = {};

            animationStopStyles.skyLg = {
              translateX: parseFloat(
                skyLg.style.transform.slice(10, -1).split(", ")[0]
              ),
              translateY: parseFloat(
                skyLg.style.transform.slice(10, -1).split(", ")[1]
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
            console.log("skyMd.style.transform: ", skyMd.style.transform);
            console.log(
              "animationStopStyles.skyMd: ",
              animationStopStyles.skyMd
            );
          }
          // Прогресс скролла
          let scrollProgress =
            (SCROLL_ANIM_ENTRY_POINT - currentAnimationBlockTop) /
            SCROLL_ANIM_RANGE;

          rocket.style.transform = `rotate(${
            ROCKET_MAX_ROTATE * scrollProgress
          }deg)`;
          // Для каждого блока устанавливается точка трансформации через css с помощью класса .transform-on-scroll
          movingBlockItems.forEach(function (item) {
            item.style.transition = ".1s";
          });

          // И двигаем облака и скрываем детальки
          scrollRocket(scrollProgress);
        }

        // Если в точке окончание анимации "При скролле" и выше, фиксируем все элементы
        if (
          currentAnimationBlockTop <= SCROLL_ANIM_EXIT_POINT
        ) {
          scrollRocket(1)
        }

        if (currentAnimationBlockTop >= INITIAL_BLOCK_TOP) {
          rocket.style.transform = `rotate(${0}deg)`;
        }
      });

      let exit, entry;
      this.window.addEventListener("blur", function () {
        exit = new Date().getTime();
        cancelAnimationFrame(animateCloudsId);
        cancelAnimationFrame(animateGearId);
        isAnimated = false
        console.log("Ушел с вкладки: ", exit);
      });

      this.window.addEventListener("focus", function () {
        entry = new Date().getTime();
        console.log("Сфокусирован: ", entry);
        console.log(`Тебя не было ${entry - exit} ms`);
        if(!isAnimated) {
          animateCloudsOptions.editTime = -deltaTime;
          deltaTime = 0
          animateClouds(animateCloudsOptions);
          animateGear(animateGearOptions);
        }

      });
    });
  } else {
    console.log(
      "HTML-элемент не найден. Пожалуйста убедитель в правильности написания класса элемента."
    );
  }
}
