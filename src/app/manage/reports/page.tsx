import Link from "next/link";
import { ChevronDown, Download } from "lucide-react";

// ─── Tab nav styles (same as /manage/users) ───────────────────────────────────

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

// ─── Table styles ─────────────────────────────────────────────────────────────

const TH: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#000000",
  padding: "16px 24px",
  background: "#EFEFF7",
  whiteSpace: "nowrap",
  textAlign: "left",
};

const TD: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 400,
  color: "#000000",
  padding: "20px 24px",
  verticalAlign: "middle",
};

// ─── Dummy data ───────────────────────────────────────────────────────────────

const reports = [
  { dateCreated: "April 7, 2026", name: "Q1 Cohort",            type: "Profile Data",                          users: 3 },
  { dateCreated: "April 7, 2026", name: "Spring Applications",  type: "Application Activity — Breakdown by User",                  users: 1 },
  { dateCreated: "April 7, 2026", name: "Cross-Cohort Summary", type: "Application Activity — All Applications (Selected Users)", users: 4 },
  { dateCreated: "April 6, 2026", name: "March Graduates",      type: "Profile Data",                          users: 1 },
  { dateCreated: "April 6, 2026", name: "BuildRight Cohort",    type: "Profile Data",                          users: 1 },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  return (
    <div className="flex flex-col flex-1" style={{ background: "#FFFFFF" }}>

      {/* ── Tab nav ───────────────────────────────────────────── */}
      <nav
        className="flex items-end gap-7"
        style={{ padding: "0 32px", borderBottom: "1px solid #C9CBE3" }}
      >
        <Link href="/manage/users" style={inactiveStyle}>Users</Link>
        <span style={activeStyle}>Reports</span>
      </nav>

      {/* ── Content ───────────────────────────────────────────── */}
      <div style={{ padding: "24px 32px" }}>

        {/* Page heading */}
        <h1 style={{ fontSize: "20px", fontWeight: 500, color: "#000000", margin: "0 0 20px" }}>
          Reports
        </h1>

        {/* Table */}
        <div style={{ border: "1px solid #EFEFF7", borderRadius: "4px", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={TH}>
                  Date Created
                  <ChevronDown style={{ width: "12px", height: "12px", marginLeft: "6px", display: "inline", opacity: 0.5 }} />
                </th>
                <th style={TH}>
                  Report Name
                  <ChevronDown style={{ width: "12px", height: "12px", marginLeft: "6px", display: "inline", opacity: 0.5 }} />
                </th>
                <th style={TH}>Type</th>
                <th style={TH}>Users</th>
                <th style={TH}>Report</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: i < reports.length - 1 ? "1px solid #F1F6FB" : "none",
                    background: "#FFFFFF",
                  }}
                >
                  <td style={TD}>{row.dateCreated}</td>
                  <td style={TD}>{row.name}</td>
                  <td style={{ ...TD, color: "#576B85" }}>{row.type}</td>
                  <td style={TD}>{row.users} {row.users === 1 ? "user" : "users"}</td>
                  <td style={TD}>
                    <button
                      className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                      style={{
                        background: "transparent",
                        border: "1px solid #000000",
                        borderRadius: "9999px",
                        padding: "6px 16px",
                        fontSize: "14px",
                        fontWeight: 500,
                        color: "#000000",
                        cursor: "pointer",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <Download style={{ width: "13px", height: "13px" }} />
                      Download report
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
