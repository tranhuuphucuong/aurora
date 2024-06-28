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
        $("header").addClass("on-scroll");
      } else {
        $("header").removeClass("on-scroll");
      }
    });
  });
} catch (e) {
  console.log(e);
}
