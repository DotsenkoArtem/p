$(document).ready(function(){
  $('.slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: '<button type="button" class="slider-btn slider-btn_next"></button>',
    prevArrow: '<button type="button" class="slider-btn slider-btn_prev"></button>',

    infinite: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
      ]
  });
});

// ===================================================================================

$(document).ready(function(){
  $('.author-list__body').slick({
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: '<button type="button" class="list-btn"></button>',
    prevArrow: false,
    vertical:true,
  });
});

// ===================================================================================

$(function(){
  $('a[href^="#"]').on('click', function(event) {

    event.preventDefault();
    
    let sc = $(this).attr("href"),
        dn = $(sc).offset().top;
    $('html, body').animate({scrollTop: dn}, 1000, 'swing');
    

  });
});


// ===================================================================================

$('[data-fancybox="gallery"]').fancybox({
});

// ===================================================================================

const questions = document.querySelectorAll('.quest__header');
const faqCont   = document.querySelector('.faq__container');
let answerMax = 0;

for(let i = 0; i < questions.length; i++){
  let question  = questions[i];
  let angle     = question.querySelector('.angle');
  let answer    = question.nextElementSibling;

// МАКСИМАЛЬНАЯ ВЫСОТА ОТКРЫТОГО АККОРДИОНА
  if(answerMax < answer.scrollHeight) {
    answerMax = answer.scrollHeight;
  }

  question.addEventListener('click', function(){
    if(!angle.classList.contains('open')){
      for(let j = 0; j < questions.length; j++){
        let angle     = questions[j].querySelector('.angle');
        let answer    = questions[j].nextElementSibling;
        angle.classList.remove('open');
        answer.style.maxHeight = 0 + "px";
      }
      angle.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + "px";
    } 
    else{
      angle.classList.remove('open');
      answer.style.maxHeight = 0 + "px";
    } 
  })
}

// УСТАНОВКА ВЫСОТЫ СЕКЦИИ "FAQ" = МАКСИМАЛЬНАЯ ВЫСОТА ОТКРЫТОГО АККОРДИОНА + ВЫСОТА КОНТЕЙНЕРА ДАННОЙ СЕКЦИИ .faq__container
/*
ДАННЫЙ СПОСОБ НЕ ДЕЙСТВИТЕЛЕН ПРИ ИЗМЕНЕНИИ РАЗМЕРА ЭКРАНА БЕЗ ПЕРЕЗАГРУЗКИ, НАПРИМЕР ПРИ ПОВОРОТЕ СМАРТФОНА.
ДЛЯ ЭТОГО ДОБАВИТЬ ПРОСЛУШИВАТЕЛЬ СОБЫТИЙ "RESIZE" НА "WINDOW"
*/
faqSection.style.height = (faqCont.offsetHeight + answerMax) + 'px';
// ===================================================================================