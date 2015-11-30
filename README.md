# Slideshow Replica
[Live](http://derekwychan.com/responsive-carousel/html/responsive-carousel.html)

## Scalability

This web application is scalable to the amount of logos.

In order for it to not constantly load and make the screen lag if there were many, many logos, it only renders when the screen size makes major changes. For example from Large to Medium, or from Medium to Small. I did this by creating a variable this.currentWindowSize. I also stored the screen width values in constants.

See the [Javascript Page](https://github.com/derekchan916/responsive-carousel/blob/master/js/responsive-carousel.js) for details

## Carousel

The page uses a carousel by using position:absolute on the different pages, and revealing the pages with class="active". I used a lot of CSS styling tricks and finally got it to work!

See the [CSS Page](https://github.com/derekchan916/responsive-carousel/blob/master/css/responsive-carousel.css) for details

## Window Resizing

There are a couple of ways I dealt with responsive window resizing. I used bootstrap earlier; however, I had to customize a lot of Bootstrap's code so I ended up just creating it  myself.

Using @media
```css
  @media (min-width: 767px) {
    .carousel > ul > li {
        margin: 0 2.5% 20px;
        width: 8.5%;
    }
    .carousel {
        height: 420px;
    }
  }
```

Using jQuery
```Javascript
  $(window).on("resize", function() { this.processWindowSize()}.bind(this));
```
## Mobile Swiping

Reading the swiping effect was rather easy with jQuery giving you a reader
```Javascript
  this.$el.on("swiperight", this.swipeLeftNav.bind(this));
  this.$el.on("swipeleft", this.swipeRightNav.bind(this));
```
