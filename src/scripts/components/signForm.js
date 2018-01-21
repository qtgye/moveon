class SignForm {

  constructor($element) {
    this.$element = $($element);
    this.$shareModal = $('.share-modal');
    this.bindSubmit();
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

}



export default {

  init() {
    let $forms = $('.sign-form');

    $forms.each(function (index, form) {
      let _form = new SignForm(form);
    });

    this.$forms = $forms;
    this.$signFormButton = $('.sign-form__modal-toggle');
    this.$signFormModal = $('.sign-form-modal');
    this.bindSignFormButton();
  },


  bindSignFormButton() {
    let _this = this;

    this.$signFormButton.on('click', function (e) {
      e.preventDefault();

      let $visibleForm = _this.$forms.filter(':visible');

      if ( $visibleForm.length ) {
        let $inputToFocus = $visibleForm.find('input').first();
        $inputToFocus.focus();
      } else {
        _this.showSignFormModal();
      }
    });
  },


  showSignFormModal() {
    let _signFormModal = this.$signFormModal.data('modal');
    if ( _signFormModal ) {
      _signFormModal.show();
    }
  }


};
