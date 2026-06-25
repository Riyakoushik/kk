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

// http-url:https://framerusercontent.com/modules/EFdb7zb8W98qM4glxcHD/UlnBkXKCDguowXvFrwOZ/InlineMediaText.js
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo, useState, useEffect } from "react";
import { addPropertyControls, ControlType, addFonts, useIsStaticRenderer } from "./_framer-runtime.js";
import React from "react";
var defaultMedia = [{ key: "media1", type: "image", srcs: [{ src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg", alt: "Gradient 1 - Blue" }, { src: "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg", alt: "Gradient 2 - Purple" }, { src: "https://framerusercontent.com/images/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg", alt: "Gradient 3 - Orange" }], duration: 600, transitionDuration: 50, link: "", linkTarget: "_self" }, { key: "media2", type: "image", srcs: [{ src: "https://framerusercontent.com/images/2uTNEj5aTl2K3NJaEFWMbnrA.jpg", alt: "Gradient 4 - Yellow" }, { src: "https://framerusercontent.com/images/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg", alt: "Gradient 5 - Green" }, { src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg", alt: "Gradient 1 - Blue" }], duration: 1e3, transitionDuration: 50, link: "", linkTarget: "_self" }, { key: "media3", type: "image", srcs: [{ src: "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg", alt: "Gradient 2 - Purple" }, { src: "https://framerusercontent.com/images/BYnxEV1zjYb9bhWh1IwBZ1ZoS60.jpg", alt: "Gradient 3 - Orange" }, { src: "https://framerusercontent.com/images/2uTNEj5aTl2K3NJaEFWMbnrA.jpg", alt: "Gradient 4 - Yellow" }], duration: 1200, transitionDuration: 50, link: "", linkTarget: "_self" }, { key: "media4", type: "image", srcs: [{ src: "https://framerusercontent.com/images/f9RiWoNpmlCMqVRIHz8l8wYfeI.jpg", alt: "Gradient 5 - Green" }, { src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg", alt: "Gradient 1 - Blue" }, { src: "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg", alt: "Gradient 2 - Purple" }], duration: 1500, transitionDuration: 50, link: "", linkTarget: "_self" }];
function getMediaWithDefaults(media) {
  const mediaToUse = media && media.length > 0 ? media : defaultMedia;
  return mediaToUse.map((item, index) => {
    if (!item.srcs || item.srcs.length === 0) {
      return { ...item, srcs: [{ src: index % 2 === 0 ? "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg" : "https://framerusercontent.com/images/aNsAT3jCvt4zglbWCUoFe33Q.jpg", alt: `Default image ${index + 1}` }] };
    }
    return item;
  });
}
function InlineMediaText(props) {
  const isStatic = useIsStaticRenderer();
  const { text = "By merging design and technology, we create systems that are flexible, scalable, and easy to use. The result is a seamless experience that feels natural, engaging, and built to last.", media: mediaProp, fontSize = 44, fontSizeTablet = 24, fontSizeMobile = 18, mediaSize = 1.5, mediaSizeTablet = 1.1, mediaSizeMobile = 1.5, borderRadius = 7, spacing = 0.1, spacingTablet = 0.12, spacingMobile = 0.1, textColor = "#FFFFFF", font, autoMediaCount = 4, globalDuration = 3e3, globalTransition = 500, mediaPositions = [10, 25, 55, 88], hoverScale = 2.5, hoverAspectRatio = 1.85, hoverTransition = 400, enableHoverExpansion = true, tapToExpand = true } = props;
  const media = React.useMemo(() => getMediaWithDefaults(mediaProp), [mediaProp]);
  const [breakpoint, setBreakpoint] = useState("desktop");
  const [hoveredSlot, setHoveredSlot] = useState(null);
  const [tappedSlot, setTappedSlot] = useState(null);
  const [isTouch, setIsTouch] = useState(false);
  useEffect(() => {
    if (typeof __dai_window === "undefined")
      return;
    setIsTouch("ontouchstart" in __dai_window || __dai_navigator.maxTouchPoints > 0);
  }, []);
  useEffect(() => {
    if (typeof __dai_window === "undefined")
      return;
    const checkBreakpoint = () => {
      const width = __dai_window.innerWidth;
      if (width < 768) {
        setBreakpoint("mobile");
      } else if (width < 1024) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };
    checkBreakpoint();
    __dai_window.addEventListener("resize", checkBreakpoint);
    return () => __dai_window.removeEventListener("resize", checkBreakpoint);
  }, []);
  const currentFontSize = useMemo(() => {
    if (breakpoint === "mobile")
      return fontSizeMobile;
    if (breakpoint === "tablet")
      return fontSizeTablet;
    return fontSize;
  }, [breakpoint, fontSize, fontSizeTablet, fontSizeMobile]);
  const currentMediaSize = useMemo(() => {
    if (breakpoint === "mobile")
      return mediaSizeMobile;
    if (breakpoint === "tablet")
      return mediaSizeTablet;
    return mediaSize;
  }, [breakpoint, mediaSize, mediaSizeTablet, mediaSizeMobile]);
  const currentSpacing = useMemo(() => {
    if (breakpoint === "mobile")
      return spacingMobile;
    if (breakpoint === "tablet")
      return spacingTablet;
    return spacing;
  }, [breakpoint, spacing, spacingTablet, spacingMobile]);
  const currentHoverScale = useMemo(() => {
    if (breakpoint === "mobile")
      return Math.min(hoverScale * 0.6, 2);
    if (breakpoint === "tablet")
      return Math.min(hoverScale * 0.8, 2.5);
    return hoverScale;
  }, [breakpoint, hoverScale]);
  const [currentIndices, setCurrentIndices] = React.useState(() => media.map(() => 0));
  React.useEffect(() => {
    if (isStatic)
      return;
    const intervals = [];
    media.forEach((mediaItem, slotIndex) => {
      if (mediaItem.srcs.length <= 1)
        return;
      const duration = mediaItem.duration || globalDuration;
      const interval = setInterval(() => {
        setCurrentIndices((prev) => {
          const next = [...prev];
          next[slotIndex] = (next[slotIndex] + 1) % mediaItem.srcs.length;
          return next;
        });
      }, duration);
      intervals.push(interval);
    });
    return () => intervals.forEach(clearInterval);
  }, [media, globalDuration, isStatic]);
  const fontStyles = useMemo(() => {
    const baseStyles = { fontFamily: font?.fontFamily || "'Unbounded', sans-serif", fontWeight: font?.fontWeight || 500, lineHeight: font?.lineHeight || "1.3em", letterSpacing: font?.letterSpacing || "-0.02em", fontStyle: font?.fontStyle || "normal", textAlign: font?.textAlign || "left", fontSize: `${currentFontSize}px` };
    return baseStyles;
  }, [font, currentFontSize]);
  const handleSlotClick = (index, link) => {
    if (isTouch && tapToExpand && enableHoverExpansion) {
      if (tappedSlot === index) {
        if (link) {
          __dai_window.open(link, media[index]?.linkTarget || "_self");
        }
        setTappedSlot(null);
      } else {
        setTappedSlot(index);
      }
    } else if (link) {
      __dai_window.open(link, media[index]?.linkTarget || "_self");
    }
  };
  const getMediaElement = (mediaItem, index) => {
    const spacingValue = `${currentSpacing}em`;
    const sizeValue = `${currentMediaSize}em`;
    const currentIndex = isStatic ? 0 : currentIndices[index] || 0;
    const currentSrc = mediaItem.srcs[currentIndex] || mediaItem.srcs[0];
    const transitionDuration = mediaItem.transitionDuration || globalTransition;
    const isHovered = hoveredSlot === index;
    const isTapped = tappedSlot === index;
    const isExpanded = enableHoverExpansion && (isHovered || isTapped);
    return /* @__PURE__ */ _jsxs("span", { style: { display: "inline-block", verticalAlign: "middle", width: sizeValue, height: sizeValue, marginLeft: spacingValue, marginRight: spacingValue, position: "relative", cursor: mediaItem.link ? "pointer" : "default" }, onMouseEnter: () => !isTouch && setHoveredSlot(index), onMouseLeave: () => setHoveredSlot(null), onClick: () => handleSlotClick(index, mediaItem.link), children: [/* @__PURE__ */ _jsx("span", { style: { display: "inline-block", verticalAlign: "middle", width: sizeValue, height: sizeValue } }), /* @__PURE__ */ _jsx("span", { style: { position: "absolute", top: "50%", left: "50%", width: sizeValue, height: sizeValue, transform: isExpanded ? `translate(-50%, -50%) scale(${currentHoverScale})` : "translate(-50%, -50%) scale(1)", transformOrigin: "center center", borderRadius: `${borderRadius}px`, overflow: "hidden", zIndex: isExpanded ? 100 : 1, transition: `transform ${hoverTransition}ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow ${hoverTransition}ms ease`, boxShadow: isExpanded ? "0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.1)" : "0 4px 6px -1px rgba(0, 0, 0, 0.1)", aspectRatio: isExpanded ? `${hoverAspectRatio}` : "1 / 1", pointerEvents: "none" }, children: mediaItem.srcs.map((imageObj, imgIndex) => /* @__PURE__ */ _jsx("img", { src: imageObj.src, srcSet: imageObj.srcSet, alt: imageObj.alt || "", style: { width: "100%", height: "100%", objectFit: "cover", display: "block", position: "absolute", top: 0, left: 0, opacity: imgIndex === currentIndex ? 1 : 0, transition: `opacity ${transitionDuration}ms ease-in-out` } }, imgIndex)) })] }, `media-${index}`);
  };
  const content = useMemo(() => {
    const words = text.split(" ");
    const totalWords = words.length;
    const count = Math.min(autoMediaCount, media.length);
    const parts = [];
    if (count === 0 || totalWords === 0) {
      return text;
    }
    let positions = [];
    if (mediaPositions && mediaPositions.length > 0) {
      positions = mediaPositions.slice(0, count).map((pct) => Math.round(pct / 100 * (totalWords - 1)));
    } else {
      const step = totalWords / (count + 1);
      positions = Array.from({ length: count }, (_, i) => Math.round((i + 1) * step));
    }
    positions = positions.map((p) => Math.max(0, Math.min(p, totalWords - 1))).sort((a, b) => a - b);
    let mediaIndex = 0;
    for (let i = 0; i < words.length; i++) {
      if (positions.includes(i) && mediaIndex < media.length) {
        parts.push(getMediaElement(media[mediaIndex], mediaIndex));
        mediaIndex++;
      }
      parts.push(words[i]);
      if (i < words.length - 1) {
        parts.push(" ");
      }
    }
    return parts;
  }, [text, media, currentMediaSize, borderRadius, currentSpacing, autoMediaCount, currentIndices, globalTransition, mediaPositions, hoveredSlot, tappedSlot, currentHoverScale]);
  return /* @__PURE__ */ _jsx("p", { style: { ...fontStyles, color: textColor, margin: 0, padding: 0, width: "100%" }, children: content });
}
addFonts(InlineMediaText, [{ family: "Unbounded", url: "https://fonts.gstatic.com/s/unbounded/v8/Yq6F-LOTXCb04q32xlpat-6uR42XTqtG6jx049f1pxZrQit5Ce5Ag4212rMfF8lYcF6i6N2qj94J3r3.ttf", style: "normal", weight: "400 900" }]);
addPropertyControls(InlineMediaText, { text: { type: ControlType.String, title: "Text", defaultValue: "By merging design and technology, we create systems that are flexible, scalable, and easy to use. The result is a seamless experience that feels natural, engaging, and built to last.", displayTextArea: true, placeholder: "Enter text..." }, media: { type: ControlType.Array, title: "Media Slots", control: { type: ControlType.Object, controls: { key: { type: ControlType.String, title: "Key", defaultValue: "media1", placeholder: "e.g. media1" }, type: { type: ControlType.Enum, title: "Type", options: ["image", "video"], defaultValue: "image", displaySegmentedControl: true }, srcs: { type: ControlType.Array, title: "Images", control: { type: ControlType.ResponsiveImage }, defaultValue: [{ src: "https://framerusercontent.com/images/GfGkADagM4KEibNcIiRUWlfrR0.jpg", alt: "Gradient 1 - Blue" }], maxCount: 20 }, duration: { type: ControlType.Number, title: "Duration (ms)", defaultValue: 3e3, min: 500, max: 2e4, step: 100, unit: "ms", displayStepper: true }, transitionDuration: { type: ControlType.Number, title: "Transition (ms)", defaultValue: 500, min: 0, max: 2e3, step: 50, unit: "ms", displayStepper: true }, link: { type: ControlType.Link, title: "Link", defaultValue: "" }, linkTarget: { type: ControlType.Enum, title: "Link Target", options: ["_self", "_blank"], optionTitles: ["Same Tab", "New Tab"], defaultValue: "_self", displaySegmentedControl: true } } }, defaultValue: defaultMedia, maxCount: 10 }, mediaPositions: { type: ControlType.Array, title: "Media Positions (%)", description: "Position of each media slot as percentage through text (0-100). Leave empty for auto-distribution.", control: { type: ControlType.Number, min: 0, max: 100, step: 5, unit: "%" }, defaultValue: [10, 25, 55, 88], maxCount: 10 }, autoMediaCount: { type: ControlType.Number, title: "Media Count", defaultValue: 4, min: 1, max: 10, step: 1, displayStepper: true }, globalDuration: { type: ControlType.Number, title: "Global Duration", defaultValue: 3e3, min: 500, max: 2e4, step: 100, unit: "ms", displayStepper: true }, globalTransition: { type: ControlType.Number, title: "Global Transition", defaultValue: 500, min: 0, max: 2e3, step: 50, unit: "ms", displayStepper: true }, fontSize: { type: ControlType.Number, title: "Font Size", defaultValue: 44, min: 8, max: 120, step: 1, unit: "px", displayStepper: true }, fontSizeTablet: { type: ControlType.Number, title: "Font Size (Tablet)", defaultValue: 24, min: 8, max: 120, step: 1, unit: "px", displayStepper: true }, fontSizeMobile: { type: ControlType.Number, title: "Font Size (Mobile)", defaultValue: 18, min: 8, max: 120, step: 1, unit: "px", displayStepper: true }, mediaSize: { type: ControlType.Number, title: "Media Size", defaultValue: 1.5, min: 0.5, max: 3, step: 0.1, unit: "em", displayStepper: true }, mediaSizeTablet: { type: ControlType.Number, title: "Media Size (Tablet)", defaultValue: 1.1, min: 0.5, max: 3, step: 0.1, unit: "em", displayStepper: true }, mediaSizeMobile: { type: ControlType.Number, title: "Media Size (Mobile)", defaultValue: 1.5, min: 0.5, max: 3, step: 0.1, unit: "em", displayStepper: true }, borderRadius: { type: ControlType.Number, title: "Border Radius", defaultValue: 7, min: 0, max: 50, step: 1, unit: "px", displayStepper: true }, spacing: { type: ControlType.Number, title: "Spacing", defaultValue: 0.1, min: 0, max: 1, step: 0.05, unit: "em", displayStepper: true }, spacingTablet: { type: ControlType.Number, title: "Spacing (Tablet)", defaultValue: 0.12, min: 0, max: 1, step: 0.05, unit: "em", displayStepper: true }, spacingMobile: { type: ControlType.Number, title: "Spacing (Mobile)", defaultValue: 0.1, min: 0, max: 1, step: 0.05, unit: "em", displayStepper: true }, textColor: { type: ControlType.Color, title: "Text Color", defaultValue: "#FFFFFF" }, font: { type: ControlType.Font, title: "Typography", controls: "extended", defaultFontType: "sans-serif", defaultValue: { fontSize: "32px", variant: "Medium", letterSpacing: "-0.02em", lineHeight: "1.3em", textAlign: "left" } }, enableHoverExpansion: { type: ControlType.Boolean, title: "Hover Expansion", defaultValue: true, enabledTitle: "On", disabledTitle: "Off" }, hoverScale: { type: ControlType.Number, title: "Hover Scale", defaultValue: 2.5, min: 1.2, max: 5, step: 0.1, displayStepper: true, hidden: ({ enableHoverExpansion }) => !enableHoverExpansion }, hoverAspectRatio: { type: ControlType.Number, title: "Hover Aspect Ratio", description: "Width / Height ratio when expanded (1.85 = 16:9, 2 = 2:1)", defaultValue: 1.85, min: 1, max: 3, step: 0.05, displayStepper: true, hidden: ({ enableHoverExpansion }) => !enableHoverExpansion }, hoverTransition: { type: ControlType.Number, title: "Hover Transition", defaultValue: 400, min: 100, max: 1e3, step: 50, unit: "ms", displayStepper: true, hidden: ({ enableHoverExpansion }) => !enableHoverExpansion }, tapToExpand: { type: ControlType.Boolean, title: "Tap to Expand", description: "First tap expands, second tap opens link (on touch devices)", defaultValue: true, enabledTitle: "On", disabledTitle: "Off", hidden: ({ enableHoverExpansion }) => !enableHoverExpansion } });
var __FramerMetadata__ = { "exports": { "default": { "type": "reactComponent", "name": "InlineMediaText", "slots": [], "annotations": { "framerIntrinsicHeight": "200", "framerSupportedLayoutHeight": "auto", "framerSupportedLayoutWidth": "any-prefer-fixed", "framerContractVersion": "1", "framerIntrinsicWidth": "800" } }, "__FramerMetadata__": { "type": "variable" } } };
export {
  __FramerMetadata__,
  InlineMediaText as default
};


