"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// Spec: sidebar width 240px, bg white, border-right 1px solid #8687A8 (--color-dusk)
// Spec: nav links font-size 14px, padding 10px 16px, color #000022
// Active: font-weight 600. Inactive: font-weight 400. Same color for both.

const navItems = [
  { label: "Manage", href: "/manage/users" },
  { label: "Groups", href: "/manage/groups" },
  { label: "Forms", href: "/manage/forms" },
  { label: "Business Services", href: "/manage/business-services" },
  { label: "Business Resources", href: "/manage/business-resources" },
  { label: "Manage Content", href: "/manage/content" },
];

// FutureFit AI logomark — geometric approximation of the actual icon
function FFIcon({ size = 34 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      {/* Outer shield / pointed base */}
      <path d="M17 2L30 9.5V22.5L17 32L4 22.5V9.5L17 2Z" fill="#6B11F9" fillOpacity="0.12" />
      {/* Top horizontal bar of F */}
      <path d="M11 11H22V13.5H11V11Z" fill="#6B11F9" />
      {/* Vertical stem of F */}
      <path d="M11 11H13.5V24H11V11Z" fill="#6B11F9" />
      {/* Middle bar of F */}
      <path d="M11 16.5H19V19H11V16.5Z" fill="#6B11F9" />
    </svg>
  );
}

export function FFIconSmall({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17 2L30 9.5V22.5L17 32L4 22.5V9.5L17 2Z" fill="#6B11F9" fillOpacity="0.15" />
      <path d="M11 11H22V13.5H11V11Z" fill="#6B11F9" />
      <path d="M11 11H13.5V24H11V11Z" fill="#6B11F9" />
      <path d="M11 16.5H19V19H11V16.5Z" fill="#6B11F9" />
    </svg>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden lg:flex flex-col fixed left-0 top-0 h-full z-40"
      style={{
        width: "240px",
        background: "#FFFFFF",
        borderRight: "1px solid #8687A8", // --color-dusk per spec
        paddingTop: "20px",
        paddingBottom: "16px",
      }}
    >
      {/* Logo — spec: just present at top, no defined height in spec so match screenshot */}
      <div className="flex items-center gap-2 px-4 pb-5">
        <FFIcon size={34} />
        <span style={{ color: "#000022", fontSize: "15px", fontWeight: 600 }}>
          FutureFit AI
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const isManage = item.href === "/manage/users";
          const active = isManage
            ? pathname.startsWith("/manage/users") || pathname.startsWith("/manage/coach-tracker") || pathname === "/manage"
            : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                // Spec: same color #000022 active and inactive, only weight differs
                color: "#000022",
                fontWeight: active ? 600 : 400,
                fontSize: "14px",
                padding: "10px 16px",
                textDecoration: "none",
                display: "block",
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="flex items-center gap-1.5 px-4" style={{ fontSize: "11px", color: "#8687A8" }}>
        <span>Powered by</span>
        <FFIconSmall size={14} />
        <span style={{ color: "#000022", fontWeight: 500 }}>FutureFit AI</span>
      </div>
    </aside>
  );
}
