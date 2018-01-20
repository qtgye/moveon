class PriceSelectGroup {

  constructor($element) {

    this.$element = $($element);
    this.$presetAmountRadios = this.$element.find('[name="amount"]');
    this.$customAmountInput = this.$element.find('[name="other-amount"]');
    this.$customAmountRadio = this.$element.find('#amount-other');
    this.bindFields();

  }


  bindFields() {
    let _this = this;

    this.$presetAmountRadios.add(this.$customAmountInput).on('change', function () {

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
    });
  }

}



export default {

  init() {

    let $priceSelectGroup = $('.price-select-group');

    $priceSelectGroup.each(function (index, el) {
      let _priceSelectGroup = new PriceSelectGroup(el);
    });

  }

}
