System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "./validators"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      StringMap,
      StringMapWrapper,
      nullValidator,
      controlGroupValidator,
      VALID,
      INVALID,
      AbstractControl,
      Control,
      ControlGroup,
      OptionalControl;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      StringMap = $__m.StringMap;
      StringMapWrapper = $__m.StringMapWrapper;
    }, function($__m) {
      nullValidator = $__m.nullValidator;
      controlGroupValidator = $__m.controlGroupValidator;
    }],
    execute: function() {
      VALID = $__export("VALID", "VALID");
      INVALID = $__export("INVALID", "INVALID");
      AbstractControl = $__export("AbstractControl", (function() {
        var AbstractControl = function AbstractControl() {
          var validator = arguments[0] !== (void 0) ? arguments[0] : nullValidator;
          assert.argumentTypes(validator, Function);
          this.validator = validator;
          this._dirty = true;
        };
        return ($traceurRuntime.createClass)(AbstractControl, {
          get active() {
            return assert.returnType((true), assert.type.boolean);
          },
          get value() {
            this._updateIfNeeded();
            return this._value;
          },
          get status() {
            this._updateIfNeeded();
            return this._status;
          },
          get valid() {
            this._updateIfNeeded();
            return this._status === VALID;
          },
          get errors() {
            this._updateIfNeeded();
            return this._errors;
          },
          setParent: function(parent) {
            this._parent = parent;
          },
          _updateIfNeeded: function() {},
          _updateParent: function() {
            if (isPresent(this._parent)) {
              this._parent._controlChanged();
            }
          }
        }, {});
      }()));
      Object.defineProperty(AbstractControl, "parameters", {get: function() {
          return [[Function]];
        }});
      Control = $__export("Control", (function($__super) {
        var Control = function Control(value) {
          var validator = arguments[1] !== (void 0) ? arguments[1] : nullValidator;
          assert.argumentTypes(value, assert.type.any, validator, Function);
          $traceurRuntime.superConstructor(Control).call(this, validator);
          this._value = value;
        };
        return ($traceurRuntime.createClass)(Control, {
          updateValue: function(value) {
            assert.argumentTypes(value, assert.type.any);
            this._value = value;
            this._dirty = true;
            this._updateParent();
          },
          _updateIfNeeded: function() {
            if (this._dirty) {
              this._dirty = false;
              this._errors = this.validator(this);
              this._status = isPresent(this._errors) ? INVALID : VALID;
            }
          }
        }, {}, $__super);
      }(AbstractControl)));
      Object.defineProperty(Control, "parameters", {get: function() {
          return [[assert.type.any], [Function]];
        }});
      Object.defineProperty(Control.prototype.updateValue, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
      ControlGroup = $__export("ControlGroup", (function($__super) {
        var ControlGroup = function ControlGroup(controls) {
          var validator = arguments[1] !== (void 0) ? arguments[1] : controlGroupValidator;
          assert.argumentTypes(controls, assert.type.any, validator, Function);
          $traceurRuntime.superConstructor(ControlGroup).call(this, validator);
          this.controls = controls;
          this._setParentForControls();
        };
        return ($traceurRuntime.createClass)(ControlGroup, {
          _setParentForControls: function() {
            var $__0 = this;
            StringMapWrapper.forEach(this.controls, (function(control, name) {
              control.setParent($__0);
            }));
          },
          _updateIfNeeded: function() {
            if (this._dirty) {
              this._dirty = false;
              this._value = this._reduceValue();
              this._errors = this.validator(this);
              this._status = isPresent(this._errors) ? INVALID : VALID;
            }
          },
          _reduceValue: function() {
            var newValue = {};
            StringMapWrapper.forEach(this.controls, (function(control, name) {
              if (control.active) {
                newValue[name] = control.value;
              }
            }));
            return newValue;
          },
          _controlChanged: function() {
            this._dirty = true;
            this._updateParent();
          }
        }, {}, $__super);
      }(AbstractControl)));
      Object.defineProperty(ControlGroup, "parameters", {get: function() {
          return [[], [Function]];
        }});
      OptionalControl = $__export("OptionalControl", (function() {
        var OptionalControl = function OptionalControl(control, cond) {
          assert.argumentTypes(control, Control, cond, assert.type.boolean);
          $traceurRuntime.superConstructor(OptionalControl).call(this);
          this._control = control;
          this._cond = cond;
        };
        return ($traceurRuntime.createClass)(OptionalControl, {
          get active() {
            return assert.returnType((this._cond), assert.type.boolean);
          },
          get value() {
            return this._control.value;
          },
          get status() {
            return this._control.status;
          },
          get errors() {
            return this._control.errors;
          },
          set validator(v) {
            this._control.validator = v;
          },
          get validator() {
            return this._control.validator;
          },
          set cond(value) {
            assert.argumentTypes(value, assert.type.boolean);
            this._cond = value;
            this._control._updateParent();
          },
          get cond() {
            return assert.returnType((this._cond), assert.type.boolean);
          },
          updateValue: function(value) {
            assert.argumentTypes(value, assert.type.any);
            this._control.updateValue(value);
          },
          setParent: function(parent) {
            this._control.setParent(parent);
          }
        }, {});
      }()));
      Object.defineProperty(OptionalControl, "parameters", {get: function() {
          return [[Control], [assert.type.boolean]];
        }});
      Object.defineProperty(Object.getOwnPropertyDescriptor(OptionalControl.prototype, "cond").set, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      Object.defineProperty(OptionalControl.prototype.updateValue, "parameters", {get: function() {
          return [[assert.type.any]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/forms/model.map

//# sourceMappingURL=../../../angular2/src/forms/model.js.map