class Form {

  constructor($element) {

    this.$element = $($element);
    this.$inputBlock = this.$element.find('.input-block');
    this.bindLabelAnimation();

  }

  bindLabelAnimation() {
    this.$inputBlock.each(function () {

      let $block = $(this);
      let $input = $block.find('input, select, textarea');

      // Safari doesn't emit events on autocomplete, so we must listen to blur and keyup as well
      $input.bind('change keyup blur', function () {
        let value = $input.val();
        $block.toggleClass('active', value ? true : false);
      }).trigger('change');

    });
  }

}



export default {

  init() {

    let $forms = $('form');

    $forms.each(function (index, form) {
      let _form = new Form(form);
    });

  }

}
