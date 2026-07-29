"use client";

import { FluentProvider } from "@fluentui/react-components";
import type { ReactNode } from "react";

import { lightTheme } from "@/lib/fluent/theme";

import { FluentStyleRegistry } from "./fluent-style-registry";

// Portfolio is Light-only by design — no prefers-color-scheme detection,
// always the Light theme regardless of OS/browser appearance settings.
export function AppFluentProvider({ children }: { children: ReactNode }) {
  return (
    <FluentStyleRegistry>
      <FluentProvider
        theme={lightTheme}
        style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}
      >
        {children}
      </FluentProvider>
    </FluentStyleRegistry>
  );
}
