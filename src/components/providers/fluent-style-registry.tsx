"use client";

import { createDOMRenderer, renderToStyleElements, RendererProvider, SSRProvider } from "@fluentui/react-components";
import { useServerInsertedHTML } from "next/navigation";
import { useState, type ReactNode } from "react";

// Griffel needs to emit its <style> tags in a specific priority order.
// Next.js's own SSR streaming doesn't preserve that order by default,
// so we register Griffel's renderer explicitly via useServerInsertedHTML.
// See: https://react.fluentui.dev/?path=/docs/concepts-developer-server-side-rendering--docs
export function FluentStyleRegistry({ children }: { children: ReactNode }) {
  const [renderer] = useState(() => createDOMRenderer());

  useServerInsertedHTML(() => renderToStyleElements(renderer));

  return (
    <RendererProvider renderer={renderer}>
      <SSRProvider>{children}</SSRProvider>
    </RendererProvider>
  );
}
