/*!
 * VueQuill @verybestjp/vue-quill v0.0.0-development
 * https://vueup.github.io/vue-quill/
 *
 * Includes quill v1.3.7
 * https://quilljs.com/
 *
 * Copyright (c) 2024 Ahmad Luthfi Masruri
 * Released under the MIT license
 * Date: 2024-07-30T04:19:36.420Z
 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports, require('quill'), require('vue'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'quill', 'vue'], e)
    : e(
        ((t =
          'undefined' != typeof globalThis ? globalThis : t || self).VueQuill =
          {}),
        t.Quill,
        t.Vue
      )
})(this, function (t, e, n) {
  'use strict'
  function r(t) {
    return t && 'object' == typeof t && 'default' in t ? t.default : t
  }
  var o = r(e),
    i =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {},
    u = -1
  function a(t, e, n, r) {
    if (t === e) return t ? [[0, t]] : []
    if (null != n) {
      var o = (function (t, e, n) {
        var r = 'number' == typeof n ? { index: n, length: 0 } : n.oldRange,
          o = 'number' == typeof n ? null : n.newRange,
          i = t.length,
          u = e.length
        if (0 === r.length && (null === o || 0 === o.length)) {
          var a = r.index,
            s = t.slice(0, a),
            l = t.slice(a),
            c = o ? o.index : null,
            f = a + u - i
          if ((null === c || c === f) && !(f < 0 || f > u)) {
            var h = e.slice(0, f)
            if ((b = e.slice(f)) === l) {
              var p = Math.min(a, f)
              if ((y = s.slice(0, p)) === (j = h.slice(0, p)))
                return v(y, s.slice(p), h.slice(p), l)
            }
          }
          if (null === c || c === a) {
            var d = a,
              b = ((h = e.slice(0, d)), e.slice(d))
            if (h === s) {
              var g = Math.min(i - d, u - d)
              if ((_ = l.slice(l.length - g)) === (m = b.slice(b.length - g)))
                return v(
                  s,
                  l.slice(0, l.length - g),
                  b.slice(0, b.length - g),
                  _
                )
            }
          }
        }
        if (r.length > 0 && o && 0 === o.length) {
          var y = t.slice(0, r.index),
            _ = t.slice(r.index + r.length)
          if (!(u < (p = y.length) + (g = _.length))) {
            var j = e.slice(0, p),
              m = e.slice(u - g)
            if (y === j && _ === m)
              return v(y, t.slice(p, i - g), e.slice(p, u - g), _)
          }
        }
        return null
      })(t, e, n)
      if (o) return o
    }
    var i = l(t, e),
      h = t.substring(0, i)
    i = c((t = t.substring(i)), (e = e.substring(i)))
    var p = t.substring(t.length - i),
      d = (function (t, e) {
        var n
        if (!t) return [[1, e]]
        if (!e) return [[u, t]]
        var r = t.length > e.length ? t : e,
          o = t.length > e.length ? e : t,
          i = r.indexOf(o)
        if (-1 !== i)
          return (
            (n = [
              [1, r.substring(0, i)],
              [0, o],
              [1, r.substring(i + o.length)],
            ]),
            t.length > e.length && (n[0][0] = n[2][0] = u),
            n
          )
        if (1 === o.length)
          return [
            [u, t],
            [1, e],
          ]
        var f = (function (t, e) {
          var n = t.length > e.length ? t : e,
            r = t.length > e.length ? e : t
          if (n.length < 4 || 2 * r.length < n.length) return null
          function o(t, e, n) {
            for (
              var r,
                o,
                i,
                u,
                a = t.substring(n, n + Math.floor(t.length / 4)),
                s = -1,
                f = '';
              -1 !== (s = e.indexOf(a, s + 1));

            ) {
              var h = l(t.substring(n), e.substring(s)),
                p = c(t.substring(0, n), e.substring(0, s))
              f.length < p + h &&
                ((f = e.substring(s - p, s) + e.substring(s, s + h)),
                (r = t.substring(0, n - p)),
                (o = t.substring(n + h)),
                (i = e.substring(0, s - p)),
                (u = e.substring(s + h)))
            }
            return 2 * f.length >= t.length ? [r, o, i, u, f] : null
          }
          var i,
            u,
            a,
            s,
            f,
            h = o(n, r, Math.ceil(n.length / 4)),
            p = o(n, r, Math.ceil(n.length / 2))
          if (!h && !p) return null
          i = p ? (h && h[4].length > p[4].length ? h : p) : h
          t.length > e.length
            ? ((u = i[0]), (a = i[1]), (s = i[2]), (f = i[3]))
            : ((s = i[0]), (f = i[1]), (u = i[2]), (a = i[3]))
          return [u, a, s, f, i[4]]
        })(t, e)
        if (f) {
          var h = f[1],
            p = f[3],
            d = f[4],
            b = a(f[0], f[2]),
            v = a(h, p)
          return b.concat([[0, d]], v)
        }
        return (function (t, e) {
          for (
            var n = t.length,
              r = e.length,
              o = Math.ceil((n + r) / 2),
              i = o,
              a = 2 * o,
              l = new Array(a),
              c = new Array(a),
              f = 0;
            f < a;
            f++
          )
            (l[f] = -1), (c[f] = -1)
          ;(l[i + 1] = 0), (c[i + 1] = 0)
          for (
            var h = n - r, p = h % 2 != 0, d = 0, b = 0, v = 0, g = 0, y = 0;
            y < o;
            y++
          ) {
            for (var _ = -y + d; _ <= y - b; _ += 2) {
              for (
                var j = i + _,
                  m =
                    (k =
                      _ === -y || (_ !== y && l[j - 1] < l[j + 1])
                        ? l[j + 1]
                        : l[j - 1] + 1) - _;
                k < n && m < r && t.charAt(k) === e.charAt(m);

              )
                k++, m++
              if (((l[j] = k), k > n)) b += 2
              else if (m > r) d += 2
              else if (p) {
                if ((O = i + h - _) >= 0 && O < a && -1 !== c[O])
                  if (k >= (w = n - c[O])) return s(t, e, k, m)
              }
            }
            for (var x = -y + v; x <= y - g; x += 2) {
              for (
                var w,
                  O = i + x,
                  A =
                    (w =
                      x === -y || (x !== y && c[O - 1] < c[O + 1])
                        ? c[O + 1]
                        : c[O - 1] + 1) - x;
                w < n && A < r && t.charAt(n - w - 1) === e.charAt(r - A - 1);

              )
                w++, A++
              if (((c[O] = w), w > n)) g += 2
              else if (A > r) v += 2
              else if (!p) {
                if ((j = i + h - x) >= 0 && j < a && -1 !== l[j]) {
                  var k
                  m = i + (k = l[j]) - j
                  if (k >= (w = n - w)) return s(t, e, k, m)
                }
              }
            }
          }
          return [
            [u, t],
            [1, e],
          ]
        })(t, e)
      })((t = t.substring(0, t.length - i)), (e = e.substring(0, e.length - i)))
    return h && d.unshift([0, h]), p && d.push([0, p]), f(d, r), d
  }
  function s(t, e, n, r) {
    var o = t.substring(0, n),
      i = e.substring(0, r),
      u = t.substring(n),
      s = e.substring(r),
      l = a(o, i),
      c = a(u, s)
    return l.concat(c)
  }
  function l(t, e) {
    if (!t || !e || t.charAt(0) !== e.charAt(0)) return 0
    for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o; )
      t.substring(i, o) == e.substring(i, o) ? (i = n = o) : (r = o),
        (o = Math.floor((r - n) / 2 + n))
    return h(t.charCodeAt(o - 1)) && o--, o
  }
  function c(t, e) {
    if (!t || !e || t.slice(-1) !== e.slice(-1)) return 0
    for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o; )
      t.substring(t.length - o, t.length - i) ==
      e.substring(e.length - o, e.length - i)
        ? (i = n = o)
        : (r = o),
        (o = Math.floor((r - n) / 2 + n))
    return p(t.charCodeAt(t.length - o)) && o--, o
  }
  function f(t, e) {
    t.push([0, ''])
    for (var n, r = 0, o = 0, i = 0, a = '', s = ''; r < t.length; )
      if (r < t.length - 1 && !t[r][1]) t.splice(r, 1)
      else
        switch (t[r][0]) {
          case 1:
            i++, (s += t[r][1]), r++
            break
          case u:
            o++, (a += t[r][1]), r++
            break
          case 0:
            var h = r - i - o - 1
            if (e) {
              if (h >= 0 && b(t[h][1])) {
                var p = t[h][1].slice(-1)
                if (
                  ((t[h][1] = t[h][1].slice(0, -1)),
                  (a = p + a),
                  (s = p + s),
                  !t[h][1])
                ) {
                  t.splice(h, 1), r--
                  var v = h - 1
                  t[v] && 1 === t[v][0] && (i++, (s = t[v][1] + s), v--),
                    t[v] && t[v][0] === u && (o++, (a = t[v][1] + a), v--),
                    (h = v)
                }
              }
              if (d(t[r][1])) {
                p = t[r][1].charAt(0)
                ;(t[r][1] = t[r][1].slice(1)), (a += p), (s += p)
              }
            }
            if (r < t.length - 1 && !t[r][1]) {
              t.splice(r, 1)
              break
            }
            if (a.length > 0 || s.length > 0) {
              a.length > 0 &&
                s.length > 0 &&
                (0 !== (n = l(s, a)) &&
                  (h >= 0
                    ? (t[h][1] += s.substring(0, n))
                    : (t.splice(0, 0, [0, s.substring(0, n)]), r++),
                  (s = s.substring(n)),
                  (a = a.substring(n))),
                0 !== (n = c(s, a)) &&
                  ((t[r][1] = s.substring(s.length - n) + t[r][1]),
                  (s = s.substring(0, s.length - n)),
                  (a = a.substring(0, a.length - n))))
              var g = i + o
              0 === a.length && 0 === s.length
                ? (t.splice(r - g, g), (r -= g))
                : 0 === a.length
                ? (t.splice(r - g, g, [1, s]), (r = r - g + 1))
                : 0 === s.length
                ? (t.splice(r - g, g, [u, a]), (r = r - g + 1))
                : (t.splice(r - g, g, [u, a], [1, s]), (r = r - g + 2))
            }
            0 !== r && 0 === t[r - 1][0]
              ? ((t[r - 1][1] += t[r][1]), t.splice(r, 1))
              : r++,
              (i = 0),
              (o = 0),
              (a = ''),
              (s = '')
        }
    '' === t[t.length - 1][1] && t.pop()
    var y = !1
    for (r = 1; r < t.length - 1; )
      0 === t[r - 1][0] &&
        0 === t[r + 1][0] &&
        (t[r][1].substring(t[r][1].length - t[r - 1][1].length) === t[r - 1][1]
          ? ((t[r][1] =
              t[r - 1][1] +
              t[r][1].substring(0, t[r][1].length - t[r - 1][1].length)),
            (t[r + 1][1] = t[r - 1][1] + t[r + 1][1]),
            t.splice(r - 1, 1),
            (y = !0))
          : t[r][1].substring(0, t[r + 1][1].length) == t[r + 1][1] &&
            ((t[r - 1][1] += t[r + 1][1]),
            (t[r][1] = t[r][1].substring(t[r + 1][1].length) + t[r + 1][1]),
            t.splice(r + 1, 1),
            (y = !0))),
        r++
    y && f(t, e)
  }
  function h(t) {
    return t >= 55296 && t <= 56319
  }
  function p(t) {
    return t >= 56320 && t <= 57343
  }
  function d(t) {
    return p(t.charCodeAt(0))
  }
  function b(t) {
    return h(t.charCodeAt(t.length - 1))
  }
  function v(t, e, n, r) {
    return b(t) || d(r)
      ? null
      : (function (t) {
          for (var e = [], n = 0; n < t.length; n++)
            t[n][1].length > 0 && e.push(t[n])
          return e
        })([
          [0, t],
          [u, e],
          [1, n],
          [0, r],
        ])
  }
  function g(t, e, n) {
    return a(t, e, n, !0)
  }
  ;(g.INSERT = 1), (g.DELETE = u), (g.EQUAL = 0)
  var y = g,
    _ = { exports: {} }
  !(function (t, e) {
    var n = '__lodash_hash_undefined__',
      r = 9007199254740991,
      o = '[object Arguments]',
      u = '[object Boolean]',
      a = '[object Date]',
      s = '[object Function]',
      l = '[object GeneratorFunction]',
      c = '[object Map]',
      f = '[object Number]',
      h = '[object Object]',
      p = '[object Promise]',
      d = '[object RegExp]',
      b = '[object Set]',
      v = '[object String]',
      g = '[object Symbol]',
      y = '[object WeakMap]',
      _ = '[object ArrayBuffer]',
      j = '[object DataView]',
      m = '[object Float32Array]',
      x = '[object Float64Array]',
      w = '[object Int8Array]',
      O = '[object Int16Array]',
      A = '[object Int32Array]',
      k = '[object Uint8Array]',
      T = '[object Uint8ClampedArray]',
      M = '[object Uint16Array]',
      L = '[object Uint32Array]',
      E = /\w*$/,
      S = /^\[object .+?Constructor\]$/,
      z = /^(?:0|[1-9]\d*)$/,
      C = {}
    ;(C[o] =
      C['[object Array]'] =
      C[_] =
      C[j] =
      C[u] =
      C[a] =
      C[m] =
      C[x] =
      C[w] =
      C[O] =
      C[A] =
      C[c] =
      C[f] =
      C[h] =
      C[d] =
      C[b] =
      C[v] =
      C[g] =
      C[k] =
      C[T] =
      C[M] =
      C[L] =
        !0),
      (C['[object Error]'] = C[s] = C[y] = !1)
    var P = 'object' == typeof self && self && self.Object === Object && self,
      $ =
        ('object' == typeof i && i && i.Object === Object && i) ||
        P ||
        Function('return this')(),
      q = e && !e.nodeType && e,
      N = q && t && !t.nodeType && t,
      D = N && N.exports === q
    function F(t, e) {
      return t.set(e[0], e[1]), t
    }
    function I(t, e) {
      return t.add(e), t
    }
    function U(t, e, n, r) {
      var o = -1,
        i = t ? t.length : 0
      for (r && i && (n = t[++o]); ++o < i; ) n = e(n, t[o], o, t)
      return n
    }
    function B(t) {
      var e = !1
      if (null != t && 'function' != typeof t.toString)
        try {
          e = !!(t + '')
        } catch (n) {}
      return e
    }
    function R(t) {
      var e = -1,
        n = Array(t.size)
      return (
        t.forEach(function (t, r) {
          n[++e] = [r, t]
        }),
        n
      )
    }
    function Q(t, e) {
      return function (n) {
        return t(e(n))
      }
    }
    function V(t) {
      var e = -1,
        n = Array(t.size)
      return (
        t.forEach(function (t) {
          n[++e] = t
        }),
        n
      )
    }
    var H,
      W = Array.prototype,
      G = Function.prototype,
      J = Object.prototype,
      K = $['__core-js_shared__'],
      X = (H = /[^.]+$/.exec((K && K.keys && K.keys.IE_PROTO) || ''))
        ? 'Symbol(src)_1.' + H
        : '',
      Y = G.toString,
      Z = J.hasOwnProperty,
      tt = J.toString,
      et = RegExp(
        '^' +
          Y.call(Z)
            .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              '$1.*?'
            ) +
          '$'
      ),
      nt = D ? $.Buffer : void 0,
      rt = $.Symbol,
      ot = $.Uint8Array,
      it = Q(Object.getPrototypeOf, Object),
      ut = Object.create,
      at = J.propertyIsEnumerable,
      st = W.splice,
      lt = Object.getOwnPropertySymbols,
      ct = nt ? nt.isBuffer : void 0,
      ft = Q(Object.keys, Object),
      ht = Nt($, 'DataView'),
      pt = Nt($, 'Map'),
      dt = Nt($, 'Promise'),
      bt = Nt($, 'Set'),
      vt = Nt($, 'WeakMap'),
      gt = Nt(Object, 'create'),
      yt = Bt(ht),
      _t = Bt(pt),
      jt = Bt(dt),
      mt = Bt(bt),
      xt = Bt(vt),
      wt = rt ? rt.prototype : void 0,
      Ot = wt ? wt.valueOf : void 0
    function At(t) {
      var e = -1,
        n = t ? t.length : 0
      for (this.clear(); ++e < n; ) {
        var r = t[e]
        this.set(r[0], r[1])
      }
    }
    function kt(t) {
      var e = -1,
        n = t ? t.length : 0
      for (this.clear(); ++e < n; ) {
        var r = t[e]
        this.set(r[0], r[1])
      }
    }
    function Tt(t) {
      var e = -1,
        n = t ? t.length : 0
      for (this.clear(); ++e < n; ) {
        var r = t[e]
        this.set(r[0], r[1])
      }
    }
    function Mt(t) {
      this.__data__ = new kt(t)
    }
    function Lt(t, e) {
      var n =
          Qt(t) ||
          (function (t) {
            return (
              (function (t) {
                return (
                  (function (t) {
                    return !!t && 'object' == typeof t
                  })(t) && Vt(t)
                )
              })(t) &&
              Z.call(t, 'callee') &&
              (!at.call(t, 'callee') || tt.call(t) == o)
            )
          })(t)
            ? (function (t, e) {
                for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n)
                return r
              })(t.length, String)
            : [],
        r = n.length,
        i = !!r
      for (var u in t)
        (!e && !Z.call(t, u)) || (i && ('length' == u || It(u, r))) || n.push(u)
      return n
    }
    function Et(t, e, n) {
      var r = t[e]
      ;(Z.call(t, e) && Rt(r, n) && (void 0 !== n || e in t)) || (t[e] = n)
    }
    function St(t, e) {
      for (var n = t.length; n--; ) if (Rt(t[n][0], e)) return n
      return -1
    }
    function zt(t, e, n, r, i, p, y) {
      var S
      if ((r && (S = p ? r(t, i, p, y) : r(t)), void 0 !== S)) return S
      if (!Gt(t)) return t
      var z = Qt(t)
      if (z) {
        if (
          ((S = (function (t) {
            var e = t.length,
              n = t.constructor(e)
            e &&
              'string' == typeof t[0] &&
              Z.call(t, 'index') &&
              ((n.index = t.index), (n.input = t.input))
            return n
          })(t)),
          !e)
        )
          return (function (t, e) {
            var n = -1,
              r = t.length
            e || (e = Array(r))
            for (; ++n < r; ) e[n] = t[n]
            return e
          })(t, S)
      } else {
        var P = Ft(t),
          $ = P == s || P == l
        if (Ht(t))
          return (function (t, e) {
            if (e) return t.slice()
            var n = new t.constructor(t.length)
            return t.copy(n), n
          })(t, e)
        if (P == h || P == o || ($ && !p)) {
          if (B(t)) return p ? t : {}
          if (
            ((S = (function (t) {
              return 'function' != typeof t.constructor || Ut(t)
                ? {}
                : ((e = it(t)), Gt(e) ? ut(e) : {})
              var e
            })($ ? {} : t)),
            !e)
          )
            return (function (t, e) {
              return $t(t, Dt(t), e)
            })(
              t,
              (function (t, e) {
                return t && $t(e, Jt(e), t)
              })(S, t)
            )
        } else {
          if (!C[P]) return p ? t : {}
          S = (function (t, e, n, r) {
            var o = t.constructor
            switch (e) {
              case _:
                return Pt(t)
              case u:
              case a:
                return new o(+t)
              case j:
                return (function (t, e) {
                  var n = e ? Pt(t.buffer) : t.buffer
                  return new t.constructor(n, t.byteOffset, t.byteLength)
                })(t, r)
              case m:
              case x:
              case w:
              case O:
              case A:
              case k:
              case T:
              case M:
              case L:
                return (function (t, e) {
                  var n = e ? Pt(t.buffer) : t.buffer
                  return new t.constructor(n, t.byteOffset, t.length)
                })(t, r)
              case c:
                return (function (t, e, n) {
                  return U(e ? n(R(t), !0) : R(t), F, new t.constructor())
                })(t, r, n)
              case f:
              case v:
                return new o(t)
              case d:
                return (function (t) {
                  var e = new t.constructor(t.source, E.exec(t))
                  return (e.lastIndex = t.lastIndex), e
                })(t)
              case b:
                return (function (t, e, n) {
                  return U(e ? n(V(t), !0) : V(t), I, new t.constructor())
                })(t, r, n)
              case g:
                return (i = t), Ot ? Object(Ot.call(i)) : {}
            }
            var i
          })(t, P, zt, e)
        }
      }
      y || (y = new Mt())
      var q = y.get(t)
      if (q) return q
      if ((y.set(t, S), !z))
        var N = n
          ? (function (t) {
              return (function (t, e, n) {
                var r = e(t)
                return Qt(t)
                  ? r
                  : (function (t, e) {
                      for (var n = -1, r = e.length, o = t.length; ++n < r; )
                        t[o + n] = e[n]
                      return t
                    })(r, n(t))
              })(t, Jt, Dt)
            })(t)
          : Jt(t)
      return (
        (function (t, e) {
          for (
            var n = -1, r = t ? t.length : 0;
            ++n < r && !1 !== e(t[n], n, t);

          );
        })(N || t, function (o, i) {
          N && (o = t[(i = o)]), Et(S, i, zt(o, e, n, r, i, t, y))
        }),
        S
      )
    }
    function Ct(t) {
      return (
        !(!Gt(t) || ((e = t), X && X in e)) &&
        (Wt(t) || B(t) ? et : S).test(Bt(t))
      )
      var e
    }
    function Pt(t) {
      var e = new t.constructor(t.byteLength)
      return new ot(e).set(new ot(t)), e
    }
    function $t(t, e, n, r) {
      n || (n = {})
      for (var o = -1, i = e.length; ++o < i; ) {
        var u = e[o],
          a = r ? r(n[u], t[u], u, n, t) : void 0
        Et(n, u, void 0 === a ? t[u] : a)
      }
      return n
    }
    function qt(t, e) {
      var n,
        r,
        o = t.__data__
      return (
        'string' == (r = typeof (n = e)) ||
        'number' == r ||
        'symbol' == r ||
        'boolean' == r
          ? '__proto__' !== n
          : null === n
      )
        ? o['string' == typeof e ? 'string' : 'hash']
        : o.map
    }
    function Nt(t, e) {
      var n = (function (t, e) {
        return null == t ? void 0 : t[e]
      })(t, e)
      return Ct(n) ? n : void 0
    }
    ;(At.prototype.clear = function () {
      this.__data__ = gt ? gt(null) : {}
    }),
      (At.prototype.delete = function (t) {
        return this.has(t) && delete this.__data__[t]
      }),
      (At.prototype.get = function (t) {
        var e = this.__data__
        if (gt) {
          var r = e[t]
          return r === n ? void 0 : r
        }
        return Z.call(e, t) ? e[t] : void 0
      }),
      (At.prototype.has = function (t) {
        var e = this.__data__
        return gt ? void 0 !== e[t] : Z.call(e, t)
      }),
      (At.prototype.set = function (t, e) {
        return (this.__data__[t] = gt && void 0 === e ? n : e), this
      }),
      (kt.prototype.clear = function () {
        this.__data__ = []
      }),
      (kt.prototype.delete = function (t) {
        var e = this.__data__,
          n = St(e, t)
        return !(n < 0) && (n == e.length - 1 ? e.pop() : st.call(e, n, 1), !0)
      }),
      (kt.prototype.get = function (t) {
        var e = this.__data__,
          n = St(e, t)
        return n < 0 ? void 0 : e[n][1]
      }),
      (kt.prototype.has = function (t) {
        return St(this.__data__, t) > -1
      }),
      (kt.prototype.set = function (t, e) {
        var n = this.__data__,
          r = St(n, t)
        return r < 0 ? n.push([t, e]) : (n[r][1] = e), this
      }),
      (Tt.prototype.clear = function () {
        this.__data__ = {
          hash: new At(),
          map: new (pt || kt)(),
          string: new At(),
        }
      }),
      (Tt.prototype.delete = function (t) {
        return qt(this, t).delete(t)
      }),
      (Tt.prototype.get = function (t) {
        return qt(this, t).get(t)
      }),
      (Tt.prototype.has = function (t) {
        return qt(this, t).has(t)
      }),
      (Tt.prototype.set = function (t, e) {
        return qt(this, t).set(t, e), this
      }),
      (Mt.prototype.clear = function () {
        this.__data__ = new kt()
      }),
      (Mt.prototype.delete = function (t) {
        return this.__data__.delete(t)
      }),
      (Mt.prototype.get = function (t) {
        return this.__data__.get(t)
      }),
      (Mt.prototype.has = function (t) {
        return this.__data__.has(t)
      }),
      (Mt.prototype.set = function (t, e) {
        var n = this.__data__
        if (n instanceof kt) {
          var r = n.__data__
          if (!pt || r.length < 199) return r.push([t, e]), this
          n = this.__data__ = new Tt(r)
        }
        return n.set(t, e), this
      })
    var Dt = lt
        ? Q(lt, Object)
        : function () {
            return []
          },
      Ft = function (t) {
        return tt.call(t)
      }
    function It(t, e) {
      return (
        !!(e = null == e ? r : e) &&
        ('number' == typeof t || z.test(t)) &&
        t > -1 &&
        t % 1 == 0 &&
        t < e
      )
    }
    function Ut(t) {
      var e = t && t.constructor
      return t === (('function' == typeof e && e.prototype) || J)
    }
    function Bt(t) {
      if (null != t) {
        try {
          return Y.call(t)
        } catch (e) {}
        try {
          return t + ''
        } catch (e) {}
      }
      return ''
    }
    function Rt(t, e) {
      return t === e || (t != t && e != e)
    }
    ;((ht && Ft(new ht(new ArrayBuffer(1))) != j) ||
      (pt && Ft(new pt()) != c) ||
      (dt && Ft(dt.resolve()) != p) ||
      (bt && Ft(new bt()) != b) ||
      (vt && Ft(new vt()) != y)) &&
      (Ft = function (t) {
        var e = tt.call(t),
          n = e == h ? t.constructor : void 0,
          r = n ? Bt(n) : void 0
        if (r)
          switch (r) {
            case yt:
              return j
            case _t:
              return c
            case jt:
              return p
            case mt:
              return b
            case xt:
              return y
          }
        return e
      })
    var Qt = Array.isArray
    function Vt(t) {
      return (
        null != t &&
        (function (t) {
          return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= r
        })(t.length) &&
        !Wt(t)
      )
    }
    var Ht =
      ct ||
      function () {
        return !1
      }
    function Wt(t) {
      var e = Gt(t) ? tt.call(t) : ''
      return e == s || e == l
    }
    function Gt(t) {
      var e = typeof t
      return !!t && ('object' == e || 'function' == e)
    }
    function Jt(t) {
      return Vt(t)
        ? Lt(t)
        : (function (t) {
            if (!Ut(t)) return ft(t)
            var e = []
            for (var n in Object(t))
              Z.call(t, n) && 'constructor' != n && e.push(n)
            return e
          })(t)
    }
    t.exports = function (t) {
      return zt(t, !0, !0)
    }
  })(_, _.exports)
  var j = { exports: {} }
  !(function (t, e) {
    var n = '__lodash_hash_undefined__',
      r = 9007199254740991,
      o = '[object Arguments]',
      u = '[object Array]',
      a = '[object Boolean]',
      s = '[object Date]',
      l = '[object Error]',
      c = '[object Function]',
      f = '[object Map]',
      h = '[object Number]',
      p = '[object Object]',
      d = '[object Promise]',
      b = '[object RegExp]',
      v = '[object Set]',
      g = '[object String]',
      y = '[object Symbol]',
      _ = '[object WeakMap]',
      j = '[object ArrayBuffer]',
      m = '[object DataView]',
      x = /^\[object .+?Constructor\]$/,
      w = /^(?:0|[1-9]\d*)$/,
      O = {}
    ;(O['[object Float32Array]'] =
      O['[object Float64Array]'] =
      O['[object Int8Array]'] =
      O['[object Int16Array]'] =
      O['[object Int32Array]'] =
      O['[object Uint8Array]'] =
      O['[object Uint8ClampedArray]'] =
      O['[object Uint16Array]'] =
      O['[object Uint32Array]'] =
        !0),
      (O[o] =
        O[u] =
        O[j] =
        O[a] =
        O[m] =
        O[s] =
        O[l] =
        O[c] =
        O[f] =
        O[h] =
        O[p] =
        O[b] =
        O[v] =
        O[g] =
        O[_] =
          !1)
    var A = 'object' == typeof i && i && i.Object === Object && i,
      k = 'object' == typeof self && self && self.Object === Object && self,
      T = A || k || Function('return this')(),
      M = e && !e.nodeType && e,
      L = M && t && !t.nodeType && t,
      E = L && L.exports === M,
      S = E && A.process,
      z = (function () {
        try {
          return S && S.binding && S.binding('util')
        } catch (t) {}
      })(),
      C = z && z.isTypedArray
    function P(t, e) {
      for (var n = -1, r = null == t ? 0 : t.length; ++n < r; )
        if (e(t[n], n, t)) return !0
      return !1
    }
    function $(t) {
      var e = -1,
        n = Array(t.size)
      return (
        t.forEach(function (t, r) {
          n[++e] = [r, t]
        }),
        n
      )
    }
    function q(t) {
      var e = -1,
        n = Array(t.size)
      return (
        t.forEach(function (t) {
          n[++e] = t
        }),
        n
      )
    }
    var N,
      D,
      F,
      I = Array.prototype,
      U = Object.prototype,
      B = T['__core-js_shared__'],
      R = Function.prototype.toString,
      Q = U.hasOwnProperty,
      V = (N = /[^.]+$/.exec((B && B.keys && B.keys.IE_PROTO) || ''))
        ? 'Symbol(src)_1.' + N
        : '',
      H = U.toString,
      W = RegExp(
        '^' +
          R.call(Q)
            .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              '$1.*?'
            ) +
          '$'
      ),
      G = E ? T.Buffer : void 0,
      J = T.Symbol,
      K = T.Uint8Array,
      X = U.propertyIsEnumerable,
      Y = I.splice,
      Z = J ? J.toStringTag : void 0,
      tt = Object.getOwnPropertySymbols,
      et = G ? G.isBuffer : void 0,
      nt =
        ((D = Object.keys),
        (F = Object),
        function (t) {
          return D(F(t))
        }),
      rt = St(T, 'DataView'),
      ot = St(T, 'Map'),
      it = St(T, 'Promise'),
      ut = St(T, 'Set'),
      at = St(T, 'WeakMap'),
      st = St(Object, 'create'),
      lt = $t(rt),
      ct = $t(ot),
      ft = $t(it),
      ht = $t(ut),
      pt = $t(at),
      dt = J ? J.prototype : void 0,
      bt = dt ? dt.valueOf : void 0
    function vt(t) {
      var e = -1,
        n = null == t ? 0 : t.length
      for (this.clear(); ++e < n; ) {
        var r = t[e]
        this.set(r[0], r[1])
      }
    }
    function gt(t) {
      var e = -1,
        n = null == t ? 0 : t.length
      for (this.clear(); ++e < n; ) {
        var r = t[e]
        this.set(r[0], r[1])
      }
    }
    function yt(t) {
      var e = -1,
        n = null == t ? 0 : t.length
      for (this.clear(); ++e < n; ) {
        var r = t[e]
        this.set(r[0], r[1])
      }
    }
    function _t(t) {
      var e = -1,
        n = null == t ? 0 : t.length
      for (this.__data__ = new yt(); ++e < n; ) this.add(t[e])
    }
    function jt(t) {
      var e = (this.__data__ = new gt(t))
      this.size = e.size
    }
    function mt(t, e) {
      var n = Dt(t),
        r = !n && Nt(t),
        o = !n && !r && Ft(t),
        i = !n && !r && !o && Qt(t),
        u = n || r || o || i,
        a = u
          ? (function (t, e) {
              for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n)
              return r
            })(t.length, String)
          : [],
        s = a.length
      for (var l in t)
        (!e && !Q.call(t, l)) ||
          (u &&
            ('length' == l ||
              (o && ('offset' == l || 'parent' == l)) ||
              (i &&
                ('buffer' == l || 'byteLength' == l || 'byteOffset' == l)) ||
              Pt(l, s))) ||
          a.push(l)
      return a
    }
    function xt(t, e) {
      for (var n = t.length; n--; ) if (qt(t[n][0], e)) return n
      return -1
    }
    function wt(t) {
      return null == t
        ? void 0 === t
          ? '[object Undefined]'
          : '[object Null]'
        : Z && Z in Object(t)
        ? (function (t) {
            var e = Q.call(t, Z),
              n = t[Z]
            try {
              t[Z] = void 0
              var r = !0
            } catch (i) {}
            var o = H.call(t)
            r && (e ? (t[Z] = n) : delete t[Z])
            return o
          })(t)
        : (function (t) {
            return H.call(t)
          })(t)
    }
    function Ot(t) {
      return Rt(t) && wt(t) == o
    }
    function At(t, e, n, r, i) {
      return (
        t === e ||
        (null == t || null == e || (!Rt(t) && !Rt(e))
          ? t != t && e != e
          : (function (t, e, n, r, i, c) {
              var d = Dt(t),
                _ = Dt(e),
                x = d ? u : Ct(t),
                w = _ ? u : Ct(e),
                O = (x = x == o ? p : x) == p,
                A = (w = w == o ? p : w) == p,
                k = x == w
              if (k && Ft(t)) {
                if (!Ft(e)) return !1
                ;(d = !0), (O = !1)
              }
              if (k && !O)
                return (
                  c || (c = new jt()),
                  d || Qt(t)
                    ? Mt(t, e, n, r, i, c)
                    : (function (t, e, n, r, o, i, u) {
                        switch (n) {
                          case m:
                            if (
                              t.byteLength != e.byteLength ||
                              t.byteOffset != e.byteOffset
                            )
                              return !1
                            ;(t = t.buffer), (e = e.buffer)
                          case j:
                            return !(
                              t.byteLength != e.byteLength ||
                              !i(new K(t), new K(e))
                            )
                          case a:
                          case s:
                          case h:
                            return qt(+t, +e)
                          case l:
                            return t.name == e.name && t.message == e.message
                          case b:
                          case g:
                            return t == e + ''
                          case f:
                            var c = $
                          case v:
                            if ((c || (c = q), t.size != e.size && !(1 & r)))
                              return !1
                            var p = u.get(t)
                            if (p) return p == e
                            ;(r |= 2), u.set(t, e)
                            var d = Mt(c(t), c(e), r, o, i, u)
                            return u.delete(t), d
                          case y:
                            if (bt) return bt.call(t) == bt.call(e)
                        }
                        return !1
                      })(t, e, x, n, r, i, c)
                )
              if (!(1 & n)) {
                var T = O && Q.call(t, '__wrapped__'),
                  M = A && Q.call(e, '__wrapped__')
                if (T || M) {
                  var L = T ? t.value() : t,
                    E = M ? e.value() : e
                  return c || (c = new jt()), i(L, E, n, r, c)
                }
              }
              if (!k) return !1
              return (
                c || (c = new jt()),
                (function (t, e, n, r, o, i) {
                  var u = 1 & n,
                    a = Lt(t),
                    s = a.length,
                    l = Lt(e)
                  if (s != l.length && !u) return !1
                  var c = s
                  for (; c--; ) {
                    var f = a[c]
                    if (!(u ? f in e : Q.call(e, f))) return !1
                  }
                  var h = i.get(t)
                  if (h && i.get(e)) return h == e
                  var p = !0
                  i.set(t, e), i.set(e, t)
                  var d = u
                  for (; ++c < s; ) {
                    var b = t[(f = a[c])],
                      v = e[f]
                    if (r) var g = u ? r(v, b, f, e, t, i) : r(b, v, f, t, e, i)
                    if (!(void 0 === g ? b === v || o(b, v, n, r, i) : g)) {
                      p = !1
                      break
                    }
                    d || (d = 'constructor' == f)
                  }
                  if (p && !d) {
                    var y = t.constructor,
                      _ = e.constructor
                    y == _ ||
                      !('constructor' in t) ||
                      !('constructor' in e) ||
                      ('function' == typeof y &&
                        y instanceof y &&
                        'function' == typeof _ &&
                        _ instanceof _) ||
                      (p = !1)
                  }
                  return i.delete(t), i.delete(e), p
                })(t, e, n, r, i, c)
              )
            })(t, e, n, r, At, i))
      )
    }
    function kt(t) {
      return (
        !(
          !Bt(t) ||
          (function (t) {
            return !!V && V in t
          })(t)
        ) && (It(t) ? W : x).test($t(t))
      )
    }
    function Tt(t) {
      if (
        (e = t) !==
        (('function' == typeof (n = e && e.constructor) && n.prototype) || U)
      )
        return nt(t)
      var e,
        n,
        r = []
      for (var o in Object(t)) Q.call(t, o) && 'constructor' != o && r.push(o)
      return r
    }
    function Mt(t, e, n, r, o, i) {
      var u = 1 & n,
        a = t.length,
        s = e.length
      if (a != s && !(u && s > a)) return !1
      var l = i.get(t)
      if (l && i.get(e)) return l == e
      var c = -1,
        f = !0,
        h = 2 & n ? new _t() : void 0
      for (i.set(t, e), i.set(e, t); ++c < a; ) {
        var p = t[c],
          d = e[c]
        if (r) var b = u ? r(d, p, c, e, t, i) : r(p, d, c, t, e, i)
        if (void 0 !== b) {
          if (b) continue
          f = !1
          break
        }
        if (h) {
          if (
            !P(e, function (t, e) {
              if (!h.has(e) && (p === t || o(p, t, n, r, i))) return h.push(e)
            })
          ) {
            f = !1
            break
          }
        } else if (p !== d && !o(p, d, n, r, i)) {
          f = !1
          break
        }
      }
      return i.delete(t), i.delete(e), f
    }
    function Lt(t) {
      return (function (t, e, n) {
        var r = e(t)
        return Dt(t)
          ? r
          : (function (t, e) {
              for (var n = -1, r = e.length, o = t.length; ++n < r; )
                t[o + n] = e[n]
              return t
            })(r, n(t))
      })(t, Vt, zt)
    }
    function Et(t, e) {
      var n,
        r,
        o = t.__data__
      return (
        'string' == (r = typeof (n = e)) ||
        'number' == r ||
        'symbol' == r ||
        'boolean' == r
          ? '__proto__' !== n
          : null === n
      )
        ? o['string' == typeof e ? 'string' : 'hash']
        : o.map
    }
    function St(t, e) {
      var n = (function (t, e) {
        return null == t ? void 0 : t[e]
      })(t, e)
      return kt(n) ? n : void 0
    }
    ;(vt.prototype.clear = function () {
      ;(this.__data__ = st ? st(null) : {}), (this.size = 0)
    }),
      (vt.prototype.delete = function (t) {
        var e = this.has(t) && delete this.__data__[t]
        return (this.size -= e ? 1 : 0), e
      }),
      (vt.prototype.get = function (t) {
        var e = this.__data__
        if (st) {
          var r = e[t]
          return r === n ? void 0 : r
        }
        return Q.call(e, t) ? e[t] : void 0
      }),
      (vt.prototype.has = function (t) {
        var e = this.__data__
        return st ? void 0 !== e[t] : Q.call(e, t)
      }),
      (vt.prototype.set = function (t, e) {
        var r = this.__data__
        return (
          (this.size += this.has(t) ? 0 : 1),
          (r[t] = st && void 0 === e ? n : e),
          this
        )
      }),
      (gt.prototype.clear = function () {
        ;(this.__data__ = []), (this.size = 0)
      }),
      (gt.prototype.delete = function (t) {
        var e = this.__data__,
          n = xt(e, t)
        return (
          !(n < 0) &&
          (n == e.length - 1 ? e.pop() : Y.call(e, n, 1), --this.size, !0)
        )
      }),
      (gt.prototype.get = function (t) {
        var e = this.__data__,
          n = xt(e, t)
        return n < 0 ? void 0 : e[n][1]
      }),
      (gt.prototype.has = function (t) {
        return xt(this.__data__, t) > -1
      }),
      (gt.prototype.set = function (t, e) {
        var n = this.__data__,
          r = xt(n, t)
        return r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this
      }),
      (yt.prototype.clear = function () {
        ;(this.size = 0),
          (this.__data__ = {
            hash: new vt(),
            map: new (ot || gt)(),
            string: new vt(),
          })
      }),
      (yt.prototype.delete = function (t) {
        var e = Et(this, t).delete(t)
        return (this.size -= e ? 1 : 0), e
      }),
      (yt.prototype.get = function (t) {
        return Et(this, t).get(t)
      }),
      (yt.prototype.has = function (t) {
        return Et(this, t).has(t)
      }),
      (yt.prototype.set = function (t, e) {
        var n = Et(this, t),
          r = n.size
        return n.set(t, e), (this.size += n.size == r ? 0 : 1), this
      }),
      (_t.prototype.add = _t.prototype.push =
        function (t) {
          return this.__data__.set(t, n), this
        }),
      (_t.prototype.has = function (t) {
        return this.__data__.has(t)
      }),
      (jt.prototype.clear = function () {
        ;(this.__data__ = new gt()), (this.size = 0)
      }),
      (jt.prototype.delete = function (t) {
        var e = this.__data__,
          n = e.delete(t)
        return (this.size = e.size), n
      }),
      (jt.prototype.get = function (t) {
        return this.__data__.get(t)
      }),
      (jt.prototype.has = function (t) {
        return this.__data__.has(t)
      }),
      (jt.prototype.set = function (t, e) {
        var n = this.__data__
        if (n instanceof gt) {
          var r = n.__data__
          if (!ot || r.length < 199)
            return r.push([t, e]), (this.size = ++n.size), this
          n = this.__data__ = new yt(r)
        }
        return n.set(t, e), (this.size = n.size), this
      })
    var zt = tt
        ? function (t) {
            return null == t
              ? []
              : ((t = Object(t)),
                (function (t, e) {
                  for (
                    var n = -1, r = null == t ? 0 : t.length, o = 0, i = [];
                    ++n < r;

                  ) {
                    var u = t[n]
                    e(u, n, t) && (i[o++] = u)
                  }
                  return i
                })(tt(t), function (e) {
                  return X.call(t, e)
                }))
          }
        : function () {
            return []
          },
      Ct = wt
    function Pt(t, e) {
      return (
        !!(e = null == e ? r : e) &&
        ('number' == typeof t || w.test(t)) &&
        t > -1 &&
        t % 1 == 0 &&
        t < e
      )
    }
    function $t(t) {
      if (null != t) {
        try {
          return R.call(t)
        } catch (e) {}
        try {
          return t + ''
        } catch (e) {}
      }
      return ''
    }
    function qt(t, e) {
      return t === e || (t != t && e != e)
    }
    ;((rt && Ct(new rt(new ArrayBuffer(1))) != m) ||
      (ot && Ct(new ot()) != f) ||
      (it && Ct(it.resolve()) != d) ||
      (ut && Ct(new ut()) != v) ||
      (at && Ct(new at()) != _)) &&
      (Ct = function (t) {
        var e = wt(t),
          n = e == p ? t.constructor : void 0,
          r = n ? $t(n) : ''
        if (r)
          switch (r) {
            case lt:
              return m
            case ct:
              return f
            case ft:
              return d
            case ht:
              return v
            case pt:
              return _
          }
        return e
      })
    var Nt = Ot(
        (function () {
          return arguments
        })()
      )
        ? Ot
        : function (t) {
            return Rt(t) && Q.call(t, 'callee') && !X.call(t, 'callee')
          },
      Dt = Array.isArray
    var Ft =
      et ||
      function () {
        return !1
      }
    function It(t) {
      if (!Bt(t)) return !1
      var e = wt(t)
      return (
        e == c ||
        '[object GeneratorFunction]' == e ||
        '[object AsyncFunction]' == e ||
        '[object Proxy]' == e
      )
    }
    function Ut(t) {
      return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= r
    }
    function Bt(t) {
      var e = typeof t
      return null != t && ('object' == e || 'function' == e)
    }
    function Rt(t) {
      return null != t && 'object' == typeof t
    }
    var Qt = C
      ? (function (t) {
          return function (e) {
            return t(e)
          }
        })(C)
      : function (t) {
          return Rt(t) && Ut(t.length) && !!O[wt(t)]
        }
    function Vt(t) {
      return null != (e = t) && Ut(e.length) && !It(e) ? mt(t) : Tt(t)
      var e
    }
    t.exports = function (t, e) {
      return At(t, e)
    }
  })(j, j.exports)
  var m = {},
    x =
      (i && i.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      }
  Object.defineProperty(m, '__esModule', { value: !0 })
  var w,
    O = x(_.exports),
    A = x(j.exports)
  !(function (t) {
    ;(t.compose = function (t, e, n) {
      void 0 === t && (t = {}),
        void 0 === e && (e = {}),
        'object' != typeof t && (t = {}),
        'object' != typeof e && (e = {})
      var r = O.default(e)
      for (var o in (n ||
        (r = Object.keys(r).reduce(function (t, e) {
          return null != r[e] && (t[e] = r[e]), t
        }, {})),
      t))
        void 0 !== t[o] && void 0 === e[o] && (r[o] = t[o])
      return Object.keys(r).length > 0 ? r : void 0
    }),
      (t.diff = function (t, e) {
        void 0 === t && (t = {}),
          void 0 === e && (e = {}),
          'object' != typeof t && (t = {}),
          'object' != typeof e && (e = {})
        var n = Object.keys(t)
          .concat(Object.keys(e))
          .reduce(function (n, r) {
            return (
              A.default(t[r], e[r]) || (n[r] = void 0 === e[r] ? null : e[r]), n
            )
          }, {})
        return Object.keys(n).length > 0 ? n : void 0
      }),
      (t.invert = function (t, e) {
        void 0 === t && (t = {}), void 0 === e && (e = {}), (t = t || {})
        var n = Object.keys(e).reduce(function (n, r) {
          return e[r] !== t[r] && void 0 !== t[r] && (n[r] = e[r]), n
        }, {})
        return Object.keys(t).reduce(function (n, r) {
          return t[r] !== e[r] && void 0 === e[r] && (n[r] = null), n
        }, n)
      }),
      (t.transform = function (t, e, n) {
        if ((void 0 === n && (n = !1), 'object' != typeof t)) return e
        if ('object' == typeof e) {
          if (!n) return e
          var r = Object.keys(e).reduce(function (n, r) {
            return void 0 === t[r] && (n[r] = e[r]), n
          }, {})
          return Object.keys(r).length > 0 ? r : void 0
        }
      })
  })(w || (w = {})),
    (m.default = w)
  var k,
    T,
    M = {},
    L = {}
  function E() {
    if (T) return M
    T = 1
    var t =
      (i && i.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      }
    Object.defineProperty(M, '__esModule', { value: !0 })
    var e,
      n = t(
        (function () {
          if (k) return L
          k = 1
          var t =
            (i && i.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t }
            }
          Object.defineProperty(L, '__esModule', { value: !0 })
          var e = t(E()),
            n = (function () {
              function t(t) {
                ;(this.ops = t), (this.index = 0), (this.offset = 0)
              }
              return (
                (t.prototype.hasNext = function () {
                  return this.peekLength() < 1 / 0
                }),
                (t.prototype.next = function (t) {
                  t || (t = 1 / 0)
                  var n = this.ops[this.index]
                  if (n) {
                    var r = this.offset,
                      o = e.default.length(n)
                    if (
                      (t >= o - r
                        ? ((t = o - r), (this.index += 1), (this.offset = 0))
                        : (this.offset += t),
                      'number' == typeof n.delete)
                    )
                      return { delete: t }
                    var i = {}
                    return (
                      n.attributes && (i.attributes = n.attributes),
                      'number' == typeof n.retain
                        ? (i.retain = t)
                        : (i.insert =
                            'string' == typeof n.insert
                              ? n.insert.substr(r, t)
                              : n.insert),
                      i
                    )
                  }
                  return { retain: 1 / 0 }
                }),
                (t.prototype.peek = function () {
                  return this.ops[this.index]
                }),
                (t.prototype.peekLength = function () {
                  return this.ops[this.index]
                    ? e.default.length(this.ops[this.index]) - this.offset
                    : 1 / 0
                }),
                (t.prototype.peekType = function () {
                  return this.ops[this.index]
                    ? 'number' == typeof this.ops[this.index].delete
                      ? 'delete'
                      : 'number' == typeof this.ops[this.index].retain
                      ? 'retain'
                      : 'insert'
                    : 'retain'
                }),
                (t.prototype.rest = function () {
                  if (this.hasNext()) {
                    if (0 === this.offset) return this.ops.slice(this.index)
                    var t = this.offset,
                      e = this.index,
                      n = this.next(),
                      r = this.ops.slice(this.index)
                    return (this.offset = t), (this.index = e), [n].concat(r)
                  }
                  return []
                }),
                t
              )
            })()
          return (L.default = n), L
        })()
      )
    return (
      (function (t) {
        ;(t.iterator = function (t) {
          return new n.default(t)
        }),
          (t.length = function (t) {
            return 'number' == typeof t.delete
              ? t.delete
              : 'number' == typeof t.retain
              ? t.retain
              : 'string' == typeof t.insert
              ? t.insert.length
              : 1
          })
      })(e || (e = {})),
      (M.default = e),
      M
    )
  }
  var S =
      (i && i.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      },
    z = S(y),
    C = S(_.exports),
    P = S(j.exports),
    $ = S(m),
    q = S(E()),
    N = String.fromCharCode(0),
    D = (function () {
      function t(t) {
        this.ops = Array.isArray(t)
          ? t
          : null != t && Array.isArray(t.ops)
          ? t.ops
          : []
      }
      return (
        (t.prototype.insert = function (t, e) {
          var n = {}
          return 'string' == typeof t && 0 === t.length
            ? this
            : ((n.insert = t),
              null != e &&
                'object' == typeof e &&
                Object.keys(e).length > 0 &&
                (n.attributes = e),
              this.push(n))
        }),
        (t.prototype.delete = function (t) {
          return t <= 0 ? this : this.push({ delete: t })
        }),
        (t.prototype.retain = function (t, e) {
          if (t <= 0) return this
          var n = { retain: t }
          return (
            null != e &&
              'object' == typeof e &&
              Object.keys(e).length > 0 &&
              (n.attributes = e),
            this.push(n)
          )
        }),
        (t.prototype.push = function (t) {
          var e = this.ops.length,
            n = this.ops[e - 1]
          if (((t = C.default(t)), 'object' == typeof n)) {
            if ('number' == typeof t.delete && 'number' == typeof n.delete)
              return (this.ops[e - 1] = { delete: n.delete + t.delete }), this
            if (
              'number' == typeof n.delete &&
              null != t.insert &&
              'object' != typeof (n = this.ops[(e -= 1) - 1])
            )
              return this.ops.unshift(t), this
            if (P.default(t.attributes, n.attributes)) {
              if ('string' == typeof t.insert && 'string' == typeof n.insert)
                return (
                  (this.ops[e - 1] = { insert: n.insert + t.insert }),
                  'object' == typeof t.attributes &&
                    (this.ops[e - 1].attributes = t.attributes),
                  this
                )
              if ('number' == typeof t.retain && 'number' == typeof n.retain)
                return (
                  (this.ops[e - 1] = { retain: n.retain + t.retain }),
                  'object' == typeof t.attributes &&
                    (this.ops[e - 1].attributes = t.attributes),
                  this
                )
            }
          }
          return (
            e === this.ops.length ? this.ops.push(t) : this.ops.splice(e, 0, t),
            this
          )
        }),
        (t.prototype.chop = function () {
          var t = this.ops[this.ops.length - 1]
          return t && t.retain && !t.attributes && this.ops.pop(), this
        }),
        (t.prototype.filter = function (t) {
          return this.ops.filter(t)
        }),
        (t.prototype.forEach = function (t) {
          this.ops.forEach(t)
        }),
        (t.prototype.map = function (t) {
          return this.ops.map(t)
        }),
        (t.prototype.partition = function (t) {
          var e = [],
            n = []
          return (
            this.forEach(function (r) {
              ;(t(r) ? e : n).push(r)
            }),
            [e, n]
          )
        }),
        (t.prototype.reduce = function (t, e) {
          return this.ops.reduce(t, e)
        }),
        (t.prototype.changeLength = function () {
          return this.reduce(function (t, e) {
            return e.insert
              ? t + q.default.length(e)
              : e.delete
              ? t - e.delete
              : t
          }, 0)
        }),
        (t.prototype.length = function () {
          return this.reduce(function (t, e) {
            return t + q.default.length(e)
          }, 0)
        }),
        (t.prototype.slice = function (e, n) {
          void 0 === e && (e = 0), void 0 === n && (n = 1 / 0)
          for (
            var r = [], o = q.default.iterator(this.ops), i = 0;
            i < n && o.hasNext();

          ) {
            var u = void 0
            i < e ? (u = o.next(e - i)) : ((u = o.next(n - i)), r.push(u)),
              (i += q.default.length(u))
          }
          return new t(r)
        }),
        (t.prototype.compose = function (e) {
          var n = q.default.iterator(this.ops),
            r = q.default.iterator(e.ops),
            o = [],
            i = r.peek()
          if (
            null != i &&
            'number' == typeof i.retain &&
            null == i.attributes
          ) {
            for (
              var u = i.retain;
              'insert' === n.peekType() && n.peekLength() <= u;

            )
              (u -= n.peekLength()), o.push(n.next())
            i.retain - u > 0 && r.next(i.retain - u)
          }
          for (var a = new t(o); n.hasNext() || r.hasNext(); )
            if ('insert' === r.peekType()) a.push(r.next())
            else if ('delete' === n.peekType()) a.push(n.next())
            else {
              var s = Math.min(n.peekLength(), r.peekLength()),
                l = n.next(s),
                c = r.next(s)
              if ('number' == typeof c.retain) {
                var f = {}
                'number' == typeof l.retain
                  ? (f.retain = s)
                  : (f.insert = l.insert)
                var h = $.default.compose(
                  l.attributes,
                  c.attributes,
                  'number' == typeof l.retain
                )
                if (
                  (h && (f.attributes = h),
                  a.push(f),
                  !r.hasNext() && P.default(a.ops[a.ops.length - 1], f))
                ) {
                  var p = new t(n.rest())
                  return a.concat(p).chop()
                }
              } else
                'number' == typeof c.delete &&
                  'number' == typeof l.retain &&
                  a.push(c)
            }
          return a.chop()
        }),
        (t.prototype.concat = function (e) {
          var n = new t(this.ops.slice())
          return (
            e.ops.length > 0 &&
              (n.push(e.ops[0]), (n.ops = n.ops.concat(e.ops.slice(1)))),
            n
          )
        }),
        (t.prototype.diff = function (e, n) {
          if (this.ops === e.ops) return new t()
          var r = [this, e].map(function (t) {
              return t
                .map(function (n) {
                  if (null != n.insert)
                    return 'string' == typeof n.insert ? n.insert : N
                  throw new Error(
                    'diff() called ' +
                      (t === e ? 'on' : 'with') +
                      ' non-document'
                  )
                })
                .join('')
            }),
            o = new t(),
            i = z.default(r[0], r[1], n),
            u = q.default.iterator(this.ops),
            a = q.default.iterator(e.ops)
          return (
            i.forEach(function (t) {
              for (var e = t[1].length; e > 0; ) {
                var n = 0
                switch (t[0]) {
                  case z.default.INSERT:
                    ;(n = Math.min(a.peekLength(), e)), o.push(a.next(n))
                    break
                  case z.default.DELETE:
                    ;(n = Math.min(e, u.peekLength())), u.next(n), o.delete(n)
                    break
                  case z.default.EQUAL:
                    n = Math.min(u.peekLength(), a.peekLength(), e)
                    var r = u.next(n),
                      i = a.next(n)
                    P.default(r.insert, i.insert)
                      ? o.retain(n, $.default.diff(r.attributes, i.attributes))
                      : o.push(i).delete(n)
                }
                e -= n
              }
            }),
            o.chop()
          )
        }),
        (t.prototype.eachLine = function (e, n) {
          void 0 === n && (n = '\n')
          for (
            var r = q.default.iterator(this.ops), o = new t(), i = 0;
            r.hasNext();

          ) {
            if ('insert' !== r.peekType()) return
            var u = r.peek(),
              a = q.default.length(u) - r.peekLength(),
              s = 'string' == typeof u.insert ? u.insert.indexOf(n, a) - a : -1
            if (s < 0) o.push(r.next())
            else if (s > 0) o.push(r.next(s))
            else {
              if (!1 === e(o, r.next(1).attributes || {}, i)) return
              ;(i += 1), (o = new t())
            }
          }
          o.length() > 0 && e(o, {}, i)
        }),
        (t.prototype.invert = function (e) {
          var n = new t()
          return (
            this.reduce(function (t, r) {
              if (r.insert) n.delete(q.default.length(r))
              else {
                if (r.retain && null == r.attributes)
                  return n.retain(r.retain), t + r.retain
                if (r.delete || (r.retain && r.attributes)) {
                  var o = r.delete || r.retain
                  return (
                    e.slice(t, t + o).forEach(function (t) {
                      r.delete
                        ? n.push(t)
                        : r.retain &&
                          r.attributes &&
                          n.retain(
                            q.default.length(t),
                            $.default.invert(r.attributes, t.attributes)
                          )
                    }),
                    t + o
                  )
                }
              }
              return t
            }, 0),
            n.chop()
          )
        }),
        (t.prototype.transform = function (e, n) {
          if ((void 0 === n && (n = !1), (n = !!n), 'number' == typeof e))
            return this.transformPosition(e, n)
          for (
            var r = e,
              o = q.default.iterator(this.ops),
              i = q.default.iterator(r.ops),
              u = new t();
            o.hasNext() || i.hasNext();

          )
            if ('insert' !== o.peekType() || (!n && 'insert' === i.peekType()))
              if ('insert' === i.peekType()) u.push(i.next())
              else {
                var a = Math.min(o.peekLength(), i.peekLength()),
                  s = o.next(a),
                  l = i.next(a)
                if (s.delete) continue
                l.delete
                  ? u.push(l)
                  : u.retain(
                      a,
                      $.default.transform(s.attributes, l.attributes, n)
                    )
              }
            else u.retain(q.default.length(o.next()))
          return u.chop()
        }),
        (t.prototype.transformPosition = function (t, e) {
          void 0 === e && (e = !1), (e = !!e)
          for (
            var n = q.default.iterator(this.ops), r = 0;
            n.hasNext() && r <= t;

          ) {
            var o = n.peekLength(),
              i = n.peekType()
            n.next(),
              'delete' !== i
                ? ('insert' === i && (r < t || !e) && (t += o), (r += o))
                : (t -= Math.min(o, t - r))
          }
          return t
        }),
        (t.Op = q.default),
        (t.AttributeMap = $.default),
        t
      )
    })()
  const F = {
      essential: [
        [{ header: [1, 2, 3, 4, 5, 6, !1] }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
        ['blockquote', 'code-block', 'link'],
        [{ color: [] }, 'clean'],
      ],
      minimal: [
        [{ header: 1 }, { header: 2 }],
        ['bold', 'italic', 'underline'],
        [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
      ],
      full: [
        ['bold', 'italic', 'underline', 'strike'],
        ['blockquote', 'code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }],
        [{ indent: '-1' }, { indent: '+1' }],
        [{ direction: 'rtl' }],
        [{ size: ['small', !1, 'large', 'huge'] }],
        [{ header: [1, 2, 3, 4, 5, 6, !1] }],
        [{ color: [] }, { background: [] }],
        [{ font: [] }],
        [{ align: [] }],
        ['link', 'video', 'image'],
        ['clean'],
      ],
    },
    I = n.defineComponent({
      name: 'QuillEditor',
      inheritAttrs: !1,
      props: {
        content: { type: [String, Object] },
        contentType: {
          type: String,
          default: 'delta',
          validator: (t) => ['delta', 'html', 'text'].includes(t),
        },
        enable: { type: Boolean, default: !0 },
        readOnly: { type: Boolean, default: !1 },
        placeholder: { type: String, required: !1 },
        theme: {
          type: String,
          default: 'snow',
          validator: (t) => ['snow', 'bubble', ''].includes(t),
        },
        toolbar: {
          type: [String, Array, Object],
          required: !1,
          validator: (t) =>
            'string' != typeof t ||
            '' === t ||
            '#' === t.charAt(0) ||
            -1 !== Object.keys(F).indexOf(t),
        },
        modules: { type: Object, required: !1 },
        options: { type: Object, required: !1 },
        globalOptions: { type: Object, required: !1 },
      },
      emits: [
        'textChange',
        'selectionChange',
        'editorChange',
        'update:content',
        'focus',
        'blur',
        'ready',
      ],
      setup: (t, e) => {
        let r, i
        n.onMounted(() => {
          a()
        }),
          n.onBeforeUnmount(() => {
            r = null
          })
        const u = n.ref(),
          a = () => {
            var n
            if (u.value) {
              if (((i = s()), t.modules))
                if (Array.isArray(t.modules))
                  for (const e of t.modules)
                    o.register(`modules/${e.name}`, e.module)
                else o.register(`modules/${t.modules.name}`, t.modules.module)
              ;(r = new o(u.value, i)),
                g(t.content),
                r.on('text-change', h),
                r.on('selection-change', d),
                r.on('editor-change', b),
                'bubble' !== t.theme && u.value.classList.remove('ql-bubble'),
                'snow' !== t.theme && u.value.classList.remove('ql-snow'),
                null === (n = r.getModule('toolbar')) ||
                  void 0 === n ||
                  n.container.addEventListener('mousedown', (t) => {
                    t.preventDefault()
                  }),
                e.emit('ready', r)
            }
          },
          s = () => {
            const e = {}
            if (
              ('' !== t.theme && (e.theme = t.theme),
              t.readOnly && (e.readOnly = t.readOnly),
              t.placeholder && (e.placeholder = t.placeholder),
              t.toolbar &&
                '' !== t.toolbar &&
                (e.modules = {
                  toolbar: (() => {
                    if ('object' == typeof t.toolbar) return t.toolbar
                    if ('string' == typeof t.toolbar) {
                      return '#' === t.toolbar.charAt(0)
                        ? t.toolbar
                        : F[t.toolbar]
                    }
                  })(),
                }),
              t.modules)
            ) {
              const n = (() => {
                var e, n
                const r = {}
                if (Array.isArray(t.modules))
                  for (const o of t.modules)
                    r[o.name] =
                      null !== (e = o.options) && void 0 !== e ? e : {}
                else
                  r[t.modules.name] =
                    null !== (n = t.modules.options) && void 0 !== n ? n : {}
                return r
              })()
              e.modules = Object.assign({}, e.modules, n)
            }
            return Object.assign({}, t.globalOptions, t.options, e)
          },
          l = (t) => ('object' == typeof t && t ? t.slice() : t)
        let c
        const f = (t) => {
            if (typeof c == typeof t) {
              if (t === c) return !0
              if ('object' == typeof t && t && 'object' == typeof c && c)
                return (
                  (e = c.diff(t)),
                  !Object.values(e.ops).some(
                    (t) => !t.retain || 1 !== Object.keys(t).length
                  )
                )
            }
            var e
            return !1
          },
          h = (n, r, o) => {
            ;(c = l(v())),
              f(t.content) || e.emit('update:content', c),
              e.emit('textChange', { delta: n, oldContents: r, source: o })
          },
          p = n.ref(),
          d = (t, n, o) => {
            ;(p.value = !!(null == r ? void 0 : r.hasFocus())),
              e.emit('selectionChange', { range: t, oldRange: n, source: o })
          }
        n.watch(p, (t) => {
          e.emit(t ? 'focus' : 'blur', u)
        })
        const b = (...t) => {
            'text-change' === t[0] &&
              e.emit('editorChange', {
                name: t[0],
                delta: t[1],
                oldContents: t[2],
                source: t[3],
              }),
              'selection-change' === t[0] &&
                e.emit('editorChange', {
                  name: t[0],
                  range: t[1],
                  oldRange: t[2],
                  source: t[3],
                })
          },
          v = (e, n) =>
            'html' === t.contentType
              ? j()
              : 'text' === t.contentType
              ? y(e, n)
              : null == r
              ? void 0
              : r.getContents(e, n),
          g = (e, n = 'api') => {
            const o = e || ('delta' === t.contentType ? new D() : '')
            'html' === t.contentType
              ? m(o)
              : 'text' === t.contentType
              ? _(o, n)
              : null == r || r.setContents(o, n),
              (c = l(o))
          },
          y = (t, e) => {
            var n
            return null !== (n = null == r ? void 0 : r.getText(t, e)) &&
              void 0 !== n
              ? n
              : ''
          },
          _ = (t, e = 'api') => {
            null == r || r.setText(t, e)
          },
          j = () => {
            var t
            return null !== (t = null == r ? void 0 : r.root.innerHTML) &&
              void 0 !== t
              ? t
              : ''
          },
          m = (t) => {
            r && (r.root.innerHTML = t)
          }
        return (
          n.watch(
            () => t.content,
            (t) => {
              if (!r || !t || f(t)) return
              const e = r.getSelection()
              e && n.nextTick(() => (null == r ? void 0 : r.setSelection(e))),
                g(t)
            },
            { deep: !0 }
          ),
          n.watch(
            () => t.enable,
            (t) => {
              r && r.enable(t)
            }
          ),
          {
            editor: u,
            getEditor: () => u.value,
            getToolbar: () => {
              var t
              return null ===
                (t = null == r ? void 0 : r.getModule('toolbar')) ||
                void 0 === t
                ? void 0
                : t.container
            },
            getQuill: () => {
              if (r) return r
              throw 'The quill editor hasn\'t been instantiated yet,\n                  make sure to call this method when the editor ready\n                  or use v-on:ready="onReady(quill)" event instead.'
            },
            getContents: v,
            setContents: g,
            getHTML: j,
            setHTML: m,
            pasteHTML: (t, e = 'api') => {
              const n = null == r ? void 0 : r.clipboard.convert(t)
              n && (null == r || r.setContents(n, e))
            },
            focus: () => {
              null == r || r.focus()
            },
            getText: y,
            setText: _,
            reinit: () => {
              n.nextTick(() => {
                var t
                !e.slots.toolbar &&
                  r &&
                  (null === (t = r.getModule('toolbar')) ||
                    void 0 === t ||
                    t.container.remove()),
                  a()
              })
            },
          }
        )
      },
      render() {
        var t, e
        return [
          null === (e = (t = this.$slots).toolbar) || void 0 === e
            ? void 0
            : e.call(t),
          n.h('div', { ref: 'editor', ...this.$attrs }),
        ]
      },
    })
  ;(t.Quill = o),
    (t.Delta = D),
    (t.QuillEditor = I),
    Object.defineProperty(t, '__esModule', { value: !0 })
})
