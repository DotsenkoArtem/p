// Получение блока анимации
const animationBlock = document.querySelector('.block1__right')
// Массив динамических (которые двигаются после появления блока) элементов блока анимации 
let movingBlockItems = []
// Получение динамических элементов блока анимации и запись в соответствующий массив
const skyLg = document.querySelector('.block1-sky-lg')
movingBlockItems.push(skyLg)
const gear = document.querySelector('.block1-gear')
movingBlockItems.push(gear)
const sheetGlobe = document.querySelector('.block1-sheet-globe')
movingBlockItems.push(sheetGlobe)
const clockLamp = document.querySelector('.block1-clock-lamp')
movingBlockItems.push(clockLamp)
const segment = document.querySelector('.block1-segment')
movingBlockItems.push(segment)
const skyMdTop = document.querySelector('.block1-sky-md-top')
movingBlockItems.push(skyMdTop)
const skyMd = document.querySelector('.block1-sky-md')
movingBlockItems.push(skyMd)
const skySm = document.querySelector('.block1-sky-sm')
movingBlockItems.push(skySm)

// Массив, содержащий все элементы блока независимо от их поведения после появления блока
let animationBlockItems = []
// Наполнение массива [animationBlockItems] элементами
for(let item of movingBlockItems) {
  animationBlockItems.push(item)
}
// Добавление статичного элемента 'ракета'
const rocket = document.querySelector('.block1-roket')
animationBlockItems.push(rocket)




// Начальные координаты блока анимации
const INITIAL_ANIMATION_BLOCK_COORDS = animationBlock.getBoundingClientRect()
// Начальный отступ блока анимации по оси Y от внерхней границы окна
const INITIAL_ANIMATION_BLOCK_TOP = INITIAL_ANIMATION_BLOCK_COORDS.top
// Точка по оси Y, по достижению которой при скролле страницы все анимации блока останавливаются
const ANIMATION_SCROLL_STOP_POINT = 0
// Максимальная величина поворота ракеты при скролле, в градусах
const ROCKET_SCROLL_MAX_ROTATE_VALUE = 60




// Получение текущей прокрутки окна и выравнивание его
// const CURRENT_PAGE_Y_OFFSET =  window.pageYOffset
// if(CURRENT_PAGE_Y_OFFSET > 0 && CURRENT_PAGE_Y_OFFSET <= INITIAL_ANIMATION_BLOCK_TOP){
//   console.log('CURRENT_PAGE_Y_OFFSET в пределах анимации: ', CURRENT_PAGE_Y_OFFSET);
//   animationBlock.style.transition = '.1s'
//   animationBlock.classList.remove('before-animation')
// }
// if(CURRENT_PAGE_Y_OFFSET > INITIAL_ANIMATION_BLOCK_TOP){
//   console.log('CURRENT_PAGE_Y_OFFSET за пределами анимации: ', CURRENT_PAGE_Y_OFFSET);
//   animationBlock.style.transition = '.1s'
//   animationBlock.classList.remove('before-animation')
// }



// window.addEventListener('DOMContentLoaded', function() {
window.addEventListener('load', function() {


  // Появление блока с анимациями после загрузки
  animationBlock.classList.add('smooth-entry')
  // Добавление класса с анимациями после появления блока
  setTimeout(function() {
    animationBlock.classList.add('animated')



/*     setTimeout(function() {
      // console.log('skyLg: ', skyLg.getAnimations())
      console.log('skyLg: ', skyLg.getAnimations())
    }, 500) */




  }, 2650)



  // Текущее значение отступа блока анимации по оси Y от внерхней границы окна
  let currentAnimationBlockTop
  // Флаг определяет состояния проигрывания анимации (приигрывается / на паузе)
  let isRunnig = true

  window.addEventListener('scroll', function() {
    console.log('window.pageYOffset: ', window.pageYOffset);
    if(window.pageYOffset > 100) {

    // animationBlockItems.forEach(item => item.style.animationPlayState = 'paused') :
    // animationBlockItems.forEach(item => item.style.animationPlayState = '')
    if(isRunnig) {
      movingBlockItems.forEach(item => item.style.animationPlayState = 'paused')

      freezeElem(movingBlockItems)


      





      function freezeElem(elemsArr) {
        elemsArr.forEach(function(elem) {
          let animationBlockCoords = animationBlock.getBoundingClientRect()
          let elemCoords = elem.getBoundingClientRect()
          elem.style.left = `${elemCoords.left - animationBlockCoords.left}px`
          elem.style.top = `${elemCoords.top - animationBlockCoords.top}px`
          elem.style.visibility = `visible`
          elem.style.opacity = `1`
          // elem => elem.style.animationPlayState = ''
        })

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
    } else {
      // movingBlockItems.forEach((item) => {
      //   item.style.animationPlayState = ''
      // })
      animationBlock.classList.add("animated");
      isRunnig = true;
    }
    


  } else {
    animationBlock.classList.add('animated')
    movingBlockItems.forEach(item => item.style.animationPlayState = '')



    isRunnig = true
  }




    
    currentAnimationBlockTop = animationBlock.getBoundingClientRect().top
    rocket.style.transition = '0.1s'

    if(currentAnimationBlockTop >= ANIMATION_SCROLL_STOP_POINT) {
      let scrollProgress = (INITIAL_ANIMATION_BLOCK_TOP - currentAnimationBlockTop)/(INITIAL_ANIMATION_BLOCK_TOP - ANIMATION_SCROLL_STOP_POINT)

      rocket.style.transform = `rotate(${ROCKET_SCROLL_MAX_ROTATE_VALUE * scrollProgress}deg)`
      

      






      // Метод для кждого блока
      
      movingBlockItems.forEach(function(item) {
        item.classList.add('transform-on-scroll')
        // item.style.transform = `scale(${1 - 0.5 * scrollProgress})`
      })

      function hideDetails(...elem) {
        elem.forEach(function (item) {
          item.style.transform = `scale(${1 - 0.5 * scrollProgress})`;
        });
      }
      // Опускаем облака
      function translateСlouds(...elem) {
        elem.forEach(function (item) {
          item.style.transform = `translateY(${75 * scrollProgress}px)`;
        });
      }
    }

    // Дополнительно обеспечивает адекватное положение при резком скролле
    if(window.pageYOffset <= ANIMATION_STOP_POINT) {
      rocket.style.transform = `rotate(0deg)`;
      animationBlockItems.forEach(item => item.style.transform = ``)
    }
    if(window.pageYOffset >= INITIAL_ANIMATION_BLOCK_TOP) {
      rocket.style.transform = `rotate(${ROCKET_SCROLL_MAX_ROTATE_VALUE}deg)`;
      // animationBlockItems.forEach(item => item.style.transform = ``)
    }
  });






});
