$(".nav-btn").click(function () {
  $(".navbar-ul-wrapper").toggleClass("clicked");
});

let planetPic = $(".planet-pic");
let planetName = $(".planet-name");
let planetText = $(".planet-description");
let planetDestance = $(".destance");
let planetTravel = $(".travel-time");

$(".planet").click(function (event) {
  let current = event.currentTarget;
  let num = current.dataset.num;
  $.getJSON("../data.json", function (data) {
    planetPic.attr("src", data["destinations"][num]["images"]["png"]);
    planetName.text(data["destinations"][num]["name"]);
    planetText.text(data["destinations"][num]["description"]);
    planetDestance.text(data["destinations"][num]["distance"]);
    planetTravel.text(data["destinations"][num]["travel"]);
  });
  $(".planet").removeClass("active");
  $(current).addClass("active");
});
