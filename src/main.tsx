import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { useAuthStore } from "./shared/store/authStore.ts";

const AppInit = ({ children }: { children: React.ReactNode }) => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    if (!useAuthStore.getState().isLoading) return;

    let unsubscribe: (() => void) | undefined;

    initialize().then((unsub) => {
      unsubscribe = unsub;
    });

    return () => unsubscribe?.();
  }, []);

  return <>{children}</>;
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppInit>
        <App />
      </AppInit>
    </BrowserRouter>
  </StrictMode>,
);
