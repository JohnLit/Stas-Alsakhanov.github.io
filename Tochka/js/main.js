/* Маска телефона */
let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs);

/* Валидация */
function validateForms(selector, rules) {
    new window.JustValidate(selector, {
        rules: rules,
        submitHandler: function (form, values, ajax) {
            console.log(form);

            let formData = new FormData(form);

            fetch("mail.php", {
                method: "POST",
                body: formData
            })
                .then(function (data) {
                    console.log(data);
                    console.log('Отправлено');
                    form.reset();
                });
        },
        messages: {
            name: {
                required: 'Введите ваше имя!'
            },
            tel: {
                required: 'Введите ваш телефон!'
            },
        },
    });
}

validateForms('#form1', { email: { required: true, email: true }, fio: { required: true }, tel: { required: true } });

validateForms('#form2', { email: { required: true, email: true }, fio: { required: true }, tel: { required: true } });

$(function () {

    /* Скролл на верх */
    let scrollTop = function () {
        $('.scroll-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1000);
        });
        $(window).scroll(function () {
            if ($(window).scrollTop() > 300) {
                $('.scroll-top').addClass('active');
            }
            else {
                $('.scroll-top').removeClass('active');
            }
        });
    };

    /* Скролл к секции */
    $("[data-scroll]").on("click", function (event) {
        event.preventDefault();

        var blockId = $(this).data('scroll'),
            blockOffset = $(blockId).offset().top;

        $("html, body").animate({
            scrollTop: blockOffset - 50
        }, 700);
    });

    /* Плавающая шапка */
    var header = $('.header-mobile'),
        scrollPrev = 0;

    $(window).scroll(function () {
        var scrolled = $(window).scrollTop();

        if (scrolled > 100 && scrolled > scrollPrev) {
            header.addClass('is-active');
        } else {
            header.removeClass('is-active');
        }
        scrollPrev = scrolled;
    });

    /* Slider */
    $('.popular-models__inner').slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        prevArrow: '.popular-models__prev',
        nextArrow: '.popular-models__next',
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 500,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
        ]
    });

    /* Открытие мобильного меню при клике и закрытия по крестику и боди */
    let openMobileNav = function () {
        $(document).on('click', '.sandwich', function () {
            $(this).parent().toggleClass('header-mobile__hamburger--active');
            $(this).toggleClass('sandwich--active');
            $('html').addClass('fixed');
        });

        $(document).on('click', '.header-mobile__shadow', function () {
            $('.sandwich').click();
            $('html').removeClass('fixed');
        });

        $(document).on('click', '.sandwich--active', function () {
            $('html').removeClass('fixed');
        });

        $(document).on('click', '.header-mobile__link', function () {
            $('.header-mobile__shadow').removeClass('header-mobile__shadow--active');
            $('.header-mobile__hamburger').removeClass('header-mobile__hamburger--active');
            $('.sandwich').removeClass('sandwich--active');
            $('html').removeClass('fixed');
        });
    };

    scrollTop();
    openMobileNav();
});

ymaps.ready(init);

function init() {

    var myMap = new ymaps.Map("map", {
        center: [53.5200,55.9171],
        zoom: 9,
        controls: ['zoomControl']
    });

    var myGeoObjects = [];

    myGeoObjects[0] = new ymaps.Placemark([53.6144,55.9553], {
        clusterCaption: 'Заголовок',
        balloonContentBody: 'г. Стерлитамак,</br> ул. Мира 3,</br> ост. Колхозный рынок',
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/map/marker.svg',
        iconImageSize: [30, 30],
        iconImageOffset: [-3, -42]
    });

    myGeoObjects[1] = new ymaps.Placemark([53.6280,55.9079], {
        clusterCaption: 'Заголовок',
        balloonContentBody: 'г. Стерлитамак,</br> ул. Коммунистическая 32,</br> Остановка дом связи',
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/map/marker.svg',
        iconImageSize: [30, 30],
        iconImageOffset: [-23, -42]
    });

    myGeoObjects[2] = new ymaps.Placemark([53.3480,55.9259], {
        clusterCaption: 'Заголовок',
        balloonContentBody: 'г. Салават,</br> ул. Ленина 52',
    }, {
        iconLayout: 'default#image',
        iconImageHref: 'images/map/marker.svg',
        iconImageSize: [30, 30],
        iconImageOffset: [-23, -42]
    });

    var clusterIcons = [{
        href: 'images/map/marker.svg',
        size: [30, 30],
        offset: [0, 0]
    }];

    var clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: false,
        clusterOpenBalloonOnClick: false,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 300,
        clusterBalloonContentLayoutHeight: 200,
        clusterBalloonPagerSize: 5
    });

    $("#map").mouseenter(function () {
        myMap.behaviors.disable('scrollZoom');
    });
    $("#map").click(function () {
        if (myMap.behaviors.isEnabled('scrollZoom')) {
            myMap.behaviors.disable('scrollZoom');
        }
        else {
            myMap.behaviors.enable('scrollZoom');
        }
    });

    clusterer.add(myGeoObjects);
    myMap.geoObjects.add(clusterer);
}