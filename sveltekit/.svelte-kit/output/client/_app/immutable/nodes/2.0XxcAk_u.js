var es = Object.defineProperty;
var Cn = (r) => {
  throw TypeError(r);
};
var ns = (r, t, e) =>
  t in r
    ? es(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e })
    : (r[t] = e);
var f = (r, t, e) => ns(r, typeof t != "symbol" ? t + "" : t, e),
  tn = (r, t, e) => t.has(r) || Cn("Cannot " + e);
var d = (r, t, e) => (
    tn(r, t, "read from private field"), e ? e.call(r) : t.get(r)
  ),
  I = (r, t, e) =>
    t.has(r)
      ? Cn("Cannot add the same private member more than once")
      : t instanceof WeakSet
        ? t.add(r)
        : t.set(r, e),
  k = (r, t, e, n) => (
    tn(r, t, "write to private field"), n ? n.call(r, e) : t.set(r, e), e
  ),
  _ = (r, t, e) => (tn(r, t, "access private method"), e);
var Sn = (r, t, e, n) => ({
  set _(s) {
    k(r, t, s, e);
  },
  get _() {
    return d(r, t, n);
  },
});
import { s as Ge, n as Jt, r as fr } from "../chunks/scheduler.CtbWrGNo.js";
import {
  S as He,
  i as ze,
  e as P,
  s as M,
  t as Bn,
  c as R,
  a as z,
  y as st,
  f as G,
  b as Ln,
  d as B,
  o as A,
  g as Je,
  h as E,
  z as _t,
  j as rs,
  A as ee,
  B as hr,
  u as en,
  v as nn,
  w as rn,
  k as sn,
  l as on,
  x as an,
} from "../chunks/index.Cyd1-Rh9.js";
import { w as Ke } from "../chunks/index.BjqbIcNX.js";
const ss = "6.13.1";
function is(r, t, e) {
  const n = t.split("|").map((i) => i.trim());
  for (let i = 0; i < n.length; i++)
    switch (t) {
      case "any":
        return;
      case "bigint":
      case "boolean":
      case "number":
      case "string":
        if (typeof r === t) return;
    }
  const s = new Error(`invalid value for type ${t}`);
  throw (
    ((s.code = "INVALID_ARGUMENT"),
    (s.argument = `value.${e}`),
    (s.value = r),
    s)
  );
}
async function fn(r) {
  const t = Object.keys(r);
  return (await Promise.all(t.map((n) => Promise.resolve(r[n])))).reduce(
    (n, s, i) => ((n[t[i]] = s), n),
    {},
  );
}
function N(r, t, e) {
  for (let n in t) {
    let s = t[n];
    const i = e ? e[n] : null;
    i && is(s, i, n),
      Object.defineProperty(r, n, { enumerable: !0, value: s, writable: !1 });
  }
}
function ne(r) {
  if (r == null) return "null";
  if (Array.isArray(r)) return "[ " + r.map(ne).join(", ") + " ]";
  if (r instanceof Uint8Array) {
    const t = "0123456789abcdef";
    let e = "0x";
    for (let n = 0; n < r.length; n++) (e += t[r[n] >> 4]), (e += t[r[n] & 15]);
    return e;
  }
  if (typeof r == "object" && typeof r.toJSON == "function")
    return ne(r.toJSON());
  switch (typeof r) {
    case "boolean":
    case "symbol":
      return r.toString();
    case "bigint":
      return BigInt(r).toString();
    case "number":
      return r.toString();
    case "string":
      return JSON.stringify(r);
    case "object": {
      const t = Object.keys(r);
      return (
        t.sort(), "{ " + t.map((e) => `${ne(e)}: ${ne(r[e])}`).join(", ") + " }"
      );
    }
  }
  return "[ COULD NOT SERIALIZE ]";
}
function fe(r, t) {
  return r && r.code === t;
}
function pr(r) {
  return fe(r, "CALL_EXCEPTION");
}
function me(r, t, e) {
  let n = r;
  {
    const i = [];
    if (e) {
      if ("message" in e || "code" in e || "name" in e)
        throw new Error(`value will overwrite populated values: ${ne(e)}`);
      for (const o in e) {
        if (o === "shortMessage") continue;
        const a = e[o];
        i.push(o + "=" + ne(a));
      }
    }
    i.push(`code=${t}`),
      i.push(`version=${ss}`),
      i.length && (r += " (" + i.join(", ") + ")");
  }
  let s;
  switch (t) {
    case "INVALID_ARGUMENT":
      s = new TypeError(r);
      break;
    case "NUMERIC_FAULT":
    case "BUFFER_OVERRUN":
      s = new RangeError(r);
      break;
    default:
      s = new Error(r);
  }
  return (
    N(s, { code: t }),
    e && Object.assign(s, e),
    s.shortMessage == null && N(s, { shortMessage: n }),
    s
  );
}
function b(r, t, e, n) {
  if (!r) throw me(t, e, n);
}
function g(r, t, e, n) {
  b(r, t, "INVALID_ARGUMENT", { argument: e, value: n });
}
function dr(r, t, e) {
  e == null && (e = ""),
    e && (e = ": " + e),
    b(r >= t, "missing arguemnt" + e, "MISSING_ARGUMENT", {
      count: r,
      expectedCount: t,
    }),
    b(r <= t, "too many arguments" + e, "UNEXPECTED_ARGUMENT", {
      count: r,
      expectedCount: t,
    });
}
["NFD", "NFC", "NFKD", "NFKC"].reduce((r, t) => {
  try {
    if ("test".normalize(t) !== "test") throw new Error("bad");
    if (t === "NFD" && "é".normalize("NFD") !== "é") throw new Error("broken");
    r.push(t);
  } catch {}
  return r;
}, []);
function vn(r, t, e) {
  if ((e == null && (e = ""), r !== t)) {
    let n = e,
      s = "new";
    e && ((n += "."), (s += " " + e)),
      b(
        !1,
        `private constructor; use ${n}from* methods`,
        "UNSUPPORTED_OPERATION",
        { operation: s },
      );
  }
}
function gr(r, t, e) {
  if (r instanceof Uint8Array) return e ? new Uint8Array(r) : r;
  if (typeof r == "string" && r.match(/^0x(?:[0-9a-f][0-9a-f])*$/i)) {
    const n = new Uint8Array((r.length - 2) / 2);
    let s = 2;
    for (let i = 0; i < n.length; i++)
      (n[i] = parseInt(r.substring(s, s + 2), 16)), (s += 2);
    return n;
  }
  g(!1, "invalid BytesLike value", t || "value", r);
}
function vt(r, t) {
  return gr(r, t, !1);
}
function dt(r, t) {
  return gr(r, t, !0);
}
function Et(r, t) {
  return !(
    typeof r != "string" ||
    !r.match(/^0x[0-9A-Fa-f]*$/) ||
    (typeof t == "number" && r.length !== 2 + 2 * t) ||
    (t === !0 && r.length % 2 !== 0)
  );
}
function os(r) {
  return Et(r, !0) || r instanceof Uint8Array;
}
const $n = "0123456789abcdef";
function L(r) {
  const t = vt(r);
  let e = "0x";
  for (let n = 0; n < t.length; n++) {
    const s = t[n];
    e += $n[(s & 240) >> 4] + $n[s & 15];
  }
  return e;
}
function ie(r) {
  return "0x" + r.map((t) => L(t).substring(2)).join("");
}
function jt(r, t, e) {
  const n = vt(r);
  return (
    e != null &&
      e > n.length &&
      b(!1, "cannot slice beyond data bounds", "BUFFER_OVERRUN", {
        buffer: n,
        length: n.length,
        offset: e,
      }),
    L(n.slice(t ?? 0, e ?? n.length))
  );
}
function yr(r, t, e) {
  const n = vt(r);
  b(t >= n.length, "padding exceeds data length", "BUFFER_OVERRUN", {
    buffer: new Uint8Array(n),
    length: t,
    offset: t + 1,
  });
  const s = new Uint8Array(t);
  return s.fill(0), e ? s.set(n, t - n.length) : s.set(n, 0), L(s);
}
function as(r, t) {
  return yr(r, t, !0);
}
function cs(r, t) {
  return yr(r, t, !1);
}
const We = BigInt(0),
  it = BigInt(1),
  re = 9007199254740991;
function ls(r, t) {
  const e = Xe(r, "value"),
    n = BigInt(kt(t, "width"));
  if (
    (b(e >> n === We, "overflow", "NUMERIC_FAULT", {
      operation: "fromTwos",
      fault: "overflow",
      value: r,
    }),
    e >> (n - it))
  ) {
    const s = (it << n) - it;
    return -((~e & s) + it);
  }
  return e;
}
function us(r, t) {
  let e = St(r, "value");
  const n = BigInt(kt(t, "width")),
    s = it << (n - it);
  if (e < We) {
    (e = -e),
      b(e <= s, "too low", "NUMERIC_FAULT", {
        operation: "toTwos",
        fault: "overflow",
        value: r,
      });
    const i = (it << n) - it;
    return (~e & i) + it;
  } else
    b(e < s, "too high", "NUMERIC_FAULT", {
      operation: "toTwos",
      fault: "overflow",
      value: r,
    });
  return e;
}
function Re(r, t) {
  const e = Xe(r, "value"),
    n = BigInt(kt(t, "bits"));
  return e & ((it << n) - it);
}
function St(r, t) {
  switch (typeof r) {
    case "bigint":
      return r;
    case "number":
      return (
        g(Number.isInteger(r), "underflow", t || "value", r),
        g(r >= -re && r <= re, "overflow", t || "value", r),
        BigInt(r)
      );
    case "string":
      try {
        if (r === "") throw new Error("empty string");
        return r[0] === "-" && r[1] !== "-"
          ? -BigInt(r.substring(1))
          : BigInt(r);
      } catch (e) {
        g(!1, `invalid BigNumberish string: ${e.message}`, t || "value", r);
      }
  }
  g(!1, "invalid BigNumberish value", t || "value", r);
}
function Xe(r, t) {
  const e = St(r, t);
  return (
    b(e >= We, "unsigned value cannot be negative", "NUMERIC_FAULT", {
      fault: "overflow",
      operation: "getUint",
      value: r,
    }),
    e
  );
}
const Fn = "0123456789abcdef";
function mr(r) {
  if (r instanceof Uint8Array) {
    let t = "0x0";
    for (const e of r) (t += Fn[e >> 4]), (t += Fn[e & 15]);
    return BigInt(t);
  }
  return St(r);
}
function kt(r, t) {
  switch (typeof r) {
    case "bigint":
      return g(r >= -re && r <= re, "overflow", t || "value", r), Number(r);
    case "number":
      return (
        g(Number.isInteger(r), "underflow", t || "value", r),
        g(r >= -re && r <= re, "overflow", t || "value", r),
        r
      );
    case "string":
      try {
        if (r === "") throw new Error("empty string");
        return kt(BigInt(r), t);
      } catch (e) {
        g(!1, `invalid numeric string: ${e.message}`, t || "value", r);
      }
  }
  g(!1, "invalid numeric value", t || "value", r);
}
function fs(r) {
  return kt(mr(r));
}
function wr(r, t) {
  let n = Xe(r, "value").toString(16);
  if (t == null) n.length % 2 && (n = "0" + n);
  else {
    const s = kt(t, "width");
    for (
      b(
        s * 2 >= n.length,
        `value exceeds width (${s} bytes)`,
        "NUMERIC_FAULT",
        { operation: "toBeHex", fault: "overflow", value: r },
      );
      n.length < s * 2;

    )
      n = "0" + n;
  }
  return "0x" + n;
}
function hs(r) {
  const t = Xe(r, "value");
  if (t === We) return new Uint8Array([]);
  let e = t.toString(16);
  e.length % 2 && (e = "0" + e);
  const n = new Uint8Array(e.length / 2);
  for (let s = 0; s < n.length; s++) {
    const i = s * 2;
    n[s] = parseInt(e.substring(i, i + 2), 16);
  }
  return n;
}
var oe;
class ps {
  constructor(t, e, n) {
    f(this, "filter");
    f(this, "emitter");
    I(this, oe);
    k(this, oe, e), N(this, { emitter: t, filter: n });
  }
  async removeListener() {
    d(this, oe) != null && (await this.emitter.off(this.filter, d(this, oe)));
  }
}
oe = new WeakMap();
function ds(r, t, e, n, s) {
  g(!1, `invalid codepoint at offset ${t}; ${r}`, "bytes", e);
}
function br(r, t, e, n, s) {
  if (r === "BAD_PREFIX" || r === "UNEXPECTED_CONTINUE") {
    let i = 0;
    for (let o = t + 1; o < e.length && e[o] >> 6 === 2; o++) i++;
    return i;
  }
  return r === "OVERRUN" ? e.length - t - 1 : 0;
}
function gs(r, t, e, n, s) {
  return r === "OVERLONG"
    ? (g(
        typeof s == "number",
        "invalid bad code point for replacement",
        "badCodepoint",
        s,
      ),
      n.push(s),
      0)
    : (n.push(65533), br(r, t, e));
}
const ys = Object.freeze({ error: ds, ignore: br, replace: gs });
function ms(r, t) {
  t == null && (t = ys.error);
  const e = vt(r, "bytes"),
    n = [];
  let s = 0;
  for (; s < e.length; ) {
    const i = e[s++];
    if (!(i >> 7)) {
      n.push(i);
      continue;
    }
    let o = null,
      a = null;
    if ((i & 224) === 192) (o = 1), (a = 127);
    else if ((i & 240) === 224) (o = 2), (a = 2047);
    else if ((i & 248) === 240) (o = 3), (a = 65535);
    else {
      (i & 192) === 128
        ? (s += t("UNEXPECTED_CONTINUE", s - 1, e, n))
        : (s += t("BAD_PREFIX", s - 1, e, n));
      continue;
    }
    if (s - 1 + o >= e.length) {
      s += t("OVERRUN", s - 1, e, n);
      continue;
    }
    let c = i & ((1 << (8 - o - 1)) - 1);
    for (let l = 0; l < o; l++) {
      let u = e[s];
      if ((u & 192) != 128) {
        (s += t("MISSING_CONTINUE", s, e, n)), (c = null);
        break;
      }
      (c = (c << 6) | (u & 63)), s++;
    }
    if (c !== null) {
      if (c > 1114111) {
        s += t("OUT_OF_RANGE", s - 1 - o, e, n, c);
        continue;
      }
      if (c >= 55296 && c <= 57343) {
        s += t("UTF16_SURROGATE", s - 1 - o, e, n, c);
        continue;
      }
      if (c <= a) {
        s += t("OVERLONG", s - 1 - o, e, n, c);
        continue;
      }
      n.push(c);
    }
  }
  return n;
}
function Er(r, t) {
  g(typeof r == "string", "invalid string value", "str", r);
  let e = [];
  for (let n = 0; n < r.length; n++) {
    const s = r.charCodeAt(n);
    if (s < 128) e.push(s);
    else if (s < 2048) e.push((s >> 6) | 192), e.push((s & 63) | 128);
    else if ((s & 64512) == 55296) {
      n++;
      const i = r.charCodeAt(n);
      g(
        n < r.length && (i & 64512) === 56320,
        "invalid surrogate pair",
        "str",
        r,
      );
      const o = 65536 + ((s & 1023) << 10) + (i & 1023);
      e.push((o >> 18) | 240),
        e.push(((o >> 12) & 63) | 128),
        e.push(((o >> 6) & 63) | 128),
        e.push((o & 63) | 128);
    } else
      e.push((s >> 12) | 224),
        e.push(((s >> 6) & 63) | 128),
        e.push((s & 63) | 128);
  }
  return new Uint8Array(e);
}
function ws(r) {
  return r
    .map((t) =>
      t <= 65535
        ? String.fromCharCode(t)
        : ((t -= 65536),
          String.fromCharCode(((t >> 10) & 1023) + 55296, (t & 1023) + 56320)),
    )
    .join("");
}
function bs(r, t) {
  return ws(ms(r, t));
}
const J = 32,
  hn = new Uint8Array(J),
  Es = ["then"],
  Ie = {},
  xr = new WeakMap();
function $t(r) {
  return xr.get(r);
}
function Dn(r, t) {
  xr.set(r, t);
}
function pe(r, t) {
  const e = new Error(
    `deferred error during ABI decoding triggered accessing ${r}`,
  );
  throw ((e.error = t), e);
}
function pn(r, t, e) {
  return r.indexOf(null) >= 0
    ? t.map((n, s) => (n instanceof he ? pn($t(n), n, e) : n))
    : r.reduce((n, s, i) => {
        let o = t.getValue(s);
        return (
          s in n || (e && o instanceof he && (o = pn($t(o), o, e)), (n[s] = o)),
          n
        );
      }, {});
}
var ae;
const se = class se extends Array {
  constructor(...e) {
    const n = e[0];
    let s = e[1],
      i = (e[2] || []).slice(),
      o = !0;
    n !== Ie && ((s = e), (i = []), (o = !1));
    super(s.length);
    I(this, ae);
    s.forEach((l, u) => {
      this[u] = l;
    });
    const a = i.reduce(
      (l, u) => (typeof u == "string" && l.set(u, (l.get(u) || 0) + 1), l),
      new Map(),
    );
    if (
      (Dn(
        this,
        Object.freeze(
          s.map((l, u) => {
            const h = i[u];
            return h != null && a.get(h) === 1 ? h : null;
          }),
        ),
      ),
      k(this, ae, []),
      d(this, ae) == null && d(this, ae),
      !o)
    )
      return;
    Object.freeze(this);
    const c = new Proxy(this, {
      get: (l, u, h) => {
        if (typeof u == "string") {
          if (u.match(/^[0-9]+$/)) {
            const y = kt(u, "%index");
            if (y < 0 || y >= this.length)
              throw new RangeError("out of result range");
            const w = l[y];
            return w instanceof Error && pe(`index ${y}`, w), w;
          }
          if (Es.indexOf(u) >= 0) return Reflect.get(l, u, h);
          const p = l[u];
          if (p instanceof Function)
            return function (...y) {
              return p.apply(this === h ? l : this, y);
            };
          if (!(u in l)) return l.getValue.apply(this === h ? l : this, [u]);
        }
        return Reflect.get(l, u, h);
      },
    });
    return Dn(c, $t(this)), c;
  }
  toArray(e) {
    const n = [];
    return (
      this.forEach((s, i) => {
        s instanceof Error && pe(`index ${i}`, s),
          e && s instanceof se && (s = s.toArray(e)),
          n.push(s);
      }),
      n
    );
  }
  toObject(e) {
    const n = $t(this);
    return n.reduce(
      (s, i, o) => (
        b(i != null, `value at index ${o} unnamed`, "UNSUPPORTED_OPERATION", {
          operation: "toObject()",
        }),
        pn(n, this, e)
      ),
      {},
    );
  }
  slice(e, n) {
    e == null && (e = 0),
      e < 0 && ((e += this.length), e < 0 && (e = 0)),
      n == null && (n = this.length),
      n < 0 && ((n += this.length), n < 0 && (n = 0)),
      n > this.length && (n = this.length);
    const s = $t(this),
      i = [],
      o = [];
    for (let a = e; a < n; a++) i.push(this[a]), o.push(s[a]);
    return new se(Ie, i, o);
  }
  filter(e, n) {
    const s = $t(this),
      i = [],
      o = [];
    for (let a = 0; a < this.length; a++) {
      const c = this[a];
      c instanceof Error && pe(`index ${a}`, c),
        e.call(n, c, a, this) && (i.push(c), o.push(s[a]));
    }
    return new se(Ie, i, o);
  }
  map(e, n) {
    const s = [];
    for (let i = 0; i < this.length; i++) {
      const o = this[i];
      o instanceof Error && pe(`index ${i}`, o), s.push(e.call(n, o, i, this));
    }
    return s;
  }
  getValue(e) {
    const n = $t(this).indexOf(e);
    if (n === -1) return;
    const s = this[n];
    return (
      s instanceof Error && pe(`property ${JSON.stringify(e)}`, s.error), s
    );
  }
  static fromItems(e, n) {
    return new se(Ie, e, n);
  }
};
ae = new WeakMap();
let he = se;
function Vn(r) {
  let t = hs(r);
  return (
    b(t.length <= J, "value out-of-bounds", "BUFFER_OVERRUN", {
      buffer: t,
      length: J,
      offset: t.length,
    }),
    t.length !== J && (t = dt(ie([hn.slice(t.length % J), t]))),
    t
  );
}
class Tt {
  constructor(t, e, n, s) {
    f(this, "name");
    f(this, "type");
    f(this, "localName");
    f(this, "dynamic");
    N(
      this,
      { name: t, type: e, localName: n, dynamic: s },
      {
        name: "string",
        type: "string",
        localName: "string",
        dynamic: "boolean",
      },
    );
  }
  _throwError(t, e) {
    g(!1, t, this.localName, e);
  }
}
var bt, Vt, ce, Se;
class dn {
  constructor() {
    I(this, ce);
    I(this, bt);
    I(this, Vt);
    k(this, bt, []), k(this, Vt, 0);
  }
  get data() {
    return ie(d(this, bt));
  }
  get length() {
    return d(this, Vt);
  }
  appendWriter(t) {
    return _(this, ce, Se).call(this, dt(t.data));
  }
  writeBytes(t) {
    let e = dt(t);
    const n = e.length % J;
    return n && (e = dt(ie([e, hn.slice(n)]))), _(this, ce, Se).call(this, e);
  }
  writeValue(t) {
    return _(this, ce, Se).call(this, Vn(t));
  }
  writeUpdatableValue() {
    const t = d(this, bt).length;
    return (
      d(this, bt).push(hn),
      k(this, Vt, d(this, Vt) + J),
      (e) => {
        d(this, bt)[t] = Vn(e);
      }
    );
  }
}
(bt = new WeakMap()),
  (Vt = new WeakMap()),
  (ce = new WeakSet()),
  (Se = function (t) {
    return d(this, bt).push(t), k(this, Vt, d(this, Vt) + t.length), t.length;
  });
