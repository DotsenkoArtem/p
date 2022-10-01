// СЛАЙДЕРЫ
$(document).ready(function(){

   $('.main-gallery').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    fade: true,
    asNavFor: '.main-gallery__thumbs',
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    focusOnSelect: false,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          arrows: false
        }
      }
    ]
  });
  $('.main-gallery__thumbs').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.main-gallery',
    dots: false,
    nextArrow: '<button type="button" class="slick-next"></button>',
    focusOnSelect: true,
    

    speed: 500,
    autoplaySpeed: 5000,
    autoplay: true,
  });


  $('.day-gallery-d1').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
        }
      }
    ]
  });


  $('.day-gallery-d2').slick({
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
        }
      }
    ]
  });


  $('.browsed-tours__gallery').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: '<button type="button" class="slick-prev"></button>',
    nextArrow: '<button type="button" class="slick-next"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });


  $('.similar-tours__gallery').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          variableWidth: true,
          prevArrow: '<button type="button" class="slick-prev"></button>',
          nextArrow: '<button type="button" class="slick-next"></button>',
        }
      },
    ]
  });

});
// -----------------------------------------------------------------------------

// ОБРАБОТКА МОБИЛЬНОГО МЕНЮ
const menuToggle  	= document.querySelector('.menu-toggle'),
	    menuContainer = document.querySelector('.container.top-nav__container'), //контейнер с меню
	    cbBtn         = document.querySelector('.cb-btn'),                      //кнопка обратного звонка
      topMenuOverl  = document.querySelector('.top-menu-overl'),
      coords        = menuContainer.getBoundingClientRect(),                  //координаты контейнера
      windowHeight  = document.documentElement.clientHeight;                  //высота окна


     

      if(document.documentElement.clientWidth < 992) {
        menuToggle.addEventListener('click', function(){
          menuToggle.classList.toggle('open');
          document.body.classList.toggle('scroll-hidden');
          topMenuOverl.classList.toggle('show');
          if(!menuContainer.style.height || menuContainer.style.height == 0 + 'px'){
            menuContainer.style.height = (windowHeight - coords.top ) + 'px';
            menuContainer.style.overflow = 'scroll';
            cbBtn.classList.add('hidden');
          }else{
            menuContainer.style.height = 0 + 'px';
            menuContainer.style.overflow = '';
            cbBtn.classList.remove('hidden');
          }
        })

        console.log(document.documentElement.clientWidth);
      }

//------------------------------------------------------------------------------
if(document.documentElement.clientWidth < 992){
  // ЗАГЛУШКА НА ССЫЛКИ В МОБИЛЬНОМ МЕНЮ - ЗАКРЫВАЕТ МЕНЮ ПРИ НАЖАТИИ НА ССЫЛКИ
  // при подключении к остальным страницам - удаляй

  let topMenuItems = document.querySelectorAll('.top-menu a');
  for (let i = 0; i < topMenuItems.length; i++){
    topMenuItems[i].addEventListener('click', function(){
          menuContainer.style.height = 0 + 'px';
          menuContainer.style.overflow = '';
          cbBtn.classList.remove('hidden');
          menuToggle.classList.remove('open');
          document.body.classList.remove('scroll-hidden');
          topMenuOverl.classList.remove('show');
    })
  }
}


//------------------------------------------------------------------------------



// СТАНЦИЯ М19 открытие-закрытие
const contents = document.querySelectorAll('.cont-resize');
for (let i=0; i<contents.length; i++){
  let content = contents[i],
      contOpen   = content.querySelector('.btn-resize.closed'),
      contClose  = content.querySelectorAll('.btn-resize.opened');

      contOpen.addEventListener('click', function(){
        content.style.maxHeight = content.scrollHeight + "px";
        content.classList.remove('closed');
      })
 
  for(let j = 0; j < contClose.length; j++){
    let contCloseItem = contClose[j];
    contCloseItem.addEventListener('click', function(){
      content.style.maxHeight = 385 + 'px';
      content.classList.add('closed');

    })
  }

}
//----------------------------------------------------------------------


// ВСПЛЫВАЮЩАЯ ПОДСКАЗКА
const tooltips = document.querySelectorAll('.hotel__day-tltp');

for(let i = 0; i < tooltips.length; i++) {
  let tooltipCoords = tooltips[i].getBoundingClientRect();          //координаты подсказки
  const windowWidth = document.documentElement.clientWidth;         //ширина окна
  let tooltipOffsetRight = windowWidth - tooltipCoords.right;       //отступ справа от подсказки до края окна

  if(tooltipOffsetRight < tooltipCoords.width && tooltipCoords.left > tooltipCoords.width) {
    tooltips[i].classList.add('align-left');
  }
}
//----------------------------------------------------------------------


// ВЫРАВНИВАНИЕ ВТОРОГО УРОВНЯ МОИЛЬНОГО МЕНЮ
// const tourBox             = document.querySelector('.tour-box'),      //блок меню 2 уровень
      // tourBoxCoords       = tourBox.getBoundingClientRect(),          //координаты блока меню 2 уровень
      // windowWidth1        = document.documentElement.clientWidth;     //ширина окна
  // let tourBoxOffsetRight  = windowWidth1 - tourBoxCoords.right;       //отступ от правого края блока до правой границы окна

