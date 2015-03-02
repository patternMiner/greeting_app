System.register(["rtts_assert/rtts_assert", "angular2/test_lib", "angular2/src/core/compiler/shadow_dom_strategy", "angular2/src/core/compiler/url_resolver", "angular2/src/core/compiler/style_url_resolver", "angular2/src/core/compiler/style_inliner", "angular2/src/core/compiler/view", "angular2/src/core/compiler/xhr/xhr", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/async", "angular2/change_detection"], function($__export) {
  "use strict";
  var assert,
      describe,
      beforeEach,
      it,
      expect,
      ddescribe,
      iit,
      SpyObject,
      el,
      NativeShadowDomStrategy,
      EmulatedScopedShadowDomStrategy,
      EmulatedUnscopedShadowDomStrategy,
      resetShadowDomCache,
      UrlResolver,
      StyleUrlResolver,
      StyleInliner,
      ProtoView,
      XHR,
      isPresent,
      isBlank,
      DOM,
      Map,
      MapWrapper,
      PromiseWrapper,
      Promise,
      DynamicProtoChangeDetector,
      FakeXHR,
      SomeComponent,
      SomeOtherComponent;
  function main() {
    var strategy;
    describe('NativeShadowDomStratgey', (function() {
      beforeEach((function() {
        var urlResolver = new UrlResolver();
        var styleUrlResolver = new StyleUrlResolver(urlResolver);
        strategy = new NativeShadowDomStrategy(styleUrlResolver);
      }));
      it('should attach the view nodes to the shadow root', (function() {
        var host = el('<div></div>');
        var nodes = el('<div>view</div>');
        var pv = new ProtoView(nodes, new DynamicProtoChangeDetector(null), null);
        var view = pv.instantiate(null, null);
        strategy.attachTemplate(host, view);
        var shadowRoot = DOM.getShadowRoot(host);
        expect(isPresent(shadowRoot)).toBeTruthy();
        expect(shadowRoot).toHaveText('view');
      }));
      it('should rewrite style urls', (function() {
        var css = '.foo {background-image: url("img.jpg");}';
        expect(strategy.transformStyleText(css, 'http://base', null)).toEqual(".foo {background-image: url('http://base/img.jpg');}");
      }));
      it('should not inline import rules', (function() {
        var css = '@import "other.css";';
        expect(strategy.transformStyleText(css, 'http://base', null)).toEqual("@import 'http://base/other.css';");
      }));
    }));
    describe('EmulatedScopedShadowDomStratgey', (function() {
      var xhr,
          styleHost;
      beforeEach((function() {
        var urlResolver = new UrlResolver();
        var styleUrlResolver = new StyleUrlResolver(urlResolver);
        xhr = new FakeXHR();
        var styleInliner = new StyleInliner(xhr, styleUrlResolver, urlResolver);
        styleHost = el('<div></div>');
        strategy = new EmulatedScopedShadowDomStrategy(styleInliner, styleUrlResolver, styleHost);
        resetShadowDomCache();
      }));
      it('should attach the view nodes as child of the host element', (function() {
        var host = el('<div><span>original content</span></div>');
        var nodes = el('<div>view</div>');
        var pv = new ProtoView(nodes, new DynamicProtoChangeDetector(null), null);
        var view = pv.instantiate(null, null);
        strategy.attachTemplate(host, view);
        var firstChild = DOM.firstChild(host);
        expect(DOM.tagName(firstChild)).toEqual('DIV');
        expect(firstChild).toHaveText('view');
        expect(host).toHaveText('view');
      }));
      it('should rewrite style urls', (function() {
        var css = '.foo {background-image: url("img.jpg");}';
        expect(strategy.transformStyleText(css, 'http://base', SomeComponent)).toEqual(".foo[_ngcontent-0] {\nbackground-image: url(http://base/img.jpg);\n}");
      }));
      it('should scope style', (function() {
        var css = '.foo {} :host {}';
        expect(strategy.transformStyleText(css, 'http://base', SomeComponent)).toEqual(".foo[_ngcontent-0] {\n\n}\n\n[_nghost-0] {\n\n}");
      }));
      it('should inline @import rules', (function(done) {
        xhr.reply('http://base/one.css', '.one {}');
        var css = '@import "one.css";';
        var promise = strategy.transformStyleText(css, 'http://base', SomeComponent);
        expect(promise).toBePromise();
        promise.then((function(css) {
          expect(css).toEqual('.one[_ngcontent-0] {\n\n}');
          done();
        }));
      }));
      it('should return the same style given the same component', (function() {
        var css = '.foo {} :host {}';
        expect(strategy.transformStyleText(css, 'http://base', SomeComponent)).toEqual(".foo[_ngcontent-0] {\n\n}\n\n[_nghost-0] {\n\n}");
        expect(strategy.transformStyleText(css, 'http://base', SomeComponent)).toEqual(".foo[_ngcontent-0] {\n\n}\n\n[_nghost-0] {\n\n}");
      }));
      it('should return different styles given different components', (function() {
        var css = '.foo {} :host {}';
        expect(strategy.transformStyleText(css, 'http://base', SomeComponent)).toEqual(".foo[_ngcontent-0] {\n\n}\n\n[_nghost-0] {\n\n}");
        expect(strategy.transformStyleText(css, 'http://base', SomeOtherComponent)).toEqual(".foo[_ngcontent-1] {\n\n}\n\n[_nghost-1] {\n\n}");
      }));
      it('should move the style element to the style host', (function() {
        var originalHost = el('<div></div>');
        var styleEl = el('<style>/*css*/</style>');
        DOM.appendChild(originalHost, styleEl);
        expect(originalHost).toHaveText('/*css*/');
        strategy.handleStyleElement(styleEl);
        expect(originalHost).toHaveText('');
        expect(styleHost).toHaveText('/*css*/');
      }));
      it('should add an attribute to the content elements', (function() {
        var elt = el('<div></div>');
        strategy.shimContentElement(SomeComponent, elt);
        expect(DOM.getAttribute(elt, '_ngcontent-0')).toEqual('');
      }));
      it('should add an attribute to the host elements', (function() {
        var elt = el('<div></div>');
        strategy.shimHostElement(SomeComponent, elt);
        expect(DOM.getAttribute(elt, '_nghost-0')).toEqual('');
      }));
    }));
    describe('EmulatedUnscopedShadowDomStratgey', (function() {
      var styleHost;
      beforeEach((function() {
        var urlResolver = new UrlResolver();
        var styleUrlResolver = new StyleUrlResolver(urlResolver);
        styleHost = el('<div></div>');
        strategy = new EmulatedUnscopedShadowDomStrategy(styleUrlResolver, styleHost);
        resetShadowDomCache();
      }));
      it('should attach the view nodes as child of the host element', (function() {
        var host = el('<div><span>original content</span></div>');
        var nodes = el('<div>view</div>');
        var pv = new ProtoView(nodes, new DynamicProtoChangeDetector(null), null);
        var view = pv.instantiate(null, null);
        strategy.attachTemplate(host, view);
        var firstChild = DOM.firstChild(host);
        expect(DOM.tagName(firstChild)).toEqual('DIV');
        expect(firstChild).toHaveText('view');
        expect(host).toHaveText('view');
      }));
      it('should rewrite style urls', (function() {
        var css = '.foo {background-image: url("img.jpg");}';
        expect(strategy.transformStyleText(css, 'http://base', null)).toEqual(".foo {background-image: url('http://base/img.jpg');}");
      }));
      it('should not inline import rules', (function() {
        var css = '@import "other.css";';
        expect(strategy.transformStyleText(css, 'http://base', null)).toEqual("@import 'http://base/other.css';");
      }));
      it('should move the style element to the style host', (function() {
        var originalHost = el('<div></div>');
        var styleEl = el('<style>/*css*/</style>');
        DOM.appendChild(originalHost, styleEl);
        expect(originalHost).toHaveText('/*css*/');
        strategy.handleStyleElement(styleEl);
        expect(originalHost).toHaveText('');
        expect(styleHost).toHaveText('/*css*/');
      }));
      it('should insert the same style only once in the style host', (function() {
        var originalHost = el('<div></div>');
        var styleEl1 = el('<style>/*css 1*/</style>');
        var styleEl2 = el('<style>/*css 2*/</style>');
        var styleEl1bis = el('<style>/*css 1*/</style>');
        DOM.appendChild(originalHost, styleEl1);
        DOM.appendChild(originalHost, styleEl2);
        DOM.appendChild(originalHost, styleEl1bis);
        strategy.handleStyleElement(styleEl1);
        strategy.handleStyleElement(styleEl2);
        strategy.handleStyleElement(styleEl1bis);
        expect(originalHost).toHaveText('');
        expect(styleHost).toHaveText('/*css 1*//*css 2*/');
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
      it = $__m.it;
      expect = $__m.expect;
      ddescribe = $__m.ddescribe;
      iit = $__m.iit;
      SpyObject = $__m.SpyObject;
      el = $__m.el;
    }, function($__m) {
      NativeShadowDomStrategy = $__m.NativeShadowDomStrategy;
      EmulatedScopedShadowDomStrategy = $__m.EmulatedScopedShadowDomStrategy;
      EmulatedUnscopedShadowDomStrategy = $__m.EmulatedUnscopedShadowDomStrategy;
      resetShadowDomCache = $__m.resetShadowDomCache;
    }, function($__m) {
      UrlResolver = $__m.UrlResolver;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      ProtoView = $__m.ProtoView;
    }, function($__m) {
      XHR = $__m.XHR;
    }, function($__m) {
      isPresent = $__m.isPresent;
      isBlank = $__m.isBlank;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      Map = $__m.Map;
      MapWrapper = $__m.MapWrapper;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
      Promise = $__m.Promise;
    }, function($__m) {
      DynamicProtoChangeDetector = $__m.DynamicProtoChangeDetector;
    }],
    execute: function() {
      FakeXHR = (function($__super) {
        var FakeXHR = function FakeXHR() {
          $traceurRuntime.superConstructor(FakeXHR).call(this);
          this._responses = MapWrapper.create();
        };
        return ($traceurRuntime.createClass)(FakeXHR, {
          get: function(url) {
            assert.argumentTypes(url, assert.type.string);
            var response = MapWrapper.get(this._responses, url);
            if (isBlank(response)) {
              return assert.returnType((PromiseWrapper.reject('xhr error')), assert.genericType(Promise, assert.type.string));
            }
            return assert.returnType((PromiseWrapper.resolve(response)), assert.genericType(Promise, assert.type.string));
          },
          reply: function(url, response) {
            assert.argumentTypes(url, assert.type.string, response, assert.type.string);
            MapWrapper.set(this._responses, url, response);
          }
        }, {}, $__super);
      }(XHR));
      Object.defineProperty(FakeXHR.prototype.get, "parameters", {get: function() {
          return [[assert.type.string]];
        }});
      Object.defineProperty(FakeXHR.prototype.reply, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string]];
        }});
      SomeComponent = (function() {
        var SomeComponent = function SomeComponent() {};
        return ($traceurRuntime.createClass)(SomeComponent, {}, {});
      }());
      SomeOtherComponent = (function() {
        var SomeOtherComponent = function SomeOtherComponent() {};
        return ($traceurRuntime.createClass)(SomeOtherComponent, {}, {});
      }());
    }
  };
});

//# sourceMappingURL=angular2/test/core/compiler/shadow_dom_strategy_spec.map

//# sourceMappingURL=../../../../angular2/test/core/compiler/shadow_dom_strategy_spec.js.map