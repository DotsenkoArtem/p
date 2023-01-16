"use strict";

window.addEventListener("load", function () {
  // LAZY-LOAD
  var lazyItems = document.querySelectorAll('.lazy');

  var _loop = function _loop(i) {
    var lazyItem = lazyItems[i];
    var image = lazyItem.querySelector('[data-src]');
    var tempImg = document.createElement('img');
    tempImg.setAttribute('src', image.getAttribute('data-src'));

    tempImg.onload = function () {
      image.setAttribute('src', image.getAttribute('data-src'));
      lazyItem.classList.remove('lazy');
    };
  };

  for (var i = 0; i < lazyItems.length; i++) {
    _loop(i);
  } // = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  // MOBILE-MENU-SETTINGS


  var menuToggler = document.querySelector('.top-menu-toggler'),
      menu = document.querySelector('.header-nav'),
      menuOverl = document.querySelector('.top-menu-overl');
  menuToggler.addEventListener('click', menuToggle);
  menuOverl.addEventListener('click', menuClose);

  function menuToggle() {
    menu.classList.toggle('open');
    menuToggler.classList.toggle('open');
    header.classList.toggle('white');
    menuOverl.classList.toggle('open');
  }

  function menuClose() {
    menu.classList.remove('open');
    menuToggler.classList.toggle('open');
    header.classList.remove('white');
    menuOverl.classList.remove('open');
  } // = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  // MODAL-WINDOW-SETTINGS


  var modalOpenBtns = document.querySelectorAll('.modal-trigger');
  var formThemes = {
    callback: "Перезвоните мне",
    "test-street-2": "Взять на тест-драйв Street-2",
    "test-street-2-pro": "Взять на тест-драйв Street-2-pro",
    "test-street-utra-pro": "Взять на тест-драйв Street-ultra-pro",
    partn: "Хочу стать партнером"
  };

  if (modalOpenBtns) {
    var _loop2 = function _loop2(_i) {
      var modalOpenBtn = modalOpenBtns[_i];
      modalOpenBtn.addEventListener('click', function () {
        openModal(modalOpenBtn);

        if (modalOpenBtn.dataset.form) {
          formTheme.value = formThemes[modalOpenBtn.dataset.form];
        }
      });
    };

    for (var _i = 0; _i < modalOpenBtns.length; _i++) {
      _loop2(_i);
    }
  } // Modal Functions


  function openModal(modalOpenBtn) {
    var modal = document.getElementById(modalOpenBtn.dataset.target);
    var modalCloseBtns = modal.getElementsByClassName('modal-close');
    modal.classList.remove('closed');
    modal.classList.add('opened');

    for (var _i2 = 0; _i2 < modalCloseBtns.length; _i2++) {
      var modalCloseBtn = modalCloseBtns[_i2];
      modalCloseBtn.addEventListener('click', function () {
        closeModal(modal);
      });
    }
  }

  function closeModal(modal) {
    modal.classList.remove('opened');
    modal.classList.add('closed');
  } // = = = = = = = = = = = = = = = = = = = = = = = = = = = = 
  // FORMS


  var forms = document.forms;

  for (var _i3 = 0; _i3 < forms.length; _i3++) {
    var addFocus = function addFocus() {
      this.parentElement.classList.add('focused');
    };

    var removeFocus = function removeFocus() {
      this.parentElement.classList.remove('focused');
    };

    var form = forms[_i3];
    var submitBtn = form.querySelector('[type="submit"]'); // ДОБАВЛЕНИЕ-УДАЛЕНИЕ ФОКУСА НА ТЕКСТОВЫЕ ИНПУТЫ

    for (var j = 0; j < form.elements.length; j++) {
      if (form.elements[j].classList.contains('form__control')) {
        (function () {
          var ElementInput = form.elements[j];
          ElementInput.addEventListener('focus', addFocus);
          ElementInput.addEventListener('input', function () {
            if (ElementInput.value) {
              ElementInput.parentElement.classList.remove('focused');
              ElementInput.parentElement.classList.add('valid');
            } else {
              ElementInput.parentElement.classList.remove('valid');
            }
          });
          ElementInput.addEventListener('blur', removeFocus);
        })();
      }
    }
  } // ------------------------------------------------
  // ОТПРАВКА ФОРМЫ AJAX


  var modalContent = document.querySelector('.modal-callback');
  var thanks = document.createElement('div');
  var messageSuccessful = '<h3><span>Спасибо</span>Мы перезвоним Вам в ближайшее время!</h3>'; // let messageError        = '<h3><span>Ошибка</span>Сохранение лида доступно только на коммерческих планах.</h3>';

  var messageError = '<h3><span>Ошибка</span>отправки данных.</h3>';
  thanks.className = 'thanks'; // Функции установки, удаления лоадера кнопки формы

  function setupLoader(formId) {
    var loader = document.createElement('div'),
        loaderContainer = formId.querySelector('.loader-container');
    loader.className = 'submit-loader';
    loaderContainer.appendChild(loader);
  }

  function removeLoader(formId) {
    var loader = formId.querySelector('.submit-loader');
    loader.remove();
  } // ------------------------------------------------
  // Отправка формы AJAX


  var _loop3 = function _loop3(_i4) {
    var form = forms[_i4];
    $(form).submit(function (ev) {
      ev.preventDefault();
      setupLoader(form);
      $.ajax({
        type: 'POST',
        url: '/mail.php',
        data: $(this).serialize()
      }).done(function () {
        $(this).find('input').val('');
        $(form).trigger('reset');
        removeLoader(form);
        thanks.innerHTML = messageSuccessful;
        thanks.classList.add('active');
        wrapper.appendChild(thanks);
        modal.classList.remove('opened');
        setTimeout(function () {
          thanks.remove();
          thanks.classList.remove('active');
        }, 6500);
      }).fail(function () {
        $(this).find('input').val('');
        $(form).trigger('reset');
        removeLoader(form);
        thanks.innerHTML = messageError;
        thanks.classList.add('active');
        wrapper.appendChild(thanks);
        modal.classList.remove('opened');
        setTimeout(function () {
          thanks.remove();
          thanks.classList.remove('active');
        }, 6500);
      });
      return false;
    });
  };

  for (var _i4 = 0; _i4 < forms.length; _i4++) {
    _loop3(_i4);
  } // = = = = = = = = = = = = = = = = = = = = = = = = = = = = 

  /* Smoothy scrolling
  -------------------------*/


  $(function () {
    $('a[href^="#"]').on('click', function (event) {
      event.preventDefault();
      var sc = $(this).attr("href"),
          dn = $(sc).offset().top;
      /*
      * sc - в переменную заносим информацию о том, к какому блоку надо перейти
      * dn - определяем положение блока на странице
      */

      $('html, body').animate({
        scrollTop: dn
      }, 1000, 'swing');
    });
  }); // = = = = = = = = = = = = = = = = = = = = = = = = = = = =
}); // SLIDERS 
// Stars-slider

