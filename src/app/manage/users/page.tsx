"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { UsersTable } from "@/components/manage/users-table";

// Sub-nav spec:
// Active:   color #000000, font-weight 500, font-size 16px, border-bottom 2px solid #6B11F9, padding 8px 0
// Inactive: color #000000, font-weight 400, font-size 16px, padding 8px 0

const activeStyle: React.CSSProperties = {
  color: "#000000",
  fontWeight: 500,
  fontSize: "16px",
  borderBottom: "2px solid #6B11F9",
  paddingBottom: "8px",
  paddingTop: "8px",
  textDecoration: "none",
  display: "inline-block",
};

const inactiveStyle: React.CSSProperties = {
  color: "#000000",
  fontWeight: 400,
  fontSize: "16px",
  paddingBottom: "8px",
  paddingTop: "8px",
  textDecoration: "none",
  display: "inline-block",
};

// Spec filter buttons: font-size 16px, font-weight 400, color #000, plain text + chevron
// Screenshot shows them as lightly bordered pill-style buttons
function FilterButton({ label }: { label: string }) {
  return (
    <button
      className="flex items-center gap-1 hover:opacity-70 transition-opacity"
      style={{
        fontSize: "16px",
        fontWeight: 400,
        color: "#000000",
        background: "transparent",
        border: "none",
        padding: 0,
        cursor: "pointer",
        whiteSpace: "nowrap",
      }}
    >
      {label}
      <ChevronDown style={{ width: "14px", height: "14px", opacity: 0.6 }} />
    </button>
  );
}

export default function UsersPage() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="flex flex-col flex-1" style={{ background: "#FFFFFF" }}>

      {/* ── Sub-nav — original tabs only: Users, Links, Reports, Tags ── */}
      <nav
        className="flex items-end gap-7"
        style={{ padding: "0 32px", borderBottom: "1px solid #C9CBE3" }}
      >
        <Link href="/manage/users" style={activeStyle}>Users</Link>
        <Link href="/manage/reports" style={inactiveStyle}>Reports</Link>
      </nav>

      {/* ── Search + filter section ──────────────────────────────── */}
      <div style={{ padding: "24px 32px 0", display: "flex", flexDirection: "column", gap: "16px" }}>

        {/* Row 1: search input + gold button + filter dropdowns */}
        <div className="flex items-center gap-4 flex-wrap">
          {/* Search input + gold button joined */}
          <div className="flex items-center" style={{ flexShrink: 0 }}>
            <div
              className="flex items-center"
              style={{
                width: "296px",
                height: "54px",
                background: "#FFFFFF",
                border: "1px solid #C9CBE3",
                borderRight: "none",
                borderRadius: "6px 0 0 6px",
                padding: "0 16px 0 14px",
                gap: "10px",
              }}
            >
              <Search style={{ width: "18px", height: "18px", color: "#8687A8", flexShrink: 0 }} />
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search by name or email"
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: "16px",
                  color: "#000022",
                  background: "transparent",
                  width: "100%",
                }}
              />
            </div>
            {/* Gold search button — spec: width 56px, height 54px, bg #FFBD4C */}
            <button
              style={{
                width: "56px",
                height: "54px",
                background: "#FFBD4C",
                border: "none",
                borderRadius: "4px 6px 6px 4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <Search style={{ width: "20px", height: "20px", color: "#FFFFFF" }} />
            </button>
          </div>

          {/* Filter dropdown buttons — spec: 16px, 400, plain text + chevron */}
          <FilterButton label="Role" />
          <FilterButton label="Date created" />
          <FilterButton label="Coach" />
          <FilterButton label="Location" />
          <FilterButton label="Career" />
          <FilterButton label="Group/Employer" />
        </div>

        {/* Row 2: Tags filter */}
        <div className="flex items-center gap-3" style={{ paddingBottom: "16px" }}>
          <span style={{ fontSize: "16px", fontWeight: 400, color: "#000000" }}>Tags filter</span>
          <button
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            style={{
              fontSize: "16px",
              fontWeight: 400,
              color: "#000000",
              border: "1px solid #C9CBE3",
              borderRadius: "6px",
              padding: "6px 14px",
              background: "#FFFFFF",
              cursor: "pointer",
            }}
          >
            Select a tag
            <ChevronDown style={{ width: "14px", height: "14px", opacity: 0.6 }} />
          </button>
        </div>
      </div>

      <UsersTable />
    </div>
  );
}
