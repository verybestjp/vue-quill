/*!
 * SizeCheck @vueup/size-check v0.0.0-development
 * https://github.com/vueup/vue-quill
 *
 * Copyright (c) 2024 undefined
 * Released under the undefined license
 * Date: 2024-04-12T04:58:23.933Z
 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(require('vue'), require('quill'))
    : 'function' == typeof define && define.amd
    ? define(['vue', 'quill'], e)
    : e(
        (t = 'undefined' != typeof globalThis ? globalThis : t || self).Vue,
        t.Quill
      )
})(this, function (t, e) {
  'use strict'
  function n(t) {
    return t && 'object' == typeof t && 'default' in t ? t.default : t
  }
  var r = n(e),
    o =
      'undefined' != typeof globalThis
        ? globalThis
        : 'undefined' != typeof window
        ? window
        : 'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : {},
    i = -1
  function u(t, e, n, r) {
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
            if ((v = e.slice(f)) === l) {
              var p = Math.min(a, f)
              if ((y = s.slice(0, p)) === (m = h.slice(0, p)))
                return b(y, s.slice(p), h.slice(p), l)
            }
          }
          if (null === c || c === a) {
            var d = a,
              v = ((h = e.slice(0, d)), e.slice(d))
            if (h === s) {
              var g = Math.min(i - d, u - d)
              if ((_ = l.slice(l.length - g)) === (j = v.slice(v.length - g)))
                return b(
                  s,
                  l.slice(0, l.length - g),
                  v.slice(0, v.length - g),
                  _
                )
            }
          }
        }
        if (r.length > 0 && o && 0 === o.length) {
          var y = t.slice(0, r.index),
            _ = t.slice(r.index + r.length)
          if (!(u < (p = y.length) + (g = _.length))) {
            var m = e.slice(0, p),
              j = e.slice(u - g)
            if (y === m && _ === j)
              return b(y, t.slice(p, i - g), e.slice(p, u - g), _)
          }
        }
        return null
      })(t, e, n)
      if (o) return o
    }
    var f = s(t, e),
      h = t.substring(0, f)
    f = l((t = t.substring(f)), (e = e.substring(f)))
    var p = t.substring(t.length - f),
      d = (function (t, e) {
        var n
        if (!t) return [[1, e]]
        if (!e) return [[i, t]]
        var r = t.length > e.length ? t : e,
          o = t.length > e.length ? e : t,
          c = r.indexOf(o)
        if (-1 !== c)
          return (
            (n = [
              [1, r.substring(0, c)],
              [0, o],
              [1, r.substring(c + o.length)],
            ]),
            t.length > e.length && (n[0][0] = n[2][0] = i),
            n
          )
        if (1 === o.length)
          return [
            [i, t],
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
                c = -1,
                f = '';
              -1 !== (c = e.indexOf(a, c + 1));

            ) {
              var h = s(t.substring(n), e.substring(c)),
                p = l(t.substring(0, n), e.substring(0, c))
              f.length < p + h &&
                ((f = e.substring(c - p, c) + e.substring(c, c + h)),
                (r = t.substring(0, n - p)),
                (o = t.substring(n + h)),
                (i = e.substring(0, c - p)),
                (u = e.substring(c + h)))
            }
            return 2 * f.length >= t.length ? [r, o, i, u, f] : null
          }
          var i,
            u,
            a,
            c,
            f,
            h = o(n, r, Math.ceil(n.length / 4)),
            p = o(n, r, Math.ceil(n.length / 2))
          if (!h && !p) return null
          i = p ? (h && h[4].length > p[4].length ? h : p) : h
          t.length > e.length
            ? ((u = i[0]), (a = i[1]), (c = i[2]), (f = i[3]))
            : ((c = i[0]), (f = i[1]), (u = i[2]), (a = i[3]))
          return [u, a, c, f, i[4]]
        })(t, e)
        if (f) {
          var h = f[1],
            p = f[3],
            d = f[4],
            b = u(f[0], f[2]),
            v = u(h, p)
          return b.concat([[0, d]], v)
        }
        return (function (t, e) {
          for (
            var n = t.length,
              r = e.length,
              o = Math.ceil((n + r) / 2),
              u = o,
              s = 2 * o,
              l = new Array(s),
              c = new Array(s),
              f = 0;
            f < s;
            f++
          )
            (l[f] = -1), (c[f] = -1)
          ;(l[u + 1] = 0), (c[u + 1] = 0)
          for (
            var h = n - r, p = h % 2 != 0, d = 0, b = 0, v = 0, g = 0, y = 0;
            y < o;
            y++
          ) {
            for (var _ = -y + d; _ <= y - b; _ += 2) {
              for (
                var m = u + _,
                  j =
                    (k =
                      _ === -y || (_ !== y && l[m - 1] < l[m + 1])
                        ? l[m + 1]
                        : l[m - 1] + 1) - _;
                k < n && j < r && t.charAt(k) === e.charAt(j);

              )
                k++, j++
              if (((l[m] = k), k > n)) b += 2
              else if (j > r) d += 2
              else if (p) {
                if ((O = u + h - _) >= 0 && O < s && -1 !== c[O])
                  if (k >= (x = n - c[O])) return a(t, e, k, j)
              }
            }
            for (var w = -y + v; w <= y - g; w += 2) {
              for (
                var x,
                  O = u + w,
                  A =
                    (x =
                      w === -y || (w !== y && c[O - 1] < c[O + 1])
                        ? c[O + 1]
                        : c[O - 1] + 1) - w;
                x < n && A < r && t.charAt(n - x - 1) === e.charAt(r - A - 1);

              )
                x++, A++
              if (((c[O] = x), x > n)) g += 2
              else if (A > r) v += 2
              else if (!p) {
                if ((m = u + h - w) >= 0 && m < s && -1 !== l[m]) {
                  var k
                  j = u + (k = l[m]) - m
                  if (k >= (x = n - x)) return a(t, e, k, j)
                }
              }
            }
          }
          return [
            [i, t],
            [1, e],
          ]
        })(t, e)
      })((t = t.substring(0, t.length - f)), (e = e.substring(0, e.length - f)))
    return h && d.unshift([0, h]), p && d.push([0, p]), c(d, r), d
  }
  function a(t, e, n, r) {
    var o = t.substring(0, n),
      i = e.substring(0, r),
      a = t.substring(n),
      s = e.substring(r),
      l = u(o, i),
      c = u(a, s)
    return l.concat(c)
  }
  function s(t, e) {
    if (!t || !e || t.charAt(0) !== e.charAt(0)) return 0
    for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o; )
      t.substring(i, o) == e.substring(i, o) ? (i = n = o) : (r = o),
        (o = Math.floor((r - n) / 2 + n))
    return f(t.charCodeAt(o - 1)) && o--, o
  }
  function l(t, e) {
    if (!t || !e || t.slice(-1) !== e.slice(-1)) return 0
    for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o; )
      t.substring(t.length - o, t.length - i) ==
      e.substring(e.length - o, e.length - i)
        ? (i = n = o)
        : (r = o),
        (o = Math.floor((r - n) / 2 + n))
    return h(t.charCodeAt(t.length - o)) && o--, o
  }
  function c(t, e) {
    t.push([0, ''])
    for (var n, r = 0, o = 0, u = 0, a = '', f = ''; r < t.length; )
      if (r < t.length - 1 && !t[r][1]) t.splice(r, 1)
      else
        switch (t[r][0]) {
          case 1:
            u++, (f += t[r][1]), r++
            break
          case i:
            o++, (a += t[r][1]), r++
            break
          case 0:
            var h = r - u - o - 1
            if (e) {
              if (h >= 0 && d(t[h][1])) {
                var b = t[h][1].slice(-1)
                if (
                  ((t[h][1] = t[h][1].slice(0, -1)),
                  (a = b + a),
                  (f = b + f),
                  !t[h][1])
                ) {
                  t.splice(h, 1), r--
                  var v = h - 1
                  t[v] && 1 === t[v][0] && (u++, (f = t[v][1] + f), v--),
                    t[v] && t[v][0] === i && (o++, (a = t[v][1] + a), v--),
                    (h = v)
                }
              }
              if (p(t[r][1])) {
                b = t[r][1].charAt(0)
                ;(t[r][1] = t[r][1].slice(1)), (a += b), (f += b)
              }
            }
            if (r < t.length - 1 && !t[r][1]) {
              t.splice(r, 1)
              break
            }
            if (a.length > 0 || f.length > 0) {
              a.length > 0 &&
                f.length > 0 &&
                (0 !== (n = s(f, a)) &&
                  (h >= 0
                    ? (t[h][1] += f.substring(0, n))
                    : (t.splice(0, 0, [0, f.substring(0, n)]), r++),
                  (f = f.substring(n)),
                  (a = a.substring(n))),
                0 !== (n = l(f, a)) &&
                  ((t[r][1] = f.substring(f.length - n) + t[r][1]),
                  (f = f.substring(0, f.length - n)),
                  (a = a.substring(0, a.length - n))))
              var g = u + o
              0 === a.length && 0 === f.length
                ? (t.splice(r - g, g), (r -= g))
                : 0 === a.length
                ? (t.splice(r - g, g, [1, f]), (r = r - g + 1))
                : 0 === f.length
                ? (t.splice(r - g, g, [i, a]), (r = r - g + 1))
                : (t.splice(r - g, g, [i, a], [1, f]), (r = r - g + 2))
            }
            0 !== r && 0 === t[r - 1][0]
              ? ((t[r - 1][1] += t[r][1]), t.splice(r, 1))
              : r++,
              (u = 0),
              (o = 0),
              (a = ''),
              (f = '')
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
    y && c(t, e)
  }
  function f(t) {
    return t >= 55296 && t <= 56319
  }
  function h(t) {
    return t >= 56320 && t <= 57343
  }
  function p(t) {
    return h(t.charCodeAt(0))
  }
  function d(t) {
    return f(t.charCodeAt(t.length - 1))
  }
  function b(t, e, n, r) {
    return d(t) || p(r)
      ? null
      : (function (t) {
          for (var e = [], n = 0; n < t.length; n++)
            t[n][1].length > 0 && e.push(t[n])
          return e
        })([
          [0, t],
          [i, e],
          [1, n],
          [0, r],
        ])
  }
  function v(t, e, n) {
    return u(t, e, n, !0)
  }
  ;(v.INSERT = 1), (v.DELETE = i), (v.EQUAL = 0)
  var g = v,
    y = { exports: {} }
  !(function (t, e) {
    var n = '__lodash_hash_undefined__',
      r = 9007199254740991,
      i = '[object Arguments]',
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
      m = '[object DataView]',
      j = '[object Float32Array]',
      w = '[object Float64Array]',
      x = '[object Int8Array]',
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
    ;(C[i] =
      C['[object Array]'] =
      C[_] =
      C[m] =
      C[u] =
      C[a] =
      C[j] =
      C[w] =
      C[x] =
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
        ('object' == typeof o && o && o.Object === Object && o) ||
        P ||
        Function('return this')(),
      q = e && !e.nodeType && e,
      N = q && t && !t.nodeType && t,
      F = N && N.exports === q
    function I(t, e) {
      return t.set(e[0], e[1]), t
    }
    function U(t, e) {
      return t.add(e), t
    }
    function B(t, e, n, r) {
      var o = -1,
        i = t ? t.length : 0
      for (r && i && (n = t[++o]); ++o < i; ) n = e(n, t[o], o, t)
      return n
    }
    function D(t) {
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
    function H(t, e) {
      return function (n) {
        return t(e(n))
      }
    }
    function Q(t) {
      var e = -1,
        n = Array(t.size)
      return (
        t.forEach(function (t) {
          n[++e] = t
        }),
        n
      )
    }
    var V,
      W = Array.prototype,
      G = Function.prototype,
      J = Object.prototype,
      K = $['__core-js_shared__'],
      X = (V = /[^.]+$/.exec((K && K.keys && K.keys.IE_PROTO) || ''))
        ? 'Symbol(src)_1.' + V
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
      nt = F ? $.Buffer : void 0,
      rt = $.Symbol,
      ot = $.Uint8Array,
      it = H(Object.getPrototypeOf, Object),
      ut = Object.create,
      at = J.propertyIsEnumerable,
      st = W.splice,
      lt = Object.getOwnPropertySymbols,
      ct = nt ? nt.isBuffer : void 0,
      ft = H(Object.keys, Object),
      ht = Nt($, 'DataView'),
      pt = Nt($, 'Map'),
      dt = Nt($, 'Promise'),
      bt = Nt($, 'Set'),
      vt = Nt($, 'WeakMap'),
      gt = Nt(Object, 'create'),
      yt = Dt(ht),
      _t = Dt(pt),
      mt = Dt(dt),
      jt = Dt(bt),
      wt = Dt(vt),
      xt = rt ? rt.prototype : void 0,
      Ot = xt ? xt.valueOf : void 0
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
          Ht(t) ||
          (function (t) {
            return (
              (function (t) {
                return (
                  (function (t) {
                    return !!t && 'object' == typeof t
                  })(t) && Qt(t)
                )
              })(t) &&
              Z.call(t, 'callee') &&
              (!at.call(t, 'callee') || tt.call(t) == i)
            )
          })(t)
            ? (function (t, e) {
                for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n)
                return r
              })(t.length, String)
            : [],
        r = n.length,
        o = !!r
      for (var u in t)
        (!e && !Z.call(t, u)) || (o && ('length' == u || Ut(u, r))) || n.push(u)
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
    function zt(t, e, n, r, o, p, y) {
      var S
      if ((r && (S = p ? r(t, o, p, y) : r(t)), void 0 !== S)) return S
      if (!Gt(t)) return t
      var z = Ht(t)
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
        var P = It(t),
          $ = P == s || P == l
        if (Vt(t))
          return (function (t, e) {
            if (e) return t.slice()
            var n = new t.constructor(t.length)
            return t.copy(n), n
          })(t, e)
        if (P == h || P == i || ($ && !p)) {
          if (D(t)) return p ? t : {}
          if (
            ((S = (function (t) {
              return 'function' != typeof t.constructor || Bt(t)
                ? {}
                : ((e = it(t)), Gt(e) ? ut(e) : {})
              var e
            })($ ? {} : t)),
            !e)
          )
            return (function (t, e) {
              return $t(t, Ft(t), e)
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
              case m:
                return (function (t, e) {
                  var n = e ? Pt(t.buffer) : t.buffer
                  return new t.constructor(n, t.byteOffset, t.byteLength)
                })(t, r)
              case j:
              case w:
              case x:
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
                  return B(e ? n(R(t), !0) : R(t), I, new t.constructor())
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
                  return B(e ? n(Q(t), !0) : Q(t), U, new t.constructor())
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
                return Ht(t)
                  ? r
                  : (function (t, e) {
                      for (var n = -1, r = e.length, o = t.length; ++n < r; )
                        t[o + n] = e[n]
                      return t
                    })(r, n(t))
              })(t, Jt, Ft)
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
        (Wt(t) || D(t) ? et : S).test(Dt(t))
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
    var Ft = lt
        ? H(lt, Object)
        : function () {
            return []
          },
      It = function (t) {
        return tt.call(t)
      }
    function Ut(t, e) {
      return (
        !!(e = null == e ? r : e) &&
        ('number' == typeof t || z.test(t)) &&
        t > -1 &&
        t % 1 == 0 &&
        t < e
      )
    }
    function Bt(t) {
      var e = t && t.constructor
      return t === (('function' == typeof e && e.prototype) || J)
    }
    function Dt(t) {
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
    ;((ht && It(new ht(new ArrayBuffer(1))) != m) ||
      (pt && It(new pt()) != c) ||
      (dt && It(dt.resolve()) != p) ||
      (bt && It(new bt()) != b) ||
      (vt && It(new vt()) != y)) &&
      (It = function (t) {
        var e = tt.call(t),
          n = e == h ? t.constructor : void 0,
          r = n ? Dt(n) : void 0
        if (r)
          switch (r) {
            case yt:
              return m
            case _t:
              return c
            case mt:
              return p
            case jt:
              return b
            case wt:
              return y
          }
        return e
      })
    var Ht = Array.isArray
    function Qt(t) {
      return (
        null != t &&
        (function (t) {
          return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= r
        })(t.length) &&
        !Wt(t)
      )
    }
    var Vt =
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
      return Qt(t)
        ? Lt(t)
        : (function (t) {
            if (!Bt(t)) return ft(t)
            var e = []
            for (var n in Object(t))
              Z.call(t, n) && 'constructor' != n && e.push(n)
            return e
          })(t)
    }
    t.exports = function (t) {
      return zt(t, !0, !0)
    }
  })(y, y.exports)
  var _ = { exports: {} }
  !(function (t, e) {
    var n = '__lodash_hash_undefined__',
      r = 9007199254740991,
      i = '[object Arguments]',
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
      m = '[object ArrayBuffer]',
      j = '[object DataView]',
      w = /^\[object .+?Constructor\]$/,
      x = /^(?:0|[1-9]\d*)$/,
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
      (O[i] =
        O[u] =
        O[m] =
        O[a] =
        O[j] =
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
    var A = 'object' == typeof o && o && o.Object === Object && o,
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
      F,
      I,
      U = Array.prototype,
      B = Object.prototype,
      D = T['__core-js_shared__'],
      R = Function.prototype.toString,
      H = B.hasOwnProperty,
      Q = (N = /[^.]+$/.exec((D && D.keys && D.keys.IE_PROTO) || ''))
        ? 'Symbol(src)_1.' + N
        : '',
      V = B.toString,
      W = RegExp(
        '^' +
          R.call(H)
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
      X = B.propertyIsEnumerable,
      Y = U.splice,
      Z = J ? J.toStringTag : void 0,
      tt = Object.getOwnPropertySymbols,
      et = G ? G.isBuffer : void 0,
      nt =
        ((F = Object.keys),
        (I = Object),
        function (t) {
          return F(I(t))
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
    function mt(t) {
      var e = (this.__data__ = new gt(t))
      this.size = e.size
    }
    function jt(t, e) {
      var n = Ft(t),
        r = !n && Nt(t),
        o = !n && !r && It(t),
        i = !n && !r && !o && Ht(t),
        u = n || r || o || i,
        a = u
          ? (function (t, e) {
              for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n)
              return r
            })(t.length, String)
          : [],
        s = a.length
      for (var l in t)
        (!e && !H.call(t, l)) ||
          (u &&
            ('length' == l ||
              (o && ('offset' == l || 'parent' == l)) ||
              (i &&
                ('buffer' == l || 'byteLength' == l || 'byteOffset' == l)) ||
              Pt(l, s))) ||
          a.push(l)
      return a
    }
    function wt(t, e) {
      for (var n = t.length; n--; ) if (qt(t[n][0], e)) return n
      return -1
    }
    function xt(t) {
      return null == t
        ? void 0 === t
          ? '[object Undefined]'
          : '[object Null]'
        : Z && Z in Object(t)
        ? (function (t) {
            var e = H.call(t, Z),
              n = t[Z]
            try {
              t[Z] = void 0
              var r = !0
            } catch (i) {}
            var o = V.call(t)
            r && (e ? (t[Z] = n) : delete t[Z])
            return o
          })(t)
        : (function (t) {
            return V.call(t)
          })(t)
    }
    function Ot(t) {
      return Rt(t) && xt(t) == i
    }
    function At(t, e, n, r, o) {
      return (
        t === e ||
        (null == t || null == e || (!Rt(t) && !Rt(e))
          ? t != t && e != e
          : (function (t, e, n, r, o, c) {
              var d = Ft(t),
                _ = Ft(e),
                w = d ? u : Ct(t),
                x = _ ? u : Ct(e),
                O = (w = w == i ? p : w) == p,
                A = (x = x == i ? p : x) == p,
                k = w == x
              if (k && It(t)) {
                if (!It(e)) return !1
                ;(d = !0), (O = !1)
              }
              if (k && !O)
                return (
                  c || (c = new mt()),
                  d || Ht(t)
                    ? Mt(t, e, n, r, o, c)
                    : (function (t, e, n, r, o, i, u) {
                        switch (n) {
                          case j:
                            if (
                              t.byteLength != e.byteLength ||
                              t.byteOffset != e.byteOffset
                            )
                              return !1
                            ;(t = t.buffer), (e = e.buffer)
                          case m:
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
                      })(t, e, w, n, r, o, c)
                )
              if (!(1 & n)) {
                var T = O && H.call(t, '__wrapped__'),
                  M = A && H.call(e, '__wrapped__')
                if (T || M) {
                  var L = T ? t.value() : t,
                    E = M ? e.value() : e
                  return c || (c = new mt()), o(L, E, n, r, c)
                }
              }
              if (!k) return !1
              return (
                c || (c = new mt()),
                (function (t, e, n, r, o, i) {
                  var u = 1 & n,
                    a = Lt(t),
                    s = a.length,
                    l = Lt(e)
                  if (s != l.length && !u) return !1
                  var c = s
                  for (; c--; ) {
                    var f = a[c]
                    if (!(u ? f in e : H.call(e, f))) return !1
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
                })(t, e, n, r, o, c)
              )
            })(t, e, n, r, At, o))
      )
    }
    function kt(t) {
      return (
        !(
          !Dt(t) ||
          (function (t) {
            return !!Q && Q in t
          })(t)
        ) && (Ut(t) ? W : w).test($t(t))
      )
    }
    function Tt(t) {
      if (
        (e = t) !==
        (('function' == typeof (n = e && e.constructor) && n.prototype) || B)
      )
        return nt(t)
      var e,
        n,
        r = []
      for (var o in Object(t)) H.call(t, o) && 'constructor' != o && r.push(o)
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
        return Ft(t)
          ? r
          : (function (t, e) {
              for (var n = -1, r = e.length, o = t.length; ++n < r; )
                t[o + n] = e[n]
              return t
            })(r, n(t))
      })(t, Qt, zt)
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
        return H.call(e, t) ? e[t] : void 0
      }),
      (vt.prototype.has = function (t) {
        var e = this.__data__
        return st ? void 0 !== e[t] : H.call(e, t)
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
          n = wt(e, t)
        return (
          !(n < 0) &&
          (n == e.length - 1 ? e.pop() : Y.call(e, n, 1), --this.size, !0)
        )
      }),
      (gt.prototype.get = function (t) {
        var e = this.__data__,
          n = wt(e, t)
        return n < 0 ? void 0 : e[n][1]
      }),
      (gt.prototype.has = function (t) {
        return wt(this.__data__, t) > -1
      }),
      (gt.prototype.set = function (t, e) {
        var n = this.__data__,
          r = wt(n, t)
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
      (mt.prototype.clear = function () {
        ;(this.__data__ = new gt()), (this.size = 0)
      }),
      (mt.prototype.delete = function (t) {
        var e = this.__data__,
          n = e.delete(t)
        return (this.size = e.size), n
      }),
      (mt.prototype.get = function (t) {
        return this.__data__.get(t)
      }),
      (mt.prototype.has = function (t) {
        return this.__data__.has(t)
      }),
      (mt.prototype.set = function (t, e) {
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
      Ct = xt
    function Pt(t, e) {
      return (
        !!(e = null == e ? r : e) &&
        ('number' == typeof t || x.test(t)) &&
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
    ;((rt && Ct(new rt(new ArrayBuffer(1))) != j) ||
      (ot && Ct(new ot()) != f) ||
      (it && Ct(it.resolve()) != d) ||
      (ut && Ct(new ut()) != v) ||
      (at && Ct(new at()) != _)) &&
      (Ct = function (t) {
        var e = xt(t),
          n = e == p ? t.constructor : void 0,
          r = n ? $t(n) : ''
        if (r)
          switch (r) {
            case lt:
              return j
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
            return Rt(t) && H.call(t, 'callee') && !X.call(t, 'callee')
          },
      Ft = Array.isArray
    var It =
      et ||
      function () {
        return !1
      }
    function Ut(t) {
      if (!Dt(t)) return !1
      var e = xt(t)
      return (
        e == c ||
        '[object GeneratorFunction]' == e ||
        '[object AsyncFunction]' == e ||
        '[object Proxy]' == e
      )
    }
    function Bt(t) {
      return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= r
    }
    function Dt(t) {
      var e = typeof t
      return null != t && ('object' == e || 'function' == e)
    }
    function Rt(t) {
      return null != t && 'object' == typeof t
    }
    var Ht = C
      ? (function (t) {
          return function (e) {
            return t(e)
          }
        })(C)
      : function (t) {
          return Rt(t) && Bt(t.length) && !!O[xt(t)]
        }
    function Qt(t) {
      return null != (e = t) && Bt(e.length) && !Ut(e) ? jt(t) : Tt(t)
      var e
    }
    t.exports = function (t, e) {
      return At(t, e)
    }
  })(_, _.exports)
  var m = {},
    j =
      (o && o.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      }
  Object.defineProperty(m, '__esModule', { value: !0 })
  var w,
    x = j(y.exports),
    O = j(_.exports)
  !(function (t) {
    ;(t.compose = function (t, e, n) {
      void 0 === t && (t = {}),
        void 0 === e && (e = {}),
        'object' != typeof t && (t = {}),
        'object' != typeof e && (e = {})
      var r = x.default(e)
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
              O.default(t[r], e[r]) || (n[r] = void 0 === e[r] ? null : e[r]), n
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
  var A,
    k,
    T = {},
    M = {}
  function L() {
    if (k) return T
    k = 1
    var t =
      (o && o.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      }
    Object.defineProperty(T, '__esModule', { value: !0 })
    var e,
      n = t(
        (function () {
          if (A) return M
          A = 1
          var t =
            (o && o.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t }
            }
          Object.defineProperty(M, '__esModule', { value: !0 })
          var e = t(L()),
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
          return (M.default = n), M
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
      (T.default = e),
      T
    )
  }
  var E =
      (o && o.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      },
    S = E(g),
    z = E(y.exports),
    C = E(_.exports),
    P = E(m),
    $ = E(L()),
    q = String.fromCharCode(0),
    N = (function () {
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
          if (((t = z.default(t)), 'object' == typeof n)) {
            if ('number' == typeof t.delete && 'number' == typeof n.delete)
              return (this.ops[e - 1] = { delete: n.delete + t.delete }), this
            if (
              'number' == typeof n.delete &&
              null != t.insert &&
              'object' != typeof (n = this.ops[(e -= 1) - 1])
            )
              return this.ops.unshift(t), this
            if (C.default(t.attributes, n.attributes)) {
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
              ? t + $.default.length(e)
              : e.delete
              ? t - e.delete
              : t
          }, 0)
        }),
        (t.prototype.length = function () {
          return this.reduce(function (t, e) {
            return t + $.default.length(e)
          }, 0)
        }),
        (t.prototype.slice = function (e, n) {
          void 0 === e && (e = 0), void 0 === n && (n = 1 / 0)
          for (
            var r = [], o = $.default.iterator(this.ops), i = 0;
            i < n && o.hasNext();

          ) {
            var u = void 0
            i < e ? (u = o.next(e - i)) : ((u = o.next(n - i)), r.push(u)),
              (i += $.default.length(u))
          }
          return new t(r)
        }),
        (t.prototype.compose = function (e) {
          var n = $.default.iterator(this.ops),
            r = $.default.iterator(e.ops),
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
                var h = P.default.compose(
                  l.attributes,
                  c.attributes,
                  'number' == typeof l.retain
                )
                if (
                  (h && (f.attributes = h),
                  a.push(f),
                  !r.hasNext() && C.default(a.ops[a.ops.length - 1], f))
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
                    return 'string' == typeof n.insert ? n.insert : q
                  throw new Error(
                    'diff() called ' +
                      (t === e ? 'on' : 'with') +
                      ' non-document'
                  )
                })
                .join('')
            }),
            o = new t(),
            i = S.default(r[0], r[1], n),
            u = $.default.iterator(this.ops),
            a = $.default.iterator(e.ops)
          return (
            i.forEach(function (t) {
              for (var e = t[1].length; e > 0; ) {
                var n = 0
                switch (t[0]) {
                  case S.default.INSERT:
                    ;(n = Math.min(a.peekLength(), e)), o.push(a.next(n))
                    break
                  case S.default.DELETE:
                    ;(n = Math.min(e, u.peekLength())), u.next(n), o.delete(n)
                    break
                  case S.default.EQUAL:
                    n = Math.min(u.peekLength(), a.peekLength(), e)
                    var r = u.next(n),
                      i = a.next(n)
                    C.default(r.insert, i.insert)
                      ? o.retain(n, P.default.diff(r.attributes, i.attributes))
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
            var r = $.default.iterator(this.ops), o = new t(), i = 0;
            r.hasNext();

          ) {
            if ('insert' !== r.peekType()) return
            var u = r.peek(),
              a = $.default.length(u) - r.peekLength(),
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
              if (r.insert) n.delete($.default.length(r))
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
                            $.default.length(t),
                            P.default.invert(r.attributes, t.attributes)
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
              o = $.default.iterator(this.ops),
              i = $.default.iterator(r.ops),
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
                      P.default.transform(s.attributes, l.attributes, n)
                    )
              }
            else u.retain($.default.length(o.next()))
          return u.chop()
        }),
        (t.prototype.transformPosition = function (t, e) {
          void 0 === e && (e = !1), (e = !!e)
          for (
            var n = $.default.iterator(this.ops), r = 0;
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
        (t.Op = $.default),
        (t.AttributeMap = P.default),
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
    I = t.defineComponent({
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
      setup: (e, n) => {
        let o, i
        t.onMounted(() => {
          a()
        }),
          t.onBeforeUnmount(() => {
            o = null
          })
        const u = t.ref(),
          a = () => {
            var t
            if (u.value) {
              if (((i = s()), e.modules))
                if (Array.isArray(e.modules))
                  for (const t of e.modules)
                    r.register(`modules/${t.name}`, t.module)
                else r.register(`modules/${e.modules.name}`, e.modules.module)
              ;(o = new r(u.value, i)),
                g(e.content),
                o.on('text-change', h),
                o.on('selection-change', d),
                o.on('editor-change', b),
                'bubble' !== e.theme && u.value.classList.remove('ql-bubble'),
                'snow' !== e.theme && u.value.classList.remove('ql-snow'),
                null === (t = o.getModule('toolbar')) ||
                  void 0 === t ||
                  t.container.addEventListener('mousedown', (t) => {
                    t.preventDefault()
                  }),
                n.emit('ready', o)
            }
          },
          s = () => {
            const t = {}
            if (
              ('' !== e.theme && (t.theme = e.theme),
              e.readOnly && (t.readOnly = e.readOnly),
              e.placeholder && (t.placeholder = e.placeholder),
              e.toolbar &&
                '' !== e.toolbar &&
                (t.modules = {
                  toolbar: (() => {
                    if ('object' == typeof e.toolbar) return e.toolbar
                    if ('string' == typeof e.toolbar) {
                      return '#' === e.toolbar.charAt(0)
                        ? e.toolbar
                        : F[e.toolbar]
                    }
                  })(),
                }),
              e.modules)
            ) {
              const n = (() => {
                var t, n
                const r = {}
                if (Array.isArray(e.modules))
                  for (const o of e.modules)
                    r[o.name] =
                      null !== (t = o.options) && void 0 !== t ? t : {}
                else
                  r[e.modules.name] =
                    null !== (n = e.modules.options) && void 0 !== n ? n : {}
                return r
              })()
              t.modules = Object.assign({}, t.modules, n)
            }
            return Object.assign({}, e.globalOptions, e.options, t)
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
          h = (t, r, o) => {
            ;(c = l(v())),
              f(e.content) || n.emit('update:content', c),
              n.emit('textChange', { delta: t, oldContents: r, source: o })
          },
          p = t.ref(),
          d = (t, e, r) => {
            ;(p.value = !!(null == o ? void 0 : o.hasFocus())),
              n.emit('selectionChange', { range: t, oldRange: e, source: r })
          }
        t.watch(p, (t) => {
          n.emit(t ? 'focus' : 'blur', u)
        })
        const b = (...t) => {
            'text-change' === t[0] &&
              n.emit('editorChange', {
                name: t[0],
                delta: t[1],
                oldContents: t[2],
                source: t[3],
              }),
              'selection-change' === t[0] &&
                n.emit('editorChange', {
                  name: t[0],
                  range: t[1],
                  oldRange: t[2],
                  source: t[3],
                })
          },
          v = (t, n) =>
            'html' === e.contentType
              ? m()
              : 'text' === e.contentType
              ? y(t, n)
              : null == o
              ? void 0
              : o.getContents(t, n),
          g = (t, n = 'api') => {
            const r = t || ('delta' === e.contentType ? new N() : '')
            'html' === e.contentType
              ? j(r)
              : 'text' === e.contentType
              ? _(r, n)
              : null == o || o.setContents(r, n),
              (c = l(r))
          },
          y = (t, e) => {
            var n
            return null !== (n = null == o ? void 0 : o.getText(t, e)) &&
              void 0 !== n
              ? n
              : ''
          },
          _ = (t, e = 'api') => {
            null == o || o.setText(t, e)
          },
          m = () => {
            var t
            return null !== (t = null == o ? void 0 : o.root.innerHTML) &&
              void 0 !== t
              ? t
              : ''
          },
          j = (t) => {
            o && (o.root.innerHTML = t)
          }
        return (
          t.watch(
            () => e.content,
            (e) => {
              if (!o || !e || f(e)) return
              const n = o.getSelection()
              n && t.nextTick(() => (null == o ? void 0 : o.setSelection(n))),
                g(e)
            },
            { deep: !0 }
          ),
          t.watch(
            () => e.enable,
            (t) => {
              o && o.enable(t)
            }
          ),
          {
            editor: u,
            getEditor: () => u.value,
            getToolbar: () => {
              var t
              return null ===
                (t = null == o ? void 0 : o.getModule('toolbar')) ||
                void 0 === t
                ? void 0
                : t.container
            },
            getQuill: () => {
              if (o) return o
              throw 'The quill editor hasn\'t been instantiated yet,\n                  make sure to call this method when the editor ready\n                  or use v-on:ready="onReady(quill)" event instead.'
            },
            getContents: v,
            setContents: g,
            getHTML: m,
            setHTML: j,
            pasteHTML: (t, e = 'api') => {
              const n = null == o ? void 0 : o.clipboard.convert(t)
              n && (null == o || o.setContents(n, e))
            },
            focus: () => {
              null == o || o.focus()
            },
            getText: y,
            setText: _,
            reinit: () => {
              t.nextTick(() => {
                var t
                !n.slots.toolbar &&
                  o &&
                  (null === (t = o.getModule('toolbar')) ||
                    void 0 === t ||
                    t.container.remove()),
                  a()
              })
            },
          }
        )
      },
      render() {
        var e, n
        return [
          null === (n = (e = this.$slots).toolbar) || void 0 === n
            ? void 0
            : n.call(e),
          t.h('div', { ref: 'editor', ...this.$attrs }),
        ]
      },
    }),
    U = t.createApp({ render: () => t.h('div', 'hello world!') })
  U.component('Editor', I), U.mount('#app')
})
