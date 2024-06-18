/*!
 * VueQuill @vueup/vue-quill v0.0.0-development
 * https://vueup.github.io/vue-quill/
 *
 * Includes quill v1.3.7
 * https://quilljs.com/
 *
 * Copyright (c) 2024 Ahmad Luthfi Masruri
 * Released under the MIT license
 * Date: 2024-06-18T06:02:45.659Z
 */
!(function (t, e) {
  'object' == typeof exports && 'undefined' != typeof module
    ? e(exports, require('vue'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'vue'], e)
    : e(
        ((t =
          'undefined' != typeof globalThis ? globalThis : t || self).VueQuill =
          {}),
        t.Vue
      )
})(this, function (t, e) {
  'use strict'
  var n =
      'undefined' != typeof global
        ? global
        : 'undefined' != typeof self
        ? self
        : 'undefined' != typeof window
        ? window
        : {},
    r = [],
    o = [],
    i = 'undefined' != typeof Uint8Array ? Uint8Array : Array,
    l = !1
  function a() {
    l = !0
    for (
      var t =
          'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
        e = 0,
        n = t.length;
      e < n;
      ++e
    )
      (r[e] = t[e]), (o[t.charCodeAt(e)] = e)
    ;(o['-'.charCodeAt(0)] = 62), (o['_'.charCodeAt(0)] = 63)
  }
  function u(t, e, n) {
    for (var o, i = [], l = e; l < n; l += 3)
      i.push(
        r[((o = (t[l] << 16) + (t[l + 1] << 8) + t[l + 2]) >> 18) & 63] +
          r[(o >> 12) & 63] +
          r[(o >> 6) & 63] +
          r[63 & o]
      )
    return i.join('')
  }
  function s(t) {
    var e
    l || a()
    for (
      var n = t.length, o = n % 3, i = '', s = [], c = 16383, f = 0, p = n - o;
      f < p;
      f += c
    )
      s.push(u(t, f, f + c > p ? p : f + c))
    return (
      1 === o
        ? ((i += r[(e = t[n - 1]) >> 2]), (i += r[(e << 4) & 63]), (i += '=='))
        : 2 === o &&
          ((i += r[(e = (t[n - 2] << 8) + t[n - 1]) >> 10]),
          (i += r[(e >> 4) & 63]),
          (i += r[(e << 2) & 63]),
          (i += '=')),
      s.push(i),
      s.join('')
    )
  }
  function c(t, e, n, r, o) {
    var i,
      l,
      a = 8 * o - r - 1,
      u = (1 << a) - 1,
      s = u >> 1,
      c = -7,
      f = n ? o - 1 : 0,
      p = n ? -1 : 1,
      h = t[e + f]
    for (
      f += p, i = h & ((1 << -c) - 1), h >>= -c, c += a;
      c > 0;
      i = 256 * i + t[e + f], f += p, c -= 8
    );
    for (
      l = i & ((1 << -c) - 1), i >>= -c, c += r;
      c > 0;
      l = 256 * l + t[e + f], f += p, c -= 8
    );
    if (0 === i) i = 1 - s
    else {
      if (i === u) return l ? NaN : (1 / 0) * (h ? -1 : 1)
      ;(l += Math.pow(2, r)), (i -= s)
    }
    return (h ? -1 : 1) * l * Math.pow(2, i - r)
  }
  function f(t, e, n, r, o, i) {
    var l,
      a,
      u,
      s = 8 * i - o - 1,
      c = (1 << s) - 1,
      f = c >> 1,
      p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
      h = r ? 0 : i - 1,
      d = r ? 1 : -1,
      y = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0
    for (
      e = Math.abs(e),
        isNaN(e) || e === 1 / 0
          ? ((a = isNaN(e) ? 1 : 0), (l = c))
          : ((l = Math.floor(Math.log(e) / Math.LN2)),
            e * (u = Math.pow(2, -l)) < 1 && (l--, (u *= 2)),
            (e += l + f >= 1 ? p / u : p * Math.pow(2, 1 - f)) * u >= 2 &&
              (l++, (u /= 2)),
            l + f >= c
              ? ((a = 0), (l = c))
              : l + f >= 1
              ? ((a = (e * u - 1) * Math.pow(2, o)), (l += f))
              : ((a = e * Math.pow(2, f - 1) * Math.pow(2, o)), (l = 0)));
      o >= 8;
      t[n + h] = 255 & a, h += d, a /= 256, o -= 8
    );
    for (
      l = (l << o) | a, s += o;
      s > 0;
      t[n + h] = 255 & l, h += d, l /= 256, s -= 8
    );
    t[n + h - d] |= 128 * y
  }
  var p = {}.toString,
    h =
      Array.isArray ||
      function (t) {
        return '[object Array]' == p.call(t)
      }
  function d() {
    return v.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823
  }
  function y(t, e) {
    if (d() < e) throw new RangeError('Invalid typed array length')
    return (
      v.TYPED_ARRAY_SUPPORT
        ? ((t = new Uint8Array(e)).__proto__ = v.prototype)
        : (null === t && (t = new v(e)), (t.length = e)),
      t
    )
  }
  function v(t, e, n) {
    if (!(v.TYPED_ARRAY_SUPPORT || this instanceof v)) return new v(t, e, n)
    if ('number' == typeof t) {
      if ('string' == typeof e)
        throw new Error(
          'If encoding is specified then the first argument must be a string'
        )
      return m(this, t)
    }
    return b(this, t, e, n)
  }
  function b(t, e, n, r) {
    if ('number' == typeof e)
      throw new TypeError('"value" argument must not be a number')
    return 'undefined' != typeof ArrayBuffer && e instanceof ArrayBuffer
      ? (function (t, e, n, r) {
          if (n < 0 || e.byteLength < n)
            throw new RangeError("'offset' is out of bounds")
          if (e.byteLength < n + (r || 0))
            throw new RangeError("'length' is out of bounds")
          e =
            void 0 === n && void 0 === r
              ? new Uint8Array(e)
              : void 0 === r
              ? new Uint8Array(e, n)
              : new Uint8Array(e, n, r)
          v.TYPED_ARRAY_SUPPORT
            ? ((t = e).__proto__ = v.prototype)
            : (t = _(t, e))
          return t
        })(t, e, n, r)
      : 'string' == typeof e
      ? (function (t, e, n) {
          ;('string' == typeof n && '' !== n) || (n = 'utf8')
          if (!v.isEncoding(n))
            throw new TypeError('"encoding" must be a valid string encoding')
          var r = 0 | x(e, n),
            o = (t = y(t, r)).write(e, n)
          o !== r && (t = t.slice(0, o))
          return t
        })(t, e, n)
      : (function (t, e) {
          if (w(e)) {
            var n = 0 | O(e.length)
            return 0 === (t = y(t, n)).length || e.copy(t, 0, 0, n), t
          }
          if (e) {
            if (
              ('undefined' != typeof ArrayBuffer &&
                e.buffer instanceof ArrayBuffer) ||
              'length' in e
            )
              return 'number' != typeof e.length || (r = e.length) != r
                ? y(t, 0)
                : _(t, e)
            if ('Buffer' === e.type && h(e.data)) return _(t, e.data)
          }
          var r
          throw new TypeError(
            'First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.'
          )
        })(t, e)
  }
  function g(t) {
    if ('number' != typeof t)
      throw new TypeError('"size" argument must be a number')
    if (t < 0) throw new RangeError('"size" argument must not be negative')
  }
  function m(t, e) {
    if ((g(e), (t = y(t, e < 0 ? 0 : 0 | O(e))), !v.TYPED_ARRAY_SUPPORT))
      for (var n = 0; n < e; ++n) t[n] = 0
    return t
  }
  function _(t, e) {
    var n = e.length < 0 ? 0 : 0 | O(e.length)
    t = y(t, n)
    for (var r = 0; r < n; r += 1) t[r] = 255 & e[r]
    return t
  }
  function O(t) {
    if (t >= d())
      throw new RangeError(
        'Attempt to allocate Buffer larger than maximum size: 0x' +
          d().toString(16) +
          ' bytes'
      )
    return 0 | t
  }
  function w(t) {
    return !(null == t || !t._isBuffer)
  }
  function x(t, e) {
    if (w(t)) return t.length
    if (
      'undefined' != typeof ArrayBuffer &&
      'function' == typeof ArrayBuffer.isView &&
      (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
    )
      return t.byteLength
    'string' != typeof t && (t = '' + t)
    var n = t.length
    if (0 === n) return 0
    for (var r = !1; ; )
      switch (e) {
        case 'ascii':
        case 'latin1':
        case 'binary':
          return n
        case 'utf8':
        case 'utf-8':
        case void 0:
          return Z(t).length
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return 2 * n
        case 'hex':
          return n >>> 1
        case 'base64':
          return X(t).length
        default:
          if (r) return Z(t).length
          ;(e = ('' + e).toLowerCase()), (r = !0)
      }
  }
  function E(t, e, n) {
    var r = !1
    if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return ''
    if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
      return ''
    if ((n >>>= 0) <= (e >>>= 0)) return ''
    for (t || (t = 'utf8'); ; )
      switch (t) {
        case 'hex':
          return D(this, e, n)
        case 'utf8':
        case 'utf-8':
          return R(this, e, n)
        case 'ascii':
          return I(this, e, n)
        case 'latin1':
        case 'binary':
          return B(this, e, n)
        case 'base64':
          return L(this, e, n)
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return U(this, e, n)
        default:
          if (r) throw new TypeError('Unknown encoding: ' + t)
          ;(t = (t + '').toLowerCase()), (r = !0)
      }
  }
  function A(t, e, n) {
    var r = t[e]
    ;(t[e] = t[n]), (t[n] = r)
  }
  function k(t, e, n, r, o) {
    if (0 === t.length) return -1
    if (
      ('string' == typeof n
        ? ((r = n), (n = 0))
        : n > 2147483647
        ? (n = 2147483647)
        : n < -2147483648 && (n = -2147483648),
      (n = +n),
      isNaN(n) && (n = o ? 0 : t.length - 1),
      n < 0 && (n = t.length + n),
      n >= t.length)
    ) {
      if (o) return -1
      n = t.length - 1
    } else if (n < 0) {
      if (!o) return -1
      n = 0
    }
    if (('string' == typeof e && (e = v.from(e, r)), w(e)))
      return 0 === e.length ? -1 : j(t, e, n, r, o)
    if ('number' == typeof e)
      return (
        (e &= 255),
        v.TYPED_ARRAY_SUPPORT &&
        'function' == typeof Uint8Array.prototype.indexOf
          ? o
            ? Uint8Array.prototype.indexOf.call(t, e, n)
            : Uint8Array.prototype.lastIndexOf.call(t, e, n)
          : j(t, [e], n, r, o)
      )
    throw new TypeError('val must be string, number or Buffer')
  }
  function j(t, e, n, r, o) {
    var i,
      l = 1,
      a = t.length,
      u = e.length
    if (
      void 0 !== r &&
      ('ucs2' === (r = String(r).toLowerCase()) ||
        'ucs-2' === r ||
        'utf16le' === r ||
        'utf-16le' === r)
    ) {
      if (t.length < 2 || e.length < 2) return -1
      ;(l = 2), (a /= 2), (u /= 2), (n /= 2)
    }
    function s(t, e) {
      return 1 === l ? t[e] : t.readUInt16BE(e * l)
    }
    if (o) {
      var c = -1
      for (i = n; i < a; i++)
        if (s(t, i) === s(e, -1 === c ? 0 : i - c)) {
          if ((-1 === c && (c = i), i - c + 1 === u)) return c * l
        } else -1 !== c && (i -= i - c), (c = -1)
    } else
      for (n + u > a && (n = a - u), i = n; i >= 0; i--) {
        for (var f = !0, p = 0; p < u; p++)
          if (s(t, i + p) !== s(e, p)) {
            f = !1
            break
          }
        if (f) return i
      }
    return -1
  }
  function N(t, e, n, r) {
    n = Number(n) || 0
    var o = t.length - n
    r ? (r = Number(r)) > o && (r = o) : (r = o)
    var i = e.length
    if (i % 2 != 0) throw new TypeError('Invalid hex string')
    r > i / 2 && (r = i / 2)
    for (var l = 0; l < r; ++l) {
      var a = parseInt(e.substr(2 * l, 2), 16)
      if (isNaN(a)) return l
      t[n + l] = a
    }
    return l
  }
  function P(t, e, n, r) {
    return Q(Z(e, t.length - n), t, n, r)
  }
  function S(t, e, n, r) {
    return Q(
      (function (t) {
        for (var e = [], n = 0; n < t.length; ++n) e.push(255 & t.charCodeAt(n))
        return e
      })(e),
      t,
      n,
      r
    )
  }
  function T(t, e, n, r) {
    return S(t, e, n, r)
  }
  function q(t, e, n, r) {
    return Q(X(e), t, n, r)
  }
  function C(t, e, n, r) {
    return Q(
      (function (t, e) {
        for (var n, r, o = [], i = 0; i < t.length && !((e -= 2) < 0); ++i)
          (r = (n = t.charCodeAt(i)) >> 8), o.push(n % 256), o.push(r)
        return o
      })(e, t.length - n),
      t,
      n,
      r
    )
  }
  function L(t, e, n) {
    return s(0 === e && n === t.length ? t : t.slice(e, n))
  }
  function R(t, e, n) {
    n = Math.min(t.length, n)
    for (var r = [], o = e; o < n; ) {
      var i,
        l,
        a,
        u,
        s = t[o],
        c = null,
        f = s > 239 ? 4 : s > 223 ? 3 : s > 191 ? 2 : 1
      if (o + f <= n)
        switch (f) {
          case 1:
            s < 128 && (c = s)
            break
          case 2:
            128 == (192 & (i = t[o + 1])) &&
              (u = ((31 & s) << 6) | (63 & i)) > 127 &&
              (c = u)
            break
          case 3:
            ;(l = t[o + 2]),
              128 == (192 & (i = t[o + 1])) &&
                128 == (192 & l) &&
                (u = ((15 & s) << 12) | ((63 & i) << 6) | (63 & l)) > 2047 &&
                (u < 55296 || u > 57343) &&
                (c = u)
            break
          case 4:
            ;(l = t[o + 2]),
              (a = t[o + 3]),
              128 == (192 & (i = t[o + 1])) &&
                128 == (192 & l) &&
                128 == (192 & a) &&
                (u =
                  ((15 & s) << 18) |
                  ((63 & i) << 12) |
                  ((63 & l) << 6) |
                  (63 & a)) > 65535 &&
                u < 1114112 &&
                (c = u)
        }
      null === c
        ? ((c = 65533), (f = 1))
        : c > 65535 &&
          (r.push((((c -= 65536) >>> 10) & 1023) | 55296),
          (c = 56320 | (1023 & c))),
        r.push(c),
        (o += f)
    }
    return (function (t) {
      var e = t.length
      if (e <= M) return String.fromCharCode.apply(String, t)
      var n = '',
        r = 0
      for (; r < e; )
        n += String.fromCharCode.apply(String, t.slice(r, (r += M)))
      return n
    })(r)
  }
  ;(v.TYPED_ARRAY_SUPPORT =
    void 0 === n.TYPED_ARRAY_SUPPORT || n.TYPED_ARRAY_SUPPORT),
    d(),
    (v.poolSize = 8192),
    (v._augment = function (t) {
      return (t.__proto__ = v.prototype), t
    }),
    (v.from = function (t, e, n) {
      return b(null, t, e, n)
    }),
    v.TYPED_ARRAY_SUPPORT &&
      ((v.prototype.__proto__ = Uint8Array.prototype),
      (v.__proto__ = Uint8Array),
      'undefined' != typeof Symbol && Symbol.species && Symbol),
    (v.alloc = function (t, e, n) {
      return (function (t, e, n, r) {
        return (
          g(e),
          e <= 0
            ? y(t, e)
            : void 0 !== n
            ? 'string' == typeof r
              ? y(t, e).fill(n, r)
              : y(t, e).fill(n)
            : y(t, e)
        )
      })(null, t, e, n)
    }),
    (v.allocUnsafe = function (t) {
      return m(null, t)
    }),
    (v.allocUnsafeSlow = function (t) {
      return m(null, t)
    }),
    (v.isBuffer = J),
    (v.compare = function (t, e) {
      if (!w(t) || !w(e)) throw new TypeError('Arguments must be Buffers')
      if (t === e) return 0
      for (
        var n = t.length, r = e.length, o = 0, i = Math.min(n, r);
        o < i;
        ++o
      )
        if (t[o] !== e[o]) {
          ;(n = t[o]), (r = e[o])
          break
        }
      return n < r ? -1 : r < n ? 1 : 0
    }),
    (v.isEncoding = function (t) {
      switch (String(t).toLowerCase()) {
        case 'hex':
        case 'utf8':
        case 'utf-8':
        case 'ascii':
        case 'latin1':
        case 'binary':
        case 'base64':
        case 'ucs2':
        case 'ucs-2':
        case 'utf16le':
        case 'utf-16le':
          return !0
        default:
          return !1
      }
    }),
    (v.concat = function (t, e) {
      if (!h(t))
        throw new TypeError('"list" argument must be an Array of Buffers')
      if (0 === t.length) return v.alloc(0)
      var n
      if (void 0 === e) for (e = 0, n = 0; n < t.length; ++n) e += t[n].length
      var r = v.allocUnsafe(e),
        o = 0
      for (n = 0; n < t.length; ++n) {
        var i = t[n]
        if (!w(i))
          throw new TypeError('"list" argument must be an Array of Buffers')
        i.copy(r, o), (o += i.length)
      }
      return r
    }),
    (v.byteLength = x),
    (v.prototype._isBuffer = !0),
    (v.prototype.swap16 = function () {
      var t = this.length
      if (t % 2 != 0)
        throw new RangeError('Buffer size must be a multiple of 16-bits')
      for (var e = 0; e < t; e += 2) A(this, e, e + 1)
      return this
    }),
    (v.prototype.swap32 = function () {
      var t = this.length
      if (t % 4 != 0)
        throw new RangeError('Buffer size must be a multiple of 32-bits')
      for (var e = 0; e < t; e += 4) A(this, e, e + 3), A(this, e + 1, e + 2)
      return this
    }),
    (v.prototype.swap64 = function () {
      var t = this.length
      if (t % 8 != 0)
        throw new RangeError('Buffer size must be a multiple of 64-bits')
      for (var e = 0; e < t; e += 8)
        A(this, e, e + 7),
          A(this, e + 1, e + 6),
          A(this, e + 2, e + 5),
          A(this, e + 3, e + 4)
      return this
    }),
    (v.prototype.toString = function () {
      var t = 0 | this.length
      return 0 === t
        ? ''
        : 0 === arguments.length
        ? R(this, 0, t)
        : E.apply(this, arguments)
    }),
    (v.prototype.equals = function (t) {
      if (!w(t)) throw new TypeError('Argument must be a Buffer')
      return this === t || 0 === v.compare(this, t)
    }),
    (v.prototype.inspect = function () {
      var t = ''
      return (
        this.length > 0 &&
          ((t = this.toString('hex', 0, 50).match(/.{2}/g).join(' ')),
          this.length > 50 && (t += ' ... ')),
        '<Buffer ' + t + '>'
      )
    }),
    (v.prototype.compare = function (t, e, n, r, o) {
      if (!w(t)) throw new TypeError('Argument must be a Buffer')
      if (
        (void 0 === e && (e = 0),
        void 0 === n && (n = t ? t.length : 0),
        void 0 === r && (r = 0),
        void 0 === o && (o = this.length),
        e < 0 || n > t.length || r < 0 || o > this.length)
      )
        throw new RangeError('out of range index')
      if (r >= o && e >= n) return 0
      if (r >= o) return -1
      if (e >= n) return 1
      if (this === t) return 0
      for (
        var i = (o >>>= 0) - (r >>>= 0),
          l = (n >>>= 0) - (e >>>= 0),
          a = Math.min(i, l),
          u = this.slice(r, o),
          s = t.slice(e, n),
          c = 0;
        c < a;
        ++c
      )
        if (u[c] !== s[c]) {
          ;(i = u[c]), (l = s[c])
          break
        }
      return i < l ? -1 : l < i ? 1 : 0
    }),
    (v.prototype.includes = function (t, e, n) {
      return -1 !== this.indexOf(t, e, n)
    }),
    (v.prototype.indexOf = function (t, e, n) {
      return k(this, t, e, n, !0)
    }),
    (v.prototype.lastIndexOf = function (t, e, n) {
      return k(this, t, e, n, !1)
    }),
    (v.prototype.write = function (t, e, n, r) {
      if (void 0 === e) (r = 'utf8'), (n = this.length), (e = 0)
      else if (void 0 === n && 'string' == typeof e)
        (r = e), (n = this.length), (e = 0)
      else {
        if (!isFinite(e))
          throw new Error(
            'Buffer.write(string, encoding, offset[, length]) is no longer supported'
          )
        ;(e |= 0),
          isFinite(n)
            ? ((n |= 0), void 0 === r && (r = 'utf8'))
            : ((r = n), (n = void 0))
      }
      var o = this.length - e
      if (
        ((void 0 === n || n > o) && (n = o),
        (t.length > 0 && (n < 0 || e < 0)) || e > this.length)
      )
        throw new RangeError('Attempt to write outside buffer bounds')
      r || (r = 'utf8')
      for (var i = !1; ; )
        switch (r) {
          case 'hex':
            return N(this, t, e, n)
          case 'utf8':
          case 'utf-8':
            return P(this, t, e, n)
          case 'ascii':
            return S(this, t, e, n)
          case 'latin1':
          case 'binary':
            return T(this, t, e, n)
          case 'base64':
            return q(this, t, e, n)
          case 'ucs2':
          case 'ucs-2':
          case 'utf16le':
          case 'utf-16le':
            return C(this, t, e, n)
          default:
            if (i) throw new TypeError('Unknown encoding: ' + r)
            ;(r = ('' + r).toLowerCase()), (i = !0)
        }
    }),
    (v.prototype.toJSON = function () {
      return {
        type: 'Buffer',
        data: Array.prototype.slice.call(this._arr || this, 0),
      }
    })
  var M = 4096
  function I(t, e, n) {
    var r = ''
    n = Math.min(t.length, n)
    for (var o = e; o < n; ++o) r += String.fromCharCode(127 & t[o])
    return r
  }
  function B(t, e, n) {
    var r = ''
    n = Math.min(t.length, n)
    for (var o = e; o < n; ++o) r += String.fromCharCode(t[o])
    return r
  }
  function D(t, e, n) {
    var r = t.length
    ;(!e || e < 0) && (e = 0), (!n || n < 0 || n > r) && (n = r)
    for (var o = '', i = e; i < n; ++i) o += G(t[i])
    return o
  }
  function U(t, e, n) {
    for (var r = t.slice(e, n), o = '', i = 0; i < r.length; i += 2)
      o += String.fromCharCode(r[i] + 256 * r[i + 1])
    return o
  }
  function F(t, e, n) {
    if (t % 1 != 0 || t < 0) throw new RangeError('offset is not uint')
    if (t + e > n) throw new RangeError('Trying to access beyond buffer length')
  }
  function H(t, e, n, r, o, i) {
    if (!w(t))
      throw new TypeError('"buffer" argument must be a Buffer instance')
    if (e > o || e < i)
      throw new RangeError('"value" argument is out of bounds')
    if (n + r > t.length) throw new RangeError('Index out of range')
  }
  function z(t, e, n, r) {
    e < 0 && (e = 65535 + e + 1)
    for (var o = 0, i = Math.min(t.length - n, 2); o < i; ++o)
      t[n + o] = (e & (255 << (8 * (r ? o : 1 - o)))) >>> (8 * (r ? o : 1 - o))
  }
  function K(t, e, n, r) {
    e < 0 && (e = 4294967295 + e + 1)
    for (var o = 0, i = Math.min(t.length - n, 4); o < i; ++o)
      t[n + o] = (e >>> (8 * (r ? o : 3 - o))) & 255
  }
  function Y(t, e, n, r, o, i) {
    if (n + r > t.length) throw new RangeError('Index out of range')
    if (n < 0) throw new RangeError('Index out of range')
  }
  function V(t, e, n, r, o) {
    return o || Y(t, 0, n, 4), f(t, e, n, r, 23, 4), n + 4
  }
  function W(t, e, n, r, o) {
    return o || Y(t, 0, n, 8), f(t, e, n, r, 52, 8), n + 8
  }
  ;(v.prototype.slice = function (t, e) {
    var n,
      r = this.length
    if (
      ((t = ~~t) < 0 ? (t += r) < 0 && (t = 0) : t > r && (t = r),
      (e = void 0 === e ? r : ~~e) < 0
        ? (e += r) < 0 && (e = 0)
        : e > r && (e = r),
      e < t && (e = t),
      v.TYPED_ARRAY_SUPPORT)
    )
      (n = this.subarray(t, e)).__proto__ = v.prototype
    else {
      var o = e - t
      n = new v(o, void 0)
      for (var i = 0; i < o; ++i) n[i] = this[i + t]
    }
    return n
  }),
    (v.prototype.readUIntLE = function (t, e, n) {
      ;(t |= 0), (e |= 0), n || F(t, e, this.length)
      for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
        r += this[t + i] * o
      return r
    }),
    (v.prototype.readUIntBE = function (t, e, n) {
      ;(t |= 0), (e |= 0), n || F(t, e, this.length)
      for (var r = this[t + --e], o = 1; e > 0 && (o *= 256); )
        r += this[t + --e] * o
      return r
    }),
    (v.prototype.readUInt8 = function (t, e) {
      return e || F(t, 1, this.length), this[t]
    }),
    (v.prototype.readUInt16LE = function (t, e) {
      return e || F(t, 2, this.length), this[t] | (this[t + 1] << 8)
    }),
    (v.prototype.readUInt16BE = function (t, e) {
      return e || F(t, 2, this.length), (this[t] << 8) | this[t + 1]
    }),
    (v.prototype.readUInt32LE = function (t, e) {
      return (
        e || F(t, 4, this.length),
        (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
          16777216 * this[t + 3]
      )
    }),
    (v.prototype.readUInt32BE = function (t, e) {
      return (
        e || F(t, 4, this.length),
        16777216 * this[t] +
          ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
      )
    }),
    (v.prototype.readIntLE = function (t, e, n) {
      ;(t |= 0), (e |= 0), n || F(t, e, this.length)
      for (var r = this[t], o = 1, i = 0; ++i < e && (o *= 256); )
        r += this[t + i] * o
      return r >= (o *= 128) && (r -= Math.pow(2, 8 * e)), r
    }),
    (v.prototype.readIntBE = function (t, e, n) {
      ;(t |= 0), (e |= 0), n || F(t, e, this.length)
      for (var r = e, o = 1, i = this[t + --r]; r > 0 && (o *= 256); )
        i += this[t + --r] * o
      return i >= (o *= 128) && (i -= Math.pow(2, 8 * e)), i
    }),
    (v.prototype.readInt8 = function (t, e) {
      return (
        e || F(t, 1, this.length),
        128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
      )
    }),
    (v.prototype.readInt16LE = function (t, e) {
      e || F(t, 2, this.length)
      var n = this[t] | (this[t + 1] << 8)
      return 32768 & n ? 4294901760 | n : n
    }),
    (v.prototype.readInt16BE = function (t, e) {
      e || F(t, 2, this.length)
      var n = this[t + 1] | (this[t] << 8)
      return 32768 & n ? 4294901760 | n : n
    }),
    (v.prototype.readInt32LE = function (t, e) {
      return (
        e || F(t, 4, this.length),
        this[t] | (this[t + 1] << 8) | (this[t + 2] << 16) | (this[t + 3] << 24)
      )
    }),
    (v.prototype.readInt32BE = function (t, e) {
      return (
        e || F(t, 4, this.length),
        (this[t] << 24) | (this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3]
      )
    }),
    (v.prototype.readFloatLE = function (t, e) {
      return e || F(t, 4, this.length), c(this, t, !0, 23, 4)
    }),
    (v.prototype.readFloatBE = function (t, e) {
      return e || F(t, 4, this.length), c(this, t, !1, 23, 4)
    }),
    (v.prototype.readDoubleLE = function (t, e) {
      return e || F(t, 8, this.length), c(this, t, !0, 52, 8)
    }),
    (v.prototype.readDoubleBE = function (t, e) {
      return e || F(t, 8, this.length), c(this, t, !1, 52, 8)
    }),
    (v.prototype.writeUIntLE = function (t, e, n, r) {
      ;((t = +t), (e |= 0), (n |= 0), r) ||
        H(this, t, e, n, Math.pow(2, 8 * n) - 1, 0)
      var o = 1,
        i = 0
      for (this[e] = 255 & t; ++i < n && (o *= 256); )
        this[e + i] = (t / o) & 255
      return e + n
    }),
    (v.prototype.writeUIntBE = function (t, e, n, r) {
      ;((t = +t), (e |= 0), (n |= 0), r) ||
        H(this, t, e, n, Math.pow(2, 8 * n) - 1, 0)
      var o = n - 1,
        i = 1
      for (this[e + o] = 255 & t; --o >= 0 && (i *= 256); )
        this[e + o] = (t / i) & 255
      return e + n
    }),
    (v.prototype.writeUInt8 = function (t, e, n) {
      return (
        (t = +t),
        (e |= 0),
        n || H(this, t, e, 1, 255, 0),
        v.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        (this[e] = 255 & t),
        e + 1
      )
    }),
    (v.prototype.writeUInt16LE = function (t, e, n) {
      return (
        (t = +t),
        (e |= 0),
        n || H(this, t, e, 2, 65535, 0),
        v.TYPED_ARRAY_SUPPORT
          ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
          : z(this, t, e, !0),
        e + 2
      )
    }),
    (v.prototype.writeUInt16BE = function (t, e, n) {
      return (
        (t = +t),
        (e |= 0),
        n || H(this, t, e, 2, 65535, 0),
        v.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
          : z(this, t, e, !1),
        e + 2
      )
    }),
    (v.prototype.writeUInt32LE = function (t, e, n) {
      return (
        (t = +t),
        (e |= 0),
        n || H(this, t, e, 4, 4294967295, 0),
        v.TYPED_ARRAY_SUPPORT
          ? ((this[e + 3] = t >>> 24),
            (this[e + 2] = t >>> 16),
            (this[e + 1] = t >>> 8),
            (this[e] = 255 & t))
          : K(this, t, e, !0),
        e + 4
      )
    }),
    (v.prototype.writeUInt32BE = function (t, e, n) {
      return (
        (t = +t),
        (e |= 0),
        n || H(this, t, e, 4, 4294967295, 0),
        v.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 24),
            (this[e + 1] = t >>> 16),
            (this[e + 2] = t >>> 8),
            (this[e + 3] = 255 & t))
          : K(this, t, e, !1),
        e + 4
      )
    }),
    (v.prototype.writeIntLE = function (t, e, n, r) {
      if (((t = +t), (e |= 0), !r)) {
        var o = Math.pow(2, 8 * n - 1)
        H(this, t, e, n, o - 1, -o)
      }
      var i = 0,
        l = 1,
        a = 0
      for (this[e] = 255 & t; ++i < n && (l *= 256); )
        t < 0 && 0 === a && 0 !== this[e + i - 1] && (a = 1),
          (this[e + i] = (((t / l) >> 0) - a) & 255)
      return e + n
    }),
    (v.prototype.writeIntBE = function (t, e, n, r) {
      if (((t = +t), (e |= 0), !r)) {
        var o = Math.pow(2, 8 * n - 1)
        H(this, t, e, n, o - 1, -o)
      }
      var i = n - 1,
        l = 1,
        a = 0
      for (this[e + i] = 255 & t; --i >= 0 && (l *= 256); )
        t < 0 && 0 === a && 0 !== this[e + i + 1] && (a = 1),
          (this[e + i] = (((t / l) >> 0) - a) & 255)
      return e + n
    }),
    (v.prototype.writeInt8 = function (t, e, n) {
      return (
        (t = +t),
        (e |= 0),
        n || H(this, t, e, 1, 127, -128),
        v.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
        t < 0 && (t = 255 + t + 1),
        (this[e] = 255 & t),
        e + 1
      )
    }),
    (v.prototype.writeInt16LE = function (t, e, n) {
      return (
        (t = +t),
        (e |= 0),
        n || H(this, t, e, 2, 32767, -32768),
        v.TYPED_ARRAY_SUPPORT
          ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
          : z(this, t, e, !0),
        e + 2
      )
    }),
    (v.prototype.writeInt16BE = function (t, e, n) {
      return (
        (t = +t),
        (e |= 0),
        n || H(this, t, e, 2, 32767, -32768),
        v.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
          : z(this, t, e, !1),
        e + 2
      )
    }),
    (v.prototype.writeInt32LE = function (t, e, n) {
      return (
        (t = +t),
        (e |= 0),
        n || H(this, t, e, 4, 2147483647, -2147483648),
        v.TYPED_ARRAY_SUPPORT
          ? ((this[e] = 255 & t),
            (this[e + 1] = t >>> 8),
            (this[e + 2] = t >>> 16),
            (this[e + 3] = t >>> 24))
          : K(this, t, e, !0),
        e + 4
      )
    }),
    (v.prototype.writeInt32BE = function (t, e, n) {
      return (
        (t = +t),
        (e |= 0),
        n || H(this, t, e, 4, 2147483647, -2147483648),
        t < 0 && (t = 4294967295 + t + 1),
        v.TYPED_ARRAY_SUPPORT
          ? ((this[e] = t >>> 24),
            (this[e + 1] = t >>> 16),
            (this[e + 2] = t >>> 8),
            (this[e + 3] = 255 & t))
          : K(this, t, e, !1),
        e + 4
      )
    }),
    (v.prototype.writeFloatLE = function (t, e, n) {
      return V(this, t, e, !0, n)
    }),
    (v.prototype.writeFloatBE = function (t, e, n) {
      return V(this, t, e, !1, n)
    }),
    (v.prototype.writeDoubleLE = function (t, e, n) {
      return W(this, t, e, !0, n)
    }),
    (v.prototype.writeDoubleBE = function (t, e, n) {
      return W(this, t, e, !1, n)
    }),
    (v.prototype.copy = function (t, e, n, r) {
      if (
        (n || (n = 0),
        r || 0 === r || (r = this.length),
        e >= t.length && (e = t.length),
        e || (e = 0),
        r > 0 && r < n && (r = n),
        r === n)
      )
        return 0
      if (0 === t.length || 0 === this.length) return 0
      if (e < 0) throw new RangeError('targetStart out of bounds')
      if (n < 0 || n >= this.length)
        throw new RangeError('sourceStart out of bounds')
      if (r < 0) throw new RangeError('sourceEnd out of bounds')
      r > this.length && (r = this.length),
        t.length - e < r - n && (r = t.length - e + n)
      var o,
        i = r - n
      if (this === t && n < e && e < r)
        for (o = i - 1; o >= 0; --o) t[o + e] = this[o + n]
      else if (i < 1e3 || !v.TYPED_ARRAY_SUPPORT)
        for (o = 0; o < i; ++o) t[o + e] = this[o + n]
      else Uint8Array.prototype.set.call(t, this.subarray(n, n + i), e)
      return i
    }),
    (v.prototype.fill = function (t, e, n, r) {
      if ('string' == typeof t) {
        if (
          ('string' == typeof e
            ? ((r = e), (e = 0), (n = this.length))
            : 'string' == typeof n && ((r = n), (n = this.length)),
          1 === t.length)
        ) {
          var o = t.charCodeAt(0)
          o < 256 && (t = o)
        }
        if (void 0 !== r && 'string' != typeof r)
          throw new TypeError('encoding must be a string')
        if ('string' == typeof r && !v.isEncoding(r))
          throw new TypeError('Unknown encoding: ' + r)
      } else 'number' == typeof t && (t &= 255)
      if (e < 0 || this.length < e || this.length < n)
        throw new RangeError('Out of range index')
      if (n <= e) return this
      var i
      if (
        ((e >>>= 0),
        (n = void 0 === n ? this.length : n >>> 0),
        t || (t = 0),
        'number' == typeof t)
      )
        for (i = e; i < n; ++i) this[i] = t
      else {
        var l = w(t) ? t : Z(new v(t, r).toString()),
          a = l.length
        for (i = 0; i < n - e; ++i) this[i + e] = l[i % a]
      }
      return this
    })
  var $ = /[^+\/0-9A-Za-z-_]/g
  function G(t) {
    return t < 16 ? '0' + t.toString(16) : t.toString(16)
  }
  function Z(t, e) {
    var n
    e = e || 1 / 0
    for (var r = t.length, o = null, i = [], l = 0; l < r; ++l) {
      if ((n = t.charCodeAt(l)) > 55295 && n < 57344) {
        if (!o) {
          if (n > 56319) {
            ;(e -= 3) > -1 && i.push(239, 191, 189)
            continue
          }
          if (l + 1 === r) {
            ;(e -= 3) > -1 && i.push(239, 191, 189)
            continue
          }
          o = n
          continue
        }
        if (n < 56320) {
          ;(e -= 3) > -1 && i.push(239, 191, 189), (o = n)
          continue
        }
        n = 65536 + (((o - 55296) << 10) | (n - 56320))
      } else o && (e -= 3) > -1 && i.push(239, 191, 189)
      if (((o = null), n < 128)) {
        if ((e -= 1) < 0) break
        i.push(n)
      } else if (n < 2048) {
        if ((e -= 2) < 0) break
        i.push((n >> 6) | 192, (63 & n) | 128)
      } else if (n < 65536) {
        if ((e -= 3) < 0) break
        i.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128)
      } else {
        if (!(n < 1114112)) throw new Error('Invalid code point')
        if ((e -= 4) < 0) break
        i.push(
          (n >> 18) | 240,
          ((n >> 12) & 63) | 128,
          ((n >> 6) & 63) | 128,
          (63 & n) | 128
        )
      }
    }
    return i
  }
  function X(t) {
    return (function (t) {
      var e, n, r, u, s, c
      l || a()
      var f = t.length
      if (f % 4 > 0)
        throw new Error('Invalid string. Length must be a multiple of 4')
      ;(c = new i(
        (3 * f) / 4 - (s = '=' === t[f - 2] ? 2 : '=' === t[f - 1] ? 1 : 0)
      )),
        (r = s > 0 ? f - 4 : f)
      var p = 0
      for (e = 0, n = 0; e < r; e += 4, n += 3)
        (u =
          (o[t.charCodeAt(e)] << 18) |
          (o[t.charCodeAt(e + 1)] << 12) |
          (o[t.charCodeAt(e + 2)] << 6) |
          o[t.charCodeAt(e + 3)]),
          (c[p++] = (u >> 16) & 255),
          (c[p++] = (u >> 8) & 255),
          (c[p++] = 255 & u)
      return (
        2 === s
          ? ((u = (o[t.charCodeAt(e)] << 2) | (o[t.charCodeAt(e + 1)] >> 4)),
            (c[p++] = 255 & u))
          : 1 === s &&
            ((u =
              (o[t.charCodeAt(e)] << 10) |
              (o[t.charCodeAt(e + 1)] << 4) |
              (o[t.charCodeAt(e + 2)] >> 2)),
            (c[p++] = (u >> 8) & 255),
            (c[p++] = 255 & u)),
        c
      )
    })(
      (function (t) {
        if (
          (t = (function (t) {
            return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, '')
          })(t).replace($, '')).length < 2
        )
          return ''
        for (; t.length % 4 != 0; ) t += '='
        return t
      })(t)
    )
  }
  function Q(t, e, n, r) {
    for (var o = 0; o < r && !(o + n >= e.length || o >= t.length); ++o)
      e[o + n] = t[o]
    return o
  }
  function J(t) {
    return (
      null != t &&
      (!!t._isBuffer ||
        tt(t) ||
        (function (t) {
          return (
            'function' == typeof t.readFloatLE &&
            'function' == typeof t.slice &&
            tt(t.slice(0, 0))
          )
        })(t))
    )
  }
  function tt(t) {
    return (
      !!t.constructor &&
      'function' == typeof t.constructor.isBuffer &&
      t.constructor.isBuffer(t)
    )
  }
  var et =
    'undefined' != typeof globalThis
      ? globalThis
      : 'undefined' != typeof window
      ? window
      : 'undefined' != typeof global
      ? global
      : 'undefined' != typeof self
      ? self
      : {}
  function nt(t) {
    return t &&
      t.__esModule &&
      Object.prototype.hasOwnProperty.call(t, 'default')
      ? t.default
      : t
  }
  var rt = { exports: {} }
  !(function (t, e) {
    var n
    'undefined' != typeof self && self,
      (n = function () {
        return (function (t) {
          var e = {}
          function n(r) {
            if (e[r]) return e[r].exports
            var o = (e[r] = { i: r, l: !1, exports: {} })
            return t[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports
          }
          return (
            (n.m = t),
            (n.c = e),
            (n.d = function (t, e, r) {
              n.o(t, e) ||
                Object.defineProperty(t, e, {
                  configurable: !1,
                  enumerable: !0,
                  get: r,
                })
            }),
            (n.n = function (t) {
              var e =
                t && t.__esModule
                  ? function () {
                      return t.default
                    }
                  : function () {
                      return t
                    }
              return n.d(e, 'a', e), e
            }),
            (n.o = function (t, e) {
              return Object.prototype.hasOwnProperty.call(t, e)
            }),
            (n.p = ''),
            n((n.s = 146))
          )
        })([
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = n(20),
              o = n(21),
              i = n(22),
              l = n(64),
              a = n(65),
              u = n(66),
              s = n(67),
              c = n(68),
              f = n(13),
              p = n(41),
              h = n(42),
              d = n(40),
              y = n(1)
            e.default = {
              Scope: y.Scope,
              create: y.create,
              find: y.find,
              query: y.query,
              register: y.register,
              Container: r.default,
              Format: o.default,
              Leaf: i.default,
              Embed: s.default,
              Scroll: l.default,
              Block: u.default,
              Inline: a.default,
              Text: c.default,
              Attributor: {
                Attribute: f.default,
                Class: p.default,
                Style: h.default,
                Store: d.default,
              },
            }
          },
          function (t, e, n) {
            var r,
              o =
                (this && this.__extends) ||
                ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  }),
                function (t, e) {
                  function n() {
                    this.constructor = t
                  }
                  r(t, e),
                    (t.prototype =
                      null === e
                        ? Object.create(e)
                        : ((n.prototype = e.prototype), new n()))
                })
            Object.defineProperty(e, '__esModule', { value: !0 })
            var i = (function (t) {
              function e(e) {
                var n = this
                return (
                  ((n =
                    t.call(this, (e = '[Parchment] ' + e)) || this).message =
                    e),
                  (n.name = n.constructor.name),
                  n
                )
              }
              return o(e, t), e
            })(Error)
            e.ParchmentError = i
            var l,
              a = {},
              u = {},
              s = {},
              c = {}
            function f(t, e) {
              var n
              if ((void 0 === e && (e = l.ANY), 'string' == typeof t))
                n = c[t] || a[t]
              else if (t instanceof Text || t.nodeType === Node.TEXT_NODE)
                n = c.text
              else if ('number' == typeof t)
                t & l.LEVEL & l.BLOCK
                  ? (n = c.block)
                  : t & l.LEVEL & l.INLINE && (n = c.inline)
              else if (t instanceof HTMLElement) {
                var r = (t.getAttribute('class') || '').split(/\s+/)
                for (var o in r) if ((n = u[r[o]])) break
                n = n || s[t.tagName]
              }
              return null == n
                ? null
                : e & l.LEVEL & n.scope && e & l.TYPE & n.scope
                ? n
                : null
            }
            ;(e.DATA_KEY = '__blot'),
              (function (t) {
                ;(t[(t.TYPE = 3)] = 'TYPE'),
                  (t[(t.LEVEL = 12)] = 'LEVEL'),
                  (t[(t.ATTRIBUTE = 13)] = 'ATTRIBUTE'),
                  (t[(t.BLOT = 14)] = 'BLOT'),
                  (t[(t.INLINE = 7)] = 'INLINE'),
                  (t[(t.BLOCK = 11)] = 'BLOCK'),
                  (t[(t.BLOCK_BLOT = 10)] = 'BLOCK_BLOT'),
                  (t[(t.INLINE_BLOT = 6)] = 'INLINE_BLOT'),
                  (t[(t.BLOCK_ATTRIBUTE = 9)] = 'BLOCK_ATTRIBUTE'),
                  (t[(t.INLINE_ATTRIBUTE = 5)] = 'INLINE_ATTRIBUTE'),
                  (t[(t.ANY = 15)] = 'ANY')
              })((l = e.Scope || (e.Scope = {}))),
              (e.create = function (t, e) {
                var n = f(t)
                if (null == n) throw new i('Unable to create ' + t + ' blot')
                var r = n,
                  o =
                    t instanceof Node || t.nodeType === Node.TEXT_NODE
                      ? t
                      : r.create(e)
                return new r(o, e)
              }),
              (e.find = function t(n, r) {
                return (
                  void 0 === r && (r = !1),
                  null == n
                    ? null
                    : null != n[e.DATA_KEY]
                    ? n[e.DATA_KEY].blot
                    : r
                    ? t(n.parentNode, r)
                    : null
                )
              }),
              (e.query = f),
              (e.register = function t() {
                for (var e = [], n = 0; n < arguments.length; n++)
                  e[n] = arguments[n]
                if (e.length > 1)
                  return e.map(function (e) {
                    return t(e)
                  })
                var r = e[0]
                if (
                  'string' != typeof r.blotName &&
                  'string' != typeof r.attrName
                )
                  throw new i('Invalid definition')
                if ('abstract' === r.blotName)
                  throw new i('Cannot register abstract class')
                if (
                  ((c[r.blotName || r.attrName] = r),
                  'string' == typeof r.keyName)
                )
                  a[r.keyName] = r
                else if (
                  (null != r.className && (u[r.className] = r),
                  null != r.tagName)
                ) {
                  r.tagName = Array.isArray(r.tagName)
                    ? r.tagName.map(function (t) {
                        return t.toUpperCase()
                      })
                    : r.tagName.toUpperCase()
                  var o = Array.isArray(r.tagName) ? r.tagName : [r.tagName]
                  o.forEach(function (t) {
                    ;(null != s[t] && null != r.className) || (s[t] = r)
                  })
                }
                return r
              })
          },
          function (t, e, n) {
            var r = n(70),
              o = n(12),
              i = n(3),
              l = n(29),
              a = String.fromCharCode(0),
              u = function (t) {
                this.ops = Array.isArray(t)
                  ? t
                  : null != t && Array.isArray(t.ops)
                  ? t.ops
                  : []
              }
            ;(u.prototype.insert = function (t, e) {
              var n = {}
              return 0 === t.length
                ? this
                : ((n.insert = t),
                  null != e &&
                    'object' == typeof e &&
                    Object.keys(e).length > 0 &&
                    (n.attributes = e),
                  this.push(n))
            }),
              (u.prototype.delete = function (t) {
                return t <= 0 ? this : this.push({ delete: t })
              }),
              (u.prototype.retain = function (t, e) {
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
              (u.prototype.push = function (t) {
                var e = this.ops.length,
                  n = this.ops[e - 1]
                if (((t = i(!0, {}, t)), 'object' == typeof n)) {
                  if (
                    'number' == typeof t.delete &&
                    'number' == typeof n.delete
                  )
                    return (
                      (this.ops[e - 1] = { delete: n.delete + t.delete }), this
                    )
                  if (
                    'number' == typeof n.delete &&
                    null != t.insert &&
                    'object' != typeof (n = this.ops[(e -= 1) - 1])
                  )
                    return this.ops.unshift(t), this
                  if (o(t.attributes, n.attributes)) {
                    if (
                      'string' == typeof t.insert &&
                      'string' == typeof n.insert
                    )
                      return (
                        (this.ops[e - 1] = { insert: n.insert + t.insert }),
                        'object' == typeof t.attributes &&
                          (this.ops[e - 1].attributes = t.attributes),
                        this
                      )
                    if (
                      'number' == typeof t.retain &&
                      'number' == typeof n.retain
                    )
                      return (
                        (this.ops[e - 1] = { retain: n.retain + t.retain }),
                        'object' == typeof t.attributes &&
                          (this.ops[e - 1].attributes = t.attributes),
                        this
                      )
                  }
                }
                return (
                  e === this.ops.length
                    ? this.ops.push(t)
                    : this.ops.splice(e, 0, t),
                  this
                )
              }),
              (u.prototype.chop = function () {
                var t = this.ops[this.ops.length - 1]
                return t && t.retain && !t.attributes && this.ops.pop(), this
              }),
              (u.prototype.filter = function (t) {
                return this.ops.filter(t)
              }),
              (u.prototype.forEach = function (t) {
                this.ops.forEach(t)
              }),
              (u.prototype.map = function (t) {
                return this.ops.map(t)
              }),
              (u.prototype.partition = function (t) {
                var e = [],
                  n = []
                return (
                  this.forEach(function (r) {
                    ;(t(r) ? e : n).push(r)
                  }),
                  [e, n]
                )
              }),
              (u.prototype.reduce = function (t, e) {
                return this.ops.reduce(t, e)
              }),
              (u.prototype.changeLength = function () {
                return this.reduce(function (t, e) {
                  return e.insert
                    ? t + l.length(e)
                    : e.delete
                    ? t - e.delete
                    : t
                }, 0)
              }),
              (u.prototype.length = function () {
                return this.reduce(function (t, e) {
                  return t + l.length(e)
                }, 0)
              }),
              (u.prototype.slice = function (t, e) {
                ;(t = t || 0), 'number' != typeof e && (e = 1 / 0)
                for (
                  var n = [], r = l.iterator(this.ops), o = 0;
                  o < e && r.hasNext();

                ) {
                  var i
                  o < t
                    ? (i = r.next(t - o))
                    : ((i = r.next(e - o)), n.push(i)),
                    (o += l.length(i))
                }
                return new u(n)
              }),
              (u.prototype.compose = function (t) {
                var e = l.iterator(this.ops),
                  n = l.iterator(t.ops),
                  r = [],
                  i = n.peek()
                if (
                  null != i &&
                  'number' == typeof i.retain &&
                  null == i.attributes
                ) {
                  for (
                    var a = i.retain;
                    'insert' === e.peekType() && e.peekLength() <= a;

                  )
                    (a -= e.peekLength()), r.push(e.next())
                  i.retain - a > 0 && n.next(i.retain - a)
                }
                for (var s = new u(r); e.hasNext() || n.hasNext(); )
                  if ('insert' === n.peekType()) s.push(n.next())
                  else if ('delete' === e.peekType()) s.push(e.next())
                  else {
                    var c = Math.min(e.peekLength(), n.peekLength()),
                      f = e.next(c),
                      p = n.next(c)
                    if ('number' == typeof p.retain) {
                      var h = {}
                      'number' == typeof f.retain
                        ? (h.retain = c)
                        : (h.insert = f.insert)
                      var d = l.attributes.compose(
                        f.attributes,
                        p.attributes,
                        'number' == typeof f.retain
                      )
                      if (
                        (d && (h.attributes = d),
                        s.push(h),
                        !n.hasNext() && o(s.ops[s.ops.length - 1], h))
                      ) {
                        var y = new u(e.rest())
                        return s.concat(y).chop()
                      }
                    } else
                      'number' == typeof p.delete &&
                        'number' == typeof f.retain &&
                        s.push(p)
                  }
                return s.chop()
              }),
              (u.prototype.concat = function (t) {
                var e = new u(this.ops.slice())
                return (
                  t.ops.length > 0 &&
                    (e.push(t.ops[0]), (e.ops = e.ops.concat(t.ops.slice(1)))),
                  e
                )
              }),
              (u.prototype.diff = function (t, e) {
                if (this.ops === t.ops) return new u()
                var n = [this, t].map(function (e) {
                    return e
                      .map(function (n) {
                        if (null != n.insert)
                          return 'string' == typeof n.insert ? n.insert : a
                        throw new Error(
                          'diff() called ' +
                            (e === t ? 'on' : 'with') +
                            ' non-document'
                        )
                      })
                      .join('')
                  }),
                  i = new u(),
                  s = r(n[0], n[1], e),
                  c = l.iterator(this.ops),
                  f = l.iterator(t.ops)
                return (
                  s.forEach(function (t) {
                    for (var e = t[1].length; e > 0; ) {
                      var n = 0
                      switch (t[0]) {
                        case r.INSERT:
                          ;(n = Math.min(f.peekLength(), e)), i.push(f.next(n))
                          break
                        case r.DELETE:
                          ;(n = Math.min(e, c.peekLength())),
                            c.next(n),
                            i.delete(n)
                          break
                        case r.EQUAL:
                          n = Math.min(c.peekLength(), f.peekLength(), e)
                          var a = c.next(n),
                            u = f.next(n)
                          o(a.insert, u.insert)
                            ? i.retain(
                                n,
                                l.attributes.diff(a.attributes, u.attributes)
                              )
                            : i.push(u).delete(n)
                      }
                      e -= n
                    }
                  }),
                  i.chop()
                )
              }),
              (u.prototype.eachLine = function (t, e) {
                e = e || '\n'
                for (
                  var n = l.iterator(this.ops), r = new u(), o = 0;
                  n.hasNext();

                ) {
                  if ('insert' !== n.peekType()) return
                  var i = n.peek(),
                    a = l.length(i) - n.peekLength(),
                    s =
                      'string' == typeof i.insert
                        ? i.insert.indexOf(e, a) - a
                        : -1
                  if (s < 0) r.push(n.next())
                  else if (s > 0) r.push(n.next(s))
                  else {
                    if (!1 === t(r, n.next(1).attributes || {}, o)) return
                    ;(o += 1), (r = new u())
                  }
                }
                r.length() > 0 && t(r, {}, o)
              }),
              (u.prototype.transform = function (t, e) {
                if (((e = !!e), 'number' == typeof t))
                  return this.transformPosition(t, e)
                for (
                  var n = l.iterator(this.ops),
                    r = l.iterator(t.ops),
                    o = new u();
                  n.hasNext() || r.hasNext();

                )
                  if (
                    'insert' !== n.peekType() ||
                    (!e && 'insert' === r.peekType())
                  )
                    if ('insert' === r.peekType()) o.push(r.next())
                    else {
                      var i = Math.min(n.peekLength(), r.peekLength()),
                        a = n.next(i),
                        s = r.next(i)
                      if (a.delete) continue
                      s.delete
                        ? o.push(s)
                        : o.retain(
                            i,
                            l.attributes.transform(
                              a.attributes,
                              s.attributes,
                              e
                            )
                          )
                    }
                  else o.retain(l.length(n.next()))
                return o.chop()
              }),
              (u.prototype.transformPosition = function (t, e) {
                e = !!e
                for (
                  var n = l.iterator(this.ops), r = 0;
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
              (t.exports = u)
          },
          function (t, e) {
            var n = Object.prototype.hasOwnProperty,
              r = Object.prototype.toString,
              o = Object.defineProperty,
              i = Object.getOwnPropertyDescriptor,
              l = function (t) {
                return 'function' == typeof Array.isArray
                  ? Array.isArray(t)
                  : '[object Array]' === r.call(t)
              },
              a = function (t) {
                if (!t || '[object Object]' !== r.call(t)) return !1
                var e,
                  o = n.call(t, 'constructor'),
                  i =
                    t.constructor &&
                    t.constructor.prototype &&
                    n.call(t.constructor.prototype, 'isPrototypeOf')
                if (t.constructor && !o && !i) return !1
                for (e in t);
                return void 0 === e || n.call(t, e)
              },
              u = function (t, e) {
                o && '__proto__' === e.name
                  ? o(t, e.name, {
                      enumerable: !0,
                      configurable: !0,
                      value: e.newValue,
                      writable: !0,
                    })
                  : (t[e.name] = e.newValue)
              },
              s = function (t, e) {
                if ('__proto__' === e) {
                  if (!n.call(t, e)) return
                  if (i) return i(t, e).value
                }
                return t[e]
              }
            t.exports = function t() {
              var e,
                n,
                r,
                o,
                i,
                c,
                f = arguments[0],
                p = 1,
                h = arguments.length,
                d = !1
              for (
                'boolean' == typeof f &&
                  ((d = f), (f = arguments[1] || {}), (p = 2)),
                  (null == f ||
                    ('object' != typeof f && 'function' != typeof f)) &&
                    (f = {});
                p < h;
                ++p
              )
                if (null != (e = arguments[p]))
                  for (n in e)
                    (r = s(f, n)),
                      f !== (o = s(e, n)) &&
                        (d && o && (a(o) || (i = l(o)))
                          ? (i
                              ? ((i = !1), (c = r && l(r) ? r : []))
                              : (c = r && a(r) ? r : {}),
                            u(f, { name: n, newValue: t(d, c, o) }))
                          : void 0 !== o && u(f, { name: n, newValue: o }))
              return f
            }
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.default = e.BlockEmbed = e.bubbleFormats = void 0)
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              o = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              i = f(n(3)),
              l = f(n(2)),
              a = f(n(0)),
              u = f(n(19)),
              s = f(n(6)),
              c = f(n(8))
            function f(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function p(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function h(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            function d(t, e) {
              if ('function' != typeof e && null !== e)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof e
                )
              ;(t.prototype = Object.create(e && e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                e &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, e)
                    : (t.__proto__ = e))
            }
            var y = (function (t) {
              function e() {
                return (
                  p(this, e),
                  h(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                d(e, t),
                r(e, [
                  {
                    key: 'attach',
                    value: function () {
                      o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'attach',
                        this
                      ).call(this),
                        (this.attributes = new a.default.Attributor.Store(
                          this.domNode
                        ))
                    },
                  },
                  {
                    key: 'delta',
                    value: function () {
                      return new l.default().insert(
                        this.value(),
                        (0, i.default)(this.formats(), this.attributes.values())
                      )
                    },
                  },
                  {
                    key: 'format',
                    value: function (t, e) {
                      var n = a.default.query(
                        t,
                        a.default.Scope.BLOCK_ATTRIBUTE
                      )
                      null != n && this.attributes.attribute(n, e)
                    },
                  },
                  {
                    key: 'formatAt',
                    value: function (t, e, n, r) {
                      this.format(n, r)
                    },
                  },
                  {
                    key: 'insertAt',
                    value: function (t, n, r) {
                      if ('string' == typeof n && n.endsWith('\n')) {
                        var i = a.default.create(v.blotName)
                        this.parent.insertBefore(i, 0 === t ? this : this.next),
                          i.insertAt(0, n.slice(0, -1))
                      } else
                        o(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'insertAt',
                          this
                        ).call(this, t, n, r)
                    },
                  },
                ]),
                e
              )
            })(a.default.Embed)
            y.scope = a.default.Scope.BLOCK_BLOT
            var v = (function (t) {
              function e(t) {
                p(this, e)
                var n = h(
                  this,
                  (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)
                )
                return (n.cache = {}), n
              }
              return (
                d(e, t),
                r(e, [
                  {
                    key: 'delta',
                    value: function () {
                      return (
                        null == this.cache.delta &&
                          (this.cache.delta = this.descendants(a.default.Leaf)
                            .reduce(function (t, e) {
                              return 0 === e.length()
                                ? t
                                : t.insert(e.value(), b(e))
                            }, new l.default())
                            .insert('\n', b(this))),
                        this.cache.delta
                      )
                    },
                  },
                  {
                    key: 'deleteAt',
                    value: function (t, n) {
                      o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'deleteAt',
                        this
                      ).call(this, t, n),
                        (this.cache = {})
                    },
                  },
                  {
                    key: 'formatAt',
                    value: function (t, n, r, i) {
                      n <= 0 ||
                        (a.default.query(r, a.default.Scope.BLOCK)
                          ? t + n === this.length() && this.format(r, i)
                          : o(
                              e.prototype.__proto__ ||
                                Object.getPrototypeOf(e.prototype),
                              'formatAt',
                              this
                            ).call(
                              this,
                              t,
                              Math.min(n, this.length() - t - 1),
                              r,
                              i
                            ),
                        (this.cache = {}))
                    },
                  },
                  {
                    key: 'insertAt',
                    value: function (t, n, r) {
                      if (null != r)
                        return o(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'insertAt',
                          this
                        ).call(this, t, n, r)
                      if (0 !== n.length) {
                        var i = n.split('\n'),
                          l = i.shift()
                        l.length > 0 &&
                          (t < this.length() - 1 || null == this.children.tail
                            ? o(
                                e.prototype.__proto__ ||
                                  Object.getPrototypeOf(e.prototype),
                                'insertAt',
                                this
                              ).call(this, Math.min(t, this.length() - 1), l)
                            : this.children.tail.insertAt(
                                this.children.tail.length(),
                                l
                              ),
                          (this.cache = {}))
                        var a = this
                        i.reduce(function (t, e) {
                          return (a = a.split(t, !0)).insertAt(0, e), e.length
                        }, t + l.length)
                      }
                    },
                  },
                  {
                    key: 'insertBefore',
                    value: function (t, n) {
                      var r = this.children.head
                      o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'insertBefore',
                        this
                      ).call(this, t, n),
                        r instanceof u.default && r.remove(),
                        (this.cache = {})
                    },
                  },
                  {
                    key: 'length',
                    value: function () {
                      return (
                        null == this.cache.length &&
                          (this.cache.length =
                            o(
                              e.prototype.__proto__ ||
                                Object.getPrototypeOf(e.prototype),
                              'length',
                              this
                            ).call(this) + 1),
                        this.cache.length
                      )
                    },
                  },
                  {
                    key: 'moveChildren',
                    value: function (t, n) {
                      o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'moveChildren',
                        this
                      ).call(this, t, n),
                        (this.cache = {})
                    },
                  },
                  {
                    key: 'optimize',
                    value: function (t) {
                      o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'optimize',
                        this
                      ).call(this, t),
                        (this.cache = {})
                    },
                  },
                  {
                    key: 'path',
                    value: function (t) {
                      return o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'path',
                        this
                      ).call(this, t, !0)
                    },
                  },
                  {
                    key: 'removeChild',
                    value: function (t) {
                      o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'removeChild',
                        this
                      ).call(this, t),
                        (this.cache = {})
                    },
                  },
                  {
                    key: 'split',
                    value: function (t) {
                      var n =
                        arguments.length > 1 &&
                        void 0 !== arguments[1] &&
                        arguments[1]
                      if (n && (0 === t || t >= this.length() - 1)) {
                        var r = this.clone()
                        return 0 === t
                          ? (this.parent.insertBefore(r, this), this)
                          : (this.parent.insertBefore(r, this.next), r)
                      }
                      var i = o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'split',
                        this
                      ).call(this, t, n)
                      return (this.cache = {}), i
                    },
                  },
                ]),
                e
              )
            })(a.default.Block)
            function b(t) {
              var e =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {}
              return null == t
                ? e
                : ('function' == typeof t.formats &&
                    (e = (0, i.default)(e, t.formats())),
                  null == t.parent ||
                  'scroll' == t.parent.blotName ||
                  t.parent.statics.scope !== t.statics.scope
                    ? e
                    : b(t.parent, e))
            }
            ;(v.blotName = 'block'),
              (v.tagName = 'P'),
              (v.defaultChild = 'break'),
              (v.allowedChildren = [s.default, a.default.Embed, c.default]),
              (e.bubbleFormats = b),
              (e.BlockEmbed = y),
              (e.default = v)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.default = e.overload = e.expandConfig = void 0)
            var r =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                  ? function (t) {
                      return typeof t
                    }
                  : function (t) {
                      return t &&
                        'function' == typeof Symbol &&
                        t.constructor === Symbol &&
                        t !== Symbol.prototype
                        ? 'symbol'
                        : typeof t
                    },
              o = function (t, e) {
                if (Array.isArray(t)) return t
                if (Symbol.iterator in Object(t))
                  return (function (t, e) {
                    var n = [],
                      r = !0,
                      o = !1,
                      i = void 0
                    try {
                      for (
                        var l, a = t[Symbol.iterator]();
                        !(r = (l = a.next()).done) &&
                        (n.push(l.value), !e || n.length !== e);
                        r = !0
                      );
                    } catch (u) {
                      ;(o = !0), (i = u)
                    } finally {
                      try {
                        !r && a.return && a.return()
                      } finally {
                        if (o) throw i
                      }
                    }
                    return n
                  })(t, e)
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance'
                )
              },
              i = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })()
            n(69)
            var l = v(n(2)),
              a = v(n(17)),
              u = v(n(9)),
              s = v(n(10)),
              c = v(n(0)),
              f = n(18),
              p = v(f),
              h = v(n(3)),
              d = v(n(11)),
              y = v(n(53))
            function v(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function b(t, e, n) {
              return (
                e in t
                  ? Object.defineProperty(t, e, {
                      value: n,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (t[e] = n),
                t
              )
            }
            function g(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            var m = (0, d.default)('quill'),
              _ = (function () {
                function t(e) {
                  var n = this,
                    r =
                      arguments.length > 1 && void 0 !== arguments[1]
                        ? arguments[1]
                        : {}
                  if (
                    (g(this, t),
                    (this.options = O(e, r)),
                    (this.container = this.options.container),
                    null == this.container)
                  )
                    return m.error('Invalid Quill container', e)
                  this.options.debug && t.debug(this.options.debug)
                  var o = this.container.innerHTML.trim()
                  this.container.classList.add('ql-container'),
                    (this.container.innerHTML = ''),
                    (this.container.__quill = this),
                    (this.root = this.addContainer('ql-editor')),
                    this.root.classList.add('ql-blank'),
                    this.root.setAttribute('data-gramm', !1),
                    (this.scrollingContainer =
                      this.options.scrollingContainer || this.root),
                    (this.emitter = new u.default()),
                    (this.scroll = c.default.create(this.root, {
                      emitter: this.emitter,
                      whitelist: this.options.formats,
                    })),
                    (this.editor = new a.default(this.scroll)),
                    (this.selection = new p.default(this.scroll, this.emitter)),
                    (this.theme = new this.options.theme(this, this.options)),
                    (this.keyboard = this.theme.addModule('keyboard')),
                    (this.clipboard = this.theme.addModule('clipboard')),
                    (this.history = this.theme.addModule('history')),
                    this.theme.init(),
                    this.emitter.on(
                      u.default.events.EDITOR_CHANGE,
                      function (t) {
                        t === u.default.events.TEXT_CHANGE &&
                          n.root.classList.toggle(
                            'ql-blank',
                            n.editor.isBlank()
                          )
                      }
                    ),
                    this.emitter.on(
                      u.default.events.SCROLL_UPDATE,
                      function (t, e) {
                        var r = n.selection.lastRange,
                          o = r && 0 === r.length ? r.index : void 0
                        w.call(
                          n,
                          function () {
                            return n.editor.update(null, e, o)
                          },
                          t
                        )
                      }
                    )
                  var i = this.clipboard.convert(
                    '<div class=\'ql-editor\' style="white-space: normal;">' +
                      o +
                      '<p><br></p></div>'
                  )
                  this.setContents(i),
                    this.history.clear(),
                    this.options.placeholder &&
                      this.root.setAttribute(
                        'data-placeholder',
                        this.options.placeholder
                      ),
                    this.options.readOnly && this.disable()
                }
                return (
                  i(t, null, [
                    {
                      key: 'debug',
                      value: function (t) {
                        !0 === t && (t = 'log'), d.default.level(t)
                      },
                    },
                    {
                      key: 'find',
                      value: function (t) {
                        return t.__quill || c.default.find(t)
                      },
                    },
                    {
                      key: 'import',
                      value: function (t) {
                        return (
                          null == this.imports[t] &&
                            m.error(
                              'Cannot import ' +
                                t +
                                '. Are you sure it was registered?'
                            ),
                          this.imports[t]
                        )
                      },
                    },
                    {
                      key: 'register',
                      value: function (t, e) {
                        var n = this,
                          r =
                            arguments.length > 2 &&
                            void 0 !== arguments[2] &&
                            arguments[2]
                        if ('string' != typeof t) {
                          var o = t.attrName || t.blotName
                          'string' == typeof o
                            ? this.register('formats/' + o, t, e)
                            : Object.keys(t).forEach(function (r) {
                                n.register(r, t[r], e)
                              })
                        } else
                          null == this.imports[t] ||
                            r ||
                            m.warn('Overwriting ' + t + ' with', e),
                            (this.imports[t] = e),
                            (t.startsWith('blots/') ||
                              t.startsWith('formats/')) &&
                            'abstract' !== e.blotName
                              ? c.default.register(e)
                              : t.startsWith('modules') &&
                                'function' == typeof e.register &&
                                e.register()
                      },
                    },
                  ]),
                  i(t, [
                    {
                      key: 'addContainer',
                      value: function (t) {
                        var e =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : null
                        if ('string' == typeof t) {
                          var n = t
                          ;(t = document.createElement('div')).classList.add(n)
                        }
                        return this.container.insertBefore(t, e), t
                      },
                    },
                    {
                      key: 'blur',
                      value: function () {
                        this.selection.setRange(null)
                      },
                    },
                    {
                      key: 'deleteText',
                      value: function (t, e, n) {
                        var r = this,
                          i = x(t, e, n),
                          l = o(i, 4)
                        return w.call(
                          this,
                          function () {
                            return r.editor.deleteText(t, e)
                          },
                          (n = l[3]),
                          (t = l[0]),
                          -1 * (e = l[1])
                        )
                      },
                    },
                    {
                      key: 'disable',
                      value: function () {
                        this.enable(!1)
                      },
                    },
                    {
                      key: 'enable',
                      value: function () {
                        var t =
                          !(arguments.length > 0 && void 0 !== arguments[0]) ||
                          arguments[0]
                        this.scroll.enable(t),
                          this.container.classList.toggle('ql-disabled', !t)
                      },
                    },
                    {
                      key: 'focus',
                      value: function () {
                        var t = this.scrollingContainer.scrollTop
                        this.selection.focus(),
                          (this.scrollingContainer.scrollTop = t),
                          this.scrollIntoView()
                      },
                    },
                    {
                      key: 'format',
                      value: function (t, e) {
                        var n = this,
                          r =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : u.default.sources.API
                        return w.call(
                          this,
                          function () {
                            var r = n.getSelection(!0),
                              o = new l.default()
                            if (null == r) return o
                            if (c.default.query(t, c.default.Scope.BLOCK))
                              o = n.editor.formatLine(
                                r.index,
                                r.length,
                                b({}, t, e)
                              )
                            else {
                              if (0 === r.length)
                                return n.selection.format(t, e), o
                              o = n.editor.formatText(
                                r.index,
                                r.length,
                                b({}, t, e)
                              )
                            }
                            return (
                              n.setSelection(r, u.default.sources.SILENT), o
                            )
                          },
                          r
                        )
                      },
                    },
                    {
                      key: 'formatLine',
                      value: function (t, e, n, r, i) {
                        var l,
                          a = this,
                          u = x(t, e, n, r, i),
                          s = o(u, 4)
                        return (
                          (e = s[1]),
                          (l = s[2]),
                          w.call(
                            this,
                            function () {
                              return a.editor.formatLine(t, e, l)
                            },
                            (i = s[3]),
                            (t = s[0]),
                            0
                          )
                        )
                      },
                    },
                    {
                      key: 'formatText',
                      value: function (t, e, n, r, i) {
                        var l,
                          a = this,
                          u = x(t, e, n, r, i),
                          s = o(u, 4)
                        return (
                          (e = s[1]),
                          (l = s[2]),
                          w.call(
                            this,
                            function () {
                              return a.editor.formatText(t, e, l)
                            },
                            (i = s[3]),
                            (t = s[0]),
                            0
                          )
                        )
                      },
                    },
                    {
                      key: 'getBounds',
                      value: function (t) {
                        var e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : 0,
                          n = void 0
                        n =
                          'number' == typeof t
                            ? this.selection.getBounds(t, e)
                            : this.selection.getBounds(t.index, t.length)
                        var r = this.container.getBoundingClientRect()
                        return {
                          bottom: n.bottom - r.top,
                          height: n.height,
                          left: n.left - r.left,
                          right: n.right - r.left,
                          top: n.top - r.top,
                          width: n.width,
                        }
                      },
                    },
                    {
                      key: 'getContents',
                      value: function () {
                        var t =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : 0,
                          e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : this.getLength() - t,
                          n = x(t, e),
                          r = o(n, 2)
                        return this.editor.getContents((t = r[0]), (e = r[1]))
                      },
                    },
                    {
                      key: 'getFormat',
                      value: function () {
                        var t =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : this.getSelection(!0),
                          e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : 0
                        return 'number' == typeof t
                          ? this.editor.getFormat(t, e)
                          : this.editor.getFormat(t.index, t.length)
                      },
                    },
                    {
                      key: 'getIndex',
                      value: function (t) {
                        return t.offset(this.scroll)
                      },
                    },
                    {
                      key: 'getLength',
                      value: function () {
                        return this.scroll.length()
                      },
                    },
                    {
                      key: 'getLeaf',
                      value: function (t) {
                        return this.scroll.leaf(t)
                      },
                    },
                    {
                      key: 'getLine',
                      value: function (t) {
                        return this.scroll.line(t)
                      },
                    },
                    {
                      key: 'getLines',
                      value: function () {
                        var t =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : 0,
                          e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : Number.MAX_VALUE
                        return 'number' != typeof t
                          ? this.scroll.lines(t.index, t.length)
                          : this.scroll.lines(t, e)
                      },
                    },
                    {
                      key: 'getModule',
                      value: function (t) {
                        return this.theme.modules[t]
                      },
                    },
                    {
                      key: 'getSelection',
                      value: function () {
                        var t =
                          arguments.length > 0 &&
                          void 0 !== arguments[0] &&
                          arguments[0]
                        return (
                          t && this.focus(),
                          this.update(),
                          this.selection.getRange()[0]
                        )
                      },
                    },
                    {
                      key: 'getText',
                      value: function () {
                        var t =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : 0,
                          e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : this.getLength() - t,
                          n = x(t, e),
                          r = o(n, 2)
                        return this.editor.getText((t = r[0]), (e = r[1]))
                      },
                    },
                    {
                      key: 'hasFocus',
                      value: function () {
                        return this.selection.hasFocus()
                      },
                    },
                    {
                      key: 'insertEmbed',
                      value: function (e, n, r) {
                        var o = this,
                          i =
                            arguments.length > 3 && void 0 !== arguments[3]
                              ? arguments[3]
                              : t.sources.API
                        return w.call(
                          this,
                          function () {
                            return o.editor.insertEmbed(e, n, r)
                          },
                          i,
                          e
                        )
                      },
                    },
                    {
                      key: 'insertText',
                      value: function (t, e, n, r, i) {
                        var l,
                          a = this,
                          u = x(t, 0, n, r, i),
                          s = o(u, 4)
                        return (
                          (l = s[2]),
                          w.call(
                            this,
                            function () {
                              return a.editor.insertText(t, e, l)
                            },
                            (i = s[3]),
                            (t = s[0]),
                            e.length
                          )
                        )
                      },
                    },
                    {
                      key: 'isEnabled',
                      value: function () {
                        return !this.container.classList.contains('ql-disabled')
                      },
                    },
                    {
                      key: 'off',
                      value: function () {
                        return this.emitter.off.apply(this.emitter, arguments)
                      },
                    },
                    {
                      key: 'on',
                      value: function () {
                        return this.emitter.on.apply(this.emitter, arguments)
                      },
                    },
                    {
                      key: 'once',
                      value: function () {
                        return this.emitter.once.apply(this.emitter, arguments)
                      },
                    },
                    {
                      key: 'pasteHTML',
                      value: function (t, e, n) {
                        this.clipboard.dangerouslyPasteHTML(t, e, n)
                      },
                    },
                    {
                      key: 'removeFormat',
                      value: function (t, e, n) {
                        var r = this,
                          i = x(t, e, n),
                          l = o(i, 4)
                        return (
                          (e = l[1]),
                          w.call(
                            this,
                            function () {
                              return r.editor.removeFormat(t, e)
                            },
                            (n = l[3]),
                            (t = l[0])
                          )
                        )
                      },
                    },
                    {
                      key: 'scrollIntoView',
                      value: function () {
                        this.selection.scrollIntoView(this.scrollingContainer)
                      },
                    },
                    {
                      key: 'setContents',
                      value: function (t) {
                        var e = this,
                          n =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : u.default.sources.API
                        return w.call(
                          this,
                          function () {
                            t = new l.default(t)
                            var n = e.getLength(),
                              r = e.editor.deleteText(0, n),
                              o = e.editor.applyDelta(t),
                              i = o.ops[o.ops.length - 1]
                            return (
                              null != i &&
                                'string' == typeof i.insert &&
                                '\n' === i.insert[i.insert.length - 1] &&
                                (e.editor.deleteText(e.getLength() - 1, 1),
                                o.delete(1)),
                              r.compose(o)
                            )
                          },
                          n
                        )
                      },
                    },
                    {
                      key: 'setSelection',
                      value: function (e, n, r) {
                        if (null == e)
                          this.selection.setRange(null, n || t.sources.API)
                        else {
                          var i = x(e, n, r),
                            l = o(i, 4)
                          ;(r = l[3]),
                            this.selection.setRange(
                              new f.Range((e = l[0]), (n = l[1])),
                              r
                            ),
                            r !== u.default.sources.SILENT &&
                              this.selection.scrollIntoView(
                                this.scrollingContainer
                              )
                        }
                      },
                    },
                    {
                      key: 'setText',
                      value: function (t) {
                        var e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : u.default.sources.API,
                          n = new l.default().insert(t)
                        return this.setContents(n, e)
                      },
                    },
                    {
                      key: 'update',
                      value: function () {
                        var t =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : u.default.sources.USER,
                          e = this.scroll.update(t)
                        return this.selection.update(t), e
                      },
                    },
                    {
                      key: 'updateContents',
                      value: function (t) {
                        var e = this,
                          n =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : u.default.sources.API
                        return w.call(
                          this,
                          function () {
                            return (
                              (t = new l.default(t)), e.editor.applyDelta(t, n)
                            )
                          },
                          n,
                          !0
                        )
                      },
                    },
                  ]),
                  t
                )
              })()
            function O(t, e) {
              if (
                (e = (0, h.default)(
                  !0,
                  {
                    container: t,
                    modules: { clipboard: !0, keyboard: !0, history: !0 },
                  },
                  e
                )).theme &&
                e.theme !== _.DEFAULTS.theme
              ) {
                if (
                  ((e.theme = _.import('themes/' + e.theme)), null == e.theme)
                )
                  throw new Error(
                    'Invalid theme ' + e.theme + '. Did you register it?'
                  )
              } else e.theme = y.default
              var n = (0, h.default)(!0, {}, e.theme.DEFAULTS)
              ;[n, e].forEach(function (t) {
                ;(t.modules = t.modules || {}),
                  Object.keys(t.modules).forEach(function (e) {
                    !0 === t.modules[e] && (t.modules[e] = {})
                  })
              })
              var r = Object.keys(n.modules)
                .concat(Object.keys(e.modules))
                .reduce(function (t, e) {
                  var n = _.import('modules/' + e)
                  return (
                    null == n
                      ? m.error(
                          'Cannot load ' +
                            e +
                            ' module. Are you sure you registered it?'
                        )
                      : (t[e] = n.DEFAULTS || {}),
                    t
                  )
                }, {})
              return (
                null != e.modules &&
                  e.modules.toolbar &&
                  e.modules.toolbar.constructor !== Object &&
                  (e.modules.toolbar = { container: e.modules.toolbar }),
                (e = (0, h.default)(!0, {}, _.DEFAULTS, { modules: r }, n, e)),
                ['bounds', 'container', 'scrollingContainer'].forEach(function (
                  t
                ) {
                  'string' == typeof e[t] &&
                    (e[t] = document.querySelector(e[t]))
                }),
                (e.modules = Object.keys(e.modules).reduce(function (t, n) {
                  return e.modules[n] && (t[n] = e.modules[n]), t
                }, {})),
                e
              )
            }
            function w(t, e, n, r) {
              if (
                this.options.strict &&
                !this.isEnabled() &&
                e === u.default.sources.USER
              )
                return new l.default()
              var o = null == n ? null : this.getSelection(),
                i = this.editor.delta,
                a = t()
              if (
                (null != o &&
                  (!0 === n && (n = o.index),
                  null == r ? (o = E(o, a, e)) : 0 !== r && (o = E(o, n, r, e)),
                  this.setSelection(o, u.default.sources.SILENT)),
                a.length() > 0)
              ) {
                var s,
                  c,
                  f = [u.default.events.TEXT_CHANGE, a, i, e]
                ;(s = this.emitter).emit.apply(
                  s,
                  [u.default.events.EDITOR_CHANGE].concat(f)
                ),
                  e !== u.default.sources.SILENT &&
                    (c = this.emitter).emit.apply(c, f)
              }
              return a
            }
            function x(t, e, n, o, i) {
              var l = {}
              return (
                'number' == typeof t.index && 'number' == typeof t.length
                  ? 'number' != typeof e
                    ? ((i = o), (o = n), (n = e), (e = t.length), (t = t.index))
                    : ((e = t.length), (t = t.index))
                  : 'number' != typeof e &&
                    ((i = o), (o = n), (n = e), (e = 0)),
                'object' === (void 0 === n ? 'undefined' : r(n))
                  ? ((l = n), (i = o))
                  : 'string' == typeof n && (null != o ? (l[n] = o) : (i = n)),
                [t, e, l, (i = i || u.default.sources.API)]
              )
            }
            function E(t, e, n, r) {
              if (null == t) return null
              var i = void 0,
                a = void 0
              if (e instanceof l.default) {
                var s = [t.index, t.index + t.length].map(function (t) {
                    return e.transformPosition(t, r !== u.default.sources.USER)
                  }),
                  c = o(s, 2)
                ;(i = c[0]), (a = c[1])
              } else {
                var p = [t.index, t.index + t.length].map(function (t) {
                    return t < e || (t === e && r === u.default.sources.USER)
                      ? t
                      : n >= 0
                      ? t + n
                      : Math.max(e, t + n)
                  }),
                  h = o(p, 2)
                ;(i = h[0]), (a = h[1])
              }
              return new f.Range(i, a - i)
            }
            ;(_.DEFAULTS = {
              bounds: null,
              formats: null,
              modules: {},
              placeholder: '',
              readOnly: !1,
              scrollingContainer: null,
              strict: !0,
              theme: 'default',
            }),
              (_.events = u.default.events),
              (_.sources = u.default.sources),
              (_.version = '1.3.7'),
              (_.imports = {
                delta: l.default,
                parchment: c.default,
                'core/module': s.default,
                'core/theme': y.default,
              }),
              (e.expandConfig = O),
              (e.overload = x),
              (e.default = _)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              o = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              i = a(n(8)),
              l = a(n(0))
            function a(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function u(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function s(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var c = (function (t) {
              function e() {
                return (
                  u(this, e),
                  s(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                r(
                  e,
                  [
                    {
                      key: 'formatAt',
                      value: function (t, n, r, i) {
                        if (
                          e.compare(this.statics.blotName, r) < 0 &&
                          l.default.query(r, l.default.Scope.BLOT)
                        ) {
                          var a = this.isolate(t, n)
                          i && a.wrap(r, i)
                        } else
                          o(
                            e.prototype.__proto__ ||
                              Object.getPrototypeOf(e.prototype),
                            'formatAt',
                            this
                          ).call(this, t, n, r, i)
                      },
                    },
                    {
                      key: 'optimize',
                      value: function (t) {
                        if (
                          (o(
                            e.prototype.__proto__ ||
                              Object.getPrototypeOf(e.prototype),
                            'optimize',
                            this
                          ).call(this, t),
                          this.parent instanceof e &&
                            e.compare(
                              this.statics.blotName,
                              this.parent.statics.blotName
                            ) > 0)
                        ) {
                          var n = this.parent.isolate(
                            this.offset(),
                            this.length()
                          )
                          this.moveChildren(n), n.wrap(this)
                        }
                      },
                    },
                  ],
                  [
                    {
                      key: 'compare',
                      value: function (t, n) {
                        var r = e.order.indexOf(t),
                          o = e.order.indexOf(n)
                        return r >= 0 || o >= 0
                          ? r - o
                          : t === n
                          ? 0
                          : t < n
                          ? -1
                          : 1
                      },
                    },
                  ]
                ),
                e
              )
            })(l.default.Inline)
            ;(c.allowedChildren = [c, l.default.Embed, i.default]),
              (c.order = [
                'cursor',
                'inline',
                'underline',
                'strike',
                'italic',
                'bold',
                'script',
                'link',
                'code',
              ]),
              (e.default = c)
          },
          function (t, e, n) {
            t.exports = TypeError
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = n(0)
            function i(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function l(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var a = (function (t) {
              function e() {
                return (
                  i(this, e),
                  l(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                e
              )
            })(((r = o) && r.__esModule ? r : { default: r }).default.Text)
            e.default = a
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              o = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              i = l(n(91))
            function l(t) {
              return t && t.__esModule ? t : { default: t }
            }
            var a = (0, l(n(11)).default)('quill:events')
            ;['selectionchange', 'mousedown', 'mouseup', 'click'].forEach(
              function (t) {
                document.addEventListener(t, function () {
                  for (
                    var t = arguments.length, e = Array(t), n = 0;
                    n < t;
                    n++
                  )
                    e[n] = arguments[n]
                  ;[].slice
                    .call(document.querySelectorAll('.ql-container'))
                    .forEach(function (t) {
                      var n
                      t.__quill &&
                        t.__quill.emitter &&
                        (n = t.__quill.emitter).handleDOM.apply(n, e)
                    })
                })
              }
            )
            var u = (function (t) {
              function e() {
                !(function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError('Cannot call a class as a function')
                })(this, e)
                var t = (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ('object' != typeof e && 'function' != typeof e)
                    ? t
                    : e
                })(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this))
                return (t.listeners = {}), t.on('error', a.error), t
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                r(e, [
                  {
                    key: 'emit',
                    value: function () {
                      a.log.apply(a, arguments),
                        o(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'emit',
                          this
                        ).apply(this, arguments)
                    },
                  },
                  {
                    key: 'handleDOM',
                    value: function (t) {
                      for (
                        var e = arguments.length,
                          n = Array(e > 1 ? e - 1 : 0),
                          r = 1;
                        r < e;
                        r++
                      )
                        n[r - 1] = arguments[r]
                      ;(this.listeners[t.type] || []).forEach(function (e) {
                        var r = e.node,
                          o = e.handler
                        ;(t.target === r || r.contains(t.target)) &&
                          o.apply(void 0, [t].concat(n))
                      })
                    },
                  },
                  {
                    key: 'listenDOM',
                    value: function (t, e, n) {
                      this.listeners[t] || (this.listeners[t] = []),
                        this.listeners[t].push({ node: e, handler: n })
                    },
                  },
                ]),
                e
              )
            })(i.default)
            ;(u.events = {
              EDITOR_CHANGE: 'editor-change',
              SCROLL_BEFORE_UPDATE: 'scroll-before-update',
              SCROLL_OPTIMIZE: 'scroll-optimize',
              SCROLL_UPDATE: 'scroll-update',
              SELECTION_CHANGE: 'selection-change',
              TEXT_CHANGE: 'text-change',
            }),
              (u.sources = { API: 'api', SILENT: 'silent', USER: 'user' }),
              (e.default = u)
          },
          function (t, e, n) {
            function r(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            Object.defineProperty(e, '__esModule', { value: !0 })
            var o = function t(e) {
              var n =
                arguments.length > 1 && void 0 !== arguments[1]
                  ? arguments[1]
                  : {}
              r(this, t), (this.quill = e), (this.options = n)
            }
            ;(o.DEFAULTS = {}), (e.default = o)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = ['error', 'warn', 'log', 'info'],
              o = 'warn'
            function i(t) {
              if (r.indexOf(t) <= r.indexOf(o)) {
                for (
                  var e,
                    n = arguments.length,
                    i = Array(n > 1 ? n - 1 : 0),
                    l = 1;
                  l < n;
                  l++
                )
                  i[l - 1] = arguments[l]
                ;(e = console)[t].apply(e, i)
              }
            }
            function l(t) {
              return r.reduce(function (e, n) {
                return (e[n] = i.bind(console, n, t)), e
              }, {})
            }
            ;(i.level = l.level =
              function (t) {
                o = t
              }),
              (e.default = l)
          },
          function (t, e, n) {
            var r = n(43),
              o = n(72),
              i = n(83),
              l = n(85),
              a = n(86),
              u = n(90),
              s = Date.prototype.getTime
            function c(t, e, n) {
              var h = n || {}
              return (
                !!(h.strict ? i(t, e) : t === e) ||
                (!t || !e || ('object' != typeof t && 'object' != typeof e)
                  ? h.strict
                    ? i(t, e)
                    : t == e
                  : (function (t, e, n) {
                      var i, h
                      if (typeof t != typeof e) return !1
                      if (f(t) || f(e)) return !1
                      if (t.prototype !== e.prototype) return !1
                      if (o(t) !== o(e)) return !1
                      var d = l(t),
                        y = l(e)
                      if (d !== y) return !1
                      if (d || y) return t.source === e.source && a(t) === a(e)
                      if (u(t) && u(e)) return s.call(t) === s.call(e)
                      var v = p(t),
                        b = p(e)
                      if (v !== b) return !1
                      if (v || b) {
                        if (t.length !== e.length) return !1
                        for (i = 0; i < t.length; i++)
                          if (t[i] !== e[i]) return !1
                        return !0
                      }
                      if (typeof t != typeof e) return !1
                      try {
                        var g = r(t),
                          m = r(e)
                      } catch (_) {
                        return !1
                      }
                      if (g.length !== m.length) return !1
                      for (g.sort(), m.sort(), i = g.length - 1; i >= 0; i--)
                        if (g[i] != m[i]) return !1
                      for (i = g.length - 1; i >= 0; i--)
                        if (!c(t[(h = g[i])], e[h], n)) return !1
                      return !0
                    })(t, e, h))
              )
            }
            function f(t) {
              return null == t
            }
            function p(t) {
              return !(
                !t ||
                'object' != typeof t ||
                'number' != typeof t.length ||
                'function' != typeof t.copy ||
                'function' != typeof t.slice ||
                (t.length > 0 && 'number' != typeof t[0])
              )
            }
            t.exports = c
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = n(1),
              o = (function () {
                function t(t, e, n) {
                  void 0 === n && (n = {}),
                    (this.attrName = t),
                    (this.keyName = e),
                    (this.scope =
                      null != n.scope
                        ? (n.scope & r.Scope.LEVEL) |
                          (r.Scope.TYPE & r.Scope.ATTRIBUTE)
                        : r.Scope.ATTRIBUTE),
                    null != n.whitelist && (this.whitelist = n.whitelist)
                }
                return (
                  (t.keys = function (t) {
                    return [].map.call(t.attributes, function (t) {
                      return t.name
                    })
                  }),
                  (t.prototype.add = function (t, e) {
                    return (
                      !!this.canAdd(t, e) &&
                      (t.setAttribute(this.keyName, e), !0)
                    )
                  }),
                  (t.prototype.canAdd = function (t, e) {
                    return (
                      null !=
                        r.query(
                          t,
                          r.Scope.BLOT & (this.scope | r.Scope.TYPE)
                        ) &&
                      (null == this.whitelist ||
                        ('string' == typeof e
                          ? this.whitelist.indexOf(e.replace(/["']/g, '')) > -1
                          : this.whitelist.indexOf(e) > -1))
                    )
                  }),
                  (t.prototype.remove = function (t) {
                    t.removeAttribute(this.keyName)
                  }),
                  (t.prototype.value = function (t) {
                    var e = t.getAttribute(this.keyName)
                    return this.canAdd(t, e) && e ? e : ''
                  }),
                  t
                )
              })()
            e.default = o
          },
          function (t, e, n) {
            var r,
              o = n(73),
              i = n(74),
              l = n(75),
              a = n(76),
              u = n(47),
              s = n(7),
              c = n(77),
              f = Function,
              p = function (t) {
                try {
                  return f('"use strict"; return (' + t + ').constructor;')()
                } catch (e) {}
              },
              h = Object.getOwnPropertyDescriptor
            if (h)
              try {
                h({}, '')
              } catch (M) {
                h = null
              }
            var d = function () {
                throw new s()
              },
              y = h
                ? (function () {
                    try {
                      return d
                    } catch (t) {
                      try {
                        return h(arguments, 'callee').get
                      } catch (e) {
                        return d
                      }
                    }
                  })()
                : d,
              v = n(78)(),
              b = n(79)(),
              g =
                Object.getPrototypeOf ||
                (b
                  ? function (t) {
                      return t.__proto__
                    }
                  : null),
              m = {},
              _ = 'undefined' != typeof Uint8Array && g ? g(Uint8Array) : r,
              O = {
                __proto__: null,
                '%AggregateError%':
                  'undefined' == typeof AggregateError ? r : AggregateError,
                '%Array%': Array,
                '%ArrayBuffer%':
                  'undefined' == typeof ArrayBuffer ? r : ArrayBuffer,
                '%ArrayIteratorPrototype%':
                  v && g ? g([][Symbol.iterator]()) : r,
                '%AsyncFromSyncIteratorPrototype%': r,
                '%AsyncFunction%': m,
                '%AsyncGenerator%': m,
                '%AsyncGeneratorFunction%': m,
                '%AsyncIteratorPrototype%': m,
                '%Atomics%': 'undefined' == typeof Atomics ? r : Atomics,
                '%BigInt%': 'undefined' == typeof BigInt ? r : BigInt,
                '%BigInt64Array%':
                  'undefined' == typeof BigInt64Array ? r : BigInt64Array,
                '%BigUint64Array%':
                  'undefined' == typeof BigUint64Array ? r : BigUint64Array,
                '%Boolean%': Boolean,
                '%DataView%': 'undefined' == typeof DataView ? r : DataView,
                '%Date%': Date,
                '%decodeURI%': decodeURI,
                '%decodeURIComponent%': decodeURIComponent,
                '%encodeURI%': encodeURI,
                '%encodeURIComponent%': encodeURIComponent,
                '%Error%': o,
                '%eval%': eval,
                '%EvalError%': i,
                '%Float32Array%':
                  'undefined' == typeof Float32Array ? r : Float32Array,
                '%Float64Array%':
                  'undefined' == typeof Float64Array ? r : Float64Array,
                '%FinalizationRegistry%':
                  'undefined' == typeof FinalizationRegistry
                    ? r
                    : FinalizationRegistry,
                '%Function%': f,
                '%GeneratorFunction%': m,
                '%Int8Array%': 'undefined' == typeof Int8Array ? r : Int8Array,
                '%Int16Array%':
                  'undefined' == typeof Int16Array ? r : Int16Array,
                '%Int32Array%':
                  'undefined' == typeof Int32Array ? r : Int32Array,
                '%isFinite%': isFinite,
                '%isNaN%': isNaN,
                '%IteratorPrototype%': v && g ? g(g([][Symbol.iterator]())) : r,
                '%JSON%': 'object' == typeof JSON ? JSON : r,
                '%Map%': 'undefined' == typeof Map ? r : Map,
                '%MapIteratorPrototype%':
                  'undefined' != typeof Map && v && g
                    ? g(new Map()[Symbol.iterator]())
                    : r,
                '%Math%': Math,
                '%Number%': Number,
                '%Object%': Object,
                '%parseFloat%': parseFloat,
                '%parseInt%': parseInt,
                '%Promise%': 'undefined' == typeof Promise ? r : Promise,
                '%Proxy%': 'undefined' == typeof Proxy ? r : Proxy,
                '%RangeError%': l,
                '%ReferenceError%': a,
                '%Reflect%': 'undefined' == typeof Reflect ? r : Reflect,
                '%RegExp%': RegExp,
                '%Set%': 'undefined' == typeof Set ? r : Set,
                '%SetIteratorPrototype%':
                  'undefined' != typeof Set && v && g
                    ? g(new Set()[Symbol.iterator]())
                    : r,
                '%SharedArrayBuffer%':
                  'undefined' == typeof SharedArrayBuffer
                    ? r
                    : SharedArrayBuffer,
                '%String%': String,
                '%StringIteratorPrototype%':
                  v && g ? g(''[Symbol.iterator]()) : r,
                '%Symbol%': v ? Symbol : r,
                '%SyntaxError%': u,
                '%ThrowTypeError%': y,
                '%TypedArray%': _,
                '%TypeError%': s,
                '%Uint8Array%':
                  'undefined' == typeof Uint8Array ? r : Uint8Array,
                '%Uint8ClampedArray%':
                  'undefined' == typeof Uint8ClampedArray
                    ? r
                    : Uint8ClampedArray,
                '%Uint16Array%':
                  'undefined' == typeof Uint16Array ? r : Uint16Array,
                '%Uint32Array%':
                  'undefined' == typeof Uint32Array ? r : Uint32Array,
                '%URIError%': c,
                '%WeakMap%': 'undefined' == typeof WeakMap ? r : WeakMap,
                '%WeakRef%': 'undefined' == typeof WeakRef ? r : WeakRef,
                '%WeakSet%': 'undefined' == typeof WeakSet ? r : WeakSet,
              }
            if (g)
              try {
                null.error
              } catch (M) {
                var w = g(g(M))
                O['%Error.prototype%'] = w
              }
            var x = function t(e) {
                var n
                if ('%AsyncFunction%' === e) n = p('async function () {}')
                else if ('%GeneratorFunction%' === e) n = p('function* () {}')
                else if ('%AsyncGeneratorFunction%' === e)
                  n = p('async function* () {}')
                else if ('%AsyncGenerator%' === e) {
                  var r = t('%AsyncGeneratorFunction%')
                  r && (n = r.prototype)
                } else if ('%AsyncIteratorPrototype%' === e) {
                  var o = t('%AsyncGenerator%')
                  o && g && (n = g(o.prototype))
                }
                return (O[e] = n), n
              },
              E = {
                __proto__: null,
                '%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
                '%ArrayPrototype%': ['Array', 'prototype'],
                '%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
                '%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
                '%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
                '%ArrayProto_values%': ['Array', 'prototype', 'values'],
                '%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
                '%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
                '%AsyncGeneratorPrototype%': [
                  'AsyncGeneratorFunction',
                  'prototype',
                  'prototype',
                ],
                '%BooleanPrototype%': ['Boolean', 'prototype'],
                '%DataViewPrototype%': ['DataView', 'prototype'],
                '%DatePrototype%': ['Date', 'prototype'],
                '%ErrorPrototype%': ['Error', 'prototype'],
                '%EvalErrorPrototype%': ['EvalError', 'prototype'],
                '%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
                '%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
                '%FunctionPrototype%': ['Function', 'prototype'],
                '%Generator%': ['GeneratorFunction', 'prototype'],
                '%GeneratorPrototype%': [
                  'GeneratorFunction',
                  'prototype',
                  'prototype',
                ],
                '%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
                '%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
                '%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
                '%JSONParse%': ['JSON', 'parse'],
                '%JSONStringify%': ['JSON', 'stringify'],
                '%MapPrototype%': ['Map', 'prototype'],
                '%NumberPrototype%': ['Number', 'prototype'],
                '%ObjectPrototype%': ['Object', 'prototype'],
                '%ObjProto_toString%': ['Object', 'prototype', 'toString'],
                '%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
                '%PromisePrototype%': ['Promise', 'prototype'],
                '%PromiseProto_then%': ['Promise', 'prototype', 'then'],
                '%Promise_all%': ['Promise', 'all'],
                '%Promise_reject%': ['Promise', 'reject'],
                '%Promise_resolve%': ['Promise', 'resolve'],
                '%RangeErrorPrototype%': ['RangeError', 'prototype'],
                '%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
                '%RegExpPrototype%': ['RegExp', 'prototype'],
                '%SetPrototype%': ['Set', 'prototype'],
                '%SharedArrayBufferPrototype%': [
                  'SharedArrayBuffer',
                  'prototype',
                ],
                '%StringPrototype%': ['String', 'prototype'],
                '%SymbolPrototype%': ['Symbol', 'prototype'],
                '%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
                '%TypedArrayPrototype%': ['TypedArray', 'prototype'],
                '%TypeErrorPrototype%': ['TypeError', 'prototype'],
                '%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
                '%Uint8ClampedArrayPrototype%': [
                  'Uint8ClampedArray',
                  'prototype',
                ],
                '%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
                '%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
                '%URIErrorPrototype%': ['URIError', 'prototype'],
                '%WeakMapPrototype%': ['WeakMap', 'prototype'],
                '%WeakSetPrototype%': ['WeakSet', 'prototype'],
              },
              A = n(24),
              k = n(81),
              j = A.call(Function.call, Array.prototype.concat),
              N = A.call(Function.apply, Array.prototype.splice),
              P = A.call(Function.call, String.prototype.replace),
              S = A.call(Function.call, String.prototype.slice),
              T = A.call(Function.call, RegExp.prototype.exec),
              q =
                /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g,
              C = /\\(\\)?/g,
              L = function (t) {
                var e = S(t, 0, 1),
                  n = S(t, -1)
                if ('%' === e && '%' !== n)
                  throw new u('invalid intrinsic syntax, expected closing `%`')
                if ('%' === n && '%' !== e)
                  throw new u('invalid intrinsic syntax, expected opening `%`')
                var r = []
                return (
                  P(t, q, function (t, e, n, o) {
                    r[r.length] = n ? P(o, C, '$1') : e || t
                  }),
                  r
                )
              },
              R = function (t, e) {
                var n,
                  r = t
                if ((k(E, r) && (r = '%' + (n = E[r])[0] + '%'), k(O, r))) {
                  var o = O[r]
                  if ((o === m && (o = x(r)), void 0 === o && !e))
                    throw new s(
                      'intrinsic ' +
                        t +
                        ' exists, but is not available. Please file an issue!'
                    )
                  return { alias: n, name: r, value: o }
                }
                throw new u('intrinsic ' + t + ' does not exist!')
              }
            t.exports = function (t, e) {
              if ('string' != typeof t || 0 === t.length)
                throw new s('intrinsic name must be a non-empty string')
              if (arguments.length > 1 && 'boolean' != typeof e)
                throw new s('"allowMissing" argument must be a boolean')
              if (null === T(/^%?[^%]*%?$/, t))
                throw new u(
                  '`%` may not be present anywhere but at the beginning and end of the intrinsic name'
                )
              var n = L(t),
                r = n.length > 0 ? n[0] : '',
                o = R('%' + r + '%', e),
                i = o.name,
                l = o.value,
                a = !1,
                c = o.alias
              c && ((r = c[0]), N(n, j([0, 1], c)))
              for (var f = 1, p = !0; f < n.length; f += 1) {
                var d = n[f],
                  y = S(d, 0, 1),
                  v = S(d, -1)
                if (
                  ('"' === y ||
                    "'" === y ||
                    '`' === y ||
                    '"' === v ||
                    "'" === v ||
                    '`' === v) &&
                  y !== v
                )
                  throw new u(
                    'property names with quotes must have matching quotes'
                  )
                if (
                  (('constructor' !== d && p) || (a = !0),
                  k(O, (i = '%' + (r += '.' + d) + '%')))
                )
                  l = O[i]
                else if (null != l) {
                  if (!(d in l)) {
                    if (!e)
                      throw new s(
                        'base intrinsic for ' +
                          t +
                          ' exists, but the property is not available.'
                      )
                    return
                  }
                  if (h && f + 1 >= n.length) {
                    var b = h(l, d)
                    l =
                      (p = !!b) && 'get' in b && !('originalValue' in b.get)
                        ? b.get
                        : l[d]
                  } else (p = k(l, d)), (l = l[d])
                  p && !a && (O[i] = l)
                }
              }
              return l
            }
          },
          function (t, e, n) {
            var r = n(43),
              o =
                'function' == typeof Symbol && 'symbol' == typeof Symbol('foo'),
              i = Object.prototype.toString,
              l = Array.prototype.concat,
              a = n(26),
              u = n(28)(),
              s = function (t, e, n, r) {
                if (e in t)
                  if (!0 === r) {
                    if (t[e] === n) return
                  } else if (
                    'function' != typeof (o = r) ||
                    '[object Function]' !== i.call(o) ||
                    !r()
                  )
                    return
                var o
                u ? a(t, e, n, !0) : a(t, e, n)
              },
              c = function (t, e) {
                var n = arguments.length > 2 ? arguments[2] : {},
                  i = r(e)
                o && (i = l.call(i, Object.getOwnPropertySymbols(e)))
                for (var a = 0; a < i.length; a += 1)
                  s(t, i[a], e[i[a]], n[i[a]])
              }
            ;(c.supportsDescriptors = !!u), (t.exports = c)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.default = e.Code = void 0)
            var r = function (t, e) {
                if (Array.isArray(t)) return t
                if (Symbol.iterator in Object(t))
                  return (function (t, e) {
                    var n = [],
                      r = !0,
                      o = !1,
                      i = void 0
                    try {
                      for (
                        var l, a = t[Symbol.iterator]();
                        !(r = (l = a.next()).done) &&
                        (n.push(l.value), !e || n.length !== e);
                        r = !0
                      );
                    } catch (u) {
                      ;(o = !0), (i = u)
                    } finally {
                      try {
                        !r && a.return && a.return()
                      } finally {
                        if (o) throw i
                      }
                    }
                    return n
                  })(t, e)
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance'
                )
              },
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = f(n(2)),
              a = f(n(0)),
              u = f(n(4)),
              s = f(n(6)),
              c = f(n(8))
            function f(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function p(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function h(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            function d(t, e) {
              if ('function' != typeof e && null !== e)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof e
                )
              ;(t.prototype = Object.create(e && e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                e &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, e)
                    : (t.__proto__ = e))
            }
            var y = (function (t) {
              function e() {
                return (
                  p(this, e),
                  h(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return d(e, t), e
            })(s.default)
            ;(y.blotName = 'code'), (y.tagName = 'CODE')
            var v = (function (t) {
              function e() {
                return (
                  p(this, e),
                  h(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                d(e, t),
                o(
                  e,
                  [
                    {
                      key: 'delta',
                      value: function () {
                        var t = this,
                          e = this.domNode.textContent
                        return (
                          e.endsWith('\n') && (e = e.slice(0, -1)),
                          e.split('\n').reduce(function (e, n) {
                            return e.insert(n).insert('\n', t.formats())
                          }, new l.default())
                        )
                      },
                    },
                    {
                      key: 'format',
                      value: function (t, n) {
                        if (t !== this.statics.blotName || !n) {
                          var o = this.descendant(c.default, this.length() - 1),
                            l = r(o, 1)[0]
                          null != l && l.deleteAt(l.length() - 1, 1),
                            i(
                              e.prototype.__proto__ ||
                                Object.getPrototypeOf(e.prototype),
                              'format',
                              this
                            ).call(this, t, n)
                        }
                      },
                    },
                    {
                      key: 'formatAt',
                      value: function (t, n, r, o) {
                        if (
                          0 !== n &&
                          null != a.default.query(r, a.default.Scope.BLOCK) &&
                          (r !== this.statics.blotName ||
                            o !== this.statics.formats(this.domNode))
                        ) {
                          var i = this.newlineIndex(t)
                          if (!(i < 0 || i >= t + n)) {
                            var l = this.newlineIndex(t, !0) + 1,
                              u = i - l + 1,
                              s = this.isolate(l, u),
                              c = s.next
                            s.format(r, o),
                              c instanceof e &&
                                c.formatAt(0, t - l + n - u, r, o)
                          }
                        }
                      },
                    },
                    {
                      key: 'insertAt',
                      value: function (t, e, n) {
                        if (null == n) {
                          var o = this.descendant(c.default, t),
                            i = r(o, 2)
                          i[0].insertAt(i[1], e)
                        }
                      },
                    },
                    {
                      key: 'length',
                      value: function () {
                        var t = this.domNode.textContent.length
                        return this.domNode.textContent.endsWith('\n')
                          ? t
                          : t + 1
                      },
                    },
                    {
                      key: 'newlineIndex',
                      value: function (t) {
                        var e =
                          arguments.length > 1 &&
                          void 0 !== arguments[1] &&
                          arguments[1]
                        if (e)
                          return this.domNode.textContent
                            .slice(0, t)
                            .lastIndexOf('\n')
                        var n = this.domNode.textContent.slice(t).indexOf('\n')
                        return n > -1 ? t + n : -1
                      },
                    },
                    {
                      key: 'optimize',
                      value: function (t) {
                        this.domNode.textContent.endsWith('\n') ||
                          this.appendChild(a.default.create('text', '\n')),
                          i(
                            e.prototype.__proto__ ||
                              Object.getPrototypeOf(e.prototype),
                            'optimize',
                            this
                          ).call(this, t)
                        var n = this.next
                        null != n &&
                          n.prev === this &&
                          n.statics.blotName === this.statics.blotName &&
                          this.statics.formats(this.domNode) ===
                            n.statics.formats(n.domNode) &&
                          (n.optimize(t), n.moveChildren(this), n.remove())
                      },
                    },
                    {
                      key: 'replace',
                      value: function (t) {
                        i(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'replace',
                          this
                        ).call(this, t),
                          [].slice
                            .call(this.domNode.querySelectorAll('*'))
                            .forEach(function (t) {
                              var e = a.default.find(t)
                              null == e
                                ? t.parentNode.removeChild(t)
                                : e instanceof a.default.Embed
                                ? e.remove()
                                : e.unwrap()
                            })
                      },
                    },
                  ],
                  [
                    {
                      key: 'create',
                      value: function (t) {
                        var n = i(
                          e.__proto__ || Object.getPrototypeOf(e),
                          'create',
                          this
                        ).call(this, t)
                        return n.setAttribute('spellcheck', !1), n
                      },
                    },
                    {
                      key: 'formats',
                      value: function () {
                        return !0
                      },
                    },
                  ]
                ),
                e
              )
            })(u.default)
            ;(v.blotName = 'code-block'),
              (v.tagName = 'PRE'),
              (v.TAB = '  '),
              (e.Code = y),
              (e.default = v)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                  ? function (t) {
                      return typeof t
                    }
                  : function (t) {
                      return t &&
                        'function' == typeof Symbol &&
                        t.constructor === Symbol &&
                        t !== Symbol.prototype
                        ? 'symbol'
                        : typeof t
                    },
              o = function (t, e) {
                if (Array.isArray(t)) return t
                if (Symbol.iterator in Object(t))
                  return (function (t, e) {
                    var n = [],
                      r = !0,
                      o = !1,
                      i = void 0
                    try {
                      for (
                        var l, a = t[Symbol.iterator]();
                        !(r = (l = a.next()).done) &&
                        (n.push(l.value), !e || n.length !== e);
                        r = !0
                      );
                    } catch (u) {
                      ;(o = !0), (i = u)
                    } finally {
                      try {
                        !r && a.return && a.return()
                      } finally {
                        if (o) throw i
                      }
                    }
                    return n
                  })(t, e)
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance'
                )
              },
              i = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              l = b(n(2)),
              a = b(n(29)),
              u = b(n(0)),
              s = b(n(16)),
              c = b(n(33)),
              f = n(4),
              p = b(f),
              h = b(n(19)),
              d = b(n(30)),
              y = b(n(12)),
              v = b(n(3))
            function b(t) {
              return t && t.__esModule ? t : { default: t }
            }
            var g = /^[ -~]*$/,
              m = (function () {
                function t(e) {
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, t),
                    (this.scroll = e),
                    (this.delta = this.getDelta())
                }
                return (
                  i(t, [
                    {
                      key: 'applyDelta',
                      value: function (t) {
                        var e = this,
                          n = !1
                        this.scroll.update()
                        var i = this.scroll.length()
                        return (
                          this.scroll.batchStart(),
                          (t = (function (t) {
                            return t.reduce(function (t, e) {
                              if (1 === e.insert) {
                                var n = (0, d.default)(e.attributes)
                                return (
                                  delete n.image,
                                  t.insert({ image: e.attributes.image }, n)
                                )
                              }
                              if (
                                (null == e.attributes ||
                                  (!0 !== e.attributes.list &&
                                    !0 !== e.attributes.bullet) ||
                                  ((e = (0, d.default)(e)).attributes.list
                                    ? (e.attributes.list = 'ordered')
                                    : ((e.attributes.list = 'bullet'),
                                      delete e.attributes.bullet)),
                                'string' == typeof e.insert)
                              ) {
                                var r = e.insert
                                  .replace(/\r\n/g, '\n')
                                  .replace(/\r/g, '\n')
                                return t.insert(r, e.attributes)
                              }
                              return t.push(e)
                            }, new l.default())
                          })(t)).reduce(function (t, l) {
                            var s =
                                l.retain || l.delete || l.insert.length || 1,
                              c = l.attributes || {}
                            if (null != l.insert) {
                              if ('string' == typeof l.insert) {
                                var h = l.insert
                                h.endsWith('\n') &&
                                  n &&
                                  ((n = !1), (h = h.slice(0, -1))),
                                  t >= i && !h.endsWith('\n') && (n = !0),
                                  e.scroll.insertAt(t, h)
                                var d = e.scroll.line(t),
                                  y = o(d, 2),
                                  b = y[0],
                                  g = y[1],
                                  m = (0, v.default)(
                                    {},
                                    (0, f.bubbleFormats)(b)
                                  )
                                if (b instanceof p.default) {
                                  var _ = b.descendant(u.default.Leaf, g),
                                    O = o(_, 1)
                                  m = (0, v.default)(
                                    m,
                                    (0, f.bubbleFormats)(O[0])
                                  )
                                }
                                c = a.default.attributes.diff(m, c) || {}
                              } else if ('object' === r(l.insert)) {
                                var w = Object.keys(l.insert)[0]
                                if (null == w) return t
                                e.scroll.insertAt(t, w, l.insert[w])
                              }
                              i += s
                            }
                            return (
                              Object.keys(c).forEach(function (n) {
                                e.scroll.formatAt(t, s, n, c[n])
                              }),
                              t + s
                            )
                          }, 0),
                          t.reduce(function (t, n) {
                            return 'number' == typeof n.delete
                              ? (e.scroll.deleteAt(t, n.delete), t)
                              : t + (n.retain || n.insert.length || 1)
                          }, 0),
                          this.scroll.batchEnd(),
                          this.update(t)
                        )
                      },
                    },
                    {
                      key: 'deleteText',
                      value: function (t, e) {
                        return (
                          this.scroll.deleteAt(t, e),
                          this.update(new l.default().retain(t).delete(e))
                        )
                      },
                    },
                    {
                      key: 'formatLine',
                      value: function (t, e) {
                        var n = this,
                          r =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : {}
                        return (
                          this.scroll.update(),
                          Object.keys(r).forEach(function (o) {
                            if (
                              null == n.scroll.whitelist ||
                              n.scroll.whitelist[o]
                            ) {
                              var i = n.scroll.lines(t, Math.max(e, 1)),
                                l = e
                              i.forEach(function (e) {
                                var i = e.length()
                                if (e instanceof s.default) {
                                  var a = t - e.offset(n.scroll),
                                    u = e.newlineIndex(a + l) - a + 1
                                  e.formatAt(a, u, o, r[o])
                                } else e.format(o, r[o])
                                l -= i
                              })
                            }
                          }),
                          this.scroll.optimize(),
                          this.update(
                            new l.default()
                              .retain(t)
                              .retain(e, (0, d.default)(r))
                          )
                        )
                      },
                    },
                    {
                      key: 'formatText',
                      value: function (t, e) {
                        var n = this,
                          r =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : {}
                        return (
                          Object.keys(r).forEach(function (o) {
                            n.scroll.formatAt(t, e, o, r[o])
                          }),
                          this.update(
                            new l.default()
                              .retain(t)
                              .retain(e, (0, d.default)(r))
                          )
                        )
                      },
                    },
                    {
                      key: 'getContents',
                      value: function (t, e) {
                        return this.delta.slice(t, t + e)
                      },
                    },
                    {
                      key: 'getDelta',
                      value: function () {
                        return this.scroll.lines().reduce(function (t, e) {
                          return t.concat(e.delta())
                        }, new l.default())
                      },
                    },
                    {
                      key: 'getFormat',
                      value: function (t) {
                        var e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : 0,
                          n = [],
                          r = []
                        0 === e
                          ? this.scroll.path(t).forEach(function (t) {
                              var e = o(t, 1)[0]
                              e instanceof p.default
                                ? n.push(e)
                                : e instanceof u.default.Leaf && r.push(e)
                            })
                          : ((n = this.scroll.lines(t, e)),
                            (r = this.scroll.descendants(u.default.Leaf, t, e)))
                        var i = [n, r].map(function (t) {
                          if (0 === t.length) return {}
                          for (
                            var e = (0, f.bubbleFormats)(t.shift());
                            Object.keys(e).length > 0;

                          ) {
                            var n = t.shift()
                            if (null == n) return e
                            e = _((0, f.bubbleFormats)(n), e)
                          }
                          return e
                        })
                        return v.default.apply(v.default, i)
                      },
                    },
                    {
                      key: 'getText',
                      value: function (t, e) {
                        return this.getContents(t, e)
                          .filter(function (t) {
                            return 'string' == typeof t.insert
                          })
                          .map(function (t) {
                            return t.insert
                          })
                          .join('')
                      },
                    },
                    {
                      key: 'insertEmbed',
                      value: function (t, e, n) {
                        return (
                          this.scroll.insertAt(t, e, n),
                          this.update(
                            new l.default().retain(t).insert(
                              (function (t, e, n) {
                                return (
                                  e in t
                                    ? Object.defineProperty(t, e, {
                                        value: n,
                                        enumerable: !0,
                                        configurable: !0,
                                        writable: !0,
                                      })
                                    : (t[e] = n),
                                  t
                                )
                              })({}, e, n)
                            )
                          )
                        )
                      },
                    },
                    {
                      key: 'insertText',
                      value: function (t, e) {
                        var n = this,
                          r =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : {}
                        return (
                          (e = e.replace(/\r\n/g, '\n').replace(/\r/g, '\n')),
                          this.scroll.insertAt(t, e),
                          Object.keys(r).forEach(function (o) {
                            n.scroll.formatAt(t, e.length, o, r[o])
                          }),
                          this.update(
                            new l.default()
                              .retain(t)
                              .insert(e, (0, d.default)(r))
                          )
                        )
                      },
                    },
                    {
                      key: 'isBlank',
                      value: function () {
                        if (0 == this.scroll.children.length) return !0
                        if (this.scroll.children.length > 1) return !1
                        var t = this.scroll.children.head
                        return (
                          t.statics.blotName === p.default.blotName &&
                          !(t.children.length > 1) &&
                          t.children.head instanceof h.default
                        )
                      },
                    },
                    {
                      key: 'removeFormat',
                      value: function (t, e) {
                        var n = this.getText(t, e),
                          r = this.scroll.line(t + e),
                          i = o(r, 2),
                          a = i[0],
                          u = i[1],
                          c = 0,
                          f = new l.default()
                        null != a &&
                          ((c =
                            a instanceof s.default
                              ? a.newlineIndex(u) - u + 1
                              : a.length() - u),
                          (f = a
                            .delta()
                            .slice(u, u + c - 1)
                            .insert('\n')))
                        var p = this.getContents(t, e + c).diff(
                            new l.default().insert(n).concat(f)
                          ),
                          h = new l.default().retain(t).concat(p)
                        return this.applyDelta(h)
                      },
                    },
                    {
                      key: 'update',
                      value: function (t) {
                        var e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : [],
                          n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : void 0,
                          r = this.delta
                        if (
                          1 === e.length &&
                          'characterData' === e[0].type &&
                          e[0].target.data.match(g) &&
                          u.default.find(e[0].target)
                        ) {
                          var o = u.default.find(e[0].target),
                            i = (0, f.bubbleFormats)(o),
                            a = o.offset(this.scroll),
                            s = e[0].oldValue.replace(c.default.CONTENTS, ''),
                            p = new l.default().insert(s),
                            h = new l.default().insert(o.value()),
                            d = new l.default().retain(a).concat(p.diff(h, n))
                          ;(t = d.reduce(function (t, e) {
                            return e.insert ? t.insert(e.insert, i) : t.push(e)
                          }, new l.default())),
                            (this.delta = r.compose(t))
                        } else
                          (this.delta = this.getDelta()),
                            (t && (0, y.default)(r.compose(t), this.delta)) ||
                              (t = r.diff(this.delta, n))
                        return t
                      },
                    },
                  ]),
                  t
                )
              })()
            function _(t, e) {
              return Object.keys(e).reduce(function (n, r) {
                return (
                  null == t[r] ||
                    (e[r] === t[r]
                      ? (n[r] = e[r])
                      : Array.isArray(e[r])
                      ? e[r].indexOf(t[r]) < 0 && (n[r] = e[r].concat([t[r]]))
                      : (n[r] = [e[r], t[r]])),
                  n
                )
              }, {})
            }
            e.default = m
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.default = e.Range = void 0)
            var r = function (t, e) {
                if (Array.isArray(t)) return t
                if (Symbol.iterator in Object(t))
                  return (function (t, e) {
                    var n = [],
                      r = !0,
                      o = !1,
                      i = void 0
                    try {
                      for (
                        var l, a = t[Symbol.iterator]();
                        !(r = (l = a.next()).done) &&
                        (n.push(l.value), !e || n.length !== e);
                        r = !0
                      );
                    } catch (u) {
                      ;(o = !0), (i = u)
                    } finally {
                      try {
                        !r && a.return && a.return()
                      } finally {
                        if (o) throw i
                      }
                    }
                    return n
                  })(t, e)
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance'
                )
              },
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = s(n(0)),
              l = s(n(30)),
              a = s(n(12)),
              u = s(n(9))
            function s(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function c(t) {
              if (Array.isArray(t)) {
                for (var e = 0, n = Array(t.length); e < t.length; e++)
                  n[e] = t[e]
                return n
              }
              return Array.from(t)
            }
            function f(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            var p = (0, s(n(11)).default)('quill:selection'),
              h = function t(e) {
                var n =
                  arguments.length > 1 && void 0 !== arguments[1]
                    ? arguments[1]
                    : 0
                f(this, t), (this.index = e), (this.length = n)
              },
              d = (function () {
                function t(e, n) {
                  var r = this
                  f(this, t),
                    (this.emitter = n),
                    (this.scroll = e),
                    (this.composing = !1),
                    (this.mouseDown = !1),
                    (this.root = this.scroll.domNode),
                    (this.cursor = i.default.create('cursor', this)),
                    (this.lastRange = this.savedRange = new h(0, 0)),
                    this.handleComposition(),
                    this.handleDragging(),
                    this.emitter.listenDOM(
                      'selectionchange',
                      document,
                      function () {
                        r.mouseDown ||
                          setTimeout(
                            r.update.bind(r, u.default.sources.USER),
                            1
                          )
                      }
                    ),
                    this.emitter.on(
                      u.default.events.EDITOR_CHANGE,
                      function (t, e) {
                        t === u.default.events.TEXT_CHANGE &&
                          e.length() > 0 &&
                          r.update(u.default.sources.SILENT)
                      }
                    ),
                    this.emitter.on(
                      u.default.events.SCROLL_BEFORE_UPDATE,
                      function () {
                        if (r.hasFocus()) {
                          var t = r.getNativeRange()
                          null != t &&
                            t.start.node !== r.cursor.textNode &&
                            r.emitter.once(
                              u.default.events.SCROLL_UPDATE,
                              function () {
                                try {
                                  r.setNativeRange(
                                    t.start.node,
                                    t.start.offset,
                                    t.end.node,
                                    t.end.offset
                                  )
                                } catch (e) {}
                              }
                            )
                        }
                      }
                    ),
                    this.emitter.on(
                      u.default.events.SCROLL_OPTIMIZE,
                      function (t, e) {
                        if (e.range) {
                          var n = e.range
                          r.setNativeRange(
                            n.startNode,
                            n.startOffset,
                            n.endNode,
                            n.endOffset
                          )
                        }
                      }
                    ),
                    this.update(u.default.sources.SILENT)
                }
                return (
                  o(t, [
                    {
                      key: 'handleComposition',
                      value: function () {
                        var t = this
                        this.root.addEventListener(
                          'compositionstart',
                          function () {
                            t.composing = !0
                          }
                        ),
                          this.root.addEventListener(
                            'compositionend',
                            function () {
                              if (((t.composing = !1), t.cursor.parent)) {
                                var e = t.cursor.restore()
                                if (!e) return
                                setTimeout(function () {
                                  t.setNativeRange(
                                    e.startNode,
                                    e.startOffset,
                                    e.endNode,
                                    e.endOffset
                                  )
                                }, 1)
                              }
                            }
                          )
                      },
                    },
                    {
                      key: 'handleDragging',
                      value: function () {
                        var t = this
                        this.emitter.listenDOM(
                          'mousedown',
                          document.body,
                          function () {
                            t.mouseDown = !0
                          }
                        ),
                          this.emitter.listenDOM(
                            'mouseup',
                            document.body,
                            function () {
                              ;(t.mouseDown = !1),
                                t.update(u.default.sources.USER)
                            }
                          )
                      },
                    },
                    {
                      key: 'focus',
                      value: function () {
                        this.hasFocus() ||
                          (this.root.focus(), this.setRange(this.savedRange))
                      },
                    },
                    {
                      key: 'format',
                      value: function (t, e) {
                        if (
                          null == this.scroll.whitelist ||
                          this.scroll.whitelist[t]
                        ) {
                          this.scroll.update()
                          var n = this.getNativeRange()
                          if (
                            null != n &&
                            n.native.collapsed &&
                            !i.default.query(t, i.default.Scope.BLOCK)
                          ) {
                            if (n.start.node !== this.cursor.textNode) {
                              var r = i.default.find(n.start.node, !1)
                              if (null == r) return
                              if (r instanceof i.default.Leaf) {
                                var o = r.split(n.start.offset)
                                r.parent.insertBefore(this.cursor, o)
                              } else r.insertBefore(this.cursor, n.start.node)
                              this.cursor.attach()
                            }
                            this.cursor.format(t, e),
                              this.scroll.optimize(),
                              this.setNativeRange(
                                this.cursor.textNode,
                                this.cursor.textNode.data.length
                              ),
                              this.update()
                          }
                        }
                      },
                    },
                    {
                      key: 'getBounds',
                      value: function (t) {
                        var e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : 0,
                          n = this.scroll.length()
                        ;(t = Math.min(t, n - 1)),
                          (e = Math.min(t + e, n - 1) - t)
                        var o = void 0,
                          i = this.scroll.leaf(t),
                          l = r(i, 2),
                          a = l[0],
                          u = l[1]
                        if (null == a) return null
                        var s = a.position(u, !0),
                          c = r(s, 2)
                        ;(o = c[0]), (u = c[1])
                        var f = document.createRange()
                        if (e > 0) {
                          f.setStart(o, u)
                          var p = this.scroll.leaf(t + e),
                            h = r(p, 2)
                          if (null == (a = h[0])) return null
                          var d = a.position((u = h[1]), !0),
                            y = r(d, 2)
                          return (
                            f.setEnd((o = y[0]), (u = y[1])),
                            f.getBoundingClientRect()
                          )
                        }
                        var v = 'left',
                          b = void 0
                        return (
                          o instanceof Text
                            ? (u < o.data.length
                                ? (f.setStart(o, u), f.setEnd(o, u + 1))
                                : (f.setStart(o, u - 1),
                                  f.setEnd(o, u),
                                  (v = 'right')),
                              (b = f.getBoundingClientRect()))
                            : ((b = a.domNode.getBoundingClientRect()),
                              u > 0 && (v = 'right')),
                          {
                            bottom: b.top + b.height,
                            height: b.height,
                            left: b[v],
                            right: b[v],
                            top: b.top,
                            width: 0,
                          }
                        )
                      },
                    },
                    {
                      key: 'getNativeRange',
                      value: function () {
                        var t = document.getSelection()
                        if (null == t || t.rangeCount <= 0) return null
                        var e = t.getRangeAt(0)
                        if (null == e) return null
                        var n = this.normalizeNative(e)
                        return p.info('getNativeRange', n), n
                      },
                    },
                    {
                      key: 'getRange',
                      value: function () {
                        var t = this.getNativeRange()
                        return null == t
                          ? [null, null]
                          : [this.normalizedToRange(t), t]
                      },
                    },
                    {
                      key: 'hasFocus',
                      value: function () {
                        return document.activeElement === this.root
                      },
                    },
                    {
                      key: 'normalizedToRange',
                      value: function (t) {
                        var e = this,
                          n = [[t.start.node, t.start.offset]]
                        t.native.collapsed || n.push([t.end.node, t.end.offset])
                        var o = n.map(function (t) {
                            var n = r(t, 2),
                              o = n[0],
                              l = n[1],
                              a = i.default.find(o, !0),
                              u = a.offset(e.scroll)
                            return 0 === l
                              ? u
                              : a instanceof i.default.Container
                              ? u + a.length()
                              : u + a.index(o, l)
                          }),
                          l = Math.min(
                            Math.max.apply(Math, c(o)),
                            this.scroll.length() - 1
                          ),
                          a = Math.min.apply(Math, [l].concat(c(o)))
                        return new h(a, l - a)
                      },
                    },
                    {
                      key: 'normalizeNative',
                      value: function (t) {
                        if (
                          !y(this.root, t.startContainer) ||
                          (!t.collapsed && !y(this.root, t.endContainer))
                        )
                          return null
                        var e = {
                          start: {
                            node: t.startContainer,
                            offset: t.startOffset,
                          },
                          end: { node: t.endContainer, offset: t.endOffset },
                          native: t,
                        }
                        return (
                          [e.start, e.end].forEach(function (t) {
                            for (
                              var e = t.node, n = t.offset;
                              !(e instanceof Text) && e.childNodes.length > 0;

                            )
                              if (e.childNodes.length > n)
                                (e = e.childNodes[n]), (n = 0)
                              else {
                                if (e.childNodes.length !== n) break
                                n =
                                  (e = e.lastChild) instanceof Text
                                    ? e.data.length
                                    : e.childNodes.length + 1
                              }
                            ;(t.node = e), (t.offset = n)
                          }),
                          e
                        )
                      },
                    },
                    {
                      key: 'rangeToNative',
                      value: function (t) {
                        var e = this,
                          n = t.collapsed
                            ? [t.index]
                            : [t.index, t.index + t.length],
                          o = [],
                          i = this.scroll.length()
                        return (
                          n.forEach(function (t, n) {
                            t = Math.min(i - 1, t)
                            var l = e.scroll.leaf(t),
                              a = r(l, 2),
                              u = a[1],
                              s = a[0].position(u, 0 !== n),
                              c = r(s, 2)
                            o.push(c[0], (u = c[1]))
                          }),
                          o.length < 2 && (o = o.concat(o)),
                          o
                        )
                      },
                    },
                    {
                      key: 'scrollIntoView',
                      value: function (t) {
                        var e = this.lastRange
                        if (null != e) {
                          var n = this.getBounds(e.index, e.length)
                          if (null != n) {
                            var o = this.scroll.length() - 1,
                              i = this.scroll.line(Math.min(e.index, o)),
                              l = r(i, 1)[0],
                              a = l
                            if (e.length > 0) {
                              var u = this.scroll.line(
                                Math.min(e.index + e.length, o)
                              )
                              a = r(u, 1)[0]
                            }
                            if (null != l && null != a) {
                              var s = t.getBoundingClientRect()
                              n.top < s.top
                                ? (t.scrollTop -= s.top - n.top)
                                : n.bottom > s.bottom &&
                                  (t.scrollTop += n.bottom - s.bottom)
                            }
                          }
                        }
                      },
                    },
                    {
                      key: 'setNativeRange',
                      value: function (t, e) {
                        var n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : t,
                          r =
                            arguments.length > 3 && void 0 !== arguments[3]
                              ? arguments[3]
                              : e,
                          o =
                            arguments.length > 4 &&
                            void 0 !== arguments[4] &&
                            arguments[4]
                        if (
                          (p.info('setNativeRange', t, e, n, r),
                          null == t ||
                            (null != this.root.parentNode &&
                              null != t.parentNode &&
                              null != n.parentNode))
                        ) {
                          var i = document.getSelection()
                          if (null != i)
                            if (null != t) {
                              this.hasFocus() || this.root.focus()
                              var l = (this.getNativeRange() || {}).native
                              if (
                                null == l ||
                                o ||
                                t !== l.startContainer ||
                                e !== l.startOffset ||
                                n !== l.endContainer ||
                                r !== l.endOffset
                              ) {
                                'BR' == t.tagName &&
                                  ((e = [].indexOf.call(
                                    t.parentNode.childNodes,
                                    t
                                  )),
                                  (t = t.parentNode)),
                                  'BR' == n.tagName &&
                                    ((r = [].indexOf.call(
                                      n.parentNode.childNodes,
                                      n
                                    )),
                                    (n = n.parentNode))
                                var a = document.createRange()
                                a.setStart(t, e),
                                  a.setEnd(n, r),
                                  i.removeAllRanges(),
                                  i.addRange(a)
                              }
                            } else
                              i.removeAllRanges(),
                                this.root.blur(),
                                document.body.focus()
                        }
                      },
                    },
                    {
                      key: 'setRange',
                      value: function (t) {
                        var e =
                            arguments.length > 1 &&
                            void 0 !== arguments[1] &&
                            arguments[1],
                          n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : u.default.sources.API
                        if (
                          ('string' == typeof e && ((n = e), (e = !1)),
                          p.info('setRange', t),
                          null != t)
                        ) {
                          var r = this.rangeToNative(t)
                          this.setNativeRange.apply(this, c(r).concat([e]))
                        } else this.setNativeRange(null)
                        this.update(n)
                      },
                    },
                    {
                      key: 'update',
                      value: function () {
                        var t =
                            arguments.length > 0 && void 0 !== arguments[0]
                              ? arguments[0]
                              : u.default.sources.USER,
                          e = this.lastRange,
                          n = this.getRange(),
                          o = r(n, 2),
                          i = o[0],
                          s = o[1]
                        if (
                          ((this.lastRange = i),
                          null != this.lastRange &&
                            (this.savedRange = this.lastRange),
                          !(0, a.default)(e, this.lastRange))
                        ) {
                          var c
                          !this.composing &&
                            null != s &&
                            s.native.collapsed &&
                            s.start.node !== this.cursor.textNode &&
                            this.cursor.restore()
                          var f,
                            p = [
                              u.default.events.SELECTION_CHANGE,
                              (0, l.default)(this.lastRange),
                              (0, l.default)(e),
                              t,
                            ]
                          ;(c = this.emitter).emit.apply(
                            c,
                            [u.default.events.EDITOR_CHANGE].concat(p)
                          ),
                            t !== u.default.sources.SILENT &&
                              (f = this.emitter).emit.apply(f, p)
                        }
                      },
                    },
                  ]),
                  t
                )
              })()
            function y(t, e) {
              return e instanceof Text && (e = e.parentNode), t.contains(e)
            }
            ;(e.Range = h), (e.default = d)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = n(0)
            function a(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function u(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var s = (function (t) {
              function e() {
                return (
                  a(this, e),
                  u(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                o(
                  e,
                  [
                    {
                      key: 'insertInto',
                      value: function (t, n) {
                        0 === t.children.length
                          ? i(
                              e.prototype.__proto__ ||
                                Object.getPrototypeOf(e.prototype),
                              'insertInto',
                              this
                            ).call(this, t, n)
                          : this.remove()
                      },
                    },
                    {
                      key: 'length',
                      value: function () {
                        return 0
                      },
                    },
                    {
                      key: 'value',
                      value: function () {
                        return ''
                      },
                    },
                  ],
                  [{ key: 'value', value: function () {} }]
                ),
                e
              )
            })(((r = l) && r.__esModule ? r : { default: r }).default.Embed)
            ;(s.blotName = 'break'), (s.tagName = 'BR'), (e.default = s)
          },
          function (t, e, n) {
            var r,
              o =
                (this && this.__extends) ||
                ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  }),
                function (t, e) {
                  function n() {
                    this.constructor = t
                  }
                  r(t, e),
                    (t.prototype =
                      null === e
                        ? Object.create(e)
                        : ((n.prototype = e.prototype), new n()))
                })
            Object.defineProperty(e, '__esModule', { value: !0 })
            var i = n(63),
              l = n(39),
              a = n(1),
              u = (function (t) {
                function e(e) {
                  var n = t.call(this, e) || this
                  return n.build(), n
                }
                return (
                  o(e, t),
                  (e.prototype.appendChild = function (t) {
                    this.insertBefore(t)
                  }),
                  (e.prototype.attach = function () {
                    t.prototype.attach.call(this),
                      this.children.forEach(function (t) {
                        t.attach()
                      })
                  }),
                  (e.prototype.build = function () {
                    var t = this
                    ;(this.children = new i.default()),
                      [].slice
                        .call(this.domNode.childNodes)
                        .reverse()
                        .forEach(function (e) {
                          try {
                            var n = s(e)
                            t.insertBefore(n, t.children.head || void 0)
                          } catch (r) {
                            if (r instanceof a.ParchmentError) return
                            throw r
                          }
                        })
                  }),
                  (e.prototype.deleteAt = function (t, e) {
                    if (0 === t && e === this.length()) return this.remove()
                    this.children.forEachAt(t, e, function (t, e, n) {
                      t.deleteAt(e, n)
                    })
                  }),
                  (e.prototype.descendant = function (t, n) {
                    var r = this.children.find(n),
                      o = r[0],
                      i = r[1]
                    return (null == t.blotName && t(o)) ||
                      (null != t.blotName && o instanceof t)
                      ? [o, i]
                      : o instanceof e
                      ? o.descendant(t, i)
                      : [null, -1]
                  }),
                  (e.prototype.descendants = function (t, n, r) {
                    void 0 === n && (n = 0),
                      void 0 === r && (r = Number.MAX_VALUE)
                    var o = [],
                      i = r
                    return (
                      this.children.forEachAt(n, r, function (n, r, l) {
                        ;((null == t.blotName && t(n)) ||
                          (null != t.blotName && n instanceof t)) &&
                          o.push(n),
                          n instanceof e &&
                            (o = o.concat(n.descendants(t, r, i))),
                          (i -= l)
                      }),
                      o
                    )
                  }),
                  (e.prototype.detach = function () {
                    this.children.forEach(function (t) {
                      t.detach()
                    }),
                      t.prototype.detach.call(this)
                  }),
                  (e.prototype.formatAt = function (t, e, n, r) {
                    this.children.forEachAt(t, e, function (t, e, o) {
                      t.formatAt(e, o, n, r)
                    })
                  }),
                  (e.prototype.insertAt = function (t, e, n) {
                    var r = this.children.find(t),
                      o = r[0]
                    if (o) o.insertAt(r[1], e, n)
                    else {
                      var i = null == n ? a.create('text', e) : a.create(e, n)
                      this.appendChild(i)
                    }
                  }),
                  (e.prototype.insertBefore = function (t, e) {
                    if (
                      null != this.statics.allowedChildren &&
                      !this.statics.allowedChildren.some(function (e) {
                        return t instanceof e
                      })
                    )
                      throw new a.ParchmentError(
                        'Cannot insert ' +
                          t.statics.blotName +
                          ' into ' +
                          this.statics.blotName
                      )
                    t.insertInto(this, e)
                  }),
                  (e.prototype.length = function () {
                    return this.children.reduce(function (t, e) {
                      return t + e.length()
                    }, 0)
                  }),
                  (e.prototype.moveChildren = function (t, e) {
                    this.children.forEach(function (n) {
                      t.insertBefore(n, e)
                    })
                  }),
                  (e.prototype.optimize = function (e) {
                    if (
                      (t.prototype.optimize.call(this, e),
                      0 === this.children.length)
                    )
                      if (null != this.statics.defaultChild) {
                        var n = a.create(this.statics.defaultChild)
                        this.appendChild(n), n.optimize(e)
                      } else this.remove()
                  }),
                  (e.prototype.path = function (t, n) {
                    void 0 === n && (n = !1)
                    var r = this.children.find(t, n),
                      o = r[0],
                      i = r[1],
                      l = [[this, t]]
                    return o instanceof e
                      ? l.concat(o.path(i, n))
                      : (null != o && l.push([o, i]), l)
                  }),
                  (e.prototype.removeChild = function (t) {
                    this.children.remove(t)
                  }),
                  (e.prototype.replace = function (n) {
                    n instanceof e && n.moveChildren(this),
                      t.prototype.replace.call(this, n)
                  }),
                  (e.prototype.split = function (t, e) {
                    if ((void 0 === e && (e = !1), !e)) {
                      if (0 === t) return this
                      if (t === this.length()) return this.next
                    }
                    var n = this.clone()
                    return (
                      this.parent.insertBefore(n, this.next),
                      this.children.forEachAt(
                        t,
                        this.length(),
                        function (t, r, o) {
                          ;(t = t.split(r, e)), n.appendChild(t)
                        }
                      ),
                      n
                    )
                  }),
                  (e.prototype.unwrap = function () {
                    this.moveChildren(this.parent, this.next), this.remove()
                  }),
                  (e.prototype.update = function (t, e) {
                    var n = this,
                      r = [],
                      o = []
                    t.forEach(function (t) {
                      t.target === n.domNode &&
                        'childList' === t.type &&
                        (r.push.apply(r, t.addedNodes),
                        o.push.apply(o, t.removedNodes))
                    }),
                      o.forEach(function (t) {
                        if (
                          !(
                            null != t.parentNode &&
                            'IFRAME' !== t.tagName &&
                            document.body.compareDocumentPosition(t) &
                              Node.DOCUMENT_POSITION_CONTAINED_BY
                          )
                        ) {
                          var e = a.find(t)
                          null != e &&
                            ((null != e.domNode.parentNode &&
                              e.domNode.parentNode !== n.domNode) ||
                              e.detach())
                        }
                      }),
                      r
                        .filter(function (t) {
                          return t.parentNode == n.domNode
                        })
                        .sort(function (t, e) {
                          return t === e
                            ? 0
                            : t.compareDocumentPosition(e) &
                              Node.DOCUMENT_POSITION_FOLLOWING
                            ? 1
                            : -1
                        })
                        .forEach(function (t) {
                          var e = null
                          null != t.nextSibling && (e = a.find(t.nextSibling))
                          var r = s(t)
                          ;(r.next == e && null != r.next) ||
                            (null != r.parent && r.parent.removeChild(n),
                            n.insertBefore(r, e || void 0))
                        })
                  }),
                  e
                )
              })(l.default)
            function s(t) {
              var e = a.find(t)
              if (null == e)
                try {
                  e = a.create(t)
                } catch (n) {
                  ;(e = a.create(a.Scope.INLINE)),
                    [].slice.call(t.childNodes).forEach(function (t) {
                      e.domNode.appendChild(t)
                    }),
                    t.parentNode && t.parentNode.replaceChild(e.domNode, t),
                    e.attach()
                }
              return e
            }
            e.default = u
          },
          function (t, e, n) {
            var r,
              o =
                (this && this.__extends) ||
                ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  }),
                function (t, e) {
                  function n() {
                    this.constructor = t
                  }
                  r(t, e),
                    (t.prototype =
                      null === e
                        ? Object.create(e)
                        : ((n.prototype = e.prototype), new n()))
                })
            Object.defineProperty(e, '__esModule', { value: !0 })
            var i = n(13),
              l = n(40),
              a = n(20),
              u = n(1),
              s = (function (t) {
                function e(e) {
                  var n = t.call(this, e) || this
                  return (n.attributes = new l.default(n.domNode)), n
                }
                return (
                  o(e, t),
                  (e.formats = function (t) {
                    return (
                      'string' == typeof this.tagName ||
                      (Array.isArray(this.tagName)
                        ? t.tagName.toLowerCase()
                        : void 0)
                    )
                  }),
                  (e.prototype.format = function (t, e) {
                    var n = u.query(t)
                    n instanceof i.default
                      ? this.attributes.attribute(n, e)
                      : e &&
                        (null == n ||
                          (t === this.statics.blotName &&
                            this.formats()[t] === e) ||
                          this.replaceWith(t, e))
                  }),
                  (e.prototype.formats = function () {
                    var t = this.attributes.values(),
                      e = this.statics.formats(this.domNode)
                    return null != e && (t[this.statics.blotName] = e), t
                  }),
                  (e.prototype.replaceWith = function (e, n) {
                    var r = t.prototype.replaceWith.call(this, e, n)
                    return this.attributes.copy(r), r
                  }),
                  (e.prototype.update = function (e, n) {
                    var r = this
                    t.prototype.update.call(this, e, n),
                      e.some(function (t) {
                        return t.target === r.domNode && 'attributes' === t.type
                      }) && this.attributes.build()
                  }),
                  (e.prototype.wrap = function (n, r) {
                    var o = t.prototype.wrap.call(this, n, r)
                    return (
                      o instanceof e &&
                        o.statics.scope === this.statics.scope &&
                        this.attributes.move(o),
                      o
                    )
                  }),
                  e
                )
              })(a.default)
            e.default = s
          },
          function (t, e, n) {
            var r,
              o =
                (this && this.__extends) ||
                ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  }),
                function (t, e) {
                  function n() {
                    this.constructor = t
                  }
                  r(t, e),
                    (t.prototype =
                      null === e
                        ? Object.create(e)
                        : ((n.prototype = e.prototype), new n()))
                })
            Object.defineProperty(e, '__esModule', { value: !0 })
            var i = n(39),
              l = n(1),
              a = (function (t) {
                function e() {
                  return (null !== t && t.apply(this, arguments)) || this
                }
                return (
                  o(e, t),
                  (e.value = function (t) {
                    return !0
                  }),
                  (e.prototype.index = function (t, e) {
                    return this.domNode === t ||
                      this.domNode.compareDocumentPosition(t) &
                        Node.DOCUMENT_POSITION_CONTAINED_BY
                      ? Math.min(e, 1)
                      : -1
                  }),
                  (e.prototype.position = function (t, e) {
                    var n = [].indexOf.call(
                      this.parent.domNode.childNodes,
                      this.domNode
                    )
                    return t > 0 && (n += 1), [this.parent.domNode, n]
                  }),
                  (e.prototype.value = function () {
                    var t
                    return (
                      ((t = {})[this.statics.blotName] =
                        this.statics.value(this.domNode) || !0),
                      t
                    )
                  }),
                  (e.scope = l.Scope.INLINE_BLOT),
                  e
                )
              })(i.default)
            e.default = a
          },
          function (t, e, n) {
            var r = n(45)
            t.exports = function () {
              return r() && !!Symbol.toStringTag
            }
          },
          function (t, e, n) {
            var r = n(80)
            t.exports = Function.prototype.bind || r
          },
          function (t, e, n) {
            var r = n(24),
              o = n(14),
              i = n(82),
              l = n(7),
              a = o('%Function.prototype.apply%'),
              u = o('%Function.prototype.call%'),
              s = o('%Reflect.apply%', !0) || r.call(u, a),
              c = n(27),
              f = o('%Math.max%')
            t.exports = function (t) {
              if ('function' != typeof t) throw new l('a function is required')
              var e = s(r, u, arguments)
              return i(e, 1 + f(0, t.length - (arguments.length - 1)), !0)
            }
            var p = function () {
              return s(r, a, arguments)
            }
            c ? c(t.exports, 'apply', { value: p }) : (t.exports.apply = p)
          },
          function (t, e, n) {
            var r = n(27),
              o = n(47),
              i = n(7),
              l = n(48)
            t.exports = function (t, e, n) {
              if (!t || ('object' != typeof t && 'function' != typeof t))
                throw new i('`obj` must be an object or a function`')
              if ('string' != typeof e && 'symbol' != typeof e)
                throw new i('`property` must be a string or a symbol`')
              if (
                arguments.length > 3 &&
                'boolean' != typeof arguments[3] &&
                null !== arguments[3]
              )
                throw new i(
                  '`nonEnumerable`, if provided, must be a boolean or null'
                )
              if (
                arguments.length > 4 &&
                'boolean' != typeof arguments[4] &&
                null !== arguments[4]
              )
                throw new i(
                  '`nonWritable`, if provided, must be a boolean or null'
                )
              if (
                arguments.length > 5 &&
                'boolean' != typeof arguments[5] &&
                null !== arguments[5]
              )
                throw new i(
                  '`nonConfigurable`, if provided, must be a boolean or null'
                )
              if (arguments.length > 6 && 'boolean' != typeof arguments[6])
                throw new i('`loose`, if provided, must be a boolean')
              var a = arguments.length > 3 ? arguments[3] : null,
                u = arguments.length > 4 ? arguments[4] : null,
                s = arguments.length > 5 ? arguments[5] : null,
                c = arguments.length > 6 && arguments[6],
                f = !!l && l(t, e)
              if (r)
                r(t, e, {
                  configurable: null === s && f ? f.configurable : !s,
                  enumerable: null === a && f ? f.enumerable : !a,
                  value: n,
                  writable: null === u && f ? f.writable : !u,
                })
              else {
                if (!c && (a || u || s))
                  throw new o(
                    'This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.'
                  )
                t[e] = n
              }
            }
          },
          function (t, e, n) {
            var r = n(14)('%Object.defineProperty%', !0) || !1
            if (r)
              try {
                r({}, 'a', { value: 1 })
              } catch (o) {
                r = !1
              }
            t.exports = r
          },
          function (t, e, n) {
            var r = n(27),
              o = function () {
                return !!r
              }
            ;(o.hasArrayLengthDefineBug = function () {
              if (!r) return null
              try {
                return 1 !== r([], 'length', { value: 1 }).length
              } catch (t) {
                return !0
              }
            }),
              (t.exports = o)
          },
          function (t, e, n) {
            var r = n(12),
              o = n(3),
              i = {
                attributes: {
                  compose: function (t, e, n) {
                    'object' != typeof t && (t = {}),
                      'object' != typeof e && (e = {})
                    var r = o(!0, {}, e)
                    for (var i in (n ||
                      (r = Object.keys(r).reduce(function (t, e) {
                        return null != r[e] && (t[e] = r[e]), t
                      }, {})),
                    t))
                      void 0 !== t[i] && void 0 === e[i] && (r[i] = t[i])
                    return Object.keys(r).length > 0 ? r : void 0
                  },
                  diff: function (t, e) {
                    'object' != typeof t && (t = {}),
                      'object' != typeof e && (e = {})
                    var n = Object.keys(t)
                      .concat(Object.keys(e))
                      .reduce(function (n, o) {
                        return (
                          r(t[o], e[o]) ||
                            (n[o] = void 0 === e[o] ? null : e[o]),
                          n
                        )
                      }, {})
                    return Object.keys(n).length > 0 ? n : void 0
                  },
                  transform: function (t, e, n) {
                    if ('object' != typeof t) return e
                    if ('object' == typeof e) {
                      if (!n) return e
                      var r = Object.keys(e).reduce(function (n, r) {
                        return void 0 === t[r] && (n[r] = e[r]), n
                      }, {})
                      return Object.keys(r).length > 0 ? r : void 0
                    }
                  },
                },
                iterator: function (t) {
                  return new l(t)
                },
                length: function (t) {
                  return 'number' == typeof t.delete
                    ? t.delete
                    : 'number' == typeof t.retain
                    ? t.retain
                    : 'string' == typeof t.insert
                    ? t.insert.length
                    : 1
                },
              }
            function l(t) {
              ;(this.ops = t), (this.index = 0), (this.offset = 0)
            }
            ;(l.prototype.hasNext = function () {
              return this.peekLength() < 1 / 0
            }),
              (l.prototype.next = function (t) {
                t || (t = 1 / 0)
                var e = this.ops[this.index]
                if (e) {
                  var n = this.offset,
                    r = i.length(e)
                  if (
                    (t >= r - n
                      ? ((t = r - n), (this.index += 1), (this.offset = 0))
                      : (this.offset += t),
                    'number' == typeof e.delete)
                  )
                    return { delete: t }
                  var o = {}
                  return (
                    e.attributes && (o.attributes = e.attributes),
                    'number' == typeof e.retain
                      ? (o.retain = t)
                      : (o.insert =
                          'string' == typeof e.insert
                            ? e.insert.substr(n, t)
                            : e.insert),
                    o
                  )
                }
                return { retain: 1 / 0 }
              }),
              (l.prototype.peek = function () {
                return this.ops[this.index]
              }),
              (l.prototype.peekLength = function () {
                return this.ops[this.index]
                  ? i.length(this.ops[this.index]) - this.offset
                  : 1 / 0
              }),
              (l.prototype.peekType = function () {
                return this.ops[this.index]
                  ? 'number' == typeof this.ops[this.index].delete
                    ? 'delete'
                    : 'number' == typeof this.ops[this.index].retain
                    ? 'retain'
                    : 'insert'
                  : 'retain'
              }),
              (l.prototype.rest = function () {
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
              (t.exports = i)
          },
          function (t, e) {
            var n = (function () {
              function t(t, e) {
                return null != e && t instanceof e
              }
              var e, n, r
              try {
                e = Map
              } catch (a) {
                e = function () {}
              }
              try {
                n = Set
              } catch (a) {
                n = function () {}
              }
              try {
                r = Promise
              } catch (a) {
                r = function () {}
              }
              function o(i, a, u, s, c) {
                'object' == typeof a &&
                  ((u = a.depth),
                  (s = a.prototype),
                  (c = a.includeNonEnumerable),
                  (a = a.circular))
                var f = [],
                  p = []
                return (
                  void 0 === a && (a = !0),
                  void 0 === u && (u = 1 / 0),
                  (function i(u, h) {
                    if (null === u) return null
                    if (0 === h) return u
                    var d, y
                    if ('object' != typeof u) return u
                    if (t(u, e)) d = new e()
                    else if (t(u, n)) d = new n()
                    else if (t(u, r))
                      d = new r(function (t, e) {
                        u.then(
                          function (e) {
                            t(i(e, h - 1))
                          },
                          function (t) {
                            e(i(t, h - 1))
                          }
                        )
                      })
                    else if (o.__isArray(u)) d = []
                    else if (o.__isRegExp(u))
                      (d = new RegExp(u.source, l(u))),
                        u.lastIndex && (d.lastIndex = u.lastIndex)
                    else if (o.__isDate(u)) d = new Date(u.getTime())
                    else {
                      if (J(u))
                        return (
                          (d = v.allocUnsafe
                            ? v.allocUnsafe(u.length)
                            : new v(u.length)),
                          u.copy(d),
                          d
                        )
                      t(u, Error)
                        ? (d = Object.create(u))
                        : void 0 === s
                        ? ((y = Object.getPrototypeOf(u)),
                          (d = Object.create(y)))
                        : ((d = Object.create(s)), (y = s))
                    }
                    if (a) {
                      var b = f.indexOf(u)
                      if (-1 != b) return p[b]
                      f.push(u), p.push(d)
                    }
                    for (var g in (t(u, e) &&
                      u.forEach(function (t, e) {
                        var n = i(e, h - 1),
                          r = i(t, h - 1)
                        d.set(n, r)
                      }),
                    t(u, n) &&
                      u.forEach(function (t) {
                        var e = i(t, h - 1)
                        d.add(e)
                      }),
                    u)) {
                      var m
                      y && (m = Object.getOwnPropertyDescriptor(y, g)),
                        (m && null == m.set) || (d[g] = i(u[g], h - 1))
                    }
                    if (Object.getOwnPropertySymbols) {
                      var _ = Object.getOwnPropertySymbols(u)
                      for (g = 0; g < _.length; g++) {
                        var O = _[g]
                        ;(!(x = Object.getOwnPropertyDescriptor(u, O)) ||
                          x.enumerable ||
                          c) &&
                          ((d[O] = i(u[O], h - 1)),
                          x.enumerable ||
                            Object.defineProperty(d, O, { enumerable: !1 }))
                      }
                    }
                    if (c) {
                      var w = Object.getOwnPropertyNames(u)
                      for (g = 0; g < w.length; g++) {
                        var x,
                          E = w[g]
                        ;((x = Object.getOwnPropertyDescriptor(u, E)) &&
                          x.enumerable) ||
                          ((d[E] = i(u[E], h - 1)),
                          Object.defineProperty(d, E, { enumerable: !1 }))
                      }
                    }
                    return d
                  })(i, u)
                )
              }
              function i(t) {
                return Object.prototype.toString.call(t)
              }
              function l(t) {
                var e = ''
                return (
                  t.global && (e += 'g'),
                  t.ignoreCase && (e += 'i'),
                  t.multiline && (e += 'm'),
                  e
                )
              }
              return (
                (o.clonePrototype = function (t) {
                  if (null === t) return null
                  var e = function () {}
                  return (e.prototype = t), new e()
                }),
                (o.__objToStr = i),
                (o.__isDate = function (t) {
                  return 'object' == typeof t && '[object Date]' === i(t)
                }),
                (o.__isArray = function (t) {
                  return 'object' == typeof t && '[object Array]' === i(t)
                }),
                (o.__isRegExp = function (t) {
                  return 'object' == typeof t && '[object RegExp]' === i(t)
                }),
                (o.__getRegExpFlags = l),
                o
              )
            })()
            'object' == typeof t && t.exports && (t.exports = n)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = function (t, e) {
                if (Array.isArray(t)) return t
                if (Symbol.iterator in Object(t))
                  return (function (t, e) {
                    var n = [],
                      r = !0,
                      o = !1,
                      i = void 0
                    try {
                      for (
                        var l, a = t[Symbol.iterator]();
                        !(r = (l = a.next()).done) &&
                        (n.push(l.value), !e || n.length !== e);
                        r = !0
                      );
                    } catch (u) {
                      ;(o = !0), (i = u)
                    } finally {
                      try {
                        !r && a.return && a.return()
                      } finally {
                        if (o) throw i
                      }
                    }
                    return n
                  })(t, e)
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance'
                )
              },
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = h(n(0)),
              a = h(n(9)),
              u = n(4),
              s = h(u),
              c = h(n(19)),
              f = h(n(16)),
              p = h(n(34))
            function h(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function d(t) {
              return t instanceof s.default || t instanceof u.BlockEmbed
            }
            var y = (function (t) {
              function e(t, n) {
                !(function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError('Cannot call a class as a function')
                })(this, e)
                var r = (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ('object' != typeof e && 'function' != typeof e)
                    ? t
                    : e
                })(
                  this,
                  (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)
                )
                return (
                  (r.emitter = n.emitter),
                  Array.isArray(n.whitelist) &&
                    (r.whitelist = n.whitelist.reduce(function (t, e) {
                      return (t[e] = !0), t
                    }, {})),
                  r.domNode.addEventListener('DOMNodeInserted', function () {}),
                  r.optimize(),
                  r.enable(),
                  r
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                o(e, [
                  {
                    key: 'batchStart',
                    value: function () {
                      this.batch = !0
                    },
                  },
                  {
                    key: 'batchEnd',
                    value: function () {
                      ;(this.batch = !1), this.optimize()
                    },
                  },
                  {
                    key: 'deleteAt',
                    value: function (t, n) {
                      var o = this.line(t),
                        l = r(o, 2),
                        a = l[0],
                        s = l[1],
                        p = this.line(t + n),
                        h = r(p, 1)[0]
                      if (
                        (i(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'deleteAt',
                          this
                        ).call(this, t, n),
                        null != h && a !== h && s > 0)
                      ) {
                        if (
                          a instanceof u.BlockEmbed ||
                          h instanceof u.BlockEmbed
                        )
                          return void this.optimize()
                        if (a instanceof f.default) {
                          var d = a.newlineIndex(a.length(), !0)
                          if (d > -1 && (a = a.split(d + 1)) === h)
                            return void this.optimize()
                        } else if (h instanceof f.default) {
                          var y = h.newlineIndex(0)
                          y > -1 && h.split(y + 1)
                        }
                        a.moveChildren(
                          h,
                          h.children.head instanceof c.default
                            ? null
                            : h.children.head
                        ),
                          a.remove()
                      }
                      this.optimize()
                    },
                  },
                  {
                    key: 'enable',
                    value: function () {
                      var t =
                        !(arguments.length > 0 && void 0 !== arguments[0]) ||
                        arguments[0]
                      this.domNode.setAttribute('contenteditable', t)
                    },
                  },
                  {
                    key: 'formatAt',
                    value: function (t, n, r, o) {
                      ;(null == this.whitelist || this.whitelist[r]) &&
                        (i(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'formatAt',
                          this
                        ).call(this, t, n, r, o),
                        this.optimize())
                    },
                  },
                  {
                    key: 'insertAt',
                    value: function (t, n, r) {
                      if (
                        null == r ||
                        null == this.whitelist ||
                        this.whitelist[n]
                      ) {
                        if (t >= this.length())
                          if (
                            null == r ||
                            null == l.default.query(n, l.default.Scope.BLOCK)
                          ) {
                            var o = l.default.create(this.statics.defaultChild)
                            this.appendChild(o),
                              null == r &&
                                n.endsWith('\n') &&
                                (n = n.slice(0, -1)),
                              o.insertAt(0, n, r)
                          } else {
                            var a = l.default.create(n, r)
                            this.appendChild(a)
                          }
                        else
                          i(
                            e.prototype.__proto__ ||
                              Object.getPrototypeOf(e.prototype),
                            'insertAt',
                            this
                          ).call(this, t, n, r)
                        this.optimize()
                      }
                    },
                  },
                  {
                    key: 'insertBefore',
                    value: function (t, n) {
                      if (t.statics.scope === l.default.Scope.INLINE_BLOT) {
                        var r = l.default.create(this.statics.defaultChild)
                        r.appendChild(t), (t = r)
                      }
                      i(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'insertBefore',
                        this
                      ).call(this, t, n)
                    },
                  },
                  {
                    key: 'leaf',
                    value: function (t) {
                      return this.path(t).pop() || [null, -1]
                    },
                  },
                  {
                    key: 'line',
                    value: function (t) {
                      return t === this.length()
                        ? this.line(t - 1)
                        : this.descendant(d, t)
                    },
                  },
                  {
                    key: 'lines',
                    value: function () {
                      var t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : 0,
                        e =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : Number.MAX_VALUE,
                        n = function t(e, n, r) {
                          var o = [],
                            i = r
                          return (
                            e.children.forEachAt(n, r, function (e, n, r) {
                              d(e)
                                ? o.push(e)
                                : e instanceof l.default.Container &&
                                  (o = o.concat(t(e, n, i))),
                                (i -= r)
                            }),
                            o
                          )
                        }
                      return n(this, t, e)
                    },
                  },
                  {
                    key: 'optimize',
                    value: function () {
                      var t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : [],
                        n =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : {}
                      !0 !== this.batch &&
                        (i(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'optimize',
                          this
                        ).call(this, t, n),
                        t.length > 0 &&
                          this.emitter.emit(
                            a.default.events.SCROLL_OPTIMIZE,
                            t,
                            n
                          ))
                    },
                  },
                  {
                    key: 'path',
                    value: function (t) {
                      return i(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'path',
                        this
                      )
                        .call(this, t)
                        .slice(1)
                    },
                  },
                  {
                    key: 'update',
                    value: function (t) {
                      if (!0 !== this.batch) {
                        var n = a.default.sources.USER
                        'string' == typeof t && (n = t),
                          Array.isArray(t) || (t = this.observer.takeRecords()),
                          t.length > 0 &&
                            this.emitter.emit(
                              a.default.events.SCROLL_BEFORE_UPDATE,
                              n,
                              t
                            ),
                          i(
                            e.prototype.__proto__ ||
                              Object.getPrototypeOf(e.prototype),
                            'update',
                            this
                          ).call(this, t.concat([])),
                          t.length > 0 &&
                            this.emitter.emit(
                              a.default.events.SCROLL_UPDATE,
                              n,
                              t
                            )
                      }
                    },
                  },
                ]),
                e
              )
            })(l.default.Scroll)
            ;(y.blotName = 'scroll'),
              (y.className = 'ql-editor'),
              (y.tagName = 'DIV'),
              (y.defaultChild = 'block'),
              (y.allowedChildren = [s.default, u.BlockEmbed, p.default]),
              (e.default = y)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.SHORTKEY = e.default = void 0)
            var r =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                  ? function (t) {
                      return typeof t
                    }
                  : function (t) {
                      return t &&
                        'function' == typeof Symbol &&
                        t.constructor === Symbol &&
                        t !== Symbol.prototype
                        ? 'symbol'
                        : typeof t
                    },
              o = function (t, e) {
                if (Array.isArray(t)) return t
                if (Symbol.iterator in Object(t))
                  return (function (t, e) {
                    var n = [],
                      r = !0,
                      o = !1,
                      i = void 0
                    try {
                      for (
                        var l, a = t[Symbol.iterator]();
                        !(r = (l = a.next()).done) &&
                        (n.push(l.value), !e || n.length !== e);
                        r = !0
                      );
                    } catch (u) {
                      ;(o = !0), (i = u)
                    } finally {
                      try {
                        !r && a.return && a.return()
                      } finally {
                        if (o) throw i
                      }
                    }
                    return n
                  })(t, e)
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance'
                )
              },
              i = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              l = y(n(30)),
              a = y(n(12)),
              u = y(n(3)),
              s = y(n(2)),
              c = y(n(29)),
              f = y(n(0)),
              p = y(n(5)),
              h = y(n(11)),
              d = y(n(10))
            function y(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function v(t, e, n) {
              return (
                e in t
                  ? Object.defineProperty(t, e, {
                      value: n,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (t[e] = n),
                t
              )
            }
            var b = (0, h.default)('quill:keyboard'),
              g = /Mac/i.test(navigator.platform) ? 'metaKey' : 'ctrlKey',
              m = (function (t) {
                function e(t, n) {
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, e)
                  var r = (function (t, e) {
                    if (!t)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e ||
                      ('object' != typeof e && 'function' != typeof e)
                      ? t
                      : e
                  })(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
                  )
                  return (
                    (r.bindings = {}),
                    Object.keys(r.options.bindings).forEach(function (e) {
                      ;('list autofill' !== e ||
                        null == t.scroll.whitelist ||
                        t.scroll.whitelist.list) &&
                        r.options.bindings[e] &&
                        r.addBinding(r.options.bindings[e])
                    }),
                    r.addBinding({ key: e.keys.ENTER, shiftKey: null }, E),
                    r.addBinding(
                      {
                        key: e.keys.ENTER,
                        metaKey: null,
                        ctrlKey: null,
                        altKey: null,
                      },
                      function () {}
                    ),
                    /Firefox/i.test(navigator.userAgent)
                      ? (r.addBinding(
                          { key: e.keys.BACKSPACE },
                          { collapsed: !0 },
                          O
                        ),
                        r.addBinding(
                          { key: e.keys.DELETE },
                          { collapsed: !0 },
                          w
                        ))
                      : (r.addBinding(
                          { key: e.keys.BACKSPACE },
                          { collapsed: !0, prefix: /^.?$/ },
                          O
                        ),
                        r.addBinding(
                          { key: e.keys.DELETE },
                          { collapsed: !0, suffix: /^.?$/ },
                          w
                        )),
                    r.addBinding(
                      { key: e.keys.BACKSPACE },
                      { collapsed: !1 },
                      x
                    ),
                    r.addBinding({ key: e.keys.DELETE }, { collapsed: !1 }, x),
                    r.addBinding(
                      {
                        key: e.keys.BACKSPACE,
                        altKey: null,
                        ctrlKey: null,
                        metaKey: null,
                        shiftKey: null,
                      },
                      { collapsed: !0, offset: 0 },
                      O
                    ),
                    r.listen(),
                    r
                  )
                }
                return (
                  (function (t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  })(e, t),
                  i(e, null, [
                    {
                      key: 'match',
                      value: function (t, e) {
                        return (
                          (e = j(e)),
                          !['altKey', 'ctrlKey', 'metaKey', 'shiftKey'].some(
                            function (n) {
                              return !!e[n] !== t[n] && null !== e[n]
                            }
                          ) && e.key === (t.which || t.keyCode)
                        )
                      },
                    },
                  ]),
                  i(e, [
                    {
                      key: 'addBinding',
                      value: function (t) {
                        var e =
                            arguments.length > 1 && void 0 !== arguments[1]
                              ? arguments[1]
                              : {},
                          n =
                            arguments.length > 2 && void 0 !== arguments[2]
                              ? arguments[2]
                              : {},
                          r = j(t)
                        if (null == r || null == r.key)
                          return b.warn(
                            'Attempted to add invalid keyboard binding',
                            r
                          )
                        'function' == typeof e && (e = { handler: e }),
                          'function' == typeof n && (n = { handler: n }),
                          (r = (0, u.default)(r, e, n)),
                          (this.bindings[r.key] = this.bindings[r.key] || []),
                          this.bindings[r.key].push(r)
                      },
                    },
                    {
                      key: 'listen',
                      value: function () {
                        var t = this
                        this.quill.root.addEventListener(
                          'keydown',
                          function (n) {
                            if (!n.defaultPrevented) {
                              var i = (
                                t.bindings[n.which || n.keyCode] || []
                              ).filter(function (t) {
                                return e.match(n, t)
                              })
                              if (0 !== i.length) {
                                var l = t.quill.getSelection()
                                if (null != l && t.quill.hasFocus()) {
                                  var u = t.quill.getLine(l.index),
                                    s = o(u, 2),
                                    c = s[0],
                                    p = s[1],
                                    h = t.quill.getLeaf(l.index),
                                    d = o(h, 2),
                                    y = d[0],
                                    v = d[1],
                                    b =
                                      0 === l.length
                                        ? [y, v]
                                        : t.quill.getLeaf(l.index + l.length),
                                    g = o(b, 2),
                                    m = g[0],
                                    _ = g[1],
                                    O =
                                      y instanceof f.default.Text
                                        ? y.value().slice(0, v)
                                        : '',
                                    w =
                                      m instanceof f.default.Text
                                        ? m.value().slice(_)
                                        : '',
                                    x = {
                                      collapsed: 0 === l.length,
                                      empty: 0 === l.length && c.length() <= 1,
                                      format: t.quill.getFormat(l),
                                      offset: p,
                                      prefix: O,
                                      suffix: w,
                                    }
                                  i.some(function (e) {
                                    if (
                                      null != e.collapsed &&
                                      e.collapsed !== x.collapsed
                                    )
                                      return !1
                                    if (null != e.empty && e.empty !== x.empty)
                                      return !1
                                    if (
                                      null != e.offset &&
                                      e.offset !== x.offset
                                    )
                                      return !1
                                    if (Array.isArray(e.format)) {
                                      if (
                                        e.format.every(function (t) {
                                          return null == x.format[t]
                                        })
                                      )
                                        return !1
                                    } else if (
                                      'object' === r(e.format) &&
                                      !Object.keys(e.format).every(function (
                                        t
                                      ) {
                                        return !0 === e.format[t]
                                          ? null != x.format[t]
                                          : !1 === e.format[t]
                                          ? null == x.format[t]
                                          : (0, a.default)(
                                              e.format[t],
                                              x.format[t]
                                            )
                                      })
                                    )
                                      return !1
                                    return !(
                                      (null != e.prefix &&
                                        !e.prefix.test(x.prefix)) ||
                                      (null != e.suffix &&
                                        !e.suffix.test(x.suffix)) ||
                                      !0 === e.handler.call(t, l, x)
                                    )
                                  }) && n.preventDefault()
                                }
                              }
                            }
                          }
                        )
                      },
                    },
                  ]),
                  e
                )
              })(d.default)
            function _(t, e) {
              var n
              return (
                v(
                  (n = { key: t, shiftKey: e, altKey: null }),
                  t === m.keys.LEFT ? 'prefix' : 'suffix',
                  /^$/
                ),
                v(n, 'handler', function (n) {
                  var r = n.index
                  t === m.keys.RIGHT && (r += n.length + 1)
                  var i = this.quill.getLeaf(r)
                  return !(
                    o(i, 1)[0] instanceof f.default.Embed &&
                    (t === m.keys.LEFT
                      ? e
                        ? this.quill.setSelection(
                            n.index - 1,
                            n.length + 1,
                            p.default.sources.USER
                          )
                        : this.quill.setSelection(
                            n.index - 1,
                            p.default.sources.USER
                          )
                      : e
                      ? this.quill.setSelection(
                          n.index,
                          n.length + 1,
                          p.default.sources.USER
                        )
                      : this.quill.setSelection(
                          n.index + n.length + 1,
                          p.default.sources.USER
                        ),
                    1)
                  )
                }),
                n
              )
            }
            function O(t, e) {
              if (!(0 === t.index || this.quill.getLength() <= 1)) {
                var n = this.quill.getLine(t.index),
                  r = o(n, 1)[0],
                  i = {}
                if (0 === e.offset) {
                  var l = this.quill.getLine(t.index - 1),
                    a = o(l, 1)[0]
                  if (null != a && a.length() > 1) {
                    var u = r.formats(),
                      s = this.quill.getFormat(t.index - 1, 1)
                    i = c.default.attributes.diff(u, s) || {}
                  }
                }
                var f = /[\uD800-\uDBFF][\uDC00-\uDFFF]$/.test(e.prefix) ? 2 : 1
                this.quill.deleteText(t.index - f, f, p.default.sources.USER),
                  Object.keys(i).length > 0 &&
                    this.quill.formatLine(
                      t.index - f,
                      f,
                      i,
                      p.default.sources.USER
                    ),
                  this.quill.focus()
              }
            }
            function w(t, e) {
              var n = /^[\uD800-\uDBFF][\uDC00-\uDFFF]/.test(e.suffix) ? 2 : 1
              if (!(t.index >= this.quill.getLength() - n)) {
                var r = {},
                  i = 0,
                  l = this.quill.getLine(t.index),
                  a = o(l, 1)[0]
                if (e.offset >= a.length() - 1) {
                  var u = this.quill.getLine(t.index + 1),
                    s = o(u, 1)[0]
                  if (s) {
                    var f = a.formats(),
                      h = this.quill.getFormat(t.index, 1)
                    ;(r = c.default.attributes.diff(f, h) || {}),
                      (i = s.length())
                  }
                }
                this.quill.deleteText(t.index, n, p.default.sources.USER),
                  Object.keys(r).length > 0 &&
                    this.quill.formatLine(
                      t.index + i - 1,
                      n,
                      r,
                      p.default.sources.USER
                    )
              }
            }
            function x(t) {
              var e = this.quill.getLines(t),
                n = {}
              if (e.length > 1) {
                var r = e[0].formats(),
                  o = e[e.length - 1].formats()
                n = c.default.attributes.diff(o, r) || {}
              }
              this.quill.deleteText(t, p.default.sources.USER),
                Object.keys(n).length > 0 &&
                  this.quill.formatLine(t.index, 1, n, p.default.sources.USER),
                this.quill.setSelection(t.index, p.default.sources.SILENT),
                this.quill.focus()
            }
            function E(t, e) {
              var n = this
              t.length > 0 && this.quill.scroll.deleteAt(t.index, t.length)
              var r = Object.keys(e.format).reduce(function (t, n) {
                return (
                  f.default.query(n, f.default.Scope.BLOCK) &&
                    !Array.isArray(e.format[n]) &&
                    (t[n] = e.format[n]),
                  t
                )
              }, {})
              this.quill.insertText(t.index, '\n', r, p.default.sources.USER),
                this.quill.setSelection(t.index + 1, p.default.sources.SILENT),
                this.quill.focus(),
                Object.keys(e.format).forEach(function (t) {
                  null == r[t] &&
                    (Array.isArray(e.format[t]) ||
                      ('link' !== t &&
                        n.quill.format(t, e.format[t], p.default.sources.USER)))
                })
            }
            function A(t) {
              return {
                key: m.keys.TAB,
                shiftKey: !t,
                format: { 'code-block': !0 },
                handler: function (e) {
                  var n = f.default.query('code-block'),
                    r = e.index,
                    i = e.length,
                    l = this.quill.scroll.descendant(n, r),
                    a = o(l, 2),
                    u = a[0],
                    s = a[1]
                  if (null != u) {
                    var c = this.quill.getIndex(u),
                      h = u.newlineIndex(s, !0) + 1,
                      d = u.newlineIndex(c + s + i),
                      y = u.domNode.textContent.slice(h, d).split('\n')
                    ;(s = 0),
                      y.forEach(function (e, o) {
                        t
                          ? (u.insertAt(h + s, n.TAB),
                            (s += n.TAB.length),
                            0 === o ? (r += n.TAB.length) : (i += n.TAB.length))
                          : e.startsWith(n.TAB) &&
                            (u.deleteAt(h + s, n.TAB.length),
                            (s -= n.TAB.length),
                            0 === o
                              ? (r -= n.TAB.length)
                              : (i -= n.TAB.length)),
                          (s += e.length + 1)
                      }),
                      this.quill.update(p.default.sources.USER),
                      this.quill.setSelection(r, i, p.default.sources.SILENT)
                  }
                },
              }
            }
            function k(t) {
              return {
                key: t[0].toUpperCase(),
                shortKey: !0,
                handler: function (e, n) {
                  this.quill.format(t, !n.format[t], p.default.sources.USER)
                },
              }
            }
            function j(t) {
              if ('string' == typeof t || 'number' == typeof t)
                return j({ key: t })
              if (
                ('object' === (void 0 === t ? 'undefined' : r(t)) &&
                  (t = (0, l.default)(t, !1)),
                'string' == typeof t.key)
              )
                if (null != m.keys[t.key.toUpperCase()])
                  t.key = m.keys[t.key.toUpperCase()]
                else {
                  if (1 !== t.key.length) return null
                  t.key = t.key.toUpperCase().charCodeAt(0)
                }
              return t.shortKey && ((t[g] = t.shortKey), delete t.shortKey), t
            }
            ;(m.keys = {
              BACKSPACE: 8,
              TAB: 9,
              ENTER: 13,
              ESCAPE: 27,
              LEFT: 37,
              UP: 38,
              RIGHT: 39,
              DOWN: 40,
              DELETE: 46,
            }),
              (m.DEFAULTS = {
                bindings: {
                  bold: k('bold'),
                  italic: k('italic'),
                  underline: k('underline'),
                  indent: {
                    key: m.keys.TAB,
                    format: ['blockquote', 'indent', 'list'],
                    handler: function (t, e) {
                      if (e.collapsed && 0 !== e.offset) return !0
                      this.quill.format('indent', '+1', p.default.sources.USER)
                    },
                  },
                  outdent: {
                    key: m.keys.TAB,
                    shiftKey: !0,
                    format: ['blockquote', 'indent', 'list'],
                    handler: function (t, e) {
                      if (e.collapsed && 0 !== e.offset) return !0
                      this.quill.format('indent', '-1', p.default.sources.USER)
                    },
                  },
                  'outdent backspace': {
                    key: m.keys.BACKSPACE,
                    collapsed: !0,
                    shiftKey: null,
                    metaKey: null,
                    ctrlKey: null,
                    altKey: null,
                    format: ['indent', 'list'],
                    offset: 0,
                    handler: function (t, e) {
                      null != e.format.indent
                        ? this.quill.format(
                            'indent',
                            '-1',
                            p.default.sources.USER
                          )
                        : null != e.format.list &&
                          this.quill.format('list', !1, p.default.sources.USER)
                    },
                  },
                  'indent code-block': A(!0),
                  'outdent code-block': A(!1),
                  'remove tab': {
                    key: m.keys.TAB,
                    shiftKey: !0,
                    collapsed: !0,
                    prefix: /\t$/,
                    handler: function (t) {
                      this.quill.deleteText(
                        t.index - 1,
                        1,
                        p.default.sources.USER
                      )
                    },
                  },
                  tab: {
                    key: m.keys.TAB,
                    handler: function (t) {
                      this.quill.history.cutoff()
                      var e = new s.default()
                        .retain(t.index)
                        .delete(t.length)
                        .insert('\t')
                      this.quill.updateContents(e, p.default.sources.USER),
                        this.quill.history.cutoff(),
                        this.quill.setSelection(
                          t.index + 1,
                          p.default.sources.SILENT
                        )
                    },
                  },
                  'list empty enter': {
                    key: m.keys.ENTER,
                    collapsed: !0,
                    format: ['list'],
                    empty: !0,
                    handler: function (t, e) {
                      this.quill.format('list', !1, p.default.sources.USER),
                        e.format.indent &&
                          this.quill.format(
                            'indent',
                            !1,
                            p.default.sources.USER
                          )
                    },
                  },
                  'checklist enter': {
                    key: m.keys.ENTER,
                    collapsed: !0,
                    format: { list: 'checked' },
                    handler: function (t) {
                      var e = this.quill.getLine(t.index),
                        n = o(e, 2),
                        r = n[0],
                        i = n[1],
                        l = (0, u.default)({}, r.formats(), {
                          list: 'checked',
                        }),
                        a = new s.default()
                          .retain(t.index)
                          .insert('\n', l)
                          .retain(r.length() - i - 1)
                          .retain(1, { list: 'unchecked' })
                      this.quill.updateContents(a, p.default.sources.USER),
                        this.quill.setSelection(
                          t.index + 1,
                          p.default.sources.SILENT
                        ),
                        this.quill.scrollIntoView()
                    },
                  },
                  'header enter': {
                    key: m.keys.ENTER,
                    collapsed: !0,
                    format: ['header'],
                    suffix: /^$/,
                    handler: function (t, e) {
                      var n = this.quill.getLine(t.index),
                        r = o(n, 2),
                        i = r[0],
                        l = r[1],
                        a = new s.default()
                          .retain(t.index)
                          .insert('\n', e.format)
                          .retain(i.length() - l - 1)
                          .retain(1, { header: null })
                      this.quill.updateContents(a, p.default.sources.USER),
                        this.quill.setSelection(
                          t.index + 1,
                          p.default.sources.SILENT
                        ),
                        this.quill.scrollIntoView()
                    },
                  },
                  'list autofill': {
                    key: ' ',
                    collapsed: !0,
                    format: { list: !1 },
                    prefix: /^\s*?(\d+\.|-|\*|\[ ?\]|\[x\])$/,
                    handler: function (t, e) {
                      var n = e.prefix.length,
                        r = this.quill.getLine(t.index),
                        i = o(r, 2),
                        l = i[0],
                        a = i[1]
                      if (a > n) return !0
                      var u = void 0
                      switch (e.prefix.trim()) {
                        case '[]':
                        case '[ ]':
                          u = 'unchecked'
                          break
                        case '[x]':
                          u = 'checked'
                          break
                        case '-':
                        case '*':
                          u = 'bullet'
                          break
                        default:
                          u = 'ordered'
                      }
                      this.quill.insertText(
                        t.index,
                        ' ',
                        p.default.sources.USER
                      ),
                        this.quill.history.cutoff()
                      var c = new s.default()
                        .retain(t.index - a)
                        .delete(n + 1)
                        .retain(l.length() - 2 - a)
                        .retain(1, { list: u })
                      this.quill.updateContents(c, p.default.sources.USER),
                        this.quill.history.cutoff(),
                        this.quill.setSelection(
                          t.index - n,
                          p.default.sources.SILENT
                        )
                    },
                  },
                  'code exit': {
                    key: m.keys.ENTER,
                    collapsed: !0,
                    format: ['code-block'],
                    prefix: /\n\n$/,
                    suffix: /^\s+$/,
                    handler: function (t) {
                      var e = this.quill.getLine(t.index),
                        n = o(e, 2),
                        r = n[0],
                        i = n[1],
                        l = new s.default()
                          .retain(t.index + r.length() - i - 2)
                          .retain(1, { 'code-block': null })
                          .delete(1)
                      this.quill.updateContents(l, p.default.sources.USER)
                    },
                  },
                  'embed left': _(m.keys.LEFT, !1),
                  'embed left shift': _(m.keys.LEFT, !0),
                  'embed right': _(m.keys.RIGHT, !1),
                  'embed right shift': _(m.keys.RIGHT, !0),
                },
              }),
              (e.default = m),
              (e.SHORTKEY = g)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = function (t, e) {
                if (Array.isArray(t)) return t
                if (Symbol.iterator in Object(t))
                  return (function (t, e) {
                    var n = [],
                      r = !0,
                      o = !1,
                      i = void 0
                    try {
                      for (
                        var l, a = t[Symbol.iterator]();
                        !(r = (l = a.next()).done) &&
                        (n.push(l.value), !e || n.length !== e);
                        r = !0
                      );
                    } catch (u) {
                      ;(o = !0), (i = u)
                    } finally {
                      try {
                        !r && a.return && a.return()
                      } finally {
                        if (o) throw i
                      }
                    }
                    return n
                  })(t, e)
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance'
                )
              },
              o = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              i = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              l = u(n(0)),
              a = u(n(8))
            function u(t) {
              return t && t.__esModule ? t : { default: t }
            }
            var s = (function (t) {
              function e(t, n) {
                !(function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError('Cannot call a class as a function')
                })(this, e)
                var r = (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ('object' != typeof e && 'function' != typeof e)
                    ? t
                    : e
                })(
                  this,
                  (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)
                )
                return (
                  (r.selection = n),
                  (r.textNode = document.createTextNode(e.CONTENTS)),
                  r.domNode.appendChild(r.textNode),
                  (r._length = 0),
                  r
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                i(e, null, [{ key: 'value', value: function () {} }]),
                i(e, [
                  {
                    key: 'detach',
                    value: function () {
                      null != this.parent && this.parent.removeChild(this)
                    },
                  },
                  {
                    key: 'format',
                    value: function (t, n) {
                      if (0 !== this._length)
                        return o(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'format',
                          this
                        ).call(this, t, n)
                      for (
                        var r = this, i = 0;
                        null != r &&
                        r.statics.scope !== l.default.Scope.BLOCK_BLOT;

                      )
                        (i += r.offset(r.parent)), (r = r.parent)
                      null != r &&
                        ((this._length = e.CONTENTS.length),
                        r.optimize(),
                        r.formatAt(i, e.CONTENTS.length, t, n),
                        (this._length = 0))
                    },
                  },
                  {
                    key: 'index',
                    value: function (t, n) {
                      return t === this.textNode
                        ? 0
                        : o(
                            e.prototype.__proto__ ||
                              Object.getPrototypeOf(e.prototype),
                            'index',
                            this
                          ).call(this, t, n)
                    },
                  },
                  {
                    key: 'length',
                    value: function () {
                      return this._length
                    },
                  },
                  {
                    key: 'position',
                    value: function () {
                      return [this.textNode, this.textNode.data.length]
                    },
                  },
                  {
                    key: 'remove',
                    value: function () {
                      o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'remove',
                        this
                      ).call(this),
                        (this.parent = null)
                    },
                  },
                  {
                    key: 'restore',
                    value: function () {
                      if (!this.selection.composing && null != this.parent) {
                        var t = this.textNode,
                          n = this.selection.getNativeRange(),
                          o = void 0,
                          i = void 0,
                          u = void 0
                        if (
                          null != n &&
                          n.start.node === t &&
                          n.end.node === t
                        ) {
                          var s = [t, n.start.offset, n.end.offset]
                          ;(o = s[0]), (i = s[1]), (u = s[2])
                        }
                        for (
                          ;
                          null != this.domNode.lastChild &&
                          this.domNode.lastChild !== this.textNode;

                        )
                          this.domNode.parentNode.insertBefore(
                            this.domNode.lastChild,
                            this.domNode
                          )
                        if (this.textNode.data !== e.CONTENTS) {
                          var c = this.textNode.data.split(e.CONTENTS).join('')
                          this.next instanceof a.default
                            ? ((o = this.next.domNode),
                              this.next.insertAt(0, c),
                              (this.textNode.data = e.CONTENTS))
                            : ((this.textNode.data = c),
                              this.parent.insertBefore(
                                l.default.create(this.textNode),
                                this
                              ),
                              (this.textNode = document.createTextNode(
                                e.CONTENTS
                              )),
                              this.domNode.appendChild(this.textNode))
                        }
                        if ((this.remove(), null != i)) {
                          var f = [i, u].map(function (t) {
                              return Math.max(0, Math.min(o.data.length, t - 1))
                            }),
                            p = r(f, 2)
                          return {
                            startNode: o,
                            startOffset: (i = p[0]),
                            endNode: o,
                            endOffset: (u = p[1]),
                          }
                        }
                      }
                    },
                  },
                  {
                    key: 'update',
                    value: function (t, e) {
                      var n = this
                      if (
                        t.some(function (t) {
                          return (
                            'characterData' === t.type &&
                            t.target === n.textNode
                          )
                        })
                      ) {
                        var r = this.restore()
                        r && (e.range = r)
                      }
                    },
                  },
                  {
                    key: 'value',
                    value: function () {
                      return ''
                    },
                  },
                ]),
                e
              )
            })(l.default.Embed)
            ;(s.blotName = 'cursor'),
              (s.className = 'ql-cursor'),
              (s.tagName = 'span'),
              (s.CONTENTS = '\ufeff'),
              (e.default = s)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = l(n(0)),
              o = n(4),
              i = l(o)
            function l(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function a(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function u(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var s = (function (t) {
              function e() {
                return (
                  a(this, e),
                  u(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                e
              )
            })(r.default.Container)
            ;(s.allowedChildren = [i.default, o.BlockEmbed, s]), (e.default = s)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.ColorStyle = e.ColorClass = e.ColorAttributor = void 0)
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = n(0),
              a = (r = l) && r.__esModule ? r : { default: r }
            function u(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function s(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var c = (function (t) {
                function e() {
                  return (
                    u(this, e),
                    s(
                      this,
                      (e.__proto__ || Object.getPrototypeOf(e)).apply(
                        this,
                        arguments
                      )
                    )
                  )
                }
                return (
                  (function (t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  })(e, t),
                  o(e, [
                    {
                      key: 'value',
                      value: function (t) {
                        var n = i(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'value',
                          this
                        ).call(this, t)
                        return n.startsWith('rgb(')
                          ? ((n = n
                              .replace(/^[^\d]+/, '')
                              .replace(/[^\d]+$/, '')),
                            '#' +
                              n
                                .split(',')
                                .map(function (t) {
                                  return (
                                    '00' + parseInt(t).toString(16)
                                  ).slice(-2)
                                })
                                .join(''))
                          : n
                      },
                    },
                  ]),
                  e
                )
              })(a.default.Attributor.Style),
              f = new a.default.Attributor.Class('color', 'ql-color', {
                scope: a.default.Scope.INLINE,
              }),
              p = new c('color', 'color', { scope: a.default.Scope.INLINE })
            ;(e.ColorAttributor = c), (e.ColorClass = f), (e.ColorStyle = p)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.sanitize = e.default = void 0)
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = n(6)
            function a(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function u(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var s = (function (t) {
              function e() {
                return (
                  a(this, e),
                  u(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                o(
                  e,
                  [
                    {
                      key: 'format',
                      value: function (t, n) {
                        if (t !== this.statics.blotName || !n)
                          return i(
                            e.prototype.__proto__ ||
                              Object.getPrototypeOf(e.prototype),
                            'format',
                            this
                          ).call(this, t, n)
                        ;(n = this.constructor.sanitize(n)),
                          this.domNode.setAttribute('href', n)
                      },
                    },
                  ],
                  [
                    {
                      key: 'create',
                      value: function (t) {
                        var n = i(
                          e.__proto__ || Object.getPrototypeOf(e),
                          'create',
                          this
                        ).call(this, t)
                        return (
                          (t = this.sanitize(t)),
                          n.setAttribute('href', t),
                          n.setAttribute('rel', 'noopener noreferrer'),
                          n.setAttribute('target', '_blank'),
                          n
                        )
                      },
                    },
                    {
                      key: 'formats',
                      value: function (t) {
                        return t.getAttribute('href')
                      },
                    },
                    {
                      key: 'sanitize',
                      value: function (t) {
                        return c(t, this.PROTOCOL_WHITELIST)
                          ? t
                          : this.SANITIZED_URL
                      },
                    },
                  ]
                ),
                e
              )
            })(((r = l) && r.__esModule ? r : { default: r }).default)
            function c(t, e) {
              var n = document.createElement('a')
              n.href = t
              var r = n.href.slice(0, n.href.indexOf(':'))
              return e.indexOf(r) > -1
            }
            ;(s.blotName = 'link'),
              (s.tagName = 'A'),
              (s.SANITIZED_URL = 'about:blank'),
              (s.PROTOCOL_WHITELIST = ['http', 'https', 'mailto', 'tel']),
              (e.default = s),
              (e.sanitize = c)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                  ? function (t) {
                      return typeof t
                    }
                  : function (t) {
                      return t &&
                        'function' == typeof Symbol &&
                        t.constructor === Symbol &&
                        t !== Symbol.prototype
                        ? 'symbol'
                        : typeof t
                    },
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = a(n(32)),
              l = a(n(144))
            function a(t) {
              return t && t.__esModule ? t : { default: t }
            }
            var u = 0
            function s(t, e) {
              t.setAttribute(e, !('true' === t.getAttribute(e)))
            }
            var c = (function () {
              function t(e) {
                var n = this
                !(function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError('Cannot call a class as a function')
                })(this, t),
                  (this.select = e),
                  (this.container = document.createElement('span')),
                  this.buildPicker(),
                  (this.select.style.display = 'none'),
                  this.select.parentNode.insertBefore(
                    this.container,
                    this.select
                  ),
                  this.label.addEventListener('mousedown', function () {
                    n.togglePicker()
                  }),
                  this.label.addEventListener('keydown', function (t) {
                    switch (t.keyCode) {
                      case i.default.keys.ENTER:
                        n.togglePicker()
                        break
                      case i.default.keys.ESCAPE:
                        n.escape(), t.preventDefault()
                    }
                  }),
                  this.select.addEventListener('change', this.update.bind(this))
              }
              return (
                o(t, [
                  {
                    key: 'togglePicker',
                    value: function () {
                      this.container.classList.toggle('ql-expanded'),
                        s(this.label, 'aria-expanded'),
                        s(this.options, 'aria-hidden')
                    },
                  },
                  {
                    key: 'buildItem',
                    value: function (t) {
                      var e = this,
                        n = document.createElement('span')
                      return (
                        (n.tabIndex = '0'),
                        n.setAttribute('role', 'button'),
                        n.classList.add('ql-picker-item'),
                        t.hasAttribute('value') &&
                          n.setAttribute('data-value', t.getAttribute('value')),
                        t.textContent &&
                          n.setAttribute('data-label', t.textContent),
                        n.addEventListener('click', function () {
                          e.selectItem(n, !0)
                        }),
                        n.addEventListener('keydown', function (t) {
                          switch (t.keyCode) {
                            case i.default.keys.ENTER:
                              e.selectItem(n, !0), t.preventDefault()
                              break
                            case i.default.keys.ESCAPE:
                              e.escape(), t.preventDefault()
                          }
                        }),
                        n
                      )
                    },
                  },
                  {
                    key: 'buildLabel',
                    value: function () {
                      var t = document.createElement('span')
                      return (
                        t.classList.add('ql-picker-label'),
                        (t.innerHTML = l.default),
                        (t.tabIndex = '0'),
                        t.setAttribute('role', 'button'),
                        t.setAttribute('aria-expanded', 'false'),
                        this.container.appendChild(t),
                        t
                      )
                    },
                  },
                  {
                    key: 'buildOptions',
                    value: function () {
                      var t = this,
                        e = document.createElement('span')
                      e.classList.add('ql-picker-options'),
                        e.setAttribute('aria-hidden', 'true'),
                        (e.tabIndex = '-1'),
                        (e.id = 'ql-picker-options-' + u),
                        (u += 1),
                        this.label.setAttribute('aria-controls', e.id),
                        (this.options = e),
                        [].slice
                          .call(this.select.options)
                          .forEach(function (n) {
                            var r = t.buildItem(n)
                            e.appendChild(r),
                              !0 === n.selected && t.selectItem(r)
                          }),
                        this.container.appendChild(e)
                    },
                  },
                  {
                    key: 'buildPicker',
                    value: function () {
                      var t = this
                      ;[].slice
                        .call(this.select.attributes)
                        .forEach(function (e) {
                          t.container.setAttribute(e.name, e.value)
                        }),
                        this.container.classList.add('ql-picker'),
                        (this.label = this.buildLabel()),
                        this.buildOptions()
                    },
                  },
                  {
                    key: 'escape',
                    value: function () {
                      var t = this
                      this.close(),
                        setTimeout(function () {
                          return t.label.focus()
                        }, 1)
                    },
                  },
                  {
                    key: 'close',
                    value: function () {
                      this.container.classList.remove('ql-expanded'),
                        this.label.setAttribute('aria-expanded', 'false'),
                        this.options.setAttribute('aria-hidden', 'true')
                    },
                  },
                  {
                    key: 'selectItem',
                    value: function (t) {
                      var e =
                          arguments.length > 1 &&
                          void 0 !== arguments[1] &&
                          arguments[1],
                        n = this.container.querySelector('.ql-selected')
                      if (
                        t !== n &&
                        (null != n && n.classList.remove('ql-selected'),
                        null != t &&
                          (t.classList.add('ql-selected'),
                          (this.select.selectedIndex = [].indexOf.call(
                            t.parentNode.children,
                            t
                          )),
                          t.hasAttribute('data-value')
                            ? this.label.setAttribute(
                                'data-value',
                                t.getAttribute('data-value')
                              )
                            : this.label.removeAttribute('data-value'),
                          t.hasAttribute('data-label')
                            ? this.label.setAttribute(
                                'data-label',
                                t.getAttribute('data-label')
                              )
                            : this.label.removeAttribute('data-label'),
                          e))
                      ) {
                        if ('function' == typeof Event)
                          this.select.dispatchEvent(new Event('change'))
                        else if (
                          'object' ===
                          ('undefined' == typeof Event ? 'undefined' : r(Event))
                        ) {
                          var o = document.createEvent('Event')
                          o.initEvent('change', !0, !0),
                            this.select.dispatchEvent(o)
                        }
                        this.close()
                      }
                    },
                  },
                  {
                    key: 'update',
                    value: function () {
                      var t = void 0
                      if (this.select.selectedIndex > -1) {
                        var e =
                          this.container.querySelector('.ql-picker-options')
                            .children[this.select.selectedIndex]
                        ;(t = this.select.options[this.select.selectedIndex]),
                          this.selectItem(e)
                      } else this.selectItem(null)
                      var n =
                        null != t &&
                        t !== this.select.querySelector('option[selected]')
                      this.label.classList.toggle('ql-active', n)
                    },
                  },
                ]),
                t
              )
            })()
            e.default = c
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = b(n(0)),
              o = b(n(5)),
              i = n(4),
              l = b(i),
              a = b(n(19)),
              u = b(n(34)),
              s = b(n(33)),
              c = b(n(54)),
              f = b(n(6)),
              p = b(n(31)),
              h = b(n(8)),
              d = b(n(92)),
              y = b(n(61)),
              v = b(n(32))
            function b(t) {
              return t && t.__esModule ? t : { default: t }
            }
            o.default.register({
              'blots/block': l.default,
              'blots/block/embed': i.BlockEmbed,
              'blots/break': a.default,
              'blots/container': u.default,
              'blots/cursor': s.default,
              'blots/embed': c.default,
              'blots/inline': f.default,
              'blots/scroll': p.default,
              'blots/text': h.default,
              'modules/clipboard': d.default,
              'modules/history': y.default,
              'modules/keyboard': v.default,
            }),
              r.default.register(
                l.default,
                a.default,
                s.default,
                f.default,
                p.default,
                h.default
              ),
              (e.default = o.default)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = n(1),
              o = (function () {
                function t(t) {
                  ;(this.domNode = t),
                    (this.domNode[r.DATA_KEY] = { blot: this })
                }
                return (
                  Object.defineProperty(t.prototype, 'statics', {
                    get: function () {
                      return this.constructor
                    },
                    enumerable: !0,
                    configurable: !0,
                  }),
                  (t.create = function (t) {
                    if (null == this.tagName)
                      throw new r.ParchmentError(
                        'Blot definition missing tagName'
                      )
                    var e
                    return (
                      Array.isArray(this.tagName)
                        ? ('string' == typeof t &&
                            ((t = t.toUpperCase()),
                            parseInt(t).toString() === t && (t = parseInt(t))),
                          (e =
                            'number' == typeof t
                              ? document.createElement(this.tagName[t - 1])
                              : this.tagName.indexOf(t) > -1
                              ? document.createElement(t)
                              : document.createElement(this.tagName[0])))
                        : (e = document.createElement(this.tagName)),
                      this.className && e.classList.add(this.className),
                      e
                    )
                  }),
                  (t.prototype.attach = function () {
                    null != this.parent && (this.scroll = this.parent.scroll)
                  }),
                  (t.prototype.clone = function () {
                    var t = this.domNode.cloneNode(!1)
                    return r.create(t)
                  }),
                  (t.prototype.detach = function () {
                    null != this.parent && this.parent.removeChild(this),
                      delete this.domNode[r.DATA_KEY]
                  }),
                  (t.prototype.deleteAt = function (t, e) {
                    this.isolate(t, e).remove()
                  }),
                  (t.prototype.formatAt = function (t, e, n, o) {
                    var i = this.isolate(t, e)
                    if (null != r.query(n, r.Scope.BLOT) && o) i.wrap(n, o)
                    else if (null != r.query(n, r.Scope.ATTRIBUTE)) {
                      var l = r.create(this.statics.scope)
                      i.wrap(l), l.format(n, o)
                    }
                  }),
                  (t.prototype.insertAt = function (t, e, n) {
                    var o = null == n ? r.create('text', e) : r.create(e, n),
                      i = this.split(t)
                    this.parent.insertBefore(o, i)
                  }),
                  (t.prototype.insertInto = function (t, e) {
                    void 0 === e && (e = null),
                      null != this.parent && this.parent.children.remove(this)
                    var n = null
                    t.children.insertBefore(this, e),
                      null != e && (n = e.domNode),
                      (this.domNode.parentNode == t.domNode &&
                        this.domNode.nextSibling == n) ||
                        t.domNode.insertBefore(this.domNode, n),
                      (this.parent = t),
                      this.attach()
                  }),
                  (t.prototype.isolate = function (t, e) {
                    var n = this.split(t)
                    return n.split(e), n
                  }),
                  (t.prototype.length = function () {
                    return 1
                  }),
                  (t.prototype.offset = function (t) {
                    return (
                      void 0 === t && (t = this.parent),
                      null == this.parent || this == t
                        ? 0
                        : this.parent.children.offset(this) +
                          this.parent.offset(t)
                    )
                  }),
                  (t.prototype.optimize = function (t) {
                    null != this.domNode[r.DATA_KEY] &&
                      delete this.domNode[r.DATA_KEY].mutations
                  }),
                  (t.prototype.remove = function () {
                    null != this.domNode.parentNode &&
                      this.domNode.parentNode.removeChild(this.domNode),
                      this.detach()
                  }),
                  (t.prototype.replace = function (t) {
                    null != t.parent &&
                      (t.parent.insertBefore(this, t.next), t.remove())
                  }),
                  (t.prototype.replaceWith = function (t, e) {
                    var n = 'string' == typeof t ? r.create(t, e) : t
                    return n.replace(this), n
                  }),
                  (t.prototype.split = function (t, e) {
                    return 0 === t ? this : this.next
                  }),
                  (t.prototype.update = function (t, e) {}),
                  (t.prototype.wrap = function (t, e) {
                    var n = 'string' == typeof t ? r.create(t, e) : t
                    return (
                      null != this.parent &&
                        this.parent.insertBefore(n, this.next),
                      n.appendChild(this),
                      n
                    )
                  }),
                  (t.blotName = 'abstract'),
                  t
                )
              })()
            e.default = o
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = n(13),
              o = n(41),
              i = n(42),
              l = n(1),
              a = (function () {
                function t(t) {
                  ;(this.attributes = {}), (this.domNode = t), this.build()
                }
                return (
                  (t.prototype.attribute = function (t, e) {
                    e
                      ? t.add(this.domNode, e) &&
                        (null != t.value(this.domNode)
                          ? (this.attributes[t.attrName] = t)
                          : delete this.attributes[t.attrName])
                      : (t.remove(this.domNode),
                        delete this.attributes[t.attrName])
                  }),
                  (t.prototype.build = function () {
                    var t = this
                    this.attributes = {}
                    var e = r.default.keys(this.domNode),
                      n = o.default.keys(this.domNode),
                      a = i.default.keys(this.domNode)
                    e.concat(n)
                      .concat(a)
                      .forEach(function (e) {
                        var n = l.query(e, l.Scope.ATTRIBUTE)
                        n instanceof r.default && (t.attributes[n.attrName] = n)
                      })
                  }),
                  (t.prototype.copy = function (t) {
                    var e = this
                    Object.keys(this.attributes).forEach(function (n) {
                      var r = e.attributes[n].value(e.domNode)
                      t.format(n, r)
                    })
                  }),
                  (t.prototype.move = function (t) {
                    var e = this
                    this.copy(t),
                      Object.keys(this.attributes).forEach(function (t) {
                        e.attributes[t].remove(e.domNode)
                      }),
                      (this.attributes = {})
                  }),
                  (t.prototype.values = function () {
                    var t = this
                    return Object.keys(this.attributes).reduce(function (e, n) {
                      return (e[n] = t.attributes[n].value(t.domNode)), e
                    }, {})
                  }),
                  t
                )
              })()
            e.default = a
          },
          function (t, e, n) {
            var r,
              o =
                (this && this.__extends) ||
                ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  }),
                function (t, e) {
                  function n() {
                    this.constructor = t
                  }
                  r(t, e),
                    (t.prototype =
                      null === e
                        ? Object.create(e)
                        : ((n.prototype = e.prototype), new n()))
                })
            function i(t, e) {
              return (t.getAttribute('class') || '')
                .split(/\s+/)
                .filter(function (t) {
                  return 0 === t.indexOf(e + '-')
                })
            }
            Object.defineProperty(e, '__esModule', { value: !0 })
            var l = (function (t) {
              function e() {
                return (null !== t && t.apply(this, arguments)) || this
              }
              return (
                o(e, t),
                (e.keys = function (t) {
                  return (t.getAttribute('class') || '')
                    .split(/\s+/)
                    .map(function (t) {
                      return t.split('-').slice(0, -1).join('-')
                    })
                }),
                (e.prototype.add = function (t, e) {
                  return (
                    !!this.canAdd(t, e) &&
                    (this.remove(t),
                    t.classList.add(this.keyName + '-' + e),
                    !0)
                  )
                }),
                (e.prototype.remove = function (t) {
                  i(t, this.keyName).forEach(function (e) {
                    t.classList.remove(e)
                  }),
                    0 === t.classList.length && t.removeAttribute('class')
                }),
                (e.prototype.value = function (t) {
                  var e = (i(t, this.keyName)[0] || '').slice(
                    this.keyName.length + 1
                  )
                  return this.canAdd(t, e) ? e : ''
                }),
                e
              )
            })(n(13).default)
            e.default = l
          },
          function (t, e, n) {
            var r,
              o =
                (this && this.__extends) ||
                ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  }),
                function (t, e) {
                  function n() {
                    this.constructor = t
                  }
                  r(t, e),
                    (t.prototype =
                      null === e
                        ? Object.create(e)
                        : ((n.prototype = e.prototype), new n()))
                })
            function i(t) {
              var e = t.split('-'),
                n = e
                  .slice(1)
                  .map(function (t) {
                    return t[0].toUpperCase() + t.slice(1)
                  })
                  .join('')
              return e[0] + n
            }
            Object.defineProperty(e, '__esModule', { value: !0 })
            var l = (function (t) {
              function e() {
                return (null !== t && t.apply(this, arguments)) || this
              }
              return (
                o(e, t),
                (e.keys = function (t) {
                  return (t.getAttribute('style') || '')
                    .split(';')
                    .map(function (t) {
                      return t.split(':')[0].trim()
                    })
                }),
                (e.prototype.add = function (t, e) {
                  return (
                    !!this.canAdd(t, e) && ((t.style[i(this.keyName)] = e), !0)
                  )
                }),
                (e.prototype.remove = function (t) {
                  ;(t.style[i(this.keyName)] = ''),
                    t.getAttribute('style') || t.removeAttribute('style')
                }),
                (e.prototype.value = function (t) {
                  var e = t.style[i(this.keyName)]
                  return this.canAdd(t, e) ? e : ''
                }),
                e
              )
            })(n(13).default)
            e.default = l
          },
          function (t, e, n) {
            var r = Array.prototype.slice,
              o = n(44),
              i = Object.keys,
              l = i
                ? function (t) {
                    return i(t)
                  }
                : n(71),
              a = Object.keys
            ;(l.shim = function () {
              if (Object.keys) {
                var t = (function () {
                  var t = Object.keys(arguments)
                  return t && t.length === arguments.length
                })(1, 2)
                t ||
                  (Object.keys = function (t) {
                    return o(t) ? a(r.call(t)) : a(t)
                  })
              } else Object.keys = l
              return Object.keys || l
            }),
              (t.exports = l)
          },
          function (t, e, n) {
            var r = Object.prototype.toString
            t.exports = function (t) {
              var e = r.call(t),
                n = '[object Arguments]' === e
              return (
                n ||
                  (n =
                    '[object Array]' !== e &&
                    null !== t &&
                    'object' == typeof t &&
                    'number' == typeof t.length &&
                    t.length >= 0 &&
                    '[object Function]' === r.call(t.callee)),
                n
              )
            }
          },
          function (t, e, n) {
            t.exports = function () {
              if (
                'function' != typeof Symbol ||
                'function' != typeof Object.getOwnPropertySymbols
              )
                return !1
              if ('symbol' == typeof Symbol.iterator) return !0
              var t = {},
                e = Symbol('test'),
                n = Object(e)
              if ('string' == typeof e) return !1
              if ('[object Symbol]' !== Object.prototype.toString.call(e))
                return !1
              if ('[object Symbol]' !== Object.prototype.toString.call(n))
                return !1
              for (e in ((t[e] = 42), t)) return !1
              if (
                'function' == typeof Object.keys &&
                0 !== Object.keys(t).length
              )
                return !1
              if (
                'function' == typeof Object.getOwnPropertyNames &&
                0 !== Object.getOwnPropertyNames(t).length
              )
                return !1
              var r = Object.getOwnPropertySymbols(t)
              if (1 !== r.length || r[0] !== e) return !1
              if (!Object.prototype.propertyIsEnumerable.call(t, e)) return !1
              if ('function' == typeof Object.getOwnPropertyDescriptor) {
                var o = Object.getOwnPropertyDescriptor(t, e)
                if (42 !== o.value || !0 !== o.enumerable) return !1
              }
              return !0
            }
          },
          function (t, e, n) {
            var r = n(14),
              o = n(25),
              i = o(r('String.prototype.indexOf'))
            t.exports = function (t, e) {
              var n = r(t, !!e)
              return 'function' == typeof n && i(t, '.prototype.') > -1
                ? o(n)
                : n
            }
          },
          function (t, e, n) {
            t.exports = SyntaxError
          },
          function (t, e, n) {
            var r = n(14)('%Object.getOwnPropertyDescriptor%', !0)
            if (r)
              try {
                r([], 'length')
              } catch (o) {
                r = null
              }
            t.exports = r
          },
          function (t, e, n) {
            var r = function (t) {
              return t != t
            }
            t.exports = function (t, e) {
              return 0 === t && 0 === e
                ? 1 / t == 1 / e
                : t === e || !(!r(t) || !r(e))
            }
          },
          function (t, e, n) {
            var r = n(49)
            t.exports = function () {
              return 'function' == typeof Object.is ? Object.is : r
            }
          },
          function (t, e, n) {
            var r = n(87),
              o = n(7),
              i = Object
            t.exports = r(
              function () {
                if (null == this || this !== i(this))
                  throw new o(
                    'RegExp.prototype.flags getter called on non-object'
                  )
                var t = ''
                return (
                  this.hasIndices && (t += 'd'),
                  this.global && (t += 'g'),
                  this.ignoreCase && (t += 'i'),
                  this.multiline && (t += 'm'),
                  this.dotAll && (t += 's'),
                  this.unicode && (t += 'u'),
                  this.unicodeSets && (t += 'v'),
                  this.sticky && (t += 'y'),
                  t
                )
              },
              'get flags',
              !0
            )
          },
          function (t, e, n) {
            var r = n(51),
              o = n(15).supportsDescriptors,
              i = Object.getOwnPropertyDescriptor
            t.exports = function () {
              if (o && 'gim' === /a/gim.flags) {
                var t = i(RegExp.prototype, 'flags')
                if (
                  t &&
                  'function' == typeof t.get &&
                  'boolean' == typeof RegExp.prototype.dotAll &&
                  'boolean' == typeof RegExp.prototype.hasIndices
                ) {
                  var e = '',
                    n = {}
                  if (
                    (Object.defineProperty(n, 'hasIndices', {
                      get: function () {
                        e += 'd'
                      },
                    }),
                    Object.defineProperty(n, 'sticky', {
                      get: function () {
                        e += 'y'
                      },
                    }),
                    'dy' === e)
                  )
                    return t.get
                }
              }
              return r
            }
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              o = (function () {
                function t(e, n) {
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, t),
                    (this.quill = e),
                    (this.options = n),
                    (this.modules = {})
                }
                return (
                  r(t, [
                    {
                      key: 'init',
                      value: function () {
                        var t = this
                        Object.keys(this.options.modules).forEach(function (e) {
                          null == t.modules[e] && t.addModule(e)
                        })
                      },
                    },
                    {
                      key: 'addModule',
                      value: function (t) {
                        var e = this.quill.constructor.import('modules/' + t)
                        return (
                          (this.modules[t] = new e(
                            this.quill,
                            this.options.modules[t] || {}
                          )),
                          this.modules[t]
                        )
                      },
                    },
                  ]),
                  t
                )
              })()
            ;(o.DEFAULTS = { modules: {} }),
              (o.themes = { default: o }),
              (e.default = o)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              o = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              i = a(n(0)),
              l = a(n(8))
            function a(t) {
              return t && t.__esModule ? t : { default: t }
            }
            var u = '\ufeff',
              s = (function (t) {
                function e(t) {
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, e)
                  var n = (function (t, e) {
                    if (!t)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e ||
                      ('object' != typeof e && 'function' != typeof e)
                      ? t
                      : e
                  })(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)
                  )
                  return (
                    (n.contentNode = document.createElement('span')),
                    n.contentNode.setAttribute('contenteditable', !1),
                    [].slice.call(n.domNode.childNodes).forEach(function (t) {
                      n.contentNode.appendChild(t)
                    }),
                    (n.leftGuard = document.createTextNode(u)),
                    (n.rightGuard = document.createTextNode(u)),
                    n.domNode.appendChild(n.leftGuard),
                    n.domNode.appendChild(n.contentNode),
                    n.domNode.appendChild(n.rightGuard),
                    n
                  )
                }
                return (
                  (function (t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  })(e, t),
                  r(e, [
                    {
                      key: 'index',
                      value: function (t, n) {
                        return t === this.leftGuard
                          ? 0
                          : t === this.rightGuard
                          ? 1
                          : o(
                              e.prototype.__proto__ ||
                                Object.getPrototypeOf(e.prototype),
                              'index',
                              this
                            ).call(this, t, n)
                      },
                    },
                    {
                      key: 'restore',
                      value: function (t) {
                        var e = void 0,
                          n = void 0,
                          r = t.data.split(u).join('')
                        if (t === this.leftGuard)
                          if (this.prev instanceof l.default) {
                            var o = this.prev.length()
                            this.prev.insertAt(o, r),
                              (e = {
                                startNode: this.prev.domNode,
                                startOffset: o + r.length,
                              })
                          } else
                            (n = document.createTextNode(r)),
                              this.parent.insertBefore(
                                i.default.create(n),
                                this
                              ),
                              (e = { startNode: n, startOffset: r.length })
                        else
                          t === this.rightGuard &&
                            (this.next instanceof l.default
                              ? (this.next.insertAt(0, r),
                                (e = {
                                  startNode: this.next.domNode,
                                  startOffset: r.length,
                                }))
                              : ((n = document.createTextNode(r)),
                                this.parent.insertBefore(
                                  i.default.create(n),
                                  this.next
                                ),
                                (e = { startNode: n, startOffset: r.length })))
                        return (t.data = u), e
                      },
                    },
                    {
                      key: 'update',
                      value: function (t, e) {
                        var n = this
                        t.forEach(function (t) {
                          if (
                            'characterData' === t.type &&
                            (t.target === n.leftGuard ||
                              t.target === n.rightGuard)
                          ) {
                            var r = n.restore(t.target)
                            r && (e.range = r)
                          }
                        })
                      },
                    },
                  ]),
                  e
                )
              })(i.default.Embed)
            e.default = s
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.AlignStyle = e.AlignClass = e.AlignAttribute = void 0)
            var r,
              o = n(0),
              i = (r = o) && r.__esModule ? r : { default: r },
              l = {
                scope: i.default.Scope.BLOCK,
                whitelist: ['right', 'center', 'justify'],
              },
              a = new i.default.Attributor.Attribute('align', 'align', l),
              u = new i.default.Attributor.Class('align', 'ql-align', l),
              s = new i.default.Attributor.Style('align', 'text-align', l)
            ;(e.AlignAttribute = a), (e.AlignClass = u), (e.AlignStyle = s)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.BackgroundStyle = e.BackgroundClass = void 0)
            var r,
              o = n(0),
              i = (r = o) && r.__esModule ? r : { default: r },
              l = n(35),
              a = new i.default.Attributor.Class('background', 'ql-bg', {
                scope: i.default.Scope.INLINE,
              }),
              u = new l.ColorAttributor('background', 'background-color', {
                scope: i.default.Scope.INLINE,
              })
            ;(e.BackgroundClass = a), (e.BackgroundStyle = u)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.DirectionStyle =
                e.DirectionClass =
                e.DirectionAttribute =
                  void 0)
            var r,
              o = n(0),
              i = (r = o) && r.__esModule ? r : { default: r },
              l = { scope: i.default.Scope.BLOCK, whitelist: ['rtl'] },
              a = new i.default.Attributor.Attribute('direction', 'dir', l),
              u = new i.default.Attributor.Class(
                'direction',
                'ql-direction',
                l
              ),
              s = new i.default.Attributor.Style('direction', 'direction', l)
            ;(e.DirectionAttribute = a),
              (e.DirectionClass = u),
              (e.DirectionStyle = s)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.FontClass = e.FontStyle = void 0)
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = n(0),
              a = (r = l) && r.__esModule ? r : { default: r }
            function u(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function s(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var c = {
                scope: a.default.Scope.INLINE,
                whitelist: ['serif', 'monospace'],
              },
              f = new a.default.Attributor.Class('font', 'ql-font', c),
              p = (function (t) {
                function e() {
                  return (
                    u(this, e),
                    s(
                      this,
                      (e.__proto__ || Object.getPrototypeOf(e)).apply(
                        this,
                        arguments
                      )
                    )
                  )
                }
                return (
                  (function (t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  })(e, t),
                  o(e, [
                    {
                      key: 'value',
                      value: function (t) {
                        return i(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'value',
                          this
                        )
                          .call(this, t)
                          .replace(/["']/g, '')
                      },
                    },
                  ]),
                  e
                )
              })(a.default.Attributor.Style),
              h = new p('font', 'font-family', c)
            ;(e.FontStyle = h), (e.FontClass = f)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.SizeStyle = e.SizeClass = void 0)
            var r,
              o = n(0),
              i = (r = o) && r.__esModule ? r : { default: r },
              l = new i.default.Attributor.Class('size', 'ql-size', {
                scope: i.default.Scope.INLINE,
                whitelist: ['small', 'large', 'huge'],
              }),
              a = new i.default.Attributor.Style('size', 'font-size', {
                scope: i.default.Scope.INLINE,
                whitelist: ['10px', '18px', '32px'],
              })
            ;(e.SizeClass = l), (e.SizeStyle = a)
          },
          function (t, e, n) {
            t.exports = {
              align: {
                '': n(113),
                center: n(114),
                right: n(115),
                justify: n(116),
              },
              background: n(117),
              blockquote: n(118),
              bold: n(119),
              clean: n(120),
              code: n(95),
              'code-block': n(95),
              color: n(121),
              direction: { '': n(122), rtl: n(123) },
              float: {
                center: n(124),
                full: n(125),
                left: n(126),
                right: n(127),
              },
              formula: n(128),
              header: { 1: n(129), 2: n(130) },
              italic: n(131),
              image: n(132),
              indent: { '+1': n(133), '-1': n(134) },
              link: n(135),
              list: { ordered: n(136), bullet: n(137), check: n(138) },
              script: { sub: n(139), super: n(140) },
              strike: n(141),
              underline: n(142),
              video: n(143),
            }
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.getLastChangeIndex = e.default = void 0)
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              o = l(n(0)),
              i = l(n(5))
            function l(t) {
              return t && t.__esModule ? t : { default: t }
            }
            var a = (function (t) {
              function e(t, n) {
                !(function (t, e) {
                  if (!(t instanceof e))
                    throw new TypeError('Cannot call a class as a function')
                })(this, e)
                var r = (function (t, e) {
                  if (!t)
                    throw new ReferenceError(
                      "this hasn't been initialised - super() hasn't been called"
                    )
                  return !e || ('object' != typeof e && 'function' != typeof e)
                    ? t
                    : e
                })(
                  this,
                  (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
                )
                return (
                  (r.lastRecorded = 0),
                  (r.ignoreChange = !1),
                  r.clear(),
                  r.quill.on(
                    i.default.events.EDITOR_CHANGE,
                    function (t, e, n, o) {
                      t !== i.default.events.TEXT_CHANGE ||
                        r.ignoreChange ||
                        (r.options.userOnly && o !== i.default.sources.USER
                          ? r.transform(e)
                          : r.record(e, n))
                    }
                  ),
                  r.quill.keyboard.addBinding(
                    { key: 'Z', shortKey: !0 },
                    r.undo.bind(r)
                  ),
                  r.quill.keyboard.addBinding(
                    { key: 'Z', shortKey: !0, shiftKey: !0 },
                    r.redo.bind(r)
                  ),
                  /Win/i.test(navigator.platform) &&
                    r.quill.keyboard.addBinding(
                      { key: 'Y', shortKey: !0 },
                      r.redo.bind(r)
                    ),
                  r
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                r(e, [
                  {
                    key: 'change',
                    value: function (t, e) {
                      if (0 !== this.stack[t].length) {
                        var n = this.stack[t].pop()
                        this.stack[e].push(n),
                          (this.lastRecorded = 0),
                          (this.ignoreChange = !0),
                          this.quill.updateContents(
                            n[t],
                            i.default.sources.USER
                          ),
                          (this.ignoreChange = !1)
                        var r = u(n[t])
                        this.quill.setSelection(r)
                      }
                    },
                  },
                  {
                    key: 'clear',
                    value: function () {
                      this.stack = { undo: [], redo: [] }
                    },
                  },
                  {
                    key: 'cutoff',
                    value: function () {
                      this.lastRecorded = 0
                    },
                  },
                  {
                    key: 'record',
                    value: function (t, e) {
                      if (0 !== t.ops.length) {
                        this.stack.redo = []
                        var n = this.quill.getContents().diff(e),
                          r = Date.now()
                        if (
                          this.lastRecorded + this.options.delay > r &&
                          this.stack.undo.length > 0
                        ) {
                          var o = this.stack.undo.pop()
                          ;(n = n.compose(o.undo)), (t = o.redo.compose(t))
                        } else this.lastRecorded = r
                        this.stack.undo.push({ redo: t, undo: n }),
                          this.stack.undo.length > this.options.maxStack &&
                            this.stack.undo.shift()
                      }
                    },
                  },
                  {
                    key: 'redo',
                    value: function () {
                      this.change('redo', 'undo')
                    },
                  },
                  {
                    key: 'transform',
                    value: function (t) {
                      this.stack.undo.forEach(function (e) {
                        ;(e.undo = t.transform(e.undo, !0)),
                          (e.redo = t.transform(e.redo, !0))
                      }),
                        this.stack.redo.forEach(function (e) {
                          ;(e.undo = t.transform(e.undo, !0)),
                            (e.redo = t.transform(e.redo, !0))
                        })
                    },
                  },
                  {
                    key: 'undo',
                    value: function () {
                      this.change('undo', 'redo')
                    },
                  },
                ]),
                e
              )
            })(l(n(10)).default)
            function u(t) {
              var e = t.reduce(function (t, e) {
                  return (t += e.delete || 0)
                }, 0),
                n = t.length() - e
              return (
                (function (t) {
                  var e = t.ops[t.ops.length - 1]
                  return (
                    null != e &&
                    (null != e.insert
                      ? 'string' == typeof e.insert && e.insert.endsWith('\n')
                      : null != e.attributes &&
                        Object.keys(e.attributes).some(function (t) {
                          return (
                            null != o.default.query(t, o.default.Scope.BLOCK)
                          )
                        }))
                  )
                })(t) && (n -= 1),
                n
              )
            }
            ;(a.DEFAULTS = { delay: 1e3, maxStack: 100, userOnly: !1 }),
              (e.default = a),
              (e.getLastChangeIndex = u)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.default = e.BaseTooltip = void 0)
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              o = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              i = d(n(3)),
              l = d(n(2)),
              a = d(n(9)),
              u = d(n(32)),
              s = d(n(53)),
              c = d(n(96)),
              f = d(n(97)),
              p = d(n(37)),
              h = d(n(98))
            function d(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function y(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function v(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            function b(t, e) {
              if ('function' != typeof e && null !== e)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof e
                )
              ;(t.prototype = Object.create(e && e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                e &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, e)
                    : (t.__proto__ = e))
            }
            var g = [!1, 'center', 'right', 'justify'],
              m = [
                '#000000',
                '#e60000',
                '#ff9900',
                '#ffff00',
                '#008a00',
                '#0066cc',
                '#9933ff',
                '#ffffff',
                '#facccc',
                '#ffebcc',
                '#ffffcc',
                '#cce8cc',
                '#cce0f5',
                '#ebd6ff',
                '#bbbbbb',
                '#f06666',
                '#ffc266',
                '#ffff66',
                '#66b966',
                '#66a3e0',
                '#c285ff',
                '#888888',
                '#a10000',
                '#b26b00',
                '#b2b200',
                '#006100',
                '#0047b2',
                '#6b24b2',
                '#444444',
                '#5c0000',
                '#663d00',
                '#666600',
                '#003700',
                '#002966',
                '#3d1466',
              ],
              _ = [!1, 'serif', 'monospace'],
              O = ['1', '2', '3', !1],
              w = ['small', !1, 'large', 'huge'],
              x = (function (t) {
                function e(t, n) {
                  y(this, e)
                  var r = v(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
                  )
                  return (
                    t.emitter.listenDOM('click', document.body, function e(n) {
                      if (!document.body.contains(t.root))
                        return document.body.removeEventListener('click', e)
                      null == r.tooltip ||
                        r.tooltip.root.contains(n.target) ||
                        document.activeElement === r.tooltip.textbox ||
                        r.quill.hasFocus() ||
                        r.tooltip.hide(),
                        null != r.pickers &&
                          r.pickers.forEach(function (t) {
                            t.container.contains(n.target) || t.close()
                          })
                    }),
                    r
                  )
                }
                return (
                  b(e, t),
                  r(e, [
                    {
                      key: 'addModule',
                      value: function (t) {
                        var n = o(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'addModule',
                          this
                        ).call(this, t)
                        return 'toolbar' === t && this.extendToolbar(n), n
                      },
                    },
                    {
                      key: 'buildButtons',
                      value: function (t, e) {
                        t.forEach(function (t) {
                          ;(t.getAttribute('class') || '')
                            .split(/\s+/)
                            .forEach(function (n) {
                              if (
                                n.startsWith('ql-') &&
                                ((n = n.slice('ql-'.length)), null != e[n])
                              )
                                if ('direction' === n)
                                  t.innerHTML = e[n][''] + e[n].rtl
                                else if ('string' == typeof e[n])
                                  t.innerHTML = e[n]
                                else {
                                  var r = t.value || ''
                                  null != r &&
                                    e[n][r] &&
                                    (t.innerHTML = e[n][r])
                                }
                            })
                        })
                      },
                    },
                    {
                      key: 'buildPickers',
                      value: function (t, e) {
                        var n = this
                        ;(this.pickers = t.map(function (t) {
                          if (t.classList.contains('ql-align'))
                            return (
                              null == t.querySelector('option') && A(t, g),
                              new f.default(t, e.align)
                            )
                          if (
                            t.classList.contains('ql-background') ||
                            t.classList.contains('ql-color')
                          ) {
                            var n = t.classList.contains('ql-background')
                              ? 'background'
                              : 'color'
                            return (
                              null == t.querySelector('option') &&
                                A(
                                  t,
                                  m,
                                  'background' === n ? '#ffffff' : '#000000'
                                ),
                              new c.default(t, e[n])
                            )
                          }
                          return (
                            null == t.querySelector('option') &&
                              (t.classList.contains('ql-font')
                                ? A(t, _)
                                : t.classList.contains('ql-header')
                                ? A(t, O)
                                : t.classList.contains('ql-size') && A(t, w)),
                            new p.default(t)
                          )
                        })),
                          this.quill.on(
                            a.default.events.EDITOR_CHANGE,
                            function () {
                              n.pickers.forEach(function (t) {
                                t.update()
                              })
                            }
                          )
                      },
                    },
                  ]),
                  e
                )
              })(s.default)
            x.DEFAULTS = (0, i.default)(!0, {}, s.default.DEFAULTS, {
              modules: {
                toolbar: {
                  handlers: {
                    formula: function () {
                      this.quill.theme.tooltip.edit('formula')
                    },
                    image: function () {
                      var t = this,
                        e = this.container.querySelector(
                          'input.ql-image[type=file]'
                        )
                      null == e &&
                        ((e = document.createElement('input')).setAttribute(
                          'type',
                          'file'
                        ),
                        e.setAttribute(
                          'accept',
                          'image/png, image/gif, image/jpeg, image/bmp, image/x-icon'
                        ),
                        e.classList.add('ql-image'),
                        e.addEventListener('change', function () {
                          if (null != e.files && null != e.files[0]) {
                            var n = new FileReader()
                            ;(n.onload = function (n) {
                              var r = t.quill.getSelection(!0)
                              t.quill.updateContents(
                                new l.default()
                                  .retain(r.index)
                                  .delete(r.length)
                                  .insert({ image: n.target.result }),
                                a.default.sources.USER
                              ),
                                t.quill.setSelection(
                                  r.index + 1,
                                  a.default.sources.SILENT
                                ),
                                (e.value = '')
                            }),
                              n.readAsDataURL(e.files[0])
                          }
                        }),
                        this.container.appendChild(e)),
                        e.click()
                    },
                    video: function () {
                      this.quill.theme.tooltip.edit('video')
                    },
                  },
                },
              },
            })
            var E = (function (t) {
              function e(t, n) {
                y(this, e)
                var r = v(
                  this,
                  (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
                )
                return (
                  (r.textbox = r.root.querySelector('input[type="text"]')),
                  r.listen(),
                  r
                )
              }
              return (
                b(e, t),
                r(e, [
                  {
                    key: 'listen',
                    value: function () {
                      var t = this
                      this.textbox.addEventListener('keydown', function (e) {
                        u.default.match(e, 'enter')
                          ? (t.save(), e.preventDefault())
                          : u.default.match(e, 'escape') &&
                            (t.cancel(), e.preventDefault())
                      })
                    },
                  },
                  {
                    key: 'cancel',
                    value: function () {
                      this.hide()
                    },
                  },
                  {
                    key: 'edit',
                    value: function () {
                      var t =
                          arguments.length > 0 && void 0 !== arguments[0]
                            ? arguments[0]
                            : 'link',
                        e =
                          arguments.length > 1 && void 0 !== arguments[1]
                            ? arguments[1]
                            : null
                      this.root.classList.remove('ql-hidden'),
                        this.root.classList.add('ql-editing'),
                        null != e
                          ? (this.textbox.value = e)
                          : t !== this.root.getAttribute('data-mode') &&
                            (this.textbox.value = ''),
                        this.position(
                          this.quill.getBounds(this.quill.selection.savedRange)
                        ),
                        this.textbox.select(),
                        this.textbox.setAttribute(
                          'placeholder',
                          this.textbox.getAttribute('data-' + t) || ''
                        ),
                        this.root.setAttribute('data-mode', t)
                    },
                  },
                  {
                    key: 'restoreFocus',
                    value: function () {
                      var t = this.quill.scrollingContainer.scrollTop
                      this.quill.focus(),
                        (this.quill.scrollingContainer.scrollTop = t)
                    },
                  },
                  {
                    key: 'save',
                    value: function () {
                      var t,
                        e,
                        n = this.textbox.value
                      switch (this.root.getAttribute('data-mode')) {
                        case 'link':
                          var r = this.quill.root.scrollTop
                          this.linkRange
                            ? (this.quill.formatText(
                                this.linkRange,
                                'link',
                                n,
                                a.default.sources.USER
                              ),
                              delete this.linkRange)
                            : (this.restoreFocus(),
                              this.quill.format(
                                'link',
                                n,
                                a.default.sources.USER
                              )),
                            (this.quill.root.scrollTop = r)
                          break
                        case 'video':
                          ;(e =
                            (t = n).match(
                              /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/
                            ) ||
                            t.match(
                              /^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/
                            )),
                            (n = e
                              ? (e[1] || 'https') +
                                '://www.youtube.com/embed/' +
                                e[2] +
                                '?showinfo=0'
                              : (e = t.match(
                                  /^(?:(https?):\/\/)?(?:www\.)?vimeo\.com\/(\d+)/
                                ))
                              ? (e[1] || 'https') +
                                '://player.vimeo.com/video/' +
                                e[2] +
                                '/'
                              : t)
                        case 'formula':
                          if (!n) break
                          var o = this.quill.getSelection(!0)
                          if (null != o) {
                            var i = o.index + o.length
                            this.quill.insertEmbed(
                              i,
                              this.root.getAttribute('data-mode'),
                              n,
                              a.default.sources.USER
                            ),
                              'formula' ===
                                this.root.getAttribute('data-mode') &&
                                this.quill.insertText(
                                  i + 1,
                                  ' ',
                                  a.default.sources.USER
                                ),
                              this.quill.setSelection(
                                i + 2,
                                a.default.sources.USER
                              )
                          }
                      }
                      ;(this.textbox.value = ''), this.hide()
                    },
                  },
                ]),
                e
              )
            })(h.default)
            function A(t, e) {
              var n =
                arguments.length > 2 && void 0 !== arguments[2] && arguments[2]
              e.forEach(function (e) {
                var r = document.createElement('option')
                e === n
                  ? r.setAttribute('selected', 'selected')
                  : r.setAttribute('value', e),
                  t.appendChild(r)
              })
            }
            ;(e.BaseTooltip = E), (e.default = x)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = (function () {
              function t() {
                ;(this.head = this.tail = null), (this.length = 0)
              }
              return (
                (t.prototype.append = function () {
                  for (var t = [], e = 0; e < arguments.length; e++)
                    t[e] = arguments[e]
                  this.insertBefore(t[0], null),
                    t.length > 1 && this.append.apply(this, t.slice(1))
                }),
                (t.prototype.contains = function (t) {
                  for (var e, n = this.iterator(); (e = n()); )
                    if (e === t) return !0
                  return !1
                }),
                (t.prototype.insertBefore = function (t, e) {
                  t &&
                    ((t.next = e),
                    null != e
                      ? ((t.prev = e.prev),
                        null != e.prev && (e.prev.next = t),
                        (e.prev = t),
                        e === this.head && (this.head = t))
                      : null != this.tail
                      ? ((this.tail.next = t),
                        (t.prev = this.tail),
                        (this.tail = t))
                      : ((t.prev = null), (this.head = this.tail = t)),
                    (this.length += 1))
                }),
                (t.prototype.offset = function (t) {
                  for (var e = 0, n = this.head; null != n; ) {
                    if (n === t) return e
                    ;(e += n.length()), (n = n.next)
                  }
                  return -1
                }),
                (t.prototype.remove = function (t) {
                  this.contains(t) &&
                    (null != t.prev && (t.prev.next = t.next),
                    null != t.next && (t.next.prev = t.prev),
                    t === this.head && (this.head = t.next),
                    t === this.tail && (this.tail = t.prev),
                    (this.length -= 1))
                }),
                (t.prototype.iterator = function (t) {
                  return (
                    void 0 === t && (t = this.head),
                    function () {
                      var e = t
                      return null != t && (t = t.next), e
                    }
                  )
                }),
                (t.prototype.find = function (t, e) {
                  void 0 === e && (e = !1)
                  for (var n, r = this.iterator(); (n = r()); ) {
                    var o = n.length()
                    if (
                      t < o ||
                      (e &&
                        t === o &&
                        (null == n.next || 0 !== n.next.length()))
                    )
                      return [n, t]
                    t -= o
                  }
                  return [null, 0]
                }),
                (t.prototype.forEach = function (t) {
                  for (var e, n = this.iterator(); (e = n()); ) t(e)
                }),
                (t.prototype.forEachAt = function (t, e, n) {
                  if (!(e <= 0))
                    for (
                      var r,
                        o = this.find(t),
                        i = t - o[1],
                        l = this.iterator(o[0]);
                      (r = l()) && i < t + e;

                    ) {
                      var a = r.length()
                      t > i
                        ? n(r, t - i, Math.min(e, i + a - t))
                        : n(r, 0, Math.min(a, t + e - i)),
                        (i += a)
                    }
                }),
                (t.prototype.map = function (t) {
                  return this.reduce(function (e, n) {
                    return e.push(t(n)), e
                  }, [])
                }),
                (t.prototype.reduce = function (t, e) {
                  for (var n, r = this.iterator(); (n = r()); ) e = t(e, n)
                  return e
                }),
                t
              )
            })()
            e.default = r
          },
          function (t, e, n) {
            var r,
              o =
                (this && this.__extends) ||
                ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  }),
                function (t, e) {
                  function n() {
                    this.constructor = t
                  }
                  r(t, e),
                    (t.prototype =
                      null === e
                        ? Object.create(e)
                        : ((n.prototype = e.prototype), new n()))
                })
            Object.defineProperty(e, '__esModule', { value: !0 })
            var i = n(20),
              l = n(1),
              a = {
                attributes: !0,
                characterData: !0,
                characterDataOldValue: !0,
                childList: !0,
                subtree: !0,
              },
              u = (function (t) {
                function e(e) {
                  var n = t.call(this, e) || this
                  return (
                    (n.scroll = n),
                    (n.observer = new MutationObserver(function (t) {
                      n.update(t)
                    })),
                    n.observer.observe(n.domNode, a),
                    n.attach(),
                    n
                  )
                }
                return (
                  o(e, t),
                  (e.prototype.detach = function () {
                    t.prototype.detach.call(this), this.observer.disconnect()
                  }),
                  (e.prototype.deleteAt = function (e, n) {
                    this.update(),
                      0 === e && n === this.length()
                        ? this.children.forEach(function (t) {
                            t.remove()
                          })
                        : t.prototype.deleteAt.call(this, e, n)
                  }),
                  (e.prototype.formatAt = function (e, n, r, o) {
                    this.update(), t.prototype.formatAt.call(this, e, n, r, o)
                  }),
                  (e.prototype.insertAt = function (e, n, r) {
                    this.update(), t.prototype.insertAt.call(this, e, n, r)
                  }),
                  (e.prototype.optimize = function (e, n) {
                    var r = this
                    void 0 === e && (e = []),
                      void 0 === n && (n = {}),
                      t.prototype.optimize.call(this, n)
                    for (
                      var o = [].slice.call(this.observer.takeRecords());
                      o.length > 0;

                    )
                      e.push(o.pop())
                    for (
                      var a = function (t, e) {
                          void 0 === e && (e = !0),
                            null != t &&
                              t !== r &&
                              null != t.domNode.parentNode &&
                              (null == t.domNode[l.DATA_KEY].mutations &&
                                (t.domNode[l.DATA_KEY].mutations = []),
                              e && a(t.parent))
                        },
                        u = function (t) {
                          null != t.domNode[l.DATA_KEY] &&
                            null != t.domNode[l.DATA_KEY].mutations &&
                            (t instanceof i.default && t.children.forEach(u),
                            t.optimize(n))
                        },
                        s = e,
                        c = 0;
                      s.length > 0;
                      c += 1
                    ) {
                      if (c >= 100)
                        throw new Error(
                          '[Parchment] Maximum optimize iterations reached'
                        )
                      for (
                        s.forEach(function (t) {
                          var e = l.find(t.target, !0)
                          null != e &&
                            (e.domNode === t.target &&
                              ('childList' === t.type
                                ? (a(l.find(t.previousSibling, !1)),
                                  [].forEach.call(t.addedNodes, function (t) {
                                    var e = l.find(t, !1)
                                    a(e, !1),
                                      e instanceof i.default &&
                                        e.children.forEach(function (t) {
                                          a(t, !1)
                                        })
                                  }))
                                : 'attributes' === t.type && a(e.prev)),
                            a(e))
                        }),
                          this.children.forEach(u),
                          o = (s = [].slice.call(
                            this.observer.takeRecords()
                          )).slice();
                        o.length > 0;

                      )
                        e.push(o.pop())
                    }
                  }),
                  (e.prototype.update = function (e, n) {
                    var r = this
                    void 0 === n && (n = {}),
                      (e = e || this.observer.takeRecords())
                        .map(function (t) {
                          var e = l.find(t.target, !0)
                          return null == e
                            ? null
                            : null == e.domNode[l.DATA_KEY].mutations
                            ? ((e.domNode[l.DATA_KEY].mutations = [t]), e)
                            : (e.domNode[l.DATA_KEY].mutations.push(t), null)
                        })
                        .forEach(function (t) {
                          null != t &&
                            t !== r &&
                            null != t.domNode[l.DATA_KEY] &&
                            t.update(t.domNode[l.DATA_KEY].mutations || [], n)
                        }),
                      null != this.domNode[l.DATA_KEY].mutations &&
                        t.prototype.update.call(
                          this,
                          this.domNode[l.DATA_KEY].mutations,
                          n
                        ),
                      this.optimize(e, n)
                  }),
                  (e.blotName = 'scroll'),
                  (e.defaultChild = 'block'),
                  (e.scope = l.Scope.BLOCK_BLOT),
                  (e.tagName = 'DIV'),
                  e
                )
              })(i.default)
            e.default = u
          },
          function (t, e, n) {
            var r,
              o =
                (this && this.__extends) ||
                ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  }),
                function (t, e) {
                  function n() {
                    this.constructor = t
                  }
                  r(t, e),
                    (t.prototype =
                      null === e
                        ? Object.create(e)
                        : ((n.prototype = e.prototype), new n()))
                })
            Object.defineProperty(e, '__esModule', { value: !0 })
            var i = n(21),
              l = n(1),
              a = (function (t) {
                function e() {
                  return (null !== t && t.apply(this, arguments)) || this
                }
                return (
                  o(e, t),
                  (e.formats = function (n) {
                    if (n.tagName !== e.tagName) return t.formats.call(this, n)
                  }),
                  (e.prototype.format = function (n, r) {
                    var o = this
                    n !== this.statics.blotName || r
                      ? t.prototype.format.call(this, n, r)
                      : (this.children.forEach(function (t) {
                          t instanceof i.default ||
                            (t = t.wrap(e.blotName, !0)),
                            o.attributes.copy(t)
                        }),
                        this.unwrap())
                  }),
                  (e.prototype.formatAt = function (e, n, r, o) {
                    null != this.formats()[r] || l.query(r, l.Scope.ATTRIBUTE)
                      ? this.isolate(e, n).format(r, o)
                      : t.prototype.formatAt.call(this, e, n, r, o)
                  }),
                  (e.prototype.optimize = function (n) {
                    t.prototype.optimize.call(this, n)
                    var r = this.formats()
                    if (0 === Object.keys(r).length) return this.unwrap()
                    var o = this.next
                    o instanceof e &&
                      o.prev === this &&
                      (function (t, e) {
                        if (Object.keys(t).length !== Object.keys(e).length)
                          return !1
                        for (var n in t) if (t[n] !== e[n]) return !1
                        return !0
                      })(r, o.formats()) &&
                      (o.moveChildren(this), o.remove())
                  }),
                  (e.blotName = 'inline'),
                  (e.scope = l.Scope.INLINE_BLOT),
                  (e.tagName = 'SPAN'),
                  e
                )
              })(i.default)
            e.default = a
          },
          function (t, e, n) {
            var r,
              o =
                (this && this.__extends) ||
                ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  }),
                function (t, e) {
                  function n() {
                    this.constructor = t
                  }
                  r(t, e),
                    (t.prototype =
                      null === e
                        ? Object.create(e)
                        : ((n.prototype = e.prototype), new n()))
                })
            Object.defineProperty(e, '__esModule', { value: !0 })
            var i = n(21),
              l = n(1),
              a = (function (t) {
                function e() {
                  return (null !== t && t.apply(this, arguments)) || this
                }
                return (
                  o(e, t),
                  (e.formats = function (n) {
                    var r = l.query(e.blotName).tagName
                    if (n.tagName !== r) return t.formats.call(this, n)
                  }),
                  (e.prototype.format = function (n, r) {
                    null != l.query(n, l.Scope.BLOCK) &&
                      (n !== this.statics.blotName || r
                        ? t.prototype.format.call(this, n, r)
                        : this.replaceWith(e.blotName))
                  }),
                  (e.prototype.formatAt = function (e, n, r, o) {
                    null != l.query(r, l.Scope.BLOCK)
                      ? this.format(r, o)
                      : t.prototype.formatAt.call(this, e, n, r, o)
                  }),
                  (e.prototype.insertAt = function (e, n, r) {
                    if (null == r || null != l.query(n, l.Scope.INLINE))
                      t.prototype.insertAt.call(this, e, n, r)
                    else {
                      var o = this.split(e),
                        i = l.create(n, r)
                      o.parent.insertBefore(i, o)
                    }
                  }),
                  (e.prototype.update = function (e, n) {
                    navigator.userAgent.match(/Trident/)
                      ? this.build()
                      : t.prototype.update.call(this, e, n)
                  }),
                  (e.blotName = 'block'),
                  (e.scope = l.Scope.BLOCK_BLOT),
                  (e.tagName = 'P'),
                  e
                )
              })(i.default)
            e.default = a
          },
          function (t, e, n) {
            var r,
              o =
                (this && this.__extends) ||
                ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  }),
                function (t, e) {
                  function n() {
                    this.constructor = t
                  }
                  r(t, e),
                    (t.prototype =
                      null === e
                        ? Object.create(e)
                        : ((n.prototype = e.prototype), new n()))
                })
            Object.defineProperty(e, '__esModule', { value: !0 })
            var i = (function (t) {
              function e() {
                return (null !== t && t.apply(this, arguments)) || this
              }
              return (
                o(e, t),
                (e.formats = function (t) {}),
                (e.prototype.format = function (e, n) {
                  t.prototype.formatAt.call(this, 0, this.length(), e, n)
                }),
                (e.prototype.formatAt = function (e, n, r, o) {
                  0 === e && n === this.length()
                    ? this.format(r, o)
                    : t.prototype.formatAt.call(this, e, n, r, o)
                }),
                (e.prototype.formats = function () {
                  return this.statics.formats(this.domNode)
                }),
                e
              )
            })(n(22).default)
            e.default = i
          },
          function (t, e, n) {
            var r,
              o =
                (this && this.__extends) ||
                ((r =
                  Object.setPrototypeOf ||
                  ({ __proto__: [] } instanceof Array &&
                    function (t, e) {
                      t.__proto__ = e
                    }) ||
                  function (t, e) {
                    for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n])
                  }),
                function (t, e) {
                  function n() {
                    this.constructor = t
                  }
                  r(t, e),
                    (t.prototype =
                      null === e
                        ? Object.create(e)
                        : ((n.prototype = e.prototype), new n()))
                })
            Object.defineProperty(e, '__esModule', { value: !0 })
            var i = n(22),
              l = n(1),
              a = (function (t) {
                function e(e) {
                  var n = t.call(this, e) || this
                  return (n.text = n.statics.value(n.domNode)), n
                }
                return (
                  o(e, t),
                  (e.create = function (t) {
                    return document.createTextNode(t)
                  }),
                  (e.value = function (t) {
                    return t.data
                  }),
                  (e.prototype.deleteAt = function (t, e) {
                    this.domNode.data = this.text =
                      this.text.slice(0, t) + this.text.slice(t + e)
                  }),
                  (e.prototype.index = function (t, e) {
                    return this.domNode === t ? e : -1
                  }),
                  (e.prototype.insertAt = function (e, n, r) {
                    null == r
                      ? ((this.text =
                          this.text.slice(0, e) + n + this.text.slice(e)),
                        (this.domNode.data = this.text))
                      : t.prototype.insertAt.call(this, e, n, r)
                  }),
                  (e.prototype.length = function () {
                    return this.text.length
                  }),
                  (e.prototype.optimize = function (n) {
                    t.prototype.optimize.call(this, n),
                      (this.text = this.statics.value(this.domNode)),
                      0 === this.text.length
                        ? this.remove()
                        : this.next instanceof e &&
                          this.next.prev === this &&
                          (this.insertAt(this.length(), this.next.value()),
                          this.next.remove())
                  }),
                  (e.prototype.position = function (t, e) {
                    return [this.domNode, t]
                  }),
                  (e.prototype.split = function (t, e) {
                    if ((void 0 === e && (e = !1), !e)) {
                      if (0 === t) return this
                      if (t === this.length()) return this.next
                    }
                    var n = l.create(this.domNode.splitText(t))
                    return (
                      this.parent.insertBefore(n, this.next),
                      (this.text = this.statics.value(this.domNode)),
                      n
                    )
                  }),
                  (e.prototype.update = function (t, e) {
                    var n = this
                    t.some(function (t) {
                      return (
                        'characterData' === t.type && t.target === n.domNode
                      )
                    }) && (this.text = this.statics.value(this.domNode))
                  }),
                  (e.prototype.value = function () {
                    return this.text
                  }),
                  (e.blotName = 'text'),
                  (e.scope = l.Scope.INLINE_BLOT),
                  e
                )
              })(i.default)
            e.default = a
          },
          function (t, e, n) {
            var r = document.createElement('div')
            if (
              (r.classList.toggle('test-class', !1),
              r.classList.contains('test-class'))
            ) {
              var o = DOMTokenList.prototype.toggle
              DOMTokenList.prototype.toggle = function (t, e) {
                return arguments.length > 1 && !this.contains(t) == !e
                  ? e
                  : o.call(this, t)
              }
            }
            String.prototype.startsWith ||
              (String.prototype.startsWith = function (t, e) {
                return this.substr((e = e || 0), t.length) === t
              }),
              String.prototype.endsWith ||
                (String.prototype.endsWith = function (t, e) {
                  var n = this.toString()
                  ;('number' != typeof e ||
                    !isFinite(e) ||
                    Math.floor(e) !== e ||
                    e > n.length) &&
                    (e = n.length)
                  var r = n.indexOf(t, (e -= t.length))
                  return -1 !== r && r === e
                }),
              Array.prototype.find ||
                Object.defineProperty(Array.prototype, 'find', {
                  value: function (t) {
                    if (null === this)
                      throw new TypeError(
                        'Array.prototype.find called on null or undefined'
                      )
                    if ('function' != typeof t)
                      throw new TypeError('predicate must be a function')
                    for (
                      var e,
                        n = Object(this),
                        r = n.length >>> 0,
                        o = arguments[1],
                        i = 0;
                      i < r;
                      i++
                    )
                      if (((e = n[i]), t.call(o, e, i, n))) return e
                  },
                }),
              document.addEventListener('DOMContentLoaded', function () {
                document.execCommand('enableObjectResizing', !1, !1),
                  document.execCommand('autoUrlDetect', !1, !1)
              })
          },
          function (t, e) {
            var n = -1
            function r(t, e, u) {
              if (t == e) return t ? [[0, t]] : []
              ;(u < 0 || t.length < u) && (u = null)
              var c = i(t, e),
                f = t.substring(0, c)
              c = l((t = t.substring(c)), (e = e.substring(c)))
              var p = t.substring(t.length - c),
                h = (function (t, e) {
                  var a
                  if (!t) return [[1, e]]
                  if (!e) return [[n, t]]
                  var u = t.length > e.length ? t : e,
                    s = t.length > e.length ? e : t,
                    c = u.indexOf(s)
                  if (-1 != c)
                    return (
                      (a = [
                        [1, u.substring(0, c)],
                        [0, s],
                        [1, u.substring(c + s.length)],
                      ]),
                      t.length > e.length && (a[0][0] = a[2][0] = n),
                      a
                    )
                  if (1 == s.length)
                    return [
                      [n, t],
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
                          a,
                          u,
                          s = t.substring(n, n + Math.floor(t.length / 4)),
                          c = -1,
                          f = '';
                        -1 != (c = e.indexOf(s, c + 1));

                      ) {
                        var p = i(t.substring(n), e.substring(c)),
                          h = l(t.substring(0, n), e.substring(0, c))
                        f.length < h + p &&
                          ((f = e.substring(c - h, c) + e.substring(c, c + p)),
                          (r = t.substring(0, n - h)),
                          (o = t.substring(n + p)),
                          (a = e.substring(0, c - h)),
                          (u = e.substring(c + p)))
                      }
                      return 2 * f.length >= t.length ? [r, o, a, u, f] : null
                    }
                    var a,
                      u,
                      s,
                      c,
                      f,
                      p = o(n, r, Math.ceil(n.length / 4)),
                      h = o(n, r, Math.ceil(n.length / 2))
                    return p || h
                      ? ((a = h ? (p && p[4].length > h[4].length ? p : h) : p),
                        t.length > e.length
                          ? ((u = a[0]), (s = a[1]), (c = a[2]), (f = a[3]))
                          : ((c = a[0]), (f = a[1]), (u = a[2]), (s = a[3])),
                        [u, s, c, f, a[4]])
                      : null
                  })(t, e)
                  if (f) {
                    var p = f[1],
                      h = f[3],
                      d = f[4],
                      y = r(f[0], f[2]),
                      v = r(p, h)
                    return y.concat([[0, d]], v)
                  }
                  return (function (t, e) {
                    for (
                      var r = t.length,
                        i = e.length,
                        l = Math.ceil((r + i) / 2),
                        a = l,
                        u = 2 * l,
                        s = new Array(u),
                        c = new Array(u),
                        f = 0;
                      f < u;
                      f++
                    )
                      (s[f] = -1), (c[f] = -1)
                    ;(s[a + 1] = 0), (c[a + 1] = 0)
                    for (
                      var p = r - i,
                        h = p % 2 != 0,
                        d = 0,
                        y = 0,
                        v = 0,
                        b = 0,
                        g = 0;
                      g < l;
                      g++
                    ) {
                      for (var m = -g + d; m <= g - y; m += 2) {
                        for (
                          var _ = a + m,
                            O =
                              (k =
                                m == -g || (m != g && s[_ - 1] < s[_ + 1])
                                  ? s[_ + 1]
                                  : s[_ - 1] + 1) - m;
                          k < r && O < i && t.charAt(k) == e.charAt(O);

                        )
                          k++, O++
                        if (((s[_] = k), k > r)) y += 2
                        else if (O > i) d += 2
                        else if (
                          h &&
                          (E = a + p - m) >= 0 &&
                          E < u &&
                          -1 != c[E] &&
                          k >= (x = r - c[E])
                        )
                          return o(t, e, k, O)
                      }
                      for (var w = -g + v; w <= g - b; w += 2) {
                        for (
                          var x,
                            E = a + w,
                            A =
                              (x =
                                w == -g || (w != g && c[E - 1] < c[E + 1])
                                  ? c[E + 1]
                                  : c[E - 1] + 1) - w;
                          x < r &&
                          A < i &&
                          t.charAt(r - x - 1) == e.charAt(i - A - 1);

                        )
                          x++, A++
                        if (((c[E] = x), x > r)) b += 2
                        else if (A > i) v += 2
                        else if (!h) {
                          var k
                          if ((_ = a + p - w) >= 0 && _ < u && -1 != s[_])
                            if (((O = a + (k = s[_]) - _), k >= (x = r - x)))
                              return o(t, e, k, O)
                        }
                      }
                    }
                    return [
                      [n, t],
                      [1, e],
                    ]
                  })(t, e)
                })(
                  (t = t.substring(0, t.length - c)),
                  (e = e.substring(0, e.length - c))
                )
              return (
                f && h.unshift([0, f]),
                p && h.push([0, p]),
                a(h),
                null != u &&
                  (h = (function (t, e) {
                    var r = (function (t, e) {
                        if (0 === e) return [0, t]
                        for (var r = 0, o = 0; o < t.length; o++) {
                          var i = t[o]
                          if (i[0] === n || 0 === i[0]) {
                            var l = r + i[1].length
                            if (e === l) return [o + 1, t]
                            if (e < l) {
                              t = t.slice()
                              var a = e - r,
                                u = [i[0], i[1].slice(0, a)],
                                s = [i[0], i[1].slice(a)]
                              return t.splice(o, 1, u, s), [o + 1, t]
                            }
                            r = l
                          }
                        }
                        throw new Error('cursor_pos is out of bounds!')
                      })(t, e),
                      o = r[1],
                      i = r[0],
                      l = o[i],
                      a = o[i + 1]
                    if (null == l) return t
                    if (0 !== l[0]) return t
                    if (null != a && l[1] + a[1] === a[1] + l[1])
                      return o.splice(i, 2, a, l), s(o, i, 2)
                    if (null != a && 0 === a[1].indexOf(l[1])) {
                      o.splice(i, 2, [a[0], l[1]], [0, l[1]])
                      var u = a[1].slice(l[1].length)
                      return (
                        u.length > 0 && o.splice(i + 2, 0, [a[0], u]),
                        s(o, i, 3)
                      )
                    }
                    return t
                  })(h, u)),
                (h = (function (t) {
                  for (
                    var e = !1,
                      r = function (t) {
                        return (
                          t.charCodeAt(0) >= 56320 && t.charCodeAt(0) <= 57343
                        )
                      },
                      o = function (t) {
                        return (
                          t.charCodeAt(t.length - 1) >= 55296 &&
                          t.charCodeAt(t.length - 1) <= 56319
                        )
                      },
                      i = 2;
                    i < t.length;
                    i += 1
                  )
                    0 === t[i - 2][0] &&
                      o(t[i - 2][1]) &&
                      t[i - 1][0] === n &&
                      r(t[i - 1][1]) &&
                      1 === t[i][0] &&
                      r(t[i][1]) &&
                      ((e = !0),
                      (t[i - 1][1] = t[i - 2][1].slice(-1) + t[i - 1][1]),
                      (t[i][1] = t[i - 2][1].slice(-1) + t[i][1]),
                      (t[i - 2][1] = t[i - 2][1].slice(0, -1)))
                  if (!e) return t
                  var l = []
                  for (i = 0; i < t.length; i += 1)
                    t[i][1].length > 0 && l.push(t[i])
                  return l
                })(h)),
                h
              )
            }
            function o(t, e, n, o) {
              var i = t.substring(0, n),
                l = e.substring(0, o),
                a = t.substring(n),
                u = e.substring(o),
                s = r(i, l),
                c = r(a, u)
              return s.concat(c)
            }
            function i(t, e) {
              if (!t || !e || t.charAt(0) != e.charAt(0)) return 0
              for (
                var n = 0, r = Math.min(t.length, e.length), o = r, i = 0;
                n < o;

              )
                t.substring(i, o) == e.substring(i, o) ? (i = n = o) : (r = o),
                  (o = Math.floor((r - n) / 2 + n))
              return o
            }
            function l(t, e) {
              if (!t || !e || t.charAt(t.length - 1) != e.charAt(e.length - 1))
                return 0
              for (
                var n = 0, r = Math.min(t.length, e.length), o = r, i = 0;
                n < o;

              )
                t.substring(t.length - o, t.length - i) ==
                e.substring(e.length - o, e.length - i)
                  ? (i = n = o)
                  : (r = o),
                  (o = Math.floor((r - n) / 2 + n))
              return o
            }
            function a(t) {
              t.push([0, ''])
              for (var e, r = 0, o = 0, u = 0, s = '', c = ''; r < t.length; )
                switch (t[r][0]) {
                  case 1:
                    u++, (c += t[r][1]), r++
                    break
                  case n:
                    o++, (s += t[r][1]), r++
                    break
                  case 0:
                    o + u > 1
                      ? (0 !== o &&
                          0 !== u &&
                          (0 !== (e = i(c, s)) &&
                            (r - o - u > 0 && 0 == t[r - o - u - 1][0]
                              ? (t[r - o - u - 1][1] += c.substring(0, e))
                              : (t.splice(0, 0, [0, c.substring(0, e)]), r++),
                            (c = c.substring(e)),
                            (s = s.substring(e))),
                          0 !== (e = l(c, s)) &&
                            ((t[r][1] = c.substring(c.length - e) + t[r][1]),
                            (c = c.substring(0, c.length - e)),
                            (s = s.substring(0, s.length - e)))),
                        0 === o
                          ? t.splice(r - u, o + u, [1, c])
                          : 0 === u
                          ? t.splice(r - o, o + u, [n, s])
                          : t.splice(r - o - u, o + u, [n, s], [1, c]),
                        (r = r - o - u + (o ? 1 : 0) + (u ? 1 : 0) + 1))
                      : 0 !== r && 0 == t[r - 1][0]
                      ? ((t[r - 1][1] += t[r][1]), t.splice(r, 1))
                      : r++,
                      (u = 0),
                      (o = 0),
                      (s = ''),
                      (c = '')
                }
              '' === t[t.length - 1][1] && t.pop()
              var f = !1
              for (r = 1; r < t.length - 1; )
                0 == t[r - 1][0] &&
                  0 == t[r + 1][0] &&
                  (t[r][1].substring(t[r][1].length - t[r - 1][1].length) ==
                  t[r - 1][1]
                    ? ((t[r][1] =
                        t[r - 1][1] +
                        t[r][1].substring(
                          0,
                          t[r][1].length - t[r - 1][1].length
                        )),
                      (t[r + 1][1] = t[r - 1][1] + t[r + 1][1]),
                      t.splice(r - 1, 1),
                      (f = !0))
                    : t[r][1].substring(0, t[r + 1][1].length) == t[r + 1][1] &&
                      ((t[r - 1][1] += t[r + 1][1]),
                      (t[r][1] =
                        t[r][1].substring(t[r + 1][1].length) + t[r + 1][1]),
                      t.splice(r + 1, 1),
                      (f = !0))),
                  r++
              f && a(t)
            }
            var u = r
            function s(t, e, n) {
              for (var r = e + n - 1; r >= 0 && r >= e - 1; r--)
                if (r + 1 < t.length) {
                  var o = t[r],
                    i = t[r + 1]
                  o[0] === i[1] && t.splice(r, 2, [o[0], o[1] + i[1]])
                }
              return t
            }
            ;(u.INSERT = 1), (u.DELETE = n), (u.EQUAL = 0), (t.exports = u)
          },
          function (t, e, n) {
            var r
            if (!Object.keys) {
              var o = Object.prototype.hasOwnProperty,
                i = Object.prototype.toString,
                l = n(44),
                a = Object.prototype.propertyIsEnumerable,
                u = !a.call({ toString: null }, 'toString'),
                s = a.call(function () {}, 'prototype'),
                c = [
                  'toString',
                  'toLocaleString',
                  'valueOf',
                  'hasOwnProperty',
                  'isPrototypeOf',
                  'propertyIsEnumerable',
                  'constructor',
                ],
                f = function (t) {
                  var e = t.constructor
                  return e && e.prototype === t
                },
                p = {
                  $applicationCache: !0,
                  $console: !0,
                  $external: !0,
                  $frame: !0,
                  $frameElement: !0,
                  $frames: !0,
                  $innerHeight: !0,
                  $innerWidth: !0,
                  $onmozfullscreenchange: !0,
                  $onmozfullscreenerror: !0,
                  $outerHeight: !0,
                  $outerWidth: !0,
                  $pageXOffset: !0,
                  $pageYOffset: !0,
                  $parent: !0,
                  $scrollLeft: !0,
                  $scrollTop: !0,
                  $scrollX: !0,
                  $scrollY: !0,
                  $self: !0,
                  $webkitIndexedDB: !0,
                  $webkitStorageInfo: !0,
                  $window: !0,
                },
                h = (function () {
                  if ('undefined' == typeof window) return !1
                  for (var t in window)
                    try {
                      if (
                        !p['$' + t] &&
                        o.call(window, t) &&
                        null !== window[t] &&
                        'object' == typeof window[t]
                      )
                        try {
                          f(window[t])
                        } catch (e) {
                          return !0
                        }
                    } catch (e) {
                      return !0
                    }
                  return !1
                })()
              r = function (t) {
                var e = null !== t && 'object' == typeof t,
                  n = '[object Function]' === i.call(t),
                  r = l(t),
                  a = e && '[object String]' === i.call(t),
                  p = []
                if (!e && !n && !r)
                  throw new TypeError('Object.keys called on a non-object')
                var d = s && n
                if (a && t.length > 0 && !o.call(t, 0))
                  for (var y = 0; y < t.length; ++y) p.push(String(y))
                if (r && t.length > 0)
                  for (var v = 0; v < t.length; ++v) p.push(String(v))
                else
                  for (var b in t)
                    (d && 'prototype' === b) ||
                      !o.call(t, b) ||
                      p.push(String(b))
                if (u)
                  for (
                    var g = (function (t) {
                        if ('undefined' == typeof window || !h) return f(t)
                        try {
                          return f(t)
                        } catch (e) {
                          return !1
                        }
                      })(t),
                      m = 0;
                    m < c.length;
                    ++m
                  )
                    (g && 'constructor' === c[m]) ||
                      !o.call(t, c[m]) ||
                      p.push(c[m])
                return p
              }
            }
            t.exports = r
          },
          function (t, e, n) {
            var r = n(23)(),
              o = n(46)('Object.prototype.toString'),
              i = function (t) {
                return (
                  !(
                    r &&
                    t &&
                    'object' == typeof t &&
                    Symbol.toStringTag in t
                  ) && '[object Arguments]' === o(t)
                )
              },
              l = function (t) {
                return (
                  !!i(t) ||
                  (null !== t &&
                    'object' == typeof t &&
                    'number' == typeof t.length &&
                    t.length >= 0 &&
                    '[object Array]' !== o(t) &&
                    '[object Function]' === o(t.callee))
                )
              },
              a = (function () {
                return i(arguments)
              })()
            ;(i.isLegacyArguments = l), (t.exports = a ? i : l)
          },
          function (t, e, n) {
            t.exports = Error
          },
          function (t, e, n) {
            t.exports = EvalError
          },
          function (t, e, n) {
            t.exports = RangeError
          },
          function (t, e, n) {
            t.exports = ReferenceError
          },
          function (t, e, n) {
            t.exports = URIError
          },
          function (t, e, n) {
            var r = 'undefined' != typeof Symbol && Symbol,
              o = n(45)
            t.exports = function () {
              return (
                'function' == typeof r &&
                'function' == typeof Symbol &&
                'symbol' == typeof r('foo') &&
                'symbol' == typeof Symbol('bar') &&
                o()
              )
            }
          },
          function (t, e, n) {
            var r = { __proto__: null, foo: {} },
              o = Object
            t.exports = function () {
              return { __proto__: r }.foo === r.foo && !(r instanceof o)
            }
          },
          function (t, e, n) {
            var r = 'Function.prototype.bind called on incompatible ',
              o = Object.prototype.toString,
              i = Math.max,
              l = '[object Function]',
              a = function (t, e) {
                for (var n = [], r = 0; r < t.length; r += 1) n[r] = t[r]
                for (var o = 0; o < e.length; o += 1) n[o + t.length] = e[o]
                return n
              },
              u = function (t, e) {
                for (
                  var n = [], r = e || 0, o = 0;
                  r < t.length;
                  r += 1, o += 1
                )
                  n[o] = t[r]
                return n
              },
              s = function (t, e) {
                for (var n = '', r = 0; r < t.length; r += 1)
                  (n += t[r]), r + 1 < t.length && (n += e)
                return n
              }
            t.exports = function (t) {
              var e = this
              if ('function' != typeof e || o.apply(e) !== l)
                throw new TypeError(r + e)
              for (
                var n,
                  c = u(arguments, 1),
                  f = function () {
                    if (this instanceof n) {
                      var r = e.apply(this, a(c, arguments))
                      return Object(r) === r ? r : this
                    }
                    return e.apply(t, a(c, arguments))
                  },
                  p = i(0, e.length - c.length),
                  h = [],
                  d = 0;
                d < p;
                d++
              )
                h[d] = '$' + d
              if (
                ((n = Function(
                  'binder',
                  'return function (' +
                    s(h, ',') +
                    '){ return binder.apply(this,arguments); }'
                )(f)),
                e.prototype)
              ) {
                var y = function () {}
                ;(y.prototype = e.prototype),
                  (n.prototype = new y()),
                  (y.prototype = null)
              }
              return n
            }
          },
          function (t, e, n) {
            var r = Function.prototype.call,
              o = Object.prototype.hasOwnProperty,
              i = n(24)
            t.exports = i.call(r, o)
          },
          function (t, e, n) {
            var r = n(14),
              o = n(26),
              i = n(28)(),
              l = n(48),
              a = n(7),
              u = r('%Math.floor%')
            t.exports = function (t, e) {
              if ('function' != typeof t) throw new a('`fn` is not a function')
              if ('number' != typeof e || e < 0 || e > 4294967295 || u(e) !== e)
                throw new a('`length` must be a positive 32-bit integer')
              var n = arguments.length > 2 && !!arguments[2],
                r = !0,
                s = !0
              if ('length' in t && l) {
                var c = l(t, 'length')
                c && !c.configurable && (r = !1), c && !c.writable && (s = !1)
              }
              return (
                (r || s || !n) &&
                  (i ? o(t, 'length', e, !0, !0) : o(t, 'length', e)),
                t
              )
            }
          },
          function (t, e, n) {
            var r = n(15),
              o = n(25),
              i = n(49),
              l = n(50),
              a = n(84),
              u = o(l(), Object)
            r(u, { getPolyfill: l, implementation: i, shim: a }),
              (t.exports = u)
          },
          function (t, e, n) {
            var r = n(50),
              o = n(15)
            t.exports = function () {
              var t = r()
              return (
                o(
                  Object,
                  { is: t },
                  {
                    is: function () {
                      return Object.is !== t
                    },
                  }
                ),
                t
              )
            }
          },
          function (t, e, n) {
            var r,
              o,
              i,
              l,
              a = n(46),
              u = n(23)()
            if (u) {
              ;(r = a('Object.prototype.hasOwnProperty')),
                (o = a('RegExp.prototype.exec')),
                (i = {})
              var s = function () {
                throw i
              }
              ;(l = { toString: s, valueOf: s }),
                'symbol' == typeof Symbol.toPrimitive &&
                  (l[Symbol.toPrimitive] = s)
            }
            var c = a('Object.prototype.toString'),
              f = Object.getOwnPropertyDescriptor
            t.exports = u
              ? function (t) {
                  if (!t || 'object' != typeof t) return !1
                  var e = f(t, 'lastIndex')
                  if (!e || !r(e, 'value')) return !1
                  try {
                    o(t, l)
                  } catch (n) {
                    return n === i
                  }
                }
              : function (t) {
                  return (
                    !(!t || ('object' != typeof t && 'function' != typeof t)) &&
                    '[object RegExp]' === c(t)
                  )
                }
          },
          function (t, e, n) {
            var r = n(15),
              o = n(25),
              i = n(51),
              l = n(52),
              a = n(89),
              u = o(l())
            r(u, { getPolyfill: l, implementation: i, shim: a }),
              (t.exports = u)
          },
          function (t, e, n) {
            var r = n(26),
              o = n(28)(),
              i = n(88).functionsHaveConfigurableNames(),
              l = n(7)
            t.exports = function (t, e) {
              if ('function' != typeof t) throw new l('`fn` is not a function')
              var n = arguments.length > 2 && !!arguments[2]
              return (
                (n && !i) || (o ? r(t, 'name', e, !0, !0) : r(t, 'name', e)), t
              )
            }
          },
          function (t, e, n) {
            var r = function () {
                return 'string' == typeof function () {}.name
              },
              o = Object.getOwnPropertyDescriptor
            if (o)
              try {
                o([], 'length')
              } catch (l) {
                o = null
              }
            r.functionsHaveConfigurableNames = function () {
              if (!r() || !o) return !1
              var t = o(function () {}, 'name')
              return !!t && !!t.configurable
            }
            var i = Function.prototype.bind
            ;(r.boundFunctionsHaveNames = function () {
              return (
                r() &&
                'function' == typeof i &&
                '' !== function () {}.bind().name
              )
            }),
              (t.exports = r)
          },
          function (t, e, n) {
            var r = n(15).supportsDescriptors,
              o = n(52),
              i = Object.getOwnPropertyDescriptor,
              l = Object.defineProperty,
              a = TypeError,
              u = Object.getPrototypeOf,
              s = /a/
            t.exports = function () {
              if (!r || !u)
                throw new a(
                  'RegExp.prototype.flags requires a true ES5 environment that supports property descriptors'
                )
              var t = o(),
                e = u(s),
                n = i(e, 'flags')
              return (
                (n && n.get === t) ||
                  l(e, 'flags', { configurable: !0, enumerable: !1, get: t }),
                t
              )
            }
          },
          function (t, e, n) {
            var r = Date.prototype.getDay,
              o = Object.prototype.toString,
              i = n(23)()
            t.exports = function (t) {
              return (
                'object' == typeof t &&
                null !== t &&
                (i
                  ? (function (t) {
                      try {
                        return r.call(t), !0
                      } catch (e) {
                        return !1
                      }
                    })(t)
                  : '[object Date]' === o.call(t))
              )
            }
          },
          function (t, e) {
            var n = Object.prototype.hasOwnProperty,
              r = '~'
            function o() {}
            function i(t, e, n) {
              ;(this.fn = t), (this.context = e), (this.once = n || !1)
            }
            function l() {
              ;(this._events = new o()), (this._eventsCount = 0)
            }
            Object.create &&
              ((o.prototype = Object.create(null)),
              new o().__proto__ || (r = !1)),
              (l.prototype.eventNames = function () {
                var t,
                  e,
                  o = []
                if (0 === this._eventsCount) return o
                for (e in (t = this._events))
                  n.call(t, e) && o.push(r ? e.slice(1) : e)
                return Object.getOwnPropertySymbols
                  ? o.concat(Object.getOwnPropertySymbols(t))
                  : o
              }),
              (l.prototype.listeners = function (t, e) {
                var n = this._events[r ? r + t : t]
                if (e) return !!n
                if (!n) return []
                if (n.fn) return [n.fn]
                for (var o = 0, i = n.length, l = new Array(i); o < i; o++)
                  l[o] = n[o].fn
                return l
              }),
              (l.prototype.emit = function (t, e, n, o, i, l) {
                var a = r ? r + t : t
                if (!this._events[a]) return !1
                var u,
                  s,
                  c = this._events[a],
                  f = arguments.length
                if (c.fn) {
                  switch (
                    (c.once && this.removeListener(t, c.fn, void 0, !0), f)
                  ) {
                    case 1:
                      return c.fn.call(c.context), !0
                    case 2:
                      return c.fn.call(c.context, e), !0
                    case 3:
                      return c.fn.call(c.context, e, n), !0
                    case 4:
                      return c.fn.call(c.context, e, n, o), !0
                    case 5:
                      return c.fn.call(c.context, e, n, o, i), !0
                    case 6:
                      return c.fn.call(c.context, e, n, o, i, l), !0
                  }
                  for (s = 1, u = new Array(f - 1); s < f; s++)
                    u[s - 1] = arguments[s]
                  c.fn.apply(c.context, u)
                } else {
                  var p,
                    h = c.length
                  for (s = 0; s < h; s++)
                    switch (
                      (c[s].once && this.removeListener(t, c[s].fn, void 0, !0),
                      f)
                    ) {
                      case 1:
                        c[s].fn.call(c[s].context)
                        break
                      case 2:
                        c[s].fn.call(c[s].context, e)
                        break
                      case 3:
                        c[s].fn.call(c[s].context, e, n)
                        break
                      case 4:
                        c[s].fn.call(c[s].context, e, n, o)
                        break
                      default:
                        if (!u)
                          for (p = 1, u = new Array(f - 1); p < f; p++)
                            u[p - 1] = arguments[p]
                        c[s].fn.apply(c[s].context, u)
                    }
                }
                return !0
              }),
              (l.prototype.on = function (t, e, n) {
                var o = new i(e, n || this),
                  l = r ? r + t : t
                return (
                  this._events[l]
                    ? this._events[l].fn
                      ? (this._events[l] = [this._events[l], o])
                      : this._events[l].push(o)
                    : ((this._events[l] = o), this._eventsCount++),
                  this
                )
              }),
              (l.prototype.once = function (t, e, n) {
                var o = new i(e, n || this, !0),
                  l = r ? r + t : t
                return (
                  this._events[l]
                    ? this._events[l].fn
                      ? (this._events[l] = [this._events[l], o])
                      : this._events[l].push(o)
                    : ((this._events[l] = o), this._eventsCount++),
                  this
                )
              }),
              (l.prototype.removeListener = function (t, e, n, i) {
                var l = r ? r + t : t
                if (!this._events[l]) return this
                if (!e)
                  return (
                    0 == --this._eventsCount
                      ? (this._events = new o())
                      : delete this._events[l],
                    this
                  )
                var a = this._events[l]
                if (a.fn)
                  a.fn !== e ||
                    (i && !a.once) ||
                    (n && a.context !== n) ||
                    (0 == --this._eventsCount
                      ? (this._events = new o())
                      : delete this._events[l])
                else {
                  for (var u = 0, s = [], c = a.length; u < c; u++)
                    (a[u].fn !== e ||
                      (i && !a[u].once) ||
                      (n && a[u].context !== n)) &&
                      s.push(a[u])
                  s.length
                    ? (this._events[l] = 1 === s.length ? s[0] : s)
                    : 0 == --this._eventsCount
                    ? (this._events = new o())
                    : delete this._events[l]
                }
                return this
              }),
              (l.prototype.removeAllListeners = function (t) {
                var e
                return (
                  t
                    ? this._events[(e = r ? r + t : t)] &&
                      (0 == --this._eventsCount
                        ? (this._events = new o())
                        : delete this._events[e])
                    : ((this._events = new o()), (this._eventsCount = 0)),
                  this
                )
              }),
              (l.prototype.off = l.prototype.removeListener),
              (l.prototype.addListener = l.prototype.on),
              (l.prototype.setMaxListeners = function () {
                return this
              }),
              (l.prefixed = r),
              (l.EventEmitter = l),
              void 0 !== t && (t.exports = l)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.matchText =
                e.matchSpacing =
                e.matchNewline =
                e.matchBlot =
                e.matchAttributor =
                e.default =
                  void 0)
            var r =
                'function' == typeof Symbol &&
                'symbol' == typeof Symbol.iterator
                  ? function (t) {
                      return typeof t
                    }
                  : function (t) {
                      return t &&
                        'function' == typeof Symbol &&
                        t.constructor === Symbol &&
                        t !== Symbol.prototype
                        ? 'symbol'
                        : typeof t
                    },
              o = function (t, e) {
                if (Array.isArray(t)) return t
                if (Symbol.iterator in Object(t))
                  return (function (t, e) {
                    var n = [],
                      r = !0,
                      o = !1,
                      i = void 0
                    try {
                      for (
                        var l, a = t[Symbol.iterator]();
                        !(r = (l = a.next()).done) &&
                        (n.push(l.value), !e || n.length !== e);
                        r = !0
                      );
                    } catch (u) {
                      ;(o = !0), (i = u)
                    } finally {
                      try {
                        !r && a.return && a.return()
                      } finally {
                        if (o) throw i
                      }
                    }
                    return n
                  })(t, e)
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance'
                )
              },
              i = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              l = m(n(3)),
              a = m(n(2)),
              u = m(n(0)),
              s = m(n(5)),
              c = m(n(11)),
              f = m(n(10)),
              p = n(55),
              h = n(56),
              d = m(n(16)),
              y = n(35),
              v = n(57),
              b = n(58),
              g = n(59)
            function m(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function _(t, e, n) {
              return (
                e in t
                  ? Object.defineProperty(t, e, {
                      value: n,
                      enumerable: !0,
                      configurable: !0,
                      writable: !0,
                    })
                  : (t[e] = n),
                t
              )
            }
            var O = (0, c.default)('quill:clipboard'),
              w = '__ql-matcher',
              x = [
                [Node.TEXT_NODE, I],
                [Node.TEXT_NODE, R],
                [
                  'br',
                  function (t, e) {
                    return P(e, '\n') || e.insert('\n'), e
                  },
                ],
                [Node.ELEMENT_NODE, R],
                [Node.ELEMENT_NODE, L],
                [Node.ELEMENT_NODE, M],
                [Node.ELEMENT_NODE, C],
                [
                  Node.ELEMENT_NODE,
                  function (t, e) {
                    var n = {},
                      r = t.style || {}
                    return (
                      r.fontStyle &&
                        'italic' === N(t).fontStyle &&
                        (n.italic = !0),
                      r.fontWeight &&
                        (N(t).fontWeight.startsWith('bold') ||
                          parseInt(N(t).fontWeight) >= 700) &&
                        (n.bold = !0),
                      Object.keys(n).length > 0 && (e = j(e, n)),
                      parseFloat(r.textIndent || 0) > 0 &&
                        (e = new a.default().insert('\t').concat(e)),
                      e
                    )
                  },
                ],
                [
                  'li',
                  function (t, e) {
                    var n = u.default.query(t)
                    if (null == n || 'list-item' !== n.blotName || !P(e, '\n'))
                      return e
                    for (
                      var r = -1, o = t.parentNode;
                      !o.classList.contains('ql-clipboard');

                    )
                      'list' === (u.default.query(o) || {}).blotName &&
                        (r += 1),
                        (o = o.parentNode)
                    return r <= 0
                      ? e
                      : e.compose(
                          new a.default()
                            .retain(e.length() - 1)
                            .retain(1, { indent: r })
                        )
                  },
                ],
                ['b', q.bind(q, 'bold')],
                ['i', q.bind(q, 'italic')],
                [
                  'style',
                  function () {
                    return new a.default()
                  },
                ],
              ],
              E = [p.AlignAttribute, v.DirectionAttribute].reduce(function (
                t,
                e
              ) {
                return (t[e.keyName] = e), t
              },
              {}),
              A = [
                p.AlignStyle,
                h.BackgroundStyle,
                y.ColorStyle,
                v.DirectionStyle,
                b.FontStyle,
                g.SizeStyle,
              ].reduce(function (t, e) {
                return (t[e.keyName] = e), t
              }, {}),
              k = (function (t) {
                function e(t, n) {
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, e)
                  var r = (function (t, e) {
                    if (!t)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e ||
                      ('object' != typeof e && 'function' != typeof e)
                      ? t
                      : e
                  })(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
                  )
                  return (
                    r.quill.root.addEventListener('paste', r.onPaste.bind(r)),
                    (r.container = r.quill.addContainer('ql-clipboard')),
                    r.container.setAttribute('contenteditable', !0),
                    r.container.setAttribute('tabindex', -1),
                    (r.matchers = []),
                    x.concat(r.options.matchers).forEach(function (t) {
                      var e = o(t, 2),
                        i = e[1]
                      ;(n.matchVisual || i !== M) && r.addMatcher(e[0], i)
                    }),
                    r
                  )
                }
                return (
                  (function (t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  })(e, t),
                  i(e, [
                    {
                      key: 'addMatcher',
                      value: function (t, e) {
                        this.matchers.push([t, e])
                      },
                    },
                    {
                      key: 'convert',
                      value: function (t) {
                        if ('string' == typeof t)
                          return (
                            (this.container.innerHTML = t.replace(
                              /\>\r?\n +\</g,
                              '><'
                            )),
                            this.convert()
                          )
                        var e = this.quill.getFormat(
                          this.quill.selection.savedRange.index
                        )
                        if (e[d.default.blotName]) {
                          var n = this.container.innerText
                          return (
                            (this.container.innerHTML = ''),
                            new a.default().insert(
                              n,
                              _({}, d.default.blotName, e[d.default.blotName])
                            )
                          )
                        }
                        var r = this.prepareMatching(),
                          i = o(r, 2),
                          l = T(this.container, i[0], i[1])
                        return (
                          P(l, '\n') &&
                            null == l.ops[l.ops.length - 1].attributes &&
                            (l = l.compose(
                              new a.default().retain(l.length() - 1).delete(1)
                            )),
                          O.log('convert', this.container.innerHTML, l),
                          (this.container.innerHTML = ''),
                          l
                        )
                      },
                    },
                    {
                      key: 'dangerouslyPasteHTML',
                      value: function (t, e) {
                        var n =
                          arguments.length > 2 && void 0 !== arguments[2]
                            ? arguments[2]
                            : s.default.sources.API
                        if ('string' == typeof t)
                          this.quill.setContents(this.convert(t), e),
                            this.quill.setSelection(0, s.default.sources.SILENT)
                        else {
                          var r = this.convert(e)
                          this.quill.updateContents(
                            new a.default().retain(t).concat(r),
                            n
                          ),
                            this.quill.setSelection(
                              t + r.length(),
                              s.default.sources.SILENT
                            )
                        }
                      },
                    },
                    {
                      key: 'onPaste',
                      value: function (t) {
                        var e = this
                        if (!t.defaultPrevented && this.quill.isEnabled()) {
                          var n = this.quill.getSelection(),
                            r = new a.default().retain(n.index),
                            o = this.quill.scrollingContainer.scrollTop
                          this.container.focus(),
                            this.quill.selection.update(
                              s.default.sources.SILENT
                            ),
                            setTimeout(function () {
                              ;(r = r.concat(e.convert()).delete(n.length)),
                                e.quill.updateContents(
                                  r,
                                  s.default.sources.USER
                                ),
                                e.quill.setSelection(
                                  r.length() - n.length,
                                  s.default.sources.SILENT
                                ),
                                (e.quill.scrollingContainer.scrollTop = o),
                                e.quill.focus()
                            }, 1)
                        }
                      },
                    },
                    {
                      key: 'prepareMatching',
                      value: function () {
                        var t = this,
                          e = [],
                          n = []
                        return (
                          this.matchers.forEach(function (r) {
                            var i = o(r, 2),
                              l = i[0],
                              a = i[1]
                            switch (l) {
                              case Node.TEXT_NODE:
                                n.push(a)
                                break
                              case Node.ELEMENT_NODE:
                                e.push(a)
                                break
                              default:
                                ;[].forEach.call(
                                  t.container.querySelectorAll(l),
                                  function (t) {
                                    ;(t[w] = t[w] || []), t[w].push(a)
                                  }
                                )
                            }
                          }),
                          [e, n]
                        )
                      },
                    },
                  ]),
                  e
                )
              })(f.default)
            function j(t, e, n) {
              return 'object' === (void 0 === e ? 'undefined' : r(e))
                ? Object.keys(e).reduce(function (t, n) {
                    return j(t, n, e[n])
                  }, t)
                : t.reduce(function (t, r) {
                    return r.attributes && r.attributes[e]
                      ? t.push(r)
                      : t.insert(
                          r.insert,
                          (0, l.default)({}, _({}, e, n), r.attributes)
                        )
                  }, new a.default())
            }
            function N(t) {
              if (t.nodeType !== Node.ELEMENT_NODE) return {}
              var e = '__ql-computed-style'
              return t[e] || (t[e] = window.getComputedStyle(t))
            }
            function P(t, e) {
              for (
                var n = '', r = t.ops.length - 1;
                r >= 0 && n.length < e.length;
                --r
              ) {
                var o = t.ops[r]
                if ('string' != typeof o.insert) break
                n = o.insert + n
              }
              return n.slice(-1 * e.length) === e
            }
            function S(t) {
              if (0 === t.childNodes.length) return !1
              var e = N(t)
              return ['block', 'list-item'].indexOf(e.display) > -1
            }
            function T(t, e, n) {
              return t.nodeType === t.TEXT_NODE
                ? n.reduce(function (e, n) {
                    return n(t, e)
                  }, new a.default())
                : t.nodeType === t.ELEMENT_NODE
                ? [].reduce.call(
                    t.childNodes || [],
                    function (r, o) {
                      var i = T(o, e, n)
                      return (
                        o.nodeType === t.ELEMENT_NODE &&
                          ((i = e.reduce(function (t, e) {
                            return e(o, t)
                          }, i)),
                          (i = (o[w] || []).reduce(function (t, e) {
                            return e(o, t)
                          }, i))),
                        r.concat(i)
                      )
                    },
                    new a.default()
                  )
                : new a.default()
            }
            function q(t, e, n) {
              return j(n, t, !0)
            }
            function C(t, e) {
              var n = u.default.Attributor.Attribute.keys(t),
                r = u.default.Attributor.Class.keys(t),
                o = u.default.Attributor.Style.keys(t),
                i = {}
              return (
                n
                  .concat(r)
                  .concat(o)
                  .forEach(function (e) {
                    var n = u.default.query(e, u.default.Scope.ATTRIBUTE)
                    ;(null != n &&
                      ((i[n.attrName] = n.value(t)), i[n.attrName])) ||
                      (null == (n = E[e]) ||
                        (n.attrName !== e && n.keyName !== e) ||
                        (i[n.attrName] = n.value(t) || void 0),
                      null == (n = A[e]) ||
                        (n.attrName !== e && n.keyName !== e) ||
                        (i[(n = A[e]).attrName] = n.value(t) || void 0))
                  }),
                Object.keys(i).length > 0 && (e = j(e, i)),
                e
              )
            }
            function L(t, e) {
              var n = u.default.query(t)
              if (null == n) return e
              if (n.prototype instanceof u.default.Embed) {
                var r = {},
                  o = n.value(t)
                null != o &&
                  ((r[n.blotName] = o),
                  (e = new a.default().insert(r, n.formats(t))))
              } else
                'function' == typeof n.formats &&
                  (e = j(e, n.blotName, n.formats(t)))
              return e
            }
            function R(t, e) {
              return (
                P(e, '\n') ||
                  ((S(t) ||
                    (e.length() > 0 && t.nextSibling && S(t.nextSibling))) &&
                    e.insert('\n')),
                e
              )
            }
            function M(t, e) {
              if (S(t) && null != t.nextElementSibling && !P(e, '\n\n')) {
                var n =
                  t.offsetHeight +
                  parseFloat(N(t).marginTop) +
                  parseFloat(N(t).marginBottom)
                t.nextElementSibling.offsetTop > t.offsetTop + 1.5 * n &&
                  e.insert('\n')
              }
              return e
            }
            function I(t, e) {
              var n = t.data
              if ('O:P' === t.parentNode.tagName) return e.insert(n.trim())
              if (
                0 === n.trim().length &&
                t.parentNode.classList.contains('ql-clipboard')
              )
                return e
              if (!N(t.parentNode).whiteSpace.startsWith('pre')) {
                var r = function (t, e) {
                  return (e = e.replace(/[^\u00a0]/g, '')).length < 1 && t
                    ? ' '
                    : e
                }
                ;(n = (n = n.replace(/\r\n/g, ' ').replace(/\n/g, ' ')).replace(
                  /\s\s+/g,
                  r.bind(r, !0)
                )),
                  ((null == t.previousSibling && S(t.parentNode)) ||
                    (null != t.previousSibling && S(t.previousSibling))) &&
                    (n = n.replace(/^\s+/, r.bind(r, !1))),
                  ((null == t.nextSibling && S(t.parentNode)) ||
                    (null != t.nextSibling && S(t.nextSibling))) &&
                    (n = n.replace(/\s+$/, r.bind(r, !1)))
              }
              return e.insert(n)
            }
            ;(k.DEFAULTS = { matchers: [], matchVisual: !0 }),
              (e.default = k),
              (e.matchAttributor = C),
              (e.matchBlot = L),
              (e.matchNewline = R),
              (e.matchSpacing = M),
              (e.matchText = I)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = n(6)
            function a(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function u(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var s = (function (t) {
              function e() {
                return (
                  a(this, e),
                  u(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                o(
                  e,
                  [
                    {
                      key: 'optimize',
                      value: function (t) {
                        i(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'optimize',
                          this
                        ).call(this, t),
                          this.domNode.tagName !== this.statics.tagName[0] &&
                            this.replaceWith(this.statics.blotName)
                      },
                    },
                  ],
                  [
                    {
                      key: 'create',
                      value: function () {
                        return i(
                          e.__proto__ || Object.getPrototypeOf(e),
                          'create',
                          this
                        ).call(this)
                      },
                    },
                    {
                      key: 'formats',
                      value: function () {
                        return !0
                      },
                    },
                  ]
                ),
                e
              )
            })(((r = l) && r.__esModule ? r : { default: r }).default)
            ;(s.blotName = 'bold'),
              (s.tagName = ['STRONG', 'B']),
              (e.default = s)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.addControls = e.default = void 0)
            var r = function (t, e) {
                if (Array.isArray(t)) return t
                if (Symbol.iterator in Object(t))
                  return (function (t, e) {
                    var n = [],
                      r = !0,
                      o = !1,
                      i = void 0
                    try {
                      for (
                        var l, a = t[Symbol.iterator]();
                        !(r = (l = a.next()).done) &&
                        (n.push(l.value), !e || n.length !== e);
                        r = !0
                      );
                    } catch (u) {
                      ;(o = !0), (i = u)
                    } finally {
                      try {
                        !r && a.return && a.return()
                      } finally {
                        if (o) throw i
                      }
                    }
                    return n
                  })(t, e)
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance'
                )
              },
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = c(n(2)),
              l = c(n(0)),
              a = c(n(5)),
              u = c(n(11)),
              s = c(n(10))
            function c(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function f(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var p = (0, u.default)('quill:toolbar'),
              h = (function (t) {
                function e(t, n) {
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, e)
                  var o,
                    i = f(
                      this,
                      (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
                    )
                  if (Array.isArray(i.options.container)) {
                    var l = document.createElement('div')
                    y(l, i.options.container),
                      t.container.parentNode.insertBefore(l, t.container),
                      (i.container = l)
                  } else
                    i.container =
                      'string' == typeof i.options.container
                        ? document.querySelector(i.options.container)
                        : i.options.container
                  return i.container instanceof HTMLElement
                    ? (i.container.classList.add('ql-toolbar'),
                      (i.controls = []),
                      (i.handlers = {}),
                      Object.keys(i.options.handlers).forEach(function (t) {
                        i.addHandler(t, i.options.handlers[t])
                      }),
                      [].forEach.call(
                        i.container.querySelectorAll('button, select'),
                        function (t) {
                          i.attach(t)
                        }
                      ),
                      i.quill.on(
                        a.default.events.EDITOR_CHANGE,
                        function (t, e) {
                          t === a.default.events.SELECTION_CHANGE && i.update(e)
                        }
                      ),
                      i.quill.on(a.default.events.SCROLL_OPTIMIZE, function () {
                        var t = i.quill.selection.getRange(),
                          e = r(t, 1)
                        i.update(e[0])
                      }),
                      i)
                    : ((o = p.error(
                        'Container required for toolbar',
                        i.options
                      )),
                      f(i, o))
                }
                return (
                  (function (t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  })(e, t),
                  o(e, [
                    {
                      key: 'addHandler',
                      value: function (t, e) {
                        this.handlers[t] = e
                      },
                    },
                    {
                      key: 'attach',
                      value: function (t) {
                        var e = this,
                          n = [].find.call(t.classList, function (t) {
                            return 0 === t.indexOf('ql-')
                          })
                        if (n) {
                          if (
                            ((n = n.slice('ql-'.length)),
                            'BUTTON' === t.tagName &&
                              t.setAttribute('type', 'button'),
                            null == this.handlers[n])
                          ) {
                            if (
                              null != this.quill.scroll.whitelist &&
                              null == this.quill.scroll.whitelist[n]
                            )
                              return void p.warn(
                                'ignoring attaching to disabled format',
                                n,
                                t
                              )
                            if (null == l.default.query(n))
                              return void p.warn(
                                'ignoring attaching to nonexistent format',
                                n,
                                t
                              )
                          }
                          t.addEventListener(
                            'SELECT' === t.tagName ? 'change' : 'click',
                            function (o) {
                              var u = void 0
                              if ('SELECT' === t.tagName) {
                                if (t.selectedIndex < 0) return
                                var s = t.options[t.selectedIndex]
                                u =
                                  !s.hasAttribute('selected') && (s.value || !1)
                              } else
                                (u =
                                  !t.classList.contains('ql-active') &&
                                  (t.value || !t.hasAttribute('value'))),
                                  o.preventDefault()
                              e.quill.focus()
                              var c = e.quill.selection.getRange(),
                                f = r(c, 1)[0]
                              if (null != e.handlers[n])
                                e.handlers[n].call(e, u)
                              else if (
                                l.default.query(n).prototype instanceof
                                l.default.Embed
                              ) {
                                if (!(u = prompt('Enter ' + n))) return
                                e.quill.updateContents(
                                  new i.default()
                                    .retain(f.index)
                                    .delete(f.length)
                                    .insert(
                                      (function (t, e, n) {
                                        return (
                                          e in t
                                            ? Object.defineProperty(t, e, {
                                                value: n,
                                                enumerable: !0,
                                                configurable: !0,
                                                writable: !0,
                                              })
                                            : (t[e] = n),
                                          t
                                        )
                                      })({}, n, u)
                                    ),
                                  a.default.sources.USER
                                )
                              } else
                                e.quill.format(n, u, a.default.sources.USER)
                              e.update(f)
                            }
                          ),
                            this.controls.push([n, t])
                        }
                      },
                    },
                    {
                      key: 'update',
                      value: function (t) {
                        var e = null == t ? {} : this.quill.getFormat(t)
                        this.controls.forEach(function (n) {
                          var o = r(n, 2),
                            i = o[0],
                            l = o[1]
                          if ('SELECT' === l.tagName) {
                            var a = void 0
                            if (null == t) a = null
                            else if (null == e[i])
                              a = l.querySelector('option[selected]')
                            else if (!Array.isArray(e[i])) {
                              var u = e[i]
                              'string' == typeof u &&
                                (u = u.replace(/\"/g, '\\"')),
                                (a = l.querySelector(
                                  'option[value="' + u + '"]'
                                ))
                            }
                            null == a
                              ? ((l.value = ''), (l.selectedIndex = -1))
                              : (a.selected = !0)
                          } else if (null == t) l.classList.remove('ql-active')
                          else if (l.hasAttribute('value')) {
                            var s =
                              e[i] === l.getAttribute('value') ||
                              (null != e[i] &&
                                e[i].toString() === l.getAttribute('value')) ||
                              (null == e[i] && !l.getAttribute('value'))
                            l.classList.toggle('ql-active', s)
                          } else l.classList.toggle('ql-active', null != e[i])
                        })
                      },
                    },
                  ]),
                  e
                )
              })(s.default)
            function d(t, e, n) {
              var r = document.createElement('button')
              r.setAttribute('type', 'button'),
                r.classList.add('ql-' + e),
                null != n && (r.value = n),
                t.appendChild(r)
            }
            function y(t, e) {
              Array.isArray(e[0]) || (e = [e]),
                e.forEach(function (e) {
                  var n = document.createElement('span')
                  n.classList.add('ql-formats'),
                    e.forEach(function (t) {
                      if ('string' == typeof t) d(n, t)
                      else {
                        var e = Object.keys(t)[0],
                          r = t[e]
                        Array.isArray(r)
                          ? (function (t, e, n) {
                              var r = document.createElement('select')
                              r.classList.add('ql-' + e),
                                n.forEach(function (t) {
                                  var e = document.createElement('option')
                                  !1 !== t
                                    ? e.setAttribute('value', t)
                                    : e.setAttribute('selected', 'selected'),
                                    r.appendChild(e)
                                }),
                                t.appendChild(r)
                            })(n, e, r)
                          : d(n, e, r)
                      }
                    }),
                    t.appendChild(n)
                })
            }
            ;(h.DEFAULTS = {}),
              (h.DEFAULTS = {
                container: null,
                handlers: {
                  clean: function () {
                    var t = this,
                      e = this.quill.getSelection()
                    if (null != e)
                      if (0 == e.length) {
                        var n = this.quill.getFormat()
                        Object.keys(n).forEach(function (e) {
                          null != l.default.query(e, l.default.Scope.INLINE) &&
                            t.quill.format(e, !1)
                        })
                      } else this.quill.removeFormat(e, a.default.sources.USER)
                  },
                  direction: function (t) {
                    var e = this.quill.getFormat().align
                    'rtl' === t && null == e
                      ? this.quill.format(
                          'align',
                          'right',
                          a.default.sources.USER
                        )
                      : t ||
                        'right' !== e ||
                        this.quill.format('align', !1, a.default.sources.USER),
                      this.quill.format('direction', t, a.default.sources.USER)
                  },
                  indent: function (t) {
                    var e = this.quill.getSelection(),
                      n = this.quill.getFormat(e),
                      r = parseInt(n.indent || 0)
                    if ('+1' === t || '-1' === t) {
                      var o = '+1' === t ? 1 : -1
                      'rtl' === n.direction && (o *= -1),
                        this.quill.format(
                          'indent',
                          r + o,
                          a.default.sources.USER
                        )
                    }
                  },
                  link: function (t) {
                    !0 === t && (t = prompt('Enter link URL:')),
                      this.quill.format('link', t, a.default.sources.USER)
                  },
                  list: function (t) {
                    var e = this.quill.getSelection(),
                      n = this.quill.getFormat(e)
                    this.quill.format(
                      'list',
                      'check' === t
                        ? 'checked' !== n.list &&
                            'unchecked' !== n.list &&
                            'unchecked'
                        : t,
                      a.default.sources.USER
                    )
                  },
                },
              }),
              (e.default = h),
              (e.addControls = y)
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <polyline class="ql-even ql-stroke" points="5 7 3 9 5 11"></polyline> <polyline class="ql-even ql-stroke" points="13 7 15 9 13 11"></polyline> <line class=ql-stroke x1=10 x2=8 y1=5 y2=13></line> </svg>'
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = n(37),
              a = (function (t) {
                function e(t, n) {
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, e)
                  var r = (function (t, e) {
                    if (!t)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e ||
                      ('object' != typeof e && 'function' != typeof e)
                      ? t
                      : e
                  })(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)
                  )
                  return (
                    (r.label.innerHTML = n),
                    r.container.classList.add('ql-color-picker'),
                    [].slice
                      .call(
                        r.container.querySelectorAll('.ql-picker-item'),
                        0,
                        7
                      )
                      .forEach(function (t) {
                        t.classList.add('ql-primary')
                      }),
                    r
                  )
                }
                return (
                  (function (t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  })(e, t),
                  o(e, [
                    {
                      key: 'buildItem',
                      value: function (t) {
                        var n = i(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'buildItem',
                          this
                        ).call(this, t)
                        return (
                          (n.style.backgroundColor =
                            t.getAttribute('value') || ''),
                          n
                        )
                      },
                    },
                    {
                      key: 'selectItem',
                      value: function (t, n) {
                        i(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'selectItem',
                          this
                        ).call(this, t, n)
                        var r = this.label.querySelector('.ql-color-label'),
                          o = (t && t.getAttribute('data-value')) || ''
                        r &&
                          ('line' === r.tagName
                            ? (r.style.stroke = o)
                            : (r.style.fill = o))
                      },
                    },
                  ]),
                  e
                )
              })(((r = l) && r.__esModule ? r : { default: r }).default)
            e.default = a
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = n(37),
              a = (function (t) {
                function e(t, n) {
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, e)
                  var r = (function (t, e) {
                    if (!t)
                      throw new ReferenceError(
                        "this hasn't been initialised - super() hasn't been called"
                      )
                    return !e ||
                      ('object' != typeof e && 'function' != typeof e)
                      ? t
                      : e
                  })(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)
                  )
                  return (
                    r.container.classList.add('ql-icon-picker'),
                    [].forEach.call(
                      r.container.querySelectorAll('.ql-picker-item'),
                      function (t) {
                        t.innerHTML = n[t.getAttribute('data-value') || '']
                      }
                    ),
                    (r.defaultItem = r.container.querySelector('.ql-selected')),
                    r.selectItem(r.defaultItem),
                    r
                  )
                }
                return (
                  (function (t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  })(e, t),
                  o(e, [
                    {
                      key: 'selectItem',
                      value: function (t, n) {
                        i(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'selectItem',
                          this
                        ).call(this, t, n),
                          (this.label.innerHTML = (t =
                            t || this.defaultItem).innerHTML)
                      },
                    },
                  ]),
                  e
                )
              })(((r = l) && r.__esModule ? r : { default: r }).default)
            e.default = a
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              o = (function () {
                function t(e, n) {
                  var r = this
                  !(function (t, e) {
                    if (!(t instanceof e))
                      throw new TypeError('Cannot call a class as a function')
                  })(this, t),
                    (this.quill = e),
                    (this.boundsContainer = n || document.body),
                    (this.root = e.addContainer('ql-tooltip')),
                    (this.root.innerHTML = this.constructor.TEMPLATE),
                    this.quill.root === this.quill.scrollingContainer &&
                      this.quill.root.addEventListener('scroll', function () {
                        r.root.style.marginTop =
                          -1 * r.quill.root.scrollTop + 'px'
                      }),
                    this.hide()
                }
                return (
                  r(t, [
                    {
                      key: 'hide',
                      value: function () {
                        this.root.classList.add('ql-hidden')
                      },
                    },
                    {
                      key: 'position',
                      value: function (t) {
                        var e =
                            t.left + t.width / 2 - this.root.offsetWidth / 2,
                          n = t.bottom + this.quill.root.scrollTop
                        ;(this.root.style.left = e + 'px'),
                          (this.root.style.top = n + 'px'),
                          this.root.classList.remove('ql-flip')
                        var r = this.boundsContainer.getBoundingClientRect(),
                          o = this.root.getBoundingClientRect(),
                          i = 0
                        return (
                          o.right > r.right &&
                            (this.root.style.left =
                              e + (i = r.right - o.right) + 'px'),
                          o.left < r.left &&
                            (this.root.style.left =
                              e + (i = r.left - o.left) + 'px'),
                          o.bottom > r.bottom &&
                            ((this.root.style.top =
                              n -
                              (t.bottom - t.top + (o.bottom - o.top)) +
                              'px'),
                            this.root.classList.add('ql-flip')),
                          i
                        )
                      },
                    },
                    {
                      key: 'show',
                      value: function () {
                        this.root.classList.remove('ql-editing'),
                          this.root.classList.remove('ql-hidden')
                      },
                    },
                  ]),
                  t
                )
              })()
            e.default = o
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = function (t, e) {
                if (Array.isArray(t)) return t
                if (Symbol.iterator in Object(t))
                  return (function (t, e) {
                    var n = [],
                      r = !0,
                      o = !1,
                      i = void 0
                    try {
                      for (
                        var l, a = t[Symbol.iterator]();
                        !(r = (l = a.next()).done) &&
                        (n.push(l.value), !e || n.length !== e);
                        r = !0
                      );
                    } catch (u) {
                      ;(o = !0), (i = u)
                    } finally {
                      try {
                        !r && a.return && a.return()
                      } finally {
                        if (o) throw i
                      }
                    }
                    return n
                  })(t, e)
                throw new TypeError(
                  'Invalid attempt to destructure non-iterable instance'
                )
              },
              o = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              i = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              l = h(n(3)),
              a = h(n(9)),
              u = n(62),
              s = h(u),
              c = h(n(36)),
              f = n(18),
              p = h(n(60))
            function h(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function d(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function y(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            function v(t, e) {
              if ('function' != typeof e && null !== e)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof e
                )
              ;(t.prototype = Object.create(e && e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                e &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, e)
                    : (t.__proto__ = e))
            }
            var b = [
                [{ header: ['1', '2', '3', !1] }],
                ['bold', 'italic', 'underline', 'link'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['clean'],
              ],
              g = (function (t) {
                function e(t, n) {
                  d(this, e),
                    null != n.modules.toolbar &&
                      null == n.modules.toolbar.container &&
                      (n.modules.toolbar.container = b)
                  var r = y(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
                  )
                  return r.quill.container.classList.add('ql-snow'), r
                }
                return (
                  v(e, t),
                  i(e, [
                    {
                      key: 'extendToolbar',
                      value: function (t) {
                        t.container.classList.add('ql-snow'),
                          this.buildButtons(
                            [].slice.call(
                              t.container.querySelectorAll('button')
                            ),
                            p.default
                          ),
                          this.buildPickers(
                            [].slice.call(
                              t.container.querySelectorAll('select')
                            ),
                            p.default
                          ),
                          (this.tooltip = new m(
                            this.quill,
                            this.options.bounds
                          )),
                          t.container.querySelector('.ql-link') &&
                            this.quill.keyboard.addBinding(
                              { key: 'K', shortKey: !0 },
                              function (e, n) {
                                t.handlers.link.call(t, !n.format.link)
                              }
                            )
                      },
                    },
                  ]),
                  e
                )
              })(s.default)
            g.DEFAULTS = (0, l.default)(!0, {}, s.default.DEFAULTS, {
              modules: {
                toolbar: {
                  handlers: {
                    link: function (t) {
                      if (t) {
                        var e = this.quill.getSelection()
                        if (null == e || 0 == e.length) return
                        var n = this.quill.getText(e)
                        ;/^\S+@\S+\.\S+$/.test(n) &&
                          0 !== n.indexOf('mailto:') &&
                          (n = 'mailto:' + n),
                          this.quill.theme.tooltip.edit('link', n)
                      } else this.quill.format('link', !1)
                    },
                  },
                },
              },
            })
            var m = (function (t) {
              function e(t, n) {
                d(this, e)
                var r = y(
                  this,
                  (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
                )
                return (r.preview = r.root.querySelector('a.ql-preview')), r
              }
              return (
                v(e, t),
                i(e, [
                  {
                    key: 'listen',
                    value: function () {
                      var t = this
                      o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'listen',
                        this
                      ).call(this),
                        this.root
                          .querySelector('a.ql-action')
                          .addEventListener('click', function (e) {
                            t.root.classList.contains('ql-editing')
                              ? t.save()
                              : t.edit('link', t.preview.textContent),
                              e.preventDefault()
                          }),
                        this.root
                          .querySelector('a.ql-remove')
                          .addEventListener('click', function (e) {
                            if (null != t.linkRange) {
                              var n = t.linkRange
                              t.restoreFocus(),
                                t.quill.formatText(
                                  n,
                                  'link',
                                  !1,
                                  a.default.sources.USER
                                ),
                                delete t.linkRange
                            }
                            e.preventDefault(), t.hide()
                          }),
                        this.quill.on(
                          a.default.events.SELECTION_CHANGE,
                          function (e, n, o) {
                            if (null != e) {
                              if (
                                0 === e.length &&
                                o === a.default.sources.USER
                              ) {
                                var i = t.quill.scroll.descendant(
                                    c.default,
                                    e.index
                                  ),
                                  l = r(i, 2),
                                  u = l[0]
                                if (null != u) {
                                  t.linkRange = new f.Range(
                                    e.index - l[1],
                                    u.length()
                                  )
                                  var s = c.default.formats(u.domNode)
                                  return (
                                    (t.preview.textContent = s),
                                    t.preview.setAttribute('href', s),
                                    t.show(),
                                    void t.position(
                                      t.quill.getBounds(t.linkRange)
                                    )
                                  )
                                }
                              } else delete t.linkRange
                              t.hide()
                            }
                          }
                        )
                    },
                  },
                  {
                    key: 'show',
                    value: function () {
                      o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'show',
                        this
                      ).call(this),
                        this.root.removeAttribute('data-mode')
                    },
                  },
                ]),
                e
              )
            })(u.BaseTooltip)
            ;(m.TEMPLATE = [
              '<a class="ql-preview" rel="noopener noreferrer" target="_blank" href="about:blank"></a>',
              '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">',
              '<a class="ql-action"></a>',
              '<a class="ql-remove"></a>',
            ].join('')),
              (e.default = g)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r = R(n(38)),
              o = n(55),
              i = n(57),
              l = n(101),
              a = R(n(102)),
              u = R(n(103)),
              s = n(104),
              c = R(s),
              f = n(56),
              p = n(35),
              h = n(58),
              d = n(59),
              y = R(n(93)),
              v = R(n(105)),
              b = R(n(36)),
              g = R(n(106)),
              m = R(n(107)),
              _ = R(n(108)),
              O = R(n(109)),
              w = R(n(110)),
              x = n(16),
              E = R(x),
              A = R(n(111)),
              k = R(n(112)),
              j = R(n(94)),
              N = R(n(60)),
              P = R(n(37)),
              S = R(n(96)),
              T = R(n(97)),
              q = R(n(98)),
              C = R(n(145)),
              L = R(n(99))
            function R(t) {
              return t && t.__esModule ? t : { default: t }
            }
            r.default.register(
              {
                'attributors/attribute/direction': i.DirectionAttribute,
                'attributors/class/align': o.AlignClass,
                'attributors/class/background': f.BackgroundClass,
                'attributors/class/color': p.ColorClass,
                'attributors/class/direction': i.DirectionClass,
                'attributors/class/font': h.FontClass,
                'attributors/class/size': d.SizeClass,
                'attributors/style/align': o.AlignStyle,
                'attributors/style/background': f.BackgroundStyle,
                'attributors/style/color': p.ColorStyle,
                'attributors/style/direction': i.DirectionStyle,
                'attributors/style/font': h.FontStyle,
                'attributors/style/size': d.SizeStyle,
              },
              !0
            ),
              r.default.register(
                {
                  'formats/align': o.AlignClass,
                  'formats/direction': i.DirectionClass,
                  'formats/indent': l.IndentClass,
                  'formats/background': f.BackgroundStyle,
                  'formats/color': p.ColorStyle,
                  'formats/font': h.FontClass,
                  'formats/size': d.SizeClass,
                  'formats/blockquote': a.default,
                  'formats/code-block': E.default,
                  'formats/header': u.default,
                  'formats/list': c.default,
                  'formats/bold': y.default,
                  'formats/code': x.Code,
                  'formats/italic': v.default,
                  'formats/link': b.default,
                  'formats/script': g.default,
                  'formats/strike': m.default,
                  'formats/underline': _.default,
                  'formats/image': O.default,
                  'formats/video': w.default,
                  'formats/list/item': s.ListItem,
                  'modules/formula': A.default,
                  'modules/syntax': k.default,
                  'modules/toolbar': j.default,
                  'themes/bubble': C.default,
                  'themes/snow': L.default,
                  'ui/icons': N.default,
                  'ui/picker': P.default,
                  'ui/icon-picker': T.default,
                  'ui/color-picker': S.default,
                  'ui/tooltip': q.default,
                },
                !0
              ),
              (e.default = r.default)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.IndentClass = void 0)
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = n(0),
              a = (r = l) && r.__esModule ? r : { default: r }
            function u(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function s(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var c = (function (t) {
                function e() {
                  return (
                    u(this, e),
                    s(
                      this,
                      (e.__proto__ || Object.getPrototypeOf(e)).apply(
                        this,
                        arguments
                      )
                    )
                  )
                }
                return (
                  (function (t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  })(e, t),
                  o(e, [
                    {
                      key: 'add',
                      value: function (t, n) {
                        if ('+1' === n || '-1' === n) {
                          var r = this.value(t) || 0
                          n = '+1' === n ? r + 1 : r - 1
                        }
                        return 0 === n
                          ? (this.remove(t), !0)
                          : i(
                              e.prototype.__proto__ ||
                                Object.getPrototypeOf(e.prototype),
                              'add',
                              this
                            ).call(this, t, n)
                      },
                    },
                    {
                      key: 'canAdd',
                      value: function (t, n) {
                        return (
                          i(
                            e.prototype.__proto__ ||
                              Object.getPrototypeOf(e.prototype),
                            'canAdd',
                            this
                          ).call(this, t, n) ||
                          i(
                            e.prototype.__proto__ ||
                              Object.getPrototypeOf(e.prototype),
                            'canAdd',
                            this
                          ).call(this, t, parseInt(n))
                        )
                      },
                    },
                    {
                      key: 'value',
                      value: function (t) {
                        return (
                          parseInt(
                            i(
                              e.prototype.__proto__ ||
                                Object.getPrototypeOf(e.prototype),
                              'value',
                              this
                            ).call(this, t)
                          ) || void 0
                        )
                      },
                    },
                  ]),
                  e
                )
              })(a.default.Attributor.Class),
              f = new c('indent', 'ql-indent', {
                scope: a.default.Scope.BLOCK,
                whitelist: [1, 2, 3, 4, 5, 6, 7, 8],
              })
            e.IndentClass = f
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = n(4)
            function i(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function l(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var a = (function (t) {
              function e() {
                return (
                  i(this, e),
                  l(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                e
              )
            })(((r = o) && r.__esModule ? r : { default: r }).default)
            ;(a.blotName = 'blockquote'),
              (a.tagName = 'blockquote'),
              (e.default = a)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = n(4)
            function l(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function a(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var u = (function (t) {
              function e() {
                return (
                  l(this, e),
                  a(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                o(e, null, [
                  {
                    key: 'formats',
                    value: function (t) {
                      return this.tagName.indexOf(t.tagName) + 1
                    },
                  },
                ]),
                e
              )
            })(((r = i) && r.__esModule ? r : { default: r }).default)
            ;(u.blotName = 'header'),
              (u.tagName = ['H1', 'H2', 'H3', 'H4', 'H5', 'H6']),
              (e.default = u)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.default = e.ListItem = void 0)
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              o = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              i = u(n(0)),
              l = u(n(4)),
              a = u(n(34))
            function u(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function s(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function c(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            function f(t, e) {
              if ('function' != typeof e && null !== e)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof e
                )
              ;(t.prototype = Object.create(e && e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                e &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, e)
                    : (t.__proto__ = e))
            }
            var p = (function (t) {
              function e() {
                return (
                  s(this, e),
                  c(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                f(e, t),
                r(
                  e,
                  [
                    {
                      key: 'format',
                      value: function (t, n) {
                        t !== h.blotName || n
                          ? o(
                              e.prototype.__proto__ ||
                                Object.getPrototypeOf(e.prototype),
                              'format',
                              this
                            ).call(this, t, n)
                          : this.replaceWith(
                              i.default.create(this.statics.scope)
                            )
                      },
                    },
                    {
                      key: 'remove',
                      value: function () {
                        null == this.prev && null == this.next
                          ? this.parent.remove()
                          : o(
                              e.prototype.__proto__ ||
                                Object.getPrototypeOf(e.prototype),
                              'remove',
                              this
                            ).call(this)
                      },
                    },
                    {
                      key: 'replaceWith',
                      value: function (t, n) {
                        return (
                          this.parent.isolate(
                            this.offset(this.parent),
                            this.length()
                          ),
                          t === this.parent.statics.blotName
                            ? (this.parent.replaceWith(t, n), this)
                            : (this.parent.unwrap(),
                              o(
                                e.prototype.__proto__ ||
                                  Object.getPrototypeOf(e.prototype),
                                'replaceWith',
                                this
                              ).call(this, t, n))
                        )
                      },
                    },
                  ],
                  [
                    {
                      key: 'formats',
                      value: function (t) {
                        return t.tagName === this.tagName
                          ? void 0
                          : o(
                              e.__proto__ || Object.getPrototypeOf(e),
                              'formats',
                              this
                            ).call(this, t)
                      },
                    },
                  ]
                ),
                e
              )
            })(l.default)
            ;(p.blotName = 'list-item'), (p.tagName = 'LI')
            var h = (function (t) {
              function e(t) {
                s(this, e)
                var n = c(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).call(this, t)
                  ),
                  r = function (e) {
                    if (e.target.parentNode === t) {
                      var r = n.statics.formats(t),
                        o = i.default.find(e.target)
                      'checked' === r
                        ? o.format('list', 'unchecked')
                        : 'unchecked' === r && o.format('list', 'checked')
                    }
                  }
                return (
                  t.addEventListener('touchstart', r),
                  t.addEventListener('mousedown', r),
                  n
                )
              }
              return (
                f(e, t),
                r(e, null, [
                  {
                    key: 'create',
                    value: function (t) {
                      var n = 'ordered' === t ? 'OL' : 'UL',
                        r = o(
                          e.__proto__ || Object.getPrototypeOf(e),
                          'create',
                          this
                        ).call(this, n)
                      return (
                        ('checked' !== t && 'unchecked' !== t) ||
                          r.setAttribute('data-checked', 'checked' === t),
                        r
                      )
                    },
                  },
                  {
                    key: 'formats',
                    value: function (t) {
                      return 'OL' === t.tagName
                        ? 'ordered'
                        : 'UL' === t.tagName
                        ? t.hasAttribute('data-checked')
                          ? 'true' === t.getAttribute('data-checked')
                            ? 'checked'
                            : 'unchecked'
                          : 'bullet'
                        : void 0
                    },
                  },
                ]),
                r(e, [
                  {
                    key: 'format',
                    value: function (t, e) {
                      this.children.length > 0 &&
                        this.children.tail.format(t, e)
                    },
                  },
                  {
                    key: 'formats',
                    value: function () {
                      return (
                        (t = {}),
                        (e = this.statics.blotName),
                        (n = this.statics.formats(this.domNode)),
                        e in t
                          ? Object.defineProperty(t, e, {
                              value: n,
                              enumerable: !0,
                              configurable: !0,
                              writable: !0,
                            })
                          : (t[e] = n),
                        t
                      )
                      var t, e, n
                    },
                  },
                  {
                    key: 'insertBefore',
                    value: function (t, n) {
                      if (t instanceof p)
                        o(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'insertBefore',
                          this
                        ).call(this, t, n)
                      else {
                        var r = null == n ? this.length() : n.offset(this),
                          i = this.split(r)
                        i.parent.insertBefore(t, i)
                      }
                    },
                  },
                  {
                    key: 'optimize',
                    value: function (t) {
                      o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'optimize',
                        this
                      ).call(this, t)
                      var n = this.next
                      null != n &&
                        n.prev === this &&
                        n.statics.blotName === this.statics.blotName &&
                        n.domNode.tagName === this.domNode.tagName &&
                        n.domNode.getAttribute('data-checked') ===
                          this.domNode.getAttribute('data-checked') &&
                        (n.moveChildren(this), n.remove())
                    },
                  },
                  {
                    key: 'replace',
                    value: function (t) {
                      if (t.statics.blotName !== this.statics.blotName) {
                        var n = i.default.create(this.statics.defaultChild)
                        t.moveChildren(n), this.appendChild(n)
                      }
                      o(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'replace',
                        this
                      ).call(this, t)
                    },
                  },
                ]),
                e
              )
            })(a.default)
            ;(h.blotName = 'list'),
              (h.scope = i.default.Scope.BLOCK_BLOT),
              (h.tagName = ['OL', 'UL']),
              (h.defaultChild = 'list-item'),
              (h.allowedChildren = [p]),
              (e.ListItem = p),
              (e.default = h)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = n(93)
            function i(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function l(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var a = (function (t) {
              function e() {
                return (
                  i(this, e),
                  l(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                e
              )
            })(((r = o) && r.__esModule ? r : { default: r }).default)
            ;(a.blotName = 'italic'), (a.tagName = ['EM', 'I']), (e.default = a)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = n(6)
            function a(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function u(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var s = (function (t) {
              function e() {
                return (
                  a(this, e),
                  u(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                o(e, null, [
                  {
                    key: 'create',
                    value: function (t) {
                      return 'super' === t
                        ? document.createElement('sup')
                        : 'sub' === t
                        ? document.createElement('sub')
                        : i(
                            e.__proto__ || Object.getPrototypeOf(e),
                            'create',
                            this
                          ).call(this, t)
                    },
                  },
                  {
                    key: 'formats',
                    value: function (t) {
                      return 'SUB' === t.tagName
                        ? 'sub'
                        : 'SUP' === t.tagName
                        ? 'super'
                        : void 0
                    },
                  },
                ]),
                e
              )
            })(((r = l) && r.__esModule ? r : { default: r }).default)
            ;(s.blotName = 'script'),
              (s.tagName = ['SUB', 'SUP']),
              (e.default = s)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = n(6)
            function i(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function l(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var a = (function (t) {
              function e() {
                return (
                  i(this, e),
                  l(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                e
              )
            })(((r = o) && r.__esModule ? r : { default: r }).default)
            ;(a.blotName = 'strike'), (a.tagName = 'S'), (e.default = a)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = n(6)
            function i(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function l(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var a = (function (t) {
              function e() {
                return (
                  i(this, e),
                  l(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                (function (t, e) {
                  if ('function' != typeof e && null !== e)
                    throw new TypeError(
                      'Super expression must either be null or a function, not ' +
                        typeof e
                    )
                  ;(t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                      value: t,
                      enumerable: !1,
                      writable: !0,
                      configurable: !0,
                    },
                  })),
                    e &&
                      (Object.setPrototypeOf
                        ? Object.setPrototypeOf(t, e)
                        : (t.__proto__ = e))
                })(e, t),
                e
              )
            })(((r = o) && r.__esModule ? r : { default: r }).default)
            ;(a.blotName = 'underline'), (a.tagName = 'U'), (e.default = a)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = n(0),
              a = (r = l) && r.__esModule ? r : { default: r },
              u = n(36)
            function s(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function c(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var f = ['alt', 'height', 'width'],
              p = (function (t) {
                function e() {
                  return (
                    s(this, e),
                    c(
                      this,
                      (e.__proto__ || Object.getPrototypeOf(e)).apply(
                        this,
                        arguments
                      )
                    )
                  )
                }
                return (
                  (function (t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  })(e, t),
                  o(
                    e,
                    [
                      {
                        key: 'format',
                        value: function (t, n) {
                          f.indexOf(t) > -1
                            ? n
                              ? this.domNode.setAttribute(t, n)
                              : this.domNode.removeAttribute(t)
                            : i(
                                e.prototype.__proto__ ||
                                  Object.getPrototypeOf(e.prototype),
                                'format',
                                this
                              ).call(this, t, n)
                        },
                      },
                    ],
                    [
                      {
                        key: 'create',
                        value: function (t) {
                          var n = i(
                            e.__proto__ || Object.getPrototypeOf(e),
                            'create',
                            this
                          ).call(this, t)
                          return (
                            'string' == typeof t &&
                              n.setAttribute('src', this.sanitize(t)),
                            n
                          )
                        },
                      },
                      {
                        key: 'formats',
                        value: function (t) {
                          return f.reduce(function (e, n) {
                            return (
                              t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e
                            )
                          }, {})
                        },
                      },
                      {
                        key: 'match',
                        value: function (t) {
                          return (
                            /\.(jpe?g|gif|png)$/.test(t) ||
                            /^data:image\/.+;base64/.test(t)
                          )
                        },
                      },
                      {
                        key: 'sanitize',
                        value: function (t) {
                          return (0, u.sanitize)(t, ['http', 'https', 'data'])
                            ? t
                            : '//:0'
                        },
                      },
                      {
                        key: 'value',
                        value: function (t) {
                          return t.getAttribute('src')
                        },
                      },
                    ]
                  ),
                  e
                )
              })(a.default.Embed)
            ;(p.blotName = 'image'), (p.tagName = 'IMG'), (e.default = p)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 })
            var r,
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              l = n(4),
              a = n(36),
              u = (r = a) && r.__esModule ? r : { default: r }
            function s(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function c(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            var f = ['height', 'width'],
              p = (function (t) {
                function e() {
                  return (
                    s(this, e),
                    c(
                      this,
                      (e.__proto__ || Object.getPrototypeOf(e)).apply(
                        this,
                        arguments
                      )
                    )
                  )
                }
                return (
                  (function (t, e) {
                    if ('function' != typeof e && null !== e)
                      throw new TypeError(
                        'Super expression must either be null or a function, not ' +
                          typeof e
                      )
                    ;(t.prototype = Object.create(e && e.prototype, {
                      constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0,
                      },
                    })),
                      e &&
                        (Object.setPrototypeOf
                          ? Object.setPrototypeOf(t, e)
                          : (t.__proto__ = e))
                  })(e, t),
                  o(
                    e,
                    [
                      {
                        key: 'format',
                        value: function (t, n) {
                          f.indexOf(t) > -1
                            ? n
                              ? this.domNode.setAttribute(t, n)
                              : this.domNode.removeAttribute(t)
                            : i(
                                e.prototype.__proto__ ||
                                  Object.getPrototypeOf(e.prototype),
                                'format',
                                this
                              ).call(this, t, n)
                        },
                      },
                    ],
                    [
                      {
                        key: 'create',
                        value: function (t) {
                          var n = i(
                            e.__proto__ || Object.getPrototypeOf(e),
                            'create',
                            this
                          ).call(this, t)
                          return (
                            n.setAttribute('frameborder', '0'),
                            n.setAttribute('allowfullscreen', !0),
                            n.setAttribute('src', this.sanitize(t)),
                            n
                          )
                        },
                      },
                      {
                        key: 'formats',
                        value: function (t) {
                          return f.reduce(function (e, n) {
                            return (
                              t.hasAttribute(n) && (e[n] = t.getAttribute(n)), e
                            )
                          }, {})
                        },
                      },
                      {
                        key: 'sanitize',
                        value: function (t) {
                          return u.default.sanitize(t)
                        },
                      },
                      {
                        key: 'value',
                        value: function (t) {
                          return t.getAttribute('src')
                        },
                      },
                    ]
                  ),
                  e
                )
              })(l.BlockEmbed)
            ;(p.blotName = 'video'),
              (p.className = 'ql-video'),
              (p.tagName = 'IFRAME'),
              (e.default = p)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.default = e.FormulaBlot = void 0)
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              o = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              i = u(n(54)),
              l = u(n(5)),
              a = u(n(10))
            function u(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function s(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function c(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            function f(t, e) {
              if ('function' != typeof e && null !== e)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof e
                )
              ;(t.prototype = Object.create(e && e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                e &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, e)
                    : (t.__proto__ = e))
            }
            var p = (function (t) {
              function e() {
                return (
                  s(this, e),
                  c(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                f(e, t),
                r(e, null, [
                  {
                    key: 'create',
                    value: function (t) {
                      var n = o(
                        e.__proto__ || Object.getPrototypeOf(e),
                        'create',
                        this
                      ).call(this, t)
                      return (
                        'string' == typeof t &&
                          (window.katex.render(t, n, {
                            throwOnError: !1,
                            errorColor: '#f00',
                          }),
                          n.setAttribute('data-value', t)),
                        n
                      )
                    },
                  },
                  {
                    key: 'value',
                    value: function (t) {
                      return t.getAttribute('data-value')
                    },
                  },
                ]),
                e
              )
            })(i.default)
            ;(p.blotName = 'formula'),
              (p.className = 'ql-formula'),
              (p.tagName = 'SPAN')
            var h = (function (t) {
              function e() {
                s(this, e)
                var t = c(
                  this,
                  (e.__proto__ || Object.getPrototypeOf(e)).call(this)
                )
                if (null == window.katex)
                  throw new Error('Formula module requires KaTeX.')
                return t
              }
              return (
                f(e, t),
                r(e, null, [
                  {
                    key: 'register',
                    value: function () {
                      l.default.register(p, !0)
                    },
                  },
                ]),
                e
              )
            })(a.default)
            ;(e.FormulaBlot = p), (e.default = h)
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.default = e.CodeToken = e.CodeBlock = void 0)
            var r = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              o = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              i = u(n(0)),
              l = u(n(5)),
              a = u(n(10))
            function u(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function s(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function c(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            function f(t, e) {
              if ('function' != typeof e && null !== e)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof e
                )
              ;(t.prototype = Object.create(e && e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                e &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, e)
                    : (t.__proto__ = e))
            }
            var p = (function (t) {
              function e() {
                return (
                  s(this, e),
                  c(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).apply(
                      this,
                      arguments
                    )
                  )
                )
              }
              return (
                f(e, t),
                r(e, [
                  {
                    key: 'replaceWith',
                    value: function (t) {
                      ;(this.domNode.textContent = this.domNode.textContent),
                        this.attach(),
                        o(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'replaceWith',
                          this
                        ).call(this, t)
                    },
                  },
                  {
                    key: 'highlight',
                    value: function (t) {
                      var e = this.domNode.textContent
                      this.cachedText !== e &&
                        ((e.trim().length > 0 || null == this.cachedText) &&
                          ((this.domNode.innerHTML = t(e)),
                          this.domNode.normalize(),
                          this.attach()),
                        (this.cachedText = e))
                    },
                  },
                ]),
                e
              )
            })(u(n(16)).default)
            p.className = 'ql-syntax'
            var h = new i.default.Attributor.Class('token', 'hljs', {
                scope: i.default.Scope.INLINE,
              }),
              d = (function (t) {
                function e(t, n) {
                  s(this, e)
                  var r = c(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
                  )
                  if ('function' != typeof r.options.highlight)
                    throw new Error(
                      'Syntax module requires highlight.js. Please include the library on the page before Quill.'
                    )
                  var o = null
                  return (
                    r.quill.on(l.default.events.SCROLL_OPTIMIZE, function () {
                      clearTimeout(o),
                        (o = setTimeout(function () {
                          r.highlight(), (o = null)
                        }, r.options.interval))
                    }),
                    r.highlight(),
                    r
                  )
                }
                return (
                  f(e, t),
                  r(e, null, [
                    {
                      key: 'register',
                      value: function () {
                        l.default.register(h, !0), l.default.register(p, !0)
                      },
                    },
                  ]),
                  r(e, [
                    {
                      key: 'highlight',
                      value: function () {
                        var t = this
                        if (!this.quill.selection.composing) {
                          this.quill.update(l.default.sources.USER)
                          var e = this.quill.getSelection()
                          this.quill.scroll
                            .descendants(p)
                            .forEach(function (e) {
                              e.highlight(t.options.highlight)
                            }),
                            this.quill.update(l.default.sources.SILENT),
                            null != e &&
                              this.quill.setSelection(
                                e,
                                l.default.sources.SILENT
                              )
                        }
                      },
                    },
                  ]),
                  e
                )
              })(a.default)
            ;(d.DEFAULTS = {
              highlight:
                null == window.hljs
                  ? null
                  : function (t) {
                      return window.hljs.highlightAuto(t).value
                    },
              interval: 1e3,
            }),
              (e.CodeBlock = p),
              (e.CodeToken = h),
              (e.default = d)
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=13 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=9 y1=4 y2=4></line> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=14 x2=4 y1=14 y2=14></line> <line class=ql-stroke x1=12 x2=6 y1=4 y2=4></line> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=5 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=9 y1=4 y2=4></line> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=15 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=15 x2=3 y1=14 y2=14></line> <line class=ql-stroke x1=15 x2=3 y1=4 y2=4></line> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <g class="ql-fill ql-color-label"> <polygon points="6 6.868 6 6 5 6 5 7 5.942 7 6 6.868"></polygon> <rect height=1 width=1 x=4 y=4></rect> <polygon points="6.817 5 6 5 6 6 6.38 6 6.817 5"></polygon> <rect height=1 width=1 x=2 y=6></rect> <rect height=1 width=1 x=3 y=5></rect> <rect height=1 width=1 x=4 y=7></rect> <polygon points="4 11.439 4 11 3 11 3 12 3.755 12 4 11.439"></polygon> <rect height=1 width=1 x=2 y=12></rect> <rect height=1 width=1 x=2 y=9></rect> <rect height=1 width=1 x=2 y=15></rect> <polygon points="4.63 10 4 10 4 11 4.192 11 4.63 10"></polygon> <rect height=1 width=1 x=3 y=8></rect> <path d=M10.832,4.2L11,4.582V4H10.708A1.948,1.948,0,0,1,10.832,4.2Z></path> <path d=M7,4.582L7.168,4.2A1.929,1.929,0,0,1,7.292,4H7V4.582Z></path> <path d=M8,13H7.683l-0.351.8a1.933,1.933,0,0,1-.124.2H8V13Z></path> <rect height=1 width=1 x=12 y=2></rect> <rect height=1 width=1 x=11 y=3></rect> <path d=M9,3H8V3.282A1.985,1.985,0,0,1,9,3Z></path> <rect height=1 width=1 x=2 y=3></rect> <rect height=1 width=1 x=6 y=2></rect> <rect height=1 width=1 x=3 y=2></rect> <rect height=1 width=1 x=5 y=3></rect> <rect height=1 width=1 x=9 y=2></rect> <rect height=1 width=1 x=15 y=14></rect> <polygon points="13.447 10.174 13.469 10.225 13.472 10.232 13.808 11 14 11 14 10 13.37 10 13.447 10.174"></polygon> <rect height=1 width=1 x=13 y=7></rect> <rect height=1 width=1 x=15 y=5></rect> <rect height=1 width=1 x=14 y=6></rect> <rect height=1 width=1 x=15 y=8></rect> <rect height=1 width=1 x=14 y=9></rect> <path d=M3.775,14H3v1H4V14.314A1.97,1.97,0,0,1,3.775,14Z></path> <rect height=1 width=1 x=14 y=3></rect> <polygon points="12 6.868 12 6 11.62 6 12 6.868"></polygon> <rect height=1 width=1 x=15 y=2></rect> <rect height=1 width=1 x=12 y=5></rect> <rect height=1 width=1 x=13 y=4></rect> <polygon points="12.933 9 13 9 13 8 12.495 8 12.933 9"></polygon> <rect height=1 width=1 x=9 y=14></rect> <rect height=1 width=1 x=8 y=15></rect> <path d=M6,14.926V15H7V14.316A1.993,1.993,0,0,1,6,14.926Z></path> <rect height=1 width=1 x=5 y=15></rect> <path d=M10.668,13.8L10.317,13H10v1h0.792A1.947,1.947,0,0,1,10.668,13.8Z></path> <rect height=1 width=1 x=11 y=15></rect> <path d=M14.332,12.2a1.99,1.99,0,0,1,.166.8H15V12H14.245Z></path> <rect height=1 width=1 x=14 y=15></rect> <rect height=1 width=1 x=15 y=11></rect> </g> <polyline class=ql-stroke points="5.5 13 9 5 12.5 13"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=11 y2=11></line> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <rect class="ql-fill ql-stroke" height=3 width=3 x=4 y=5></rect> <rect class="ql-fill ql-stroke" height=3 width=3 x=11 y=5></rect> <path class="ql-even ql-fill ql-stroke" d=M7,8c0,4.031-3,5-3,5></path> <path class="ql-even ql-fill ql-stroke" d=M14,8c0,4.031-3,5-3,5></path> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z></path> <path class=ql-stroke d=M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z></path> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=5 x2=13 y1=3 y2=3></line> <line class=ql-stroke x1=6 x2=9.35 y1=12 y2=3></line> <line class=ql-stroke x1=11 x2=15 y1=11 y2=15></line> <line class=ql-stroke x1=15 x2=11 y1=11 y2=15></line> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=7 x=2 y=14></rect> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class="ql-color-label ql-stroke ql-transparent" x1=3 x2=15 y1=15 y2=15></line> <polyline class=ql-stroke points="5.5 11 9 3 12.5 11"></polyline> <line class=ql-stroke x1=11.63 x2=6.38 y1=9 y2=9></line> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="3 11 5 9 3 7 3 11"></polygon> <line class="ql-stroke ql-fill" x1=15 x2=11 y1=4 y2=4></line> <path class=ql-fill d=M11,3a3,3,0,0,0,0,6h1V3H11Z></path> <rect class=ql-fill height=11 width=1 x=11 y=4></rect> <rect class=ql-fill height=11 width=1 x=13 y=4></rect> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <polygon class="ql-stroke ql-fill" points="15 12 13 10 15 8 15 12"></polygon> <line class="ql-stroke ql-fill" x1=9 x2=5 y1=4 y2=4></line> <path class=ql-fill d=M5,3A3,3,0,0,0,5,9H6V3H5Z></path> <rect class=ql-fill height=11 width=1 x=5 y=4></rect> <rect class=ql-fill height=11 width=1 x=7 y=4></rect> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M14,16H4a1,1,0,0,1,0-2H14A1,1,0,0,1,14,16Z /> <path class=ql-fill d=M14,4H4A1,1,0,0,1,4,2H14A1,1,0,0,1,14,4Z /> <rect class=ql-fill x=3 y=6 width=12 height=6 rx=1 ry=1 /> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M13,16H5a1,1,0,0,1,0-2h8A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H5A1,1,0,0,1,5,2h8A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=2 y=6 width=14 height=6 rx=1 ry=1 /> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15,8H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,8Z /> <path class=ql-fill d=M15,12H13a1,1,0,0,1,0-2h2A1,1,0,0,1,15,12Z /> <path class=ql-fill d=M15,16H5a1,1,0,0,1,0-2H15A1,1,0,0,1,15,16Z /> <path class=ql-fill d=M15,4H5A1,1,0,0,1,5,2H15A1,1,0,0,1,15,4Z /> <rect class=ql-fill x=2 y=6 width=8 height=6 rx=1 ry=1 /> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M5,8H3A1,1,0,0,1,3,6H5A1,1,0,0,1,5,8Z /> <path class=ql-fill d=M5,12H3a1,1,0,0,1,0-2H5A1,1,0,0,1,5,12Z /> <path class=ql-fill d=M13,16H3a1,1,0,0,1,0-2H13A1,1,0,0,1,13,16Z /> <path class=ql-fill d=M13,4H3A1,1,0,0,1,3,2H13A1,1,0,0,1,13,4Z /> <rect class=ql-fill x=8 y=6 width=8 height=6 rx=1 ry=1 transform="translate(24 18) rotate(-180)"/> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M11.759,2.482a2.561,2.561,0,0,0-3.53.607A7.656,7.656,0,0,0,6.8,6.2C6.109,9.188,5.275,14.677,4.15,14.927a1.545,1.545,0,0,0-1.3-.933A0.922,0.922,0,0,0,2,15.036S1.954,16,4.119,16s3.091-2.691,3.7-5.553c0.177-.826.36-1.726,0.554-2.6L8.775,6.2c0.381-1.421.807-2.521,1.306-2.676a1.014,1.014,0,0,0,1.02.56A0.966,0.966,0,0,0,11.759,2.482Z></path> <rect class=ql-fill height=1.6 rx=0.8 ry=0.8 width=5 x=5.15 y=6.2></rect> <path class=ql-fill d=M13.663,12.027a1.662,1.662,0,0,1,.266-0.276q0.193,0.069.456,0.138a2.1,2.1,0,0,0,.535.069,1.075,1.075,0,0,0,.767-0.3,1.044,1.044,0,0,0,.314-0.8,0.84,0.84,0,0,0-.238-0.619,0.8,0.8,0,0,0-.594-0.239,1.154,1.154,0,0,0-.781.3,4.607,4.607,0,0,0-.781,1q-0.091.15-.218,0.346l-0.246.38c-0.068-.288-0.137-0.582-0.212-0.885-0.459-1.847-2.494-.984-2.941-0.8-0.482.2-.353,0.647-0.094,0.529a0.869,0.869,0,0,1,1.281.585c0.217,0.751.377,1.436,0.527,2.038a5.688,5.688,0,0,1-.362.467,2.69,2.69,0,0,1-.264.271q-0.221-.08-0.471-0.147a2.029,2.029,0,0,0-.522-0.066,1.079,1.079,0,0,0-.768.3A1.058,1.058,0,0,0,9,15.131a0.82,0.82,0,0,0,.832.852,1.134,1.134,0,0,0,.787-0.3,5.11,5.11,0,0,0,.776-0.993q0.141-.219.215-0.34c0.046-.076.122-0.194,0.223-0.346a2.786,2.786,0,0,0,.918,1.726,2.582,2.582,0,0,0,2.376-.185c0.317-.181.212-0.565,0-0.494A0.807,0.807,0,0,1,14.176,15a5.159,5.159,0,0,1-.913-2.446l0,0Q13.487,12.24,13.663,12.027Z></path> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z /> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewBox="0 0 18 18"> <path class=ql-fill d=M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z /> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=13 y1=4 y2=4></line> <line class=ql-stroke x1=5 x2=11 y1=14 y2=14></line> <line class=ql-stroke x1=8 x2=10 y1=14 y2=4></line> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=10 width=12 x=3 y=4></rect> <circle class=ql-fill cx=6 cy=7 r=1></circle> <polyline class="ql-even ql-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class="ql-fill ql-stroke" points="3 7 3 11 5 9 3 7"></polyline> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=3 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="5 7 5 11 3 9 5 7"></polyline> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=11 y1=7 y2=11></line> <path class="ql-even ql-stroke" d=M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z></path> <path class="ql-even ql-stroke" d=M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z></path> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=7 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=7 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=7 x2=15 y1=14 y2=14></line> <line class="ql-stroke ql-thin" x1=2.5 x2=4.5 y1=5.5 y2=5.5></line> <path class=ql-fill d=M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z></path> <path class="ql-stroke ql-thin" d=M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156></path> <path class="ql-stroke ql-thin" d=M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109></path> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class=ql-stroke x1=6 x2=15 y1=4 y2=4></line> <line class=ql-stroke x1=6 x2=15 y1=9 y2=9></line> <line class=ql-stroke x1=6 x2=15 y1=14 y2=14></line> <line class=ql-stroke x1=3 x2=3 y1=4 y2=4></line> <line class=ql-stroke x1=3 x2=3 y1=9 y2=9></line> <line class=ql-stroke x1=3 x2=3 y1=14 y2=14></line> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg class="" viewbox="0 0 18 18"> <line class=ql-stroke x1=9 x2=15 y1=4 y2=4></line> <polyline class=ql-stroke points="3 4 4 5 6 3"></polyline> <line class=ql-stroke x1=9 x2=15 y1=14 y2=14></line> <polyline class=ql-stroke points="3 14 4 15 6 13"></polyline> <line class=ql-stroke x1=9 x2=15 y1=9 y2=9></line> <polyline class=ql-stroke points="3 9 4 10 6 8"></polyline> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,15H13.861a3.858,3.858,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.921,1.921,0,0,0,12.021,11.7a0.50013,0.50013,0,1,0,.957.291h0a0.914,0.914,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.076-1.16971,1.86982-1.93971,2.43082A1.45639,1.45639,0,0,0,12,15.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,15Z /> <path class=ql-fill d=M9.65,5.241a1,1,0,0,0-1.409.108L6,7.964,3.759,5.349A1,1,0,0,0,2.192,6.59178Q2.21541,6.6213,2.241,6.649L4.684,9.5,2.241,12.35A1,1,0,0,0,3.71,13.70722q0.02557-.02768.049-0.05722L6,11.036,8.241,13.65a1,1,0,1,0,1.567-1.24277Q9.78459,12.3777,9.759,12.35L7.316,9.5,9.759,6.651A1,1,0,0,0,9.65,5.241Z /> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <path class=ql-fill d=M15.5,7H13.861a4.015,4.015,0,0,0,1.914-2.975,1.8,1.8,0,0,0-1.6-1.751A1.922,1.922,0,0,0,12.021,3.7a0.5,0.5,0,1,0,.957.291,0.917,0.917,0,0,1,1.053-.725,0.81,0.81,0,0,1,.744.762c0,1.077-1.164,1.925-1.934,2.486A1.423,1.423,0,0,0,12,7.5a0.5,0.5,0,0,0,.5.5h3A0.5,0.5,0,0,0,15.5,7Z /> <path class=ql-fill d=M9.651,5.241a1,1,0,0,0-1.41.108L6,7.964,3.759,5.349a1,1,0,1,0-1.519,1.3L4.683,9.5,2.241,12.35a1,1,0,1,0,1.519,1.3L6,11.036,8.241,13.65a1,1,0,0,0,1.519-1.3L7.317,9.5,9.759,6.651A1,1,0,0,0,9.651,5.241Z /> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <line class="ql-stroke ql-thin" x1=15.5 x2=2.5 y1=8.5 y2=9.5></line> <path class=ql-fill d=M9.007,8C6.542,7.791,6,7.519,6,6.5,6,5.792,7.283,5,9,5c1.571,0,2.765.679,2.969,1.309a1,1,0,0,0,1.9-.617C13.356,4.106,11.354,3,9,3,6.2,3,4,4.538,4,6.5a3.2,3.2,0,0,0,.5,1.843Z></path> <path class=ql-fill d=M8.984,10C11.457,10.208,12,10.479,12,11.5c0,0.708-1.283,1.5-3,1.5-1.571,0-2.765-.679-2.969-1.309a1,1,0,1,0-1.9.617C4.644,13.894,6.646,15,9,15c2.8,0,5-1.538,5-3.5a3.2,3.2,0,0,0-.5-1.843Z></path> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <path class=ql-stroke d=M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3></path> <rect class=ql-fill height=1 rx=0.5 ry=0.5 width=12 x=3 y=15></rect> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <rect class=ql-stroke height=12 width=12 x=3 y=3></rect> <rect class=ql-fill height=12 width=1 x=5 y=3></rect> <rect class=ql-fill height=12 width=1 x=12 y=3></rect> <rect class=ql-fill height=2 width=8 x=5 y=8></rect> <rect class=ql-fill height=1 width=3 x=3 y=5></rect> <rect class=ql-fill height=1 width=3 x=3 y=7></rect> <rect class=ql-fill height=1 width=3 x=3 y=10></rect> <rect class=ql-fill height=1 width=3 x=3 y=12></rect> <rect class=ql-fill height=1 width=3 x=12 y=5></rect> <rect class=ql-fill height=1 width=3 x=12 y=7></rect> <rect class=ql-fill height=1 width=3 x=12 y=10></rect> <rect class=ql-fill height=1 width=3 x=12 y=12></rect> </svg>'
          },
          function (t, e) {
            t.exports =
              '<svg viewbox="0 0 18 18"> <polygon class=ql-stroke points="7 11 9 13 11 11 7 11"></polygon> <polygon class=ql-stroke points="7 7 9 5 11 7 7 7"></polygon> </svg>'
          },
          function (t, e, n) {
            Object.defineProperty(e, '__esModule', { value: !0 }),
              (e.default = e.BubbleTooltip = void 0)
            var r = function t(e, n, r) {
                null === e && (e = Function.prototype)
                var o = Object.getOwnPropertyDescriptor(e, n)
                if (void 0 === o) {
                  var i = Object.getPrototypeOf(e)
                  return null === i ? void 0 : t(i, n, r)
                }
                if ('value' in o) return o.value
                var l = o.get
                return void 0 !== l ? l.call(r) : void 0
              },
              o = (function () {
                function t(t, e) {
                  for (var n = 0; n < e.length; n++) {
                    var r = e[n]
                    ;(r.enumerable = r.enumerable || !1),
                      (r.configurable = !0),
                      'value' in r && (r.writable = !0),
                      Object.defineProperty(t, r.key, r)
                  }
                }
                return function (e, n, r) {
                  return n && t(e.prototype, n), r && t(e, r), e
                }
              })(),
              i = f(n(3)),
              l = f(n(9)),
              a = n(62),
              u = f(a),
              s = n(18),
              c = f(n(60))
            function f(t) {
              return t && t.__esModule ? t : { default: t }
            }
            function p(t, e) {
              if (!(t instanceof e))
                throw new TypeError('Cannot call a class as a function')
            }
            function h(t, e) {
              if (!t)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                )
              return !e || ('object' != typeof e && 'function' != typeof e)
                ? t
                : e
            }
            function d(t, e) {
              if ('function' != typeof e && null !== e)
                throw new TypeError(
                  'Super expression must either be null or a function, not ' +
                    typeof e
                )
              ;(t.prototype = Object.create(e && e.prototype, {
                constructor: {
                  value: t,
                  enumerable: !1,
                  writable: !0,
                  configurable: !0,
                },
              })),
                e &&
                  (Object.setPrototypeOf
                    ? Object.setPrototypeOf(t, e)
                    : (t.__proto__ = e))
            }
            var y = [
                ['bold', 'italic', 'link'],
                [{ header: 1 }, { header: 2 }, 'blockquote'],
              ],
              v = (function (t) {
                function e(t, n) {
                  p(this, e),
                    null != n.modules.toolbar &&
                      null == n.modules.toolbar.container &&
                      (n.modules.toolbar.container = y)
                  var r = h(
                    this,
                    (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
                  )
                  return r.quill.container.classList.add('ql-bubble'), r
                }
                return (
                  d(e, t),
                  o(e, [
                    {
                      key: 'extendToolbar',
                      value: function (t) {
                        ;(this.tooltip = new b(
                          this.quill,
                          this.options.bounds
                        )),
                          this.tooltip.root.appendChild(t.container),
                          this.buildButtons(
                            [].slice.call(
                              t.container.querySelectorAll('button')
                            ),
                            c.default
                          ),
                          this.buildPickers(
                            [].slice.call(
                              t.container.querySelectorAll('select')
                            ),
                            c.default
                          )
                      },
                    },
                  ]),
                  e
                )
              })(u.default)
            v.DEFAULTS = (0, i.default)(!0, {}, u.default.DEFAULTS, {
              modules: {
                toolbar: {
                  handlers: {
                    link: function (t) {
                      t
                        ? this.quill.theme.tooltip.edit()
                        : this.quill.format('link', !1)
                    },
                  },
                },
              },
            })
            var b = (function (t) {
              function e(t, n) {
                p(this, e)
                var r = h(
                  this,
                  (e.__proto__ || Object.getPrototypeOf(e)).call(this, t, n)
                )
                return (
                  r.quill.on(
                    l.default.events.EDITOR_CHANGE,
                    function (t, e, n, o) {
                      if (t === l.default.events.SELECTION_CHANGE)
                        if (
                          null != e &&
                          e.length > 0 &&
                          o === l.default.sources.USER
                        ) {
                          r.show(),
                            (r.root.style.left = '0px'),
                            (r.root.style.width = ''),
                            (r.root.style.width = r.root.offsetWidth + 'px')
                          var i = r.quill.getLines(e.index, e.length)
                          if (1 === i.length) r.position(r.quill.getBounds(e))
                          else {
                            var a = i[i.length - 1],
                              u = r.quill.getIndex(a),
                              c = Math.min(
                                a.length() - 1,
                                e.index + e.length - u
                              ),
                              f = r.quill.getBounds(new s.Range(u, c))
                            r.position(f)
                          }
                        } else
                          document.activeElement !== r.textbox &&
                            r.quill.hasFocus() &&
                            r.hide()
                    }
                  ),
                  r
                )
              }
              return (
                d(e, t),
                o(e, [
                  {
                    key: 'listen',
                    value: function () {
                      var t = this
                      r(
                        e.prototype.__proto__ ||
                          Object.getPrototypeOf(e.prototype),
                        'listen',
                        this
                      ).call(this),
                        this.root
                          .querySelector('.ql-close')
                          .addEventListener('click', function () {
                            t.root.classList.remove('ql-editing')
                          }),
                        this.quill.on(
                          l.default.events.SCROLL_OPTIMIZE,
                          function () {
                            setTimeout(function () {
                              if (!t.root.classList.contains('ql-hidden')) {
                                var e = t.quill.getSelection()
                                null != e && t.position(t.quill.getBounds(e))
                              }
                            }, 1)
                          }
                        )
                    },
                  },
                  {
                    key: 'cancel',
                    value: function () {
                      this.show()
                    },
                  },
                  {
                    key: 'position',
                    value: function (t) {
                      var n = r(
                          e.prototype.__proto__ ||
                            Object.getPrototypeOf(e.prototype),
                          'position',
                          this
                        ).call(this, t),
                        o = this.root.querySelector('.ql-tooltip-arrow')
                      if (((o.style.marginLeft = ''), 0 === n)) return n
                      o.style.marginLeft = -1 * n - o.offsetWidth / 2 + 'px'
                    },
                  },
                ]),
                e
              )
            })(a.BaseTooltip)
            ;(b.TEMPLATE = [
              '<span class="ql-tooltip-arrow"></span>',
              '<div class="ql-tooltip-editor">',
              '<input type="text" data-formula="e=mc^2" data-link="https://quilljs.com" data-video="Embed URL">',
              '<a class="ql-close"></a>',
              '</div>',
            ].join('')),
              (e.BubbleTooltip = b),
              (e.default = v)
          },
          function (t, e, n) {
            t.exports = n(100)
          },
        ]).default
      }),
      (t.exports = n())
  })(rt)
  var ot = nt(rt.exports),
    it = -1
  function lt(t, e, n, r) {
    if (t === e) return t ? [[0, t]] : []
    if (null != n) {
      var o = (function (t, e, n) {
        var r = 'number' == typeof n ? { index: n, length: 0 } : n.oldRange,
          o = 'number' == typeof n ? null : n.newRange,
          i = t.length,
          l = e.length
        if (0 === r.length && (null === o || 0 === o.length)) {
          var a = r.index,
            u = t.slice(0, a),
            s = t.slice(a),
            c = o ? o.index : null,
            f = a + l - i
          if ((null === c || c === f) && !(f < 0 || f > l)) {
            var p = e.slice(0, f)
            if ((y = e.slice(f)) === s) {
              var h = Math.min(a, f)
              if ((b = u.slice(0, h)) === (m = p.slice(0, h)))
                return yt(b, u.slice(h), p.slice(h), s)
            }
          }
          if (null === c || c === a) {
            var d = a,
              y = ((p = e.slice(0, d)), e.slice(d))
            if (p === u) {
              var v = Math.min(i - d, l - d)
              if ((g = s.slice(s.length - v)) === (_ = y.slice(y.length - v)))
                return yt(
                  u,
                  s.slice(0, s.length - v),
                  y.slice(0, y.length - v),
                  g
                )
            }
          }
        }
        if (r.length > 0 && o && 0 === o.length) {
          var b = t.slice(0, r.index),
            g = t.slice(r.index + r.length)
          if (!(l < (h = b.length) + (v = g.length))) {
            var m = e.slice(0, h),
              _ = e.slice(l - v)
            if (b === m && g === _)
              return yt(b, t.slice(h, i - v), e.slice(h, l - v), g)
          }
        }
        return null
      })(t, e, n)
      if (o) return o
    }
    var i = ut(t, e),
      l = t.substring(0, i)
    i = st((t = t.substring(i)), (e = e.substring(i)))
    var a = t.substring(t.length - i),
      u = (function (t, e) {
        var n
        if (!t) return [[1, e]]
        if (!e) return [[it, t]]
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
            t.length > e.length && (n[0][0] = n[2][0] = it),
            n
          )
        if (1 === o.length)
          return [
            [it, t],
            [1, e],
          ]
        var l = (function (t, e) {
          var n = t.length > e.length ? t : e,
            r = t.length > e.length ? e : t
          if (n.length < 4 || 2 * r.length < n.length) return null
          function o(t, e, n) {
            for (
              var r,
                o,
                i,
                l,
                a = t.substring(n, n + Math.floor(t.length / 4)),
                u = -1,
                s = '';
              -1 !== (u = e.indexOf(a, u + 1));

            ) {
              var c = ut(t.substring(n), e.substring(u)),
                f = st(t.substring(0, n), e.substring(0, u))
              s.length < f + c &&
                ((s = e.substring(u - f, u) + e.substring(u, u + c)),
                (r = t.substring(0, n - f)),
                (o = t.substring(n + c)),
                (i = e.substring(0, u - f)),
                (l = e.substring(u + c)))
            }
            return 2 * s.length >= t.length ? [r, o, i, l, s] : null
          }
          var i,
            l,
            a,
            u,
            s,
            c = o(n, r, Math.ceil(n.length / 4)),
            f = o(n, r, Math.ceil(n.length / 2))
          if (!c && !f) return null
          i = f ? (c && c[4].length > f[4].length ? c : f) : c
          t.length > e.length
            ? ((l = i[0]), (a = i[1]), (u = i[2]), (s = i[3]))
            : ((u = i[0]), (s = i[1]), (l = i[2]), (a = i[3]))
          return [l, a, u, s, i[4]]
        })(t, e)
        if (l) {
          var a = l[1],
            u = l[3],
            s = l[4],
            c = lt(l[0], l[2]),
            f = lt(a, u)
          return c.concat([[0, s]], f)
        }
        return (function (t, e) {
          for (
            var n = t.length,
              r = e.length,
              o = Math.ceil((n + r) / 2),
              i = o,
              l = 2 * o,
              a = new Array(l),
              u = new Array(l),
              s = 0;
            s < l;
            s++
          )
            (a[s] = -1), (u[s] = -1)
          ;(a[i + 1] = 0), (u[i + 1] = 0)
          for (
            var c = n - r, f = c % 2 != 0, p = 0, h = 0, d = 0, y = 0, v = 0;
            v < o;
            v++
          ) {
            for (var b = -v + p; b <= v - h; b += 2) {
              for (
                var g = i + b,
                  m =
                    (E =
                      b === -v || (b !== v && a[g - 1] < a[g + 1])
                        ? a[g + 1]
                        : a[g - 1] + 1) - b;
                E < n && m < r && t.charAt(E) === e.charAt(m);

              )
                E++, m++
              if (((a[g] = E), E > n)) h += 2
              else if (m > r) p += 2
              else if (f) {
                if ((w = i + c - b) >= 0 && w < l && -1 !== u[w])
                  if (E >= (O = n - u[w])) return at(t, e, E, m)
              }
            }
            for (var _ = -v + d; _ <= v - y; _ += 2) {
              for (
                var O,
                  w = i + _,
                  x =
                    (O =
                      _ === -v || (_ !== v && u[w - 1] < u[w + 1])
                        ? u[w + 1]
                        : u[w - 1] + 1) - _;
                O < n && x < r && t.charAt(n - O - 1) === e.charAt(r - x - 1);

              )
                O++, x++
              if (((u[w] = O), O > n)) y += 2
              else if (x > r) d += 2
              else if (!f) {
                if ((g = i + c - _) >= 0 && g < l && -1 !== a[g]) {
                  var E
                  m = i + (E = a[g]) - g
                  if (E >= (O = n - O)) return at(t, e, E, m)
                }
              }
            }
          }
          return [
            [it, t],
            [1, e],
          ]
        })(t, e)
      })((t = t.substring(0, t.length - i)), (e = e.substring(0, e.length - i)))
    return l && u.unshift([0, l]), a && u.push([0, a]), ct(u, r), u
  }
  function at(t, e, n, r) {
    var o = t.substring(0, n),
      i = e.substring(0, r),
      l = t.substring(n),
      a = e.substring(r),
      u = lt(o, i),
      s = lt(l, a)
    return u.concat(s)
  }
  function ut(t, e) {
    if (!t || !e || t.charAt(0) !== e.charAt(0)) return 0
    for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o; )
      t.substring(i, o) == e.substring(i, o) ? (i = n = o) : (r = o),
        (o = Math.floor((r - n) / 2 + n))
    return ft(t.charCodeAt(o - 1)) && o--, o
  }
  function st(t, e) {
    if (!t || !e || t.slice(-1) !== e.slice(-1)) return 0
    for (var n = 0, r = Math.min(t.length, e.length), o = r, i = 0; n < o; )
      t.substring(t.length - o, t.length - i) ==
      e.substring(e.length - o, e.length - i)
        ? (i = n = o)
        : (r = o),
        (o = Math.floor((r - n) / 2 + n))
    return pt(t.charCodeAt(t.length - o)) && o--, o
  }
  function ct(t, e) {
    t.push([0, ''])
    for (var n, r = 0, o = 0, i = 0, l = '', a = ''; r < t.length; )
      if (r < t.length - 1 && !t[r][1]) t.splice(r, 1)
      else
        switch (t[r][0]) {
          case 1:
            i++, (a += t[r][1]), r++
            break
          case it:
            o++, (l += t[r][1]), r++
            break
          case 0:
            var u = r - i - o - 1
            if (e) {
              if (u >= 0 && dt(t[u][1])) {
                var s = t[u][1].slice(-1)
                if (
                  ((t[u][1] = t[u][1].slice(0, -1)),
                  (l = s + l),
                  (a = s + a),
                  !t[u][1])
                ) {
                  t.splice(u, 1), r--
                  var c = u - 1
                  t[c] && 1 === t[c][0] && (i++, (a = t[c][1] + a), c--),
                    t[c] && t[c][0] === it && (o++, (l = t[c][1] + l), c--),
                    (u = c)
                }
              }
              if (ht(t[r][1])) {
                s = t[r][1].charAt(0)
                ;(t[r][1] = t[r][1].slice(1)), (l += s), (a += s)
              }
            }
            if (r < t.length - 1 && !t[r][1]) {
              t.splice(r, 1)
              break
            }
            if (l.length > 0 || a.length > 0) {
              l.length > 0 &&
                a.length > 0 &&
                (0 !== (n = ut(a, l)) &&
                  (u >= 0
                    ? (t[u][1] += a.substring(0, n))
                    : (t.splice(0, 0, [0, a.substring(0, n)]), r++),
                  (a = a.substring(n)),
                  (l = l.substring(n))),
                0 !== (n = st(a, l)) &&
                  ((t[r][1] = a.substring(a.length - n) + t[r][1]),
                  (a = a.substring(0, a.length - n)),
                  (l = l.substring(0, l.length - n))))
              var f = i + o
              0 === l.length && 0 === a.length
                ? (t.splice(r - f, f), (r -= f))
                : 0 === l.length
                ? (t.splice(r - f, f, [1, a]), (r = r - f + 1))
                : 0 === a.length
                ? (t.splice(r - f, f, [it, l]), (r = r - f + 1))
                : (t.splice(r - f, f, [it, l], [1, a]), (r = r - f + 2))
            }
            0 !== r && 0 === t[r - 1][0]
              ? ((t[r - 1][1] += t[r][1]), t.splice(r, 1))
              : r++,
              (i = 0),
              (o = 0),
              (l = ''),
              (a = '')
        }
    '' === t[t.length - 1][1] && t.pop()
    var p = !1
    for (r = 1; r < t.length - 1; )
      0 === t[r - 1][0] &&
        0 === t[r + 1][0] &&
        (t[r][1].substring(t[r][1].length - t[r - 1][1].length) === t[r - 1][1]
          ? ((t[r][1] =
              t[r - 1][1] +
              t[r][1].substring(0, t[r][1].length - t[r - 1][1].length)),
            (t[r + 1][1] = t[r - 1][1] + t[r + 1][1]),
            t.splice(r - 1, 1),
            (p = !0))
          : t[r][1].substring(0, t[r + 1][1].length) == t[r + 1][1] &&
            ((t[r - 1][1] += t[r + 1][1]),
            (t[r][1] = t[r][1].substring(t[r + 1][1].length) + t[r + 1][1]),
            t.splice(r + 1, 1),
            (p = !0))),
        r++
    p && ct(t, e)
  }
  function ft(t) {
    return t >= 55296 && t <= 56319
  }
  function pt(t) {
    return t >= 56320 && t <= 57343
  }
  function ht(t) {
    return pt(t.charCodeAt(0))
  }
  function dt(t) {
    return ft(t.charCodeAt(t.length - 1))
  }
  function yt(t, e, n, r) {
    return dt(t) || ht(r)
      ? null
      : (function (t) {
          for (var e = [], n = 0; n < t.length; n++)
            t[n][1].length > 0 && e.push(t[n])
          return e
        })([
          [0, t],
          [it, e],
          [1, n],
          [0, r],
        ])
  }
  function vt(t, e, n) {
    return lt(t, e, n, !0)
  }
  ;(vt.INSERT = 1), (vt.DELETE = it), (vt.EQUAL = 0)
  var bt = vt,
    gt = { exports: {} }
  !(function (t, e) {
    var n = '__lodash_hash_undefined__',
      r = 9007199254740991,
      o = '[object Arguments]',
      i = '[object Boolean]',
      l = '[object Date]',
      a = '[object Function]',
      u = '[object GeneratorFunction]',
      s = '[object Map]',
      c = '[object Number]',
      f = '[object Object]',
      p = '[object Promise]',
      h = '[object RegExp]',
      d = '[object Set]',
      y = '[object String]',
      v = '[object Symbol]',
      b = '[object WeakMap]',
      g = '[object ArrayBuffer]',
      m = '[object DataView]',
      _ = '[object Float32Array]',
      O = '[object Float64Array]',
      w = '[object Int8Array]',
      x = '[object Int16Array]',
      E = '[object Int32Array]',
      A = '[object Uint8Array]',
      k = '[object Uint8ClampedArray]',
      j = '[object Uint16Array]',
      N = '[object Uint32Array]',
      P = /\w*$/,
      S = /^\[object .+?Constructor\]$/,
      T = /^(?:0|[1-9]\d*)$/,
      q = {}
    ;(q[o] =
      q['[object Array]'] =
      q[g] =
      q[m] =
      q[i] =
      q[l] =
      q[_] =
      q[O] =
      q[w] =
      q[x] =
      q[E] =
      q[s] =
      q[c] =
      q[f] =
      q[h] =
      q[d] =
      q[y] =
      q[v] =
      q[A] =
      q[k] =
      q[j] =
      q[N] =
        !0),
      (q['[object Error]'] = q[a] = q[b] = !1)
    var C = 'object' == typeof self && self && self.Object === Object && self,
      L =
        ('object' == typeof et && et && et.Object === Object && et) ||
        C ||
        Function('return this')(),
      R = e && !e.nodeType && e,
      M = R && t && !t.nodeType && t,
      I = M && M.exports === R
    function B(t, e) {
      return t.set(e[0], e[1]), t
    }
    function D(t, e) {
      return t.add(e), t
    }
    function U(t, e, n, r) {
      var o = -1,
        i = t ? t.length : 0
      for (r && i && (n = t[++o]); ++o < i; ) n = e(n, t[o], o, t)
      return n
    }
    function F(t) {
      var e = !1
      if (null != t && 'function' != typeof t.toString)
        try {
          e = !!(t + '')
        } catch (n) {}
      return e
    }
    function H(t) {
      var e = -1,
        n = Array(t.size)
      return (
        t.forEach(function (t, r) {
          n[++e] = [r, t]
        }),
        n
      )
    }
    function z(t, e) {
      return function (n) {
        return t(e(n))
      }
    }
    function K(t) {
      var e = -1,
        n = Array(t.size)
      return (
        t.forEach(function (t) {
          n[++e] = t
        }),
        n
      )
    }
    var Y,
      V = Array.prototype,
      W = Function.prototype,
      $ = Object.prototype,
      G = L['__core-js_shared__'],
      Z = (Y = /[^.]+$/.exec((G && G.keys && G.keys.IE_PROTO) || ''))
        ? 'Symbol(src)_1.' + Y
        : '',
      X = W.toString,
      Q = $.hasOwnProperty,
      J = $.toString,
      tt = RegExp(
        '^' +
          X.call(Q)
            .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              '$1.*?'
            ) +
          '$'
      ),
      nt = I ? L.Buffer : void 0,
      rt = L.Symbol,
      ot = L.Uint8Array,
      it = z(Object.getPrototypeOf, Object),
      lt = Object.create,
      at = $.propertyIsEnumerable,
      ut = V.splice,
      st = Object.getOwnPropertySymbols,
      ct = nt ? nt.isBuffer : void 0,
      ft = z(Object.keys, Object),
      pt = It(L, 'DataView'),
      ht = It(L, 'Map'),
      dt = It(L, 'Promise'),
      yt = It(L, 'Set'),
      vt = It(L, 'WeakMap'),
      bt = It(Object, 'create'),
      gt = Ht(pt),
      mt = Ht(ht),
      _t = Ht(dt),
      Ot = Ht(yt),
      wt = Ht(vt),
      xt = rt ? rt.prototype : void 0,
      Et = xt ? xt.valueOf : void 0
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
    function jt(t) {
      var e = -1,
        n = t ? t.length : 0
      for (this.clear(); ++e < n; ) {
        var r = t[e]
        this.set(r[0], r[1])
      }
    }
    function Nt(t) {
      this.__data__ = new kt(t)
    }
    function Pt(t, e) {
      var n =
          Kt(t) ||
          (function (t) {
            return (
              (function (t) {
                return (
                  (function (t) {
                    return !!t && 'object' == typeof t
                  })(t) && Yt(t)
                )
              })(t) &&
              Q.call(t, 'callee') &&
              (!at.call(t, 'callee') || J.call(t) == o)
            )
          })(t)
            ? (function (t, e) {
                for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n)
                return r
              })(t.length, String)
            : [],
        r = n.length,
        i = !!r
      for (var l in t)
        (!e && !Q.call(t, l)) || (i && ('length' == l || Ut(l, r))) || n.push(l)
      return n
    }
    function St(t, e, n) {
      var r = t[e]
      ;(Q.call(t, e) && zt(r, n) && (void 0 !== n || e in t)) || (t[e] = n)
    }
    function Tt(t, e) {
      for (var n = t.length; n--; ) if (zt(t[n][0], e)) return n
      return -1
    }
    function qt(t, e, n, r, p, b, S) {
      var T
      if ((r && (T = b ? r(t, p, b, S) : r(t)), void 0 !== T)) return T
      if (!$t(t)) return t
      var C = Kt(t)
      if (C) {
        if (
          ((T = (function (t) {
            var e = t.length,
              n = t.constructor(e)
            e &&
              'string' == typeof t[0] &&
              Q.call(t, 'index') &&
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
          })(t, T)
      } else {
        var L = Dt(t),
          R = L == a || L == u
        if (Vt(t))
          return (function (t, e) {
            if (e) return t.slice()
            var n = new t.constructor(t.length)
            return t.copy(n), n
          })(t, e)
        if (L == f || L == o || (R && !b)) {
          if (F(t)) return b ? t : {}
          if (
            ((T = (function (t) {
              return 'function' != typeof t.constructor || Ft(t)
                ? {}
                : ((e = it(t)), $t(e) ? lt(e) : {})
              var e
            })(R ? {} : t)),
            !e)
          )
            return (function (t, e) {
              return Rt(t, Bt(t), e)
            })(
              t,
              (function (t, e) {
                return t && Rt(e, Gt(e), t)
              })(T, t)
            )
        } else {
          if (!q[L]) return b ? t : {}
          T = (function (t, e, n, r) {
            var o = t.constructor
            switch (e) {
              case g:
                return Lt(t)
              case i:
              case l:
                return new o(+t)
              case m:
                return (function (t, e) {
                  var n = e ? Lt(t.buffer) : t.buffer
                  return new t.constructor(n, t.byteOffset, t.byteLength)
                })(t, r)
              case _:
              case O:
              case w:
              case x:
              case E:
              case A:
              case k:
              case j:
              case N:
                return (function (t, e) {
                  var n = e ? Lt(t.buffer) : t.buffer
                  return new t.constructor(n, t.byteOffset, t.length)
                })(t, r)
              case s:
                return (function (t, e, n) {
                  return U(e ? n(H(t), !0) : H(t), B, new t.constructor())
                })(t, r, n)
              case c:
              case y:
                return new o(t)
              case h:
                return (function (t) {
                  var e = new t.constructor(t.source, P.exec(t))
                  return (e.lastIndex = t.lastIndex), e
                })(t)
              case d:
                return (function (t, e, n) {
                  return U(e ? n(K(t), !0) : K(t), D, new t.constructor())
                })(t, r, n)
              case v:
                return (a = t), Et ? Object(Et.call(a)) : {}
            }
            var a
          })(t, L, qt, e)
        }
      }
      S || (S = new Nt())
      var M = S.get(t)
      if (M) return M
      if ((S.set(t, T), !C))
        var I = n
          ? (function (t) {
              return (function (t, e, n) {
                var r = e(t)
                return Kt(t)
                  ? r
                  : (function (t, e) {
                      for (var n = -1, r = e.length, o = t.length; ++n < r; )
                        t[o + n] = e[n]
                      return t
                    })(r, n(t))
              })(t, Gt, Bt)
            })(t)
          : Gt(t)
      return (
        (function (t, e) {
          for (
            var n = -1, r = t ? t.length : 0;
            ++n < r && !1 !== e(t[n], n, t);

          );
        })(I || t, function (o, i) {
          I && (o = t[(i = o)]), St(T, i, qt(o, e, n, r, i, t, S))
        }),
        T
      )
    }
    function Ct(t) {
      return (
        !(!$t(t) || ((e = t), Z && Z in e)) &&
        (Wt(t) || F(t) ? tt : S).test(Ht(t))
      )
      var e
    }
    function Lt(t) {
      var e = new t.constructor(t.byteLength)
      return new ot(e).set(new ot(t)), e
    }
    function Rt(t, e, n, r) {
      n || (n = {})
      for (var o = -1, i = e.length; ++o < i; ) {
        var l = e[o],
          a = r ? r(n[l], t[l], l, n, t) : void 0
        St(n, l, void 0 === a ? t[l] : a)
      }
      return n
    }
    function Mt(t, e) {
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
    function It(t, e) {
      var n = (function (t, e) {
        return null == t ? void 0 : t[e]
      })(t, e)
      return Ct(n) ? n : void 0
    }
    ;(At.prototype.clear = function () {
      this.__data__ = bt ? bt(null) : {}
    }),
      (At.prototype.delete = function (t) {
        return this.has(t) && delete this.__data__[t]
      }),
      (At.prototype.get = function (t) {
        var e = this.__data__
        if (bt) {
          var r = e[t]
          return r === n ? void 0 : r
        }
        return Q.call(e, t) ? e[t] : void 0
      }),
      (At.prototype.has = function (t) {
        var e = this.__data__
        return bt ? void 0 !== e[t] : Q.call(e, t)
      }),
      (At.prototype.set = function (t, e) {
        return (this.__data__[t] = bt && void 0 === e ? n : e), this
      }),
      (kt.prototype.clear = function () {
        this.__data__ = []
      }),
      (kt.prototype.delete = function (t) {
        var e = this.__data__,
          n = Tt(e, t)
        return !(n < 0) && (n == e.length - 1 ? e.pop() : ut.call(e, n, 1), !0)
      }),
      (kt.prototype.get = function (t) {
        var e = this.__data__,
          n = Tt(e, t)
        return n < 0 ? void 0 : e[n][1]
      }),
      (kt.prototype.has = function (t) {
        return Tt(this.__data__, t) > -1
      }),
      (kt.prototype.set = function (t, e) {
        var n = this.__data__,
          r = Tt(n, t)
        return r < 0 ? n.push([t, e]) : (n[r][1] = e), this
      }),
      (jt.prototype.clear = function () {
        this.__data__ = {
          hash: new At(),
          map: new (ht || kt)(),
          string: new At(),
        }
      }),
      (jt.prototype.delete = function (t) {
        return Mt(this, t).delete(t)
      }),
      (jt.prototype.get = function (t) {
        return Mt(this, t).get(t)
      }),
      (jt.prototype.has = function (t) {
        return Mt(this, t).has(t)
      }),
      (jt.prototype.set = function (t, e) {
        return Mt(this, t).set(t, e), this
      }),
      (Nt.prototype.clear = function () {
        this.__data__ = new kt()
      }),
      (Nt.prototype.delete = function (t) {
        return this.__data__.delete(t)
      }),
      (Nt.prototype.get = function (t) {
        return this.__data__.get(t)
      }),
      (Nt.prototype.has = function (t) {
        return this.__data__.has(t)
      }),
      (Nt.prototype.set = function (t, e) {
        var n = this.__data__
        if (n instanceof kt) {
          var r = n.__data__
          if (!ht || r.length < 199) return r.push([t, e]), this
          n = this.__data__ = new jt(r)
        }
        return n.set(t, e), this
      })
    var Bt = st
        ? z(st, Object)
        : function () {
            return []
          },
      Dt = function (t) {
        return J.call(t)
      }
    function Ut(t, e) {
      return (
        !!(e = null == e ? r : e) &&
        ('number' == typeof t || T.test(t)) &&
        t > -1 &&
        t % 1 == 0 &&
        t < e
      )
    }
    function Ft(t) {
      var e = t && t.constructor
      return t === (('function' == typeof e && e.prototype) || $)
    }
    function Ht(t) {
      if (null != t) {
        try {
          return X.call(t)
        } catch (e) {}
        try {
          return t + ''
        } catch (e) {}
      }
      return ''
    }
    function zt(t, e) {
      return t === e || (t != t && e != e)
    }
    ;((pt && Dt(new pt(new ArrayBuffer(1))) != m) ||
      (ht && Dt(new ht()) != s) ||
      (dt && Dt(dt.resolve()) != p) ||
      (yt && Dt(new yt()) != d) ||
      (vt && Dt(new vt()) != b)) &&
      (Dt = function (t) {
        var e = J.call(t),
          n = e == f ? t.constructor : void 0,
          r = n ? Ht(n) : void 0
        if (r)
          switch (r) {
            case gt:
              return m
            case mt:
              return s
            case _t:
              return p
            case Ot:
              return d
            case wt:
              return b
          }
        return e
      })
    var Kt = Array.isArray
    function Yt(t) {
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
      var e = $t(t) ? J.call(t) : ''
      return e == a || e == u
    }
    function $t(t) {
      var e = typeof t
      return !!t && ('object' == e || 'function' == e)
    }
    function Gt(t) {
      return Yt(t)
        ? Pt(t)
        : (function (t) {
            if (!Ft(t)) return ft(t)
            var e = []
            for (var n in Object(t))
              Q.call(t, n) && 'constructor' != n && e.push(n)
            return e
          })(t)
    }
    t.exports = function (t) {
      return qt(t, !0, !0)
    }
  })(gt, gt.exports)
  var mt = { exports: {} }
  !(function (t, e) {
    var n = '__lodash_hash_undefined__',
      r = 9007199254740991,
      o = '[object Arguments]',
      i = '[object Array]',
      l = '[object Boolean]',
      a = '[object Date]',
      u = '[object Error]',
      s = '[object Function]',
      c = '[object Map]',
      f = '[object Number]',
      p = '[object Object]',
      h = '[object Promise]',
      d = '[object RegExp]',
      y = '[object Set]',
      v = '[object String]',
      b = '[object Symbol]',
      g = '[object WeakMap]',
      m = '[object ArrayBuffer]',
      _ = '[object DataView]',
      O = /^\[object .+?Constructor\]$/,
      w = /^(?:0|[1-9]\d*)$/,
      x = {}
    ;(x['[object Float32Array]'] =
      x['[object Float64Array]'] =
      x['[object Int8Array]'] =
      x['[object Int16Array]'] =
      x['[object Int32Array]'] =
      x['[object Uint8Array]'] =
      x['[object Uint8ClampedArray]'] =
      x['[object Uint16Array]'] =
      x['[object Uint32Array]'] =
        !0),
      (x[o] =
        x[i] =
        x[m] =
        x[l] =
        x[_] =
        x[a] =
        x[u] =
        x[s] =
        x[c] =
        x[f] =
        x[p] =
        x[d] =
        x[y] =
        x[v] =
        x[g] =
          !1)
    var E = 'object' == typeof et && et && et.Object === Object && et,
      A = 'object' == typeof self && self && self.Object === Object && self,
      k = E || A || Function('return this')(),
      j = e && !e.nodeType && e,
      N = j && t && !t.nodeType && t,
      P = N && N.exports === j,
      S = P && E.process,
      T = (function () {
        try {
          return S && S.binding && S.binding('util')
        } catch (t) {}
      })(),
      q = T && T.isTypedArray
    function C(t, e) {
      for (var n = -1, r = null == t ? 0 : t.length; ++n < r; )
        if (e(t[n], n, t)) return !0
      return !1
    }
    function L(t) {
      var e = -1,
        n = Array(t.size)
      return (
        t.forEach(function (t, r) {
          n[++e] = [r, t]
        }),
        n
      )
    }
    function R(t) {
      var e = -1,
        n = Array(t.size)
      return (
        t.forEach(function (t) {
          n[++e] = t
        }),
        n
      )
    }
    var M,
      I,
      B,
      D = Array.prototype,
      U = Object.prototype,
      F = k['__core-js_shared__'],
      H = Function.prototype.toString,
      z = U.hasOwnProperty,
      K = (M = /[^.]+$/.exec((F && F.keys && F.keys.IE_PROTO) || ''))
        ? 'Symbol(src)_1.' + M
        : '',
      Y = U.toString,
      V = RegExp(
        '^' +
          H.call(z)
            .replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
            .replace(
              /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
              '$1.*?'
            ) +
          '$'
      ),
      W = P ? k.Buffer : void 0,
      $ = k.Symbol,
      G = k.Uint8Array,
      Z = U.propertyIsEnumerable,
      X = D.splice,
      Q = $ ? $.toStringTag : void 0,
      J = Object.getOwnPropertySymbols,
      tt = W ? W.isBuffer : void 0,
      nt =
        ((I = Object.keys),
        (B = Object),
        function (t) {
          return I(B(t))
        }),
      rt = Tt(k, 'DataView'),
      ot = Tt(k, 'Map'),
      it = Tt(k, 'Promise'),
      lt = Tt(k, 'Set'),
      at = Tt(k, 'WeakMap'),
      ut = Tt(Object, 'create'),
      st = Rt(rt),
      ct = Rt(ot),
      ft = Rt(it),
      pt = Rt(lt),
      ht = Rt(at),
      dt = $ ? $.prototype : void 0,
      yt = dt ? dt.valueOf : void 0
    function vt(t) {
      var e = -1,
        n = null == t ? 0 : t.length
      for (this.clear(); ++e < n; ) {
        var r = t[e]
        this.set(r[0], r[1])
      }
    }
    function bt(t) {
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
    function mt(t) {
      var e = -1,
        n = null == t ? 0 : t.length
      for (this.__data__ = new gt(); ++e < n; ) this.add(t[e])
    }
    function _t(t) {
      var e = (this.__data__ = new bt(t))
      this.size = e.size
    }
    function Ot(t, e) {
      var n = Bt(t),
        r = !n && It(t),
        o = !n && !r && Dt(t),
        i = !n && !r && !o && Kt(t),
        l = n || r || o || i,
        a = l
          ? (function (t, e) {
              for (var n = -1, r = Array(t); ++n < t; ) r[n] = e(n)
              return r
            })(t.length, String)
          : [],
        u = a.length
      for (var s in t)
        (!e && !z.call(t, s)) ||
          (l &&
            ('length' == s ||
              (o && ('offset' == s || 'parent' == s)) ||
              (i &&
                ('buffer' == s || 'byteLength' == s || 'byteOffset' == s)) ||
              Lt(s, u))) ||
          a.push(s)
      return a
    }
    function wt(t, e) {
      for (var n = t.length; n--; ) if (Mt(t[n][0], e)) return n
      return -1
    }
    function xt(t) {
      return null == t
        ? void 0 === t
          ? '[object Undefined]'
          : '[object Null]'
        : Q && Q in Object(t)
        ? (function (t) {
            var e = z.call(t, Q),
              n = t[Q]
            try {
              t[Q] = void 0
              var r = !0
            } catch (i) {}
            var o = Y.call(t)
            r && (e ? (t[Q] = n) : delete t[Q])
            return o
          })(t)
        : (function (t) {
            return Y.call(t)
          })(t)
    }
    function Et(t) {
      return zt(t) && xt(t) == o
    }
    function At(t, e, n, r, s) {
      return (
        t === e ||
        (null == t || null == e || (!zt(t) && !zt(e))
          ? t != t && e != e
          : (function (t, e, n, r, s, h) {
              var g = Bt(t),
                O = Bt(e),
                w = g ? i : Ct(t),
                x = O ? i : Ct(e),
                E = (w = w == o ? p : w) == p,
                A = (x = x == o ? p : x) == p,
                k = w == x
              if (k && Dt(t)) {
                if (!Dt(e)) return !1
                ;(g = !0), (E = !1)
              }
              if (k && !E)
                return (
                  h || (h = new _t()),
                  g || Kt(t)
                    ? Nt(t, e, n, r, s, h)
                    : (function (t, e, n, r, o, i, s) {
                        switch (n) {
                          case _:
                            if (
                              t.byteLength != e.byteLength ||
                              t.byteOffset != e.byteOffset
                            )
                              return !1
                            ;(t = t.buffer), (e = e.buffer)
                          case m:
                            return !(
                              t.byteLength != e.byteLength ||
                              !i(new G(t), new G(e))
                            )
                          case l:
                          case a:
                          case f:
                            return Mt(+t, +e)
                          case u:
                            return t.name == e.name && t.message == e.message
                          case d:
                          case v:
                            return t == e + ''
                          case c:
                            var p = L
                          case y:
                            if ((p || (p = R), t.size != e.size && !(1 & r)))
                              return !1
                            var h = s.get(t)
                            if (h) return h == e
                            ;(r |= 2), s.set(t, e)
                            var g = Nt(p(t), p(e), r, o, i, s)
                            return s.delete(t), g
                          case b:
                            if (yt) return yt.call(t) == yt.call(e)
                        }
                        return !1
                      })(t, e, w, n, r, s, h)
                )
              if (!(1 & n)) {
                var j = E && z.call(t, '__wrapped__'),
                  N = A && z.call(e, '__wrapped__')
                if (j || N) {
                  var P = j ? t.value() : t,
                    S = N ? e.value() : e
                  return h || (h = new _t()), s(P, S, n, r, h)
                }
              }
              if (!k) return !1
              return (
                h || (h = new _t()),
                (function (t, e, n, r, o, i) {
                  var l = 1 & n,
                    a = Pt(t),
                    u = a.length,
                    s = Pt(e)
                  if (u != s.length && !l) return !1
                  var c = u
                  for (; c--; ) {
                    var f = a[c]
                    if (!(l ? f in e : z.call(e, f))) return !1
                  }
                  var p = i.get(t)
                  if (p && i.get(e)) return p == e
                  var h = !0
                  i.set(t, e), i.set(e, t)
                  var d = l
                  for (; ++c < u; ) {
                    var y = t[(f = a[c])],
                      v = e[f]
                    if (r) var b = l ? r(v, y, f, e, t, i) : r(y, v, f, t, e, i)
                    if (!(void 0 === b ? y === v || o(y, v, n, r, i) : b)) {
                      h = !1
                      break
                    }
                    d || (d = 'constructor' == f)
                  }
                  if (h && !d) {
                    var g = t.constructor,
                      m = e.constructor
                    g == m ||
                      !('constructor' in t) ||
                      !('constructor' in e) ||
                      ('function' == typeof g &&
                        g instanceof g &&
                        'function' == typeof m &&
                        m instanceof m) ||
                      (h = !1)
                  }
                  return i.delete(t), i.delete(e), h
                })(t, e, n, r, s, h)
              )
            })(t, e, n, r, At, s))
      )
    }
    function kt(t) {
      return (
        !(
          !Ht(t) ||
          (function (t) {
            return !!K && K in t
          })(t)
        ) && (Ut(t) ? V : O).test(Rt(t))
      )
    }
    function jt(t) {
      if (
        (e = t) !==
        (('function' == typeof (n = e && e.constructor) && n.prototype) || U)
      )
        return nt(t)
      var e,
        n,
        r = []
      for (var o in Object(t)) z.call(t, o) && 'constructor' != o && r.push(o)
      return r
    }
    function Nt(t, e, n, r, o, i) {
      var l = 1 & n,
        a = t.length,
        u = e.length
      if (a != u && !(l && u > a)) return !1
      var s = i.get(t)
      if (s && i.get(e)) return s == e
      var c = -1,
        f = !0,
        p = 2 & n ? new mt() : void 0
      for (i.set(t, e), i.set(e, t); ++c < a; ) {
        var h = t[c],
          d = e[c]
        if (r) var y = l ? r(d, h, c, e, t, i) : r(h, d, c, t, e, i)
        if (void 0 !== y) {
          if (y) continue
          f = !1
          break
        }
        if (p) {
          if (
            !C(e, function (t, e) {
              if (!p.has(e) && (h === t || o(h, t, n, r, i))) return p.push(e)
            })
          ) {
            f = !1
            break
          }
        } else if (h !== d && !o(h, d, n, r, i)) {
          f = !1
          break
        }
      }
      return i.delete(t), i.delete(e), f
    }
    function Pt(t) {
      return (function (t, e, n) {
        var r = e(t)
        return Bt(t)
          ? r
          : (function (t, e) {
              for (var n = -1, r = e.length, o = t.length; ++n < r; )
                t[o + n] = e[n]
              return t
            })(r, n(t))
      })(t, Yt, qt)
    }
    function St(t, e) {
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
    function Tt(t, e) {
      var n = (function (t, e) {
        return null == t ? void 0 : t[e]
      })(t, e)
      return kt(n) ? n : void 0
    }
    ;(vt.prototype.clear = function () {
      ;(this.__data__ = ut ? ut(null) : {}), (this.size = 0)
    }),
      (vt.prototype.delete = function (t) {
        var e = this.has(t) && delete this.__data__[t]
        return (this.size -= e ? 1 : 0), e
      }),
      (vt.prototype.get = function (t) {
        var e = this.__data__
        if (ut) {
          var r = e[t]
          return r === n ? void 0 : r
        }
        return z.call(e, t) ? e[t] : void 0
      }),
      (vt.prototype.has = function (t) {
        var e = this.__data__
        return ut ? void 0 !== e[t] : z.call(e, t)
      }),
      (vt.prototype.set = function (t, e) {
        var r = this.__data__
        return (
          (this.size += this.has(t) ? 0 : 1),
          (r[t] = ut && void 0 === e ? n : e),
          this
        )
      }),
      (bt.prototype.clear = function () {
        ;(this.__data__ = []), (this.size = 0)
      }),
      (bt.prototype.delete = function (t) {
        var e = this.__data__,
          n = wt(e, t)
        return (
          !(n < 0) &&
          (n == e.length - 1 ? e.pop() : X.call(e, n, 1), --this.size, !0)
        )
      }),
      (bt.prototype.get = function (t) {
        var e = this.__data__,
          n = wt(e, t)
        return n < 0 ? void 0 : e[n][1]
      }),
      (bt.prototype.has = function (t) {
        return wt(this.__data__, t) > -1
      }),
      (bt.prototype.set = function (t, e) {
        var n = this.__data__,
          r = wt(n, t)
        return r < 0 ? (++this.size, n.push([t, e])) : (n[r][1] = e), this
      }),
      (gt.prototype.clear = function () {
        ;(this.size = 0),
          (this.__data__ = {
            hash: new vt(),
            map: new (ot || bt)(),
            string: new vt(),
          })
      }),
      (gt.prototype.delete = function (t) {
        var e = St(this, t).delete(t)
        return (this.size -= e ? 1 : 0), e
      }),
      (gt.prototype.get = function (t) {
        return St(this, t).get(t)
      }),
      (gt.prototype.has = function (t) {
        return St(this, t).has(t)
      }),
      (gt.prototype.set = function (t, e) {
        var n = St(this, t),
          r = n.size
        return n.set(t, e), (this.size += n.size == r ? 0 : 1), this
      }),
      (mt.prototype.add = mt.prototype.push =
        function (t) {
          return this.__data__.set(t, n), this
        }),
      (mt.prototype.has = function (t) {
        return this.__data__.has(t)
      }),
      (_t.prototype.clear = function () {
        ;(this.__data__ = new bt()), (this.size = 0)
      }),
      (_t.prototype.delete = function (t) {
        var e = this.__data__,
          n = e.delete(t)
        return (this.size = e.size), n
      }),
      (_t.prototype.get = function (t) {
        return this.__data__.get(t)
      }),
      (_t.prototype.has = function (t) {
        return this.__data__.has(t)
      }),
      (_t.prototype.set = function (t, e) {
        var n = this.__data__
        if (n instanceof bt) {
          var r = n.__data__
          if (!ot || r.length < 199)
            return r.push([t, e]), (this.size = ++n.size), this
          n = this.__data__ = new gt(r)
        }
        return n.set(t, e), (this.size = n.size), this
      })
    var qt = J
        ? function (t) {
            return null == t
              ? []
              : ((t = Object(t)),
                (function (t, e) {
                  for (
                    var n = -1, r = null == t ? 0 : t.length, o = 0, i = [];
                    ++n < r;

                  ) {
                    var l = t[n]
                    e(l, n, t) && (i[o++] = l)
                  }
                  return i
                })(J(t), function (e) {
                  return Z.call(t, e)
                }))
          }
        : function () {
            return []
          },
      Ct = xt
    function Lt(t, e) {
      return (
        !!(e = null == e ? r : e) &&
        ('number' == typeof t || w.test(t)) &&
        t > -1 &&
        t % 1 == 0 &&
        t < e
      )
    }
    function Rt(t) {
      if (null != t) {
        try {
          return H.call(t)
        } catch (e) {}
        try {
          return t + ''
        } catch (e) {}
      }
      return ''
    }
    function Mt(t, e) {
      return t === e || (t != t && e != e)
    }
    ;((rt && Ct(new rt(new ArrayBuffer(1))) != _) ||
      (ot && Ct(new ot()) != c) ||
      (it && Ct(it.resolve()) != h) ||
      (lt && Ct(new lt()) != y) ||
      (at && Ct(new at()) != g)) &&
      (Ct = function (t) {
        var e = xt(t),
          n = e == p ? t.constructor : void 0,
          r = n ? Rt(n) : ''
        if (r)
          switch (r) {
            case st:
              return _
            case ct:
              return c
            case ft:
              return h
            case pt:
              return y
            case ht:
              return g
          }
        return e
      })
    var It = Et(
        (function () {
          return arguments
        })()
      )
        ? Et
        : function (t) {
            return zt(t) && z.call(t, 'callee') && !Z.call(t, 'callee')
          },
      Bt = Array.isArray
    var Dt =
      tt ||
      function () {
        return !1
      }
    function Ut(t) {
      if (!Ht(t)) return !1
      var e = xt(t)
      return (
        e == s ||
        '[object GeneratorFunction]' == e ||
        '[object AsyncFunction]' == e ||
        '[object Proxy]' == e
      )
    }
    function Ft(t) {
      return 'number' == typeof t && t > -1 && t % 1 == 0 && t <= r
    }
    function Ht(t) {
      var e = typeof t
      return null != t && ('object' == e || 'function' == e)
    }
    function zt(t) {
      return null != t && 'object' == typeof t
    }
    var Kt = q
      ? (function (t) {
          return function (e) {
            return t(e)
          }
        })(q)
      : function (t) {
          return zt(t) && Ft(t.length) && !!x[xt(t)]
        }
    function Yt(t) {
      return null != (e = t) && Ft(e.length) && !Ut(e) ? Ot(t) : jt(t)
      var e
    }
    t.exports = function (t, e) {
      return At(t, e)
    }
  })(mt, mt.exports)
  var _t = {},
    Ot =
      (et && et.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      }
  Object.defineProperty(_t, '__esModule', { value: !0 })
  var wt,
    xt = Ot(gt.exports),
    Et = Ot(mt.exports)
  !(function (t) {
    ;(t.compose = function (t, e, n) {
      void 0 === t && (t = {}),
        void 0 === e && (e = {}),
        'object' != typeof t && (t = {}),
        'object' != typeof e && (e = {})
      var r = xt.default(e)
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
              Et.default(t[r], e[r]) || (n[r] = void 0 === e[r] ? null : e[r]),
              n
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
  })(wt || (wt = {})),
    (_t.default = wt)
  var At,
    kt,
    jt = {},
    Nt = {}
  function Pt() {
    if (kt) return jt
    kt = 1
    var t =
      (et && et.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      }
    Object.defineProperty(jt, '__esModule', { value: !0 })
    var e,
      n = t(
        (function () {
          if (At) return Nt
          At = 1
          var t =
            (et && et.__importDefault) ||
            function (t) {
              return t && t.__esModule ? t : { default: t }
            }
          Object.defineProperty(Nt, '__esModule', { value: !0 })
          var e = t(Pt()),
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
          return (Nt.default = n), Nt
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
      (jt.default = e),
      jt
    )
  }
  var St =
      (et && et.__importDefault) ||
      function (t) {
        return t && t.__esModule ? t : { default: t }
      },
    Tt = St(bt),
    qt = St(gt.exports),
    Ct = St(mt.exports),
    Lt = St(_t),
    Rt = St(Pt()),
    Mt = String.fromCharCode(0),
    It = (function () {
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
          if (((t = qt.default(t)), 'object' == typeof n)) {
            if ('number' == typeof t.delete && 'number' == typeof n.delete)
              return (this.ops[e - 1] = { delete: n.delete + t.delete }), this
            if (
              'number' == typeof n.delete &&
              null != t.insert &&
              'object' != typeof (n = this.ops[(e -= 1) - 1])
            )
              return this.ops.unshift(t), this
            if (Ct.default(t.attributes, n.attributes)) {
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
              ? t + Rt.default.length(e)
              : e.delete
              ? t - e.delete
              : t
          }, 0)
        }),
        (t.prototype.length = function () {
          return this.reduce(function (t, e) {
            return t + Rt.default.length(e)
          }, 0)
        }),
        (t.prototype.slice = function (e, n) {
          void 0 === e && (e = 0), void 0 === n && (n = 1 / 0)
          for (
            var r = [], o = Rt.default.iterator(this.ops), i = 0;
            i < n && o.hasNext();

          ) {
            var l = void 0
            i < e ? (l = o.next(e - i)) : ((l = o.next(n - i)), r.push(l)),
              (i += Rt.default.length(l))
          }
          return new t(r)
        }),
        (t.prototype.compose = function (e) {
          var n = Rt.default.iterator(this.ops),
            r = Rt.default.iterator(e.ops),
            o = [],
            i = r.peek()
          if (
            null != i &&
            'number' == typeof i.retain &&
            null == i.attributes
          ) {
            for (
              var l = i.retain;
              'insert' === n.peekType() && n.peekLength() <= l;

            )
              (l -= n.peekLength()), o.push(n.next())
            i.retain - l > 0 && r.next(i.retain - l)
          }
          for (var a = new t(o); n.hasNext() || r.hasNext(); )
            if ('insert' === r.peekType()) a.push(r.next())
            else if ('delete' === n.peekType()) a.push(n.next())
            else {
              var u = Math.min(n.peekLength(), r.peekLength()),
                s = n.next(u),
                c = r.next(u)
              if ('number' == typeof c.retain) {
                var f = {}
                'number' == typeof s.retain
                  ? (f.retain = u)
                  : (f.insert = s.insert)
                var p = Lt.default.compose(
                  s.attributes,
                  c.attributes,
                  'number' == typeof s.retain
                )
                if (
                  (p && (f.attributes = p),
                  a.push(f),
                  !r.hasNext() && Ct.default(a.ops[a.ops.length - 1], f))
                ) {
                  var h = new t(n.rest())
                  return a.concat(h).chop()
                }
              } else
                'number' == typeof c.delete &&
                  'number' == typeof s.retain &&
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
                    return 'string' == typeof n.insert ? n.insert : Mt
                  throw new Error(
                    'diff() called ' +
                      (t === e ? 'on' : 'with') +
                      ' non-document'
                  )
                })
                .join('')
            }),
            o = new t(),
            i = Tt.default(r[0], r[1], n),
            l = Rt.default.iterator(this.ops),
            a = Rt.default.iterator(e.ops)
          return (
            i.forEach(function (t) {
              for (var e = t[1].length; e > 0; ) {
                var n = 0
                switch (t[0]) {
                  case Tt.default.INSERT:
                    ;(n = Math.min(a.peekLength(), e)), o.push(a.next(n))
                    break
                  case Tt.default.DELETE:
                    ;(n = Math.min(e, l.peekLength())), l.next(n), o.delete(n)
                    break
                  case Tt.default.EQUAL:
                    n = Math.min(l.peekLength(), a.peekLength(), e)
                    var r = l.next(n),
                      i = a.next(n)
                    Ct.default(r.insert, i.insert)
                      ? o.retain(n, Lt.default.diff(r.attributes, i.attributes))
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
            var r = Rt.default.iterator(this.ops), o = new t(), i = 0;
            r.hasNext();

          ) {
            if ('insert' !== r.peekType()) return
            var l = r.peek(),
              a = Rt.default.length(l) - r.peekLength(),
              u = 'string' == typeof l.insert ? l.insert.indexOf(n, a) - a : -1
            if (u < 0) o.push(r.next())
            else if (u > 0) o.push(r.next(u))
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
              if (r.insert) n.delete(Rt.default.length(r))
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
                            Rt.default.length(t),
                            Lt.default.invert(r.attributes, t.attributes)
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
              o = Rt.default.iterator(this.ops),
              i = Rt.default.iterator(r.ops),
              l = new t();
            o.hasNext() || i.hasNext();

          )
            if ('insert' !== o.peekType() || (!n && 'insert' === i.peekType()))
              if ('insert' === i.peekType()) l.push(i.next())
              else {
                var a = Math.min(o.peekLength(), i.peekLength()),
                  u = o.next(a),
                  s = i.next(a)
                if (u.delete) continue
                s.delete
                  ? l.push(s)
                  : l.retain(
                      a,
                      Lt.default.transform(u.attributes, s.attributes, n)
                    )
              }
            else l.retain(Rt.default.length(o.next()))
          return l.chop()
        }),
        (t.prototype.transformPosition = function (t, e) {
          void 0 === e && (e = !1), (e = !!e)
          for (
            var n = Rt.default.iterator(this.ops), r = 0;
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
        (t.Op = Rt.default),
        (t.AttributeMap = Lt.default),
        t
      )
    })()
  const Bt = {
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
    Dt = e.defineComponent({
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
            -1 !== Object.keys(Bt).indexOf(t),
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
      setup: (t, n) => {
        let r, o
        e.onMounted(() => {
          l()
        }),
          e.onBeforeUnmount(() => {
            r = null
          })
        const i = e.ref(),
          l = () => {
            var e
            if (i.value) {
              if (((o = a()), t.modules))
                if (Array.isArray(t.modules))
                  for (const e of t.modules)
                    ot.register(`modules/${e.name}`, e.module)
                else ot.register(`modules/${t.modules.name}`, t.modules.module)
              ;(r = new ot(i.value, o)),
                v(t.content),
                r.on('text-change', f),
                r.on('selection-change', h),
                r.on('editor-change', d),
                'bubble' !== t.theme && i.value.classList.remove('ql-bubble'),
                'snow' !== t.theme && i.value.classList.remove('ql-snow'),
                null === (e = r.getModule('toolbar')) ||
                  void 0 === e ||
                  e.container.addEventListener('mousedown', (t) => {
                    t.preventDefault()
                  }),
                n.emit('ready', r)
            }
          },
          a = () => {
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
                        : Bt[t.toolbar]
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
          u = (t) => ('object' == typeof t && t ? t.slice() : t)
        let s
        const c = (t) => {
            if (typeof s == typeof t) {
              if (t === s) return !0
              if ('object' == typeof t && t && 'object' == typeof s && s)
                return (
                  (e = s.diff(t)),
                  !Object.values(e.ops).some(
                    (t) => !t.retain || 1 !== Object.keys(t).length
                  )
                )
            }
            var e
            return !1
          },
          f = (e, r, o) => {
            ;(s = u(y())),
              c(t.content) || n.emit('update:content', s),
              n.emit('textChange', { delta: e, oldContents: r, source: o })
          },
          p = e.ref(),
          h = (t, e, o) => {
            ;(p.value = !!(null == r ? void 0 : r.hasFocus())),
              n.emit('selectionChange', { range: t, oldRange: e, source: o })
          }
        e.watch(p, (t) => {
          n.emit(t ? 'focus' : 'blur', i)
        })
        const d = (...t) => {
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
          y = (e, n) =>
            'html' === t.contentType
              ? m()
              : 'text' === t.contentType
              ? b(e, n)
              : null == r
              ? void 0
              : r.getContents(e, n),
          v = (e, n = 'api') => {
            const o = e || ('delta' === t.contentType ? new It() : '')
            'html' === t.contentType
              ? _(o)
              : 'text' === t.contentType
              ? g(o, n)
              : null == r || r.setContents(o, n),
              (s = u(o))
          },
          b = (t, e) => {
            var n
            return null !== (n = null == r ? void 0 : r.getText(t, e)) &&
              void 0 !== n
              ? n
              : ''
          },
          g = (t, e = 'api') => {
            null == r || r.setText(t, e)
          },
          m = () => {
            var t
            return null !== (t = null == r ? void 0 : r.root.innerHTML) &&
              void 0 !== t
              ? t
              : ''
          },
          _ = (t) => {
            r && (r.root.innerHTML = t)
          }
        return (
          e.watch(
            () => t.content,
            (t) => {
              if (!r || !t || c(t)) return
              const n = r.getSelection()
              n && e.nextTick(() => (null == r ? void 0 : r.setSelection(n))),
                v(t)
            },
            { deep: !0 }
          ),
          e.watch(
            () => t.enable,
            (t) => {
              r && r.enable(t)
            }
          ),
          {
            editor: i,
            getEditor: () => i.value,
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
            getContents: y,
            setContents: v,
            getHTML: m,
            setHTML: _,
            pasteHTML: (t, e = 'api') => {
              const n = null == r ? void 0 : r.clipboard.convert(t)
              n && (null == r || r.setContents(n, e))
            },
            focus: () => {
              null == r || r.focus()
            },
            getText: b,
            setText: g,
            reinit: () => {
              e.nextTick(() => {
                var t
                !n.slots.toolbar &&
                  r &&
                  (null === (t = r.getModule('toolbar')) ||
                    void 0 === t ||
                    t.container.remove()),
                  l()
              })
            },
          }
        )
      },
      render() {
        var t, n
        return [
          null === (n = (t = this.$slots).toolbar) || void 0 === n
            ? void 0
            : n.call(t),
          e.h('div', { ref: 'editor', ...this.$attrs }),
        ]
      },
    })
  ;(t.Delta = It),
    (t.Quill = ot),
    (t.QuillEditor = Dt),
    Object.defineProperty(t, '__esModule', { value: !0 })
})
