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

// http-url:https://framerusercontent.com/modules/HC2sodFFn0OtjQWE1RN6/m6RuhIluMBA6ZXKW6jOo/MorphedMenu.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { addPropertyControls, ControlType, useIsStaticRenderer } from "./_framer-runtime.js";
function AnimatedMenu(props) {
  const {
    navLinks = defaultProps.navLinks,
    footerLinksData = defaultProps.footerLinksData,
    menuBackgroundColor = "#000000",
    menuTextColor = "#FFFFFF",
    hoverLineColor = "#FFFFFF",
    btnClosedBg = "#000000",
    btnClosedColor = "#FFFFFF",
    btnOpenBg = "#FFFFFF",
    btnOpenColor = "#000000",
    navFontSizeDesktop = 46,
    navFontSizeMobile = 36,
    footerFontSizeDesktop = 20,
    footerFontSizeMobile = 18,
    btnFontSizeDesktop = 18,
    btnFontSizeMobile = 16,
    menuWidthDesktop = "440px",
    menuHeightDesktop = "460px",
    menuWidthMobile = "90vw",
    menuHeightMobile = "60vh",
    mobileBreakpoint = 768,
    springStiffness = 60,
    springDamping = 14,
    springMass = 1,
    linkStiffness = 80,
    linkDamping = 15,
    linkDelayOffset = 0.03,
    menuFont = defaultProps.menuFont
  } = props;
  const isStatic = useIsStaticRenderer();
  const [click, setClick] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hover, setHoveredIndex] = useState(null);
  const [hover2, setHoveredIndex2] = useState(null);
  const menuId = "as-animated-menu-box";
  const ref = useRef(null);
  const [windowWidth, setWindowWidth] = useState(() => typeof __dai_window !== "undefined" ? __dai_window.innerWidth : 1e3);
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setClick(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);
  useEffect(() => {
    let timeoutId;
    if (click) {
      timeoutId = window.setTimeout(() => setMenuOpen(true), 500);
    } else {
      setMenuOpen(false);
    }
    return () => {
      if (timeoutId !== void 0) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [click]);
  const isMobile = windowWidth < mobileBreakpoint;
  const buttonWidth = isMobile ? "90px" : "110px";
  const buttonHeight = isMobile ? "40px" : "46px";
  const menuFontStyle = { fontFamily: menuFont?.fontFamily ? `"${menuFont.fontFamily}", "Roboto", "Manrope", sans-serif` : '"Roboto", "Manrope", sans-serif', fontWeight: menuFont?.fontWeight, fontStyle: menuFont?.fontStyle, letterSpacing: menuFont?.letterSpacing };
  const perspectiveAnimation = { closed: { opacity: 0, y: 20 }, open: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.05, type: "spring", stiffness: 100, damping: 15 } }) };
  const footerAnimation = { closed: { opacity: 0, y: 20 }, open: (i) => ({ opacity: 1, y: 0, transition: { delay: 0.2 + i * 0.05, type: "spring", stiffness: 100, damping: 15 } }) };
  const menuAnimation = { open: { width: isMobile ? menuWidthMobile : menuWidthDesktop, height: isMobile ? menuHeightMobile : menuHeightDesktop, top: "0px", right: "0px", transition: { type: "spring", stiffness: springStiffness, damping: springDamping, mass: springMass } }, closed: { width: buttonWidth, height: buttonHeight, top: "0px", right: "0px", transition: { type: "spring", stiffness: springStiffness, damping: springDamping, mass: springMass } } };
  if (isStatic) {
    return /* @__PURE__ */ _jsx("div", { style: { position: "relative", display: "inline-block", width: buttonWidth, height: buttonHeight }, children: /* @__PURE__ */ _jsx("button", { style: { width: buttonWidth, height: buttonHeight, borderRadius: "25px", border: "1px solid rgba(255, 255, 255, 0.2)", backgroundColor: btnClosedBg, color: btnClosedColor, fontSize: `${btnFontSizeDesktop}px`, ...menuFontStyle, fontWeight: menuFontStyle.fontWeight ?? 500, cursor: "pointer" }, children: "MENU" }) });
  }
  return /* @__PURE__ */ _jsxs("div", { ref, style: { position: "relative", display: "inline-block", width: buttonWidth, height: buttonHeight }, children: [/* @__PURE__ */ _jsxs(motion.div, { id: menuId, role: "menu", "aria-label": "Site navigation", style: { position: "absolute", top: "0px", right: "0px", display: "flex", flexDirection: "column", justifyContent: "flex-start", borderRadius: "24px", backgroundColor: menuBackgroundColor, border: "1px solid rgba(255, 255, 255, 0.15)", ...menuFontStyle, overflow: "hidden", zIndex: 1 }, variants: menuAnimation, initial: "closed", animate: click ? "open" : "closed", children: [/* @__PURE__ */ _jsx("div", { style: { display: "flex", flexDirection: "column", marginLeft: isMobile ? "24px" : "32px", marginTop: "64px" }, children: navLinks.map((link, i) => {
    const isHovered = hover === i;
    return /* @__PURE__ */ _jsx("div", { style: { marginBottom: "8px", perspective: "70px", perspectiveOrigin: "bottom" }, children: /* @__PURE__ */ _jsxs(motion.div, { style: { display: "flex", alignItems: "center", gap: "8px" }, variants: perspectiveAnimation, custom: i, initial: "closed", animate: click ? "open" : "closed", onMouseEnter: () => setHoveredIndex(i), onMouseLeave: () => setHoveredIndex(null), children: [/* @__PURE__ */ _jsx(motion.svg, { animate: isHovered ? { width: 48 } : { width: 0 }, width: "0", height: "31", viewBox: "0 0 105 62", fill: "none", xmlns: "http://www.w3.org/2000/svg", transition: { type: "spring", stiffness: 200, damping: 20 }, "aria-hidden": "true", children: /* @__PURE__ */ _jsx("path", { d: "M0 31H103M103 31L73.5 1.5M103 31L73.5 60.5", stroke: hoverLineColor, strokeWidth: "2", vectorEffect: "non-scaling-stroke" }) }), /* @__PURE__ */ _jsx(motion.a, { href: link.url, role: "menuitem", style: { color: menuTextColor, textDecoration: "none", fontSize: isMobile ? `${navFontSizeMobile}px` : `${navFontSizeDesktop}px` }, transition: { type: "spring", stiffness: 200, damping: 20 }, children: link.title })] }) }, i);
  }) }), /* @__PURE__ */ _jsx(motion.div, { "aria-label": "Social links", style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", marginLeft: isMobile ? "24px" : "32px", marginTop: "24px", marginBottom: "24px" }, children: footerLinksData.map((link, i) => {
    const { title, url } = link;
    const isHovered2 = hover2 === i;
    return /* @__PURE__ */ _jsxs(motion.div, { style: { position: "relative", width: "fit-content", marginBottom: "8px" }, variants: footerAnimation, custom: i, initial: "closed", animate: click ? "open" : "closed", onMouseEnter: () => setHoveredIndex2(i), onMouseLeave: () => setHoveredIndex2(null), children: [/* @__PURE__ */ _jsx(motion.a, { href: url, role: "menuitem", style: { color: menuTextColor, textDecoration: "none", fontSize: isMobile ? `${footerFontSizeMobile}px` : `${footerFontSizeDesktop}px` }, children: title }), /* @__PURE__ */ _jsx(motion.div, { "aria-hidden": "true", style: { position: "absolute", left: 0, bottom: 0, height: "2px", backgroundColor: hoverLineColor }, animate: { width: isHovered2 ? "100%" : "0%" }, initial: { width: "0%" }, transition: { type: "spring", stiffness: 200, damping: 25 } })] }, `f_${i}`);
  }) })] }), /* @__PURE__ */ _jsx(Menubutton, { click, setClick, isMobile, btnClosedBg, btnClosedColor, btnOpenBg, btnOpenColor, btnFontSizeDesktop, btnFontSizeMobile, menuId, menuOpen })] });
}
function Menubutton({ click, setClick, isMobile, btnClosedBg, btnClosedColor, btnOpenBg, btnOpenColor, btnFontSizeDesktop, btnFontSizeMobile, menuId, menuOpen }) {
  const [hovered, setHovered] = useState(false);
  const fontSize = isMobile ? `${btnFontSizeMobile}px` : `${btnFontSizeDesktop}px`;
  return /* @__PURE__ */ _jsx("button", { onClick: () => setClick(!click), onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), "aria-expanded": menuOpen, "aria-haspopup": "menu", "aria-controls": menuId, "aria-label": click ? "Close menu" : "Open menu", style: { position: "absolute", top: "0px", right: "0px", cursor: "pointer", fontFamily: "inherit", zIndex: 2, width: isMobile ? "90px" : "110px", height: isMobile ? "40px" : "46px", borderRadius: "25px", overflow: "hidden", border: click ? "none" : "1px solid rgba(255, 255, 255, 0.2)", padding: 0, backgroundColor: "transparent" }, children: /* @__PURE__ */ _jsxs(motion.div, { style: { position: "relative", width: "100%", height: "100%" }, animate: { y: click ? "-100%" : "0%" }, transition: { type: "spring", stiffness: 200, damping: 22 }, children: [/* @__PURE__ */ _jsxs("div", { style: { position: "relative", height: "100%", width: "100%", overflow: "hidden" }, children: [/* @__PURE__ */ _jsx(motion.div, { style: { height: "100%", width: "100%" }, animate: { y: hovered ? "-100%" : "0%" }, initial: false, transition: { type: "spring", stiffness: 200, damping: 22 }, children: /* @__PURE__ */ _jsx(ButtonLabel, { bg: btnClosedBg, clr: btnClosedColor, fontSize, children: "MENU" }) }), /* @__PURE__ */ _jsx(motion.div, { style: { position: "absolute", inset: 0 }, animate: { y: hovered ? "0%" : "100%" }, transition: { type: "spring", stiffness: 200, damping: 22 }, initial: false, children: /* @__PURE__ */ _jsx(ButtonLabel, { bg: btnClosedBg, clr: btnClosedColor, fontSize, children: "MENU" }) })] }), /* @__PURE__ */ _jsxs("div", { style: { position: "relative", height: "100%", width: "100%", overflow: "hidden" }, children: [/* @__PURE__ */ _jsx(motion.div, { style: { height: "100%", width: "100%" }, animate: { y: hovered ? "-100%" : "0%" }, transition: { type: "spring", stiffness: 200, damping: 22 }, children: /* @__PURE__ */ _jsx(ButtonLabel, { bg: btnOpenBg, clr: btnOpenColor, fontSize, children: "CLOSE" }) }), /* @__PURE__ */ _jsx(motion.div, { style: { position: "absolute", inset: 0 }, animate: { y: hovered ? "0%" : "100%" }, transition: { type: "spring", stiffness: 200, damping: 22 }, initial: false, children: /* @__PURE__ */ _jsx(ButtonLabel, { bg: btnOpenBg, clr: btnOpenColor, fontSize, children: "CLOSE" }) })] })] }) });
}
function ButtonLabel({ children, bg, clr, fontSize }) {
  return /* @__PURE__ */ _jsx("div", { style: { height: "100%", width: "100%", cursor: "pointer", fontSize, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: bg, color: clr, fontFamily: '"Roboto", sans-serif', letterSpacing: "0.05em", fontWeight: 300 }, children });
}
var defaultProps = { menuBackgroundColor: "#000000", menuTextColor: "#FFFFFF", hoverLineColor: "#FFFFFF", btnClosedBg: "#000000", btnClosedColor: "#FFFFFF", btnOpenBg: "#FFFFFF", btnOpenColor: "#000000", navFontSizeDesktop: 46, navFontSizeMobile: 36, footerFontSizeDesktop: 20, footerFontSizeMobile: 18, btnFontSizeDesktop: 18, btnFontSizeMobile: 16, menuWidthDesktop: "440px", menuHeightDesktop: "460px", menuWidthMobile: "90vw", menuHeightMobile: "60vh", mobileBreakpoint: 768, springStiffness: 60, springDamping: 14, springMass: 1, linkStiffness: 80, linkDamping: 15, linkDelayOffset: 0.03, menuFont: { fontFamily: "Inter", fontWeight: 500 }, navLinks: [{ title: "About", url: "/" }, { title: "Skills", url: "/" }, { title: "Experience", url: "/" }, { title: "Projects", url: "/" }, { title: "Contact", url: "/" }], footerLinksData: [{ title: "Facebook", url: "/" }, { title: "LinkedIn", url: "/" }, { title: "Instagram", url: "/" }, { title: "Twitter", url: "/" }] };
AnimatedMenu.defaultProps = defaultProps;
addPropertyControls(AnimatedMenu, { navLinks: { type: ControlType.Array, title: "Main Links", control: { type: ControlType.Object, controls: { title: { type: ControlType.String, title: "Title" }, url: { type: ControlType.String, title: "URL" } } } }, footerLinksData: { type: ControlType.Array, title: "Footer Links", control: { type: ControlType.Object, controls: { title: { type: ControlType.String, title: "Title" }, url: { type: ControlType.String, title: "URL" } } } }, menuBackgroundColor: { type: ControlType.Color, title: "Menu BG", defaultValue: defaultProps.menuBackgroundColor }, menuTextColor: { type: ControlType.Color, title: "Menu Text", defaultValue: defaultProps.menuTextColor }, hoverLineColor: { type: ControlType.Color, title: "Hover Accents", defaultValue: defaultProps.hoverLineColor }, btnClosedBg: { type: ControlType.Color, title: "Btn Closed BG", defaultValue: defaultProps.btnClosedBg }, btnClosedColor: { type: ControlType.Color, title: "Btn Closed Text", defaultValue: defaultProps.btnClosedColor }, btnOpenBg: { type: ControlType.Color, title: "Btn Open BG", defaultValue: defaultProps.btnOpenBg }, btnOpenColor: { type: ControlType.Color, title: "Btn Open Text", defaultValue: defaultProps.btnOpenColor }, menuFont: { type: ControlType.Font, title: "Menu Font", controls: "extended" }, navFontSizeDesktop: { type: ControlType.Number, title: "Nav Size (D)", min: 10, max: 120, defaultValue: defaultProps.navFontSizeDesktop, displayStepper: true }, navFontSizeMobile: { type: ControlType.Number, title: "Nav Size (M)", min: 10, max: 100, defaultValue: defaultProps.navFontSizeMobile, displayStepper: true }, footerFontSizeDesktop: { type: ControlType.Number, title: "Footer Size (D)", min: 10, max: 60, defaultValue: defaultProps.footerFontSizeDesktop, displayStepper: true }, footerFontSizeMobile: { type: ControlType.Number, title: "Footer Size (M)", min: 10, max: 60, defaultValue: defaultProps.footerFontSizeMobile, displayStepper: true }, btnFontSizeDesktop: { type: ControlType.Number, title: "Button Size (D)", min: 10, max: 40, defaultValue: defaultProps.btnFontSizeDesktop, displayStepper: true }, btnFontSizeMobile: { type: ControlType.Number, title: "Button Size (M)", min: 10, max: 40, defaultValue: defaultProps.btnFontSizeMobile, displayStepper: true }, menuWidthDesktop: { type: ControlType.String, title: "Width (D)", defaultValue: defaultProps.menuWidthDesktop, description: "Use px, vw, or %" }, menuHeightDesktop: { type: ControlType.String, title: "Height (D)", defaultValue: defaultProps.menuHeightDesktop }, menuWidthMobile: { type: ControlType.String, title: "Width (M)", defaultValue: defaultProps.menuWidthMobile }, menuHeightMobile: { type: ControlType.String, title: "Height (M)", defaultValue: defaultProps.menuHeightMobile }, mobileBreakpoint: { type: ControlType.Number, title: "Mobile Breakpoint", min: 320, max: 1200, defaultValue: defaultProps.mobileBreakpoint, displayStepper: true }, springStiffness: { type: ControlType.Number, title: "Panel Stiffness", min: 10, max: 300, defaultValue: defaultProps.springStiffness, description: "Bounciness of the main menu panel opening.", displayStepper: true }, springDamping: { type: ControlType.Number, title: "Panel Damping", min: 1, max: 50, defaultValue: defaultProps.springDamping, description: "Friction of the main menu panel.", displayStepper: true }, springMass: { type: ControlType.Number, title: "Panel Mass", min: 0.1, max: 5, step: 0.1, defaultValue: defaultProps.springMass, description: "Weight feel of the menu panel spring.", displayStepper: true }, linkStiffness: { type: ControlType.Number, title: "Link Stiffness", min: 10, max: 300, defaultValue: defaultProps.linkStiffness, description: "Bounciness of the text flying in.", displayStepper: true }, linkDamping: { type: ControlType.Number, title: "Link Damping", min: 1, max: 50, defaultValue: defaultProps.linkDamping, displayStepper: true }, linkDelayOffset: { type: ControlType.Number, title: "Stagger Delay", min: 0.01, max: 0.5, step: 0.01, defaultValue: defaultProps.linkDelayOffset, description: "Time between each link animating in.", displayStepper: true } });
AnimatedMenu.displayName = "Morphed Menu";
var __FramerMetadata__ = { "exports": { "default": { "type": "reactComponent", "name": "AnimatedMenu", "slots": [], "annotations": { "framerContractVersion": "1" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  AnimatedMenu as default
};


