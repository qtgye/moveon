import { entries as getFormEntries } from '../utilities/formData';

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

class DonateFullForm {

  constructor( $element ) {

    this.$form = $($element);
    this.$submit = this.$form.find('[type="submit"]');
    this.$steps = this.$form.find('.donate-form__step');

    this.$unemployedCheckbox = this.$form.find('[name="unemployed"]');
    this.$employmentFields = this.$form.find('[name=employer],[name=occupation]')

    this.$paymentFields = this.$form.find('[name="payment"]');
    this.$creditCardRadio = this.$form.find('#credit-card');
    this.$creditCardFields = this.$form.find('.donate-form__cc__fields');

    this.formData = {};

    this.bindform();
    this.bindEmploymentFields();
    this.bindPaymentFields();
    // this.bindSteps();

  }


  bindform() {
    let _this = this;

    this.$form.on('change', function () {

      let currentFormData = new FormData(_this.$form[0]);
      let entries = [];

      // Safari doesnt support FormData.prototype.entries
      if ( currentFormData.entries ) {
        entries = Array.from(currentFormData.entries());
      } else {
        entries = getFormEntries(_this.$form[0]);
      }

      // Reset existing formData
      _this.formData = {};
      entries.forEach( entry => _this.formData[entry[0]] = entry[1] );

      let completedSteps = _this.getCompletedStepsCount();
      _this.$submit.attr('disabled', completedSteps !== 3);
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


  bindSteps() {
    let _this = this;

    this.$steps.each(function () {

      let $step = $(this);
      let $stepInputs = $step.find('[name]');
      let $otherSteps = _this.$steps.not(this);

      $step.find('[name]').on('focus', function () {
          $otherSteps.removeClass('current');
          $step.addClass('current');
        });
    });
  }


  getCompletedStepsCount() {

    let completedSteps = 0;
    let $step1 = this.$steps.eq(0);
    let $step2 = this.$steps.eq(1);
    let $step3 = this.$steps.eq(2);

    // Disable others first
    $step2.add($step3).removeClass('active');
    this.$steps.removeClass('completed');

    // Step 1
    if ( this.checkStep1Completion() ) {
      $step2.addClass('active');
      completedSteps++;
    } else {
      return completedSteps;
    }

    // Step 2
    if ( this.checkStep2Completion() ) {
      $step3.addClass('active');
      completedSteps++;
    } else {
      return completedSteps;
    }

    // Step 3
    if ( this.checkStep3Completion() ) {
      completedSteps++;
    } else {
      return completedSteps;
    }

    return completedSteps;
  }

  checkStep1Completion() {
    let $step1 = this.$steps.eq(0);
    let isComplete = false;
    let { amount, 'other-amount': otherAmount } = this.formData;

    // Either preset amount or custom amount should be supplied
    isComplete = (amount || otherAmount) ? true : false;
    $step1.toggleClass('completed', isComplete);

    return isComplete;
  }

  checkStep2Completion() {
    let _this = this;
    let $step2 = this.$steps.eq(1);
    let isComplete = false;
    let { name, email, unemployed, employer, occupation } = this.formData;

    // Name and email are required
    isComplete = name && this.isValidEmail(email) ? true : false;
    // If employed, employer and occupation are required as well
    isComplete = unemployed ? isComplete : isComplete && (employer && occupation) ? true : false;

    $step2.toggleClass('completed', isComplete);

    return isComplete;
  }

  checkStep3Completion() {
    let _this = this;
    let $step3 = this.$steps.eq(2);
    let isComplete = false;
    let { payment } = this.formData;
    let paymentMode = this.$form[0].payment.value;
    // Credit card fields
    let {
      ccNumber,
      ccExpiration,
      ccBilling,
      ccCity,
      ccState,
      ccZip,
    } = this.formData;

    isComplete = payment ? true : false;
    // If payment is credit card, cc fields are required
    isComplete = paymentMode !== 'credit-card' ? isComplete : isComplete && ccNumber && ccExpiration && ccBilling && ccCity && ccState && ccZip ? true : false;

    $step3.toggleClass('completed', isComplete);

    return isComplete;
  }


  isValidEmail( email ) {
    return EMAIL_REGEX.test(email);
  }

}


export default {

  init() {

    let $shortform = $('.donate-form-full');

    $shortform.each(function (index, el) {
      let _form = new DonateFullForm(el);
    });

  }

}
