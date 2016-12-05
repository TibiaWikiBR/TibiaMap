! function(t, e, i) {
  function n() {
    var e = t.L;
    o.noConflict = function() {
      return t.L = e, this
    }, t.L = o
  }
  var o = {
    version: "0.8-dev"
  };
  "object" == typeof module && "object" == typeof module.exports ? module.exports = o : "function" == typeof define && define.amd && define(o), "undefined" != typeof t && n(), o.Util = {
      extend: function(t) {
        var e, i, n, o;
        for (i = 1, n = arguments.length; i < n; i++) {
          o = arguments[i];
          for (e in o) t[e] = o[e]
        }
        return t
      },
      create: Object.create || function() {
        function t() {}
        return function(e) {
          return t.prototype = e, new t
        }
      }(),
      bind: function(t, e) {
        var i = Array.prototype.slice;
        if (t.bind) return t.bind.apply(t, i.call(arguments, 1));
        var n = i.call(arguments, 2);
        return function() {
          return t.apply(e, n.length ? n.concat(i.call(arguments)) : arguments)
        }
      },
      stamp: function(t) {
        return t._leaflet_id = t._leaflet_id || ++o.Util.lastId, t._leaflet_id
      },
      lastId: 0,
      throttle: function(t, e, i) {
        var n, o, s, r;
        return r = function() {
          n = !1, o && (s.apply(i, o), o = !1)
        }, s = function() {
          n ? o = arguments : (t.apply(i, arguments), setTimeout(r, e), n = !0)
        }
      },
      wrapNum: function(t, e, i) {
        var n = e[1],
          o = e[0],
          s = n - o;
        return t === n && i ? t : ((t - o) % s + s) % s + o
      },
      falseFn: function() {
        return !1
      },
      formatNum: function(t, e) {
        var i = Math.pow(10, e || 5);
        return Math.round(t * i) / i
      },
      trim: function(t) {
        return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "")
      },
      splitWords: function(t) {
        return o.Util.trim(t).split(/\s+/)
      },
      setOptions: function(t, e) {
        t.hasOwnProperty("options") || (t.options = t.options ? o.Util.create(t.options) : {});
        for (var i in e) t.options[i] = e[i];
        return t.options
      },
      getParamString: function(t, e, i) {
        var n = [];
        for (var o in t) n.push(encodeURIComponent(i ? o.toUpperCase() : o) + "=" + encodeURIComponent(t[o]));
        return (e && e.indexOf("?") !== -1 ? "&" : "?") + n.join("&")
      },
      template: function(t, e) {
        return t.replace(o.Util.templateRe, function(t, n) {
          var o = e[n];
          if (o === i) throw new Error("No value provided for variable " + t);
          return "function" == typeof o && (o = o(e)), o
        })
      },
      templateRe: /\{ *([\w_]+) *\}/g,
      isArray: Array.isArray || function(t) {
        return "[object Array]" === Object.prototype.toString.call(t)
      },
      emptyImageUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
    },
    function() {
      function e(e) {
        return t["webkit" + e] || t["moz" + e] || t["ms" + e]
      }

      function i(e) {
        var i = +new Date,
          o = Math.max(0, 16 - (i - n));
        return n = i + o, t.setTimeout(e, o)
      }
      var n = 0,
        s = t.requestAnimationFrame || e("RequestAnimationFrame") || i,
        r = t.cancelAnimationFrame || e("CancelAnimationFrame") || e("CancelRequestAnimationFrame") || function(e) {
          t.clearTimeout(e)
        };
      o.Util.requestAnimFrame = function(e, n, r) {
        return r && s === i ? void e.call(n) : s.call(t, o.bind(e, n))
      }, o.Util.cancelAnimFrame = function(e) {
        e && r.call(t, e)
      }
    }(), o.extend = o.Util.extend, o.bind = o.Util.bind, o.stamp = o.Util.stamp, o.setOptions = o.Util.setOptions, o.Class = function() {}, o.Class.extend = function(t) {
      var e = function() {
          this.initialize && this.initialize.apply(this, arguments), this._initHooks.length && this.callInitHooks()
        },
        i = e.__super__ = this.prototype,
        n = o.Util.create(i);
      n.constructor = e, e.prototype = n;
      for (var s in this) this.hasOwnProperty(s) && "prototype" !== s && (e[s] = this[s]);
      return t.statics && (o.extend(e, t.statics), delete t.statics), t.includes && (o.Util.extend.apply(null, [n].concat(t.includes)), delete t.includes), n.options && (t.options = o.Util.extend(o.Util.create(n.options), t.options)), o.extend(n, t), n._initHooks = [], n.callInitHooks = function() {
        if (!this._initHooksCalled) {
          i.callInitHooks && i.callInitHooks.call(this), this._initHooksCalled = !0;
          for (var t = 0, e = n._initHooks.length; t < e; t++) n._initHooks[t].call(this)
        }
      }, e
    }, o.Class.include = function(t) {
      o.extend(this.prototype, t)
    }, o.Class.mergeOptions = function(t) {
      o.extend(this.prototype.options, t)
    }, o.Class.addInitHook = function(t) {
      var e = Array.prototype.slice.call(arguments, 1),
        i = "function" == typeof t ? t : function() {
          this[t].apply(this, e)
        };
      this.prototype._initHooks = this.prototype._initHooks || [], this.prototype._initHooks.push(i)
    }, o.Evented = o.Class.extend({
      on: function(t, e, i) {
        if ("object" == typeof t)
          for (var n in t) this._on(n, t[n], e);
        else {
          t = o.Util.splitWords(t);
          for (var s = 0, r = t.length; s < r; s++) this._on(t[s], e, i)
        }
        return this
      },
      off: function(t, e, i) {
        if (t)
          if ("object" == typeof t)
            for (var n in t) this._off(n, t[n], e);
          else {
            t = o.Util.splitWords(t);
            for (var s = 0, r = t.length; s < r; s++) this._off(t[s], e, i)
          } else delete this._events;
        return this
      },
      _on: function(t, e, i) {
        var n = this._events = this._events || {},
          s = i && i !== this && o.stamp(i);
        if (s) {
          var r = t + "_idx",
            a = t + "_len",
            h = n[r] = n[r] || {},
            l = o.stamp(e) + "_" + s;
          h[l] || (h[l] = {
            fn: e,
            ctx: i
          }, n[a] = (n[a] || 0) + 1)
        } else n[t] = n[t] || [], n[t].push({
          fn: e
        })
      },
      _off: function(t, e, i) {
        var n = this._events,
          s = t + "_idx",
          r = t + "_len";
        if (n) {
          if (!e) return delete n[t], delete n[s], void delete n[r];
          var a, h, l, u, c, d = i && i !== this && o.stamp(i);
          if (d) c = o.stamp(e) + "_" + d, a = n[s], a && a[c] && (u = a[c], delete a[c], n[r]--);
          else if (a = n[t])
            for (h = 0, l = a.length; h < l; h++)
              if (a[h].fn === e) {
                u = a[h], a.splice(h, 1);
                break
              }
          u && (u.fn = o.Util.falseFn)
        }
      },
      fire: function(t, e, i) {
        if (!this.listens(t, i)) return this;
        var n = o.Util.extend({}, e, {
            type: t,
            target: this
          }),
          s = this._events;
        if (s) {
          var r, a, h, l, u = s[t + "_idx"];
          if (s[t])
            for (h = s[t].slice(), r = 0, a = h.length; r < a; r++) h[r].fn.call(this, n);
          for (l in u) u[l].fn.call(u[l].ctx, n)
        }
        return i && this._propagateEvent(n), this
      },
      listens: function(t, e) {
        var i = this._events;
        if (i && (i[t] || i[t + "_len"])) return !0;
        if (e)
          for (var n in this._eventParents)
            if (this._eventParents[n].listens(t, e)) return !0;
        return !1
      },
      once: function(t, e, i) {
        if ("object" == typeof t) {
          for (var n in t) this.once(n, t[n], e);
          return this
        }
        var s = o.bind(function() {
          this.off(t, e, i).off(t, s, i)
        }, this);
        return this.on(t, e, i).on(t, s, i)
      },
      addEventParent: function(t) {
        return this._eventParents = this._eventParents || {}, this._eventParents[o.stamp(t)] = t, this
      },
      removeEventParent: function(t) {
        return this._eventParents && delete this._eventParents[o.stamp(t)], this
      },
      _propagateEvent: function(t) {
        for (var e in this._eventParents) this._eventParents[e].fire(t.type, o.extend({
          layer: t.target
        }, t), !0)
      }
    });
  var s = o.Evented.prototype;
  s.addEventListener = s.on, s.removeEventListener = s.clearAllEventListeners = s.off, s.addOneTimeEventListener = s.once, s.fireEvent = s.fire, s.hasEventListeners = s.listens, o.Mixin = {
      Events: s
    },
    function() {
      var i = navigator.userAgent.toLowerCase(),
        n = e.documentElement,
        s = "ActiveXObject" in t,
        r = i.indexOf("webkit") !== -1,
        a = i.indexOf("phantom") !== -1,
        h = i.search("android [23]") !== -1,
        l = i.indexOf("chrome") !== -1,
        u = "undefined" != typeof orientation,
        c = navigator.msPointerEnabled && navigator.msMaxTouchPoints && !t.PointerEvent,
        d = t.PointerEvent && navigator.pointerEnabled && navigator.maxTouchPoints || c,
        m = s && "transition" in n.style,
        _ = "WebKitCSSMatrix" in t && "m11" in new t.WebKitCSSMatrix && !h,
        p = "MozPerspective" in n.style,
        f = "OTransition" in n.style,
        g = !t.L_NO_TOUCH && !a && (d || "ontouchstart" in t || t.DocumentTouch && e instanceof t.DocumentTouch);
      o.Browser = {
        ie: s,
        ielt9: s && !e.addEventListener,
        webkit: r,
        gecko: i.indexOf("gecko") !== -1 && !r && !t.opera && !s,
        android: i.indexOf("android") !== -1,
        android23: h,
        chrome: l,
        safari: !l && i.indexOf("safari") !== -1,
        ie3d: m,
        webkit3d: _,
        gecko3d: p,
        opera3d: f,
        any3d: !t.L_DISABLE_3D && (m || _ || p || f) && !a,
        mobile: u,
        mobileWebkit: u && r,
        mobileWebkit3d: u && _,
        mobileOpera: u && t.opera,
        touch: !!g,
        msPointer: !!c,
        pointer: !!d,
        retina: (t.devicePixelRatio || t.screen.deviceXDPI / t.screen.logicalXDPI) > 1
      }
    }(), o.Point = function(t, e, i) {
      this.x = i ? Math.round(t) : t, this.y = i ? Math.round(e) : e
    }, o.Point.prototype = {
      clone: function() {
        return new o.Point(this.x, this.y)
      },
      add: function(t) {
        return this.clone()._add(o.point(t))
      },
      _add: function(t) {
        return this.x += t.x, this.y += t.y, this
      },
      subtract: function(t) {
        return this.clone()._subtract(o.point(t))
      },
      _subtract: function(t) {
        return this.x -= t.x, this.y -= t.y, this
      },
      divideBy: function(t) {
        return this.clone()._divideBy(t)
      },
      _divideBy: function(t) {
        return this.x /= t, this.y /= t, this
      },
      multiplyBy: function(t) {
        return this.clone()._multiplyBy(t)
      },
      _multiplyBy: function(t) {
        return this.x *= t, this.y *= t, this
      },
      round: function() {
        return this.clone()._round()
      },
      _round: function() {
        return this.x = Math.round(this.x), this.y = Math.round(this.y), this
      },
      floor: function() {
        return this.clone()._floor()
      },
      _floor: function() {
        return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this
      },
      ceil: function() {
        return this.clone()._ceil()
      },
      _ceil: function() {
        return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this
      },
      distanceTo: function(t) {
        t = o.point(t);
        var e = t.x - this.x,
          i = t.y - this.y;
        return Math.sqrt(e * e + i * i)
      },
      equals: function(t) {
        return t = o.point(t), t.x === this.x && t.y === this.y
      },
      contains: function(t) {
        return t = o.point(t), Math.abs(t.x) <= Math.abs(this.x) && Math.abs(t.y) <= Math.abs(this.y)
      },
      toString: function() {
        return "Point(" + o.Util.formatNum(this.x) + ", " + o.Util.formatNum(this.y) + ")"
      }
    }, o.point = function(t, e, n) {
      return t instanceof o.Point ? t : o.Util.isArray(t) ? new o.Point(t[0], t[1]) : t === i || null === t ? t : new o.Point(t, e, n)
    }, o.Bounds = function(t, e) {
      if (t)
        for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++) this.extend(i[n])
    }, o.Bounds.prototype = {
      extend: function(t) {
        return t = o.point(t), this.min || this.max ? (this.min.x = Math.min(t.x, this.min.x), this.max.x = Math.max(t.x, this.max.x), this.min.y = Math.min(t.y, this.min.y), this.max.y = Math.max(t.y, this.max.y)) : (this.min = t.clone(), this.max = t.clone()), this
      },
      getCenter: function(t) {
        return new o.Point((this.min.x + this.max.x) / 2, (this.min.y + this.max.y) / 2, t)
      },
      getBottomLeft: function() {
        return new o.Point(this.min.x, this.max.y)
      },
      getTopRight: function() {
        return new o.Point(this.max.x, this.min.y)
      },
      getSize: function() {
        return this.max.subtract(this.min)
      },
      contains: function(t) {
        var e, i;
        return t = "number" == typeof t[0] || t instanceof o.Point ? o.point(t) : o.bounds(t), t instanceof o.Bounds ? (e = t.min, i = t.max) : e = i = t, e.x >= this.min.x && i.x <= this.max.x && e.y >= this.min.y && i.y <= this.max.y
      },
      intersects: function(t) {
        t = o.bounds(t);
        var e = this.min,
          i = this.max,
          n = t.min,
          s = t.max,
          r = s.x >= e.x && n.x <= i.x,
          a = s.y >= e.y && n.y <= i.y;
        return r && a
      },
      isValid: function() {
        return !(!this.min || !this.max)
      }
    }, o.bounds = function(t, e) {
      return !t || t instanceof o.Bounds ? t : new o.Bounds(t, e)
    }, o.Transformation = function(t, e, i, n) {
      this._a = t, this._b = e, this._c = i, this._d = n
    }, o.Transformation.prototype = {
      transform: function(t, e) {
        return this._transform(t.clone(), e)
      },
      _transform: function(t, e) {
        return e = e || 1, t.x = e * (this._a * t.x + this._b), t.y = e * (this._c * t.y + this._d), t
      },
      untransform: function(t, e) {
        return e = e || 1, new o.Point((t.x / e - this._b) / this._a, (t.y / e - this._d) / this._c)
      }
    }, o.DomUtil = {
      get: function(t) {
        return "string" == typeof t ? e.getElementById(t) : t
      },
      getStyle: function(t, i) {
        var n = t.style[i] || t.currentStyle && t.currentStyle[i];
        if ((!n || "auto" === n) && e.defaultView) {
          var o = e.defaultView.getComputedStyle(t, null);
          n = o ? o[i] : null
        }
        return "auto" === n ? null : n
      },
      create: function(t, i, n) {
        var o = e.createElement(t);
        return o.className = i, n && n.appendChild(o), o
      },
      remove: function(t) {
        var e = t.parentNode;
        e && e.removeChild(t)
      },
      empty: function(t) {
        for (; t.firstChild;) t.removeChild(t.firstChild)
      },
      toFront: function(t) {
        t.parentNode.appendChild(t)
      },
      toBack: function(t) {
        var e = t.parentNode;
        e.insertBefore(t, e.firstChild)
      },
      hasClass: function(t, e) {
        if (t.classList !== i) return t.classList.contains(e);
        var n = o.DomUtil.getClass(t);
        return n.length > 0 && new RegExp("(^|\\s)" + e + "(\\s|$)").test(n)
      },
      addClass: function(t, e) {
        if (t.classList !== i)
          for (var n = o.Util.splitWords(e), s = 0, r = n.length; s < r; s++) t.classList.add(n[s]);
        else if (!o.DomUtil.hasClass(t, e)) {
          var a = o.DomUtil.getClass(t);
          o.DomUtil.setClass(t, (a ? a + " " : "") + e)
        }
      },
      removeClass: function(t, e) {
        t.classList !== i ? t.classList.remove(e) : o.DomUtil.setClass(t, o.Util.trim((" " + o.DomUtil.getClass(t) + " ").replace(" " + e + " ", " ")))
      },
      setClass: function(t, e) {
        t.className.baseVal === i ? t.className = e : t.className.baseVal = e
      },
      getClass: function(t) {
        return t.className.baseVal === i ? t.className : t.className.baseVal
      },
      setOpacity: function(t, e) {
        if ("opacity" in t.style) t.style.opacity = e;
        else if ("filter" in t.style) {
          var i = !1,
            n = "DXImageTransform.Microsoft.Alpha";
          try {
            i = t.filters.item(n)
          } catch (o) {
            if (1 === e) return
          }
          e = Math.round(100 * e), i ? (i.Enabled = 100 !== e, i.Opacity = e) : t.style.filter += " progid:" + n + "(opacity=" + e + ")"
        }
      },
      testProp: function(t) {
        for (var i = e.documentElement.style, n = 0; n < t.length; n++)
          if (t[n] in i) return t[n];
        return !1
      },
      setTransform: function(t, e, i) {
        var n = e || new o.Point(0, 0);
        t.style[o.DomUtil.TRANSFORM] = "translate3d(" + n.x + "px," + n.y + "px,0)" + (i ? " scale(" + i + ")" : "")
      },
      setPosition: function(t, e, i) {
        t._leaflet_pos = e, o.Browser.any3d && !i ? o.DomUtil.setTransform(t, e) : (t.style.left = e.x + "px", t.style.top = e.y + "px")
      },
      getPosition: function(t) {
        return t._leaflet_pos
      }
    },
    function() {
      o.DomUtil.TRANSFORM = o.DomUtil.testProp(["transform", "WebkitTransform", "OTransform", "MozTransform", "msTransform"]);
      var i = o.DomUtil.TRANSITION = o.DomUtil.testProp(["webkitTransition", "transition", "OTransition", "MozTransition", "msTransition"]);
      if (o.DomUtil.TRANSITION_END = "webkitTransition" === i || "OTransition" === i ? i + "End" : "transitionend", "onselectstart" in e) o.DomUtil.disableTextSelection = function() {
        o.DomEvent.on(t, "selectstart", o.DomEvent.preventDefault)
      }, o.DomUtil.enableTextSelection = function() {
        o.DomEvent.off(t, "selectstart", o.DomEvent.preventDefault)
      };
      else {
        var n = o.DomUtil.testProp(["userSelect", "WebkitUserSelect", "OUserSelect", "MozUserSelect", "msUserSelect"]);
        o.DomUtil.disableTextSelection = function() {
          if (n) {
            var t = e.documentElement.style;
            this._userSelect = t[n], t[n] = "none"
          }
        }, o.DomUtil.enableTextSelection = function() {
          n && (e.documentElement.style[n] = this._userSelect, delete this._userSelect)
        }
      }
      o.DomUtil.disableImageDrag = function() {
        o.DomEvent.on(t, "dragstart", o.DomEvent.preventDefault)
      }, o.DomUtil.enableImageDrag = function() {
        o.DomEvent.off(t, "dragstart", o.DomEvent.preventDefault)
      }
    }(), o.LatLng = function(t, e, n) {
      if (isNaN(t) || isNaN(e)) throw new Error("Invalid LatLng object: (" + t + ", " + e + ")");
      this.lat = +t, this.lng = +e, n !== i && (this.alt = +n)
    }, o.LatLng.prototype = {
      equals: function(t, e) {
        if (!t) return !1;
        t = o.latLng(t);
        var n = Math.max(Math.abs(this.lat - t.lat), Math.abs(this.lng - t.lng));
        return n <= (e === i ? 1e-9 : e)
      },
      toString: function(t) {
        return "LatLng(" + o.Util.formatNum(this.lat, t) + ", " + o.Util.formatNum(this.lng, t) + ")"
      },
      distanceTo: function(t) {
        return o.CRS.Earth.distance(this, o.latLng(t))
      },
      wrap: function() {
        return o.CRS.Earth.wrapLatLng(this)
      }
    }, o.latLng = function(t, e) {
      return t instanceof o.LatLng ? t : o.Util.isArray(t) && "object" != typeof t[0] ? 3 === t.length ? new o.LatLng(t[0], t[1], t[2]) : new o.LatLng(t[0], t[1]) : t === i || null === t ? t : "object" == typeof t && "lat" in t ? new o.LatLng(t.lat, "lng" in t ? t.lng : t.lon) : e === i ? null : new o.LatLng(t, e)
    }, o.LatLngBounds = function(t, e) {
      if (t)
        for (var i = e ? [t, e] : t, n = 0, o = i.length; n < o; n++) this.extend(i[n])
    }, o.LatLngBounds.prototype = {
      extend: function(t) {
        var e, i, n = this._southWest,
          s = this._northEast;
        if (t instanceof o.LatLng) e = t, i = t;
        else {
          if (!(t instanceof o.LatLngBounds)) return t ? this.extend(o.latLng(t) || o.latLngBounds(t)) : this;
          if (e = t._southWest, i = t._northEast, !e || !i) return this
        }
        return n || s ? (n.lat = Math.min(e.lat, n.lat), n.lng = Math.min(e.lng, n.lng), s.lat = Math.max(i.lat, s.lat), s.lng = Math.max(i.lng, s.lng)) : (this._southWest = new o.LatLng(e.lat, e.lng), this._northEast = new o.LatLng(i.lat, i.lng)), this
      },
      pad: function(t) {
        var e = this._southWest,
          i = this._northEast,
          n = Math.abs(e.lat - i.lat) * t,
          s = Math.abs(e.lng - i.lng) * t;
        return new o.LatLngBounds(new o.LatLng(e.lat - n, e.lng - s), new o.LatLng(i.lat + n, i.lng + s))
      },
      getCenter: function() {
        return new o.LatLng((this._southWest.lat + this._northEast.lat) / 2, (this._southWest.lng + this._northEast.lng) / 2)
      },
      getSouthWest: function() {
        return this._southWest
      },
      getNorthEast: function() {
        return this._northEast
      },
      getNorthWest: function() {
        return new o.LatLng(this.getNorth(), this.getWest())
      },
      getSouthEast: function() {
        return new o.LatLng(this.getSouth(), this.getEast())
      },
      getWest: function() {
        return this._southWest.lng
      },
      getSouth: function() {
        return this._southWest.lat
      },
      getEast: function() {
        return this._northEast.lng
      },
      getNorth: function() {
        return this._northEast.lat
      },
      contains: function(t) {
        t = "number" == typeof t[0] || t instanceof o.LatLng ? o.latLng(t) : o.latLngBounds(t);
        var e, i, n = this._southWest,
          s = this._northEast;
        return t instanceof o.LatLngBounds ? (e = t.getSouthWest(), i = t.getNorthEast()) : e = i = t, e.lat >= n.lat && i.lat <= s.lat && e.lng >= n.lng && i.lng <= s.lng
      },
      intersects: function(t) {
        t = o.latLngBounds(t);
        var e = this._southWest,
          i = this._northEast,
          n = t.getSouthWest(),
          s = t.getNorthEast(),
          r = s.lat >= e.lat && n.lat <= i.lat,
          a = s.lng >= e.lng && n.lng <= i.lng;
        return r && a
      },
      toBBoxString: function() {
        return [this.getWest(), this.getSouth(), this.getEast(), this.getNorth()].join(",")
      },
      equals: function(t) {
        return !!t && (t = o.latLngBounds(t), this._southWest.equals(t.getSouthWest()) && this._northEast.equals(t.getNorthEast()))
      },
      isValid: function() {
        return !(!this._southWest || !this._northEast)
      }
    }, o.latLngBounds = function(t, e) {
      return !t || t instanceof o.LatLngBounds ? t : new o.LatLngBounds(t, e)
    }, o.Projection = {}, o.Projection.LonLat = {
      project: function(t) {
        return new o.Point(t.lng, t.lat)
      },
      unproject: function(t) {
        return new o.LatLng(t.y, t.x)
      },
      bounds: o.bounds([-180, -90], [180, 90])
    }, o.Projection.SphericalMercator = {
      R: 6378137,
      project: function(t) {
        var e = Math.PI / 180,
          i = 1 - 1e-15,
          n = Math.max(Math.min(Math.sin(t.lat * e), i), -i);
        return new o.Point(this.R * t.lng * e, this.R * Math.log((1 + n) / (1 - n)) / 2)
      },
      unproject: function(t) {
        var e = 180 / Math.PI;
        return new o.LatLng((2 * Math.atan(Math.exp(t.y / this.R)) - Math.PI / 2) * e, t.x * e / this.R)
      },
      bounds: function() {
        var t = 6378137 * Math.PI;
        return o.bounds([-t, -t], [t, t])
      }()
    }, o.CRS = {
      latLngToPoint: function(t, e) {
        var i = this.projection.project(t),
          n = this.scale(e);
        return this.transformation._transform(i, n)
      },
      pointToLatLng: function(t, e) {
        var i = this.scale(e),
          n = this.transformation.untransform(t, i);
        return this.projection.unproject(n)
      },
      project: function(t) {
        return this.projection.project(t)
      },
      unproject: function(t) {
        return this.projection.unproject(t)
      },
      scale: function(t) {
        return 256 * Math.pow(2, t)
      },
      getProjectedBounds: function(t) {
        if (this.infinite) return null;
        var e = this.projection.bounds,
          i = this.scale(t),
          n = this.transformation.transform(e.min, i),
          s = this.transformation.transform(e.max, i);
        return o.bounds(n, s)
      },
      wrapLatLng: function(t) {
        var e = this.wrapLng ? o.Util.wrapNum(t.lng, this.wrapLng, !0) : t.lng,
          i = this.wrapLat ? o.Util.wrapNum(t.lat, this.wrapLat, !0) : t.lat;
        return o.latLng(i, e)
      }
    }, o.CRS.Simple = o.extend({}, o.CRS, {
      projection: o.Projection.LonLat,
      transformation: new o.Transformation(1, 0, (-1), 0),
      scale: function(t) {
        return Math.pow(2, t)
      },
      distance: function(t, e) {
        var i = e.lng - t.lng,
          n = e.lat - t.lat;
        return Math.sqrt(i * i + n * n)
      },
      infinite: !0
    }), o.CRS.Earth = o.extend({}, o.CRS, {
      wrapLng: [-180, 180],
      R: 6378137,
      distance: function(t, e) {
        var i = Math.PI / 180,
          n = t.lat * i,
          o = e.lat * i,
          s = Math.sin(n) * Math.sin(o) + Math.cos(n) * Math.cos(o) * Math.cos((e.lng - t.lng) * i);
        return this.R * Math.acos(Math.min(s, 1))
      }
    }), o.CRS.EPSG3857 = o.extend({}, o.CRS.Earth, {
      code: "EPSG:3857",
      projection: o.Projection.SphericalMercator,
      transformation: function() {
        var t = .5 / (Math.PI * o.Projection.SphericalMercator.R);
        return new o.Transformation(t, .5, (-t), .5)
      }()
    }), o.CRS.EPSG900913 = o.extend({}, o.CRS.EPSG3857, {
      code: "EPSG:900913"
    }), o.CRS.EPSG4326 = o.extend({}, o.CRS.Earth, {
      code: "EPSG:4326",
      projection: o.Projection.LonLat,
      transformation: new o.Transformation(1 / 180, 1, -1 / 180, .5)
    }), o.Map = o.Evented.extend({
      options: {
        crs: o.CRS.EPSG3857,
        fadeAnimation: !0,
        trackResize: !0,
        markerZoomAnimation: !0
      },
      initialize: function(t, e) {
        e = o.setOptions(this, e), this._initContainer(t), this._initLayout(), this._onResize = o.bind(this._onResize, this), this._initEvents(), e.maxBounds && this.setMaxBounds(e.maxBounds), e.zoom !== i && (this._zoom = this._limitZoom(e.zoom)), e.center && e.zoom !== i && this.setView(o.latLng(e.center), e.zoom, {
          reset: !0
        }), this._handlers = [], this._layers = {}, this._zoomBoundLayers = {}, this.callInitHooks(), this._addLayers(this.options.layers)
      },
      setView: function(t, e) {
        return e = e === i ? this.getZoom() : e, this._resetView(o.latLng(t), this._limitZoom(e)), this
      },
      setZoom: function(t, e) {
        return this._loaded ? this.setView(this.getCenter(), t, {
          zoom: e
        }) : (this._zoom = this._limitZoom(t), this)
      },
      zoomIn: function(t, e) {
        return this.setZoom(this._zoom + (t || 1), e)
      },
      zoomOut: function(t, e) {
        return this.setZoom(this._zoom - (t || 1), e)
      },
      setZoomAround: function(t, e, i) {
        var n = this.getZoomScale(e),
          s = this.getSize().divideBy(2),
          r = t instanceof o.Point ? t : this.latLngToContainerPoint(t),
          a = r.subtract(s).multiplyBy(1 - 1 / n),
          h = this.containerPointToLatLng(s.add(a));
        return this.setView(h, e, {
          zoom: i
        })
      },
      fitBounds: function(t, e) {
        e = e || {}, t = t.getBounds ? t.getBounds() : o.latLngBounds(t);
        var i = o.point(e.paddingTopLeft || e.padding || [0, 0]),
          n = o.point(e.paddingBottomRight || e.padding || [0, 0]),
          s = this.getBoundsZoom(t, !1, i.add(n));
        s = e.maxZoom ? Math.min(e.maxZoom, s) : s;
        var r = n.subtract(i).divideBy(2),
          a = this.project(t.getSouthWest(), s),
          h = this.project(t.getNorthEast(), s),
          l = this.unproject(a.add(h).divideBy(2).add(r), s);
        return this.setView(l, s, e)
      },
      fitWorld: function(t) {
        return this.fitBounds([
          [-90, -180],
          [90, 180]
        ], t)
      },
      panTo: function(t, e) {
        return this.setView(t, this._zoom, {
          pan: e
        })
      },
      panBy: function(t) {
        return this.fire("movestart"), this._rawPanBy(o.point(t)), this.fire("move"), this.fire("moveend")
      },
      setMaxBounds: function(t) {
        return t = o.latLngBounds(t), this.options.maxBounds = t, t ? (this._loaded && this._panInsideMaxBounds(), this.on("moveend", this._panInsideMaxBounds)) : this.off("moveend", this._panInsideMaxBounds)
      },
      panInsideBounds: function(t, e) {
        var i = this.getCenter(),
          n = this._limitCenter(i, this._zoom, t);
        return i.equals(n) ? this : this.panTo(n, e)
      },
      invalidateSize: function(t) {
        if (!this._loaded) return this;
        t = o.extend({
          animate: !1,
          pan: !0
        }, t === !0 ? {
          animate: !0
        } : t);
        var e = this.getSize();
        this._sizeChanged = !0, this._initialCenter = null;
        var i = this.getSize(),
          n = e.divideBy(2).round(),
          s = i.divideBy(2).round(),
          r = n.subtract(s);
        return r.x || r.y ? (t.animate && t.pan ? this.panBy(r) : (t.pan && this._rawPanBy(r), this.fire("move"), t.debounceMoveend ? (clearTimeout(this._sizeTimer), this._sizeTimer = setTimeout(o.bind(this.fire, this, "moveend"), 200)) : this.fire("moveend")), this.fire("resize", {
          oldSize: e,
          newSize: i
        })) : this
      },
      stop: function() {
        return o.Util.cancelAnimFrame(this._flyToFrame), this._panAnim && this._panAnim.stop(), this
      },
      addHandler: function(t, e) {
        if (!e) return this;
        var i = this[t] = new e(this);
        return this._handlers.push(i), this.options[t] && i.enable(), this
      },
      remove: function() {
        this._initEvents("off");
        try {
          delete this._container._leaflet
        } catch (t) {
          this._container._leaflet = i
        }
        return o.DomUtil.remove(this._mapPane), this._clearControlPos && this._clearControlPos(), this._clearHandlers(), this._loaded && this.fire("unload"), this
      },
      createPane: function(t, e) {
        var i = "leaflet-pane" + (t ? " leaflet-" + t.replace("Pane", "") + "-pane" : ""),
          n = o.DomUtil.create("div", i, e || this._mapPane);
        return t && (this._panes[t] = n), n
      },
      getCenter: function() {
        return this._checkIfLoaded(), this._initialCenter && !this._moved() ? this._initialCenter : this.layerPointToLatLng(this._getCenterLayerPoint())
      },
      getZoom: function() {
        return this._zoom
      },
      getBounds: function() {
        var t = this.getPixelBounds(),
          e = this.unproject(t.getBottomLeft()),
          i = this.unproject(t.getTopRight());
        return new o.LatLngBounds(e, i)
      },
      getMinZoom: function() {
        return this.options.minZoom === i ? this._layersMinZoom || 0 : this.options.minZoom
      },
      getMaxZoom: function() {
        return this.options.maxZoom === i ? this._layersMaxZoom === i ? 1 / 0 : this._layersMaxZoom : this.options.maxZoom
      },
      getBoundsZoom: function(t, e, i) {
        t = o.latLngBounds(t);
        var n, s = this.getMinZoom() - (e ? 1 : 0),
          r = this.getMaxZoom(),
          a = this.getSize(),
          h = t.getNorthWest(),
          l = t.getSouthEast(),
          u = !0;
        i = o.point(i || [0, 0]);
        do s++, n = this.project(l, s).subtract(this.project(h, s)).add(i).floor(), u = e ? n.x < a.x || n.y < a.y : a.contains(n); while (u && s <= r);
        return u && e ? null : e ? s : s - 1
      },
      getSize: function() {
        return this._size && !this._sizeChanged || (this._size = new o.Point(this._container.clientWidth, this._container.clientHeight), this._sizeChanged = !1), this._size.clone()
      },
      getPixelBounds: function() {
        var t = this._getTopLeftPoint();
        return new o.Bounds(t, t.add(this.getSize()))
      },
      getPixelOrigin: function() {
        return this._checkIfLoaded(), this._pixelOrigin
      },
      getPixelWorldBounds: function(t) {
        return this.options.crs.getProjectedBounds(t === i ? this.getZoom() : t)
      },
      getPane: function(t) {
        return "string" == typeof t ? this._panes[t] : t
      },
      getPanes: function() {
        return this._panes
      },
      getContainer: function() {
        return this._container
      },
      getZoomScale: function(t, e) {
        var n = this.options.crs;
        return e = e === i ? this._zoom : e, n.scale(t) / n.scale(e)
      },
      getScaleZoom: function(t, e) {
        return e = e === i ? this._zoom : e, e + Math.log(t) / Math.LN2
      },
      project: function(t, e) {
        return e = e === i ? this._zoom : e, this.options.crs.latLngToPoint(o.latLng(t), e)
      },
      unproject: function(t, e) {
        return e = e === i ? this._zoom : e, this.options.crs.pointToLatLng(o.point(t), e)
      },
      layerPointToLatLng: function(t) {
        var e = o.point(t).add(this.getPixelOrigin());
        return this.unproject(e)
      },
      latLngToLayerPoint: function(t) {
        var e = this.project(o.latLng(t))._round();
        return e._subtract(this.getPixelOrigin())
      },
      wrapLatLng: function(t) {
        return this.options.crs.wrapLatLng(o.latLng(t))
      },
      distance: function(t, e) {
        return this.options.crs.distance(o.latLng(t), o.latLng(e))
      },
      containerPointToLayerPoint: function(t) {
        return o.point(t).subtract(this._getMapPanePos())
      },
      layerPointToContainerPoint: function(t) {
        return o.point(t).add(this._getMapPanePos())
      },
      containerPointToLatLng: function(t) {
        var e = this.containerPointToLayerPoint(o.point(t));
        return this.layerPointToLatLng(e)
      },
      latLngToContainerPoint: function(t) {
        return this.layerPointToContainerPoint(this.latLngToLayerPoint(o.latLng(t)))
      },
      mouseEventToContainerPoint: function(t) {
        return o.DomEvent.getMousePosition(t, this._container)
      },
      mouseEventToLayerPoint: function(t) {
        return this.containerPointToLayerPoint(this.mouseEventToContainerPoint(t))
      },
      mouseEventToLatLng: function(t) {
        return this.layerPointToLatLng(this.mouseEventToLayerPoint(t))
      },
      _initContainer: function(t) {
        var e = this._container = o.DomUtil.get(t);
        if (!e) throw new Error("Map container not found.");
        if (e._leaflet) throw new Error("Map container is already initialized.");
        e._leaflet = !0
      },
      _initLayout: function() {
        var t = this._container;
        this._fadeAnimated = this.options.fadeAnimation && o.Browser.any3d, o.DomUtil.addClass(t, "leaflet-container" + (o.Browser.touch ? " leaflet-touch" : "") + (o.Browser.retina ? " leaflet-retina" : "") + (o.Browser.ielt9 ? " leaflet-oldie" : "") + (o.Browser.safari ? " leaflet-safari" : "") + (this._fadeAnimated ? " leaflet-fade-anim" : ""));
        var e = o.DomUtil.getStyle(t, "position");
        "absolute" !== e && "relative" !== e && "fixed" !== e && (t.style.position = "relative"), this._initPanes(), this._initControlPos && this._initControlPos()
      },
      _initPanes: function() {
        var t = this._panes = {};
        this._mapPane = this.createPane("mapPane", this._container), this.createPane("tilePane"), this.createPane("shadowPane"), this.createPane("overlayPane"), this.createPane("markerPane"), this.createPane("popupPane"), this.options.markerZoomAnimation || (o.DomUtil.addClass(t.markerPane, "leaflet-zoom-hide"), o.DomUtil.addClass(t.shadowPane, "leaflet-zoom-hide"))
      },
      _resetView: function(t, e, i, n) {
        var s = this._zoom !== e;
        n || (this.fire("movestart"), s && this.fire("zoomstart")), this._zoom = e, this._initialCenter = t, i || o.DomUtil.setPosition(this._mapPane, new o.Point(0, 0)), this._pixelOrigin = this._getNewPixelOrigin(t);
        var r = !this._loaded;
        this._loaded = !0, this.fire("viewreset", {
          hard: !i
        }), r && this.fire("load"), this.fire("move"), (s || n) && this.fire("zoomend"), this.fire("moveend", {
          hard: !i
        })
      },
      _rawPanBy: function(t) {
        o.DomUtil.setPosition(this._mapPane, this._getMapPanePos().subtract(t))
      },
      _getZoomSpan: function() {
        return this.getMaxZoom() - this.getMinZoom()
      },
      _panInsideMaxBounds: function() {
        this.panInsideBounds(this.options.maxBounds)
      },
      _checkIfLoaded: function() {
        if (!this._loaded) throw new Error("Set map center and zoom first.")
      },
      _initEvents: function(e) {
        o.DomEvent && (e = e || "on", o.DomEvent[e](this._container, "click dblclick mousedown mouseup mouseenter mouseleave mousemove contextmenu", this._handleMouseEvent, this), this.options.trackResize && o.DomEvent[e](t, "resize", this._onResize, this))
      },
      _onResize: function() {
        o.Util.cancelAnimFrame(this._resizeRequest), this._resizeRequest = o.Util.requestAnimFrame(function() {
          this.invalidateSize({
            debounceMoveend: !0
          })
        }, this, !1, this._container)
      },
      _handleMouseEvent: function(t) {
        this._loaded && this._fireMouseEvent(this, t, "mouseenter" === t.type ? "mouseover" : "mouseleave" === t.type ? "mouseout" : t.type)
      },
      _fireMouseEvent: function(t, e, i, n, s) {
        if (i = i || e.type, !o.DomEvent._skipped(e)) {
          if ("click" === i) {
            var r = t.options.draggable === !0 ? t : this;
            if (!e._simulated && (r.dragging && r.dragging.moved() || this.boxZoom && this.boxZoom.moved())) return;
            t.fire("preclick")
          }
          if (t.listens(i, n)) {
            "contextmenu" === i && o.DomEvent.preventDefault(e), "click" !== i && "dblclick" !== i && "contextmenu" !== i || o.DomEvent.stopPropagation(e);
            var a = {
              originalEvent: e,
              containerPoint: this.mouseEventToContainerPoint(e)
            };
            a.layerPoint = this.containerPointToLayerPoint(a.containerPoint), a.latlng = s || this.layerPointToLatLng(a.layerPoint), t.fire(i, a, n)
          }
        }
      },
      _clearHandlers: function() {
        for (var t = 0, e = this._handlers.length; t < e; t++) this._handlers[t].disable()
      },
      whenReady: function(t, e) {
        return this._loaded ? t.call(e || this, {
          target: this
        }) : this.on("load", t, e), this
      },
      _getMapPanePos: function() {
        return o.DomUtil.getPosition(this._mapPane) || new o.Point(0, 0)
      },
      _moved: function() {
        var t = this._getMapPanePos();
        return t && !t.equals([0, 0])
      },
      _getTopLeftPoint: function() {
        return this.getPixelOrigin().subtract(this._getMapPanePos())
      },
      _getNewPixelOrigin: function(t, e) {
        var i = this.getSize()._divideBy(2);
        return this.project(t, e)._subtract(i)._add(this._getMapPanePos())._round()
      },
      _latLngToNewLayerPoint: function(t, e, i) {
        var n = this._getNewPixelOrigin(i, e);
        return this.project(t, e)._subtract(n)
      },
      _getCenterLayerPoint: function() {
        return this.containerPointToLayerPoint(this.getSize()._divideBy(2))
      },
      _getCenterOffset: function(t) {
        return this.latLngToLayerPoint(t).subtract(this._getCenterLayerPoint())
      },
      _limitCenter: function(t, e, i) {
        if (!i) return t;
        var n = this.project(t, e),
          s = this.getSize().divideBy(2),
          r = new o.Bounds(n.subtract(s), n.add(s)),
          a = this._getBoundsOffset(r, i, e);
        return this.unproject(n.add(a), e)
      },
      _limitOffset: function(t, e) {
        if (!e) return t;
        var i = this.getPixelBounds(),
          n = new o.Bounds(i.min.add(t), i.max.add(t));
        return t.add(this._getBoundsOffset(n, e))
      },
      _getBoundsOffset: function(t, e, i) {
        var n = this.project(e.getNorthWest(), i).subtract(t.min),
          s = this.project(e.getSouthEast(), i).subtract(t.max),
          r = this._rebound(n.x, -s.x),
          a = this._rebound(n.y, -s.y);
        return new o.Point(r, a)
      },
      _rebound: function(t, e) {
        return t + e > 0 ? Math.round(t - e) / 2 : Math.max(0, Math.ceil(t)) - Math.max(0, Math.floor(e))
      },
      _limitZoom: function(t) {
        var e = this.getMinZoom(),
          i = this.getMaxZoom();
        return Math.max(e, Math.min(i, t))
      }
    }), o.map = function(t, e) {
      return new o.Map(t, e)
    }, o.Layer = o.Evented.extend({
      options: {
        pane: "overlayPane"
      },
      addTo: function(t) {
        return t.addLayer(this), this
      },
      remove: function() {
        return this.removeFrom(this._map || this._mapToAdd)
      },
      removeFrom: function(t) {
        return t && t.removeLayer(this), this
      },
      getPane: function(t) {
        return this._map.getPane(t ? this.options[t] || t : this.options.pane)
      },
      _layerAdd: function(t) {
        var e = t.target;
        e.hasLayer(this) && (this._map = e, this._zoomAnimated = e._zoomAnimated, this.onAdd(e), this.getAttribution && this._map.attributionControl && this._map.attributionControl.addAttribution(this.getAttribution()), this.getEvents && e.on(this.getEvents(), this), this.fire("add"), e.fire("layeradd", {
          layer: this
        }))
      }
    }), o.Map.include({
      addLayer: function(t) {
        var e = o.stamp(t);
        return this._layers[e] ? t : (this._layers[e] = t, t._mapToAdd = this, t.beforeAdd && t.beforeAdd(this), this.whenReady(t._layerAdd, t), this)
      },
      removeLayer: function(t) {
        var e = o.stamp(t);
        return this._layers[e] ? (this._loaded && t.onRemove(this), t.getAttribution && this.attributionControl && this.attributionControl.removeAttribution(t.getAttribution()), t.getEvents && this.off(t.getEvents(), t), delete this._layers[e], this._loaded && (this.fire("layerremove", {
          layer: t
        }), t.fire("remove")), t._map = t._mapToAdd = null, this) : this
      },
      hasLayer: function(t) {
        return !!t && o.stamp(t) in this._layers
      },
      eachLayer: function(t, e) {
        for (var i in this._layers) t.call(e, this._layers[i]);
        return this
      },
      _addLayers: function(t) {
        t = t ? o.Util.isArray(t) ? t : [t] : [];
        for (var e = 0, i = t.length; e < i; e++) this.addLayer(t[e])
      },
      _addZoomLimit: function(t) {
        !isNaN(t.options.maxZoom) && isNaN(t.options.minZoom) || (this._zoomBoundLayers[o.stamp(t)] = t, this._updateZoomLevels())
      },
      _removeZoomLimit: function(t) {
        var e = o.stamp(t);
        this._zoomBoundLayers[e] && (delete this._zoomBoundLayers[e], this._updateZoomLevels())
      },
      _updateZoomLevels: function() {
        var t = 1 / 0,
          e = -(1 / 0),
          n = this._getZoomSpan();
        for (var o in this._zoomBoundLayers) {
          var s = this._zoomBoundLayers[o].options;
          t = s.minZoom === i ? t : Math.min(t, s.minZoom), e = s.maxZoom === i ? e : Math.max(e, s.maxZoom)
        }
        this._layersMaxZoom = e === -(1 / 0) ? i : e, this._layersMinZoom = t === 1 / 0 ? i : t, n !== this._getZoomSpan() && this.fire("zoomlevelschange")
      }
    }), o.Projection.Mercator = {
      R: 6378137,
      R_MINOR: 6356752.314245179,
      bounds: o.bounds([-20037508.34279, -15496570.73972], [20037508.34279, 18764656.23138]),
      project: function(t) {
        var e = Math.PI / 180,
          i = this.R,
          n = t.lat * e,
          s = this.R_MINOR / i,
          r = Math.sqrt(1 - s * s),
          a = r * Math.sin(n),
          h = Math.tan(Math.PI / 4 - n / 2) / Math.pow((1 - a) / (1 + a), r / 2);
        return n = -i * Math.log(Math.max(h, 1e-10)), new o.Point(t.lng * e * i, n)
      },
      unproject: function(t) {
        for (var e, i = 180 / Math.PI, n = this.R, s = this.R_MINOR / n, r = Math.sqrt(1 - s * s), a = Math.exp(-t.y / n), h = Math.PI / 2 - 2 * Math.atan(a), l = 0, u = .1; l < 15 && Math.abs(u) > 1e-7; l++) e = r * Math.sin(h),
          e = Math.pow((1 - e) / (1 + e), r / 2), u = Math.PI / 2 - 2 * Math.atan(a * e) - h, h += u;
        return new o.LatLng(h * i, t.x * i / n)
      }
    }, o.CRS.EPSG3395 = o.extend({}, o.CRS.Earth, {
      code: "EPSG:3395",
      projection: o.Projection.Mercator,
      transformation: function() {
        var t = .5 / (Math.PI * o.Projection.Mercator.R);
        return new o.Transformation(t, .5, (-t), .5)
      }()
    }), o.GridLayer = o.Layer.extend({
      options: {
        pane: "tilePane",
        tileSize: 256,
        opacity: 1,
        unloadInvisibleTiles: o.Browser.mobile,
        updateWhenIdle: o.Browser.mobile,
        updateInterval: 200,
        attribution: null,
        zIndex: null,
        bounds: null,
        minZoom: 0
      },
      initialize: function(t) {
        t = o.setOptions(this, t)
      },
      onAdd: function() {
        this._initContainer(), this.options.updateWhenIdle || (this._update = o.Util.throttle(this._update, this.options.updateInterval, this)), this._pruneTiles = o.Util.throttle(this._pruneTiles, 200, this), this._levels = {}, this._tiles = {}, this._loaded = {}, this._tilesToLoad = 0, this._reset(), this._update()
      },
      beforeAdd: function(t) {
        t._addZoomLimit(this)
      },
      onRemove: function(t) {
        o.DomUtil.remove(this._container), t._removeZoomLimit(this), this._container = null, this._tileZoom = null
      },
      bringToFront: function() {
        return this._map && (o.DomUtil.toFront(this._container), this._setAutoZIndex(Math.max)), this
      },
      bringToBack: function() {
        return this._map && (o.DomUtil.toBack(this._container), this._setAutoZIndex(Math.min)), this
      },
      getAttribution: function() {
        return this.options.attribution
      },
      getContainer: function() {
        return this._container
      },
      setOpacity: function(t) {
        return this.options.opacity = t, this._map && this._updateOpacity(), this
      },
      setZIndex: function(t) {
        return this.options.zIndex = t, this._updateZIndex(), this
      },
      redraw: function() {
        return this._map && (this._removeAllTiles(), this._update()), this
      },
      getEvents: function() {
        var t = {
          viewreset: this._reset,
          moveend: this._update
        };
        return this.options.updateWhenIdle || (t.move = this._update), this._zoomAnimated && (t.zoomanim = this._animateZoom), t
      },
      createTile: function() {
        return e.createElement("div")
      },
      _updateZIndex: function() {
        this._container && this.options.zIndex !== i && (this._container.style.zIndex = this.options.zIndex)
      },
      _setAutoZIndex: function(t) {
        for (var e, i = this.getPane().children, n = -t(-(1 / 0), 1 / 0), o = 0, s = i.length; o < s; o++) e = i[o].style.zIndex, i[o] !== this._container && e && (n = t(n, +e));
        isFinite(n) && (this.options.zIndex = n + t(-1, 1), this._updateZIndex())
      },
      _updateOpacity: function() {
        var t = this.options.opacity;
        if (o.Browser.ielt9)
          for (var e in this._tiles) o.DomUtil.setOpacity(this._tiles[e], t);
        else o.DomUtil.setOpacity(this._container, t)
      },
      _initContainer: function() {
        this._container || (this._container = o.DomUtil.create("div", "leaflet-layer"), this._updateZIndex(), this.options.opacity < 1 && this._updateOpacity(), this.getPane().appendChild(this._container))
      },
      _updateLevels: function() {
        var t = this._tileZoom;
        for (var e in this._levels) this._levels[e].el.style.zIndex = -Math.abs(t - e);
        var i = this._levels[t],
          n = this._map;
        return i || (i = this._levels[t] = {}, i.el = o.DomUtil.create("div", "leaflet-tile-container leaflet-zoom-animated", this._container), i.el.style.zIndex = 0, i.origin = n.project(n.unproject(n.getPixelOrigin()), t).round(), i.zoom = t), this._level = i, i
      },
      _pruneTiles: function() {
        if (this._map) {
          this._retain = {};
          var t, e, i, n, s = this._map.getBounds(),
            r = this._tileZoom,
            a = this._getTileRange(s, r);
          for (t = a.min.x; t <= a.max.x; t++)
            for (e = a.min.y; e <= a.max.y; e++) i = t + ":" + e + ":" + r, this._retain[i] = !0, this._loaded[i] || (n = this._retainParent(t, e, r, r - 5) || this._retainChildren(t, e, r, r + 2));
          for (i in this._tiles) this._retain[i] || (this._loaded[i] ? setTimeout(o.bind(this._deferRemove, this, i), 250) : (this._removeTile(i), this._tilesToLoad--))
        }
      },
      _removeAllTiles: function() {
        for (var t in this._tiles) this._removeTile(t);
        this._tilesToLoad = 0
      },
      _deferRemove: function(t) {
        this._retain[t] || this._removeTile(t)
      },
      _retainParent: function(t, e, i, n) {
        var o = Math.floor(t / 2),
          s = Math.floor(e / 2),
          r = i - 1,
          a = o + ":" + s + ":" + r;
        return this._loaded[a] ? (this._retain[a] = !0, !0) : r > n && this._retainParent(o, s, r, n)
      },
      _retainChildren: function(t, e, i, n) {
        for (var o = 2 * t; o < 2 * t + 2; o++)
          for (var s = 2 * e; s < 2 * e + 2; s++) {
            var r = o + ":" + s + ":" + (i + 1);
            this._loaded[r] ? this._retain[r] = !0 : i + 1 < n && this._retainChildren(o, s, i + 1, n)
          }
      },
      _reset: function(t) {
        var e = this._map,
          i = e.getZoom(),
          n = Math.round(i),
          o = this._tileZoom !== n;
        (o || t && t.hard) && (this._abortLoading && this._abortLoading(), this._tileZoom = n, this._updateLevels(), this._resetGrid()), this._setZoomTransforms(e.getCenter(), i)
      },
      _setZoomTransforms: function(t, e) {
        for (var i in this._levels) this._setZoomTransform(this._levels[i], t, e)
      },
      _setZoomTransform: function(t, e, i) {
        var n = this._map.getZoomScale(i, t.zoom),
          s = t.origin.multiplyBy(n).subtract(this._map._getNewPixelOrigin(e, i)).round();
        o.DomUtil.setTransform(t.el, s, n)
      },
      _resetGrid: function() {
        var t = this._map,
          e = t.options.crs,
          i = this._tileSize = this._getTileSize(),
          n = this._tileZoom,
          o = this._map.getPixelWorldBounds(this._tileZoom);
        o && (this._globalTileRange = this._pxBoundsToTileRange(o)), this._wrapX = e.wrapLng && [Math.floor(t.project([0, e.wrapLng[0]], n).x / i), Math.ceil(t.project([0, e.wrapLng[1]], n).x / i)], this._wrapY = e.wrapLat && [Math.floor(t.project([e.wrapLat[0], 0], n).y / i), Math.ceil(t.project([e.wrapLat[1], 0], n).y / i)]
      },
      _getTileSize: function() {
        return this.options.tileSize
      },
      _update: function() {
        if (this._map) {
          var t = this._map.getBounds();
          this.options.unloadInvisibleTiles && this._removeOtherTiles(t), this._addTiles(t)
        }
      },
      _getTileRange: function(t, e) {
        var i = new o.Bounds(this._map.project(t.getNorthWest(), e), this._map.project(t.getSouthEast(), e));
        return this._pxBoundsToTileRange(i)
      },
      _addTiles: function(t) {
        var i, n, s, r = [],
          a = this._getTileRange(t, this._tileZoom),
          h = a.getCenter();
        for (i = a.min.y; i <= a.max.y; i++)
          for (n = a.min.x; n <= a.max.x; n++) s = new o.Point(n, i), s.z = this._tileZoom, this._tileCoordsToKey(s) in this._tiles || !this._isValidTile(s) || r.push(s);
        r.sort(function(t, e) {
          return t.distanceTo(h) - e.distanceTo(h)
        });
        var l = r.length;
        if (0 !== l) {
          this._tilesToLoad || this.fire("loading"), this._tilesToLoad += l;
          var u = e.createDocumentFragment();
          for (n = 0; n < l; n++) this._addTile(r[n], u);
          this._level.el.appendChild(u), this._pruneTiles()
        }
      },
      _isValidTile: function(t) {
        var e = this._map.options.crs;
        if (!e.infinite) {
          var i = this._globalTileRange;
          if (!e.wrapLng && (t.x < i.min.x || t.x > i.max.x) || !e.wrapLat && (t.y < i.min.y || t.y > i.max.y)) return !1
        }
        if (!this.options.bounds) return !0;
        var n = this._tileCoordsToBounds(t);
        return o.latLngBounds(this.options.bounds).intersects(n)
      },
      _keyToBounds: function(t) {
        return this._tileCoordsToBounds(this._keyToTileCoords(t))
      },
      _tileCoordsToBounds: function(t) {
        var e = this._map,
          i = this._getTileSize(),
          n = t.multiplyBy(i),
          s = n.add([i, i]),
          r = e.wrapLatLng(e.unproject(n, t.z)),
          a = e.wrapLatLng(e.unproject(s, t.z));
        return new o.LatLngBounds(r, a)
      },
      _tileCoordsToKey: function(t) {
        return t.x + ":" + t.y + ":" + t.z
      },
      _keyToTileCoords: function(t) {
        var e = t.split(":"),
          i = new o.Point((+e[0]), (+e[1]));
        return i.z = +e[2], i
      },
      _removeOtherTiles: function(t) {
        for (var e in this._tiles) {
          var i = this._keyToBounds(e);
          t.intersects(i) || this._removeTile(e)
        }
      },
      _removeTile: function(t) {
        var e = this._tiles[t];
        e && (o.DomUtil.remove(e), delete this._tiles[t], delete this._loaded[t], this.fire("tileunload", {
          tile: e,
          coords: this._keyToTileCoords(t)
        }))
      },
      _initTile: function(t) {
        o.DomUtil.addClass(t, "leaflet-tile"), t.style.width = this._tileSize + "px", t.style.height = this._tileSize + "px", t.onselectstart = o.Util.falseFn, t.onmousemove = o.Util.falseFn, o.Browser.ielt9 && this.options.opacity < 1 && o.DomUtil.setOpacity(t, this.options.opacity), o.Browser.android && !o.Browser.android23 && (t.style.WebkitBackfaceVisibility = "hidden")
      },
      _addTile: function(t, e) {
        var i = this._getTilePos(t),
          n = this._tileCoordsToKey(t),
          s = this.createTile(this._wrapCoords(t), o.bind(this._tileReady, this, t));
        this._initTile(s), this.createTile.length < 2 && setTimeout(o.bind(this._tileReady, this, t, null, s), 0), o.DomUtil.setPosition(s, i, !0), this._tiles[n] = s, e.appendChild(s), this.fire("tileloadstart", {
          tile: s,
          coords: t
        })
      },
      _tileReady: function(t, e, i) {
        e && this.fire("tileerror", {
          error: e,
          tile: i,
          coords: t
        });
        var n = this._tileCoordsToKey(t);
        this._tiles[n] && (this._loaded[n] = !0, this._pruneTiles(), o.DomUtil.addClass(i, "leaflet-tile-loaded"), this.fire("tileload", {
          tile: i,
          coords: t
        }), this._tilesToLoad--, 0 === this._tilesToLoad && this.fire("load"))
      },
      _getTilePos: function(t) {
        return t.multiplyBy(this._tileSize).subtract(this._level.origin)
      },
      _wrapCoords: function(t) {
        var e = new o.Point(this._wrapX ? o.Util.wrapNum(t.x, this._wrapX) : t.x, this._wrapY ? o.Util.wrapNum(t.y, this._wrapY) : t.y);
        return e.z = t.z, e
      },
      _pxBoundsToTileRange: function(t) {
        return new o.Bounds(t.min.divideBy(this._tileSize).floor(), t.max.divideBy(this._tileSize).ceil().subtract([1, 1]))
      },
      _animateZoom: function(t) {
        this._setZoomTransforms(t.center, t.zoom)
      }
    }), o.gridLayer = function(t) {
      return new o.GridLayer(t)
    }, o.TileLayer = o.GridLayer.extend({
      options: {
        maxZoom: 18,
        subdomains: "abc",
        errorTileUrl: "",
        zoomOffset: 0,
        maxNativeZoom: null,
        tms: !1,
        zoomReverse: !1,
        detectRetina: !1,
        crossOrigin: !1
      },
      initialize: function(t, e) {
        this._url = t, e = o.setOptions(this, e), e.detectRetina && o.Browser.retina && e.maxZoom > 0 && (e.tileSize = Math.floor(e.tileSize / 2), e.zoomOffset++, e.minZoom = Math.max(0, e.minZoom), e.maxZoom--), "string" == typeof e.subdomains && (e.subdomains = e.subdomains.split("")), o.Browser.android || this.on("tileunload", this._onTileRemove)
      },
      setUrl: function(t, e) {
        return this._url = t, e || this.redraw(), this
      },
      createTile: function(t, i) {
        var n = e.createElement("img");
        return n.onload = o.bind(this._tileOnLoad, this, i, n), n.onerror = o.bind(this._tileOnError, this, i, n), this.options.crossOrigin && (n.crossOrigin = ""), n.alt = "", n.src = this.getTileUrl(t), n
      },
      getTileUrl: function(t) {
        return o.Util.template(this._url, o.extend({
          r: this.options.detectRetina && o.Browser.retina && this.options.maxZoom > 0 ? "@2x" : "",
          s: this._getSubdomain(t),
          x: t.x,
          y: this.options.tms ? this._globalTileRange.max.y - t.y : t.y,
          z: this._getZoomForUrl()
        }, this.options))
      },
      _tileOnLoad: function(t, e) {
        t(null, e)
      },
      _tileOnError: function(t, e, i) {
        var n = this.options.errorTileUrl;
        n && (e.src = n), t(i, e)
      },
      _getTileSize: function() {
        var t = this._map,
          e = this.options,
          i = t.getZoom() + e.zoomOffset,
          n = e.maxNativeZoom;
        return n && i > n ? Math.round(t.getZoomScale(n, i) * e.tileSize) : e.tileSize
      },
      _onTileRemove: function(t) {
        t.tile.onload = null, t.tile.src = o.Util.emptyImageUrl
      },
      _getZoomForUrl: function() {
        var t = this.options,
          e = this._tileZoom;
        return t.zoomReverse && (e = t.maxZoom - e), e += t.zoomOffset, t.maxNativeZoom ? Math.min(e, t.maxNativeZoom) : e
      },
      _getSubdomain: function(t) {
        var e = Math.abs(t.x + t.y) % this.options.subdomains.length;
        return this.options.subdomains[e]
      },
      _abortLoading: function() {
        var t, e;
        for (t in this._tiles) e = this._tiles[t], e.onload = o.Util.falseFn, e.onerror = o.Util.falseFn, e.complete || (e.src = o.Util.emptyImageUrl, o.DomUtil.remove(e))
      }
    }), o.tileLayer = function(t, e) {
      return new o.TileLayer(t, e)
    }, o.TileLayer.WMS = o.TileLayer.extend({
      defaultWmsParams: {
        service: "WMS",
        request: "GetMap",
        version: "1.1.1",
        layers: "",
        styles: "",
        format: "image/jpeg",
        transparent: !1
      },
      options: {
        crs: null,
        uppercase: !1
      },
      initialize: function(t, e) {
        this._url = t;
        var i = o.extend({}, this.defaultWmsParams);
        for (var n in e) n in this.options || (i[n] = e[n]);
        e = o.setOptions(this, e), i.width = i.height = e.tileSize * (e.detectRetina && o.Browser.retina ? 2 : 1), this.wmsParams = i
      },
      onAdd: function(t) {
        this._crs = this.options.crs || t.options.crs, this._wmsVersion = parseFloat(this.wmsParams.version);
        var e = this._wmsVersion >= 1.3 ? "crs" : "srs";
        this.wmsParams[e] = this._crs.code, o.TileLayer.prototype.onAdd.call(this, t)
      },
      getTileUrl: function(t) {
        var e = this._tileCoordsToBounds(t),
          i = this._crs.project(e.getNorthWest()),
          n = this._crs.project(e.getSouthEast()),
          s = (this._wmsVersion >= 1.3 && this._crs === o.CRS.EPSG4326 ? [n.y, i.x, i.y, n.x] : [i.x, n.y, n.x, i.y]).join(","),
          r = o.TileLayer.prototype.getTileUrl.call(this, t);
        return r + o.Util.getParamString(this.wmsParams, r, this.options.uppercase) + (this.options.uppercase ? "&BBOX=" : "&bbox=") + s
      },
      setParams: function(t, e) {
        return o.extend(this.wmsParams, t), e || this.redraw(), this
      }
    }), o.tileLayer.wms = function(t, e) {
      return new o.TileLayer.WMS(t, e)
    }, o.ImageOverlay = o.Layer.extend({
      options: {
        opacity: 1,
        alt: ""
      },
      initialize: function(t, e, i) {
        this._url = t, this._bounds = o.latLngBounds(e), o.setOptions(this, i)
      },
      onAdd: function() {
        this._image || (this._initImage(), this.options.opacity < 1 && this._updateOpacity()), this.getPane().appendChild(this._image), this._reset()
      },
      onRemove: function() {
        o.DomUtil.remove(this._image)
      },
      setOpacity: function(t) {
        return this.options.opacity = t, this._image && this._updateOpacity(), this
      },
      bringToFront: function() {
        return this._map && o.DomUtil.toFront(this._image), this
      },
      bringToBack: function() {
        return this._map && o.DomUtil.toBack(this._image), this
      },
      setUrl: function(t) {
        return this._url = t, this._image && (this._image.src = t), this
      },
      getAttribution: function() {
        return this.options.attribution
      },
      getEvents: function() {
        var t = {
          viewreset: this._reset
        };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
      },
      getBounds: function() {
        return this._bounds
      },
      _initImage: function() {
        var t = this._image = o.DomUtil.create("img", "leaflet-image-layer " + (this._zoomAnimated ? "leaflet-zoom-animated" : ""));
        t.onselectstart = o.Util.falseFn, t.onmousemove = o.Util.falseFn, t.onload = o.bind(this.fire, this, "load"), t.src = this._url, t.alt = this.options.alt
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._bounds.getNorthWest(), t.zoom, t.center),
          i = this._map._latLngToNewLayerPoint(this._bounds.getSouthEast(), t.zoom, t.center).subtract(e),
          n = e.add(i._multiplyBy((1 - 1 / t.scale) / 2));
        o.DomUtil.setTransform(this._image, n, t.scale)
      },
      _reset: function() {
        var t = this._image,
          e = new o.Bounds(this._map.latLngToLayerPoint(this._bounds.getNorthWest()), this._map.latLngToLayerPoint(this._bounds.getSouthEast())),
          i = e.getSize();
        o.DomUtil.setPosition(t, e.min), t.style.width = i.x + "px", t.style.height = i.y + "px"
      },
      _updateOpacity: function() {
        o.DomUtil.setOpacity(this._image, this.options.opacity)
      }
    }), o.imageOverlay = function(t, e, i) {
      return new o.ImageOverlay(t, e, i)
    }, o.Icon = o.Class.extend({
      initialize: function(t) {
        o.setOptions(this, t)
      },
      createIcon: function(t) {
        return this._createIcon("icon", t)
      },
      createShadow: function(t) {
        return this._createIcon("shadow", t)
      },
      _createIcon: function(t, e) {
        var i = this._getIconUrl(t);
        if (!i) {
          if ("icon" === t) throw new Error("iconUrl not set in Icon options (see the docs).");
          return null
        }
        var n = this._createImg(i, e && "IMG" === e.tagName ? e : null);
        return this._setIconStyles(n, t), n
      },
      _setIconStyles: function(t, e) {
        var i = this.options,
          n = o.point(i[e + "Size"]),
          s = o.point("shadow" === e && i.shadowAnchor || i.iconAnchor || n && n.divideBy(2, !0));
        t.className = "leaflet-marker-" + e + " " + (i.className || ""), s && (t.style.marginLeft = -s.x + "px", t.style.marginTop = -s.y + "px"), n && (t.style.width = n.x + "px", t.style.height = n.y + "px")
      },
      _createImg: function(t, i) {
        return i = i || e.createElement("img"), i.src = t, i
      },
      _getIconUrl: function(t) {
        return o.Browser.retina && this.options[t + "RetinaUrl"] || this.options[t + "Url"]
      }
    }), o.icon = function(t) {
      return new o.Icon(t)
    }, o.Icon.Default = o.Icon.extend({
      options: {
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      },
      _getIconUrl: function(t) {
        var e = t + "Url";
        if (this.options[e]) return this.options[e];
        var i = o.Icon.Default.imagePath;
        if (!i) throw new Error("Couldn't autodetect L.Icon.Default.imagePath, set it manually.");
        return i + "/marker-" + t + (o.Browser.retina && "icon" === t ? "-2x" : "") + ".png"
      }
    }), o.Icon.Default.imagePath = function() {
      var t, i, n, o, s = e.getElementsByTagName("script"),
        r = /[\/^]leaflet[\-\._]?([\w\-\._]*)\.js\??/;
      for (t = 0, i = s.length; t < i; t++)
        if (n = s[t].src, n.match(r)) return o = n.split(r)[0], (o ? o + "/" : "") + "images"
    }(), o.Marker = o.Layer.extend({
      options: {
        pane: "markerPane",
        icon: new o.Icon.Default,
        interactive: !0,
        keyboard: !0,
        zIndexOffset: 0,
        opacity: 1,
        riseOffset: 250
      },
      initialize: function(t, e) {
        o.setOptions(this, e), this._latlng = o.latLng(t)
      },
      onAdd: function(t) {
        this._zoomAnimated = this._zoomAnimated && t.options.markerZoomAnimation, this._initIcon(), this.update()
      },
      onRemove: function() {
        this.dragging && this.dragging.disable(), this._removeIcon(), this._removeShadow()
      },
      getEvents: function() {
        var t = {
          viewreset: this.update
        };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
      },
      getLatLng: function() {
        return this._latlng
      },
      setLatLng: function(t) {
        var e = this._latlng;
        return this._latlng = o.latLng(t), this.update(), this.fire("move", {
          oldLatLng: e,
          latlng: this._latlng
        })
      },
      setZIndexOffset: function(t) {
        return this.options.zIndexOffset = t, this.update()
      },
      setIcon: function(t) {
        return this.options.icon = t, this._map && (this._initIcon(), this.update()), this._popup && this.bindPopup(this._popup, this._popup.options), this
      },
      update: function() {
        if (this._icon) {
          var t = this._map.latLngToLayerPoint(this._latlng).round();
          this._setPos(t)
        }
        return this
      },
      _initIcon: function() {
        var t = this.options,
          e = "leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"),
          i = t.icon.createIcon(this._icon),
          n = !1;
        i !== this._icon && (this._icon && this._removeIcon(), n = !0, t.title && (i.title = t.title), t.alt && (i.alt = t.alt)), o.DomUtil.addClass(i, e), t.keyboard && (i.tabIndex = "0"), this._icon = i, this._initInteraction(), t.riseOnHover && o.DomEvent.on(i, {
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }, this);
        var s = t.icon.createShadow(this._shadow),
          r = !1;
        s !== this._shadow && (this._removeShadow(), r = !0), s && o.DomUtil.addClass(s, e), this._shadow = s, t.opacity < 1 && this._updateOpacity(), n && this.getPane().appendChild(this._icon), s && r && this.getPane("shadowPane").appendChild(this._shadow)
      },
      _removeIcon: function() {
        this.options.riseOnHover && o.DomEvent.off(this._icon, {
          mouseover: this._bringToFront,
          mouseout: this._resetZIndex
        }, this), o.DomUtil.remove(this._icon), this._icon = null
      },
      _removeShadow: function() {
        this._shadow && o.DomUtil.remove(this._shadow), this._shadow = null
      },
      _setPos: function(t) {
        o.DomUtil.setPosition(this._icon, t), this._shadow && o.DomUtil.setPosition(this._shadow, t), this._zIndex = t.y + this.options.zIndexOffset, this._resetZIndex()
      },
      _updateZIndex: function(t) {
        this._icon.style.zIndex = this._zIndex + t
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center).round();
        this._setPos(e)
      },
      _initInteraction: function() {
        if (this.options.interactive && (o.DomUtil.addClass(this._icon, "leaflet-interactive"), o.DomEvent.on(this._icon, "click dblclick mousedown mouseup mouseover mousemove mouseout contextmenu keypress", this._fireMouseEvent, this), o.Handler.MarkerDrag)) {
          var t = this.options.draggable;
          this.dragging && (t = this.dragging.enabled(), this.dragging.disable()), this.dragging = new o.Handler.MarkerDrag(this), t && this.dragging.enable()
        }
      },
      _fireMouseEvent: function(t, e) {
        "mousedown" === t.type && o.DomEvent.preventDefault(t), "keypress" === t.type && 13 === t.keyCode && (e = "click"), this._map && this._map._fireMouseEvent(this, t, e, !0, this._latlng)
      },
      setOpacity: function(t) {
        return this.options.opacity = t, this._map && this._updateOpacity(), this
      },
      _updateOpacity: function() {
        var t = this.options.opacity;
        o.DomUtil.setOpacity(this._icon, t), this._shadow && o.DomUtil.setOpacity(this._shadow, t)
      },
      _bringToFront: function() {
        this._updateZIndex(this.options.riseOffset)
      },
      _resetZIndex: function() {
        this._updateZIndex(0)
      }
    }), o.marker = function(t, e) {
      return new o.Marker(t, e)
    }, o.DivIcon = o.Icon.extend({
      options: {
        iconSize: [12, 12],
        className: "leaflet-div-icon",
        html: !1
      },
      createIcon: function(t) {
        var i = t && "DIV" === t.tagName ? t : e.createElement("div"),
          n = this.options;
        return i.innerHTML = n.html !== !1 ? n.html : "", n.bgPos && (i.style.backgroundPosition = -n.bgPos.x + "px " + -n.bgPos.y + "px"), this._setIconStyles(i, "icon"), i
      },
      createShadow: function() {
        return null
      }
    }), o.divIcon = function(t) {
      return new o.DivIcon(t)
    }, o.Map.mergeOptions({
      closePopupOnClick: !0
    }), o.Popup = o.Layer.extend({
      options: {
        pane: "popupPane",
        minWidth: 50,
        maxWidth: 300,
        offset: [0, 7],
        autoPan: !0,
        autoPanPadding: [5, 5],
        closeButton: !0,
        zoomAnimation: !0
      },
      initialize: function(t, e) {
        o.setOptions(this, t), this._source = e
      },
      onAdd: function(t) {
        this._zoomAnimated = this._zoomAnimated && this.options.zoomAnimation, this._container || this._initLayout(), t._fadeAnimated && o.DomUtil.setOpacity(this._container, 0), clearTimeout(this._removeTimeout), this.getPane().appendChild(this._container), this.update(), t._fadeAnimated && o.DomUtil.setOpacity(this._container, 1), t.fire("popupopen", {
          popup: this
        }), this._source && this._source.fire("popupopen", {
          popup: this
        }, !0)
      },
      openOn: function(t) {
        return t.openPopup(this), this
      },
      onRemove: function(t) {
        t._fadeAnimated ? (o.DomUtil.setOpacity(this._container, 0), this._removeTimeout = setTimeout(o.bind(o.DomUtil.remove, o.DomUtil, this._container), 200)) : o.DomUtil.remove(this._container), t.fire("popupclose", {
          popup: this
        }), this._source && this._source.fire("popupclose", {
          popup: this
        }, !0)
      },
      getLatLng: function() {
        return this._latlng
      },
      setLatLng: function(t) {
        return this._latlng = o.latLng(t), this._map && (this._updatePosition(), this._adjustPan()), this
      },
      getContent: function() {
        return this._content
      },
      setContent: function(t) {
        return this._content = t, this.update(), this
      },
      update: function() {
        this._map && (this._container.style.visibility = "hidden", this._updateContent(), this._updateLayout(), this._updatePosition(), this._container.style.visibility = "", this._adjustPan())
      },
      getEvents: function() {
        var t = {
            viewreset: this._updatePosition
          },
          e = this.options;
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), ("closeOnClick" in e ? e.closeOnClick : this._map.options.closePopupOnClick) && (t.preclick = this._close), e.keepInView && (t.moveend = this._adjustPan), t
      },
      isOpen: function() {
        return !!this._map && this._map.hasLayer(this)
      },
      _close: function() {
        this._map && this._map.closePopup(this)
      },
      _initLayout: function() {
        var t = "leaflet-popup",
          e = this._container = o.DomUtil.create("div", t + " " + (this.options.className || "") + " leaflet-zoom-" + (this._zoomAnimated ? "animated" : "hide"));
        if (this.options.closeButton) {
          var i = this._closeButton = o.DomUtil.create("a", t + "-close-button", e);
          i.href = "#close", i.innerHTML = "&#215;", o.DomEvent.on(i, "click", this._onCloseButtonClick, this)
        }
        var n = this._wrapper = o.DomUtil.create("div", t + "-content-wrapper", e);
        this._contentNode = o.DomUtil.create("div", t + "-content", n), o.DomEvent.disableClickPropagation(n).disableScrollPropagation(this._contentNode).on(n, "contextmenu", o.DomEvent.stopPropagation), this._tipContainer = o.DomUtil.create("div", t + "-tip-container", e), this._tip = o.DomUtil.create("div", t + "-tip", this._tipContainer)
      },
      _updateContent: function() {
        if (this._content) {
          var t = this._contentNode;
          if ("string" == typeof this._content) t.innerHTML = this._content;
          else {
            for (; t.hasChildNodes();) t.removeChild(t.firstChild);
            t.appendChild(this._content)
          }
          this.fire("contentupdate")
        }
      },
      _updateLayout: function() {
        var t = this._contentNode,
          e = t.style;
        e.width = "", e.whiteSpace = "nowrap";
        var i = t.offsetWidth;
        i = Math.min(i, this.options.maxWidth), i = Math.max(i, this.options.minWidth), e.width = i + 1 + "px", e.whiteSpace = "", e.height = "";
        var n = t.offsetHeight,
          s = this.options.maxHeight,
          r = "leaflet-popup-scrolled";
        s && n > s ? (e.height = s + "px", o.DomUtil.addClass(t, r)) : o.DomUtil.removeClass(t, r), this._containerWidth = this._container.offsetWidth
      },
      _updatePosition: function() {
        if (this._map) {
          var t = this._map.latLngToLayerPoint(this._latlng),
            e = o.point(this.options.offset);
          this._zoomAnimated ? o.DomUtil.setPosition(this._container, t) : e = e.add(t);
          var i = this._containerBottom = -e.y,
            n = this._containerLeft = -Math.round(this._containerWidth / 2) + e.x;
          this._container.style.bottom = i + "px", this._container.style.left = n + "px"
        }
      },
      _animateZoom: function(t) {
        var e = this._map._latLngToNewLayerPoint(this._latlng, t.zoom, t.center);
        o.DomUtil.setPosition(this._container, e)
      },
      _adjustPan: function() {
        if (this.options.autoPan) {
          var t = this._map,
            e = this._container.offsetHeight,
            i = this._containerWidth,
            n = new o.Point(this._containerLeft, -e - this._containerBottom);
          this._zoomAnimated && n._add(o.DomUtil.getPosition(this._container));
          var s = t.layerPointToContainerPoint(n),
            r = o.point(this.options.autoPanPadding),
            a = o.point(this.options.autoPanPaddingTopLeft || r),
            h = o.point(this.options.autoPanPaddingBottomRight || r),
            l = t.getSize(),
            u = 0,
            c = 0;
          s.x + i + h.x > l.x && (u = s.x + i - l.x + h.x), s.x - u - a.x < 0 && (u = s.x - a.x), s.y + e + h.y > l.y && (c = s.y + e - l.y + h.y), s.y - c - a.y < 0 && (c = s.y - a.y), (u || c) && t.fire("autopanstart").panBy([u, c])
        }
      },
      _onCloseButtonClick: function(t) {
        this._close(), o.DomEvent.stop(t)
      }
    }), o.popup = function(t, e) {
      return new o.Popup(t, e)
    }, o.Map.include({
      openPopup: function(t, e, i) {
        if (!(t instanceof o.Popup)) {
          var n = t;
          t = new o.Popup(i).setContent(n)
        }
        return e && t.setLatLng(e), this.hasLayer(t) ? this : (this.closePopup(), this._popup = t, this.addLayer(t))
      },
      closePopup: function(t) {
        return t && t !== this._popup || (t = this._popup, this._popup = null), t && this.removeLayer(t), this
      }
    }), o.Layer.include({
      bindPopup: function(t, e) {
        return t instanceof o.Popup ? (this._popup = t, t._source = this) : (this._popup && !e || (this._popup = new o.Popup(e, this)), this._popup.setContent(t)), this._popupHandlersAdded || (this.on({
          click: this._openPopup,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !0), this
      },
      unbindPopup: function() {
        return this._popup && (this.on({
          click: this._openPopup,
          remove: this.closePopup,
          move: this._movePopup
        }), this._popupHandlersAdded = !1, this._popup = null), this
      },
      openPopup: function(t) {
        return this._popup && this._map && this._map.openPopup(this._popup, t || this._latlng || this.getCenter()), this
      },
      closePopup: function() {
        return this._popup && this._popup._close(), this
      },
      togglePopup: function() {
        return this._popup && (this._popup._map ? this.closePopup() : this.openPopup()), this
      },
      setPopupContent: function(t) {
        return this._popup && this._popup.setContent(t), this
      },
      getPopup: function() {
        return this._popup
      },
      _openPopup: function(t) {
        this._map.openPopup(this._popup, t.latlng)
      },
      _movePopup: function(t) {
        this._popup.setLatLng(t.latlng)
      }
    }), o.Marker.include({
      bindPopup: function(t, e) {
        var i = o.point(this.options.icon.options.popupAnchor || [0, 0]).add(o.Popup.prototype.options.offset);
        return e = o.extend({
          offset: i
        }, e), o.Layer.prototype.bindPopup.call(this, t, e)
      },
      _openPopup: o.Layer.prototype.togglePopup
    }), o.LayerGroup = o.Layer.extend({
      initialize: function(t) {
        this._layers = {};
        var e, i;
        if (t)
          for (e = 0, i = t.length; e < i; e++) this.addLayer(t[e])
      },
      addLayer: function(t) {
        var e = this.getLayerId(t);
        return this._layers[e] = t, this._map && this._map.addLayer(t), this
      },
      removeLayer: function(t) {
        var e = t in this._layers ? t : this.getLayerId(t);
        return this._map && this._layers[e] && this._map.removeLayer(this._layers[e]), delete this._layers[e], this
      },
      hasLayer: function(t) {
        return !!t && (t in this._layers || this.getLayerId(t) in this._layers)
      },
      clearLayers: function() {
        for (var t in this._layers) this.removeLayer(this._layers[t]);
        return this
      },
      invoke: function(t) {
        var e, i, n = Array.prototype.slice.call(arguments, 1);
        for (e in this._layers) i = this._layers[e], i[t] && i[t].apply(i, n);
        return this
      },
      onAdd: function(t) {
        for (var e in this._layers) t.addLayer(this._layers[e])
      },
      onRemove: function(t) {
        for (var e in this._layers) t.removeLayer(this._layers[e])
      },
      eachLayer: function(t, e) {
        for (var i in this._layers) t.call(e, this._layers[i]);
        return this
      },
      getLayer: function(t) {
        return this._layers[t]
      },
      getLayers: function() {
        var t = [];
        for (var e in this._layers) t.push(this._layers[e]);
        return t
      },
      setZIndex: function(t) {
        return this.invoke("setZIndex", t)
      },
      getLayerId: function(t) {
        return o.stamp(t)
      }
    }), o.layerGroup = function(t) {
      return new o.LayerGroup(t)
    }, o.FeatureGroup = o.LayerGroup.extend({
      addLayer: function(t) {
        return this.hasLayer(t) ? this : (t.addEventParent(this), o.LayerGroup.prototype.addLayer.call(this, t), this._popupContent && t.bindPopup && t.bindPopup(this._popupContent, this._popupOptions), this.fire("layeradd", {
          layer: t
        }))
      },
      removeLayer: function(t) {
        return this.hasLayer(t) ? (t in this._layers && (t = this._layers[t]), t.removeEventParent(this), o.LayerGroup.prototype.removeLayer.call(this, t), this._popupContent && this.invoke("unbindPopup"), this.fire("layerremove", {
          layer: t
        })) : this
      },
      bindPopup: function(t, e) {
        return this._popupContent = t, this._popupOptions = e, this.invoke("bindPopup", t, e)
      },
      openPopup: function(t) {
        for (var e in this._layers) {
          this._layers[e].openPopup(t);
          break
        }
        return this
      },
      setStyle: function(t) {
        return this.invoke("setStyle", t)
      },
      bringToFront: function() {
        return this.invoke("bringToFront")
      },
      bringToBack: function() {
        return this.invoke("bringToBack")
      },
      getBounds: function() {
        var t = new o.LatLngBounds;
        return this.eachLayer(function(e) {
          t.extend(e.getBounds ? e.getBounds() : e.getLatLng())
        }), t
      }
    }), o.featureGroup = function(t) {
      return new o.FeatureGroup(t)
    }, o.Renderer = o.Layer.extend({
      options: {
        padding: 0
      },
      initialize: function(t) {
        o.setOptions(this, t), o.stamp(this)
      },
      onAdd: function() {
        this._container || (this._initContainer(), this._zoomAnimated && o.DomUtil.addClass(this._container, "leaflet-zoom-animated")), this.getPane().appendChild(this._container), this._update()
      },
      onRemove: function() {
        o.DomUtil.remove(this._container)
      },
      getEvents: function() {
        var t = {
          moveend: this._update
        };
        return this._zoomAnimated && (t.zoomanim = this._animateZoom), t
      },
      _animateZoom: function(t) {
        var e = t.origin.subtract(this._map._getCenterLayerPoint()),
          i = this._bounds.min.add(e.multiplyBy(1 - t.scale)).add(t.offset).round();
        o.DomUtil.setTransform(this._container, i, t.scale)
      },
      _update: function() {
        var t = this.options.padding,
          e = this._map.getSize(),
          i = this._map.containerPointToLayerPoint(e.multiplyBy(-t)).round();
        this._bounds = new o.Bounds(i, i.add(e.multiplyBy(1 + 2 * t)).round())
      }
    }), o.Map.include({
      getRenderer: function(t) {
        var e = t.options.renderer || this.options.renderer || this._renderer;
        return e || (e = this._renderer = o.SVG && o.svg() || o.Canvas && o.canvas()), this.hasLayer(e) || this.addLayer(e), e
      }
    }), o.Path = o.Layer.extend({
      options: {
        stroke: !0,
        color: "#3388ff",
        weight: 3,
        opacity: 1,
        lineCap: "round",
        lineJoin: "round",
        fillOpacity: .2,
        fillRule: "evenodd",
        interactive: !0
      },
      onAdd: function() {
        this._renderer = this._map.getRenderer(this), this._renderer._initPath(this), this._project(), this._update(), this._renderer._addPath(this)
      },
      onRemove: function() {
        this._renderer._removePath(this)
      },
      getEvents: function() {
        return {
          viewreset: this._project,
          moveend: this._update
        }
      },
      redraw: function() {
        return this._map && this._renderer._updatePath(this), this
      },
      setStyle: function(t) {
        return o.setOptions(this, t), this._renderer && this._renderer._updateStyle(this), this
      },
      bringToFront: function() {
        return this._renderer && this._renderer._bringToFront(this), this
      },
      bringToBack: function() {
        return this._renderer && this._renderer._bringToBack(this), this
      },
      _fireMouseEvent: function(t, e) {
        this._map._fireMouseEvent(this, t, e, !0)
      },
      _clickTolerance: function() {
        return (this.options.stroke ? this.options.weight / 2 : 0) + (o.Browser.touch ? 10 : 0)
      }
    }), o.LineUtil = {
      simplify: function(t, e) {
        if (!e || !t.length) return t.slice();
        var i = e * e;
        return t = this._reducePoints(t, i), t = this._simplifyDP(t, i)
      },
      pointToSegmentDistance: function(t, e, i) {
        return Math.sqrt(this._sqClosestPointOnSegment(t, e, i, !0))
      },
      closestPointOnSegment: function(t, e, i) {
        return this._sqClosestPointOnSegment(t, e, i)
      },
      _simplifyDP: function(t, e) {
        var n = t.length,
          o = typeof Uint8Array != i + "" ? Uint8Array : Array,
          s = new o(n);
        s[0] = s[n - 1] = 1, this._simplifyDPStep(t, s, e, 0, n - 1);
        var r, a = [];
        for (r = 0; r < n; r++) s[r] && a.push(t[r]);
        return a
      },
      _simplifyDPStep: function(t, e, i, n, o) {
        var s, r, a, h = 0;
        for (r = n + 1; r <= o - 1; r++) a = this._sqClosestPointOnSegment(t[r], t[n], t[o], !0), a > h && (s = r, h = a);
        h > i && (e[s] = 1, this._simplifyDPStep(t, e, i, n, s), this._simplifyDPStep(t, e, i, s, o))
      },
      _reducePoints: function(t, e) {
        for (var i = [t[0]], n = 1, o = 0, s = t.length; n < s; n++) this._sqDist(t[n], t[o]) > e && (i.push(t[n]), o = n);
        return o < s - 1 && i.push(t[s - 1]), i
      },
      clipSegment: function(t, e, i, n) {
        var o, s, r, a = n ? this._lastCode : this._getBitCode(t, i),
          h = this._getBitCode(e, i);
        for (this._lastCode = h;;) {
          if (!(a | h)) return [t, e];
          if (a & h) return !1;
          o = a || h, s = this._getEdgeIntersection(t, e, o, i), r = this._getBitCode(s, i), o === a ? (t = s, a = r) : (e = s, h = r)
        }
      },
      _getEdgeIntersection: function(t, e, i, n) {
        var s, r, a = e.x - t.x,
          h = e.y - t.y,
          l = n.min,
          u = n.max;
        return 8 & i ? (s = t.x + a * (u.y - t.y) / h, r = u.y) : 4 & i ? (s = t.x + a * (l.y - t.y) / h, r = l.y) : 2 & i ? (s = u.x, r = t.y + h * (u.x - t.x) / a) : 1 & i && (s = l.x, r = t.y + h * (l.x - t.x) / a), new o.Point(s, r, (!0))
      },
      _getBitCode: function(t, e) {
        var i = 0;
        return t.x < e.min.x ? i |= 1 : t.x > e.max.x && (i |= 2), t.y < e.min.y ? i |= 4 : t.y > e.max.y && (i |= 8), i
      },
      _sqDist: function(t, e) {
        var i = e.x - t.x,
          n = e.y - t.y;
        return i * i + n * n
      },
      _sqClosestPointOnSegment: function(t, e, i, n) {
        var s, r = e.x,
          a = e.y,
          h = i.x - r,
          l = i.y - a,
          u = h * h + l * l;
        return u > 0 && (s = ((t.x - r) * h + (t.y - a) * l) / u, s > 1 ? (r = i.x, a = i.y) : s > 0 && (r += h * s, a += l * s)), h = t.x - r, l = t.y - a, n ? h * h + l * l : new o.Point(r, a)
      }
    }, o.Polyline = o.Path.extend({
      options: {
        smoothFactor: 1
      },
      initialize: function(t, e) {
        o.setOptions(this, e), this._setLatLngs(t)
      },
      getLatLngs: function() {
        return this._latlngs
      },
      setLatLngs: function(t) {
        return this._setLatLngs(t), this.redraw()
      },
      addLatLng: function(t) {
        return t = o.latLng(t), this._latlngs.push(t), this._bounds.extend(t), this.redraw()
      },
      spliceLatLngs: function() {
        var t = [].splice.apply(this._latlngs, arguments);
        return this._setLatLngs(this._latlngs), this.redraw(), t
      },
      closestLayerPoint: function(t) {
        for (var e, i, n = 1 / 0, s = null, r = o.LineUtil._sqClosestPointOnSegment, a = 0, h = this._parts.length; a < h; a++)
          for (var l = this._parts[a], u = 1, c = l.length; u < c; u++) {
            e = l[u - 1], i = l[u];
            var d = r(t, e, i, !0);
            d < n && (n = d, s = r(t, e, i))
          }
        return s && (s.distance = Math.sqrt(n)), s
      },
      getCenter: function() {
        var t, e, i, n, o, s, r, a = this._rings[0],
          h = a.length;
        for (t = 0, e = 0; t < h - 1; t++) e += a[t].distanceTo(a[t + 1]) / 2;
        for (t = 0, n = 0; t < h - 1; t++)
          if (o = a[t], s = a[t + 1], i = o.distanceTo(s), n += i, n > e) return r = (n - e) / i, this._map.layerPointToLatLng([s.x - r * (s.x - o.x), s.y - r * (s.y - o.y)])
      },
      getBounds: function() {
        return this._bounds
      },
      _setLatLngs: function(t) {
        this._bounds = new o.LatLngBounds, this._latlngs = this._convertLatLngs(t)
      },
      _convertLatLngs: function(t) {
        for (var e = [], i = this._flat(t), n = 0, s = t.length; n < s; n++) i ? (e[n] = o.latLng(t[n]), this._bounds.extend(e[n])) : e[n] = this._convertLatLngs(t[n]);
        return e
      },
      _flat: function(t) {
        return !o.Util.isArray(t[0]) || "object" != typeof t[0][0]
      },
      _project: function() {
        this._rings = [], this._projectLatlngs(this._latlngs, this._rings);
        var t = this._clickTolerance(),
          e = new o.Point(t, (-t));
        this._latlngs.length && (this._pxBounds = new o.Bounds(this._map.latLngToLayerPoint(this._bounds.getSouthWest())._subtract(e), this._map.latLngToLayerPoint(this._bounds.getNorthEast())._add(e)))
      },
      _projectLatlngs: function(t, e) {
        var i, n, s = t[0] instanceof o.LatLng,
          r = t.length;
        if (s) {
          for (n = [], i = 0; i < r; i++) n[i] = this._map.latLngToLayerPoint(t[i]);
          e.push(n)
        } else
          for (i = 0; i < r; i++) this._projectLatlngs(t[i], e)
      },
      _clipPoints: function() {
        if (this.options.noClip) return void(this._parts = this._rings);
        this._parts = [];
        var t, e, i, n, s, r, a, h = this._parts,
          l = this._renderer._bounds;
        for (t = 0, i = 0, n = this._rings.length; t < n; t++)
          for (a = this._rings[t], e = 0, s = a.length; e < s - 1; e++) r = o.LineUtil.clipSegment(a[e], a[e + 1], l, e), r && (h[i] = h[i] || [], h[i].push(r[0]), r[1] === a[e + 1] && e !== s - 2 || (h[i].push(r[1]), i++))
      },
      _simplifyPoints: function() {
        for (var t = this._parts, e = this.options.smoothFactor, i = 0, n = t.length; i < n; i++) t[i] = o.LineUtil.simplify(t[i], e)
      },
      _update: function() {
        this._map && (this._clipPoints(), this._simplifyPoints(), this._updatePath())
      },
      _updatePath: function() {
        this._renderer._updatePoly(this)
      }
    }), o.polyline = function(t, e) {
      return new o.Polyline(t, e)
    }, o.PolyUtil = {}, o.PolyUtil.clipPolygon = function(t, e) {
      var i, n, s, r, a, h, l, u, c, d = [1, 4, 2, 8],
        m = o.LineUtil;
      for (n = 0, l = t.length; n < l; n++) t[n]._code = m._getBitCode(t[n], e);
      for (r = 0; r < 4; r++) {
        for (u = d[r], i = [], n = 0, l = t.length, s = l - 1; n < l; s = n++) a = t[n], h = t[s], a._code & u ? h._code & u || (c = m._getEdgeIntersection(h, a, u, e), c._code = m._getBitCode(c, e), i.push(c)) : (h._code & u && (c = m._getEdgeIntersection(h, a, u, e), c._code = m._getBitCode(c, e), i.push(c)), i.push(a));
        t = i
      }
      return t
    }, o.Polygon = o.Polyline.extend({
      options: {
        fill: !0
      },
      getCenter: function() {
        var t, e, i, n, o, s, r, a, h, l = this._rings[0];
        for (r = a = h = 0, t = 0, i = l.length, e = i - 1; t < i; e = t++) n = l[t], o = l[e], s = n.y * o.x - o.y * n.x, a += (n.x + o.x) * s, h += (n.y + o.y) * s, r += 3 * s;
        return this._map.layerPointToLatLng([a / r, h / r])
      },
      _convertLatLngs: function(t) {
        var e = o.Polyline.prototype._convertLatLngs.call(this, t),
          i = e.length;
        return i >= 2 && e[0] instanceof o.LatLng && e[0].equals(e[i - 1]) && e.pop(), e
      },
      _clipPoints: function() {
        if (this.options.noClip) return void(this._parts = this._rings);
        var t = this._renderer._bounds,
          e = this.options.weight,
          i = new o.Point(e, e);
        t = new o.Bounds(t.min.subtract(i), t.max.add(i)), this._parts = [];
        for (var n, s = 0, r = this._rings.length; s < r; s++) n = o.PolyUtil.clipPolygon(this._rings[s], t), n.length && this._parts.push(n)
      },
      _updatePath: function() {
        this._renderer._updatePoly(this, !0)
      }
    }), o.polygon = function(t, e) {
      return new o.Polygon(t, e)
    }, o.Rectangle = o.Polygon.extend({
      initialize: function(t, e) {
        o.Polygon.prototype.initialize.call(this, this._boundsToLatLngs(t), e)
      },
      setBounds: function(t) {
        this.setLatLngs(this._boundsToLatLngs(t))
      },
      _boundsToLatLngs: function(t) {
        return t = o.latLngBounds(t), [t.getSouthWest(), t.getNorthWest(), t.getNorthEast(), t.getSouthEast()]
      }
    }), o.rectangle = function(t, e) {
      return new o.Rectangle(t, e)
    }, o.CircleMarker = o.Path.extend({
      options: {
        fill: !0,
        radius: 10
      },
      initialize: function(t, e) {
        o.setOptions(this, e), this._latlng = o.latLng(t), this._radius = this.options.radius
      },
      setLatLng: function(t) {
        return this._latlng = o.latLng(t), this.redraw(), this.fire("move", {
          latlng: this._latlng
        })
      },
      getLatLng: function() {
        return this._latlng
      },
      setRadius: function(t) {
        return this.options.radius = this._radius = t, this.redraw()
      },
      getRadius: function() {
        return this._radius
      },
      setStyle: function(t) {
        var e = t && t.radius || this._radius;
        return o.Path.prototype.setStyle.call(this, t), this.setRadius(e), this
      },
      _project: function() {
        this._point = this._map.latLngToLayerPoint(this._latlng), this._updateBounds()
      },
      _updateBounds: function() {
        var t = this._radius,
          e = this._radiusY || t,
          i = this._clickTolerance(),
          n = [t + i, e + i];
        this._pxBounds = new o.Bounds(this._point.subtract(n), this._point.add(n))
      },
      _update: function() {
        this._map && this._updatePath()
      },
      _updatePath: function() {
        this._renderer._updateCircle(this)
      },
      _empty: function() {
        return this._radius && !this._renderer._bounds.intersects(this._pxBounds)
      }
    }), o.circleMarker = function(t, e) {
      return new o.CircleMarker(t, e)
    }, o.Circle = o.CircleMarker.extend({
      initialize: function(t, e, i) {
        o.setOptions(this, i), this._latlng = o.latLng(t), this._mRadius = e
      },
      setRadius: function(t) {
        return this._mRadius = t, this.redraw()
      },
      getRadius: function() {
        return this._mRadius
      },
      getBounds: function() {
        var t = [this._radius, this._radiusY];
        return new o.LatLngBounds(this._map.layerPointToLatLng(this._point.subtract(t)), this._map.layerPointToLatLng(this._point.add(t)))
      },
      setStyle: o.Path.prototype.setStyle,
      _project: function() {
        var t = this._latlng.lng,
          e = this._latlng.lat,
          i = this._map,
          n = i.options.crs;
        if (n.distance === o.CRS.Earth.distance) {
          var s = Math.PI / 180,
            r = this._mRadius / o.CRS.Earth.R / s,
            a = i.project([e + r, t]),
            h = i.project([e - r, t]),
            l = a.add(h).divideBy(2),
            u = i.unproject(l).lat,
            c = Math.acos((Math.cos(r * s) - Math.sin(e * s) * Math.sin(u * s)) / (Math.cos(e * s) * Math.cos(u * s))) / s;
          this._point = l.subtract(i.getPixelOrigin()), this._radius = isNaN(c) ? 0 : Math.max(Math.round(l.x - i.project([u, t - c]).x), 1), this._radiusY = Math.max(Math.round(l.y - a.y), 1)
        } else {
          var d = n.unproject(n.project(this._latlng).subtract([this._mRadius, 0]));
          this._point = i.latLngToLayerPoint(this._latlng), this._radius = this._point.x - i.latLngToLayerPoint(d).x
        }
        this._updateBounds()
      }
    }), o.circle = function(t, e, i) {
      return new o.Circle(t, e, i)
    }, o.SVG = o.Renderer.extend({
      _initContainer: function() {
        this._container = o.SVG.create("svg"), this._paths = {}, this._initEvents(), this._container.setAttribute("pointer-events", "none")
      },
      _update: function() {
        if (!this._map._animatingZoom || !this._bounds) {
          o.Renderer.prototype._update.call(this);
          var t = this._bounds,
            e = t.getSize(),
            i = this._container;
          o.DomUtil.setPosition(i, t.min), this._svgSize && this._svgSize.equals(e) || (this._svgSize = e, i.setAttribute("width", e.x), i.setAttribute("height", e.y)), o.DomUtil.setPosition(i, t.min), i.setAttribute("viewBox", [t.min.x, t.min.y, e.x, e.y].join(" "))
        }
      },
      _initPath: function(t) {
        var e = t._path = o.SVG.create("path");
        t.options.className && o.DomUtil.addClass(e, t.options.className), t.options.interactive && o.DomUtil.addClass(e, "leaflet-interactive"), this._updateStyle(t)
      },
      _addPath: function(t) {
        var e = t._path;
        this._container.appendChild(e), this._paths[o.stamp(e)] = t
      },
      _removePath: function(t) {
        var e = t._path;
        o.DomUtil.remove(e), delete this._paths[o.stamp(e)]
      },
      _updatePath: function(t) {
        t._project(), t._update()
      },
      _updateStyle: function(t) {
        var e = t._path,
          i = t.options;
        e && (i.stroke ? (e.setAttribute("stroke", i.color), e.setAttribute("stroke-opacity", i.opacity), e.setAttribute("stroke-width", i.weight), e.setAttribute("stroke-linecap", i.lineCap), e.setAttribute("stroke-linejoin", i.lineJoin), i.dashArray ? e.setAttribute("stroke-dasharray", i.dashArray) : e.removeAttribute("stroke-dasharray"), i.dashOffset ? e.setAttribute("stroke-dashoffset", i.dashOffset) : e.removeAttribute("stroke-dashoffset")) : e.setAttribute("stroke", "none"), i.fill ? (e.setAttribute("fill", i.fillColor || i.color), e.setAttribute("fill-opacity", i.fillOpacity), e.setAttribute("fill-rule", i.fillRule || "evenodd")) : e.setAttribute("fill", "none"), e.setAttribute("pointer-events", i.pointerEvents || (i.interactive ? "visiblePainted" : "none")))
      },
      _updatePoly: function(t, e) {
        this._setPath(t, o.SVG.pointsToPath(t._parts, e))
      },
      _updateCircle: function(t) {
        var e = t._point,
          i = t._radius,
          n = t._radiusY || i,
          o = "a" + i + "," + n + " 0 1,0 ",
          s = t._empty() ? "M0 0" : "M" + (e.x - i) + "," + e.y + o + 2 * i + ",0 " + o + 2 * -i + ",0 ";
        this._setPath(t, s)
      },
      _setPath: function(t, e) {
        t._path.setAttribute("d", e)
      },
      _bringToFront: function(t) {
        o.DomUtil.toFront(t._path)
      },
      _bringToBack: function(t) {
        o.DomUtil.toBack(t._path)
      },
      _initEvents: function() {
        o.DomEvent.on(this._container, "click dblclick mousedown mouseup mouseover mouseout mousemove contextmenu", this._fireMouseEvent, this)
      },
      _fireMouseEvent: function(t) {
        var e = this._paths[o.stamp(t.target || t.srcElement)];
        e && e._fireMouseEvent(t)
      }
    }), o.extend(o.SVG, {
      create: function(t) {
        return e.createElementNS("http://www.w3.org/2000/svg", t)
      },
      pointsToPath: function(t, e) {
        var i, n, s, r, a, h, l = "";
        for (i = 0, s = t.length; i < s; i++) {
          for (a = t[i], n = 0, r = a.length; n < r; n++) h = a[n], l += (n ? "L" : "M") + h.x + " " + h.y;
          l += e ? o.Browser.svg ? "z" : "x" : ""
        }
        return l || "M0 0"
      }
    }), o.Browser.svg = !(!e.createElementNS || !o.SVG.create("svg").createSVGRect), o.svg = function(t) {
      return o.Browser.svg || o.Browser.vml ? new o.SVG(t) : null
    }, o.Browser.vml = !o.Browser.svg && function() {
      try {
        var t = e.createElement("div");
        t.innerHTML = '<v:shape adj="1"/>';
        var i = t.firstChild;
        return i.style.behavior = "url(#default#VML)", i && "object" == typeof i.adj
      } catch (n) {
        return !1
      }
    }(), o.SVG.include(o.Browser.vml ? {
      _initContainer: function() {
        this._container = o.DomUtil.create("div", "leaflet-vml-container"), this._paths = {}, this._initEvents()
      },
      _update: function() {
        this._map._animatingZoom || o.Renderer.prototype._update.call(this)
      },
      _initPath: function(t) {
        var e = t._container = o.SVG.create("shape");
        o.DomUtil.addClass(e, "leaflet-vml-shape " + (this.options.className || "")), e.coordsize = "1 1", t._path = o.SVG.create("path"), e.appendChild(t._path), this._updateStyle(t)
      },
      _addPath: function(t) {
        var e = t._container;
        this._container.appendChild(e), this._paths[o.stamp(e)] = t
      },
      _removePath: function(t) {
        var e = t._container;
        o.DomUtil.remove(e), delete this._paths[o.stamp(e)]
      },
      _updateStyle: function(t) {
        var e = t._stroke,
          i = t._fill,
          n = t.options,
          s = t._container;
        s.stroked = !!n.stroke, s.filled = !!n.fill, n.stroke ? (e || (e = t._stroke = o.SVG.create("stroke"), s.appendChild(e)), e.weight = n.weight + "px", e.color = n.color, e.opacity = n.opacity, n.dashArray ? e.dashStyle = o.Util.isArray(n.dashArray) ? n.dashArray.join(" ") : n.dashArray.replace(/( *, *)/g, " ") : e.dashStyle = "", e.endcap = n.lineCap.replace("butt", "flat"), e.joinstyle = n.lineJoin) : e && (s.removeChild(e), t._stroke = null), n.fill ? (i || (i = t._fill = o.SVG.create("fill"), s.appendChild(i)), i.color = n.fillColor || n.color, i.opacity = n.fillOpacity) : i && (s.removeChild(i), t._fill = null)
      },
      _updateCircle: function(t) {
        var e = t._point.round(),
          i = Math.round(t._radius),
          n = Math.round(t._radiusY || i);
        this._setPath(t, t._empty() ? "M0 0" : "AL " + e.x + "," + e.y + " " + i + "," + n + " 0,23592600")
      },
      _setPath: function(t, e) {
        t._path.v = e
      }
    } : {}), o.Browser.vml && (o.SVG.create = function() {
      try {
        return e.namespaces.add("lvml", "urn:schemas-microsoft-com:vml"),
          function(t) {
            return e.createElement("<lvml:" + t + ' class="lvml">')
          }
      } catch (t) {
        return function(t) {
          return e.createElement("<" + t + ' xmlns="urn:schemas-microsoft.com:vml" class="lvml">')
        }
      }
    }()), o.Canvas = o.Renderer.extend({
      onAdd: function() {
        o.Renderer.prototype.onAdd.call(this), this._layers = this._layers || {}, this._draw()
      },
      _initContainer: function() {
        var t = this._container = e.createElement("canvas");
        o.DomEvent.on(t, "mousemove", this._onMouseMove, this).on(t, "click dblclick mousedown mouseup contextmenu", this._onClick, this), this._ctx = t.getContext("2d")
      },
      _update: function() {
        if (!this._map._animatingZoom || !this._bounds) {
          o.Renderer.prototype._update.call(this);
          var t = this._bounds,
            e = this._container,
            i = t.getSize(),
            n = o.Browser.retina ? 2 : 1;
          o.DomUtil.setPosition(e, t.min), e.width = n * i.x, e.height = n * i.y, e.style.width = i.x + "px", e.style.height = i.y + "px", o.Browser.retina && this._ctx.scale(2, 2), this._ctx.translate(-t.min.x, -t.min.y)
        }
      },
      _initPath: function(t) {
        this._layers[o.stamp(t)] = t
      },
      _addPath: o.Util.falseFn,
      _removePath: function(t) {
        t._removed = !0, this._requestRedraw(t)
      },
      _updatePath: function(t) {
        this._redrawBounds = t._pxBounds, this._draw(!0), t._project(), t._update(), this._draw(), this._redrawBounds = null
      },
      _updateStyle: function(t) {
        this._requestRedraw(t)
      },
      _requestRedraw: function(t) {
        this._map && (this._redrawBounds = this._redrawBounds || new o.Bounds, this._redrawBounds.extend(t._pxBounds.min).extend(t._pxBounds.max), this._redrawRequest = this._redrawRequest || o.Util.requestAnimFrame(this._redraw, this))
      },
      _redraw: function() {
        this._redrawRequest = null, this._draw(!0), this._draw(), this._redrawBounds = null
      },
      _draw: function(t) {
        this._clear = t;
        var e;
        for (var i in this._layers) e = this._layers[i], this._redrawBounds && !e._pxBounds.intersects(this._redrawBounds) || e._updatePath(), t && e._removed && (delete e._removed, delete this._layers[i])
      },
      _updatePoly: function(t, e) {
        var i, n, o, s, r = t._parts,
          a = r.length,
          h = this._ctx;
        if (a) {
          for (h.beginPath(), i = 0; i < a; i++) {
            for (n = 0, o = r[i].length; n < o; n++) s = r[i][n], h[n ? "lineTo" : "moveTo"](s.x, s.y);
            e && h.closePath()
          }
          this._fillStroke(h, t)
        }
      },
      _updateCircle: function(t) {
        if (!t._empty()) {
          var e = t._point,
            i = this._ctx,
            n = t._radius,
            o = (t._radiusY || n) / n;
          1 !== o && (i.save(), i.scale(1, o)), i.beginPath(), i.arc(e.x, e.y / o, n, 0, 2 * Math.PI, !1), 1 !== o && i.restore(), this._fillStroke(i, t)
        }
      },
      _fillStroke: function(t, e) {
        var i = this._clear,
          n = e.options;
        t.globalCompositeOperation = i ? "destination-out" : "source-over", n.fill && (t.globalAlpha = i ? 1 : n.fillOpacity, t.fillStyle = n.fillColor || n.color, t.fill(n.fillRule || "evenodd")), n.stroke && (t.globalAlpha = i ? 1 : n.opacity, e._prevWeight = t.lineWidth = i ? e._prevWeight + 1 : n.weight, t.strokeStyle = n.color, t.lineCap = n.lineCap, t.lineJoin = n.lineJoin, t.stroke())
      },
      _onClick: function(t) {
        var e = this._map.mouseEventToLayerPoint(t);
        for (var i in this._layers) this._layers[i]._containsPoint(e) && this._layers[i]._fireMouseEvent(t)
      },
      _onMouseMove: function(t) {
        if (this._map && !this._map._animatingZoom) {
          var e = this._map.mouseEventToLayerPoint(t);
          for (var i in this._layers) this._handleHover(this._layers[i], t, e)
        }
      },
      _handleHover: function(t, e, i) {
        t.options.interactive && (t._containsPoint(i) ? (t._mouseInside || (o.DomUtil.addClass(this._container, "leaflet-interactive"), t._fireMouseEvent(e, "mouseover"), t._mouseInside = !0), t._fireMouseEvent(e)) : t._mouseInside && (o.DomUtil.removeClass(this._container, "leaflet-interactive"), t._fireMouseEvent(e, "mouseout"), t._mouseInside = !1))
      },
      _bringToFront: o.Util.falseFn,
      _bringToBack: o.Util.falseFn
    }), o.Browser.canvas = function() {
      return !!e.createElement("canvas").getContext
    }(), o.canvas = function(t) {
      return o.Browser.canvas ? new o.Canvas(t) : null
    }, o.Polyline.prototype._containsPoint = function(t, e) {
      var i, n, s, r, a, h, l = this._clickTolerance();
      if (!this._pxBounds.contains(t)) return !1;
      for (i = 0, r = this._parts.length; i < r; i++)
        for (h = this._parts[i], n = 0, a = h.length, s = a - 1; n < a; s = n++)
          if ((e || 0 !== n) && o.LineUtil.pointToSegmentDistance(t, h[s], h[n]) <= l) return !0;
      return !1
    }, o.Polygon.prototype._containsPoint = function(t) {
      var e, i, n, s, r, a, h, l, u = !1;
      if (!this._pxBounds.contains(t)) return !1;
      for (s = 0, h = this._parts.length; s < h; s++)
        for (e = this._parts[s], r = 0, l = e.length, a = l - 1; r < l; a = r++) i = e[r], n = e[a], i.y > t.y != n.y > t.y && t.x < (n.x - i.x) * (t.y - i.y) / (n.y - i.y) + i.x && (u = !u);
      return u || o.Polyline.prototype._containsPoint.call(this, t, !0)
    }, o.CircleMarker.prototype._containsPoint = function(t) {
      return t.distanceTo(this._point) <= this._radius + this._clickTolerance()
    }, o.GeoJSON = o.FeatureGroup.extend({
      initialize: function(t, e) {
        o.setOptions(this, e), this._layers = {}, t && this.addData(t)
      },
      addData: function(t) {
        var e, i, n, s = o.Util.isArray(t) ? t : t.features;
        if (s) {
          for (e = 0, i = s.length; e < i; e++) n = s[e], (n.geometries || n.geometry || n.features || n.coordinates) && this.addData(n);
          return this
        }
        var r = this.options;
        if (!r.filter || r.filter(t)) {
          var a = o.GeoJSON.geometryToLayer(t, r);
          return a.feature = o.GeoJSON.asFeature(t), a.defaultOptions = a.options, this.resetStyle(a), r.onEachFeature && r.onEachFeature(t, a), this.addLayer(a)
        }
      },
      resetStyle: function(t) {
        return t.options = t.defaultOptions, this._setLayerStyle(t, this.options.style), this
      },
      setStyle: function(t) {
        return this.eachLayer(function(e) {
          this._setLayerStyle(e, t)
        }, this)
      },
      _setLayerStyle: function(t, e) {
        "function" == typeof e && (e = e(t.feature)), t.setStyle && t.setStyle(e)
      }
    }), o.extend(o.GeoJSON, {
      geometryToLayer: function(t, e) {
        var i, n, s, r, a = "Feature" === t.type ? t.geometry : t,
          h = a.coordinates,
          l = [],
          u = e && e.pointToLayer,
          c = e && e.coordsToLatLng || this.coordsToLatLng;
        switch (a.type) {
          case "Point":
            return i = c(h), u ? u(t, i) : new o.Marker(i);
          case "MultiPoint":
            for (s = 0, r = h.length; s < r; s++) i = c(h[s]), l.push(u ? u(t, i) : new o.Marker(i));
            return new o.FeatureGroup(l);
          case "LineString":
          case "MultiLineString":
            return n = this.coordsToLatLngs(h, "LineString" === a.type ? 0 : 1, c), new o.Polyline(n, e);
          case "Polygon":
          case "MultiPolygon":
            return n = this.coordsToLatLngs(h, "Polygon" === a.type ? 1 : 2, c), new o.Polygon(n, e);
          case "GeometryCollection":
            for (s = 0, r = a.geometries.length; s < r; s++) l.push(this.geometryToLayer({
              geometry: a.geometries[s],
              type: "Feature",
              properties: t.properties
            }, e));
            return new o.FeatureGroup(l);
          default:
            throw new Error("Invalid GeoJSON object.")
        }
      },
      coordsToLatLng: function(t) {
        return new o.LatLng(t[1], t[0], t[2])
      },
      coordsToLatLngs: function(t, e, i) {
        for (var n, o = [], s = 0, r = t.length; s < r; s++) n = e ? this.coordsToLatLngs(t[s], e - 1, i) : (i || this.coordsToLatLng)(t[s]), o.push(n);
        return o
      },
      latLngToCoords: function(t) {
        return t.alt !== i ? [t.lng, t.lat, t.alt] : [t.lng, t.lat]
      },
      latLngsToCoords: function(t, e, i) {
        for (var n = [], s = 0, r = t.length; s < r; s++) n.push(e ? o.GeoJSON.latLngsToCoords(t[s], e - 1, i) : o.GeoJSON.latLngToCoords(t[s]));
        return !e && i && n.push(n[0]), n
      },
      getFeature: function(t, e) {
        return t.feature ? o.extend({}, t.feature, {
          geometry: e
        }) : o.GeoJSON.asFeature(e)
      },
      asFeature: function(t) {
        return "Feature" === t.type ? t : {
          type: "Feature",
          properties: {},
          geometry: t
        }
      }
    });
  var r = {
    toGeoJSON: function() {
      return o.GeoJSON.getFeature(this, {
        type: "Point",
        coordinates: o.GeoJSON.latLngToCoords(this.getLatLng())
      })
    }
  };
  o.Marker.include(r), o.Circle.include(r), o.CircleMarker.include(r), o.Polyline.prototype.toGeoJSON = function() {
    var t = !this._flat(this._latlngs),
      e = o.GeoJSON.latLngsToCoords(this._latlngs, t ? 1 : 0);
    return o.GeoJSON.getFeature(this, {
      type: (t ? "Multi" : "") + "LineString",
      coordinates: e
    })
  }, o.Polygon.prototype.toGeoJSON = function() {
    var t = !this._flat(this._latlngs),
      e = t && !this._flat(this._latlngs[0]),
      i = o.GeoJSON.latLngsToCoords(this._latlngs, e ? 2 : t ? 1 : 0, !0);
    return t || (i = [i]), o.GeoJSON.getFeature(this, {
      type: (e ? "Multi" : "") + "Polygon",
      coordinates: i
    })
  }, o.LayerGroup.include({
    toMultiPoint: function() {
      var t = [];
      return this.eachLayer(function(e) {
        t.push(e.toGeoJSON().geometry.coordinates)
      }), o.GeoJSON.getFeature(this, {
        type: "MultiPoint",
        coordinates: t
      })
    },
    toGeoJSON: function() {
      var t = this.feature && this.feature.geometry && this.feature.geometry.type;
      if ("MultiPoint" === t) return this.toMultiPoint();
      var e = "GeometryCollection" === t,
        i = [];
      return this.eachLayer(function(t) {
        if (t.toGeoJSON) {
          var n = t.toGeoJSON();
          i.push(e ? n.geometry : o.GeoJSON.asFeature(n))
        }
      }), e ? o.GeoJSON.getFeature(this, {
        geometries: i,
        type: "GeometryCollection"
      }) : {
        type: "FeatureCollection",
        features: i
      }
    }
  }), o.geoJson = function(t, e) {
    return new o.GeoJSON(t, e)
  };
  var a = "_leaflet_events";
  o.DomEvent = {
    on: function(t, e, i, n) {
      if ("object" == typeof e)
        for (var s in e) this._on(t, s, e[s], i);
      else {
        e = o.Util.splitWords(e);
        for (var r = 0, a = e.length; r < a; r++) this._on(t, e[r], i, n)
      }
      return this
    },
    off: function(t, e, i, n) {
      if ("object" == typeof e)
        for (var s in e) this._off(t, s, e[s], i);
      else {
        e = o.Util.splitWords(e);
        for (var r = 0, a = e.length; r < a; r++) this._off(t, e[r], i, n)
      }
      return this
    },
    _on: function(e, i, n, s) {
      var r = i + o.stamp(n) + (s ? "_" + o.stamp(s) : "");
      if (e[a] && e[a][r]) return this;
      var h = function(i) {
          return n.call(s || e, i || t.event)
        },
        l = h;
      return o.Browser.pointer && 0 === i.indexOf("touch") ? this.addPointerListener(e, i, h, r) : o.Browser.touch && "dblclick" === i && this.addDoubleTapListener ? this.addDoubleTapListener(e, h, r) : "addEventListener" in e ? "mousewheel" === i ? (e.addEventListener("DOMMouseScroll", h, !1), e.addEventListener(i, h, !1)) : "mouseenter" === i || "mouseleave" === i ? (h = function(i) {
        if (i = i || t.event, o.DomEvent._checkMouse(e, i)) return l(i)
      }, e.addEventListener("mouseenter" === i ? "mouseover" : "mouseout", h, !1)) : ("click" === i && o.Browser.android && (h = function(t) {
        return o.DomEvent._filterClick(t, l)
      }), e.addEventListener(i, h, !1)) : "attachEvent" in e && e.attachEvent("on" + i, h), e[a] = e[a] || {}, e[a][r] = h, this
    },
    _off: function(t, e, i, n) {
      var s = e + o.stamp(i) + (n ? "_" + o.stamp(n) : ""),
        r = t[a] && t[a][s];
      return r ? (o.Browser.pointer && 0 === e.indexOf("touch") ? this.removePointerListener(t, e, s) : o.Browser.touch && "dblclick" === e && this.removeDoubleTapListener ? this.removeDoubleTapListener(t, s) : "removeEventListener" in t ? "mousewheel" === e ? (t.removeEventListener("DOMMouseScroll", r, !1), t.removeEventListener(e, r, !1)) : t.removeEventListener("mouseenter" === e ? "mouseover" : "mouseleave" === e ? "mouseout" : e, r, !1) : "detachEvent" in t && t.detachEvent("on" + e, r), t[a][s] = null, this) : this
    },
    stopPropagation: function(t) {
      return t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, o.DomEvent._skipped(t), this
    },
    disableScrollPropagation: function(t) {
      return o.DomEvent.on(t, "mousewheel MozMousePixelScroll", o.DomEvent.stopPropagation)
    },
    disableClickPropagation: function(t) {
      var e = o.DomEvent.stopPropagation;
      return o.DomEvent.on(t, o.Draggable.START.join(" "), e), o.DomEvent.on(t, {
        click: o.DomEvent._fakeStop,
        dblclick: e
      })
    },
    preventDefault: function(t) {
      return t.preventDefault ? t.preventDefault() : t.returnValue = !1, this
    },
    stop: function(t) {
      return o.DomEvent.preventDefault(t).stopPropagation(t)
    },
    getMousePosition: function(t, e) {
      if (!e) return new o.Point(t.clientX, t.clientY);
      var i = e.getBoundingClientRect();
      return new o.Point(t.clientX - i.left - e.clientLeft, t.clientY - i.top - e.clientTop)
    },
    getWheelDelta: function(t) {
      var e = 0;
      return t.wheelDelta && (e = t.wheelDelta / 120), t.detail && (e = -t.detail / 3), e
    },
    _skipEvents: {},
    _fakeStop: function(t) {
      o.DomEvent._skipEvents[t.type] = !0
    },
    _skipped: function(t) {
      var e = this._skipEvents[t.type];
      return this._skipEvents[t.type] = !1, e
    },
    _checkMouse: function(t, e) {
      var i = e.relatedTarget;
      if (!i) return !0;
      try {
        for (; i && i !== t;) i = i.parentNode
      } catch (n) {
        return !1
      }
      return i !== t
    },
    _filterClick: function(t, e) {
      var i = t.timeStamp || t.originalEvent.timeStamp,
        n = o.DomEvent._lastClick && i - o.DomEvent._lastClick;
      return n && n > 100 && n < 500 || t.target._simulatedClick && !t._simulated ? void o.DomEvent.stop(t) : (o.DomEvent._lastClick = i, e(t))
    }
  }, o.DomEvent.addListener = o.DomEvent.on, o.DomEvent.removeListener = o.DomEvent.off, o.Draggable = o.Evented.extend({
    statics: {
      START: o.Browser.touch ? ["touchstart", "mousedown"] : ["mousedown"],
      END: {
        mousedown: "mouseup",
        touchstart: "touchend",
        pointerdown: "touchend",
        MSPointerDown: "touchend"
      },
      MOVE: {
        mousedown: "mousemove",
        touchstart: "touchmove",
        pointerdown: "touchmove",
        MSPointerDown: "touchmove"
      }
    },
    initialize: function(t, e) {
      this._element = t, this._dragStartTarget = e || t
    },
    enable: function() {
      this._enabled || (o.DomEvent.on(this._dragStartTarget, o.Draggable.START.join(" "), this._onDown, this), this._enabled = !0)
    },
    disable: function() {
      this._enabled && (o.DomEvent.off(this._dragStartTarget, o.Draggable.START.join(" "), this._onDown, this), this._enabled = !1, this._moved = !1)
    },
    _onDown: function(t) {
      if (this._moved = !1, !t.shiftKey && (1 === t.which || 1 === t.button || t.touches) && (o.DomEvent.stopPropagation(t), !o.Draggable._disabled && (o.DomUtil.disableImageDrag(), o.DomUtil.disableTextSelection(), !this._moving))) {
        this.fire("down");
        var i = t.touches ? t.touches[0] : t;
        this._startPoint = new o.Point(i.clientX, i.clientY), this._startPos = this._newPos = o.DomUtil.getPosition(this._element), o.DomEvent.on(e, o.Draggable.MOVE[t.type], this._onMove, this).on(e, o.Draggable.END[t.type], this._onUp, this)
      }
    },
    _onMove: function(t) {
      if (t.touches && t.touches.length > 1) return void(this._moved = !0);
      var i = t.touches && 1 === t.touches.length ? t.touches[0] : t,
        n = new o.Point(i.clientX, i.clientY),
        s = n.subtract(this._startPoint);
      (s.x || s.y) && (o.Browser.touch && Math.abs(s.x) + Math.abs(s.y) < 3 || (o.DomEvent.preventDefault(t), this._moved || (this.fire("dragstart"), this._moved = !0, this._startPos = o.DomUtil.getPosition(this._element).subtract(s), o.DomUtil.addClass(e.body, "leaflet-dragging"), this._lastTarget = t.target || t.srcElement, o.DomUtil.addClass(this._lastTarget, "leaflet-drag-target")), this._newPos = this._startPos.add(s), this._moving = !0, o.Util.cancelAnimFrame(this._animRequest), this._animRequest = o.Util.requestAnimFrame(this._updatePosition, this, !0, this._dragStartTarget)))
    },
    _updatePosition: function() {
      this.fire("predrag"), o.DomUtil.setPosition(this._element, this._newPos), this.fire("drag")
    },
    _onUp: function() {
      o.DomUtil.removeClass(e.body, "leaflet-dragging"), this._lastTarget && (o.DomUtil.removeClass(this._lastTarget, "leaflet-drag-target"), this._lastTarget = null);
      for (var t in o.Draggable.MOVE) o.DomEvent.off(e, o.Draggable.MOVE[t], this._onMove, this).off(e, o.Draggable.END[t], this._onUp, this);
      o.DomUtil.enableImageDrag(), o.DomUtil.enableTextSelection(), this._moved && this._moving && (o.Util.cancelAnimFrame(this._animRequest), this.fire("dragend", {
        distance: this._newPos.distanceTo(this._startPos)
      })), this._moving = !1
    }
  }), o.Handler = o.Class.extend({
    initialize: function(t) {
      this._map = t
    },
    enable: function() {
      this._enabled || (this._enabled = !0, this.addHooks())
    },
    disable: function() {
      this._enabled && (this._enabled = !1, this.removeHooks())
    },
    enabled: function() {
      return !!this._enabled
    }
  }), o.Map.mergeOptions({
    dragging: !0,
    inertia: !o.Browser.android23,
    inertiaDeceleration: 3400,
    inertiaMaxSpeed: 1 / 0,
    inertiaThreshold: o.Browser.touch ? 32 : 18,
    easeLinearity: .2,
    worldCopyJump: !1
  }), o.Map.Drag = o.Handler.extend({
    addHooks: function() {
      if (!this._draggable) {
        var t = this._map;
        this._draggable = new o.Draggable(t._mapPane, t._container), this._draggable.on({
          down: this._onDown,
          dragstart: this._onDragStart,
          drag: this._onDrag,
          dragend: this._onDragEnd
        }, this), t.options.worldCopyJump && (this._draggable.on("predrag", this._onPreDrag, this), t.on("viewreset", this._onViewReset, this), t.whenReady(this._onViewReset, this))
      }
      this._draggable.enable()
    },
    removeHooks: function() {
      this._draggable.disable()
    },
    moved: function() {
      return this._draggable && this._draggable._moved
    },
    _onDown: function() {
      this._map.stop()
    },
    _onDragStart: function() {
      var t = this._map;
      t.fire("movestart").fire("dragstart"), t.options.inertia && (this._positions = [], this._times = [])
    },
    _onDrag: function() {
      if (this._map.options.inertia) {
        var t = this._lastTime = +new Date,
          e = this._lastPos = this._draggable._newPos;
        this._positions.push(e), this._times.push(t), t - this._times[0] > 100 && (this._positions.shift(), this._times.shift())
      }
      this._map.fire("move").fire("drag")
    },
    _onViewReset: function() {
      var t = this._map.getSize().divideBy(2),
        e = this._map.latLngToLayerPoint([0, 0]);
      this._initialWorldOffset = e.subtract(t).x, this._worldWidth = this._map.getPixelWorldBounds().getSize().x
    },
    _onPreDrag: function() {
      var t = this._worldWidth,
        e = Math.round(t / 2),
        i = this._initialWorldOffset,
        n = this._draggable._newPos.x,
        o = (n - e + i) % t + e - i,
        s = (n + e + i) % t - e - i,
        r = Math.abs(o + i) < Math.abs(s + i) ? o : s;
      this._draggable._newPos.x = r
    },
    _onDragEnd: function(t) {
      var e = this._map,
        i = e.options,
        n = +new Date - this._lastTime,
        s = !i.inertia || n > i.inertiaThreshold || !this._positions[0];
      if (e.fire("dragend", t), s) e.fire("moveend");
      else {
        var r = this._lastPos.subtract(this._positions[0]),
          a = (this._lastTime + n - this._times[0]) / 1e3,
          h = i.easeLinearity,
          l = r.multiplyBy(h / a),
          u = l.distanceTo([0, 0]),
          c = Math.min(i.inertiaMaxSpeed, u),
          d = l.multiplyBy(c / u),
          m = c / (i.inertiaDeceleration * h),
          _ = d.multiplyBy(-m / 2).round();
        _.x && _.y ? (_ = e._limitOffset(_, e.options.maxBounds), o.Util.requestAnimFrame(function() {
          e.panBy(_, {
            duration: m,
            easeLinearity: h,
            noMoveStart: !0,
            animate: !0
          })
        })) : e.fire("moveend")
      }
    }
  }), o.Map.addInitHook("addHandler", "dragging", o.Map.Drag), o.Map.mergeOptions({
    doubleClickZoom: !0
  }), o.Map.DoubleClickZoom = o.Handler.extend({
    addHooks: function() {
      this._map.on("dblclick", this._onDoubleClick, this)
    },
    removeHooks: function() {
      this._map.off("dblclick", this._onDoubleClick, this)
    },
    _onDoubleClick: function(t) {
      var e = this._map,
        i = e.getZoom(),
        n = t.originalEvent.shiftKey ? Math.ceil(i) - 1 : Math.floor(i) + 1;
      "center" === e.options.doubleClickZoom ? e.setZoom(n) : e.setZoomAround(t.containerPoint, n)
    }
  }), o.Map.addInitHook("addHandler", "doubleClickZoom", o.Map.DoubleClickZoom), o.Map.mergeOptions({
    scrollWheelZoom: !0,
    wheelDebounceTime: 40
  }), o.Map.ScrollWheelZoom = o.Handler.extend({
    addHooks: function() {
      o.DomEvent.on(this._map._container, {
        mousewheel: this._onWheelScroll,
        MozMousePixelScroll: o.DomEvent.preventDefault
      }, this), this._delta = 0
    },
    removeHooks: function() {
      o.DomEvent.off(this._map._container, {
        mousewheel: this._onWheelScroll,
        MozMousePixelScroll: o.DomEvent.preventDefault
      }, this)
    },
    _onWheelScroll: function(t) {
      var e = o.DomEvent.getWheelDelta(t),
        i = this._map.options.wheelDebounceTime;
      this._delta += e, this._lastMousePos = this._map.mouseEventToContainerPoint(t), this._startTime || (this._startTime = +new Date);
      var n = Math.max(i - (+new Date - this._startTime), 0);
      clearTimeout(this._timer), this._timer = setTimeout(o.bind(this._performZoom, this), n), o.DomEvent.stop(t)
    },
    _performZoom: function() {
      var t = this._map,
        e = this._delta,
        i = t.getZoom();
      t.stop(), e = e > 0 ? Math.ceil(e) : Math.floor(e), e = Math.max(Math.min(e, 4), -4), e = t._limitZoom(i + e) - i, this._delta = 0, this._startTime = null, e && ("center" === t.options.scrollWheelZoom ? t.setZoom(i + e) : t.setZoomAround(this._lastMousePos, i + e))
    }
  }), o.Map.addInitHook("addHandler", "scrollWheelZoom", o.Map.ScrollWheelZoom), o.extend(o.DomEvent, {
    _touchstart: o.Browser.msPointer ? "MSPointerDown" : o.Browser.pointer ? "pointerdown" : "touchstart",
    _touchend: o.Browser.msPointer ? "MSPointerUp" : o.Browser.pointer ? "pointerup" : "touchend",
    addDoubleTapListener: function(t, i, n) {
      function s(t) {
        var e;
        if (o.Browser.pointer ? (c.push(t.pointerId), e = c.length) : e = t.touches.length, !(e > 1)) {
          var i = Date.now(),
            n = i - (a || i);
          h = t.touches ? t.touches[0] : t, l = n > 0 && n <= u, a = i
        }
      }

      function r(t) {
        if (o.Browser.pointer) {
          var e = c.indexOf(t.pointerId);
          if (e === -1) return;
          c.splice(e, 1)
        }
        if (l) {
          if (o.Browser.pointer) {
            var n, s, r = {};
            for (s in h) n = h[s], r[s] = n && n.bind ? n.bind(h) : n;
            h = r
          }
          h.type = "dblclick", i(h), a = null
        }
      }
      var a, h, l = !1,
        u = 250,
        c = [],
        d = "_leaflet_",
        m = this._touchstart,
        _ = this._touchend;
      t[d + m + n] = s, t[d + _ + n] = r;
      var p = o.Browser.pointer ? e.documentElement : t;
      return t.addEventListener(m, s, !1), p.addEventListener(_, r, !1), o.Browser.pointer && p.addEventListener(o.DomEvent.POINTER_CANCEL, r, !1), this
    },
    removeDoubleTapListener: function(t, i) {
      var n = "_leaflet_",
        s = o.Browser.pointer ? e.documentElement : t,
        r = t[n + this._touchend + i];
      return t.removeEventListener(this._touchstart, t[n + this._touchstart + i], !1), s.removeEventListener(this._touchend, r, !1), o.Browser.pointer && s.removeEventListener(o.DomEvent.POINTER_CANCEL, r, !1), this
    }
  }), o.extend(o.DomEvent, {
    POINTER_DOWN: o.Browser.msPointer ? "MSPointerDown" : "pointerdown",
    POINTER_MOVE: o.Browser.msPointer ? "MSPointerMove" : "pointermove",
    POINTER_UP: o.Browser.msPointer ? "MSPointerUp" : "pointerup",
    POINTER_CANCEL: o.Browser.msPointer ? "MSPointerCancel" : "pointercancel",
    _pointers: {},
    addPointerListener: function(t, e, i, n) {
      return "touchstart" === e ? this._addPointerStart(t, i, n) : "touchmove" === e ? this._addPointerMove(t, i, n) : "touchend" === e && this._addPointerEnd(t, i, n), this
    },
    removePointerListener: function(t, e, i) {
      var n = t["_leaflet_" + e + i];
      return "touchstart" === e ? t.removeEventListener(this.POINTER_DOWN, n, !1) : "touchmove" === e ? t.removeEventListener(this.POINTER_MOVE, n, !1) : "touchend" === e && (t.removeEventListener(this.POINTER_UP, n, !1), t.removeEventListener(this.POINTER_CANCEL, n, !1)), this
    },
    _addPointerStart: function(t, i, n) {
      var s = o.bind(function(t) {
        o.DomEvent.preventDefault(t), this._pointers[t.pointerId] = t, this._handlePointer(t, i)
      }, this);
      if (t["_leaflet_touchstart" + n] = s, t.addEventListener(this.POINTER_DOWN, s, !1), !this._pointerDocListener) {
        var r = o.bind(function(t) {
          delete this._pointers[t.pointerId]
        }, this);
        e.documentElement.addEventListener(this.POINTER_UP, r, !1), e.documentElement.addEventListener(this.POINTER_CANCEL, r, !1), this._pointerDocListener = !0
      }
    },
    _handlePointer: function(t, e) {
      t.touches = [];
      for (var i in this._pointers) t.touches.push(this._pointers[i]);
      t.changedTouches = [t], e(t)
    },
    _addPointerMove: function(t, e, i) {
      var n = o.bind(function(t) {
        (t.pointerType !== t.MSPOINTER_TYPE_MOUSE && "mouse" !== t.pointerType || 0 !== t.buttons) && (this._pointers[t.pointerId] = t, this._handlePointer(t, e))
      }, this);
      t["_leaflet_touchmove" + i] = n, t.addEventListener(this.POINTER_MOVE, n, !1)
    },
    _addPointerEnd: function(t, e, i) {
      var n = o.bind(function(t) {
        delete this._pointers[t.pointerId], this._handlePointer(t, e)
      }, this);
      t["_leaflet_touchend" + i] = n, t.addEventListener(this.POINTER_UP, n, !1), t.addEventListener(this.POINTER_CANCEL, n, !1)
    }
  }), o.Map.mergeOptions({
    touchZoom: o.Browser.touch && !o.Browser.android23,
    bounceAtZoomLimits: !0
  }), o.Map.TouchZoom = o.Handler.extend({
    addHooks: function() {
      o.DomEvent.on(this._map._container, "touchstart", this._onTouchStart, this)
    },
    removeHooks: function() {
      o.DomEvent.off(this._map._container, "touchstart", this._onTouchStart, this)
    },
    _onTouchStart: function(t) {
      var i = this._map;
      if (t.touches && 2 === t.touches.length && !i._animatingZoom && !this._zooming) {
        var n = i.mouseEventToLayerPoint(t.touches[0]),
          s = i.mouseEventToLayerPoint(t.touches[1]),
          r = i._getCenterLayerPoint();
        this._startCenter = n.add(s)._divideBy(2), this._startDist = n.distanceTo(s),
          this._moved = !1, this._zooming = !0, this._centerOffset = r.subtract(this._startCenter), i.stop(), o.DomEvent.on(e, "touchmove", this._onTouchMove, this).on(e, "touchend", this._onTouchEnd, this), o.DomEvent.preventDefault(t)
      }
    },
    _onTouchMove: function(t) {
      if (t.touches && 2 === t.touches.length && this._zooming) {
        var e = this._map,
          i = e.mouseEventToLayerPoint(t.touches[0]),
          n = e.mouseEventToLayerPoint(t.touches[1]);
        if (this._scale = i.distanceTo(n) / this._startDist, this._delta = i._add(n)._divideBy(2)._subtract(this._startCenter), !e.options.bounceAtZoomLimits) {
          var s = e.getScaleZoom(this._scale);
          if (s <= e.getMinZoom() && this._scale < 1 || s >= e.getMaxZoom() && this._scale > 1) return
        }
        this._moved || (e.fire("movestart").fire("zoomstart"), this._moved = !0), o.Util.cancelAnimFrame(this._animRequest), this._animRequest = o.Util.requestAnimFrame(this._updateOnMove, this, !0, this._map._container), o.DomEvent.preventDefault(t)
      }
    },
    _updateOnMove: function() {
      var t = this._map;
      "center" === t.options.touchZoom ? this._center = t.getCenter() : this._center = t.layerPointToLatLng(this._getTargetCenter()), this._zoom = t.getScaleZoom(this._scale), t._animateZoom(this._center, this._zoom)
    },
    _onTouchEnd: function() {
      if (!this._moved || !this._zooming) return void(this._zooming = !1);
      this._zooming = !1, o.Util.cancelAnimFrame(this._animRequest), o.DomEvent.off(e, "touchmove", this._onTouchMove).off(e, "touchend", this._onTouchEnd);
      var t = this._map,
        i = t.getZoom(),
        n = this._zoom - i,
        s = t._limitZoom(n > 0 ? Math.ceil(this._zoom) : Math.floor(this._zoom));
      t._animateZoom(this._center, s, !0)
    },
    _getTargetCenter: function() {
      var t = this._centerOffset.subtract(this._delta).divideBy(this._scale);
      return this._startCenter.add(t)
    }
  }), o.Map.addInitHook("addHandler", "touchZoom", o.Map.TouchZoom), o.Map.mergeOptions({
    tap: !0,
    tapTolerance: 15
  }), o.Map.Tap = o.Handler.extend({
    addHooks: function() {
      o.DomEvent.on(this._map._container, "touchstart", this._onDown, this)
    },
    removeHooks: function() {
      o.DomEvent.off(this._map._container, "touchstart", this._onDown, this)
    },
    _onDown: function(t) {
      if (t.touches) {
        if (o.DomEvent.preventDefault(t), this._fireClick = !0, t.touches.length > 1) return this._fireClick = !1, void clearTimeout(this._holdTimeout);
        var i = t.touches[0],
          n = i.target;
        this._startPos = this._newPos = new o.Point(i.clientX, i.clientY), n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.addClass(n, "leaflet-active"), this._holdTimeout = setTimeout(o.bind(function() {
          this._isTapValid() && (this._fireClick = !1, this._onUp(), this._simulateEvent("contextmenu", i))
        }, this), 1e3), this._simulateEvent("mousedown", i), o.DomEvent.on(e, {
          touchmove: this._onMove,
          touchend: this._onUp
        }, this)
      }
    },
    _onUp: function(t) {
      if (clearTimeout(this._holdTimeout), o.DomEvent.off(e, {
          touchmove: this._onMove,
          touchend: this._onUp
        }, this), this._fireClick && t && t.changedTouches) {
        var i = t.changedTouches[0],
          n = i.target;
        n && n.tagName && "a" === n.tagName.toLowerCase() && o.DomUtil.removeClass(n, "leaflet-active"), this._simulateEvent("mouseup", i), this._isTapValid() && this._simulateEvent("click", i)
      }
    },
    _isTapValid: function() {
      return this._newPos.distanceTo(this._startPos) <= this._map.options.tapTolerance
    },
    _onMove: function(t) {
      var e = t.touches[0];
      this._newPos = new o.Point(e.clientX, e.clientY)
    },
    _simulateEvent: function(i, n) {
      var o = e.createEvent("MouseEvents");
      o._simulated = !0, n.target._simulatedClick = !0, o.initMouseEvent(i, !0, !0, t, 1, n.screenX, n.screenY, n.clientX, n.clientY, !1, !1, !1, !1, 0, null), n.target.dispatchEvent(o)
    }
  }), o.Browser.touch && !o.Browser.pointer && o.Map.addInitHook("addHandler", "tap", o.Map.Tap), o.Map.mergeOptions({
    boxZoom: !0
  }), o.Map.BoxZoom = o.Handler.extend({
    initialize: function(t) {
      this._map = t, this._container = t._container, this._pane = t._panes.overlayPane
    },
    addHooks: function() {
      o.DomEvent.on(this._container, "mousedown", this._onMouseDown, this)
    },
    removeHooks: function() {
      o.DomEvent.off(this._container, "mousedown", this._onMouseDown, this)
    },
    moved: function() {
      return this._moved
    },
    _onMouseDown: function(t) {
      return !(!t.shiftKey || 1 !== t.which && 1 !== t.button) && (this._moved = !1, o.DomUtil.disableTextSelection(), o.DomUtil.disableImageDrag(), this._startPoint = this._map.mouseEventToContainerPoint(t), void o.DomEvent.on(e, {
        contextmenu: o.DomEvent.stop,
        mousemove: this._onMouseMove,
        mouseup: this._onMouseUp,
        keydown: this._onKeyDown
      }, this))
    },
    _onMouseMove: function(t) {
      this._moved || (this._moved = !0, this._box = o.DomUtil.create("div", "leaflet-zoom-box", this._container), o.DomUtil.addClass(this._container, "leaflet-crosshair"), this._map.fire("boxzoomstart")), this._point = this._map.mouseEventToContainerPoint(t);
      var e = new o.Bounds(this._point, this._startPoint),
        i = e.getSize();
      o.DomUtil.setPosition(this._box, e.min), this._box.style.width = i.x + "px", this._box.style.height = i.y + "px"
    },
    _finish: function() {
      this._moved && (o.DomUtil.remove(this._box), o.DomUtil.removeClass(this._container, "leaflet-crosshair")), o.DomUtil.enableTextSelection(), o.DomUtil.enableImageDrag(), o.DomEvent.off(e, {
        contextmenu: o.DomEvent.stop,
        mousemove: this._onMouseMove,
        mouseup: this._onMouseUp,
        keydown: this._onKeyDown
      }, this)
    },
    _onMouseUp: function(t) {
      if (1 !== t.which && 1 !== t.button) return !1;
      if (this._finish(), this._moved) {
        var e = new o.LatLngBounds(this._map.containerPointToLatLng(this._startPoint), this._map.containerPointToLatLng(this._point));
        this._map.fitBounds(e).fire("boxzoomend", {
          boxZoomBounds: e
        })
      }
    },
    _onKeyDown: function(t) {
      27 === t.keyCode && this._finish()
    }
  }), o.Map.addInitHook("addHandler", "boxZoom", o.Map.BoxZoom), o.Map.mergeOptions({
    keyboard: !0,
    keyboardPanOffset: 80,
    keyboardZoomOffset: 1
  }), o.Map.Keyboard = o.Handler.extend({
    keyCodes: {
      left: [37],
      right: [39],
      down: [40],
      up: [38],
      zoomIn: [187, 107, 61, 171],
      zoomOut: [189, 109, 173]
    },
    initialize: function(t) {
      this._map = t, this._setPanOffset(t.options.keyboardPanOffset), this._setZoomOffset(t.options.keyboardZoomOffset)
    },
    addHooks: function() {
      var t = this._map._container;
      t.tabIndex === -1 && (t.tabIndex = "0"), o.DomEvent.on(t, {
        focus: this._onFocus,
        blur: this._onBlur,
        mousedown: this._onMouseDown
      }, this), this._map.on({
        focus: this._addHooks,
        blur: this._removeHooks
      }, this)
    },
    removeHooks: function() {
      this._removeHooks(), o.DomEvent.off(this._map._container, {
        focus: this._onFocus,
        blur: this._onBlur,
        mousedown: this._onMouseDown
      }, this), this._map.off({
        focus: this._addHooks,
        blur: this._removeHooks
      }, this)
    },
    _onMouseDown: function() {
      if (!this._focused) {
        var i = e.body,
          n = e.documentElement,
          o = i.scrollTop || n.scrollTop,
          s = i.scrollLeft || n.scrollLeft;
        this._map._container.focus(), t.scrollTo(s, o)
      }
    },
    _onFocus: function() {
      this._focused = !0, this._map.fire("focus")
    },
    _onBlur: function() {
      this._focused = !1, this._map.fire("blur")
    },
    _setPanOffset: function(t) {
      var e, i, n = this._panKeys = {},
        o = this.keyCodes;
      for (e = 0, i = o.left.length; e < i; e++) n[o.left[e]] = [-1 * t, 0];
      for (e = 0, i = o.right.length; e < i; e++) n[o.right[e]] = [t, 0];
      for (e = 0, i = o.down.length; e < i; e++) n[o.down[e]] = [0, t];
      for (e = 0, i = o.up.length; e < i; e++) n[o.up[e]] = [0, -1 * t]
    },
    _setZoomOffset: function(t) {
      var e, i, n = this._zoomKeys = {},
        o = this.keyCodes;
      for (e = 0, i = o.zoomIn.length; e < i; e++) n[o.zoomIn[e]] = t;
      for (e = 0, i = o.zoomOut.length; e < i; e++) n[o.zoomOut[e]] = -t
    },
    _addHooks: function() {
      o.DomEvent.on(e, "keydown", this._onKeyDown, this)
    },
    _removeHooks: function() {
      o.DomEvent.off(e, "keydown", this._onKeyDown, this)
    },
    _onKeyDown: function(t) {
      if (!(t.altKey || t.ctrlKey || t.metaKey)) {
        var e = t.keyCode,
          i = this._map;
        if (e in this._panKeys) {
          if (i._panAnim && i._panAnim._inProgress) return;
          i.panBy(this._panKeys[e]), i.options.maxBounds && i.panInsideBounds(i.options.maxBounds)
        } else if (e in this._zoomKeys) i.setZoom(i.getZoom() + this._zoomKeys[e]);
        else {
          if (27 !== e) return;
          i.closePopup()
        }
        o.DomEvent.stop(t)
      }
    }
  }), o.Map.addInitHook("addHandler", "keyboard", o.Map.Keyboard), o.Handler.MarkerDrag = o.Handler.extend({
    initialize: function(t) {
      this._marker = t
    },
    addHooks: function() {
      var t = this._marker._icon;
      this._draggable || (this._draggable = new o.Draggable(t, t)), this._draggable.on({
        dragstart: this._onDragStart,
        drag: this._onDrag,
        dragend: this._onDragEnd
      }, this).enable(), o.DomUtil.addClass(t, "leaflet-marker-draggable")
    },
    removeHooks: function() {
      this._draggable.off({
        dragstart: this._onDragStart,
        drag: this._onDrag,
        dragend: this._onDragEnd
      }, this).disable(), o.DomUtil.removeClass(this._marker._icon, "leaflet-marker-draggable")
    },
    moved: function() {
      return this._draggable && this._draggable._moved
    },
    _onDragStart: function() {
      this._marker.closePopup().fire("movestart").fire("dragstart")
    },
    _onDrag: function() {
      var t = this._marker,
        e = t._shadow,
        i = o.DomUtil.getPosition(t._icon),
        n = t._map.layerPointToLatLng(i);
      e && o.DomUtil.setPosition(e, i), t._latlng = n, t.fire("move", {
        latlng: n
      }).fire("drag")
    },
    _onDragEnd: function(t) {
      this._marker.fire("moveend").fire("dragend", t)
    }
  }), o.Control = o.Class.extend({
    options: {
      position: "topright"
    },
    initialize: function(t) {
      o.setOptions(this, t)
    },
    getPosition: function() {
      return this.options.position
    },
    setPosition: function(t) {
      var e = this._map;
      return e && e.removeControl(this), this.options.position = t, e && e.addControl(this), this
    },
    getContainer: function() {
      return this._container
    },
    addTo: function(t) {
      this._map = t;
      var e = this._container = this.onAdd(t),
        i = this.getPosition(),
        n = t._controlCorners[i];
      return o.DomUtil.addClass(e, "leaflet-control"), i.indexOf("bottom") !== -1 ? n.insertBefore(e, n.firstChild) : n.appendChild(e), this
    },
    remove: function() {
      return o.DomUtil.remove(this._container), this.onRemove && this.onRemove(this._map), this._map = null, this
    },
    _refocusOnMap: function() {
      this._map && this._map.getContainer().focus()
    }
  }), o.control = function(t) {
    return new o.Control(t)
  }, o.Map.include({
    addControl: function(t) {
      return t.addTo(this), this
    },
    removeControl: function(t) {
      return t.remove(), this
    },
    _initControlPos: function() {
      function t(t, s) {
        var r = i + t + " " + i + s;
        e[t + s] = o.DomUtil.create("div", r, n)
      }
      var e = this._controlCorners = {},
        i = "leaflet-",
        n = this._controlContainer = o.DomUtil.create("div", i + "control-container", this._container);
      t("top", "left"), t("top", "right"), t("bottom", "left"), t("bottom", "right")
    },
    _clearControlPos: function() {
      o.DomUtil.remove(this._controlContainer)
    }
  }), o.Control.Zoom = o.Control.extend({
    options: {
      position: "topleft",
      zoomInText: "+",
      zoomInTitle: "Zoom in",
      zoomOutText: "-",
      zoomOutTitle: "Zoom out"
    },
    onAdd: function(t) {
      var e = "leaflet-control-zoom",
        i = o.DomUtil.create("div", e + " leaflet-bar"),
        n = this.options;
      return this._zoomInButton = this._createButton(n.zoomInText, n.zoomInTitle, e + "-in", i, this._zoomIn), this._zoomOutButton = this._createButton(n.zoomOutText, n.zoomOutTitle, e + "-out", i, this._zoomOut), this._updateDisabled(), t.on("zoomend zoomlevelschange", this._updateDisabled, this), i
    },
    onRemove: function(t) {
      t.off("zoomend zoomlevelschange", this._updateDisabled, this)
    },
    _zoomIn: function(t) {
      this._map.zoomIn(t.shiftKey ? 3 : 1)
    },
    _zoomOut: function(t) {
      this._map.zoomOut(t.shiftKey ? 3 : 1)
    },
    _createButton: function(t, e, i, n, s) {
      var r = o.DomUtil.create("a", i, n);
      return r.innerHTML = t, r.href = "#", r.title = e, o.DomEvent.on(r, "mousedown dblclick", o.DomEvent.stopPropagation).on(r, "click", o.DomEvent.stop).on(r, "click", s, this).on(r, "click", this._refocusOnMap, this), r
    },
    _updateDisabled: function() {
      var t = this._map,
        e = "leaflet-disabled";
      o.DomUtil.removeClass(this._zoomInButton, e), o.DomUtil.removeClass(this._zoomOutButton, e), t._zoom === t.getMinZoom() && o.DomUtil.addClass(this._zoomOutButton, e), t._zoom === t.getMaxZoom() && o.DomUtil.addClass(this._zoomInButton, e)
    }
  }), o.Map.mergeOptions({
    zoomControl: !0
  }), o.Map.addInitHook(function() {
    this.options.zoomControl && (this.zoomControl = new o.Control.Zoom, this.addControl(this.zoomControl))
  }), o.control.zoom = function(t) {
    return new o.Control.Zoom(t)
  }, o.Control.Attribution = o.Control.extend({
    options: {
      position: "bottomright",
      prefix: '<a href="http://leafletjs.com" title="A JS library for interactive maps">Leaflet</a>'
    },
    initialize: function(t) {
      o.setOptions(this, t), this._attributions = {}
    },
    onAdd: function(t) {
      this._container = o.DomUtil.create("div", "leaflet-control-attribution"), o.DomEvent.disableClickPropagation(this._container);
      for (var e in t._layers) t._layers[e].getAttribution && this.addAttribution(t._layers[e].getAttribution());
      return this._update(), this._container
    },
    setPrefix: function(t) {
      return this.options.prefix = t, this._update(), this
    },
    addAttribution: function(t) {
      if (t) return this._attributions[t] || (this._attributions[t] = 0), this._attributions[t]++, this._update(), this
    },
    removeAttribution: function(t) {
      if (t) return this._attributions[t] && (this._attributions[t]--, this._update()), this
    },
    _update: function() {
      if (this._map) {
        var t = [];
        for (var e in this._attributions) this._attributions[e] && t.push(e);
        var i = [];
        this.options.prefix && i.push(this.options.prefix), t.length && i.push(t.join(", ")), this._container.innerHTML = i.join(" | ")
      }
    }
  }), o.Map.mergeOptions({
    attributionControl: !0
  }), o.Map.addInitHook(function() {
    this.options.attributionControl && (this.attributionControl = (new o.Control.Attribution).addTo(this))
  }), o.control.attribution = function(t) {
    return new o.Control.Attribution(t)
  }, o.Control.Scale = o.Control.extend({
    options: {
      position: "bottomleft",
      maxWidth: 100,
      metric: !0,
      imperial: !0
    },
    onAdd: function(t) {
      var e = "leaflet-control-scale",
        i = o.DomUtil.create("div", e),
        n = this.options;
      return this._addScales(n, e + "-line", i), t.on(n.updateWhenIdle ? "moveend" : "move", this._update, this), t.whenReady(this._update, this), i
    },
    onRemove: function(t) {
      t.off(this.options.updateWhenIdle ? "moveend" : "move", this._update, this)
    },
    _addScales: function(t, e, i) {
      t.metric && (this._mScale = o.DomUtil.create("div", e, i)), t.imperial && (this._iScale = o.DomUtil.create("div", e, i))
    },
    _update: function() {
      var t = this._map,
        e = t.getSize().y / 2,
        i = o.CRS.Earth.distance(t.containerPointToLatLng([0, e]), t.containerPointToLatLng([this.options.maxWidth, e]));
      this._updateScales(i)
    },
    _updateScales: function(t) {
      this.options.metric && t && this._updateMetric(t), this.options.imperial && t && this._updateImperial(t)
    },
    _updateMetric: function(t) {
      var e = this._getRoundNum(t),
        i = e < 1e3 ? e + " m" : e / 1e3 + " km";
      this._updateScale(this._mScale, i, e / t)
    },
    _updateImperial: function(t) {
      var e, i, n, o = 3.2808399 * t;
      o > 5280 ? (e = o / 5280, i = this._getRoundNum(e), this._updateScale(this._iScale, i + " mi", i / e)) : (n = this._getRoundNum(o), this._updateScale(this._iScale, n + " ft", n / o))
    },
    _updateScale: function(t, e, i) {
      t.style.width = Math.round(this.options.maxWidth * i) + "px", t.innerHTML = e
    },
    _getRoundNum: function(t) {
      var e = Math.pow(10, (Math.floor(t) + "").length - 1),
        i = t / e;
      return i = i >= 10 ? 10 : i >= 5 ? 5 : i >= 3 ? 3 : i >= 2 ? 2 : 1, e * i
    }
  }), o.control.scale = function(t) {
    return new o.Control.Scale(t)
  }, o.Control.Layers = o.Control.extend({
    options: {
      collapsed: !0,
      position: "topright",
      autoZIndex: !0
    },
    initialize: function(t, e, i) {
      o.setOptions(this, i), this._layers = {}, this._lastZIndex = 0, this._handlingClick = !1;
      for (var n in t) this._addLayer(t[n], n);
      for (n in e) this._addLayer(e[n], n, !0)
    },
    onAdd: function() {
      return this._initLayout(), this._update(), this._container
    },
    addBaseLayer: function(t, e) {
      return this._addLayer(t, e), this._update()
    },
    addOverlay: function(t, e) {
      return this._addLayer(t, e, !0), this._update()
    },
    removeLayer: function(t) {
      return t.off("add remove", this._onLayerChange, this), delete this._layers[o.stamp(t)], this._update()
    },
    _initLayout: function() {
      var t = "leaflet-control-layers",
        e = this._container = o.DomUtil.create("div", t);
      e.setAttribute("aria-haspopup", !0), o.Browser.touch ? o.DomEvent.on(e, "click", o.DomEvent.stopPropagation) : o.DomEvent.disableClickPropagation(e).disableScrollPropagation(e);
      var i = this._form = o.DomUtil.create("form", t + "-list");
      if (this.options.collapsed) {
        o.Browser.android || o.DomEvent.on(e, {
          mouseenter: this._expand,
          mouseleave: this._collapse
        }, this);
        var n = this._layersLink = o.DomUtil.create("a", t + "-toggle", e);
        n.href = "#", n.title = "Layers", o.Browser.touch ? o.DomEvent.on(n, "click", o.DomEvent.stop).on(n, "click", this._expand, this) : o.DomEvent.on(n, "focus", this._expand, this), o.DomEvent.on(i, "click", function() {
          setTimeout(o.bind(this._onInputClick, this), 0)
        }, this), this._map.on("click", this._collapse, this)
      } else this._expand();
      this._baseLayersList = o.DomUtil.create("div", t + "-base", i), this._separator = o.DomUtil.create("div", t + "-separator", i), this._overlaysList = o.DomUtil.create("div", t + "-overlays", i), e.appendChild(i)
    },
    _addLayer: function(t, e, i) {
      t.on("add remove", this._onLayerChange, this);
      var n = o.stamp(t);
      this._layers[n] = {
        layer: t,
        name: e,
        overlay: i
      }, this.options.autoZIndex && t.setZIndex && (this._lastZIndex++, t.setZIndex(this._lastZIndex))
    },
    _update: function() {
      if (this._container) {
        o.DomUtil.empty(this._baseLayersList), o.DomUtil.empty(this._overlaysList);
        var t, e, i, n;
        for (i in this._layers) n = this._layers[i], this._addItem(n), e = e || n.overlay, t = t || !n.overlay;
        return this._separator.style.display = e && t ? "" : "none", this
      }
    },
    _onLayerChange: function(t) {
      this._handlingClick || this._update();
      var e = this._layers[o.stamp(t.target)].overlay,
        i = e ? "add" === t.type ? "overlayadd" : "overlayremove" : "add" === t.type ? "baselayerchange" : null;
      i && this._map.fire(i, t.target)
    },
    _createRadioElement: function(t, i) {
      var n = '<input type="radio" class="leaflet-control-layers-selector" name="' + t + '"' + (i ? ' checked="checked"' : "") + "/>",
        o = e.createElement("div");
      return o.innerHTML = n, o.firstChild
    },
    _addItem: function(t) {
      var i, n = e.createElement("label"),
        s = this._map.hasLayer(t.layer);
      t.overlay ? (i = e.createElement("input"), i.type = "checkbox", i.className = "leaflet-control-layers-selector", i.defaultChecked = s) : i = this._createRadioElement("leaflet-base-layers", s), i.layerId = o.stamp(t.layer), o.DomEvent.on(i, "click", this._onInputClick, this);
      var r = e.createElement("span");
      r.innerHTML = " " + t.name, n.appendChild(i), n.appendChild(r);
      var a = t.overlay ? this._overlaysList : this._baseLayersList;
      return a.appendChild(n), n
    },
    _onInputClick: function() {
      var t, e, i, n = this._form.getElementsByTagName("input");
      this._handlingClick = !0;
      for (var o = 0, s = n.length; o < s; o++) t = n[o], e = this._layers[t.layerId].layer, i = this._map.hasLayer(e), t.checked && !i ? this._map.addLayer(e) : !t.checked && i && this._map.removeLayer(e);
      this._handlingClick = !1, this._refocusOnMap()
    },
    _expand: function() {
      o.DomUtil.addClass(this._container, "leaflet-control-layers-expanded")
    },
    _collapse: function() {
      o.DomUtil.removeClass(this._container, "leaflet-control-layers-expanded")
    }
  }), o.control.layers = function(t, e, i) {
    return new o.Control.Layers(t, e, i)
  }, o.PosAnimation = o.Evented.extend({
    run: function(t, e, i, n) {
      this.stop(), this._el = t, this._inProgress = !0, this._duration = i || .25, this._easeOutPower = 1 / Math.max(n || .5, .2), this._startPos = o.DomUtil.getPosition(t), this._offset = e.subtract(this._startPos), this._startTime = +new Date, this.fire("start"), this._animate()
    },
    stop: function() {
      this._inProgress && (this._step(!0), this._complete())
    },
    _animate: function() {
      this._animId = o.Util.requestAnimFrame(this._animate, this), this._step()
    },
    _step: function(t) {
      var e = +new Date - this._startTime,
        i = 1e3 * this._duration;
      e < i ? this._runFrame(this._easeOut(e / i), t) : (this._runFrame(1), this._complete())
    },
    _runFrame: function(t, e) {
      var i = this._startPos.add(this._offset.multiplyBy(t));
      e && i._round(), o.DomUtil.setPosition(this._el, i), this.fire("step")
    },
    _complete: function() {
      o.Util.cancelAnimFrame(this._animId), this._inProgress = !1, this.fire("end")
    },
    _easeOut: function(t) {
      return 1 - Math.pow(1 - t, this._easeOutPower)
    }
  }), o.Map.include({
    setView: function(t, e, n) {
      if (e = e === i ? this._zoom : this._limitZoom(e), t = this._limitCenter(o.latLng(t), e, this.options.maxBounds), n = n || {}, this.stop(), this._loaded && !n.reset && n !== !0) {
        n.animate !== i && (n.zoom = o.extend({
          animate: n.animate
        }, n.zoom), n.pan = o.extend({
          animate: n.animate
        }, n.pan));
        var s = this._zoom !== e ? this._tryAnimatedZoom && this._tryAnimatedZoom(t, e, n.zoom) : this._tryAnimatedPan(t, n.pan);
        if (s) return clearTimeout(this._sizeTimer), this
      }
      return this._resetView(t, e), this
    },
    panBy: function(t, e) {
      if (t = o.point(t).round(), e = e || {}, !t.x && !t.y) return this;
      if (e.animate !== !0 && !this.getSize().contains(t)) return this._resetView(this.unproject(this.project(this.getCenter()).add(t)), this.getZoom());
      if (this._panAnim || (this._panAnim = new o.PosAnimation, this._panAnim.on({
          step: this._onPanTransitionStep,
          end: this._onPanTransitionEnd
        }, this)), e.noMoveStart || this.fire("movestart"), e.animate !== !1) {
        o.DomUtil.addClass(this._mapPane, "leaflet-pan-anim");
        var i = this._getMapPanePos().subtract(t);
        this._panAnim.run(this._mapPane, i, e.duration || .25, e.easeLinearity)
      } else this._rawPanBy(t), this.fire("move").fire("moveend");
      return this
    },
    _onPanTransitionStep: function() {
      this.fire("move")
    },
    _onPanTransitionEnd: function() {
      o.DomUtil.removeClass(this._mapPane, "leaflet-pan-anim"), this.fire("moveend")
    },
    _tryAnimatedPan: function(t, e) {
      var i = this._getCenterOffset(t)._floor();
      return !((e && e.animate) !== !0 && !this.getSize().contains(i)) && (this.panBy(i, e), !0)
    }
  }), o.Map.mergeOptions({
    zoomAnimation: !0,
    zoomAnimationThreshold: 4
  });
  var h = o.DomUtil.TRANSITION && o.Browser.any3d && !o.Browser.mobileOpera;
  h && o.Map.addInitHook(function() {
    this._zoomAnimated = this.options.zoomAnimation, this._zoomAnimated && (this._createAnimProxy(), o.DomEvent.on(this._proxy, o.DomUtil.TRANSITION_END, this._catchTransitionEnd, this))
  }), o.Map.include(h ? {
    _createAnimProxy: function() {
      var t = this._proxy = o.DomUtil.create("div", "leaflet-proxy leaflet-zoom-animated");
      this._panes.mapPane.appendChild(t), this.on("zoomanim", function(e) {
        o.DomUtil.setTransform(t, this.project(e.center, e.zoom), this.getZoomScale(e.zoom, 1))
      }, this), this.on("load moveend", function() {
        var e = this.getCenter(),
          i = this.getZoom();
        o.DomUtil.setTransform(t, this.project(e, i), this.getZoomScale(i, 1))
      }, this)
    },
    _catchTransitionEnd: function(t) {
      this._animatingZoom && t.propertyName.indexOf("transform") >= 0 && this._onZoomTransitionEnd()
    },
    _nothingToAnimate: function() {
      return !this._container.getElementsByClassName("leaflet-zoom-animated").length
    },
    _tryAnimatedZoom: function(t, e, i) {
      if (this._animatingZoom) return !0;
      if (i = i || {}, !this._zoomAnimated || i.animate === !1 || this._nothingToAnimate() || Math.abs(e - this._zoom) > this.options.zoomAnimationThreshold) return !1;
      var n = this.getZoomScale(e),
        s = this._getCenterOffset(t)._divideBy(1 - 1 / n);
      return !(i.animate !== !0 && !this.getSize().contains(s)) && (o.Util.requestAnimFrame(function() {
        this.fire("movestart").fire("zoomstart")._animateZoom(t, e, !0)
      }, this), !0)
    },
    _animateZoom: function(t, e, i) {
      i && (this._animatingZoom = !0, this._animateToCenter = t, this._animateToZoom = e, o.DomUtil.addClass(this._mapPane, "leaflet-zoom-anim")), this.fire("zoomanim", {
        center: t,
        zoom: e,
        scale: this.getZoomScale(e),
        origin: this.latLngToLayerPoint(t),
        offset: this._getCenterOffset(t).multiplyBy(-1)
      })
    },
    _onZoomTransitionEnd: function() {
      this._animatingZoom = !1, o.DomUtil.removeClass(this._mapPane, "leaflet-zoom-anim"), this._resetView(this._animateToCenter, this._animateToZoom, !0, !0)
    }
  } : {}), o.Map.include({
    flyTo: function(t, e) {
      function n(t) {
        var e = (g * g - f * f + (t ? -1 : 1) * L * L * v * v) / (2 * (t ? g : f) * L * v);
        return Math.log(Math.sqrt(e * e + 1) - e)
      }

      function s(t) {
        return (Math.exp(t) - Math.exp(-t)) / 2
      }

      function r(t) {
        return (Math.exp(t) + Math.exp(-t)) / 2
      }

      function a(t) {
        return s(t) / r(t)
      }

      function h(t) {
        return f * (r(P) / r(P + y * t))
      }

      function l(t) {
        return f * (r(P) * a(P + y * t) - s(P)) / L
      }

      function u(t) {
        return 1 - Math.pow(1 - t, 1.5)
      }

      function c() {
        var i = (Date.now() - b) / w,
          n = u(i) * x;
        i <= 1 ? (this._flyToFrame = o.Util.requestAnimFrame(c, this), this._resetView(this.unproject(d.add(m.subtract(d).multiplyBy(l(n) / v)), p), this.getScaleZoom(f / h(n), p), !0, !0)) : this._resetView(t, e, !0, !0)
      }
      this.stop();
      var d = this.project(this.getCenter()),
        m = this.project(t),
        _ = this.getSize(),
        p = this._zoom;
      e = e === i ? p : e;
      var f = Math.max(_.x, _.y),
        g = f * this.getZoomScale(p, e),
        v = m.distanceTo(d),
        y = 1.42,
        L = y * y,
        P = n(0),
        b = Date.now(),
        x = (n(1) - P) / y,
        w = 1e3 * x * .8;
      this.fire("zoomstart"), c.call(this)
    }
  }), o.Map.include({
    _defaultLocateOptions: {
      timeout: 1e4,
      watch: !1
    },
    locate: function(t) {
      if (t = this._locateOptions = o.extend(this._defaultLocateOptions, t), !navigator.geolocation) return this._handleGeolocationError({
        code: 0,
        message: "Geolocation not supported."
      }), this;
      var e = o.bind(this._handleGeolocationResponse, this),
        i = o.bind(this._handleGeolocationError, this);
      return t.watch ? this._locationWatchId = navigator.geolocation.watchPosition(e, i, t) : navigator.geolocation.getCurrentPosition(e, i, t), this
    },
    stopLocate: function() {
      return navigator.geolocation && navigator.geolocation.clearWatch(this._locationWatchId), this._locateOptions && (this._locateOptions.setView = !1), this
    },
    _handleGeolocationError: function(t) {
      var e = t.code,
        i = t.message || (1 === e ? "permission denied" : 2 === e ? "position unavailable" : "timeout");
      this._locateOptions.setView && !this._loaded && this.fitWorld(), this.fire("locationerror", {
        code: e,
        message: "Geolocation error: " + i + "."
      })
    },
    _handleGeolocationResponse: function(t) {
      var e = t.coords.latitude,
        i = t.coords.longitude,
        n = new o.LatLng(e, i),
        s = 180 * t.coords.accuracy / 40075017,
        r = s / Math.cos(Math.PI / 180 * e),
        a = o.latLngBounds([e - s, i - r], [e + s, i + r]),
        h = this._locateOptions;
      if (h.setView) {
        var l = this.getBoundsZoom(a);
        this.setView(n, h.maxZoom ? Math.min(l, h.maxZoom) : l)
      }
      var u = {
        latlng: n,
        bounds: a,
        timestamp: t.timestamp
      };
      for (var c in t.coords) "number" == typeof t.coords[c] && (u[c] = t.coords[c]);
      this.fire("locationfound", u)
    }
  })
}(window, document), L.Control.Coordinates = L.Control.extend({
    options: {
      position: "bottomright",
      decimals: 4,
      decimalSeperator: ".",
      labelTemplateLat: "X: {y}",
      labelTemplateLng: "Y: {x}",
      labelFormatterLat: void 0,
      labelFormatterLng: void 0,
      enableUserInput: !0,
      useLatLngOrder: !1,
      centerUserCoordinates: !1
    },
    onAdd: function(t) {
      this._map = t;
      var e = "leaflet-control-coordinates",
        i = this._container = L.DomUtil.create("div", e),
        n = this.options;
      this._labelcontainer = L.DomUtil.create("div", "uiElement label", i), this._label = L.DomUtil.create("span", "labelFirst", this._labelcontainer), this._inputcontainer = L.DomUtil.create("div", "uiElement input uiHidden", i);
      var o, s;
      return n.useLatLngOrder ? (s = L.DomUtil.create("span", "", this._inputcontainer), this._inputY = this._createInput("inputY", this._inputcontainer), o = L.DomUtil.create("span", "", this._inputcontainer), this._inputX = this._createInput("inputX", this._inputcontainer)) : (o = L.DomUtil.create("span", "", this._inputcontainer), this._inputX = this._createInput("inputX", this._inputcontainer), s = L.DomUtil.create("span", "", this._inputcontainer), this._inputY = this._createInput("inputY", this._inputcontainer)), o.innerHTML = n.labelTemplateLng.replace("{x}", ""), s.innerHTML = n.labelTemplateLat.replace("{y}", ""), L.DomEvent.on(this._inputX, "keyup", this._handleKeypress, this), L.DomEvent.on(this._inputY, "keyup", this._handleKeypress, this), t.on("mousemove", this._update, this), t.on("dragstart", this.collapse, this), t.whenReady(this._update, this), this._showsCoordinates = !0, n.enableUserInput && L.DomEvent.addListener(this._container, "click", this._switchUI, this), i
    },
    _createInput: function(t, e) {
      var i = L.DomUtil.create("input", t, e);
      return i.type = "text", L.DomEvent.disableClickPropagation(i), i
    },
    _clearMarker: function() {
      this._map.removeLayer(this._marker)
    },
    _handleKeypress: function(t) {
      switch (t.keyCode) {
        case 27:
          this.collapse();
          break;
        case 13:
          this._handleSubmit(), this.collapse();
          break;
        default:
          this._handleSubmit()
      }
    },
    _handleSubmit: function() {
      var t = L.NumberFormatter.createValidNumber(this._inputX.value, this.options.decimalSeperator),
        e = L.NumberFormatter.createValidNumber(this._inputY.value, this.options.decimalSeperator);
      if (void 0 !== t && void 0 !== e) {
        var i = this._marker;
        i || (i = this._marker = L.marker(), i.on("click", this._clearMarker, this));
        var n = new L.LatLng(e, t);
        i.setLatLng(n), i.addTo(this._map), this.options.centerUserCoordinates && this._map.setView(n, this._map.getZoom())
      }
    },
    expand: function() {
      this._showsCoordinates = !1, this._map.off("mousemove", this._update, this), L.DomEvent.addListener(this._container, "mousemove", L.DomEvent.stop), L.DomEvent.removeListener(this._container, "click", this._switchUI, this), L.DomUtil.addClass(this._labelcontainer, "uiHidden"), L.DomUtil.removeClass(this._inputcontainer, "uiHidden")
    },
    _createCoordinateLabel: function(t) {
      var e, i, n = this.options;
      return e = n.labelFormatterLng ? n.labelFormatterLng(t.lng) : L.Util.template(n.labelTemplateLng, {
        x: this._getNumber(t.lng, n)
      }), i = n.labelFormatterLat ? n.labelFormatterLat(t.lat) : L.Util.template(n.labelTemplateLat, {
        y: this._getNumber(t.lat, n)
      }), n.useLatLngOrder ? i + " " + e : e + " " + i
    },
    _getNumber: function(t, e) {
      return L.NumberFormatter.round(t, e.decimals, e.decimalSeperator)
    },
    collapse: function() {
      if (!this._showsCoordinates) {
        this._map.on("mousemove", this._update, this), this._showsCoordinates = !0;
        this.options;
        if (L.DomEvent.addListener(this._container, "click", this._switchUI, this), L.DomEvent.removeListener(this._container, "mousemove", L.DomEvent.stop), L.DomUtil.addClass(this._inputcontainer, "uiHidden"), L.DomUtil.removeClass(this._labelcontainer, "uiHidden"), this._marker) {
          var t = L.marker(),
            e = this._marker.getLatLng();
          t.setLatLng(e);
          var i = L.DomUtil.create("div", ""),
            n = L.DomUtil.create("div", "", i);
          n.innerHTML = this._createCoordinateLabel(e);
          var o = L.DomUtil.create("a", "", i);
          o.innerHTML = "Remove", o.href = "#";
          var s = L.DomEvent.stopPropagation;
          L.DomEvent.on(o, "click", s).on(o, "mousedown", s).on(o, "dblclick", s).on(o, "click", L.DomEvent.preventDefault).on(o, "click", function() {
            this._map.removeLayer(t)
          }, this), t.bindPopup(i), t.addTo(this._map), this._map.removeLayer(this._marker), this._marker = null
        }
      }
    },
    _switchUI: function(t) {
      L.DomEvent.stop(t), L.DomEvent.stopPropagation(t), L.DomEvent.preventDefault(t), this._showsCoordinates ? this.expand() : this.collapse()
    },
    onRemove: function(t) {
      t.off("mousemove", this._update, this)
    },
    _update: function(t) {
      var e = t.latlng,
        i = this.options;
      e && (e = e.wrap(), this._currentPos = e, this._inputY.value = L.NumberFormatter.round(e.lat, i.decimals, i.decimalSeperator), this._inputX.value = L.NumberFormatter.round(e.lng, i.decimals, i.decimalSeperator), this._label.innerHTML = this._createCoordinateLabel(e))
    }
  }), L.control.coordinates = function(t) {
    return new L.Control.Coordinates(t)
  }, L.Map.mergeOptions({
    coordinateControl: !1
  }), L.Map.addInitHook(function() {
    this.options.coordinateControl && (this.coordinateControl = new L.Control.Coordinates, this.addControl(this.coordinateControl))
  }), L.NumberFormatter = {
    round: function(t, e, i) {
      var n = L.Util.formatNum(t, e) + "",
        o = n.split(".");
      if (o[1]) {
        for (var s = e - o[1].length; s > 0; s--) o[1] += "0";
        n = o.join(i || ".")
      }
      return n
    },
    createValidNumber: function(t, e) {
      if (t && t.length > 0) {
        var i = t.split(e || ".");
        try {
          var n = Number(i.join("."));
          if (isNaN(n)) return;
          return n
        } catch (o) {
          return
        }
      }
    }
  }, L.Control.MapCenterCoord = L.Control.extend({
  // Defaults
  options: {
    position: 'bottomleft',
    icon: true,
    onMove: false,
    template: '{y} | {x}', // https://en.wikipedia.org/wiki/ISO_6709
    projected: false,
    formatProjected: '#.##0,000',
    latlngFormat: 'DD', // DD, DM, DMS
    latlngDesignators: false,
    latLngFormatter: undefined
  },

  onAdd: function (map) {
    if (this.options.icon) {
      // create a DOM element and put it into overlayPane
      this._iconEl = L.DomUtil.create('div', 'leaflet-control-mapcentercoord-icon leaflet-zoom-hide');
      map.getPanes().overlayPane.appendChild(this._iconEl);

      // add a viewreset event listener for updating icon's position
      map.on('viewreset', this._onReset, this);
      this._onReset();
    }

    // Control container
    this._container = L.DomUtil.create('div', 'leaflet-control-mapcentercoord');
    L.DomEvent.disableClickPropagation(this._container);

    // Add events listeners for updating coordinates & icon's position
    map.on('move', this._onMapMove, this);
    map.on('moveend', this._onMapMoveEnd, this);

    this._container.innerHTML = this._getMapCenterCoord();
    return this._container;
  },

  onRemove: function (map) {
    // remove icon's DOM elements and listeners
    if (this.options.icon) {
      map.getPanes().overlayPane.removeChild(this._iconEl);
      map.off('viewreset', this._onReset, this);
    }
    map.off('move', this._onMapMove, this);
    map.off('moveend', this._onMapMove, this);
  },

  _onReset: function (e) {
    // update icon's position
    var pos = this._map.latLngToLayerPoint(this._map.getCenter());
    L.DomUtil.setPosition(this._iconEl, pos);
  },

  _onMapMove: function (e) {
    if (this.options.icon) {
      // update icon's position
      var pos = this._map.latLngToLayerPoint(this._map.getCenter());
      L.DomUtil.setPosition(this._iconEl, pos);
    }
    if (this.options.onMove) {
      // update coordinates
      this._container.innerHTML = this._getMapCenterCoord();
    }
  },

  _onMapMoveEnd: function (e) {
    if (this.options.icon) {
      // update icon's position
      var pos = this._map.latLngToLayerPoint(this._map.getCenter());
      L.DomUtil.setPosition(this._iconEl, pos);
    }
    // update coordinates
    this._container.innerHTML = this._getMapCenterCoord();
  },

  _getMapCenterCoord: function () {
    if (this.options.projected) return this._getProjectedCoord(this._map.options.crs.project(this._map.getCenter()));
    return this._getLatLngCoord(this._map.getCenter());
  },

  _getProjectedCoord: function (center) {
    return L.Util.template(this.options.template, {
      x: this._format(this.options.formatProjected, center.x),
      y: this._format(this.options.formatProjected, center.y)
    });
  },


  _getLatLngCoord: function (center) {

    if (this.options.latLngFormatter != undefined) return this.options.latLngFormatter(center.lat, center.lng);

    var lat, lng, deg, min;

	//make a copy of center so we aren't affecting leaflet's internal state
    var centerCopy = {
		lat: center.lat,
		lng: center.lng
	};

    // 180 degrees & negative
    if (centerCopy.lng < 0) {
      centerCopy.lng_neg = true;
      centerCopy.lng = Math.abs(centerCopy.lng);
    } else centerCopy.lng_neg = false;
    if (centerCopy.lat < 0) {
      centerCopy.lat_neg = true;
      centerCopy.lat = Math.abs(centerCopy.lat);
    } else centerCopy.lat_neg = false;
    if (centerCopy.lng > 180) {
      centerCopy.lng = 360 - centerCopy.lng;
      centerCopy.lng_neg = !centerCopy.lng_neg;
    }

    // format
    if (this.options.latlngFormat === 'DM') {
      deg = parseInt(centerCopy.lng);
      lng = deg + '� ' + this._format('00.000', (centerCopy.lng - deg) * 60) + "'";
      deg = parseInt(centerCopy.lat);
      lat = deg + '� ' + this._format('00.000', (centerCopy.lat - deg) * 60) + "'";
    } else if (this.options.latlngFormat === 'DMS') {
      deg = parseInt(centerCopy.lng);
      min = (centerCopy.lng - deg) * 60;
      lng = deg + '� ' + this._format('00', parseInt(min)) + "' " + this._format('00.0', (min - parseInt(min)) * 60) + "''";
      deg = parseInt(centerCopy.lat);
      min = (centerCopy.lat - deg) * 60;
      lat = deg + '� ' + this._format('00', parseInt(min)) + "' " + this._format('00.0', (min - parseInt(min)) * 60) + "''";
    } else { // 'DD'
      lng = this._format('#0.00000', centerCopy.lng) + '�';
      lat = this._format('##0.00000', centerCopy.lat) + '�';
    }

    return L.Util.template(this.options.template, {
      x: (!this.options.latlngDesignators && centerCopy.lng_neg ? '-' : '') + lng + (this.options.latlngDesignators ? (centerCopy.lng_neg ? ' W' : ' E') : ''),
      y: (!this.options.latlngDesignators && centerCopy.lat_neg ? '-' : '') + lat + (this.options.latlngDesignators ? (centerCopy.lat_neg ? ' S' : ' N') : '')
    });
  },

  /*
   IntegraXor Web SCADA - JavaScript Number Formatter
   https://code.google.com/p/javascript-number-formatter/
   author: KPL, KHL
  */
  _format: function (m, v) {
    if (!m || isNaN(+v)) {
      return v; //return as it is.
    }
    //convert any string to number according to formation sign.
    var v = m.charAt(0) == '-' ? -v : +v;
    var isNegative = v < 0 ? v = -v : 0; //process only abs(), and turn on flag.

    //search for separator for grp & decimal, anything not digit, not +/- sign, not #.
    var result = m.match(/[^\d\-\+#]/g);
    var Decimal = (result && result[result.length - 1]) || '.'; //treat the right most symbol as decimal
    var Group = (result && result[1] && result[0]) || ','; //treat the left most symbol as group separator

    //split the decimal for the format string if any.
    var m = m.split(Decimal);
    //Fix the decimal first, toFixed will auto fill trailing zero.
    v = v.toFixed(m[1] && m[1].length);
    v = +(v) + ''; //convert number to string to trim off *all* trailing decimal zero(es)

    //fill back any trailing zero according to format
    var pos_trail_zero = m[1] && m[1].lastIndexOf('0'); //look for last zero in format
    var part = v.split('.');
    //integer will get !part[1]
    if (!part[1] || part[1] && part[1].length <= pos_trail_zero) {
      v = (+v).toFixed(pos_trail_zero + 1);
    }
    var szSep = m[0].split(Group); //look for separator
    m[0] = szSep.join(''); //join back without separator for counting the pos of any leading 0.

    var pos_lead_zero = m[0] && m[0].indexOf('0');
    if (pos_lead_zero > -1) {
      while (part[0].length < (m[0].length - pos_lead_zero)) {
        part[0] = '0' + part[0];
      }
    } else if (+part[0] == 0) {
      part[0] = '';
    }

    v = v.split('.');
    v[0] = part[0];

    //process the first group separator from decimal (.) only, the rest ignore.
    //get the length of the last slice of split result.
    var pos_separator = (szSep[1] && szSep[szSep.length - 1].length);
    if (pos_separator) {
      var integer = v[0];
      var str = '';
      var offset = integer.length % pos_separator;
      for (var i = 0, l = integer.length; i < l; i++) {

        str += integer.charAt(i); //ie6 only support charAt for sz.
        //-pos_separator so that won't trail separator on full length
        if (!((i - offset + 1) % pos_separator) && i < l - pos_separator) {
          str += Group;
        }
      }
      v[0] = str;
    }

    v[1] = (m[1] && v[1]) ? Decimal + v[1] : "";
    return (isNegative ? '-' : '') + v[0] + v[1]; //put back any negation and combine integer and fraction.
  }

});

L.Map.mergeOptions({
  MapCenterCoordControl: false
});

L.Map.addInitHook(function () {
  if (this.options.MapCenterCoordControl) {
    this.MapCenterCoordControl = new L.Control.MapCenterCoord();
    this.addControl(this.MapCenterCoordControl);
  }
});

L.control.mapCenterCoord = function (options) {
  return new L.Control.MapCenterCoord(options);
}, L.LevelButtons = L.Control.extend({
    options: {
      position: "topleft",
      autoZIndex: !0
    },
    onAdd: function(t) {
      this._map = t;
      var e = L.DomUtil.create("div", "leaflet-control-level-buttons-panel leaflet-bar"),
        i = L.DomUtil.create("a", "leaflet-control-level-buttons-a", e);
      i.textContent = "?", i.href = "#", L.DomEvent.addListener(i, "click", this._onUpButton, this), L.DomEvent.disableClickPropagation(i), e.appendChild(i);
      var n = L.DomUtil.create("a", "leaflet-control-level-buttons-a", e);
      return n.textContent = "?", n.href = "#", L.DomEvent.addListener(n, "click", this._onDownButton, this), L.DomEvent.disableClickPropagation(n), e.appendChild(n), e
    },
    onRemove: function() {},
    _onUpButton: function(t) {
      var e = this._tibia_map_obj.floor - 1;
      e >= 0 && this._bringToFront(e), t.preventDefault()
    },
    _onDownButton: function(t) {
      var e = this._tibia_map_obj.floor + 1;
      e <= 15 && this._bringToFront(e), t.preventDefault()
    },
    setTibiaMap: function(t) {
      this._tibia_map_obj = t
    },
    _bringToFront: function(t) {
      this.options.layers_widget._form[t].click()
    }
  }), L.levelButtons = function(t) {
    return new L.LevelButtons(t)
  }, L.Control.Fullscreen = L.Control.extend({
    options: {
      position: "topleft",
      title: {
        "false": "View Fullscreen",
        "true": "Exit Fullscreen"
      }
    },
    onAdd: function(t) {
      var e = L.DomUtil.create("div", "leaflet-control-fullscreen leaflet-bar leaflet-control");
      return this.link = L.DomUtil.create("a", "leaflet-control-fullscreen-button leaflet-bar-part", e), this.link.href = "#", this._map = t, this._map.on("fullscreenchange", this._toggleTitle, this), this._toggleTitle(), L.DomEvent.on(this.link, "click", this._click, this), e
    },
    _click: function(t) {
      L.DomEvent.stopPropagation(t), L.DomEvent.preventDefault(t), this._map.toggleFullscreen(this.options)
    },
    _toggleTitle: function() {
      this.link.title = this.options.title[this._map.isFullscreen()]
    }
  }), L.Map.include({
    isFullscreen: function() {
      return this._isFullscreen || !1
    },
    toggleFullscreen: function(t) {
      var e = this.getContainer();
      this.isFullscreen() ? t && t.pseudoFullscreen ? this._disablePseudoFullscreen(e) : document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitCancelFullScreen ? document.webkitCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : this._disablePseudoFullscreen(e) : t && t.pseudoFullscreen ? this._enablePseudoFullscreen(e) : e.requestFullscreen ? e.requestFullscreen() : e.mozRequestFullScreen ? e.mozRequestFullScreen() : e.webkitRequestFullscreen ? e.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : e.msRequestFullscreen ? e.msRequestFullscreen() : this._enablePseudoFullscreen(e)
    },
    _enablePseudoFullscreen: function(t) {
      L.DomUtil.addClass(t, "leaflet-pseudo-fullscreen"), this._setFullscreen(!0), this.invalidateSize(), this.fire("fullscreenchange")
    },
    _disablePseudoFullscreen: function(t) {
      L.DomUtil.removeClass(t, "leaflet-pseudo-fullscreen"), this._setFullscreen(!1), this.invalidateSize(), this.fire("fullscreenchange")
    },
    _setFullscreen: function(t) {
      this._isFullscreen = t;
      var e = this.getContainer();
      t ? L.DomUtil.addClass(e, "leaflet-fullscreen-on") : L.DomUtil.removeClass(e, "leaflet-fullscreen-on")
    },
    _onFullscreenChange: function(t) {
      var e = document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement;
      e !== this.getContainer() || this._isFullscreen ? e !== this.getContainer() && this._isFullscreen && (this._setFullscreen(!1), this.fire("fullscreenchange")) : (this._setFullscreen(!0), this.fire("fullscreenchange"))
    }
  }), L.Map.mergeOptions({
    fullscreenControl: !1
  }), L.Map.addInitHook(function() {
    this.options.fullscreenControl && (this.fullscreenControl = new L.Control.Fullscreen(this.options.fullscreenControl), this.addControl(this.fullscreenControl));
    var t;
    if ("onfullscreenchange" in document ? t = "fullscreenchange" : "onmozfullscreenchange" in document ? t = "mozfullscreenchange" : "onwebkitfullscreenchange" in document ? t = "webkitfullscreenchange" : "onmsfullscreenchange" in document && (t = "MSFullscreenChange"), t) {
      var e = L.bind(this._onFullscreenChange, this);
      this.whenReady(function() {
        L.DomEvent.on(document, t, e)
      }), this.on("unload", function() {
        L.DomEvent.off(document, t, e)
      })
    }
  }), L.control.fullscreen = function(t) {
    return new L.Control.Fullscreen(t)
  },
  function() {
    function t() {
      this.map = null, this.floor = 7, this.mapFloors = [], this.mapDataStore = [], this.waypoints = []
    }
    var e = "https://tibiamaps.github.io/tibia-map-data/mapper/",
      i = null,
      n = function() {
        var t = new XMLHttpRequest;
        t.open("GET", e + "tiles.json", !0), t.responseType = "json", t.onload = function() {
          200 == t.status && (i = new Set(t.response))
        }, t.send()
      };
    n();
    var o = {
        0: {
          r: 0,
          g: 0,
          b: 0
        },
        12: {
          r: 0,
          g: 102,
          b: 0
        },
        24: {
          r: 0,
          g: 204,
          b: 0
        },
        30: {
          r: 0,
          g: 255,
          b: 0
        },
        51: {
          r: 51,
          g: 102,
          b: 153
        },
        86: {
          r: 102,
          g: 102,
          b: 102
        },
        114: {
          r: 153,
          g: 51,
          b: 0
        },
        121: {
          r: 153,
          g: 102,
          b: 51
        },
        129: {
          r: 153,
          g: 153,
          b: 153
        },
        140: {
          r: 153,
          g: 255,
          b: 102
        },
        179: {
          r: 204,
          g: 255,
          b: 255
        },
        186: {
          r: 255,
          g: 51,
          b: 0
        },
        192: {
          r: 255,
          g: 102,
          b: 0
        },
        207: {
          r: 255,
          g: 204,
          b: 153
        },
        210: {
          r: 255,
          g: 255,
          b: 0
        },
        215: {
          r: 255,
          g: 255,
          b: 255
        }
      },
      s = o[0],
      r = new Uint8Array(new ArrayBuffer(65536)),
      a = location.pathname.indexOf("/embed") != -1,
      h = function(t, e) {
        var i = "000" + String(t);
        return i.substr(i.length - e)
      },
      l = function(t, e) {
        var i = "#" + t.x + "," + t.y + "," + t.floor + ":" + t.zoom;
        e && location.hash != i && window.history.pushState(null, null, i)
      },
      u = function() {
        var t = {
            x: 32368,
            y: 32198,
            floor: 7,
            zoom: 0
          },
          e = window.location.hash.slice(1).split(":");
        if (e[0]) {
          var i = e[0].split(",");
          3 == i.length && (t.x = parseInt(i[0], 10), t.y = parseInt(i[1], 10), t.floor = parseInt(i[2], 10))
        }
        return e[1] && (t.zoom = parseInt(e[1], 10)), t
      },
      c = function() {
        L.CRS.CustomZoom = L.extend({}, L.CRS.Simple, {
          scale: function(t) {
            switch (t) {
              case 0:
                return 256;
              case 1:
                return 512;
              case 2:
                return 1792;
              case 3:
                return 5120;
              case 4:
                return 10240;
              default:
                return 256
            }
          },
          latLngToPoint: function(t, e) {
            var i = this.projection.project(t),
              n = this.scale(e);
            return this.transformation._transform(i, n)
          },
          pointToLatLng: function(t, e) {
            var i = this.scale(e),
              n = this.transformation.untransform(t, i);
            return this.projection.unproject(n)
          }
        })
      };
    t.prototype._getMapData = function(t, n, o, s) {
      var a = h(t, 3) + h(n, 3) + h(o, 2),
        l = this.mapDataStore;
      if (l[a]) window.requestAnimationFrame(function() {
        s(l[a])
      });
      else if (!i || i.has(a)) {
        var u = new XMLHttpRequest;
        u.open("GET", e + a + ".map", !0), u.responseType = "arraybuffer", u.onload = function(t) {
          var e;
          e = 200 == this.status ? new Uint8Array(this.response) : r, l[a] = e, s(e)
        }, u.send()
      }
    }, t.prototype._createMapImageData = function(t, e, i, n, r) {
      this._getMapData(e, i, n, function(e) {
        for (var i = 0, n = 0; n < 256; n++)
          for (var a = 0; a < 256; a++) {
            var h = e[i],
              l = o[h] || s,
              u = 4 * (a * t.width + n);
            t.data[u + 0] = l.r, t.data[u + 1] = l.g, t.data[u + 2] = l.b, t.data[u + 3] = 255, ++i
          }
        r(t)
      })
    }, t.prototype._createMapFloorLayer = function(t) {
      var e = this.mapFloors[t] = new L.GridLayer,
        i = this.map,
        n = this;
      return e._getTileSize = function() {
        return L.CRS.CustomZoom.scale(i.getZoom())
      }, e._setZoomTransform = function(t, e, i) {
        var n = u();
        n.zoom = i, l(n, !1);
        var o = this._map.getZoomScale(i, t.zoom),
          s = t.origin.multiplyBy(o).subtract(this._map._getNewPixelOrigin(e, i)).round();
        L.DomUtil.setTransform(t.el, s, o)
      }, e.createTile = function(e, i) {
        var o = document.createElement("canvas");
        o.width = o.height = 256;
        var s = o.getContext("2d"),
          r = s.createImageData(256, 256);
        return n._createMapImageData(r, e.x, e.y, t, function(t) {
          s.putImageData(t, 0, 0), s.imageSmoothingEnabled = !1, i(null, o)
        }), o
      }, e
    }, t.prototype._showHoverTile = function() {
      var t = this.map,
        e = this;
      t.on("mouseout", function(t) {
        e.hoverTile.setBounds([
          [0, 0],
          [0, 0]
        ])
      }), t.on("mousemove", function(i) {
        var n = t.project(i.latlng, 0),
          o = Math.floor(n.x),
          s = Math.floor(n.y),
          r = [t.unproject([o, s], 0), t.unproject([o + 1, s + 1], 0)];
        e.hoverTile ? e.hoverTile.setBounds(r) : e.hoverTile = L.rectangle(r, {
          color: "#009eff",
          weight: 1,
          clickable: !1,
          pointerEvents: "none"
        }).addTo(t)
      })
    }, t.prototype.init = function() {
      var t = this;
      c();
      var e = {
          xMin: 124,
          xMax: 131,
          yMin: 121,
          yMax: 128
        },
        i = window.innerWidth / 256 / 2,
        n = window.innerHeight / 256 / 2,
        o = e.yMin - n,
        s = e.xMin - i,
        r = e.yMax + 1 + n,
        h = e.xMax + 1 + i,
        d = L.latLngBounds(L.latLng(-o, s), L.latLng(-r, h)),
        m = t.map = L.map("map", {
          attributionControl: !1,
          crs: L.CRS.CustomZoom,
          fadeAnimation: !1,
          keyboardPanOffset: 400,
          maxBounds: d,
          maxNativeZoom: 0,
          maxZoom: 4,
          minZoom: 0,
          scrollWheelZoom: !a,
          unloadInvisibleTiles: !1,
          updateWhenIdle: !0,
          zoomAnimationThreshold: 4
        });
      L.control.fullscreen({
        title: {
          "false": a ? "Explore this area in the map viewer" : "View fullscreen",
          "true": "Exit fullscreen"
        },
        pseudoFullscreen: !0
      }).addTo(m);
      var _ = {
          "Floor +7": t._createMapFloorLayer(0),
          "Floor +6": t._createMapFloorLayer(1),
          "Floor +5": t._createMapFloorLayer(2),
          "Floor +4": t._createMapFloorLayer(3),
          "Floor +3": t._createMapFloorLayer(4),
          "Floor +2": t._createMapFloorLayer(5),
          "Floor +1": t._createMapFloorLayer(6),
          "Ground floor": t._createMapFloorLayer(7),
          "Floor -1": t._createMapFloorLayer(8),
          "Floor -2": t._createMapFloorLayer(9),
          "Floor -3": t._createMapFloorLayer(10),
          "Floor -4": t._createMapFloorLayer(11),
          "Floor -5": t._createMapFloorLayer(12),
          "Floor -6": t._createMapFloorLayer(13),
          "Floor -7": t._createMapFloorLayer(14),
          "Floor -8": t._createMapFloorLayer(15)
        },
        p = L.control.layers(_, {}).addTo(m),
        f = u();
      t.floor = f.floor, m.setView(m.unproject([f.x, f.y], 0), f.zoom), t.mapFloors[f.floor].addTo(m), window.addEventListener("popstate", function(e) {
        var i = u();
        i.floor !== t.floor && (t.floor = i.floor, t.mapFloors[t.floor].addTo(m)), i.zoom !== m.getZoom() && m.setZoom(i.zoom), m.panTo(m.unproject([i.x, i.y], 0))
      }), m.on("baselayerchange", function(e) {
        for (var i = 0; i <= 15; i++)
          if (t.mapFloors[i]._leaflet_id == e._leaflet_id) {
            t.floor = i;
            break
          }
      }), m.on("click", function(e) {
        var i = L.CRS.CustomZoom.latLngToPoint(e.latlng, 0),
          n = m.getZoom(),
          o = Math.floor(Math.abs(i.x)),
          s = Math.floor(Math.abs(i.y));
        l({
          x: o,
          y: s,
          floor: t.floor,
          zoom: n
        }, !0)
      }), m.on("dblclick", function() {
        4 == m.getZoom() ? m.doubleClickZoom.disable() : m.doubleClickZoom.enable()
      }), L.control.mapCenterCoord().addTo(m), L.crosshairs().addTo(m), L.control.coordinates({
        position: "bottomleft",
        enableUserInput: !1,
        labelFormatterLat: function(e) {
          var i = Math.floor(Math.abs(256 * e));
          return "<b>Y</b>: " + i + " <b>Z</b>: " + t.floor
        },
        labelFormatterLng: function(t) {
          var e = Math.floor(Math.abs(256 * t));
          return "<b>X</b>: " + e
        }
      }).addTo(m), L.LevelButtons.btns = L.levelButtons({
        layers_widget: p
      }).addTo(m), t._showHoverTile()
    };
    var d = new t;
    d.init(), L.LevelButtons.btns.setTibiaMap(d);
    var m = function(t) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("click"), t.dispatchEvent(e)
      },
      _ = function(t) {
        return t.replace("/embed", "")
      },
      p = document.querySelector(".leaflet-control-fullscreen-button");
    a ? (p.href = _(location.href), p.addEventListener("click", function(t) {
      window.top.location = _(location.href), t.stopPropagation()
    })) : (p.href = "javascript:null", document.documentElement.addEventListener("keydown", function(t) {
      var e = d.map;
      if ((70 == t.keyCode || 27 == t.keyCode && e.isFullscreen()) && m(p), 67 == t.keyCode) {
        var i = u();
        e.panTo(e.unproject([i.x, i.y], 0))
      }
    }))
  }();
