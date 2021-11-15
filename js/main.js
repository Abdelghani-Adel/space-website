// Navigation
const nav = $(".primary-navigation");
const navToggle = $(".mobile-nav-toggle");

navToggle.click(() => {
  const visiblity = nav.attr("data-visible");
  if (visiblity === "false") {
    nav.attr("data-visible", true);
    navToggle.attr("aria-expanded", true);
  } else {
    nav.attr("data-visible", false);
    navToggle.attr("aria-expanded", false);
  }
});

// Tabs
const tabList = $('[role="tablist"]'); //Select buttons wrapper
const tabs = $('[role="tab"]'); // Select buttons

tabs.each((index, element) => {
  $(element).click(changeTabPanel);
});

function changeTabPanel(e) {
  const targetTab = $(e.currentTarget);
  const tabContainer = targetTab.parent();
  const num = targetTab.attr("data-num");

  const planetImg = $("#planet-img");
  const planetName = $("#planet-name");
  const planetInfo = $("#planet-info");
  const planetDist = $("#planet-dist");
  const planetTravel = $("#planet-travel");

  // Change the active button
  $(tabContainer).children('[aria-selected="true"]').attr("aria-selected", false);
  targetTab.attr("aria-selected", true);

  // Changing the content
  $.getJSON("../js/data.json", function (data) {
    // Change the image
    planetImg.attr("src", data["destinations"][num]["images"]["png"]);
    // Change the name
    planetName.text(data["destinations"][num]["name"]);
    // Change the info
    planetInfo.text(data["destinations"][num]["description"]);
    // Change the distance
    planetDist.text(data["destinations"][num]["distance"]);
    // change the travel time
    planetTravel.text(data["destinations"][num]["travel"]);
  });
}