var W, j, Mt, Gt, Rt, Zt, yn, Nr;
const In = class In {
  constructor(t, e, n) {
    I(this, Zt);
    f(this, "allowLoose");
    I(this, W);
    I(this, j);
    I(this, Mt);
    I(this, Gt);
    I(this, Rt);
    N(this, { allowLoose: !!e }),
      k(this, W, dt(t)),
      k(this, Mt, 0),
      k(this, Gt, null),
      k(this, Rt, n ?? 1024),
      k(this, j, 0);
  }
  get data() {
    return L(d(this, W));
  }
  get dataLength() {
    return d(this, W).length;
  }
  get consumed() {
    return d(this, j);
  }
  get bytes() {
    return new Uint8Array(d(this, W));
  }
  subReader(t) {
    const e = new In(
      d(this, W).slice(d(this, j) + t),
      this.allowLoose,
      d(this, Rt),
    );
    return k(e, Gt, this), e;
  }
  readBytes(t, e) {
    let n = _(this, Zt, Nr).call(this, 0, t, !!e);
    return (
      _(this, Zt, yn).call(this, t),
      k(this, j, d(this, j) + n.length),
      n.slice(0, t)
    );
  }
  readValue() {
    return mr(this.readBytes(J));
  }
  readIndex() {
    return fs(this.readBytes(J));
  }
};
(W = new WeakMap()),
  (j = new WeakMap()),
  (Mt = new WeakMap()),
  (Gt = new WeakMap()),
  (Rt = new WeakMap()),
  (Zt = new WeakSet()),
  (yn = function (t) {
    var e;
    if (d(this, Gt)) return _((e = d(this, Gt)), Zt, yn).call(e, t);
    k(this, Mt, d(this, Mt) + t),
      b(
        d(this, Rt) < 1 || d(this, Mt) <= d(this, Rt) * this.dataLength,
        `compressed ABI data exceeds inflation ratio of ${d(this, Rt)} ( see: https://github.com/ethers-io/ethers.js/issues/4537 )`,
        "BUFFER_OVERRUN",
        {
          buffer: dt(d(this, W)),
          offset: d(this, j),
          length: t,
          info: { bytesRead: d(this, Mt), dataLength: this.dataLength },
        },
      );
  }),
  (Nr = function (t, e, n) {
    let s = Math.ceil(e / J) * J;
    return (
      d(this, j) + s > d(this, W).length &&
        (this.allowLoose && n && d(this, j) + e <= d(this, W).length
          ? (s = e)
          : b(!1, "data out-of-bounds", "BUFFER_OVERRUN", {
              buffer: dt(d(this, W)),
              length: d(this, W).length,
              offset: d(this, j) + s,
            })),
      d(this, W).slice(d(this, j), d(this, j) + s)
    );
  });
