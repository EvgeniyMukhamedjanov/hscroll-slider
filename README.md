# &lt;hscroll-slider&gt;

A custom element that turns a horizontally scrollable area into a slider.

## Installation

Lets say you have a horizontally scrollable area (`.scrollable-area`) with a lot of items (`.slide`)
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

In order to start using the "hscroll-slider" component:
1. download the `hscroll-slider.min.js` file and include it in your page,
1. wrap the scrollable area in the `hscroll-slider` tag,
1. specify the scrollable area css selector

```html
<!-- 2. wrap the scrollable area in the `hscroll-slider` tag -->
<!-- 3. specify the scrollable area css selector -->
<hscroll-slider
  area-selector=".scrollable-area"
>
  <div class="scrollable-area">
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

Now the mouse drag-and-drop functionality will be activated.

## Add buttons

1. Add html elements for the "next slide", "previous slide" buttons with unique css classes or attributes
2. Specify button selectors for the `hscroll-slider` element using the `prev-btn-selector` and `next-btn-selector` attributes.

```html
<hscroll-slider
  area-selector=".scrollable-area"
>
  <div class="scrollable-area">
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
```
