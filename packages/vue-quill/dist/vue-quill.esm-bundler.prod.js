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
import e from 'quill'
export { default as Quill } from 'quill'
import t from 'quill-delta'
export { default as Delta } from 'quill-delta'
import {
  defineComponent as o,
  onMounted as l,
  onBeforeUnmount as n,
  ref as r,
  watch as i,
  nextTick as a,
  h as s,
} from 'vue'
const d = {
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
  u = o({
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
          -1 !== Object.keys(d).indexOf(e),
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
    setup: (o, s) => {
      let u, c
      l(() => {
        b()
      }),
        n(() => {
          u = null
        })
      const m = r(),
        b = () => {
          var t
          if (m.value) {
            if (((c = p()), o.modules))
              if (Array.isArray(o.modules))
                for (const t of o.modules)
                  e.register(`modules/${t.name}`, t.module)
              else e.register(`modules/${o.modules.name}`, o.modules.module)
            ;(u = new e(m.value, c)),
              x(o.content),
              u.on('text-change', v),
              u.on('selection-change', O),
              u.on('editor-change', T),
              'bubble' !== o.theme && m.value.classList.remove('ql-bubble'),
              'snow' !== o.theme && m.value.classList.remove('ql-snow'),
              null === (t = u.getModule('toolbar')) ||
                void 0 === t ||
                t.container.addEventListener('mousedown', (e) => {
                  e.preventDefault()
                }),
              s.emit('ready', u)
          }
        },
        p = () => {
          const e = {}
          if (
            ('' !== o.theme && (e.theme = o.theme),
            o.readOnly && (e.readOnly = o.readOnly),
            o.placeholder && (e.placeholder = o.placeholder),
            o.toolbar &&
              '' !== o.toolbar &&
              (e.modules = {
                toolbar: (() => {
                  if ('object' == typeof o.toolbar) return o.toolbar
                  if ('string' == typeof o.toolbar) {
                    return '#' === o.toolbar.charAt(0)
                      ? o.toolbar
                      : d[o.toolbar]
                  }
                })(),
              }),
            o.modules)
          ) {
            const t = (() => {
              var e, t
              const l = {}
              if (Array.isArray(o.modules))
                for (const n of o.modules)
                  l[n.name] = null !== (e = n.options) && void 0 !== e ? e : {}
              else
                l[o.modules.name] =
                  null !== (t = o.modules.options) && void 0 !== t ? t : {}
              return l
            })()
            e.modules = Object.assign({}, e.modules, t)
          }
          return Object.assign({}, o.globalOptions, o.options, e)
        },
        g = (e) => ('object' == typeof e && e ? e.slice() : e)
      let f
      const h = (e) => {
          if (typeof f == typeof e) {
            if (e === f) return !0
            if ('object' == typeof e && e && 'object' == typeof f && f)
              return (
                (t = f.diff(e)),
                !Object.values(t.ops).some(
                  (e) => !e.retain || 1 !== Object.keys(e).length
                )
              )
          }
          var t
          return !1
        },
        v = (e, t, l) => {
          ;(f = g(q())),
            h(o.content) || s.emit('update:content', f),
            s.emit('textChange', { delta: e, oldContents: t, source: l })
        },
        y = r(),
        O = (e, t, o) => {
          ;(y.value = !!(null == u ? void 0 : u.hasFocus())),
            s.emit('selectionChange', { range: e, oldRange: t, source: o })
        }
      i(y, (e) => {
        s.emit(e ? 'focus' : 'blur', m)
      })
      const T = (...e) => {
          'text-change' === e[0] &&
            s.emit('editorChange', {
              name: e[0],
              delta: e[1],
              oldContents: e[2],
              source: e[3],
            }),
            'selection-change' === e[0] &&
              s.emit('editorChange', {
                name: e[0],
                range: e[1],
                oldRange: e[2],
                source: e[3],
              })
        },
        q = (e, t) =>
          'html' === o.contentType
            ? k()
            : 'text' === o.contentType
            ? j(e, t)
            : null == u
            ? void 0
            : u.getContents(e, t),
        x = (e, l = 'api') => {
          const n = e || ('delta' === o.contentType ? new t() : '')
          'html' === o.contentType
            ? w(n)
            : 'text' === o.contentType
            ? C(n, l)
            : null == u || u.setContents(n, l),
            (f = g(n))
        },
        j = (e, t) => {
          var o
          return null !== (o = null == u ? void 0 : u.getText(e, t)) &&
            void 0 !== o
            ? o
            : ''
        },
        C = (e, t = 'api') => {
          null == u || u.setText(e, t)
        },
        k = () => {
          var e
          return null !== (e = null == u ? void 0 : u.root.innerHTML) &&
            void 0 !== e
            ? e
            : ''
        },
        w = (e) => {
          u && (u.root.innerHTML = e)
        }
      return (
        i(
          () => o.content,
          (e) => {
            if (!u || !e || h(e)) return
            const t = u.getSelection()
            t && a(() => (null == u ? void 0 : u.setSelection(t))), x(e)
          },
          { deep: !0 }
        ),
        i(
          () => o.enable,
          (e) => {
            u && u.enable(e)
          }
        ),
        {
          editor: m,
          getEditor: () => m.value,
          getToolbar: () => {
            var e
            return null === (e = null == u ? void 0 : u.getModule('toolbar')) ||
              void 0 === e
              ? void 0
              : e.container
          },
          getQuill: () => {
            if (u) return u
            throw 'The quill editor hasn\'t been instantiated yet,\n                  make sure to call this method when the editor ready\n                  or use v-on:ready="onReady(quill)" event instead.'
          },
          getContents: q,
          setContents: x,
          getHTML: k,
          setHTML: w,
          pasteHTML: (e, t = 'api') => {
            const o = null == u ? void 0 : u.clipboard.convert(e)
            o && (null == u || u.setContents(o, t))
          },
          focus: () => {
            null == u || u.focus()
          },
          getText: j,
          setText: C,
          reinit: () => {
            a(() => {
              var e
              !s.slots.toolbar &&
                u &&
                (null === (e = u.getModule('toolbar')) ||
                  void 0 === e ||
                  e.container.remove()),
                b()
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
        s('div', { ref: 'editor', ...this.$attrs }),
      ]
    },
  })
export { u as QuillEditor }
