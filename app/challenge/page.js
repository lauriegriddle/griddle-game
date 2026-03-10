"use client";
import { useEffect } from "react";

export default function ChallengePage() {
  // Prevent the Next.js layout from interfering with the game's full-page styles
  useEffect(() => {
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    return () => {
      document.body.style.margin = "";
      document.body.style.padding = "";
    };
  }, []);

  return (
    <iframe
      src="/stadium-scramble.html"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        border: "none",
      }}
      title="Stadium Scramble – Letter Griddle Challenge"
    />
  );
}