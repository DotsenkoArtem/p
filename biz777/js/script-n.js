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
// const clockLamp = document.querySelector('.block1-clock-lamp')
// movingBlockItems.push(clockLamp)
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

const clockLamp = document.querySelector('.block1-clock-lamp')
animationBlockItems.push(clockLamp)




// Начальные координаты блока анимации
const INITIAL_ANIMATION_BLOCK_COORDS = animationBlock.getBoundingClientRect()
// Начальный отступ блока анимации по оси Y от внерхней границы окна
const INITIAL_ANIMATION_BLOCK_TOP = INITIAL_ANIMATION_BLOCK_COORDS.top
// Точка по оси Y, по достижению которой при скролле страницы все анимации блока останавливаются
const ANIMATION_SCROLL_STOP_POINT = 0
// Значение по достижению которого при скролле страницы все анимации блока начинаются (отступ блока от верхнего края окна)
const ANIMATION_SCROLL_START_POINT = 200
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
  }, 2650)



  // Текущее значение отступа блока анимации по оси Y от внерхней границы окна
  let currentAnimationBlockTop
  // Флаг определяет состояния проигрывания анимации (приигрывается / на паузе)
  let isRunnig = true

  window.addEventListener('scroll', function() {
    currentAnimationBlockTop = animationBlock.getBoundingClientRect().top
    // console.log('currentAnimationBlockTop: ', currentAnimationBlockTop);
    rocket.style.transition = '0.1s'
    if(currentAnimationBlockTop < ANIMATION_SCROLL_START_POINT) {

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

        rocket.style.visibility = `visible`
        rocket.style.opacity = `1`
        clockLamp.style.visibility = `visible`
        clockLamp.style.opacity = `1`
        
        animationBlock.classList.remove('smooth-entry')
        animationBlock.classList.remove('animated')
      }

      isRunnig = false
      console.log('isRunnig = false');
    }
    


  } else {
    animationBlock.classList.add('animated')
    movingBlockItems.forEach(item => item.style.animationPlayState = '')



    isRunnig = true
  }




    


    if(currentAnimationBlockTop >= ANIMATION_SCROLL_STOP_POINT && currentAnimationBlockTop < ANIMATION_SCROLL_START_POINT) {
      let scrollProgress = (ANIMATION_SCROLL_START_POINT - currentAnimationBlockTop)/(ANIMATION_SCROLL_START_POINT - ANIMATION_SCROLL_STOP_POINT)

      rocket.style.transform = `rotate(${ROCKET_SCROLL_MAX_ROTATE_VALUE * scrollProgress}deg)`
      

      






      // Метод для кждого блока
      
      movingBlockItems.forEach(function(item) {
        item.classList.add('transform-on-scroll')
        // item.style.transform = `scale(${1 - 0.5 * scrollProgress})`
      })

      function hideDetails(...elem) {
        elem.forEach(function(item) {
          item.style.transform = `scale(${1 - 0.5 * scrollProgress})`
        })
      }


      function translateСlouds(...elem) {
        elem.forEach(function(item) {
          item.style.transform = `translateY(${50 * scrollProgress}px)`
        })
      }
      hideDetails(gear, sheetGlobe, clockLamp, segment)
      translateСlouds(skyLg, skyMdTop, skyMd, skySm)

      // gear.style.transform = `scale(${1 - 0.5 * scrollProgress})`



      
    }
  })
  





})