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
const tabList = $('[role="tablist"]');
const tabs = $('[role="tab"]');

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
  const targetTab = $(e.target);
  const targetPanel = targetTab.attr("aria-controls");
  const targetImage = targetTab.attr("data-image");

  // const tabContainer = targetTab.parentNode;
  const tabContainer = targetTab.parent();

  // const mainContainer = tabContainer.parentNode;
  const mainContainer = tabContainer.parent();

  // tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false);
  // tabContainer.$('[aria-selected="true"]').attr("aria-selected", false);
  $(tabContainer).children('[aria-selected="true"]').attr("aria-selected", false);

  targetTab.attr("aria-selected", true);
  targetTab.attr("aria-selected", true);

  hideContent(mainContainer, '[role="tabpanel"]');
  // showContent(mainContainer, [`#${targetPanel}`]);
  showContent(mainContainer, `#${targetPanel}`);

  hideContent(mainContainer, "picture");
  // showContent(mainContainer, [`#${targetImage}`]);
  showContent(mainContainer, `#${targetImage}`);
}

function hideContent(parent, content) {
  // parent.querySelectorAll(content).forEach((item) => item.setAttribute("hidden", true));
  $(parent)
    .children(content)
    .each((index, item) => $(item).attr("hidden", true));
}

function showContent(parent, content) {
  // parent.querySelector(content).removeAttribute("hidden");
  $(parent).children(content).removeAttr("hidden");
}