var starsSlider = new Swiper('.stars__slider', {
  direction: 'horizontal',
  loop: true,
  slidesPerView: 1,
  speed: 500,
  spaceBetween: 20,
  autoplay: {
    delay: 5000
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  breakpoints: {
    992: {
      slidesPerView: "auto",
      centeredSlides: true
    }
  }
}); // ------------------------------------------------
// Reviews-slider

var reviewsSlider = new Swiper('.reviews__slider', {
  direction: 'horizontal',
  loop: true,
  speed: 500,
  slidesPerView: "auto",
  centeredSlides: true,
  spaceBetween: 40,
  autoplay: {
    delay: 5000
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  }
}); // ------------------------------------------------
// Important-slider
//Swiper plugin initialization on window resize

var mySwiper = undefined;

function initSwiper() {
  var screenWidth = $(window).width();

  if (screenWidth < 576 && mySwiper == undefined) {
    mySwiper = new Swiper('.important__slider', {
      direction: 'horizontal',
      loop: true,
      slidesPerView: 1,
      speed: 500,
      spaceBetween: 20,
      autoplay: {
        delay: 5000
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        480: {
          slidesPerView: "auto",
          centeredSlides: true,
          spaceBetween: 40
        }
      }
    });
  } else if (screenWidth >= 576 && mySwiper != undefined) {
    mySwiper.destroy();
    mySwiper = undefined;
    jQuery('.important__item-wrapper').removeAttr('style');
    jQuery('.important-slide').removeAttr('style');
  }
} //Swiper plugin initialization


initSwiper(); //Swiper plugin initialization on window resize

$(window).on('resize', function () {
  initSwiper();
}); // = = = = = = = = = = = = = = = = = = = = = = = = = = = =