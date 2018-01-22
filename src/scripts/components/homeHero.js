class HomeHero {

  constructor($element) {
    this.$element = $($element);
    this.$imageCarousel = this.$element.find('.home-hero__image-carousel');
    this.$contentCarousel = this.$element.find('.home-hero__content__carousel');

    this.bindCarousels();
  }


  bindCarousels() {
    let _this = this;
    this.$contentCarousel.flickity({
      adaptiveHeight: true,
      wrapAround: true,
    })
    .on('select.flickity', function () {
      let _flickityData = _this.$contentCarousel.data('flickity');
      _this.$contentCarousel.parent().toggleClass('even', (_flickityData.selectedIndex + 1) % 2 == 0);
    });
    this.$imageCarousel.flickity({
      sync: this.$contentCarousel[0],
      prevNextButtons: false,
      wrapAround: true,
    });
  }



}



export default {

  init() {

    let $elements = $('.home-hero');

    $elements.each(function (index, element) {
      let _homeHero = new HomeHero(element);
    });

  }

}
