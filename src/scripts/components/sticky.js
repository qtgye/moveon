const $window = $(window);

const ENABLED_BREAKPOINT = 1280;
const TOP_OFFSET = 130;
const BOTTOM_OFFSET = 46;

class Sticky {

  constructor($element) {

    this.$element = $($element);
    this.$parent = this.$element.parent();
    this.$dummy = $('<div>');

    this.$dummy.insertBefore(this.$element);

    this.checkSize();
    this.listenToScroll();
    this.listenToResize();

  }

  enable() {
    this.enabled = true;
    this.computeMetrics();
    this.checkPosition();
  }

  disable() {
    this.reset();
    this.enabled = false;
  }

  listenToResize() {
    let _this = this;

    $window.on('resize', function () {
      _this.checkSize();
    });
  }


  listenToScroll() {
    let _this = this;
    $window.on('scroll', function () {
      _this.checkPosition();
    });
  }

  computeMetrics() {
    let stickyOffset = this.$element.offset();
    let dummyOffset = this.$dummy.offset();
    let parentOffset = this.$parent.offset();
    let parentHeight = this.$parent.height();

    this.stickyWidth = this.$element.outerWidth();
    this.stickyHeight = this.$element.outerHeight();
    this.stickLeftOffset = stickyOffset.left;
    this.stickTopOffset = dummyOffset.top - TOP_OFFSET;
    this.anchorBottomOffset = parentOffset.top + parentHeight - BOTTOM_OFFSET - TOP_OFFSET - this.stickyHeight;
  }

  checkSize() {
    if ( $window.outerWidth() >= ENABLED_BREAKPOINT ) {
      this.enable();

    } else {
      this.disable();
    }
  }

  checkPosition() {

    if ( !this.enabled ) { return };

    let scrolltop = window.pageYOffset;

    if ( scrolltop > this.stickTopOffset ) {

      if ( scrolltop < this.anchorBottomOffset ) {
        this.stick();
      } else {
        this.anchor();
      }

    } else {
      this.reset();
    }
  }


  stick() {
    this.anchored = false;
    this.sticked = true;

    this.$dummy
    .add(this.$element)
    .css({
      width: this.stickyWidth,
      height: this.stickyHeight
    });

    this.$element.css({
      position: 'fixed',
      left: this.stickLeftOffset,
      top: TOP_OFFSET,
      bottom: '',
    });
  }

  anchor() {
    this.sticked = false;
    this.anchored = true;

    this.$dummy
    .add(this.$element)
    .css({
      width: this.stickyWidth,
      height: this.stickyHeight
    });

    this.$element.css({
      position: 'absolute',
      left: 0,
      top: '',
      bottom: BOTTOM_OFFSET,
    });

  }

  reset() {
    this.sticked = false;
    this.anchored = false;

    this.$dummy
    .add(this.$element)
    .css({
      width: '',
      height: '',
      top: '',
      left: '',
      position: '',
    });
  }

}



export default {

  init() {

    let $stickies = $('.sticky');

    $stickies.each(function (index, sticky) {

      // Bind only if visible
      if ( $(sticky).is(':visible') ) {
        let _sticky = new Sticky(sticky);
      }
    });

  }

}
