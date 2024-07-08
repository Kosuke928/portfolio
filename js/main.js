jQuery(function ($) {
  $(document).ready(function () {
    if ($("body").hasClass("is-front-page")) {
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
    プロフィール画像切り替え
    ------------------------------------------------------------*/
      document
        .querySelector(".p-about__left")
        .addEventListener("click", function () {
          this.classList.toggle("switch");
        });

      /*------------------------------------------------------------
    Contact 確認
    ------------------------------------------------------------*/
      // 入力内容を格納するための変数
      let val;
      // 入力フィールドのタイプを格納するための変数
      let type;
      // ラジオボタンの選択値を格納するための変数
      let radio;
      // チェックボックスの選択値を格納するための変数
      let check;

      // ラジオボタンの初期値を取得し、確認画面に反映させる
      const radioButtons = document.querySelectorAll('[type="radio"]:checked');
      radioButtons.forEach((button) => {
        // ラジオボタンの選択値を取得
        radio = button.value;
        // ラジオボタンの親要素からidを取得
        const id = button.closest("[id]").id;
        // 取得したidをクラス名に追加し、確認画面の値を設定
        document.querySelector(`.p-confirm__${id}`).textContent = radio;
      });

      // 入力フィールドの内容が変更された場合の処理
      const formInputs = document.querySelectorAll(
        ".p-contact-form__field-item input, .p-contact-form__field-item select, .p-contact-form__field-item textarea"
      );
      formInputs.forEach((input) => {
        input.addEventListener("change", function () {
          // 入力内容を取得
          val = this.value;
          // 入力フィールドのタイプを取得
          type = this.getAttribute("type");
          // ラジオボタンの場合の処理
          if (type === "radio") {
            // ラジオボタンの選択値を取得
            radio = this.value;
            // ラジオボタンの親要素からidを取得
            const id = this.closest("[id]").id;
            // 取得したidをクラス名に追加し、確認画面の値を設定
            document.querySelector(`.p-confirm__${id}`).textContent = radio;
          } // チェックボックスの場合の処理
          else if (type === "checkbox") {
            // チェックボックスの親要素からidを取得
            const id = this.closest("[id]").id;
            // 確認画面の要素をクリア
            document.querySelector(`.p-confirm__${id}`).textContent = "";
            // チェックボックスの全選択値を取得
            const checkedBoxes = document.querySelectorAll(
              `#${id} [type="checkbox"]:checked`
            );
            // チェックボックスの選択値を取得し、確認画面の値を設定
            checkedBoxes.forEach((box) => {
              document.querySelector(`.p-confirm__${id}`).textContent +=
                box.value + " / ";
            });
          } // その他の場合の処理
          else {
            // 入力フィールドのidを取得
            const id = this.id;
            // 取得したidをクラス名に追加し、確認画面の値を設定
            document.querySelector(`.p-confirm__${id}`).textContent = val;
          }
        });
      });

      // 確認ボタンをクリックした場合の処理
      const confirmButton = document.querySelector("#js-confirm");
      confirmButton.addEventListener("click", () => {
        document.querySelector(".p-contact-form__fields").style.display =
          "none";
        document.querySelector(".p-confirm").style.display = "flex";
        window.scrollTo({
          top:
            document.querySelector(".p-confirm").getBoundingClientRect().top +
            window.scrollY,
        });
      });

      // 戻るボタンをクリックした場合の処理
      const backButton = document.querySelector("#js-back");
      backButton.addEventListener("click", () => {
        document.querySelector(".p-contact-form__fields").style.display =
          "flex";
        document.querySelector(".p-confirm").style.display = "none";
        window.scrollTo({
          top:
            document
              .querySelector(".p-contact-form__fields")
              .getBoundingClientRect().top + window.scrollY,
        });
      });

      // 必須項目が変更された場合の処理
      const requiredInputs = document.querySelectorAll(
        '[aria-required="true"]'
      );
      requiredInputs.forEach((input) => {
        input.addEventListener("input", () => {
          let flag = true;
          requiredInputs.forEach((requiredInput) => {
            if (requiredInput.value === "") {
              flag = false;
            }
          });
          // フラグに基づいて確認ボタンの有効化/無効化とクラスの追加/削除
          confirmButton.disabled = !flag;
          if (flag) {
            confirmButton.classList.remove("js-disabled");
          } else {
            confirmButton.classList.add("js-disabled");
          }
        });
      });

      // 送信ボタンをクリックした場合の処理
      document.addEventListener(
        "wpcf7mailsent",
        (event) => {
          location = "https://kosuke-blog.com/thanks/";
        },
        false
      );
    }

    /*------------------------------------------------------------
    Intersection Observer（ロゴ）
    ------------------------------------------------------------*/
    // 監視するターゲット要素を選択
    let $targetElement = $(".p-fv__logo");
    let $fixedElement = $(".p-header__logo");

    // $targetElement が存在するか確認
    if ($targetElement.length > 0) {
      // DOM要素を取得
      let targetElement = $targetElement[0];
      $fixedElement.hide();

      // 固定する要素やヘッダー要素の選択
      let $headerElement = $(".l-header");

      // IntersectionObserverのコールバック関数
      function callback(entries) {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            $fixedElement.fadeIn();
            $headerElement.addClass("js-show");
          } else {
            $fixedElement.fadeOut();
            $headerElement.removeClass("js-show");
          }
        });
      }

      // IntersectionObserverのオプション
      let options = {
        root: null, // ビューポートをルートとして使用
        rootMargin: "0px", // ルート（ビューポート）のマージン
        threshold: 0, // ターゲットが完全に見えなくなった時にコールバックを呼び出す
      };

      // IntersectionObserverのインスタンスを作成し、ターゲット要素を監視
      let observer = new IntersectionObserver(callback, options);
      observer.observe(targetElement); // DOM要素を渡す
    }

    /*------------------------------------------------------------
    スムーススクロール
    ------------------------------------------------------------*/
    $("a[href^='#']").on("click", function (e) {
      const href = $(this).attr("href");

      // hrefが特定の条件に一致しない場合はデフォルトのリンク動作を許可
      if (href.startsWith("#")) {
        e.preventDefault();
        const point = $(href === "#" || href === "" ? "html" : href);
        const position = point.offset().top - 60;
        $("html, body").animate({ scrollTop: position }, speed, "swing");
      }
    });

    /*------------------------------------------------------------
    ドロワーメニュー
    ------------------------------------------------------------*/
    $("#js-drawer-open").on("click", function () {
      $(this).toggleClass("is-open");
      $(this).children().toggleClass("is-open");
      $("#drawer").fadeToggle(300);
      if ($(this).hasClass("is-open")) {
        $("html, body").css("overflow", "hidden");
      } else {
        $("html, body").removeAttr("style");
      }
    });
    $(".p-dnav__link, .p-drawer__logo-link").on("click", function () {
      $("#js-drawer-open").removeClass("is-open");
      $("#js-drawer-open").children().removeClass("is-open");
      $("#drawer").fadeOut(300); // ドロワーを閉じる
      $("html, body").removeAttr("style");
    });

    /*------------------------------------------------------------
    Scroll Down(Fv)
    ------------------------------------------------------------*/
    let $targetScrollDown = $(".p-scrolldown");
    if ($targetScrollDown.length > 0) {
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
    }

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
    スキルアイコン回転
    ------------------------------------------------------------*/
    document.querySelectorAll(".p-about__skill").forEach((skill) => {
      skill.addEventListener("mouseover", function () {
        this.classList.add("animate");
        this.addEventListener(
          "animationend",
          function () {
            this.classList.remove("animate");
          },
          { once: true }
        );
      });
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
