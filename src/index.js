// @ts-check
// define type for jQuery
/**
 * @typedef {import('jquery')} jQuery
 */
var isDebuging = true;
var log = isDebuging ? console.log : function () {};
try {
  if (typeof jQuery === "undefined") {
    log("JQuery is not defined");
  }

  const $ = jQuery;

  $(function () {
    log("Document is ready");
    var $window = $(window);

    $window.on("scroll", function () {
      // header animation
      if (($(this).scrollTop() || 0) > 70) {
        $(".main-header-bar").addClass("on-scroll");
      } else {
        $(".main-header-bar").removeClass("on-scroll");
      }

      var menuContainer = document.getElementById("menu-container");

      // var amountScrolled = menuContainer.clientHeight + 0;
      //   if ($(window).scrollTop() > amountScrolled) {
      //       $("#menu-container").addClass("onScroll");

      //       console.log($(window).scrollTop())
      //       console.log($('main').height())

      //       if ($(window).scrollTop() > $('main').height() - 200) {
      //           $("#menu-container").removeClass("onScroll");
      //       }

      //   } else {
      //       $("#menu-container").removeClass("onScroll");
      //   }
    });

    // in view animation
    function checkForInView() {
      var $slide = $('[class*="animate-"]');
      var window_height = $window.height() || 900;
      var window_top_position = $window.scrollTop() || 0;
      var window_bottom_position = window_top_position + window_height;

      var i = 0;
      var time = -100;
      $.each($slide, function () {
        var $element = $(this);
        var element_height = $element.outerHeight() || 0;
        var element_top_position = ($element.offset() || {}).top || 0;
        var element_center_position = element_top_position + element_height / 2;

        if (($window.width() || 0) < 1024) {
          element_center_position = element_top_position + element_height / 4;
        }

        if (element_top_position <= window_top_position) {
          $element.addClass("inView");
        } else if (element_center_position <= window_bottom_position) {
          if (!$element.hasClass("inView")) {
            setTimeout(function () {
              $element.addClass("inView");
            }, (time += 200));
          }
        } else {
          $element.removeClass("inView");
        }
      });
    }
    $window.on("resize scroll", checkForInView);
    $window.trigger("scroll");

    // add/remove active class on hover
    $('[class*=".js-hover"]').hover(
      function () {
        $(this).addClass("active");
      },
      function () {
        $(this).removeClass("active");
      }
    );

    // toggle active class on hover
    var $boxList = $(".box-item");
    $boxList.hover(function () {
      $boxList.removeClass("active");
      $(this).addClass("active");
    });

    $("#mega-menu-primary > .mega-menu-item > .mega-menu-link").addClass(
      "a-decor"
    );

    // scroll to top
    // var $circleSvg = $(
    //   `<svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102"></svg>`
    // );
    // var $circlePath = $(
    //   `<path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>`
    // );

    // var scrollToTopEl = $("#ast-scroll-top");
    // $circleSvg.append($circlePath);

    // scrollToTopEl.append($circleSvg);

    // var progressPath = $circlePath[0];
    // var pathLength = progressPath.getTotalLength();
    // progressPath.style.transition = progressPath.style.WebkitTransition =
    //   "none";
    // progressPath.style.strokeDasharray = pathLength + " " + pathLength;
    // progressPath.style.strokeDashoffset = pathLength;
    // progressPath.getBoundingClientRect();
    // progressPath.style.transition = progressPath.style.WebkitTransition =
    //   "stroke-dashoffset 10ms linear";
    // var updateProgress = function () {
    //   var scroll = $(window).scrollTop();
    //   var height = $(document).height() - $(window).height();
    //   var progress = pathLength - (scroll * pathLength) / height;
    //   progressPath.style.strokeDashoffset = progress;
    // };
    // updateProgress();
    // $(window).scroll(updateProgress);
    // var offset = 50;
    // var duration = 550;
    // jQuery(window).on("scroll", function () {
    //   if (jQuery(this).scrollTop() > offset) {
    //     jQuery(".progress-wrap").addClass("active-progress");
    //   } else {
    //     jQuery(".progress-wrap").removeClass("active-progress");
    //   }
    // });
    // jQuery(".progress-wrap").on("click", function (event) {
    //   event.preventDefault();
    //   jQuery("html, body").animate({ scrollTop: 0 }, duration);
    //   return false;
    // });

    // End
  });
} catch (e) {
  log(e);
}
