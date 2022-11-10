"use strict";

function _createForOfIteratorHelper2(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e3) { throw _e3; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e4) { didErr = true; err = _e4; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray2(o, minLen); }
function _arrayLikeToArray2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _createForOfIteratorHelper(o, allowArrayLike) {
  var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"];
  if (!it) {
    if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return {
            done: true
          };
          return {
            done: false,
            value: o[i++]
          };
        },
        e: function e(_e) {
          throw _e;
        },
        f: F
      };
    }
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e2) {
      didErr = true;
      err = _e2;
    },
    f: function f() {
      try {
        if (!normalCompletion && it["return"] != null) it["return"]();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}
function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}
window.onload = function () {
  // Intro Why Collapse
  var whyBtn = document.querySelector('#why');
  if (whyBtn) {
    whyBtn.onclick = function () {
      if (why.classList.contains('open')) {
        why.classList.remove('open');
        why.classList.add('close');
      } else {
        why.classList.remove('close');
        why.classList.add('open');
      }
    };
  }
  // ------------------------------------------------

  // Work-list
  var workList = document.querySelector('.work-list-wrap');
  if (workList) {
    var workListBtn = document.querySelector('.work-list-btn');
    var workListClose = workList.querySelector('.work-list-close');
    workListBtn.onclick = function () {
      workList.classList.remove('close');
      workList.classList.add('open');
    };
    workListClose.onclick = function () {
      workList.classList.remove('open');
      workList.classList.add('close');
    };
  }

  // SMoothy Scroll
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
      /*
      * 1000 скорость перехода в миллисекундах
      */
    });
  });
  // ------------------------------------------------

  // MODALS

  var modalOpenBtns = document.querySelectorAll('.modal-trigger');
  if (modalOpenBtns) {
    var _loop = function _loop(i) {
      var modalOpenBtn = modalOpenBtns[i];
      modalOpenBtn.addEventListener('click', function () {
        openModal(modalOpenBtn);
      });
    };
    for (var i = 0; i < modalOpenBtns.length; i++) {
      _loop(i);
    }
  }

  // Functions

  function openModal(modalOpenBtn) {
    var modal = document.getElementById(modalOpenBtn.dataset.target);
    modal.classList.remove('closed');
    modal.style.display = 'flex';
    modal.classList.add('opened');
    var modalCloseBtns = modal.getElementsByClassName('modal-close');
    for (var _i = 0; _i < modalCloseBtns.length; _i++) {
      var modalCloseBtn = modalCloseBtns[_i];
      modalCloseBtn.addEventListener('click', function () {
        closeModal(modal);
      });
    }
  }
  function closeModal(modal) {
    var delay = 300;
    modal.classList.remove('opened');
    modal.classList.add('closed');
    setTimeout(function () {
      modal.style.display = 'none';
    }, delay);
  }

  // Обработка модального окна выбора по кнопке "Рассчитать стоимость"
  function calcModalHandler(id) {
    var calcModal = document.querySelector(id);
    if (calcModal) {
      (function () {
        var delay = 300;
        var calcModalSelect = calcModal.querySelector('.calc-modal-select');
        var calcModalCallback = calcModal.querySelector('.calc-modal-callback');
        var callackOrder = calcModal.querySelector('.callack-order');
        var doCall = calcModal.querySelector('.do-call');
        calcModalSelect.style.animationDuration = "".concat(delay / 1000, "s");
        calcModalCallback.style.animationDuration = "".concat(delay / 1000, "s");

        // Переключение между фреймами окна
        callackOrder.addEventListener('click', function () {
          calcModalSelect.classList.remove('open');
          calcModalSelect.classList.add('closed');
          setTimeout(function () {
            calcModalSelect.style.display = 'none';
          }, delay);
          setTimeout(function () {
            calcModalCallback.style.display = 'block';
            calcModalCallback.classList.add('open');
          }, delay * 2);
        });

        // Закрытие окна
        var calcModalCloses = calcModal.querySelectorAll('.modal-close');
        var _iterator2 = _createForOfIteratorHelper2(calcModalCloses),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var calcModalClose = _step2.value;
            calcModalClose.addEventListener('click', function () {
              calcModalSelect.style.animationDuration = "".concat(delay / 1000, "s");
              calcModalCallback.style.animationDuration = "".concat(delay / 1000, "s");
              calcModalCallback.classList.remove('open');
              calcModalCallback.classList.add('closed');
              setTimeout(function () {
                calcModalSelect.style.display = '';
                calcModalSelect.classList.remove('closed');
                calcModalSelect.classList.add('open');
                calcModalCallback.style.display = '';
                calcModalCallback.classList.remove('closed');
              }, delay);
            });
          }

          // Закрытие окна после активации самостоятельного звонка
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
        doCall.addEventListener('click', function () {
          setTimeout(function () {
            closeModal(calcModal);
          }, delay);
        });
      })();
    }
  }
  calcModalHandler('#calcModal');

  // ================================================
  // FORMS
  // Обработка input[type="date"]
  var labelCoverFormGroups = document.querySelectorAll('.form-group-label-cover');
  var _iterator3 = _createForOfIteratorHelper2(labelCoverFormGroups),
    _step3;
  try {
    var _loop4 = function _loop4() {
      var labelCoverFormGroup = _step3.value;
      var labelCover = labelCoverFormGroup.querySelector('label');
      var inputCover = labelCoverFormGroup.querySelector('.form__control');
      inputCover.addEventListener('blur', function () {
        if (inputCover.value === '') {
          inputCover.classList.add('not-valid');
          inputCover.classList.remove('valid');
          labelCover.innerHTML = "Заполните все данные";
        } else {
          inputCover.classList.remove('not-valid');
          inputCover.classList.add('valid');
          labelCover.innerHTML = "Время и дата";
        }
      });
    };
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      _loop4();
    }

    // Массив всех форм
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }
  var forms = document.forms;
  var _loop2 = function _loop2(_i2) {
    var form = forms[_i2];
    var attach = form.querySelector('[type="file"]');
    var selectedFile = form.querySelector('.form__file_selected');
    if (attach) {
      attach.addEventListener('change', function () {
        if (this.files.length < 1) {
          selectedFile.innerHTML = "";
        } else if (this.files.length == 1) {
          selectedFile.innerHTML = "\u0412\u044B\u0431\u0440\u0430\u043D \u0444\u0430\u0439\u043B:<br>".concat(this.files[0].name, " ");
        } else {
          selectedFile.innerHTML = "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u043E \u0444\u0430\u0439\u043B\u043E\u0432: ".concat(this.files.length, " ");
        }
      });
    }
    form.addEventListener('submit', function (event) {
      send(event, "php/".concat(form.dataset.action));
    });
    function send(event, php) {
      setupLoader(form);
      // console.log("Отправка запроса");

      event.preventDefault ? event.preventDefault() : event.returnValue = false;
      var req = new XMLHttpRequest();
      req.open('POST', php, true);
      req.onload = function () {
        // Определение переменных для оповещения
        var thanks = document.createElement('div');
        var thanksContent = document.createElement('div');
        var thanksClose = document.createElement('div');
        var messageSuccessful = '<h3><span>Спасибо</span>Мы перезвоним Вам в ближайшее время!</h3>';
        var limitExceeded = '<h3><span>Ошибка.</span>Превышен максимальный размер прикрепляемых файлов (10мб).</h3>';
        var messageError = '<h3><span>Ошибка</span>Сообщение не отправлено</h3>'; // Установка окна оповещения

        setupThanks();
        function setupThanks() {
          thanks.className = 'thanks';
          thanksContent.className = 'thanks__content';
          thanksClose.className = 'thanks__close';
          thanks.append(thanksContent, thanksClose);
          wrapper.append(thanks);

          // Закрытие окна оповещения
          thanksClose.onclick = function () {
            removeThanks(thanks);
          };
        }
        removeLoader(form);
        if (req.status >= 200 && req.status < 400) {
          var json = JSON.parse(this.response);
          console.log(json);
          if (json.result == "success") {
            // Текстовое содержимое для окна оповещения в зависимости от результата
            thanksContent.innerHTML = messageSuccessful;
          } else if (json.result == "limitExceeded") {
            // Текстовое содержимое для окна оповещения в зависимости от результата
            thanksContent.innerHTML = limitExceeded;
          } else {
            // Текстовое содержимое для окна оповещения в зависимости от результата
            thanksContent.innerHTML = messageError;
          } // Если не удалось связаться с php файлом
        } else {
          alert("Ошибка сервера. Номер: " + req.status);
        } //   Вывод окна оповещения на страницу

        thanks.classList.add('active'); // Очистка формы после отправки

        form.reset();
        if (attach) {
          selectedFile.innerHTML = "";
        }

        //   Включаю поля формы после отправки данных
        for (var _i6 = 0; _i6 < form.elements.length; _i6++) {
          form.elements[_i6].disabled = false;
        }

        //   Автоудаление окна оповещения
        setTimeout(function () {
          removeThanks();
        }, 5000); //   Удаление окна оповещения

        function removeThanks() {
          thanks.classList.remove('active');
          thanks.remove();
        }
      };

      // Если не удалось отправить запрос. Стоит блок на хостинге
      req.onerror = function () {
        alert("Ошибка отправки запроса");
      };
      req.send(new FormData(event.target));
    }
  };
  for (var _i2 = 0; _i2 < forms.length; _i2++) {
    _loop2(_i2);
  }

  // Функции установки, удаления лоадера кнопки формы
  function setupLoader(form) {
    var loader = document.createElement('div');
    loader.className = 'submit-loader';
    form.querySelector('.loader-container').appendChild(loader); // form.appendChild(loader);
  }

  function removeLoader(form) {
    var loader = form.querySelector('.submit-loader');
    loader.remove();
  }

  // ================================================
  // SLIDERS 

  // Expert-slider
  var expertSlider = new Swiper('.expert__slider', {
    loop: true,
    slidesPerView: "auto",
    centeredSlides: true,
    speed: 500,
    autoplay: {
      delay: 5000
    },
    navigation: {
      nextEl: '.swiper-button-next.expert__button.expert__button_next',
      prevEl: '.swiper-button-prev.expert__button.expert__button_prev'
    },
    pagination: {
      el: ".expert__pagination",
      type: "fraction"
    },
    breakpoints: {
      576: {
        slidesPerView: 3,
        spaceBetween: 35
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 35
      },
      992: {
        spaceBetween: 0,
        centeredSlides: false,
        slidesPerView: 4
      }
    }
  });
  // -----------------------------------------------

  // Client-slider
  var clientSlider = new Swiper('.client__slider', {
    loop: true,
    slidesPerView: 2,
    speed: 500,
    draggable: true,
    spaceBetween: 20,
    autoplay: {
      delay: 5000
    },
    navigation: {
      nextEl: '.swiper-button-next.client__button.client__button_next',
      prevEl: '.swiper-button-prev.client__button.client__button_prev'
    },
    breakpoints: {
      401: {
        slidesPerView: 3
      },
      481: {
        slidesPerView: 4
      },
      991: {
        slidesPerView: 6
      }
    }
  });
  // ------------------------------------------------

  // Advantages-slider
  // Инициализация слайдера в зависимости от ширины экрана
  var advSlider = undefined;
  function initAdvSlider() {
    var screenWidth = document.documentElement.clientWidth;
    var advSlideContainer = document.querySelector('.adv-grid');
    var advSlides = document.querySelectorAll('.adv-slide');
    if (screenWidth < 576 && advSlider == undefined) {
      advSlider = new Swiper('.adv__slider', {
        loop: true,
        slidesPerView: 1,
        speed: 500,
        spaceBetween: 20,
        centeredSlides: true,
        navigation: {
          nextEl: '.swiper-button-next.adv__button.adv__button_next',
          prevEl: '.swiper-button-prev.adv__button.adv__button_prev'
        },
        breakpoints: {
          480: {
            slidesPerView: "auto"
          }
        }
      });
    } else if (screenWidth >= 576 && advSlider != undefined) {
      advSlider.destroy();
      advSlider = undefined;
      advSlideContainer.removeAttribute('style');
      for (var _i3 = 0; _i3 < advSlides.length; _i3++) {
        advSlides[_i3].removeAttribute('style');
      }
    }
  }
  initAdvSlider();
  // ------------------------------------------------

  // Awards-slider
  /// Инициализация слайдера в зависимости от ширины экрана
  var awaSlider = undefined;
  function initAwaSlider() {
    var screenWidth = document.documentElement.clientWidth;
    var awaSlideContainer = document.querySelector('.awa__slider-inner');
    var awaSlides = document.querySelectorAll('.awa-slide');
    if (screenWidth < 768 && awaSlider == undefined) {
      awaSlider = new Swiper('.awa__slider', {
        loop: true,
        slidesPerView: "auto",
        centeredSlides: true,
        speed: 500,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next.awa__button.awa__button_next',
          prevEl: '.swiper-button-prev.awa__button.awa__button_prev'
        }
      });
    } else if (screenWidth >= 768 && awaSlider != undefined) {
      awaSlider.destroy();
      awaSlider = undefined;
      awaSlideContainer.removeAttribute('style');
      for (var _i4 = 0; _i4 < awaSlides.length; _i4++) {
        awaSlides[_i4].removeAttribute('style');
      }
    }
  }
  initAwaSlider();
  // ------------------------------------------------

  // Reviews-slider
  // Инициализация слайдера в зависимости от ширины экрана
  var revSlider = undefined;
  function initRevSlider() {
    var screenWidth = document.documentElement.clientWidth;
    var revSlideContainer = document.querySelector('.rev__slider-inner');
    var revSlides = document.querySelectorAll('.rev-slide');
    if (screenWidth < 576 && revSlider == undefined) {
      revSlider = new Swiper('.rev__slider', {
        slidesPerView: "auto",
        centeredSlides: true,
        loop: true,
        speed: 500,
        draggable: true,
        spaceBetween: 20,
        autoplay: {
          delay: 5000
        },
        navigation: {
          nextEl: '.swiper-button-next.rev__button.rev__button_next',
          prevEl: '.swiper-button-prev.rev__button.rev__button_prev'
        }
      });
    } else if (screenWidth >= 576 && revSlider != undefined) {
      revSlider.destroy();
      revSlider = undefined;
      revSlideContainer.removeAttribute('style');
      for (var _i5 = 0; _i5 < revSlides.length; _i5++) {
        revSlides[_i5].removeAttribute('style');
      }
    }
  }
  initRevSlider();
  // ---------------------------------------------------- 

  // Other-serv-slider
  var otherServSlider = new Swiper('.other-serv__slider', {
    loop: true,
    slidesPerView: 2,
    speed: 500,
    draggable: true,
    spaceBetween: 10,
    autoplay: {
      delay: 5000
    },
    navigation: {
      nextEl: '.swiper-button-next.other-serv__button.other-serv__button_next',
      prevEl: '.swiper-button-prev.other-serv__button.other-serv__button_prev'
    },
    breakpoints: {
      401: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 3
      },
      992: {
        slidesPerView: 4
      }
    }
  });
  // ----------------------------------------------------------

  // Инициализация слайдеров при ресайзе
  window.onresize = function () {
    initAdvSlider();
    initAwaSlider();
    initRevSlider();
  };
  // = = = = = = = = = = = = = = = = = = = = = = = = = = = =

  // Маска на поля ввода номера телефона
  var iForms = document.forms;
  var _iterator = _createForOfIteratorHelper(iForms),
    _step;
  try {
    var _loop3 = function _loop3() {
      var iForm = _step.value;
      var phoneInput = iForm.querySelector('[name="userPhone"]');
      if (phoneInput) {
        var submitbtn = iForm.querySelector('[type="submit"]');
        var im = new Inputmask("+7 (\\999) 999-99-99");
        im.mask(phoneInput); // ОТКЛЮЧЕНИЕ КНОПКИ SUBMIT В СЛУЧАЕ НЕКОРРЕКТНОГО ВВОДА НОМЕРА

        phoneInput.oninput = function () {
          if (!$(phoneInput).inputmask("isComplete")) {
            submitbtn.disabled = true;
          } else {
            submitbtn.removeAttribute('disabled');
          }
        };
      }
    };
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      _loop3();
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};