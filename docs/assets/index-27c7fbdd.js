(function() {
  const t = document.createElement('link').relList;
  if (t && t.supports && t.supports('modulepreload')) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const i of s) {
      if (i.type === 'childList') {
        for (const o of i.addedNodes) {
          o.tagName === 'LINK' && o.rel === 'modulepreload' && r(o);
        }
      }
    }
  }).observe(document, {childList: !0, subtree: !0});
  function n(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === 'use-credentials' ?
        (i.credentials = 'include') :
        s.crossOrigin === 'anonymous' ?
        (i.credentials = 'omit') :
        (i.credentials = 'same-origin'),
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
const C = {context: void 0, registry: void 0};
function Q(e) {
  C.context = e;
}
const et = (e, t) => e === t;
const te = Symbol('solid-proxy');
const tt = Symbol('solid-track');
const ne = {equals: et};
let Ie = qe;
const _ = 1;
const re = 2;
const _e = {owned: null, cleanups: null, context: null, owner: null};
const fe = {};
let A = null;
const de = null;
let w = null;
let L = null;
let k = null;
let oe = 0;
function z(e, t) {
  const n = w;
  const r = A;
  const s = e.length === 0;
  const i = s ?
    _e :
    {
      owned: null,
      cleanups: null,
      context: null,
      owner: t === void 0 ? r : t,
    };
  const o = s ? e : () => e(() => N(() => ce(i)));
  (A = i), (w = null);
  try {
    return I(o, !0);
  } finally {
    (w = n), (A = r);
  }
}
function T(e, t) {
  t = t ? Object.assign({}, ne, t) : ne;
  const n = {
    value: e,
    observers: null,
    observerSlots: null,
    comparator: t.equals || void 0,
  };
  const r = (s) => (typeof s === 'function' && (s = s(n.value)), Ue(n, s));
  return [Me.bind(n), r];
}
function Ee(e, t) {
  const r = le(e, t, !0, _);
  V(r);
}
function M(e, t) {
  const r = le(e, t, !1, _);
  V(r);
}
function nt(e, t, n) {
  Ie = ut;
  const r = le(e, t, !1, _);
  (!n || !n.render) && (r.user = !0), k ? k.push(r) : V(r);
}
function P(e, t, n) {
  n = n ? Object.assign({}, ne, n) : ne;
  const r = le(e, t, !0, 0);
  return (
    (r.observers = null),
    (r.observerSlots = null),
    (r.comparator = n.equals || void 0),
    V(r),
    Me.bind(r)
  );
}
function rt(e, t, n) {
  let r;
  let s;
  let i;
  (arguments.length === 2 && typeof t === 'object') || arguments.length === 1 ?
    ((r = !0), (s = e), (i = t || {})) :
    ((r = e), (s = t), (i = n || {}));
  let o = null;
  let l = fe;
  let a = null;
  let u = !1;
  let c = 'initialValue' in i;
  const f = typeof r === 'function' && P(r);
  const d = new Set();
  const [m, b] = (i.storage || T)(i.initialValue);
  const [y, R] = T(void 0);
  const [$, E] = T(void 0, {equals: !1});
  const [x, v] = T(c ? 'ready' : 'unresolved');
  if (C.context) {
    a = `${C.context.id}${C.context.count++}`;
    let h;
    i.ssrLoadFrom === 'initial' ?
      (l = i.initialValue) :
      C.load && (h = C.load(a)) && (l = h[0]);
  }
  function S(h, g, p, j) {
    return (
      o === h &&
        ((o = null),
        j !== void 0 && (c = !0),
        (h === l || g === l) &&
          i.onHydrated &&
          queueMicrotask(() => i.onHydrated(j, {value: g})),
        (l = fe),
        q(g, p)),
      g
    );
  }
  function q(h, g) {
    I(() => {
      g === void 0 && b(() => h),
      v(g !== void 0 ? 'errored' : c ? 'ready' : 'unresolved'),
      R(g);
      for (const p of d.keys()) p.decrement();
      d.clear();
    }, !1);
  }
  function K() {
    const h = lt;
    const g = m();
    const p = y();
    if (p !== void 0 && !o) throw p;
    return (
      w &&
        !w.user &&
        h &&
        Ee(() => {
          $(), o && (h.resolved || d.has(h) || (h.increment(), d.add(h)));
        }),
      g
    );
  }
  function W(h = !0) {
    if (h !== !1 && u) return;
    u = !1;
    const g = f ? f() : r;
    if (g == null || g === !1) {
      S(o, N(m));
      return;
    }
    const p = l !== fe ? l : N(() => s(g, {value: m(), refetching: h}));
    return typeof p !== 'object' || !(p && 'then' in p) ?
      (S(o, p, void 0, g), p) :
      ((o = p),
      (u = !0),
      queueMicrotask(() => (u = !1)),
      I(() => {
        v(c ? 'refreshing' : 'pending'), E();
      }, !1),
      p.then(
          (j) => S(p, j, void 0, g),
          (j) => S(p, void 0, Fe(j), g)
      ));
  }
  return (
    Object.defineProperties(K, {
      state: {get: () => x()},
      error: {get: () => y()},
      loading: {
        get() {
          const h = x();
          return h === 'pending' || h === 'refreshing';
        },
      },
      latest: {
        get() {
          if (!c) return K();
          const h = y();
          if (h && !o) throw h;
          return m();
        },
      },
    }),
    f ? Ee(() => W(!1)) : W(!1),
    [K, {refetch: W, mutate: b}]
  );
}
function N(e) {
  if (w === null) return e();
  const t = w;
  w = null;
  try {
    return e();
  } finally {
    w = t;
  }
}
function Be(e, t, n) {
  const r = Array.isArray(e);
  let s;
  let i = n && n.defer;
  return (o) => {
    let l;
    if (r) {
      l = Array(e.length);
      for (let u = 0; u < e.length; u++) l[u] = e[u]();
    } else l = e();
    if (i) {
      i = !1;
      return;
    }
    const a = N(() => t(l, s, o));
    return (s = l), a;
  };
}
function Ae(e) {
  return (
    A === null ||
      (A.cleanups === null ? (A.cleanups = [e]) : A.cleanups.push(e)),
    e
  );
}
function st() {
  return A;
}
function it(e, t) {
  const n = A;
  const r = w;
  (A = e), (w = null);
  try {
    return I(t, !0);
  } catch (s) {
    ve(s);
  } finally {
    (A = n), (w = r);
  }
}
function ot(e) {
  const t = w;
  const n = A;
  return Promise.resolve().then(() => {
    (w = t), (A = n);
    let r;
    return I(e, !1), (w = A = null), r ? r.done : void 0;
  });
}
function De(e) {
  const n = Symbol('context');
  return {id: n, Provider: ft(n), defaultValue: e};
}
function Pe(e) {
  let t;
  return (t = He(A, e.id)) !== void 0 ? t : e.defaultValue;
}
function xe(e) {
  const t = P(e);
  const n = P(() => me(t()));
  return (
    (n.toArray = () => {
      const r = n();
      return Array.isArray(r) ? r : r != null ? [r] : [];
    }),
    n
  );
}
let lt;
function Me() {
  if (this.sources && this.state) {
    if (this.state === _) V(this);
    else {
      const e = L;
      (L = null), I(() => ie(this), !1), (L = e);
    }
  }
  if (w) {
    const e = this.observers ? this.observers.length : 0;
    w.sources ?
      (w.sources.push(this), w.sourceSlots.push(e)) :
      ((w.sources = [this]), (w.sourceSlots = [e])),
      this.observers ?
        (this.observers.push(w),
        this.observerSlots.push(w.sources.length - 1)) :
        ((this.observers = [w]),
        (this.observerSlots = [w.sources.length - 1]));
  }
  return this.value;
}
function Ue(e, t) {
  const r = e.value;
  return (
    (!e.comparator || !e.comparator(r, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        I(() => {
          for (let s = 0; s < e.observers.length; s += 1) {
            const i = e.observers[s];
            const o = de && de.running;
            o && de.disposed.has(i),
            (o ? !i.tState : !i.state) &&
                (i.pure ? L.push(i) : k.push(i), i.observers && Ke(i)),
            o || (i.state = _);
          }
          if (L.length > 1e6) throw ((L = []), new Error());
        }, !1)),
    t
  );
}
function V(e) {
  if (!e.fn) return;
  ce(e);
  const t = A;
  const n = w;
  const r = oe;
  (w = A = e), ct(e, e.value, r), (w = n), (A = t);
}
function ct(e, t, n) {
  let r;
  try {
    r = e.fn(t);
  } catch (s) {
    return (
      e.pure &&
        ((e.state = _), e.owned && e.owned.forEach(ce), (e.owned = null)),
      (e.updatedAt = n + 1),
      ve(s)
    );
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && 'observers' in e ? Ue(e, r) : (e.value = r),
      (e.updatedAt = n));
}
function le(e, t, n, r = _) {
  const i = {
    fn: e,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: A,
    context: null,
    pure: n,
  };
  return (
    A === null || (A !== _e && (A.owned ? A.owned.push(i) : (A.owned = [i]))), i
  );
}
function se(e) {
  if (e.state === 0) return;
  if (e.state === re) return ie(e);
  if (e.suspense && N(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < oe); ) {
    e.state && t.push(e);
  }
  for (let n = t.length - 1; n >= 0; n--) {
    if (((e = t[n]), e.state === _)) V(e);
    else if (e.state === re) {
      const r = L;
      (L = null), I(() => ie(e, t[0]), !1), (L = r);
    }
  }
}
function I(e, t) {
  if (L) return e();
  let n = !1;
  t || (L = []), k ? (n = !0) : (k = []), oe++;
  try {
    const r = e();
    return at(n), r;
  } catch (r) {
    n || (k = null), (L = null), ve(r);
  }
}
function at(e) {
  if ((L && (qe(L), (L = null)), e)) return;
  const t = k;
  (k = null), t.length && I(() => Ie(t), !1);
}
function qe(e) {
  for (let t = 0; t < e.length; t++) se(e[t]);
}
function ut(e) {
  let t;
  let n = 0;
  for (t = 0; t < e.length; t++) {
    const r = e[t];
    r.user ? (e[n++] = r) : se(r);
  }
  for (C.context && Q(), t = 0; t < n; t++) se(e[t]);
}
function ie(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const r = e.sources[n];
    if (r.sources) {
      const s = r.state;
      s === _ ?
        r !== t && (!r.updatedAt || r.updatedAt < oe) && se(r) :
        s === re && ie(r, t);
    }
  }
}
function Ke(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state ||
      ((n.state = re), n.pure ? L.push(n) : k.push(n), n.observers && Ke(n));
  }
}
function ce(e) {
  let t;
  if (e.sources) {
    for (; e.sources.length; ) {
      const n = e.sources.pop();
      const r = e.sourceSlots.pop();
      const s = n.observers;
      if (s && s.length) {
        const i = s.pop();
        const o = n.observerSlots.pop();
        r < s.length &&
          ((i.sourceSlots[o] = r), (s[r] = i), (n.observerSlots[r] = o));
      }
    }
  }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) ce(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  (e.state = 0), (e.context = null);
}
function Fe(e) {
  return e instanceof Error ?
    e :
    new Error(typeof e === 'string' ? e : 'Unknown error', {cause: e});
}
function ve(e) {
  throw Fe(e);
}
function He(e, t) {
  return e ?
    e.context && e.context[t] !== void 0 ?
      e.context[t] :
      He(e.owner, t) :
    void 0;
}
function me(e) {
  if (typeof e === 'function' && !e.length) return me(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const r = me(e[n]);
      Array.isArray(r) ? t.push.apply(t, r) : t.push(r);
    }
    return t;
  }
  return e;
}
function ft(e) {
  return function(r) {
    let s;
    return (
      M(
          () =>
            (s = N(() => ((A.context = {[e]: r.value}), xe(() => r.children)))),
          void 0
      ),
      s
    );
  };
}
const dt = Symbol('fallback');
function Ce(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}
function ht(e, t, n = {}) {
  let r = [];
  let s = [];
  let i = [];
  let o = 0;
  let l = t.length > 1 ? [] : null;
  return (
    Ae(() => Ce(i)),
    () => {
      const a = e() || [];
      let u;
      let c;
      return (
        a[tt],
        N(() => {
          const d = a.length;
          let m;
          let b;
          let y;
          let R;
          let $;
          let E;
          let x;
          let v;
          let S;
          if (d === 0) {
            o !== 0 &&
              (Ce(i), (i = []), (r = []), (s = []), (o = 0), l && (l = [])),
            n.fallback &&
                ((r = [dt]),
                (s[0] = z((q) => ((i[0] = q), n.fallback()))),
                (o = 1));
          } else if (o === 0) {
            for (s = new Array(d), c = 0; c < d; c++) {
              (r[c] = a[c]), (s[c] = z(f));
            }
            o = d;
          } else {
            for (
              y = new Array(d),
              R = new Array(d),
              l && ($ = new Array(d)),
              E = 0,
              x = Math.min(o, d);
              E < x && r[E] === a[E];
              E++
            );
            for (
              x = o - 1, v = d - 1;
              x >= E && v >= E && r[x] === a[v];
              x--, v--
            ) {
              (y[v] = s[x]), (R[v] = i[x]), l && ($[v] = l[x]);
            }
            for (m = new Map(), b = new Array(v + 1), c = v; c >= E; c--) {
              (S = a[c]),
              (u = m.get(S)),
              (b[c] = u === void 0 ? -1 : u),
              m.set(S, c);
            }
            for (u = E; u <= x; u++) {
              (S = r[u]),
              (c = m.get(S)),
                c !== void 0 && c !== -1 ?
                  ((y[c] = s[u]),
                  (R[c] = i[u]),
                  l && ($[c] = l[u]),
                  (c = b[c]),
                  m.set(S, c)) :
                  i[u]();
            }
            for (c = E; c < d; c++) {
              c in y ?
                ((s[c] = y[c]), (i[c] = R[c]), l && ((l[c] = $[c]), l[c](c))) :
                (s[c] = z(f));
            }
            (s = s.slice(0, (o = d))), (r = a.slice(0));
          }
          return s;
        })
      );
      function f(d) {
        if (((i[c] = d), l)) {
          const [m, b] = T(c);
          return (l[c] = b), t(a[c], m);
        }
        return t(a[c]);
      }
    }
  );
}
function O(e, t) {
  return N(() => e(t || {}));
}
function Z() {
  return !0;
}
const ye = {
  get(e, t, n) {
    return t === te ? n : e.get(t);
  },
  has(e, t) {
    return t === te ? !0 : e.has(t);
  },
  set: Z,
  deleteProperty: Z,
  getOwnPropertyDescriptor(e, t) {
    return {
      configurable: !0,
      enumerable: !0,
      get() {
        return e.get(t);
      },
      set: Z,
      deleteProperty: Z,
    };
  },
  ownKeys(e) {
    return e.keys();
  },
};
function he(e) {
  return (e = typeof e === 'function' ? e() : e) ? e : {};
}
function gt() {
  for (let e = 0, t = this.length; e < t; ++e) {
    const n = this[e]();
    if (n !== void 0) return n;
  }
}
function pe(...e) {
  let t = !1;
  for (let i = 0; i < e.length; i++) {
    const o = e[i];
    (t = t || (!!o && te in o)),
    (e[i] = typeof o === 'function' ? ((t = !0), P(o)) : o);
  }
  if (t) {
    return new Proxy(
        {
          get(i) {
            for (let o = e.length - 1; o >= 0; o--) {
              const l = he(e[o])[i];
              if (l !== void 0) return l;
            }
          },
          has(i) {
            for (let o = e.length - 1; o >= 0; o--) if (i in he(e[o])) return !0;
            return !1;
          },
          keys() {
            const i = [];
            for (let o = 0; o < e.length; o++) i.push(...Object.keys(he(e[o])));
            return [...new Set(i)];
          },
        },
        ye
    );
  }
  const n = {};
  const r = {};
  const s = new Set();
  for (let i = e.length - 1; i >= 0; i--) {
    const o = e[i];
    if (!o) continue;
    const l = Object.getOwnPropertyNames(o);
    for (let a = 0, u = l.length; a < u; a++) {
      const c = l[a];
      if (c === '__proto__' || c === 'constructor') continue;
      const f = Object.getOwnPropertyDescriptor(o, c);
      if (!s.has(c)) {
        f.get ?
          (s.add(c),
          Object.defineProperty(n, c, {
            enumerable: !0,
            configurable: !0,
            get: gt.bind((r[c] = [f.get.bind(o)])),
          })) :
          (f.value !== void 0 && s.add(c), (n[c] = f.value));
      } else {
        const d = r[c];
        d ?
          f.get ?
            d.push(f.get.bind(o)) :
            f.value !== void 0 && d.push(() => f.value) :
          n[c] === void 0 && (n[c] = f.value);
      }
    }
  }
  return n;
}
function mt(e, ...t) {
  if (te in e) {
    const s = new Set(t.length > 1 ? t.flat() : t[0]);
    const i = t.map(
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
              ye
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
              ye
          )
      ),
      i
    );
  }
  const n = {};
  const r = t.map(() => ({}));
  for (const s of Object.getOwnPropertyNames(e)) {
    const i = Object.getOwnPropertyDescriptor(e, s);
    const o = !i.get && !i.set && i.enumerable && i.writable && i.configurable;
    let l = !1;
    let a = 0;
    for (const u of t) {
      u.includes(s) &&
        ((l = !0), o ? (r[a][s] = i.value) : Object.defineProperty(r[a], s, i)),
      ++a;
    }
    l || (o ? (n[s] = i.value) : Object.defineProperty(n, s, i));
  }
  return [...r, n];
}
function Le(e) {
  let t;
  let n;
  const r = (s) => {
    const i = C.context;
    if (i) {
      const [l, a] = T();
      (n || (n = e())).then((u) => {
        Q(i), a(() => u.default), Q();
      }),
      (t = l);
    } else if (!t) {
      const [l] = rt(() => (n || (n = e())).then((a) => a.default));
      t = l;
    }
    let o;
    return P(
        () =>
          (o = t()) &&
        N(() => {
          if (!i) return o(s);
          const l = C.context;
          Q(i);
          const a = o(s);
          return Q(l), a;
        })
    );
  };
  return (
    (r.preload = () => n || ((n = e()).then((s) => (t = () => s.default)), n)),
    r
  );
}
const yt = (e) => `Stale read from <${e}>.`;
function pt(e) {
  const t = 'fallback' in e && {fallback: () => e.fallback};
  return P(ht(() => e.each, e.children, t || void 0));
}
function Ve(e) {
  const t = e.keyed;
  const n = P(() => e.when, void 0, {
    equals: (r, s) => (t ? r === s : !r == !s),
  });
  return P(
      () => {
        const r = n();
        if (r) {
          const s = e.children;
          return typeof s === 'function' && s.length > 0 ?
          N(() =>
            s(
                t ?
                  r :
                  () => {
                    if (!N(n)) throw yt('Show');
                    return e.when;
                  }
            )
          ) :
          s;
        }
        return e.fallback;
      },
      void 0,
      void 0
  );
}
const wt = [
  'allowfullscreen',
  'async',
  'autofocus',
  'autoplay',
  'checked',
  'controls',
  'default',
  'disabled',
  'formnovalidate',
  'hidden',
  'indeterminate',
  'ismap',
  'loop',
  'multiple',
  'muted',
  'nomodule',
  'novalidate',
  'open',
  'playsinline',
  'readonly',
  'required',
  'reversed',
  'seamless',
  'selected',
];
const bt = new Set([
  'className',
  'value',
  'readOnly',
  'formNoValidate',
  'isMap',
  'noModule',
  'playsInline',
  ...wt,
]);
const At = new Set(['innerHTML', 'textContent', 'innerText', 'children']);
const Pt = Object.assign(Object.create(null), {
  className: 'class',
  htmlFor: 'for',
});
const xt = Object.assign(Object.create(null), {
  class: 'className',
  formnovalidate: {$: 'formNoValidate', BUTTON: 1, INPUT: 1},
  ismap: {$: 'isMap', IMG: 1},
  nomodule: {$: 'noModule', SCRIPT: 1},
  playsinline: {$: 'playsInline', VIDEO: 1},
  readonly: {$: 'readOnly', INPUT: 1, TEXTAREA: 1},
});
function vt(e, t) {
  const n = xt[e];
  return typeof n === 'object' ? (n[t] ? n.$ : void 0) : n;
}
const St = new Set([
  'beforeinput',
  'click',
  'dblclick',
  'contextmenu',
  'focusin',
  'focusout',
  'input',
  'keydown',
  'keyup',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'pointerdown',
  'pointermove',
  'pointerout',
  'pointerover',
  'pointerup',
  'touchend',
  'touchmove',
  'touchstart',
]);
const Et = {
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
};
function Ct(e, t, n) {
  const r = n.length;
  let s = t.length;
  let i = r;
  let o = 0;
  let l = 0;
  const a = t[s - 1].nextSibling;
  let u = null;
  for (; o < s || l < i; ) {
    if (t[o] === n[l]) {
      o++, l++;
      continue;
    }
    for (; t[s - 1] === n[i - 1]; ) s--, i--;
    if (s === o) {
      const c = i < r ? (l ? n[l - 1].nextSibling : n[i - l]) : a;
      for (; l < i; ) e.insertBefore(n[l++], c);
    } else if (i === l) {
      for (; o < s; ) (!u || !u.has(t[o])) && t[o].remove(), o++;
    } else if (t[o] === n[i - 1] && n[l] === t[s - 1]) {
      const c = t[--s].nextSibling;
      e.insertBefore(n[l++], t[o++].nextSibling),
      e.insertBefore(n[--i], c),
      (t[s] = n[i]);
    } else {
      if (!u) {
        u = new Map();
        let f = l;
        for (; f < i; ) u.set(n[f], f++);
      }
      const c = u.get(t[o]);
      if (c != null) {
        if (l < c && c < i) {
          let f = o;
          let d = 1;
          let m;
          for (
            ;
            ++f < s && f < i && !((m = u.get(t[f])) == null || m !== c + d);

          ) {
            d++;
          }
          if (d > c - l) {
            const b = t[o];
            for (; l < c; ) e.insertBefore(n[l++], b);
          } else e.replaceChild(n[l++], t[o++]);
        } else o++;
      } else t[o++].remove();
    }
  }
}
const Oe = '_$DX_DELEGATE';
function Lt(e, t, n, r = {}) {
  let s;
  return (
    z((i) => {
      (s = i),
        t === document ? e() : It(t, e(), t.firstChild ? null : void 0, n);
    }, r.owner),
    () => {
      s(), (t.textContent = '');
    }
  );
}
function Ot(e, t, n) {
  let r;
  const s = () => {
    const o = document.createElement('template');
    return (
      (o.innerHTML = e),
      n ? o.content.firstChild.firstChild : o.content.firstChild
    );
  };
  const i = t ?
    () => N(() => document.importNode(r || (r = s()), !0)) :
    () => (r || (r = s())).cloneNode(!0);
  return (i.cloneNode = i), i;
}
function We(e, t = window.document) {
  const n = t[Oe] || (t[Oe] = new Set());
  for (let r = 0, s = e.length; r < s; r++) {
    const i = e[r];
    n.has(i) || (n.add(i), t.addEventListener(i, Dt));
  }
}
function we(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}
function Rt(e, t, n, r) {
  r == null ? e.removeAttributeNS(t, n) : e.setAttributeNS(t, n, r);
}
function Nt(e, t) {
  t == null ? e.removeAttribute('class') : (e.className = t);
}
function $t(e, t, n, r) {
  if (r) {
    Array.isArray(n) ?
      ((e[`$$${t}`] = n[0]), (e[`$$${t}Data`] = n[1])) :
      (e[`$$${t}`] = n);
  } else if (Array.isArray(n)) {
    const s = n[0];
    e.addEventListener(t, (n[0] = (i) => s.call(e, n[1], i)));
  } else e.addEventListener(t, n);
}
function Tt(e, t, n = {}) {
  const r = Object.keys(t || {});
  const s = Object.keys(n);
  let i;
  let o;
  for (i = 0, o = s.length; i < o; i++) {
    const l = s[i];
    !l || l === 'undefined' || t[l] || (Re(e, l, !1), delete n[l]);
  }
  for (i = 0, o = r.length; i < o; i++) {
    const l = r[i];
    const a = !!t[l];
    !l || l === 'undefined' || n[l] === a || !a || (Re(e, l, !0), (n[l] = a));
  }
  return n;
}
function jt(e, t, n) {
  if (!t) return n ? we(e, 'style') : t;
  const r = e.style;
  if (typeof t === 'string') return (r.cssText = t);
  typeof n === 'string' && (r.cssText = n = void 0),
  n || (n = {}),
  t || (t = {});
  let s;
  let i;
  for (i in n) t[i] == null && r.removeProperty(i), delete n[i];
  for (i in t) (s = t[i]), s !== n[i] && (r.setProperty(i, s), (n[i] = s));
  return n;
}
function kt(e, t = {}, n, r) {
  const s = {};
  return (
    r || M(() => (s.children = H(e, t.children, s.children))),
    M(() => t.ref && t.ref(e)),
    M(() => _t(e, t, n, !0, s, !0)),
    s
  );
}
function It(e, t, n, r) {
  if ((n !== void 0 && !r && (r = []), typeof t !== 'function')) {
    return H(e, t, r, n);
  }
  M((s) => H(e, t(), s, n), r);
}
function _t(e, t, n, r, s = {}, i = !1) {
  t || (t = {});
  for (const o in s) {
    if (!(o in t)) {
      if (o === 'children') continue;
      s[o] = Ne(e, o, null, s[o], n, i);
    }
  }
  for (const o in t) {
    if (o === 'children') {
      r || H(e, t.children);
      continue;
    }
    const l = t[o];
    s[o] = Ne(e, o, l, s[o], n, i);
  }
}
function Bt(e) {
  return e.toLowerCase().replace(/-([a-z])/g, (t, n) => n.toUpperCase());
}
function Re(e, t, n) {
  const r = t.trim().split(/\s+/);
  for (let s = 0, i = r.length; s < i; s++) e.classList.toggle(r[s], n);
}
function Ne(e, t, n, r, s, i) {
  let o;
  let l;
  let a;
  let u;
  let c;
  if (t === 'style') return jt(e, n, r);
  if (t === 'classList') return Tt(e, n, r);
  if (n === r) return r;
  if (t === 'ref') i || n(e);
  else if (t.slice(0, 3) === 'on:') {
    const f = t.slice(3);
    r && e.removeEventListener(f, r), n && e.addEventListener(f, n);
  } else if (t.slice(0, 10) === 'oncapture:') {
    const f = t.slice(10);
    r && e.removeEventListener(f, r, !0), n && e.addEventListener(f, n, !0);
  } else if (t.slice(0, 2) === 'on') {
    const f = t.slice(2).toLowerCase();
    const d = St.has(f);
    if (!d && r) {
      const m = Array.isArray(r) ? r[0] : r;
      e.removeEventListener(f, m);
    }
    (d || n) && ($t(e, f, n, d), d && We([f]));
  } else if (t.slice(0, 5) === 'attr:') we(e, t.slice(5), n);
  else if (
    (c = t.slice(0, 5) === 'prop:') ||
    (a = At.has(t)) ||
    (!s && ((u = vt(t, e.tagName)) || (l = bt.has(t)))) ||
    (o = e.nodeName.includes('-'))
  ) {
    c && ((t = t.slice(5)), (l = !0)),
      t === 'class' || t === 'className' ?
        Nt(e, n) :
        o && !l && !a ?
        (e[Bt(t)] = n) :
        (e[u || t] = n);
  } else {
    const f = s && t.indexOf(':') > -1 && Et[t.split(':')[0]];
    f ? Rt(e, f, t, n) : we(e, Pt[t] || t, n);
  }
  return n;
}
function Dt(e) {
  const t = `$$${e.type}`;
  let n = (e.composedPath && e.composedPath()[0]) || e.target;
  for (
    e.target !== n &&
      Object.defineProperty(e, 'target', {configurable: !0, value: n}),
    Object.defineProperty(e, 'currentTarget', {
      configurable: !0,
      get() {
        return n || document;
      },
    }),
    C.registry && !C.done && (C.done = _$HY.done = !0);
    n;

  ) {
    const r = n[t];
    if (r && !n.disabled) {
      const s = n[`${t}Data`];
      if ((s !== void 0 ? r.call(n, s, e) : r.call(n, e), e.cancelBubble)) {
        return;
      }
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function H(e, t, n, r, s) {
  if (C.context) {
    !n && (n = [...e.childNodes]);
    const l = [];
    for (let a = 0; a < n.length; a++) {
      const u = n[a];
      u.nodeType === 8 && u.data.slice(0, 2) === '!$' ? u.remove() : l.push(u);
    }
    n = l;
  }
  for (; typeof n === 'function'; ) n = n();
  if (t === n) return n;
  const i = typeof t;
  const o = r !== void 0;
  if (
    ((e = (o && n[0] && n[0].parentNode) || e),
    i === 'string' || i === 'number')
  ) {
    if (C.context) return n;
    if ((i === 'number' && (t = t.toString()), o)) {
      let l = n[0];
      l && l.nodeType === 3 ? (l.data = t) : (l = document.createTextNode(t)),
      (n = F(e, n, r, l));
    } else {
      n !== '' && typeof n === 'string' ?
        (n = e.firstChild.data = t) :
        (n = e.textContent = t);
    }
  } else if (t == null || i === 'boolean') {
    if (C.context) return n;
    n = F(e, n, r);
  } else {
    if (i === 'function') {
      return (
        M(() => {
          let l = t();
          for (; typeof l === 'function'; ) l = l();
          n = H(e, l, n, r);
        }),
        () => n
      );
    }
    if (Array.isArray(t)) {
      const l = [];
      const a = n && Array.isArray(n);
      if (be(l, t, n, s)) return M(() => (n = H(e, l, n, r, !0))), () => n;
      if (C.context) {
        if (!l.length) return n;
        for (let u = 0; u < l.length; u++) if (l[u].parentNode) return (n = l);
      }
      if (l.length === 0) {
        if (((n = F(e, n, r)), o)) return n;
      } else {
        a ?
          n.length === 0 ?
            $e(e, l, r) :
            Ct(e, n, l) :
          (n && F(e), $e(e, l));
      }
      n = l;
    } else if (t.nodeType) {
      if (C.context && t.parentNode) return (n = o ? [t] : t);
      if (Array.isArray(n)) {
        if (o) return (n = F(e, n, r, t));
        F(e, n, null, t);
      } else {
        n == null || n === '' || !e.firstChild ?
          e.appendChild(t) :
          e.replaceChild(t, e.firstChild);
      }
      n = t;
    } else console.warn('Unrecognized value. Skipped inserting', t);
  }
  return n;
}
function be(e, t, n, r) {
  let s = !1;
  for (let i = 0, o = t.length; i < o; i++) {
    let l = t[i];
    const a = n && n[i];
    let u;
    if (!(l == null || l === !0 || l === !1)) {
      if ((u = typeof l) == 'object' && l.nodeType) e.push(l);
      else if (Array.isArray(l)) s = be(e, l, a) || s;
      else if (u === 'function') {
        if (r) {
          for (; typeof l === 'function'; ) l = l();
          s =
            be(e, Array.isArray(l) ? l : [l], Array.isArray(a) ? a : [a]) || s;
        } else e.push(l), (s = !0);
      } else {
        const c = String(l);
        a && a.nodeType === 3 && a.data === c ?
          e.push(a) :
          e.push(document.createTextNode(c));
      }
    }
  }
  return s;
}
function $e(e, t, n = null) {
  for (let r = 0, s = t.length; r < s; r++) e.insertBefore(t[r], n);
}
function F(e, t, n, r) {
  if (n === void 0) return (e.textContent = '');
  const s = r || document.createTextNode('');
  if (t.length) {
    let i = !1;
    for (let o = t.length - 1; o >= 0; o--) {
      const l = t[o];
      if (s !== l) {
        const a = l.parentNode === e;
        !i && !o ?
          a ?
            e.replaceChild(s, l) :
            e.insertBefore(s, n) :
          a && l.remove();
      } else i = !0;
    }
  } else e.insertBefore(s, n);
  return [s];
}
const Mt = !1;
const Ut = 'modulepreload';
const qt = function(e) {
  return '/' + e;
};
const Te = {};
const je = function(t, n, r) {
  if (!n || n.length === 0) return t();
  const s = document.getElementsByTagName('link');
  return Promise.all(
      n.map((i) => {
        if (((i = qt(i)), i in Te)) return;
        Te[i] = !0;
        const o = i.endsWith('.css');
        const l = o ? '[rel="stylesheet"]' : '';
        if (!!r) {
          for (let c = s.length - 1; c >= 0; c--) {
            const f = s[c];
            if (f.href === i && (!o || f.rel === 'stylesheet')) return;
          }
        } else if (document.querySelector(`link[href="${i}"]${l}`)) return;
        const u = document.createElement('link');
        if (
          ((u.rel = o ? 'stylesheet' : Ut),
          o || ((u.as = 'script'), (u.crossOrigin = '')),
          (u.href = i),
          document.head.appendChild(u),
          o)
        ) {
          return new Promise((c, f) => {
            u.addEventListener('load', c),
            u.addEventListener('error', () =>
              f(new Error(`Unable to preload CSS for ${i}`))
            );
          });
        }
      })
  )
      .then(() => t())
      .catch((i) => {
        const o = new Event('vite:preloadError', {cancelable: !0});
        if (((o.payload = i), window.dispatchEvent(o), !o.defaultPrevented)) {
          throw i;
        }
      });
};
function Kt(e, t, n) {
  return e.addEventListener(t, n), () => e.removeEventListener(t, n);
}
function Ft([e, t], n, r) {
  return [n ? () => n(e()) : e, r ? (s) => t(r(s)) : t];
}
function Ht(e) {
  try {
    return document.querySelector(e);
  } catch {
    return null;
  }
}
function Vt(e, t) {
  const n = Ht(`#${e}`);
  n ? n.scrollIntoView() : t && window.scrollTo(0, 0);
}
function Wt(e, t, n, r) {
  let s = !1;
  const i = (l) => (typeof l === 'string' ? {value: l} : l);
  const o = Ft(
      T(i(e()), {equals: (l, a) => l.value === a.value}),
      void 0,
      (l) => (!s && t(l), l)
  );
  return (
    n &&
      Ae(
          n((l = e()) => {
            (s = !0), o[1](i(l)), (s = !1);
          })
      ),
    {signal: o, utils: r}
  );
}
function Gt(e) {
  if (e) {
    if (Array.isArray(e)) return {signal: e};
  } else return {signal: T({value: ''})};
  return e;
}
function Xt() {
  return Wt(
      () => ({
        value:
        window.location.pathname +
        window.location.search +
        window.location.hash,
        state: history.state,
      }),
      ({value: e, replace: t, scroll: n, state: r}) => {
      t ?
        window.history.replaceState(r, '', e) :
        window.history.pushState(r, '', e),
        Vt(window.location.hash.slice(1), n);
      },
      (e) => Kt(window, 'popstate', () => e()),
      {go: (e) => window.history.go(e)}
  );
}
function Qt() {
  const e = new Set();
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
    for (const l of e) {
      l.listener({
        ...o,
        from: l.location,
        retry: (a) => {
          a && (n = !0), l.navigate(s, i);
        },
      });
    }
    return !o.defaultPrevented;
  }
  return {subscribe: t, confirm: r};
}
const zt = /^(?:[a-z0-9]+:)?\/\//i;
const Jt = /^\/+|(\/)\/+$/g;
function U(e, t = !1) {
  const n = e.replace(Jt, '$1');
  return n ? (t || /^[?#]/.test(n) ? n : '/' + n) : '';
}
function ee(e, t, n) {
  if (zt.test(t)) return;
  const r = U(e);
  const s = n && U(n);
  let i = '';
  return (
    !s || t.startsWith('/') ?
      (i = r) :
      s.toLowerCase().indexOf(r.toLowerCase()) !== 0 ?
      (i = r + s) :
      (i = s),
    (i || '/') + U(t, !i)
  );
}
function Yt(e, t) {
  if (e == null) throw new Error(t);
  return e;
}
function Ge(e, t) {
  return U(e).replace(/\/*(\*.*)?$/g, '') + U(t);
}
function Zt(e) {
  const t = {};
  return (
    e.searchParams.forEach((n, r) => {
      t[r] = n;
    }),
    t
  );
}
function en(e, t, n) {
  const [r, s] = e.split('/*', 2);
  const i = r.split('/').filter(Boolean);
  const o = i.length;
  return (l) => {
    const a = l.split('/').filter(Boolean);
    const u = a.length - o;
    if (u < 0 || (u > 0 && s === void 0 && !t)) return null;
    const c = {path: o ? '' : '/', params: {}};
    const f = (d) => (n === void 0 ? void 0 : n[d]);
    for (let d = 0; d < o; d++) {
      const m = i[d];
      const b = a[d];
      const y = m[0] === ':';
      const R = y ? m.slice(1) : m;
      if (y && ge(b, f(R))) c.params[R] = b;
      else if (y || !ge(b, m)) return null;
      c.path += `/${b}`;
    }
    if (s) {
      const d = u ? a.slice(-u).join('/') : '';
      if (ge(d, f(s))) c.params[s] = d;
      else return null;
    }
    return c;
  };
}
function ge(e, t) {
  const n = (r) => r.localeCompare(e, void 0, {sensitivity: 'base'}) === 0;
  return t === void 0 ?
    !0 :
    typeof t === 'string' ?
    n(t) :
    typeof t === 'function' ?
    t(e) :
    Array.isArray(t) ?
    t.some(n) :
    t instanceof RegExp ?
    t.test(e) :
    !1;
}
function tn(e) {
  const [t, n] = e.pattern.split('/*', 2);
  const r = t.split('/').filter(Boolean);
  return r.reduce(
      (s, i) => s + (i.startsWith(':') ? 2 : 3),
      r.length - (n === void 0 ? 0 : 1)
  );
}
function Xe(e) {
  const t = new Map();
  const n = st();
  return new Proxy(
      {},
      {
        get(r, s) {
          return (
            t.has(s) ||
            it(n, () =>
              t.set(
                  s,
                  P(() => e()[s])
              )
            ),
            t.get(s)()
          );
        },
        getOwnPropertyDescriptor() {
          return {enumerable: !0, configurable: !0};
        },
        ownKeys() {
          return Reflect.ownKeys(e());
        },
      }
  );
}
function Qe(e) {
  let t = /(\/?\:[^\/]+)\?/.exec(e);
  if (!t) return [e];
  let n = e.slice(0, t.index);
  let r = e.slice(t.index + t[0].length);
  const s = [n, (n += t[1])];
  for (; (t = /^(\/\:[^\/]+)\?/.exec(r)); ) {
    s.push((n += t[1])), (r = r.slice(t[0].length));
  }
  return Qe(r).reduce((i, o) => [...i, ...s.map((l) => l + o)], []);
}
const nn = 100;
const ze = De();
const ae = De();
const ue = () => Yt(Pe(ze), 'Make sure your app is wrapped in a <Router />');
let J;
const Se = () => J || Pe(ae) || ue().base;
const rn = (e) => {
  const t = Se();
  return P(() => t.resolvePath(e()));
};
const sn = (e) => {
  const t = ue();
  return P(() => {
    const n = e();
    return n !== void 0 ? t.renderPath(n) : n;
  });
};
const on = () => ue().location;
function ln(e, t = '', n) {
  const {component: r, data: s, children: i} = e;
  const o = !i || (Array.isArray(i) && !i.length);
  const l = {
    key: e,
    element: r ?
      () => O(r, {}) :
      () => {
        const {element: a} = e;
        return a === void 0 && n ? O(n, {}) : a;
      },
    preload: e.component ? r.preload : e.preload,
    data: s,
  };
  return Je(e.path).reduce((a, u) => {
    for (const c of Qe(u)) {
      const f = Ge(t, c);
      const d = o ? f : f.split('/*', 1)[0];
      a.push({
        ...l,
        originalPath: c,
        pattern: d,
        matcher: en(d, !o, e.matchFilters),
      });
    }
    return a;
  }, []);
}
function cn(e, t = 0) {
  return {
    routes: e,
    score: tn(e[e.length - 1]) * 1e4 - t,
    matcher(n) {
      const r = [];
      for (let s = e.length - 1; s >= 0; s--) {
        const i = e[s];
        const o = i.matcher(n);
        if (!o) return null;
        r.unshift({...o, route: i});
      }
      return r;
    },
  };
}
function Je(e) {
  return Array.isArray(e) ? e : [e];
}
function Ye(e, t = '', n, r = [], s = []) {
  const i = Je(e);
  for (let o = 0, l = i.length; o < l; o++) {
    const a = i[o];
    if (a && typeof a === 'object' && a.hasOwnProperty('path')) {
      const u = ln(a, t, n);
      for (const c of u) {
        r.push(c);
        const f = Array.isArray(a.children) && a.children.length === 0;
        if (a.children && !f) Ye(a.children, c.pattern, n, r, s);
        else {
          const d = cn([...r], s.length);
          s.push(d);
        }
        r.pop();
      }
    }
  }
  return r.length ? s : s.sort((o, l) => l.score - o.score);
}
function an(e, t) {
  for (let n = 0, r = e.length; n < r; n++) {
    const s = e[n].matcher(t);
    if (s) return s;
  }
  return [];
}
function un(e, t) {
  const n = new URL('http://sar');
  const r = P(
      (a) => {
        const u = e();
        try {
          return new URL(u, n);
        } catch {
          return console.error(`Invalid path ${u}`), a;
        }
      },
      n,
      {equals: (a, u) => a.href === u.href}
  );
  const s = P(() => r().pathname);
  const i = P(() => r().search, !0);
  const o = P(() => r().hash);
  const l = P(() => '');
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
    query: Xe(Be(i, () => Zt(r()))),
  };
}
function fn(e, t = '', n) {
  const {
    signal: [s, i],
    utils: o = {},
  } = Gt(e);
  const l = o.parsePath || ((h) => h);
  const a = o.renderPath || ((h) => h);
  const u = o.beforeLeave || Qt();
  const c = ee('', t);
  const f = void 0;
  if (c === void 0) throw new Error(`${c} is not a valid base path`);
  c && !s().value && i({value: c, replace: !0, scroll: !1});
  const [d, m] = T(!1);
  const b = async (h) => {
    m(!0);
    try {
      await ot(h);
    } finally {
      m(!1);
    }
  };
  const [y, R] = T(s().value);
  const [$, E] = T(s().state);
  const x = un(y, $);
  const v = [];
  const S = {
    pattern: c,
    params: {},
    path: () => c,
    outlet: () => null,
    resolvePath(h) {
      return ee(c, h);
    },
  };
  if (n) {
    try {
      (J = S),
      (S.data = n({data: void 0, params: {}, location: x, navigate: K(S)}));
    } finally {
      J = void 0;
    }
  }
  function q(h, g, p) {
    N(() => {
      if (typeof g === 'number') {
        g &&
          (o.go ?
            u.confirm(g, p) && o.go(g) :
            console.warn(
                'Router integration does not support relative routing'
            ));
        return;
      }
      const {
        replace: j,
        resolve: Y,
        scroll: B,
        state: G,
      } = {replace: !1, resolve: !0, scroll: !0, ...p};
      const D = Y ? h.resolvePath(g) : ee('', g);
      if (D === void 0) throw new Error(`Path '${g}' is not a routable path`);
      if (v.length >= nn) throw new Error('Too many redirects');
      const X = y();
      if ((D !== X || G !== $()) && !Mt) {
        if (u.confirm(D, p)) {
          const Ze = v.push({value: X, replace: j, scroll: B, state: $()});
          b(() => {
            R(D), E(G);
          }).then(() => {
            v.length === Ze && W({value: D, state: G});
          });
        }
      }
    });
  }
  function K(h) {
    return (h = h || Pe(ae) || S), (g, p) => q(h, g, p);
  }
  function W(h) {
    const g = v[0];
    g &&
      ((h.value !== g.value || h.state !== g.state) &&
        i({...h, replace: g.replace, scroll: g.scroll}),
      (v.length = 0));
  }
  M(() => {
    const {value: h, state: g} = s();
    N(() => {
      h !== y() &&
        b(() => {
          R(h), E(g);
        });
    });
  });
  {
    const h = function(g) {
      if (
        g.defaultPrevented ||
        g.button !== 0 ||
        g.metaKey ||
        g.altKey ||
        g.ctrlKey ||
        g.shiftKey
      ) {
        return;
      }
      const p = g
          .composedPath()
          .find((X) => X instanceof Node && X.nodeName.toUpperCase() === 'A');
      if (!p || !p.hasAttribute('link')) return;
      const j = p.href;
      if (p.target || (!j && !p.hasAttribute('state'))) return;
      const Y = (p.getAttribute('rel') || '').split(/\s+/);
      if (p.hasAttribute('download') || (Y && Y.includes('external'))) return;
      const B = new URL(j);
      if (
        B.origin !== window.location.origin ||
        (c &&
          B.pathname &&
          !B.pathname.toLowerCase().startsWith(c.toLowerCase()))
      ) {
        return;
      }
      const G = l(B.pathname + B.search + B.hash);
      const D = p.getAttribute('state');
      g.preventDefault(),
      q(S, G, {
        resolve: !1,
        replace: p.hasAttribute('replace'),
        scroll: !p.hasAttribute('noscroll'),
        state: D && JSON.parse(D),
      });
    };
    We(['click']),
    document.addEventListener('click', h),
    Ae(() => document.removeEventListener('click', h));
  }
  return {
    base: S,
    out: f,
    location: x,
    isRouting: d,
    renderPath: a,
    parsePath: l,
    navigatorFactory: K,
    beforeLeave: u,
  };
}
function dn(e, t, n, r, s) {
  const {base: i, location: o, navigatorFactory: l} = e;
  const {pattern: a, element: u, preload: c, data: f} = r().route;
  const d = P(() => r().path);
  c && c();
  const m = {
    parent: t,
    pattern: a,
    get child() {
      return n();
    },
    path: d,
    params: s,
    data: t.data,
    outlet: u,
    resolvePath(b) {
      return ee(i.path(), b, d());
    },
  };
  if (f) {
    try {
      (J = m),
      (m.data = f({data: t.data, params: s, location: o, navigate: l(m)}));
    } finally {
      J = void 0;
    }
  }
  return m;
}
const hn = Ot('<a link>');
const gn = (e) => {
  const {source: t, base: r, data: s} = e;
  const o = t || Xt();
  const l = fn(o, r, s);
  return O(ze.Provider, {
    value: l,
    get children() {
      return e.children;
    },
  });
};
const mn = (e) => {
  const t = ue();
  const n = Se();
  const r = xe(() => e.children);
  const s = P(() => Ye(r(), Ge(n.pattern, e.base || ''), yn));
  const i = P(() => an(s(), t.location.pathname));
  const o = Xe(() => {
    const c = i();
    const f = {};
    for (let d = 0; d < c.length; d++) Object.assign(f, c[d].params);
    return f;
  });
  t.out &&
    t.out.matches.push(
        i().map(({route: c, path: f, params: d}) => ({
          originalPath: c.originalPath,
          pattern: c.pattern,
          path: f,
          params: d,
        }))
    );
  const l = [];
  let a;
  const u = P(
      Be(i, (c, f, d) => {
        let m = f && c.length === f.length;
        const b = [];
        for (let y = 0, R = c.length; y < R; y++) {
          const $ = f && f[y];
          const E = c[y];
        d && $ && E.route.key === $.route.key ?
          (b[y] = d[y]) :
          ((m = !1),
          l[y] && l[y](),
          z((x) => {
            (l[y] = x),
            (b[y] = dn(
                t,
                b[y - 1] || n,
                () => u()[y + 1],
                () => i()[y],
                o
            ));
          }));
        }
        return (
          l.splice(c.length).forEach((y) => y()), d && m ? d : ((a = b[0]), b)
        );
      })
  );
  return O(Ve, {
    get when() {
      return u() && a;
    },
    keyed: !0,
    children: (c) =>
      O(ae.Provider, {
        value: c,
        get children() {
          return c.outlet();
        },
      }),
  });
};
const ke = (e) => {
  const t = xe(() => e.children);
  return pe(e, {
    get children() {
      return t();
    },
  });
};
const yn = () => {
  const e = Se();
  return O(Ve, {
    get when() {
      return e.child;
    },
    keyed: !0,
    children: (t) =>
      O(ae.Provider, {
        value: t,
        get children() {
          return t.outlet();
        },
      }),
  });
};
function An(e) {
  e = pe({inactiveClass: 'inactive', activeClass: 'active'}, e);
  const [, t] = mt(e, [
    'href',
    'state',
    'class',
    'activeClass',
    'inactiveClass',
    'end',
  ]);
  const n = rn(() => e.href);
  const r = sn(n);
  const s = on();
  const i = P(() => {
    const o = n();
    if (o === void 0) return !1;
    const l = U(o.split(/[?#]/, 1)[0]).toLowerCase();
    const a = U(s.pathname).toLowerCase();
    return e.end ? l === a : a.startsWith(l);
  });
  return (() => {
    const o = hn();
    return (
      kt(
          o,
          pe(t, {
            get 'href'() {
              return r() || e.href;
            },
            get 'state'() {
              return JSON.stringify(e.state);
            },
            get 'classList'() {
              return {
                ...(e.class && {[e.class]: !0}),
                [e.inactiveClass]: !i(),
                [e.activeClass]: i(),
                ...t.classList,
              };
            },
            get 'aria-current'() {
              return i() ? 'page' : void 0;
            },
          }),
          !1,
          !1
      ),
      o
    );
  })();
}
const pn = [
  {
    title: 'Blogをシンプルにしたよ',
    img: 'nuxt.jpeg',
    created: '2020年5月14日 公開',
    path: 'content1',
  },
  {
    title: '情報理論の謎',
    img: 'nuxt.jpeg',
    created: '2020年5月24日 公開',
    path: 'content2',
  },
  {
    title: 'Rustで標準入力して二値加算',
    img: 'rust-social-wide.jpg',
    created: '2020年10月11日 公開',
    path: 'content3',
  },
  {
    title: 'RustでFibonacci数の183番目',
    img: 'rust-social-wide.jpg',
    created: '2020年10月11日 公開',
    path: 'content4',
  },
  {
    title: 'WebP変換シェルスクリプト',
    img: 'webp.png',
    created: '2020年10月12日 公開',
    path: 'content5',
  },
  {
    title: 'Commit AuthorとCommit Email変更',
    img: 'Git.png',
    created: '2020年10月12日 公開',
    path: 'content6',
  },
  {
    title: 'React + Three.js で LightsOut を作った',
    img: 'logo-og.png',
    created: '2021年2月2日 公開',
    path: 'content7',
  },
  {
    title: '日常に潜む論理破綻の話',
    img: 'HowToLive.png',
    created: '2021年2月7日公開',
    path: 'content8',
  },
  {
    title: 'Svelte+marked でスライド作成',
    img: 'svelte.png',
    created: '2021年2月8日公開',
    path: 'content9',
  },
  {
    title: 'GraphQL APIでDBアクセスを大量に発生させる攻撃手法について',
    img: 'glaphgl.png',
    created: '2021年2月10日公開',
    path: 'content10',
  },
  {
    title: 'React+Chart.js でコロナ感染者数を表示するアプリ作成',
    img: 'logo-og.png',
    created: '2021年2月15日公開',
    path: 'content11',
  },
  {
    title: 'GraphQL APIで悪意あるクエリの対策手段',
    img: 'glaphgl.png',
    created: '2021年2月16日公開',
    path: 'content12',
  },
  {
    title: 'Huffman codeをTypeScriptで実装する',
    img: 'huffman.png',
    created: '2021年3月17日公開',
    path: 'content13',
  },
  {
    title: '数学オリンピックの問題をRustで解く',
    img: 'rust-social-wide.jpg',
    created: '2021年3月23日公開',
    path: 'content14',
  },
  {
    title: 'Svelte で TODO アプリを作った',
    img: 'svelte.png',
    created: '2021年3月29日公開',
    path: 'content15',
  },
];
const wn = 450;
const bn = () => {
  const e = Le(() => je(() => import('./home-c8e662e0.js'), []));
  const [t, n] = T(!1);
  return (
    nt(() => {
      const r = window.innerWidth;
      const s = wn > r;
      n(s);
    }),
    O(gn, {
      get children() {
        return O(mn, {
          get children() {
            return [
              O(ke, {
                path: '/',
                get element() {
                  return O(e, {isSP: t});
                },
              }),
              O(pt, {
                each: pn,
                children: (r) => {
                  const s = Le(() =>
                    je(() => import(`./pages/articles/${r.path}`), [])
                  );
                  return O(ke, {
                    get path() {
                      return `/articles/${r.path}`;
                    },
                    get element() {
                      return O(s, {isSP: t});
                    },
                  });
                },
              }),
            ];
          },
        });
      },
    })
  );
};
Lt(() => O(bn, {}), document.getElementById('root'));
export {
  An as A,
  pt as F,
  O as a,
  M as b,
  Nt as c,
  pn as d,
  It as i,
  we as s,
  Ot as t,
};
