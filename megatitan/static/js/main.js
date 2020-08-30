"use strict";

$(document).ready(function () {
  svg4everybody({});
  /* Прелоадер */

  window.onload = function () {
    var preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
  };
  /* Маска для ввода телефона */


  jQuery(function ($) {
    $("input[type='tel']").mask("+7(999) 999-99-99");
    $('input, textarea').keyup(function () {
      $(this).removeClass('error');
      $(this).siblings('label').remove();
    });
  });
  /* Вертикальный скролл */

  var simpleBar = function simpleBar() {
    if ($(window).width() > 1199) {
      $.each($('.scroll'), function (i, v) {
        new SimpleBar(v);
      });
    }
  };
  /* Слайдер */


  var slider = function slider() {
    var time = 2;
    var $bar, $slick, isPause, tick, percentTime;
    $slick = $('.js-slider-main');
    $slick.slick({
      speed: 1200,
      adaptiveHeight: false,
      waitForAnimate: false,
      dots: true,
      asNavFor: '.js-slider-aside',
      prevArrow: '.slider-nav--prev',
      nextArrow: '.slider-nav--next',
      responsive: [{
        breakpoint: 992,
        settings: {
          arrows: false
        }
      }]
    });
    $bar = $('.slider-progress .slider-progress__current');

    function startProgressbar() {
      resetProgressbar();
      percentTime = 0;
      isPause = false;
      tick = setInterval(interval, 20);
    }

    function interval() {
      if (isPause === false) {
        percentTime += 1 / (time + 0.1);
        $bar.css({
          width: percentTime + "%"
        });

        if (percentTime >= 100) {
          $slick.slick('slickNext');
          startProgressbar();
        }
      }
    }

    function resetProgressbar() {
      $bar.css({
        width: 0 + '%'
      });
      clearTimeout(tick);
    }

    startProgressbar();
    $('.slider-nav, .slider-main__item, .slick-dots, .slider-aside__item').click(function () {
      startProgressbar();
    });
    $('.js-slider-aside').slick({
      slidesToShow: 7,
      slidesToScroll: 1,
      focusOnSelect: true,
      centerMode: true,
      arrows: false,
      asNavFor: '.js-slider-main',
      responsive: [{
        breakpoint: 992,
        settings: {
          slidesToShow: 5
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      }]
    });
  };
  /* Слайдер в карточке товара */


  var goodsSlider = function goodsSlider() {
    $('.js-goods-slider-main').slick({
      asNavFor: '.js-goods-slider-aside',
      slidesToShow: 1,
      slidesToScroll: 1,
      fade: true,
      prevArrow: '.goods-slider__nav--prev',
      nextArrow: '.goods-slider__nav--next ',
      responsive: [{
        breakpoint: 992,
        settings: {
          arrows: false
        }
      }]
    });
    $('.js-goods-slider-aside').slick({
      asNavFor: '.js-goods-slider-main',
      slidesToShow: 5,
      slidesToScroll: 1,
      focusOnSelect: true,
      centerMode: true,
      arrows: false,
      responsive: [{
        breakpoint: 500,
        settings: {
          slidesToShow: 3
        }
      }]
    });
  };
  /* Popup окно */


  var popupLink = function popupLink() {
    $('.popup-link').magnificPopup({
      showCloseBtn: false,
      type: 'inline',
      midClick: true,
      mainClass: 'mfp-fade',
      removalDelay: 350
    });
    $(document).on('click', '.popup__close', function () {
      $.magnificPopup.close();
    });
  };
  /* Галерея в карточке товара */


  var goodsGallery = function goodsGallery() {
    $('.popup-gallery').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  };
  /* Табы (вкладки) */


  var tabs = function tabs() {
    $("ul.tabs__caption").on("click", "li:not(.active)", function () {
      $(this).addClass("active").siblings().removeClass("active").closest("div.tabs").find("div.tabs__content").removeClass("active").eq($(this).index()).addClass("active");
    });
  };
  /* Просмотренные-товары-Слайдер */


  var viewedSlider = function viewedSlider() {
    $('.viewed__wrapper').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      infinite: false,
      prevArrow: '.viewed__arrow--prev',
      nextArrow: '.viewed__arrow--next',
      responsive: [{
        breakpoint: 1200,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 992,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 480,
        settings: {
          slidesToShow: 1
        }
      }]
    }).on('setPosition', function (event, slick) {
      slick.$slides.css('height', slick.$slideTrack.height() + 'px');
    });
  };
  /* Валидация */


  var formValidate = function formValidate() {
    jQuery.validator.addMethod("minlenghtphone", function (value) {
      return value.replace(/\D+/g, '').length > 10;
    });
    $('form').each(function () {
      $(this).on('submit', function () {
        $(this).validate({
          rules: {
            firstname: 'required',
            fio: 'required',
            phone: {
              required: true,
              minlenghtphone: true
            },
            phone_2: {
              required: true,
              minlenghtphone: true
            },
            username: 'required',
            password: 'required',
            confirm_password: 'required',
            email: 'required',
            email_2: 'required',
            email_3: 'required',
            post: 'required',
            file: 'required',
            message: 'required',
            message_2: 'required',
            agree: 'required',
            delivery_date: 'required',
            time_of_delivery: 'required'
          },
          onkeyup: false,
          messages: {
            firstname: 'Введите ваше имя',
            fio: 'Поле "Ф.И.О." обязательно для заполнения',
            phone: 'Введите ваш телефон',
            phone_2: 'Поле "Телефон" обязательно для заполнения',
            username: 'Введите имя пользователя',
            password: 'Введите пароль',
            confirm_password: 'Введите пароль',
            email: 'Введите адрес электронной почты',
            email_2: 'Ваш e-mail',
            email_3: 'Поле "E-Mail" обязательно для заполнения',
            post: 'Укажите желаемую должность',
            file: 'Выберите файл',
            message: 'Заполните текст сообщения',
            message_2: 'Поле "Текст сообщения" обязательно для заполнения',
            agree: 'Согласитесь с нашими условиями',
            delivery_date: 'Поле "Желаемая дата доставки" обязательно для заполнения',
            time_of_delivery: 'Поле "Желаемое время доставки" обязательно для заполнения'
          }
        });

        if ($(this).valid()) {
          var wrap = $(this)[0].closest('.popup__sending');

          if (wrap) {
            $(wrap).siblings('.popup__success').show();
            $(wrap).hide();
          }
        }

        return false;
      });
    });
  };
  /* Увеличить и уменьшить значение в поле input (Counter) */


  var counter = function counter() {
    $('.counter__btn--minus').click(function () {
      var $input = $(this).parent().find('input');
      var count = parseInt($input.val()) - 1;
      count = count < 1 ? 1 : count;
      $input.val(count);
      $input.change();
      return false;
    });
    $('.counter__btn--plus').click(function () {
      var $input = $(this).parent().find('input');
      $input.val(parseInt($input.val()) + 1);
      $input.change();
      return false;
    });
  };
  /* Табы (вкладки) */


  var tab = function tab() {
    $("ul.tab__caption").on("click", "li:not(.active)", function () {
      $(this).addClass("active").siblings().removeClass("active").closest("div.tab").find("div.tab__content").removeClass("active").eq($(this).index()).addClass("active");
    });
  };
  /* Открытие контента при клике */


  var toggle = function toggle() {
    $(document).on('click', '.toggle', function () {
      $(this).parent().addClass('open');
    });
    $(document).on('click', '.clear', function () {
      $(this).parent().removeClass('open');
    });
  };
  /* Скрытие блока с заменой текста */


  var characteristics = function characteristics() {
    $(document).on('click', '.characteristics__toggle', function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).next().slideUp();
        $(this).text('Характеристики');
      } else {
        $(this).addClass('active');
        $(this).next().slideDown();
        $(this).text('Скрыть');
      }
    });
  };
  /* Очистка поиска */


  var clearSearchForm = function clearSearchForm() {
    $(document).on('click', '.clear', function () {
      $('.input').val('');
    });
  };
  /* Фильтр */


  var filterBlock = function filterBlock() {
    $(document).on('click', '.filter-block__header', function () {
      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).next().slideUp();
      } else {
        $(this).addClass('active');
        $(this).next().slideDown();
      }
    });
  };
  /* Фильтр-Слайдер */


  var filterSliider = function filterSliider() {
    $(".filter-slider__range").each(function () {
      var slider = $(this)[0],
          sliderFrom = $(this).parent().find(".filter-slider__value--from")[0],
          sliderTo = $(this).parent().find(".filter-slider__value--to")[0],
          inputs = [sliderFrom, sliderTo],
          type = $(this).data('range-type');

      if (type === "price") {
        noUiSlider.create(slider, {
          start: [9.90, 264.80],
          connect: true,
          range: {
            min: 9.90,
            max: 264.80
          },
          format: wNumb({
            decimals: 2,
            thousand: ' '
          })
        });
      } else if (type === 'weight') {
        noUiSlider.create(slider, {
          start: [0, 5],
          connect: true,
          range: {
            min: 0,
            max: 5
          },
          format: wNumb({
            decimals: 0
          })
        });
      }

      slider.noUiSlider.on("update", function (values, handle) {
        inputs[handle].value = values[handle];
      });
      inputs.forEach(function (input, handle) {
        input.addEventListener('change', function () {
          slider.noUiSlider.setHandle(handle, this.value);
        });
      });
    });
  };
  /* Модальное окно на чистом js */


  var modal = function modal() {
    var body = document.querySelector('body');

    var closestItemByClass = function closestItemByClass(item, className) {
      var node = item;

      while (node) {
        if (node.classList.contains(className)) {
          return node;
        }

        node = node.parentElement;
      }

      return null;
    };

    var closestAttr = function closestAttr(item, attr) {
      var node = item;

      while (node) {
        var attrValue = node.getAttribute(attr);

        if (attrValue) {
          return attrValue;
        }

        node = node.parentElement;
      }

      return null;
    };

    var showModal = function showModal(target) {
      target.classList.add('is-active');
    };

    var closeModal = function closeModal(target) {
      target.classList.remove('is-active');
    };

    var toggleScroll = function toggleScroll() {
      body.classList.toggle('no-scroll');
    };

    body.addEventListener('click', function (e) {
      var target = e.target;
      var modalClass = closestAttr(target, 'data-modal');

      if (modalClass === null) {
        return;
      }

      e.preventDefault();
      var modal = document.querySelector('.' + modalClass);

      if (modal) {
        showModal(modal);
        toggleScroll();
      }
    });
    body.addEventListener('click', function (e) {
      var target = e.target;

      if (target.classList.contains('modal__close') || target.classList.contains('modal__inner')) {
        console.log(target);
        var modal = closestItemByClass(target, 'modal');
        closeModal(modal);
        toggleScroll();
      }
    });
    body.addEventListener('keydown', function (e) {
      if (e.keyCode !== 27) {
        return;
      }

      var modal = document.querySelector('.modal.is-active');

      if (modal) {
        closeModal(modal);
        toggleScroll();
      }
    });
  };
  /* Popup zoom */


  var zoomLink = function zoomLink() {
    $('.zoom-link').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      fixedContentPos: true,
      mainClass: 'mfp-no-margins mfp-with-zoom',
      image: {
        verticalFit: true
      },
      zoom: {
        enabled: true,
        duration: 300
      }
    });
  };
  /* Заказ */


  var order = function order() {
    $(document).on('click', '.order__toggle', function () {
      $(this).parent().toggleClass('order--open');
    });
    $(document).on('click', '.order__shadow', function () {
      $('.order__toggle').click();
    });
  };
  /* Фильтр */


  var mobileFilter = function mobileFilter() {
    $(document).on('click', '.tab__filter-toggle', function () {
      $(this).parent().toggleClass('tab__filter--open');
    });
    $(document).on('click', '.tab__filter-shadow', function () {
      $('.tab__filter-toggle').click();
    });
  };
  /* headerFixedSearch */


  var headerFixedSearch = function headerFixedSearch() {
    $(document).on('click', '.header-fixed__toggle', function () {
      $(this).parent().toggleClass('header-fixed__search--open');
      $('html').addClass('fixed');
    });
    $(document).on('click', '.header-fixed__close', function () {
      $(this).closest('.header-fixed__search').removeClass('header-fixed__search--open');
      $('html').removeClass('fixed');
    });
    $(document).on('click', '.header-fixed__shadow', function () {
      $('.header-fixed__toggle').click();
      $('html').removeClass('fixed');
    });
  };
  /* Поиск */


  var searchInput = function searchInput() {
    var searchField = $('.input');
    searchField.keyup(function () {
      if ($(this).val().length > 2) {
        $(this).closest('.search').addClass('active');
      } else {
        $(this).closest('.search').removeClass('active');
      }
    });
    searchField.blur(function () {
      if ($(this).val().length > 2) {
        $(this).closest('.search').removeClass('active');
      }
    });
    searchField.focus(function () {
      if ($(this).val().length > 2) {
        $(this).closest('.search').addClass('active');
      }
    });
  };
  /* Скролл до верха */


  var scrollTop = function scrollTop() {
    $('.scroll-top').click(function () {
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
    });
    $(window).scroll(function () {
      if ($(window).scrollTop() > 300) {
        $('.scroll-top').addClass('active');
      } else {
        $('.scroll-top').removeClass('active');
      }
    });
  };
  /* Всплывающая шапка при скролле вверх */


  var headerFixed = function headerFixed() {
    var tempScrollTop,
        currentScrollTop = $(window).scrollTop();
    $(window).scroll(function () {
      currentScrollTop = $(window).scrollTop();

      if (currentScrollTop > $('.header-fixed, .header-mobile').height()) {
        $('body').addClass('fixed');

        if (tempScrollTop > currentScrollTop) {
          $('.header-fixed, .header-mobile').addClass('show');
        } else {
          $('.header-fixed, .header-mobile').removeClass('show');
        }
      } else {
        $('body').removeClass('fixed');
        $('.header-fixed, .header-mobile').removeClass('show');
      }

      tempScrollTop = currentScrollTop;
    });
  };
  /* Мобильное меню */


  var menuMobile = function menuMobile() {
    $(document).on('click', '.menu-mobile__toggle', function () {
      $(this).parent().toggleClass('menu-mobile--open');
      $('html').addClass('fixed');
    });
    $(document).on('click', '.menu-mobile__shadow', function () {
      $('.menu-mobile__toggle').click();
      $('html').removeClass('fixed');
      $('.menu-mobile__item').removeClass('menu-mobile__item--open');
      $('.submenu-mobile__item').removeClass('submenu-mobile__item--open');
    });
    $(document).on('click', '.menu-mobile__link', function () {
      $(this).parent().toggleClass('menu-mobile__item--open');
    });
    $(document).on('click', '.submenu-mobile__back', function () {
      $(this).closest('.menu-mobile__item').removeClass('menu-mobile__item--open');
    });
    $(document).on('click', '.submenu-mobile__link ', function () {
      $(this).parent().toggleClass('submenu-mobile__item--open');
    });
    $(document).on('click', '.sub-submenu-mobile__back', function () {
      $(this).closest('.submenu-mobile__item').removeClass('submenu-mobile__item--open');
    });
  };
  /* Фиксированный блок в сайдбаре */


  window.addEventListener("load", function () {
    var sticky = document.querySelector('.fixed-block');
    var footer = document.querySelector('footer');
    var origOffsetY = sticky.offsetTop;
    var footerOffsetY = footer.offsetTop;
    document.addEventListener('scroll', function (e) {
      if (window.scrollY >= origOffsetY + sticky.parentNode.offsetTop) {
        sticky.classList.add('stick-top');
      } else {
        sticky.classList.remove('stick-top');
      }

      if (window.scrollY + sticky.offsetHeight + 0 >= footerOffsetY) {
        sticky.classList.add('stick-bottom');
      } else {
        sticky.classList.remove('stick-bottom');
      }
    });
  });
  /* Accordion */

  var accordion = function accordion() {
    $('.accordion__header').on('click', function (e) {
      e.preventDefault();

      if ($(this).hasClass('active')) {
        $(this).removeClass('active');
        $(this).next().stop().slideUp(300);
      } else {
        $(this).addClass('active');
        $(this).next().stop().slideDown(300);
      }
    });
  };
  /* Рейтинг звезд */


  var ratingItemList = document.querySelectorAll('.rating__item');
  var ratingItemArray = Array.prototype.slice.call(ratingItemList);
  ratingItemArray.forEach(function (item) {
    return item.addEventListener('click', function () {
      var itemValue = item.dataset.itemValue;
      item.parentNode.dataset.totalValue = itemValue;
    });
  });
  /* Удаление товара из корзины */

  var basketProductRemove = function basketProductRemove() {
    $(document).on('click', '.order-body__close', function () {
      if ($(this).closest('.order-body__content').find('.order-body__product').length === 1) {
        $(this).closest('.order-body__content').remove();
      }

      $(this).closest('.order-body__product').remove();
    });
  };
  /* Показать пароль по иконке */


  var toggleShowPassword = function toggleShowPassword() {
    $(document).on('click', '.form__password', function () {
      var inp = $(this).siblings('input');

      if (inp.attr('type') === 'text') {
        inp.attr('type', 'password');
        $(this).addClass('view');
      } else {
        inp.attr('type', 'text');
        $(this).removeClass('view');
      }

      return false;
    });
  };
  /* Оформление заказа */


  var orderingStep = function orderingStep() {
    var tabNav = document.querySelectorAll('.ordering-toggle'),
        tabContent = document.querySelectorAll('.ordering-body'),
        tabName;
    tabNav.forEach(function (item) {
      item.addEventListener('click', selectTabNav);
    });

    function selectTabNav() {
      tabNav.forEach(function (item) {
        item.classList.remove('is-active');
      });
      this.classList.add('is-active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    }

    function selectTabContent(tab) {
      tabContent.forEach(function (item) {
        var classList = item.classList;
        classList.contains(tab) ? classList.add('is-active') : classList.remove('is-active');
      });
    }
  };
  /* Выбор доставки */


  var orderingDelivery = function orderingDelivery() {
    var tabNav = document.querySelectorAll('.ordering-item--delivery'),
        tabContent = document.querySelectorAll('.ordering-body__aside--delivery'),
        tabName;
    tabNav.forEach(function (item) {
      item.addEventListener('click', selectTabNav);
    });

    function selectTabNav() {
      tabNav.forEach(function (item) {
        item.classList.remove('is-active');
      });
      this.classList.add('is-active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    }

    function selectTabContent(tab) {
      tabContent.forEach(function (item) {
        var classList = item.classList;
        classList.contains(tab) ? classList.add('is-active') : classList.remove('is-active');
      });
    }
  };
  /* Выбор оплаты */


  var orderingPayment = function orderingPayment() {
    var tabNav = document.querySelectorAll('.ordering-item--payment'),
        tabContent = document.querySelectorAll('.ordering-body__aside--payment'),
        tabName;
    tabNav.forEach(function (item) {
      item.addEventListener('click', selectTabNav);
    });

    function selectTabNav() {
      tabNav.forEach(function (item) {
        item.classList.remove('is-active');
      });
      this.classList.add('is-active');
      tabName = this.getAttribute('data-tab-name');
      selectTabContent(tabName);
    }

    function selectTabContent(tab) {
      tabContent.forEach(function (item) {
        var classList = item.classList;
        classList.contains(tab) ? classList.add('is-active') : classList.remove('is-active');
      });
    }
  };

  simpleBar();
  slider();
  tabs();
  viewedSlider();
  formValidate();
  tab();
  toggle();
  characteristics();
  filterBlock();
  filterSliider();
  popupLink();
  zoomLink();
  order();
  mobileFilter();
  headerFixedSearch();
  searchInput();
  scrollTop();
  headerFixed();
  menuMobile();
  goodsSlider();
  goodsGallery();
  clearSearchForm();
  accordion();
  counter();
  basketProductRemove();
  toggleShowPassword();
  orderingStep();
  orderingDelivery();
  orderingPayment();
  modal();
});
ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [51.821601, 107.627046],
    zoom: 12,
    controls: ['zoomControl']
  });
  var myGeoObjects = [];
  myGeoObjects[0] = new ymaps.Placemark([51.8169, 107.6892], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Пищевая ул., 19, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-3, -42]
  });
  myGeoObjects[1] = new ymaps.Placemark([51.8121, 107.6636], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>ул. Жердева, 104Б, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-23, -42]
  });
  myGeoObjects[2] = new ymaps.Placemark([51.8094, 107.5969], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>ул. Бабушкина, 34, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[3] = new ymaps.Placemark([51.8069, 107.6275], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>ул. Павлова, 57А, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[4] = new ymaps.Placemark([51.8659, 107.7227], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Столичная ул., 4, микрорайон Загорск, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[5] = new ymaps.Placemark([51.8042, 107.6539], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>ул. Мокрова, 30, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[6] = new ymaps.Placemark([51.8203, 107.6585], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Ключевская ул., 76А, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[7] = new ymaps.Placemark([51.8265, 107.5897], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>ул. Балтахинова, 15, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[8] = new ymaps.Placemark([51.8663, 107.7450], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>ул. Туполева, 6, микрорайон Восточный, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[9] = new ymaps.Placemark([51.7882, 107.5924], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>ул. Бабушкина, 200, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[10] = new ymaps.Placemark([51.8451, 107.5178], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Кабанская ул., 8, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[11] = new ymaps.Placemark([51.8513, 107.5927], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>ул. Дзержинского, 1, микрорайон Лысая Гора, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[12] = new ymaps.Placemark([51.8427, 107.6351], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Ботаническая ул., 7А, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[13] = new ymaps.Placemark([51.8474, 107.6101], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Комсомольская ул., 3а, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[14] = new ymaps.Placemark([51.8216, 107.6011], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Толстого ул., 2, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[15] = new ymaps.Placemark([51.8516, 107.5756], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Гагарина ул., 64, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[16] = new ymaps.Placemark([51.8411, 107.5761], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Борсоева ул., 69а, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[17] = new ymaps.Placemark([51.8492, 107.6305], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Норильская ул., 12б, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[18] = new ymaps.Placemark([51.8399, 107.5793], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Борсоева ул., 27, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[19] = new ymaps.Placemark([51.7726, 107.5875], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>112 мкр-н, Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-16, -42]
  });
  myGeoObjects[20] = new ymaps.Placemark([51.8226, 107.6407], {
    clusterCaption: 'Заголовок',
    balloonContentBody: 'Супермаркет,</br>Ключевская ул, 45 Улан-Удэ, Россия'
  }, {
    iconLayout: 'default#image',
    iconImageHref: 'static/images/general/map.png',
    iconImageSize: [35, 35],
    iconImageOffset: [-3, -42]
  });
  var clusterIcons = [{
    href: 'static/images/general/map.png',
    size: [31, 40],
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
    } else {
      myMap.behaviors.enable('scrollZoom');
    }
  });
  clusterer.add(myGeoObjects);
  myMap.geoObjects.add(clusterer);
} // Полифилы
// forEach IE 11


if ('NodeList' in window && !NodeList.prototype.forEach) {
  console.info('polyfill for IE11');

  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;

    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
} // closest IE 11


(function () {
  if (!Element.prototype.closest) {
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})(); // matches IE 11


(function () {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})(); //Array.form IE 11


if (!Array.from) {
  Array.from = function (object) {
    'use strict';

    return [].slice.call(object);
  };
}