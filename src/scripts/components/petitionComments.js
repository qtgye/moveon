class PetitionComments {

  constructor($element) {
    this.$element = $($element);
    this.$commentsToggle = this.$element.find('.petition-details__comments__toggle');
    this.bindCommentsToggle();
  }

  bindCommentsToggle() {
    let _this = this;
    this.$commentsToggle.on('click', function (e) {
      e.preventDefault();
      _this.$element.toggleClass('expanded');
    });
  }

}



export default {

  init() {

    let $comments = $('.petition-details__comments');

    $comments.each(function (index, comment) {
      let _form = new PetitionComments(comment);
    });

  }

}
