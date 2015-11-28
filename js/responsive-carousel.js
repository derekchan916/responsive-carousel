$.Carousel = function (el) {
  this.$el = $(el);
  this.$carousel = this.$el.find(".carousel");
  this.$pages = this.$el.find("ul");
  this.$items = this.$el.find("li");
  this.$nav = $("<nav></nav>");

  LARGEMINSIZE = 767;
  LARGECOUNT = 35;
  MEDMINSIZE = 480;
  MEDCOUNT = 20;
  SMALLCOUNT = 16;

  this.currentWindowSize = null;
  this.activeIdx = 0;

  this.processWindowSize();

  this.$el.on("click", "span", this.clickNav.bind(this));
  $(window).on("resize", function() { this.processWindowSize()}.bind(this));
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

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};

$(function () {
  //in case we have more carousels
  $(".container").carousel();
});
