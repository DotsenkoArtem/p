window.addEventListener("load", function () {
  expBlockAnimate("js-exp");
});

function expBlockAnimate(elemClass) {
  const block = document.querySelector(`.${elemClass}`);

  if (block) {
    this.setTimeout(() => {
      const expAnimStartPoint = window.innerHeight * 0.8;
      const expAnimStopPoint = window.innerHeight * 0.2;
      // ТЕКУЩИЕ КООРДИНАТЫ ЭЛЕМЕНТОВ
      // БЛОК
      // Текущий отступ блока по оси Y от верхней границы окна
      let currentBlockTop = block.getBoundingClientRect().top;
      let currentBlockBottom = block.getBoundingClientRect().bottom;


      const expBoxIconItem = block.querySelector(".block3__box-icon");
      const expBoxIconItems = expBoxIconItem.querySelectorAll(".exp-anim");

      let expTextAnimItems = Array.from(expBoxIconItems)
      expTextAnimItems.push(block.querySelector(".selection-text"), block.querySelector(".selection-title"))

    







      const expScene = block.querySelector(".exp-scene");
      const expSceneItems = expScene.querySelectorAll(".exp-anim");

      const expAnimItems = block.querySelectorAll(".exp-anim");
      const expIcons = block.querySelectorAll(".exp-icon");
      const expHarts = block.querySelectorAll(".exp-hart");
      expAnimItems.forEach((item) => {
        item.style.visibility = `hidden`;
        item.style.animationName = `none`;
      });

      let scrollDirection = 0;
      let startY = window.pageYOffset;
      let currentY = 0;

      function getScrollDirection() {
        currentY = window.pageYOffset;
        scrollDirection = startY - currentY;
        startY = currentY;
      }

      window.addEventListener("scroll", expAnimate);

      // FUNCTIONS
      function expAnimate() {
        currentBlockTop = block.getBoundingClientRect().top;
        currentBlockBottom = block.getBoundingClientRect().bottom;
        getScrollDirection();

        if (unLockedDocumentWidth > 1000) {
          if (
            (currentBlockTop <= expAnimStartPoint && scrollDirection < 0) ||
            (currentBlockBottom >= expAnimStopPoint && scrollDirection > 0)
          ) {
            expAnimItems.forEach((item) => {
              item.style.visibility = ``;
              item.style.animationName = ``;
            });

            animExpIcons();
            animHarts();

            function animExpIcons() {
              setTimeout(function () {
                expIcons.forEach((item, index) => {
                  item.style.animationDelay = `${
                    Math.abs(index - expIcons.length) * 100
                  }ms`;
                  item.classList.add("fill_SkyBlue");
                });
              }, 1000);
            }

            function animHarts() {
              setTimeout(function () {
                expHarts.forEach((item) => item.classList.add("move-hart"));
              }, 1000);
            }
            window.removeEventListener("scroll", expAnimate);
          }
        }

        if (unLockedDocumentWidth <= 1000) {
          let currAnimItems = 0;
          

          expTextAnimItems.forEach((item) => {
            if (
              (item.getBoundingClientRect().top <= expAnimStartPoint &&
                scrollDirection < 0) ||
              (item.getBoundingClientRect().bottom >= expAnimStopPoint &&
                scrollDirection > 0)
            ) {
              item.style.visibility = ``;
              item.style.animationName = ``;

              currAnimItems++;

              // if (item.classList.contains("exp-hart")) {
              //   setTimeout(() => {
              //     item.classList.add("move-hart");
              //   }, 1000);
              // }

              if (item.classList.contains("block3__container-icon")) {
                setTimeout(() => {
                  item.querySelector(".exp-icon").classList.add("fill_SkyBlue");
                }, 1000);
              }
            }
          });
          

          expSceneItems.forEach((item) => {
            if (
              (expScene.getBoundingClientRect().top <= expAnimStartPoint &&
                scrollDirection < 0) ||
              (expScene.getBoundingClientRect().bottom >= expAnimStopPoint &&
                scrollDirection > 0)
            ) {
              item.style.visibility = ``;
              item.style.animationName = ``;

              

              if (item.classList.contains("exp-hart")) {
                setTimeout(() => {
                  item.classList.add("move-hart");
                }, 1000);
              }
            }
          });
          currAnimItems++;

          if (currAnimItems == expAnimItems.length + 1) {
            window.removeEventListener("scroll", expAnimate);
          }
        }
      }
    }, 0);
  } else {
    console.log(
      `HTML-элемент с классом "${elemClass}" не найден. Пожалуйста убедитель в правильности написания класса элемента.`
    );
  }
}
