const $window = $(window);

const ENABLED_BREAKPOINT = 1280;
const TOP_OFFSET = 130;
const BOTTOM_OFFSET = 46;

class Sticky {

  constructor($element) {

    this.$element = $($element);
    this.$parent = this.$element.parent();
    this.$dummy = $('<div>');

    this.$dummy.appendTo('body');
    this.listenToScroll();
    this.listenToResize();

  }


  listenToResize() {
    let _this = this;

    $window.on('resize', function () {
      if ( $window.width() <= ENABLED_BREAKPOINT ) {
        _this.unstick();
        _this.unanchor();
      } else {
        _this.checkPosition();
      }
    });
  }


  listenToScroll() {
    let _this = this;
    $window.on('scroll', function () {
      _this.checkPosition();
    });
  }

  checkPosition() {
    let parentClientBox = this.$parent[0].getBoundingClientRect();

    if ( parentClientBox.top < TOP_OFFSET ) {

      // If sticked, check if will anchor
      if ( this.isSticked ) {

      }
      // If anchored, check if will stick
      else if ( this.isAnchored ) {

      }
      // If neither, let it stick
      else {

      }

    } else {
      this.reset();
    }
  }


  stick() {
    this.anchored = false;
    this.sticked = true;
  }

  anchor() {
    this.sticked = false;
    this.anchored = true;
  }

  reset() {
    this.$element.css({position: '', top: '', left: ''});
    this.$dummy.css({width: '', height: ''});
  }

}



export default {

  init() {

    let $stickies = $('.sticky');

    $stickies.each(function (index, sticky) {
      let _sticky = new Sticky(sticky);
    });

  }

}
