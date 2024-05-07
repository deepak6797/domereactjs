import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ThemeProvider from "./context/ThemeContext.tsx";
import App from "./App.tsx";
import "./index.css";
import AuthContextProvider from "./context/AuthContext.tsx";
import ContextProvider from "./context/VisibleContext.tsx";

export const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthContextProvider>
          <ContextProvider>
            <App />
          </ContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
