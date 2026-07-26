import type { ReactNode } from "react";

// Site-wide content container: caps at 1276px (Figma) and stays centered,
// but never touches the viewport edges below that width — `min()` keeps a
// 24px safety gutter on each side instead of collapsing to 100% width.
const GUTTER = 24;

export function PageContainer({ children }: { children: ReactNode }) {
  return (
    <div style={{ width: `min(1276px, 100% - ${GUTTER * 2}px)`, marginInline: "auto" }}>
      {children}
    </div>
  );
}
