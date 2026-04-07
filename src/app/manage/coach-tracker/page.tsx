import Link from "next/link";
import { CoachTrackerContent } from "@/components/manage/coach-tracker";

const activeStyle = {
  color: "#000000",
  fontWeight: 500,
  fontSize: "16px",
  borderBottom: "2px solid #6B11F9",
  paddingBottom: "8px",
  paddingTop: "8px",
  textDecoration: "none",
  display: "inline-block",
};

const inactiveStyle = {
  color: "#000000",
  fontWeight: 400,
  fontSize: "16px",
  paddingBottom: "8px",
  paddingTop: "8px",
  textDecoration: "none",
  display: "inline-block",
};

export default function CoachTrackerPage() {
  return (
    <div className="flex flex-col flex-1" style={{ background: "#FFFFFF" }}>
      <nav
        className="flex items-end gap-7"
        style={{ padding: "0 32px", borderBottom: "1px solid #C9CBE3" }}
      >
        <Link href="/manage/users" style={inactiveStyle}>Users</Link>
        <Link href="/manage/links" style={inactiveStyle}>Links</Link>
        <Link href="/manage/reports" style={inactiveStyle}>Reports</Link>
        <Link href="/manage/tags" style={inactiveStyle}>Tags</Link>
        <Link href="/manage/coach-tracker" style={activeStyle}>Coach Tracker</Link>
      </nav>

      <div style={{ padding: "32px" }}>
        <CoachTrackerContent />
      </div>
    </div>
  );
}
