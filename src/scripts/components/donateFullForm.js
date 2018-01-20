class DonateFullForm {

  constructor( $element ) {

    this.$form = $($element);
    this.$submit = this.$form.find('[type="submit"]');
    this.$steps = this.$form.find('.donate-form__step');
    this.$paymentFields = this.$form.find('[name="payment"]');
    this.$creditCardRadio = this.$form.find('#credit-card');
    this.$creditCardFields = this.$form.find('.donate-form__cc__fields');

    this.bindform();

  }


  bindform() {
    let _this = this;

    this.$form.on('change', function () {
      let completedSteps = _this.getCompletedStepsCount();
      _this.$submit.attr('disabled', completedSteps !== 3);
    });

    // Credit card fields
    this.$paymentFields.on('change', function () {
      _this.$creditCardFields.toggleClass('visible', _this.$creditCardRadio.is(':checked'));
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
    let stepOneComplete = $step1.find('[name]').filter((i, item) => this.isActiveFormField(item) ).length ? true : false;
    if ( stepOneComplete ) {
      $step1.addClass('completed');
      $step2.addClass('active');
      completedSteps++;
    } else {
      return completedSteps;
    }

    // Step 2
    let stepTwoComplete = $step2.find('[name]').filter((i, item) => this.isActiveFormField(item) ).length ? true : false;
    if ( stepTwoComplete ) {
      $step2.addClass('completed');
      $step3.addClass('active');
      completedSteps++;
    } else {
      return completedSteps;
    }

    // Step 3
    let stepThreeComplete = $step3.find('[name]').filter((i, item) => this.isActiveFormField(item) ).length ? true : false;
    if ( stepThreeComplete ) {
      $step3.addClass('completed');
      completedSteps++;
    } else {
      return completedSteps;
    }

    return completedSteps;
  }


  isActiveFormField( element ) {
    if ( /radio|checkbox/i.test(element.type) ) {
      return element.checked;
    }
    return element.value ? true : false;
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
