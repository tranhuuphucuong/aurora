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

    // Scroll magic animation
    var controller = new ScrollMagic.Controller();

    // define movement of panels
    var wipeAnimation = new TimelineMax()
      // animate to second panel
      .to(".panel1", 0.5, {
        scale: 1.1,
        opacity: 0,
      })
      .to(".panel2", 0.5, { scale: 1.1, opacity: 1, zIndex: 2 })
      .to(".panel2", 0.5, { opacity: 0 })

      .to(".panel3", 0.5, { scale: 1.1, opacity: 1, zIndex: 3 });

    // create scene to pin and link animation
    new ScrollMagic.Scene({
      triggerElement: ".pinContainer",
      triggerHook: 0.1,
      duration: "300%",
    })
      .setPin(".pinContainer")
      .setTween(wipeAnimation)
      .addTo(controller);

    // in view animation
    // function checkForInView() {
    //   var $slide = $('[class*="animate-"]');
    //   var window_height = $window.height() || 900;
    //   var window_top_position = $window.scrollTop() || 0;
    //   var window_bottom_position = window_top_position + window_height;

    //   var i = 0;
    //   var time = -100;
    //   $.each($slide, function () {
    //     var $element = $(this);
    //     var element_height = $element.outerHeight() || 0;
    //     var element_top_position = ($element.offset() || {}).top || 0;
    //     var element_center_position = element_top_position + element_height / 2;

    //     if (($window.width() || 0) < 1024) {
    //       element_center_position = element_top_position + element_height / 4;
    //     }

    //     if (element_top_position <= window_top_position) {
    //       $element.addClass("inView");
    //     } else if (element_center_position <= window_bottom_position) {
    //       if (!$element.hasClass("inView")) {
    //         setTimeout(function () {
    //           $element.addClass("inView");
    //         }, (time += 200));
    //       }
    //     } else {
    //       $element.removeClass("inView");
    //     }
    //   });
    // }
    // $window.on("resize scroll", checkForInView);
    // $window.trigger("scroll");

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
    // var $boxList = $(".box-item");
    // $boxList.hover(function () {
    //   $boxList.removeClass("active");
    //   $(this).addClass("active");
    // });

    // $("#mega-menu-primary > .mega-menu-item > .mega-menu-link").addClass(
    //   "a-decor"
    // );

    // // page navigation
    // $("#mega-menu-max_mega_menu_3").onePageNav({
    //   currentClass: "mega-current-menu-item",
    //   changeHash: false,
    //   scrollSpeed: 500,
    //   scrollThreshold: 0.5,
    //   scrollOffset: -160,
    //   filter: "",
    //   easing: "swing",
    //   begin: function () {
    //     //I get fired when the animation is starting
    //   },
    //   end: function () {
    //     //I get fired when the animation is ending
    //   },
    //   scrollChange: function ($currentListItem) {
    //     //I get fired when you enter a section and I pass the list item of the section
    //   },
    // });

    // setTimeout(() => {
    //   $("#elementor-tab-title-7231").trigger("click");
    // }, 200);

    // onElementInserted("body", "#elementor-tab-title-7231", function (el) {
    //   console.log(el);
    //   if (!el || !el.click) return;
    //   el.click();
    // });

    // $(".button-tab").click(function (e) {
    //   e.preventDefault();
    //   if ($(this).hasClass("active") == false) {
    //     $(".button-tab").removeClass("active");
    //     $(this).addClass("active");

    //     var id = $(this).attr("data-hash");

    //     $(".snap-content").hide();
    //     $(id).show();
    //   }
    // });

    // End
  });
} catch (e) {
  log(e);
}
