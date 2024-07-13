// @ts-check

// plugin
onePageNav(jQuery, window, document);

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

    // page navigation
    $("#mega-menu-max_mega_menu_3").onePageNav({
      currentClass: "mega-current-menu-item",
      changeHash: false,
      scrollSpeed: 500,
      scrollThreshold: 0.5,
      scrollOffset: -160,
      filter: "",
      easing: "swing",
      begin: function () {
        //I get fired when the animation is starting
      },
      end: function () {
        //I get fired when the animation is ending
      },
      scrollChange: function ($currentListItem) {
        //I get fired when you enter a section and I pass the list item of the section
      },
    });

    setTimeout(() => {
      $("#elementor-tab-title-7231").trigger("click");
    }, 200);
    console.log($("#elementor-tab-title-7231"));
    onElementInserted("body", "#elementor-tab-title-7231", function (el) {
      console.log(el);
      if (!el || !el.click) return;
      el.click();
    });

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

/**
 * jQuery-one-page-nav loading function, run this to init the plugin
 * @param {*} $ jQuery
 * @param {*} window
 * @param {*} document
 */
function onePageNav($, window, document) {
  // our plugin constructor
  var OnePageNav = function (elem, options) {
    this.elem = elem;
    this.$elem = $(elem);
    this.options = options;
    this.metadata = this.$elem.data("plugin-options");
    this.$win = $(window);
    this.sections = {};
    this.didScroll = false;
    this.$doc = $(document);
    this.docHeight = this.$doc.height();
  };

  // the plugin prototype
  OnePageNav.prototype = {
    defaults: {
      navItems: "a",
      currentClass: "current",
      changeHash: false,
      easing: "swing",
      filter: "",
      scrollSpeed: 750,
      scrollThreshold: 0.5,
      scrollOffset: 0,
      begin: false,
      end: false,
      scrollChange: false,
    },

    init: function () {
      // Introduce defaults that can be extended either
      // globally or using an object literal.
      this.config = $.extend({}, this.defaults, this.options, this.metadata);

      this.$nav = this.$elem.find(this.config.navItems);

      //Filter any links out of the nav
      if (this.config.filter !== "") {
        this.$nav = this.$nav.filter(this.config.filter);
      }

      //Handle clicks on the nav
      this.$nav.on("click.onePageNav", $.proxy(this.handleClick, this));

      //Get the section positions
      this.getPositions();

      //Handle scroll changes
      this.bindInterval();

      //Update the positions on resize too
      this.$win.on("resize.onePageNav", $.proxy(this.getPositions, this));

      return this;
    },

    adjustNav: function (self, $parent) {
      self.$elem
        .find("." + self.config.currentClass)
        .removeClass(self.config.currentClass);
      $parent.addClass(self.config.currentClass);
    },

    bindInterval: function () {
      var self = this;
      var docHeight;

      self.$win.on("scroll.onePageNav", function () {
        self.didScroll = true;
      });

      self.t = setInterval(function () {
        docHeight = self.$doc.height();

        //If it was scrolled
        if (self.didScroll) {
          self.didScroll = false;
          self.scrollChange();
        }

        //If the document height changes
        if (docHeight !== self.docHeight) {
          self.docHeight = docHeight;
          self.getPositions();
        }
      }, 250);
    },

    getHash: function ($link) {
      return $link.attr("href").split("#")[1];
    },

    getPositions: function () {
      var self = this;
      var linkHref;
      var topPos;
      var $target;

      self.$nav.each(function () {
        linkHref = self.getHash($(this));
        $target = $("#" + linkHref);

        if ($target.length) {
          topPos = $target.offset().top;
          self.sections[linkHref] =
            Math.round(topPos) - self.config.scrollOffset;
        }
      });
    },

    getSection: function (windowPos) {
      var returnValue = null;
      var windowHeight = Math.round(
        this.$win.height() * this.config.scrollThreshold
      );

      for (var section in this.sections) {
        if (this.sections[section] - windowHeight < windowPos) {
          returnValue = section;
        }
      }

      return returnValue;
    },

    handleClick: function (e) {
      var self = this;
      var $link = $(e.currentTarget);
      var $parent = $link.parent();
      var newLoc = "#" + self.getHash($link);

      if (!$parent.hasClass(self.config.currentClass)) {
        //Start callback
        if (self.config.begin) {
          self.config.begin();
        }

        //Change the highlighted nav item
        self.adjustNav(self, $parent);

        //Removing the auto-adjust on scroll
        self.unbindInterval();

        //Scroll to the correct position
        self.scrollTo(newLoc, function () {
          //Do we need to change the hash?
          if (self.config.changeHash) {
            window.location.hash = newLoc;
          }

          //Add the auto-adjust on scroll back in
          self.bindInterval();

          //End callback
          if (self.config.end) {
            self.config.end();
          }
        });
      }

      e.preventDefault();
    },

    scrollChange: function () {
      var windowTop = this.$win.scrollTop();
      var position = this.getSection(windowTop);
      var $parent;

      //If the position is set
      if (position !== null) {
        $parent = this.$elem.find('a[href$="#' + position + '"]').parent();

        //If it's not already the current section
        if (!$parent.hasClass(this.config.currentClass)) {
          //Change the highlighted nav item
          this.adjustNav(this, $parent);

          //If there is a scrollChange callback
          if (this.config.scrollChange) {
            this.config.scrollChange($parent);
          }
        }
      }
    },

    scrollTo: function (target, callback) {
      var offset = $(target).offset().top;

      $("html, body").animate(
        {
          scrollTop: offset + this.config.scrollOffset,
        },
        this.config.scrollSpeed,
        this.config.easing,
        callback
      );
    },

    unbindInterval: function () {
      clearInterval(this.t);
      this.$win.unbind("scroll.onePageNav");
    },
  };

  OnePageNav.defaults = OnePageNav.prototype.defaults;

  $.fn.onePageNav = function (options) {
    return this.each(function () {
      new OnePageNav(this, options).init();
    });
  };
}

function onElementInserted(containerSelector, elementSelector, callback) {
  var onMutationsObserved = function (mutations) {
    mutations.forEach(function (mutation) {
      if (mutation.addedNodes && mutation.addedNodes.length) {
        [].map.call(mutation.addedNodes, function (el) {
          if (!el || !el.querySelector) return;

          var elements = el.querySelectorAll(elementSelector);

          for (var i = 0, len = elements.length; i < len; i++) {
            callback(elements[i]);
          }
        });
      }
    });
  };

  var target = document.querySelector(containerSelector);
  var config = { childList: true, subtree: true };
  var MutationObserver =
    window.MutationObserver || window.WebKitMutationObserver;
  var observer = new MutationObserver(onMutationsObserved);
  observer.observe(target, config);
}
