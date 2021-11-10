const nav = $(".primary-navigation");
const navToggle = $(".mobile-nav-toggle");

navToggle.click(function () {
  if (nav.attr("data-visible") === "false") {
    console.log("test");
    nav.attr("data-visible", true);
    navToggle.attr("aria-expanded", true);
  } else {
    nav.attr("data-visible", false);
    navToggle.attr("aria-expanded", false);
  }
});
