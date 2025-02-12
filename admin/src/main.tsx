import { createRoot } from "react-dom/client";
import "./index.css";
import Provider from "./providers";

createRoot(document.getElementById("root")!).render(
  <Provider/>
);