let gn = In;
function Mn(r) {
  if (!Number.isSafeInteger(r) || r < 0)
    throw new Error(`Wrong positive integer: ${r}`);
}
function vr(r, ...t) {
  if (!(r instanceof Uint8Array)) throw new Error("Expected Uint8Array");
  if (t.length > 0 && !t.includes(r.length))
    throw new Error(
      `Expected Uint8Array of length ${t}, not of length=${r.length}`,
    );
}
function Gn(r, t = !0) {
  if (r.destroyed) throw new Error("Hash instance has been destroyed");
  if (t && r.finished) throw new Error("Hash#digest() has already been called");
}
function xs(r, t) {
  vr(r);
  const e = t.outputLen;
  if (r.length < e)
    throw new Error(
      `digestInto() expects output buffer of length at least ${e}`,
    );
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */ const Ns =
    (r) => r instanceof Uint8Array,
  vs = (r) =>
    new Uint32Array(r.buffer, r.byteOffset, Math.floor(r.byteLength / 4)),
  Os = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
if (!Os) throw new Error("Non little-endian hardware is not supported");
function ks(r) {
  if (typeof r != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof r}`);
  return new Uint8Array(new TextEncoder().encode(r));
}
function Or(r) {
  if ((typeof r == "string" && (r = ks(r)), !Ns(r)))
    throw new Error(`expected Uint8Array, got ${typeof r}`);
  return r;
}
class Ts {
  clone() {
    return this._cloneInto();
  }
}
function As(r) {
  const t = (n) => r().update(Or(n)).digest(),
    e = r();
  return (
    (t.outputLen = e.outputLen),
    (t.blockLen = e.blockLen),
    (t.create = () => r()),
    t
  );
}
const Ue = BigInt(2 ** 32 - 1),
  Hn = BigInt(32);
function Ps(r, t = !1) {
  return t
    ? { h: Number(r & Ue), l: Number((r >> Hn) & Ue) }
    : { h: Number((r >> Hn) & Ue) | 0, l: Number(r & Ue) | 0 };
}
function Rs(r, t = !1) {
  let e = new Uint32Array(r.length),
    n = new Uint32Array(r.length);
  for (let s = 0; s < r.length; s++) {
    const { h: i, l: o } = Ps(r[s], t);
    [e[s], n[s]] = [i, o];
  }
  return [e, n];
}
const Is = (r, t, e) => (r << e) | (t >>> (32 - e)),
  Us = (r, t, e) => (t << e) | (r >>> (32 - e)),
  _s = (r, t, e) => (t << (e - 32)) | (r >>> (64 - e)),
  Cs = (r, t, e) => (r << (e - 32)) | (t >>> (64 - e)),
  [kr, Tr, Ar] = [[], [], []],
  Ss = BigInt(0),
  de = BigInt(1),
  Bs = BigInt(2),
  Ls = BigInt(7),
  $s = BigInt(256),
  Fs = BigInt(113);
for (let r = 0, t = de, e = 1, n = 0; r < 24; r++) {
  ([e, n] = [n, (2 * e + 3 * n) % 5]),
    kr.push(2 * (5 * n + e)),
    Tr.push((((r + 1) * (r + 2)) / 2) % 64);
  let s = Ss;
  for (let i = 0; i < 7; i++)
    (t = ((t << de) ^ ((t >> Ls) * Fs)) % $s),
      t & Bs && (s ^= de << ((de << BigInt(i)) - de));
  Ar.push(s);
}
const [Ds, Vs] = Rs(Ar, !0),
  zn = (r, t, e) => (e > 32 ? _s(r, t, e) : Is(r, t, e)),
  Jn = (r, t, e) => (e > 32 ? Cs(r, t, e) : Us(r, t, e));
function Ms(r, t = 24) {
  const e = new Uint32Array(10);
  for (let n = 24 - t; n < 24; n++) {
    for (let o = 0; o < 10; o++)
      e[o] = r[o] ^ r[o + 10] ^ r[o + 20] ^ r[o + 30] ^ r[o + 40];
    for (let o = 0; o < 10; o += 2) {
      const a = (o + 8) % 10,
        c = (o + 2) % 10,
        l = e[c],
        u = e[c + 1],
        h = zn(l, u, 1) ^ e[a],
        p = Jn(l, u, 1) ^ e[a + 1];
      for (let y = 0; y < 50; y += 10) (r[o + y] ^= h), (r[o + y + 1] ^= p);
    }
    let s = r[2],
      i = r[3];
    for (let o = 0; o < 24; o++) {
      const a = Tr[o],
        c = zn(s, i, a),
        l = Jn(s, i, a),
        u = kr[o];
      (s = r[u]), (i = r[u + 1]), (r[u] = c), (r[u + 1] = l);
    }
    for (let o = 0; o < 50; o += 10) {
      for (let a = 0; a < 10; a++) e[a] = r[o + a];
      for (let a = 0; a < 10; a++)
        r[o + a] ^= ~e[(a + 2) % 10] & e[(a + 4) % 10];
    }
    (r[0] ^= Ds[n]), (r[1] ^= Vs[n]);
  }
  e.fill(0);
}
class On extends Ts {
  constructor(t, e, n, s = !1, i = 24) {
    if (
      (super(),
      (this.blockLen = t),
      (this.suffix = e),
      (this.outputLen = n),
      (this.enableXOF = s),
      (this.rounds = i),
      (this.pos = 0),
      (this.posOut = 0),
      (this.finished = !1),
      (this.destroyed = !1),
      Mn(n),
      0 >= this.blockLen || this.blockLen >= 200)
    )
      throw new Error("Sha3 supports only keccak-f1600 function");
    (this.state = new Uint8Array(200)), (this.state32 = vs(this.state));
  }
  keccak() {
    Ms(this.state32, this.rounds), (this.posOut = 0), (this.pos = 0);
  }
  update(t) {
    Gn(this);
    const { blockLen: e, state: n } = this;
    t = Or(t);
    const s = t.length;
    for (let i = 0; i < s; ) {
      const o = Math.min(e - this.pos, s - i);
      for (let a = 0; a < o; a++) n[this.pos++] ^= t[i++];
      this.pos === e && this.keccak();
    }
    return this;
  }
  finish() {
    if (this.finished) return;
    this.finished = !0;
    const { state: t, suffix: e, pos: n, blockLen: s } = this;
    (t[n] ^= e),
      e & 128 && n === s - 1 && this.keccak(),
      (t[s - 1] ^= 128),
      this.keccak();
  }
  writeInto(t) {
    Gn(this, !1), vr(t), this.finish();
    const e = this.state,
      { blockLen: n } = this;
    for (let s = 0, i = t.length; s < i; ) {
      this.posOut >= n && this.keccak();
      const o = Math.min(n - this.posOut, i - s);
      t.set(e.subarray(this.posOut, this.posOut + o), s),
        (this.posOut += o),
        (s += o);
    }
    return t;
  }
  xofInto(t) {
    if (!this.enableXOF)
      throw new Error("XOF is not possible for this instance");
    return this.writeInto(t);
  }
  xof(t) {
    return Mn(t), this.xofInto(new Uint8Array(t));
  }
  digestInto(t) {
    if ((xs(t, this), this.finished))
      throw new Error("digest() was already called");
    return this.writeInto(t), this.destroy(), t;
  }
  digest() {
    return this.digestInto(new Uint8Array(this.outputLen));
  }
  destroy() {
    (this.destroyed = !0), this.state.fill(0);
  }
  _cloneInto(t) {
    const {
      blockLen: e,
      suffix: n,
      outputLen: s,
      rounds: i,
      enableXOF: o,
    } = this;
    return (
      t || (t = new On(e, n, s, o, i)),
      t.state32.set(this.state32),
      (t.pos = this.pos),
      (t.posOut = this.posOut),
      (t.finished = this.finished),
      (t.rounds = i),
      (t.suffix = n),
      (t.outputLen = s),
      (t.enableXOF = o),
      (t.destroyed = this.destroyed),
      t
    );
  }
}
const Gs = (r, t, e) => As(() => new On(t, r, e)),
  Hs = Gs(1, 136, 256 / 8);
let Pr = !1;
const Rr = function (r) {
  return Hs(r);
};
let Ir = Rr;
function Ct(r) {
  const t = vt(r, "data");
  return L(Ir(t));
}
Ct._ = Rr;
Ct.lock = function () {
  Pr = !0;
};
Ct.register = function (r) {
  if (Pr) throw new TypeError("keccak256 is locked");
  Ir = r;
};
Object.freeze(Ct);
const zs = BigInt(0),
  Js = BigInt(36);
function Kn(r) {
  r = r.toLowerCase();
  const t = r.substring(2).split(""),
    e = new Uint8Array(40);
  for (let s = 0; s < 40; s++) e[s] = t[s].charCodeAt(0);
  const n = vt(Ct(e));
  for (let s = 0; s < 40; s += 2)
    n[s >> 1] >> 4 >= 8 && (t[s] = t[s].toUpperCase()),
      (n[s >> 1] & 15) >= 8 && (t[s + 1] = t[s + 1].toUpperCase());
  return "0x" + t.join("");
}
const kn = {};
for (let r = 0; r < 10; r++) kn[String(r)] = String(r);
for (let r = 0; r < 26; r++) kn[String.fromCharCode(65 + r)] = String(10 + r);
const Wn = 15;
function Ks(r) {
  (r = r.toUpperCase()), (r = r.substring(4) + r.substring(0, 2) + "00");
  let t = r
    .split("")
    .map((n) => kn[n])
    .join("");
  for (; t.length >= Wn; ) {
    let n = t.substring(0, Wn);
    t = (parseInt(n, 10) % 97) + t.substring(n.length);
  }
  let e = String(98 - (parseInt(t, 10) % 97));
  for (; e.length < 2; ) e = "0" + e;
  return e;
}
const Ws = (function () {
  const r = {};
  for (let t = 0; t < 36; t++) {
    const e = "0123456789abcdefghijklmnopqrstuvwxyz"[t];
    r[e] = BigInt(t);
  }
  return r;
})();
function Xs(r) {
  r = r.toLowerCase();
  let t = zs;
  for (let e = 0; e < r.length; e++) t = t * Js + Ws[r[e]];
  return t;
}
function Kt(r) {
  if (
    (g(typeof r == "string", "invalid address", "address", r),
    r.match(/^(0x)?[0-9a-fA-F]{40}$/))
  ) {
    r.startsWith("0x") || (r = "0x" + r);
    const t = Kn(r);
    return (
      g(
        !r.match(/([A-F].*[a-f])|([a-f].*[A-F])/) || t === r,
        "bad address checksum",
        "address",
        r,
      ),
      t
    );
  }
  if (r.match(/^XE[0-9]{2}[0-9A-Za-z]{30,31}$/)) {
    g(r.substring(2, 4) === Ks(r), "bad icap checksum", "address", r);
    let t = Xs(r.substring(4)).toString(16);
    for (; t.length < 40; ) t = "0" + t;
    return Kn("0x" + t);
  }
  g(!1, "invalid address", "address", r);
}
function Ur(r) {
  return r && typeof r.getAddress == "function";
}
async function cn(r, t) {
  const e = await t;
  return (
    (e == null || e === "0x0000000000000000000000000000000000000000") &&
      (b(typeof r != "string", "unconfigured name", "UNCONFIGURED_NAME", {
        value: r,
      }),
      g(
        !1,
        "invalid AddressLike value; did not resolve to a value address",
        "target",
        r,
      )),
    Kt(e)
  );
}
function we(r, t) {
  if (typeof r == "string")
    return r.match(/^0x[0-9a-f]{40}$/i)
      ? Kt(r)
      : (b(
          t != null,
          "ENS resolution requires a provider",
          "UNSUPPORTED_OPERATION",
          { operation: "resolveName" },
        ),
        cn(r, t.resolveName(r)));
  if (Ur(r)) return cn(r, r.getAddress());
  if (r && typeof r.then == "function") return cn(r, r);
  g(!1, "unsupported addressable value", "target", r);
}
const yt = {};
function m(r, t) {
  let e = !1;
  return (
    t < 0 && ((e = !0), (t *= -1)),
    new H(yt, `${e ? "" : "u"}int${t}`, r, { signed: e, width: t })
  );
}
function T(r, t) {
  return new H(yt, `bytes${t || ""}`, r, { size: t });
}
const Xn = Symbol.for("_ethers_typed");
var Ht;
const mt = class mt {
  constructor(t, e, n, s) {
    f(this, "type");
    f(this, "value");
    I(this, Ht);
    f(this, "_typedSymbol");
    s == null && (s = null),
      vn(yt, t, "Typed"),
      N(this, { _typedSymbol: Xn, type: e, value: n }),
      k(this, Ht, s),
      this.format();
  }
  format() {
    if (this.type === "array") throw new Error("");
    if (this.type === "dynamicArray") throw new Error("");
    return this.type === "tuple"
      ? `tuple(${this.value.map((t) => t.format()).join(",")})`
      : this.type;
  }
  defaultValue() {
    return 0;
  }
  minValue() {
    return 0;
  }
  maxValue() {
    return 0;
  }
  isBigInt() {
    return !!this.type.match(/^u?int[0-9]+$/);
  }
  isData() {
    return this.type.startsWith("bytes");
  }
  isString() {
    return this.type === "string";
  }
  get tupleName() {
    if (this.type !== "tuple") throw TypeError("not a tuple");
    return d(this, Ht);
  }
  get arrayLength() {
    if (this.type !== "array") throw TypeError("not an array");
    return d(this, Ht) === !0
      ? -1
      : d(this, Ht) === !1
        ? this.value.length
        : null;
  }
  static from(t, e) {
    return new mt(yt, t, e);
  }
  static uint8(t) {
    return m(t, 8);
  }
  static uint16(t) {
    return m(t, 16);
  }
  static uint24(t) {
    return m(t, 24);
  }
  static uint32(t) {
    return m(t, 32);
  }
  static uint40(t) {
    return m(t, 40);
  }
  static uint48(t) {
    return m(t, 48);
  }
  static uint56(t) {
    return m(t, 56);
  }
  static uint64(t) {
    return m(t, 64);
  }
  static uint72(t) {
    return m(t, 72);
  }
  static uint80(t) {
    return m(t, 80);
  }
  static uint88(t) {
    return m(t, 88);
  }
  static uint96(t) {
    return m(t, 96);
  }
  static uint104(t) {
    return m(t, 104);
  }
  static uint112(t) {
    return m(t, 112);
  }
  static uint120(t) {
    return m(t, 120);
  }
  static uint128(t) {
    return m(t, 128);
  }
  static uint136(t) {
    return m(t, 136);
  }
  static uint144(t) {
    return m(t, 144);
  }
  static uint152(t) {
    return m(t, 152);
  }
  static uint160(t) {
    return m(t, 160);
  }
  static uint168(t) {
    return m(t, 168);
  }
  static uint176(t) {
    return m(t, 176);
  }
  static uint184(t) {
    return m(t, 184);
  }
  static uint192(t) {
    return m(t, 192);
  }
  static uint200(t) {
    return m(t, 200);
  }
  static uint208(t) {
    return m(t, 208);
  }
  static uint216(t) {
    return m(t, 216);
  }
  static uint224(t) {
    return m(t, 224);
  }
  static uint232(t) {
    return m(t, 232);
  }
  static uint240(t) {
    return m(t, 240);
  }
  static uint248(t) {
    return m(t, 248);
  }
  static uint256(t) {
    return m(t, 256);
  }
  static uint(t) {
    return m(t, 256);
  }
  static int8(t) {
    return m(t, -8);
  }
  static int16(t) {
    return m(t, -16);
  }
  static int24(t) {
    return m(t, -24);
  }
  static int32(t) {
    return m(t, -32);
  }
  static int40(t) {
    return m(t, -40);
  }
  static int48(t) {
    return m(t, -48);
  }
  static int56(t) {
    return m(t, -56);
  }
  static int64(t) {
    return m(t, -64);
  }
  static int72(t) {
    return m(t, -72);
  }
  static int80(t) {
    return m(t, -80);
  }
  static int88(t) {
    return m(t, -88);
  }
  static int96(t) {
    return m(t, -96);
  }
  static int104(t) {
    return m(t, -104);
  }
  static int112(t) {
    return m(t, -112);
  }
  static int120(t) {
    return m(t, -120);
  }
  static int128(t) {
    return m(t, -128);
  }
  static int136(t) {
    return m(t, -136);
  }
  static int144(t) {
    return m(t, -144);
  }
  static int152(t) {
    return m(t, -152);
  }
  static int160(t) {
    return m(t, -160);
  }
  static int168(t) {
    return m(t, -168);
  }
  static int176(t) {
    return m(t, -176);
  }
  static int184(t) {
    return m(t, -184);
  }
  static int192(t) {
    return m(t, -192);
  }
  static int200(t) {
    return m(t, -200);
  }
  static int208(t) {
    return m(t, -208);
  }
  static int216(t) {
    return m(t, -216);
  }
  static int224(t) {
    return m(t, -224);
  }
  static int232(t) {
    return m(t, -232);
  }
  static int240(t) {
    return m(t, -240);
  }
  static int248(t) {
    return m(t, -248);
  }
  static int256(t) {
    return m(t, -256);
  }
  static int(t) {
    return m(t, -256);
  }
  static bytes1(t) {
    return T(t, 1);
  }
  static bytes2(t) {
    return T(t, 2);
  }
  static bytes3(t) {
    return T(t, 3);
  }
  static bytes4(t) {
    return T(t, 4);
  }
  static bytes5(t) {
    return T(t, 5);
  }
  static bytes6(t) {
    return T(t, 6);
  }
  static bytes7(t) {
    return T(t, 7);
  }
  static bytes8(t) {
    return T(t, 8);
  }
  static bytes9(t) {
    return T(t, 9);
  }
  static bytes10(t) {
    return T(t, 10);
  }
  static bytes11(t) {
    return T(t, 11);
  }
  static bytes12(t) {
    return T(t, 12);
  }
  static bytes13(t) {
    return T(t, 13);
  }
  static bytes14(t) {
    return T(t, 14);
  }
  static bytes15(t) {
    return T(t, 15);
  }
  static bytes16(t) {
    return T(t, 16);
  }
  static bytes17(t) {
    return T(t, 17);
  }
  static bytes18(t) {
    return T(t, 18);
  }
  static bytes19(t) {
    return T(t, 19);
  }
  static bytes20(t) {
    return T(t, 20);
  }
  static bytes21(t) {
    return T(t, 21);
  }
  static bytes22(t) {
    return T(t, 22);
  }
  static bytes23(t) {
    return T(t, 23);
  }
  static bytes24(t) {
    return T(t, 24);
  }
  static bytes25(t) {
    return T(t, 25);
  }
  static bytes26(t) {
    return T(t, 26);
  }
  static bytes27(t) {
    return T(t, 27);
  }
  static bytes28(t) {
    return T(t, 28);
  }
  static bytes29(t) {
    return T(t, 29);
  }
  static bytes30(t) {
    return T(t, 30);
  }
  static bytes31(t) {
    return T(t, 31);
  }
  static bytes32(t) {
    return T(t, 32);
  }
  static address(t) {
    return new mt(yt, "address", t);
  }
  static bool(t) {
    return new mt(yt, "bool", !!t);
  }
  static bytes(t) {
    return new mt(yt, "bytes", t);
  }
  static string(t) {
    return new mt(yt, "string", t);
  }
  static array(t, e) {
    throw new Error("not implemented yet");
  }
  static tuple(t, e) {
    throw new Error("not implemented yet");
  }
  static overrides(t) {
    return new mt(yt, "overrides", Object.assign({}, t));
  }
  static isTyped(t) {
    return (
      t && typeof t == "object" && "_typedSymbol" in t && t._typedSymbol === Xn
    );
  }
  static dereference(t, e) {
    if (mt.isTyped(t)) {
      if (t.type !== e)
        throw new Error(`invalid type: expecetd ${e}, got ${t.type}`);
      return t.value;
    }
    return t;
  }
};
Ht = new WeakMap();
let H = mt;
class Ys extends Tt {
  constructor(t) {
    super("address", "address", t, !1);
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000";
  }
  encode(t, e) {
    let n = H.dereference(e, "string");
    try {
      n = Kt(n);
    } catch (s) {
      return this._throwError(s.message, e);
    }
    return t.writeValue(n);
  }
  decode(t) {
    return Kt(wr(t.readValue(), 20));
  }
}
class Zs extends Tt {
  constructor(e) {
    super(e.name, e.type, "_", e.dynamic);
    f(this, "coder");
    this.coder = e;
  }
  defaultValue() {
    return this.coder.defaultValue();
  }
  encode(e, n) {
    return this.coder.encode(e, n);
  }
  decode(e) {
    return this.coder.decode(e);
  }
}
function _r(r, t, e) {
  let n = [];
  if (Array.isArray(e)) n = e;
  else if (e && typeof e == "object") {
    let c = {};
    n = t.map((l) => {
      const u = l.localName;
      return (
        b(
          u,
          "cannot encode object for signature with missing names",
          "INVALID_ARGUMENT",
          { argument: "values", info: { coder: l }, value: e },
        ),
        b(
          !c[u],
          "cannot encode object for signature with duplicate names",
          "INVALID_ARGUMENT",
          { argument: "values", info: { coder: l }, value: e },
        ),
        (c[u] = !0),
        e[u]
      );
    });
  } else g(!1, "invalid tuple value", "tuple", e);
  g(t.length === n.length, "types/value length mismatch", "tuple", e);
  let s = new dn(),
    i = new dn(),
    o = [];
  t.forEach((c, l) => {
    let u = n[l];
    if (c.dynamic) {
      let h = i.length;
      c.encode(i, u);
      let p = s.writeUpdatableValue();
      o.push((y) => {
        p(y + h);
      });
    } else c.encode(s, u);
  }),
    o.forEach((c) => {
      c(s.length);
    });
  let a = r.appendWriter(s);
  return (a += r.appendWriter(i)), a;
}
function Cr(r, t) {
  let e = [],
    n = [],
    s = r.subReader(0);
  return (
    t.forEach((i) => {
      let o = null;
      if (i.dynamic) {
        let a = r.readIndex(),
          c = s.subReader(a);
        try {
          o = i.decode(c);
        } catch (l) {
          if (fe(l, "BUFFER_OVERRUN")) throw l;
          (o = l),
            (o.baseType = i.name),
            (o.name = i.localName),
            (o.type = i.type);
        }
      } else
        try {
          o = i.decode(r);
        } catch (a) {
          if (fe(a, "BUFFER_OVERRUN")) throw a;
          (o = a),
            (o.baseType = i.name),
            (o.name = i.localName),
            (o.type = i.type);
        }
      if (o == null) throw new Error("investigate");
      e.push(o), n.push(i.localName || null);
    }),
    he.fromItems(e, n)
  );
}
class Qs extends Tt {
  constructor(e, n, s) {
    const i = e.type + "[" + (n >= 0 ? n : "") + "]",
      o = n === -1 || e.dynamic;
    super("array", i, s, o);
    f(this, "coder");
    f(this, "length");
    N(this, { coder: e, length: n });
  }
  defaultValue() {
    const e = this.coder.defaultValue(),
      n = [];
    for (let s = 0; s < this.length; s++) n.push(e);
    return n;
  }
  encode(e, n) {
    const s = H.dereference(n, "array");
    Array.isArray(s) || this._throwError("expected array value", s);
    let i = this.length;
    i === -1 && ((i = s.length), e.writeValue(s.length)),
      dr(
        s.length,
        i,
        "coder array" + (this.localName ? " " + this.localName : ""),
      );
    let o = [];
    for (let a = 0; a < s.length; a++) o.push(this.coder);
    return _r(e, o, s);
  }
  decode(e) {
    let n = this.length;
    n === -1 &&
      ((n = e.readIndex()),
      b(n * J <= e.dataLength, "insufficient data length", "BUFFER_OVERRUN", {
        buffer: e.bytes,
        offset: n * J,
        length: e.dataLength,
      }));
    let s = [];
    for (let i = 0; i < n; i++) s.push(new Zs(this.coder));
    return Cr(e, s);
  }
}
class qs extends Tt {
  constructor(t) {
    super("bool", "bool", t, !1);
  }
  defaultValue() {
    return !1;
  }
  encode(t, e) {
    const n = H.dereference(e, "bool");
    return t.writeValue(n ? 1 : 0);
  }
  decode(t) {
    return !!t.readValue();
  }
}
class Sr extends Tt {
  constructor(t, e) {
    super(t, t, e, !0);
  }
  defaultValue() {
    return "0x";
  }
  encode(t, e) {
    e = dt(e);
    let n = t.writeValue(e.length);
    return (n += t.writeBytes(e)), n;
  }
  decode(t) {
    return t.readBytes(t.readIndex(), !0);
  }
}
class js extends Sr {
  constructor(t) {
    super("bytes", t);
  }
  decode(t) {
    return L(super.decode(t));
  }
}
class ti extends Tt {
  constructor(e, n) {
    let s = "bytes" + String(e);
    super(s, s, n, !1);
    f(this, "size");
    N(this, { size: e }, { size: "number" });
  }
  defaultValue() {
    return "0x0000000000000000000000000000000000000000000000000000000000000000".substring(
      0,
      2 + this.size * 2,
    );
  }
  encode(e, n) {
    let s = dt(H.dereference(n, this.type));
    return (
      s.length !== this.size && this._throwError("incorrect data length", n),
      e.writeBytes(s)
    );
  }
  decode(e) {
    return L(e.readBytes(this.size));
  }
}
const ei = new Uint8Array([]);
class ni extends Tt {
  constructor(t) {
    super("null", "", t, !1);
  }
  defaultValue() {
    return null;
  }
  encode(t, e) {
    return e != null && this._throwError("not null", e), t.writeBytes(ei);
  }
  decode(t) {
    return t.readBytes(0), null;
  }
}
const ri = BigInt(0),
  si = BigInt(1),
  ii = BigInt(
    "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
  );
class oi extends Tt {
  constructor(e, n, s) {
    const i = (n ? "int" : "uint") + e * 8;
    super(i, i, s, !1);
    f(this, "size");
    f(this, "signed");
    N(this, { size: e, signed: n }, { size: "number", signed: "boolean" });
  }
  defaultValue() {
    return 0;
  }
  encode(e, n) {
    let s = St(H.dereference(n, this.type)),
      i = Re(ii, J * 8);
    if (this.signed) {
      let o = Re(i, this.size * 8 - 1);
      (s > o || s < -(o + si)) && this._throwError("value out-of-bounds", n),
        (s = us(s, 8 * J));
    } else
      (s < ri || s > Re(i, this.size * 8)) &&
        this._throwError("value out-of-bounds", n);
    return e.writeValue(s);
  }
  decode(e) {
    let n = Re(e.readValue(), this.size * 8);
    return this.signed && (n = ls(n, this.size * 8)), n;
  }
}
class ai extends Sr {
  constructor(t) {
    super("string", t);
  }
  defaultValue() {
    return "";
  }
  encode(t, e) {
    return super.encode(t, Er(H.dereference(e, "string")));
  }
  decode(t) {
    return bs(super.decode(t));
  }
}
class _e extends Tt {
  constructor(e, n) {
    let s = !1;
    const i = [];
    e.forEach((a) => {
      a.dynamic && (s = !0), i.push(a.type);
    });
    const o = "tuple(" + i.join(",") + ")";
    super("tuple", o, n, s);
    f(this, "coders");
    N(this, { coders: Object.freeze(e.slice()) });
  }
  defaultValue() {
    const e = [];
    this.coders.forEach((s) => {
      e.push(s.defaultValue());
    });
    const n = this.coders.reduce((s, i) => {
      const o = i.localName;
      return o && (s[o] || (s[o] = 0), s[o]++), s;
    }, {});
    return (
      this.coders.forEach((s, i) => {
        let o = s.localName;
        !o ||
          n[o] !== 1 ||
          (o === "length" && (o = "_length"), e[o] == null && (e[o] = e[i]));
      }),
      Object.freeze(e)
    );
  }
  encode(e, n) {
    const s = H.dereference(n, "tuple");
    return _r(e, this.coders, s);
  }
  decode(e) {
    return Cr(e, this.coders);
  }
}
function be(r) {
  return Ct(Er(r));
}
function ln(r, t) {
  return {
    address: Kt(r),
    storageKeys: t.map(
      (e, n) => (
        g(Et(e, 32), "invalid slot", `storageKeys[${n}]`, e), e.toLowerCase()
      ),
    ),
  };
}
function ci(r) {
  if (Array.isArray(r))
    return r.map((e, n) =>
      Array.isArray(e)
        ? (g(e.length === 2, "invalid slot set", `value[${n}]`, e),
          ln(e[0], e[1]))
        : (g(
            e != null && typeof e == "object",
            "invalid address-slot set",
            "value",
            r,
          ),
          ln(e.address, e.storageKeys)),
    );
  g(r != null && typeof r == "object", "invalid access list", "value", r);
  const t = Object.keys(r).map((e) => {
    const n = r[e].reduce((s, i) => ((s[i] = !0), s), {});
    return ln(e, Object.keys(n).sort());
  });
  return t.sort((e, n) => e.address.localeCompare(n.address)), t;
}
function K(r) {
  const t = new Set();
  return r.forEach((e) => t.add(e)), Object.freeze(t);
}
const li = "external public payable override",
  ui = K(li.split(" ")),
  Br = "constant external internal payable private public pure view override",
  fi = K(Br.split(" ")),
  Lr = "constructor error event fallback function receive struct",
  $r = K(Lr.split(" ")),
  Fr = "calldata memory storage payable indexed",
  hi = K(Fr.split(" ")),
  pi = "tuple returns",
  di = [Lr, Fr, pi, Br].join(" "),
  gi = K(di.split(" ")),
  yi = {
    "(": "OPEN_PAREN",
    ")": "CLOSE_PAREN",
    "[": "OPEN_BRACKET",
    "]": "CLOSE_BRACKET",
    ",": "COMMA",
    "@": "AT",
  },
  mi = new RegExp("^(\\s*)"),
  wi = new RegExp("^([0-9]+)"),
  bi = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)"),
  Dr = new RegExp("^([a-zA-Z$_][a-zA-Z0-9$_]*)$"),
  Vr = new RegExp("^(address|bool|bytes([0-9]*)|string|u?int([0-9]*))$");
var $, rt, xe, mn;
const Ve = class Ve {
  constructor(t) {
    I(this, xe);
    I(this, $);
    I(this, rt);
    k(this, $, 0), k(this, rt, t.slice());
  }
  get offset() {
    return d(this, $);
  }
  get length() {
    return d(this, rt).length - d(this, $);
  }
  clone() {
    return new Ve(d(this, rt));
  }
  reset() {
    k(this, $, 0);
  }
  popKeyword(t) {
    const e = this.peek();
    if (e.type !== "KEYWORD" || !t.has(e.text))
      throw new Error(`expected keyword ${e.text}`);
    return this.pop().text;
  }
  popType(t) {
    if (this.peek().type !== t) {
      const e = this.peek();
      throw new Error(`expected ${t}; got ${e.type} ${JSON.stringify(e.text)}`);
    }
    return this.pop().text;
  }
  popParen() {
    const t = this.peek();
    if (t.type !== "OPEN_PAREN") throw new Error("bad start");
    const e = _(this, xe, mn).call(this, d(this, $) + 1, t.match + 1);
    return k(this, $, t.match + 1), e;
  }
  popParams() {
    const t = this.peek();
    if (t.type !== "OPEN_PAREN") throw new Error("bad start");
    const e = [];
    for (; d(this, $) < t.match - 1; ) {
      const n = this.peek().linkNext;
      e.push(_(this, xe, mn).call(this, d(this, $) + 1, n)), k(this, $, n);
    }
    return k(this, $, t.match + 1), e;
  }
  peek() {
    if (d(this, $) >= d(this, rt).length) throw new Error("out-of-bounds");
    return d(this, rt)[d(this, $)];
  }
  peekKeyword(t) {
    const e = this.peekType("KEYWORD");
    return e != null && t.has(e) ? e : null;
  }
  peekType(t) {
    if (this.length === 0) return null;
    const e = this.peek();
    return e.type === t ? e.text : null;
  }
  pop() {
    const t = this.peek();
    return Sn(this, $)._++, t;
  }
  toString() {
    const t = [];
    for (let e = d(this, $); e < d(this, rt).length; e++) {
      const n = d(this, rt)[e];
      t.push(`${n.type}:${n.text}`);
    }
    return `<TokenString ${t.join(" ")}>`;
  }
};
($ = new WeakMap()),
  (rt = new WeakMap()),
  (xe = new WeakSet()),
  (mn = function (t = 0, e = 0) {
    return new Ve(
      d(this, rt)
        .slice(t, e)
        .map((n) =>
          Object.freeze(
            Object.assign({}, n, {
              match: n.match - t,
              linkBack: n.linkBack - t,
              linkNext: n.linkNext - t,
            }),
          ),
        ),
    );
  });
let ot = Ve;
function Bt(r) {
  const t = [],
    e = (o) => {
      const a = i < r.length ? JSON.stringify(r[i]) : "$EOI";
      throw new Error(`invalid token ${a} at ${i}: ${o}`);
    };
  let n = [],
    s = [],
    i = 0;
  for (; i < r.length; ) {
    let o = r.substring(i),
      a = o.match(mi);
    a && ((i += a[1].length), (o = r.substring(i)));
    const c = {
      depth: n.length,
      linkBack: -1,
      linkNext: -1,
      match: -1,
      type: "",
      text: "",
      offset: i,
      value: -1,
    };
    t.push(c);
    let l = yi[o[0]] || "";
    if (l) {
      if (((c.type = l), (c.text = o[0]), i++, l === "OPEN_PAREN"))
        n.push(t.length - 1), s.push(t.length - 1);
      else if (l == "CLOSE_PAREN")
        n.length === 0 && e("no matching open bracket"),
          (c.match = n.pop()),
          (t[c.match].match = t.length - 1),
          c.depth--,
          (c.linkBack = s.pop()),
          (t[c.linkBack].linkNext = t.length - 1);
      else if (l === "COMMA")
        (c.linkBack = s.pop()),
          (t[c.linkBack].linkNext = t.length - 1),
          s.push(t.length - 1);
      else if (l === "OPEN_BRACKET") c.type = "BRACKET";
      else if (l === "CLOSE_BRACKET") {
        let u = t.pop().text;
        if (t.length > 0 && t[t.length - 1].type === "NUMBER") {
          const h = t.pop().text;
          (u = h + u), (t[t.length - 1].value = kt(h));
        }
        if (t.length === 0 || t[t.length - 1].type !== "BRACKET")
          throw new Error("missing opening bracket");
        t[t.length - 1].text += u;
      }
      continue;
    }
    if (((a = o.match(bi)), a)) {
      if (((c.text = a[1]), (i += c.text.length), gi.has(c.text))) {
        c.type = "KEYWORD";
        continue;
      }
      if (c.text.match(Vr)) {
        c.type = "TYPE";
        continue;
      }
      c.type = "ID";
      continue;
    }
    if (((a = o.match(wi)), a)) {
      (c.text = a[1]), (c.type = "NUMBER"), (i += c.text.length);
      continue;
    }
    throw new Error(
      `unexpected token ${JSON.stringify(o[0])} at position ${i}`,
    );
  }
  return new ot(t.map((o) => Object.freeze(o)));
}
function Yn(r, t) {
  let e = [];
  for (const n in t.keys()) r.has(n) && e.push(n);
  if (e.length > 1) throw new Error(`conflicting types: ${e.join(", ")}`);
}
function Ye(r, t) {
  if (t.peekKeyword($r)) {
    const e = t.pop().text;
    if (e !== r) throw new Error(`expected ${r}, got ${e}`);
  }
  return t.popType("ID");
}
function Ot(r, t) {
  const e = new Set();
  for (;;) {
    const n = r.peekType("KEYWORD");
    if (n == null || (t && !t.has(n))) break;
    if ((r.pop(), e.has(n)))
      throw new Error(`duplicate keywords: ${JSON.stringify(n)}`);
    e.add(n);
  }
  return Object.freeze(e);
}
function Mr(r) {
  let t = Ot(r, fi);
  return (
    Yn(t, K("constant payable nonpayable".split(" "))),
    Yn(t, K("pure view payable nonpayable".split(" "))),
    t.has("view")
      ? "view"
      : t.has("pure")
        ? "pure"
        : t.has("payable")
          ? "payable"
          : t.has("nonpayable")
            ? "nonpayable"
            : t.has("constant")
              ? "view"
              : "nonpayable"
  );
}
function Nt(r, t) {
  return r.popParams().map((e) => F.from(e, t));
}
function Gr(r) {
  if (r.peekType("AT")) {
    if ((r.pop(), r.peekType("NUMBER"))) return St(r.pop().text);
    throw new Error("invalid gas");
  }
  return null;
}
function Wt(r) {
  if (r.length)
    throw new Error(`unexpected tokens at offset ${r.offset}: ${r.toString()}`);
}
const Ei = new RegExp(/^(.*)\[([0-9]*)\]$/);
function Zn(r) {
  const t = r.match(Vr);
  if ((g(t, "invalid type", "type", r), r === "uint")) return "uint256";
  if (r === "int") return "int256";
  if (t[2]) {
    const e = parseInt(t[2]);
    g(e !== 0 && e <= 32, "invalid bytes length", "type", r);
  } else if (t[3]) {
    const e = parseInt(t[3]);
    g(e !== 0 && e <= 256 && e % 8 === 0, "invalid numeric width", "type", r);
  }
  return r;
}
const C = {},
  Y = Symbol.for("_ethers_internal"),
  Qn = "_ParamTypeInternal",
  qn = "_ErrorInternal",
  jn = "_EventInternal",
  tr = "_ConstructorInternal",
  er = "_FallbackInternal",
  nr = "_FunctionInternal",
  rr = "_StructInternal";
var le, Be;
const et = class et {
  constructor(t, e, n, s, i, o, a, c) {
    I(this, le);
    f(this, "name");
    f(this, "type");
    f(this, "baseType");
    f(this, "indexed");
    f(this, "components");
    f(this, "arrayLength");
    f(this, "arrayChildren");
    if (
      (vn(t, C, "ParamType"),
      Object.defineProperty(this, Y, { value: Qn }),
      o && (o = Object.freeze(o.slice())),
      s === "array")
    ) {
      if (a == null || c == null) throw new Error("");
    } else if (a != null || c != null) throw new Error("");
    if (s === "tuple") {
      if (o == null) throw new Error("");
    } else if (o != null) throw new Error("");
    N(this, {
      name: e,
      type: n,
      baseType: s,
      indexed: i,
      components: o,
      arrayLength: a,
      arrayChildren: c,
    });
  }
  format(t) {
    if ((t == null && (t = "sighash"), t === "json")) {
      const n = this.name || "";
      if (this.isArray()) {
        const i = JSON.parse(this.arrayChildren.format("json"));
        return (
          (i.name = n),
          (i.type += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`),
          JSON.stringify(i)
        );
      }
      const s = {
        type: this.baseType === "tuple" ? "tuple" : this.type,
        name: n,
      };
      return (
        typeof this.indexed == "boolean" && (s.indexed = this.indexed),
        this.isTuple() &&
          (s.components = this.components.map((i) => JSON.parse(i.format(t)))),
        JSON.stringify(s)
      );
    }
    let e = "";
    return (
      this.isArray()
        ? ((e += this.arrayChildren.format(t)),
          (e += `[${this.arrayLength < 0 ? "" : String(this.arrayLength)}]`))
        : this.isTuple()
          ? (e +=
              "(" +
              this.components
                .map((n) => n.format(t))
                .join(t === "full" ? ", " : ",") +
              ")")
          : (e += this.type),
      t !== "sighash" &&
        (this.indexed === !0 && (e += " indexed"),
        t === "full" && this.name && (e += " " + this.name)),
      e
    );
  }
  isArray() {
    return this.baseType === "array";
  }
  isTuple() {
    return this.baseType === "tuple";
  }
  isIndexable() {
    return this.indexed != null;
  }
  walk(t, e) {
    if (this.isArray()) {
      if (!Array.isArray(t)) throw new Error("invalid array value");
      if (this.arrayLength !== -1 && t.length !== this.arrayLength)
        throw new Error("array is wrong length");
      const n = this;
      return t.map((s) => n.arrayChildren.walk(s, e));
    }
    if (this.isTuple()) {
      if (!Array.isArray(t)) throw new Error("invalid tuple value");
      if (t.length !== this.components.length)
        throw new Error("array is wrong length");
      const n = this;
      return t.map((s, i) => n.components[i].walk(s, e));
    }
    return e(this.type, t);
  }
  async walkAsync(t, e) {
    const n = [],
      s = [t];
    return (
      _(this, le, Be).call(this, n, t, e, (i) => {
        s[0] = i;
      }),
      n.length && (await Promise.all(n)),
      s[0]
    );
  }
  static from(t, e) {
    if (et.isParamType(t)) return t;
    if (typeof t == "string")
      try {
        return et.from(Bt(t), e);
      } catch {
        g(!1, "invalid param type", "obj", t);
      }
    else if (t instanceof ot) {
      let a = "",
        c = "",
        l = null;
      Ot(t, K(["tuple"])).has("tuple") || t.peekType("OPEN_PAREN")
        ? ((c = "tuple"),
          (l = t.popParams().map((v) => et.from(v))),
          (a = `tuple(${l.map((v) => v.format()).join(",")})`))
        : ((a = Zn(t.popType("TYPE"))), (c = a));
      let u = null,
        h = null;
      for (; t.length && t.peekType("BRACKET"); ) {
        const v = t.pop();
        (u = new et(C, "", a, c, null, l, h, u)),
          (h = v.value),
          (a += v.text),
          (c = "array"),
          (l = null);
      }
      let p = null;
      if (Ot(t, hi).has("indexed")) {
        if (!e) throw new Error("");
        p = !0;
      }
      const w = t.peekType("ID") ? t.pop().text : "";
      if (t.length) throw new Error("leftover tokens");
      return new et(C, w, a, c, p, l, h, u);
    }
    const n = t.name;
    g(
      !n || (typeof n == "string" && n.match(Dr)),
      "invalid name",
      "obj.name",
      n,
    );
    let s = t.indexed;
    s != null &&
      (g(e, "parameter cannot be indexed", "obj.indexed", t.indexed),
      (s = !!s));
    let i = t.type,
      o = i.match(Ei);
    if (o) {
      const a = parseInt(o[2] || "-1"),
        c = et.from({ type: o[1], components: t.components });
      return new et(C, n || "", i, "array", s, null, a, c);
    }
    if (i === "tuple" || i.startsWith("tuple(") || i.startsWith("(")) {
      const a =
        t.components != null ? t.components.map((l) => et.from(l)) : null;
      return new et(C, n || "", i, "tuple", s, a, null, null);
    }
    return (i = Zn(t.type)), new et(C, n || "", i, i, s, null, null, null);
  }
  static isParamType(t) {
    return t && t[Y] === Qn;
  }
};
(le = new WeakSet()),
  (Be = function (t, e, n, s) {
    if (this.isArray()) {
      if (!Array.isArray(e)) throw new Error("invalid array value");
      if (this.arrayLength !== -1 && e.length !== this.arrayLength)
        throw new Error("array is wrong length");
      const o = this.arrayChildren,
        a = e.slice();
      a.forEach((c, l) => {
        var u;
        _((u = o), le, Be).call(u, t, c, n, (h) => {
          a[l] = h;
        });
      }),
        s(a);
      return;
    }
    if (this.isTuple()) {
      const o = this.components;
      let a;
      if (Array.isArray(e)) a = e.slice();
      else {
        if (e == null || typeof e != "object")
          throw new Error("invalid tuple value");
        a = o.map((c) => {
          if (!c.name)
            throw new Error("cannot use object value with unnamed components");
          if (!(c.name in e))
            throw new Error(`missing value for component ${c.name}`);
          return e[c.name];
        });
      }
      if (a.length !== this.components.length)
        throw new Error("array is wrong length");
      a.forEach((c, l) => {
        var u;
        _((u = o[l]), le, Be).call(u, t, c, n, (h) => {
          a[l] = h;
        });
      }),
        s(a);
      return;
    }
    const i = n(this.type, e);
    i.then
      ? t.push(
          (async function () {
            s(await i);
          })(),
        )
      : s(i);
  });
