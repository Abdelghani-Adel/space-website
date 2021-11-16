/* /////////////////////////////////////// */
/* ////////   Navigation Toggle   //////// */
/* /////////////////////////////////////// */

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

/* ///////////////////////////////////// */
/* ////////////    Tabs    ///////////// */
/* ///////////////////////////////////// */

const tabList = $('[role="tablist"]'); // buttons wrapper
const tabs = $('[role="tab"]'); // buttons
tabs.each((index, element) => {
  $(element).click(changeTab);
});

// Handler Function
function changeTab(e) {
  const clickedButton = $(e.currentTarget); // Select the button
  const tabContainer = clickedButton.parent(); // buttons wrapper div to used with changing active button
  const dataCategory = tabList.attr("data-category"); // catogory (dest - crew - tech)
  const dataName = clickedButton.attr("data-name");

  // Change the active button
  $(tabContainer).children('[aria-selected="true"]').attr("aria-selected", false);
  clickedButton.attr("aria-selected", true);

  $.getJSON("../js/data.json", function (data) {
    // Filtering The Data
    const result = data[dataCategory].find((obj) => {
      return obj.name == dataName;
    });

    // Shared Data
    $("#image").attr("src", result["images"]["png"]);
    $("#name").text(result["name"]);
    $("#description").text(result["description"]);

    try {
      // Destinations
      $("#planet-dist").text(result["distance"]);
      $("#planet-travel").text(result["travel"]);
      // Crew
      $("#crew-role").text(result["role"]);
    } catch (err) {
      console.log(err);
    }
  });
}
