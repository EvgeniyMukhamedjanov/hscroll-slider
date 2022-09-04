// if the drag distance (px) is more than dragThreshold, 
// then click event will be ignored
const dragThreshold = 5; 

const attributes = {
  areaSelector: 'area-selector',
  slideSelector: 'slide-selector',
  prevButtonSelector: 'prev-btn-selector',
  nextButtonSelector: 'next-btn-selector',
  scrollable: 'scrollable',
  scrollableLeft: 'scrollable-left',
  scrollableRight: 'scrollable-right',
  scrolling: 'scrolling'
}

const cssVars = {
  thumbWidth: 'hscroll-slider-thumb-width',
  thumbShift: 'hscroll-slider-thumb-shift',
  scrollProgress: 'hscroll-slider-scroll-progress'
}

const defaultSelectors = {
  area: '[data-hscroll-slider-area]',
  slide: '[data-hscroll-slider-slide]',
  prevButton: '[data-hscroll-slider-button-prev]',
  nextButton: '[data-hscroll-slider-button-next]'
}

if (!customElements.get('hscroll-slider')) {
  customElements.define('hscroll-slider',class HScrollSlider extends HTMLElement {
    constructor() {
      super();
      this._props = {
        scrollTimer: undefined
      }


      

      // this.scrollTimer = undefined;
      // this._props.$scrollableArea.addEventListener('scroll', (() => {
      //   this.updateScroll();
      //   this.updateScrollingClass(true);
      //   if (this.scrollTimer !== undefined) {
      //     clearTimeout(this.scrollTimer);
      //   }
      //   this.scrollTimer = setTimeout(() => {
      //     this.updateScrollingClass(false);
      //   }, 150);
      // }).bind(this));

      // window.addEventListener('resize', this.render.bind(this));
      // new MutationObserver((mutationsList, observer) => {
      //   this.carouselItems = this.querySelectorAll(`[${ carouselItemAttr }]`);
      //   this.render();
      // }).observe(this._props.$scrollableArea, {
      //   childList: true,
      //   subtree: true
      // });
      // this.render();
    }

    connectedCallback() {
      this.init();
      
      window.addEventListener('resize', this.render.bind(this));
      this.render();
    }

    init() {
      this.initScrollableArea();
      this.initSlides();
      this.initButtons();
    }

    initScrollableArea() {
      let $scrollableArea = null;
      const scrollableAreaSelector = this.getAttribute(attributes.areaSelector) || defaultSelectors.area;
      if (scrollableAreaSelector) {
        $scrollableArea = this.querySelector(scrollableAreaSelector);
      }
      if ($scrollableArea === this._props.$scrollableArea) return;

      if ($scrollableArea) {
        $scrollableArea.addEventListener('mousedown', event => {
          this._props.isMouseDown = true;
          this._props.startX = event.pageX - $scrollableArea.offsetLeft;
          this._props.scrollLeft = $scrollableArea.scrollLeft;
          // this.updateScrollingClass();
        });

        $scrollableArea.addEventListener('mouseleave', () => {
          this._props.isMouseDown = false;
          // this.updateScrollingClass();
        });

        $scrollableArea.addEventListener('mouseup', () => {
          this._props.isMouseDown = false;
          // this.updateScrollingClass();
        });

        $scrollableArea.addEventListener('mousemove', event => {
          if (!this._props.isMouseDown) return;
          event.preventDefault(); // todo: remove ?
          const currentX = event.pageX - $scrollableArea.offsetLeft;
          const dragValue = (currentX - this._props.startX);
          if (Math.abs(dragValue) > dragThreshold) {
            this._props.isDragged = true;
          }
          $scrollableArea.scrollLeft = this._props.scrollLeft - dragValue;
        });

        $scrollableArea.addEventListener('click', event => {
          if (this._props.isDragged) {
            event.preventDefault();
          }
          this._props.isDragged = false;
        });

        $scrollableArea.addEventListener('scroll', () => {
          this.render();
          this.setAttribute(attributes.scrolling, '');
          if (this.scrollTimer !== undefined) {
            clearTimeout(this.scrollTimer);
          }
          this.scrollTimer = setTimeout(() => {
            this.removeAttribute(attributes.scrolling, '');
          }, 150);
        });
      }

      this._props = {
        ...this._props,
        isMouseDown: false,
        isDragged: false, // was the $scrollableArea dragged before the upcoming "click" event
        startX: undefined,
        scrollLeft: undefined,
        $scrollableArea,
      }
    }

    initSlides() {
      let $slides = [];
      const slideSelector = this.getAttribute(attributes.slideSelector) || defaultSelectors.slide;
      if (slideSelector && this._props.$scrollableArea) {
        $slides = [...this._props.$scrollableArea.querySelectorAll(slideSelector)];
      }
      this._props.$slides = $slides;
    }

    initButtons() {
      if (!('$buttons' in this._props)) {
        this._props.$buttons = [];
      }

      const prevButtonSelector = this.getAttribute(attributes.prevButtonSelector) || defaultSelectors.prevButton;
      if (prevButtonSelector) {
        this.querySelectorAll(prevButtonSelector).forEach($button => {
          if (this._props.$buttons.includes($button)) return;
          $button.addEventListener('click', () => {
            this.goToPrevSlide();
          });
          this._props.$buttons.push($button);
        })
      }

      const nextButtonSelector = this.getAttribute(attributes.nextButtonSelector) || defaultSelectors.nextButton;
      if (nextButtonSelector) {
        this.querySelectorAll(nextButtonSelector).forEach($button => {
          if (this._props.$buttons.includes($button)) return;
          $button.addEventListener('click', () => {
            this.goToNextSlide();
          });
          this._props.$buttons.push($button);
        })
      }
    }

    updateScrollingClass(isScrolling) {
      this.scrollingClassElements.forEach(element => {
        const scrollingClass = element.getAttribute(scrollingClassAttr);
        if (!scrollingClass) return;
        if (isScrolling) {
          element.classList.add(scrollingClass);
        } else {
          element.classList.remove(scrollingClass);
        }
      })
    }

    goToPrevSlide() {
      if (this._props.$slides.length > 0) {
        let newScrollLeft = 0;
        const originPoint = this._props.$slides[0].offsetLeft;
        const scrollLeft = this._props.$scrollableArea.scrollLeft;
        const $prevSlide = [...this._props.$slides].reverse().find($element => $element.offsetLeft < scrollLeft + originPoint);
        if ($prevSlide) {
          newScrollLeft = $prevSlide.offsetLeft - originPoint;
        }
        if (newScrollLeft < 0) {
          newScrollLeft = 0
        }
        // this._props.$scrollableArea.scrollLeft = newScrollLeft;
        this._props.$scrollableArea.scrollTo({
          top: 0,
          left: newScrollLeft,
          behavior: 'smooth'
        });
        // this.updateScroll();
      }
    }

    goToNextSlide() {
      if (this._props.$slides.length > 0) {
        const maxScroll = this._props.$scrollableArea.scrollWidth - this._props.$scrollableArea.clientWidth;
        let newScrollLeft = maxScroll;
        const originPoint = this._props.$slides[0].offsetLeft;
        const scrollLeft = this._props.$scrollableArea.scrollLeft;
        const $nextSlide = this._props.$slides.find($element => $element.offsetLeft > scrollLeft + originPoint + 1);
        if ($nextSlide) {
          newScrollLeft = $nextSlide.offsetLeft - originPoint;
        }
        if (newScrollLeft > maxScroll) {
          newScrollLeft = maxScroll
        }
        // this._props.$scrollableArea.scrollLeft = newScrollLeft;
        this._props.$scrollableArea.scrollTo({
          top: 0,
          left: newScrollLeft,
          behavior: 'smooth'
        });
      }
    }

    render() {
      this.renderCssVars();
      this.renderAttributes();
    }

    renderCssVars() {
      if (!this._props.$scrollableArea) return;
      let thumbWidth = 100;
      let thumbShift = 0;
      let scrollProgress = 0;

      const clientWidth = this._props.$scrollableArea.clientWidth;
      const scrollWidth = this._props.$scrollableArea.scrollWidth;
      const scrollLeft = this._props.$scrollableArea.scrollLeft;
      const maxScroll = scrollWidth - clientWidth;

      if (scrollWidth > clientWidth) {
        thumbWidth = clientWidth * 100.0 / scrollWidth;
        thumbShift = scrollLeft * 100.0 / scrollWidth;
        scrollProgress = scrollLeft * 100.0 / maxScroll;
      }

      this.style.setProperty(`--${ cssVars.thumbWidth }`, `${ thumbWidth }%`);
      this.style.setProperty(`--${ cssVars.thumbShift }`, `${ thumbShift }%`);
      this.style.setProperty(`--${ cssVars.scrollProgress }`, `${ scrollProgress }%`);
    }

    renderAttributes() {
      const $scrollableArea = this._props.$scrollableArea;
      if (!$scrollableArea) return;

      const isScrollable = $scrollableArea.scrollWidth > $scrollableArea.clientWidth;
      if (isScrollable) {
        this.setAttribute(attributes.scrollable, '');

        if ($scrollableArea.scrollLeft > 0) {
          this.setAttribute(attributes.scrollableLeft, '');
        } else {
          this.removeAttribute(attributes.scrollableLeft);  
        }

        if ($scrollableArea.scrollLeft < $scrollableArea.scrollWidth - $scrollableArea.clientWidth) {
          this.setAttribute(attributes.scrollableRight, '');
        } else {
          this.removeAttribute(attributes.scrollableRight);
        } 

      } else {
        this.removeAttribute(attributes.scrollable);
        this.removeAttribute(attributes.scrollableLeft);
        this.removeAttribute(attributes.scrollableRight);
      }
    }
  });
}