let F = et;
class Xt {
  constructor(t, e, n) {
    f(this, "type");
    f(this, "inputs");
    vn(t, C, "Fragment"),
      (n = Object.freeze(n.slice())),
      N(this, { type: e, inputs: n });
  }
  static from(t) {
    if (typeof t == "string") {
      try {
        Xt.from(JSON.parse(t));
      } catch {}
      return Xt.from(Bt(t));
    }
    if (t instanceof ot)
      switch (t.peekKeyword($r)) {
        case "constructor":
          return xt.from(t);
        case "error":
          return X.from(t);
        case "event":
          return ht.from(t);
        case "fallback":
        case "receive":
          return wt.from(t);
        case "function":
          return pt.from(t);
        case "struct":
          return zt.from(t);
      }
    else if (typeof t == "object") {
      switch (t.type) {
        case "constructor":
          return xt.from(t);
        case "error":
          return X.from(t);
        case "event":
          return ht.from(t);
        case "fallback":
        case "receive":
          return wt.from(t);
        case "function":
          return pt.from(t);
        case "struct":
          return zt.from(t);
      }
      b(!1, `unsupported type: ${t.type}`, "UNSUPPORTED_OPERATION", {
        operation: "Fragment.from",
      });
    }
    g(!1, "unsupported frgament object", "obj", t);
  }
  static isConstructor(t) {
    return xt.isFragment(t);
  }
  static isError(t) {
    return X.isFragment(t);
  }
  static isEvent(t) {
    return ht.isFragment(t);
  }
  static isFunction(t) {
    return pt.isFragment(t);
  }
  static isStruct(t) {
    return zt.isFragment(t);
  }
}
class Ze extends Xt {
  constructor(e, n, s, i) {
    super(e, n, i);
    f(this, "name");
    g(typeof s == "string" && s.match(Dr), "invalid identifier", "name", s),
      (i = Object.freeze(i.slice())),
      N(this, { name: s });
  }
}
function Ee(r, t) {
  return "(" + t.map((e) => e.format(r)).join(r === "full" ? ", " : ",") + ")";
}
class X extends Ze {
  constructor(t, e, n) {
    super(t, "error", e, n), Object.defineProperty(this, Y, { value: qn });
  }
  get selector() {
    return be(this.format("sighash")).substring(0, 10);
  }
  format(t) {
    if ((t == null && (t = "sighash"), t === "json"))
      return JSON.stringify({
        type: "error",
        name: this.name,
        inputs: this.inputs.map((n) => JSON.parse(n.format(t))),
      });
    const e = [];
    return (
      t !== "sighash" && e.push("error"),
      e.push(this.name + Ee(t, this.inputs)),
      e.join(" ")
    );
  }
  static from(t) {
    if (X.isFragment(t)) return t;
    if (typeof t == "string") return X.from(Bt(t));
    if (t instanceof ot) {
      const e = Ye("error", t),
        n = Nt(t);
      return Wt(t), new X(C, e, n);
    }
    return new X(C, t.name, t.inputs ? t.inputs.map(F.from) : []);
  }
  static isFragment(t) {
    return t && t[Y] === qn;
  }
}
class ht extends Ze {
  constructor(e, n, s, i) {
    super(e, "event", n, s);
    f(this, "anonymous");
    Object.defineProperty(this, Y, { value: jn }), N(this, { anonymous: i });
  }
  get topicHash() {
    return be(this.format("sighash"));
  }
  format(e) {
    if ((e == null && (e = "sighash"), e === "json"))
      return JSON.stringify({
        type: "event",
        anonymous: this.anonymous,
        name: this.name,
        inputs: this.inputs.map((s) => JSON.parse(s.format(e))),
      });
    const n = [];
    return (
      e !== "sighash" && n.push("event"),
      n.push(this.name + Ee(e, this.inputs)),
      e !== "sighash" && this.anonymous && n.push("anonymous"),
      n.join(" ")
    );
  }
  static getTopicHash(e, n) {
    return (n = (n || []).map((i) => F.from(i))), new ht(C, e, n, !1).topicHash;
  }
  static from(e) {
    if (ht.isFragment(e)) return e;
    if (typeof e == "string")
      try {
        return ht.from(Bt(e));
      } catch {
        g(!1, "invalid event fragment", "obj", e);
      }
    else if (e instanceof ot) {
      const n = Ye("event", e),
        s = Nt(e, !0),
        i = !!Ot(e, K(["anonymous"])).has("anonymous");
      return Wt(e), new ht(C, n, s, i);
    }
    return new ht(
      C,
      e.name,
      e.inputs ? e.inputs.map((n) => F.from(n, !0)) : [],
      !!e.anonymous,
    );
  }
  static isFragment(e) {
    return e && e[Y] === jn;
  }
}
class xt extends Xt {
  constructor(e, n, s, i, o) {
    super(e, n, s);
    f(this, "payable");
    f(this, "gas");
    Object.defineProperty(this, Y, { value: tr }),
      N(this, { payable: i, gas: o });
  }
  format(e) {
    if (
      (b(
        e != null && e !== "sighash",
        "cannot format a constructor for sighash",
        "UNSUPPORTED_OPERATION",
        { operation: "format(sighash)" },
      ),
      e === "json")
    )
      return JSON.stringify({
        type: "constructor",
        stateMutability: this.payable ? "payable" : "undefined",
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((s) => JSON.parse(s.format(e))),
      });
    const n = [`constructor${Ee(e, this.inputs)}`];
    return (
      this.payable && n.push("payable"),
      this.gas != null && n.push(`@${this.gas.toString()}`),
      n.join(" ")
    );
  }
  static from(e) {
    if (xt.isFragment(e)) return e;
    if (typeof e == "string")
      try {
        return xt.from(Bt(e));
      } catch {
        g(!1, "invalid constuctor fragment", "obj", e);
      }
    else if (e instanceof ot) {
      Ot(e, K(["constructor"]));
      const n = Nt(e),
        s = !!Ot(e, ui).has("payable"),
        i = Gr(e);
      return Wt(e), new xt(C, "constructor", n, s, i);
    }
    return new xt(
      C,
      "constructor",
      e.inputs ? e.inputs.map(F.from) : [],
      !!e.payable,
      e.gas != null ? e.gas : null,
    );
  }
  static isFragment(e) {
    return e && e[Y] === tr;
  }
}
class wt extends Xt {
  constructor(e, n, s) {
    super(e, "fallback", n);
    f(this, "payable");
    Object.defineProperty(this, Y, { value: er }), N(this, { payable: s });
  }
  format(e) {
    const n = this.inputs.length === 0 ? "receive" : "fallback";
    if (e === "json") {
      const s = this.payable ? "payable" : "nonpayable";
      return JSON.stringify({ type: n, stateMutability: s });
    }
    return `${n}()${this.payable ? " payable" : ""}`;
  }
  static from(e) {
    if (wt.isFragment(e)) return e;
    if (typeof e == "string")
      try {
        return wt.from(Bt(e));
      } catch {
        g(!1, "invalid fallback fragment", "obj", e);
      }
    else if (e instanceof ot) {
      const n = e.toString(),
        s = e.peekKeyword(K(["fallback", "receive"]));
      if (
        (g(s, "type must be fallback or receive", "obj", n),
        e.popKeyword(K(["fallback", "receive"])) === "receive")
      ) {
        const c = Nt(e);
        return (
          g(c.length === 0, "receive cannot have arguments", "obj.inputs", c),
          Ot(e, K(["payable"])),
          Wt(e),
          new wt(C, [], !0)
        );
      }
      let o = Nt(e);
      o.length
        ? g(
            o.length === 1 && o[0].type === "bytes",
            "invalid fallback inputs",
            "obj.inputs",
            o.map((c) => c.format("minimal")).join(", "),
          )
        : (o = [F.from("bytes")]);
      const a = Mr(e);
      if (
        (g(
          a === "nonpayable" || a === "payable",
          "fallback cannot be constants",
          "obj.stateMutability",
          a,
        ),
        Ot(e, K(["returns"])).has("returns"))
      ) {
        const c = Nt(e);
        g(
          c.length === 1 && c[0].type === "bytes",
          "invalid fallback outputs",
          "obj.outputs",
          c.map((l) => l.format("minimal")).join(", "),
        );
      }
      return Wt(e), new wt(C, o, a === "payable");
    }
    if (e.type === "receive") return new wt(C, [], !0);
    if (e.type === "fallback") {
      const n = [F.from("bytes")],
        s = e.stateMutability === "payable";
      return new wt(C, n, s);
    }
    g(!1, "invalid fallback description", "obj", e);
  }
  static isFragment(e) {
    return e && e[Y] === er;
  }
}
class pt extends Ze {
  constructor(e, n, s, i, o, a) {
    super(e, "function", n, i);
    f(this, "constant");
    f(this, "outputs");
    f(this, "stateMutability");
    f(this, "payable");
    f(this, "gas");
    Object.defineProperty(this, Y, { value: nr }),
      (o = Object.freeze(o.slice())),
      N(this, {
        constant: s === "view" || s === "pure",
        gas: a,
        outputs: o,
        payable: s === "payable",
        stateMutability: s,
      });
  }
  get selector() {
    return be(this.format("sighash")).substring(0, 10);
  }
  format(e) {
    if ((e == null && (e = "sighash"), e === "json"))
      return JSON.stringify({
        type: "function",
        name: this.name,
        constant: this.constant,
        stateMutability:
          this.stateMutability !== "nonpayable" ? this.stateMutability : void 0,
        payable: this.payable,
        gas: this.gas != null ? this.gas : void 0,
        inputs: this.inputs.map((s) => JSON.parse(s.format(e))),
        outputs: this.outputs.map((s) => JSON.parse(s.format(e))),
      });
    const n = [];
    return (
      e !== "sighash" && n.push("function"),
      n.push(this.name + Ee(e, this.inputs)),
      e !== "sighash" &&
        (this.stateMutability !== "nonpayable" && n.push(this.stateMutability),
        this.outputs &&
          this.outputs.length &&
          (n.push("returns"), n.push(Ee(e, this.outputs))),
        this.gas != null && n.push(`@${this.gas.toString()}`)),
      n.join(" ")
    );
  }
  static getSelector(e, n) {
    return (
      (n = (n || []).map((i) => F.from(i))),
      new pt(C, e, "view", n, [], null).selector
    );
  }
  static from(e) {
    if (pt.isFragment(e)) return e;
    if (typeof e == "string")
      try {
        return pt.from(Bt(e));
      } catch {
        g(!1, "invalid function fragment", "obj", e);
      }
    else if (e instanceof ot) {
      const s = Ye("function", e),
        i = Nt(e),
        o = Mr(e);
      let a = [];
      Ot(e, K(["returns"])).has("returns") && (a = Nt(e));
      const c = Gr(e);
      return Wt(e), new pt(C, s, o, i, a, c);
    }
    let n = e.stateMutability;
    return (
      n == null &&
        ((n = "payable"),
        typeof e.constant == "boolean"
          ? ((n = "view"),
            e.constant ||
              ((n = "payable"),
              typeof e.payable == "boolean" &&
                !e.payable &&
                (n = "nonpayable")))
          : typeof e.payable == "boolean" && !e.payable && (n = "nonpayable")),
      new pt(
        C,
        e.name,
        n,
        e.inputs ? e.inputs.map(F.from) : [],
        e.outputs ? e.outputs.map(F.from) : [],
        e.gas != null ? e.gas : null,
      )
    );
  }
  static isFragment(e) {
    return e && e[Y] === nr;
  }
}
class zt extends Ze {
  constructor(t, e, n) {
    super(t, "struct", e, n), Object.defineProperty(this, Y, { value: rr });
  }
  format() {
    throw new Error("@TODO");
  }
  static from(t) {
    if (typeof t == "string")
      try {
        return zt.from(Bt(t));
      } catch {
        g(!1, "invalid struct fragment", "obj", t);
      }
    else if (t instanceof ot) {
      const e = Ye("struct", t),
        n = Nt(t);
      return Wt(t), new zt(C, e, n);
    }
    return new zt(C, t.name, t.inputs ? t.inputs.map(F.from) : []);
  }
  static isFragment(t) {
    return t && t[Y] === rr;
  }
}
const at = new Map();
at.set(0, "GENERIC_PANIC");
at.set(1, "ASSERT_FALSE");
at.set(17, "OVERFLOW");
at.set(18, "DIVIDE_BY_ZERO");
at.set(33, "ENUM_RANGE_ERROR");
at.set(34, "BAD_STORAGE_DATA");
at.set(49, "STACK_UNDERFLOW");
at.set(50, "ARRAY_RANGE_ERROR");
at.set(65, "OUT_OF_MEMORY");
at.set(81, "UNINITIALIZED_FUNCTION_CALL");
const xi = new RegExp(/^bytes([0-9]*)$/),
  Ni = new RegExp(/^(u?int)([0-9]*)$/);
