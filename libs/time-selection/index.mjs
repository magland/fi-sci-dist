import { jsx as v } from "react/jsx-runtime";
import { createContext as b, useReducer as u, useContext as _, useCallback as n } from "react";
const l = b({
  state: {},
  dispatch: () => {
  }
}), p = (e, i) => {
  switch (i.type) {
    case "report_total_time_range": {
      const S = e.startTimeSec === void 0 ? i.startTimeSec : Math.min(e.startTimeSec, i.startTimeSec), c = e.endTimeSec === void 0 ? i.endTimeSec : Math.max(e.endTimeSec, i.endTimeSec);
      return {
        ...e,
        startTimeSec: S,
        endTimeSec: c
      };
    }
    case "set_visible_time_range":
      return {
        ...e,
        visibleStartTimeSec: i.visibleStartTimeSec,
        visibleEndTimeSec: i.visibleEndTimeSec
      };
    case "set_current_time":
      return {
        ...e,
        currentTimeSec: i.currentTimeSec
      };
    case "set_current_time_fraction":
      return e.visibleStartTimeSec === void 0 || e.visibleEndTimeSec === void 0 ? e : {
        ...e,
        currentTimeSec: e.visibleStartTimeSec + i.fraction * (e.visibleEndTimeSec - e.visibleStartTimeSec)
      };
    case "pan_time_selection": {
      if (e.visibleStartTimeSec === void 0 || e.visibleEndTimeSec === void 0 || e.startTimeSec === void 0 || e.endTimeSec === void 0)
        return e;
      const S = i.deltaSec;
      let c = e.visibleStartTimeSec + S, r = e.visibleEndTimeSec + S;
      return c < e.startTimeSec && (c = e.startTimeSec, r = c + e.visibleEndTimeSec - e.visibleStartTimeSec), r > e.endTimeSec && (r = e.endTimeSec, c = r - e.visibleEndTimeSec + e.visibleStartTimeSec), {
        ...e,
        visibleStartTimeSec: c,
        visibleEndTimeSec: r
      };
    }
    case "pan_time_selection_pct": {
      if (e.visibleStartTimeSec === void 0 || e.visibleEndTimeSec === void 0 || e.startTimeSec === void 0 || e.endTimeSec === void 0)
        return e;
      const S = i.pct;
      let c = e.visibleStartTimeSec + S * (e.visibleEndTimeSec - e.visibleStartTimeSec), r = e.visibleEndTimeSec + S * (e.visibleEndTimeSec - e.visibleStartTimeSec);
      return c < e.startTimeSec && (c = e.startTimeSec, r = c + e.visibleEndTimeSec - e.visibleStartTimeSec), r > e.endTimeSec && (r = e.endTimeSec, c = r - e.visibleEndTimeSec + e.visibleStartTimeSec), {
        ...e,
        visibleStartTimeSec: c,
        visibleEndTimeSec: r
      };
    }
    case "zoom_time_selection": {
      if (e.visibleStartTimeSec === void 0 || e.visibleEndTimeSec === void 0 || e.startTimeSec === void 0 || e.endTimeSec === void 0)
        return e;
      const S = i.anchorTimeSec || (e.visibleStartTimeSec + e.visibleEndTimeSec) / 2, c = i.factor;
      let r = S + 1 / c * (e.visibleStartTimeSec - S), t = S + 1 / c * (e.visibleEndTimeSec - S);
      return r < e.startTimeSec && (r = e.startTimeSec), t > e.endTimeSec && (t = e.endTimeSec), {
        ...e,
        visibleStartTimeSec: r,
        visibleEndTimeSec: t
      };
    }
    default:
      throw Error("Unexpected action type in timeSelectionReducer");
  }
}, a = ({ children: e }) => {
  const [i, S] = u(p, {});
  return /* @__PURE__ */ v(l.Provider, { value: { state: i, dispatch: S }, children: e });
}, h = () => {
  const e = _(l);
  if (!e)
    throw Error("useTimeSelection() must be used within a TimeSelectionContextProvider");
  const i = e.dispatch, S = n((m, T) => {
    i({
      type: "report_total_time_range",
      startTimeSec: m,
      endTimeSec: T
    });
  }, [i]), c = n((m, T) => {
    i({
      type: "set_visible_time_range",
      visibleStartTimeSec: m,
      visibleEndTimeSec: T
    });
  }, [i]), r = n((m) => {
    i({
      type: "set_current_time",
      currentTimeSec: m
    });
  }, [i]), t = n((m) => {
    i({
      type: "set_current_time_fraction",
      fraction: m
    });
  }, [i]), o = n((m) => {
    i({
      type: "pan_time_selection",
      deltaSec: m
    });
  }, [i]), d = n((m, T) => {
    i({
      type: "zoom_time_selection",
      anchorTimeSec: T,
      factor: m
    });
  }, [i]), s = n((m) => {
    i({
      type: "pan_time_selection_pct",
      pct: m
    });
  }, [i]);
  return {
    startTimeSec: e.state.startTimeSec,
    endTimeSec: e.state.endTimeSec,
    visibleStartTimeSec: e.state.visibleStartTimeSec,
    visibleEndTimeSec: e.state.visibleEndTimeSec,
    currentTimeSec: e.state.currentTimeSec,
    reportTotalTimeRange: S,
    setVisibleTimeRange: c,
    setCurrentTime: r,
    setCurrentTimeFraction: t,
    zoomTimeSelection: d,
    panTimeSelection: o,
    panTimeSelectionPct: s
  };
};
export {
  a as SetupTimeSelection,
  l as TimeSelectionContext,
  p as timeSelectionReducer,
  h as useTimeSelection
};
