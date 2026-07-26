"use client";

import { Button as FluentButton, type ButtonProps as FluentButtonProps } from "@fluentui/react-components";
import { forwardRef } from "react";

export type ButtonProps = FluentButtonProps;

// Defaults match Figma "Portafolio Web Lucia" Button (node 9026:639):
// Style=Primary, Size=Large, fully rounded container (Button/Container 2 = 9999).
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { appearance = "primary", size = "large", shape = "circular", ...props },
  ref,
) {
  return <FluentButton ref={ref} appearance={appearance} size={size} shape={shape} {...props} />;
});