let un = null,
  sr = 1024;
function vi(r, t, e, n) {
  let s = "missing revert data",
    i = null;
  const o = null;
  let a = null;
  if (e) {
    s = "execution reverted";
    const l = vt(e);
    if (((e = L(e)), l.length === 0))
      (s += " (no data present; likely require(false) occurred"),
        (i = "require(false)");
    else if (l.length % 32 !== 4)
      s += " (could not decode reason; invalid data length)";
    else if (L(l.slice(0, 4)) === "0x08c379a0")
      try {
        (i = n.decode(["string"], l.slice(4))[0]),
          (a = { signature: "Error(string)", name: "Error", args: [i] }),
          (s += `: ${JSON.stringify(i)}`);
      } catch {
        s += " (could not decode reason; invalid string data)";
      }
    else if (L(l.slice(0, 4)) === "0x4e487b71")
      try {
        const u = Number(n.decode(["uint256"], l.slice(4))[0]);
        (a = { signature: "Panic(uint256)", name: "Panic", args: [u] }),
          (i = `Panic due to ${at.get(u) || "UNKNOWN"}(${u})`),
          (s += `: ${i}`);
      } catch {
        s += " (could not decode panic code)";
      }
    else s += " (unknown custom error)";
  }
  const c = { to: t.to ? Kt(t.to) : null, data: t.data || "0x" };
  return (
    t.from && (c.from = Kt(t.from)),
    me(s, "CALL_EXCEPTION", {
      action: r,
      data: e,
      reason: i,
      transaction: c,
      invocation: o,
      revert: a,
    })
  );
}
var It, te;
const Me = class Me {
  constructor() {
    I(this, It);
  }
  getDefaultValue(t) {
    const e = t.map((s) => _(this, It, te).call(this, F.from(s)));
    return new _e(e, "_").defaultValue();
  }
  encode(t, e) {
    dr(e.length, t.length, "types/values length mismatch");
    const n = t.map((o) => _(this, It, te).call(this, F.from(o))),
      s = new _e(n, "_"),
      i = new dn();
    return s.encode(i, e), i.data;
  }
  decode(t, e, n) {
    const s = t.map((o) => _(this, It, te).call(this, F.from(o)));
    return new _e(s, "_").decode(new gn(e, n, sr));
  }
  static _setDefaultMaxInflation(t) {
    g(
      typeof t == "number" && Number.isInteger(t),
      "invalid defaultMaxInflation factor",
      "value",
      t,
    ),
      (sr = t);
  }
  static defaultAbiCoder() {
    return un == null && (un = new Me()), un;
  }
  static getBuiltinCallException(t, e, n) {
    return vi(t, e, n, Me.defaultAbiCoder());
  }
};
(It = new WeakSet()),
  (te = function (t) {
    if (t.isArray())
      return new Qs(
        _(this, It, te).call(this, t.arrayChildren),
        t.arrayLength,
        t.name,
      );
    if (t.isTuple())
      return new _e(
        t.components.map((n) => _(this, It, te).call(this, n)),
        t.name,
      );
    switch (t.baseType) {
      case "address":
        return new Ys(t.name);
      case "bool":
        return new qs(t.name);
      case "string":
        return new ai(t.name);
      case "bytes":
        return new js(t.name);
      case "":
        return new ni(t.name);
    }
    let e = t.type.match(Ni);
    if (e) {
      let n = parseInt(e[2] || "256");
      return (
        g(
          n !== 0 && n <= 256 && n % 8 === 0,
          "invalid " + e[1] + " bit length",
          "param",
          t,
        ),
        new oi(n / 8, e[1] === "int", t.name)
      );
    }
    if (((e = t.type.match(xi)), e)) {
      let n = parseInt(e[1]);
      return (
        g(n !== 0 && n <= 32, "invalid bytes length", "param", t),
        new ti(n, t.name)
      );
    }
    g(!1, "invalid type", "type", t.type);
  });
let Fe = Me;
class Oi {
  constructor(t, e, n) {
    f(this, "fragment");
    f(this, "name");
    f(this, "signature");
    f(this, "topic");
    f(this, "args");
    const s = t.name,
      i = t.format();
    N(this, { fragment: t, name: s, signature: i, topic: e, args: n });
  }
}
class ki {
  constructor(t, e, n, s) {
    f(this, "fragment");
    f(this, "name");
    f(this, "args");
    f(this, "signature");
    f(this, "selector");
    f(this, "value");
    const i = t.name,
      o = t.format();
    N(this, {
      fragment: t,
      name: i,
      args: n,
      signature: o,
      selector: e,
      value: s,
    });
  }
}
class Ti {
  constructor(t, e, n) {
    f(this, "fragment");
    f(this, "name");
    f(this, "args");
    f(this, "signature");
    f(this, "selector");
    const s = t.name,
      i = t.format();
    N(this, { fragment: t, name: s, args: n, signature: i, selector: e });
  }
}
class ir {
  constructor(t) {
    f(this, "hash");
    f(this, "_isIndexed");
    N(this, { hash: t, _isIndexed: !0 });
  }
  static isIndexed(t) {
    return !!(t && t._isIndexed);
  }
}
const or = {
    0: "generic panic",
    1: "assert(false)",
    17: "arithmetic overflow",
    18: "division or modulo by zero",
    33: "enum overflow",
    34: "invalid encoded storage byte array accessed",
    49: "out-of-bounds array access; popping on an empty array",
    50: "out-of-bounds access of an array or bytesN",
    65: "out of memory",
    81: "uninitialized function",
  },
  ar = {
    "0x08c379a0": {
      signature: "Error(string)",
      name: "Error",
      inputs: ["string"],
      reason: (r) => `reverted with reason string ${JSON.stringify(r)}`,
    },
    "0x4e487b71": {
      signature: "Panic(uint256)",
      name: "Panic",
      inputs: ["uint256"],
      reason: (r) => {
        let t = "unknown panic code";
        return (
          r >= 0 && r <= 255 && or[r.toString()] && (t = or[r.toString()]),
          `reverted with panic code 0x${r.toString(16)} (${t})`
        );
      },
    },
  };
var lt, ut, ft, V, gt, Le, $e;
const Ft = class Ft {
  constructor(t) {
    I(this, gt);
    f(this, "fragments");
    f(this, "deploy");
    f(this, "fallback");
    f(this, "receive");
    I(this, lt);
    I(this, ut);
    I(this, ft);
    I(this, V);
    let e = [];
    typeof t == "string" ? (e = JSON.parse(t)) : (e = t),
      k(this, ft, new Map()),
      k(this, lt, new Map()),
      k(this, ut, new Map());
    const n = [];
    for (const o of e)
      try {
        n.push(Xt.from(o));
      } catch (a) {
        console.log(
          `[Warning] Invalid Fragment ${JSON.stringify(o)}:`,
          a.message,
        );
      }
    N(this, { fragments: Object.freeze(n) });
    let s = null,
      i = !1;
    k(this, V, this.getAbiCoder()),
      this.fragments.forEach((o, a) => {
        let c;
        switch (o.type) {
          case "constructor":
            if (this.deploy) {
              console.log("duplicate definition - constructor");
              return;
            }
            N(this, { deploy: o });
            return;
          case "fallback":
            o.inputs.length === 0
              ? (i = !0)
              : (g(
                  !s || o.payable !== s.payable,
                  "conflicting fallback fragments",
                  `fragments[${a}]`,
                  o,
                ),
                (s = o),
                (i = s.payable));
            return;
          case "function":
            c = d(this, ft);
            break;
          case "event":
            c = d(this, ut);
            break;
          case "error":
            c = d(this, lt);
            break;
          default:
            return;
        }
        const l = o.format();
        c.has(l) || c.set(l, o);
      }),
      this.deploy || N(this, { deploy: xt.from("constructor()") }),
      N(this, { fallback: s, receive: i });
  }
  format(t) {
    const e = t ? "minimal" : "full";
    return this.fragments.map((s) => s.format(e));
  }
  formatJson() {
    const t = this.fragments.map((e) => e.format("json"));
    return JSON.stringify(t.map((e) => JSON.parse(e)));
  }
  getAbiCoder() {
    return Fe.defaultAbiCoder();
  }
  getFunctionName(t) {
    const e = _(this, gt, Le).call(this, t, null, !1);
    return g(e, "no matching function", "key", t), e.name;
  }
  hasFunction(t) {
    return !!_(this, gt, Le).call(this, t, null, !1);
  }
  getFunction(t, e) {
    return _(this, gt, Le).call(this, t, e || null, !0);
  }
  forEachFunction(t) {
    const e = Array.from(d(this, ft).keys());
    e.sort((n, s) => n.localeCompare(s));
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      t(d(this, ft).get(s), n);
    }
  }
  getEventName(t) {
    const e = _(this, gt, $e).call(this, t, null, !1);
    return g(e, "no matching event", "key", t), e.name;
  }
  hasEvent(t) {
    return !!_(this, gt, $e).call(this, t, null, !1);
  }
  getEvent(t, e) {
    return _(this, gt, $e).call(this, t, e || null, !0);
  }
  forEachEvent(t) {
    const e = Array.from(d(this, ut).keys());
    e.sort((n, s) => n.localeCompare(s));
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      t(d(this, ut).get(s), n);
    }
  }
  getError(t, e) {
    if (Et(t)) {
      const s = t.toLowerCase();
      if (ar[s]) return X.from(ar[s].signature);
      for (const i of d(this, lt).values()) if (s === i.selector) return i;
      return null;
    }
    if (t.indexOf("(") === -1) {
      const s = [];
      for (const [i, o] of d(this, lt)) i.split("(")[0] === t && s.push(o);
      if (s.length === 0)
        return t === "Error"
          ? X.from("error Error(string)")
          : t === "Panic"
            ? X.from("error Panic(uint256)")
            : null;
      if (s.length > 1) {
        const i = s.map((o) => JSON.stringify(o.format())).join(", ");
        g(!1, `ambiguous error description (i.e. ${i})`, "name", t);
      }
      return s[0];
    }
    if (((t = X.from(t).format()), t === "Error(string)"))
      return X.from("error Error(string)");
    if (t === "Panic(uint256)") return X.from("error Panic(uint256)");
    const n = d(this, lt).get(t);
    return n || null;
  }
  forEachError(t) {
    const e = Array.from(d(this, lt).keys());
    e.sort((n, s) => n.localeCompare(s));
    for (let n = 0; n < e.length; n++) {
      const s = e[n];
      t(d(this, lt).get(s), n);
    }
  }
  _decodeParams(t, e) {
    return d(this, V).decode(t, e);
  }
  _encodeParams(t, e) {
    return d(this, V).encode(t, e);
  }
  encodeDeploy(t) {
    return this._encodeParams(this.deploy.inputs, t || []);
  }
  decodeErrorResult(t, e) {
    if (typeof t == "string") {
      const n = this.getError(t);
      g(n, "unknown error", "fragment", t), (t = n);
    }
    return (
      g(
        jt(e, 0, 4) === t.selector,
        `data signature does not match error ${t.name}.`,
        "data",
        e,
      ),
      this._decodeParams(t.inputs, jt(e, 4))
    );
  }
  encodeErrorResult(t, e) {
    if (typeof t == "string") {
      const n = this.getError(t);
      g(n, "unknown error", "fragment", t), (t = n);
    }
    return ie([t.selector, this._encodeParams(t.inputs, e || [])]);
  }
  decodeFunctionData(t, e) {
    if (typeof t == "string") {
      const n = this.getFunction(t);
      g(n, "unknown function", "fragment", t), (t = n);
    }
    return (
      g(
        jt(e, 0, 4) === t.selector,
        `data signature does not match function ${t.name}.`,
        "data",
        e,
      ),
      this._decodeParams(t.inputs, jt(e, 4))
    );
  }
  encodeFunctionData(t, e) {
    if (typeof t == "string") {
      const n = this.getFunction(t);
      g(n, "unknown function", "fragment", t), (t = n);
    }
    return ie([t.selector, this._encodeParams(t.inputs, e || [])]);
  }
  decodeFunctionResult(t, e) {
    if (typeof t == "string") {
      const i = this.getFunction(t);
      g(i, "unknown function", "fragment", t), (t = i);
    }
    let n = "invalid length for result data";
    const s = dt(e);
    if (s.length % 32 === 0)
      try {
        return d(this, V).decode(t.outputs, s);
      } catch {
        n = "could not decode result data";
      }
    b(!1, n, "BAD_DATA", {
      value: L(s),
      info: { method: t.name, signature: t.format() },
    });
  }
  makeError(t, e) {
    const n = vt(t, "data"),
      s = Fe.getBuiltinCallException("call", e, n);
    if (s.message.startsWith("execution reverted (unknown custom error)")) {
      const a = L(n.slice(0, 4)),
        c = this.getError(a);
      if (c)
        try {
          const l = d(this, V).decode(c.inputs, n.slice(4));
          (s.revert = { name: c.name, signature: c.format(), args: l }),
            (s.reason = s.revert.signature),
            (s.message = `execution reverted: ${s.reason}`);
        } catch {
          s.message = "execution reverted (coult not decode custom error)";
        }
    }
    const o = this.parseTransaction(e);
    return (
      o &&
        (s.invocation = {
          method: o.name,
          signature: o.signature,
          args: o.args,
        }),
      s
    );
  }
  encodeFunctionResult(t, e) {
    if (typeof t == "string") {
      const n = this.getFunction(t);
      g(n, "unknown function", "fragment", t), (t = n);
    }
    return L(d(this, V).encode(t.outputs, e || []));
  }
  encodeFilterTopics(t, e) {
    if (typeof t == "string") {
      const i = this.getEvent(t);
      g(i, "unknown event", "eventFragment", t), (t = i);
    }
    b(
      e.length <= t.inputs.length,
      `too many arguments for ${t.format()}`,
      "UNEXPECTED_ARGUMENT",
      { count: e.length, expectedCount: t.inputs.length },
    );
    const n = [];
    t.anonymous || n.push(t.topicHash);
    const s = (i, o) =>
      i.type === "string"
        ? be(o)
        : i.type === "bytes"
          ? Ct(L(o))
          : (i.type === "bool" && typeof o == "boolean"
              ? (o = o ? "0x01" : "0x00")
              : i.type.match(/^u?int/)
                ? (o = wr(o))
                : i.type.match(/^bytes/)
                  ? (o = cs(o, 32))
                  : i.type === "address" && d(this, V).encode(["address"], [o]),
            as(L(o), 32));
    for (
      e.forEach((i, o) => {
        const a = t.inputs[o];
        if (!a.indexed) {
          g(
            i == null,
            "cannot filter non-indexed parameters; must be null",
            "contract." + a.name,
            i,
          );
          return;
        }
        i == null
          ? n.push(null)
          : a.baseType === "array" || a.baseType === "tuple"
            ? g(
                !1,
                "filtering with tuples or arrays not supported",
                "contract." + a.name,
                i,
              )
            : Array.isArray(i)
              ? n.push(i.map((c) => s(a, c)))
              : n.push(s(a, i));
      });
      n.length && n[n.length - 1] === null;

    )
      n.pop();
    return n;
  }
  encodeEventLog(t, e) {
    if (typeof t == "string") {
      const o = this.getEvent(t);
      g(o, "unknown event", "eventFragment", t), (t = o);
    }
    const n = [],
      s = [],
      i = [];
    return (
      t.anonymous || n.push(t.topicHash),
      g(
        e.length === t.inputs.length,
        "event arguments/values mismatch",
        "values",
        e,
      ),
      t.inputs.forEach((o, a) => {
        const c = e[a];
        if (o.indexed)
          if (o.type === "string") n.push(be(c));
          else if (o.type === "bytes") n.push(Ct(c));
          else {
            if (o.baseType === "tuple" || o.baseType === "array")
              throw new Error("not implemented");
            n.push(d(this, V).encode([o.type], [c]));
          }
        else s.push(o), i.push(c);
      }),
      { data: d(this, V).encode(s, i), topics: n }
    );
  }
  decodeEventLog(t, e, n) {
    if (typeof t == "string") {
      const y = this.getEvent(t);
      g(y, "unknown event", "eventFragment", t), (t = y);
    }
    if (n != null && !t.anonymous) {
      const y = t.topicHash;
      g(
        Et(n[0], 32) && n[0].toLowerCase() === y,
        "fragment/topic mismatch",
        "topics[0]",
        n[0],
      ),
        (n = n.slice(1));
    }
    const s = [],
      i = [],
      o = [];
    t.inputs.forEach((y, w) => {
      y.indexed
        ? y.type === "string" ||
          y.type === "bytes" ||
          y.baseType === "tuple" ||
          y.baseType === "array"
          ? (s.push(F.from({ type: "bytes32", name: y.name })), o.push(!0))
          : (s.push(y), o.push(!1))
        : (i.push(y), o.push(!1));
    });
    const a = n != null ? d(this, V).decode(s, ie(n)) : null,
      c = d(this, V).decode(i, e, !0),
      l = [],
      u = [];
    let h = 0,
      p = 0;
    return (
      t.inputs.forEach((y, w) => {
        let v = null;
        if (y.indexed)
          if (a == null) v = new ir(null);
          else if (o[w]) v = new ir(a[p++]);
          else
            try {
              v = a[p++];
            } catch (x) {
              v = x;
            }
        else
          try {
            v = c[h++];
          } catch (x) {
            v = x;
          }
        l.push(v), u.push(y.name || null);
      }),
      he.fromItems(l, u)
    );
  }
  parseTransaction(t) {
    const e = vt(t.data, "tx.data"),
      n = St(t.value != null ? t.value : 0, "tx.value"),
      s = this.getFunction(L(e.slice(0, 4)));
    if (!s) return null;
    const i = d(this, V).decode(s.inputs, e.slice(4));
    return new ki(s, s.selector, i, n);
  }
  parseCallResult(t) {
    throw new Error("@TODO");
  }
  parseLog(t) {
    const e = this.getEvent(t.topics[0]);
    return !e || e.anonymous
      ? null
      : new Oi(e, e.topicHash, this.decodeEventLog(e, t.data, t.topics));
  }
  parseError(t) {
    const e = L(t),
      n = this.getError(jt(e, 0, 4));
    if (!n) return null;
    const s = d(this, V).decode(n.inputs, jt(e, 4));
    return new Ti(n, n.selector, s);
  }
  static from(t) {
    return t instanceof Ft
      ? t
      : typeof t == "string"
        ? new Ft(JSON.parse(t))
        : typeof t.formatJson == "function"
          ? new Ft(t.formatJson())
          : typeof t.format == "function"
            ? new Ft(t.format("json"))
            : new Ft(t);
  }
};
(lt = new WeakMap()),
  (ut = new WeakMap()),
  (ft = new WeakMap()),
  (V = new WeakMap()),
  (gt = new WeakSet()),
  (Le = function (t, e, n) {
    if (Et(t)) {
      const i = t.toLowerCase();
      for (const o of d(this, ft).values()) if (i === o.selector) return o;
      return null;
    }
    if (t.indexOf("(") === -1) {
      const i = [];
      for (const [o, a] of d(this, ft)) o.split("(")[0] === t && i.push(a);
      if (e) {
        const o = e.length > 0 ? e[e.length - 1] : null;
        let a = e.length,
          c = !0;
        H.isTyped(o) && o.type === "overrides" && ((c = !1), a--);
        for (let l = i.length - 1; l >= 0; l--) {
          const u = i[l].inputs.length;
          u !== a && (!c || u !== a - 1) && i.splice(l, 1);
        }
        for (let l = i.length - 1; l >= 0; l--) {
          const u = i[l].inputs;
          for (let h = 0; h < e.length; h++)
            if (H.isTyped(e[h])) {
              if (h >= u.length) {
                if (e[h].type === "overrides") continue;
                i.splice(l, 1);
                break;
              }
              if (e[h].type !== u[h].baseType) {
                i.splice(l, 1);
                break;
              }
            }
        }
      }
      if (i.length === 1 && e && e.length !== i[0].inputs.length) {
        const o = e[e.length - 1];
        (o == null || Array.isArray(o) || typeof o != "object") &&
          i.splice(0, 1);
      }
      if (i.length === 0) return null;
      if (i.length > 1 && n) {
        const o = i.map((a) => JSON.stringify(a.format())).join(", ");
        g(!1, `ambiguous function description (i.e. matches ${o})`, "key", t);
      }
      return i[0];
    }
    const s = d(this, ft).get(pt.from(t).format());
    return s || null;
  }),
  ($e = function (t, e, n) {
    if (Et(t)) {
      const i = t.toLowerCase();
      for (const o of d(this, ut).values()) if (i === o.topicHash) return o;
      return null;
    }
    if (t.indexOf("(") === -1) {
      const i = [];
      for (const [o, a] of d(this, ut)) o.split("(")[0] === t && i.push(a);
      if (e) {
        for (let o = i.length - 1; o >= 0; o--)
          i[o].inputs.length < e.length && i.splice(o, 1);
        for (let o = i.length - 1; o >= 0; o--) {
          const a = i[o].inputs;
          for (let c = 0; c < e.length; c++)
            if (H.isTyped(e[c]) && e[c].type !== a[c].baseType) {
              i.splice(o, 1);
              break;
            }
        }
      }
      if (i.length === 0) return null;
      if (i.length > 1 && n) {
        const o = i.map((a) => JSON.stringify(a.format())).join(", ");
        g(!1, `ambiguous event description (i.e. matches ${o})`, "key", t);
      }
      return i[0];
    }
    const s = d(this, ut).get(ht.from(t).format());
    return s || null;
  });
