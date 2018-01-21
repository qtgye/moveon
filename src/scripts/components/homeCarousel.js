class HomeCarousel {

  constructor() {
    this.$element = $('.home-carousel');
    this.$carousel = this.$element.find('.home-carousel__carousel');
    console.log('this.$carousel',this.$carousel);
  }

  init() {
    this.$carousel.flickity({
      cellAlign: 'left',
      wrapAround: true,
    });
  }
}

export default (new HomeCarousel);
