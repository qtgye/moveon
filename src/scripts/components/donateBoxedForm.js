// In contrast to the full form, this has:
//    - no steps
//    - no paypal option
// Validation occurs on the whole form at once

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

class DonateBoxedForm {

  constructor( $element ) {

    this.$form = $($element);
    this.$submit = this.$form.find('[type="submit"]');

    this.$unemployedCheckbox = this.$form.find('[name="unemployed"]');
    this.$employmentFields = this.$form.find('[name=employer],[name=occupation]')

    this.$paymentFields = this.$form.find('[name="payment"]');
    this.$creditCardRadio = this.$form.find('#credit-card');
    this.$creditCardFields = this.$form.find('.donate-form__cc__fields');

    this.formData = {};

    this.bindform();
    this.bindEmploymentFields();

  }


  bindform() {
    let _this = this;

    this.$form.on('change', function () {

      let currentFormData = new FormData(_this.$form[0]);
      let entries = Array.from(currentFormData.entries());

      // Reset existing formData
      _this.formData = {};
      entries.forEach( entry => _this.formData[entry[0]] = entry[1] );

      let isFormCompleted = _this.checkFormCompletion();
      _this.$submit.attr('disabled', !isFormCompleted);
    });

  }

  bindEmploymentFields() {
    let _this = this;

    // Unemployed checkbox is unchecked by default
    this.$unemployedCheckbox.on('change', function () {
      let isUnemployed = _this.$unemployedCheckbox.is(':checked');
      _this.$employmentFields.attr({
        disabled: isUnemployed,
        required: isUnemployed,
      });
    });
  }


  bindPaymentFields() {
    let _this = this;
    let $crediCardInputs = this.$creditCardFields.find('[name]:not(#save)');

    this.$paymentFields.on('change', function () {
      let isCreditCardSelected = _this.$creditCardRadio.is(':checked');
      _this.$creditCardFields.toggleClass('visible', isCreditCardSelected);
      $crediCardInputs.attr('required', isCreditCardSelected);
    });
  }


  checkFormCompletion() {
    let {
      amount, 'other-amount': otherAmount,
      name, email, unemployed, employer, occupation,
      ccNumber, ccExpiration, ccBilling, ccCity, ccState, ccZip,
    } = this.formData;
    let isValidAmount, isValidBilling, isValidEmployment, isValidCard;

    // Validate amount
    isValidAmount = (amount || otherAmount) ? true : false;
    // Validate card info
    isValidCard = (ccNumber && ccExpiration) ? true : false;
    // Validate employement
    isValidEmployment = unemployed ? true : (employer && occupation) ? true : false;
    // Valid billing info
    isValidBilling = (name && this.isValidEmail(email) && ccBilling && ccCity && ccState && ccZip ) ? true : false;

    return isValidAmount && isValidBilling && isValidEmployment && isValidCard;
  }

  isValidEmail( email ) {
    return EMAIL_REGEX.test(email);
  }

}


export default {

  init() {

    let $boxedform = $('.donate-form-boxed');

    $boxedform.each(function (index, el) {
      let _form = new DonateBoxedForm(el);
    });

  }

}
