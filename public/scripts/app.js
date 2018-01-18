(function () {
'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Navigation = function () {
  function Navigation() {
    classCallCheck(this, Navigation);

    this.$nav = $('.nav');
    this.$navToggle = $('.nav__toggle');
    this.$navClose = $('.nav__close');
    this.$dropdown = this.$nav.find('.nav__dropdown');
  }

  createClass(Navigation, [{
    key: 'init',
    value: function init() {
      var _this = this;
      this.$navToggle.click(function (e) {
        e.preventDefault();
        _this.$nav.addClass('nav--visible');
      });
      this.$navClose.click(function (e) {
        e.preventDefault();
        _this.$nav.removeClass('nav--visible');
      });
      this.$dropdown.each(function () {
        var $dropdown = $(this);
        $dropdown.children('a').click(function (e) {
          e.preventDefault();
          $dropdown.toggleClass('nav__dropdown--expanded');
        });
      });
    }
  }]);
  return Navigation;
}();

var Nav = new Navigation();

var Form = function () {
  function Form($element) {
    classCallCheck(this, Form);


    this.$element = $($element);
    this.$inputBlock = this.$element.find('.input-block');
    this.bindLabelAnimation();
  }

  createClass(Form, [{
    key: 'bindLabelAnimation',
    value: function bindLabelAnimation() {
      this.$inputBlock.each(function () {

        var $block = $(this);
        var $input = $block.find('input, select, textarea');

        $input.bind('change', function () {
          var value = $input.val();
          $block.toggleClass('active', value ? true : false);
        }).trigger('change');
      });
    }
  }]);
  return Form;
}();

var Form$1 = {
  init: function init() {

    var $forms = $('form');

    $forms.each(function (index, form) {
      var _form = new Form(form);
    });
  }
};

var $html = $('html');

var Modal = function () {
  function Modal($element) {
    classCallCheck(this, Modal);


    this.$element = $($element);
    this.$close = this.$element.find('.modal__close');
    this.id = this.$element.attr('id');

    if (this.id) {
      this.$toggle = $('[data-modal=' + this.id + ']');
      this.bindToggle();
    }

    this.bindClose();

    // Attach as element data
    this.$element.data('modal', this);
  }

  createClass(Modal, [{
    key: 'bindClose',
    value: function bindClose() {
      var _this = this;
      this.$close.on('click', function () {
        _this.hide();
      });
    }
  }, {
    key: 'bindToggle',
    value: function bindToggle() {
      var _this = this;
      this.$toggle.on('click', function () {
        _this.show();
      });
    }
  }, {
    key: 'show',
    value: function show() {
      $html.css('overflow', 'hidden');
      this.$element.trigger('modalShow');
      this.$element.fadeIn();
    }
  }, {
    key: 'hide',
    value: function hide() {
      var _this = this;
      this.$element.fadeOut(null, function () {
        $html.css('overflow', '');
        _this.$element.trigger('modalHide');
      });
    }
  }]);
  return Modal;
}();

var Modal$1 = {
  init: function init() {

    var $modals = $('.modal');

    $modals.each(function (index, modal) {
      var _form = new Modal(modal);
    });
  }
};

var HomeCarousel = function () {
  function HomeCarousel() {
    classCallCheck(this, HomeCarousel);

    this.$element = $('.home-carousel');
    this.$carousel = this.$element.find('.home-carousel__carousel');
    console.log('this.$carousel', this.$carousel);
  }

  createClass(HomeCarousel, [{
    key: 'init',
    value: function init() {
      this.$carousel.flickity({
        contain: true,
        cellAlign: 'left'
      });
    }
  }]);
  return HomeCarousel;
}();

var HomeCarousel$1 = new HomeCarousel();

var SignForm = function () {
  function SignForm($element) {
    classCallCheck(this, SignForm);

    this.$element = $($element);
    this.$shareModal = $('.share-modal');
    this.bindSubmit();
  }

  createClass(SignForm, [{
    key: 'bindSubmit',
    value: function bindSubmit() {
      var _this = this;
      this.$element.on('submit', function (e) {
        e.preventDefault();
        _this.showShareModal();
      });
    }
  }, {
    key: 'showShareModal',
    value: function showShareModal() {
      var _shareModal = this.$shareModal.data('modal');
      if (_shareModal) {
        _shareModal.show();
      }
    }
  }]);
  return SignForm;
}();

var SignForm$1 = {
  init: function init() {

    var $forms = $('.sign-form');

    $forms.each(function (index, form) {
      var _form = new SignForm(form);
    });
  }
};

var PetitionComments = function () {
  function PetitionComments($element) {
    classCallCheck(this, PetitionComments);

    this.$element = $($element);
    this.$commentsToggle = this.$element.find('.petition-details__comments__toggle');
    this.bindCommentsToggle();
  }

  createClass(PetitionComments, [{
    key: 'bindCommentsToggle',
    value: function bindCommentsToggle() {
      var _this = this;
      this.$commentsToggle.on('click', function (e) {
        e.preventDefault();
        _this.$element.toggleClass('expanded');
      });
    }
  }]);
  return PetitionComments;
}();

var PetitionComments$1 = {
  init: function init() {

    var $comments = $('.petition-details__comments');

    $comments.each(function (index, comment) {
      var _form = new PetitionComments(comment);
    });
  }
};

var DonateReceipt = function () {
  function DonateReceipt($element) {
    classCallCheck(this, DonateReceipt);


    this.$element = $($element);
    this.$viewBtn = this.$element.next('.donate-confirm__view-receipt');
    this.$hideBtn = this.$element.nextAll('.donate-confirm__hide-receipt');
    this.bindButtons();
  }

  createClass(DonateReceipt, [{
    key: 'bindButtons',
    value: function bindButtons() {
      var _this = this;
      this.$viewBtn.on('click', function () {
        _this.$element.addClass('visible');
      });
      this.$hideBtn.on('click', function () {
        _this.$element.removeClass('visible');
      });
    }
  }]);
  return DonateReceipt;
}();

var DonateReceipt$1 = {
  init: function init() {

    var $receipt = $('.donate-receipt');

    $receipt.each(function (index, el) {
      var _receipt = new DonateReceipt(el);
    });
  }
};

$(document).ready(function () {
  Nav.init();
  HomeCarousel$1.init();
  Form$1.init();
  Modal$1.init();
  SignForm$1.init();
  PetitionComments$1.init();
  DonateReceipt$1.init();
});

}());
//# sourceMappingURL=app.js.map
