
export interface ChronicalTimelineProps {
  /**
   * Items
   */
  items?: unknown[];
  /**
   * Smoothing
   * Range: min: 0, max: 100, step: 1
   */
  smoothing?: number;
  /**
   * ↳ Easing — pass as `segmentEase` not `↳Easing`.
   * Options: "linear" | "inout" | "out" | "expo"
   */
  segmentEase?: 'linear' | 'inout' | 'out' | 'expo';
  /**
   * ↳ Parallax — pass as `contentParallax` not `↳Parallax`.
   * Range: min: 0, max: 240, step: 4
   */
  contentParallax?: number;
  /**
   * ↳ Reveal — pass as `revealDirection` not `↳Reveal`.
   * Options: "rtl" | "ltr" | "btt"
   */
  revealDirection?: 'rtl' | 'ltr' | 'btt';
  /**
   * ↳ Text Turn — pass as `yearRotation` not `↳TextTurn`.
   * Range: min: 0, max: 180, step: 5
   */
  yearRotation?: number;
  /**
   * Label Font
   */
  labelFont?: string;
  /**
   * ↳ Tablet — pass as `labelSizeTablet` not `↳Tablet`.
   * Range: min: 8, max: 48, step: 1
   */
  labelSizeTablet?: number;
  /**
   * ↳ Phone — pass as `labelSizePhone` not `↳Phone`.
   * Range: min: 8, max: 48, step: 1
   */
  labelSizePhone?: number;
  /**
   * ↳ Opacity — pass as `labelOpacity` not `↳Opacity`.
   * Range: min: 0, max: 1, step: 0.05
   */
  labelOpacity?: number;
  /**
   * ↳ Gap — pass as `labelGap` not `↳Gap`.
   * Range: min: 0, max: 60, step: 1
   */
  labelGap?: number;
  /**
   * Desc Font
   */
  descFont?: string;
  /**
   * ↳ Tablet — pass as `descSizeTablet` not `↳Tablet`.
   * Range: min: 10, max: 64, step: 1
   */
  descSizeTablet?: number;
  /**
   * ↳ Phone — pass as `descSizePhone` not `↳Phone`.
   * Range: min: 10, max: 64, step: 1
   */
  descSizePhone?: number;
  /**
   * Big Text Font — pass as `yearFont` not `bigTextFont`.
   */
  yearFont?: string;
  /**
   * ↳ Tablet — pass as `yearSizeTablet` not `↳Tablet`.
   * Range: min: 24, max: 400, step: 2
   */
  yearSizeTablet?: number;
  /**
   * ↳ Phone — pass as `yearSizePhone` not `↳Phone`.
   * Range: min: 24, max: 400, step: 2
   */
  yearSizePhone?: number;
  /**
   * ↳ Trim X — pass as `yearTrimX` not `↳TrimX`.
   * Range: max: 0.3, step: 0.005
   */
  yearTrimX?: number;
  /**
   * ↳ Trim Y — pass as `yearTrimY` not `↳TrimY`.
   * Range: max: 0.3, step: 0.005
   */
  yearTrimY?: number;
  /**
   * Frame BG — pass as `frameBackground` not `frameBg`.
   */
  frameBackground?: string;
  /**
   * Radius — pass as `cornerRadius` not `radius`.
   * Range: min: 0, max: 100, step: 1
   */
  cornerRadius?: number;
  /**
   * ↳ Tablet — pass as `cornerRadiusTablet` not `↳Tablet`.
   * Range: min: 0, max: 100, step: 1
   */
  cornerRadiusTablet?: number;
  /**
   * ↳ Phone — pass as `cornerRadiusPhone` not `↳Phone`.
   * Range: min: 0, max: 100, step: 1
   */
  cornerRadiusPhone?: number;
  /**
   * Inset — pass as `frameInset` not `inset`.
   * Range: min: 0, max: 100, step: 1
   */
  frameInset?: number;
  /**
   * ↳ Tablet — pass as `frameInsetTablet` not `↳Tablet`.
   * Range: min: 0, max: 100, step: 1
   */
  frameInsetTablet?: number;
  /**
   * ↳ Phone — pass as `frameInsetPhone` not `↳Phone`.
   * Range: min: 0, max: 100, step: 1
   */
  frameInsetPhone?: number;
  /**
   * Padding — pass as `panelPadding` not `padding`.
   */
  panelPadding?: string;
  /**
   * ↳ Tablet — pass as `panelPaddingTablet` not `↳Tablet`.
   */
  panelPaddingTablet?: string;
  /**
   * ↳ Phone — pass as `panelPaddingPhone` not `↳Phone`.
   */
  panelPaddingPhone?: string;
  /**
   * Header — pass as `headerAlign` not `header`.
   * Options: "left" | "right"
   */
  headerAlign?: 'left' | 'right';
  /**
   * ↳ Phone — pass as `headerAlignPhone` not `↳Phone`.
   * Options: "left" | "right"
   */
  headerAlignPhone?: 'left' | 'right';
  /**
   * ↳ Top — pass as `headerOffset` not `↳Top`.
   * Range: min: 0, max: 120, step: 2
   */
  headerOffset?: number;
  /**
   * Header W — pass as `headerMaxWidth` not `headerW`.
   * Range: min: 100, max: 900, step: 10
   */
  headerMaxWidth?: number;
  /**
   * ↳ Tablet — pass as `headerMaxWidthTablet` not `↳Tablet`.
   * Range: min: 100, max: 900, step: 10
   */
  headerMaxWidthTablet?: number;
  /**
   * ↳ Phone — pass as `headerMaxWidthPhone` not `↳Phone`.
   * Range: min: 100, max: 900, step: 10
   */
  headerMaxWidthPhone?: number;
  /**
   * Scroll Length — pass as `totalScrollHeight` not `scrollLength`.
   */
  totalScrollHeight?: string;
  /**
   * ↳ Tablet — pass as `totalScrollHeightTablet` not `↳Tablet`.
   */
  totalScrollHeightTablet?: string;
  /**
   * ↳ Phone — pass as `totalScrollHeightPhone` not `↳Phone`.
   */
  totalScrollHeightPhone?: string;
  /**
   * Canvas Item
   * Range: min: 0, max: 20, step: 1
   */
  canvasItem?: number;
  /** Additional properties */
  [key: string]: unknown;
}


