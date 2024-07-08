<?php
/*--------------------------------------------------------
初期設定
--------------------------------------------------------*/
function my_script_init() {
  wp_enqueue_style('fontawesome', 'https://use.fontawesome.com/releases/v5.8.2/css/all.css', array(), '5.8.2', 'all');
  wp_enqueue_style('my', get_template_directory_uri() . '/css/style.css', array(), filemtime(get_theme_file_path('css/style.css')), 'all');
  wp_enqueue_script('my', get_template_directory_uri() . '/js/main.js', array('jquery'), filemtime(get_theme_file_path('js/main.js')), true);
}
add_action("wp_enqueue_scripts", "my_script_init");

/*--------------------------------------------------------
サムネイルの有効化
--------------------------------------------------------*/
function my_setup() {
  add_theme_support('post-thumbnails');
  add_theme_support('automatic-feed-links');
  add_theme_support('title-tag');
  add_theme_support('html5', array('comment-list', 'comment-form', 'search-form', 'gallery', 'caption', 'style', 'script'));
}
add_action("after_setup_theme", "my_setup");


/*--------------------------------------------------------
メニューの有効化
--------------------------------------------------------*/
function my_menu_init() {
  register_nav_menus(
    array(
      'global' => 'ヘッダーメニュー',
      'drawer' => 'ドロワーメニュー',
      'footer' => 'フッターメニュー',
    )
  );
}
add_action('init', 'my_menu_init');
/*--------------------------------------------------------
CF7
--------------------------------------------------------*/
// Contact Form 7で自動挿入されるPタグ、brタグを削除
add_filter('wpcf7_autop_or_not', 'wpcf7_autop_return_false');
function wpcf7_autop_return_false() {
  return false;
}

/*--------------------------------------------------------
カスタムウォーカー(Header / Drawer)
--------------------------------------------------------*/
class My_Custom_Nav_Walker extends Walker_Nav_Menu {
  /*----- start_el（リストアイテム:liの設定） -----*/
  function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) {
    // WP側のメニューの追加クラス名の有無を確認(追加がなければ空配列、あれば各々配列として$classesに代入)
    $classes = empty($item->classes) ? array() : (array) $item->classes;
    // apply_filters()=>$item(現在のメニューアイテムオブジェクト)内のクラス($classes)に対し、array_filter()で空白(false)を除去
    $class_names = join(' ', apply_filters('nav_menu_css_class', array_filter($classes), $item));
    // $class_namesが空でない(true)なら、class=""の形で連結、そうでなければクラス無し
    $class_names = $class_names ? ' class="' . esc_attr($class_names) . '"' : '';
    //  ⇩ 組み立て($outputに値を繋げていく)
    $output .= '<li' . $class_names . '>';


    //  変数定義
    $icon_svg = '';

    // 'global / drawer' テーマロケーションの時はクラス名を変更する
    //⇩globalナビ(PC表示)
    if ($args->theme_location === 'global') {
      $link_class = 'p-gnav__link';
      // 現在のページの場合にクラスを追加
      if (in_array('current-menu-item', $item->classes)) {
        $link_class .= ' is-page';
      }
      switch ($item->title) {
        case '@positiv_ksk':
          $link_class = 'p-dnav__link c-btn-x__link';
          $icon_svg = '<svg width="30" height="30" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9027 8.04517L19.3482 0H17.5838L11.119 6.98554L5.9555 0H0L7.8082 10.5633L0 19H1.7644L8.5915 11.6231L14.0445 19H20L11.9027 8.04517ZM9.4861 10.6564L8.695 9.60459L2.4002 1.23471H5.1103L10.1902 7.98941L10.9813 9.04134L17.5847 17.8214H14.8746L9.4861 10.6564Z" fill="none" class="c-btn__icon-path--x" />
              </svg>';
          break;
      }
    } elseif ($args->theme_location === 'drawer') {
      $link_class = 'p-dnav__link';
      switch ($item->title) {
        case '@positiv_ksk':
          $link_class = 'p-dnav__link c-btn-x__link';
          $icon_svg = '<svg width="30" height="30" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.9027 8.04517L19.3482 0H17.5838L11.119 6.98554L5.9555 0H0L7.8082 10.5633L0 19H1.7644L8.5915 11.6231L14.0445 19H20L11.9027 8.04517ZM9.4861 10.6564L8.695 9.60459L2.4002 1.23471H5.1103L10.1902 7.98941L10.9813 9.04134L17.5847 17.8214H14.8746L9.4861 10.6564Z" fill="none" class="c-btn__icon-path--x" />
              </svg>';
          break;
      }
    }

    /*----- start_el（リンク開始タグ:aの設定）※footerメニューとほぼ一緒 -----*/
    // $attributesに、クラス名+リンクの属性値を連結していく（WPのカスタムメニューで、各メニューに設定したリンク等の情報を取得）
    $attributes = !empty($item->attr_title) ? ' title="' . esc_attr($item->attr_title) . '"' : '';
    $attributes .= !empty($item->target) ? ' target="' . esc_attr($item->target) . '"' : '';
    $attributes .= !empty($item->xfn) ? ' rel="' . esc_attr($item->xfn) . '"' : '';

    // フロントページかどうかをチェック
    if (is_front_page()) {
      $attributes .= !empty($item->url) ? ' href="' . esc_attr($item->url) . '"' : '';
    } else {
      $attributes .= !empty($item->url) ? ' href="' . esc_url(home_url($item->url)) . '"' : '';
    }

    // c-btn-x__linkに対してtarget="_blank"とrel="noopener noreferrer"を追加
    if (strpos($link_class, 'c-btn-x__link') !== false) {
      $attributes .= ' target="_blank" rel="noopener noreferrer"';
    }

    $attributes .= ' class="' . $link_class . '"';

    // <a> svg <span>メニュー名</span> </a> という形で連結
    $item_output = $args->before;
    $item_output .= '<a' . $attributes . '>';
    $item_output .= $args->link_before . $icon_svg . apply_filters('the_title', $item->title, $item->ID) . $args->link_after;
    $item_output .= '</a>';
    $item_output .= $args->after;

    $output .= apply_filters('walker_nav_menu_start_el', $item_output, $item, $depth, $args);
  }
}

// functions.php に追加
function add_body_class_by_template($classes) {
  if (is_front_page()) {
    $classes[] = 'is-front-page';
  }
  return $classes;
}
add_filter('body_class', 'add_body_class_by_template');
