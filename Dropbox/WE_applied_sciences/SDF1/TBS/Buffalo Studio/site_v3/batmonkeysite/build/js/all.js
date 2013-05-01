//@ sourceMappingURL=all.map
// Generated by CoffeeScript 1.6.1
(function() {
  var CharacterLimitedField, Field, Fieldset, Form, ModalShell, PersonalizationModule, ToolTip, Validator,
    _this = this;

  this.pocLib = {
    forms: [],
    selections: {},
    environment: {}
  };

  $(function() {
    var form, form_nav_links, main_form;
    pocLib.selections.body = $(document.body);
    pocLib.selections.html = $('html');
    form = $('form[action="complete.html"]');
    if (form.length) {
      main_form = new Form($('form[action="complete.html"]'), false);
    }
    $('#cvv input').remote_focus($("#card_imagery"));
    form_nav_links = $('body > nav a');
    $('#preferences section').personalize();
    $("[data-modal-id]").modalize();
    $(main_form).bind("advance", function() {
      var profile_widget, promo_boxes, _base, _base1, _ref, _ref1;
      if ((_ref = (_base = pocLib.selections).profile_widget) == null) {
        _base.profile_widget = $('#profile_widget');
      }
      profile_widget = pocLib.selections.profile_widget;
      if ((_ref1 = (_base1 = pocLib.selections).promo_boxes) == null) {
        _base1.promo_boxes = $('.promo-box', profile_widget);
      }
      promo_boxes = pocLib.selections.promo_boxes;
      form_nav_links.removeClass('active').eq(this.current_fieldset_index + 1).addClass("active");
      if (this.current_fieldset_index !== 3) {
        this.offset_handle.stop(true, false).animate({
          "margin-left": "-" + (this.current_fieldset_index * 100) + "%"
        }, 500, "swing");
      }
      switch (this.current_fieldset_index) {
        case 0:
          profile_widget.delay(500).fadeIn(750);
          return promo_boxes.not(':eq(0)').slideUp(500).end().filter(':eq(0)').delay(1000).slideDown(500);
        case 1:
          return promo_boxes.not(':eq(1)').slideUp(500).end().filter(':eq(1)').delay(1000).slideDown(500);
        case 2:
          return promo_boxes.not(':eq(2)').slideUp(500).end().filter(':eq(2)').delay(1000).slideDown(500);
      }
    }).trigger("advance").bind("post", function() {
      var profile_widget, _base, _ref,
        _this = this;
      if ((_ref = (_base = pocLib.selections).profile_widget) == null) {
        _base.profile_widget = $('#profile_widget');
      }
      profile_widget = pocLib.selections.profile_widget;
      $('<div />', {
        "class": "cover"
      }).appendTo(this.house).fadeTo(500, .8);
      setTimeout((function() {
        return _this.house.unbind().submit();
      }), 2500);
      profile_widget.fadeOut(500);
      return false;
    });
    if (pocLib.selections.html.hasClass('lt-ie8')) {
      return $(':input').focus(function() {
        return $(this).addClass('focus');
      }).blur(function() {
        return $(this).removeClass('focus');
      });
    }
  });

  Form = (function() {

    Form.prototype.speed = 500;

    function Form(house, show_error_reports) {
      var bound_sets, self, sets,
        _this = this;
      this.house = house;
      if (show_error_reports == null) {
        show_error_reports = true;
      }
      this.process_submission = function() {
        return Form.prototype.process_submission.apply(_this, arguments);
      };
      self = this;
      bound_sets = [];
      this.current_fieldset_index = 0;
      this.house.submit(this.process_submission);
      sets = this.house.children('fieldset').each(function() {
        return bound_sets.push(new Fieldset($(this), self, show_error_reports));
      });
      this.fieldsets = bound_sets;
      this.offset_handle = this.fieldsets[0].house;
      if (pocLib.selections.html.hasClass('lt-ie8')) {
        sets.wrapAll($('<div class="form_contents" />'));
        this.offset_handle = sets.parent();
      }
    }

    Form.prototype.process_submission = function() {
      if (!this.current_fielset().is_valid()) {
        return false;
      }
      if (this.current_fieldset_index !== this.fieldsets.length - 1) {
        this.advance_to_next_fieldset();
      } else {
        $(this).trigger('post');
      }
      return false;
    };

    Form.prototype.advance_to_next_fieldset = function() {
      if (this.current_fieldset_index !== this.fieldsets.length - 1) {
        this.current_fieldset_index = this.current_fieldset_index + 1;
        return $(this).trigger('advance');
      }
    };

    Form.prototype.current_fielset = function() {
      return this.fieldsets[this.current_fieldset_index];
    };

    return Form;

  })();

  Fieldset = (function() {

    function Fieldset(house, form, show_error_reports) {
      var field_rows, prepared_fields, self,
        _this = this;
      this.house = house;
      this.form = form;
      this.show_error_reports = show_error_reports != null ? show_error_reports : false;
      this.is_valid = function() {
        return Fieldset.prototype.is_valid.apply(_this, arguments);
      };
      self = this;
      field_rows = $('.field', this.house);
      this.fields = [];
      prepared_fields = this.fields;
      field_rows.each(function() {
        return prepared_fields.push(new Field($(this), self));
      });
    }

    Fieldset.prototype.is_valid = function() {
      var error, field, _i, _len, _ref;
      this.errors = [];
      _ref = this.fields;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        field = _ref[_i];
        field.check_value();
        error = field.report_errors();
        if (error) {
          this.errors.push(error);
        }
      }
      if (this.show_error_reports) {
        if (this.errors.length > 0) {
          this.show_errors();
        } else {
          this.clear_errors();
        }
      }
      return this.errors.length === 0;
    };

    Fieldset.prototype.show_errors = function() {
      var error, _i, _len, _ref, _ref1;
      if ((_ref = this.error_list) != null) {
        _ref.remove();
      }
      this.error_list = $('<ul />', {
        "class": "fieldset_errors"
      });
      _ref1 = this.errors;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        error = _ref1[_i];
        $('<li />', {
          text: error
        }).appendTo(this.error_list);
      }
      return this.house.prepend(this.error_list);
    };

    Fieldset.prototype.clear_errors = function() {
      var _ref;
      return (_ref = this.error_list) != null ? _ref.remove() : void 0;
    };

    return Fieldset;

  })();

  Field = (function() {

    function Field(house, fieldset) {
      var d,
        _this = this;
      this.house = house;
      this.fieldset = fieldset;
      this.check_value = function(event) {
        return Field.prototype.check_value.apply(_this, arguments);
      };
      d = this.house.data();
      this.validation_method = d.validate || false;
      this.error_message = d.errorMessage || "invalid field";
      this.input = $('input', this.house);
      this.input.keyup(this.check_value).blur(this.check_value);
      this.requires_validation = this.validation_method || this.house.is('.required');
      this.valid = !this.requires_validation;
    }

    Field.prototype.check_value = function(event) {
      if (this.requires_validation) {
        if (this.is_valid()) {
          return this.accept_value();
        } else {
          return this.reject_value(!event || event.type === "blur");
        }
      } else {
        return true;
      }
    };

    Field.prototype.is_valid = function() {
      return this.valid = pocLib.validator.test(this.validation_method, this.input);
    };

    Field.prototype.accept_value = function() {
      return this.house.removeClass('field-with-errors').addClass('completed');
    };

    Field.prototype.reject_value = function(apply_error_class) {
      return this.house.addClass(apply_error_class ? 'field-with-errors' : null).removeClass('completed');
    };

    Field.prototype.report_errors = function() {
      if (this.valid) {
        return null;
      } else {
        return this.error_message;
      }
    };

    return Field;

  })();

  Validator = (function() {

    function Validator() {
      this.disabled = $.inArray("disable_validation", location.search.substr(1).split("&")) !== -1;
    }

    Validator.prototype.test = function(method, input) {
      if (!this.disabled) {
        if (this[method]) {
          return this[method](input);
        } else {
          return this.not_empty(input);
        }
      } else {
        return true;
      }
    };

    Validator.prototype.not_empty = function(input) {
      return input.val().length > 0;
    };

    Validator.prototype.email = function(input) {
      return input.val().match(this.patterns.email);
    };

    Validator.prototype.checked = function(input) {
      return input.is(':checked');
    };

    Validator.prototype.match = function(input) {
      return input.val() === $("#" + (input.parent().data().matchedFieldId)).val();
    };

    Validator.prototype.password = function(input) {
      return input.val().length > 0;
    };

    Validator.prototype.phone = function(input) {
      return input.val().match(this.patterns.phone);
    };

    Validator.prototype.patterns = {
      email: /^([\w.-]+)@([\w.-]+)\.([a-zA-Z.]{2,6})$/i,
      password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,32}$/i,
      phone: /^\D?(\d{3})\D?\D?(\d{3})\D?(\d{4})$/i
    };

    return Validator;

  })();

  pocLib.validator = new Validator();

  CharacterLimitedField = (function() {

    function CharacterLimitedField(field) {
      var _this = this;
      this.field = field;
      this.truncate = function() {
        return CharacterLimitedField.prototype.truncate.apply(_this, arguments);
      };
      this.checkLimit = function(event) {
        return CharacterLimitedField.prototype.checkLimit.apply(_this, arguments);
      };
      this.limit = this.field.data().limit;
      this.field.keydown(this.checkLimit);
      this.field.keyup(this.truncate);
    }

    CharacterLimitedField.prototype.ignoredKeys = [8, 46, 37, 38, 39, 40, 13, 9, 16, 91, 17];

    CharacterLimitedField.prototype.ignoredCode = function(pressedCode) {
      var allowed, code, _i, _len, _ref;
      _ref = this.ignoredKeys;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        code = _ref[_i];
        if (!allowed) {
          allowed = pressedCode === code;
        }
      }
      return allowed;
    };

    CharacterLimitedField.prototype.checkLimit = function(event) {
      var over;
      over = !this.ignoredCode(event.keyCode) && this.field.val().length >= this.limit;
      if (over) {
        return false;
      }
    };

    CharacterLimitedField.prototype.truncate = function() {
      if (this.field.val().length >= this.limit) {
        return this.field.val(this.field.val().slice(0, this.limit));
      }
    };

    return CharacterLimitedField;

  })();

  $.fn.enforceCharacterLimit = function() {
    return $(this).each(function() {
      var field;
      field = $(this);
      if (!field.data('limited')) {
        new CharacterLimitedField(field);
        return field.data('limited', true);
      }
    });
  };

  ToolTip = (function() {

    ToolTip.prototype.speed = 250;

    ToolTip.prototype.all_tips = [];

    function ToolTip(trigger) {
      var _this = this;
      this.trigger = trigger;
      this.toggle_tip = function(event) {
        return ToolTip.prototype.toggle_tip.apply(_this, arguments);
      };
      this.trigger.click(this.toggle_tip);
      this.active = false;
      this.details_pane = this.trigger.siblings('.tip');
      ToolTip.prototype.all_tips.push(this);
    }

    ToolTip.prototype.toggle_tip = function(event) {
      event.preventDefault();
      if (this.active) {
        return this.conceal();
      } else {
        return this.reveal();
      }
    };

    ToolTip.prototype.conceal = function() {
      this.active = false;
      this.details_pane.stop(true, false).slideUp(this.speed);
      return this.trigger.removeClass('active');
    };

    ToolTip.prototype.reveal = function() {
      var tip, _i, _len, _ref;
      _ref = ToolTip.prototype.all_tips;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        tip = _ref[_i];
        tip.conceal();
      }
      this.active = true;
      this.details_pane.stop(true, false).slideDown(this.speed);
      return this.trigger.addClass('active');
    };

    return ToolTip;

  })();

  $.fn.tooltipify = function() {
    return $(this).each(function() {
      return new ToolTip($(this));
    });
  };

  $.fn.remote_focus = function(remote_target) {
    return $(this).each(function() {
      return $(this).focus(function() {
        return remote_target.addClass("focus");
      }).blur(function() {
        return remote_target.removeClass("focus");
      });
    });
  };

  PersonalizationModule = (function() {

    PersonalizationModule.prototype.speed = 500;

    function PersonalizationModule(house) {
      var _this = this;
      this.house = house;
      this.toggle_details = function() {
        return PersonalizationModule.prototype.toggle_details.apply(_this, arguments);
      };
      this.opened = false;
      this.details = $('fieldset', this.house);
      $('.action a, header', this.house).click(this.toggle_details);
    }

    PersonalizationModule.prototype.toggle_details = function() {
      if (this.opened) {
        this.hide_details();
      } else {
        this.show_details();
      }
      return false;
    };

    PersonalizationModule.prototype.show_details = function() {
      this.details.stop(true, false).slideDown(this.speed);
      this.house.addClass("opened");
      return this.opened = true;
    };

    PersonalizationModule.prototype.hide_details = function() {
      this.details.stop(true, false).slideUp(this.speed);
      this.house.removeClass("opened").addClass("edited");
      return this.opened = false;
    };

    return PersonalizationModule;

  })();

  $.fn.personalize = function() {
    return $(this).each(function() {
      return new PersonalizationModule($(this));
    });
  };

  ModalShell = (function() {

    ModalShell.prototype.fadeSpeed = 500;

    ModalShell.prototype.screen = $('<div />', {
      'class': 'modalScreen'
    });

    ModalShell.prototype.house = $('<div />', {
      'class': 'modalHouse'
    });

    ModalShell.prototype.closeButton = $('<abbr />', {
      text: 'x'
    });

    ModalShell.prototype.stilt = $('<span />', {
      'class': 'stilt'
    });

    function ModalShell() {
      var _this = this;
      this.escape = function(e) {
        return ModalShell.prototype.escape.apply(_this, arguments);
      };
      this.close = function() {
        return ModalShell.prototype.close.apply(_this, arguments);
      };
      this.closeIfOutsideContentArea = function(e) {
        return ModalShell.prototype.closeIfOutsideContentArea.apply(_this, arguments);
      };
      this.screen.add(this.closeButton).click(this.close);
      this.house.click(this.closeIfOutsideContentArea);
      this.stilt.add(this.closeButton).appendTo(this.house);
    }

    ModalShell.prototype.populate = function(content) {
      this.content = content;
      this.content.insertAfter(this.stilt);
      return this;
    };

    ModalShell.prototype.closeIfOutsideContentArea = function(e) {
      if ($(e.target).is(this.house)) {
        return this.close();
      }
    };

    ModalShell.prototype.close = function() {
      var _this = this;
      $('.close', this.content).unbind('click', this.close);
      if (!Modernizr.csstransitions) {
        this.house.stop(true, true).fadeOut(this.speed, function() {
          _this.house.add(_this.content).detach();
          return _this.screen.stop(true, true).fadeOut(_this.fadeSpeed, function() {
            return _this.screen.detach();
          });
        });
      } else {
        this.house.removeClass("viewable");
        setTimeout((function() {
          _this.screen.removeClass("viewable");
          return _this.house.add(_this.content).detach();
        }), 500);
        setTimeout((function() {
          return _this.screen.detach();
        }), 1000);
      }
      pocLib.selections.body.off('keyup', this.escape);
      return this.content.trigger("modalUnload");
    };

    ModalShell.prototype.open = function() {
      this.content.trigger("modalLoad");
      if (!Modernizr.csstransitions) {
        this.screen.stop(true, true).hide().appendTo(pocLib.selections.body).fadeIn(this.fadeSpeed * 1.5);
        this.house.hide().appendTo(pocLib.selections.body).stop(true, true).fadeIn(this.fadeSpeed);
      } else {
        this.screen.add(this.house).appendTo(pocLib.selections.body).show().addClass("viewable");
      }
      pocLib.selections.body.on('keyup', this.escape);
      return $('.close', this.content).click(this.close);
    };

    ModalShell.prototype.escape = function(e) {
      if (e.keyCode === 27) {
        return this.close();
      }
    };

    return ModalShell;

  })();

  $.fn.modalize = function(openCallback, closeCallback) {
    var _ref;
    if ((_ref = pocLib.modal) == null) {
      pocLib.modal = new ModalShell;
    }
    return $(this).each(function() {
      var self;
      self = $(this);
      self.data('modalFriend', $("#" + self.data().modalId)).click(function(e) {
        e.preventDefault();
        e.stopPropagation();
        if (self.data().modalFriend.length > 0) {
          pocLib.modal.populate(self.data().modalFriend).open();
          if (typeof openCallback === "function") {
            return openCallback(this);
          }
        }
      });
      return $('.close', self.data().modalFriend).click(function() {
        pocLib.modal.close();
        if (typeof closeCallback === "function") {
          return closeCallback(this);
        }
      });
    });
  };

}).call(this);
