window.addEventListener("load", function () {
  prodBlockAnimate("js-prod");
});

function prodBlockAnimate(elemClass) {
  const block = document.querySelector(`.${elemClass}`);

  if (block) {
    this.setTimeout(() => {
      // ТЕКУЩИЕ КООРДИНАТЫ ЭЛЕМЕНТОВ
      let currentBlockTop = block.getBoundingClientRect().top;
      let currentBlockBottom = block.getBoundingClientRect().bottom;

      let prodAnimStartPoint =
        document.documentElement.clientHeight - block.clientHeight;
      let prodAnimStopPoint = block.clientHeight + 100;

      const prodAnimItems = block.querySelectorAll(".prod-anim");
      const prodAnimText = block.querySelectorAll(".prod-anim-text");
      const prodCheck = block.querySelector(".prod-check");
      const prodStars = block.querySelectorAll(".js-prod-star");
      const prodEntryDuration = 1000;
      prodAnimItems.forEach((item) => {
        item.style.visibility = `hidden`;
        item.style.animationName = `none`;
      });

      window.addEventListener("scroll", prodAnimate);

      // FUNCTIONS
      function prodAnimate() {
        currentBlockTop = block.getBoundingClientRect().top;
        currentBlockBottom = block.getBoundingClientRect().bottom;

        function prodFillText() {
          setTimeout(function () {
            prodAnimText.forEach((item) => {
              item.classList.add("text_blue");
            });
          }, prodEntryDuration);
        }

        function showStars() {
          setTimeout(() => {
            prodCheck.classList.remove("check-hidden");
            prodStars.forEach((star) => {
              star.classList.remove("star-hidden");
            });
          }, prodEntryDuration);
        }

        function moveStars() {
          setTimeout(() => {
            prodStars.forEach((star) => {
              star.classList.add("star-moving");
            });
          }, prodEntryDuration + 1500);
        }

        if (unLockedDocumentWidth > 1000) {
          if (
            (currentBlockTop <= prodAnimStartPoint &&
              currentBlockBottom > prodAnimStartPoint &&
              scrollDirection < 0) ||
            (currentBlockBottom >= prodAnimStopPoint &&
              currentBlockTop < prodAnimStopPoint &&
              scrollDirection > 0)
          ) {
            prodAnimItems.forEach((item) => {
              item.style.visibility = ``;
              item.style.animationName = ``;
            });
            prodFillText();
            showStars();
            moveStars();

            window.removeEventListener("scroll", prodAnimate);
          }
        }

        if (unLockedDocumentWidth <= 1000) {
          prodAnimItems.forEach((item) => {
            if (
              (item.getBoundingClientRect().top <=
                document.documentElement.clientHeight - item.clientHeight &&
                item.getBoundingClientRect().bottom >
                  document.documentElement.clientHeight - item.clientHeight &&
                scrollDirection < 0) ||
              (item.getBoundingClientRect().bottom >= item.clientHeight + 100 &&
                item.getBoundingClientRect().top < item.clientHeight + 100 &&
                scrollDirection > 0)
            ) {
              item.style.visibility = ``;
              item.style.animationName = ``;

              if (item.querySelectorAll(".prod-anim-text").length) {
                prodFillText();
              }

              if (item.querySelector(".prod__scene")) {
                showStars();
                moveStars();
              }
            }
          });
        }
      }
    }, 0);
  } else {
    console.log(
      `HTML-элемент с классом "${elemClass}" не найден. Пожалуйста убедитель в правильности написания класса элемента.`
    );
  }
}
