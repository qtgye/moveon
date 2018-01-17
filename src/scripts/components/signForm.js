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

  }

}