// if(tourBoxOffsetRight <= 0) {
  // tourBox.style.transform = 'translateX(' + (tourBoxOffsetRight - (windowWidth1 - tourBoxCoords.width) / 2) + 'px)';
// }
//----------------------------------------------------------------------

 
// ОТКРЫТИЕ - ЗАКРЫТИЕ БЛОКОВ С ОТЗЫВАМИ -- IE
const reviewsItems = document.querySelectorAll('.reviews__item');
for(let i=0; i<reviewsItems.length; i++){
  let reviewsOpenBtn = reviewsItems[i].querySelector('.reviews__link-open');
  let reviewCloseBtn = reviewsItems[i].querySelector('.reviews__link-close');
  let content = reviewsItems[i].querySelector('.reviews__content');
  let reviewsItem = reviewsItems[i];
  let contCompStyle = getComputedStyle(content);
  let contCompMaxHeight = contCompStyle.maxHeight;

  reviewsOpenBtn.addEventListener('click', function(){
    content.style.maxHeight = content.scrollHeight + "px";
    reviewsItem.classList.add('open');
  })

  reviewCloseBtn.addEventListener('click', function(){
    content.style.maxHeight = 132 + "px";
    reviewsItem.classList.remove('open');
  })
}
//----------------------------------------------------------------------


// МОДАЛЬНОЕ ОКНО "ЗАКАЗАТЬ ЗВОНОК"
let openModalBtns = document.querySelectorAll('.cb-btn'),
    mOverlay = document.querySelector('.modal__overlay'),
    modal = document.querySelector('.modal'),
    mContent = document.querySelector('.modal__content'),
    closeModalBtn = document.querySelectorAll('.modal-close');

for(let i = 0; i < openModalBtns.length; i++){
  let openModalBtn;
  openModalBtn = openModalBtns[i];
    openModalBtn.addEventListener('click', function() {
      openModalById('#cb-modal');
  });
}

for(let i = 0; i < closeModalBtn.length; i++){
    closeModalBtn[i].addEventListener('click', function() {
      closeModal('#cb-modal');
  })
}

function openModalById(modalId) {
    let modal = document.querySelector(modalId);
    modal.classList.remove('m-closed');
    modal.classList.add('m-open');
}

function closeModal(modalSelector) {
    let modal = document.querySelector(modalSelector);
    modal.classList.remove('m-open');
    modal.classList.add('m-closed');
    let form = modal.querySelector('form');
    form.reset();
}
//----------------------------------------------------------------------


// TOUR-STERT MOB
const optionChecked   = document.querySelector('.option_checked'),
    optionBox         = document.querySelector('.option-box'),
    angle             = optionChecked.querySelector('.angle'),
    optionBoxOverl    = document.querySelector('.option-box-overl'),
    body              = document.body;
// // ПОЛУЧЕНИЕ МАССИВА ВСЕХ ЭЛЕМЕНТОВ option
const options     = document.querySelectorAll('.option');

// ПОЛУЧЕНИЕ ЗНАЧЕНИЯ ВЫБРАННОГО option
const optionCheckedValue = document.querySelector('.option_checked-value');

optionChecked.addEventListener('click', function(e){
  optionItemsHandle();
});


// // ФУНКЦИЯ ОБРАБОТКИ БЛОКА ВЫБОРА option
function optionItemsHandle() {
  optionBox.classList.add('shown');
  angle.classList.add('up');
  optionBoxOverl.classList.add('show');
  checkOption();
  optionBoxOverl.addEventListener('click', function(){
    optionBoxOverl.classList.remove('show');
    optionBox.classList.remove('shown');
    angle.classList.remove('up');
  })
}

function checkOption() {
  for(let i = 0; i < options.length; i++){
    options[i].addEventListener('click', function(){
    optionCheckedValue.innerHTML = options[i].innerHTML;

    optionBoxOverl.classList.remove('show');
    optionBox.classList.remove('shown');
    angle.classList.remove('up');
    })
  }
}

const tltpOverlay = document.querySelector('.tltp-overlay');
const hotelDayTitles = document.querySelectorAll('.hotel__day__title');
for(let i= 0; i < hotelDayTitles.length; i++){
  let hotelDayTitle = hotelDayTitles[i];
  let hotelDayTltp = hotelDayTitle.querySelector('.hotel__day-tltp');
  let info = hotelDayTitle.querySelector('.info');

  info.addEventListener('mouseover', function(e){
    hotelDayTltp.classList.add('show');
    tltpOverlay.classList.add('show');

    tltpOverlay.addEventListener('click', function(){
      tltpOverlay.classList.remove('show');
      hotelDayTltp.classList.remove('show');
    })
  })

  info.addEventListener('mouseout', function(e){
    hotelDayTltp.classList.remove('show');
    tltpOverlay.classList.remove('show');
  })
}
//----------------------------------------------------------------------
//----------------------------------------------------------------------


$('[data-fancybox="gallery-1"]:not(.slick-cloned)').fancybox();
$('[data-fancybox="gallery-2"]:not(.slick-cloned)').fancybox();