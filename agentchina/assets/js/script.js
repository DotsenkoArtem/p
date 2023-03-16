
$(document).ready(function(){
    // new page js's
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 50,
        slidesPerGroup: 1,
        speed: 800,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        breakpoints: {
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            480: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
            640: {
              slidesPerView: 1.4,
              spaceBetween: 30,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            992: {
              slidesPerView: 2,
            },
            1000: {
              slidesPerView: 3,
            },
        },
    });

    var swiper2 = new Swiper(".policy-slide", {
        slidesPerView: 1,
        spaceBetween: 50,
        slidesPerGroup: 1,
        loop: false,
        loopFillGroupWithBlank: true,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".policy-next",
          prevEl: ".policy-prev",
        },
        breakpoints: {
            320: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 1,
            },
        },
    });

    $('.nav-pills .nav-link').on('click',function(e){
        e.preventDefault();
        $(this).toggleClass('click');
        $('.tab-all').toggleClass('active');
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
    });

    

    // Mobile menu
    $(".header-toggle").click(function (){
        $(this).toggleClass("active");
        $(".header-actions").toggleClass("active");
        return false;
    });
    $(window).resize(function (){
        setTimeout(function (){
            if($(window).width() > 1200){
                $(".header-toggle, .header-actions").removeClass("active");
            }
        }, 200);
    });

    // Anchors link
    $(".anchor").click(function () {
        $("html, body").animate({
            scrollTop: $($(this).attr("href")).offset().top - $(".header").outerHeight()
        }, 800);
        $(".header-toggle, .header-actions").removeClass("active");
        return false;
    });

    // Header scroll & Top scroll button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 20) {
            $(".header, .top-scroll").addClass("active");
        } else {
            $(".header, .top-scroll").removeClass("active");
        }
    });

    // Faq
    $(".faq-questions-item").click(function (){
        $(".faq-questions-item").removeClass("current");
        $(this).addClass("current");
        $(".faq-answers-item").removeClass("current").hide();
        $("div#" + $(this).attr("data-answer")).fadeIn();
    });

    // Top scroll button
    $(".top-scroll").click(function () {
        $("html, body").animate({scrollTop: 0}, 800);
    });


    // Sliders
    if($(".work-gallery-slider").length){
        var worksSlider = new Swiper(".work-gallery-slider", {
            slidesPerView: 3,
            loop: true,
            navigation: {
                prevEl: ".works-slider-prev",
                nextEl: ".works-slider-next",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 3,
                }
            },
        });
    }

    if($(".testimonials-gallery-slider").length){
        var worksSlider = new Swiper(".testimonials-gallery-slider", {
            slidesPerView: 3,
            loop: true,
            navigation: {
                prevEl: ".testimonials-slider-prev",
                nextEl: ".testimonials-slider-next",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                },
                768: {
                    slidesPerView: 2,
                },
                991: {
                    slidesPerView: 3,
                }
            },
        });
    }

    if($(".related-slider").length){
        var init = false;

        function swiperCard() {
            if (window.innerWidth <= 576) {
                if (!init) {
                    init = true;
                    swiper = new Swiper(".related-slider", {
                        slidesPerView: 1,
                        navigation: {
                            prevEl: ".related-control.prev",
                            nextEl: ".related-control.next",
                        },
                    });
                }
            } else if (init) {
                swiper.destroy();
                init = false;
            }
        }
        swiperCard();
        window.addEventListener("resize", swiperCard);
    }

});

document.addEventListener('DOMContentLoaded', function () {
    let timeContainer = document.querySelector(".select-inner-text-time");
    const   endY = parseInt(timeContainer.dataset.y),
        endM = parseInt(timeContainer.dataset.m),
        endD = parseInt(timeContainer.dataset.d);

    const deadline = new Date(endY, endM, endD);

    let timerId = null;

    function declensionNum(num, words) {
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }

    function countdownTimer() {
        const diff = deadline - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const days = diff > 0 ? Math.floor(diff / 1000 / 60 / 60 / 24) : 0;
        const hours = diff > 0 ? Math.floor(diff / 1000 / 60 / 60) % 24 : 0;
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        $days.textContent = days < 10 ? '0' + days : days;
        $hours.textContent = hours < 10 ? '0' + hours : hours;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $days.dataset.title = declensionNum(days, ['день', 'дня', 'дней']);
        $hours.dataset.title = declensionNum(hours, ['час', 'часа', 'часов']);
        $minutes.dataset.title = declensionNum(minutes, ['мин.', 'мин.', 'мин.']);
        $seconds.dataset.title = declensionNum(seconds, ['сек.', 'сек.', 'сек.']);
    }
    const $days = document.querySelector('.timer-days');
    const $hours = document.querySelector('.timer-hours');
    const $minutes = document.querySelector('.timer-minutes');
    const $seconds = document.querySelector('.timer-seconds');

    countdownTimer();

    timerId = setInterval(countdownTimer, 1000);
});