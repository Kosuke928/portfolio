jQuery(function ($) {
  $(document).ready(function () {
    /*--- ドロワーメニュー ---*/
    $("#js-drawer-open").on("click", function () {
      $(this).children().toggleClass("is-open");
      $("#drawer").fadeToggle(300);
      if ($(this).hasClass("is-open")) {
        $("html, body").css("overflow", "hidden");
      } else {
        $("html, body").removeAttr("style");
      }
    });
    $(".p-dnav__item").on("click", function () {
      $("#js-drawer-open").removeClass("is-open");
    });

    const parentGallery = document.querySelector(".p-slide__wrapper");
    const cloneGallery = parentGallery.cloneNode(true);
    const cloneChildren = cloneGallery.querySelectorAll(".p-slide__slide");
    cloneChildren.forEach((cloneChild) => {
      parentGallery.appendChild(cloneChild.cloneNode(true));
    });

    //Spots Swiper
    var swiper = new Swiper(".works-swiper", {
      loop: true,
      initialSlide: 1,
      slidesPerView: 1.58,
      spaceBetween: 20,
      speed: 500,
      centeredSlides: true,
      scrollbar: {
        el: '.p-slide__bar',
        hide: false,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      breakpoints: {
        512: {
          spaceBetween: 25,
          slidesPerView: 2,
        },
        768: {
          spaceBetween: 30,
          slidesPerView: 2.4,
        },
        1000: {
          spaceBetween: 45,
          slidesPerView: 2.6,
        },
        1280: {
          spaceBetween: 45,
          slidesPerView: 2.85,
        },
      },
    });
  });
});
