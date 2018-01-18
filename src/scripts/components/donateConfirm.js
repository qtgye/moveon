class DonateConfirm {

  constructor( $element ) {

    this.$element = $($element);
    this.$form = this.$element.find('form');
    this.$submit = this.$form.find('[type="submit"]');
    this.bindform();

  }


  bindform() {
    let _this = this;
    this.$form.on('change', function () {
      let formData = new FormData(_this.$form[0]);
      _this.$submit.attr('disabled', formData.entries().length ? true : false);
    });
  }

}


export default {

  init() {

    let $confirm = $('.donate-confirm');

    $confirm.each(function (index, el) {
      let _form = new DonateConfirm(el);
    });

  }

}
