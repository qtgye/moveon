import { values as getFormValues } from '../utilities/formData';

class DonateQuickPay {

  constructor($form) {

    this.$form = $($form);
    this.$presetAmountRadios = this.$form.find('[name="amount"]');
    this.$customAmountInput = this.$form.find('[name="other-amount"]');
    this.$customAmountRadio = this.$form.find('#amount-other');
    this.$submit = this.$form.find('[type="submit"]');
    this.bindFields();

  }


  bindFields() {
    let _this = this;

    this.$presetAmountRadios.add(this.$customAmountInput).bind('change keyup', function () {

      // If custom amount is provided, make it required
      if ( _this.$customAmountInput.val() ) {
        _this.$presetAmountRadios.prop('checked', false).attr('required', false);
        _this.$customAmountRadio.prop('checked', true);
        _this.$customAmountInput.attr('required', true);

      // Else, make the preset amount required
      } else {
        _this.$presetAmountRadios.attr('required', true);
        _this.$customAmountRadio.prop('checked', false);
        _this.$customAmountInput.attr('required', false);
      }

      let currentFormData = new FormData(_this.$form[0]);
      let values = [];
      let formData = {};

      // Safari doesnt support FormData.prototype.entries
      if ( currentFormData.values ) {
        values = Array.from(currentFormData.values());
      } else {
        values = getFormValues(_this.$form[0]);
      }

      values = values.filter( value => value );

      let willDisable = values.length ? false : true;
      _this.$submit.attr('disabled', willDisable );

    });
  }

}



export default {

  init() {

    let $donateQuickPay = $('.donate-quickpay-form');

    $donateQuickPay.each(function (index, el) {
      let _donateQuickPay = new DonateQuickPay(el);
    });

  }

}
