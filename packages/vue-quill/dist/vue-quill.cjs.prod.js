/*!
 * VueQuill @verybestjp/vue-quill v0.0.0-development
 * https://vueup.github.io/vue-quill/
 *
 * Includes quill v1.3.7
 * https://quilljs.com/
 *
 * Copyright (c) 2024 Ahmad Luthfi Masruri
 * Released under the MIT license
 * Date: 2024-07-30T05:55:58.511Z
 */
'use strict'
Object.defineProperty(exports, '__esModule', { value: !0 })
var e = require('quill'),
  t = require('quill-delta'),
  o = require('vue')
function l(e) {
  return e && 'object' == typeof e && 'default' in e ? e.default : e
}
var n = l(e),
  r = l(t)
const i = {
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
  a = o.defineComponent({
    name: 'QuillEditor',
    inheritAttrs: !1,
    props: {
      content: { type: [String, Object] },
      contentType: {
        type: String,
        default: 'delta',
        validator: (e) => ['delta', 'html', 'text'].includes(e),
      },
      enable: { type: Boolean, default: !0 },
      readOnly: { type: Boolean, default: !1 },
      placeholder: { type: String, required: !1 },
      theme: {
        type: String,
        default: 'snow',
        validator: (e) => ['snow', 'bubble', ''].includes(e),
      },
      toolbar: {
        type: [String, Array, Object],
        required: !1,
        validator: (e) =>
          'string' != typeof e ||
          '' === e ||
          '#' === e.charAt(0) ||
          -1 !== Object.keys(i).indexOf(e),
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
    setup: (e, t) => {
      let l, a
      o.onMounted(() => {
        d()
      }),
        o.onBeforeUnmount(() => {
          l = null
        })
      const s = o.ref(),
        d = () => {
          var o
          if (s.value) {
            if (((a = u()), e.modules))
              if (Array.isArray(e.modules))
                for (const t of e.modules)
                  n.register(`modules/${t.name}`, t.module)
              else n.register(`modules/${e.modules.name}`, e.modules.module)
            ;(l = new n(s.value, a)),
              y(e.content),
              l.on('text-change', m),
              l.on('selection-change', g),
              l.on('editor-change', v),
              'bubble' !== e.theme && s.value.classList.remove('ql-bubble'),
              'snow' !== e.theme && s.value.classList.remove('ql-snow'),
              null === (o = l.getModule('toolbar')) ||
                void 0 === o ||
                o.container.addEventListener('mousedown', (e) => {
                  e.preventDefault()
                }),
              t.emit('ready', l)
          }
        },
        u = () => {
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
                      : i[e.toolbar]
                  }
                })(),
              }),
            e.modules)
          ) {
            const o = (() => {
              var t, o
              const l = {}
              if (Array.isArray(e.modules))
                for (const n of e.modules)
                  l[n.name] = null !== (t = n.options) && void 0 !== t ? t : {}
              else
                l[e.modules.name] =
                  null !== (o = e.modules.options) && void 0 !== o ? o : {}
              return l
            })()
            t.modules = Object.assign({}, t.modules, o)
          }
          return Object.assign({}, e.globalOptions, e.options, t)
        },
        c = (e) => ('object' == typeof e && e ? e.slice() : e)
      let b
      const p = (e) => {
          if (typeof b == typeof e) {
            if (e === b) return !0
            if ('object' == typeof e && e && 'object' == typeof b && b)
              return (
                (t = b.diff(e)),
                !Object.values(t.ops).some(
                  (e) => !e.retain || 1 !== Object.keys(e).length
                )
              )
          }
          var t
          return !1
        },
        m = (o, l, n) => {
          ;(b = c(f())),
            p(e.content) || t.emit('update:content', b),
            t.emit('textChange', { delta: o, oldContents: l, source: n })
        },
        h = o.ref(),
        g = (e, o, n) => {
          ;(h.value = !!(null == l ? void 0 : l.hasFocus())),
            t.emit('selectionChange', { range: e, oldRange: o, source: n })
        }
      o.watch(h, (e) => {
        t.emit(e ? 'focus' : 'blur', s)
      })
      const v = (...e) => {
          'text-change' === e[0] &&
            t.emit('editorChange', {
              name: e[0],
              delta: e[1],
              oldContents: e[2],
              source: e[3],
            }),
            'selection-change' === e[0] &&
              t.emit('editorChange', {
                name: e[0],
                range: e[1],
                oldRange: e[2],
                source: e[3],
              })
        },
        f = (t, o) =>
          'html' === e.contentType
            ? O()
            : 'text' === e.contentType
            ? T(t, o)
            : null == l
            ? void 0
            : l.getContents(t, o),
        y = (t, o = 'api') => {
          const n = t || ('delta' === e.contentType ? new r() : '')
          'html' === e.contentType
            ? j(n)
            : 'text' === e.contentType
            ? x(n, o)
            : null == l || l.setContents(n, o),
            (b = c(n))
        },
        T = (e, t) => {
          var o
          return null !== (o = null == l ? void 0 : l.getText(e, t)) &&
            void 0 !== o
            ? o
            : ''
        },
        x = (e, t = 'api') => {
          null == l || l.setText(e, t)
        },
        O = () => {
          var e
          return null !== (e = null == l ? void 0 : l.root.innerHTML) &&
            void 0 !== e
            ? e
            : ''
        },
        j = (e) => {
          l && (l.root.innerHTML = e)
        }
      return (
        o.watch(
          () => e.content,
          (e) => {
            if (!l || !e || p(e)) return
            const t = l.getSelection()
            t && o.nextTick(() => (null == l ? void 0 : l.setSelection(t))),
              y(e)
          },
          { deep: !0 }
        ),
        o.watch(
          () => e.enable,
          (e) => {
            l && l.enable(e)
          }
        ),
        {
          editor: s,
          getEditor: () => s.value,
          getToolbar: () => {
            var e
            return null === (e = null == l ? void 0 : l.getModule('toolbar')) ||
              void 0 === e
              ? void 0
              : e.container
          },
          getQuill: () => {
            if (l) return l
            throw 'The quill editor hasn\'t been instantiated yet,\n                  make sure to call this method when the editor ready\n                  or use v-on:ready="onReady(quill)" event instead.'
          },
          getContents: f,
          setContents: y,
          getHTML: O,
          setHTML: j,
          pasteHTML: (e, t = 'api') => {
            const o = null == l ? void 0 : l.clipboard.convert(e)
            o && (null == l || l.setContents(o, t))
          },
          focus: () => {
            null == l || l.focus()
          },
          getText: T,
          setText: x,
          reinit: () => {
            o.nextTick(() => {
              var e
              !t.slots.toolbar &&
                l &&
                (null === (e = l.getModule('toolbar')) ||
                  void 0 === e ||
                  e.container.remove()),
                d()
            })
          },
        }
      )
    },
    render() {
      var e, t
      return [
        null === (t = (e = this.$slots).toolbar) || void 0 === t
          ? void 0
          : t.call(e),
        o.h('div', { ref: 'editor', ...this.$attrs }),
      ]
    },
  })
;(exports.Quill = n), (exports.Delta = r), (exports.QuillEditor = a)
