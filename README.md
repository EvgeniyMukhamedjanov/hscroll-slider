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
<!-- 2. Wrap the scrollable area in the "hscroll-slider" tag -->
<hscroll-slider>
  <!-- 3. Add the "data-hscroll-slider-area" attribute to the scrollable area -->
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

<!-- 1. Download the "hscroll-slider.min.js" file and include it in your page -->
<script src="/path/to/hscroll-slider.min.js"></script>
```

Hscroll-slider is installed! Now the mouse drag-and-drop functionality is activated.

## Add buttons

1. Add the `data-hscroll-slider-slide` attribute to each slide,
1. add html elements for the "next slide", "previous slide" buttons with the `data-hscroll-slider-button-prev` and `data-hscroll-slider-button-next` attributes accordingly,
1. add CSS:
   1. to show buttons only if the scrollable area is actually scrollable using the `scrollable` attribute provided by Hscroll-slider,
   1. to make buttons look active or disabled depending on the scroll position using the `scrollable-left` and `scrollable-right` attributes provided by Hscroll-slider.

```html
<hscroll-slider>
  <div class="scrollable-area" data-hscroll-slider-area>
    <!-- 1. Add the "data-hscroll-slider-slide" attribute to each slide -->
    <div class="slide" data-hscroll-slider-slide>1</div>
    <div class="slide" data-hscroll-slider-slide>2</div>
    <div class="slide" data-hscroll-slider-slide>3</div>
    <div class="slide" data-hscroll-slider-slide>4</div>
    <div class="slide" data-hscroll-slider-slide>5</div>
    <div class="slide" data-hscroll-slider-slide>6</div>
  </div>
  <!-- 2. Add html elements for the "next slide", "previous slide" buttons -->
  <button class="button button-prev" data-hscroll-slider-button-prev>
    Previous slide
  </button>
  <button class="button button-next" data-hscroll-slider-button-next>
    Next slide
  </button>
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

/* 3.i. Show buttons only if the area is scrollable */
.button {
  display: none;
}
hscroll-slider[scrollable] .button {
  display: block;
}

/* 3.ii. Make buttons look disabled if the area is scrolled till the beginning or till the end  */
hscroll-slider:not([scrollable-left]) .button-prev,
hscroll-slider:not([scrollable-right]) .button-next {
  opacity: .6
}
</style>
```

## Add custom scrollbar

1. Add an Html element that is going to be a custom scrollbar,
1. add CSS:
   1. hide default scrollbar
   1. style the custom scrollbar element using the `--hscroll-slider-thumb-width` and the `--hscroll-slider-thumb-shift` CSS variabled provided by Hscroll-slider (in order to create a "progress" type scrollbar use the `--hscroll-slider-scroll-progress`)

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
  <!-- 1. Add an Html element that is going to be a custom scrollbar -->
  <div class="scrollbar"></div>
  <button class="button button-prev" data-hscroll-slider-button-prev>
    Previous slide
  </button>
  <button class="button button-next" data-hscroll-slider-button-next>
    Next slide
  </button>
</hscroll-slider>

<style>
.scrollable-area {
  overflow: auto;
  display: flex;
}
/* 2.i. Hide default scrollbar */
hscroll-slider[scrollable] .scrollable-area {
  scrollbar-width: none;
}
hscroll-slider[scrollable] .scrollable-area::-webkit-scrollbar {
  display: none;
}

.slide {
  width: 25%;
  flex: 0 0 25%;
}

.button {
  display: none;
}
hscroll-slider[scrollable] .button {
  display: block;
}

hscroll-slider:not([scrollable-left]) .button-prev,
hscroll-slider:not([scrollable-right]) .button-next {
  opacity: .6
}

/* 2.ii. Style the custom scrollbar 
   using the "--hscroll-slider-thumb-width" and the "--hscroll-slider-thumb-shift" CSS variabled for a regular style,
   the "--hscroll-slider-scroll-progress" for the "progress" style */
hscroll-slider[scrollable] .scrollbar {
  width: 100%;
  position: relative;
  height: 4px;
  margin: 10px auto;
  background-color: #E7E7E7;
  border-radius: 1000px;
}
hscroll-slider[scrollable] .scrollbar:before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  background: #adadad;
  border-radius: 1000px;
  
  /* Regular style: */
  width: var(--hscroll-slider-thumb-width, 0);
  left: var(--hscroll-slider-thumb-shift, 0);
  
  /* Progress style: */
  /* width: var(--hscroll-slider-scroll-progress); */
}
</style>
```
