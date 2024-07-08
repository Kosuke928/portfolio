<?php get_header(); ?>
<div id="error" class="p-error">
  <div class="p-error__inner l-inner">
    <div class="p-error__container">
      <h2 class="p-error__title p-sec-title p-sec-title--rev">
        <span class="p-sec-title__en">-404 Error
        </span>
        <span class="p-sec-title__jp">エラーページ</span>
      </h2>
      <div class="p-error__contents">
        <p class="p-error__text">
          恐れ入りますが、このページは現在存在しておりません。
        </p>
        <p class="p-error__text">
          お手数ですがトップページにお戻りください。
        </p>
        <div class="p-error__button">
          <a href="<?= esc_url(home_url()); ?>" class="c-button-top">トップへ戻る</a>
        </div>
      </div>
    </div>
  </div>
</div>
<?php get_footer(); ?>