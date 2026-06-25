export interface SocialLinksProps {
  /**
   * Variant
   * Friendly names map to internal IDs:
   *   "Compact" → nGLYRBR03
   *   "Footer" → qNlxoU2x4
   *   "Large" → tYKWURCcO
   *   "mobile" → j7f9JP9YS
   */
  variant?: 'Compact' | 'Footer' | 'Large' | 'mobile' | 'nGLYRBR03' | 'tYKWURCcO' | 'j7f9JP9YS' | 'qNlxoU2x4';
  /**
   * Text — pass as `Xjw2WxeV8` not `text`.
   * @default "some name"
   */
  Xjw2WxeV8?: string;
  onXjw2WxeV8Change?: string;
  /**
   * Link — pass as `ONQ6jmnVq` not `link`.
   */
  ONQ6jmnVq?: string;
  /**
   * Icon — pass as `t8CBS7pMU` not `icon`.
   * @default {"identifier":"module:JNI0unvKLnSNOjYgWQPe/cFK4x7HnGbxoZXkZNw5W/hNcHJzSkR.js:default","moduleId":"JNI0unvKLnSNOjYgWQPe"}
   */
  t8CBS7pMU?: string;
  /**
   * Aria Label — pass as `AiV5x50xg` not `ariaLabel`.
   * @default ""
   */
  AiV5x50xg?: string;
  onAiV5x50xgChange?: string;
  /** Additional properties */
  [key: string]: unknown;
}
