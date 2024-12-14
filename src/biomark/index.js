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
  });
} catch (e) {
  log(e);
}
