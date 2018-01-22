import { entries as getFormEntries } from '../utilities/formData';

class DonateShortForm {

  constructor( $element ) {

    this.$form = $($element);
    this.$submit = this.$form.find('[type="submit"]');
    this.bindform();

  }


  bindform() {
    let _this = this;
    this.$form.on('change', function () {
      let currentFormData = new FormData(_this.$form[0]);
      let entries = [];
      let formData = {};

      // Safari doesnt support FormData.prototype.values
      if ( currentFormData.values ) {
        entries = Array.from(currentFormData.values());
      } else {
        entries = getFormEntries(_this.$form[0]);
      }

      entries.map( entry => formData[entry[0]] = entry[1]);

      let willDisable = formData.amount && formData['other-amount'] ? false : true;
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
