// @refresh reload
import { Router } from "@solidjs/router";
import { FileRoutes, clientOnly } from "@solidjs/start";
import { ErrorBoundary, Suspense } from "solid-js";
import { Toaster } from "solid-toast";

const CursorPositionProvider = clientOnly(() =>
  import("~/providers").then((m) => ({ default: m.CursorPositionProvider }))
);

import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <Suspense>
          <ErrorBoundary fallback={""}>
            <CursorPositionProvider>
              <Toaster
                position="top-right"
                containerStyle={{
                  "z-index": "2147483647",
                }}
              />
              {props.children}
            </CursorPositionProvider>
          </ErrorBoundary>
        </Suspense>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
