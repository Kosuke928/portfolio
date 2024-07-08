<?php get_header(); ?>
<?php if ( have_posts() ) : ?>
  <?php while ( have_posts() ) : ?>
    <?php the_post(); ?>
    <div id="thanks" class="p-thanks">
      <div class="p-thanks__inner l-inner">
        <div class="p-thanks__container">
          <h2 class="p-thanks__title p-sec-title p-sec-title--rev">
            <span class="p-sec-title__en">-Completed
            </span>
            <span class="p-sec-title__jp">送信完了</span>
          </h2>
          <div class="p-thanks__contents">
            <p class="p-thanks__text">
              この度はお問い合わせいただき、誠にありがとうございます。
            </p>
            <p class="p-thanks__text">
              お問い合わせいただいた内容を確認し、追ってご連絡させていただきますので、今しばらくお待ちください。
            </p>
            <div class="p-thanks__button">
              <a href="<?= esc_url(home_url()); ?>" class="c-button-top">トップへ戻る</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  <?php endwhile; ?>
<?php endif; ?>


<?php get_footer(); ?>