class DonateShortForm {

  constructor( $element ) {

    this.$form = $($element);
    this.$submit = this.$form.find('[type="submit"]');
    this.bindform();

  }


  bindform() {
    let _this = this;
    this.$form.on('change', function () {
      let formData = new FormData(_this.$form[0]);
      let willDisable = Array.from(formData.values()).filter( value => value ).length ? false : true;
      _this.$submit.attr('disabled', willDisable );
    });
  }

}


export default {

  init() {

    let $shortform = $('.donate-shortform');

    $shortform.each(function (index, el) {
      let _form = new DonateShortForm(el);
    });

  }

}
