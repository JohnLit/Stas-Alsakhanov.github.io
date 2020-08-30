"use strict";

$(document).ready(function () {
  svg4everybody({});
  /* Фиксировання шапка + скролл к секциям */

  var header = $("#header"),
      bannerH = $("#banner").innerHeight(),
      scrollOffset = $(window).scrollTop();
  /* Fixed Header */

  checkScroll(scrollOffset);
  $(window).on("scroll", function () {
    scrollOffset = $(this).scrollTop();
    checkScroll(scrollOffset);
  });

  function checkScroll(scrollOffset) {
    if (scrollOffset >= bannerH - 50) {
      header.addClass("fixed");
    } else {
      header.removeClass("fixed");
    }
  }
  /* Smooth scroll */


  $("[data-scroll]").on("click", function (event) {
    event.preventDefault();
    var blockId = $(this).data('scroll'),
        blockOffset = $(blockId).offset().top;
    $("html, body").animate({
      scrollTop: blockOffset - 50
    }, 700);
  });
  /* Popup-окно */

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

  var showPopup = function showPopup(target) {
    target.classList.add('is-active');
  };

  var closePopup = function closePopup(target) {
    target.classList.remove('is-active');
  };

  var toggleScroll = function toggleScroll() {
    body.classList.toggle('no-scroll');
  };

  body.addEventListener('click', function (e) {
    var target = e.target;
    var popupClass = closestAttr(target, 'data-popup');

    if (popupClass === null) {
      return;
    }

    e.preventDefault();
    var popup = document.querySelector('.' + popupClass);

    if (popup) {
      showPopup(popup);
      toggleScroll();
    }
  });
  body.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('popup-close') || target.classList.contains('popup__inner')) {
      console.log(target);
      var popup = closestItemByClass(target, 'popup');
      closePopup(popup);
      toggleScroll();
    }
  });
  body.addEventListener('keydown', function (e) {
    if (e.keyCode !== 27) {
      return;
    }

    var popup = document.querySelector('.popup.is-active');

    if (popup) {
      closePopup(popup);
      toggleScroll();
    }
  });
  /* Catalog */

  var catalog = document.querySelector('.catalog');

  if (catalog === null) {
    return;
  }

  var removeChildren = function removeChildren(item) {
    while (item.firstChild) {
      item.removeChild(item.firstChild);
    }
  };

  var updateChildren = function updateChildren(item, children) {
    console.log(children);
    removeChildren(item);

    for (var i = 0; i < children.length; i += 1) {
      item.appendChild(children[i]);
    }
  };

  var catalogContent = catalog.querySelector('.catalog__content');
  var catalogNav = catalog.querySelector('.catalog__nav');
  var product = catalog.querySelectorAll('.product');
  catalogNav.addEventListener('click', function (e) {
    var target = e.target;
    var item = closestItemByClass(target, 'catalog__btn');

    if (item === null || item.classList.contains('is-active')) {
      return;
    }

    e.preventDefault();
    var filterValue = item.getAttribute('data-filter');
    var previousBtnActive = catalogNav.querySelector('.catalog__btn.is-active');
    previousBtnActive.classList.remove('is-active');
    item.classList.add('is-active');

    if (filterValue === 'all') {
      updateChildren(catalogContent, product);
      return;
    }

    var filteredItems = [];

    for (var i = 0; i < product.length; i += 1) {
      var current = product[i];

      if (current.getAttribute('data-category') === filterValue) {
        filteredItems.push(current);
      }
    }

    updateChildren(catalogContent, filteredItems);
  });
  /* Product */

  var catalogContent = document.querySelector('.catalog__content');

  if (catalogContent === null) {
    return;
  }

  var changeProductSize = function changeProductSize(target) {
    var productInner = closestItemByClass(target, 'product__inner');
    var previousBtnActive = productInner.querySelector('.product__size.is-active');
    previousBtnActive.classList.remove('is-active');
    target.classList.add('is-active');
  };

  var changeProductOrderInfo = function changeProductOrderInfo(target) {
    var productInner = closestItemByClass(target, 'product__inner');
    var order = document.querySelector('.popup-order');
    var productTitle = productInner.querySelector('.product__title').textContent;
    var productSize = productInner.querySelector('.product__size.is-active ').textContent;
    var productPrice = productInner.querySelector('.product__value').textContent;
    var productImgSrc = productInner.querySelector('.product__img').getAttribute('src');
    order.querySelector('.order-info-title').setAttribute('value', productTitle);
    order.querySelector('.order-info-size').setAttribute('value', productSize);
    order.querySelector('.order-info-price').setAttribute('value', productPrice);
    order.querySelector('.order-product-title').textContent = productTitle;
    order.querySelector('.order-product-price').textContent = productPrice;
    order.querySelector('.popup__size').textContent = productSize;
    order.querySelector('.popup__img').setAttribute('src', productImgSrc);
  };

  catalogContent.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('product__size') && !target.classList.contains('is-active')) {
      e.preventDefault();
      changeProductSize(target);
    }

    if (target.classList.contains('product__btn')) {
      e.preventDefault();
      changeProductOrderInfo(target);
    }
  });
  /* ProductChecker */

  var catalogContent = document.querySelector('.catalog__content');

  if (catalogContent === null) {
    return;
  }

  var changeProductSize = function changeProductSize(target) {
    var productInner = closestItemByClass(target, 'product__inner').textContent;
    var previousBtnActive = productInner.querySelector('.product__size.is-active');
    var checker = productInner.querySelector('.product__checker');
    previousBtnActive.classList.remove('is-active');
    target.classList.add('is-active');
    changeCheckerPosition(target, checker);
  };

  var changeCheckerPosition = function changeCheckerPosition(target, checker) {
    checker.style.transform = 'translate(' + target.offsetLeft + 'px' + ', 0)';
  };

  catalogContent.addEventListener('click', function (e) {
    var target = e.target;

    if (target.classList.contains('product__size')) {
      e.preventDefault();
      changeProductSize(target);
    }
  });
  var timers = {};
  catalogContent.addEventListener('mousemove', function (e) {
    var target = e.target;
    var parent = closestItemByClass(target, 'product__sizes');

    if (parent === null) {
      return;
    }

    var productInner = closestItemByClass(target, 'product__inner');
    var productTitle = productInner.querySelector('.product__title').textContent;

    if (timers[productTitle]) {
      clearTimeout(timers[productTitle]);
    } // currentItem = parent;


    var checker = parent.querySelector('.product__checker');

    if (target.classList.contains('product__size')) {
      changeCheckerPosition(target, checker);
    }
  });
  catalogContent.addEventListener('mouseout', function (e) {
    var target = e.target;
    var parent = closestItemByClass(target, 'product__sizes');

    if (parent === null) {
      return;
    }

    var parent = target.parentNode;
    var activeBtn = parent.querySelector('.product__size.is-active');
    var checker = parent.querySelector('.product__checker');
    var productInner = closestItemByClass(target, 'product__inner');
    var productTitle = productInner.querySelector('.product__title').textContent;

    if (timers[productTitle]) {
      clearTimeout(timers[productTitle]);
    }

    timers[productTitle] = setTimeout(function () {
      changeCheckerPosition(activeBtn, checker);
    }, 150);
  });
  /* Map */

  if (typeof ymaps === 'undefined') {
    return;
  }

  ymaps.ready(function () {
    var myMap = new ymaps.Map('ymap', {
      center: [55.794887, 37.712812],
      zoom: 16
    }, {
      searchControlProvider: 'yandex#search'
    }),
        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      balloonContent: 'г. Москва, Преображенская площадь, 8'
    }, {
      iconLayout: 'default#image',
      iconImageHref: 'static/images/general/marker.png',
      iconImageSize: [61, 65],
      iconImageOffset: [-50, -38]
    });
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom');
  });
  /* Form */

  var forms = document.querySelectorAll('.form-send');

  if (forms.length === 0) {
    return;
  }

  var formSend = function formSend(form) {
    var xhr = new XMLHttpRequest();
    var url = 'mail/mail.php';
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.onload = function () {
      console.log(xhr.response);
    };

    xhr.send();
  };

  for (var i = 0; i < forms.length; i += 1) {
    forms[i].addEventListener('submit', function (e) {
      e.preventDefault();
      var form = e.currentTarget;
      formSend(form);
    });
  }
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