export interface InlineMediaTextProps {
  /**
   * Text
   * @default "By merging design and technology, we create systems that are flexible, scalable, and easy to use. The result is a seamless experience that feels natural, engaging, and built to last."
   */
  text?: string;
  /**
   * Media Slots — pass as `media` not `mediaSlots`.
   */
  media?: unknown[];
  /**
   * Media Positions (%) — pass as `mediaPositions` not `mediaPositions(%)`.
   * @default [10,25,55,88]
   */
  mediaPositions?: unknown[];
  /**
   * Media Count — pass as `autoMediaCount` not `mediaCount`.
   * Range: min: 1, max: 10, step: 1
   * @default 4
   */
  autoMediaCount?: number;
  /**
   * Global Duration
   * Range: min: 500, max: 20000, step: 100
   * @default 3000
   */
  globalDuration?: number;
  /**
   * Global Transition
   * Range: min: 0, max: 2000, step: 50
   * @default 500
   */
  globalTransition?: number;
  /**
   * Font Size
   * Range: min: 8, max: 120, step: 1
   * @default 44
   */
  fontSize?: number;
  /**
   * Font Size (Tablet) — pass as `fontSizeTablet` not `fontSize(tablet)`.
   * Range: min: 8, max: 120, step: 1
   * @default 24
   */
  fontSizeTablet?: number;
  /**
   * Font Size (Mobile) — pass as `fontSizeMobile` not `fontSize(mobile)`.
   * Range: min: 8, max: 120, step: 1
   * @default 18
   */
  fontSizeMobile?: number;
  /**
   * Media Size
   * Range: min: 0.5, max: 3, step: 0.1
   * @default 1.5
   */
  mediaSize?: number;
  /**
   * Media Size (Tablet) — pass as `mediaSizeTablet` not `mediaSize(tablet)`.
   * Range: min: 0.5, max: 3, step: 0.1
   * @default 1.1
   */
  mediaSizeTablet?: number;
  /**
   * Media Size (Mobile) — pass as `mediaSizeMobile` not `mediaSize(mobile)`.
   * Range: min: 0.5, max: 3, step: 0.1
   * @default 1.5
   */
  mediaSizeMobile?: number;
  /**
   * Border Radius
   * Range: min: 0, max: 50, step: 1
   * @default 7
   */
  borderRadius?: number;
  /**
   * Spacing
   * Range: min: 0, max: 1, step: 0.05
   * @default 0.1
   */
  spacing?: number;
  /**
   * Spacing (Tablet) — pass as `spacingTablet` not `spacing(tablet)`.
   * Range: min: 0, max: 1, step: 0.05
   * @default 0.12
   */
  spacingTablet?: number;
  /**
   * Spacing (Mobile) — pass as `spacingMobile` not `spacing(mobile)`.
   * Range: min: 0, max: 1, step: 0.05
   * @default 0.1
   */
  spacingMobile?: number;
  /**
   * Text Color
   * @default "#FFFFFF"
   */
  textColor?: string;
  /**
   * Typography — pass as `font` not `typography`.
   * @default {"fontSize":"32px","variant":"Medium","letterSpacing":"-0.02em","lineHeight":"1.3em","textAlign":"left"}
   */
  font?: string;
  /**
   * Hover Expansion — pass as `enableHoverExpansion` not `hoverExpansion`.
   * @default true
   */
  enableHoverExpansion?: boolean;
  /**
   * Hover Scale
   * Range: min: 1.2, max: 5, step: 0.1
   * @default 2.5
   */
  hoverScale?: number;
  /**
   * Hover Aspect Ratio
   * Range: min: 1, max: 3, step: 0.05
   * @default 1.85
   */
  hoverAspectRatio?: number;
  /**
   * Hover Transition
   * Range: min: 100, max: 1000, step: 50
   * @default 400
   */
  hoverTransition?: number;
  /**
   * Tap to Expand
   * @default true
   */
  tapToExpand?: boolean;
  /** Additional properties */
  [key: string]: unknown;
}


