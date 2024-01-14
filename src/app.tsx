// @refresh reload
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start";
import { ErrorBoundary, Suspense } from "solid-js";
import { Toaster } from "solid-toast";

import "./app.css";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Focusly</Title>
          <Suspense fallback={'Loading...'}>
            <ErrorBoundary fallback={""}>
              <Toaster
                position="top-right"
                containerStyle={{
                  "z-index": "2147483647",
                }}
              />
              {props.children}
            </ErrorBoundary>
          </Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
