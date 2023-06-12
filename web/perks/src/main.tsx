import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { getInitialContext } from "@ionic/portals";

type Context = {
  supabase: {
    url: string;
    accessToken: string;
    refreshToken: string;
  };
  resourceId: number;
};

const initialContext = getInitialContext<Context>()?.value;
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
