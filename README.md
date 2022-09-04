# Hscroll-slider

A custom element that turns a regular scrollable area into a slider.

## Installation

Lets say you have a regular horizontal scrollable area with a lot of slides.
```html
<div class="scrollable-area">
  <div class="slide">1</div>
  <div class="slide">2</div>
  <div class="slide">3</div>
  <div class="slide">4</div>
  <div class="slide">5</div>
  <div class="slide">6</div>
</div>

<style>
.scrollable-area {
  overflow: auto;
  display: flex;
}
.slide {
  width: 25%;
  flex: 0 0 25%;
}
</style>
```

In order to improve apply Hscroll-slider:
1. download the `hscroll-slider.min.js` file and include it in your page *(npm soon)*,
1. wrap the scrollable area in the `hscroll-slider` tag,
1. add the `data-hscroll-slider-area` attribute to the scrollable area (the one with `overflow: auto`).

```html
<!-- 2. wrap the scrollable area in the `hscroll-slider` tag -->
<!-- 3. specify the scrollable area css selector -->
<hscroll-slider>
  <div class="scrollable-area" data-hscroll-slider-area>
    <div class="slide">1</div>
    <div class="slide">2</div>
    <div class="slide">3</div>
    <div class="slide">4</div>
    <div class="slide">5</div>
    <div class="slide">6</div>
  </div>
</hscroll-slider>

<style>
.scrollable-area {
  overflow: auto;
  display: flex;
}
.slide {
  width: 25%;
  flex: 0 0 25%;
}
</style>

<!-- 1. download the `hscroll-slider.min.js` file and include it in your page -->
<script src="/path/to/hscroll-slider.min.js"></script>
```

Hscroll-slider is installed! Now the mouse drag-and-drop functionality is activated.

## Add buttons

1. Add html elements for the "next slide", "previous slide" buttons with the `data-hscroll-slider-button-prev` and `data-hscroll-slider-button-next` attributes accordingly,
2. Add the `data-hscroll-slider-slide` attribute to each slide.

```html
<hscroll-slider>
  <div class="scrollable-area" data-hscroll-slider-area>
    <div class="slide" data-hscroll-slider-slide>1</div>
    <div class="slide" data-hscroll-slider-slide>2</div>
    <div class="slide" data-hscroll-slider-slide>3</div>
    <div class="slide" data-hscroll-slider-slide>4</div>
    <div class="slide" data-hscroll-slider-slide>5</div>
    <div class="slide" data-hscroll-slider-slide>6</div>
  </div>
  <button data-hscroll-slider-button-prev>Previous slide</button>
  <button data-hscroll-slider-button-next>Next slide</button>
</hscroll-slider>

<style>
.scrollable-area {
  overflow: auto;
  display: flex;
}
.slide {
  width: 25%;
  flex: 0 0 25%;
}
</style>
```
