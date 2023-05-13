window.addEventListener("load", function () {
  funnelBlockAnimate("js-funnel");
});

function funnelBlockAnimate(elemClass) {
  const block = document.querySelector(`.${elemClass}`);

  if (block) {
    this.setTimeout(() => {
      // ТЕКУЩИЕ КООРДИНАТЫ ЭЛЕМЕНТОВ
      let currentBlockTop = block.getBoundingClientRect().top;
      let currentBlockBottom = block.getBoundingClientRect().bottom;

      let funnelAnimStartPoint =
        document.documentElement.clientHeight - block.clientHeight;
      let funnelAnimStopPoint = block.clientHeight + 100;

      const funnelAnimItems = block.querySelectorAll(".funnel-anim");
      const funnelTextBLock = block.querySelector(".js-funnel-text-block");
      const funnelTextBLockSubtitle =
        funnelTextBLock.querySelector(".funnel-subtitle");
      const funnelCards = funnelTextBLock.querySelectorAll(
        ".block13__info-flex-text"
      );
      const funnelCardsText = funnelTextBLock.querySelectorAll(
        ".block13__info-flex-text > p"
      );
      let funnelCardsSizes = [];
      const funnelTextBLockItemMaxSize = 100;

      // Запись начальных размеров текстовых карточек
      funnelCards.forEach((item) => {
        funnelCardsSizes.push({
          offsetWidth: item.offsetWidth,
          offsetHeight: item.offsetHeight,
        });
        item.style.maxWidth = `${funnelTextBLockItemMaxSize}px`;
        item.style.maxHeight = `${funnelTextBLockItemMaxSize}px`;
      });

      const funnelEntryDuration = 1000;
      let animateTextCardsDuration;
      if (unLockedDocumentWidth > 1000) {
        animateTextCardsDuration = 1000;
      }
      funnelAnimItems.forEach((item) => {
        item.style.visibility = `hidden`;
        item.style.animationName = `none`;
      });

      // ФУНКЦИЯ АНИМАЦИИ ТЕКСТОВЫХ КАРТОЧЕК
      let animateTextCardsId;
      const textCardOptions = {
        timing(timeFraction) {
          // Linear
          // return timeFraction;
          //EeaseInExpo
          // return timeFraction === 1 ? 1 : 1 - Math.pow(2, -10 * timeFraction);
          return Math.sin((timeFraction * Math.PI) / 2);
        },
        draw(progress) {
          funnelCards.forEach((item, index) => {
            item.style.maxWidth = `${
              funnelTextBLockItemMaxSize +
              progress *
                (funnelCardsSizes[index].offsetWidth -
                  funnelTextBLockItemMaxSize)
            }px`;
            item.style.maxHeight = `${
              funnelTextBLockItemMaxSize +
              progress *
                (funnelCardsSizes[index].offsetHeight -
                  funnelTextBLockItemMaxSize)
            }px`;
            item.style.transform = `rotate(${45 - 45 * progress}deg)`;
          });
          funnelCardsText.forEach((item) => {
            item.style.transform = `scale(${progress}) rotate(${
              -45 + 45 * progress
            }deg)`;
            item.style.opacity = `${1 * progress}`;
          });
        },
        duration: animateTextCardsDuration,
      };
      function animateTextCards({ timing, draw, duration }) {
        let start = performance.now();
        requestAnimationFrame(function animateTextCards(time) {
          if (start > time) {
            start = time;
          }
          let timeFraction = (time - start) / duration;
          if (timeFraction > 1) timeFraction = 1;
          // Прогресс
          let progress = timing(timeFraction);

          // EaseOut
          // let progress = 1 - timing(1 - timeFraction)

          // EaseInOut
          // let progress
          // if (timeFraction <= 0.5) { // первая половина анимации
          //   progress = timing(2 * timeFraction) / 2;
          // } else { // вторая половина анимации
          //   progress = (2 - timing(2 * (1 - timeFraction))) / 2;
          // }
          // Отрисовка
          draw(progress);
          if (timeFraction >= 1) {
            cancelAnimationFrame(animateTextCardsId);
          } else {
            animateTextCardsId = requestAnimationFrame(animateTextCards);
          }
        });
      }

      function fillText(elem) {
        elem.classList.add("text-blue");
        elem.style.transition = `opacity ${animateTextCardsDuration}ms`;
      }

      // ЭЛЕМЕНТЫ ВОРОНКИ
      const funnelMedia = block.querySelector(".funnel-media");
      const funnelCoin = funnelMedia.querySelector(".funnel-coin");
      const funnelGear = funnelMedia.querySelector(".funnel-gear");
      const funnelGearsm = funnelMedia.querySelector(".funnel-gear-sm");
      const funnelUser = funnelMedia.querySelector(".funnel-user");
      const funnelUserSm = funnelMedia.querySelector(".funnel-user-sm");
      const funnelMessage = funnelMedia.querySelector(".funnel-message");
      // ФУНКЦИЯ АНИМАЦИИ ВОРОНКИ

      let animateFunnelMediaId;
      const funnelMediaOptions = {
        timing(timeFraction) {
          // Linear
          return timeFraction;
        },
        draw(progress) {
          // Анимация монетки
          if (progress < 0.34) {
            funnelCoin.style.transform = `translateY(${progress * 1400}%)`;
          }
          if (progress >= 0.34 && progress < 0.67) {
            funnelCoin.style.transform = `translate(${
              (progress - 0.34) * 800
            }%, ${
              -Math.sin((((180 * (progress - 0.34)) / 0.34) * Math.PI) / 180) *
                100 +
              0.34 * 1400
            }%)`;
          }
          if (progress >= 0.67 && progress <= 1) {
            funnelCoin.style.transform = `translate(${
              (progress - 0.34) * 800
            }%, ${
              -Math.sin((((180 * (progress - 0.67)) / 0.33) * Math.PI) / 180) *
                100 +
              0.34 * 1400
            }%)`;
          }
          // Анимация иконок
          if (progress <= 0.5) {
            funnelGearsm.style.transform = `translate(${80 * progress}%, ${
              240 * progress
            }%)`;
            funnelMessage.style.transform = `translate(${-200 * progress}%, ${
              180 * progress
            }%)`;
            funnelGear.style.transform = `translate(${200 * progress}%, ${
              220 * progress
            }%)`;
            funnelUserSm.style.transform = `translate(${-300 * progress}%, ${
              700 * progress
            }%)`;
            funnelUser.style.transform = `translate(${60 * progress}%, ${
              440 * progress
            }%)`;
          }
          if (progress > 0.6 && progress <= 1) {
            funnelGearsm.style.transform = ``;
          }
          if (progress > 0.63 && progress <= 1) {
            funnelMessage.style.transform = ``;
          }
          if (progress > 0.66 && progress <= 1) {
            funnelGear.style.transform = ``;
          }
          if (progress > 0.69 && progress <= 1) {
            funnelUserSm.style.transform = ``;
          }
          if (progress > 0.72 && progress <= 1) {
            funnelUser.style.transform = ``;
          }
        },
        duration: 2000,
      };

      function animateFunnelMedia({ timing, draw, duration }) {
        let start = performance.now();
        requestAnimationFrame(function animateFunnelMedia(time) {
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
          animateFunnelMediaId = requestAnimationFrame(animateFunnelMedia);
        });
      }

      window.addEventListener("scroll", funnelAnimate);

      // FUNCTIONS
      function funnelAnimate() {
        currentBlockTop = block.getBoundingClientRect().top;
        currentBlockBottom = block.getBoundingClientRect().bottom;

        // ПОКАЗАТЬ ТЕКСТОВЫЕ КАРТОЧКИ
        function showTextItems() {
          setTimeout(function () {
            funnelTextBLock.classList.remove("text-items-rotate");
            animateTextCards(textCardOptions);
            fillText(funnelTextBLockSubtitle);
          }, funnelEntryDuration);
        }

        // АНИМАЦИЯ ВОРОНКИ
        function startFunnelMedia() {
          setTimeout(function () {
            animateFunnelMedia(funnelMediaOptions);
          }, funnelEntryDuration + animateTextCardsDuration);
        }

        if (unLockedDocumentWidth > 1000) {
          if (
            (currentBlockTop <= funnelAnimStartPoint &&
              currentBlockBottom > funnelAnimStartPoint &&
              scrollDirection < 0) ||
            (currentBlockBottom >= funnelAnimStopPoint &&
              currentBlockTop < funnelAnimStopPoint &&
              scrollDirection > 0)
          ) {
            funnelTextBLock.classList.add("text-items-rotate");
            funnelAnimItems.forEach((item) => {
              item.style.visibility = ``;
              item.style.animationName = ``;
            });
            showTextItems();
            startFunnelMedia();

            window.removeEventListener("scroll", funnelAnimate);
          }
        }

        // if (unLockedDocumentWidth <= 1000) {
        //   prodAnimItems.forEach((item) => {
        //     if (
        //       (item.getBoundingClientRect().top <=
        //         document.documentElement.clientHeight - item.clientHeight &&
        //         item.getBoundingClientRect().bottom >
        //           document.documentElement.clientHeight - item.clientHeight &&
        //         scrollDirection < 0) ||
        //       (item.getBoundingClientRect().bottom >= item.clientHeight + 100 &&
        //         item.getBoundingClientRect().top < item.clientHeight + 100 &&
        //         scrollDirection > 0)
        //     ) {
        //       item.style.visibility = ``;
        //       item.style.animationName = ``;

        //       if (item.querySelectorAll(".prod-anim-text").length) {
        //         prodFillText();
        //       }

        //       if (item.querySelector(".prod__scene")) {
        //         showStars();
        //         moveStars();
        //       }
        //     }
        //   });
        // }
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
