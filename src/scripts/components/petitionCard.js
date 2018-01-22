class PetitionCard {

  constructor($element) {
    this.$element = $($element);
    this.$seeMoreToggle = this.$element.find('.petition-card__more-cta');
    this.bindSeeMoreToggle();
  }


  bindSeeMoreToggle() {
    let _this = this;
    this.$seeMoreToggle.on('click', function (e) {
      e.preventDefault();
      _this.$element.addClass('description-expanded');
    });
  }



}



export default {

  init() {

    let $elements = $('.petition-card');

    $elements.each(function (index, element) {
      let _PetitionCard = new PetitionCard(element);
    });

  }

}
