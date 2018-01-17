const $html = $('html');

class Modal {

  constructor($element) {

    this.$element = $($element);
    this.$close = this.$element.find('.modal__close');
    this.id = this.$element.attr('id');

    if ( this.id ) {
      this.$toggle = $('[data-modal='+this.id+']');
      this.bindToggle();
    }

    this.bindClose();

    // Attach as element data
    this.$element.data('modal', this);

  }


  bindClose() {
    let _this = this;
    this.$close.on('click', function () {
      _this.hide()
    });
  }


  bindToggle() {
    let _this = this;
    this.$toggle.on('click', function () {
      _this.show();
    });
  }


  show() {
    $html.css('overflow', 'hidden');
    this.$element.trigger('modalShow');
    this.$element.fadeIn();
  }

  hide() {
    this.$element.fadeOut(null, function () {
      $html.css('overflow', '');
      this.$element.trigger('modalHide');
    });
  }

}



export default {

  init() {

    let $modals = $('.modal');

    $modals.each(function (index, modal) {
      let _form = new Modal(modal);
    });

  }

}
