import { Suspense, lazy } from "solid-js";
import { LofiGirl } from "~/components/Backgrounds";
import { ConstructionMessage } from "~/components/ConstructionMessage";
import { PanelProvider } from "~/providers";

const Menu = lazy(() =>
  import("~/components/Menu").then((m) => ({ default: m.Menu }))
);

const Panels = lazy(() =>
  import("~/components/Panels").then((m) => ({ default: m.Panels }))
);

export default function App() {
  return (
    <main>
      <LofiGirl />
      <PanelProvider>
        <Suspense>
          <Panels />
          <Menu />
        </Suspense>
      </PanelProvider>
      <ConstructionMessage />
    </main>
  );
}
