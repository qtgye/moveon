class DonateReceipt {

  constructor($element) {

    this.$element = $($element);
    this.$viewBtn = this.$element.next('.donate-confirm__view-receipt');
    this.$hideBtn = this.$element.nextAll('.donate-confirm__hide-receipt');
    this.bindButtons();

  }


  bindButtons() {
    let _this = this;
    this.$viewBtn.on('click', function () {
      _this.$element.addClass('visible');
    });
    this.$hideBtn.on('click', function () {
      _this.$element.removeClass('visible');
    });
  }

}



export default {

  init() {

    let $receipt = $('.donate-receipt');

    $receipt.each(function (index, el) {
      let _receipt = new DonateReceipt(el);
    });

  }

}
