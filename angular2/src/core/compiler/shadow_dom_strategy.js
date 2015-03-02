System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/dom/dom_adapter", "angular2/src/facade/collection", "angular2/src/facade/async", "./view", "./shadow_dom_emulation/content_tag", "./shadow_dom_emulation/light_dom", "./shadow_dom_emulation/shadow_css", "./style_inliner", "./style_url_resolver"], function($__export) {
  "use strict";
  var assert,
      Type,
      isBlank,
      isPresent,
      int,
      DOM,
      List,
      ListWrapper,
      MapWrapper,
      Map,
      PromiseWrapper,
      View,
      Content,
      LightDom,
      ShadowCss,
      StyleInliner,
      StyleUrlResolver,
      ShadowDomStrategy,
      EmulatedUnscopedShadowDomStrategy,
      EmulatedScopedShadowDomStrategy,
      NativeShadowDomStrategy,
      _componentUIDs,
      _nextComponentUID,
      _sharedStyleTexts;
  function _moveViewNodesIntoParent(parent, view) {
    for (var i = 0; i < view.nodes.length; ++i) {
      DOM.appendChild(parent, view.nodes[i]);
    }
  }
  function _getComponentId(component) {
    assert.argumentTypes(component, Type);
    var id = MapWrapper.get(_componentUIDs, component);
    if (isBlank(id)) {
      id = _nextComponentUID++;
      MapWrapper.set(_componentUIDs, component, id);
    }
    return id;
  }
  function _getHostAttribute(id) {
    assert.argumentTypes(id, int);
    return ("_nghost-" + id);
  }
  function _getContentAttribute(id) {
    assert.argumentTypes(id, int);
    return ("_ngcontent-" + id);
  }
  function _shimCssForComponent(cssText, component) {
    assert.argumentTypes(cssText, assert.type.string, component, Type);
    var id = _getComponentId(component);
    var shadowCss = new ShadowCss();
    return assert.returnType((shadowCss.shimCssText(cssText, _getContentAttribute(id), _getHostAttribute(id))), assert.type.string);
  }
  function resetShadowDomCache() {
    MapWrapper.clear(_componentUIDs);
    _nextComponentUID = 0;
    MapWrapper.clear(_sharedStyleTexts);
  }
  $__export("resetShadowDomCache", resetShadowDomCache);
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      Type = $__m.Type;
      isBlank = $__m.isBlank;
      isPresent = $__m.isPresent;
      int = $__m.int;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
      MapWrapper = $__m.MapWrapper;
      Map = $__m.Map;
    }, function($__m) {
      PromiseWrapper = $__m.PromiseWrapper;
    }, function($__m) {
      View = $__m.View;
    }, function($__m) {
      Content = $__m.Content;
    }, function($__m) {
      LightDom = $__m.LightDom;
    }, function($__m) {
      ShadowCss = $__m.ShadowCss;
    }, function($__m) {
      StyleInliner = $__m.StyleInliner;
    }, function($__m) {
      StyleUrlResolver = $__m.StyleUrlResolver;
    }],
    execute: function() {
      ShadowDomStrategy = $__export("ShadowDomStrategy", (function() {
        var ShadowDomStrategy = function ShadowDomStrategy() {};
        return ($traceurRuntime.createClass)(ShadowDomStrategy, {
          attachTemplate: function(el, view) {
            assert.argumentTypes(el, assert.type.any, view, View);
          },
          constructLightDom: function(lightDomView, shadowDomView, el) {
            assert.argumentTypes(lightDomView, View, shadowDomView, View, el, assert.type.any);
          },
          polyfillDirectives: function() {
            return assert.returnType((null), assert.genericType(List, Type));
          },
          transformStyleText: function(cssText, baseUrl, component) {
            assert.argumentTypes(cssText, assert.type.string, baseUrl, assert.type.string, component, Type);
          },
          handleStyleElement: function(styleEl) {},
          shimContentElement: function(component, element) {
            assert.argumentTypes(component, Type, element, assert.type.any);
          },
          shimHostElement: function(component, element) {
            assert.argumentTypes(component, Type, element, assert.type.any);
          }
        }, {});
      }()));
      Object.defineProperty(ShadowDomStrategy.prototype.attachTemplate, "parameters", {get: function() {
          return [[], [View]];
        }});
      Object.defineProperty(ShadowDomStrategy.prototype.constructLightDom, "parameters", {get: function() {
          return [[View], [View], []];
        }});
      Object.defineProperty(ShadowDomStrategy.prototype.transformStyleText, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [Type]];
        }});
      Object.defineProperty(ShadowDomStrategy.prototype.shimContentElement, "parameters", {get: function() {
          return [[Type], []];
        }});
      Object.defineProperty(ShadowDomStrategy.prototype.shimHostElement, "parameters", {get: function() {
          return [[Type], []];
        }});
      EmulatedUnscopedShadowDomStrategy = $__export("EmulatedUnscopedShadowDomStrategy", (function($__super) {
        var EmulatedUnscopedShadowDomStrategy = function EmulatedUnscopedShadowDomStrategy(styleUrlResolver, styleHost) {
          assert.argumentTypes(styleUrlResolver, StyleUrlResolver, styleHost, assert.type.any);
          $traceurRuntime.superConstructor(EmulatedUnscopedShadowDomStrategy).call(this);
          this._styleUrlResolver = styleUrlResolver;
          this._styleHost = styleHost;
        };
        return ($traceurRuntime.createClass)(EmulatedUnscopedShadowDomStrategy, {
          attachTemplate: function(el, view) {
            assert.argumentTypes(el, assert.type.any, view, View);
            DOM.clearNodes(el);
            _moveViewNodesIntoParent(el, view);
          },
          constructLightDom: function(lightDomView, shadowDomView, el) {
            assert.argumentTypes(lightDomView, View, shadowDomView, View, el, assert.type.any);
            return new LightDom(lightDomView, shadowDomView, el);
          },
          polyfillDirectives: function() {
            return assert.returnType(([Content]), assert.genericType(List, Type));
          },
          transformStyleText: function(cssText, baseUrl, component) {
            assert.argumentTypes(cssText, assert.type.string, baseUrl, assert.type.string, component, Type);
            return this._styleUrlResolver.resolveUrls(cssText, baseUrl);
          },
          handleStyleElement: function(styleEl) {
            DOM.remove(styleEl);
            var cssText = DOM.getText(styleEl);
            if (!MapWrapper.contains(_sharedStyleTexts, cssText)) {
              MapWrapper.set(_sharedStyleTexts, cssText, true);
              this._insertStyleElement(this._styleHost, styleEl);
            }
          },
          _insertStyleElement: function(host, style) {
            if (isBlank(this._lastInsertedStyle)) {
              var firstChild = DOM.firstChild(host);
              if (isPresent(firstChild)) {
                DOM.insertBefore(firstChild, style);
              } else {
                DOM.appendChild(host, style);
              }
            } else {
              DOM.insertAfter(this._lastInsertedStyle, style);
            }
            this._lastInsertedStyle = style;
          }
        }, {}, $__super);
      }(ShadowDomStrategy)));
      Object.defineProperty(EmulatedUnscopedShadowDomStrategy, "parameters", {get: function() {
          return [[StyleUrlResolver], []];
        }});
      Object.defineProperty(EmulatedUnscopedShadowDomStrategy.prototype.attachTemplate, "parameters", {get: function() {
          return [[], [View]];
        }});
      Object.defineProperty(EmulatedUnscopedShadowDomStrategy.prototype.constructLightDom, "parameters", {get: function() {
          return [[View], [View], []];
        }});
      Object.defineProperty(EmulatedUnscopedShadowDomStrategy.prototype.transformStyleText, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [Type]];
        }});
      EmulatedScopedShadowDomStrategy = $__export("EmulatedScopedShadowDomStrategy", (function($__super) {
        var EmulatedScopedShadowDomStrategy = function EmulatedScopedShadowDomStrategy(styleInliner, styleUrlResolver, styleHost) {
          assert.argumentTypes(styleInliner, StyleInliner, styleUrlResolver, StyleUrlResolver, styleHost, assert.type.any);
          $traceurRuntime.superConstructor(EmulatedScopedShadowDomStrategy).call(this, styleUrlResolver, styleHost);
          this._styleInliner = styleInliner;
        };
        return ($traceurRuntime.createClass)(EmulatedScopedShadowDomStrategy, {
          transformStyleText: function(cssText, baseUrl, component) {
            cssText = this._styleUrlResolver.resolveUrls(cssText, baseUrl);
            var css = this._styleInliner.inlineImports(cssText, baseUrl);
            if (PromiseWrapper.isPromise(css)) {
              return css.then((function(css) {
                return _shimCssForComponent(css, component);
              }));
            } else {
              return _shimCssForComponent(css, component);
            }
          },
          handleStyleElement: function(styleEl) {
            DOM.remove(styleEl);
            this._insertStyleElement(this._styleHost, styleEl);
          },
          shimContentElement: function(component, element) {
            assert.argumentTypes(component, Type, element, assert.type.any);
            var id = _getComponentId(component);
            var attrName = _getContentAttribute(id);
            DOM.setAttribute(element, attrName, '');
          },
          shimHostElement: function(component, element) {
            assert.argumentTypes(component, Type, element, assert.type.any);
            var id = _getComponentId(component);
            var attrName = _getHostAttribute(id);
            DOM.setAttribute(element, attrName, '');
          }
        }, {}, $__super);
      }(EmulatedUnscopedShadowDomStrategy)));
      Object.defineProperty(EmulatedScopedShadowDomStrategy, "parameters", {get: function() {
          return [[StyleInliner], [StyleUrlResolver], []];
        }});
      Object.defineProperty(EmulatedScopedShadowDomStrategy.prototype.transformStyleText, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [Type]];
        }});
      Object.defineProperty(EmulatedScopedShadowDomStrategy.prototype.shimContentElement, "parameters", {get: function() {
          return [[Type], []];
        }});
      Object.defineProperty(EmulatedScopedShadowDomStrategy.prototype.shimHostElement, "parameters", {get: function() {
          return [[Type], []];
        }});
      NativeShadowDomStrategy = $__export("NativeShadowDomStrategy", (function($__super) {
        var NativeShadowDomStrategy = function NativeShadowDomStrategy(styleUrlResolver) {
          assert.argumentTypes(styleUrlResolver, StyleUrlResolver);
          $traceurRuntime.superConstructor(NativeShadowDomStrategy).call(this);
          this._styleUrlResolver = styleUrlResolver;
        };
        return ($traceurRuntime.createClass)(NativeShadowDomStrategy, {
          attachTemplate: function(el, view) {
            assert.argumentTypes(el, assert.type.any, view, View);
            _moveViewNodesIntoParent(DOM.createShadowRoot(el), view);
          },
          constructLightDom: function(lightDomView, shadowDomView, el) {
            assert.argumentTypes(lightDomView, View, shadowDomView, View, el, assert.type.any);
            return null;
          },
          polyfillDirectives: function() {
            return assert.returnType(([]), assert.genericType(List, Type));
          },
          transformStyleText: function(cssText, baseUrl, component) {
            assert.argumentTypes(cssText, assert.type.string, baseUrl, assert.type.string, component, Type);
            return this._styleUrlResolver.resolveUrls(cssText, baseUrl);
          }
        }, {}, $__super);
      }(ShadowDomStrategy)));
      Object.defineProperty(NativeShadowDomStrategy, "parameters", {get: function() {
          return [[StyleUrlResolver]];
        }});
      Object.defineProperty(NativeShadowDomStrategy.prototype.attachTemplate, "parameters", {get: function() {
          return [[], [View]];
        }});
      Object.defineProperty(NativeShadowDomStrategy.prototype.constructLightDom, "parameters", {get: function() {
          return [[View], [View], []];
        }});
      Object.defineProperty(NativeShadowDomStrategy.prototype.transformStyleText, "parameters", {get: function() {
          return [[assert.type.string], [assert.type.string], [Type]];
        }});
      _componentUIDs = assert.type(MapWrapper.create(), assert.genericType(Map, Type, int));
      _nextComponentUID = assert.type(0, int);
      _sharedStyleTexts = assert.type(MapWrapper.create(), assert.genericType(Map, assert.type.string, assert.type.boolean));
      Object.defineProperty(_getComponentId, "parameters", {get: function() {
          return [[Type]];
        }});
      Object.defineProperty(_getHostAttribute, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(_getContentAttribute, "parameters", {get: function() {
          return [[int]];
        }});
      Object.defineProperty(_shimCssForComponent, "parameters", {get: function() {
          return [[assert.type.string], [Type]];
        }});
    }
  };
});

//# sourceMappingURL=angular2/src/core/compiler/shadow_dom_strategy.map

//# sourceMappingURL=../../../../angular2/src/core/compiler/shadow_dom_strategy.js.map