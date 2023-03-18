
const animationBlock = document.querySelector('.block1__right')
let movingBlockItems = []

const rocket = document.querySelector('.block1-roket')

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

let animationBlockItems = []
for(let item of movingBlockItems) {
  animationBlockItems.push(item)
}

animationBlockItems.push(rocket)





const INITIAL_ANIMATION_BLOCK_COORDS = animationBlock.getBoundingClientRect()
const INITIAL_ANIMATION_BLOCK_TOP = INITIAL_ANIMATION_BLOCK_COORDS.top


const ANIMATION_STOP_POINT = 0


// Переменные блоков при прокрутке
rocketScrollAnimationValue = 60
// rocketScrollAnimatiotnStep = 




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


  // Появление блока с анимациями
  animationBlock.classList.add('smooth-entry')

  setTimeout(function() {
    animationBlock.classList.add('animated')
  }, 2650)




  let animationBlockCoordsTop

  let isRunnig = true
  window.addEventListener('scroll', function() {
    // Отмена анимаций блоков
    if(window.pageYOffset > 0) {

    // animationBlockItems.forEach(item => item.style.animationPlayState = 'paused') :
    // animationBlockItems.forEach(item => item.style.animationPlayState = '')
    if(isRunnig) {
      // animationBlockItems.forEach(item => item.style.animationPlayState = 'paused')

      freezeElem(movingBlockItems)
      function freezeElem(elemsArr) {
        elemsArr.forEach(function(elem) {
          let computedStyles = getComputedStyle(elem)
          elem.style.left = `${computedStyles.left}`
          elem.style.top = `${computedStyles.top}`
          elem.style.visibility = `visible`
          elem.style.opacity = `1`
  
  

          // elem => elem.style.animationPlayState = ''
        })

        rocket.style.visibility = `visible`
        rocket.style.opacity = `1`
        
        animationBlock.classList.remove('smooth-entry')
        animationBlock.classList.remove('animated')
      }

      isRunnig = false
      console.log('isRunnig = false');
    }
    


  } else {
    animationBlock.classList.add('animated')



    isRunnig = true
  }




    
    animationBlockCoordsTop = animationBlock.getBoundingClientRect().top
    rocket.style.transition = '0.1s'

    if(animationBlockCoordsTop >= ANIMATION_STOP_POINT) {
      let scrollProgress = (INITIAL_ANIMATION_BLOCK_TOP - animationBlockCoordsTop)/(INITIAL_ANIMATION_BLOCK_TOP - ANIMATION_STOP_POINT)

      rocket.style.transform = `rotate(${rocketScrollAnimationValue * scrollProgress}deg)`
      

      






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
          item.style.transform = `translateY(${75 * scrollProgress}px)`
        })
      }
      hideDetails(gear, sheetGlobe, clockLamp, segment)
      translateСlouds(skyLg, skyMdTop, skyMd, skySm)

      // gear.style.transform = `scale(${1 - 0.5 * scrollProgress})`



      
    }
  })
  





})