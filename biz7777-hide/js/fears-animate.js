window.addEventListener("load", function () {
  fearBlockAnimate("js-fear-section");
});

function fearBlockAnimate(elemClass) {
  const block = document.querySelector(`.${elemClass}`);

  if (block) {
    this.setTimeout(() => {
      // ТЕКУЩИЕ КООРДИНАТЫ ЭЛЕМЕНТОВ
      let currentBlockTop = block.getBoundingClientRect().top;
      let currentBlockBottom = block.getBoundingClientRect().bottom;

      let fearAnimStartPoint =
        document.documentElement.clientHeight - block.clientHeight;
      let fearAnimStopPoint = block.clientHeight + 100;

      const fearAnimItems = block.querySelectorAll(".fear-anim-item");

      const fear = block.querySelector(".fear");
      let currentFearTop = fear.getBoundingClientRect().top;
      let currentFearBottom = fear.getBoundingClientRect().bottom;

      const fearText = block.querySelector(".block14__info");
      let currentFearTextTop = fearText.getBoundingClientRect().top;
      let currentFearTextBottom = fearText.getBoundingClientRect().bottom;

      const fearHero = block.querySelector(".fear-hero");
      const fearHeroMirrored = block.querySelector(".fear-hero.mirrored-x");
      const fearFears = block.querySelector(".fear-fears");
      const firstMsgs = block.querySelectorAll(
        ".block14__img-text.first-frame"
      );
      const secondMsgs = block.querySelectorAll(
        ".block14__img-text.second-frame"
      );

      const fearEntryDuration = 1000;

      fearAnimItems.forEach((item) => {
        item.style.visibility = `hidden`;
        item.style.animationName = `none`;
      });

      window.addEventListener("scroll", fearSectionAnimate);

      window.addEventListener("scroll", fearAnimate);
      window.addEventListener("scroll", fearTextAnimate);

      // FUNCTIONS
      function fearSectionAnimate() {
        if (unLockedDocumentWidth > 1000) {
          currentBlockTop = block.getBoundingClientRect().top;
          currentBlockBottom = block.getBoundingClientRect().bottom;
          if (
            (currentBlockTop <= fearAnimStartPoint &&
              currentBlockBottom > fearAnimStartPoint &&
              scrollDirection < 0) ||
            (currentBlockBottom >= fearAnimStopPoint &&
              currentBlockTop < fearAnimStopPoint &&
              scrollDirection > 0)
          ) {
            fearAnimItems.forEach((item) => {
              item.style.visibility = ``;
              item.style.animationName = ``;
            });

            setTimeout(() => {
              switchFrame(switchFrameOptions);
            }, fearEntryDuration);

            window.removeEventListener("scroll", fearSectionAnimate);
          }
        }
      }

      function fearAnimate() {
        if (unLockedDocumentWidth <= 1000) {
          currentFearTop = fear.getBoundingClientRect().top;
          currentFearBottom = fear.getBoundingClientRect().bottom;

          if (
            (currentFearTop <=
              window.innerHeight - fear.getBoundingClientRect().height &&
              currentFearBottom >
                window.innerHeight - fear.getBoundingClientRect().height &&
              scrollDirection < 0) ||
            (currentFearBottom >= fear.getBoundingClientRect().height + 100 &&
              currentFearTop < fear.getBoundingClientRect().height + 100 &&
              scrollDirection > 0)
          ) {
            fear.style.visibility = ``;
            fear.style.animationName = ``;

            setTimeout(() => {
              switchFrame(switchFrameOptions);
            }, fearEntryDuration);
            window.removeEventListener("scroll", fearAnimate);
          }
        }
      }

      function fearTextAnimate() {
        if (unLockedDocumentWidth <= 1000) {
          currentFearTextTop = fearText.getBoundingClientRect().top;
          currentFearTextBottom = fearText.getBoundingClientRect().bottom;

          if (
            (currentFearTextTop <=
              window.innerHeight - fearText.getBoundingClientRect().height &&
              currentFearTextBottom >
                window.innerHeight - fearText.getBoundingClientRect().height &&
              scrollDirection < 0) ||
            (currentFearTextBottom >=
              fearText.getBoundingClientRect().height + 100 &&
              currentFearTextTop <
                fearText.getBoundingClientRect().height + 100 &&
              scrollDirection > 0)
          ) {
            fearText.style.visibility = ``;
            fearText.style.animationName = ``;

            window.removeEventListener("scroll", fearTextAnimate);
          }
        }
      }

      let switchInterval = 2000;
      let switchFrameId;

      const switchFrameOptions = {
        timing(timeFraction) {
          // Linear
          return timeFraction;
        },
        draw(progress) {
          // Анимация Челика
          if (progress <= 0.35) {
            fearHero.style.opacity = `${1}`;
            fearHeroMirrored.style.opacity = `${0}`;
            firstMsgs.forEach((item) => {
              item.style.opacity = `${1}`;
            });
            secondMsgs.forEach((item) => {
              item.style.opacity = `${0}`;
            });
          }

          // Исчезаем
          if (progress < 0.425 && progress >= 0.35) {
            fearHero.style.opacity = `${1 - (progress - 0.35) / 0.075}`;
            firstMsgs.forEach((item) => {
              item.style.opacity = `${1 - (progress - 0.35) / 0.075}`;
            });
          }
          // Появляемя
          if (progress < 0.5 && progress >= 0.425) {
            fearHeroMirrored.style.opacity = `${(progress - 0.425) / 0.075}`;
            secondMsgs.forEach((item) => {
              item.style.opacity = `${(progress - 0.425) / 0.075}`;
            });
          }
          if (progress > 0.5 && progress <= 0.85) {
            fearHero.style.opacity = `${0}`;
            fearHeroMirrored.style.opacity = `${1}`;
            firstMsgs.forEach((item) => {
              item.style.opacity = `${0}`;
            });
            secondMsgs.forEach((item) => {
              item.style.opacity = `${1}`;
            });
          }

          // Исчезаем
          if (progress > 0.85 && progress <= .925) {
            fearHeroMirrored.style.opacity = `${1 - (progress - 0.85) / .075}`;
            secondMsgs.forEach((item) => {
              item.style.opacity = `${1 - (progress - 0.85) / .075}`;
            });
          }
          // Появляемся
          if (progress > 0.925 && progress <= 1) {
            fearHero.style.opacity = `${(progress - 0.925) / .075}`;
            firstMsgs.forEach((item) => {
              item.style.opacity = `${(progress - 0.925) / .075}`;
            });

          }

          // Страшилищя
          if (progress <= 0.35) {
            fearFears.style.transform = `scale(${1})`;
          }
          if (progress > 0.35 && progress <= .5) {
            fearFears.style.transform = `scale(${1 + ((progress - .35) * 0.08) / 0.15})`;
          }
          if (progress > 0.5 && progress <= .85) {
            fearFears.style.transform = `scale(${1.08})`;
          }
          if (progress > 0.85 && progress <= 1) {
            fearFears.style.transform = `scale(${
              1 + (0.08 - ((progress - 0.85) * 0.08) / 0.15)
            })`;
          }
        },
        duration: 10000,
      };

      function switchFrame({ timing, draw, duration }) {
        let start = performance.now();
        requestAnimationFrame(function switchFrame(time) {
          if (start > time) {
            start = time;
          }
          let timeFraction = (time - start) / duration;
          // Использую для зацикливания анимаций
          if (timeFraction > 1) start = time;
          // Прогресс
          let progress = timing(timeFraction);

          // Отрисовка
          draw(progress);
          switchFrameId = requestAnimationFrame(switchFrame);
        });
      }
    }, 0);
  } else {
    console.log(
      `HTML-элемент с классом "${elemClass}" не найден. Пожалуйста убедитель в правильности написания класса элемента.`
    );
  }
}

// Ссылка на временные функции js.
// https://easings.net/ru
