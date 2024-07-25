/*!
 * VueQuill @verybestjp/vue-quill v0.0.0-development
 * https://vueup.github.io/vue-quill/
 *
 * Includes quill v1.3.7
 * https://quilljs.com/
 *
 * Copyright (c) 2024 Ahmad Luthfi Masruri
 * Released under the MIT license
 * Date: 2024-07-25T07:13:07.493Z
 */
import t from 'quill'
export { default as Quill } from 'quill'
import {
  defineComponent as e,
  onMounted as r,
  onBeforeUnmount as n,
  ref as o,
  watch as i,
  nextTick as u,
  h as a,
} from 'vue'
var s =
  'undefined' != typeof globalThis
    ? globalThis
    : 'undefined' != typeof window
    ? window
    : 'undefined' != typeof global
    ? global
    : 'undefined' != typeof self
    ? self
    : {}
function l(t, e, r, n) {
  if (t === e) return t ? [[0, t]] : []
  if (null != r) {
    var o = (function (t, e, r) {
      var n = 'number' == typeof r ? { index: r, length: 0 } : r.oldRange,
        o = 'number' == typeof r ? null : r.newRange,
        i = t.length,
        u = e.length
      if (0 === n.length && (null === o || 0 === o.length)) {
        var a = n.index,
          s = t.slice(0, a),
          l = t.slice(a),
          c = o ? o.index : null,
          f = a + u - i
        if ((null === c || c === f) && !(f < 0 || f > u)) {
          var h = e.slice(0, f)
          if ((b = e.slice(f)) === l) {
            var p = Math.min(a, f)
            if ((g = s.slice(0, p)) === (m = h.slice(0, p)))
              return y(g, s.slice(p), h.slice(p), l)
          }
        }
        if (null === c || c === a) {
          var d = a,
            b = ((h = e.slice(0, d)), e.slice(d))
          if (h === s) {
            var v = Math.min(i - d, u - d)
            if ((_ = l.slice(l.length - v)) === (j = b.slice(b.length - v)))
              return y(s, l.slice(0, l.length - v), b.slice(0, b.length - v), _)
          }
        }
      }
      if (n.length > 0 && o && 0 === o.length) {
        var g = t.slice(0, n.index),
          _ = t.slice(n.index + n.length)
        if (!(u < (p = g.length) + (v = _.length))) {
          var m = e.slice(0, p),
            j = e.slice(u - v)
          if (g === m && _ === j)
            return y(g, t.slice(p, i - v), e.slice(p, u - v), _)
        }
      }
      return null
    })(t, e, r)
    if (o) return o
  }
  var i = f(t, e),
    u = t.substring(0, i)
  i = h((t = t.substring(i)), (e = e.substring(i)))
  var a = t.substring(t.length - i),
    s = (function (t, e) {
      var r
      if (!t) return [[1, e]]
      if (!e) return [[-1, t]]
      var n = t.length > e.length ? t : e,
        o = t.length > e.length ? e : t,
        i = n.indexOf(o)
      if (-1 !== i)
        return (
          (r = [
            [1, n.substring(0, i)],
            [0, o],
            [1, n.substring(i + o.length)],
          ]),
          t.length > e.length && (r[0][0] = r[2][0] = -1),
          r
        )
      if (1 === o.length)
        return [
          [-1, t],
          [1, e],
        ]
      var u = (function (t, e) {
        var r = t.length > e.length ? t : e,
          n = t.length > e.length ? e : t
        if (r.length < 4 || 2 * n.length < r.length) return null
        function o(t, e, r) {
          for (
            var n,
              o,
              i,
              u,
              a = t.substring(r, r + Math.floor(t.length / 4)),
              s = -1,
              l = '';
            -1 !== (s = e.indexOf(a, s + 1));

          ) {
            var c = f(t.substring(r), e.substring(s)),
              p = h(t.substring(0, r), e.substring(0, s))
            l.length < p + c &&
              ((l = e.substring(s - p, s) + e.substring(s, s + c)),
              (n = t.substring(0, r - p)),
              (o = t.substring(r + c)),
              (i = e.substring(0, s - p)),
              (u = e.substring(s + c)))
          }
          return 2 * l.length >= t.length ? [n, o, i, u, l] : null
        }
        var i,
          u,
          a,
          s,
          l,
          c = o(r, n, Math.ceil(r.length / 4)),
          p = o(r, n, Math.ceil(r.length / 2))
        if (!c && !p) return null
        i = p ? (c && c[4].length > p[4].length ? c : p) : c
        t.length > e.length
          ? ((u = i[0]), (a = i[1]), (s = i[2]), (l = i[3]))
          : ((s = i[0]), (l = i[1]), (u = i[2]), (a = i[3]))
        return [u, a, s, l, i[4]]
      })(t, e)
      if (u) {
        var a = u[1],
          s = u[3],
          p = u[4],
          d = l(u[0], u[2]),
          b = l(a, s)
        return d.concat([[0, p]], b)
      }
      return (function (t, e) {
        for (
          var r = t.length,
            n = e.length,
            o = Math.ceil((r + n) / 2),
            i = o,
            u = 2 * o,
            a = new Array(u),
            s = new Array(u),
            l = 0;
          l < u;
          l++
        )
          (a[l] = -1), (s[l] = -1)
        ;(a[i + 1] = 0), (s[i + 1] = 0)
        for (
          var f = r - n, h = f % 2 != 0, p = 0, d = 0, b = 0, v = 0, g = 0;
          g < o;
          g++
        ) {
          for (var y = -g + p; y <= g - d; y += 2) {
            for (
              var _ = i + y,
                m =
                  (A =
                    y === -g || (y !== g && a[_ - 1] < a[_ + 1])
                      ? a[_ + 1]
                      : a[_ - 1] + 1) - y;
              A < r && m < n && t.charAt(A) === e.charAt(m);

            )
              A++, m++
            if (((a[_] = A), A > r)) d += 2
            else if (m > n) p += 2
            else if (h) {
              if ((w = i + f - y) >= 0 && w < u && -1 !== s[w])
                if (A >= (x = r - s[w])) return c(t, e, A, m)
            }
          }
          for (var j = -g + b; j <= g - v; j += 2) {
            for (
              var x,
                w = i + j,
                O =
                  (x =
                    j === -g || (j !== g && s[w - 1] < s[w + 1])
                      ? s[w + 1]
                      : s[w - 1] + 1) - j;
              x < r && O < n && t.charAt(r - x - 1) === e.charAt(n - O - 1);

            )
              x++, O++
            if (((s[w] = x), x > r)) v += 2
            else if (O > n) b += 2
            else if (!h) {
              if ((_ = i + f - j) >= 0 && _ < u && -1 !== a[_]) {
                var A
                m = i + (A = a[_]) - _
                if (A >= (x = r - x)) return c(t, e, A, m)
              }
            }
          }
        }
        return [
          [-1, t],
          [1, e],
        ]
      })(t, e)
    })((t = t.substring(0, t.length - i)), (e = e.substring(0, e.length - i)))
  return u && s.unshift([0, u]), a && s.push([0, a]), p(s, n), s
}
function c(t, e, r, n) {
  var o = t.substring(0, r),
    i = e.substring(0, n),
    u = t.substring(r),
    a = e.substring(n),
    s = l(o, i),
    c = l(u, a)
  return s.concat(c)
}
function f(t, e) {
  if (!t || !e || t.charAt(0) !== e.charAt(0)) return 0
  for (var r = 0, n = Math.min(t.length, e.length), o = n, i = 0; r < o; )
    t.substring(i, o) == e.substring(i, o) ? (i = r = o) : (n = o),
      (o = Math.floor((n - r) / 2 + r))
  return d(t.charCodeAt(o - 1)) && o--, o
}
function h(t, e) {
  if (!t || !e || t.slice(-1) !== e.slice(-1)) return 0
  for (var r = 0, n = Math.min(t.length, e.length), o = n, i = 0; r < o; )
    t.substring(t.length - o, t.length - i) ==
    e.substring(e.length - o, e.length - i)
      ? (i = r = o)
      : (n = o),
      (o = Math.floor((n - r) / 2 + r))
  return b(t.charCodeAt(t.length - o)) && o--, o
}
function p(t, e) {
  t.push([0, ''])
  for (var r, n = 0, o = 0, i = 0, u = '', a = ''; n < t.length; )
    if (n < t.length - 1 && !t[n][1]) t.splice(n, 1)
    else
      switch (t[n][0]) {
        case 1:
          i++, (a += t[n][1]), n++
          break
        case -1:
          o++, (u += t[n][1]), n++
          break
        case 0:
          var s = n - i - o - 1
          if (e) {
            if (s >= 0 && g(t[s][1])) {
              var l = t[s][1].slice(-1)
              if (
                ((t[s][1] = t[s][1].slice(0, -1)),
                (u = l + u),
                (a = l + a),
                !t[s][1])
              ) {
                t.splice(s, 1), n--
                var c = s - 1
                t[c] && 1 === t[c][0] && (i++, (a = t[c][1] + a), c--),
                  t[c] && -1 === t[c][0] && (o++, (u = t[c][1] + u), c--),
                  (s = c)
              }
            }
            if (v(t[n][1])) {
              l = t[n][1].charAt(0)
              ;(t[n][1] = t[n][1].slice(1)), (u += l), (a += l)
            }
          }
          if (n < t.length - 1 && !t[n][1]) {
            t.splice(n, 1)
            break
          }
          if (u.length > 0 || a.length > 0) {
            u.length > 0 &&
              a.length > 0 &&
              (0 !== (r = f(a, u)) &&
                (s >= 0
                  ? (t[s][1] += a.substring(0, r))
                  : (t.splice(0, 0, [0, a.substring(0, r)]), n++),
                (a = a.substring(r)),
                (u = u.substring(r))),
              0 !== (r = h(a, u)) &&
                ((t[n][1] = a.substring(a.length - r) + t[n][1]),
                (a = a.substring(0, a.length - r)),
                (u = u.substring(0, u.length - r))))
            var d = i + o
            0 === u.length && 0 === a.length
              ? (t.splice(n - d, d), (n -= d))
              : 0 === u.length
              ? (t.splice(n - d, d, [1, a]), (n = n - d + 1))
              : 0 === a.length
              ? (t.splice(n - d, d, [-1, u]), (n = n - d + 1))
              : (t.splice(n - d, d, [-1, u], [1, a]), (n = n - d + 2))
          }
          0 !== n && 0 === t[n - 1][0]
            ? ((t[n - 1][1] += t[n][1]), t.splice(n, 1))
            : n++,
            (i = 0),
            (o = 0),
            (u = ''),
            (a = '')
      }
  '' === t[t.length - 1][1] && t.pop()
  var b = !1
  for (n = 1; n < t.length - 1; )
    0 === t[n - 1][0] &&
      0 === t[n + 1][0] &&
      (t[n][1].substring(t[n][1].length - t[n - 1][1].length) === t[n - 1][1]
        ? ((t[n][1] =
            t[n - 1][1] +
            t[n][1].substring(0, t[n][1].length - t[n - 1][1].length)),
          (t[n + 1][1] = t[n - 1][1] + t[n + 1][1]),
          t.splice(n - 1, 1),
          (b = !0))
        : t[n][1].substring(0, t[n + 1][1].length) == t[n + 1][1] &&
          ((t[n - 1][1] += t[n + 1][1]),
          (t[n][1] = t[n][1].substring(t[n + 1][1].length) + t[n + 1][1]),
          t.splice(n + 1, 1),
          (b = !0))),
      n++
  b && p(t, e)
}
function d(t) {
  return t >= 55296 && t <= 56319
}
function b(t) {
  return t >= 56320 && t <= 57343
}
function v(t) {
  return b(t.charCodeAt(0))
}
function g(t) {
  return d(t.charCodeAt(t.length - 1))
}
function y(t, e, r, n) {
  return g(t) || v(n)
    ? null
    : (function (t) {
        for (var e = [], r = 0; r < t.length; r++)
          t[r][1].length > 0 && e.push(t[r])
        return e
      })([
        [0, t],
        [-1, e],
        [1, r],
        [0, n],
      ])
}
function _(t, e, r) {
  return l(t, e, r, !0)
}
;(_.INSERT = 1), (_.DELETE = -1), (_.EQUAL = 0)
var m = _,
  j = { exports: {} }
