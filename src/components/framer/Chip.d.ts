export interface ChipProps {
  /**
   * Variant
   * Friendly names map to internal IDs:
   *   "Availability" → ifPyDaAWW
   *   "Compact" → hPQKFTVlb
   *   "Variant" → fB53xlduU
   */
  variant?: 'Availability' | 'Compact' | 'Variant' | 'fB53xlduU' | 'hPQKFTVlb' | 'ifPyDaAWW';
  /**
   * Title — pass as `dY1v_RfTz` not `title`.
   * @default "Hiking"
   */
  dY1v_RfTz?: string;
  ondY1v_RfTzChange?: string;
  /** Additional properties */
  [key: string]: unknown;
}
