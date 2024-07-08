<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- GoogleFont -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Noto+Sans+JP:wght@100..900&family=Sawarabi+Mincho&display=swap" rel="stylesheet" />

  <!-- ファビコン,Swiper,リセットCSS,CSSリンク -->
  <link rel="icon" href="<?= get_template_directory_uri(); ?>/favicon.ico" />
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css" />
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <header id="header" class="l-header">
    <div class="p-header__inner">
      <h1 class="p-header__logo">
        <a href="<?php if (is_front_page()) {
                    echo '#';
                  } else {
                    echo esc_url(home_url());
                  } ?>" class="p-header__logo-link">
          <img src="<?= get_template_directory_uri(); ?>/img/header_logo.svg" alt="Kosuke's Portfolio" width="90" height="60" />
        </a>
      </h1>
      <div id="js-drawer-open" class="p-header__button">
        <button class="c-hamburger" aria-label="Menu">
          <span class="c-hamburger__parts"></span>
          <span class="c-hamburger__parts"></span>
          <span class="c-hamburger__parts"></span>
        </button>
      </div>
      <nav class="p-header__nav p-gnav">
        <ul class="p-gnav__list">
          <?php
          wp_nav_menu(
            array(
              'depth' => 1,
              'theme_location' => 'global',
              'container' => 'false',
              'walker' => new My_Custom_Nav_Walker(),
              'menu_class' => 'p-gnav__list',
            )
          );
          ?>
          <li class="p-btn-x">
            <a href="https://x.com/positive_ksk" target="_blank" rel="noopener noreferrer" class="p-dnav__link c-btn-x__link">
              <svg width="30" height="30" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9027 8.04517L19.3482 0H17.5838L11.119 6.98554L5.9555 0H0L7.8082 10.5633L0 19H1.7644L8.5915 11.6231L14.0445 19H20L11.9027 8.04517ZM9.4861 10.6564L8.695 9.60459L2.4002 1.23471H5.1103L10.1902 7.98941L10.9813 9.04134L17.5847 17.8214H14.8746L9.4861 10.6564Z" fill="none" class="c-btn__icon-path--x"></path>
              </svg>@positiv_ksk</a>
          </li>
        </ul>
      </nav>

      <div id="drawer" class="p-drawer" style="display: none">
        <div class="p-drawer__inner">
          <div class="p-drawer__logo">
            <a href="<?php if (is_front_page()) {
                        echo '#';
                      } else {
                        echo esc_url(home_url());
                      } ?>" class="p-drawer__logo-link">
              <img src="<?= get_template_directory_uri(); ?>/img/header_logo.svg" alt="Kosuke's Portfolio" width="90" height="60" />
            </a>
          </div>
          <nav class="p-drawer__nav p-dnav">
            <ul class="p-dnav__list">

              <?php
              wp_nav_menu(
                array(
                  'depth' => 1,
                  'theme_location' => 'drawer',
                  'container' => 'false',
                  'walker' => new My_Custom_Nav_Walker(),
                  'menu_class' => 'p-dnav__list',
                )
              );
              ?>
              <li class="p-dnav__x p-btn-x">
                <a href="https://x.com/positive_ksk" target="_blank" rel="noopener noreferrer" class="p-dnav__link c-btn-x__link">
                  <svg width="30" height="30" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.9027 8.04517L19.3482 0H17.5838L11.119 6.98554L5.9555 0H0L7.8082 10.5633L0 19H1.7644L8.5915 11.6231L14.0445 19H20L11.9027 8.04517ZM9.4861 10.6564L8.695 9.60459L2.4002 1.23471H5.1103L10.1902 7.98941L10.9813 9.04134L17.5847 17.8214H14.8746L9.4861 10.6564Z" fill="none" class="c-btn__icon-path--x"></path>
                  </svg>@positiv_ksk
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </header>