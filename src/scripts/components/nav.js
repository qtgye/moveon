class Navigation {

  constructor() {
    this.$nav = $('.mo-nav');
    this.$navToggle = $('.mo-nav__toggle');
    this.$navClose = $('.mo-nav__close');
    this.$dropdown = this.$nav.find('.mo-nav__dropdown');
  }

  init() {
    let _this = this;
    this.$navToggle.click(function (e) {
      e.preventDefault();
      _this.$nav.toggleClass('nav--visible');
    });
    this.$navClose.click(function (e) {
      e.preventDefault();
      _this.$nav.removeClass('nav--visible');
    });
    this.$dropdown.each(function () {
      let $dropdown = $(this);
      $dropdown.children('a').click(function (e) {
        e.preventDefault();
        $dropdown.toggleClass('nav__dropdown--expanded')
      });
    });
  }
}

export default (new Navigation);
