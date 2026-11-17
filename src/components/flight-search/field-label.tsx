/**
 * 12px field label. Figma draws it as a 9px-tall box (node 6706-1413), so the
 * line-height is pinned to 9px and paired with a 6px gap to keep fields at the
 * design's exact 45px height (9 + 6 + 30).
 */
export function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="h-[9px] text-xs leading-[9px] font-semibold tracking-[-0.04em] text-ink">
      {children}
    </span>
  );
}
