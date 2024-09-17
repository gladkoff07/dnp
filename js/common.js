"use strict";

$(function () {
  // Mask
  $("input[name='phone']").mask("+7(999) 999-99-99");

  // phone box
  $('.js-phone-action').on('click', function () {
    $(this).find('.block-phone__action').toggleClass('block-phone__action--active');
    $(this).closest('.block-phone').find('.phone-messenger').toggleClass('phone-messenger--active');
  });

  // fix header 
  var $window = $(window),
    $target = $(".header"),
    $targetAction = $(".intro, .main"),
    $h = $targetAction.offset().top;
  $window.on('scroll', function () {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > $h) {
      $target.addClass("header--fixed");
    } else {
      $target.removeClass("header--fixed");
    }
  });

  // media
  function mediaSize_1279() {
    if (window.matchMedia('(max-width: 1279px)').matches) {
      $('.header').find('.nav').removeClass('header__nav').appendTo('.menu-mobile__nav');
    } else {
      $('.menu-mobile').find('.nav').addClass('header__nav').insertAfter('.header .logo');
      $('.menu-mobile').removeClass('menu-mobile--active');
      $('body').removeClass('body-fixed');
    }
  }
  ;
  mediaSize_1279();
  /* Attach the function to the resize event listener */
  window.addEventListener('resize', mediaSize_1279);

  // media
  function mediaSize_767() {
    if (window.matchMedia('(max-width: 767px)').matches) {
      var listName = $('.list-practice__name');
      listName.each(function () {
        $(this).closest('.list-practice__box').prepend($(this));
      });
      $('.list-practice__text-header').addClass('js-change-list-areas');
    } else {
      var _listName = $('.list-practice__name');
      _listName.each(function () {
        $(this).closest('.list-practice__box').find('.list-practice__content').prepend($(this));
      });
      $('.list-practice__text-header').removeClass('js-change-list-areas');
    }
  }
  ;
  mediaSize_767();
  /* Attach the function to the resize event listener */
  window.addEventListener('resize', mediaSize_767);

  // media
  function mediaSize_574() {
    if (window.matchMedia('(max-width: 574px)').matches) {
      $('.block-phone__action').removeClass('js-phone-action');
    } else {
      $('.block-phone__action').addClass('js-phone-action');
    }
  }
  ;
  mediaSize_574();
  /* Attach the function to the resize event listener */
  window.addEventListener('resize', mediaSize_574);

  // mob menu open
  $('.js-mobile-button').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('mobile-button--active');
    $('.menu-mobile').toggleClass('menu-mobile--active');
    $('body').toggleClass('body-fixed');
  });

  // close mobile menu
  $('.js-menu-close').on('click', function () {
    $('.menu-mobile').removeClass('menu-mobile--active');
    $('body').removeClass('body-fixed');
  });

  // js-change-description-text
  $('.js-change-description-text').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('project__description-link--active');
    $(this).prev('.project__description-text').toggleClass('project__description-text--active');
  });

  // js-change-list-areas
  $('.list-practice__change-text').on('click', function (e) {
    e.preventDefault();
    $(this).toggleClass('list-practice__change-text--active');
    $(this).closest('.list-practice__content').find('.list-practice__text').toggleClass('list-practice__text--active');
  });

  // js-change-state
  $('.js-change-state').on('click', function () {
    $(this).toggleClass('button-messenger-base--active');
    $(this).closest('.button-messenger').find('.button-messenger-item--whatsapp').toggleClass('button-messenger-item--active-wh');
    $(this).closest('.button-messenger').find('.button-messenger-item--telegram').toggleClass('button-messenger-item--active-tg');
  });

  // valid email
  function validateEmail(email) {
    var reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(email);
  }

  // form
  $('.form').submit(function () {
    return false;
  });
  $('.submit-js').on('click', function () {
    var name = $(this).closest('.form').find('.input-name-js').val();
    var email = $(this).closest('.form').find('.input-email-js').val();
    var phone = $(this).closest('.form').find('.input-phone-js').val();
    var nameVal = name.length;
    var emailVal = validateEmail(email);
    var phoneVal = phone.length;
    if (nameVal < 3) {
      $(this).closest('.form').find('.input-name-js').addClass("form__input--error").next('.form__error').addClass('form__error--active');
    } else if (nameVal >= 3) {
      $(this).closest('.form').find('.input-name-js').removeClass("form__input--error").next('.form__error').removeClass('form__error--active');
    }
    if (emailVal === false) {
      $(this).closest('.form').find('.input-email-js').addClass("form__input--error").next('.form__error').addClass('form__error--active');
    } else if (emailVal === true) {
      $(this).closest('.form').find('.input-email-js').removeClass("form__input--error").next('.form__error').removeClass('form__error--active');
    }
    if (phoneVal < 10) {
      $(this).closest('.form').find('.input-phone-js').addClass("form__input--error").next('.form__error').addClass('form__error--active');
    } else if (phoneVal >= 10) {
      $(this).closest('.form').find('.input-phone-js').removeClass("form__input--error").next('.form__error').removeClass('form__error--active');
    }
    if (nameVal >= 3 && emailVal === true && phoneVal >= 10) {
      $.ajax({
        type: 'POST',
        url: '#',
        data: $(this).closest('.form').serialize(),
        success: function success(data) {
          if (data == "true") {
            Fancybox.show([{
              src: "#modal-thanks"
            }]);
            setTimeout(function () {
              return Fancybox.close();
            }, 3000);
            $('.input-name-js').val('');
            $('.input-email-js').val('');
            $('.input-phone-js').val('');
          }
        }
      });
    }
  });

  // animation
  var callback = function callback(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.style.animation = entry.target.dataset.animate;
      }
      //  else {
      //     entry.target.style.animation="none";
      // }
    });
  };

  var options = {
    rootMargin: '50px 0px 0px 0px',
    threshold: 0.2
  };
  var observer = new IntersectionObserver(callback, options);
  var animationItems = document.querySelectorAll('.animate');
  animationItems.forEach(function (item) {
    observer.observe(item);
  });

  // animation about scroll
  var callbackText = function callbackText(entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('about--active');
      }
      //  else {
      //     entry.target.classList.remove('about--active');
      // }
    });
  };

  var optionsText = {
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.3
  };
  var observerAbout = new IntersectionObserver(callbackText, optionsText);
  var animationItemsText = document.querySelectorAll('.about');
  animationItemsText.forEach(function (item) {
    observerAbout.observe(item);
  });

  // hover img
  $(".list-team__img").hover(function () {
    $(this).find(".list-team__picture--second").fadeOut(600);
    // setTimeout(() => { $( this ).find( ".list-team__picture--second" ).fadeOut(600) }, 600);
  }, function () {
    $(this).find(".list-team__picture--second").fadeIn(600);
    // setTimeout(() => { $( this ).find( ".list-team__picture--third" ).fadeIn(600) }, 600);
    // $( this ).find( ".list-team__picture--third" ).delay(800).fadeIn(800);
  });
});

$(window).on('load', function () {
  var $preloader = $('.preloader');
  $preloader.delay(3000).fadeOut('slow');
  var introImg = document.querySelector('.intro__img');
  setTimeout(function () {
    introImg.classList.add('intro__img--animate');
  }, 2000);
  // introImg.classList.add('intro__img--animate');

  var introGrad = document.querySelector('.intro');
  setTimeout(function () {
    introGrad.classList.add('intro--animate');
  }, 2000);
  // introGrad.classList.add('intro--animate');

  var introHeader = document.querySelector('.intro-header');
  setTimeout(function () {
    introHeader.classList.add('intro-header--animate');
  }, 2500);

  // const introDescription = document.querySelector('.intro__description');
  // setTimeout(() => { introDescription.classList.add('intro__description--animate') }, 2500)
});