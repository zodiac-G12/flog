import {
  c as W,
  i as ae,
  a as he,
  t as be,
  s as ke,
  b as Dn,
  d as pt,
  A as ct,
} from "./index-9a6a4a70.js";
let ht = { data: "" },
  ft = (e) =>
    typeof window == "object"
      ? (
          (e ? e.querySelector("#_goober") : window._goober) ||
          Object.assign(
            (e || document.head).appendChild(document.createElement("style")),
            { innerHTML: " ", id: "_goober" }
          )
        ).firstChild
      : e || ht,
  gt = /(?:([\u0080-\uFFFF\w-%@]+) *:? *([^{;]+?);|([^;}{]*?) *{)|(}\s*)/g,
  dt = /\/\*[^]*?\*\/|  +/g,
  an = /\n+/g,
  oe = (e, n) => {
    let t = "",
      r = "",
      i = "";
    for (let a in e) {
      let l = e[a];
      a[0] == "@"
        ? a[1] == "i"
          ? (t = a + " " + l + ";")
          : (r +=
              a[1] == "f"
                ? oe(l, a)
                : a + "{" + oe(l, a[1] == "k" ? "" : n) + "}")
        : typeof l == "object"
        ? (r += oe(
            l,
            n
              ? n.replace(/([^,])+/g, (o) =>
                  a.replace(/(^:.*)|([^,])+/g, (s) =>
                    /&/.test(s) ? s.replace(/&/g, o) : o ? o + " " + s : s
                  )
                )
              : a
          ))
        : l != null &&
          ((a = /^--/.test(a) ? a : a.replace(/[A-Z]/g, "-$&").toLowerCase()),
          (i += oe.p ? oe.p(a, l) : a + ":" + l + ";"));
    }
    return t + (n && i ? n + "{" + i + "}" : i) + r;
  },
  ge = {},
  Tn = (e) => {
    if (typeof e == "object") {
      let n = "";
      for (let t in e) n += t + Tn(e[t]);
      return n;
    }
    return e;
  },
  mt = (e, n, t, r, i) => {
    let a = Tn(e),
      l =
        ge[a] ||
        (ge[a] = ((o) => {
          let s = 0,
            u = 11;
          for (; s < o.length; ) u = (101 * u + o.charCodeAt(s++)) >>> 0;
          return "go" + u;
        })(a));
    if (!ge[l]) {
      let o =
        a !== e
          ? e
          : ((s) => {
              let u,
                p,
                g = [{}];
              for (; (u = gt.exec(s.replace(dt, ""))); )
                u[4]
                  ? g.shift()
                  : u[3]
                  ? ((p = u[3].replace(an, " ").trim()),
                    g.unshift((g[0][p] = g[0][p] || {})))
                  : (g[0][u[1]] = u[2].replace(an, " ").trim());
              return g[0];
            })(e);
      ge[l] = oe(i ? { ["@keyframes " + l]: o } : o, t ? "" : "." + l);
    }
    return (
      ((o, s, u) => {
        s.data.indexOf(o) == -1 && (s.data = u ? o + s.data : s.data + o);
      })(ge[l], n, r),
      l
    );
  },
  xt = (e, n, t) =>
    e.reduce((r, i, a) => {
      let l = n[a];
      if (l && l.call) {
        let o = l(t),
          s = (o && o.props && o.props.className) || (/^go/.test(o) && o);
        l = s
          ? "." + s
          : o && typeof o == "object"
          ? o.props
            ? ""
            : oe(o, "")
          : o === !1
          ? ""
          : o;
      }
      return r + i + (l ?? "");
    }, "");
function V(e) {
  let n = this || {},
    t = e.call ? e(n.p) : e;
  return mt(
    t.unshift
      ? t.raw
        ? xt(t, [].slice.call(arguments, 1), n.p)
        : t.reduce((r, i) => Object.assign(r, i && i.call ? i(n.p) : i), {})
      : t,
    ft(n.target),
    n.g,
    n.o,
    n.k
  );
}
V.bind({ g: 1 });
V.bind({ k: 1 });
const yt = {
  type: "logger",
  log(e) {
    this.output("log", e);
  },
  warn(e) {
    this.output("warn", e);
  },
  error(e) {
    this.output("error", e);
  },
  output(e, n) {
    console && console[e] && console[e].apply(console, n);
  },
};
class Oe {
  constructor(n) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    this.init(n, t);
  }
  init(n) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.prefix = t.prefix || "i18next:"),
      (this.logger = n || yt),
      (this.options = t),
      (this.debug = t.debug);
  }
  log() {
    for (var n = arguments.length, t = new Array(n), r = 0; r < n; r++)
      t[r] = arguments[r];
    return this.forward(t, "log", "", !0);
  }
  warn() {
    for (var n = arguments.length, t = new Array(n), r = 0; r < n; r++)
      t[r] = arguments[r];
    return this.forward(t, "warn", "", !0);
  }
  error() {
    for (var n = arguments.length, t = new Array(n), r = 0; r < n; r++)
      t[r] = arguments[r];
    return this.forward(t, "error", "");
  }
  deprecate() {
    for (var n = arguments.length, t = new Array(n), r = 0; r < n; r++)
      t[r] = arguments[r];
    return this.forward(t, "warn", "WARNING DEPRECATED: ", !0);
  }
  forward(n, t, r, i) {
    return i && !this.debug
      ? null
      : (typeof n[0] == "string" && (n[0] = `${r}${this.prefix} ${n[0]}`),
        this.logger[t](n));
  }
  create(n) {
    return new Oe(this.logger, {
      prefix: `${this.prefix}:${n}:`,
      ...this.options,
    });
  }
  clone(n) {
    return (
      (n = n || this.options),
      (n.prefix = n.prefix || this.prefix),
      new Oe(this.logger, n)
    );
  }
}
var ie = new Oe();
class Ie {
  constructor() {
    this.observers = {};
  }
  on(n, t) {
    return (
      n.split(" ").forEach((r) => {
        (this.observers[r] = this.observers[r] || []),
          this.observers[r].push(t);
      }),
      this
    );
  }
  off(n, t) {
    if (this.observers[n]) {
      if (!t) {
        delete this.observers[n];
        return;
      }
      this.observers[n] = this.observers[n].filter((r) => r !== t);
    }
  }
  emit(n) {
    for (
      var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), i = 1;
      i < t;
      i++
    )
      r[i - 1] = arguments[i];
    this.observers[n] &&
      [].concat(this.observers[n]).forEach((l) => {
        l(...r);
      }),
      this.observers["*"] &&
        [].concat(this.observers["*"]).forEach((l) => {
          l.apply(l, [n, ...r]);
        });
  }
}
function de() {
  let e, n;
  const t = new Promise((r, i) => {
    (e = r), (n = i);
  });
  return (t.resolve = e), (t.reject = n), t;
}
function ln(e) {
  return e == null ? "" : "" + e;
}
function bt(e, n, t) {
  e.forEach((r) => {
    n[r] && (t[r] = n[r]);
  });
}
function Ze(e, n, t) {
  function r(l) {
    return l && l.indexOf("###") > -1 ? l.replace(/###/g, ".") : l;
  }
  function i() {
    return !e || typeof e == "string";
  }
  const a = typeof n != "string" ? [].concat(n) : n.split(".");
  for (; a.length > 1; ) {
    if (i()) return {};
    const l = r(a.shift());
    !e[l] && t && (e[l] = new t()),
      Object.prototype.hasOwnProperty.call(e, l) ? (e = e[l]) : (e = {});
  }
  return i() ? {} : { obj: e, k: r(a.shift()) };
}
function on(e, n, t) {
  const { obj: r, k: i } = Ze(e, n, Object);
  r[i] = t;
}
function St(e, n, t, r) {
  const { obj: i, k: a } = Ze(e, n, Object);
  (i[a] = i[a] || []), r && (i[a] = i[a].concat(t)), r || i[a].push(t);
}
function Ee(e, n) {
  const { obj: t, k: r } = Ze(e, n);
  if (t) return t[r];
}
function vt(e, n, t) {
  const r = Ee(e, t);
  return r !== void 0 ? r : Ee(n, t);
}
function zn(e, n, t) {
  for (const r in n)
    r !== "__proto__" &&
      r !== "constructor" &&
      (r in e
        ? typeof e[r] == "string" ||
          e[r] instanceof String ||
          typeof n[r] == "string" ||
          n[r] instanceof String
          ? t && (e[r] = n[r])
          : zn(e[r], n[r], t)
        : (e[r] = n[r]));
  return e;
}
function ue(e) {
  return e.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var wt = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#x2F;",
};
function kt(e) {
  return typeof e == "string" ? e.replace(/[&<>"'\/]/g, (n) => wt[n]) : e;
}
const Ct = [" ", ",", "?", "!", ";"];
function Lt(e, n, t) {
  (n = n || ""), (t = t || "");
  const r = Ct.filter((l) => n.indexOf(l) < 0 && t.indexOf(l) < 0);
  if (r.length === 0) return !0;
  const i = new RegExp(`(${r.map((l) => (l === "?" ? "\\?" : l)).join("|")})`);
  let a = !i.test(e);
  if (!a) {
    const l = e.indexOf(t);
    l > 0 && !i.test(e.substring(0, l)) && (a = !0);
  }
  return a;
}
function Pe(e, n) {
  let t = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : ".";
  if (!e) return;
  if (e[n]) return e[n];
  const r = n.split(t);
  let i = e;
  for (let a = 0; a < r.length; ++a) {
    if (!i || (typeof i[r[a]] == "string" && a + 1 < r.length)) return;
    if (i[r[a]] === void 0) {
      let l = 2,
        o = r.slice(a, a + l).join(t),
        s = i[o];
      for (; s === void 0 && r.length > a + l; )
        l++, (o = r.slice(a, a + l).join(t)), (s = i[o]);
      if (s === void 0) return;
      if (s === null) return null;
      if (n.endsWith(o)) {
        if (typeof s == "string") return s;
        if (o && typeof s[o] == "string") return s[o];
      }
      const u = r.slice(a + l).join(t);
      return u ? Pe(s, u, t) : void 0;
    }
    i = i[r[a]];
  }
  return i;
}
function Ae(e) {
  return e && e.indexOf("_") > 0 ? e.replace("_", "-") : e;
}
class sn extends Ie {
  constructor(n) {
    let t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { ns: ["translation"], defaultNS: "translation" };
    super(),
      (this.data = n || {}),
      (this.options = t),
      this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
      this.options.ignoreJSONStructure === void 0 &&
        (this.options.ignoreJSONStructure = !0);
  }
  addNamespaces(n) {
    this.options.ns.indexOf(n) < 0 && this.options.ns.push(n);
  }
  removeNamespaces(n) {
    const t = this.options.ns.indexOf(n);
    t > -1 && this.options.ns.splice(t, 1);
  }
  getResource(n, t, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    const a =
        i.keySeparator !== void 0 ? i.keySeparator : this.options.keySeparator,
      l =
        i.ignoreJSONStructure !== void 0
          ? i.ignoreJSONStructure
          : this.options.ignoreJSONStructure;
    let o = [n, t];
    r && typeof r != "string" && (o = o.concat(r)),
      r && typeof r == "string" && (o = o.concat(a ? r.split(a) : r)),
      n.indexOf(".") > -1 && (o = n.split("."));
    const s = Ee(this.data, o);
    return s || !l || typeof r != "string"
      ? s
      : Pe(this.data && this.data[n] && this.data[n][t], r, a);
  }
  addResource(n, t, r, i) {
    let a =
      arguments.length > 4 && arguments[4] !== void 0
        ? arguments[4]
        : { silent: !1 };
    const l =
      a.keySeparator !== void 0 ? a.keySeparator : this.options.keySeparator;
    let o = [n, t];
    r && (o = o.concat(l ? r.split(l) : r)),
      n.indexOf(".") > -1 && ((o = n.split(".")), (i = t), (t = o[1])),
      this.addNamespaces(t),
      on(this.data, o, i),
      a.silent || this.emit("added", n, t, r, i);
  }
  addResources(n, t, r) {
    let i =
      arguments.length > 3 && arguments[3] !== void 0
        ? arguments[3]
        : { silent: !1 };
    for (const a in r)
      (typeof r[a] == "string" ||
        Object.prototype.toString.apply(r[a]) === "[object Array]") &&
        this.addResource(n, t, a, r[a], { silent: !0 });
    i.silent || this.emit("added", n, t, r);
  }
  addResourceBundle(n, t, r, i, a) {
    let l =
        arguments.length > 5 && arguments[5] !== void 0
          ? arguments[5]
          : { silent: !1 },
      o = [n, t];
    n.indexOf(".") > -1 && ((o = n.split(".")), (i = r), (r = t), (t = o[1])),
      this.addNamespaces(t);
    let s = Ee(this.data, o) || {};
    i ? zn(s, r, a) : (s = { ...s, ...r }),
      on(this.data, o, s),
      l.silent || this.emit("added", n, t, r);
  }
  removeResourceBundle(n, t) {
    this.hasResourceBundle(n, t) && delete this.data[n][t],
      this.removeNamespaces(t),
      this.emit("removed", n, t);
  }
  hasResourceBundle(n, t) {
    return this.getResource(n, t) !== void 0;
  }
  getResourceBundle(n, t) {
    return (
      t || (t = this.options.defaultNS),
      this.options.compatibilityAPI === "v1"
        ? { ...this.getResource(n, t) }
        : this.getResource(n, t)
    );
  }
  getDataByLanguage(n) {
    return this.data[n];
  }
  hasLanguageSomeTranslations(n) {
    const t = this.getDataByLanguage(n);
    return !!((t && Object.keys(t)) || []).find(
      (i) => t[i] && Object.keys(t[i]).length > 0
    );
  }
  toJSON() {
    return this.data;
  }
}
var Nn = {
  processors: {},
  addPostProcessor(e) {
    this.processors[e.name] = e;
  },
  handle(e, n, t, r, i) {
    return (
      e.forEach((a) => {
        this.processors[a] && (n = this.processors[a].process(n, t, r, i));
      }),
      n
    );
  },
};
const un = {};
class Fe extends Ie {
  constructor(n) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    super(),
      bt(
        [
          "resourceStore",
          "languageUtils",
          "pluralResolver",
          "interpolator",
          "backendConnector",
          "i18nFormat",
          "utils",
        ],
        n,
        this
      ),
      (this.options = t),
      this.options.keySeparator === void 0 && (this.options.keySeparator = "."),
      (this.logger = ie.create("translator"));
  }
  changeLanguage(n) {
    n && (this.language = n);
  }
  exists(n) {
    let t =
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { interpolation: {} };
    if (n == null) return !1;
    const r = this.resolve(n, t);
    return r && r.res !== void 0;
  }
  extractFromKey(n, t) {
    let r = t.nsSeparator !== void 0 ? t.nsSeparator : this.options.nsSeparator;
    r === void 0 && (r = ":");
    const i =
      t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator;
    let a = t.ns || this.options.defaultNS || [];
    const l = r && n.indexOf(r) > -1,
      o =
        !this.options.userDefinedKeySeparator &&
        !t.keySeparator &&
        !this.options.userDefinedNsSeparator &&
        !t.nsSeparator &&
        !Lt(n, r, i);
    if (l && !o) {
      const s = n.match(this.interpolator.nestingRegexp);
      if (s && s.length > 0) return { key: n, namespaces: a };
      const u = n.split(r);
      (r !== i || (r === i && this.options.ns.indexOf(u[0]) > -1)) &&
        (a = u.shift()),
        (n = u.join(i));
    }
    return typeof a == "string" && (a = [a]), { key: n, namespaces: a };
  }
  translate(n, t, r) {
    if (
      (typeof t != "object" &&
        this.options.overloadTranslationOptionHandler &&
        (t = this.options.overloadTranslationOptionHandler(arguments)),
      typeof t == "object" && (t = { ...t }),
      t || (t = {}),
      n == null)
    )
      return "";
    Array.isArray(n) || (n = [String(n)]);
    const i =
        t.returnDetails !== void 0
          ? t.returnDetails
          : this.options.returnDetails,
      a =
        t.keySeparator !== void 0 ? t.keySeparator : this.options.keySeparator,
      { key: l, namespaces: o } = this.extractFromKey(n[n.length - 1], t),
      s = o[o.length - 1],
      u = t.lng || this.language,
      p = t.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
    if (u && u.toLowerCase() === "cimode") {
      if (p) {
        const k = t.nsSeparator || this.options.nsSeparator;
        return i
          ? {
              res: `${s}${k}${l}`,
              usedKey: l,
              exactUsedKey: l,
              usedLng: u,
              usedNS: s,
            }
          : `${s}${k}${l}`;
      }
      return i
        ? { res: l, usedKey: l, exactUsedKey: l, usedLng: u, usedNS: s }
        : l;
    }
    const g = this.resolve(n, t);
    let f = g && g.res;
    const x = (g && g.usedKey) || l,
      m = (g && g.exactUsedKey) || l,
      S = Object.prototype.toString.apply(f),
      v = ["[object Number]", "[object Function]", "[object RegExp]"],
      d = t.joinArrays !== void 0 ? t.joinArrays : this.options.joinArrays,
      w = !this.i18nFormat || this.i18nFormat.handleAsObject;
    if (
      w &&
      f &&
      typeof f != "string" &&
      typeof f != "boolean" &&
      typeof f != "number" &&
      v.indexOf(S) < 0 &&
      !(typeof d == "string" && S === "[object Array]")
    ) {
      if (!t.returnObjects && !this.options.returnObjects) {
        this.options.returnedObjectHandler ||
          this.logger.warn(
            "accessing an object - but returnObjects options is not enabled!"
          );
        const k = this.options.returnedObjectHandler
          ? this.options.returnedObjectHandler(x, f, { ...t, ns: o })
          : `key '${l} (${this.language})' returned an object instead of string.`;
        return i ? ((g.res = k), g) : k;
      }
      if (a) {
        const k = S === "[object Array]",
          A = k ? [] : {},
          y = k ? m : x;
        for (const C in f)
          if (Object.prototype.hasOwnProperty.call(f, C)) {
            const R = `${y}${a}${C}`;
            (A[C] = this.translate(R, { ...t, joinArrays: !1, ns: o })),
              A[C] === R && (A[C] = f[C]);
          }
        f = A;
      }
    } else if (w && typeof d == "string" && S === "[object Array]")
      (f = f.join(d)), f && (f = this.extendTranslation(f, n, t, r));
    else {
      let k = !1,
        A = !1;
      const y = t.count !== void 0 && typeof t.count != "string",
        C = Fe.hasDefaultValue(t),
        R = y ? this.pluralResolver.getSuffix(u, t.count, t) : "",
        I =
          t.ordinal && y
            ? this.pluralResolver.getSuffix(u, t.count, { ordinal: !1 })
            : "",
        _ = t[`defaultValue${R}`] || t[`defaultValue${I}`] || t.defaultValue;
      !this.isValidLookup(f) && C && ((k = !0), (f = _)),
        this.isValidLookup(f) || ((A = !0), (f = l));
      const U =
          (t.missingKeyNoValueFallbackToKey ||
            this.options.missingKeyNoValueFallbackToKey) &&
          A
            ? void 0
            : f,
        z = C && _ !== f && this.options.updateMissing;
      if (A || k || z) {
        if (
          (this.logger.log(z ? "updateKey" : "missingKey", u, s, l, z ? _ : f),
          a)
        ) {
          const D = this.resolve(l, { ...t, keySeparator: !1 });
          D &&
            D.res &&
            this.logger.warn(
              "Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format."
            );
        }
        let J = [];
        const P = this.languageUtils.getFallbackCodes(
          this.options.fallbackLng,
          t.lng || this.language
        );
        if (this.options.saveMissingTo === "fallback" && P && P[0])
          for (let D = 0; D < P.length; D++) J.push(P[D]);
        else
          this.options.saveMissingTo === "all"
            ? (J = this.languageUtils.toResolveHierarchy(
                t.lng || this.language
              ))
            : J.push(t.lng || this.language);
        const L = (D, j, Q) => {
          const K = C && Q !== f ? Q : U;
          this.options.missingKeyHandler
            ? this.options.missingKeyHandler(D, s, j, K, z, t)
            : this.backendConnector &&
              this.backendConnector.saveMissing &&
              this.backendConnector.saveMissing(D, s, j, K, z, t),
            this.emit("missingKey", D, s, j, f);
        };
        this.options.saveMissing &&
          (this.options.saveMissingPlurals && y
            ? J.forEach((D) => {
                this.pluralResolver.getSuffixes(D, t).forEach((j) => {
                  L([D], l + j, t[`defaultValue${j}`] || _);
                });
              })
            : L(J, l, _));
      }
      (f = this.extendTranslation(f, n, t, g, r)),
        A &&
          f === l &&
          this.options.appendNamespaceToMissingKey &&
          (f = `${s}:${l}`),
        (A || k) &&
          this.options.parseMissingKeyHandler &&
          (this.options.compatibilityAPI !== "v1"
            ? (f = this.options.parseMissingKeyHandler(
                this.options.appendNamespaceToMissingKey ? `${s}:${l}` : l,
                k ? f : void 0
              ))
            : (f = this.options.parseMissingKeyHandler(f)));
    }
    return i ? ((g.res = f), g) : f;
  }
  extendTranslation(n, t, r, i, a) {
    var l = this;
    if (this.i18nFormat && this.i18nFormat.parse)
      n = this.i18nFormat.parse(
        n,
        { ...this.options.interpolation.defaultVariables, ...r },
        i.usedLng,
        i.usedNS,
        i.usedKey,
        { resolved: i }
      );
    else if (!r.skipInterpolation) {
      r.interpolation &&
        this.interpolator.init({
          ...r,
          interpolation: { ...this.options.interpolation, ...r.interpolation },
        });
      const u =
        typeof n == "string" &&
        (r && r.interpolation && r.interpolation.skipOnVariables !== void 0
          ? r.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables);
      let p;
      if (u) {
        const f = n.match(this.interpolator.nestingRegexp);
        p = f && f.length;
      }
      let g = r.replace && typeof r.replace != "string" ? r.replace : r;
      if (
        (this.options.interpolation.defaultVariables &&
          (g = { ...this.options.interpolation.defaultVariables, ...g }),
        (n = this.interpolator.interpolate(n, g, r.lng || this.language, r)),
        u)
      ) {
        const f = n.match(this.interpolator.nestingRegexp),
          x = f && f.length;
        p < x && (r.nest = !1);
      }
      !r.lng &&
        this.options.compatibilityAPI !== "v1" &&
        i &&
        i.res &&
        (r.lng = i.usedLng),
        r.nest !== !1 &&
          (n = this.interpolator.nest(
            n,
            function () {
              for (
                var f = arguments.length, x = new Array(f), m = 0;
                m < f;
                m++
              )
                x[m] = arguments[m];
              return a && a[0] === x[0] && !r.context
                ? (l.logger.warn(
                    `It seems you are nesting recursively key: ${x[0]} in key: ${t[0]}`
                  ),
                  null)
                : l.translate(...x, t);
            },
            r
          )),
        r.interpolation && this.interpolator.reset();
    }
    const o = r.postProcess || this.options.postProcess,
      s = typeof o == "string" ? [o] : o;
    return (
      n != null &&
        s &&
        s.length &&
        r.applyPostProcessor !== !1 &&
        (n = Nn.handle(
          s,
          n,
          t,
          this.options && this.options.postProcessPassResolved
            ? { i18nResolved: i, ...r }
            : r,
          this
        )),
      n
    );
  }
  resolve(n) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {},
      r,
      i,
      a,
      l,
      o;
    return (
      typeof n == "string" && (n = [n]),
      n.forEach((s) => {
        if (this.isValidLookup(r)) return;
        const u = this.extractFromKey(s, t),
          p = u.key;
        i = p;
        let g = u.namespaces;
        this.options.fallbackNS && (g = g.concat(this.options.fallbackNS));
        const f = t.count !== void 0 && typeof t.count != "string",
          x =
            f &&
            !t.ordinal &&
            t.count === 0 &&
            this.pluralResolver.shouldUseIntlApi(),
          m =
            t.context !== void 0 &&
            (typeof t.context == "string" || typeof t.context == "number") &&
            t.context !== "",
          S = t.lngs
            ? t.lngs
            : this.languageUtils.toResolveHierarchy(
                t.lng || this.language,
                t.fallbackLng
              );
        g.forEach((v) => {
          this.isValidLookup(r) ||
            ((o = v),
            !un[`${S[0]}-${v}`] &&
              this.utils &&
              this.utils.hasLoadedNamespace &&
              !this.utils.hasLoadedNamespace(o) &&
              ((un[`${S[0]}-${v}`] = !0),
              this.logger.warn(
                `key "${i}" for languages "${S.join(
                  ", "
                )}" won't get resolved as namespace "${o}" was not yet loaded`,
                "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
              )),
            S.forEach((d) => {
              if (this.isValidLookup(r)) return;
              l = d;
              const w = [p];
              if (this.i18nFormat && this.i18nFormat.addLookupKeys)
                this.i18nFormat.addLookupKeys(w, p, d, v, t);
              else {
                let k;
                f && (k = this.pluralResolver.getSuffix(d, t.count, t));
                const A = `${this.options.pluralSeparator}zero`,
                  y = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
                if (
                  (f &&
                    (w.push(p + k),
                    t.ordinal &&
                      k.indexOf(y) === 0 &&
                      w.push(p + k.replace(y, this.options.pluralSeparator)),
                    x && w.push(p + A)),
                  m)
                ) {
                  const C = `${p}${this.options.contextSeparator}${t.context}`;
                  w.push(C),
                    f &&
                      (w.push(C + k),
                      t.ordinal &&
                        k.indexOf(y) === 0 &&
                        w.push(C + k.replace(y, this.options.pluralSeparator)),
                      x && w.push(C + A));
                }
              }
              let F;
              for (; (F = w.pop()); )
                this.isValidLookup(r) ||
                  ((a = F), (r = this.getResource(d, v, F, t)));
            }));
        });
      }),
      { res: r, usedKey: i, exactUsedKey: a, usedLng: l, usedNS: o }
    );
  }
  isValidLookup(n) {
    return (
      n !== void 0 &&
      !(!this.options.returnNull && n === null) &&
      !(!this.options.returnEmptyString && n === "")
    );
  }
  getResource(n, t, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return this.i18nFormat && this.i18nFormat.getResource
      ? this.i18nFormat.getResource(n, t, r, i)
      : this.resourceStore.getResource(n, t, r, i);
  }
  static hasDefaultValue(n) {
    const t = "defaultValue";
    for (const r in n)
      if (
        Object.prototype.hasOwnProperty.call(n, r) &&
        t === r.substring(0, t.length) &&
        n[r] !== void 0
      )
        return !0;
    return !1;
  }
}
function Ne(e) {
  return e.charAt(0).toUpperCase() + e.slice(1);
}
class pn {
  constructor(n) {
    (this.options = n),
      (this.supportedLngs = this.options.supportedLngs || !1),
      (this.logger = ie.create("languageUtils"));
  }
  getScriptPartFromCode(n) {
    if (((n = Ae(n)), !n || n.indexOf("-") < 0)) return null;
    const t = n.split("-");
    return t.length === 2 || (t.pop(), t[t.length - 1].toLowerCase() === "x")
      ? null
      : this.formatLanguageCode(t.join("-"));
  }
  getLanguagePartFromCode(n) {
    if (((n = Ae(n)), !n || n.indexOf("-") < 0)) return n;
    const t = n.split("-");
    return this.formatLanguageCode(t[0]);
  }
  formatLanguageCode(n) {
    if (typeof n == "string" && n.indexOf("-") > -1) {
      const t = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
      let r = n.split("-");
      return (
        this.options.lowerCaseLng
          ? (r = r.map((i) => i.toLowerCase()))
          : r.length === 2
          ? ((r[0] = r[0].toLowerCase()),
            (r[1] = r[1].toUpperCase()),
            t.indexOf(r[1].toLowerCase()) > -1 &&
              (r[1] = Ne(r[1].toLowerCase())))
          : r.length === 3 &&
            ((r[0] = r[0].toLowerCase()),
            r[1].length === 2 && (r[1] = r[1].toUpperCase()),
            r[0] !== "sgn" && r[2].length === 2 && (r[2] = r[2].toUpperCase()),
            t.indexOf(r[1].toLowerCase()) > -1 &&
              (r[1] = Ne(r[1].toLowerCase())),
            t.indexOf(r[2].toLowerCase()) > -1 &&
              (r[2] = Ne(r[2].toLowerCase()))),
        r.join("-")
      );
    }
    return this.options.cleanCode || this.options.lowerCaseLng
      ? n.toLowerCase()
      : n;
  }
  isSupportedCode(n) {
    return (
      (this.options.load === "languageOnly" ||
        this.options.nonExplicitSupportedLngs) &&
        (n = this.getLanguagePartFromCode(n)),
      !this.supportedLngs ||
        !this.supportedLngs.length ||
        this.supportedLngs.indexOf(n) > -1
    );
  }
  getBestMatchFromCodes(n) {
    if (!n) return null;
    let t;
    return (
      n.forEach((r) => {
        if (t) return;
        const i = this.formatLanguageCode(r);
        (!this.options.supportedLngs || this.isSupportedCode(i)) && (t = i);
      }),
      !t &&
        this.options.supportedLngs &&
        n.forEach((r) => {
          if (t) return;
          const i = this.getLanguagePartFromCode(r);
          if (this.isSupportedCode(i)) return (t = i);
          t = this.options.supportedLngs.find((a) => {
            if (a === i) return a;
            if (
              !(a.indexOf("-") < 0 && i.indexOf("-") < 0) &&
              a.indexOf(i) === 0
            )
              return a;
          });
        }),
      t || (t = this.getFallbackCodes(this.options.fallbackLng)[0]),
      t
    );
  }
  getFallbackCodes(n, t) {
    if (!n) return [];
    if (
      (typeof n == "function" && (n = n(t)),
      typeof n == "string" && (n = [n]),
      Object.prototype.toString.apply(n) === "[object Array]")
    )
      return n;
    if (!t) return n.default || [];
    let r = n[t];
    return (
      r || (r = n[this.getScriptPartFromCode(t)]),
      r || (r = n[this.formatLanguageCode(t)]),
      r || (r = n[this.getLanguagePartFromCode(t)]),
      r || (r = n.default),
      r || []
    );
  }
  toResolveHierarchy(n, t) {
    const r = this.getFallbackCodes(t || this.options.fallbackLng || [], n),
      i = [],
      a = (l) => {
        l &&
          (this.isSupportedCode(l)
            ? i.push(l)
            : this.logger.warn(
                `rejecting language code not found in supportedLngs: ${l}`
              ));
      };
    return (
      typeof n == "string" && (n.indexOf("-") > -1 || n.indexOf("_") > -1)
        ? (this.options.load !== "languageOnly" &&
            a(this.formatLanguageCode(n)),
          this.options.load !== "languageOnly" &&
            this.options.load !== "currentOnly" &&
            a(this.getScriptPartFromCode(n)),
          this.options.load !== "currentOnly" &&
            a(this.getLanguagePartFromCode(n)))
        : typeof n == "string" && a(this.formatLanguageCode(n)),
      r.forEach((l) => {
        i.indexOf(l) < 0 && a(this.formatLanguageCode(l));
      }),
      i
    );
  }
}
let Ot = [
    {
      lngs: [
        "ach",
        "ak",
        "am",
        "arn",
        "br",
        "fil",
        "gun",
        "ln",
        "mfe",
        "mg",
        "mi",
        "oc",
        "pt",
        "pt-BR",
        "tg",
        "tl",
        "ti",
        "tr",
        "uz",
        "wa",
      ],
      nr: [1, 2],
      fc: 1,
    },
    {
      lngs: [
        "af",
        "an",
        "ast",
        "az",
        "bg",
        "bn",
        "ca",
        "da",
        "de",
        "dev",
        "el",
        "en",
        "eo",
        "es",
        "et",
        "eu",
        "fi",
        "fo",
        "fur",
        "fy",
        "gl",
        "gu",
        "ha",
        "hi",
        "hu",
        "hy",
        "ia",
        "it",
        "kk",
        "kn",
        "ku",
        "lb",
        "mai",
        "ml",
        "mn",
        "mr",
        "nah",
        "nap",
        "nb",
        "ne",
        "nl",
        "nn",
        "no",
        "nso",
        "pa",
        "pap",
        "pms",
        "ps",
        "pt-PT",
        "rm",
        "sco",
        "se",
        "si",
        "so",
        "son",
        "sq",
        "sv",
        "sw",
        "ta",
        "te",
        "tk",
        "ur",
        "yo",
      ],
      nr: [1, 2],
      fc: 2,
    },
    {
      lngs: [
        "ay",
        "bo",
        "cgg",
        "fa",
        "ht",
        "id",
        "ja",
        "jbo",
        "ka",
        "km",
        "ko",
        "ky",
        "lo",
        "ms",
        "sah",
        "su",
        "th",
        "tt",
        "ug",
        "vi",
        "wo",
        "zh",
      ],
      nr: [1],
      fc: 3,
    },
    {
      lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
      nr: [1, 2, 5],
      fc: 4,
    },
    { lngs: ["ar"], nr: [0, 1, 2, 3, 11, 100], fc: 5 },
    { lngs: ["cs", "sk"], nr: [1, 2, 5], fc: 6 },
    { lngs: ["csb", "pl"], nr: [1, 2, 5], fc: 7 },
    { lngs: ["cy"], nr: [1, 2, 3, 8], fc: 8 },
    { lngs: ["fr"], nr: [1, 2], fc: 9 },
    { lngs: ["ga"], nr: [1, 2, 3, 7, 11], fc: 10 },
    { lngs: ["gd"], nr: [1, 2, 3, 20], fc: 11 },
    { lngs: ["is"], nr: [1, 2], fc: 12 },
    { lngs: ["jv"], nr: [0, 1], fc: 13 },
    { lngs: ["kw"], nr: [1, 2, 3, 4], fc: 14 },
    { lngs: ["lt"], nr: [1, 2, 10], fc: 15 },
    { lngs: ["lv"], nr: [1, 2, 0], fc: 16 },
    { lngs: ["mk"], nr: [1, 2], fc: 17 },
    { lngs: ["mnk"], nr: [0, 1, 2], fc: 18 },
    { lngs: ["mt"], nr: [1, 2, 11, 20], fc: 19 },
    { lngs: ["or"], nr: [2, 1], fc: 2 },
    { lngs: ["ro"], nr: [1, 2, 20], fc: 20 },
    { lngs: ["sl"], nr: [5, 1, 2, 3], fc: 21 },
    { lngs: ["he", "iw"], nr: [1, 2, 20, 21], fc: 22 },
  ],
  Et = {
    1: function (e) {
      return +(e > 1);
    },
    2: function (e) {
      return +(e != 1);
    },
    3: function (e) {
      return 0;
    },
    4: function (e) {
      return e % 10 == 1 && e % 100 != 11
        ? 0
        : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
        ? 1
        : 2;
    },
    5: function (e) {
      return e == 0
        ? 0
        : e == 1
        ? 1
        : e == 2
        ? 2
        : e % 100 >= 3 && e % 100 <= 10
        ? 3
        : e % 100 >= 11
        ? 4
        : 5;
    },
    6: function (e) {
      return e == 1 ? 0 : e >= 2 && e <= 4 ? 1 : 2;
    },
    7: function (e) {
      return e == 1
        ? 0
        : e % 10 >= 2 && e % 10 <= 4 && (e % 100 < 10 || e % 100 >= 20)
        ? 1
        : 2;
    },
    8: function (e) {
      return e == 1 ? 0 : e == 2 ? 1 : e != 8 && e != 11 ? 2 : 3;
    },
    9: function (e) {
      return +(e >= 2);
    },
    10: function (e) {
      return e == 1 ? 0 : e == 2 ? 1 : e < 7 ? 2 : e < 11 ? 3 : 4;
    },
    11: function (e) {
      return e == 1 || e == 11
        ? 0
        : e == 2 || e == 12
        ? 1
        : e > 2 && e < 20
        ? 2
        : 3;
    },
    12: function (e) {
      return +(e % 10 != 1 || e % 100 == 11);
    },
    13: function (e) {
      return +(e !== 0);
    },
    14: function (e) {
      return e == 1 ? 0 : e == 2 ? 1 : e == 3 ? 2 : 3;
    },
    15: function (e) {
      return e % 10 == 1 && e % 100 != 11
        ? 0
        : e % 10 >= 2 && (e % 100 < 10 || e % 100 >= 20)
        ? 1
        : 2;
    },
    16: function (e) {
      return e % 10 == 1 && e % 100 != 11 ? 0 : e !== 0 ? 1 : 2;
    },
    17: function (e) {
      return e == 1 || (e % 10 == 1 && e % 100 != 11) ? 0 : 1;
    },
    18: function (e) {
      return e == 0 ? 0 : e == 1 ? 1 : 2;
    },
    19: function (e) {
      return e == 1
        ? 0
        : e == 0 || (e % 100 > 1 && e % 100 < 11)
        ? 1
        : e % 100 > 10 && e % 100 < 20
        ? 2
        : 3;
    },
    20: function (e) {
      return e == 1 ? 0 : e == 0 || (e % 100 > 0 && e % 100 < 20) ? 1 : 2;
    },
    21: function (e) {
      return e % 100 == 1
        ? 1
        : e % 100 == 2
        ? 2
        : e % 100 == 3 || e % 100 == 4
        ? 3
        : 0;
    },
    22: function (e) {
      return e == 1 ? 0 : e == 2 ? 1 : (e < 0 || e > 10) && e % 10 == 0 ? 2 : 3;
    },
  };
const Pt = ["v1", "v2", "v3"],
  At = ["v4"],
  cn = { zero: 0, one: 1, two: 2, few: 3, many: 4, other: 5 };
function Ft() {
  const e = {};
  return (
    Ot.forEach((n) => {
      n.lngs.forEach((t) => {
        e[t] = { numbers: n.nr, plurals: Et[n.fc] };
      });
    }),
    e
  );
}
class Rt {
  constructor(n) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    (this.languageUtils = n),
      (this.options = t),
      (this.logger = ie.create("pluralResolver")),
      (!this.options.compatibilityJSON ||
        At.includes(this.options.compatibilityJSON)) &&
        (typeof Intl > "u" || !Intl.PluralRules) &&
        ((this.options.compatibilityJSON = "v3"),
        this.logger.error(
          "Your environment seems not to be Intl API compatible, use an Intl.PluralRules polyfill. Will fallback to the compatibilityJSON v3 format handling."
        )),
      (this.rules = Ft());
  }
  addRule(n, t) {
    this.rules[n] = t;
  }
  getRule(n) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (this.shouldUseIntlApi())
      try {
        return new Intl.PluralRules(Ae(n), {
          type: t.ordinal ? "ordinal" : "cardinal",
        });
      } catch {
        return;
      }
    return (
      this.rules[n] || this.rules[this.languageUtils.getLanguagePartFromCode(n)]
    );
  }
  needsPlural(n) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = this.getRule(n, t);
    return this.shouldUseIntlApi()
      ? r && r.resolvedOptions().pluralCategories.length > 1
      : r && r.numbers.length > 1;
  }
  getPluralFormsOfKey(n, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    return this.getSuffixes(n, r).map((i) => `${t}${i}`);
  }
  getSuffixes(n) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    const r = this.getRule(n, t);
    return r
      ? this.shouldUseIntlApi()
        ? r
            .resolvedOptions()
            .pluralCategories.sort((i, a) => cn[i] - cn[a])
            .map(
              (i) =>
                `${this.options.prepend}${
                  t.ordinal ? `ordinal${this.options.prepend}` : ""
                }${i}`
            )
        : r.numbers.map((i) => this.getSuffix(n, i, t))
      : [];
  }
  getSuffix(n, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    const i = this.getRule(n, r);
    return i
      ? this.shouldUseIntlApi()
        ? `${this.options.prepend}${
            r.ordinal ? `ordinal${this.options.prepend}` : ""
          }${i.select(t)}`
        : this.getSuffixRetroCompatible(i, t)
      : (this.logger.warn(`no plural rule found for: ${n}`), "");
  }
  getSuffixRetroCompatible(n, t) {
    const r = n.noAbs ? n.plurals(t) : n.plurals(Math.abs(t));
    let i = n.numbers[r];
    this.options.simplifyPluralSuffix &&
      n.numbers.length === 2 &&
      n.numbers[0] === 1 &&
      (i === 2 ? (i = "plural") : i === 1 && (i = ""));
    const a = () =>
      this.options.prepend && i.toString()
        ? this.options.prepend + i.toString()
        : i.toString();
    return this.options.compatibilityJSON === "v1"
      ? i === 1
        ? ""
        : typeof i == "number"
        ? `_plural_${i.toString()}`
        : a()
      : this.options.compatibilityJSON === "v2" ||
        (this.options.simplifyPluralSuffix &&
          n.numbers.length === 2 &&
          n.numbers[0] === 1)
      ? a()
      : this.options.prepend && r.toString()
      ? this.options.prepend + r.toString()
      : r.toString();
  }
  shouldUseIntlApi() {
    return !Pt.includes(this.options.compatibilityJSON);
  }
}
function hn(e, n, t) {
  let r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : ".",
    i = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : !0,
    a = vt(e, n, t);
  return (
    !a &&
      i &&
      typeof t == "string" &&
      ((a = Pe(e, t, r)), a === void 0 && (a = Pe(n, t, r))),
    a
  );
}
class It {
  constructor() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    (this.logger = ie.create("interpolator")),
      (this.options = n),
      (this.format = (n.interpolation && n.interpolation.format) || ((t) => t)),
      this.init(n);
  }
  init() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    n.interpolation || (n.interpolation = { escapeValue: !0 });
    const t = n.interpolation;
    (this.escape = t.escape !== void 0 ? t.escape : kt),
      (this.escapeValue = t.escapeValue !== void 0 ? t.escapeValue : !0),
      (this.useRawValueToEscape =
        t.useRawValueToEscape !== void 0 ? t.useRawValueToEscape : !1),
      (this.prefix = t.prefix ? ue(t.prefix) : t.prefixEscaped || "{{"),
      (this.suffix = t.suffix ? ue(t.suffix) : t.suffixEscaped || "}}"),
      (this.formatSeparator = t.formatSeparator
        ? t.formatSeparator
        : t.formatSeparator || ","),
      (this.unescapePrefix = t.unescapeSuffix ? "" : t.unescapePrefix || "-"),
      (this.unescapeSuffix = this.unescapePrefix ? "" : t.unescapeSuffix || ""),
      (this.nestingPrefix = t.nestingPrefix
        ? ue(t.nestingPrefix)
        : t.nestingPrefixEscaped || ue("$t(")),
      (this.nestingSuffix = t.nestingSuffix
        ? ue(t.nestingSuffix)
        : t.nestingSuffixEscaped || ue(")")),
      (this.nestingOptionsSeparator = t.nestingOptionsSeparator
        ? t.nestingOptionsSeparator
        : t.nestingOptionsSeparator || ","),
      (this.maxReplaces = t.maxReplaces ? t.maxReplaces : 1e3),
      (this.alwaysFormat = t.alwaysFormat !== void 0 ? t.alwaysFormat : !1),
      this.resetRegExp();
  }
  reset() {
    this.options && this.init(this.options);
  }
  resetRegExp() {
    const n = `${this.prefix}(.+?)${this.suffix}`;
    this.regexp = new RegExp(n, "g");
    const t = `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`;
    this.regexpUnescape = new RegExp(t, "g");
    const r = `${this.nestingPrefix}(.+?)${this.nestingSuffix}`;
    this.nestingRegexp = new RegExp(r, "g");
  }
  interpolate(n, t, r, i) {
    let a, l, o;
    const s =
      (this.options &&
        this.options.interpolation &&
        this.options.interpolation.defaultVariables) ||
      {};
    function u(m) {
      return m.replace(/\$/g, "$$$$");
    }
    const p = (m) => {
      if (m.indexOf(this.formatSeparator) < 0) {
        const w = hn(
          t,
          s,
          m,
          this.options.keySeparator,
          this.options.ignoreJSONStructure
        );
        return this.alwaysFormat
          ? this.format(w, void 0, r, { ...i, ...t, interpolationkey: m })
          : w;
      }
      const S = m.split(this.formatSeparator),
        v = S.shift().trim(),
        d = S.join(this.formatSeparator).trim();
      return this.format(
        hn(
          t,
          s,
          v,
          this.options.keySeparator,
          this.options.ignoreJSONStructure
        ),
        d,
        r,
        { ...i, ...t, interpolationkey: v }
      );
    };
    this.resetRegExp();
    const g =
        (i && i.missingInterpolationHandler) ||
        this.options.missingInterpolationHandler,
      f =
        i && i.interpolation && i.interpolation.skipOnVariables !== void 0
          ? i.interpolation.skipOnVariables
          : this.options.interpolation.skipOnVariables;
    return (
      [
        { regex: this.regexpUnescape, safeValue: (m) => u(m) },
        {
          regex: this.regexp,
          safeValue: (m) => (this.escapeValue ? u(this.escape(m)) : u(m)),
        },
      ].forEach((m) => {
        for (o = 0; (a = m.regex.exec(n)); ) {
          const S = a[1].trim();
          if (((l = p(S)), l === void 0))
            if (typeof g == "function") {
              const d = g(n, a, i);
              l = typeof d == "string" ? d : "";
            } else if (i && Object.prototype.hasOwnProperty.call(i, S)) l = "";
            else if (f) {
              l = a[0];
              continue;
            } else
              this.logger.warn(
                `missed to pass in variable ${S} for interpolating ${n}`
              ),
                (l = "");
          else typeof l != "string" && !this.useRawValueToEscape && (l = ln(l));
          const v = m.safeValue(l);
          if (
            ((n = n.replace(a[0], v)),
            f
              ? ((m.regex.lastIndex += l.length),
                (m.regex.lastIndex -= a[0].length))
              : (m.regex.lastIndex = 0),
            o++,
            o >= this.maxReplaces)
          )
            break;
        }
      }),
      n
    );
  }
  nest(n, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      i,
      a,
      l;
    function o(s, u) {
      const p = this.nestingOptionsSeparator;
      if (s.indexOf(p) < 0) return s;
      const g = s.split(new RegExp(`${p}[ ]*{`));
      let f = `{${g[1]}`;
      (s = g[0]), (f = this.interpolate(f, l));
      const x = f.match(/'/g),
        m = f.match(/"/g);
      ((x && x.length % 2 === 0 && !m) || m.length % 2 !== 0) &&
        (f = f.replace(/'/g, '"'));
      try {
        (l = JSON.parse(f)), u && (l = { ...u, ...l });
      } catch (S) {
        return (
          this.logger.warn(
            `failed parsing options string in nesting for key ${s}`,
            S
          ),
          `${s}${p}${f}`
        );
      }
      return delete l.defaultValue, s;
    }
    for (; (i = this.nestingRegexp.exec(n)); ) {
      let s = [];
      (l = { ...r }),
        (l = l.replace && typeof l.replace != "string" ? l.replace : l),
        (l.applyPostProcessor = !1),
        delete l.defaultValue;
      let u = !1;
      if (i[0].indexOf(this.formatSeparator) !== -1 && !/{.*}/.test(i[1])) {
        const p = i[1].split(this.formatSeparator).map((g) => g.trim());
        (i[1] = p.shift()), (s = p), (u = !0);
      }
      if (
        ((a = t(o.call(this, i[1].trim(), l), l)),
        a && i[0] === n && typeof a != "string")
      )
        return a;
      typeof a != "string" && (a = ln(a)),
        a ||
          (this.logger.warn(`missed to resolve ${i[1]} for nesting ${n}`),
          (a = "")),
        u &&
          (a = s.reduce(
            (p, g) =>
              this.format(p, g, r.lng, { ...r, interpolationkey: i[1].trim() }),
            a.trim()
          )),
        (n = n.replace(i[0], a)),
        (this.regexp.lastIndex = 0);
    }
    return n;
  }
}
function Dt(e) {
  let n = e.toLowerCase().trim();
  const t = {};
  if (e.indexOf("(") > -1) {
    const r = e.split("(");
    n = r[0].toLowerCase().trim();
    const i = r[1].substring(0, r[1].length - 1);
    n === "currency" && i.indexOf(":") < 0
      ? t.currency || (t.currency = i.trim())
      : n === "relativetime" && i.indexOf(":") < 0
      ? t.range || (t.range = i.trim())
      : i.split(";").forEach((l) => {
          if (!l) return;
          const [o, ...s] = l.split(":"),
            u = s
              .join(":")
              .trim()
              .replace(/^'+|'+$/g, "");
          t[o.trim()] || (t[o.trim()] = u),
            u === "false" && (t[o.trim()] = !1),
            u === "true" && (t[o.trim()] = !0),
            isNaN(u) || (t[o.trim()] = parseInt(u, 10));
        });
  }
  return { formatName: n, formatOptions: t };
}
function pe(e) {
  const n = {};
  return function (r, i, a) {
    const l = i + JSON.stringify(a);
    let o = n[l];
    return o || ((o = e(Ae(i), a)), (n[l] = o)), o(r);
  };
}
class Tt {
  constructor() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    (this.logger = ie.create("formatter")),
      (this.options = n),
      (this.formats = {
        number: pe((t, r) => {
          const i = new Intl.NumberFormat(t, { ...r });
          return (a) => i.format(a);
        }),
        currency: pe((t, r) => {
          const i = new Intl.NumberFormat(t, { ...r, style: "currency" });
          return (a) => i.format(a);
        }),
        datetime: pe((t, r) => {
          const i = new Intl.DateTimeFormat(t, { ...r });
          return (a) => i.format(a);
        }),
        relativetime: pe((t, r) => {
          const i = new Intl.RelativeTimeFormat(t, { ...r });
          return (a) => i.format(a, r.range || "day");
        }),
        list: pe((t, r) => {
          const i = new Intl.ListFormat(t, { ...r });
          return (a) => i.format(a);
        }),
      }),
      this.init(n);
  }
  init(n) {
    const r = (
      arguments.length > 1 && arguments[1] !== void 0
        ? arguments[1]
        : { interpolation: {} }
    ).interpolation;
    this.formatSeparator = r.formatSeparator
      ? r.formatSeparator
      : r.formatSeparator || ",";
  }
  add(n, t) {
    this.formats[n.toLowerCase().trim()] = t;
  }
  addCached(n, t) {
    this.formats[n.toLowerCase().trim()] = pe(t);
  }
  format(n, t, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    return t.split(this.formatSeparator).reduce((o, s) => {
      const { formatName: u, formatOptions: p } = Dt(s);
      if (this.formats[u]) {
        let g = o;
        try {
          const f =
              (i && i.formatParams && i.formatParams[i.interpolationkey]) || {},
            x = f.locale || f.lng || i.locale || i.lng || r;
          g = this.formats[u](o, x, { ...p, ...i, ...f });
        } catch (f) {
          this.logger.warn(f);
        }
        return g;
      } else this.logger.warn(`there was no format function for ${u}`);
      return o;
    }, n);
  }
}
function zt(e, n) {
  e.pending[n] !== void 0 && (delete e.pending[n], e.pendingCount--);
}
class Nt extends Ie {
  constructor(n, t, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {};
    super(),
      (this.backend = n),
      (this.store = t),
      (this.services = r),
      (this.languageUtils = r.languageUtils),
      (this.options = i),
      (this.logger = ie.create("backendConnector")),
      (this.waitingReads = []),
      (this.maxParallelReads = i.maxParallelReads || 10),
      (this.readingCalls = 0),
      (this.maxRetries = i.maxRetries >= 0 ? i.maxRetries : 5),
      (this.retryTimeout = i.retryTimeout >= 1 ? i.retryTimeout : 350),
      (this.state = {}),
      (this.queue = []),
      this.backend && this.backend.init && this.backend.init(r, i.backend, i);
  }
  queueLoad(n, t, r, i) {
    const a = {},
      l = {},
      o = {},
      s = {};
    return (
      n.forEach((u) => {
        let p = !0;
        t.forEach((g) => {
          const f = `${u}|${g}`;
          !r.reload && this.store.hasResourceBundle(u, g)
            ? (this.state[f] = 2)
            : this.state[f] < 0 ||
              (this.state[f] === 1
                ? l[f] === void 0 && (l[f] = !0)
                : ((this.state[f] = 1),
                  (p = !1),
                  l[f] === void 0 && (l[f] = !0),
                  a[f] === void 0 && (a[f] = !0),
                  s[g] === void 0 && (s[g] = !0)));
        }),
          p || (o[u] = !0);
      }),
      (Object.keys(a).length || Object.keys(l).length) &&
        this.queue.push({
          pending: l,
          pendingCount: Object.keys(l).length,
          loaded: {},
          errors: [],
          callback: i,
        }),
      {
        toLoad: Object.keys(a),
        pending: Object.keys(l),
        toLoadLanguages: Object.keys(o),
        toLoadNamespaces: Object.keys(s),
      }
    );
  }
  loaded(n, t, r) {
    const i = n.split("|"),
      a = i[0],
      l = i[1];
    t && this.emit("failedLoading", a, l, t),
      r && this.store.addResourceBundle(a, l, r),
      (this.state[n] = t ? -1 : 2);
    const o = {};
    this.queue.forEach((s) => {
      St(s.loaded, [a], l),
        zt(s, n),
        t && s.errors.push(t),
        s.pendingCount === 0 &&
          !s.done &&
          (Object.keys(s.loaded).forEach((u) => {
            o[u] || (o[u] = {});
            const p = s.loaded[u];
            p.length &&
              p.forEach((g) => {
                o[u][g] === void 0 && (o[u][g] = !0);
              });
          }),
          (s.done = !0),
          s.errors.length ? s.callback(s.errors) : s.callback());
    }),
      this.emit("loaded", o),
      (this.queue = this.queue.filter((s) => !s.done));
  }
  read(n, t, r) {
    let i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : 0,
      a =
        arguments.length > 4 && arguments[4] !== void 0
          ? arguments[4]
          : this.retryTimeout,
      l = arguments.length > 5 ? arguments[5] : void 0;
    if (!n.length) return l(null, {});
    if (this.readingCalls >= this.maxParallelReads) {
      this.waitingReads.push({
        lng: n,
        ns: t,
        fcName: r,
        tried: i,
        wait: a,
        callback: l,
      });
      return;
    }
    this.readingCalls++;
    const o = (u, p) => {
        if ((this.readingCalls--, this.waitingReads.length > 0)) {
          const g = this.waitingReads.shift();
          this.read(g.lng, g.ns, g.fcName, g.tried, g.wait, g.callback);
        }
        if (u && p && i < this.maxRetries) {
          setTimeout(() => {
            this.read.call(this, n, t, r, i + 1, a * 2, l);
          }, a);
          return;
        }
        l(u, p);
      },
      s = this.backend[r].bind(this.backend);
    if (s.length === 2) {
      try {
        const u = s(n, t);
        u && typeof u.then == "function"
          ? u.then((p) => o(null, p)).catch(o)
          : o(null, u);
      } catch (u) {
        o(u);
      }
      return;
    }
    return s(n, t, o);
  }
  prepareLoading(n, t) {
    let r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      i = arguments.length > 3 ? arguments[3] : void 0;
    if (!this.backend)
      return (
        this.logger.warn(
          "No backend was added via i18next.use. Will not load resources."
        ),
        i && i()
      );
    typeof n == "string" && (n = this.languageUtils.toResolveHierarchy(n)),
      typeof t == "string" && (t = [t]);
    const a = this.queueLoad(n, t, r, i);
    if (!a.toLoad.length) return a.pending.length || i(), null;
    a.toLoad.forEach((l) => {
      this.loadOne(l);
    });
  }
  load(n, t, r) {
    this.prepareLoading(n, t, {}, r);
  }
  reload(n, t, r) {
    this.prepareLoading(n, t, { reload: !0 }, r);
  }
  loadOne(n) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "";
    const r = n.split("|"),
      i = r[0],
      a = r[1];
    this.read(i, a, "read", void 0, void 0, (l, o) => {
      l &&
        this.logger.warn(
          `${t}loading namespace ${a} for language ${i} failed`,
          l
        ),
        !l &&
          o &&
          this.logger.log(`${t}loaded namespace ${a} for language ${i}`, o),
        this.loaded(n, l, o);
    });
  }
  saveMissing(n, t, r, i, a) {
    let l = arguments.length > 5 && arguments[5] !== void 0 ? arguments[5] : {},
      o =
        arguments.length > 6 && arguments[6] !== void 0
          ? arguments[6]
          : () => {};
    if (
      this.services.utils &&
      this.services.utils.hasLoadedNamespace &&
      !this.services.utils.hasLoadedNamespace(t)
    ) {
      this.logger.warn(
        `did not save key "${r}" as the namespace "${t}" was not yet loaded`,
        "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!"
      );
      return;
    }
    if (!(r == null || r === "")) {
      if (this.backend && this.backend.create) {
        const s = { ...l, isUpdate: a },
          u = this.backend.create.bind(this.backend);
        if (u.length < 6)
          try {
            let p;
            u.length === 5 ? (p = u(n, t, r, i, s)) : (p = u(n, t, r, i)),
              p && typeof p.then == "function"
                ? p.then((g) => o(null, g)).catch(o)
                : o(null, p);
          } catch (p) {
            o(p);
          }
        else u(n, t, r, i, o, s);
      }
      !n || !n[0] || this.store.addResource(n[0], t, r, i);
    }
  }
}
function fn() {
  return {
    debug: !1,
    initImmediate: !0,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: !1,
    supportedLngs: !1,
    nonExplicitSupportedLngs: !1,
    load: "all",
    preload: !1,
    simplifyPluralSuffix: !0,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: !1,
    saveMissing: !1,
    updateMissing: !1,
    saveMissingTo: "fallback",
    saveMissingPlurals: !0,
    missingKeyHandler: !1,
    missingInterpolationHandler: !1,
    postProcess: !1,
    postProcessPassResolved: !1,
    returnNull: !1,
    returnEmptyString: !0,
    returnObjects: !1,
    joinArrays: !1,
    returnedObjectHandler: !1,
    parseMissingKeyHandler: !1,
    appendNamespaceToMissingKey: !1,
    appendNamespaceToCIMode: !1,
    overloadTranslationOptionHandler: function (n) {
      let t = {};
      if (
        (typeof n[1] == "object" && (t = n[1]),
        typeof n[1] == "string" && (t.defaultValue = n[1]),
        typeof n[2] == "string" && (t.tDescription = n[2]),
        typeof n[2] == "object" || typeof n[3] == "object")
      ) {
        const r = n[3] || n[2];
        Object.keys(r).forEach((i) => {
          t[i] = r[i];
        });
      }
      return t;
    },
    interpolation: {
      escapeValue: !0,
      format: (e, n, t, r) => e,
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      nestingOptionsSeparator: ",",
      maxReplaces: 1e3,
      skipOnVariables: !0,
    },
  };
}
function gn(e) {
  return (
    typeof e.ns == "string" && (e.ns = [e.ns]),
    typeof e.fallbackLng == "string" && (e.fallbackLng = [e.fallbackLng]),
    typeof e.fallbackNS == "string" && (e.fallbackNS = [e.fallbackNS]),
    e.supportedLngs &&
      e.supportedLngs.indexOf("cimode") < 0 &&
      (e.supportedLngs = e.supportedLngs.concat(["cimode"])),
    e
  );
}
function Ce() {}
function Mt(e) {
  Object.getOwnPropertyNames(Object.getPrototypeOf(e)).forEach((t) => {
    typeof e[t] == "function" && (e[t] = e[t].bind(e));
  });
}
class ye extends Ie {
  constructor() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 ? arguments[1] : void 0;
    if (
      (super(),
      (this.options = gn(n)),
      (this.services = {}),
      (this.logger = ie),
      (this.modules = { external: [] }),
      Mt(this),
      t && !this.isInitialized && !n.isClone)
    ) {
      if (!this.options.initImmediate) return this.init(n, t), this;
      setTimeout(() => {
        this.init(n, t);
      }, 0);
    }
  }
  init() {
    var n = this;
    let t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      r = arguments.length > 1 ? arguments[1] : void 0;
    typeof t == "function" && ((r = t), (t = {})),
      !t.defaultNS &&
        t.defaultNS !== !1 &&
        t.ns &&
        (typeof t.ns == "string"
          ? (t.defaultNS = t.ns)
          : t.ns.indexOf("translation") < 0 && (t.defaultNS = t.ns[0]));
    const i = fn();
    (this.options = { ...i, ...this.options, ...gn(t) }),
      this.options.compatibilityAPI !== "v1" &&
        (this.options.interpolation = {
          ...i.interpolation,
          ...this.options.interpolation,
        }),
      t.keySeparator !== void 0 &&
        (this.options.userDefinedKeySeparator = t.keySeparator),
      t.nsSeparator !== void 0 &&
        (this.options.userDefinedNsSeparator = t.nsSeparator);
    function a(p) {
      return p ? (typeof p == "function" ? new p() : p) : null;
    }
    if (!this.options.isClone) {
      this.modules.logger
        ? ie.init(a(this.modules.logger), this.options)
        : ie.init(null, this.options);
      let p;
      this.modules.formatter
        ? (p = this.modules.formatter)
        : typeof Intl < "u" && (p = Tt);
      const g = new pn(this.options);
      this.store = new sn(this.options.resources, this.options);
      const f = this.services;
      (f.logger = ie),
        (f.resourceStore = this.store),
        (f.languageUtils = g),
        (f.pluralResolver = new Rt(g, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix,
        })),
        p &&
          (!this.options.interpolation.format ||
            this.options.interpolation.format === i.interpolation.format) &&
          ((f.formatter = a(p)),
          f.formatter.init(f, this.options),
          (this.options.interpolation.format = f.formatter.format.bind(
            f.formatter
          ))),
        (f.interpolator = new It(this.options)),
        (f.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) }),
        (f.backendConnector = new Nt(
          a(this.modules.backend),
          f.resourceStore,
          f,
          this.options
        )),
        f.backendConnector.on("*", function (x) {
          for (
            var m = arguments.length, S = new Array(m > 1 ? m - 1 : 0), v = 1;
            v < m;
            v++
          )
            S[v - 1] = arguments[v];
          n.emit(x, ...S);
        }),
        this.modules.languageDetector &&
          ((f.languageDetector = a(this.modules.languageDetector)),
          f.languageDetector.init &&
            f.languageDetector.init(f, this.options.detection, this.options)),
        this.modules.i18nFormat &&
          ((f.i18nFormat = a(this.modules.i18nFormat)),
          f.i18nFormat.init && f.i18nFormat.init(this)),
        (this.translator = new Fe(this.services, this.options)),
        this.translator.on("*", function (x) {
          for (
            var m = arguments.length, S = new Array(m > 1 ? m - 1 : 0), v = 1;
            v < m;
            v++
          )
            S[v - 1] = arguments[v];
          n.emit(x, ...S);
        }),
        this.modules.external.forEach((x) => {
          x.init && x.init(this);
        });
    }
    if (
      ((this.format = this.options.interpolation.format),
      r || (r = Ce),
      this.options.fallbackLng &&
        !this.services.languageDetector &&
        !this.options.lng)
    ) {
      const p = this.services.languageUtils.getFallbackCodes(
        this.options.fallbackLng
      );
      p.length > 0 && p[0] !== "dev" && (this.options.lng = p[0]);
    }
    !this.services.languageDetector &&
      !this.options.lng &&
      this.logger.warn(
        "init: no languageDetector is used and no lng is defined"
      ),
      [
        "getResource",
        "hasResourceBundle",
        "getResourceBundle",
        "getDataByLanguage",
      ].forEach((p) => {
        this[p] = function () {
          return n.store[p](...arguments);
        };
      }),
      [
        "addResource",
        "addResources",
        "addResourceBundle",
        "removeResourceBundle",
      ].forEach((p) => {
        this[p] = function () {
          return n.store[p](...arguments), n;
        };
      });
    const s = de(),
      u = () => {
        const p = (g, f) => {
          this.isInitialized &&
            !this.initializedStoreOnce &&
            this.logger.warn(
              "init: i18next is already initialized. You should call init just once!"
            ),
            (this.isInitialized = !0),
            this.options.isClone ||
              this.logger.log("initialized", this.options),
            this.emit("initialized", this.options),
            s.resolve(f),
            r(g, f);
        };
        if (
          this.languages &&
          this.options.compatibilityAPI !== "v1" &&
          !this.isInitialized
        )
          return p(null, this.t.bind(this));
        this.changeLanguage(this.options.lng, p);
      };
    return (
      this.options.resources || !this.options.initImmediate
        ? u()
        : setTimeout(u, 0),
      s
    );
  }
  loadResources(n) {
    let r = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ce;
    const i = typeof n == "string" ? n : this.language;
    if (
      (typeof n == "function" && (r = n),
      !this.options.resources || this.options.partialBundledLanguages)
    ) {
      if (i && i.toLowerCase() === "cimode") return r();
      const a = [],
        l = (o) => {
          if (!o) return;
          this.services.languageUtils.toResolveHierarchy(o).forEach((u) => {
            a.indexOf(u) < 0 && a.push(u);
          });
        };
      i
        ? l(i)
        : this.services.languageUtils
            .getFallbackCodes(this.options.fallbackLng)
            .forEach((s) => l(s)),
        this.options.preload && this.options.preload.forEach((o) => l(o)),
        this.services.backendConnector.load(a, this.options.ns, (o) => {
          !o &&
            !this.resolvedLanguage &&
            this.language &&
            this.setResolvedLanguage(this.language),
            r(o);
        });
    } else r(null);
  }
  reloadResources(n, t, r) {
    const i = de();
    return (
      n || (n = this.languages),
      t || (t = this.options.ns),
      r || (r = Ce),
      this.services.backendConnector.reload(n, t, (a) => {
        i.resolve(), r(a);
      }),
      i
    );
  }
  use(n) {
    if (!n)
      throw new Error(
        "You are passing an undefined module! Please check the object you are passing to i18next.use()"
      );
    if (!n.type)
      throw new Error(
        "You are passing a wrong module! Please check the object you are passing to i18next.use()"
      );
    return (
      n.type === "backend" && (this.modules.backend = n),
      (n.type === "logger" || (n.log && n.warn && n.error)) &&
        (this.modules.logger = n),
      n.type === "languageDetector" && (this.modules.languageDetector = n),
      n.type === "i18nFormat" && (this.modules.i18nFormat = n),
      n.type === "postProcessor" && Nn.addPostProcessor(n),
      n.type === "formatter" && (this.modules.formatter = n),
      n.type === "3rdParty" && this.modules.external.push(n),
      this
    );
  }
  setResolvedLanguage(n) {
    if (!(!n || !this.languages) && !(["cimode", "dev"].indexOf(n) > -1))
      for (let t = 0; t < this.languages.length; t++) {
        const r = this.languages[t];
        if (
          !(["cimode", "dev"].indexOf(r) > -1) &&
          this.store.hasLanguageSomeTranslations(r)
        ) {
          this.resolvedLanguage = r;
          break;
        }
      }
  }
  changeLanguage(n, t) {
    var r = this;
    this.isLanguageChangingTo = n;
    const i = de();
    this.emit("languageChanging", n);
    const a = (s) => {
        (this.language = s),
          (this.languages = this.services.languageUtils.toResolveHierarchy(s)),
          (this.resolvedLanguage = void 0),
          this.setResolvedLanguage(s);
      },
      l = (s, u) => {
        u
          ? (a(u),
            this.translator.changeLanguage(u),
            (this.isLanguageChangingTo = void 0),
            this.emit("languageChanged", u),
            this.logger.log("languageChanged", u))
          : (this.isLanguageChangingTo = void 0),
          i.resolve(function () {
            return r.t(...arguments);
          }),
          t &&
            t(s, function () {
              return r.t(...arguments);
            });
      },
      o = (s) => {
        !n && !s && this.services.languageDetector && (s = []);
        const u =
          typeof s == "string"
            ? s
            : this.services.languageUtils.getBestMatchFromCodes(s);
        u &&
          (this.language || a(u),
          this.translator.language || this.translator.changeLanguage(u),
          this.services.languageDetector &&
            this.services.languageDetector.cacheUserLanguage &&
            this.services.languageDetector.cacheUserLanguage(u)),
          this.loadResources(u, (p) => {
            l(p, u);
          });
      };
    return (
      !n &&
      this.services.languageDetector &&
      !this.services.languageDetector.async
        ? o(this.services.languageDetector.detect())
        : !n &&
          this.services.languageDetector &&
          this.services.languageDetector.async
        ? this.services.languageDetector.detect.length === 0
          ? this.services.languageDetector.detect().then(o)
          : this.services.languageDetector.detect(o)
        : o(n),
      i
    );
  }
  getFixedT(n, t, r) {
    var i = this;
    const a = function (l, o) {
      let s;
      if (typeof o != "object") {
        for (
          var u = arguments.length, p = new Array(u > 2 ? u - 2 : 0), g = 2;
          g < u;
          g++
        )
          p[g - 2] = arguments[g];
        s = i.options.overloadTranslationOptionHandler([l, o].concat(p));
      } else s = { ...o };
      (s.lng = s.lng || a.lng),
        (s.lngs = s.lngs || a.lngs),
        (s.ns = s.ns || a.ns),
        (s.keyPrefix = s.keyPrefix || r || a.keyPrefix);
      const f = i.options.keySeparator || ".";
      let x;
      return (
        s.keyPrefix && Array.isArray(l)
          ? (x = l.map((m) => `${s.keyPrefix}${f}${m}`))
          : (x = s.keyPrefix ? `${s.keyPrefix}${f}${l}` : l),
        i.t(x, s)
      );
    };
    return (
      typeof n == "string" ? (a.lng = n) : (a.lngs = n),
      (a.ns = t),
      (a.keyPrefix = r),
      a
    );
  }
  t() {
    return this.translator && this.translator.translate(...arguments);
  }
  exists() {
    return this.translator && this.translator.exists(...arguments);
  }
  setDefaultNamespace(n) {
    this.options.defaultNS = n;
  }
  hasLoadedNamespace(n) {
    let t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (!this.isInitialized)
      return (
        this.logger.warn(
          "hasLoadedNamespace: i18next was not initialized",
          this.languages
        ),
        !1
      );
    if (!this.languages || !this.languages.length)
      return (
        this.logger.warn(
          "hasLoadedNamespace: i18n.languages were undefined or empty",
          this.languages
        ),
        !1
      );
    const r = t.lng || this.resolvedLanguage || this.languages[0],
      i = this.options ? this.options.fallbackLng : !1,
      a = this.languages[this.languages.length - 1];
    if (r.toLowerCase() === "cimode") return !0;
    const l = (o, s) => {
      const u = this.services.backendConnector.state[`${o}|${s}`];
      return u === -1 || u === 2;
    };
    if (t.precheck) {
      const o = t.precheck(this, l);
      if (o !== void 0) return o;
    }
    return !!(
      this.hasResourceBundle(r, n) ||
      !this.services.backendConnector.backend ||
      (this.options.resources && !this.options.partialBundledLanguages) ||
      (l(r, n) && (!i || l(a, n)))
    );
  }
  loadNamespaces(n, t) {
    const r = de();
    return this.options.ns
      ? (typeof n == "string" && (n = [n]),
        n.forEach((i) => {
          this.options.ns.indexOf(i) < 0 && this.options.ns.push(i);
        }),
        this.loadResources((i) => {
          r.resolve(), t && t(i);
        }),
        r)
      : (t && t(), Promise.resolve());
  }
  loadLanguages(n, t) {
    const r = de();
    typeof n == "string" && (n = [n]);
    const i = this.options.preload || [],
      a = n.filter((l) => i.indexOf(l) < 0);
    return a.length
      ? ((this.options.preload = i.concat(a)),
        this.loadResources((l) => {
          r.resolve(), t && t(l);
        }),
        r)
      : (t && t(), Promise.resolve());
  }
  dir(n) {
    if (
      (n ||
        (n =
          this.resolvedLanguage ||
          (this.languages && this.languages.length > 0
            ? this.languages[0]
            : this.language)),
      !n)
    )
      return "rtl";
    const t = [
        "ar",
        "shu",
        "sqr",
        "ssh",
        "xaa",
        "yhd",
        "yud",
        "aao",
        "abh",
        "abv",
        "acm",
        "acq",
        "acw",
        "acx",
        "acy",
        "adf",
        "ads",
        "aeb",
        "aec",
        "afb",
        "ajp",
        "apc",
        "apd",
        "arb",
        "arq",
        "ars",
        "ary",
        "arz",
        "auz",
        "avl",
        "ayh",
        "ayl",
        "ayn",
        "ayp",
        "bbz",
        "pga",
        "he",
        "iw",
        "ps",
        "pbt",
        "pbu",
        "pst",
        "prp",
        "prd",
        "ug",
        "ur",
        "ydd",
        "yds",
        "yih",
        "ji",
        "yi",
        "hbo",
        "men",
        "xmn",
        "fa",
        "jpr",
        "peo",
        "pes",
        "prs",
        "dv",
        "sam",
        "ckb",
      ],
      r = (this.services && this.services.languageUtils) || new pn(fn());
    return t.indexOf(r.getLanguagePartFromCode(n)) > -1 ||
      n.toLowerCase().indexOf("-arab") > 1
      ? "rtl"
      : "ltr";
  }
  static createInstance() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 ? arguments[1] : void 0;
    return new ye(n, t);
  }
  cloneInstance() {
    let n = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {},
      t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Ce;
    const r = n.forkResourceStore;
    r && delete n.forkResourceStore;
    const i = { ...this.options, ...n, isClone: !0 },
      a = new ye(i);
    return (
      (n.debug !== void 0 || n.prefix !== void 0) &&
        (a.logger = a.logger.clone(n)),
      ["store", "services", "language"].forEach((o) => {
        a[o] = this[o];
      }),
      (a.services = { ...this.services }),
      (a.services.utils = { hasLoadedNamespace: a.hasLoadedNamespace.bind(a) }),
      r &&
        ((a.store = new sn(this.store.data, i)),
        (a.services.resourceStore = a.store)),
      (a.translator = new Fe(a.services, i)),
      a.translator.on("*", function (o) {
        for (
          var s = arguments.length, u = new Array(s > 1 ? s - 1 : 0), p = 1;
          p < s;
          p++
        )
          u[p - 1] = arguments[p];
        a.emit(o, ...u);
      }),
      a.init(i, t),
      (a.translator.options = i),
      (a.translator.backendConnector.services.utils = {
        hasLoadedNamespace: a.hasLoadedNamespace.bind(a),
      }),
      a
    );
  }
  toJSON() {
    return {
      options: this.options,
      store: this.store,
      language: this.language,
      languages: this.languages,
      resolvedLanguage: this.resolvedLanguage,
    };
  }
}
const H = ye.createInstance();
H.createInstance = ye.createInstance;
H.createInstance;
H.dir;
H.init;
H.loadResources;
H.reloadResources;
H.use;
H.changeLanguage;
H.getFixedT;
H.t;
H.exists;
H.setDefaultNamespace;
H.hasLoadedNamespace;
H.loadNamespaces;
H.loadLanguages;
await H.init({
  lng: "ja",
  debug: !0,
  resources: {
    ja: {
      translation: {
        serviceName: "FLOG",
        title: '"ぞでぃあっく" の技術ブログ',
      },
    },
  },
});
const Mn = H,
  jt = be("<div><div><div><div>"),
  Bt = () =>
    (() => {
      const e = jt(),
        n = e.firstChild,
        t = n.firstChild,
        r = t.firstChild;
      return (
        W(e, $t),
        W(n, Vt),
        ae(n, he(jn, { width: "60px", height: "60px", src: "fblok.png" }), t),
        W(t, _t),
        W(r, Ut),
        ae(r, () => Mn.t("serviceName")),
        e
      );
    })(),
  $t = V({ height: "65px", background: "white" }),
  Vt = V({
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  _t = V({ height: "65px", display: "flex", alignItems: "center" }),
  Ut = V({
    marginTop: "25px",
    fontSize: "40px",
    fontFamily: "Gotham Bold",
    fontWeight: "Bold",
    color: "#698403",
  }),
  Ht = be('<picture><source type="image/webp"><img>'),
  jn = ({ src: e, width: n, height: t, borderRadius: r, objectFit: i }) =>
    (() => {
      const a = Ht(),
        l = a.firstChild,
        o = l.nextSibling;
      return (
        ke(o, "width", n),
        ke(o, "height", t),
        ke(o, "src", `/src/assets/${e}`),
        i != null
          ? o.style.setProperty("object-fit", i)
          : o.style.removeProperty("object-fit"),
        r != null
          ? o.style.setProperty("border-radius", r)
          : o.style.removeProperty("border-radius"),
        Dn(() =>
          ke(l, "src", `/src/assets/${e.replace(/jpg|jpeg|png/, "webp")}`)
        ),
        a
      );
    })(),
  Kt = be("<div>"),
  qt = ({ isSP: e }) =>
    (() => {
      const n = Kt();
      return (
        ae(n, () => pt.map((t) => he(Jt, { isSP: e, article: t }))),
        Dn(() => W(n, Wt(e()))),
        n
      );
    })(),
  Wt = (e) =>
    V(
      e
        ? { padding: "10%" }
        : {
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            padding: "10%",
          }
    ),
  Me = be("<div>"),
  Jt = ({ article: e, isSP: n }) =>
    he(ct, {
      get href() {
        return `/articles/${e.path}`;
      },
      get class() {
        return Yt(n());
      },
      get children() {
        return [
          (() => {
            const t = Me();
            return (
              W(t, Qt),
              ae(
                t,
                he(jn, {
                  get src() {
                    return e.img;
                  },
                  width: "100%",
                  height: "70%",
                  objectFit: "contain",
                  borderRadius: "10px",
                })
              ),
              t
            );
          })(),
          (() => {
            const t = Me();
            return W(t, Gt), ae(t, () => e.title), t;
          })(),
          (() => {
            const t = Me();
            return W(t, Xt), ae(t, () => e.created), t;
          })(),
        ];
      },
    }),
  Yt = (e) =>
    V(
      e
        ? {
            display: "block",
            position: "relative",
            fontWeight: "bold",
            textAlign: "center",
            background: "rgba(239,246,255,0.5)",
            marginTop: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
            padding: "10px",
          }
        : {
            fontSize: "20px",
            position: "relative",
            fontWeight: "bold",
            textAlign: "center",
            background: "rgba(239,246,255,0.5)",
            width: "calc(30% - 20px)",
            marginRight: "5%",
            marginBottom: "5%",
            borderRadius: "10px",
            padding: "10px",
            "&:nth-child(3n)": { marginRight: 0 },
          }
    ),
  Qt = V({
    width: "100%",
    height: "70%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    overflow: "hidden",
  }),
  Gt = V({ marginTop: "10px", fontSize: "20px" }),
  Xt = V({ fontSize: "15px", marginTop: "10px" });
var Zt = Object.create,
  en = Object.defineProperty,
  er = Object.getOwnPropertyDescriptor,
  Bn = Object.getOwnPropertyNames,
  nr = Object.getPrototypeOf,
  tr = Object.prototype.hasOwnProperty,
  De = (e, n) =>
    function () {
      return n || (0, e[Bn(e)[0]])((n = { exports: {} }).exports, n), n.exports;
    },
  $n = (e, n) => {
    for (var t in n) en(e, t, { get: n[t], enumerable: !0 });
  },
  rr = (e, n, t, r) => {
    if ((n && typeof n == "object") || typeof n == "function")
      for (let i of Bn(n))
        !tr.call(e, i) &&
          i !== t &&
          en(e, i, {
            get: () => n[i],
            enumerable: !(r = er(n, i)) || r.enumerable,
          });
    return e;
  },
  Te = (e, n, t) => (
    (t = e != null ? Zt(nr(e)) : {}),
    rr(
      n || !e || !e.__esModule
        ? en(t, "default", { value: e, enumerable: !0 })
        : t,
      e
    )
  ),
  Vn = De({
    "node_modules/.pnpm/is-buffer@2.0.5/node_modules/is-buffer/index.js"(e, n) {
      n.exports = function (r) {
        return (
          r != null &&
          r.constructor != null &&
          typeof r.constructor.isBuffer == "function" &&
          r.constructor.isBuffer(r)
        );
      };
    },
  }),
  ir = De({
    "node_modules/.pnpm/extend@3.0.2/node_modules/extend/index.js"(e, n) {
      var t = Object.prototype.hasOwnProperty,
        r = Object.prototype.toString,
        i = Object.defineProperty,
        a = Object.getOwnPropertyDescriptor,
        l = function (g) {
          return typeof Array.isArray == "function"
            ? Array.isArray(g)
            : r.call(g) === "[object Array]";
        },
        o = function (g) {
          if (!g || r.call(g) !== "[object Object]") return !1;
          var f = t.call(g, "constructor"),
            x =
              g.constructor &&
              g.constructor.prototype &&
              t.call(g.constructor.prototype, "isPrototypeOf");
          if (g.constructor && !f && !x) return !1;
          var m;
          for (m in g);
          return typeof m > "u" || t.call(g, m);
        },
        s = function (g, f) {
          i && f.name === "__proto__"
            ? i(g, f.name, {
                enumerable: !0,
                configurable: !0,
                value: f.newValue,
                writable: !0,
              })
            : (g[f.name] = f.newValue);
        },
        u = function (g, f) {
          if (f === "__proto__")
            if (t.call(g, f)) {
              if (a) return a(g, f).value;
            } else return;
          return g[f];
        };
      n.exports = function p() {
        var g,
          f,
          x,
          m,
          S,
          v,
          d = arguments[0],
          w = 1,
          F = arguments.length,
          k = !1;
        for (
          typeof d == "boolean" && ((k = d), (d = arguments[1] || {}), (w = 2)),
            (d == null || (typeof d != "object" && typeof d != "function")) &&
              (d = {});
          w < F;
          ++w
        )
          if (((g = arguments[w]), g != null))
            for (f in g)
              (x = u(d, f)),
                (m = u(g, f)),
                d !== m &&
                  (k && m && (o(m) || (S = l(m)))
                    ? (S
                        ? ((S = !1), (v = x && l(x) ? x : []))
                        : (v = x && o(x) ? x : {}),
                      s(d, { name: f, newValue: p(k, v, m) }))
                    : typeof m < "u" && s(d, { name: f, newValue: m }));
        return d;
      };
    },
  }),
  ar = De({
    "node_modules/.pnpm/inline-style-parser@0.1.1/node_modules/inline-style-parser/index.js"(
      e,
      n
    ) {
      var t = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
        r = /\n/g,
        i = /^\s*/,
        a = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
        l = /^:\s*/,
        o = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
        s = /^[;\s]*/,
        u = /^\s+|\s+$/g,
        p = `
`,
        g = "/",
        f = "*",
        x = "",
        m = "comment",
        S = "declaration";
      n.exports = function (d, w) {
        if (typeof d != "string")
          throw new TypeError("First argument must be a string");
        if (!d) return [];
        w = w || {};
        var F = 1,
          k = 1;
        function A(P) {
          var L = P.match(r);
          L && (F += L.length);
          var D = P.lastIndexOf(p);
          k = ~D ? P.length - D : k + P.length;
        }
        function y() {
          var P = { line: F, column: k };
          return function (L) {
            return (L.position = new C(P)), _(), L;
          };
        }
        function C(P) {
          (this.start = P),
            (this.end = { line: F, column: k }),
            (this.source = w.source);
        }
        C.prototype.content = d;
        function R(P) {
          var L = new Error(w.source + ":" + F + ":" + k + ": " + P);
          if (
            ((L.reason = P),
            (L.filename = w.source),
            (L.line = F),
            (L.column = k),
            (L.source = d),
            !w.silent)
          )
            throw L;
        }
        function I(P) {
          var L = P.exec(d);
          if (L) {
            var D = L[0];
            return A(D), (d = d.slice(D.length)), L;
          }
        }
        function _() {
          I(i);
        }
        function T(P) {
          var L;
          for (P = P || []; (L = U()); ) L !== !1 && P.push(L);
          return P;
        }
        function U() {
          var P = y();
          if (!(g != d.charAt(0) || f != d.charAt(1))) {
            for (
              var L = 2;
              x != d.charAt(L) && (f != d.charAt(L) || g != d.charAt(L + 1));

            )
              ++L;
            if (((L += 2), x === d.charAt(L - 1)))
              return R("End of comment missing");
            var D = d.slice(2, L - 2);
            return (
              (k += 2),
              A(D),
              (d = d.slice(L)),
              (k += 2),
              P({ type: m, comment: D })
            );
          }
        }
        function z() {
          var P = y(),
            L = I(a);
          if (L) {
            if ((U(), !I(l))) return R("property missing ':'");
            var D = I(o),
              j = P({
                type: S,
                property: v(L[0].replace(t, x)),
                value: D ? v(D[0].replace(t, x)) : x,
              });
            return I(s), j;
          }
        }
        function J() {
          var P = [];
          T(P);
          for (var L; (L = z()); ) L !== !1 && (P.push(L), T(P));
          return P;
        }
        return _(), J();
      };
      function v(d) {
        return d ? d.replace(u, x) : x;
      }
    },
  }),
  lr = De({
    "node_modules/.pnpm/style-to-object@0.4.1/node_modules/style-to-object/index.js"(
      e,
      n
    ) {
      var t = ar();
      function r(i, a) {
        var l = null;
        if (!i || typeof i != "string") return l;
        for (
          var o,
            s = t(i),
            u = typeof a == "function",
            p,
            g,
            f = 0,
            x = s.length;
          f < x;
          f++
        )
          (o = s[f]),
            (p = o.property),
            (g = o.value),
            u ? a(p, g, o) : g && (l || (l = {}), (l[p] = g));
        return l;
      }
      (n.exports = r), (n.exports.default = r);
    },
  });
function ze(e, n, t, r) {
  const i = e.length;
  let a = 0,
    l;
  if (
    (n < 0 ? (n = -n > i ? 0 : i + n) : (n = n > i ? i : n),
    (t = t > 0 ? t : 0),
    r.length < 1e4)
  )
    (l = Array.from(r)), l.unshift(n, t), [].splice.apply(e, l);
  else
    for (t && [].splice.apply(e, [n, t]); a < r.length; )
      (l = r.slice(a, a + 1e4)),
        l.unshift(n, 0),
        [].splice.apply(e, l),
        (a += 1e4),
        (n += 1e4);
}
function Z(e, n) {
  return e.length > 0 ? (ze(e, e.length, 0, n), e) : n;
}
var or =
    /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/,
  re = le(/[A-Za-z]/),
  We = le(/\d/),
  sr = le(/[\dA-Fa-f]/),
  ee = le(/[\dA-Za-z]/),
  ur = le(/[!-/:-@[-`{-~]/),
  dn = le(/[#-'*+\--9=?A-Z^-~]/);
function Je(e) {
  return e !== null && (e < 32 || e === 127);
}
function G(e) {
  return e !== null && (e < 0 || e === 32);
}
function E(e) {
  return e !== null && e < -2;
}
function $(e) {
  return e === -2 || e === -1 || e === 32;
}
var pr = le(/\s/),
  cr = le(or);
function le(e) {
  return n;
  function n(t) {
    return t !== null && e.test(String.fromCharCode(t));
  }
}
function M(e, n, t, r) {
  const i = r ? r - 1 : Number.POSITIVE_INFINITY;
  let a = 0;
  return l;
  function l(s) {
    return $(s) ? (e.enter(t), o(s)) : n(s);
  }
  function o(s) {
    return $(s) && a++ < i ? (e.consume(s), o) : (e.exit(t), n(s));
  }
}
function mn(e) {
  if (e === null || G(e) || pr(e)) return 1;
  if (cr(e)) return 2;
}
function _n(e, n, t) {
  const r = [];
  let i = -1;
  for (; ++i < e.length; ) {
    const a = e[i].resolveAll;
    a && !r.includes(a) && ((n = a(n, t)), r.push(a));
  }
  return n;
}
var Ye = { name: "attention", tokenize: fr, resolveAll: hr };
function hr(e, n) {
  let t = -1,
    r,
    i,
    a,
    l,
    o,
    s,
    u,
    p;
  for (; ++t < e.length; )
    if (
      e[t][0] === "enter" &&
      e[t][1].type === "attentionSequence" &&
      e[t][1]._close
    ) {
      for (r = t; r--; )
        if (
          e[r][0] === "exit" &&
          e[r][1].type === "attentionSequence" &&
          e[r][1]._open &&
          n.sliceSerialize(e[r][1]).charCodeAt(0) ===
            n.sliceSerialize(e[t][1]).charCodeAt(0)
        ) {
          if (
            (e[r][1]._close || e[t][1]._open) &&
            (e[t][1].end.offset - e[t][1].start.offset) % 3 &&
            !(
              (e[r][1].end.offset -
                e[r][1].start.offset +
                e[t][1].end.offset -
                e[t][1].start.offset) %
              3
            )
          )
            continue;
          s =
            e[r][1].end.offset - e[r][1].start.offset > 1 &&
            e[t][1].end.offset - e[t][1].start.offset > 1
              ? 2
              : 1;
          const g = Object.assign({}, e[r][1].end),
            f = Object.assign({}, e[t][1].start);
          xn(g, -s),
            xn(f, s),
            (l = {
              type: s > 1 ? "strongSequence" : "emphasisSequence",
              start: g,
              end: Object.assign({}, e[r][1].end),
            }),
            (o = {
              type: s > 1 ? "strongSequence" : "emphasisSequence",
              start: Object.assign({}, e[t][1].start),
              end: f,
            }),
            (a = {
              type: s > 1 ? "strongText" : "emphasisText",
              start: Object.assign({}, e[r][1].end),
              end: Object.assign({}, e[t][1].start),
            }),
            (i = {
              type: s > 1 ? "strong" : "emphasis",
              start: Object.assign({}, l.start),
              end: Object.assign({}, o.end),
            }),
            (e[r][1].end = Object.assign({}, l.start)),
            (e[t][1].start = Object.assign({}, o.end)),
            (u = []),
            e[r][1].end.offset - e[r][1].start.offset &&
              (u = Z(u, [
                ["enter", e[r][1], n],
                ["exit", e[r][1], n],
              ])),
            (u = Z(u, [
              ["enter", i, n],
              ["enter", l, n],
              ["exit", l, n],
              ["enter", a, n],
            ])),
            (u = Z(
              u,
              _n(n.parser.constructs.insideSpan.null, e.slice(r + 1, t), n)
            )),
            (u = Z(u, [
              ["exit", a, n],
              ["enter", o, n],
              ["exit", o, n],
              ["exit", i, n],
            ])),
            e[t][1].end.offset - e[t][1].start.offset
              ? ((p = 2),
                (u = Z(u, [
                  ["enter", e[t][1], n],
                  ["exit", e[t][1], n],
                ])))
              : (p = 0),
            ze(e, r - 1, t - r + 3, u),
            (t = r + u.length - p - 2);
          break;
        }
    }
  for (t = -1; ++t < e.length; )
    e[t][1].type === "attentionSequence" && (e[t][1].type = "data");
  return e;
}
function fr(e, n) {
  const t = this.parser.constructs.attentionMarkers.null,
    r = this.previous,
    i = mn(r);
  let a;
  return l;
  function l(s) {
    return e.enter("attentionSequence"), (a = s), o(s);
  }
  function o(s) {
    if (s === a) return e.consume(s), o;
    const u = e.exit("attentionSequence"),
      p = mn(s),
      g = !p || (p === 2 && i) || t.includes(s),
      f = !i || (i === 2 && p) || t.includes(r);
    return (
      (u._open = !!(a === 42 ? g : g && (i || !f))),
      (u._close = !!(a === 42 ? f : f && (p || !g))),
      n(s)
    );
  }
}
function xn(e, n) {
  (e.column += n), (e.offset += n), (e._bufferIndex += n);
}
var gr = { name: "autolink", tokenize: dr };
function dr(e, n, t) {
  let r = 1;
  return i;
  function i(m) {
    return (
      e.enter("autolink"),
      e.enter("autolinkMarker"),
      e.consume(m),
      e.exit("autolinkMarker"),
      e.enter("autolinkProtocol"),
      a
    );
  }
  function a(m) {
    return re(m) ? (e.consume(m), l) : dn(m) ? u(m) : t(m);
  }
  function l(m) {
    return m === 43 || m === 45 || m === 46 || ee(m) ? o(m) : u(m);
  }
  function o(m) {
    return m === 58
      ? (e.consume(m), s)
      : (m === 43 || m === 45 || m === 46 || ee(m)) && r++ < 32
      ? (e.consume(m), o)
      : u(m);
  }
  function s(m) {
    return m === 62
      ? (e.exit("autolinkProtocol"), x(m))
      : m === null || m === 32 || m === 60 || Je(m)
      ? t(m)
      : (e.consume(m), s);
  }
  function u(m) {
    return m === 64
      ? (e.consume(m), (r = 0), p)
      : dn(m)
      ? (e.consume(m), u)
      : t(m);
  }
  function p(m) {
    return ee(m) ? g(m) : t(m);
  }
  function g(m) {
    return m === 46
      ? (e.consume(m), (r = 0), p)
      : m === 62
      ? ((e.exit("autolinkProtocol").type = "autolinkEmail"), x(m))
      : f(m);
  }
  function f(m) {
    return (m === 45 || ee(m)) && r++ < 63
      ? (e.consume(m), m === 45 ? f : g)
      : t(m);
  }
  function x(m) {
    return (
      e.enter("autolinkMarker"),
      e.consume(m),
      e.exit("autolinkMarker"),
      e.exit("autolink"),
      n
    );
  }
}
var nn = { tokenize: mr, partial: !0 };
function mr(e, n, t) {
  return M(e, r, "linePrefix");
  function r(i) {
    return i === null || E(i) ? n(i) : t(i);
  }
}
var Un = {
  name: "blockQuote",
  tokenize: xr,
  continuation: { tokenize: yr },
  exit: br,
};
function xr(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    if (l === 62) {
      const o = r.containerState;
      return (
        o.open || (e.enter("blockQuote", { _container: !0 }), (o.open = !0)),
        e.enter("blockQuotePrefix"),
        e.enter("blockQuoteMarker"),
        e.consume(l),
        e.exit("blockQuoteMarker"),
        a
      );
    }
    return t(l);
  }
  function a(l) {
    return $(l)
      ? (e.enter("blockQuotePrefixWhitespace"),
        e.consume(l),
        e.exit("blockQuotePrefixWhitespace"),
        e.exit("blockQuotePrefix"),
        n)
      : (e.exit("blockQuotePrefix"), n(l));
  }
}
function yr(e, n, t) {
  return M(
    e,
    e.attempt(Un, n, t),
    "linePrefix",
    this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
  );
}
function br(e) {
  e.exit("blockQuote");
}
var Hn = { name: "characterEscape", tokenize: Sr };
function Sr(e, n, t) {
  return r;
  function r(a) {
    return (
      e.enter("characterEscape"),
      e.enter("escapeMarker"),
      e.consume(a),
      e.exit("escapeMarker"),
      i
    );
  }
  function i(a) {
    return ur(a)
      ? (e.enter("characterEscapeValue"),
        e.consume(a),
        e.exit("characterEscapeValue"),
        e.exit("characterEscape"),
        n)
      : t(a);
  }
}
var yn = document.createElement("i");
function vr(e) {
  const n = "&" + e + ";";
  yn.innerHTML = n;
  const t = yn.textContent;
  return (t.charCodeAt(t.length - 1) === 59 && e !== "semi") || t === n
    ? !1
    : t;
}
var Kn = { name: "characterReference", tokenize: wr };
function wr(e, n, t) {
  const r = this;
  let i = 0,
    a,
    l;
  return o;
  function o(g) {
    return (
      e.enter("characterReference"),
      e.enter("characterReferenceMarker"),
      e.consume(g),
      e.exit("characterReferenceMarker"),
      s
    );
  }
  function s(g) {
    return g === 35
      ? (e.enter("characterReferenceMarkerNumeric"),
        e.consume(g),
        e.exit("characterReferenceMarkerNumeric"),
        u)
      : (e.enter("characterReferenceValue"), (a = 31), (l = ee), p(g));
  }
  function u(g) {
    return g === 88 || g === 120
      ? (e.enter("characterReferenceMarkerHexadecimal"),
        e.consume(g),
        e.exit("characterReferenceMarkerHexadecimal"),
        e.enter("characterReferenceValue"),
        (a = 6),
        (l = sr),
        p)
      : (e.enter("characterReferenceValue"), (a = 7), (l = We), p(g));
  }
  function p(g) {
    let f;
    return g === 59 && i
      ? ((f = e.exit("characterReferenceValue")),
        l === ee && !vr(r.sliceSerialize(f))
          ? t(g)
          : (e.enter("characterReferenceMarker"),
            e.consume(g),
            e.exit("characterReferenceMarker"),
            e.exit("characterReference"),
            n))
      : l(g) && i++ < a
      ? (e.consume(g), p)
      : t(g);
  }
}
var bn = { name: "codeFenced", tokenize: kr, concrete: !0 };
function kr(e, n, t) {
  const r = this,
    i = { tokenize: A, partial: !0 },
    a = { tokenize: k, partial: !0 },
    l = this.events[this.events.length - 1],
    o =
      l && l[1].type === "linePrefix"
        ? l[2].sliceSerialize(l[1], !0).length
        : 0;
  let s = 0,
    u;
  return p;
  function p(y) {
    return (
      e.enter("codeFenced"),
      e.enter("codeFencedFence"),
      e.enter("codeFencedFenceSequence"),
      (u = y),
      g(y)
    );
  }
  function g(y) {
    return y === u
      ? (e.consume(y), s++, g)
      : (e.exit("codeFencedFenceSequence"),
        s < 3 ? t(y) : M(e, f, "whitespace")(y));
  }
  function f(y) {
    return y === null || E(y)
      ? v(y)
      : (e.enter("codeFencedFenceInfo"),
        e.enter("chunkString", { contentType: "string" }),
        x(y));
  }
  function x(y) {
    return y === null || G(y)
      ? (e.exit("chunkString"),
        e.exit("codeFencedFenceInfo"),
        M(e, m, "whitespace")(y))
      : y === 96 && y === u
      ? t(y)
      : (e.consume(y), x);
  }
  function m(y) {
    return y === null || E(y)
      ? v(y)
      : (e.enter("codeFencedFenceMeta"),
        e.enter("chunkString", { contentType: "string" }),
        S(y));
  }
  function S(y) {
    return y === null || E(y)
      ? (e.exit("chunkString"), e.exit("codeFencedFenceMeta"), v(y))
      : y === 96 && y === u
      ? t(y)
      : (e.consume(y), S);
  }
  function v(y) {
    return e.exit("codeFencedFence"), r.interrupt ? n(y) : d(y);
  }
  function d(y) {
    return y === null
      ? F(y)
      : E(y)
      ? e.attempt(
          a,
          e.attempt(i, F, o ? M(e, d, "linePrefix", o + 1) : d),
          F
        )(y)
      : (e.enter("codeFlowValue"), w(y));
  }
  function w(y) {
    return y === null || E(y)
      ? (e.exit("codeFlowValue"), d(y))
      : (e.consume(y), w);
  }
  function F(y) {
    return e.exit("codeFenced"), n(y);
  }
  function k(y, C, R) {
    const I = this;
    return _;
    function _(U) {
      return y.enter("lineEnding"), y.consume(U), y.exit("lineEnding"), T;
    }
    function T(U) {
      return I.parser.lazy[I.now().line] ? R(U) : C(U);
    }
  }
  function A(y, C, R) {
    let I = 0;
    return M(
      y,
      _,
      "linePrefix",
      this.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
    );
    function _(z) {
      return (
        y.enter("codeFencedFence"), y.enter("codeFencedFenceSequence"), T(z)
      );
    }
    function T(z) {
      return z === u
        ? (y.consume(z), I++, T)
        : I < s
        ? R(z)
        : (y.exit("codeFencedFenceSequence"), M(y, U, "whitespace")(z));
    }
    function U(z) {
      return z === null || E(z) ? (y.exit("codeFencedFence"), C(z)) : R(z);
    }
  }
}
var je = { name: "codeIndented", tokenize: Lr },
  Cr = { tokenize: Or, partial: !0 };
function Lr(e, n, t) {
  const r = this;
  return i;
  function i(u) {
    return e.enter("codeIndented"), M(e, a, "linePrefix", 4 + 1)(u);
  }
  function a(u) {
    const p = r.events[r.events.length - 1];
    return p &&
      p[1].type === "linePrefix" &&
      p[2].sliceSerialize(p[1], !0).length >= 4
      ? l(u)
      : t(u);
  }
  function l(u) {
    return u === null
      ? s(u)
      : E(u)
      ? e.attempt(Cr, l, s)(u)
      : (e.enter("codeFlowValue"), o(u));
  }
  function o(u) {
    return u === null || E(u)
      ? (e.exit("codeFlowValue"), l(u))
      : (e.consume(u), o);
  }
  function s(u) {
    return e.exit("codeIndented"), n(u);
  }
}
function Or(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return r.parser.lazy[r.now().line]
      ? t(l)
      : E(l)
      ? (e.enter("lineEnding"), e.consume(l), e.exit("lineEnding"), i)
      : M(e, a, "linePrefix", 4 + 1)(l);
  }
  function a(l) {
    const o = r.events[r.events.length - 1];
    return o &&
      o[1].type === "linePrefix" &&
      o[2].sliceSerialize(o[1], !0).length >= 4
      ? n(l)
      : E(l)
      ? i(l)
      : t(l);
  }
}
var Er = { name: "codeText", tokenize: Fr, resolve: Pr, previous: Ar };
function Pr(e) {
  let n = e.length - 4,
    t = 3,
    r,
    i;
  if (
    (e[t][1].type === "lineEnding" || e[t][1].type === "space") &&
    (e[n][1].type === "lineEnding" || e[n][1].type === "space")
  ) {
    for (r = t; ++r < n; )
      if (e[r][1].type === "codeTextData") {
        (e[t][1].type = "codeTextPadding"),
          (e[n][1].type = "codeTextPadding"),
          (t += 2),
          (n -= 2);
        break;
      }
  }
  for (r = t - 1, n++; ++r <= n; )
    i === void 0
      ? r !== n && e[r][1].type !== "lineEnding" && (i = r)
      : (r === n || e[r][1].type === "lineEnding") &&
        ((e[i][1].type = "codeTextData"),
        r !== i + 2 &&
          ((e[i][1].end = e[r - 1][1].end),
          e.splice(i + 2, r - i - 2),
          (n -= r - i - 2),
          (r = i + 2)),
        (i = void 0));
  return e;
}
function Ar(e) {
  return (
    e !== 96 ||
    this.events[this.events.length - 1][1].type === "characterEscape"
  );
}
function Fr(e, n, t) {
  let r = 0,
    i,
    a;
  return l;
  function l(g) {
    return e.enter("codeText"), e.enter("codeTextSequence"), o(g);
  }
  function o(g) {
    return g === 96
      ? (e.consume(g), r++, o)
      : (e.exit("codeTextSequence"), s(g));
  }
  function s(g) {
    return g === null
      ? t(g)
      : g === 96
      ? ((a = e.enter("codeTextSequence")), (i = 0), p(g))
      : g === 32
      ? (e.enter("space"), e.consume(g), e.exit("space"), s)
      : E(g)
      ? (e.enter("lineEnding"), e.consume(g), e.exit("lineEnding"), s)
      : (e.enter("codeTextData"), u(g));
  }
  function u(g) {
    return g === null || g === 32 || g === 96 || E(g)
      ? (e.exit("codeTextData"), s(g))
      : (e.consume(g), u);
  }
  function p(g) {
    return g === 96
      ? (e.consume(g), i++, p)
      : i === r
      ? (e.exit("codeTextSequence"), e.exit("codeText"), n(g))
      : ((a.type = "codeTextData"), u(g));
  }
}
function qn(e, n, t, r, i, a, l, o, s) {
  const u = s || Number.POSITIVE_INFINITY;
  let p = 0;
  return g;
  function g(d) {
    return d === 60
      ? (e.enter(r), e.enter(i), e.enter(a), e.consume(d), e.exit(a), f)
      : d === null || d === 41 || Je(d)
      ? t(d)
      : (e.enter(r),
        e.enter(l),
        e.enter(o),
        e.enter("chunkString", { contentType: "string" }),
        S(d));
  }
  function f(d) {
    return d === 62
      ? (e.enter(a), e.consume(d), e.exit(a), e.exit(i), e.exit(r), n)
      : (e.enter(o), e.enter("chunkString", { contentType: "string" }), x(d));
  }
  function x(d) {
    return d === 62
      ? (e.exit("chunkString"), e.exit(o), f(d))
      : d === null || d === 60 || E(d)
      ? t(d)
      : (e.consume(d), d === 92 ? m : x);
  }
  function m(d) {
    return d === 60 || d === 62 || d === 92 ? (e.consume(d), x) : x(d);
  }
  function S(d) {
    return d === 40
      ? ++p > u
        ? t(d)
        : (e.consume(d), S)
      : d === 41
      ? p--
        ? (e.consume(d), S)
        : (e.exit("chunkString"), e.exit(o), e.exit(l), e.exit(r), n(d))
      : d === null || G(d)
      ? p
        ? t(d)
        : (e.exit("chunkString"), e.exit(o), e.exit(l), e.exit(r), n(d))
      : Je(d)
      ? t(d)
      : (e.consume(d), d === 92 ? v : S);
  }
  function v(d) {
    return d === 40 || d === 41 || d === 92 ? (e.consume(d), S) : S(d);
  }
}
function Wn(e, n, t, r, i, a) {
  const l = this;
  let o = 0,
    s;
  return u;
  function u(x) {
    return e.enter(r), e.enter(i), e.consume(x), e.exit(i), e.enter(a), p;
  }
  function p(x) {
    return x === null ||
      x === 91 ||
      (x === 93 && !s) ||
      (x === 94 && !o && "_hiddenFootnoteSupport" in l.parser.constructs) ||
      o > 999
      ? t(x)
      : x === 93
      ? (e.exit(a), e.enter(i), e.consume(x), e.exit(i), e.exit(r), n)
      : E(x)
      ? (e.enter("lineEnding"), e.consume(x), e.exit("lineEnding"), p)
      : (e.enter("chunkString", { contentType: "string" }), g(x));
  }
  function g(x) {
    return x === null || x === 91 || x === 93 || E(x) || o++ > 999
      ? (e.exit("chunkString"), p(x))
      : (e.consume(x), (s = s || !$(x)), x === 92 ? f : g);
  }
  function f(x) {
    return x === 91 || x === 92 || x === 93 ? (e.consume(x), o++, g) : g(x);
  }
}
function Jn(e, n, t, r, i, a) {
  let l;
  return o;
  function o(f) {
    return (
      e.enter(r),
      e.enter(i),
      e.consume(f),
      e.exit(i),
      (l = f === 40 ? 41 : f),
      s
    );
  }
  function s(f) {
    return f === l
      ? (e.enter(i), e.consume(f), e.exit(i), e.exit(r), n)
      : (e.enter(a), u(f));
  }
  function u(f) {
    return f === l
      ? (e.exit(a), s(l))
      : f === null
      ? t(f)
      : E(f)
      ? (e.enter("lineEnding"),
        e.consume(f),
        e.exit("lineEnding"),
        M(e, u, "linePrefix"))
      : (e.enter("chunkString", { contentType: "string" }), p(f));
  }
  function p(f) {
    return f === l || f === null || E(f)
      ? (e.exit("chunkString"), u(f))
      : (e.consume(f), f === 92 ? g : p);
  }
  function g(f) {
    return f === l || f === 92 ? (e.consume(f), p) : p(f);
  }
}
function xe(e, n) {
  let t;
  return r;
  function r(i) {
    return E(i)
      ? (e.enter("lineEnding"), e.consume(i), e.exit("lineEnding"), (t = !0), r)
      : $(i)
      ? M(e, r, t ? "linePrefix" : "lineSuffix")(i)
      : n(i);
  }
}
function tn(e) {
  return e
    .replace(/[\t\n\r ]+/g, " ")
    .replace(/^ | $/g, "")
    .toLowerCase()
    .toUpperCase();
}
var Rr = { name: "definition", tokenize: Dr },
  Ir = { tokenize: Tr, partial: !0 };
function Dr(e, n, t) {
  const r = this;
  let i;
  return a;
  function a(s) {
    return (
      e.enter("definition"),
      Wn.call(
        r,
        e,
        l,
        t,
        "definitionLabel",
        "definitionLabelMarker",
        "definitionLabelString"
      )(s)
    );
  }
  function l(s) {
    return (
      (i = tn(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))),
      s === 58
        ? (e.enter("definitionMarker"),
          e.consume(s),
          e.exit("definitionMarker"),
          xe(
            e,
            qn(
              e,
              e.attempt(Ir, M(e, o, "whitespace"), M(e, o, "whitespace")),
              t,
              "definitionDestination",
              "definitionDestinationLiteral",
              "definitionDestinationLiteralMarker",
              "definitionDestinationRaw",
              "definitionDestinationString"
            )
          ))
        : t(s)
    );
  }
  function o(s) {
    return s === null || E(s)
      ? (e.exit("definition"),
        r.parser.defined.includes(i) || r.parser.defined.push(i),
        n(s))
      : t(s);
  }
}
function Tr(e, n, t) {
  return r;
  function r(l) {
    return G(l) ? xe(e, i)(l) : t(l);
  }
  function i(l) {
    return l === 34 || l === 39 || l === 40
      ? Jn(
          e,
          M(e, a, "whitespace"),
          t,
          "definitionTitle",
          "definitionTitleMarker",
          "definitionTitleString"
        )(l)
      : t(l);
  }
  function a(l) {
    return l === null || E(l) ? n(l) : t(l);
  }
}
var zr = { name: "hardBreakEscape", tokenize: Nr };
function Nr(e, n, t) {
  return r;
  function r(a) {
    return e.enter("hardBreakEscape"), e.enter("escapeMarker"), e.consume(a), i;
  }
  function i(a) {
    return E(a)
      ? (e.exit("escapeMarker"), e.exit("hardBreakEscape"), n(a))
      : t(a);
  }
}
var Mr = { name: "headingAtx", tokenize: Br, resolve: jr };
function jr(e, n) {
  let t = e.length - 2,
    r = 3,
    i,
    a;
  return (
    e[r][1].type === "whitespace" && (r += 2),
    t - 2 > r && e[t][1].type === "whitespace" && (t -= 2),
    e[t][1].type === "atxHeadingSequence" &&
      (r === t - 1 || (t - 4 > r && e[t - 2][1].type === "whitespace")) &&
      (t -= r + 1 === t ? 2 : 4),
    t > r &&
      ((i = { type: "atxHeadingText", start: e[r][1].start, end: e[t][1].end }),
      (a = {
        type: "chunkText",
        start: e[r][1].start,
        end: e[t][1].end,
        contentType: "text",
      }),
      ze(e, r, t - r + 1, [
        ["enter", i, n],
        ["enter", a, n],
        ["exit", a, n],
        ["exit", i, n],
      ])),
    e
  );
}
function Br(e, n, t) {
  const r = this;
  let i = 0;
  return a;
  function a(p) {
    return e.enter("atxHeading"), e.enter("atxHeadingSequence"), l(p);
  }
  function l(p) {
    return p === 35 && i++ < 6
      ? (e.consume(p), l)
      : p === null || G(p)
      ? (e.exit("atxHeadingSequence"), r.interrupt ? n(p) : o(p))
      : t(p);
  }
  function o(p) {
    return p === 35
      ? (e.enter("atxHeadingSequence"), s(p))
      : p === null || E(p)
      ? (e.exit("atxHeading"), n(p))
      : $(p)
      ? M(e, o, "whitespace")(p)
      : (e.enter("atxHeadingText"), u(p));
  }
  function s(p) {
    return p === 35 ? (e.consume(p), s) : (e.exit("atxHeadingSequence"), o(p));
  }
  function u(p) {
    return p === null || p === 35 || G(p)
      ? (e.exit("atxHeadingText"), o(p))
      : (e.consume(p), u);
  }
}
var $r = [
    "address",
    "article",
    "aside",
    "base",
    "basefont",
    "blockquote",
    "body",
    "caption",
    "center",
    "col",
    "colgroup",
    "dd",
    "details",
    "dialog",
    "dir",
    "div",
    "dl",
    "dt",
    "fieldset",
    "figcaption",
    "figure",
    "footer",
    "form",
    "frame",
    "frameset",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "head",
    "header",
    "hr",
    "html",
    "iframe",
    "legend",
    "li",
    "link",
    "main",
    "menu",
    "menuitem",
    "nav",
    "noframes",
    "ol",
    "optgroup",
    "option",
    "p",
    "param",
    "section",
    "summary",
    "table",
    "tbody",
    "td",
    "tfoot",
    "th",
    "thead",
    "title",
    "tr",
    "track",
    "ul",
  ],
  Sn = ["pre", "script", "style", "textarea"],
  Vr = { name: "htmlFlow", tokenize: Hr, resolveTo: Ur, concrete: !0 },
  _r = { tokenize: Kr, partial: !0 };
function Ur(e) {
  let n = e.length;
  for (; n-- && !(e[n][0] === "enter" && e[n][1].type === "htmlFlow"); );
  return (
    n > 1 &&
      e[n - 2][1].type === "linePrefix" &&
      ((e[n][1].start = e[n - 2][1].start),
      (e[n + 1][1].start = e[n - 2][1].start),
      e.splice(n - 2, 2)),
    e
  );
}
function Hr(e, n, t) {
  const r = this;
  let i, a, l, o, s;
  return u;
  function u(c) {
    return e.enter("htmlFlow"), e.enter("htmlFlowData"), e.consume(c), p;
  }
  function p(c) {
    return c === 33
      ? (e.consume(c), g)
      : c === 47
      ? (e.consume(c), m)
      : c === 63
      ? (e.consume(c), (i = 3), r.interrupt ? n : Q)
      : re(c)
      ? (e.consume(c), (l = String.fromCharCode(c)), (a = !0), S)
      : t(c);
  }
  function g(c) {
    return c === 45
      ? (e.consume(c), (i = 2), f)
      : c === 91
      ? (e.consume(c), (i = 5), (l = "CDATA["), (o = 0), x)
      : re(c)
      ? (e.consume(c), (i = 4), r.interrupt ? n : Q)
      : t(c);
  }
  function f(c) {
    return c === 45 ? (e.consume(c), r.interrupt ? n : Q) : t(c);
  }
  function x(c) {
    return c === l.charCodeAt(o++)
      ? (e.consume(c), o === l.length ? (r.interrupt ? n : T) : x)
      : t(c);
  }
  function m(c) {
    return re(c) ? (e.consume(c), (l = String.fromCharCode(c)), S) : t(c);
  }
  function S(c) {
    return c === null || c === 47 || c === 62 || G(c)
      ? c !== 47 && a && Sn.includes(l.toLowerCase())
        ? ((i = 1), r.interrupt ? n(c) : T(c))
        : $r.includes(l.toLowerCase())
        ? ((i = 6), c === 47 ? (e.consume(c), v) : r.interrupt ? n(c) : T(c))
        : ((i = 7),
          r.interrupt && !r.parser.lazy[r.now().line] ? t(c) : a ? w(c) : d(c))
      : c === 45 || ee(c)
      ? (e.consume(c), (l += String.fromCharCode(c)), S)
      : t(c);
  }
  function v(c) {
    return c === 62 ? (e.consume(c), r.interrupt ? n : T) : t(c);
  }
  function d(c) {
    return $(c) ? (e.consume(c), d) : I(c);
  }
  function w(c) {
    return c === 47
      ? (e.consume(c), I)
      : c === 58 || c === 95 || re(c)
      ? (e.consume(c), F)
      : $(c)
      ? (e.consume(c), w)
      : I(c);
  }
  function F(c) {
    return c === 45 || c === 46 || c === 58 || c === 95 || ee(c)
      ? (e.consume(c), F)
      : k(c);
  }
  function k(c) {
    return c === 61 ? (e.consume(c), A) : $(c) ? (e.consume(c), k) : w(c);
  }
  function A(c) {
    return c === null || c === 60 || c === 61 || c === 62 || c === 96
      ? t(c)
      : c === 34 || c === 39
      ? (e.consume(c), (s = c), y)
      : $(c)
      ? (e.consume(c), A)
      : ((s = null), C(c));
  }
  function y(c) {
    return c === null || E(c)
      ? t(c)
      : c === s
      ? (e.consume(c), R)
      : (e.consume(c), y);
  }
  function C(c) {
    return c === null ||
      c === 34 ||
      c === 39 ||
      c === 60 ||
      c === 61 ||
      c === 62 ||
      c === 96 ||
      G(c)
      ? k(c)
      : (e.consume(c), C);
  }
  function R(c) {
    return c === 47 || c === 62 || $(c) ? w(c) : t(c);
  }
  function I(c) {
    return c === 62 ? (e.consume(c), _) : t(c);
  }
  function _(c) {
    return $(c) ? (e.consume(c), _) : c === null || E(c) ? T(c) : t(c);
  }
  function T(c) {
    return c === 45 && i === 2
      ? (e.consume(c), P)
      : c === 60 && i === 1
      ? (e.consume(c), L)
      : c === 62 && i === 4
      ? (e.consume(c), K)
      : c === 63 && i === 3
      ? (e.consume(c), Q)
      : c === 93 && i === 5
      ? (e.consume(c), j)
      : E(c) && (i === 6 || i === 7)
      ? e.check(_r, K, U)(c)
      : c === null || E(c)
      ? U(c)
      : (e.consume(c), T);
  }
  function U(c) {
    return e.exit("htmlFlowData"), z(c);
  }
  function z(c) {
    return c === null
      ? h(c)
      : E(c)
      ? e.attempt({ tokenize: J, partial: !0 }, z, h)(c)
      : (e.enter("htmlFlowData"), T(c));
  }
  function J(c, lt, ot) {
    return st;
    function st(we) {
      return c.enter("lineEnding"), c.consume(we), c.exit("lineEnding"), ut;
    }
    function ut(we) {
      return r.parser.lazy[r.now().line] ? ot(we) : lt(we);
    }
  }
  function P(c) {
    return c === 45 ? (e.consume(c), Q) : T(c);
  }
  function L(c) {
    return c === 47 ? (e.consume(c), (l = ""), D) : T(c);
  }
  function D(c) {
    return c === 62 && Sn.includes(l.toLowerCase())
      ? (e.consume(c), K)
      : re(c) && l.length < 8
      ? (e.consume(c), (l += String.fromCharCode(c)), D)
      : T(c);
  }
  function j(c) {
    return c === 93 ? (e.consume(c), Q) : T(c);
  }
  function Q(c) {
    return c === 62
      ? (e.consume(c), K)
      : c === 45 && i === 2
      ? (e.consume(c), Q)
      : T(c);
  }
  function K(c) {
    return c === null || E(c)
      ? (e.exit("htmlFlowData"), h(c))
      : (e.consume(c), K);
  }
  function h(c) {
    return e.exit("htmlFlow"), n(c);
  }
}
function Kr(e, n, t) {
  return r;
  function r(i) {
    return (
      e.exit("htmlFlowData"),
      e.enter("lineEndingBlank"),
      e.consume(i),
      e.exit("lineEndingBlank"),
      e.attempt(nn, n, t)
    );
  }
}
var qr = { name: "htmlText", tokenize: Wr };
function Wr(e, n, t) {
  const r = this;
  let i, a, l, o;
  return s;
  function s(h) {
    return e.enter("htmlText"), e.enter("htmlTextData"), e.consume(h), u;
  }
  function u(h) {
    return h === 33
      ? (e.consume(h), p)
      : h === 47
      ? (e.consume(h), C)
      : h === 63
      ? (e.consume(h), A)
      : re(h)
      ? (e.consume(h), _)
      : t(h);
  }
  function p(h) {
    return h === 45
      ? (e.consume(h), g)
      : h === 91
      ? (e.consume(h), (a = "CDATA["), (l = 0), v)
      : re(h)
      ? (e.consume(h), k)
      : t(h);
  }
  function g(h) {
    return h === 45 ? (e.consume(h), f) : t(h);
  }
  function f(h) {
    return h === null || h === 62 ? t(h) : h === 45 ? (e.consume(h), x) : m(h);
  }
  function x(h) {
    return h === null || h === 62 ? t(h) : m(h);
  }
  function m(h) {
    return h === null
      ? t(h)
      : h === 45
      ? (e.consume(h), S)
      : E(h)
      ? ((o = m), j(h))
      : (e.consume(h), m);
  }
  function S(h) {
    return h === 45 ? (e.consume(h), K) : m(h);
  }
  function v(h) {
    return h === a.charCodeAt(l++)
      ? (e.consume(h), l === a.length ? d : v)
      : t(h);
  }
  function d(h) {
    return h === null
      ? t(h)
      : h === 93
      ? (e.consume(h), w)
      : E(h)
      ? ((o = d), j(h))
      : (e.consume(h), d);
  }
  function w(h) {
    return h === 93 ? (e.consume(h), F) : d(h);
  }
  function F(h) {
    return h === 62 ? K(h) : h === 93 ? (e.consume(h), F) : d(h);
  }
  function k(h) {
    return h === null || h === 62
      ? K(h)
      : E(h)
      ? ((o = k), j(h))
      : (e.consume(h), k);
  }
  function A(h) {
    return h === null
      ? t(h)
      : h === 63
      ? (e.consume(h), y)
      : E(h)
      ? ((o = A), j(h))
      : (e.consume(h), A);
  }
  function y(h) {
    return h === 62 ? K(h) : A(h);
  }
  function C(h) {
    return re(h) ? (e.consume(h), R) : t(h);
  }
  function R(h) {
    return h === 45 || ee(h) ? (e.consume(h), R) : I(h);
  }
  function I(h) {
    return E(h) ? ((o = I), j(h)) : $(h) ? (e.consume(h), I) : K(h);
  }
  function _(h) {
    return h === 45 || ee(h)
      ? (e.consume(h), _)
      : h === 47 || h === 62 || G(h)
      ? T(h)
      : t(h);
  }
  function T(h) {
    return h === 47
      ? (e.consume(h), K)
      : h === 58 || h === 95 || re(h)
      ? (e.consume(h), U)
      : E(h)
      ? ((o = T), j(h))
      : $(h)
      ? (e.consume(h), T)
      : K(h);
  }
  function U(h) {
    return h === 45 || h === 46 || h === 58 || h === 95 || ee(h)
      ? (e.consume(h), U)
      : z(h);
  }
  function z(h) {
    return h === 61
      ? (e.consume(h), J)
      : E(h)
      ? ((o = z), j(h))
      : $(h)
      ? (e.consume(h), z)
      : T(h);
  }
  function J(h) {
    return h === null || h === 60 || h === 61 || h === 62 || h === 96
      ? t(h)
      : h === 34 || h === 39
      ? (e.consume(h), (i = h), P)
      : E(h)
      ? ((o = J), j(h))
      : $(h)
      ? (e.consume(h), J)
      : (e.consume(h), (i = void 0), D);
  }
  function P(h) {
    return h === i
      ? (e.consume(h), L)
      : h === null
      ? t(h)
      : E(h)
      ? ((o = P), j(h))
      : (e.consume(h), P);
  }
  function L(h) {
    return h === 62 || h === 47 || G(h) ? T(h) : t(h);
  }
  function D(h) {
    return h === null ||
      h === 34 ||
      h === 39 ||
      h === 60 ||
      h === 61 ||
      h === 96
      ? t(h)
      : h === 62 || G(h)
      ? T(h)
      : (e.consume(h), D);
  }
  function j(h) {
    return (
      e.exit("htmlTextData"),
      e.enter("lineEnding"),
      e.consume(h),
      e.exit("lineEnding"),
      M(
        e,
        Q,
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )
    );
  }
  function Q(h) {
    return e.enter("htmlTextData"), o(h);
  }
  function K(h) {
    return h === 62
      ? (e.consume(h), e.exit("htmlTextData"), e.exit("htmlText"), n)
      : t(h);
  }
}
var rn = { name: "labelEnd", tokenize: Zr, resolveTo: Xr, resolveAll: Gr },
  Jr = { tokenize: ei },
  Yr = { tokenize: ni },
  Qr = { tokenize: ti };
function Gr(e) {
  let n = -1,
    t;
  for (; ++n < e.length; )
    (t = e[n][1]),
      (t.type === "labelImage" ||
        t.type === "labelLink" ||
        t.type === "labelEnd") &&
        (e.splice(n + 1, t.type === "labelImage" ? 4 : 2),
        (t.type = "data"),
        n++);
  return e;
}
function Xr(e, n) {
  let t = e.length,
    r = 0,
    i,
    a,
    l,
    o;
  for (; t--; )
    if (((i = e[t][1]), a)) {
      if (i.type === "link" || (i.type === "labelLink" && i._inactive)) break;
      e[t][0] === "enter" && i.type === "labelLink" && (i._inactive = !0);
    } else if (l) {
      if (
        e[t][0] === "enter" &&
        (i.type === "labelImage" || i.type === "labelLink") &&
        !i._balanced &&
        ((a = t), i.type !== "labelLink")
      ) {
        r = 2;
        break;
      }
    } else i.type === "labelEnd" && (l = t);
  const s = {
      type: e[a][1].type === "labelLink" ? "link" : "image",
      start: Object.assign({}, e[a][1].start),
      end: Object.assign({}, e[e.length - 1][1].end),
    },
    u = {
      type: "label",
      start: Object.assign({}, e[a][1].start),
      end: Object.assign({}, e[l][1].end),
    },
    p = {
      type: "labelText",
      start: Object.assign({}, e[a + r + 2][1].end),
      end: Object.assign({}, e[l - 2][1].start),
    };
  return (
    (o = [
      ["enter", s, n],
      ["enter", u, n],
    ]),
    (o = Z(o, e.slice(a + 1, a + r + 3))),
    (o = Z(o, [["enter", p, n]])),
    (o = Z(
      o,
      _n(n.parser.constructs.insideSpan.null, e.slice(a + r + 4, l - 3), n)
    )),
    (o = Z(o, [["exit", p, n], e[l - 2], e[l - 1], ["exit", u, n]])),
    (o = Z(o, e.slice(l + 1))),
    (o = Z(o, [["exit", s, n]])),
    ze(e, a, e.length, o),
    e
  );
}
function Zr(e, n, t) {
  const r = this;
  let i = r.events.length,
    a,
    l;
  for (; i--; )
    if (
      (r.events[i][1].type === "labelImage" ||
        r.events[i][1].type === "labelLink") &&
      !r.events[i][1]._balanced
    ) {
      a = r.events[i][1];
      break;
    }
  return o;
  function o(p) {
    return a
      ? a._inactive
        ? u(p)
        : ((l = r.parser.defined.includes(
            tn(r.sliceSerialize({ start: a.end, end: r.now() }))
          )),
          e.enter("labelEnd"),
          e.enter("labelMarker"),
          e.consume(p),
          e.exit("labelMarker"),
          e.exit("labelEnd"),
          s)
      : t(p);
  }
  function s(p) {
    return p === 40
      ? e.attempt(Jr, n, l ? n : u)(p)
      : p === 91
      ? e.attempt(Yr, n, l ? e.attempt(Qr, n, u) : u)(p)
      : l
      ? n(p)
      : u(p);
  }
  function u(p) {
    return (a._balanced = !0), t(p);
  }
}
function ei(e, n, t) {
  return r;
  function r(s) {
    return (
      e.enter("resource"),
      e.enter("resourceMarker"),
      e.consume(s),
      e.exit("resourceMarker"),
      xe(e, i)
    );
  }
  function i(s) {
    return s === 41
      ? o(s)
      : qn(
          e,
          a,
          t,
          "resourceDestination",
          "resourceDestinationLiteral",
          "resourceDestinationLiteralMarker",
          "resourceDestinationRaw",
          "resourceDestinationString",
          32
        )(s);
  }
  function a(s) {
    return G(s) ? xe(e, l)(s) : o(s);
  }
  function l(s) {
    return s === 34 || s === 39 || s === 40
      ? Jn(
          e,
          xe(e, o),
          t,
          "resourceTitle",
          "resourceTitleMarker",
          "resourceTitleString"
        )(s)
      : o(s);
  }
  function o(s) {
    return s === 41
      ? (e.enter("resourceMarker"),
        e.consume(s),
        e.exit("resourceMarker"),
        e.exit("resource"),
        n)
      : t(s);
  }
}
function ni(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return Wn.call(
      r,
      e,
      a,
      t,
      "reference",
      "referenceMarker",
      "referenceString"
    )(l);
  }
  function a(l) {
    return r.parser.defined.includes(
      tn(r.sliceSerialize(r.events[r.events.length - 1][1]).slice(1, -1))
    )
      ? n(l)
      : t(l);
  }
}
function ti(e, n, t) {
  return r;
  function r(a) {
    return (
      e.enter("reference"),
      e.enter("referenceMarker"),
      e.consume(a),
      e.exit("referenceMarker"),
      i
    );
  }
  function i(a) {
    return a === 93
      ? (e.enter("referenceMarker"),
        e.consume(a),
        e.exit("referenceMarker"),
        e.exit("reference"),
        n)
      : t(a);
  }
}
var ri = { name: "labelStartImage", tokenize: ii, resolveAll: rn.resolveAll };
function ii(e, n, t) {
  const r = this;
  return i;
  function i(o) {
    return (
      e.enter("labelImage"),
      e.enter("labelImageMarker"),
      e.consume(o),
      e.exit("labelImageMarker"),
      a
    );
  }
  function a(o) {
    return o === 91
      ? (e.enter("labelMarker"),
        e.consume(o),
        e.exit("labelMarker"),
        e.exit("labelImage"),
        l)
      : t(o);
  }
  function l(o) {
    return o === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? t(o)
      : n(o);
  }
}
var ai = { name: "labelStartLink", tokenize: li, resolveAll: rn.resolveAll };
function li(e, n, t) {
  const r = this;
  return i;
  function i(l) {
    return (
      e.enter("labelLink"),
      e.enter("labelMarker"),
      e.consume(l),
      e.exit("labelMarker"),
      e.exit("labelLink"),
      a
    );
  }
  function a(l) {
    return l === 94 && "_hiddenFootnoteSupport" in r.parser.constructs
      ? t(l)
      : n(l);
  }
}
var Be = { name: "lineEnding", tokenize: oi };
function oi(e, n) {
  return t;
  function t(r) {
    return (
      e.enter("lineEnding"),
      e.consume(r),
      e.exit("lineEnding"),
      M(e, n, "linePrefix")
    );
  }
}
var Le = { name: "thematicBreak", tokenize: si };
function si(e, n, t) {
  let r = 0,
    i;
  return a;
  function a(s) {
    return e.enter("thematicBreak"), (i = s), l(s);
  }
  function l(s) {
    return s === i
      ? (e.enter("thematicBreakSequence"), o(s))
      : $(s)
      ? M(e, l, "whitespace")(s)
      : r < 3 || (s !== null && !E(s))
      ? t(s)
      : (e.exit("thematicBreak"), n(s));
  }
  function o(s) {
    return s === i
      ? (e.consume(s), r++, o)
      : (e.exit("thematicBreakSequence"), l(s));
  }
}
var q = {
    name: "list",
    tokenize: ci,
    continuation: { tokenize: hi },
    exit: gi,
  },
  ui = { tokenize: di, partial: !0 },
  pi = { tokenize: fi, partial: !0 };
function ci(e, n, t) {
  const r = this,
    i = r.events[r.events.length - 1];
  let a =
      i && i[1].type === "linePrefix"
        ? i[2].sliceSerialize(i[1], !0).length
        : 0,
    l = 0;
  return o;
  function o(x) {
    const m =
      r.containerState.type ||
      (x === 42 || x === 43 || x === 45 ? "listUnordered" : "listOrdered");
    if (
      m === "listUnordered"
        ? !r.containerState.marker || x === r.containerState.marker
        : We(x)
    ) {
      if (
        (r.containerState.type ||
          ((r.containerState.type = m), e.enter(m, { _container: !0 })),
        m === "listUnordered")
      )
        return (
          e.enter("listItemPrefix"),
          x === 42 || x === 45 ? e.check(Le, t, u)(x) : u(x)
        );
      if (!r.interrupt || x === 49)
        return e.enter("listItemPrefix"), e.enter("listItemValue"), s(x);
    }
    return t(x);
  }
  function s(x) {
    return We(x) && ++l < 10
      ? (e.consume(x), s)
      : (!r.interrupt || l < 2) &&
        (r.containerState.marker
          ? x === r.containerState.marker
          : x === 41 || x === 46)
      ? (e.exit("listItemValue"), u(x))
      : t(x);
  }
  function u(x) {
    return (
      e.enter("listItemMarker"),
      e.consume(x),
      e.exit("listItemMarker"),
      (r.containerState.marker = r.containerState.marker || x),
      e.check(nn, r.interrupt ? t : p, e.attempt(ui, f, g))
    );
  }
  function p(x) {
    return (r.containerState.initialBlankLine = !0), a++, f(x);
  }
  function g(x) {
    return $(x)
      ? (e.enter("listItemPrefixWhitespace"),
        e.consume(x),
        e.exit("listItemPrefixWhitespace"),
        f)
      : t(x);
  }
  function f(x) {
    return (
      (r.containerState.size =
        a + r.sliceSerialize(e.exit("listItemPrefix"), !0).length),
      n(x)
    );
  }
}
function hi(e, n, t) {
  const r = this;
  return (r.containerState._closeFlow = void 0), e.check(nn, i, a);
  function i(o) {
    return (
      (r.containerState.furtherBlankLines =
        r.containerState.furtherBlankLines ||
        r.containerState.initialBlankLine),
      M(e, n, "listItemIndent", r.containerState.size + 1)(o)
    );
  }
  function a(o) {
    return r.containerState.furtherBlankLines || !$(o)
      ? ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        l(o))
      : ((r.containerState.furtherBlankLines = void 0),
        (r.containerState.initialBlankLine = void 0),
        e.attempt(pi, n, l)(o));
  }
  function l(o) {
    return (
      (r.containerState._closeFlow = !0),
      (r.interrupt = void 0),
      M(
        e,
        e.attempt(q, n, t),
        "linePrefix",
        r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4
      )(o)
    );
  }
}
function fi(e, n, t) {
  const r = this;
  return M(e, i, "listItemIndent", r.containerState.size + 1);
  function i(a) {
    const l = r.events[r.events.length - 1];
    return l &&
      l[1].type === "listItemIndent" &&
      l[2].sliceSerialize(l[1], !0).length === r.containerState.size
      ? n(a)
      : t(a);
  }
}
function gi(e) {
  e.exit(this.containerState.type);
}
function di(e, n, t) {
  const r = this;
  return M(
    e,
    i,
    "listItemPrefixWhitespace",
    r.parser.constructs.disable.null.includes("codeIndented") ? void 0 : 4 + 1
  );
  function i(a) {
    const l = r.events[r.events.length - 1];
    return !$(a) && l && l[1].type === "listItemPrefixWhitespace" ? n(a) : t(a);
  }
}
var vn = { name: "setextUnderline", tokenize: xi, resolveTo: mi };
function mi(e, n) {
  let t = e.length,
    r,
    i,
    a;
  for (; t--; )
    if (e[t][0] === "enter") {
      if (e[t][1].type === "content") {
        r = t;
        break;
      }
      e[t][1].type === "paragraph" && (i = t);
    } else
      e[t][1].type === "content" && e.splice(t, 1),
        !a && e[t][1].type === "definition" && (a = t);
  const l = {
    type: "setextHeading",
    start: Object.assign({}, e[i][1].start),
    end: Object.assign({}, e[e.length - 1][1].end),
  };
  return (
    (e[i][1].type = "setextHeadingText"),
    a
      ? (e.splice(i, 0, ["enter", l, n]),
        e.splice(a + 1, 0, ["exit", e[r][1], n]),
        (e[r][1].end = Object.assign({}, e[a][1].end)))
      : (e[r][1] = l),
    e.push(["exit", l, n]),
    e
  );
}
function xi(e, n, t) {
  const r = this;
  let i = r.events.length,
    a,
    l;
  for (; i--; )
    if (
      r.events[i][1].type !== "lineEnding" &&
      r.events[i][1].type !== "linePrefix" &&
      r.events[i][1].type !== "content"
    ) {
      l = r.events[i][1].type === "paragraph";
      break;
    }
  return o;
  function o(p) {
    return !r.parser.lazy[r.now().line] && (r.interrupt || l)
      ? (e.enter("setextHeadingLine"),
        e.enter("setextHeadingLineSequence"),
        (a = p),
        s(p))
      : t(p);
  }
  function s(p) {
    return p === a
      ? (e.consume(p), s)
      : (e.exit("setextHeadingLineSequence"), M(e, u, "lineSuffix")(p));
  }
  function u(p) {
    return p === null || E(p) ? (e.exit("setextHeadingLine"), n(p)) : t(p);
  }
}
var yi = { resolveAll: bi() };
function bi(e) {
  return n;
  function n(t, r) {
    let i = -1,
      a;
    for (; ++i <= t.length; )
      a === void 0
        ? t[i] && t[i][1].type === "data" && ((a = i), i++)
        : (!t[i] || t[i][1].type !== "data") &&
          (i !== a + 2 &&
            ((t[a][1].end = t[i - 1][1].end),
            t.splice(a + 2, i - a - 2),
            (i = a + 2)),
          (a = void 0));
    return e ? e(t, r) : t;
  }
}
var Si = {};
$n(Si, {
  attentionMarkers: () => Pi,
  contentInitial: () => wi,
  disable: () => Ai,
  document: () => vi,
  flow: () => Ci,
  flowInitial: () => ki,
  insideSpan: () => Ei,
  string: () => Li,
  text: () => Oi,
});
var vi = {
    42: q,
    43: q,
    45: q,
    48: q,
    49: q,
    50: q,
    51: q,
    52: q,
    53: q,
    54: q,
    55: q,
    56: q,
    57: q,
    62: Un,
  },
  wi = { 91: Rr },
  ki = { [-2]: je, [-1]: je, 32: je },
  Ci = {
    35: Mr,
    42: Le,
    45: [vn, Le],
    60: Vr,
    61: vn,
    95: Le,
    96: bn,
    126: bn,
  },
  Li = { 38: Kn, 92: Hn },
  Oi = {
    [-5]: Be,
    [-4]: Be,
    [-3]: Be,
    33: ri,
    38: Kn,
    42: Ye,
    60: [gr, qr],
    91: ai,
    92: [zr, Hn],
    93: rn,
    95: Ye,
    96: Er,
  },
  Ei = { null: [Ye, yi] },
  Pi = { null: [42, 95] },
  Ai = { null: [] };
function Fi(e) {
  return !e || typeof e != "object"
    ? ""
    : "position" in e || "type" in e
    ? wn(e.position)
    : "start" in e || "end" in e
    ? wn(e)
    : "line" in e || "column" in e
    ? Qe(e)
    : "";
}
function Qe(e) {
  return kn(e && e.line) + ":" + kn(e && e.column);
}
function wn(e) {
  return Qe(e && e.start) + "-" + Qe(e && e.end);
}
function kn(e) {
  return e && typeof e == "number" ? e : 1;
}
var Se = class {
  constructor(e, n, t) {
    (this.property = e), (this.normal = n), t && (this.space = t);
  }
};
Se.prototype.property = {};
Se.prototype.normal = {};
Se.prototype.space = null;
function Yn(e, n) {
  const t = {},
    r = {};
  let i = -1;
  for (; ++i < e.length; )
    Object.assign(t, e[i].property), Object.assign(r, e[i].normal);
  return new Se(t, r, n);
}
function Cn(e) {
  return e.toLowerCase();
}
var ne = class {
  constructor(e, n) {
    (this.property = e), (this.attribute = n);
  }
};
ne.prototype.space = null;
ne.prototype.boolean = !1;
ne.prototype.booleanish = !1;
ne.prototype.overloadedBoolean = !1;
ne.prototype.number = !1;
ne.prototype.commaSeparated = !1;
ne.prototype.spaceSeparated = !1;
ne.prototype.commaOrSpaceSeparated = !1;
ne.prototype.mustUseProperty = !1;
ne.prototype.defined = !1;
var Re = {};
$n(Re, {
  boolean: () => O,
  booleanish: () => B,
  commaOrSpaceSeparated: () => Y,
  commaSeparated: () => ce,
  number: () => b,
  overloadedBoolean: () => Qn,
  spaceSeparated: () => N,
});
var Ri = 0,
  O = se(),
  B = se(),
  Qn = se(),
  b = se(),
  N = se(),
  ce = se(),
  Y = se();
function se() {
  return 2 ** ++Ri;
}
var $e = Object.keys(Re),
  Gn = class extends ne {
    constructor(e, n, t, r) {
      let i = -1;
      if ((super(e, n), Ln(this, "space", r), typeof t == "number"))
        for (; ++i < $e.length; ) {
          const a = $e[i];
          Ln(this, $e[i], (t & Re[a]) === Re[a]);
        }
    }
  };
Gn.prototype.defined = !0;
function Ln(e, n, t) {
  t && (e[n] = t);
}
var Ii = {}.hasOwnProperty;
function fe(e) {
  const n = {},
    t = {};
  let r;
  for (r in e.properties)
    if (Ii.call(e.properties, r)) {
      const i = e.properties[r],
        a = new Gn(r, e.transform(e.attributes || {}, r), i, e.space);
      e.mustUseProperty &&
        e.mustUseProperty.includes(r) &&
        (a.mustUseProperty = !0),
        (n[r] = a),
        (t[Cn(r)] = r),
        (t[Cn(a.attribute)] = r);
    }
  return new Se(n, t, e.space);
}
var Xn = fe({
    space: "xlink",
    transform(e, n) {
      return "xlink:" + n.slice(5).toLowerCase();
    },
    properties: {
      xLinkActuate: null,
      xLinkArcRole: null,
      xLinkHref: null,
      xLinkRole: null,
      xLinkShow: null,
      xLinkTitle: null,
      xLinkType: null,
    },
  }),
  Zn = fe({
    space: "xml",
    transform(e, n) {
      return "xml:" + n.slice(3).toLowerCase();
    },
    properties: { xmlLang: null, xmlBase: null, xmlSpace: null },
  });
function et(e, n) {
  return n in e ? e[n] : n;
}
function nt(e, n) {
  return et(e, n.toLowerCase());
}
var tt = fe({
    space: "xmlns",
    attributes: { xmlnsxlink: "xmlns:xlink" },
    transform: nt,
    properties: { xmlns: null, xmlnsXLink: null },
  }),
  rt = fe({
    transform(e, n) {
      return n === "role" ? n : "aria-" + n.slice(4).toLowerCase();
    },
    properties: {
      ariaActiveDescendant: null,
      ariaAtomic: B,
      ariaAutoComplete: null,
      ariaBusy: B,
      ariaChecked: B,
      ariaColCount: b,
      ariaColIndex: b,
      ariaColSpan: b,
      ariaControls: N,
      ariaCurrent: null,
      ariaDescribedBy: N,
      ariaDetails: null,
      ariaDisabled: B,
      ariaDropEffect: N,
      ariaErrorMessage: null,
      ariaExpanded: B,
      ariaFlowTo: N,
      ariaGrabbed: B,
      ariaHasPopup: null,
      ariaHidden: B,
      ariaInvalid: null,
      ariaKeyShortcuts: null,
      ariaLabel: null,
      ariaLabelledBy: N,
      ariaLevel: b,
      ariaLive: null,
      ariaModal: B,
      ariaMultiLine: B,
      ariaMultiSelectable: B,
      ariaOrientation: null,
      ariaOwns: N,
      ariaPlaceholder: null,
      ariaPosInSet: b,
      ariaPressed: B,
      ariaReadOnly: B,
      ariaRelevant: null,
      ariaRequired: B,
      ariaRoleDescription: N,
      ariaRowCount: b,
      ariaRowIndex: b,
      ariaRowSpan: b,
      ariaSelected: B,
      ariaSetSize: b,
      ariaSort: null,
      ariaValueMax: b,
      ariaValueMin: b,
      ariaValueNow: b,
      ariaValueText: null,
      role: null,
    },
  }),
  Di = fe({
    space: "html",
    attributes: {
      acceptcharset: "accept-charset",
      classname: "class",
      htmlfor: "for",
      httpequiv: "http-equiv",
    },
    transform: nt,
    mustUseProperty: ["checked", "multiple", "muted", "selected"],
    properties: {
      abbr: null,
      accept: ce,
      acceptCharset: N,
      accessKey: N,
      action: null,
      allow: null,
      allowFullScreen: O,
      allowPaymentRequest: O,
      allowUserMedia: O,
      alt: null,
      as: null,
      async: O,
      autoCapitalize: null,
      autoComplete: N,
      autoFocus: O,
      autoPlay: O,
      capture: O,
      charSet: null,
      checked: O,
      cite: null,
      className: N,
      cols: b,
      colSpan: null,
      content: null,
      contentEditable: B,
      controls: O,
      controlsList: N,
      coords: b | ce,
      crossOrigin: null,
      data: null,
      dateTime: null,
      decoding: null,
      default: O,
      defer: O,
      dir: null,
      dirName: null,
      disabled: O,
      download: Qn,
      draggable: B,
      encType: null,
      enterKeyHint: null,
      form: null,
      formAction: null,
      formEncType: null,
      formMethod: null,
      formNoValidate: O,
      formTarget: null,
      headers: N,
      height: b,
      hidden: O,
      high: b,
      href: null,
      hrefLang: null,
      htmlFor: N,
      httpEquiv: N,
      id: null,
      imageSizes: null,
      imageSrcSet: null,
      inputMode: null,
      integrity: null,
      is: null,
      isMap: O,
      itemId: null,
      itemProp: N,
      itemRef: N,
      itemScope: O,
      itemType: N,
      kind: null,
      label: null,
      lang: null,
      language: null,
      list: null,
      loading: null,
      loop: O,
      low: b,
      manifest: null,
      max: null,
      maxLength: b,
      media: null,
      method: null,
      min: null,
      minLength: b,
      multiple: O,
      muted: O,
      name: null,
      nonce: null,
      noModule: O,
      noValidate: O,
      onAbort: null,
      onAfterPrint: null,
      onAuxClick: null,
      onBeforeMatch: null,
      onBeforePrint: null,
      onBeforeUnload: null,
      onBlur: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onContextLost: null,
      onContextMenu: null,
      onContextRestored: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFormData: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLanguageChange: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadEnd: null,
      onLoadStart: null,
      onMessage: null,
      onMessageError: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRejectionHandled: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onScrollEnd: null,
      onSecurityPolicyViolation: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onSlotChange: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnhandledRejection: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onWheel: null,
      open: O,
      optimum: b,
      pattern: null,
      ping: N,
      placeholder: null,
      playsInline: O,
      poster: null,
      preload: null,
      readOnly: O,
      referrerPolicy: null,
      rel: N,
      required: O,
      reversed: O,
      rows: b,
      rowSpan: b,
      sandbox: N,
      scope: null,
      scoped: O,
      seamless: O,
      selected: O,
      shape: null,
      size: b,
      sizes: null,
      slot: null,
      span: b,
      spellCheck: B,
      src: null,
      srcDoc: null,
      srcLang: null,
      srcSet: null,
      start: b,
      step: null,
      style: null,
      tabIndex: b,
      target: null,
      title: null,
      translate: null,
      type: null,
      typeMustMatch: O,
      useMap: null,
      value: B,
      width: b,
      wrap: null,
      align: null,
      aLink: null,
      archive: N,
      axis: null,
      background: null,
      bgColor: null,
      border: b,
      borderColor: null,
      bottomMargin: b,
      cellPadding: null,
      cellSpacing: null,
      char: null,
      charOff: null,
      classId: null,
      clear: null,
      code: null,
      codeBase: null,
      codeType: null,
      color: null,
      compact: O,
      declare: O,
      event: null,
      face: null,
      frame: null,
      frameBorder: null,
      hSpace: b,
      leftMargin: b,
      link: null,
      longDesc: null,
      lowSrc: null,
      marginHeight: b,
      marginWidth: b,
      noResize: O,
      noHref: O,
      noShade: O,
      noWrap: O,
      object: null,
      profile: null,
      prompt: null,
      rev: null,
      rightMargin: b,
      rules: null,
      scheme: null,
      scrolling: B,
      standby: null,
      summary: null,
      text: null,
      topMargin: b,
      valueType: null,
      version: null,
      vAlign: null,
      vLink: null,
      vSpace: b,
      allowTransparency: null,
      autoCorrect: null,
      autoSave: null,
      disablePictureInPicture: O,
      disableRemotePlayback: O,
      prefix: null,
      property: null,
      results: b,
      security: null,
      unselectable: null,
    },
  }),
  Ti = fe({
    space: "svg",
    attributes: {
      accentHeight: "accent-height",
      alignmentBaseline: "alignment-baseline",
      arabicForm: "arabic-form",
      baselineShift: "baseline-shift",
      capHeight: "cap-height",
      className: "class",
      clipPath: "clip-path",
      clipRule: "clip-rule",
      colorInterpolation: "color-interpolation",
      colorInterpolationFilters: "color-interpolation-filters",
      colorProfile: "color-profile",
      colorRendering: "color-rendering",
      crossOrigin: "crossorigin",
      dataType: "datatype",
      dominantBaseline: "dominant-baseline",
      enableBackground: "enable-background",
      fillOpacity: "fill-opacity",
      fillRule: "fill-rule",
      floodColor: "flood-color",
      floodOpacity: "flood-opacity",
      fontFamily: "font-family",
      fontSize: "font-size",
      fontSizeAdjust: "font-size-adjust",
      fontStretch: "font-stretch",
      fontStyle: "font-style",
      fontVariant: "font-variant",
      fontWeight: "font-weight",
      glyphName: "glyph-name",
      glyphOrientationHorizontal: "glyph-orientation-horizontal",
      glyphOrientationVertical: "glyph-orientation-vertical",
      hrefLang: "hreflang",
      horizAdvX: "horiz-adv-x",
      horizOriginX: "horiz-origin-x",
      horizOriginY: "horiz-origin-y",
      imageRendering: "image-rendering",
      letterSpacing: "letter-spacing",
      lightingColor: "lighting-color",
      markerEnd: "marker-end",
      markerMid: "marker-mid",
      markerStart: "marker-start",
      navDown: "nav-down",
      navDownLeft: "nav-down-left",
      navDownRight: "nav-down-right",
      navLeft: "nav-left",
      navNext: "nav-next",
      navPrev: "nav-prev",
      navRight: "nav-right",
      navUp: "nav-up",
      navUpLeft: "nav-up-left",
      navUpRight: "nav-up-right",
      onAbort: "onabort",
      onActivate: "onactivate",
      onAfterPrint: "onafterprint",
      onBeforePrint: "onbeforeprint",
      onBegin: "onbegin",
      onCancel: "oncancel",
      onCanPlay: "oncanplay",
      onCanPlayThrough: "oncanplaythrough",
      onChange: "onchange",
      onClick: "onclick",
      onClose: "onclose",
      onCopy: "oncopy",
      onCueChange: "oncuechange",
      onCut: "oncut",
      onDblClick: "ondblclick",
      onDrag: "ondrag",
      onDragEnd: "ondragend",
      onDragEnter: "ondragenter",
      onDragExit: "ondragexit",
      onDragLeave: "ondragleave",
      onDragOver: "ondragover",
      onDragStart: "ondragstart",
      onDrop: "ondrop",
      onDurationChange: "ondurationchange",
      onEmptied: "onemptied",
      onEnd: "onend",
      onEnded: "onended",
      onError: "onerror",
      onFocus: "onfocus",
      onFocusIn: "onfocusin",
      onFocusOut: "onfocusout",
      onHashChange: "onhashchange",
      onInput: "oninput",
      onInvalid: "oninvalid",
      onKeyDown: "onkeydown",
      onKeyPress: "onkeypress",
      onKeyUp: "onkeyup",
      onLoad: "onload",
      onLoadedData: "onloadeddata",
      onLoadedMetadata: "onloadedmetadata",
      onLoadStart: "onloadstart",
      onMessage: "onmessage",
      onMouseDown: "onmousedown",
      onMouseEnter: "onmouseenter",
      onMouseLeave: "onmouseleave",
      onMouseMove: "onmousemove",
      onMouseOut: "onmouseout",
      onMouseOver: "onmouseover",
      onMouseUp: "onmouseup",
      onMouseWheel: "onmousewheel",
      onOffline: "onoffline",
      onOnline: "ononline",
      onPageHide: "onpagehide",
      onPageShow: "onpageshow",
      onPaste: "onpaste",
      onPause: "onpause",
      onPlay: "onplay",
      onPlaying: "onplaying",
      onPopState: "onpopstate",
      onProgress: "onprogress",
      onRateChange: "onratechange",
      onRepeat: "onrepeat",
      onReset: "onreset",
      onResize: "onresize",
      onScroll: "onscroll",
      onSeeked: "onseeked",
      onSeeking: "onseeking",
      onSelect: "onselect",
      onShow: "onshow",
      onStalled: "onstalled",
      onStorage: "onstorage",
      onSubmit: "onsubmit",
      onSuspend: "onsuspend",
      onTimeUpdate: "ontimeupdate",
      onToggle: "ontoggle",
      onUnload: "onunload",
      onVolumeChange: "onvolumechange",
      onWaiting: "onwaiting",
      onZoom: "onzoom",
      overlinePosition: "overline-position",
      overlineThickness: "overline-thickness",
      paintOrder: "paint-order",
      panose1: "panose-1",
      pointerEvents: "pointer-events",
      referrerPolicy: "referrerpolicy",
      renderingIntent: "rendering-intent",
      shapeRendering: "shape-rendering",
      stopColor: "stop-color",
      stopOpacity: "stop-opacity",
      strikethroughPosition: "strikethrough-position",
      strikethroughThickness: "strikethrough-thickness",
      strokeDashArray: "stroke-dasharray",
      strokeDashOffset: "stroke-dashoffset",
      strokeLineCap: "stroke-linecap",
      strokeLineJoin: "stroke-linejoin",
      strokeMiterLimit: "stroke-miterlimit",
      strokeOpacity: "stroke-opacity",
      strokeWidth: "stroke-width",
      tabIndex: "tabindex",
      textAnchor: "text-anchor",
      textDecoration: "text-decoration",
      textRendering: "text-rendering",
      typeOf: "typeof",
      underlinePosition: "underline-position",
      underlineThickness: "underline-thickness",
      unicodeBidi: "unicode-bidi",
      unicodeRange: "unicode-range",
      unitsPerEm: "units-per-em",
      vAlphabetic: "v-alphabetic",
      vHanging: "v-hanging",
      vIdeographic: "v-ideographic",
      vMathematical: "v-mathematical",
      vectorEffect: "vector-effect",
      vertAdvY: "vert-adv-y",
      vertOriginX: "vert-origin-x",
      vertOriginY: "vert-origin-y",
      wordSpacing: "word-spacing",
      writingMode: "writing-mode",
      xHeight: "x-height",
      playbackOrder: "playbackorder",
      timelineBegin: "timelinebegin",
    },
    transform: et,
    properties: {
      about: Y,
      accentHeight: b,
      accumulate: null,
      additive: null,
      alignmentBaseline: null,
      alphabetic: b,
      amplitude: b,
      arabicForm: null,
      ascent: b,
      attributeName: null,
      attributeType: null,
      azimuth: b,
      bandwidth: null,
      baselineShift: null,
      baseFrequency: null,
      baseProfile: null,
      bbox: null,
      begin: null,
      bias: b,
      by: null,
      calcMode: null,
      capHeight: b,
      className: N,
      clip: null,
      clipPath: null,
      clipPathUnits: null,
      clipRule: null,
      color: null,
      colorInterpolation: null,
      colorInterpolationFilters: null,
      colorProfile: null,
      colorRendering: null,
      content: null,
      contentScriptType: null,
      contentStyleType: null,
      crossOrigin: null,
      cursor: null,
      cx: null,
      cy: null,
      d: null,
      dataType: null,
      defaultAction: null,
      descent: b,
      diffuseConstant: b,
      direction: null,
      display: null,
      dur: null,
      divisor: b,
      dominantBaseline: null,
      download: O,
      dx: null,
      dy: null,
      edgeMode: null,
      editable: null,
      elevation: b,
      enableBackground: null,
      end: null,
      event: null,
      exponent: b,
      externalResourcesRequired: null,
      fill: null,
      fillOpacity: b,
      fillRule: null,
      filter: null,
      filterRes: null,
      filterUnits: null,
      floodColor: null,
      floodOpacity: null,
      focusable: null,
      focusHighlight: null,
      fontFamily: null,
      fontSize: null,
      fontSizeAdjust: null,
      fontStretch: null,
      fontStyle: null,
      fontVariant: null,
      fontWeight: null,
      format: null,
      fr: null,
      from: null,
      fx: null,
      fy: null,
      g1: ce,
      g2: ce,
      glyphName: ce,
      glyphOrientationHorizontal: null,
      glyphOrientationVertical: null,
      glyphRef: null,
      gradientTransform: null,
      gradientUnits: null,
      handler: null,
      hanging: b,
      hatchContentUnits: null,
      hatchUnits: null,
      height: null,
      href: null,
      hrefLang: null,
      horizAdvX: b,
      horizOriginX: b,
      horizOriginY: b,
      id: null,
      ideographic: b,
      imageRendering: null,
      initialVisibility: null,
      in: null,
      in2: null,
      intercept: b,
      k: b,
      k1: b,
      k2: b,
      k3: b,
      k4: b,
      kernelMatrix: Y,
      kernelUnitLength: null,
      keyPoints: null,
      keySplines: null,
      keyTimes: null,
      kerning: null,
      lang: null,
      lengthAdjust: null,
      letterSpacing: null,
      lightingColor: null,
      limitingConeAngle: b,
      local: null,
      markerEnd: null,
      markerMid: null,
      markerStart: null,
      markerHeight: null,
      markerUnits: null,
      markerWidth: null,
      mask: null,
      maskContentUnits: null,
      maskUnits: null,
      mathematical: null,
      max: null,
      media: null,
      mediaCharacterEncoding: null,
      mediaContentEncodings: null,
      mediaSize: b,
      mediaTime: null,
      method: null,
      min: null,
      mode: null,
      name: null,
      navDown: null,
      navDownLeft: null,
      navDownRight: null,
      navLeft: null,
      navNext: null,
      navPrev: null,
      navRight: null,
      navUp: null,
      navUpLeft: null,
      navUpRight: null,
      numOctaves: null,
      observer: null,
      offset: null,
      onAbort: null,
      onActivate: null,
      onAfterPrint: null,
      onBeforePrint: null,
      onBegin: null,
      onCancel: null,
      onCanPlay: null,
      onCanPlayThrough: null,
      onChange: null,
      onClick: null,
      onClose: null,
      onCopy: null,
      onCueChange: null,
      onCut: null,
      onDblClick: null,
      onDrag: null,
      onDragEnd: null,
      onDragEnter: null,
      onDragExit: null,
      onDragLeave: null,
      onDragOver: null,
      onDragStart: null,
      onDrop: null,
      onDurationChange: null,
      onEmptied: null,
      onEnd: null,
      onEnded: null,
      onError: null,
      onFocus: null,
      onFocusIn: null,
      onFocusOut: null,
      onHashChange: null,
      onInput: null,
      onInvalid: null,
      onKeyDown: null,
      onKeyPress: null,
      onKeyUp: null,
      onLoad: null,
      onLoadedData: null,
      onLoadedMetadata: null,
      onLoadStart: null,
      onMessage: null,
      onMouseDown: null,
      onMouseEnter: null,
      onMouseLeave: null,
      onMouseMove: null,
      onMouseOut: null,
      onMouseOver: null,
      onMouseUp: null,
      onMouseWheel: null,
      onOffline: null,
      onOnline: null,
      onPageHide: null,
      onPageShow: null,
      onPaste: null,
      onPause: null,
      onPlay: null,
      onPlaying: null,
      onPopState: null,
      onProgress: null,
      onRateChange: null,
      onRepeat: null,
      onReset: null,
      onResize: null,
      onScroll: null,
      onSeeked: null,
      onSeeking: null,
      onSelect: null,
      onShow: null,
      onStalled: null,
      onStorage: null,
      onSubmit: null,
      onSuspend: null,
      onTimeUpdate: null,
      onToggle: null,
      onUnload: null,
      onVolumeChange: null,
      onWaiting: null,
      onZoom: null,
      opacity: null,
      operator: null,
      order: null,
      orient: null,
      orientation: null,
      origin: null,
      overflow: null,
      overlay: null,
      overlinePosition: b,
      overlineThickness: b,
      paintOrder: null,
      panose1: null,
      path: null,
      pathLength: b,
      patternContentUnits: null,
      patternTransform: null,
      patternUnits: null,
      phase: null,
      ping: N,
      pitch: null,
      playbackOrder: null,
      pointerEvents: null,
      points: null,
      pointsAtX: b,
      pointsAtY: b,
      pointsAtZ: b,
      preserveAlpha: null,
      preserveAspectRatio: null,
      primitiveUnits: null,
      propagate: null,
      property: Y,
      r: null,
      radius: null,
      referrerPolicy: null,
      refX: null,
      refY: null,
      rel: Y,
      rev: Y,
      renderingIntent: null,
      repeatCount: null,
      repeatDur: null,
      requiredExtensions: Y,
      requiredFeatures: Y,
      requiredFonts: Y,
      requiredFormats: Y,
      resource: null,
      restart: null,
      result: null,
      rotate: null,
      rx: null,
      ry: null,
      scale: null,
      seed: null,
      shapeRendering: null,
      side: null,
      slope: null,
      snapshotTime: null,
      specularConstant: b,
      specularExponent: b,
      spreadMethod: null,
      spacing: null,
      startOffset: null,
      stdDeviation: null,
      stemh: null,
      stemv: null,
      stitchTiles: null,
      stopColor: null,
      stopOpacity: null,
      strikethroughPosition: b,
      strikethroughThickness: b,
      string: null,
      stroke: null,
      strokeDashArray: Y,
      strokeDashOffset: null,
      strokeLineCap: null,
      strokeLineJoin: null,
      strokeMiterLimit: b,
      strokeOpacity: b,
      strokeWidth: null,
      style: null,
      surfaceScale: b,
      syncBehavior: null,
      syncBehaviorDefault: null,
      syncMaster: null,
      syncTolerance: null,
      syncToleranceDefault: null,
      systemLanguage: Y,
      tabIndex: b,
      tableValues: null,
      target: null,
      targetX: b,
      targetY: b,
      textAnchor: null,
      textDecoration: null,
      textRendering: null,
      textLength: null,
      timelineBegin: null,
      title: null,
      transformBehavior: null,
      type: null,
      typeOf: Y,
      to: null,
      transform: null,
      u1: null,
      u2: null,
      underlinePosition: b,
      underlineThickness: b,
      unicode: null,
      unicodeBidi: null,
      unicodeRange: null,
      unitsPerEm: b,
      values: null,
      vAlphabetic: b,
      vMathematical: b,
      vectorEffect: null,
      vHanging: b,
      vIdeographic: b,
      version: null,
      vertAdvY: b,
      vertOriginX: b,
      vertOriginY: b,
      viewBox: null,
      viewTarget: null,
      visibility: null,
      width: null,
      widths: null,
      wordSpacing: null,
      writingMode: null,
      x: null,
      x1: null,
      x2: null,
      xChannelSelector: null,
      xHeight: b,
      y: null,
      y1: null,
      y2: null,
      yChannelSelector: null,
      z: null,
      zoomAndPan: null,
    },
  });
Yn([Zn, Xn, tt, rt, Di], "html");
Yn([Zn, Xn, tt, rt, Ti], "svg");
function On(e) {
  if (e) throw e;
}
var zi = Te(Vn(), 1),
  En = Te(ir(), 1);
function Ge(e) {
  if (typeof e != "object" || e === null) return !1;
  const n = Object.getPrototypeOf(e);
  return (
    (n === null ||
      n === Object.prototype ||
      Object.getPrototypeOf(n) === null) &&
    !(Symbol.toStringTag in e) &&
    !(Symbol.iterator in e)
  );
}
function Ni() {
  const e = [],
    n = { run: t, use: r };
  return n;
  function t(...i) {
    let a = -1;
    const l = i.pop();
    if (typeof l != "function")
      throw new TypeError("Expected function as last argument, not " + l);
    o(null, ...i);
    function o(s, ...u) {
      const p = e[++a];
      let g = -1;
      if (s) {
        l(s);
        return;
      }
      for (; ++g < i.length; )
        (u[g] === null || u[g] === void 0) && (u[g] = i[g]);
      (i = u), p ? Mi(p, o)(...u) : l(null, ...u);
    }
  }
  function r(i) {
    if (typeof i != "function")
      throw new TypeError("Expected `middelware` to be a function, not " + i);
    return e.push(i), n;
  }
}
function Mi(e, n) {
  let t;
  return r;
  function r(...l) {
    const o = e.length > l.length;
    let s;
    o && l.push(i);
    try {
      s = e.apply(this, l);
    } catch (u) {
      const p = u;
      if (o && t) throw p;
      return i(p);
    }
    o ||
      (s instanceof Promise ? s.then(a, i) : s instanceof Error ? i(s) : a(s));
  }
  function i(l, ...o) {
    t || ((t = !0), n(l, ...o));
  }
  function a(l) {
    i(null, l);
  }
}
var ji = Te(Vn(), 1),
  X = class extends Error {
    constructor(e, n, t) {
      const r = [null, null];
      let i = {
        start: { line: null, column: null },
        end: { line: null, column: null },
      };
      if (
        (super(),
        typeof n == "string" && ((t = n), (n = void 0)),
        typeof t == "string")
      ) {
        const a = t.indexOf(":");
        a === -1
          ? (r[1] = t)
          : ((r[0] = t.slice(0, a)), (r[1] = t.slice(a + 1)));
      }
      n &&
        ("type" in n || "position" in n
          ? n.position && (i = n.position)
          : "start" in n || "end" in n
          ? (i = n)
          : ("line" in n || "column" in n) && (i.start = n)),
        (this.name = Fi(n) || "1:1"),
        (this.message = typeof e == "object" ? e.message : e),
        (this.stack = ""),
        typeof e == "object" && e.stack && (this.stack = e.stack),
        (this.reason = this.message),
        this.fatal,
        (this.line = i.start.line),
        (this.column = i.start.column),
        (this.position = i),
        (this.source = r[0]),
        (this.ruleId = r[1]),
        this.file,
        this.actual,
        this.expected,
        this.url,
        this.note;
    }
  };
X.prototype.file = "";
X.prototype.name = "";
X.prototype.reason = "";
X.prototype.message = "";
X.prototype.stack = "";
X.prototype.fatal = null;
X.prototype.column = null;
X.prototype.line = null;
X.prototype.source = null;
X.prototype.ruleId = null;
X.prototype.position = null;
var te = { basename: Bi, dirname: $i, extname: Vi, join: _i, sep: "/" };
function Bi(e, n) {
  if (n !== void 0 && typeof n != "string")
    throw new TypeError('"ext" argument must be a string');
  ve(e);
  let t = 0,
    r = -1,
    i = e.length,
    a;
  if (n === void 0 || n.length === 0 || n.length > e.length) {
    for (; i--; )
      if (e.charCodeAt(i) === 47) {
        if (a) {
          t = i + 1;
          break;
        }
      } else r < 0 && ((a = !0), (r = i + 1));
    return r < 0 ? "" : e.slice(t, r);
  }
  if (n === e) return "";
  let l = -1,
    o = n.length - 1;
  for (; i--; )
    if (e.charCodeAt(i) === 47) {
      if (a) {
        t = i + 1;
        break;
      }
    } else
      l < 0 && ((a = !0), (l = i + 1)),
        o > -1 &&
          (e.charCodeAt(i) === n.charCodeAt(o--)
            ? o < 0 && (r = i)
            : ((o = -1), (r = l)));
  return t === r ? (r = l) : r < 0 && (r = e.length), e.slice(t, r);
}
function $i(e) {
  if ((ve(e), e.length === 0)) return ".";
  let n = -1,
    t = e.length,
    r;
  for (; --t; )
    if (e.charCodeAt(t) === 47) {
      if (r) {
        n = t;
        break;
      }
    } else r || (r = !0);
  return n < 0
    ? e.charCodeAt(0) === 47
      ? "/"
      : "."
    : n === 1 && e.charCodeAt(0) === 47
    ? "//"
    : e.slice(0, n);
}
function Vi(e) {
  ve(e);
  let n = e.length,
    t = -1,
    r = 0,
    i = -1,
    a = 0,
    l;
  for (; n--; ) {
    const o = e.charCodeAt(n);
    if (o === 47) {
      if (l) {
        r = n + 1;
        break;
      }
      continue;
    }
    t < 0 && ((l = !0), (t = n + 1)),
      o === 46 ? (i < 0 ? (i = n) : a !== 1 && (a = 1)) : i > -1 && (a = -1);
  }
  return i < 0 || t < 0 || a === 0 || (a === 1 && i === t - 1 && i === r + 1)
    ? ""
    : e.slice(i, t);
}
function _i(...e) {
  let n = -1,
    t;
  for (; ++n < e.length; )
    ve(e[n]), e[n] && (t = t === void 0 ? e[n] : t + "/" + e[n]);
  return t === void 0 ? "." : Ui(t);
}
function Ui(e) {
  ve(e);
  const n = e.charCodeAt(0) === 47;
  let t = Hi(e, !n);
  return (
    t.length === 0 && !n && (t = "."),
    t.length > 0 && e.charCodeAt(e.length - 1) === 47 && (t += "/"),
    n ? "/" + t : t
  );
}
function Hi(e, n) {
  let t = "",
    r = 0,
    i = -1,
    a = 0,
    l = -1,
    o,
    s;
  for (; ++l <= e.length; ) {
    if (l < e.length) o = e.charCodeAt(l);
    else {
      if (o === 47) break;
      o = 47;
    }
    if (o === 47) {
      if (!(i === l - 1 || a === 1))
        if (i !== l - 1 && a === 2) {
          if (
            t.length < 2 ||
            r !== 2 ||
            t.charCodeAt(t.length - 1) !== 46 ||
            t.charCodeAt(t.length - 2) !== 46
          ) {
            if (t.length > 2) {
              if (((s = t.lastIndexOf("/")), s !== t.length - 1)) {
                s < 0
                  ? ((t = ""), (r = 0))
                  : ((t = t.slice(0, s)),
                    (r = t.length - 1 - t.lastIndexOf("/"))),
                  (i = l),
                  (a = 0);
                continue;
              }
            } else if (t.length > 0) {
              (t = ""), (r = 0), (i = l), (a = 0);
              continue;
            }
          }
          n && ((t = t.length > 0 ? t + "/.." : ".."), (r = 2));
        } else
          t.length > 0
            ? (t += "/" + e.slice(i + 1, l))
            : (t = e.slice(i + 1, l)),
            (r = l - i - 1);
      (i = l), (a = 0);
    } else o === 46 && a > -1 ? a++ : (a = -1);
  }
  return t;
}
function ve(e) {
  if (typeof e != "string")
    throw new TypeError("Path must be a string. Received " + JSON.stringify(e));
}
var Ki = { cwd: qi };
function qi() {
  return "/";
}
function Xe(e) {
  return e !== null && typeof e == "object" && e.href && e.origin;
}
function Wi(e) {
  if (typeof e == "string") e = new URL(e);
  else if (!Xe(e)) {
    const n = new TypeError(
      'The "path" argument must be of type string or an instance of URL. Received `' +
        e +
        "`"
    );
    throw ((n.code = "ERR_INVALID_ARG_TYPE"), n);
  }
  if (e.protocol !== "file:") {
    const n = new TypeError("The URL must be of scheme file");
    throw ((n.code = "ERR_INVALID_URL_SCHEME"), n);
  }
  return Ji(e);
}
function Ji(e) {
  if (e.hostname !== "") {
    const r = new TypeError(
      'File URL host must be "localhost" or empty on darwin'
    );
    throw ((r.code = "ERR_INVALID_FILE_URL_HOST"), r);
  }
  const n = e.pathname;
  let t = -1;
  for (; ++t < n.length; )
    if (n.charCodeAt(t) === 37 && n.charCodeAt(t + 1) === 50) {
      const r = n.charCodeAt(t + 2);
      if (r === 70 || r === 102) {
        const i = new TypeError(
          "File URL path must not include encoded / characters"
        );
        throw ((i.code = "ERR_INVALID_FILE_URL_PATH"), i);
      }
    }
  return decodeURIComponent(n);
}
var Ve = ["history", "path", "basename", "stem", "extname", "dirname"],
  Yi = class {
    constructor(e) {
      let n;
      e
        ? typeof e == "string" || Qi(e)
          ? (n = { value: e })
          : Xe(e)
          ? (n = { path: e })
          : (n = e)
        : (n = {}),
        (this.data = {}),
        (this.messages = []),
        (this.history = []),
        (this.cwd = Ki.cwd()),
        this.value,
        this.stored,
        this.result,
        this.map;
      let t = -1;
      for (; ++t < Ve.length; ) {
        const i = Ve[t];
        i in n &&
          n[i] !== void 0 &&
          n[i] !== null &&
          (this[i] = i === "history" ? [...n[i]] : n[i]);
      }
      let r;
      for (r in n) Ve.includes(r) || (this[r] = n[r]);
    }
    get path() {
      return this.history[this.history.length - 1];
    }
    set path(e) {
      Xe(e) && (e = Wi(e)),
        Ue(e, "path"),
        this.path !== e && this.history.push(e);
    }
    get dirname() {
      return typeof this.path == "string" ? te.dirname(this.path) : void 0;
    }
    set dirname(e) {
      Pn(this.basename, "dirname"),
        (this.path = te.join(e || "", this.basename));
    }
    get basename() {
      return typeof this.path == "string" ? te.basename(this.path) : void 0;
    }
    set basename(e) {
      Ue(e, "basename"),
        _e(e, "basename"),
        (this.path = te.join(this.dirname || "", e));
    }
    get extname() {
      return typeof this.path == "string" ? te.extname(this.path) : void 0;
    }
    set extname(e) {
      if ((_e(e, "extname"), Pn(this.dirname, "extname"), e)) {
        if (e.charCodeAt(0) !== 46)
          throw new Error("`extname` must start with `.`");
        if (e.includes(".", 1))
          throw new Error("`extname` cannot contain multiple dots");
      }
      this.path = te.join(this.dirname, this.stem + (e || ""));
    }
    get stem() {
      return typeof this.path == "string"
        ? te.basename(this.path, this.extname)
        : void 0;
    }
    set stem(e) {
      Ue(e, "stem"),
        _e(e, "stem"),
        (this.path = te.join(this.dirname || "", e + (this.extname || "")));
    }
    toString(e) {
      return (this.value || "").toString(e || void 0);
    }
    message(e, n, t) {
      const r = new X(e, n, t);
      return (
        this.path &&
          ((r.name = this.path + ":" + r.name), (r.file = this.path)),
        (r.fatal = !1),
        this.messages.push(r),
        r
      );
    }
    info(e, n, t) {
      const r = this.message(e, n, t);
      return (r.fatal = null), r;
    }
    fail(e, n, t) {
      const r = this.message(e, n, t);
      throw ((r.fatal = !0), r);
    }
  };
function _e(e, n) {
  if (e && e.includes(te.sep))
    throw new Error(
      "`" + n + "` cannot be a path: did not expect `" + te.sep + "`"
    );
}
function Ue(e, n) {
  if (!e) throw new Error("`" + n + "` cannot be empty");
}
function Pn(e, n) {
  if (!e) throw new Error("Setting `" + n + "` requires `path` to be set too");
}
function Qi(e) {
  return (0, ji.default)(e);
}
at().freeze();
var it = {}.hasOwnProperty;
function at() {
  const e = Ni(),
    n = [];
  let t = {},
    r,
    i = -1;
  return (
    (a.data = l),
    (a.Parser = void 0),
    (a.Compiler = void 0),
    (a.freeze = o),
    (a.attachers = n),
    (a.use = s),
    (a.parse = u),
    (a.stringify = p),
    (a.run = g),
    (a.runSync = f),
    (a.process = x),
    (a.processSync = m),
    a
  );
  function a() {
    const S = at();
    let v = -1;
    for (; ++v < n.length; ) S.use(...n[v]);
    return S.data((0, En.default)(!0, {}, t)), S;
  }
  function l(S, v) {
    return typeof S == "string"
      ? arguments.length === 2
        ? (qe("data", r), (t[S] = v), a)
        : (it.call(t, S) && t[S]) || null
      : S
      ? (qe("data", r), (t = S), a)
      : t;
  }
  function o() {
    if (r) return a;
    for (; ++i < n.length; ) {
      const [S, ...v] = n[i];
      if (v[0] === !1) continue;
      v[0] === !0 && (v[0] = void 0);
      const d = S.call(a, ...v);
      typeof d == "function" && e.use(d);
    }
    return (r = !0), (i = Number.POSITIVE_INFINITY), a;
  }
  function s(S, ...v) {
    let d;
    if ((qe("use", r), S != null))
      if (typeof S == "function") A(S, ...v);
      else if (typeof S == "object") Array.isArray(S) ? k(S) : F(S);
      else throw new TypeError("Expected usable value, not `" + S + "`");
    return d && (t.settings = Object.assign(t.settings || {}, d)), a;
    function w(y) {
      if (typeof y == "function") A(y);
      else if (typeof y == "object")
        if (Array.isArray(y)) {
          const [C, ...R] = y;
          A(C, ...R);
        } else F(y);
      else throw new TypeError("Expected usable value, not `" + y + "`");
    }
    function F(y) {
      k(y.plugins), y.settings && (d = Object.assign(d || {}, y.settings));
    }
    function k(y) {
      let C = -1;
      if (y != null)
        if (Array.isArray(y))
          for (; ++C < y.length; ) {
            const R = y[C];
            w(R);
          }
        else throw new TypeError("Expected a list of plugins, not `" + y + "`");
    }
    function A(y, C) {
      let R = -1,
        I;
      for (; ++R < n.length; )
        if (n[R][0] === y) {
          I = n[R];
          break;
        }
      I
        ? (Ge(I[1]) && Ge(C) && (C = (0, En.default)(!0, I[1], C)), (I[1] = C))
        : n.push([...arguments]);
    }
  }
  function u(S) {
    a.freeze();
    const v = me(S),
      d = a.Parser;
    return (
      He("parse", d),
      An(d, "parse") ? new d(String(v), v).parse() : d(String(v), v)
    );
  }
  function p(S, v) {
    a.freeze();
    const d = me(v),
      w = a.Compiler;
    return (
      Ke("stringify", w),
      Fn(S),
      An(w, "compile") ? new w(S, d).compile() : w(S, d)
    );
  }
  function g(S, v, d) {
    if (
      (Fn(S),
      a.freeze(),
      !d && typeof v == "function" && ((d = v), (v = void 0)),
      !d)
    )
      return new Promise(w);
    w(null, d);
    function w(F, k) {
      e.run(S, me(v), A);
      function A(y, C, R) {
        (C = C || S), y ? k(y) : F ? F(C) : d(null, C, R);
      }
    }
  }
  function f(S, v) {
    let d, w;
    return a.run(S, v, F), Rn("runSync", "run", w), d;
    function F(k, A) {
      On(k), (d = A), (w = !0);
    }
  }
  function x(S, v) {
    if ((a.freeze(), He("process", a.Parser), Ke("process", a.Compiler), !v))
      return new Promise(d);
    d(null, v);
    function d(w, F) {
      const k = me(S);
      a.run(a.parse(k), k, (y, C, R) => {
        if (y || !C || !R) A(y);
        else {
          const I = a.stringify(C, R);
          I == null || (Zi(I) ? (R.value = I) : (R.result = I)), A(y, R);
        }
      });
      function A(y, C) {
        y || !C ? F(y) : w ? w(C) : v(null, C);
      }
    }
  }
  function m(S) {
    let v;
    a.freeze(), He("processSync", a.Parser), Ke("processSync", a.Compiler);
    const d = me(S);
    return a.process(d, w), Rn("processSync", "process", v), d;
    function w(F) {
      (v = !0), On(F);
    }
  }
}
function An(e, n) {
  return (
    typeof e == "function" &&
    e.prototype &&
    (Gi(e.prototype) || n in e.prototype)
  );
}
function Gi(e) {
  let n;
  for (n in e) if (it.call(e, n)) return !0;
  return !1;
}
function He(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `Parser`");
}
function Ke(e, n) {
  if (typeof n != "function")
    throw new TypeError("Cannot `" + e + "` without `Compiler`");
}
function qe(e, n) {
  if (n)
    throw new Error(
      "Cannot call `" +
        e +
        "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`."
    );
}
function Fn(e) {
  if (!Ge(e) || typeof e.type != "string")
    throw new TypeError("Expected node, got `" + e + "`");
}
function Rn(e, n, t) {
  if (!t)
    throw new Error("`" + e + "` finished async. Use `" + n + "` instead");
}
function me(e) {
  return Xi(e) ? e : new Yi(e);
}
function Xi(e) {
  return !!(e && typeof e == "object" && "message" in e && "messages" in e);
}
function Zi(e) {
  return typeof e == "string" || (0, zi.default)(e);
}
var ea = Te(lr(), 1);
ea.default;
/*! Bundled license information:

is-buffer/index.js:
  (*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)
*/ V({
  background: "white",
  padding: "5vw 5vw",
  img: { marginLeft: "5%", maxWidth: "90%" },
});
V({
  background: "indigo",
  padding: "10vw 5vw 10vw 5vw",
  minHeight: "calc(100vh - 20vw)",
});
const na = be(
    "<div><div>パンクズリスト</div><div><div></div><div></div><div></div></div><div>footer"
  ),
  oa = ({ isSP: e }) =>
    (() => {
      const n = na(),
        t = n.firstChild,
        r = t.nextSibling,
        i = r.firstChild,
        a = i.nextSibling,
        l = a.nextSibling,
        o = r.nextSibling;
      return (
        W(n, ia),
        ae(n, he(Bt, {}), t),
        W(t, aa),
        W(r, ra),
        W(i, In),
        W(a, ta),
        ae(a, () => Mn.t("title")),
        W(l, In),
        ae(n, he(qt, { isSP: e }), o),
        n
      );
    })(),
  ta = V({
    textAlign: "center",
    margin: "20px",
    fontSize: "20px",
    fontFamily: "Gotham Bold",
    fontWeight: "Bold",
    color: "white",
  }),
  In = V({ borderTop: "2px solid #fff", width: "100%" }),
  ra = V({ marginLeft: "10%", width: "80%" }),
  ia = V({ background: "indigo" }),
  aa = V({
    marginLeft: "10%",
    padding: "10px",
    color: "gray",
    fontFamily: "Gotham Bold",
    fontWeight: "Bold",
  });
export { oa as default };