let wn = Ft;
const Hr = BigInt(0);
function nt(r) {
  return r == null ? null : r.toString();
}
function Ai(r) {
  const t = {};
  r.to && (t.to = r.to),
    r.from && (t.from = r.from),
    r.data && (t.data = L(r.data));
  const e =
    "chainId,gasLimit,gasPrice,maxFeePerBlobGas,maxFeePerGas,maxPriorityFeePerGas,value".split(
      /,/,
    );
  for (const s of e)
    !(s in r) || r[s] == null || (t[s] = St(r[s], `request.${s}`));
  const n = "type,nonce".split(/,/);
  for (const s of n)
    !(s in r) || r[s] == null || (t[s] = kt(r[s], `request.${s}`));
  return (
    r.accessList && (t.accessList = ci(r.accessList)),
    "blockTag" in r && (t.blockTag = r.blockTag),
    "enableCcipRead" in r && (t.enableCcipRead = !!r.enableCcipRead),
    "customData" in r && (t.customData = r.customData),
    "blobVersionedHashes" in r &&
      r.blobVersionedHashes &&
      (t.blobVersionedHashes = r.blobVersionedHashes.slice()),
    "kzg" in r && (t.kzg = r.kzg),
    "blobs" in r &&
      r.blobs &&
      (t.blobs = r.blobs.map((s) => (os(s) ? L(s) : Object.assign({}, s)))),
    t
  );
}
class Qe {
  constructor(t, e) {
    f(this, "provider");
    f(this, "transactionHash");
    f(this, "blockHash");
    f(this, "blockNumber");
    f(this, "removed");
    f(this, "address");
    f(this, "data");
    f(this, "topics");
    f(this, "index");
    f(this, "transactionIndex");
    this.provider = e;
    const n = Object.freeze(t.topics.slice());
    N(this, {
      transactionHash: t.transactionHash,
      blockHash: t.blockHash,
      blockNumber: t.blockNumber,
      removed: t.removed,
      address: t.address,
      data: t.data,
      topics: n,
      index: t.index,
      transactionIndex: t.transactionIndex,
    });
  }
  toJSON() {
    const {
      address: t,
      blockHash: e,
      blockNumber: n,
      data: s,
      index: i,
      removed: o,
      topics: a,
      transactionHash: c,
      transactionIndex: l,
    } = this;
    return {
      _type: "log",
      address: t,
      blockHash: e,
      blockNumber: n,
      data: s,
      index: i,
      removed: o,
      topics: a,
      transactionHash: c,
      transactionIndex: l,
    };
  }
  async getBlock() {
    const t = await this.provider.getBlock(this.blockHash);
    return b(!!t, "failed to find transaction", "UNKNOWN_ERROR", {}), t;
  }
  async getTransaction() {
    const t = await this.provider.getTransaction(this.transactionHash);
    return b(!!t, "failed to find transaction", "UNKNOWN_ERROR", {}), t;
  }
  async getTransactionReceipt() {
    const t = await this.provider.getTransactionReceipt(this.transactionHash);
    return b(!!t, "failed to find transaction receipt", "UNKNOWN_ERROR", {}), t;
  }
  removedEvent() {
    return Ri(this);
  }
}
var Ne;
class Pi {
  constructor(t, e) {
    f(this, "provider");
    f(this, "to");
    f(this, "from");
    f(this, "contractAddress");
    f(this, "hash");
    f(this, "index");
    f(this, "blockHash");
    f(this, "blockNumber");
    f(this, "logsBloom");
    f(this, "gasUsed");
    f(this, "blobGasUsed");
    f(this, "cumulativeGasUsed");
    f(this, "gasPrice");
    f(this, "blobGasPrice");
    f(this, "type");
    f(this, "status");
    f(this, "root");
    I(this, Ne);
    k(this, Ne, Object.freeze(t.logs.map((s) => new Qe(s, e))));
    let n = Hr;
    t.effectiveGasPrice != null
      ? (n = t.effectiveGasPrice)
      : t.gasPrice != null && (n = t.gasPrice),
      N(this, {
        provider: e,
        to: t.to,
        from: t.from,
        contractAddress: t.contractAddress,
        hash: t.hash,
        index: t.index,
        blockHash: t.blockHash,
        blockNumber: t.blockNumber,
        logsBloom: t.logsBloom,
        gasUsed: t.gasUsed,
        cumulativeGasUsed: t.cumulativeGasUsed,
        blobGasUsed: t.blobGasUsed,
        gasPrice: n,
        blobGasPrice: t.blobGasPrice,
        type: t.type,
        status: t.status,
        root: t.root,
      });
  }
  get logs() {
    return d(this, Ne);
  }
  toJSON() {
    const {
      to: t,
      from: e,
      contractAddress: n,
      hash: s,
      index: i,
      blockHash: o,
      blockNumber: a,
      logsBloom: c,
      logs: l,
      status: u,
      root: h,
    } = this;
    return {
      _type: "TransactionReceipt",
      blockHash: o,
      blockNumber: a,
      contractAddress: n,
      cumulativeGasUsed: nt(this.cumulativeGasUsed),
      from: e,
      gasPrice: nt(this.gasPrice),
      blobGasUsed: nt(this.blobGasUsed),
      blobGasPrice: nt(this.blobGasPrice),
      gasUsed: nt(this.gasUsed),
      hash: s,
      index: i,
      logs: l,
      logsBloom: c,
      root: h,
      status: u,
      to: t,
    };
  }
  get length() {
    return this.logs.length;
  }
  [Symbol.iterator]() {
    let t = 0;
    return {
      next: () =>
        t < this.length
          ? { value: this.logs[t++], done: !1 }
          : { value: void 0, done: !0 },
    };
  }
  get fee() {
    return this.gasUsed * this.gasPrice;
  }
  async getBlock() {
    const t = await this.provider.getBlock(this.blockHash);
    if (t == null) throw new Error("TODO");
    return t;
  }
  async getTransaction() {
    const t = await this.provider.getTransaction(this.hash);
    if (t == null) throw new Error("TODO");
    return t;
  }
  async getResult() {
    return await this.provider.getTransactionResult(this.hash);
  }
  async confirmations() {
    return (await this.provider.getBlockNumber()) - this.blockNumber + 1;
  }
  removedEvent() {
    return Jr(this);
  }
  reorderedEvent(t) {
    return (
      b(
        !t || t.isMined(),
        "unmined 'other' transction cannot be orphaned",
        "UNSUPPORTED_OPERATION",
        { operation: "reorderedEvent(other)" },
      ),
      zr(this, t)
    );
  }
}
Ne = new WeakMap();
var Ut;
const Un = class Un {
  constructor(t, e) {
    f(this, "provider");
    f(this, "blockNumber");
    f(this, "blockHash");
    f(this, "index");
    f(this, "hash");
    f(this, "type");
    f(this, "to");
    f(this, "from");
    f(this, "nonce");
    f(this, "gasLimit");
    f(this, "gasPrice");
    f(this, "maxPriorityFeePerGas");
    f(this, "maxFeePerGas");
    f(this, "maxFeePerBlobGas");
    f(this, "data");
    f(this, "value");
    f(this, "chainId");
    f(this, "signature");
    f(this, "accessList");
    f(this, "blobVersionedHashes");
    I(this, Ut);
    (this.provider = e),
      (this.blockNumber = t.blockNumber != null ? t.blockNumber : null),
      (this.blockHash = t.blockHash != null ? t.blockHash : null),
      (this.hash = t.hash),
      (this.index = t.index),
      (this.type = t.type),
      (this.from = t.from),
      (this.to = t.to || null),
      (this.gasLimit = t.gasLimit),
      (this.nonce = t.nonce),
      (this.data = t.data),
      (this.value = t.value),
      (this.gasPrice = t.gasPrice),
      (this.maxPriorityFeePerGas =
        t.maxPriorityFeePerGas != null ? t.maxPriorityFeePerGas : null),
      (this.maxFeePerGas = t.maxFeePerGas != null ? t.maxFeePerGas : null),
      (this.maxFeePerBlobGas =
        t.maxFeePerBlobGas != null ? t.maxFeePerBlobGas : null),
      (this.chainId = t.chainId),
      (this.signature = t.signature),
      (this.accessList = t.accessList != null ? t.accessList : null),
      (this.blobVersionedHashes =
        t.blobVersionedHashes != null ? t.blobVersionedHashes : null),
      k(this, Ut, -1);
  }
  toJSON() {
    const {
      blockNumber: t,
      blockHash: e,
      index: n,
      hash: s,
      type: i,
      to: o,
      from: a,
      nonce: c,
      data: l,
      signature: u,
      accessList: h,
      blobVersionedHashes: p,
    } = this;
    return {
      _type: "TransactionResponse",
      accessList: h,
      blockNumber: t,
      blockHash: e,
      blobVersionedHashes: p,
      chainId: nt(this.chainId),
      data: l,
      from: a,
      gasLimit: nt(this.gasLimit),
      gasPrice: nt(this.gasPrice),
      hash: s,
      maxFeePerGas: nt(this.maxFeePerGas),
      maxPriorityFeePerGas: nt(this.maxPriorityFeePerGas),
      maxFeePerBlobGas: nt(this.maxFeePerBlobGas),
      nonce: c,
      signature: u,
      to: o,
      index: n,
      type: i,
      value: nt(this.value),
    };
  }
  async getBlock() {
    let t = this.blockNumber;
    if (t == null) {
      const n = await this.getTransaction();
      n && (t = n.blockNumber);
    }
    if (t == null) return null;
    const e = this.provider.getBlock(t);
    if (e == null) throw new Error("TODO");
    return e;
  }
  async getTransaction() {
    return this.provider.getTransaction(this.hash);
  }
  async confirmations() {
    if (this.blockNumber == null) {
      const { tx: e, blockNumber: n } = await fn({
        tx: this.getTransaction(),
        blockNumber: this.provider.getBlockNumber(),
      });
      return e == null || e.blockNumber == null ? 0 : n - e.blockNumber + 1;
    }
    return (await this.provider.getBlockNumber()) - this.blockNumber + 1;
  }
  async wait(t, e) {
    const n = t ?? 1,
      s = e ?? 0;
    let i = d(this, Ut),
      o = -1,
      a = i === -1;
    const c = async () => {
        if (a) return null;
        const { blockNumber: p, nonce: y } = await fn({
          blockNumber: this.provider.getBlockNumber(),
          nonce: this.provider.getTransactionCount(this.from),
        });
        if (y < this.nonce) {
          i = p;
          return;
        }
        if (a) return null;
        const w = await this.getTransaction();
        if (!(w && w.blockNumber != null))
          for (
            o === -1 && ((o = i - 3), o < d(this, Ut) && (o = d(this, Ut)));
            o <= p;

          ) {
            if (a) return null;
            const v = await this.provider.getBlock(o, !0);
            if (v == null) return;
            for (const x of v) if (x === this.hash) return;
            for (let x = 0; x < v.length; x++) {
              const O = await v.getTransaction(x);
              if (O.from === this.from && O.nonce === this.nonce) {
                if (a) return null;
                const U = await this.provider.getTransactionReceipt(O.hash);
                if (U == null || p - U.blockNumber + 1 < n) return;
                let S = "replaced";
                O.data === this.data &&
                O.to === this.to &&
                O.value === this.value
                  ? (S = "repriced")
                  : O.data === "0x" &&
                    O.from === O.to &&
                    O.value === Hr &&
                    (S = "cancelled"),
                  b(!1, "transaction was replaced", "TRANSACTION_REPLACED", {
                    cancelled: S === "replaced" || S === "cancelled",
                    reason: S,
                    replacement: O.replaceableTransaction(i),
                    hash: O.hash,
                    receipt: U,
                  });
              }
            }
            o++;
          }
      },
      l = (p) => {
        if (p == null || p.status !== 0) return p;
        b(!1, "transaction execution reverted", "CALL_EXCEPTION", {
          action: "sendTransaction",
          data: null,
          reason: null,
          invocation: null,
          revert: null,
          transaction: { to: p.to, from: p.from, data: "" },
          receipt: p,
        });
      },
      u = await this.provider.getTransactionReceipt(this.hash);
    if (n === 0) return l(u);
    if (u) {
      if ((await u.confirmations()) >= n) return l(u);
    } else if ((await c(), n === 0)) return null;
    return await new Promise((p, y) => {
      const w = [],
        v = () => {
          w.forEach((O) => O());
        };
      if (
        (w.push(() => {
          a = !0;
        }),
        s > 0)
      ) {
        const O = setTimeout(() => {
          v(), y(me("wait for transaction timeout", "TIMEOUT"));
        }, s);
        w.push(() => {
          clearTimeout(O);
        });
      }
      const x = async (O) => {
        if ((await O.confirmations()) >= n) {
          v();
          try {
            p(l(O));
          } catch (U) {
            y(U);
          }
        }
      };
      if (
        (w.push(() => {
          this.provider.off(this.hash, x);
        }),
        this.provider.on(this.hash, x),
        i >= 0)
      ) {
        const O = async () => {
          try {
            await c();
          } catch (U) {
            if (fe(U, "TRANSACTION_REPLACED")) {
              v(), y(U);
              return;
            }
          }
          a || this.provider.once("block", O);
        };
        w.push(() => {
          this.provider.off("block", O);
        }),
          this.provider.once("block", O);
      }
    });
  }
  isMined() {
    return this.blockHash != null;
  }
  isLegacy() {
    return this.type === 0;
  }
  isBerlin() {
    return this.type === 1;
  }
  isLondon() {
    return this.type === 2;
  }
  isCancun() {
    return this.type === 3;
  }
  removedEvent() {
    return (
      b(
        this.isMined(),
        "unmined transaction canot be orphaned",
        "UNSUPPORTED_OPERATION",
        { operation: "removeEvent()" },
      ),
      Jr(this)
    );
  }
  reorderedEvent(t) {
    return (
      b(
        this.isMined(),
        "unmined transaction canot be orphaned",
        "UNSUPPORTED_OPERATION",
        { operation: "removeEvent()" },
      ),
      b(
        !t || t.isMined(),
        "unmined 'other' transaction canot be orphaned",
        "UNSUPPORTED_OPERATION",
        { operation: "removeEvent()" },
      ),
      zr(this, t)
    );
  }
  replaceableTransaction(t) {
    g(Number.isInteger(t) && t >= 0, "invalid startBlock", "startBlock", t);
    const e = new Un(this, this.provider);
    return k(e, Ut, t), e;
  }
};
Ut = new WeakMap();
let bn = Un;
function zr(r, t) {
  return { orphan: "reorder-transaction", tx: r, other: t };
}
function Jr(r) {
  return { orphan: "drop-transaction", tx: r };
}
function Ri(r) {
  return {
    orphan: "drop-log",
    log: {
      transactionHash: r.transactionHash,
      blockHash: r.blockHash,
      blockNumber: r.blockNumber,
      address: r.address,
      data: r.data,
      topics: Object.freeze(r.topics.slice()),
      index: r.index,
    },
  };
}
class Tn extends Qe {
  constructor(e, n, s) {
    super(e, e.provider);
    f(this, "interface");
    f(this, "fragment");
    f(this, "args");
    const i = n.decodeEventLog(s, e.data, e.topics);
    N(this, { args: i, fragment: s, interface: n });
  }
  get eventName() {
    return this.fragment.name;
  }
  get eventSignature() {
    return this.fragment.format();
  }
}
class Kr extends Qe {
  constructor(e, n) {
    super(e, e.provider);
    f(this, "error");
    N(this, { error: n });
  }
}
var ue;
class Ii extends Pi {
  constructor(e, n, s) {
    super(s, n);
    I(this, ue);
    k(this, ue, e);
  }
  get logs() {
    return super.logs.map((e) => {
      const n = e.topics.length ? d(this, ue).getEvent(e.topics[0]) : null;
      if (n)
        try {
          return new Tn(e, d(this, ue), n);
        } catch (s) {
          return new Kr(e, s);
        }
      return e;
    });
  }
}
ue = new WeakMap();
var ve;
class An extends bn {
  constructor(e, n, s) {
    super(s, n);
    I(this, ve);
    k(this, ve, e);
  }
  async wait(e, n) {
    const s = await super.wait(e, n);
    return s == null ? null : new Ii(d(this, ve), this.provider, s);
  }
}
ve = new WeakMap();
class Wr extends ps {
  constructor(e, n, s, i) {
    super(e, n, s);
    f(this, "log");
    N(this, { log: i });
  }
  async getBlock() {
    return await this.log.getBlock();
  }
  async getTransaction() {
    return await this.log.getTransaction();
  }
  async getTransactionReceipt() {
    return await this.log.getTransactionReceipt();
  }
}
class Ui extends Wr {
  constructor(t, e, n, s, i) {
    super(t, e, n, new Tn(i, t.interface, s));
    const o = t.interface.decodeEventLog(s, this.log.data, this.log.topics);
    N(this, { args: o, fragment: s });
  }
  get eventName() {
    return this.fragment.name;
  }
  get eventSignature() {
    return this.fragment.format();
  }
}
const cr = BigInt(0);
function Xr(r) {
  return r && typeof r.call == "function";
}
function Yr(r) {
  return r && typeof r.estimateGas == "function";
}
function qe(r) {
  return r && typeof r.resolveName == "function";
}
function Zr(r) {
  return r && typeof r.sendTransaction == "function";
}
function Qr(r) {
  if (r != null) {
    if (qe(r)) return r;
    if (r.provider) return r.provider;
  }
}
var Oe;
class _i {
  constructor(t, e, n) {
    I(this, Oe);
    f(this, "fragment");
    if ((N(this, { fragment: e }), e.inputs.length < n.length))
      throw new Error("too many arguments");
    const s = Yt(t.runner, "resolveName"),
      i = qe(s) ? s : null;
    k(
      this,
      Oe,
      (async function () {
        const o = await Promise.all(
          e.inputs.map((a, c) =>
            n[c] == null
              ? null
              : a.walkAsync(n[c], (u, h) =>
                  u === "address"
                    ? Array.isArray(h)
                      ? Promise.all(h.map((p) => we(p, i)))
                      : we(h, i)
                    : h,
                ),
          ),
        );
        return t.interface.encodeFilterTopics(e, o);
      })(),
    );
  }
  getTopicFilter() {
    return d(this, Oe);
  }
}
Oe = new WeakMap();
function Yt(r, t) {
  return r == null
    ? null
    : typeof r[t] == "function"
      ? r
      : r.provider && typeof r.provider[t] == "function"
        ? r.provider
        : null;
}
function Dt(r) {
  return r == null ? null : r.provider || null;
}
async function qr(r, t) {
  const e = H.dereference(r, "overrides");
  g(typeof e == "object", "invalid overrides parameter", "overrides", r);
  const n = Ai(e);
  return (
    g(
      n.to == null || (t || []).indexOf("to") >= 0,
      "cannot override to",
      "overrides.to",
      n.to,
    ),
    g(
      n.data == null || (t || []).indexOf("data") >= 0,
      "cannot override data",
      "overrides.data",
      n.data,
    ),
    n.from && (n.from = n.from),
    n
  );
}
async function Ci(r, t, e) {
  const n = Yt(r, "resolveName"),
    s = qe(n) ? n : null;
  return await Promise.all(
    t.map((i, o) =>
      i.walkAsync(
        e[o],
        (a, c) => ((c = H.dereference(c, a)), a === "address" ? we(c, s) : c),
      ),
    ),
  );
}
function Si(r) {
  const t = async function (o) {
      const a = await qr(o, ["data"]);
      (a.to = await r.getAddress()),
        a.from && (a.from = await we(a.from, Qr(r.runner)));
      const c = r.interface,
        l = St(a.value || cr, "overrides.value") === cr,
        u = (a.data || "0x") === "0x";
      c.fallback &&
        !c.fallback.payable &&
        c.receive &&
        !u &&
        !l &&
        g(
          !1,
          "cannot send data to receive or send value to non-payable fallback",
          "overrides",
          o,
        ),
        g(
          c.fallback || u,
          "cannot send data to receive-only contract",
          "overrides.data",
          a.data,
        );
      const h = c.receive || (c.fallback && c.fallback.payable);
      return (
        g(
          h || l,
          "cannot send value to non-payable fallback",
          "overrides.value",
          a.value,
        ),
        g(
          c.fallback || u,
          "cannot send data to receive-only contract",
          "overrides.data",
          a.data,
        ),
        a
      );
    },
    e = async function (o) {
      const a = Yt(r.runner, "call");
      b(
        Xr(a),
        "contract runner does not support calling",
        "UNSUPPORTED_OPERATION",
        { operation: "call" },
      );
      const c = await t(o);
      try {
        return await a.call(c);
      } catch (l) {
        throw pr(l) && l.data ? r.interface.makeError(l.data, c) : l;
      }
    },
    n = async function (o) {
      const a = r.runner;
      b(
        Zr(a),
        "contract runner does not support sending transactions",
        "UNSUPPORTED_OPERATION",
        { operation: "sendTransaction" },
      );
      const c = await a.sendTransaction(await t(o)),
        l = Dt(r.runner);
      return new An(r.interface, l, c);
    },
    s = async function (o) {
      const a = Yt(r.runner, "estimateGas");
      return (
        b(
          Yr(a),
          "contract runner does not support gas estimation",
          "UNSUPPORTED_OPERATION",
          { operation: "estimateGas" },
        ),
        await a.estimateGas(await t(o))
      );
    },
    i = async (o) => await n(o);
  return (
    N(i, {
      _contract: r,
      estimateGas: s,
      populateTransaction: t,
      send: n,
      staticCall: e,
    }),
    i
  );
}
function Bi(r, t) {
  const e = function (...l) {
      const u = r.interface.getFunction(t, l);
      return (
        b(u, "no matching fragment", "UNSUPPORTED_OPERATION", {
          operation: "fragment",
          info: { key: t, args: l },
        }),
        u
      );
    },
    n = async function (...l) {
      const u = e(...l);
      let h = {};
      if (
        (u.inputs.length + 1 === l.length &&
          ((h = await qr(l.pop())),
          h.from && (h.from = await we(h.from, Qr(r.runner)))),
        u.inputs.length !== l.length)
      )
        throw new Error(
          "internal error: fragment inputs doesn't match arguments; should not happen",
        );
      const p = await Ci(r.runner, u.inputs, l);
      return Object.assign(
        {},
        h,
        await fn({
          to: r.getAddress(),
          data: r.interface.encodeFunctionData(u, p),
        }),
      );
    },
    s = async function (...l) {
      const u = await a(...l);
      return u.length === 1 ? u[0] : u;
    },
    i = async function (...l) {
      const u = r.runner;
      b(
        Zr(u),
        "contract runner does not support sending transactions",
        "UNSUPPORTED_OPERATION",
        { operation: "sendTransaction" },
      );
      const h = await u.sendTransaction(await n(...l)),
        p = Dt(r.runner);
      return new An(r.interface, p, h);
    },
    o = async function (...l) {
      const u = Yt(r.runner, "estimateGas");
      return (
        b(
          Yr(u),
          "contract runner does not support gas estimation",
          "UNSUPPORTED_OPERATION",
          { operation: "estimateGas" },
        ),
        await u.estimateGas(await n(...l))
      );
    },
    a = async function (...l) {
      const u = Yt(r.runner, "call");
      b(
        Xr(u),
        "contract runner does not support calling",
        "UNSUPPORTED_OPERATION",
        { operation: "call" },
      );
      const h = await n(...l);
      let p = "0x";
      try {
        p = await u.call(h);
      } catch (w) {
        throw pr(w) && w.data ? r.interface.makeError(w.data, h) : w;
      }
      const y = e(...l);
      return r.interface.decodeFunctionResult(y, p);
    },
    c = async (...l) => (e(...l).constant ? await s(...l) : await i(...l));
  return (
    N(c, {
      name: r.interface.getFunctionName(t),
      _contract: r,
      _key: t,
      getFragment: e,
      estimateGas: o,
      populateTransaction: n,
      send: i,
      staticCall: s,
      staticCallResult: a,
    }),
    Object.defineProperty(c, "fragment", {
      configurable: !1,
      enumerable: !0,
      get: () => {
        const l = r.interface.getFunction(t);
        return (
          b(l, "no matching fragment", "UNSUPPORTED_OPERATION", {
            operation: "fragment",
            info: { key: t },
          }),
          l
        );
      },
    }),
    c
  );
}
function Li(r, t) {
  const e = function (...s) {
      const i = r.interface.getEvent(t, s);
      return (
        b(i, "no matching fragment", "UNSUPPORTED_OPERATION", {
          operation: "fragment",
          info: { key: t, args: s },
        }),
        i
      );
    },
    n = function (...s) {
      return new _i(r, e(...s), s);
    };
  return (
    N(n, {
      name: r.interface.getEventName(t),
      _contract: r,
      _key: t,
      getFragment: e,
    }),
    Object.defineProperty(n, "fragment", {
      configurable: !1,
      enumerable: !0,
      get: () => {
        const s = r.interface.getEvent(t);
        return (
          b(s, "no matching fragment", "UNSUPPORTED_OPERATION", {
            operation: "fragment",
            info: { key: t },
          }),
          s
        );
      },
    }),
    n
  );
}
const De = Symbol.for("_ethersInternal_contract"),
  jr = new WeakMap();
