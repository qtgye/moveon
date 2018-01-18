class SignForm {

  constructor($element) {
    this.$element = $($element);
    this.$signButton = $('.sign-form__modal-toggle');
    this.$signForms = $('.sign-form');
    this.$signFormModal = $('.sign-form-modal');
    this.$shareModal = $('.share-modal');
    this.bindSubmit();
    this.bindSignFormButton();
  }

  bindSubmit() {
    let _this = this;
    this.$element.on('submit', function (e) {
      e.preventDefault();
      _this.showShareModal();
    });
  }

  showShareModal() {
    let _shareModal = this.$shareModal.data('modal');
    if ( _shareModal ) {
      _shareModal.show();
    }
  }

  bindSignFormButton() {
    let _this = this;
    this.$signButton.on('click', function () {
      let $visibleForm = _this.$signForms.filter(':visible');

      if ( $visibleForm.length ) {
        let $inputToFocus = $visibleForm.find('input').first();
        $inputToFocus.focus();
      } else {
        _this.showSignFormModal();
      }

    });
  }

  showSignFormModal() {
    let _signFormModal = this.$signFormModal.data('modal');
    if ( _signFormModal ) {
      _signFormModal.show();
    }
  }


}



export default {

  init() {

    let $forms = $('.sign-form');

    $forms.each(function (index, form) {
      let _form = new SignForm(form);
    });

  }

}
