System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/shim_shadow_dom", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      expect,
      it,
      iit,
      ddescribe,
      el,
      CompilePipeline,
      ShimShadowDom,
      CompileElement,
      CompileStep,
      CompileControl,
      Component,
      DirectiveMetadata,
      ShadowDomStrategy,
      Type,
      isBlank,
      stringify,
      DOM,
      FakeStrategy,
      MockStep,
      SomeComponent;
  function main() {
    describe('ShimShadowDom', (function() {
      function createPipeline(ignoreBindings) {
        assert.argumentTypes(ignoreBindings, assert.type.boolean);
        var annotation = new Component({selector: 'selector'});
        var meta = new DirectiveMetadata(SomeComponent, annotation);
        var shimShadowDom = new ShimShadowDom(meta, new FakeStrategy());
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          current.ignoreBindings = ignoreBindings;
        })), new MockStep((function(parent, current, control) {
          var el = current.element;
          if (DOM.hasClass(el, 'host')) {
            current.componentDirective = new DirectiveMetadata(SomeComponent, null);
          }
        })), shimShadowDom]);
      }
      Object.defineProperty(createPipeline, "parameters", {get: function() {
          return [[assert.type.boolean]];
        }});
      it('should add the content attribute to content element', (function() {
        var pipeline = createPipeline(false);
        var results = pipeline.process(el('<div></div>'));
        expect(DOM.getAttribute(results[0].element, 'SomeComponent-content')).toEqual('');
        expect(isBlank(DOM.getAttribute(results[0].element, 'SomeComponent-host'))).toBeTruthy();
      }));
      it('should add both the content and host attributes to host element', (function() {
        var pipeline = createPipeline(false);
        var results = pipeline.process(el('<div class="host"></div>'));
        expect(DOM.getAttribute(results[0].element, 'SomeComponent-content')).toEqual('');
        expect(DOM.getAttribute(results[0].element, 'SomeComponent-host')).toEqual('');
      }));
      it('should do nothing when ignoreBindings is true', (function() {
        var pipeline = createPipeline(true);
        var results = pipeline.process(el('<div class="host"></div>'));
        expect(isBlank(DOM.getAttribute(results[0].element, 'SomeComponent-content'))).toBeTruthy();
        expect(isBlank(DOM.getAttribute(results[0].element, 'SomeComponent-host'))).toBeTruthy();
      }));
    }));
  }
  $__export("main", main);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      describe = $__m.describe;
      beforeEach = $__m.beforeEach;
      expect = $__m.expect;
      it = $__m.it;
      iit = $__m.iit;
      ddescribe = $__m.ddescribe;
      el = $__m.el;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      ShimShadowDom = $__m.ShimShadowDom;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      Component = $__m.Component;
    }, function($__m) {
      DirectiveMetadata = $__m.DirectiveMetadata;
    }, function($__m) {
      ShadowDomStrategy = $__m.ShadowDomStrategy;
    }, function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      stringify = $__m.stringify;
    }, function($__m) {
      DOM = $__m.DOM;
    }],
    execute: function() {
      FakeStrategy = (function($__super) {
        var FakeStrategy = function FakeStrategy() {
          $traceurRuntime.superConstructor(FakeStrategy).call(this);
        };
        return ($traceurRuntime.createClass)(FakeStrategy, {
          shimContentElement: function(component, element) {
            assert.argumentTypes(component, Type, element, assert.type.any);
            var attrName = stringify(component) + '-content';
            DOM.setAttribute(element, attrName, '');
          },
          shimHostElement: function(component, element) {
            assert.argumentTypes(component, Type, element, assert.type.any);
            var attrName = stringify(component) + '-host';
            DOM.setAttribute(element, attrName, '');
          }
        }, {}, $__super);
      }(ShadowDomStrategy));
      Object.defineProperty(FakeStrategy.prototype.shimContentElement, "parameters", {get: function() {
          return [[Type], []];
        }});
      Object.defineProperty(FakeStrategy.prototype.shimHostElement, "parameters", {get: function() {
          return [[Type], []];
        }});
      MockStep = (function($__super) {
        var MockStep = function MockStep(process) {
          $traceurRuntime.superConstructor(MockStep).call(this);
          this.processClosure = process;
        };
        return ($traceurRuntime.createClass)(MockStep, {process: function(parent, current, control) {
            assert.argumentTypes(parent, CompileElement, current, CompileElement, control, CompileControl);
            this.processClosure(parent, current, control);
          }}, {}, $__super);
      }(CompileStep));
      Object.defineProperty(MockStep.prototype.process, "parameters", {get: function() {
          return [[CompileElement], [CompileElement], [CompileControl]];
        }});
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {};
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/pipeline/shim_shadow_dom_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/shim_shadow_dom_spec.js.map