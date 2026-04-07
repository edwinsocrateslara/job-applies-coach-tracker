import Link from "next/link";
import { ChevronLeft, Pencil } from "lucide-react";

const SLUG = "ed-socrates";

// ─── Sub-nav styles (same as Overview / Progress) ─────────────────────────────

const mainActiveStyle: React.CSSProperties = {
  color: "var(--color-foreground)",
  fontWeight: 500,
  fontSize: "16px",
  borderBottom: "2px solid var(--color-primary)",
  paddingBottom: "8px",
  paddingTop: "8px",
  textDecoration: "none",
  display: "inline-block",
};

const mainInactiveStyle: React.CSSProperties = {
  color: "var(--color-foreground)",
  fontWeight: 400,
  fontSize: "16px",
  paddingBottom: "8px",
  paddingTop: "8px",
  textDecoration: "none",
  display: "inline-block",
  opacity: 0.6,
};

const profileActiveStyle: React.CSSProperties = {
  color: "var(--color-foreground)",
  fontWeight: 500,
  fontSize: "16px",
  borderBottom: "2px solid var(--color-primary)",
  paddingBottom: "8px",
  paddingTop: "8px",
  textDecoration: "none",
  display: "inline-block",
};

const profileInactiveStyle: React.CSSProperties = {
  color: "var(--color-foreground)",
  fontWeight: 400,
  fontSize: "16px",
  paddingBottom: "8px",
  paddingTop: "8px",
  textDecoration: "none",
  display: "inline-block",
  opacity: 0.6,
  cursor: "default",
};

// ─── Activity log data ────────────────────────────────────────────────────────

const activityLog = [
  { jobTitle: "Office Administrator",       employer: "County of Bruce",  status: "Applied", date: "Apr 1, 2025"  },
  { jobTitle: "Administrative Coordinator", employer: "Saugeen Shores",   status: "Applied", date: "Mar 28, 2025" },
  { jobTitle: "Receptionist",               employer: "Grey Bruce Health", status: "Applied", date: "Mar 22, 2025" },
  { jobTitle: "Data Entry Clerk",            employer: "Telus",            status: "Applied", date: "Mar 20, 2025" },
  { jobTitle: "Office Manager",             employer: "Bruce Telecom",     status: "Applied", date: "Mar 18, 2025" },
  { jobTitle: "Administrative Assistant",   employer: "TD Bank",           status: "Applied", date: "Mar 15, 2025" },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserJobTrackerPage() {
  return (
    <div className="flex flex-col flex-1" style={{ background: "var(--color-background)" }}>

      {/* ── Main sub-nav: Users | Links | Reports | Tags ───────── */}
      <nav
        className="flex items-end gap-7"
        style={{
          padding: "0 32px",
          borderBottom: "1px solid var(--color-border)",
          background: "var(--color-card)",
        }}
      >
        <Link href="/manage/users" style={mainActiveStyle}>Users</Link>
        <span style={mainInactiveStyle}>Links</span>
        <span style={mainInactiveStyle}>Reports</span>
        <span style={mainInactiveStyle}>Tags</span>
      </nav>

      {/* ── Content area ──────────────────────────────────────── */}
      <div style={{ padding: "24px 32px" }}>

        {/* Back link */}
        <Link
          href="/manage/users"
          className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity mb-4"
          style={{ fontSize: "16px", fontWeight: 400, textDecoration: "none", width: "fit-content" }}
        >
          <ChevronLeft style={{ width: "16px", height: "16px" }} />
          Back to search results
        </Link>

        {/* Profile sub-nav */}
        <nav
          className="flex items-end gap-7"
          style={{ borderBottom: "1px solid var(--color-border)", marginBottom: "24px" }}
        >
          <Link href={`/manage/users/${SLUG}/overview`} style={profileInactiveStyle}>Overview</Link>
          <span style={profileInactiveStyle}>Assessments</span>
          <span style={profileInactiveStyle}>Roadmap</span>
          <Link href={`/manage/users/${SLUG}/progress`} style={profileInactiveStyle}>Progress</Link>
          <span style={profileInactiveStyle}>Recommended</span>
          <span style={profileActiveStyle}>Job Tracker</span>
        </nav>

        {/* ── Activity log card ─────────────────────────────────── */}
        <div
          style={{
            width: "100%",
            maxWidth: "792px",
            background: "var(--color-card)",
            borderRadius: "4px",
            padding: "24px",
            boxShadow: "rgba(134, 135, 168, 0.1) 0px 4px 20px 0px",
          }}
        >
          {/* Heading */}
          <h2
            className="text-card-foreground"
            style={{ fontSize: "24px", fontWeight: 500, margin: "0 0 20px" }}
          >
            Activity log
          </h2>

          {/* Table */}
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                {["Job title", "Employer", "Status", "Date"].map((col) => (
                  <th
                    key={col}
                    className="text-muted-foreground"
                    style={{
                      textAlign: "left",
                      fontSize: "12px",
                      fontWeight: 500,
                      paddingBottom: "10px",
                      paddingRight: "24px",
                    }}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {activityLog.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom:
                      i < activityLog.length - 1
                        ? "1px solid var(--color-border)"
                        : "none",
                  }}
                >
                  {/* Job title — primary color link with pencil icon */}
                  <td style={{ padding: "16px 24px 16px 0" }}>
                    <span
                      className="flex items-center gap-1"
                      style={{
                        color: "var(--color-primary)",
                        fontSize: "14px",
                        fontWeight: 500,
                        cursor: "pointer",
                      }}
                    >
                      {row.jobTitle}
                      <Pencil style={{ width: "12px", height: "12px", flexShrink: 0 }} />
                    </span>
                  </td>
                  {/* Employer */}
                  <td
                    className="text-foreground"
                    style={{ padding: "16px 24px 16px 0", fontSize: "14px", fontWeight: 400 }}
                  >
                    {row.employer}
                  </td>
                  {/* Status */}
                  <td
                    className="text-foreground"
                    style={{ padding: "16px 24px 16px 0", fontSize: "14px", fontWeight: 400 }}
                  >
                    {row.status}
                  </td>
                  {/* Date */}
                  <td
                    className="text-muted-foreground"
                    style={{ padding: "16px 0 16px 0", fontSize: "14px", fontWeight: 400 }}
                  >
                    {row.date}
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
