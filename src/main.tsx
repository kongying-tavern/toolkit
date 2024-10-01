import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { AppLoading } from "@/components";
import { loadResource } from "@/resources";
import { Error } from "./Error.tsx";
import "./styles/index.css";

const container = document.getElementById("root")!;

const root = createRoot(container);

window.onload = () => {
  const App = lazy(async () => {
    await loadResource();
    const module = await import("./App.tsx");
    return module;
  });

  root.render(
    <StrictMode>
      <Suspense fallback={<AppLoading />}>
        <App />
      </Suspense>
    </StrictMode>,
  );
};

window.addEventListener("error", (ev) => {
  console.log("ev", ev);
  root.render(
    <StrictMode>
      <Error error={ev.message} />
    </StrictMode>,
  );
});
