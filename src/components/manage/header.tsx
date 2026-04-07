"use client";

import { ChevronDown } from "lucide-react";

// Spec: height 64px, background transparent, position fixed

export function Header() {
  return (
    <header
      className="fixed top-0 z-30 flex items-center justify-between"
      style={{
        left: "240px", // sidebar width per spec
        right: 0,
        height: "64px",
        background: "transparent",
        borderBottom: "1px solid #C9CBE3", // --color-dawn, subtle separator matching screenshot
        paddingLeft: "32px",
        paddingRight: "24px",
        backgroundColor: "#FFFFFF", // header itself is white, page bg shows around it
      }}
    >
      {/* "Manage" bold heading */}
      <h1 style={{ fontWeight: 700, fontSize: "18px", color: "#000022" }}>Manage</h1>

      <div className="flex items-center gap-2">
        {/* Org selector — wide bordered button matching screenshot */}
        <button
          className="flex items-center justify-between gap-8 hover:opacity-80 transition-opacity"
          style={{
            border: "1px solid #C9CBE3",
            borderRadius: "6px",
            padding: "6px 14px",
            fontSize: "14px",
            fontWeight: 500,
            color: "#000022",
            background: "#FFFFFF",
            minWidth: "140px",
          }}
        >
          <span>FFAI</span>
          <ChevronDown style={{ width: "14px", height: "14px", color: "#8687A8" }} />
        </button>

        {/* User icon + chevron */}
        <button
          className="flex items-center gap-0.5 hover:opacity-80 transition-opacity"
          style={{ color: "#8687A8" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          <ChevronDown style={{ width: "12px", height: "12px" }} />
        </button>
      </div>
    </header>
  );
}
