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
  left: var(--hscroll-slider-thumb-shift, 0);
  width: var(--hscroll-slider-thumb-width, 0);
  
  /* Progress style: */
  /* left: 0; */
  /* width: var(--hscroll-slider-scroll-progress); */
}
</style>
```

## Configuration

Hscroll-slider uses html attributes for configuration.

### `area-selector`
Defines the selector of a scrollable area. Default value is `[data-hscroll-slider-area]`.
By default Hscroll-slider tries to find a scrollable area element with the `data-hscroll-slider-area` attribute. If you can't add this attribute to the scrollable area, use the `area-selector` attribute to define your own selector.

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
```

### `slide-selector`
Defines the selector of slides. Default value is `[data-hscroll-slider-slide]`.
By default Hscroll-slider tries to find slide elements with the `data-hscroll-slider-slide` attribute. If you can't add this attribute to the slides, use the `slide-selector` attribute to define your own selector.

```html
<hscroll-slider 
  area-selector=".scrollable-area"
  slide-selector=".slide"
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
```

### `prev-btn-selector`, `next-btn-selector`
Define the selector of buttons. Default values are `[data-hscroll-slider-button-prev]` and `[data-hscroll-slider-button-next]`.
By default Hscroll-slider tries to find button elements with the `data-hscroll-slider-button-prev` and `data-hscroll-slider-button-next` attributes. If you can't add these attributes to the buttons, use the `prev-btn-selector` and the `next-btn-selector` attributes to define your own selectors.

```html
<hscroll-slider 
  area-selector=".scrollable-area"
  slide-selector=".slide"
  prev-btn-selector=".button-prev"
  next-btn-selector=".button-next"
>
  <div class="scrollable-area">
    <div class="slide">1</div>
    <div class="slide">2</div>
    <div class="slide">3</div>
    <div class="slide">4</div>
    <div class="slide">5</div>
    <div class="slide">6</div>
  </div>
  <button class="button button-prev">Prev</button>
  <button class="button button-next">Next</button>
</hscroll-slider>
```

## Read-only attributes

All the read-only attibutes get added to the `hscroll-slider` tag.

### `scrollable`
Appears if the scrollable area is long enough so it requires a scrollbar. You can show buttons and custom scrollbars if this attribute exists.
```css
hscroll-slider[scrollable] .buttons {
  display: block;
}
```

### `scrollable-left`, `scrollable-right`
Appears if it is possible to scroll the scrollable area to the left/right. You can make "Previous"/"Next" buttons look disabled/enabled according to these attributes.
```css
.button-prev,
.button-next {
  opacity: .6;
}
hscroll-slider[scrollable-left] .button-prev,
hscroll-slider[scrollable-right] .button-next {
  opacity: 1;
}
```

### `scrolling`
Appears if a user is scrolling the scrollable area. You can hide a custom scrollbar by default and show it when a user starts scrolling the slider if it is reqiured by a design.
```css
.scrollbar {
  opacity: 0;
}
hscroll-slider[scrolling] .scrollbar {
  opacity: 1;
}
```

## CSS variables
All the CSS variables get applied to the `hscroll-slider` tag.

### `--hscroll-slider-thumb-width`
The variable is intended to be used for building a regular custom scrollbar. The value is the width of the scrollbar thumb as a percentage of the scrollbar track width.
```css
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
  left: var(--hscroll-slider-thumb-shift, 0);
  width: var(--hscroll-slider-thumb-width, 0);
}
```

### `--hscroll-slider-thumb-shift`
The variable is intended to be used for building a regular custom scrollbar. The value is the left point of the scrollbar thumb as a percentage of the scrollbar track width.
```css
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
  left: var(--hscroll-slider-thumb-shift, 0);
  width: var(--hscroll-slider-thumb-width, 0);
}
```

### `--hscroll-slider-scroll-progress`
The variable is intended to be used for building a "progress" type custom scrollbar. The value is how far the content is scrolled as a percentage.
```css
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
  width: var(--hscroll-slider-scroll-progress, 0);
}
```
