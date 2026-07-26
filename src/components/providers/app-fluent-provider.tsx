"use client";

import { FluentProvider } from "@fluentui/react-components";
import type { ReactNode } from "react";

import { useColorScheme } from "@/hooks/use-color-scheme";
import { darkTheme, lightTheme } from "@/lib/fluent/theme";

import { FluentStyleRegistry } from "./fluent-style-registry";

export function AppFluentProvider({ children }: { children: ReactNode }) {
  const scheme = useColorScheme();

  return (
    <FluentStyleRegistry>
      <FluentProvider
        theme={scheme === "dark" ? darkTheme : lightTheme}
        style={{ minHeight: "100%", display: "flex", flexDirection: "column" }}
      >
        {children}
      </FluentProvider>
    </FluentStyleRegistry>
  );
}
