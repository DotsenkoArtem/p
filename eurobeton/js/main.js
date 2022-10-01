    "use strict";
    // ==========MODALS SCRIPT==========
    let modal = document.querySelector(".modal");
    let modalOverlay = document.querySelector(".modal__overlay");
    let modalContent = document.querySelector(".modal__content");
    let closeButton = document.querySelector(".modal__close");
    let openButton = document.getElementsByClassName("modal-trigger");
    let body = document.querySelector("body");
    let formReset = document.querySelector(".form-reset");

    for(let i = 0; i < openButton.length; i++) {
        openButton[i].addEventListener("click", function () {
            modal.className = "modal fadeIn";
            modalOverlay.className = "modal__overlay fadeIn";
            modalContent.className = "modal__content fadeIn";
            body.classList.add("scroll-hidden");
        });
    }
    closeButton.addEventListener("click", function () {
            modal.className = "modal fadeOut";
            modalOverlay.className = "modal__overlay fadeOut";
            modalContent.className = "modal__content fadeOut";
            body.classList.remove("scroll-hidden");
            formReset.reset();
    });

    modalOverlay.addEventListener("click", function () {
            modal.className = "modal fadeOut";
            modalOverlay.className = "modal__overlay fadeOut";
            modalContent.className = "modal__content fadeOut";
            body.classList.remove("scroll-hidden");
            formReset.reset();
    });


    // ==========FOOTER MODALS==========
    let fModal = document.querySelector(".f-modal");
    let fModalOverlay = document.querySelector(".f-modal__overlay");
    let fModalContent = document.querySelector(".f-modal__content");
    let fOpenButton = document.getElementsByClassName("f-modal-trigger");
    let fFormReset = document.querySelector(".f-form-reset")

    for(let i = 0; i < fOpenButton.length; i++) {
        fOpenButton[i].addEventListener("click", function () {
            fModal.className = "f-modal fadeIn";
            fModalOverlay.className = "f-modal__overlay fadeIn";
            fModalContent.className = "f-modal__content fadeIn";
            body.classList.add("scroll-hidden");
        });
    }

    fModalOverlay.addEventListener("click", function () {
            fModal.className = "f-modal fadeOut";
            fModalOverlay.className = "f-modal__overlay fadeOut";
            fModalContent.className = "f-modal__content fadeOut";
            body.classList.remove("scroll-hidden");
            fFormReset.reset();
    });


    // ==========NAV SCRIPT==========
    function navToggle() {
        let menu = document.getElementById("menu");
        if (menu.className === "nav") {
            menu.className += " responsive";
        } else {
            menu.className = "nav";
        }

        let menuToggleItem = document.getElementsByClassName("nav-toggle__item");
        for (let i = 0; i < menuToggleItem.length; i++) {
            if (menuToggleItem[i].className === "nav-toggle__item") {
                menuToggleItem[i].className += " responsive";
            } else {
                menuToggleItem[i].className = "nav-toggle__item";
            }
        }
    }

    // ==========SEARCH-FORM==========
    // let search = document.querySelector(".nav__search");

    // search.addEventListener('click', function (e) {
    //   e.stopPropagation();
    //   this.classList.add('search-active');
    // })

    // body.addEventListener('click', function () {
    //     search.classList.remove('search-active');
    // })


    let navSearch = document.querySelector(".nav__search");
    let btnSearch = document.querySelector(".btn-search");
    let navSearchImg = document.querySelector(".nav__search__img");
    
    navSearchImg.addEventListener("click", function () {
            navSearch.className = "nav__search search-active";
    });
    navSearch.addEventListener("click", function (e) {
        e.stopPropagation();
        body.addEventListener("click", function () {
            navSearch.className = "nav__search";
        });
    });
    btnSearch.addEventListener("click", function () {
            navSearch.className = "nav__search";
    });


       
    // ========================SLIDER===============================        
    // ========================SLIDER===============================
    $(document).ready(function(){
      $('.cert__slider').slick({
        prevArrow: '<button type="button" class="slick-slider-btn slick-slider-btn-prev"></button>',
        nextArrow: '<button type="button" class="slick-slider-btn slick-slider-btn-next"></button>',
        infinite: true,
        autoplay: true,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 991,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
        ]
      });
    });
    //=======================================
    // ============UP-BUTTON==========================
    $(document).ready(function() {

    // let defaults = {
    // containerID: 'toTop', // fading element id
    // containerHoverID: 'toTopHover', // fading element hover id
    // scrollSpeed: 1200,
    // easingType: 'linear'
    // };

     
    $().UItoTop({ easingType: 'easeOutQuart' });
     
    });
