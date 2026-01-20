import React from "react";
import type { Responsive } from "../../core/types";
import { resolveResponsive } from "../../core/resolveResponsive";
import { useBreakpoint } from "../../hooks/useBreakpoint";

export type GridProps = React.HTMLAttributes<HTMLDivElement> & {
  columns?: Responsive<number>;
  gap?: Responsive<number>;
  rowGap?: Responsive<number>;
  colGap?: Responsive<number>;
  flow?: "row" | "column" | "row dense" | "column dense";
};

export function Grid({
  columns = 12,
  gap = 12,
  rowGap,
  colGap,
  flow = "row",
  style,
  ...rest
}: GridProps) {
  const bp = useBreakpoint();

 
  const cols = resolveResponsive(columns, bp, 12)!;
  const g = resolveResponsive(gap, bp, 12)!;
  const rg = resolveResponsive(rowGap, bp);
  const cg = resolveResponsive(colGap, bp);


  const finalRowGap = rg ?? g;
  const finalColGap = cg ?? g;

  return (
    <div
      {...rest}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
        rowGap: `${finalRowGap}px`,
        columnGap: `${finalColGap}px`,
        gridAutoFlow: flow,
        ...style
      }}
    />
  );
}
