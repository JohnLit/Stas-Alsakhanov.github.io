"use strict";

$(document).ready(function () {
  svg4everybody({});
  /* Выпадающее меню */

  var catalogNavHover = function catalogNavHover() {
    $('.catalog-nav__item').hover(function () {
      var parentList = $(this).closest('.catalog-nav__list');

      if ($(this).children('.catalog-nav__list').length) {
        var catNavHeight = $(this).children('.catalog-nav__list').outerHeight();

        if (parentList.outerHeight() < catNavHeight) {
          parentList.css('height', catNavHeight);
        }

        parentList.css('width', '520');
      }
    }, function () {
      var parentList = $(this).closest('.catalog-nav__list');
      parentList.css('height', 'auto');
      parentList.css('width', 'auto');
    });
  };
  /* Поиск */


  var openSearchForm = function openSearchForm() {
    $(document).on('click', '.search__icon', function () {
      $(this).parent().addClass('search--open');
    });
  };

  var clearSearchForm = function clearSearchForm() {
    $(document).on('click', '.search__clear', function () {
      $('.search__input').val('');
    });
  };
  /* Слайдер */


  var bannerSlider = function bannerSlider() {
    $('.js-banner').slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      prevArrow: ".banner__navigation--prev",
      nextArrow: '.banner__navigation--next',
      dots: true,
      customPaging: function customPaging(slider, i) {
        return '<div class="banner__dot"></div>';
      },
      appendDots: '.banner__dots',
      responsive: [{
        breakpoint: 768,
        settings: {
          arrows: false
        }
      }]
    });
  };
  /* Табы (вкладки) */


  var tabs = function tabs() {
    $('.tabs-navigation__item').click(function () {
      var tabName = $(this).attr('show-tab'),
          tabsBody = $(this).closest('.tabs').find('.tabs__body')[0],
          tab = $(tabsBody).find('.' + tabName);
      $(this).addClass('tabs-navigation__item--active').siblings().removeClass('tabs-navigation__item--active');
      $(tab).addClass('tab--active').siblings().removeClass('tab--active');

      if ($(tabsBody).find('.js-products-line-slider').length) {
        $('.js-products-line-slider').each(function () {
          $(this).slick('refresh');
        });
        $('.js-product-prev__slider').each(function () {
          $(this).slick('refresh');
        });
      }
    });
  };
  /* Слайдер в карточке товара */


  var productPrevSlider = function productPrevSlider() {
    $('.js-product-prev__slider').each(function (idx) {
      var productPrevSliderClass = "product-prev-slider-" + idx;
      this.closest('.product-prev').classList.add(productPrevSliderClass);
      $(this).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true,
        arrows: false,
        appendDots: '.' + productPrevSliderClass + ' .product-prev__colors',
        swipe: false,
        infinite: false,
        customPaging: function customPaging(slider, i) {
          var color = $(slider.$slides[i]).data('color');

          if (color === '#ffffff') {
            return '<div class="product-prev__color product-prev__color--white" style="background-color:' + color + '"></div>';
          } else {
            return '<div class="product-prev__color" style="background-color:' + color + '"></div>';
          }
        }
      });
    });
  };
  /* Слайдер в табах (вкладках) */


  var productLineSlider = function productLineSlider() {
    $('.js-products-line-slider').each(function (idx) {
      var productsLineSliderID = "products-line-slider-" + idx;
      this.closest('.products-line-slider').id = productsLineSliderID;
      $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        dots: true,
        appendDots: '#' + productsLineSliderID + ' .products-line-slider__dots',
        prevArrow: '#' + productsLineSliderID + ' .products-line-slider__btn--prev',
        nextArrow: '#' + productsLineSliderID + ' .products-line-slider__btn--next',
        customPaging: function customPaging(slider, i) {
          return '<div class="products-line-slider__dot"></div>';
        },
        responsive: [{
          breakpoint: 1140,
          settings: {
            slidesToShow: 3
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 550,
          settings: {
            slidesToShow: 1
          }
        }]
      });
    });
  };
  /* Слайдер во внутренней страницы */


  var productBorderLineSlider = function productBorderLineSlider() {
    $('.js-products-border-line-slider').each(function (idx) {
      var productsBorderLineSliderID = "products-border-line-slider" + idx;
      this.closest('.products-border-line-slider').id = productsBorderLineSliderID;
      $(this).slick({
        slidesToShow: 4,
        slidesToScroll: 1,
        infinite: false,
        prevArrow: '#' + productsBorderLineSliderID + ' .products-border-line-slider__btn--prev',
        nextArrow: '#' + productsBorderLineSliderID + ' .products-border-line-slider__btn--next',
        responsive: [{
          breakpoint: 1140,
          settings: {
            slidesToShow: 3
          }
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        }, {
          breakpoint: 550,
          settings: {
            slidesToShow: 1
          }
        }]
      });
    });
  };
  /* Мобильное меню */


  var mobileMenu = function mobileMenu() {
    $(document).on('click', '.mobile-menu__toggle', function () {
      $(this).parent().addClass('mobile-menu--open');
    });
    $(document).on('click', '.mobile-menu__close', function () {
      $(this).closest('.mobile-menu').removeClass('mobile-menu--open');
    });
  };
  /* Функция для перекидки сертификата на разрешении экрана под планшеты */


  var brandInfo = function brandInfo() {
    if (window.innerWidth < 1140 && window.innerWidth > 767) {
      $('.brand__certificates').appendTo('.brand-info__tablet');
    } else {
      $('.brand__certificates').appendTo('.brand-info');
    }
  };
  /* Категория-слайдер */


  var categorySlider = function categorySlider() {
    $('.js-category-slider').slick({
      slidesToShow: 6,
      dots: true,
      arrows: false,
      infinite: false,
      appendDots: '.category-slider__dots',
      customPaging: function customPaging(slider, i) {
        return '<div class="category-slider__dot"></div>';
      },
      responsive: [{
        breakpoint: 1140,
        settings: {
          slidesToShow: 4
        }
      }, {
        breakpoint: 768,
        settings: {
          slidesToShow: 3
        }
      }, {
        breakpoint: 550,
        settings: {
          slidesToShow: 2
        }
      }, {
        breakpoint: 400,
        settings: {
          slidesToShow: 1
        }
      }]
    });
  };
  /* функция для скрытия li в меню header__top на планшетном разрешении экрана */


  var tabletSubnavMenu = function tabletSubnavMenu() {
    $(document).on('click', '.inform-nav__tablet-toggle', function () {
      $(this).toggleClass('inform-subnav--open');
    });
  };
  /* Селект */


  var select = function select() {
    $(document).on('click', '.select__header', function () {
      $(this).parent().toggleClass('select--open');
    });
    $(document).on('click', '.select-list__item', function () {
      $(this).closest('.select').removeClass('select--open');
      var current = $(this).closest('.select').find('.select__current')[0];
      $(current).text($(this).text());
    });
  };
  /* Фильтр */


  var filterToggle = function filterToggle() {
    $(document).on('click', '.filter-mobile__toggle', function () {
      $('.filter').addClass('filter--open');
    });
    $(document).on('click', '.filter-mobile__close', function () {
      $('.filter').removeClass('filter--open');
    });
  };
  /* Цвета в фильтре */


  var colorClicked = function colorClicked() {
    $(document).on('click', '.color-list__item', function () {
      $(this).addClass('color-list__item--active').siblings().removeClass('color-list__item--active');
    });
  };
  /* Карточка товара */


  var productSlider = function productSlider() {
    $('.js-product-slider-dots').slick({
      asNavFor: '.js-product-slider',
      slidesToShow: 3,
      slidesToScroll: 1,
      vertical: true,
      infinite: false,
      focusOnSelect: true,
      prevArrow: '.product-slider-dots__btn--prev',
      nextArrow: '.product-slider-dots__btn--next'
    });
    $('.js-product-slider').slick({
      asNavFor: '.js-product-slider-dots',
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: false,
      arrows: false
    });
  };
  /* Скролл вниз до нужного блока */


  var scrollToElement = function scrollToElement() {
    $('.scroll-link').not('[href="#"]').not('[href="#0"]').click(function (event) {
      if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

        if (target.length) {
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top - 50
          }, 1000, function () {
            var $target = $(target);
            $target.focus();

            if ($target.is(":focus")) {
              return false;
            } else {
              $target.attr('tabindex', '-1');
              $target.focus();
            }

            ;
          });
        }
      }
    });
  };
  /* Боковой скролл */


  var productDetailWidth = function productDetailWidth() {
    var detailArr = $('.product-details-navigation__item'),
        detailWidth = 0;

    for (var i = 0; i < detailArr.length; i++) {
      detailWidth = detailWidth + detailArr[i].offsetWidth;
    }

    ;
    $('.product-details-navigation').css('min-width', detailWidth);
  };
  /* Функция для перекидки product-info__footer в product__header на разрешении экрана под планшеты */


  var productDetailTablet = function productDetailTablet() {
    if ($(window).innerWidth() < 1140) {
      $('.product-info__footer').appendTo('.product__header');
      $('.product-info__header').prependTo('.product__header');
    } else {
      $('.product-info__footer').appendTo('.product-info');
      $('.product-info__header').prependTo('.product-info');
    }
  };

  catalogNavHover();
  openSearchForm();
  clearSearchForm();
  bannerSlider();
  tabs();
  productPrevSlider();
  productLineSlider();
  productBorderLineSlider();
  mobileMenu();
  brandInfo();
  categorySlider();
  tabletSubnavMenu();
  select();
  filterToggle();
  colorClicked();
  productSlider();
  scrollToElement();
  productDetailWidth();
  productDetailTablet();
}); // Preloader 

$(window).on('load', function () {
  $(".sk-circle").fadeOut();
  $(".preloader").delay(400).fadeOut("slow");
  $("body").removeClass("fixed");
});
$(window).on('resize', function () {
  var brandInfo = function brandInfo() {
    if (window.innerWidth < 1140 && window.innerWidth > 767) {
      $('.brand__certificates').appendTo('.brand-info__tablet');
    } else {
      $('.brand__certificates').appendTo('.brand-info');
    }
  };

  brandInfo();
}); // Полифилы
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