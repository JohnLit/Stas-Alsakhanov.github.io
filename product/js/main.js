/* Анимация на чистом js */
const animItems = document.querySelectorAll('.anim-items');
if (animItems.length > 0) {
    window.addEventListener('scroll', animOnScroll);
    function animOnScroll() {
        for (let index = 0; index < animItems.length; index++) {
            const animItem = animItems[index];
            const animItemHeight = animItem.offsetHeight;
            const animItemOffset = offset(animItem).top;
            const animStart = 20;

            let animItemPoint = window.innerHeight - animItemHeight / animStart;
            if (animItemHeight > window.innerHeight) {
                animItemPoint = window.innerHeight - window.innerHeight / animStart;
            }

            if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
                animItem.classList.add('is-active');
            } else {
                if (!animItem.classList.contains('anim-no-hide')) {
                    animItem.classList.remove('is-active');
                }
            }

        }
    }
    function offset(el) {
        const rect = el.getBoundingClientRect(),
            scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
            scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }
    setTimeout(() => {
        animOnScroll();
    }, 300);
}

/* Плавная прокрутка к якорю на JavaScript */
const anchors = document.querySelectorAll('a.scroll-to')

for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
        e.preventDefault()

        const blockID = anchor.getAttribute('href')

        document.querySelector(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    })
}

/* Popup-окно */
    var body = document.querySelector('body');

    var closestItemByClass = function (item, className) {
        var node = item;

        while (node) {
            if (node.classList.contains(className)) {
                return node;
            }

            node = node.parentElement;
        }

        return null;
    };

    var closestAttr = function (item, attr) {
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

    var showPopup = function (target) {
        target.classList.add('is-active');
    }

    var closePopup = function (target) {
        target.classList.remove('is-active');
    }

    var toggleScroll = function () {
        body.classList.toggle('no-scroll');
    }

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

        if (target.classList.contains('popup__close') ||
            target.classList.contains('popup__inner')) {
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

/* Маска телефона */
let inputs = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(inputs);

/* Валидация форм */
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

validateForms('#form1', {  name: { required: true }, tel: { required: true } });
validateForms('#form2', {  name: { required: true }, tel: { required: true } });
validateForms('#form3', {  name: { required: true }, tel: { required: true } });
validateForms('#form4', {  name: { required: true }, tel: { required: true } });
validateForms('#form5', {  name: { required: true }, tel: { required: true } });