!(function (t, e) {
  var r = '__lodash_hash_undefined__',
    n = 9007199254740991,
    o = '[object Arguments]',
    i = '[object Boolean]',
    u = '[object Date]',
    a = '[object Function]',
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
    x = '[object Float64Array]',
    w = '[object Int8Array]',
    O = '[object Int16Array]',
    A = '[object Int32Array]',
    k = '[object Uint8Array]',
    M = '[object Uint8ClampedArray]',
    T = '[object Uint16Array]',
    L = '[object Uint32Array]',
    E = /\w*$/,
    S = /^\[object .+?Constructor\]$/,
    z = /^(?:0|[1-9]\d*)$/,
    C = {}
  ;(C[o] =
    C['[object Array]'] =
    C[_] =
    C[m] =
    C[i] =
    C[u] =
    C[j] =
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
    C[M] =
    C[T] =
    C[L] =
      !0),
    (C['[object Error]'] = C[a] = C[y] = !1)
  var P = 'object' == typeof self && self && self.Object === Object && self,
    $ =
      ('object' == typeof s && s && s.Object === Object && s) ||
      P ||
      Function('return this')(),
    N = e && !e.nodeType && e,
    D = N && t && !t.nodeType && t,
    F = D && D.exports === N
  function I(t, e) {
    return t.set(e[0], e[1]), t
  }
  function q(t, e) {
    return t.add(e), t
  }
  function R(t, e, r, n) {
    var o = -1,
      i = t ? t.length : 0
    for (n && i && (r = t[++o]); ++o < i; ) r = e(r, t[o], o, t)
    return r
  }
  function U(t) {
    var e = !1
    if (null != t && 'function' != typeof t.toString)
      try {
        e = !!(t + '')
      } catch (r) {}
    return e
  }
  function B(t) {
    var e = -1,
      r = Array(t.size)
    return (
      t.forEach(function (t, n) {
        r[++e] = [n, t]
      }),
      r
    )
  }
  function H(t, e) {
    return function (r) {
      return t(e(r))
    }
  }
  function Q(t) {
    var e = -1,
      r = Array(t.size)
    return (
      t.forEach(function (t) {
        r[++e] = t
      }),
      r
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
    rt = F ? $.Buffer : void 0,
    nt = $.Symbol,
    ot = $.Uint8Array,
    it = H(Object.getPrototypeOf, Object),
    ut = Object.create,
    at = J.propertyIsEnumerable,
    st = W.splice,
    lt = Object.getOwnPropertySymbols,
    ct = rt ? rt.isBuffer : void 0,
    ft = H(Object.keys, Object),
    ht = Dt($, 'DataView'),
    pt = Dt($, 'Map'),
    dt = Dt($, 'Promise'),
    bt = Dt($, 'Set'),
    vt = Dt($, 'WeakMap'),
    gt = Dt(Object, 'create'),
    yt = Ut(ht),
    _t = Ut(pt),
    mt = Ut(dt),
    jt = Ut(bt),
    xt = Ut(vt),
    wt = nt ? nt.prototype : void 0,
    Ot = wt ? wt.valueOf : void 0
  function At(t) {
    var e = -1,
      r = t ? t.length : 0
    for (this.clear(); ++e < r; ) {
      var n = t[e]
      this.set(n[0], n[1])
    }
  }
  function kt(t) {
    var e = -1,
      r = t ? t.length : 0
    for (this.clear(); ++e < r; ) {
      var n = t[e]
      this.set(n[0], n[1])
    }
  }
  function Mt(t) {
    var e = -1,
      r = t ? t.length : 0
    for (this.clear(); ++e < r; ) {
      var n = t[e]
      this.set(n[0], n[1])
    }
  }
  function Tt(t) {
    this.__data__ = new kt(t)
  }
  function Lt(t, e) {
    var r =
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
            (!at.call(t, 'callee') || tt.call(t) == o)
          )
        })(t)
          ? (function (t, e) {
              for (var r = -1, n = Array(t); ++r < t; ) n[r] = e(r)
              return n
            })(t.length, String)
          : [],
      n = r.length,
      i = !!n
    for (var u in t)
      (!e && !Z.call(t, u)) || (i && ('length' == u || qt(u, n))) || r.push(u)
    return r
  }
  function Et(t, e, r) {
    var n = t[e]
    ;(Z.call(t, e) && Bt(n, r) && (void 0 !== r || e in t)) || (t[e] = r)
  }
  function St(t, e) {
    for (var r = t.length; r--; ) if (Bt(t[r][0], e)) return r
    return -1
  }
  function zt(t, e, r, n, s, p, y) {
    var S
    if ((n && (S = p ? n(t, s, p, y) : n(t)), void 0 !== S)) return S
    if (!Gt(t)) return t
    var z = Ht(t)
    if (z) {
      if (
        ((S = (function (t) {
          var e = t.length,
            r = t.constructor(e)
          e &&
            'string' == typeof t[0] &&
            Z.call(t, 'index') &&
            ((r.index = t.index), (r.input = t.input))
          return r
        })(t)),
        !e)
      )
        return (function (t, e) {
          var r = -1,
            n = t.length
          e || (e = Array(n))
          for (; ++r < n; ) e[r] = t[r]
          return e
        })(t, S)
    } else {
      var P = It(t),
        $ = P == a || P == l
      if (Vt(t))
        return (function (t, e) {
          if (e) return t.slice()
          var r = new t.constructor(t.length)
          return t.copy(r), r
        })(t, e)
      if (P == h || P == o || ($ && !p)) {
        if (U(t)) return p ? t : {}
        if (
          ((S = (function (t) {
            return 'function' != typeof t.constructor || Rt(t)
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
        S = (function (t, e, r, n) {
          var o = t.constructor
          switch (e) {
            case _:
              return Pt(t)
            case i:
            case u:
              return new o(+t)
            case m:
              return (function (t, e) {
                var r = e ? Pt(t.buffer) : t.buffer
                return new t.constructor(r, t.byteOffset, t.byteLength)
              })(t, n)
            case j:
            case x:
            case w:
            case O:
            case A:
            case k:
            case M:
            case T:
            case L:
              return (function (t, e) {
                var r = e ? Pt(t.buffer) : t.buffer
                return new t.constructor(r, t.byteOffset, t.length)
              })(t, n)
            case c:
              return (function (t, e, r) {
                return R(e ? r(B(t), !0) : B(t), I, new t.constructor())
              })(t, n, r)
            case f:
            case v:
              return new o(t)
            case d:
              return (function (t) {
                var e = new t.constructor(t.source, E.exec(t))
                return (e.lastIndex = t.lastIndex), e
              })(t)
            case b:
              return (function (t, e, r) {
                return R(e ? r(Q(t), !0) : Q(t), q, new t.constructor())
              })(t, n, r)
            case g:
              return (a = t), Ot ? Object(Ot.call(a)) : {}
          }
          var a
        })(t, P, zt, e)
      }
    }
    y || (y = new Tt())
    var N = y.get(t)
    if (N) return N
    if ((y.set(t, S), !z))
      var D = r
        ? (function (t) {
            return (function (t, e, r) {
              var n = e(t)
              return Ht(t)
                ? n
                : (function (t, e) {
                    for (var r = -1, n = e.length, o = t.length; ++r < n; )
                      t[o + r] = e[r]
                    return t
                  })(n, r(t))
            })(t, Jt, Ft)
          })(t)
        : Jt(t)
    return (
      (function (t, e) {
        for (
          var r = -1, n = t ? t.length : 0;
          ++r < n && !1 !== e(t[r], r, t);

        );
      })(D || t, function (o, i) {
        D && (o = t[(i = o)]), Et(S, i, zt(o, e, r, n, i, t, y))
      }),
      S
    )
  }
  function Ct(t) {
    return (
      !(!Gt(t) || ((e = t), X && X in e)) &&
      (Wt(t) || U(t) ? et : S).test(Ut(t))
    )
    var e
  }
  function Pt(t) {
    var e = new t.constructor(t.byteLength)
    return new ot(e).set(new ot(t)), e
  }
  function $t(t, e, r, n) {
    r || (r = {})
    for (var o = -1, i = e.length; ++o < i; ) {
      var u = e[o],
        a = n ? n(r[u], t[u], u, r, t) : void 0
      Et(r, u, void 0 === a ? t[u] : a)
    }
    return r
  }
  function Nt(t, e) {
    var r,
      n,
      o = t.__data__
    return (
      'string' == (n = typeof (r = e)) ||
      'number' == n ||
      'symbol' == n ||
      'boolean' == n
        ? '__proto__' !== r
        : null === r
    )
      ? o['string' == typeof e ? 'string' : 'hash']
      : o.map
  }
  function Dt(t, e) {
    var r = (function (t, e) {
      return null == t ? void 0 : t[e]
    })(t, e)
    return Ct(r) ? r : void 0
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
        var n = e[t]
        return n === r ? void 0 : n
      }
      return Z.call(e, t) ? e[t] : void 0
    }),
    (At.prototype.has = function (t) {
      var e = this.__data__
      return gt ? void 0 !== e[t] : Z.call(e, t)
    }),
    (At.prototype.set = function (t, e) {
      return (this.__data__[t] = gt && void 0 === e ? r : e), this
    }),
    (kt.prototype.clear = function () {
      this.__data__ = []
    }),
    (kt.prototype.delete = function (t) {
      var e = this.__data__,
        r = St(e, t)
      return !(r < 0) && (r == e.length - 1 ? e.pop() : st.call(e, r, 1), !0)
    }),
    (kt.prototype.get = function (t) {
      var e = this.__data__,
        r = St(e, t)
      return r < 0 ? void 0 : e[r][1]
    }),
    (kt.prototype.has = function (t) {
      return St(this.__data__, t) > -1
    }),
    (kt.prototype.set = function (t, e) {
      var r = this.__data__,
        n = St(r, t)
      return n < 0 ? r.push([t, e]) : (r[n][1] = e), this
    }),
    (Mt.prototype.clear = function () {
      this.__data__ = {
        hash: new At(),
        map: new (pt || kt)(),
        string: new At(),
      }
    }),
    (Mt.prototype.delete = function (t) {
      return Nt(this, t).delete(t)
    }),
    (Mt.prototype.get = function (t) {
      return Nt(this, t).get(t)
    }),
    (Mt.prototype.has = function (t) {
      return Nt(this, t).has(t)
    }),
    (Mt.prototype.set = function (t, e) {
      return Nt(this, t).set(t, e), this
    }),
    (Tt.prototype.clear = function () {
      this.__data__ = new kt()
    }),
    (Tt.prototype.delete = function (t) {
      return this.__data__.delete(t)
    }),
    (Tt.prototype.get = function (t) {
      return this.__data__.get(t)
    }),
    (Tt.prototype.has = function (t) {
      return this.__data__.has(t)
    }),
    (Tt.prototype.set = function (t, e) {
      var r = this.__data__
      if (r instanceof kt) {
        var n = r.__data__
        if (!pt || n.length < 199) return n.push([t, e]), this
        r = this.__data__ = new Mt(n)
      }
      return r.set(t, e), this
    })
  var Ft = lt
      ? H(lt, Object)
      : function () {
          return []
        },
    It = function (t) {
      return tt.call(t)
    }
  function qt(t, e) {
    return (
      !!(e = null == e ? n : e) &&
      ('number' == typeof t || z.test(t)) &&
      t > -1 &&
      t % 1 == 0 &&
      t < e
    )
  }
  function Rt(t) {
    var e = t && t.constructor
    return t === (('function' == typeof e && e.prototype) || J)
  }
  function Ut(t) {
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
  function Bt(t, e) {
    return t === e || (t != t && e != e)
  }
  ;((ht && It(new ht(new ArrayBuffer(1))) != m) ||
    (pt && It(new pt()) != c) ||
    (dt && It(dt.resolve()) != p) ||
    (bt && It(new bt()) != b) ||
    (vt && It(new vt()) != y)) &&
    (It = function (t) {
      var e = tt.call(t),
        r = e == h ? t.constructor : void 0,
        n = r ? Ut(r) : void 0
      if (n)
        switch (n) {
          case yt:
            return m
          case _t:
            return c
          case mt:
            return p
          case jt:
            return b
          case xt:
            return y
        }
      return e
    })
  var Ht = Array.isArray
  function Qt(t) {
    return (
      null != t &&
      (function (t) {
        return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= n
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
    return e == a || e == l
  }
  function Gt(t) {
    var e = typeof t
    return !!t && ('object' == e || 'function' == e)
  }
  function Jt(t) {
    return Qt(t)
      ? Lt(t)
      : (function (t) {
          if (!Rt(t)) return ft(t)
          var e = []
          for (var r in Object(t))
            Z.call(t, r) && 'constructor' != r && e.push(r)
          return e
        })(t)
  }
  t.exports = function (t) {
    return zt(t, !0, !0)
  }
})(j, j.exports)
var x = { exports: {} }
!(function (t, e) {
  var r = '__lodash_hash_undefined__',
    n = 9007199254740991,
    o = '[object Arguments]',
    i = '[object Array]',
    u = '[object Boolean]',
    a = '[object Date]',
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
      O[i] =
      O[m] =
      O[u] =
      O[j] =
      O[a] =
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
  var A = 'object' == typeof s && s && s.Object === Object && s,
    k = 'object' == typeof self && self && self.Object === Object && self,
    M = A || k || Function('return this')(),
    T = e && !e.nodeType && e,
    L = T && t && !t.nodeType && t,
    E = L && L.exports === T,
    S = E && A.process,
    z = (function () {
      try {
        return S && S.binding && S.binding('util')
      } catch (t) {}
    })(),
    C = z && z.isTypedArray
  function P(t, e) {
    for (var r = -1, n = null == t ? 0 : t.length; ++r < n; )
      if (e(t[r], r, t)) return !0
    return !1
  }
  function $(t) {
    var e = -1,
      r = Array(t.size)
    return (
      t.forEach(function (t, n) {
        r[++e] = [n, t]
      }),
      r
    )
  }
  function N(t) {
    var e = -1,
      r = Array(t.size)
    return (
      t.forEach(function (t) {
        r[++e] = t
      }),
      r
    )
  }
  var D,
    F,
    I,
    q = Array.prototype,
    R = Object.prototype,
    U = M['__core-js_shared__'],
    B = Function.prototype.toString,
    H = R.hasOwnProperty,
    Q = (D = /[^.]+$/.exec((U && U.keys && U.keys.IE_PROTO) || ''))
      ? 'Symbol(src)_1.' + D
      : '',
    V = R.toString,
    W = RegExp(
      '^' +
        B.call(H)
          .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            '$1.*?'
          ) +
        '$'
    ),
    G = E ? M.Buffer : void 0,
    J = M.Symbol,
    K = M.Uint8Array,
    X = R.propertyIsEnumerable,
    Y = q.splice,
    Z = J ? J.toStringTag : void 0,
    tt = Object.getOwnPropertySymbols,
    et = G ? G.isBuffer : void 0,
    rt =
      ((F = Object.keys),
      (I = Object),
      function (t) {
        return F(I(t))
      }),
    nt = St(M, 'DataView'),
    ot = St(M, 'Map'),
    it = St(M, 'Promise'),
    ut = St(M, 'Set'),
    at = St(M, 'WeakMap'),
    st = St(Object, 'create'),
    lt = $t(nt),
    ct = $t(ot),
    ft = $t(it),
    ht = $t(ut),
    pt = $t(at),
    dt = J ? J.prototype : void 0,
    bt = dt ? dt.valueOf : void 0
  function vt(t) {
    var e = -1,
      r = null == t ? 0 : t.length
    for (this.clear(); ++e < r; ) {
      var n = t[e]
      this.set(n[0], n[1])
    }
  }
  function gt(t) {
    var e = -1,
      r = null == t ? 0 : t.length
    for (this.clear(); ++e < r; ) {
      var n = t[e]
      this.set(n[0], n[1])
    }
  }
  function yt(t) {
    var e = -1,
      r = null == t ? 0 : t.length
    for (this.clear(); ++e < r; ) {
      var n = t[e]
      this.set(n[0], n[1])
    }
  }
  function _t(t) {
    var e = -1,
      r = null == t ? 0 : t.length
    for (this.__data__ = new yt(); ++e < r; ) this.add(t[e])
  }
  function mt(t) {
    var e = (this.__data__ = new gt(t))
    this.size = e.size
  }
  function jt(t, e) {
    var r = Ft(t),
      n = !r && Dt(t),
      o = !r && !n && It(t),
      i = !r && !n && !o && Ht(t),
      u = r || n || o || i,
      a = u
        ? (function (t, e) {
            for (var r = -1, n = Array(t); ++r < t; ) n[r] = e(r)
            return n
          })(t.length, String)
        : [],
      s = a.length
    for (var l in t)
      (!e && !H.call(t, l)) ||
        (u &&
          ('length' == l ||
            (o && ('offset' == l || 'parent' == l)) ||
            (i && ('buffer' == l || 'byteLength' == l || 'byteOffset' == l)) ||
            Pt(l, s))) ||
        a.push(l)
    return a
  }
  function xt(t, e) {
    for (var r = t.length; r--; ) if (Nt(t[r][0], e)) return r
    return -1
  }
  function wt(t) {
    return null == t
      ? void 0 === t
        ? '[object Undefined]'
        : '[object Null]'
      : Z && Z in Object(t)
      ? (function (t) {
          var e = H.call(t, Z),
            r = t[Z]
          try {
            t[Z] = void 0
            var n = !0
          } catch (i) {}
          var o = V.call(t)
          n && (e ? (t[Z] = r) : delete t[Z])
          return o
        })(t)
      : (function (t) {
          return V.call(t)
        })(t)
  }
  function Ot(t) {
    return Bt(t) && wt(t) == o
  }
  function At(t, e, r, n, s) {
    return (
      t === e ||
      (null == t || null == e || (!Bt(t) && !Bt(e))
        ? t != t && e != e
        : (function (t, e, r, n, s, c) {
            var d = Ft(t),
              _ = Ft(e),
              x = d ? i : Ct(t),
              w = _ ? i : Ct(e),
              O = (x = x == o ? p : x) == p,
              A = (w = w == o ? p : w) == p,
              k = x == w
            if (k && It(t)) {
              if (!It(e)) return !1
              ;(d = !0), (O = !1)
            }
            if (k && !O)
              return (
                c || (c = new mt()),
                d || Ht(t)
                  ? Tt(t, e, r, n, s, c)
                  : (function (t, e, r, n, o, i, s) {
                      switch (r) {
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
                        case u:
                        case a:
                        case h:
                          return Nt(+t, +e)
                        case l:
                          return t.name == e.name && t.message == e.message
                        case b:
                        case g:
                          return t == e + ''
                        case f:
                          var c = $
                        case v:
                          if ((c || (c = N), t.size != e.size && !(1 & n)))
                            return !1
                          var p = s.get(t)
                          if (p) return p == e
                          ;(n |= 2), s.set(t, e)
                          var d = Tt(c(t), c(e), n, o, i, s)
                          return s.delete(t), d
                        case y:
                          if (bt) return bt.call(t) == bt.call(e)
                      }
                      return !1
                    })(t, e, x, r, n, s, c)
              )
            if (!(1 & r)) {
              var M = O && H.call(t, '__wrapped__'),
                T = A && H.call(e, '__wrapped__')
              if (M || T) {
                var L = M ? t.value() : t,
                  E = T ? e.value() : e
                return c || (c = new mt()), s(L, E, r, n, c)
              }
            }
            if (!k) return !1
            return (
              c || (c = new mt()),
              (function (t, e, r, n, o, i) {
                var u = 1 & r,
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
                  if (n) var g = u ? n(v, b, f, e, t, i) : n(b, v, f, t, e, i)
                  if (!(void 0 === g ? b === v || o(b, v, r, n, i) : g)) {
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
              })(t, e, r, n, s, c)
            )
          })(t, e, r, n, At, s))
    )
  }
  function kt(t) {
    return (
      !(
        !Ut(t) ||
        (function (t) {
          return !!Q && Q in t
        })(t)
      ) && (qt(t) ? W : x).test($t(t))
    )
  }
  function Mt(t) {
    if (
      (e = t) !==
      (('function' == typeof (r = e && e.constructor) && r.prototype) || R)
    )
      return rt(t)
    var e,
      r,
      n = []
    for (var o in Object(t)) H.call(t, o) && 'constructor' != o && n.push(o)
    return n
  }
  function Tt(t, e, r, n, o, i) {
    var u = 1 & r,
      a = t.length,
      s = e.length
    if (a != s && !(u && s > a)) return !1
    var l = i.get(t)
    if (l && i.get(e)) return l == e
    var c = -1,
      f = !0,
      h = 2 & r ? new _t() : void 0
    for (i.set(t, e), i.set(e, t); ++c < a; ) {
      var p = t[c],
        d = e[c]
      if (n) var b = u ? n(d, p, c, e, t, i) : n(p, d, c, t, e, i)
      if (void 0 !== b) {
        if (b) continue
        f = !1
        break
      }
      if (h) {
        if (
          !P(e, function (t, e) {
            if (!h.has(e) && (p === t || o(p, t, r, n, i))) return h.push(e)
          })
        ) {
          f = !1
          break
        }
      } else if (p !== d && !o(p, d, r, n, i)) {
        f = !1
        break
      }
    }
    return i.delete(t), i.delete(e), f
  }
  function Lt(t) {
    return (function (t, e, r) {
      var n = e(t)
      return Ft(t)
        ? n
        : (function (t, e) {
            for (var r = -1, n = e.length, o = t.length; ++r < n; )
              t[o + r] = e[r]
            return t
          })(n, r(t))
    })(t, Qt, zt)
  }
  function Et(t, e) {
    var r,
      n,
      o = t.__data__
    return (
      'string' == (n = typeof (r = e)) ||
      'number' == n ||
      'symbol' == n ||
      'boolean' == n
        ? '__proto__' !== r
        : null === r
    )
      ? o['string' == typeof e ? 'string' : 'hash']
      : o.map
  }
  function St(t, e) {
    var r = (function (t, e) {
      return null == t ? void 0 : t[e]
    })(t, e)
    return kt(r) ? r : void 0
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
        var n = e[t]
        return n === r ? void 0 : n
      }
      return H.call(e, t) ? e[t] : void 0
    }),
    (vt.prototype.has = function (t) {
      var e = this.__data__
      return st ? void 0 !== e[t] : H.call(e, t)
    }),
    (vt.prototype.set = function (t, e) {
      var n = this.__data__
      return (
        (this.size += this.has(t) ? 0 : 1),
        (n[t] = st && void 0 === e ? r : e),
        this
      )
    }),
    (gt.prototype.clear = function () {
      ;(this.__data__ = []), (this.size = 0)
    }),
    (gt.prototype.delete = function (t) {
      var e = this.__data__,
        r = xt(e, t)
      return (
        !(r < 0) &&
        (r == e.length - 1 ? e.pop() : Y.call(e, r, 1), --this.size, !0)
      )
    }),
    (gt.prototype.get = function (t) {
      var e = this.__data__,
        r = xt(e, t)
      return r < 0 ? void 0 : e[r][1]
    }),
    (gt.prototype.has = function (t) {
      return xt(this.__data__, t) > -1
    }),
    (gt.prototype.set = function (t, e) {
      var r = this.__data__,
        n = xt(r, t)
      return n < 0 ? (++this.size, r.push([t, e])) : (r[n][1] = e), this
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
      var r = Et(this, t),
        n = r.size
      return r.set(t, e), (this.size += r.size == n ? 0 : 1), this
    }),
    (_t.prototype.add = _t.prototype.push =
      function (t) {
        return this.__data__.set(t, r), this
      }),
    (_t.prototype.has = function (t) {
      return this.__data__.has(t)
    }),
    (mt.prototype.clear = function () {
      ;(this.__data__ = new gt()), (this.size = 0)
    }),
    (mt.prototype.delete = function (t) {
      var e = this.__data__,
        r = e.delete(t)
      return (this.size = e.size), r
    }),
    (mt.prototype.get = function (t) {
      return this.__data__.get(t)
    }),
    (mt.prototype.has = function (t) {
      return this.__data__.has(t)
    }),
    (mt.prototype.set = function (t, e) {
      var r = this.__data__
      if (r instanceof gt) {
        var n = r.__data__
        if (!ot || n.length < 199)
          return n.push([t, e]), (this.size = ++r.size), this
        r = this.__data__ = new yt(n)
      }
      return r.set(t, e), (this.size = r.size), this
    })
  var zt = tt
      ? function (t) {
          return null == t
            ? []
            : ((t = Object(t)),
              (function (t, e) {
                for (
                  var r = -1, n = null == t ? 0 : t.length, o = 0, i = [];
                  ++r < n;

                ) {
                  var u = t[r]
                  e(u, r, t) && (i[o++] = u)
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
      !!(e = null == e ? n : e) &&
      ('number' == typeof t || w.test(t)) &&
      t > -1 &&
      t % 1 == 0 &&
      t < e
    )
  }
  function $t(t) {
    if (null != t) {
      try {
        return B.call(t)
      } catch (e) {}
      try {
        return t + ''
      } catch (e) {}
    }
    return ''
  }
  function Nt(t, e) {
    return t === e || (t != t && e != e)
  }
  ;((nt && Ct(new nt(new ArrayBuffer(1))) != j) ||
    (ot && Ct(new ot()) != f) ||
    (it && Ct(it.resolve()) != d) ||
    (ut && Ct(new ut()) != v) ||
    (at && Ct(new at()) != _)) &&
    (Ct = function (t) {
      var e = wt(t),
        r = e == p ? t.constructor : void 0,
        n = r ? $t(r) : ''
      if (n)
        switch (n) {
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
  var Dt = Ot(
      (function () {
        return arguments
      })()
    )
      ? Ot
      : function (t) {
          return Bt(t) && H.call(t, 'callee') && !X.call(t, 'callee')
        },
    Ft = Array.isArray
  var It =
    et ||
    function () {
      return !1
    }
  function qt(t) {
    if (!Ut(t)) return !1
    var e = wt(t)
    return (
      e == c ||
      '[object GeneratorFunction]' == e ||
      '[object AsyncFunction]' == e ||
      '[object Proxy]' == e
    )
  }
  function Rt(t) {
    return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= n
  }
  function Ut(t) {
    var e = typeof t
    return null != t && ('object' == e || 'function' == e)
  }
  function Bt(t) {
    return null != t && 'object' == typeof t
  }
  var Ht = C
    ? (function (t) {
        return function (e) {
          return t(e)
        }
      })(C)
    : function (t) {
        return Bt(t) && Rt(t.length) && !!O[wt(t)]
      }
  function Qt(t) {
    return null != (e = t) && Rt(e.length) && !qt(e) ? jt(t) : Mt(t)
    var e
  }
  t.exports = function (t, e) {
    return At(t, e)
  }
})(x, x.exports)
var w = {},
  O =
    (s && s.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t }
    }
Object.defineProperty(w, '__esModule', { value: !0 })
var A,
  k = O(j.exports),
  M = O(x.exports)
!(function (t) {
  ;(t.compose = function (t, e, r) {
    void 0 === t && (t = {}),
      void 0 === e && (e = {}),
      'object' != typeof t && (t = {}),
      'object' != typeof e && (e = {})
    var n = k.default(e)
    for (var o in (r ||
      (n = Object.keys(n).reduce(function (t, e) {
        return null != n[e] && (t[e] = n[e]), t
      }, {})),
    t))
      void 0 !== t[o] && void 0 === e[o] && (n[o] = t[o])
    return Object.keys(n).length > 0 ? n : void 0
  }),
    (t.diff = function (t, e) {
      void 0 === t && (t = {}),
        void 0 === e && (e = {}),
        'object' != typeof t && (t = {}),
        'object' != typeof e && (e = {})
      var r = Object.keys(t)
        .concat(Object.keys(e))
        .reduce(function (r, n) {
          return (
            M.default(t[n], e[n]) || (r[n] = void 0 === e[n] ? null : e[n]), r
          )
        }, {})
      return Object.keys(r).length > 0 ? r : void 0
    }),
    (t.invert = function (t, e) {
      void 0 === t && (t = {}), void 0 === e && (e = {}), (t = t || {})
      var r = Object.keys(e).reduce(function (r, n) {
        return e[n] !== t[n] && void 0 !== t[n] && (r[n] = e[n]), r
      }, {})
      return Object.keys(t).reduce(function (r, n) {
        return t[n] !== e[n] && void 0 === e[n] && (r[n] = null), r
      }, r)
    }),
    (t.transform = function (t, e, r) {
      if ((void 0 === r && (r = !1), 'object' != typeof t)) return e
      if ('object' == typeof e) {
        if (!r) return e
        var n = Object.keys(e).reduce(function (r, n) {
          return void 0 === t[n] && (r[n] = e[n]), r
        }, {})
        return Object.keys(n).length > 0 ? n : void 0
      }
    })
})(A || (A = {})),
  (w.default = A)
var T,
  L,
  E = {},
  S = {}
function z() {
  if (L) return E
  L = 1
  var t =
    (s && s.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t }
    }
  Object.defineProperty(E, '__esModule', { value: !0 })
  var e,
    r = t(
      (function () {
        if (T) return S
        T = 1
        var t =
          (s && s.__importDefault) ||
          function (t) {
            return t && t.__esModule ? t : { default: t }
          }
        Object.defineProperty(S, '__esModule', { value: !0 })
        var e = t(z()),
          r = (function () {
            function t(t) {
              ;(this.ops = t), (this.index = 0), (this.offset = 0)
            }
            return (
              (t.prototype.hasNext = function () {
                return this.peekLength() < 1 / 0
              }),
              (t.prototype.next = function (t) {
                t || (t = 1 / 0)
                var r = this.ops[this.index]
                if (r) {
                  var n = this.offset,
                    o = e.default.length(r)
                  if (
                    (t >= o - n
                      ? ((t = o - n), (this.index += 1), (this.offset = 0))
                      : (this.offset += t),
                    'number' == typeof r.delete)
                  )
                    return { delete: t }
                  var i = {}
                  return (
                    r.attributes && (i.attributes = r.attributes),
                    'number' == typeof r.retain
                      ? (i.retain = t)
                      : (i.insert =
                          'string' == typeof r.insert
                            ? r.insert.substr(n, t)
                            : r.insert),
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
                    r = this.next(),
                    n = this.ops.slice(this.index)
                  return (this.offset = t), (this.index = e), [r].concat(n)
                }
                return []
              }),
              t
            )
          })()
        return (S.default = r), S
      })()
    )
  return (
    (function (t) {
      ;(t.iterator = function (t) {
        return new r.default(t)
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
    (E.default = e),
    E
  )
}
var C =
    (s && s.__importDefault) ||
    function (t) {
      return t && t.__esModule ? t : { default: t }
    },
  P = C(m),
  $ = C(j.exports),
  N = C(x.exports),
  D = C(w),
  F = C(z()),
  I = String.fromCharCode(0),
  q = (function () {
    function t(t) {
      this.ops = Array.isArray(t)
        ? t
        : null != t && Array.isArray(t.ops)
        ? t.ops
        : []
    }
    return (
      (t.prototype.insert = function (t, e) {
        var r = {}
        return 'string' == typeof t && 0 === t.length
          ? this
          : ((r.insert = t),
            null != e &&
              'object' == typeof e &&
              Object.keys(e).length > 0 &&
              (r.attributes = e),
            this.push(r))
      }),
      (t.prototype.delete = function (t) {
        return t <= 0 ? this : this.push({ delete: t })
      }),
      (t.prototype.retain = function (t, e) {
        if (t <= 0) return this
        var r = { retain: t }
        return (
          null != e &&
            'object' == typeof e &&
            Object.keys(e).length > 0 &&
            (r.attributes = e),
          this.push(r)
        )
      }),
      (t.prototype.push = function (t) {
        var e = this.ops.length,
          r = this.ops[e - 1]
        if (((t = $.default(t)), 'object' == typeof r)) {
          if ('number' == typeof t.delete && 'number' == typeof r.delete)
            return (this.ops[e - 1] = { delete: r.delete + t.delete }), this
          if (
            'number' == typeof r.delete &&
            null != t.insert &&
            'object' != typeof (r = this.ops[(e -= 1) - 1])
          )
            return this.ops.unshift(t), this
          if (N.default(t.attributes, r.attributes)) {
            if ('string' == typeof t.insert && 'string' == typeof r.insert)
              return (
                (this.ops[e - 1] = { insert: r.insert + t.insert }),
                'object' == typeof t.attributes &&
                  (this.ops[e - 1].attributes = t.attributes),
                this
              )
            if ('number' == typeof t.retain && 'number' == typeof r.retain)
              return (
                (this.ops[e - 1] = { retain: r.retain + t.retain }),
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
          r = []
        return (
          this.forEach(function (n) {
            ;(t(n) ? e : r).push(n)
          }),
          [e, r]
        )
      }),
      (t.prototype.reduce = function (t, e) {
        return this.ops.reduce(t, e)
      }),
      (t.prototype.changeLength = function () {
        return this.reduce(function (t, e) {
          return e.insert
            ? t + F.default.length(e)
            : e.delete
            ? t - e.delete
            : t
        }, 0)
      }),
      (t.prototype.length = function () {
        return this.reduce(function (t, e) {
          return t + F.default.length(e)
        }, 0)
      }),
      (t.prototype.slice = function (e, r) {
        void 0 === e && (e = 0), void 0 === r && (r = 1 / 0)
        for (
          var n = [], o = F.default.iterator(this.ops), i = 0;
          i < r && o.hasNext();

        ) {
          var u = void 0
          i < e ? (u = o.next(e - i)) : ((u = o.next(r - i)), n.push(u)),
            (i += F.default.length(u))
        }
        return new t(n)
      }),
      (t.prototype.compose = function (e) {
        var r = F.default.iterator(this.ops),
          n = F.default.iterator(e.ops),
          o = [],
          i = n.peek()
        if (null != i && 'number' == typeof i.retain && null == i.attributes) {
          for (
            var u = i.retain;
            'insert' === r.peekType() && r.peekLength() <= u;

          )
            (u -= r.peekLength()), o.push(r.next())
          i.retain - u > 0 && n.next(i.retain - u)
        }
        for (var a = new t(o); r.hasNext() || n.hasNext(); )
          if ('insert' === n.peekType()) a.push(n.next())
          else if ('delete' === r.peekType()) a.push(r.next())
          else {
            var s = Math.min(r.peekLength(), n.peekLength()),
              l = r.next(s),
              c = n.next(s)
            if ('number' == typeof c.retain) {
              var f = {}
              'number' == typeof l.retain
                ? (f.retain = s)
                : (f.insert = l.insert)
              var h = D.default.compose(
                l.attributes,
                c.attributes,
                'number' == typeof l.retain
              )
              if (
                (h && (f.attributes = h),
                a.push(f),
                !n.hasNext() && N.default(a.ops[a.ops.length - 1], f))
              ) {
                var p = new t(r.rest())
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
        var r = new t(this.ops.slice())
        return (
          e.ops.length > 0 &&
            (r.push(e.ops[0]), (r.ops = r.ops.concat(e.ops.slice(1)))),
          r
        )
      }),
      (t.prototype.diff = function (e, r) {
        if (this.ops === e.ops) return new t()
        var n = [this, e].map(function (t) {
            return t
              .map(function (r) {
                if (null != r.insert)
                  return 'string' == typeof r.insert ? r.insert : I
                throw new Error(
                  'diff() called ' + (t === e ? 'on' : 'with') + ' non-document'
                )
              })
              .join('')
          }),
          o = new t(),
          i = P.default(n[0], n[1], r),
          u = F.default.iterator(this.ops),
          a = F.default.iterator(e.ops)
        return (
          i.forEach(function (t) {
            for (var e = t[1].length; e > 0; ) {
              var r = 0
              switch (t[0]) {
                case P.default.INSERT:
                  ;(r = Math.min(a.peekLength(), e)), o.push(a.next(r))
                  break
                case P.default.DELETE:
                  ;(r = Math.min(e, u.peekLength())), u.next(r), o.delete(r)
                  break
                case P.default.EQUAL:
                  r = Math.min(u.peekLength(), a.peekLength(), e)
                  var n = u.next(r),
                    i = a.next(r)
                  N.default(n.insert, i.insert)
                    ? o.retain(r, D.default.diff(n.attributes, i.attributes))
                    : o.push(i).delete(r)
              }
              e -= r
            }
          }),
          o.chop()
        )
      }),
      (t.prototype.eachLine = function (e, r) {
        void 0 === r && (r = '\n')
        for (
          var n = F.default.iterator(this.ops), o = new t(), i = 0;
          n.hasNext();

        ) {
          if ('insert' !== n.peekType()) return
          var u = n.peek(),
            a = F.default.length(u) - n.peekLength(),
            s = 'string' == typeof u.insert ? u.insert.indexOf(r, a) - a : -1
          if (s < 0) o.push(n.next())
          else if (s > 0) o.push(n.next(s))
          else {
            if (!1 === e(o, n.next(1).attributes || {}, i)) return
            ;(i += 1), (o = new t())
          }
        }
        o.length() > 0 && e(o, {}, i)
      }),
      (t.prototype.invert = function (e) {
        var r = new t()
        return (
          this.reduce(function (t, n) {
            if (n.insert) r.delete(F.default.length(n))
            else {
              if (n.retain && null == n.attributes)
                return r.retain(n.retain), t + n.retain
              if (n.delete || (n.retain && n.attributes)) {
                var o = n.delete || n.retain
                return (
                  e.slice(t, t + o).forEach(function (t) {
                    n.delete
                      ? r.push(t)
                      : n.retain &&
                        n.attributes &&
                        r.retain(
                          F.default.length(t),
                          D.default.invert(n.attributes, t.attributes)
                        )
                  }),
                  t + o
                )
              }
            }
            return t
          }, 0),
          r.chop()
        )
      }),
      (t.prototype.transform = function (e, r) {
        if ((void 0 === r && (r = !1), (r = !!r), 'number' == typeof e))
          return this.transformPosition(e, r)
        for (
          var n = e,
            o = F.default.iterator(this.ops),
            i = F.default.iterator(n.ops),
            u = new t();
          o.hasNext() || i.hasNext();

        )
          if ('insert' !== o.peekType() || (!r && 'insert' === i.peekType()))
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
                    D.default.transform(s.attributes, l.attributes, r)
                  )
            }
          else u.retain(F.default.length(o.next()))
        return u.chop()
      }),
      (t.prototype.transformPosition = function (t, e) {
        void 0 === e && (e = !1), (e = !!e)
        for (
          var r = F.default.iterator(this.ops), n = 0;
          r.hasNext() && n <= t;

        ) {
          var o = r.peekLength(),
            i = r.peekType()
          r.next(),
            'delete' !== i
              ? ('insert' === i && (n < t || !e) && (t += o), (n += o))
              : (t -= Math.min(o, t - n))
        }
        return t
      }),
      (t.Op = F.default),
      (t.AttributeMap = D.default),
      t
    )
  })()
const R = {
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
  U = e({
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
          -1 !== Object.keys(R).indexOf(t),
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
    setup: (e, a) => {
      let s, l
      r(() => {
        f()
      }),
        n(() => {
          s = null
        })
      const c = o(),
        f = () => {
          var r
          if (c.value) {
            if (((l = h()), e.modules))
              if (Array.isArray(e.modules))
                for (const r of e.modules)
                  t.register(`modules/${r.name}`, r.module)
              else t.register(`modules/${e.modules.name}`, e.modules.module)
            ;(s = new t(c.value, l)),
              j(e.content),
              s.on('text-change', v),
              s.on('selection-change', y),
              s.on('editor-change', _),
              'bubble' !== e.theme && c.value.classList.remove('ql-bubble'),
              'snow' !== e.theme && c.value.classList.remove('ql-snow'),
              null === (r = s.getModule('toolbar')) ||
                void 0 === r ||
                r.container.addEventListener('mousedown', (t) => {
                  t.preventDefault()
                }),
              a.emit('ready', s)
          }
        },
        h = () => {
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
                      : R[e.toolbar]
                  }
                })(),
              }),
            e.modules)
          ) {
            const r = (() => {
              var t, r
              const n = {}
              if (Array.isArray(e.modules))
                for (const o of e.modules)
                  n[o.name] = null !== (t = o.options) && void 0 !== t ? t : {}
              else
                n[e.modules.name] =
                  null !== (r = e.modules.options) && void 0 !== r ? r : {}
              return n
            })()
            t.modules = Object.assign({}, t.modules, r)
          }
          return Object.assign({}, e.globalOptions, e.options, t)
        },
        p = (t) => ('object' == typeof t && t ? t.slice() : t)
      let d
      const b = (t) => {
          if (typeof d == typeof t) {
            if (t === d) return !0
            if ('object' == typeof t && t && 'object' == typeof d && d)
              return (
                (e = d.diff(t)),
                !Object.values(e.ops).some(
                  (t) => !t.retain || 1 !== Object.keys(t).length
                )
              )
          }
          var e
          return !1
        },
        v = (t, r, n) => {
          ;(d = p(m())),
            b(e.content) || a.emit('update:content', d),
            a.emit('textChange', { delta: t, oldContents: r, source: n })
        },
        g = o(),
        y = (t, e, r) => {
          ;(g.value = !!(null == s ? void 0 : s.hasFocus())),
            a.emit('selectionChange', { range: t, oldRange: e, source: r })
        }
      i(g, (t) => {
        a.emit(t ? 'focus' : 'blur', c)
      })
      const _ = (...t) => {
          'text-change' === t[0] &&
            a.emit('editorChange', {
              name: t[0],
              delta: t[1],
              oldContents: t[2],
              source: t[3],
            }),
            'selection-change' === t[0] &&
              a.emit('editorChange', {
                name: t[0],
                range: t[1],
                oldRange: t[2],
                source: t[3],
              })
        },
        m = (t, r) =>
          'html' === e.contentType
            ? O()
            : 'text' === e.contentType
            ? x(t, r)
            : null == s
            ? void 0
            : s.getContents(t, r),
        j = (t, r = 'api') => {
          const n = t || ('delta' === e.contentType ? new q() : '')
          'html' === e.contentType
            ? A(n)
            : 'text' === e.contentType
            ? w(n, r)
            : null == s || s.setContents(n, r),
            (d = p(n))
        },
        x = (t, e) => {
          var r
          return null !== (r = null == s ? void 0 : s.getText(t, e)) &&
            void 0 !== r
            ? r
            : ''
        },
        w = (t, e = 'api') => {
          null == s || s.setText(t, e)
        },
        O = () => {
          var t
          return null !== (t = null == s ? void 0 : s.root.innerHTML) &&
            void 0 !== t
            ? t
            : ''
        },
        A = (t) => {
          s && (s.root.innerHTML = t)
        }
      return (
        i(
          () => e.content,
          (t) => {
            if (!s || !t || b(t)) return
            const e = s.getSelection()
            e && u(() => (null == s ? void 0 : s.setSelection(e))), j(t)
          },
          { deep: !0 }
        ),
        i(
          () => e.enable,
          (t) => {
            s && s.enable(t)
          }
        ),
        {
          editor: c,
          getEditor: () => c.value,
          getToolbar: () => {
            var t
            return null === (t = null == s ? void 0 : s.getModule('toolbar')) ||
              void 0 === t
              ? void 0
              : t.container
          },
          getQuill: () => {
            if (s) return s
            throw 'The quill editor hasn\'t been instantiated yet,\n                  make sure to call this method when the editor ready\n                  or use v-on:ready="onReady(quill)" event instead.'
          },
          getContents: m,
          setContents: j,
          getHTML: O,
          setHTML: A,
          pasteHTML: (t, e = 'api') => {
            const r = null == s ? void 0 : s.clipboard.convert(t)
            r && (null == s || s.setContents(r, e))
          },
          focus: () => {
            null == s || s.focus()
          },
          getText: x,
          setText: w,
          reinit: () => {
            u(() => {
              var t
              !a.slots.toolbar &&
                s &&
                (null === (t = s.getModule('toolbar')) ||
                  void 0 === t ||
                  t.container.remove()),
                f()
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
        a('div', { ref: 'editor', ...this.$attrs }),
      ]
    },
  })
export { q as Delta, U as QuillEditor }
