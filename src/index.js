try {
  if (typeof jQuery === "undefined") {
    console.log("JQuery is not defined");
  }

  const $ = jQuery;

  $(document).ready(function () {
    console.log("Document is ready");

    // detect srolling using jquery
    $(window).scroll(function () {
      if ($(this).scrollTop() > 100) {
        $(".main-header-bar").addClass("on-scroll");
      } else {
        $(".main-header-bar").removeClass("on-scroll");
      }
    });
  });
} catch (e) {
  console.log(e);
}
