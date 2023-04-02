window.addEventListener("load", function () {
  // Получение блока анимации
  const warrantyBlock = document.querySelector(".js-warranty");
  const warrantyPen = warrantyBlock.querySelector(".warranty-pen");
  

  // Точка появления ручки (отступ по оси Y от верхней грницы окна)
  const WARRANTY_PEN_APPEAR = 400;
  // Первоначально определить координату ручки по оси X в position: absolute
  const INITIAL_WARRANTY_PEN_LEFT = warrantyPen.getBoundingClientRect().left;
  // Затем приклеить ее, добавив класс, содержащий position: fixed
  warrantyPen.classList.add("sticky");
  // Задать отступы для фиксированного положения ручки
  warrantyPen.style.top = `${WARRANTY_PEN_APPEAR}px`;
  warrantyPen.style.left = `${INITIAL_WARRANTY_PEN_LEFT}px`;


  // Начальные координаты блока анимации
  const INITIAL_WARRANTY_BLOCK_COORDS = warrantyBlock.getBoundingClientRect();
  // Начальный отступ блока анимации по оси Y от внерхней границы окна
  const INITIAL_WARRANTY_BLOCK_TOP = INITIAL_WARRANTY_BLOCK_COORDS.top;


  
  
  let currentWarrantyBlockTop


  

  console.log(warrantyBlock);
  console.log(warrantyPen);

 


  // const WARRANTY_ANIMATION_START_POINT = 400;
  // // Диапазон работы анимации при скролле
  // const WARRANTY_ANIMATION_RANGE_VALUE = 200;
  // const WARRANTY_ANIMATION_STOP_POINT =
  //   WARRANTY_ANIMATION_START_POINT - WARRANTY_ANIMATION_RANGE_VALUE;

  // console.log("WARRANTY_ANIMATION_STOP_POINT: ", WARRANTY_ANIMATION_STOP_POINT);



  
  
  // const WARRANTY_PEN_ENTRY = WARRANTY_ANIMATION_START_POINT + 200;
  // const INITIAL_WARRANTY_PEN_TOP = warrantyPen.getBoundingClientRect().top;
  // const INITIAL_WARRANTY_PEN_LEFT = warrantyPen.getBoundingClientRect().left;
  // const WARRANTY_TOP_FIXED = 400;

  // let penIsAppeared = false;
  // let penIsDown = true;

  // console.log("INITIAL_WARRANTY_BLOCK_TOP: ", INITIAL_WARRANTY_BLOCK_TOP);
  // console.log("WARRANTY_PEN_ENTRY: ", WARRANTY_PEN_ENTRY);

  // warrantyPen.classList.add("unvisible");
  // warrantyPen.classList.add("fixed");

  

  function showWarrantyPen() {
    if(WARRANTY_PEN_APPEAR >= currentWarrantyBlockTop) {
      console.log('WARRANTY_PEN_APPEAR: ', WARRANTY_PEN_APPEAR);
      window.removeEventListener('scroll', showWarrantyPen)
    }
  }

  window.addEventListener('scroll', showWarrantyPen)

  window.addEventListener("scroll", function () {
    currentWarrantyBlockTop = warrantyBlock.getBoundingClientRect().top;



    // ПОЯВЛЕНИЕ РУЧКИ











  //   if (currentWarrantyBlockTop <= WARRANTY_PEN_ENTRY) {
  //     warrantyPen.classList.remove("unvisible");

  //     if (
  //       currentWarrantyBlockTop +
  //         (INITIAL_WARRANTY_PEN_TOP - INITIAL_WARRANTY_BLOCK_TOP) <=
  //         WARRANTY_TOP_FIXED &&
  //       currentWarrantyBlockTop +
  //         (INITIAL_WARRANTY_PEN_TOP - INITIAL_WARRANTY_BLOCK_TOP) >
  //         WARRANTY_ANIMATION_STOP_POINT
  //     ) {
  //       warrantyPen.classList.remove("fixed");
  //       warrantyPen.style.top = ``;
  //       warrantyPen.style.left = ``;
  //       penIsAppeared = true;

  //       setTimeout(warrantyPenUp, 100);
  //     }


  //     if (
  //       currentWarrantyBlockTop +
  //         (INITIAL_WARRANTY_PEN_TOP - INITIAL_WARRANTY_BLOCK_TOP) >
  //         WARRANTY_TOP_FIXED ||
  //       currentWarrantyBlockTop +
  //         (INITIAL_WARRANTY_PEN_TOP - INITIAL_WARRANTY_BLOCK_TOP) <=
  //         WARRANTY_ANIMATION_STOP_POINT
  //     ) {
  //       if (!penIsDown) {
  //         warrantyPenDown();
  //       }
  //     }


  //   }

  //   function warrantyPenUp() {
  //     warrantyPen.style.transform = `rotate(17deg)`;
  //     warrantyPen.style.left = `115px`;
  //     warrantyPen.style.top = `150px`;
  //     warrantyPen.style.transition = `1000ms`;
  //     penIsDown = false;
  //     // warrantyPen.classList.add('up')
  //   }
  //   function warrantyPenDown() {
  //     if(penIsAppeared) {
  //       warrantyPen.style.transform = `rotate(0deg)`;
  //       warrantyPen.style.top = `211px`;
  //       warrantyPen.style.left = `85px`;
  //       penIsDown = true;
  //     }
  //   }
  });
});
