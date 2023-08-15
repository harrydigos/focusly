import { JSX } from "solid-js";

export const classNames = (...classNames: Array<string | null | undefined>) => {
  return classNames.filter(Boolean).join(" ");
};

export const ToastStyle: JSX.CSSProperties = {
  background: "#1c1917",
  color: "#fff",
  "border-radius": "12px",
  border: "1px solid rgb(231, 229, 228, 0.1)",
  "font-size": "14px",
};
