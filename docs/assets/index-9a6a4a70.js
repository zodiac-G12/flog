(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const i of s)
      if (i.type === "childList")
        for (const o of i.addedNodes)
          o.tagName === "LINK" && o.rel === "modulepreload" && r(o);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : s.crossOrigin === "anonymous"
        ? (i.credentials = "omit")
        : (i.credentials = "same-origin"),
      i
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = n(s);
    fetch(s.href, i);
  }
})();
const v = { context: void 0, registry: void 0 };
function X(e) {
  v.context = e;
}
const Ze = (e, t) => e === t,
  ee = Symbol("solid-proxy"),
  te = { equals: Ze };
let Te = Me;
const T = 1,
  ne = 2,
  je = { owned: null, cleanups: null, context: null, owner: null },
  ae = {};
var w = null;
let fe = null,
  p = null,
  x = null,
  N = null,
  ie = 0;
function ke(e, t) {
  const n = p,
    r = w,
    s = e.length === 0,
    i = s
      ? je
      : {
          owned: null,
          cleanups: null,
          context: null,
          owner: t === void 0 ? r : t,
        },
    o = s ? e : () => e(() => E(() => le(i)));
  (w = i), (p = null);
  try {
    return $(o, !0);
  } finally {
    (p = n), (w = r);
  }
}
function O(e, t) {
  t = t ? Object.assign({}, te, t) : te;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    r = (s) => (typeof s == "function" && (s = s(n.value)), Ue(n, s));
  return [De.bind(n), r];
}
function xe(e, t, n) {
  const r = oe(e, t, !0, T);
  V(r);
}
function B(e, t, n) {
  const r = oe(e, t, !1, T);
  V(r);
}
function et(e, t, n) {
  Te = ct;
  const r = oe(e, t, !1, T);
  (!n || !n.render) && (r.user = !0), N ? N.push(r) : V(r);
}
function P(e, t, n) {
  n = n ? Object.assign({}, te, n) : te;
  const r = oe(e, t, !0, 0);
  return (
    (r.observers = null),
    (r.observerSlots = null),
    (r.comparator = n.equals || void 0),
    V(r),
    De.bind(r)
  );
}
function tt(e, t, n) {
  let r, s, i;
  (arguments.length === 2 && typeof t == "object") || arguments.length === 1
    ? ((r = !0), (s = e), (i = t || {}))
    : ((r = e), (s = t), (i = n || {}));
  let o = null,
    l = ae,
    c = null,
    a = !1,
    u = "initialValue" in i,
    f = typeof r == "function" && P(r);
  const d = new Set(),
    [b, A] = (i.storage || O)(i.initialValue),
    [y, R] = O(void 0),
    [j, M] = O(void 0, { equals: !1 }),
    [D, k] = O(u ? "ready" : "unresolved");
  if (v.context) {
    c = `${v.context.id}${v.context.count++}`;
    let h;
    i.ssrLoadFrom === "initial"
      ? (l = i.initialValue)
      : v.load && (h = v.load(c)) && (l = h[0]);
  }
  function C(h, g, m, L) {
    return (
      o === h &&
        ((o = null),
        L !== void 0 && (u = !0),
        (h === l || g === l) &&
          i.onHydrated &&
          queueMicrotask(() => i.onHydrated(L, { value: g })),
        (l = ae),
        z(g, m)),
      g
    );
  }
  function z(h, g) {
    $(() => {
      g === void 0 && A(() => h),
        k(g !== void 0 ? "errored" : u ? "ready" : "unresolved"),
        R(g);
      for (const m of d.keys()) m.decrement();
      d.clear();
    }, !1);
  }
  function q() {
    const h = it,
      g = b(),
      m = y();
    if (m !== void 0 && !o) throw m;
    return (
      p &&
        !p.user &&
        h &&
        xe(() => {
          j(), o && (h.resolved || d.has(h) || (h.increment(), d.add(h)));
        }),
      g
    );
  }
  function F(h = !0) {
    if (h !== !1 && a) return;
    a = !1;
    const g = f ? f() : r;
    if (g == null || g === !1) {
      C(o, E(b));
      return;
    }
    const m = l !== ae ? l : E(() => s(g, { value: b(), refetching: h }));
    return typeof m != "object" || !(m && "then" in m)
      ? (C(o, m, void 0, g), m)
      : ((o = m),
        (a = !0),
        queueMicrotask(() => (a = !1)),
        $(() => {
          k(u ? "refreshing" : "pending"), M();
        }, !1),
        m.then(
          (L) => C(m, L, void 0, g),
          (L) => C(m, void 0, He(L), g)
        ));
  }
  return (
    Object.defineProperties(q, {
      state: { get: () => D() },
      error: { get: () => y() },
      loading: {
        get() {
          const h = D();
          return h === "pending" || h === "refreshing";
        },
      },
      latest: {
        get() {
          if (!u) return q();
          const h = y();
          if (h && !o) throw h;
          return b();
        },
      },
    }),
    f ? xe(() => F(!1)) : F(!1),
    [q, { refetch: F, mutate: A }]
  );
}
function E(e) {
  if (p === null) return e();
  const t = p;
  p = null;
  try {
    return e();
  } finally {
    p = t;
  }
}
function _e(e, t, n) {
  const r = Array.isArray(e);
  let s,
    i = n && n.defer;
  return (o) => {
    let l;
    if (r) {
      l = Array(e.length);
      for (let a = 0; a < e.length; a++) l[a] = e[a]();
    } else l = e();
    if (i) {
      i = !1;
      return;
    }
    const c = E(() => t(l, s, o));
    return (s = l), c;
  };
}
function Ie(e) {
  return (
    w === null ||
      (w.cleanups === null ? (w.cleanups = [e]) : w.cleanups.push(e)),
    e
  );
}
function nt() {
  return w;
}
function rt(e, t) {
  const n = w,
    r = p;
  (w = e), (p = null);
  try {
    return $(t, !0);
  } catch (s) {
    Ae(s);
  } finally {
    (w = n), (p = r);
  }
}
function st(e) {
  const t = p,
    n = w;
  return Promise.resolve().then(() => {
    (p = t), (w = n);
    let r;
    return $(e, !1), (p = w = null), r ? r.done : void 0;
  });
}
function Be(e, t) {
  const n = Symbol("context");
  return { id: n, Provider: ut(n), defaultValue: e };
}
function be(e) {
  let t;
  return (t = Ke(w, e.id)) !== void 0 ? t : e.defaultValue;
}
function Pe(e) {
  const t = P(e),
    n = P(() => ge(t()));
  return (
    (n.toArray = () => {
      const r = n();
      return Array.isArray(r) ? r : r != null ? [r] : [];
    }),
    n
  );
}
let it;
function De() {
  if (this.sources && this.state)
    if (this.state === T) V(this);
    else {
      const e = x;
      (x = null), $(() => se(this), !1), (x = e);
    }
  if (p) {
    const e = this.observers ? this.observers.length : 0;
    p.sources
      ? (p.sources.push(this), p.sourceSlots.push(e))
      : ((p.sources = [this]), (p.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(p),
          this.observerSlots.push(p.sources.length - 1))
        : ((this.observers = [p]),
          (this.observerSlots = [p.sources.length - 1]));
  }
  return this.value;
}
function Ue(e, t, n) {
  let r = e.value;
  return (
    (!e.comparator || !e.comparator(r, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        $(() => {
          for (let s = 0; s < e.observers.length; s += 1) {
            const i = e.observers[s],
              o = fe && fe.running;
            o && fe.disposed.has(i),
              (o ? !i.tState : !i.state) &&
                (i.pure ? x.push(i) : N.push(i), i.observers && qe(i)),
              o || (i.state = T);
          }
          if (x.length > 1e6) throw ((x = []), new Error());
        }, !1)),
    t
  );
}
function V(e) {
  if (!e.fn) return;
  le(e);
  const t = w,
    n = p,
    r = ie;
  (p = w = e), ot(e, e.value, r), (p = n), (w = t);
}
function ot(e, t, n) {
  let r;
  try {
    r = e.fn(t);
  } catch (s) {
    return (
      e.pure &&
        ((e.state = T), e.owned && e.owned.forEach(le), (e.owned = null)),
      (e.updatedAt = n + 1),
      Ae(s)
    );
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e ? Ue(e, r) : (e.value = r),
    (e.updatedAt = n));
}
function oe(e, t, n, r = T, s) {
  const i = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: w,
    context: null,
    pure: n,
  };
  return (
    w === null || (w !== je && (w.owned ? w.owned.push(i) : (w.owned = [i]))), i
  );
}
function re(e) {
  if (e.state === 0) return;
  if (e.state === ne) return se(e);
  if (e.suspense && E(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < ie); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (((e = t[n]), e.state === T)) V(e);
    else if (e.state === ne) {
      const r = x;
      (x = null), $(() => se(e, t[0]), !1), (x = r);
    }
}
function $(e, t) {
  if (x) return e();
  let n = !1;
  t || (x = []), N ? (n = !0) : (N = []), ie++;
  try {
    const r = e();
    return lt(n), r;
  } catch (r) {
    n || (N = null), (x = null), Ae(r);
  }
}
function lt(e) {
  if ((x && (Me(x), (x = null)), e)) return;
  const t = N;
  (N = null), t.length && $(() => Te(t), !1);
}
function Me(e) {
  for (let t = 0; t < e.length; t++) re(e[t]);
}
function ct(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? (e[n++] = r) : re(r);
  }
  for (v.context && X(), t = 0; t < n; t++) re(e[t]);
}
function se(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const r = e.sources[n];
    if (r.sources) {
      const s = r.state;
      s === T
        ? r !== t && (!r.updatedAt || r.updatedAt < ie) && re(r)
        : s === ne && se(r, t);
    }
  }
}
function qe(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state ||
      ((n.state = ne), n.pure ? x.push(n) : N.push(n), n.observers && qe(n));
  }
}
function le(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        r = e.sourceSlots.pop(),
        s = n.observers;
      if (s && s.length) {
        const i = s.pop(),
          o = n.observerSlots.pop();
        r < s.length &&
          ((i.sourceSlots[o] = r), (s[r] = i), (n.observerSlots[r] = o));
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) le(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  (e.state = 0), (e.context = null);
}
function He(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", { cause: e });
}
function Ae(e, t = w) {
  throw He(e);
}
function Ke(e, t) {
  return e
    ? e.context && e.context[t] !== void 0
      ? e.context[t]
      : Ke(e.owner, t)
    : void 0;
}
function ge(e) {
  if (typeof e == "function" && !e.length) return ge(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const r = ge(e[n]);
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
    }
    return t;
  }
  return e;
}
function ut(e, t) {
  return function (r) {
    let s;
    return (
      B(
        () =>
          (s = E(() => ((w.context = { [e]: r.value }), Pe(() => r.children)))),
        void 0
      ),
      s
    );
  };
}
function S(e, t) {
  return E(() => e(t || {}));
}
function Y() {
  return !0;
}
const me = {
  get(e, t, n) {
    return t === ee ? n : e.get(t);
  },
  has(e, t) {
    return t === ee ? !0 : e.has(t);
  },
  set: Y,
  deleteProperty: Y,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Y,
      deleteProperty: Y,
    };
  },
  ownKeys(e) {
    return e.keys();
  },
};
function de(e) {
  return (e = typeof e == "function" ? e() : e) ? e : {};
}
function at() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]();
    if (n !== void 0) return n;
  }
}
function pe(...e) {
  let t = !1;
  for (let i = 0; i < e.length; i++) {
    const o = e[i];
    (t = t || (!!o && ee in o)),
      (e[i] = typeof o == "function" ? ((t = !0), P(o)) : o);
  }
  if (t)
    return new Proxy(
      {
        get(i) {
          for (let o = e.length - 1; o >= 0; o--) {
            const l = de(e[o])[i];
            if (l !== void 0) return l;
          }
        },
        has(i) {
          for (let o = e.length - 1; o >= 0; o--) if (i in de(e[o])) return !0;
          return !1;
        },
        keys() {
          const i = [];
          for (let o = 0; o < e.length; o++) i.push(...Object.keys(de(e[o])));
          return [...new Set(i)];
        },
      },
      me
    );
  const n = {},
    r = {},
    s = new Set();
  for (let i = e.length - 1; i >= 0; i--) {
    const o = e[i];
    if (!o) continue;
    const l = Object.getOwnPropertyNames(o);
    for (let c = 0, a = l.length; c < a; c++) {
      const u = l[c];
      if (u === "__proto__" || u === "constructor") continue;
      const f = Object.getOwnPropertyDescriptor(o, u);
      if (!s.has(u))
        f.get
          ? (s.add(u),
            Object.defineProperty(n, u, {
              enumerable: !0,
              configurable: !0,
              get: at.bind((r[u] = [f.get.bind(o)])),
            }))
          : (f.value !== void 0 && s.add(u), (n[u] = f.value));
      else {
        const d = r[u];
        d
          ? f.get
            ? d.push(f.get.bind(o))
            : f.value !== void 0 && d.push(() => f.value)
          : n[u] === void 0 && (n[u] = f.value);
      }
    }
  }
  return n;
}
function ft(e, ...t) {
  if (ee in e) {
    const s = new Set(t.length > 1 ? t.flat() : t[0]),
      i = t.map(
        (o) =>
          new Proxy(
            {
              get(l) {
                return o.includes(l) ? e[l] : void 0;
              },
              has(l) {
                return o.includes(l) && l in e;
              },
              keys() {
                return o.filter((l) => l in e);
              },
            },
            me
          )
      );
    return (
      i.push(
        new Proxy(
          {
            get(o) {
              return s.has(o) ? void 0 : e[o];
            },
            has(o) {
              return s.has(o) ? !1 : o in e;
            },
            keys() {
              return Object.keys(e).filter((o) => !s.has(o));
            },
          },
          me
        )
      ),
      i
    );
  }
  const n = {},
    r = t.map(() => ({}));
  for (const s of Object.getOwnPropertyNames(e)) {
    const i = Object.getOwnPropertyDescriptor(e, s),
      o = !i.get && !i.set && i.enumerable && i.writable && i.configurable;
    let l = !1,
      c = 0;
    for (const a of t)
      a.includes(s) &&
        ((l = !0), o ? (r[c][s] = i.value) : Object.defineProperty(r[c], s, i)),
        ++c;
    l || (o ? (n[s] = i.value) : Object.defineProperty(n, s, i));
  }
  return [...r, n];
}
function Se(e) {
  let t, n;
  const r = (s) => {
    const i = v.context;
    if (i) {
      const [l, c] = O();
      (n || (n = e())).then((a) => {
        X(i), c(() => a.default), X();
      }),
        (t = l);
    } else if (!t) {
      const [l] = tt(() => (n || (n = e())).then((c) => c.default));
      t = l;
    }
    let o;
    return P(
      () =>
        (o = t()) &&
        E(() => {
          if (!i) return o(s);
          const l = v.context;
          X(i);
          const c = o(s);
          return X(l), c;
        })
    );
  };
  return (
    (r.preload = () => n || ((n = e()).then((s) => (t = () => s.default)), n)),
    r
  );
}
const dt = (e) => `Stale read from <${e}>.`;
function Ve(e) {
  const t = e.keyed,
    n = P(() => e.when, void 0, { equals: (r, s) => (t ? r === s : !r == !s) });
  return P(
    () => {
      const r = n();
      if (r) {
        const s = e.children;
        return typeof s == "function" && s.length > 0
          ? E(() =>
              s(
                t
                  ? r
                  : () => {
                      if (!E(n)) throw dt("Show");
                      return e.when;
                    }
              )
            )
          : s;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}
const ht = [
    "allowfullscreen",
    "async",
    "autofocus",
    "autoplay",
    "checked",
    "controls",
    "default",
    "disabled",
    "formnovalidate",
    "hidden",
    "indeterminate",
    "ismap",
    "loop",
    "multiple",
    "muted",
    "nomodule",
    "novalidate",
    "open",
    "playsinline",
    "readonly",
    "required",
    "reversed",
    "seamless",
    "selected",
  ],
  gt = new Set([
    "className",
    "value",
    "readOnly",
    "formNoValidate",
    "isMap",
    "noModule",
    "playsInline",
    ...ht,
  ]),
  mt = new Set(["innerHTML", "textContent", "innerText", "children"]),
  pt = Object.assign(Object.create(null), {
    className: "class",
    htmlFor: "for",
  }),
  yt = Object.assign(Object.create(null), {
    class: "className",
    formnovalidate: { $: "formNoValidate", BUTTON: 1, INPUT: 1 },
    ismap: { $: "isMap", IMG: 1 },
    nomodule: { $: "noModule", SCRIPT: 1 },
    playsinline: { $: "playsInline", VIDEO: 1 },
    readonly: { $: "readOnly", INPUT: 1, TEXTAREA: 1 },
  });
function wt(e, t) {
  const n = yt[e];
  return typeof n == "object" ? (n[t] ? n.$ : void 0) : n;
}
const bt = new Set([
    "beforeinput",
    "click",
    "dblclick",
    "contextmenu",
    "focusin",
    "focusout",
    "input",
    "keydown",
    "keyup",
    "mousedown",
    "mousemove",
    "mouseout",
    "mouseover",
    "mouseup",
    "pointerdown",
    "pointermove",
    "pointerout",
    "pointerover",
    "pointerup",
    "touchend",
    "touchmove",
    "touchstart",
  ]),
  Pt = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
  };
function At(e, t, n) {
  let r = n.length,
    s = t.length,
    i = r,
    o = 0,
    l = 0,
    c = t[s - 1].nextSibling,
    a = null;
  for (; o < s || l < i; ) {
    if (t[o] === n[l]) {
      o++, l++;
      continue;
    }
    for (; t[s - 1] === n[i - 1]; ) s--, i--;
    if (s === o) {
      const u = i < r ? (l ? n[l - 1].nextSibling : n[i - l]) : c;
      for (; l < i; ) e.insertBefore(n[l++], u);
    } else if (i === l)
      for (; o < s; ) (!a || !a.has(t[o])) && t[o].remove(), o++;
    else if (t[o] === n[i - 1] && n[l] === t[s - 1]) {
      const u = t[--s].nextSibling;
      e.insertBefore(n[l++], t[o++].nextSibling),
        e.insertBefore(n[--i], u),
        (t[s] = n[i]);
    } else {
      if (!a) {
        a = new Map();
        let f = l;
        for (; f < i; ) a.set(n[f], f++);
      }
      const u = a.get(t[o]);
      if (u != null)
        if (l < u && u < i) {
          let f = o,
            d = 1,
            b;
          for (
            ;
            ++f < s && f < i && !((b = a.get(t[f])) == null || b !== u + d);

          )
            d++;
          if (d > u - l) {
            const A = t[o];
            for (; l < u; ) e.insertBefore(n[l++], A);
          } else e.replaceChild(n[l++], t[o++]);
        } else o++;
      else t[o++].remove();
    }
  }
}
const Ee = "_$DX_DELEGATE";
function vt(e, t, n, r = {}) {
  let s;
  return (
    ke((i) => {
      (s = i),
        t === document ? e() : Nt(t, e(), t.firstChild ? null : void 0, n);
    }, r.owner),
    () => {
      s(), (t.textContent = "");
    }
  );
}
function xt(e, t, n) {
  let r;
  const s = () => {
      const o = document.createElement("template");
      return (
        (o.innerHTML = e),
        n ? o.content.firstChild.firstChild : o.content.firstChild
      );
    },
    i = t
      ? () => E(() => document.importNode(r || (r = s()), !0))
      : () => (r || (r = s())).cloneNode(!0);
  return (i.cloneNode = i), i;
}
function Fe(e, t = window.document) {
  const n = t[Ee] || (t[Ee] = new Set());
  for (let r = 0, s = e.length; r < s; r++) {
    const i = e[r];
    n.has(i) || (n.add(i), t.addEventListener(i, jt));
  }
}
function ye(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function St(e, t, n, r) {
  r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r);
}
function Et(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}
function Ct(e, t, n, r) {
  if (r)
    Array.isArray(n)
      ? ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1]))
      : (e[`$$${t}`] = n);
  else if (Array.isArray(n)) {
    const s = n[0];
    e.addEventListener(t, (n[0] = (i) => s.call(e, n[1], i)));
  } else e.addEventListener(t, n);
}
function Lt(e, t, n = {}) {
  const r = Object.keys(t || {}),
    s = Object.keys(n);
  let i, o;
  for (i = 0, o = s.length; i < o; i++) {
    const l = s[i];
    !l || l === "undefined" || t[l] || (Ce(e, l, !1), delete n[l]);
  }
  for (i = 0, o = r.length; i < o; i++) {
    const l = r[i],
      c = !!t[l];
    !l || l === "undefined" || n[l] === c || !c || (Ce(e, l, !0), (n[l] = c));
  }
  return n;
}
function Ot(e, t, n) {
  if (!t) return n ? ye(e, "style") : t;
  const r = e.style;
  if (typeof t == "string") return (r.cssText = t);
  typeof n == "string" && (r.cssText = n = void 0),
    n || (n = {}),
    t || (t = {});
  let s, i;
  for (i in n) t[i] == null && r.removeProperty(i), delete n[i];
  for (i in t) (s = t[i]), s !== n[i] && (r.setProperty(i, s), (n[i] = s));
  return n;
}
function Rt(e, t = {}, n, r) {
  const s = {};
  return (
    r || B(() => (s.children = K(e, t.children, s.children))),
    B(() => t.ref && t.ref(e)),
    B(() => $t(e, t, n, !0, s, !0)),
    s
  );
}
function Nt(e, t, n, r) {
  if ((n !== void 0 && !r && (r = []), typeof t != "function"))
    return K(e, t, r, n);
  B((s) => K(e, t(), s, n), r);
}
function $t(e, t, n, r, s = {}, i = !1) {
  t || (t = {});
  for (const o in s)
    if (!(o in t)) {
      if (o === "children") continue;
      s[o] = Le(e, o, null, s[o], n, i);
    }
  for (const o in t) {
    if (o === "children") {
      r || K(e, t.children);
      continue;
    }
    const l = t[o];
    s[o] = Le(e, o, l, s[o], n, i);
  }
}
function Tt(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase());
}
function Ce(e, t, n) {
  const r = t.trim().split(/\s+/);
  for (let s = 0, i = r.length; s < i; s++) e.classList.toggle(r[s], n);
}
function Le(e, t, n, r, s, i) {
  let o, l, c, a, u;
  if (t === "style") return Ot(e, n, r);
  if (t === "classList") return Lt(e, n, r);
  if (n === r) return r;
  if (t === "ref") i || n(e);
  else if (t.slice(0, 3) === "on:") {
    const f = t.slice(3);
    r && e.removeEventListener(f, r), n && e.addEventListener(f, n);
  } else if (t.slice(0, 10) === "oncapture:") {
    const f = t.slice(10);
    r && e.removeEventListener(f, r, !0), n && e.addEventListener(f, n, !0);
  } else if (t.slice(0, 2) === "on") {
    const f = t.slice(2).toLowerCase(),
      d = bt.has(f);
    if (!d && r) {
      const b = Array.isArray(r) ? r[0] : r;
      e.removeEventListener(f, b);
    }
    (d || n) && (Ct(e, f, n, d), d && Fe([f]));
  } else if (t.slice(0, 5) === "attr:") ye(e, t.slice(5), n);
  else if (
    (u = t.slice(0, 5) === "prop:") ||
    (c = mt.has(t)) ||
    (!s && ((a = wt(t, e.tagName)) || (l = gt.has(t)))) ||
    (o = e.nodeName.includes("-"))
  )
    u && ((t = t.slice(5)), (l = !0)),
      t === "class" || t === "className"
        ? Et(e, n)
        : o && !l && !c
        ? (e[Tt(t)] = n)
        : (e[a || t] = n);
  else {
    const f = s && t.indexOf(":") > -1 && Pt[t.split(":")[0]];
    f ? St(e, f, t, n) : ye(e, pt[t] || t, n);
  }
  return n;
}
function jt(e) {
  const t = `$$${e.type}`;
  let n = (e.composedPath && e.composedPath()[0]) || e.target;
  for (
    e.target !== n &&
      Object.defineProperty(e, "target", { configurable: !0, value: n }),
      Object.defineProperty(e, "currentTarget", {
        configurable: !0,
        get() {
          return n || document;
        },
      }),
      v.registry && !v.done && (v.done = _$HY.done = !0);
    n;

  ) {
    const r = n[t];
    if (r && !n.disabled) {
      const s = n[`${t}Data`];
      if ((s !== void 0 ? r.call(n, s, e) : r.call(n, e), e.cancelBubble))
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function K(e, t, n, r, s) {
  if (v.context) {
    !n && (n = [...e.childNodes]);
    let l = [];
    for (let c = 0; c < n.length; c++) {
      const a = n[c];
      a.nodeType === 8 && a.data.slice(0, 2) === "!$" ? a.remove() : l.push(a);
    }
    n = l;
  }
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const i = typeof t,
    o = r !== void 0;
  if (
    ((e = (o && n[0] && n[0].parentNode) || e),
    i === "string" || i === "number")
  ) {
    if (v.context) return n;
    if ((i === "number" && (t = t.toString()), o)) {
      let l = n[0];
      l && l.nodeType === 3 ? (l.data = t) : (l = document.createTextNode(t)),
        (n = H(e, n, r, l));
    } else
      n !== "" && typeof n == "string"
        ? (n = e.firstChild.data = t)
        : (n = e.textContent = t);
  } else if (t == null || i === "boolean") {
    if (v.context) return n;
    n = H(e, n, r);
  } else {
    if (i === "function")
      return (
        B(() => {
          let l = t();
          for (; typeof l == "function"; ) l = l();
          n = K(e, l, n, r);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const l = [],
        c = n && Array.isArray(n);
      if (we(l, t, n, s)) return B(() => (n = K(e, l, n, r, !0))), () => n;
      if (v.context) {
        if (!l.length) return n;
        for (let a = 0; a < l.length; a++) if (l[a].parentNode) return (n = l);
      }
      if (l.length === 0) {
        if (((n = H(e, n, r)), o)) return n;
      } else
        c
          ? n.length === 0
            ? Oe(e, l, r)
            : At(e, n, l)
          : (n && H(e), Oe(e, l));
      n = l;
    } else if (t.nodeType) {
      if (v.context && t.parentNode) return (n = o ? [t] : t);
      if (Array.isArray(n)) {
        if (o) return (n = H(e, n, r, t));
        H(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      n = t;
    } else console.warn("Unrecognized value. Skipped inserting", t);
  }
  return n;
}
function we(e, t, n, r) {
  let s = !1;
  for (let i = 0, o = t.length; i < o; i++) {
    let l = t[i],
      c = n && n[i],
      a;
    if (!(l == null || l === !0 || l === !1))
      if ((a = typeof l) == "object" && l.nodeType) e.push(l);
      else if (Array.isArray(l)) s = we(e, l, c) || s;
      else if (a === "function")
        if (r) {
          for (; typeof l == "function"; ) l = l();
          s =
            we(e, Array.isArray(l) ? l : [l], Array.isArray(c) ? c : [c]) || s;
        } else e.push(l), (s = !0);
      else {
        const u = String(l);
        c && c.nodeType === 3 && c.data === u
          ? e.push(c)
          : e.push(document.createTextNode(u));
      }
  }
  return s;
}
function Oe(e, t, n = null) {
  for (let r = 0, s = t.length; r < s; r++) e.insertBefore(t[r], n);
}
function H(e, t, n, r) {
  if (n === void 0) return (e.textContent = "");
  const s = r || document.createTextNode("");
  if (t.length) {
    let i = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const l = t[o];
      if (s !== l) {
        const c = l.parentNode === e;
        !i && !o
          ? c
            ? e.replaceChild(s, l)
            : e.insertBefore(s, n)
          : c && l.remove();
      } else i = !0;
    }
  } else e.insertBefore(s, n);
  return [s];
}
const kt = !1;
const _t = "modulepreload",
  It = function (e) {
    return "/" + e;
  },
  Re = {},
  Ne = function (t, n, r) {
    if (!n || n.length === 0) return t();
    const s = document.getElementsByTagName("link");
    return Promise.all(
      n.map((i) => {
        if (((i = It(i)), i in Re)) return;
        Re[i] = !0;
        const o = i.endsWith(".css"),
          l = o ? '[rel="stylesheet"]' : "";
        if (!!r)
          for (let u = s.length - 1; u >= 0; u--) {
            const f = s[u];
            if (f.href === i && (!o || f.rel === "stylesheet")) return;
          }
        else if (document.querySelector(`link[href="${i}"]${l}`)) return;
        const a = document.createElement("link");
        if (
          ((a.rel = o ? "stylesheet" : _t),
          o || ((a.as = "script"), (a.crossOrigin = "")),
          (a.href = i),
          document.head.appendChild(a),
          o)
        )
          return new Promise((u, f) => {
            a.addEventListener("load", u),
              a.addEventListener("error", () =>
                f(new Error(`Unable to preload CSS for ${i}`))
              );
          });
      })
    )
      .then(() => t())
      .catch((i) => {
        const o = new Event("vite:preloadError", { cancelable: !0 });
        if (((o.payload = i), window.dispatchEvent(o), !o.defaultPrevented))
          throw i;
      });
  };
function Bt(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function Dt([e, t], n, r) {
  return [n ? () => n(e()) : e, r ? (s) => t(r(s)) : t];
}
function Ut(e) {
  try {
    return document.querySelector(e);
  } catch {
    return null;
  }
}
function Mt(e, t) {
  const n = Ut(`#${e}`);
  n ? n.scrollIntoView() : t && window.scrollTo(0, 0);
}
function qt(e, t, n, r) {
  let s = !1;
  const i = (l) => (typeof l == "string" ? { value: l } : l),
    o = Dt(
      O(i(e()), { equals: (l, c) => l.value === c.value }),
      void 0,
      (l) => (!s && t(l), l)
    );
  return (
    n &&
      Ie(
        n((l = e()) => {
          (s = !0), o[1](i(l)), (s = !1);
        })
      ),
    { signal: o, utils: r }
  );
}
function Ht(e) {
  if (e) {
    if (Array.isArray(e)) return { signal: e };
  } else return { signal: O({ value: "" }) };
  return e;
}
function Kt() {
  return qt(
    () => ({
      value:
        window.location.pathname +
        window.location.search +
        window.location.hash,
      state: history.state,
    }),
    ({ value: e, replace: t, scroll: n, state: r }) => {
      t
        ? window.history.replaceState(r, "", e)
        : window.history.pushState(r, "", e),
        Mt(window.location.hash.slice(1), n);
    },
    (e) => Bt(window, "popstate", () => e()),
    { go: (e) => window.history.go(e) }
  );
}
function Vt() {
  let e = new Set();
  function t(s) {
    return e.add(s), () => e.delete(s);
  }
  let n = !1;
  function r(s, i) {
    if (n) return !(n = !1);
    const o = {
      to: s,
      options: i,
      defaultPrevented: !1,
      preventDefault: () => (o.defaultPrevented = !0),
    };
    for (const l of e)
      l.listener({
        ...o,
        from: l.location,
        retry: (c) => {
          c && (n = !0), l.navigate(s, i);
        },
      });
    return !o.defaultPrevented;
  }
  return { subscribe: t, confirm: r };
}
const Ft = /^(?:[a-z0-9]+:)?\/\//i,
  Wt = /^\/+|(\/)\/+$/g;
function U(e, t = !1) {
  const n = e.replace(Wt, "$1");
  return n ? (t || /^[?#]/.test(n) ? n : "/" + n) : "";
}
function Z(e, t, n) {
  if (Ft.test(t)) return;
  const r = U(e),
    s = n && U(n);
  let i = "";
  return (
    !s || t.startsWith("/")
      ? (i = r)
      : s.toLowerCase().indexOf(r.toLowerCase()) !== 0
      ? (i = r + s)
      : (i = s),
    (i || "/") + U(t, !i)
  );
}
function Gt(e, t) {
  if (e == null) throw new Error(t);
  return e;
}
function We(e, t) {
  return U(e).replace(/\/*(\*.*)?$/g, "") + U(t);
}
function Xt(e) {
  const t = {};
  return (
    e.searchParams.forEach((n, r) => {
      t[r] = n;
    }),
    t
  );
}
function Qt(e, t, n) {
  const [r, s] = e.split("/*", 2),
    i = r.split("/").filter(Boolean),
    o = i.length;
  return (l) => {
    const c = l.split("/").filter(Boolean),
      a = c.length - o;
    if (a < 0 || (a > 0 && s === void 0 && !t)) return null;
    const u = { path: o ? "" : "/", params: {} },
      f = (d) => (n === void 0 ? void 0 : n[d]);
    for (let d = 0; d < o; d++) {
      const b = i[d],
        A = c[d],
        y = b[0] === ":",
        R = y ? b.slice(1) : b;
      if (y && he(A, f(R))) u.params[R] = A;
      else if (y || !he(A, b)) return null;
      u.path += `/${A}`;
    }
    if (s) {
      const d = a ? c.slice(-a).join("/") : "";
      if (he(d, f(s))) u.params[s] = d;
      else return null;
    }
    return u;
  };
}
function he(e, t) {
  const n = (r) => r.localeCompare(e, void 0, { sensitivity: "base" }) === 0;
  return t === void 0
    ? !0
    : typeof t == "string"
    ? n(t)
    : typeof t == "function"
    ? t(e)
    : Array.isArray(t)
    ? t.some(n)
    : t instanceof RegExp
    ? t.test(e)
    : !1;
}
function zt(e) {
  const [t, n] = e.pattern.split("/*", 2),
    r = t.split("/").filter(Boolean);
  return r.reduce(
    (s, i) => s + (i.startsWith(":") ? 2 : 3),
    r.length - (n === void 0 ? 0 : 1)
  );
}
function Ge(e) {
  const t = new Map(),
    n = nt();
  return new Proxy(
    {},
    {
      get(r, s) {
        return (
          t.has(s) ||
            rt(n, () =>
              t.set(
                s,
                P(() => e()[s])
              )
            ),
          t.get(s)()
        );
      },
      getOwnPropertyDescriptor() {
        return { enumerable: !0, configurable: !0 };
      },
      ownKeys() {
        return Reflect.ownKeys(e());
      },
    }
  );
}
function Xe(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let n = e.slice(0, t.index),
    r = e.slice(t.index + t[0].length);
  const s = [n, (n += t[1])];
  for (; (t = /^(\/\:[^\/]+)\?/.exec(r)); )
    s.push((n += t[1])), (r = r.slice(t[0].length));
  return Xe(r).reduce((i, o) => [...i, ...s.map((l) => l + o)], []);
}
const Jt = 100,
  Qe = Be(),
  ce = Be(),
  ue = () => Gt(be(Qe), "Make sure your app is wrapped in a <Router />");
let Q;
const ve = () => Q || be(ce) || ue().base,
  Yt = (e) => {
    const t = ve();
    return P(() => t.resolvePath(e()));
  },
  Zt = (e) => {
    const t = ue();
    return P(() => {
      const n = e();
      return n !== void 0 ? t.renderPath(n) : n;
    });
  },
  en = () => ue().location;
function tn(e, t = "", n) {
  const { component: r, data: s, children: i } = e,
    o = !i || (Array.isArray(i) && !i.length),
    l = {
      key: e,
      element: r
        ? () => S(r, {})
        : () => {
            const { element: c } = e;
            return c === void 0 && n ? S(n, {}) : c;
          },
      preload: e.component ? r.preload : e.preload,
      data: s,
    };
  return ze(e.path).reduce((c, a) => {
    for (const u of Xe(a)) {
      const f = We(t, u),
        d = o ? f : f.split("/*", 1)[0];
      c.push({
        ...l,
        originalPath: u,
        pattern: d,
        matcher: Qt(d, !o, e.matchFilters),
      });
    }
    return c;
  }, []);
}
function nn(e, t = 0) {
  return {
    routes: e,
    score: zt(e[e.length - 1]) * 1e4 - t,
    matcher(n) {
      const r = [];
      for (let s = e.length - 1; s >= 0; s--) {
        const i = e[s],
          o = i.matcher(n);
        if (!o) return null;
        r.unshift({ ...o, route: i });
      }
      return r;
    },
  };
}
function ze(e) {
  return Array.isArray(e) ? e : [e];
}
function Je(e, t = "", n, r = [], s = []) {
  const i = ze(e);
  for (let o = 0, l = i.length; o < l; o++) {
    const c = i[o];
    if (c && typeof c == "object" && c.hasOwnProperty("path")) {
      const a = tn(c, t, n);
      for (const u of a) {
        r.push(u);
        const f = Array.isArray(c.children) && c.children.length === 0;
        if (c.children && !f) Je(c.children, u.pattern, n, r, s);
        else {
          const d = nn([...r], s.length);
          s.push(d);
        }
        r.pop();
      }
    }
  }
  return r.length ? s : s.sort((o, l) => l.score - o.score);
}
function rn(e, t) {
  for (let n = 0, r = e.length; n < r; n++) {
    const s = e[n].matcher(t);
    if (s) return s;
  }
  return [];
}
function sn(e, t) {
  const n = new URL("http://sar"),
    r = P(
      (c) => {
        const a = e();
        try {
          return new URL(a, n);
        } catch {
          return console.error(`Invalid path ${a}`), c;
        }
      },
      n,
      { equals: (c, a) => c.href === a.href }
    ),
    s = P(() => r().pathname),
    i = P(() => r().search, !0),
    o = P(() => r().hash),
    l = P(() => "");
  return {
    get pathname() {
      return s();
    },
    get search() {
      return i();
    },
    get hash() {
      return o();
    },
    get state() {
      return t();
    },
    get key() {
      return l();
    },
    query: Ge(_e(i, () => Xt(r()))),
  };
}
function on(e, t = "", n, r) {
  const {
      signal: [s, i],
      utils: o = {},
    } = Ht(e),
    l = o.parsePath || ((h) => h),
    c = o.renderPath || ((h) => h),
    a = o.beforeLeave || Vt(),
    u = Z("", t),
    f = void 0;
  if (u === void 0) throw new Error(`${u} is not a valid base path`);
  u && !s().value && i({ value: u, replace: !0, scroll: !1 });
  const [d, b] = O(!1),
    A = async (h) => {
      b(!0);
      try {
        await st(h);
      } finally {
        b(!1);
      }
    },
    [y, R] = O(s().value),
    [j, M] = O(s().state),
    D = sn(y, j),
    k = [],
    C = {
      pattern: u,
      params: {},
      path: () => u,
      outlet: () => null,
      resolvePath(h) {
        return Z(u, h);
      },
    };
  if (n)
    try {
      (Q = C),
        (C.data = n({ data: void 0, params: {}, location: D, navigate: q(C) }));
    } finally {
      Q = void 0;
    }
  function z(h, g, m) {
    E(() => {
      if (typeof g == "number") {
        g &&
          (o.go
            ? a.confirm(g, m) && o.go(g)
            : console.warn(
                "Router integration does not support relative routing"
              ));
        return;
      }
      const {
          replace: L,
          resolve: J,
          scroll: _,
          state: W,
        } = { replace: !1, resolve: !0, scroll: !0, ...m },
        I = J ? h.resolvePath(g) : Z("", g);
      if (I === void 0) throw new Error(`Path '${g}' is not a routable path`);
      if (k.length >= Jt) throw new Error("Too many redirects");
      const G = y();
      if ((I !== G || W !== j()) && !kt) {
        if (a.confirm(I, m)) {
          const Ye = k.push({ value: G, replace: L, scroll: _, state: j() });
          A(() => {
            R(I), M(W);
          }).then(() => {
            k.length === Ye && F({ value: I, state: W });
          });
        }
      }
    });
  }
  function q(h) {
    return (h = h || be(ce) || C), (g, m) => z(h, g, m);
  }
  function F(h) {
    const g = k[0];
    g &&
      ((h.value !== g.value || h.state !== g.state) &&
        i({ ...h, replace: g.replace, scroll: g.scroll }),
      (k.length = 0));
  }
  B(() => {
    const { value: h, state: g } = s();
    E(() => {
      h !== y() &&
        A(() => {
          R(h), M(g);
        });
    });
  });
  {
    let h = function (g) {
      if (
        g.defaultPrevented ||
        g.button !== 0 ||
        g.metaKey ||
        g.altKey ||
        g.ctrlKey ||
        g.shiftKey
      )
        return;
      const m = g
        .composedPath()
        .find((G) => G instanceof Node && G.nodeName.toUpperCase() === "A");
      if (!m || !m.hasAttribute("link")) return;
      const L = m.href;
      if (m.target || (!L && !m.hasAttribute("state"))) return;
      const J = (m.getAttribute("rel") || "").split(/\s+/);
      if (m.hasAttribute("download") || (J && J.includes("external"))) return;
      const _ = new URL(L);
      if (
        _.origin !== window.location.origin ||
        (u &&
          _.pathname &&
          !_.pathname.toLowerCase().startsWith(u.toLowerCase()))
      )
        return;
      const W = l(_.pathname + _.search + _.hash),
        I = m.getAttribute("state");
      g.preventDefault(),
        z(C, W, {
          resolve: !1,
          replace: m.hasAttribute("replace"),
          scroll: !m.hasAttribute("noscroll"),
          state: I && JSON.parse(I),
        });
    };
    Fe(["click"]),
      document.addEventListener("click", h),
      Ie(() => document.removeEventListener("click", h));
  }
  return {
    base: C,
    out: f,
    location: D,
    isRouting: d,
    renderPath: c,
    parsePath: l,
    navigatorFactory: q,
    beforeLeave: a,
  };
}
function ln(e, t, n, r, s) {
  const { base: i, location: o, navigatorFactory: l } = e,
    { pattern: c, element: a, preload: u, data: f } = r().route,
    d = P(() => r().path);
  u && u();
  const b = {
    parent: t,
    pattern: c,
    get child() {
      return n();
    },
    path: d,
    params: s,
    data: t.data,
    outlet: a,
    resolvePath(A) {
      return Z(i.path(), A, d());
    },
  };
  if (f)
    try {
      (Q = b),
        (b.data = f({ data: t.data, params: s, location: o, navigate: l(b) }));
    } finally {
      Q = void 0;
    }
  return b;
}
const cn = xt("<a link>"),
  un = (e) => {
    const { source: t, url: n, base: r, data: s, out: i } = e,
      o = t || Kt(),
      l = on(o, r, s);
    return S(Qe.Provider, {
      value: l,
      get children() {
        return e.children;
      },
    });
  },
  an = (e) => {
    const t = ue(),
      n = ve(),
      r = Pe(() => e.children),
      s = P(() => Je(r(), We(n.pattern, e.base || ""), fn)),
      i = P(() => rn(s(), t.location.pathname)),
      o = Ge(() => {
        const u = i(),
          f = {};
        for (let d = 0; d < u.length; d++) Object.assign(f, u[d].params);
        return f;
      });
    t.out &&
      t.out.matches.push(
        i().map(({ route: u, path: f, params: d }) => ({
          originalPath: u.originalPath,
          pattern: u.pattern,
          path: f,
          params: d,
        }))
      );
    const l = [];
    let c;
    const a = P(
      _e(i, (u, f, d) => {
        let b = f && u.length === f.length;
        const A = [];
        for (let y = 0, R = u.length; y < R; y++) {
          const j = f && f[y],
            M = u[y];
          d && j && M.route.key === j.route.key
            ? (A[y] = d[y])
            : ((b = !1),
              l[y] && l[y](),
              ke((D) => {
                (l[y] = D),
                  (A[y] = ln(
                    t,
                    A[y - 1] || n,
                    () => a()[y + 1],
                    () => i()[y],
                    o
                  ));
              }));
        }
        return (
          l.splice(u.length).forEach((y) => y()), d && b ? d : ((c = A[0]), A)
        );
      })
    );
    return S(Ve, {
      get when() {
        return a() && c;
      },
      keyed: !0,
      children: (u) =>
        S(ce.Provider, {
          value: u,
          get children() {
            return u.outlet();
          },
        }),
    });
  },
  $e = (e) => {
    const t = Pe(() => e.children);
    return pe(e, {
      get children() {
        return t();
      },
    });
  },
  fn = () => {
    const e = ve();
    return S(Ve, {
      get when() {
        return e.child;
      },
      keyed: !0,
      children: (t) =>
        S(ce.Provider, {
          value: t,
          get children() {
            return t.outlet();
          },
        }),
    });
  };
function mn(e) {
  e = pe({ inactiveClass: "inactive", activeClass: "active" }, e);
  const [, t] = ft(e, [
      "href",
      "state",
      "class",
      "activeClass",
      "inactiveClass",
      "end",
    ]),
    n = Yt(() => e.href),
    r = Zt(n),
    s = en(),
    i = P(() => {
      const o = n();
      if (o === void 0) return !1;
      const l = U(o.split(/[?#]/, 1)[0]).toLowerCase(),
        c = U(s.pathname).toLowerCase();
      return e.end ? l === c : c.startsWith(l);
    });
  return (() => {
    const o = cn();
    return (
      Rt(
        o,
        pe(t, {
          get href() {
            return r() || e.href;
          },
          get state() {
            return JSON.stringify(e.state);
          },
          get classList() {
            return {
              ...(e.class && { [e.class]: !0 }),
              [e.inactiveClass]: !i(),
              [e.activeClass]: i(),
              ...t.classList,
            };
          },
          get "aria-current"() {
            return i() ? "page" : void 0;
          },
        }),
        !1,
        !1
      ),
      o
    );
  })();
}
const dn = [
    {
      title: "Blogをシンプルにしたよ",
      img: "nuxt.jpeg",
      created: "2020年5月14日 公開",
      path: "content1",
    },
    {
      title: "情報理論の謎",
      img: "nuxt.jpeg",
      created: "2020年5月24日 公開",
      path: "content2",
    },
    {
      title: "Rustで標準入力して二値加算",
      img: "rust-social-wide.jpg",
      created: "2020年10月11日 公開",
      path: "content3",
    },
    {
      title: "RustでFibonacci数の183番目",
      img: "rust-social-wide.jpg",
      created: "2020年10月11日 公開",
      path: "content4",
    },
    {
      title: "WebP変換シェルスクリプト",
      img: "webp.png",
      created: "2020年10月12日 公開",
      path: "content5",
    },
    {
      title: "Commit AuthorとCommit Email変更",
      img: "Git.png",
      created: "2020年10月12日 公開",
      path: "content6",
    },
    {
      title: "React + Three.js で LightsOut を作った",
      img: "logo-og.png",
      created: "2021年2月2日 公開",
      path: "content7",
    },
    {
      title: "日常に潜む論理破綻の話",
      img: "HowToLive.png",
      created: "2021年2月7日公開",
      path: "content8",
    },
    {
      title: "Svelte+marked でスライド作成",
      img: "svelte.png",
      created: "2021年2月8日公開",
      path: "content9",
    },
    {
      title: "GraphQL APIでDBアクセスを大量に発生させる攻撃手法について",
      img: "glaphgl.png",
      created: "2021年2月10日公開",
      path: "content10",
    },
    {
      title: "React+Chart.js でコロナ感染者数を表示するアプリ作成",
      img: "logo-og.png",
      created: "2021年2月15日公開",
      path: "content11",
    },
    {
      title: "GraphQL APIで悪意あるクエリの対策手段",
      img: "glaphgl.png",
      created: "2021年2月16日公開",
      path: "content12",
    },
    {
      title: "Huffman codeをTypeScriptで実装する",
      img: "huffman.png",
      created: "2021年3月17日公開",
      path: "content13",
    },
    {
      title: "数学オリンピックの問題をRustで解く",
      img: "rust-social-wide.jpg",
      created: "2021年3月23日公開",
      path: "content14",
    },
    {
      title: "Svelte で TODO アプリを作った",
      img: "svelte.png",
      created: "2021年3月29日公開",
      path: "content15",
    },
  ],
  hn = 450,
  gn = () => {
    const e = Se(() => Ne(() => import("./home-0f24941e.js"), [])),
      [t, n] = O(!1);
    return (
      et(() => {
        const r = window.innerWidth,
          s = hn > r;
        n(s);
      }, []),
      S(un, {
        get children() {
          return S(an, {
            get children() {
              return [
                S($e, {
                  path: "/",
                  get element() {
                    return S(e, { isSP: t });
                  },
                }),
                P(() =>
                  dn.map((r) => {
                    const s = Se(() =>
                      Ne(() => import(`./pages/articles/${r.path}`), [])
                    );
                    return S($e, {
                      get path() {
                        return `/articles/${r.path}`;
                      },
                      get element() {
                        return S(s, { isSP: t });
                      },
                    });
                  })
                ),
              ];
            },
          });
        },
      })
    );
  };
vt(() => S(gn, {}), document.getElementById("root"));
export { mn as A, S as a, B as b, Et as c, dn as d, Nt as i, ye as s, xt as t };
