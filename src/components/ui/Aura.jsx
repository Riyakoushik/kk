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

// http-url:https://framerusercontent.com/modules/sChlXpCpLaQiSnoEwuUR/bjxiRYhSB3sjw6dT8Rh0/Aura.js
import { jsx as _jsx } from "react/jsx-runtime";
import { addPropertyControls, ControlType, useIsStaticRenderer } from "./_framer-runtime.js";
import { motion, useScroll, useVelocity, useSpring, useTransform } from "framer-motion";
function AuroraStrip(props) {
  const { colors = ["#C2A0E8", "#7B8FE6", "#4C9FD6", "#39A8BE", "#41B295"], height = 120, baseOpacity = 0.35, maxOpacity = 0.7, blur = 40, speed = 9, travel = 160, velocitySensitivity = 1500, blendMode = "normal", style, ...rest } = props;
  const isStatic = useIsStaticRenderer();
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 350, damping: 90, restDelta: 0.5 });
  const liveOpacity = useTransform(smoothVelocity, (latest) => {
    const intensity = Math.min(Math.abs(latest) / Math.max(1, velocitySensitivity), 1);
    return baseOpacity + intensity * Math.max(0, maxOpacity - baseOpacity);
  });
  const maskStyles = { maskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0) 100%)", WebkitMaskImage: "linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.9) 50%, rgba(0,0,0,0) 100%)" };
  return /* @__PURE__ */ _jsx("div", { title: "AI+ Aurora Strip", style: { position: "relative", width: "100%", height, overflow: "hidden", pointerEvents: "none", ...maskStyles, ...style }, ...rest, children: /* @__PURE__ */ _jsx(motion.div, { style: { position: "absolute", inset: `-${blur * 1.5}px`, overflow: "hidden", filter: `blur(${blur}px)`, opacity: isStatic ? baseOpacity : liveOpacity }, children: colors.map((color, idx) => {
    const size = 200 + idx * 55;
    const duration = Math.max(2, speed * (1 + idx * 0.28));
    const reversed = idx % 2 === 1;
    const homeLeft = (idx + 0.5) / colors.length * 100;
    const xKeys = [-travel * 0.6, travel * 0.5, travel * 0.9, -travel * 0.3, -travel * 0.6];
    const yKeys = [-30, 22, -12, 28, -30];
    const scaleKeys = [1, 1.22, 0.88, 1.12, 1];
    if (reversed) {
      xKeys.reverse();
      yKeys.reverse();
    }
    return /* @__PURE__ */ _jsx(motion.div, { initial: false, animate: isStatic ? { x: xKeys[1], y: yKeys[1], scale: scaleKeys[1] } : { x: xKeys, y: yKeys, scale: scaleKeys }, transition: isStatic ? { duration: 0 } : { duration, repeat: Infinity, repeatType: "loop", ease: "easeInOut", delay: idx * 0.45 }, style: { position: "absolute", top: "50%", left: `${homeLeft}%`, marginTop: -size / 2, marginLeft: -size / 2, width: size, height: size, borderRadius: "50%", background: `radial-gradient(circle, ${color} 0%, rgba(255,255,255,0) 70%)`, mixBlendMode: blendMode, willChange: "transform", opacity: 0.65 } }, idx);
  }) }) });
}
addPropertyControls(AuroraStrip, { colors: { type: ControlType.Array, title: "Palette Colors", description: "One drifting blob per color. Add or remove colors to change how busy the strip looks. Later colors are larger and slower.", control: { type: ControlType.Color }, defaultValue: ["#C2A0E8", "#7B8FE6", "#4C9FD6", "#39A8BE", "#41B295"], maxCount: 8 }, blendMode: { type: ControlType.Enum, title: "Blend Mode", description: "How blobs mix with each other and the page behind. Normal for light backgrounds, Screen for dark ones.", options: ["normal", "screen", "multiply", "overlay", "color-dodge"], optionTitles: ["Normal (Light Themes)", "Screen (Dark Themes)", "Multiply", "Overlay", "Color Dodge"], defaultValue: "normal" }, height: { type: ControlType.Number, title: "Height (px)", description: "Fallback height of the strip. Resizing the layer on canvas overrides this.", min: 40, max: 300, step: 1, defaultValue: 120 }, baseOpacity: { type: ControlType.Number, title: "Rest Opacity", description: "How visible the glow is when the page is not scrolling. This is the floor, the strip never fades below it.", min: 0, max: 1, step: 0.05, defaultValue: 0.35 }, maxOpacity: { type: ControlType.Number, title: "Max Opacity", description: "Peak brightness reached at full scroll speed. Set it equal to Rest Opacity to switch the scroll reaction off.", min: 0, max: 1, step: 0.05, defaultValue: 0.7 }, blur: { type: ControlType.Number, title: "Blur (px)", description: "Softness of the blobs. High values look like ambient light but hide motion, low values show distinct colored orbs.", min: 0, max: 120, step: 1, defaultValue: 40 }, speed: { type: ControlType.Number, title: "Drift Cycle (s)", description: "Seconds for one blob to complete its loop. Lower is faster. Each blob is progressively slower than the one before it.", min: 3, max: 30, step: 0.5, defaultValue: 9 }, travel: { type: ControlType.Number, title: "Drift Distance (px)", description: "How far each blob wanders from its spot. Low values feel like a slow breathe, high values sweep across the strip.", min: 20, max: 400, step: 10, defaultValue: 160 }, velocitySensitivity: { type: ControlType.Number, title: "Sensitivity", description: "Scroll speed needed to hit Max Opacity. Lower means the strip lights up from a gentle scroll, higher needs a fast flick.", min: 300, max: 4e3, step: 100, defaultValue: 1500 } });
var __FramerMetadata__ = { "exports": { "default": { "type": "reactComponent", "name": "AuroraStrip", "slots": [], "annotations": { "framerIntrinsicWidth": "1200", "framerContractVersion": "1", "framerIntrinsicHeight": "120", "framerSupportedLayoutWidth": "any-prefer-fixed", "framerSupportedLayoutHeight": "fixed" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  AuroraStrip as default
};