function $i(r, t) {
  jr.set(r[De], t);
}
function q(r) {
  return jr.get(r[De]);
}
function Fi(r) {
  return (
    r &&
    typeof r == "object" &&
    "getTopicFilter" in r &&
    typeof r.getTopicFilter == "function" &&
    r.fragment
  );
}
async function Pn(r, t) {
  let e,
    n = null;
  if (Array.isArray(t)) {
    const i = function (o) {
      if (Et(o, 32)) return o;
      const a = r.interface.getEvent(o);
      return g(a, "unknown fragment", "name", o), a.topicHash;
    };
    e = t.map((o) => (o == null ? null : Array.isArray(o) ? o.map(i) : i(o)));
  } else
    t === "*"
      ? (e = [null])
      : typeof t == "string"
        ? Et(t, 32)
          ? (e = [t])
          : ((n = r.interface.getEvent(t)),
            g(n, "unknown fragment", "event", t),
            (e = [n.topicHash]))
        : Fi(t)
          ? (e = await t.getTopicFilter())
          : "fragment" in t
            ? ((n = t.fragment), (e = [n.topicHash]))
            : g(!1, "unknown event name", "event", t);
  e = e.map((i) => {
    if (i == null) return null;
    if (Array.isArray(i)) {
      const o = Array.from(new Set(i.map((a) => a.toLowerCase())).values());
      return o.length === 1 ? o[0] : (o.sort(), o);
    }
    return i.toLowerCase();
  });
  const s = e
    .map((i) => (i == null ? "null" : Array.isArray(i) ? i.join("|") : i))
    .join("&");
  return { fragment: n, tag: s, topics: e };
}
async function ge(r, t) {
  const { subs: e } = q(r);
  return e.get((await Pn(r, t)).tag) || null;
}
async function lr(r, t, e) {
  const n = Dt(r.runner);
  b(
    n,
    "contract runner does not support subscribing",
    "UNSUPPORTED_OPERATION",
    { operation: t },
  );
  const { fragment: s, tag: i, topics: o } = await Pn(r, e),
    { addr: a, subs: c } = q(r);
  let l = c.get(i);
  if (!l) {
    const h = { address: a || r, topics: o },
      p = (x) => {
        let O = s;
        if (O == null)
          try {
            O = r.interface.getEvent(x.topics[0]);
          } catch {}
        if (O) {
          const U = O,
            S = s ? r.interface.decodeEventLog(s, x.data, x.topics) : [];
          xn(r, e, S, (Z) => new Ui(r, Z, e, U, x));
        } else xn(r, e, [], (U) => new Wr(r, U, e, x));
      };
    let y = [];
    (l = {
      tag: i,
      listeners: [],
      start: () => {
        y.length || y.push(n.on(h, p));
      },
      stop: async () => {
        if (y.length == 0) return;
        let x = y;
        (y = []), await Promise.all(x), n.off(h, p);
      },
    }),
      c.set(i, l);
  }
  return l;
}
let En = Promise.resolve();
async function Di(r, t, e, n) {
  await En;
  const s = await ge(r, t);
  if (!s) return !1;
  const i = s.listeners.length;
  return (
    (s.listeners = s.listeners.filter(({ listener: o, once: a }) => {
      const c = Array.from(e);
      n && c.push(n(a ? null : o));
      try {
        o.call(r, ...c);
      } catch {}
      return !a;
    })),
    s.listeners.length === 0 && (s.stop(), q(r).subs.delete(s.tag)),
    i > 0
  );
}
async function xn(r, t, e, n) {
  try {
    await En;
  } catch {}
  const s = Di(r, t, e, n);
  return (En = s), await s;
}
const Ce = ["then"];
var ur;
ur = De;
const ye = class ye {
  constructor(t, e, n, s) {
    f(this, "target");
    f(this, "interface");
    f(this, "runner");
    f(this, "filters");
    f(this, ur);
    f(this, "fallback");
    g(
      typeof t == "string" || Ur(t),
      "invalid value for Contract target",
      "target",
      t,
    ),
      n == null && (n = null);
    const i = wn.from(e);
    N(this, { target: t, runner: n, interface: i }),
      Object.defineProperty(this, De, { value: {} });
    let o,
      a = null,
      c = null;
    if (s) {
      const h = Dt(n);
      c = new An(this.interface, h, s);
    }
    let l = new Map();
    if (typeof t == "string")
      if (Et(t)) (a = t), (o = Promise.resolve(t));
      else {
        const h = Yt(n, "resolveName");
        if (!qe(h))
          throw me(
            "contract runner does not support name resolution",
            "UNSUPPORTED_OPERATION",
            { operation: "resolveName" },
          );
        o = h.resolveName(t).then((p) => {
          if (p == null)
            throw me(
              "an ENS name used for a contract target must be correctly configured",
              "UNCONFIGURED_NAME",
              { value: t },
            );
          return (q(this).addr = p), p;
        });
      }
    else
      o = t.getAddress().then((h) => {
        if (h == null) throw new Error("TODO");
        return (q(this).addr = h), h;
      });
    $i(this, { addrPromise: o, addr: a, deployTx: c, subs: l });
    const u = new Proxy(
      {},
      {
        get: (h, p, y) => {
          if (typeof p == "symbol" || Ce.indexOf(p) >= 0)
            return Reflect.get(h, p, y);
          try {
            return this.getEvent(p);
          } catch (w) {
            if (!fe(w, "INVALID_ARGUMENT") || w.argument !== "key") throw w;
          }
        },
        has: (h, p) =>
          Ce.indexOf(p) >= 0
            ? Reflect.has(h, p)
            : Reflect.has(h, p) || this.interface.hasEvent(String(p)),
      },
    );
    return (
      N(this, { filters: u }),
      N(this, { fallback: i.receive || i.fallback ? Si(this) : null }),
      new Proxy(this, {
        get: (h, p, y) => {
          if (typeof p == "symbol" || p in h || Ce.indexOf(p) >= 0)
            return Reflect.get(h, p, y);
          try {
            return h.getFunction(p);
          } catch (w) {
            if (!fe(w, "INVALID_ARGUMENT") || w.argument !== "key") throw w;
          }
        },
        has: (h, p) =>
          typeof p == "symbol" || p in h || Ce.indexOf(p) >= 0
            ? Reflect.has(h, p)
            : h.interface.hasFunction(p),
      })
    );
  }
  connect(t) {
    return new ye(this.target, this.interface, t);
  }
  attach(t) {
    return new ye(t, this.interface, this.runner);
  }
  async getAddress() {
    return await q(this).addrPromise;
  }
  async getDeployedCode() {
    const t = Dt(this.runner);
    b(t, "runner does not support .provider", "UNSUPPORTED_OPERATION", {
      operation: "getDeployedCode",
    });
    const e = await t.getCode(await this.getAddress());
    return e === "0x" ? null : e;
  }
  async waitForDeployment() {
    const t = this.deploymentTransaction();
    if (t) return await t.wait(), this;
    if ((await this.getDeployedCode()) != null) return this;
    const n = Dt(this.runner);
    return (
      b(
        n != null,
        "contract runner does not support .provider",
        "UNSUPPORTED_OPERATION",
        { operation: "waitForDeployment" },
      ),
      new Promise((s, i) => {
        const o = async () => {
          try {
            if ((await this.getDeployedCode()) != null) return s(this);
            n.once("block", o);
          } catch (a) {
            i(a);
          }
        };
        o();
      })
    );
  }
  deploymentTransaction() {
    return q(this).deployTx;
  }
  getFunction(t) {
    return typeof t != "string" && (t = t.format()), Bi(this, t);
  }
  getEvent(t) {
    return typeof t != "string" && (t = t.format()), Li(this, t);
  }
  async queryTransaction(t) {
    throw new Error("@TODO");
  }
  async queryFilter(t, e, n) {
    e == null && (e = 0), n == null && (n = "latest");
    const { addr: s, addrPromise: i } = q(this),
      o = s || (await i),
      { fragment: a, topics: c } = await Pn(this, t),
      l = { address: o, topics: c, fromBlock: e, toBlock: n },
      u = Dt(this.runner);
    return (
      b(
        u,
        "contract runner does not have a provider",
        "UNSUPPORTED_OPERATION",
        { operation: "queryFilter" },
      ),
      (await u.getLogs(l)).map((h) => {
        let p = a;
        if (p == null)
          try {
            p = this.interface.getEvent(h.topics[0]);
          } catch {}
        if (p)
          try {
            return new Tn(h, this.interface, p);
          } catch (y) {
            return new Kr(h, y);
          }
        return new Qe(h, u);
      })
    );
  }
  async on(t, e) {
    const n = await lr(this, "on", t);
    return n.listeners.push({ listener: e, once: !1 }), n.start(), this;
  }
  async once(t, e) {
    const n = await lr(this, "once", t);
    return n.listeners.push({ listener: e, once: !0 }), n.start(), this;
  }
  async emit(t, ...e) {
    return await xn(this, t, e, null);
  }
  async listenerCount(t) {
    if (t) {
      const s = await ge(this, t);
      return s ? s.listeners.length : 0;
    }
    const { subs: e } = q(this);
    let n = 0;
    for (const { listeners: s } of e.values()) n += s.length;
    return n;
  }
  async listeners(t) {
    if (t) {
      const s = await ge(this, t);
      return s ? s.listeners.map(({ listener: i }) => i) : [];
    }
    const { subs: e } = q(this);
    let n = [];
    for (const { listeners: s } of e.values())
      n = n.concat(s.map(({ listener: i }) => i));
    return n;
  }
  async off(t, e) {
    const n = await ge(this, t);
    if (!n) return this;
    if (e) {
      const s = n.listeners.map(({ listener: i }) => i).indexOf(e);
      s >= 0 && n.listeners.splice(s, 1);
    }
    return (
      (e == null || n.listeners.length === 0) &&
        (n.stop(), q(this).subs.delete(n.tag)),
      this
    );
  }
  async removeAllListeners(t) {
    if (t) {
      const e = await ge(this, t);
      if (!e) return this;
      e.stop(), q(this).subs.delete(e.tag);
    } else {
      const { subs: e } = q(this);
      for (const { tag: n, stop: s } of e.values()) s(), e.delete(n);
    }
    return this;
  }
  async addListener(t, e) {
    return await this.on(t, e);
  }
  async removeListener(t, e) {
    return await this.off(t, e);
  }
  static buildClass(t) {
    class e extends ye {
      constructor(s, i = null) {
        super(s, t, i);
      }
    }
    return e;
  }
  static from(t, e, n) {
    return n == null && (n = null), new this(t, e, n);
  }
};
let Nn = ye;
function Vi() {
  return Nn;
}
class Mi extends Vi() {}
const Gi = Ke(null),
  Hi = Ke(null),
  ts = Ke(null),
  Rn = Ke(null),
  zi = "YOUR_CONTRACT_ADDRESS",
  Ji = [];
