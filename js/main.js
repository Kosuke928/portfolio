jQuery(function ($) {
  $(document).ready(function () {
    /*---  ---*/
    var $fixedElement = $(".p-header__logo");
    var $targetElement = $(".p-fv__logo");

    // IntersectionObserverのコールバック関数
    function callback(entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          $fixedElement.fadeIn();
        } else {
          $fixedElement.fadeOut();
        }
      });
    }
    // IntersectionObserverのオプション
    var options = {
      root: null, // ビューポートをルートとして使用
      rootMargin: "0px",
      threshold: 0, // 要素が完全に見えなくなったときにコールバックを呼び出す
    };
    // IntersectionObserverのインスタンスを作成
    var observer = new IntersectionObserver(callback, options);
    // 監視するターゲット要素を設定
    observer.observe($targetElement[0]);

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

    /*--- Swiper ---*/
    const parentGallery = document.querySelector(".p-slide__wrapper");
    const cloneGallery = parentGallery.cloneNode(true);
    const cloneChildren = cloneGallery.querySelectorAll(".p-slide__slide");
    cloneChildren.forEach((cloneChild) => {
      parentGallery.appendChild(cloneChild.cloneNode(true));
    });

    var swiper = new Swiper(".works-swiper", {
      loop: true,
      initialSlide: 1,
      slidesPerView: 1.58,
      spaceBetween: 20,
      speed: 500,
      centeredSlides: true,
      scrollbar: {
        el: ".p-slide__bar",
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

    /*--- ページトップへ戻るボタン ---*/
    let speed = 300;
    $("#js-to-top").hide();
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $("#js-to-top").fadeIn();
      } else {
        $("#js-to-top").fadeOut();
      }
    });
    $("#js-to-top").on("click", function (e) {
      e.preventDefault();
      $("body, html").animate({ scrollTop: 0 }, speed);
    });
  });
});
