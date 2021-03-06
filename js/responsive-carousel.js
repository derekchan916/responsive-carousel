$.Carousel = function (el) {
  this.$el = $(el);
  this.$carousel = this.$el.find(".carousel");
  this.$pages = this.$el.find("ul");
  this.$items = this.$el.find("li");
  this.$nav = $("<nav></nav>");

  LARGEMINSIZE = 767;
  LARGECOUNT = 35;
  MEDMINSIZE = 480;
  MEDCOUNT = 15;
  SMALLCOUNT = 12;

  this.currentWindowSize = null;
  this.activeIdx = 0;

  this.processWindowSize();

  this.$el.on("swiperight", this.swipeLeftNav.bind(this));
  this.$el.on("swipeleft", this.swipeRightNav.bind(this));
  this.$el.on("click", "span", this.clickNav.bind(this));
  $(window).on("resize", function() { this.processWindowSize()}.bind(this));
};

$.Carousel.prototype.swipeRightNav = function (e) {
  this.slideTo(this.activeIdx + 1);
};

$.Carousel.prototype.swipeLeftNav = function (e) {
  this.slideTo(this.activeIdx + -1);
};

$.Carousel.prototype.clickNav = function (e) {
  this.slideTo($(e.currentTarget).index());
};

$.Carousel.prototype.slideTo = function (newIdx) {
  if (newIdx == this.activeIdx ||
      newIdx >= this.$pages.length ||
      newIdx < 0) {
    return;
  }

  this.$pages.eq(this.activeIdx).removeClass("active")
  this.$pages.eq(newIdx).addClass("active");
  this.activeIdx = newIdx;
  this.updateNav();
};

$.Carousel.prototype.processWindowSize = function () {
  var windowWidth = $(window).width();
  if (this.between(windowWidth, 0, MEDMINSIZE) && this.currentWindowSize != "small") {
    this.renderPage("small");
  } else if (this.between(windowWidth, MEDMINSIZE, LARGEMINSIZE) && this.currentWindowSize != "medium") {
    this.renderPage("medium");
  } else if (windowWidth > LARGEMINSIZE && this.currentWindowSize != "large") {
    this.renderPage("large");
  }
}

$.Carousel.prototype.renderPage = function (size) {
  var pageCount, logoCount;

  switch (size) {
    case ("small"):
      this.currentWindowSize = "small";
      logoCount = SMALLCOUNT;
      break;
    case ("medium"):
      this.currentWindowSize = "medium";
      logoCount = MEDCOUNT;
      break;
    case ("large"):
      this.currentWindowSize = "large";
      logoCount = LARGECOUNT;
      break;
  }

  pageCount = Math.floor(this.$items.length / logoCount);
  this.buildPages(pageCount, logoCount);
  this.buildNav(pageCount);
};

$.Carousel.prototype.buildPages = function (pageCount, logoCount) {
  var $ul, i, j;
  this.$carousel.empty();

  for (i = 0; i <= pageCount; i++) {
    $ul = $("<ul></ul>");

    for (j = logoCount * i; j < logoCount * i + logoCount; j++) {
      $ul.append(this.$items[j]);
    }

    this.$carousel.append($ul);
  }

  this.$pages = this.$el.find("ul");
  this.$pages.first().addClass("active");
}

$.Carousel.prototype.buildNav = function (pageCount) {
  var i;
  this.$nav.empty();

  if (pageCount > 0) {
    for (i = 0; i < pageCount + 1; i++) {
      this.$nav.append("<span><div></div></span>");
    }
  }

  this.$el.append(this.$nav);
  this.activeIdx = 0;
  this.updateNav();
};

$.Carousel.prototype.updateNav = function () {
  this.$nav.children()
           .removeClass("current")
           .eq(this.activeIdx)
           .addClass("current");
};

//DOM FORMAT
// var el = document.getElementsByTagName("span")
// for (var i = 0; i < el.length; i++) {
//   el[i].classList.remove("current")
// }
// el[this.activeIdx].classList.add("current")
//
// var el = document.getElementsByClassName("current")
//
// for (var i = 0; i < el.length; i++) {
//   el[i].classList.remove("current")
// }
//
// document.getElementsByTagName("span")[1].classList.add("current")

$.Carousel.prototype.between = function (x, min, max) {
  return x >= min && x <= max;
}

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};

$(function () {
  //in case we have more carousels
  $(".container").carousel();
});
