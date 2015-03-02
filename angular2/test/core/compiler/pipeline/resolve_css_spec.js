System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/compiler/pipeline/compile_pipeline", "angular2/src/core/compiler/pipeline/resolve_css", "angular2/src/core/compiler/pipeline/compile_element", "angular2/src/core/compiler/pipeline/compile_step", "angular2/src/core/compiler/pipeline/compile_control", "angular2/src/core/annotations/annotations", "angular2/src/core/compiler/directive_metadata", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/view", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/facade/async"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      expect,
      it,
      iit,
      ddescribe,
      el,
      SpyObject,
      proxy,
      CompilePipeline,
      ResolveCss,
      CompileElement,
      CompileStep,
      CompileControl,
      Component,
      DirectiveMetadata,
      ShadowDomStrategy,
      ProtoView,
      IMPLEMENTS,
      Type,
      stringify,
      DOM,
      PromiseWrapper,
      DummyStrategy,
      SomeComponent,
      MockStep;
  function main() {
    describe('ResolveCss', (function() {
      function createPipeline(strategy) {
        assert.argumentTypes(strategy, ShadowDomStrategy);
        var annotation = new Component({selector: 'selector'});
        var meta = new DirectiveMetadata(SomeComponent, annotation);
        var resolveCss = new ResolveCss(meta, strategy, 'http://base');
        return new CompilePipeline([new MockStep((function(parent, current, control) {
          current.inheritedProtoView = new ProtoView(null, null, null);
        })), resolveCss]);
      }
      Object.defineProperty(createPipeline, "parameters", {get: function() {
          return [[ShadowDomStrategy]];
        }});
      it('it should set ignoreBindings to true for style elements', (function() {
        var strategy = new DummyStrategy();
        strategy.spy('transformStyleText').andCallFake((function(a, b, c) {
          return '.css {}';
        }));
        strategy.spy('handleStyleElement');
        var pipeline = createPipeline(strategy);
        var results = pipeline.process(el('<div><style></style></div>'));
        expect(results[0].ignoreBindings).toBe(false);
        expect(results[1].ignoreBindings).toBe(true);
      }));
      it('should delegate the handling of style elements to the strategy', (function() {
        var strategy = new DummyStrategy();
        strategy.spy('transformStyleText').andCallFake((function(a, b, c) {
          return '.css {}';
        }));
        strategy.spy('handleStyleElement');
        var pipeline = createPipeline(strategy);
        var template = el('<div></div>');
        var styleEl = el('<style></style>');
        DOM.appendChild(template, styleEl);
        pipeline.process(template);
        expect(strategy.spy('handleStyleElement')).toHaveBeenCalledWith(styleEl);
      }));
      it('should handle css transformed synchronously', (function() {
        var strategy = new DummyStrategy();
        strategy.spy('transformStyleText').andCallFake((function(css, url, cmp) {
          return (css + ", " + url + ", " + stringify(cmp));
        }));
        strategy.spy('handleStyleElement');
        var pipeline = createPipeline(strategy);
        var template = el('<div></div>');
        var styleEl = el('<style>/*css*/</style>');
        DOM.appendChild(template, styleEl);
        var results = pipeline.process(template);
        expect(styleEl).toHaveText('/*css*/, http://base, SomeComponent');
        expect(results[0].inheritedProtoView.stylePromises.length).toBe(0);
      }));
      it('should handle css transformed asynchronously', (function(done) {
        var completer = PromiseWrapper.completer();
        var strategy = new DummyStrategy();
        var futureCss;
        strategy.spy('transformStyleText').andCallFake((function(css, url, cmp) {
          futureCss = (css + ", " + url + ", " + stringify(cmp));
          return completer.promise;
        }));
        strategy.spy('handleStyleElement');
        var pipeline = createPipeline(strategy);
        var template = el('<div></div>');
        var styleEl = el('<style>/*css*/</style>');
        DOM.appendChild(template, styleEl);
        var results = pipeline.process(template);
        expect(styleEl).toHaveText('');
        expect(results[0].inheritedProtoView.stylePromises[0]).toBe(completer.promise);
        completer.resolve(futureCss);
        completer.promise.then((function(_) {
          expect(styleEl).toHaveText('/*css*/, http://base, SomeComponent');
          done();
        }));
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
      SpyObject = $__m.SpyObject;
      proxy = $__m.proxy;
    }, function($__m) {
      CompilePipeline = $__m.CompilePipeline;
    }, function($__m) {
      ResolveCss = $__m.ResolveCss;
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
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      IMPLEMENTS = $__m.IMPLEMENTS;
      Type = $__m.Type;
      stringify = $__m.stringify;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }],
    execute: function() {
      DummyStrategy = (function($__super) {
        var DummyStrategy = function DummyStrategy() {
          $traceurRuntime.superConstructor(DummyStrategy).apply(this, arguments);
        };
        return ($traceurRuntime.createClass)(DummyStrategy, {noSuchMethod: function(m) {
            return $traceurRuntime.superGet(this, DummyStrategy.prototype, "noSuchMethod").call(this, m);
          }}, {}, $__super);
      }(SpyObject));
      Object.defineProperty(DummyStrategy, "annotations", {get: function() {
          return [new proxy, new IMPLEMENTS(ShadowDomStrategy)];
        }});
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {};
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
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
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/pipeline/resolve_css_spec.map

//# sourceMappingURL=../../../../../angular2/test/core/compiler/pipeline/resolve_css_spec.js.map