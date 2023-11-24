"use strict";

$(function () {
  // Mask
  $("input[name='phone']").mask("+7(999) 999-99-99");

  // phone box
  $('.js-phone-action').on('click', function () {
    $(this).find('.block-phone__action').toggleClass('block-phone__action--active');
    $(this).closest('.block-phone').find('.phone-messenger').toggleClass('phone-messenger--active');
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
});