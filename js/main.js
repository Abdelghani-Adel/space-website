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

// tabList.addEventListener("keydown", changeTabFocus);
tabList.keydown(changeTabFocus);

// tabs.each(function () {
//   // tab.addEventListener("click", changeTabPanel);
//   $(this).click(changeTabPanel);
// });

tabs.each((index, element) => {
  $(element).click(changeTabPanel);
});

let tabFocus = 0;
function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  if (e.keyCode === keydownLeft || e.keyCode === keydownRight) {
    tabs[tabFocus].setAttribute("tabindex", -1);

    if (e.keyCode === keydownRight) {
      tabFocus++;
      if (tabFocus >= tabs.length) {
        tabFocus = 0;
      }
    }

    if (e.keyCode === keydownLeft) {
      tabFocus--;
      if (tabFocus < 0) {
        tabFocus = tabs.length - 1;
      }
    }
  }

  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
}

function changeTabPanel(e) {
  // Variables
  const targetTab = $(e.target); // Selecting the button
  const targetPanel = targetTab.attr("aria-controls"); // Selecting the article link
  const targetImage = targetTab.attr("data-image"); // Selecting the image link
  const tabContainer = targetTab.parent(); // Selecting buttons container
  const mainContainer = tabContainer.parent(); // Selecting the wrapper of (buttons - images - articles)

  // Change the status of the other active button
  // Select the current "selected" and make it false
  $(tabContainer).children('[aria-selected="true"]').attr("aria-selected", false);

  // Change the status of the current clicked button to be selected true
  targetTab.attr("aria-selected", true);

  // Hide all articles
  hideContent(mainContainer, '[role="tabpanel"]');
  // Show only the current target article
  showContent(mainContainer, `#${targetPanel}`);

  // Hide all images
  hideContent(mainContainer, "picture");
  // Show only the current target image
  showContent(mainContainer, `#${targetImage}`);
}

function hideContent(parent, content) {
  $(parent).children(content).attr("hidden", true);
}

function showContent(parent, content) {
  $(parent).children(content).removeAttr("hidden");
}
