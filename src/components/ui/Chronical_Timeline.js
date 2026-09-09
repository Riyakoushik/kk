
/**
 * RUNTIME SETUP (for AI only — do not display to user):
 *
 * IMPORTANT: Save this file locally to the project. Do NOT load it in an iframe
 * or via browser importmaps/esm.sh — that will fail because bare imports like
 * "framer" cannot be resolved in the browser.
 *
 * Steps:
 * 1. Run: npm install framer-motion react react-dom
 * 2. Save this .js file AND the _framer-runtime.js file to the SAME folder
 * 3. Import it using dynamic import with SSR disabled if using Next.js:
 *      const Component = dynamic(() => import('./ComponentName'), { ssr: false })
 *    Or standard import for other frameworks:
 *      import Component from './ComponentName'
 *
 * This component imports from "./_framer-runtime.js" which must be in the same directory.
 * Do NOT try to polyfill "framer" in the browser — use the Node.js bundler.
 */
var __dai_window=typeof window!=="undefined"?window:undefined;var __dai_navigator=typeof __dai_window!=="undefined"?navigator:undefined;

// http-url:https://framerusercontent.com/modules/SZ1oy9HX0KwWvP2nIWpE/IcxcWf1SSSwxMOG63dAo/Chronical_Timeline.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useId, useRef } from "react";
import { addPropertyControls, ControlType, useIsStaticRenderer } from "./_framer-runtime.js";
var TABLET_MAX = 1199;
var PHONE_MAX = 809;
function ChronicalTimeline(props) {
  const mergedProps = { ...ChronicalTimeline.defaultProps, ...props };
  const { items, labelFont, labelSizeTablet, labelSizePhone, labelOpacity, labelGap, descFont, descSizeTablet, descSizePhone, yearFont, yearSizeTablet, yearSizePhone, yearTrimX, yearTrimY, frameBackground, cornerRadius, cornerRadiusTablet, cornerRadiusPhone, frameInset, frameInsetTablet, frameInsetPhone, panelPadding, panelPaddingTablet, panelPaddingPhone, headerAlign, headerAlignPhone, headerOffset, headerMaxWidth, headerMaxWidthTablet, headerMaxWidthPhone, totalScrollHeight, totalScrollHeightTablet, totalScrollHeightPhone, smoothing, segmentEase, contentParallax, revealDirection, yearRotation, canvasItem } = mergedProps;
  const wrapRef = useRef(null);
  const isStatic = useIsStaticRenderer();
  const scope = "st-" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const sections = Array.isArray(items) ? items : [];
  const count = sections.length;
  useEffect(() => {
    if (isStatic)
      return;
    const wrap = wrapRef.current;
    if (!wrap)
      return;
    const frame = wrap.querySelector(".frame");
    const panels = Array.from(wrap.querySelectorAll(".panel"));
    const n = panels.length;
    if (!frame || n === 0)
      return;
    const inners = panels.map((p) => p.querySelector(".panel-inner"));
    const years = panels.map((p) => p.querySelector(".year"));
    const reduce = typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rot = Math.abs(yearRotation);
    const parallax = reduce ? 0 : Math.abs(contentParallax);
    const vertical = revealDirection === "btt";
    const amount = reduce ? 0 : Math.min(100, Math.max(0, smoothing));
    const rate = 24 - amount / 100 * 21;
    const instant = amount <= 0;
    const ease = getEase(segmentEase);
    let stickyTop = 0;
    let travel = 1;
    function measure() {
      stickyTop = parseFloat(getComputedStyle(frame).top) || 0;
      travel = Math.max(1, wrap.offsetHeight - frame.offsetHeight);
    }
    const hidden = vertical ? "inset(100% 0 0 0)" : revealDirection === "ltr" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
    function clipOut(v) {
      const g = r2((1 - v) * 100);
      if (vertical)
        return `inset(0 0 ${g}% 0)`;
      if (revealDirection === "ltr")
        return `inset(0 0 0 ${g}%)`;
      return `inset(0 ${g}% 0 0)`;
    }
    function clipIn(t) {
      const g = r2((1 - t) * 100);
      if (vertical)
        return `inset(${g}% 0 0 0)`;
      if (revealDirection === "ltr")
        return `inset(0 ${g}% 0 0)`;
      return `inset(0 0 0 ${g}%)`;
    }
    function shift(px) {
      const v = r2(px);
      return vertical ? `translate3d(0, ${v}px, 0)` : `translate3d(${v}px, 0, 0)`;
    }
    const dir = revealDirection === "ltr" ? -1 : 1;
    let paintedIdx = -1;
    let painted = -1;
    function apply(raw) {
      if (Math.abs(raw - painted) < 4e-4)
        return;
      painted = raw;
      const scaled = Math.min(n - 1, Math.max(0, raw));
      const idx = Math.min(Math.max(n - 2, 0), Math.floor(scaled));
      const t = n > 1 ? ease(scaled - idx) : 0;
      if (idx !== paintedIdx) {
        for (let i = 0; i < n; i++) {
          panels[i].style.willChange = i === idx || i === idx + 1 ? "clip-path" : "auto";
        }
        paintedIdx = idx;
      }
      for (let i = 0; i < n; i++) {
        const panel = panels[i];
        const inner = inners[i];
        const year = years[i];
        if (i === idx) {
          panel.style.clipPath = clipOut(1 - t);
          if (year)
            year.style.transform = `rotate(${r2(-rot * t)}deg)`;
          if (inner && parallax)
            inner.style.transform = shift(-dir * parallax * t);
        } else if (i === idx + 1) {
          panel.style.clipPath = clipIn(t);
          if (year)
            year.style.transform = "rotate(0deg)";
          if (inner && parallax)
            inner.style.transform = shift(dir * parallax * (1 - t));
        } else {
          panel.style.clipPath = hidden;
          if (year)
            year.style.transform = i < idx ? `rotate(${-rot}deg)` : "rotate(0deg)";
          if (inner && parallax)
            inner.style.transform = shift(0);
        }
        panel.style.zIndex = String(i);
      }
    }
    let current = 0;
    let target = 0;
    let running = false;
    let raf = 0;
    let last = 0;
    function readTarget() {
      const top = wrap.getBoundingClientRect().top;
      const p = Math.min(1, Math.max(0, (stickyTop - top) / travel));
      target = p * Math.max(n - 1, 1);
    }
    function tick(now) {
      const dt = Math.min(0.064, (now - last) / 1e3 || 0.016);
      last = now;
      readTarget();
      if (instant) {
        current = target;
      } else {
        current += (target - current) * (1 - Math.exp(-rate * dt));
        if (Math.abs(target - current) < 3e-4)
          current = target;
      }
      apply(current);
      if (current !== target) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        raf = 0;
      }
    }
    function kick() {
      if (running)
        return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    }
    function onResize() {
      measure();
      painted = -1;
      kick();
    }
    measure();
    readTarget();
    current = target;
    apply(current);
    __dai_window.addEventListener("scroll", kick, { passive: true });
    __dai_window.addEventListener("resize", onResize);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(onResize) : null;
    ro?.observe(wrap);
    return () => {
      __dai_window.removeEventListener("scroll", kick);
      __dai_window.removeEventListener("resize", onResize);
      if (raf)
        cancelAnimationFrame(raf);
      ro?.disconnect();
    };
  }, [isStatic, count, revealDirection, yearRotation, smoothing, segmentEase, contentParallax]);
  const { fontSize: labelSize, ...labelStyle } = labelFont || {};
  const { fontSize: descSize, ...descStyle } = descFont || {};
  const { fontSize: yearSize, ...yearStyle } = yearFont || {};
  const hiddenClip = revealDirection === "btt" ? "inset(100% 0 0 0)" : revealDirection === "ltr" ? "inset(0 100% 0 0)" : "inset(0 0 0 100%)";
  const css = `
.${scope}{
    position: relative;
    width: 100%;
    min-width: 100%;
    box-sizing: border-box;
    align-self: stretch;
    flex: 1 1 auto;
}
.${scope} .frame{
    position: sticky;
    overflow: hidden;
    background: ${frameBackground};
    contain: paint;
}
.${scope} .panel{
    position: absolute;
    inset: 0;
    clip-path: ${hiddenClip};
}
.${scope} .panel-inner{
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    will-change: transform;
}
.${scope} .panel-header{
    align-self: ${headerAlign === "left" ? "flex-start" : "flex-end"};
    text-align: left;
    margin-top: ${num(headerOffset)}px;
}
.${scope} .eyebrow{
    display: block;
    text-transform: uppercase;
    opacity: ${labelOpacity};
    margin: 0 0 ${Number(labelGap) || 0}px 0;
}
.${scope} .desc{ margin: 0; }
.${scope} .year{
    display: block;
    margin: 0;
    white-space: nowrap;
    transform-origin: left bottom;
    will-change: transform;
    backface-visibility: hidden;
    margin-left: ${num(yearTrimX)}em;
    margin-bottom: ${num(yearTrimY)}em;
}
${block(scope, { scrollHeight: totalScrollHeight, inset: frameInset, radius: cornerRadius, padding: panelPadding, headerMax: headerMaxWidth, labelSize: unit(labelSize, 12), descSize: unit(descSize, 16), yearSize: unit(yearSize, 216) })}
@media (max-width: ${TABLET_MAX}px){
${block(scope, { scrollHeight: totalScrollHeightTablet, inset: frameInsetTablet, radius: cornerRadiusTablet, padding: panelPaddingTablet, headerMax: headerMaxWidthTablet, labelSize: unit(labelSizeTablet, 12), descSize: unit(descSizeTablet, 15), yearSize: unit(yearSizeTablet, 132) })}
}
@media (max-width: ${PHONE_MAX}px){
${block(scope, { scrollHeight: totalScrollHeightPhone, inset: frameInsetPhone, radius: cornerRadiusPhone, padding: panelPaddingPhone, headerMax: headerMaxWidthPhone, labelSize: unit(labelSizePhone, 11), descSize: unit(descSizePhone, 14), yearSize: unit(yearSizePhone, 76) })}
.${scope} .panel-header{
    align-self: ${headerAlignPhone === "right" ? "flex-end" : "flex-start"};
}
}
`;
  if (count === 0) {
    return /* @__PURE__ */ _jsx("div", { ref: wrapRef, style: emptyStyle, children: "Add timeline items in the properties panel." });
  }
  const renderPanel = (s, i, forced) => /* @__PURE__ */ _jsx("section", { className: "panel", style: { background: s.bg, color: s.fg, ...forced ? { clipPath: forced } : null }, children: /* @__PURE__ */ _jsxs("div", { className: "panel-inner", children: [/* @__PURE__ */ _jsxs("div", { className: "panel-header", children: [/* @__PURE__ */ _jsx("span", { className: "eyebrow", style: labelStyle, children: s.eyebrow }), /* @__PURE__ */ _jsx("p", { className: "desc", style: descStyle, children: s.desc })] }), /* @__PURE__ */ _jsx("h2", { className: "year", style: yearStyle, children: s.year })] }) }, i);
  if (isStatic) {
    const index = Math.min(Math.max(canvasItem, 0), count - 1);
    return /* @__PURE__ */ _jsxs("div", { ref: wrapRef, className: `timeline ${scope}`, children: [/* @__PURE__ */ _jsx("style", { children: css }), /* @__PURE__ */ _jsx("div", { className: "frame", children: renderPanel(sections[index], index, "inset(0 0 0 0)") })] });
  }
  return /* @__PURE__ */ _jsxs("div", { ref: wrapRef, className: `timeline ${scope}`, children: [/* @__PURE__ */ _jsx("style", { children: css }), /* @__PURE__ */ _jsx("div", { className: "frame", children: sections.map((s, i) => renderPanel(s, i)) })] });
}
function getEase(kind) {
  if (kind === "out")
    return (t) => 1 - Math.pow(1 - t, 3);
  if (kind === "expo")
    return (t) => t >= 1 ? 1 : 1 - Math.pow(2, -9 * t);
  if (kind === "inout")
    return (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  return (t) => t;
}
function block(scope, c) {
  const i = Number(c.inset) || 0;
  return `
.${scope}{ height: ${c.scrollHeight}; }
.${scope} .frame{
    top: ${i}px;
    margin: 0 ${i}px;
    height: calc(100vh - ${i * 2}px);
    height: calc(100svh - ${i * 2}px);
    border-radius: ${Number(c.radius) || 0}px;
}
.${scope} .panel-inner{ padding: ${pad(c.padding)}; }
.${scope} .panel-header{ max-width: ${Number(c.headerMax) || 420}px; }
.${scope} .eyebrow{ font-size: ${c.labelSize}; }
.${scope} .desc{ font-size: ${c.descSize}; }
.${scope} .year{ font-size: ${c.yearSize}; }`;
}
function unit(value, fallback) {
  if (value == null || value === "")
    return `${fallback}px`;
  return typeof value === "number" ? `${value}px` : String(value);
}
function pad(v) {
  if (typeof v === "number")
    return `${v}px`;
  if (v && typeof v === "object") {
    const t = num(v.paddingTop ?? v.top);
    const r = num(v.paddingRight ?? v.right);
    const b = num(v.paddingBottom ?? v.bottom);
    const l = num(v.paddingLeft ?? v.left);
    return `${t}px ${r}px ${b}px ${l}px`;
  }
  const s = String(v ?? "").trim();
  return s === "" ? "48px" : s;
}
function num(v) {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}
function r2(v) {
  return Math.round(v * 100) / 100;
}
var emptyStyle = { width: "100%", minHeight: 220, display: "flex", alignItems: "center", justifyContent: "center", border: "1px dashed rgba(0,0,0,0.25)", borderRadius: 12, color: "rgba(0,0,0,0.5)", fontFamily: "Inter, sans-serif", fontSize: 13 };
ChronicalTimeline.defaultProps = { items: [{ bg: "#151515", fg: "#f2f2f2", eyebrow: "01/ Origins of the web", desc: "A network of static, text-first pages connected by hyperlinks. No design system existed yet, just documents linked together.", year: "1991" }, { bg: "#ff4433", fg: "#151515", eyebrow: "02/ First graphical browser", desc: "The release of Mosaic, the first widely used graphical web browser, made the internet accessible to non-technical users. Websites became visual and interactive.", year: "1993" }, { bg: "#aeeaf6", fg: "#151515", eyebrow: "03/ Social media rise", desc: "The rise of social platforms redefined online interaction and content sharing. The internet evolved into a social space, connecting people worldwide.", year: "2004" }, { bg: "#0b0b0b", fg: "#beeaf6", eyebrow: "04/ Smartphones and mobile web", desc: "The launch of smartphones revolutionized how people access the internet, putting powerful browsing and apps in everyone's pocket.", year: "2007" }, { bg: "#7c5cff", fg: "#101014", eyebrow: "05/ AI-powered web", desc: "Generative interfaces and copilots began shaping how pages are built and browsed, turning static sites into responsive, conversational experiences.", year: "2023" }], labelFont: { fontFamily: "JetBrains Mono", fontWeight: 400, fontSize: 12, letterSpacing: "0.14em", lineHeight: "1.2em" }, labelSizeTablet: 12, labelSizePhone: 11, labelOpacity: 0.65, labelGap: 14, descFont: { fontFamily: "Inter", fontWeight: 500, fontSize: 16, lineHeight: "1.55em" }, descSizeTablet: 15, descSizePhone: 14, yearFont: { fontFamily: "Archivo Black", fontWeight: 900, fontSize: 216, lineHeight: "0.78em" }, yearSizeTablet: 132, yearSizePhone: 76, yearTrimX: -0.05, yearTrimY: -0.02, frameBackground: "#000000", cornerRadius: 28, cornerRadiusTablet: 22, cornerRadiusPhone: 16, frameInset: 24, frameInsetTablet: 16, frameInsetPhone: 10, panelPadding: "56px 56px 56px 56px", panelPaddingTablet: "40px 40px 40px 40px", panelPaddingPhone: "28px 24px 28px 24px", headerAlign: "right", headerAlignPhone: "left", headerOffset: 12, headerMaxWidth: 420, headerMaxWidthTablet: 380, headerMaxWidthPhone: 300, totalScrollHeight: "500vh", totalScrollHeightTablet: "450vh", totalScrollHeightPhone: "400vh", smoothing: 45, segmentEase: "inout", contentParallax: 64, revealDirection: "rtl", yearRotation: 90, canvasItem: 0 };
addPropertyControls(ChronicalTimeline, {
  items: { type: ControlType.Array, title: "Items", minCount: 2, control: { type: ControlType.Object, controls: { eyebrow: { type: ControlType.String, title: "Label", defaultValue: "01/ Section label" }, desc: { type: ControlType.String, title: "Description", defaultValue: "Description text goes here.", displayTextArea: true }, year: { type: ControlType.String, title: "Big Text", defaultValue: "2024" }, bg: { type: ControlType.Color, title: "Background", defaultValue: "#151515" }, fg: { type: ControlType.Color, title: "Text Color", defaultValue: "#f2f2f2" } } } },
  /* Motion ------------------------------------------------------ */
  smoothing: { type: ControlType.Number, title: "Smoothing", min: 0, max: 100, step: 1, description: "0 locks the reveal to the scrollbar. 40 to 60 gives the fluid, trailing feel." },
  segmentEase: { type: ControlType.Enum, title: "\u21B3 Easing", options: ["linear", "inout", "out", "expo"], optionTitles: ["Linear", "Ease in out", "Ease out", "Expo"] },
  contentParallax: { type: ControlType.Number, title: "\u21B3 Parallax", min: 0, max: 240, step: 4, unit: "px", description: "How far the text trails behind the wipe. 0 disables it." },
  revealDirection: { type: ControlType.Enum, title: "\u21B3 Reveal", options: ["rtl", "ltr", "btt"], optionTitles: ["Right to left", "Left to right", "Bottom to top"] },
  yearRotation: { type: ControlType.Number, title: "\u21B3 Text Turn", min: 0, max: 180, step: 5, unit: "\xB0" },
  /* Label ------------------------------------------------------- */
  labelFont: { type: ControlType.Font, title: "Label Font", controls: "extended", description: "Size here is the desktop size (1200 and up)." },
  labelSizeTablet: { type: ControlType.Number, title: "\u21B3 Tablet", min: 8, max: 48, step: 1, unit: "px", displayStepper: true },
  labelSizePhone: { type: ControlType.Number, title: "\u21B3 Phone", min: 8, max: 48, step: 1, unit: "px", displayStepper: true },
  labelOpacity: { type: ControlType.Number, title: "\u21B3 Opacity", min: 0, max: 1, step: 0.05 },
  labelGap: { type: ControlType.Number, title: "\u21B3 Gap", min: 0, max: 60, step: 1, unit: "px", displayStepper: true },
  /* Description ------------------------------------------------- */
  descFont: { type: ControlType.Font, title: "Desc Font", controls: "extended" },
  descSizeTablet: { type: ControlType.Number, title: "\u21B3 Tablet", min: 10, max: 64, step: 1, unit: "px", displayStepper: true },
  descSizePhone: { type: ControlType.Number, title: "\u21B3 Phone", min: 10, max: 64, step: 1, unit: "px", displayStepper: true },
  /* Big text ---------------------------------------------------- */
  yearFont: { type: ControlType.Font, title: "Big Text Font", controls: "extended" },
  yearSizeTablet: { type: ControlType.Number, title: "\u21B3 Tablet", min: 24, max: 400, step: 2, unit: "px", displayStepper: true },
  yearSizePhone: { type: ControlType.Number, title: "\u21B3 Phone", min: 24, max: 400, step: 2, unit: "px", displayStepper: true },
  yearTrimX: { type: ControlType.Number, title: "\u21B3 Trim X", min: -0.3, max: 0.3, step: 5e-3, description: "Optical side bearing. Negative pulls the big text flush with the padding edge." },
  yearTrimY: { type: ControlType.Number, title: "\u21B3 Trim Y", min: -0.3, max: 0.3, step: 5e-3 },
  /* Frame ------------------------------------------------------- */
  frameBackground: { type: ControlType.Color, title: "Frame BG" },
  cornerRadius: { type: ControlType.Number, title: "Radius", min: 0, max: 100, step: 1, unit: "px" },
  cornerRadiusTablet: { type: ControlType.Number, title: "\u21B3 Tablet", min: 0, max: 100, step: 1, unit: "px" },
  cornerRadiusPhone: { type: ControlType.Number, title: "\u21B3 Phone", min: 0, max: 100, step: 1, unit: "px" },
  frameInset: { type: ControlType.Number, title: "Inset", min: 0, max: 100, step: 1, unit: "px" },
  frameInsetTablet: { type: ControlType.Number, title: "\u21B3 Tablet", min: 0, max: 100, step: 1, unit: "px" },
  frameInsetPhone: { type: ControlType.Number, title: "\u21B3 Phone", min: 0, max: 100, step: 1, unit: "px" },
  /* Panel layout ------------------------------------------------ */
  panelPadding: { type: ControlType.Padding, title: "Padding" },
  panelPaddingTablet: { type: ControlType.Padding, title: "\u21B3 Tablet" },
  panelPaddingPhone: { type: ControlType.Padding, title: "\u21B3 Phone" },
  headerAlign: { type: ControlType.Enum, title: "Header", options: ["left", "right"], optionTitles: ["Left", "Right"], displaySegmentedControl: true },
  headerAlignPhone: { type: ControlType.Enum, title: "\u21B3 Phone", options: ["left", "right"], optionTitles: ["Left", "Right"], displaySegmentedControl: true },
  headerOffset: { type: ControlType.Number, title: "\u21B3 Top", min: 0, max: 120, step: 2, unit: "px", displayStepper: true, description: "Extra space above the label, on top of the padding." },
  headerMaxWidth: { type: ControlType.Number, title: "Header W", min: 100, max: 900, step: 10, unit: "px" },
  headerMaxWidthTablet: { type: ControlType.Number, title: "\u21B3 Tablet", min: 100, max: 900, step: 10, unit: "px" },
  headerMaxWidthPhone: { type: ControlType.Number, title: "\u21B3 Phone", min: 100, max: 900, step: 10, unit: "px" },
  /* Scroll length ----------------------------------------------- */
  totalScrollHeight: { type: ControlType.String, title: "Scroll Length", description: "Item count x 100vh for even pacing. Five items = 500vh." },
  totalScrollHeightTablet: { type: ControlType.String, title: "\u21B3 Tablet" },
  totalScrollHeightPhone: { type: ControlType.String, title: "\u21B3 Phone" },
  /* Canvas ------------------------------------------------------ */
  canvasItem: { type: ControlType.Number, title: "Canvas Item", min: 0, max: 20, step: 1, displayStepper: true, description: "Which item shows on the canvas and in exports." }
});
var __FramerMetadata__ = { "exports": { "default": { "type": "reactComponent", "name": "ChronicalTimeline", "slots": [], "annotations": { "framerContractVersion": "1" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  ChronicalTimeline as default
};


