// @ts-check

// define type for jQuery
/**
 * @typedef {import('jquery')} jQuery
 */
var isDebuging = true;
var log = isDebuging ? console.log : function (_) {};
try {
  if (typeof jQuery === "undefined") {
    log("JQuery is not defined");
  }

  const $ = jQuery;

  $(function () {
    log("Document is ready");
    var $window = $(window);

    // header animation
    $window.on("scroll", function () {
      const scrollTop = $window.scrollTop() || 0;
      // header animation
      if ((scrollTop || 0) > 70) {
        $(".main-header-bar").addClass("on-scroll");
      } else {
        $(".main-header-bar").removeClass("on-scroll");
      }

      // check to add or remove class onScroll
      if (scrollTop > 340) {
        $("#menu-container").addClass("onScroll");
      } else {
        $("#menu-container").removeClass("onScroll");
      }
    });

    $(".tab-toggle").click(function (e) {
      e.preventDefault();
      if ($(this).hasClass("active") == false) {
        $(".tab-toggle").removeClass("active");
        $(this).addClass("active");

        var id = $(this).attr("data-hash");

        $(".tab-content").addClass("hidden");
        if (id) {
          $(id).removeClass("hidden");
        }
      }
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
  });
} catch (e) {
  log(e);
}
