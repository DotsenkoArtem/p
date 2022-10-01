"use strict"

window.addEventListener("load", ()=>{


    // LAZY-LOAD
	let lazyItems = document.querySelectorAll('.lazy');

	for(let i = 0; i < lazyItems.length; i++){
		let lazyItem = lazyItems[i];
		let image = lazyItem.querySelector('[data-src]');
		let tempImg = document.createElement('img');

		tempImg.setAttribute('src', image.getAttribute('data-src'));
		tempImg.onload = function(){
			image.setAttribute('src', image.getAttribute('data-src'));
			lazyItem.classList.remove('lazy');
		};
	}
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = 


    // MOBILE-MENU-SETTINGS
    const menuToggler  	= document.querySelector('.top-menu-toggler'),
    menu 			= document.querySelector('.header-nav'),
    menuOverl  	= document.querySelector('.top-menu-overl');
    menuToggler.addEventListener('click', menuToggle);
    menuOverl.addEventListener('click', menuClose);

    function menuToggle() {
    menu.classList.toggle('open');
    menuToggler.classList.toggle('open');
    header.classList.toggle('white');
    menuOverl.classList.toggle('open');
    }

    function menuClose(){
    menu.classList.remove('open');
    menuToggler.classList.toggle('open');
    header.classList.remove('white');
    menuOverl.classList.remove('open');
    }
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = 


    // MODAL-WINDOW-SETTINGS
    const modalOpenBtns = document.querySelectorAll('.modal-trigger');
    const formThemes    = {
        callback:               "Перезвоните мне",
        "test-street-2":        "Взять на тест-драйв Street-2",
        "test-street-2-pro":    "Взять на тест-драйв Street-2-pro",
        "test-street-utra-pro": "Взять на тест-драйв Street-ultra-pro",
        partn:                  "Хочу стать партнером",
    };

    if(modalOpenBtns){
        for(let i = 0; i < modalOpenBtns.length; i++){
            let modalOpenBtn    = modalOpenBtns[i];
            modalOpenBtn.addEventListener('click', ()=>{
                openModal(modalOpenBtn);

                if(modalOpenBtn.dataset.form) {
                    formTheme.value = formThemes[modalOpenBtn.dataset.form];
                }
            });
        }
    }

    // Modal Functions
    function openModal(modalOpenBtn){
        let modal = document.getElementById(modalOpenBtn.dataset.target);
        let modalCloseBtns = modal.getElementsByClassName('modal-close');

        modal.classList.remove('closed');
        modal.classList.add('opened');

        for(let i = 0; i < modalCloseBtns.length; i++){
            let modalCloseBtn    = modalCloseBtns[i];
            modalCloseBtn.addEventListener('click', ()=>{
                closeModal(modal);
            });
        }
    }

    function closeModal(modal){
        modal.classList.remove('opened');
        modal.classList.add('closed');
    }
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = 


    // FORMS
    let forms = document.forms;
    for(let i = 0; i < forms.length; i++){
        let form        = forms[i];
        let submitBtn	= form.querySelector('[type="submit"]');

        // ДОБАВЛЕНИЕ-УДАЛЕНИЕ ФОКУСА НА ТЕКСТОВЫЕ ИНПУТЫ
        for(let j = 0; j < form.elements.length; j++){
            if(form.elements[j].classList.contains('form__control')){
                let ElementInput = form.elements[j];

                ElementInput.addEventListener('focus', addFocus);
                ElementInput.addEventListener('input', function () {
                    if(ElementInput.value){
                        ElementInput.parentElement.classList.remove('focused');
                        ElementInput.parentElement.classList.add('valid');
                    }else{
                        ElementInput.parentElement.classList.remove('valid');
                    }
                });
                ElementInput.addEventListener('blur', removeFocus);
            }
        }

        function addFocus() {
            this.parentElement.classList.add('focused');
        }
        function removeFocus() {
            this.parentElement.classList.remove('focused');
        }
    }
    // ------------------------------------------------

    // ОТПРАВКА ФОРМЫ AJAX
    let modalContent        = document.querySelector('.modal-callback');
    const thanks            = document.createElement('div');
    let messageSuccessful   = '<h3><span>Спасибо</span>Мы перезвоним Вам в ближайшее время!</h3>';
    // let messageError        = '<h3><span>Ошибка</span>Сохранение лида доступно только на коммерческих планах.</h3>';
    let messageError        = '<h3><span>Ошибка</span>отправки данных.</h3>';

    thanks.className  = 'thanks';

    // Функции установки, удаления лоадера кнопки формы
    function setupLoader(formId){
        let loader            = document.createElement('div'),
            loaderContainer   = formId.querySelector('.loader-container');
            loader.className  = 'submit-loader';
            loaderContainer.appendChild(loader);
    }
    
    function removeLoader(formId){
        let loader            = formId.querySelector('.submit-loader');
        loader.remove();
    }
    // ------------------------------------------------

    // Отправка формы AJAX
    for(let i = 0; i < forms.length; i++){
        let form        = forms[i];

        $(form).submit(function (ev) {
            ev.preventDefault();
            setupLoader(form);
        
            $.ajax({

                type: 'POST',
                url: '/mail.php',
                data: $(this).serialize(),
            
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
    }
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = 



    /* Smoothy scrolling
    -------------------------*/
    $(function(){
        $('a[href^="#"]').on('click', function(event) {
        event.preventDefault();
        
        let sc = $(this).attr("href"),
            dn = $(sc).offset().top;
        /*
        * sc - в переменную заносим информацию о том, к какому блоку надо перейти
        * dn - определяем положение блока на странице
        */
        $('html, body').animate({scrollTop: dn}, 1000, 'swing');
        });
    });
    // = = = = = = = = = = = = = = = = = = = = = = = = = = = =
});


// SLIDERS 
// Stars-slider
const starsSlider = new Swiper('.stars__slider', {
    direction: 'horizontal',
    loop: true,
    slidesPerView: 1,
    speed: 500,
    spaceBetween: 20,
    autoplay: {
        delay: 5000,
    },
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        992: {
            slidesPerView: "auto",
            centeredSlides: true,
        }
    }
});
// ------------------------------------------------

// Reviews-slider
const reviewsSlider = new Swiper('.reviews__slider', {
    direction: 'horizontal',
    loop: true,
    speed: 500,
    slidesPerView: "auto",
    centeredSlides: true,
    spaceBetween: 40,
    autoplay: {
        delay: 5000,
    },
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
    },
});
// ------------------------------------------------

// Important-slider
//Swiper plugin initialization on window resize
var mySwiper = undefined;
function initSwiper() {
    var screenWidth = $(window).width();
    if(screenWidth < 576 && mySwiper == undefined) {
        mySwiper = new Swiper('.important__slider', {
            direction: 'horizontal',
            loop: true,
            slidesPerView: 1,
            speed: 500,
            spaceBetween: 20,
            autoplay: {
                delay: 5000,
            },
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                480: {
                    slidesPerView: "auto",
                    centeredSlides: true,
                    spaceBetween: 40,
                },
            }
        });
    } else if (screenWidth >= 576 && mySwiper != undefined) {
        mySwiper.destroy();
        mySwiper = undefined;

        jQuery('.important__item-wrapper').removeAttr('style');
        jQuery('.important-slide').removeAttr('style');
    }
}

//Swiper plugin initialization
initSwiper();

//Swiper plugin initialization on window resize
$(window).on('resize', function(){
    initSwiper();
});
// = = = = = = = = = = = = = = = = = = = = = = = = = = = = 