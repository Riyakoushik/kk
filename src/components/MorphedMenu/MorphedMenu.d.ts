export interface MorphedMenuProps {
  /**
   * Main Links — pass as `navLinks` not `mainLinks`.
   */
  navLinks?: unknown[];
  /**
   * Footer Links — pass as `footerLinksData` not `footerLinks`.
   */
  footerLinksData?: unknown[];
  /**
   * Menu BG — pass as `menuBackgroundColor` not `menuBg`.
   */
  menuBackgroundColor?: string;
  /**
   * Menu Text — pass as `menuTextColor` not `menuText`.
   */
  menuTextColor?: string;
  /**
   * Hover Accents — pass as `hoverLineColor` not `hoverAccents`.
   */
  hoverLineColor?: string;
  /**
   * Btn Closed BG
   */
  btnClosedBg?: string;
  /**
   * Btn Closed Text — pass as `btnClosedColor` not `btnClosedText`.
   */
  btnClosedColor?: string;
  /**
   * Btn Open BG
   */
  btnOpenBg?: string;
  /**
   * Btn Open Text — pass as `btnOpenColor` not `btnOpenText`.
   */
  btnOpenColor?: string;
  /**
   * Menu Font
   */
  menuFont?: string;
  /**
   * Nav Size (D) — pass as `navFontSizeDesktop` not `navSize(d)`.
   * Range: min: 10, max: 120
   */
  navFontSizeDesktop?: number;
  /**
   * Nav Size (M) — pass as `navFontSizeMobile` not `navSize(m)`.
   * Range: min: 10, max: 100
   */
  navFontSizeMobile?: number;
  /**
   * Footer Size (D) — pass as `footerFontSizeDesktop` not `footerSize(d)`.
   * Range: min: 10, max: 60
   */
  footerFontSizeDesktop?: number;
  /**
   * Footer Size (M) — pass as `footerFontSizeMobile` not `footerSize(m)`.
   * Range: min: 10, max: 60
   */
  footerFontSizeMobile?: number;
  /**
   * Button Size (D) — pass as `btnFontSizeDesktop` not `buttonSize(d)`.
   * Range: min: 10, max: 40
   */
  btnFontSizeDesktop?: number;
  /**
   * Button Size (M) — pass as `btnFontSizeMobile` not `buttonSize(m)`.
   * Range: min: 10, max: 40
   */
  btnFontSizeMobile?: number;
  /**
   * Width (D) — pass as `menuWidthDesktop` not `width(d)`.
   */
  menuWidthDesktop?: string;
  /**
   * Height (D) — pass as `menuHeightDesktop` not `height(d)`.
   */
  menuHeightDesktop?: string;
  /**
   * Width (M) — pass as `menuWidthMobile` not `width(m)`.
   */
  menuWidthMobile?: string;
  /**
   * Height (M) — pass as `menuHeightMobile` not `height(m)`.
   */
  menuHeightMobile?: string;
  /**
   * Mobile Breakpoint
   * Range: min: 320, max: 1200
   */
  mobileBreakpoint?: number;
  /**
   * Panel Stiffness — pass as `springStiffness` not `panelStiffness`.
   * Range: min: 10, max: 300
   */
  springStiffness?: number;
  /**
   * Panel Damping — pass as `springDamping` not `panelDamping`.
   * Range: min: 1, max: 50
   */
  springDamping?: number;
  /**
   * Panel Mass — pass as `springMass` not `panelMass`.
   * Range: min: 0.1, max: 5, step: 0.1
   */
  springMass?: number;
  /**
   * Link Stiffness
   * Range: min: 10, max: 300
   */
  linkStiffness?: number;
  /**
   * Link Damping
   * Range: min: 1, max: 50
   */
  linkDamping?: number;
  /**
   * Stagger Delay — pass as `linkDelayOffset` not `staggerDelay`.
   * Range: min: 0.01, max: 0.5, step: 0.01
   */
  linkDelayOffset?: number;
  /** Additional properties */
  [key: string]: unknown;
}


