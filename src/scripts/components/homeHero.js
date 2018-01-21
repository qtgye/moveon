class HomeHero {

  constructor($element) {
    this.$element = $($element);
    this.$imageCarousel = this.$element.find('.home-hero__image-carousel');
    this.$contentCarousel = this.$element.find('.home-hero__content__carousel');

    this.bindCarousels();
  }


  bindCarousels() {
    this.$contentCarousel.flickity({
      adaptiveHeight: true,
    });
    this.$imageCarousel.flickity({
      sync: this.$contentCarousel[0],
      prevNextButtons: false,
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