async function Ki() {
  if (window.ethereum)
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const r = new (void 0).Web3Provider(window.ethereum),
        t = r.getSigner(),
        e = await t.getAddress();
      Gi.set(r), Hi.set(t), ts.set(e);
      const n = new Mi(zi, Ji, t);
      Rn.set(n);
    } catch (r) {
      console.error("Error connecting wallet:", r);
    }
  else console.error("MetaMask not found");
}
function Wi(r) {
  let t,
    e,
    n,
    s = "Connect Wallet",
    i,
    o,
    a,
    c = r[0] ? `Connected: ${r[0]}` : "Not connected",
    l,
    u,
    h;
  return {
    c() {
      (t = P("div")),
        (e = P("div")),
        (n = P("button")),
        (n.textContent = s),
        (i = M()),
        (o = P("p")),
        (a = Bn("Status: ")),
        (l = Bn(c)),
        this.h();
    },
    l(p) {
      t = R(p, "DIV", { class: !0 });
      var y = z(t);
      e = R(y, "DIV", { class: !0 });
      var w = z(e);
      (n = R(w, "BUTTON", { class: !0, "data-svelte-h": !0 })),
        st(n) !== "svelte-bcxwpo" && (n.textContent = s),
        (i = G(w)),
        (o = R(w, "P", {}));
      var v = z(o);
      (a = Ln(v, "Status: ")),
        (l = Ln(v, c)),
        v.forEach(B),
        w.forEach(B),
        y.forEach(B),
        this.h();
    },
    h() {
      A(n, "class", "btn variant-filled"),
        A(e, "class", "card p-4 w-3/5 flex flex-col gap-2"),
        A(t, "class", "flex items-center justify-center py-2");
    },
    m(p, y) {
      Je(p, t, y),
        E(t, e),
        E(e, n),
        E(e, i),
        E(e, o),
        E(o, a),
        E(o, l),
        u || ((h = _t(n, "click", r[1])), (u = !0));
    },
    p(p, [y]) {
      y & 1 &&
        c !== (c = p[0] ? `Connected: ${p[0]}` : "Not connected") &&
        rs(l, c);
    },
    i: Jt,
    o: Jt,
    d(p) {
      p && B(t), (u = !1), h();
    },
  };
}
function Xi(r, t, e) {
  let n;
  return (
    ts.subscribe((i) => {
      e(0, (n = i));
    }),
    [
      n,
      () => {
        Ki();
      },
    ]
  );
}
class Yi extends He {
  constructor(t) {
    super(), ze(this, t, Xi, Wi, Ge, {});
  }
}
function Zi(r) {
  let t,
    e,
    n,
    s = "Create Proposal",
    i,
    o,
    a,
    c = "Title",
    l,
    u,
    h,
    p,
    y,
    w = "Description",
    v,
    x,
    O,
    U,
    S = "Submit Proposal",
    Z,
    Qt;
  return {
    c() {
      (t = P("div")),
        (e = P("div")),
        (n = P("h4")),
        (n.textContent = s),
        (i = M()),
        (o = P("label")),
        (a = P("span")),
        (a.textContent = c),
        (l = M()),
        (u = P("input")),
        (h = M()),
        (p = P("label")),
        (y = P("span")),
        (y.textContent = w),
        (v = M()),
        (x = P("textarea")),
        (O = M()),
        (U = P("button")),
        (U.textContent = S),
        this.h();
    },
    l(D) {
      t = R(D, "DIV", { class: !0 });
      var ct = z(t);
      e = R(ct, "DIV", { class: !0 });
      var tt = z(e);
      (n = R(tt, "H4", { class: !0, "data-svelte-h": !0 })),
        st(n) !== "svelte-1e6b4c3" && (n.textContent = s),
        (i = G(tt)),
        (o = R(tt, "LABEL", { class: !0 }));
      var Q = z(o);
      (a = R(Q, "SPAN", { "data-svelte-h": !0 })),
        st(a) !== "svelte-7ccxmo" && (a.textContent = c),
        (l = G(Q)),
        (u = R(Q, "INPUT", { class: !0, type: !0, placeholder: !0 })),
        Q.forEach(B),
        (h = G(tt)),
        (p = R(tt, "LABEL", { class: !0 }));
      var Lt = z(p);
      (y = R(Lt, "SPAN", { "data-svelte-h": !0 })),
        st(y) !== "svelte-rmspr8" && (y.textContent = w),
        (v = G(Lt)),
        (x = R(Lt, "TEXTAREA", { class: !0, rows: !0, placeholder: !0 })),
        z(x).forEach(B),
        Lt.forEach(B),
        (O = G(tt)),
        (U = R(tt, "BUTTON", { class: !0, "data-svelte-h": !0 })),
        st(U) !== "svelte-1i1iwgr" && (U.textContent = S),
        tt.forEach(B),
        ct.forEach(B),
        this.h();
    },
    h() {
      A(n, "class", "h4"),
        A(u, "class", "input"),
        A(u, "type", "text"),
        A(u, "placeholder", "Title"),
        A(o, "class", "label"),
        A(x, "class", "textarea"),
        A(x, "rows", "4"),
        A(x, "placeholder", "Description"),
        A(p, "class", "label"),
        A(U, "class", "btn variant-filled"),
        A(e, "class", "card p-4 w-3/5 flex flex-col gap-2"),
        A(t, "class", "flex items-center justify-center py-2");
    },
    m(D, ct) {
      Je(D, t, ct),
        E(t, e),
        E(e, n),
        E(e, i),
        E(e, o),
        E(o, a),
        E(o, l),
        E(o, u),
        ee(u, r[0]),
        E(e, h),
        E(e, p),
        E(p, y),
        E(p, v),
        E(p, x),
        ee(x, r[1]),
        E(e, O),
        E(e, U),
        Z ||
          ((Qt = [
            _t(u, "input", r[3]),
            _t(x, "input", r[4]),
            _t(U, "click", r[2]),
          ]),
          (Z = !0));
    },
    p(D, [ct]) {
      ct & 1 && u.value !== D[0] && ee(u, D[0]), ct & 2 && ee(x, D[1]);
    },
    i: Jt,
    o: Jt,
    d(D) {
      D && B(t), (Z = !1), fr(Qt);
    },
  };
}
function Qi(r, t, e) {
  let n;
  Rn.subscribe((l) => {
    n = l;
  });
  let s = "",
    i = "";
  const o = async () => {
    if (n)
      try {
        await (await n.createProposal(s, i)).wait(),
          alert("Proposal created successfully");
      } catch (l) {
        console.error("Error creating proposal:", l),
          alert("Error creating proposal");
      }
  };
  function a() {
    (s = this.value), e(0, s);
  }
  function c() {
    (i = this.value), e(1, i);
  }
  return [s, i, o, a, c];
}
class qi extends He {
  constructor(t) {
    super(), ze(this, t, Qi, Zi, Ge, {});
  }
}
function ji(r) {
  let t,
    e,
    n,
    s = "Vote on Proposal",
    i,
    o,
    a,
    c = "Title",
    l,
    u,
    h,
    p,
    y,
    w,
    v,
    x,
    O = "Yes",
    U,
    S,
    Z,
    Qt,
    D,
    ct = "No",
    tt,
    Q,
    Lt = "Cast Vote",
    je,
    _n;
  return {
    c() {
      (t = P("div")),
        (e = P("div")),
        (n = P("h4")),
        (n.textContent = s),
        (i = M()),
        (o = P("label")),
        (a = P("span")),
        (a.textContent = c),
        (l = M()),
        (u = P("input")),
        (h = M()),
        (p = P("div")),
        (y = P("label")),
        (w = P("input")),
        (v = M()),
        (x = P("p")),
        (x.textContent = O),
        (U = M()),
        (S = P("label")),
        (Z = P("input")),
        (Qt = M()),
        (D = P("p")),
        (D.textContent = ct),
        (tt = M()),
        (Q = P("button")),
        (Q.textContent = Lt),
        this.h();
    },
    l(At) {
      t = R(At, "DIV", { class: !0 });
      var qt = z(t);
      e = R(qt, "DIV", { class: !0 });
      var Pt = z(e);
      (n = R(Pt, "H4", { class: !0, "data-svelte-h": !0 })),
        st(n) !== "svelte-19ybxxq" && (n.textContent = s),
        (i = G(Pt)),
        (o = R(Pt, "LABEL", { class: !0 }));
      var ke = z(o);
      (a = R(ke, "SPAN", { "data-svelte-h": !0 })),
        st(a) !== "svelte-7ccxmo" && (a.textContent = c),
        (l = G(ke)),
        (u = R(ke, "INPUT", { class: !0, type: !0, placeholder: !0 })),
        ke.forEach(B),
        (h = G(Pt)),
        (p = R(Pt, "DIV", { class: !0 }));
      var Te = z(p);
      y = R(Te, "LABEL", { class: !0 });
      var Ae = z(y);
      (w = R(Ae, "INPUT", { type: !0, name: !0 })),
        (v = G(Ae)),
        (x = R(Ae, "P", { "data-svelte-h": !0 })),
        st(x) !== "svelte-1wwlnrb" && (x.textContent = O),
        Ae.forEach(B),
        (U = G(Te)),
        (S = R(Te, "LABEL", { class: !0 }));
      var Pe = z(S);
      (Z = R(Pe, "INPUT", { type: !0, name: !0 })),
        (Qt = G(Pe)),
        (D = R(Pe, "P", { "data-svelte-h": !0 })),
        st(D) !== "svelte-8xe5xx" && (D.textContent = ct),
        Pe.forEach(B),
        Te.forEach(B),
        (tt = G(Pt)),
        (Q = R(Pt, "BUTTON", { class: !0, "data-svelte-h": !0 })),
        st(Q) !== "svelte-8mvr79" && (Q.textContent = Lt),
        Pt.forEach(B),
        qt.forEach(B),
        this.h();
    },
    h() {
      A(n, "class", "h4"),
        A(u, "class", "input"),
        A(u, "type", "number"),
        A(u, "placeholder", "Proposal ID"),
        A(o, "class", "label"),
        A(w, "type", "radio"),
        A(w, "name", "vote"),
        (w.value = "yes"),
        A(y, "class", "flex items-center space-x-2"),
        A(Z, "type", "radio"),
        A(Z, "name", "vote"),
        (Z.value = "no"),
        A(S, "class", "flex items-center space-x-2"),
        A(p, "class", "space-y-2"),
        A(Q, "class", "btn variant-filled"),
        A(e, "class", "card p-4 w-3/5 flex flex-col gap-2"),
        A(t, "class", "flex items-center justify-center py-2");
    },
    m(At, qt) {
      Je(At, t, qt),
        E(t, e),
        E(e, n),
        E(e, i),
        E(e, o),
        E(o, a),
        E(o, l),
        E(o, u),
        ee(u, r[0]),
        E(e, h),
        E(e, p),
        E(p, y),
        E(y, w),
        E(y, v),
        E(y, x),
        E(p, U),
        E(p, S),
        E(S, Z),
        E(S, Qt),
        E(S, D),
        E(e, tt),
        E(e, Q),
        je ||
          ((_n = [
            _t(u, "input", r[3]),
            _t(w, "click", r[4]),
            _t(Z, "click", r[5]),
            _t(Q, "click", r[2]),
          ]),
          (je = !0));
    },
    p(At, [qt]) {
      qt & 1 && hr(u.value) !== At[0] && ee(u, At[0]);
    },
    i: Jt,
    o: Jt,
    d(At) {
      At && B(t), (je = !1), fr(_n);
    },
  };
}
function to(r, t, e) {
  let n;
  Rn.subscribe((u) => {
    n = u;
  });
  let s, i;
  const o = async () => {
    if (n)
      try {
        await (await n.vote(s, i)).wait(), alert("Vote cast successfully");
      } catch (u) {
        console.error("Error casting vote:", u), alert("Error casting vote");
      }
  };
  function a() {
    (s = hr(this.value)), e(0, s);
  }
  return [s, i, o, a, () => e(1, (i = !0)), () => e(1, (i = !1))];
}
class eo extends He {
  constructor(t) {
    super(), ze(this, t, to, ji, Ge, {});
  }
}
function no(r) {
  let t,
    e,
    n =
      '<h1 class="h1 font-semibold"><span class="bg-gradient-to-br from-pink-500 to-violet-500 bg-clip-text text-transparent box-decoration-clone">Svelte DAO on Arbitrum</span></h1>',
    s,
    i,
    o,
    a,
    c,
    l,
    u;
  return (
    (i = new Yi({})),
    (a = new qi({})),
    (l = new eo({})),
    {
      c() {
        (t = P("main")),
          (e = P("div")),
          (e.innerHTML = n),
          (s = M()),
          en(i.$$.fragment),
          (o = M()),
          en(a.$$.fragment),
          (c = M()),
          en(l.$$.fragment),
          this.h();
      },
      l(h) {
        t = R(h, "MAIN", { class: !0 });
        var p = z(t);
        (e = R(p, "DIV", { class: !0, "data-svelte-h": !0 })),
          st(e) !== "svelte-1u9japi" && (e.innerHTML = n),
          (s = G(p)),
          nn(i.$$.fragment, p),
          (o = G(p)),
          nn(a.$$.fragment, p),
          (c = G(p)),
          nn(l.$$.fragment, p),
          p.forEach(B),
          this.h();
      },
      h() {
        A(e, "class", "p-10"), A(t, "class", "svelte-18d4fpq");
      },
      m(h, p) {
        Je(h, t, p),
          E(t, e),
          E(t, s),
          rn(i, t, null),
          E(t, o),
          rn(a, t, null),
          E(t, c),
          rn(l, t, null),
          (u = !0);
      },
      p: Jt,
      i(h) {
        u ||
          (sn(i.$$.fragment, h),
          sn(a.$$.fragment, h),
          sn(l.$$.fragment, h),
          (u = !0));
      },
      o(h) {
        on(i.$$.fragment, h),
          on(a.$$.fragment, h),
          on(l.$$.fragment, h),
          (u = !1);
      },
      d(h) {
        h && B(t), an(i), an(a), an(l);
      },
    }
  );
}
class ao extends He {
  constructor(t) {
    super(), ze(this, t, null, no, Ge, {});
  }
}
export { ao as component };
