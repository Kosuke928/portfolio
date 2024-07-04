jQuery(function ($) {
  $(document).ready(function () {
    /*------------------------------------------------------------
    Intersection Observer（ロゴ）
    ------------------------------------------------------------*/
    let $fixedElement = $(".p-header__logo");
    let $targetElement = $(".p-fv__logo");
    let $headerElement = $(".l-header");
    // IntersectionObserverのコールバック関数
    function callback(entries) {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          $fixedElement.fadeIn();
          $headerElement.addClass("aaa");
        } else {
          $fixedElement.fadeOut();
          $headerElement.removeClass("aaa");
        }
      });
    }
    // IntersectionObserverのオプション
    let options = {
      root: null, // ビューポートをルートとして使用
      rootMargin: "0px",
      threshold: 0, // 要素が完全に見えなくなったときにコールバックを呼び出す
    };
    // IntersectionObserverのインスタンスを作成
    let observer = new IntersectionObserver(callback, options);
    // 監視するターゲット要素を設定
    observer.observe($targetElement[0]);

    /*------------------------------------------------------------
    スムーススクロール
    ------------------------------------------------------------*/
    $("a[href^='#']").on("click", function (e) {
      e.preventDefault();
      const href = $(this).attr("href");
      const point = $(href == "#" || href == "" ? "html" : href);
      const position = point.offset().top - 60;
      $("html, body").animate({ scrollTop: position }, speed, "swing");
    });

    /*------------------------------------------------------------
    ドロワーメニュー
    ------------------------------------------------------------*/
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

    /*------------------------------------------------------------
    Scroll Down(Fv)
    ------------------------------------------------------------*/
    document
      .querySelector(".p-scrolldown")
      .addEventListener("mouseover", function () {
        this.querySelector(".p-scrolldown__text").textContent = "Click!";
      });

    document
      .querySelector(".p-scrolldown")
      .addEventListener("mouseout", function () {
        this.querySelector(".p-scrolldown__text").textContent = "Scroll";
      });
    /*------------------------------------------------------------
    Swiper
    ------------------------------------------------------------*/
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

    /*------------------------------------------------------------
    テキストコピー（id,pass）
    ------------------------------------------------------------*/
    const copyTextElements = document.querySelectorAll(".js-copy-text");
    let tooltipTimeout;

    copyTextElements.forEach(function (element) {
      element.addEventListener("click", function () {
        const textToCopy = this.getAttribute("data-text");
        const textType = this.classList.contains("p-slide__id")
          ? "ユーザー名"
          : "パスワード";
        const tooltip = this.parentElement.querySelector(".p-slide__tooltip");

        // 他のツールチップを非表示にする
        document
          .querySelectorAll(".p-slide__tooltip")
          .forEach(function (tooltip) {
            tooltip.classList.remove("show");
          });

        // テキストをクリップボードにコピー
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        document.body.appendChild(textarea);

        textarea.select();
        document.execCommand("copy");

        document.body.removeChild(textarea);

        // ツールチップを表示する
        showTooltip(tooltip, textType + "をコピーしました");
      });
    });

    function showTooltip(tooltip, message) {
      tooltip.textContent = message;
      tooltip.classList.add("show");

      // 既存のタイムアウトをクリアしてリセット
      clearTimeout(tooltipTimeout);

      // 3秒後にツールチップを非表示にする
      tooltipTimeout = setTimeout(function () {
        tooltip.classList.remove("show");
      }, 3000);
    }

    /*------------------------------------------------------------
    About 画像切り替え
    ------------------------------------------------------------*/
    document
      .querySelector(".p-about__left")
      .addEventListener("click", function () {
        this.classList.toggle("switch");
      });

    /*------------------------------------------------------------
    Contact Form バリデーション
    ------------------------------------------------------------*/
    const form = $(".wpcf7-form");
    const elements = $(
      ".p-contact-form__input, .p-contact-form__textarea, .p-contact-form__radio, .p-contact-form__checkbox"
    );
    const radioGroup = $("input[name='your-business']");
    const checkBoxes = $('[name="your-inquiry[]"]');
    const currentHref = window.location.href;

    /* カスタムバリデーション */
    function customValidation() {
      let isValid = true;
      elements.each(function () {
        const $element = $(this);
        if ($element.attr("aria-required") === "true" && !$element.val()) {
          isValid = false;
        }
      });
      return isValid;
    }

    /* フォームのバリデーション */
    $(form).on("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      let isValid = customValidation();

      if (!radioGroup.is(":checked")) {
        isValid = false;
      }
      if (!checkBoxes.is(":checked")) {
        isValid = false;
      }

      if (isValid) {
        // window.location.href = "/thanks/";
        window.location.href = "#";
        this.reset();
      }
    });

    elements.on("input change", function () {
      const $element = $(this);
      if ($element.val()) {
        hideError($element);
      }
    });

    /*------------------------------------------------------------
    ページトップへ戻るボタン
    ------------------------------------------------------------*/
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
