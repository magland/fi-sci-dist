import p, { useMemo as f, useContext as _ } from "react";
const ae = (e) => {
  if (typeof e == "number")
    return e;
  if (typeof e == "string") {
    const t = N(e);
    try {
      const n = parseFloat(t);
      return isNaN(n) ? 0 : n;
    } catch {
      return 0;
    }
  } else
    return 0;
}, N = (e) => {
  let t = 0;
  for (; t < e.length && C(e[t]); )
    t++;
  return e.slice(t);
}, C = (e) => isNaN(parseFloat(e)), R = (e) => [...e].sort((t, n) => {
  if (typeof t == "number" && typeof n == "number")
    return t - n;
  {
    if (!isNaN(parseInt(t + "")) && !isNaN(parseInt(n + "")))
      return parseInt(t + "") - parseInt(n + "");
    const r = (t + "")[0], i = (n + "")[0];
    if (r === i) {
      const d = (t + "").slice(1), s = (n + "").slice(1);
      return !isNaN(parseInt(d)) && !isNaN(parseInt(s)) ? parseInt(d) - parseInt(s) : t < n ? -1 : t > n ? 1 : 0;
    } else
      return t < n ? -1 : t > n ? 1 : 0;
  }
});
let T = 0, E = 1, c;
const ue = (e) => {
  c === void 0 && (c = U.length);
  const t = (T + e * E) % c;
  return U[t];
}, L = () => {
  c === void 0 && (c = U.length), T += 1, c -= 1, c < U.length - 6 && (c = U.length);
  let e = !1;
  for (; !e; )
    E += 1, m(E, c) && (e = !0);
}, m = (e, t) => {
  for (let n = 2; n <= e; n++)
    if (e % n === 0 && t % n === 0)
      return !1;
  return !0;
}, U = [
  "#00ff00",
  "#ff00ff",
  "#0080ff",
  "#ff8000",
  "#80bf80",
  "#470ba7",
  "#c80b32",
  "#fd7ee5",
  "#027d30",
  // '#f0fd23',
  "#00ffff",
  "#00ff80",
  "#9c5a86",
  "#808000",
  "#8ed7fa",
  "#80ff00",
  "#6e52ff",
  "#0000ff",
  "#119c9b",
  "#feb982",
  "#56333d",
  "#fb2b97",
  "#8000ff",
  "#c3f1a2",
  "#b3bd25",
  "#45bc2d",
  "#1c4b88",
  "#49f3c0",
  "#a90c9c",
  "#c436ea",
  "#13055b",
  "#7f93d0",
  "#c4552d",
  "#ee7381",
  "#800000",
  "#58fe60",
  "#4f825e",
  "#21bde8",
  "#d7b8e0",
  "#1e40ee",
  "#324a01",
  "#fc2b03",
  "#723cb9",
  "#3a6ac1",
  "#aef14e",
  "#14c568",
  "#bd9c9b",
  "#f9c506",
  "#b579fa",
  // '#ffff80',
  "#810e5e",
  "#b38d4d",
  "#854810",
  "#02ea3a",
  "#0b3b3c",
  "#f90161",
  "#07c304",
  "#fe4c54",
  "#be02ea",
  "#0521bb",
  "#338b05",
  "#4989ff",
  "#52b8b3",
  "#be3271",
  "#f1a441",
  "#0b776b",
  "#0ccfac",
  "#cd61bd",
  "#85fc95",
  "#fe43fe",
  "#bd810d",
  "#cce9e6",
  "#644179",
  "#fedfbe",
  "#80bd00",
  "#99c4bd",
  "#48e5fa",
  "#400626",
  "#bcfc01",
  "#866b3f",
  "#5422e9",
  "#ea03bd",
  "#69809a",
  "#bfca76",
  "#40e60e",
  "#f1da52",
  "#3d5f3b",
  "#63b3f8",
  "#7cd83d",
  "#b52f02",
  "#9364ca",
  "#80a740",
  "#3ce183",
  "#a6a9f6",
  "#fba2bb",
  "#e3763f",
  "#ae3cae",
  "#91414a",
  "#1e94cf",
  "#06f6c9"
], u = (e, t) => {
  const { targetUnit: n } = t;
  if (n === void 0)
    throw Error("UNIQUE_SELECT for unit selection requires a target unit to be set.");
  return {
    ...e,
    lastClickedId: n,
    selectedUnitIds: new Set(e.selectedUnitIds.has(n) ? [] : [n]),
    currentUnitId: n
  };
}, v = (e, t) => {
  if (e.lastClickedId === void 0)
    return e.orderedUnitIds.length === 0 ? e : u(e, {
      type: o,
      targetUnit: e.orderedUnitIds[0]
    });
  const n = e.orderedUnitIds.indexOf(e.lastClickedId);
  if (n < 0)
    return e;
  const r = e.orderedUnitIds[n + 1];
  return r === void 0 ? e : u(e, { type: o, targetUnit: r });
}, P = (e, t) => {
  if (e.lastClickedId === void 0)
    return e;
  const n = e.orderedUnitIds.indexOf(e.lastClickedId);
  if (n < 0 || n === 0)
    return e;
  const r = e.orderedUnitIds[n - 1];
  return r === void 0 ? e : u(e, { type: o, targetUnit: r });
}, O = (e, t) => e.orderedUnitIds.length === 0 ? e : u(e, {
  type: o,
  targetUnit: e.orderedUnitIds[0]
}), A = (e, t) => e.orderedUnitIds.length === 0 ? e : u(e, {
  type: o,
  targetUnit: e.orderedUnitIds[e.orderedUnitIds.length - 1]
}), k = (e, t) => ({
  ...e,
  currentUnitId: (t.incomingSelectedUnitIds || [])[0],
  selectedUnitIds: new Set(t.incomingSelectedUnitIds ?? [])
}), y = (e) => e.selectedUnitIds.size === 0 ? "none" : e.selectedUnitIds.size === e.orderedUnitIds.length ? "all" : !e.visibleUnitIds || e.visibleUnitIds.length === 0 || e.selectedUnitIds.size !== e.visibleUnitIds.length || e.visibleUnitIds.some((t) => !e.selectedUnitIds.has(t)) ? "partial" : "all", h = (e, t) => {
  if (t.targetUnit === void 0)
    throw new Error("Attempt to toggle unit with unset unitid.");
  const n = /* @__PURE__ */ new Set([...e.selectedUnitIds]);
  n.has(t.targetUnit) ? n.delete(t.targetUnit) : n.add(t.targetUnit);
  let r = e.currentUnitId;
  return t.targetUnit === e.currentUnitId && (r = [...n][0]), [...n].length === 1 && (r = [...n][0]), {
    ...e,
    selectedUnitIds: n,
    // shallow copy, to trigger rerender
    currentUnitId: r,
    lastClickedId: t.targetUnit
  };
}, x = (e, t) => {
  const { selectedUnitIds: n, lastClickedId: r, orderedUnitIds: i } = e, { targetUnit: d } = t;
  if (i.length === 0)
    throw Error("Attempt to toggle range with no units initialized.");
  if (!r || !d)
    return console.warn(`Cannot toggle range with undefined limit: last-clicked ${r}, target ${d}`), e;
  const s = i.findIndex((a) => a === r), l = i.findIndex((a) => a === d);
  if (s === -1 || l === -1)
    throw Error(
      `Requested to toggle unit range from ID ${r} to ID ${d} but one of these was not found.`
    );
  const b = i.slice(
    Math.min(s, l),
    Math.max(s, l) + 1
  );
  return n.has(d) ? b.forEach((a) => n.delete(a)) : b.forEach((a) => n.add(a)), e.currentUnitId ? n.has(e.currentUnitId) || (e.currentUnitId = [...n][0]) : e.currentUnitId = [...n][0], {
    ...e,
    lastClickedId: d,
    // TODO: Check with client: should a range toggle update the last-selected-unit?
    selectedUnitIds: new Set(n),
    // shallow copy to trigger rerender
    currentUnitId: e.currentUnitId
  };
}, G = (e) => {
  const t = y(e), n = t === "all" || t === "partial" ? /* @__PURE__ */ new Set() : new Set(e.orderedUnitIds);
  return e.currentUnitId ? n.has(e.currentUnitId) || (e.currentUnitId = [...n][0]) : e.currentUnitId = [...n][0], {
    ...e,
    selectedUnitIds: n
  };
}, D = (e) => (t) => (n) => {
  V(t, e, n);
}, Q = (e) => (t) => (n) => {
  z(t, e, n);
}, V = (e, t, n) => {
  const r = {
    type: n.ctrlKey ? o : n.shiftKey ? g : S,
    targetUnit: e
  };
  t(r);
}, z = (e, t, n) => {
  const r = {
    type: n.shiftKey ? g : n.ctrlKey ? S : o,
    targetUnit: e
  };
  t(r);
}, Ue = (e) => {
}, I = 20, q = (e, t) => {
  if (t.newVisibleUnitIds && t.newVisibleUnitIds.length > 0)
    return { ...e, visibleUnitIds: t.newVisibleUnitIds };
  const n = t.unitsPerPage || e.unitsPerPage || I, r = t.pageNumber || e.page || 1;
  if (n === e.unitsPerPage && r === e.page)
    return e;
  const i = r !== e.page ? r : 1 + Math.floor((e.unitsPerPage || I) * (r - 1) / n), d = n * (i - 1);
  return {
    ...e,
    page: i,
    unitsPerPage: n,
    visibleUnitIds: e.orderedUnitIds.slice(d, d + n)
  };
}, F = (e, t) => ({
  ...e,
  restrictedUnitIds: t.newRestrictedUnitIds,
  selectedUnitIds: t.newRestrictedUnitIds !== void 0 && e.selectedUnitIds !== void 0 ? new Set([...e.selectedUnitIds].filter((n) => !t.newRestrictedUnitIds || t.newRestrictedUnitIds.includes(n))) : e.selectedUnitIds
}), w = (e, t) => {
  const n = (e.unitsPerPage || I) * ((e.page || 1) - 1);
  return e.visibleUnitIds && e.visibleUnitIds.length > 0 ? t.slice(n, n + (e.unitsPerPage || I)) : void 0;
}, H = (e, t) => {
  const { newUnitOrder: n } = t, { orderedUnitIds: r } = e;
  if (!n || n.length === 0)
    throw Error("Attempt to reset unit ordering to empty set.");
  const i = new Set(r);
  if (i.size > 0 && (n.length !== i.size || n.some((s) => !i.has(s))))
    throw Error("Reordering units, but the set of units in the new and old ordering don't match.");
  if (r.every((s, l) => s === n[l]))
    return e;
  const d = w(e, n);
  return {
    ...e,
    orderedUnitIds: n,
    lastClickedId: void 0,
    visibleUnitIds: d,
    sortRules: []
    // clear these out, since we have no guarantee they determined the current sort order
  };
}, $ = (e, t) => {
  const { sortRules: n } = e, { newSortField: r, sortCallback: i } = t;
  if (r === void 0 || i === void 0)
    throw Error("Attempt to update sort fields with undefined field or callback.");
  const d = K(n || [], r, t.ascending), s = i(d), l = w(e, s);
  return {
    ...e,
    sortRules: d,
    orderedUnitIds: s,
    visibleUnitIds: l,
    lastClickedId: void 0
  };
}, K = (e, t, n) => {
  const r = e.pop(), i = n === void 0 ? (r == null ? void 0 : r.columnName) === t ? !r.sortAscending : !0 : n;
  return r && r.columnName !== t && e.push(r), [...e.filter((s) => s.columnName !== t), { columnName: t, sortAscending: i }];
}, M = "SET_SELECTION", o = "UNIQUE_SELECT", B = "UNIQUE_SELECT_NEXT", X = "UNIQUE_SELECT_PREVIOUS", Y = "UNIQUE_SELECT_FIRST", Z = "UNIQUE_SELECT_LAST", S = "TOGGLE_UNIT", g = "TOGGLE_RANGE", W = "TOGGLE_SELECT_ALL", j = "DESELECT_ALL", J = "INITIALIZE_UNITS", ee = "SET_UNIT_ORDER", te = "UPDATE_SORT_FIELDS", ne = "SET_VISIBLE_UNITS", re = "SET_RESTRICTED_UNITS", ie = "COPY_STATE", de = {
  selectedUnitIds: /* @__PURE__ */ new Set(),
  currentUnitId: void 0,
  orderedUnitIds: []
}, Ie = (e, t) => {
  const { type: n } = t;
  switch (n) {
    case J: {
      const r = new Set(e.orderedUnitIds);
      if ((t.newUnitOrder || []).filter((i) => !r.has(i)).length === 0)
        return e;
      if (t.newUnitOrder && t.newUnitOrder.length >= 1)
        return {
          ...e,
          // selectedUnitIds: new Set<number | string>(), // don't initialze here, to support case of selection initialized via state
          orderedUnitIds: R([.../* @__PURE__ */ new Set([...t.newUnitOrder, ...e.orderedUnitIds])])
        };
      throw Error("Attempt to initialize table ordering with no actual units passed.");
    }
    case M:
      return k(e, t);
    case o:
      return u(e, t);
    case B:
      return v(e);
    case X:
      return P(e);
    case Y:
      return O(e);
    case Z:
      return A(e);
    case S:
      return h(e, t);
    case g:
      return e.lastClickedId ? x(e, t) : h(e, t);
    case W:
      return G(e);
    case j:
      return {
        ...e,
        selectedUnitIds: /* @__PURE__ */ new Set(),
        currentUnitId: void 0
      };
    case ee:
      return H(e, t);
    case te:
      return $(e, t);
    case ne:
      return q(e, t);
    case re:
      return F(e, t);
    case ie:
      if (!t.sourceState)
        throw Error("Attempt to copy state but no source state was provided.");
      return {
        ...t.sourceState
      };
    case "REDISTRIBUTE_UNIT_COLORS":
      return L(), {
        ...e,
        orderedUnitIds: [...e.orderedUnitIds],
        // trigger re-render
        selectedUnitIds: /* @__PURE__ */ new Set([...e.selectedUnitIds])
      };
    default:
      throw Error(`Invalid mode for unit selection reducer: ${n}`);
  }
}, se = () => _(ce), ce = p.createContext({
  unitSelection: de,
  unitSelectionDispatch: (e) => {
  }
  // this empty sortingSelectionDispatch function gets replaced by the xxContext.Provider element in App.tsx.
}), fe = () => {
  const { unitSelection: e, unitSelectionDispatch: t } = se(), n = f(
    () => D(t),
    [t]
  ), r = f(
    () => Q(t),
    [t]
  ), i = f(
    () => oe(e.orderedUnitIds, e.restrictedUnitIds),
    [e.orderedUnitIds, e.restrictedUnitIds]
  );
  return {
    selectedUnitIds: e.selectedUnitIds,
    currentUnitId: e.currentUnitId,
    orderedUnitIds: i,
    allOrderedUnitIds: e.orderedUnitIds,
    visibleUnitIds: e.visibleUnitIds,
    primarySortRule: e.sortRules && e.sortRules.length > 0 ? e.sortRules[e.sortRules.length - 1] : void 0,
    page: e.page,
    unitsPerPage: e.unitsPerPage,
    checkboxClickHandlerGenerator: n,
    plotClickHandlerGenerator: r,
    unitIdSelectionDispatch: t,
    currentState: e,
    restrictedUnitIds: e.restrictedUnitIds
  };
}, oe = (e, t) => {
  if (t === void 0)
    return e;
  const n = new Set(t);
  return e.filter((r) => n.has(r));
};
export {
  ie as COPY_STATE,
  j as DESELECT_ALL,
  J as INITIALIZE_UNITS,
  W as TOGGLE_SELECT_ALL,
  Y as UNIQUE_SELECT_FIRST,
  Z as UNIQUE_SELECT_LAST,
  B as UNIQUE_SELECT_NEXT,
  X as UNIQUE_SELECT_PREVIOUS,
  te as UPDATE_SORT_FIELDS,
  ce as UnitSelectionContext,
  y as allUnitSelectionState,
  de as defaultUnitSelection,
  D as getCheckboxClickHandlerGenerator,
  ue as getUnitColor,
  ae as idToNum,
  L as redistributeUnitColors,
  R as sortIds,
  Ie as unitSelectionReducer,
  fe as useSelectedUnitIds,
  Ue as voidClickHandler
};
