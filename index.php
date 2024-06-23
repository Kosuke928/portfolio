<!DOCTYPE html>
<html lang="ja">

<head prefix="og: https://ogp.me/ns#">
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- 最後に必ず確認のこと -->
  <meta name="robots" content="noindex" />

  <!-- サイトタイトル,サイト詳細 -->
  <title></title>
  <meta name="description" content="" />

  <!-- OGP設定 -->
  <meta property="og:title" content="" />
  <meta property="og:description" content="" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://kosuke-blog.com/" />
  <meta property="og:image" content="https://kosuke-blog.com/img/ogp.webp" />

  <!-- GoogleFont -->

  <!-- ファビコン,Swiper,リセットCSS,CSSリンク -->
  <link rel="icon" href="./favicon.ico" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
  <link rel="stylesheet" href="./css/reset.css" />
  <link rel="stylesheet" href="./css/style.css" />
</head>

<body>
  <?php if (have_posts()) : ?>
    <?php while (have_posts()) : ?>
      <?php the_post(); ?>
      <?php the_content(); ?>
    <?php endwhile; ?>
  <?php endif; ?>

  <!-- Swiper,JavaScript,JQueryリンク -->
  <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
  <script src="./js/main.js"></script>
</body>

</html>