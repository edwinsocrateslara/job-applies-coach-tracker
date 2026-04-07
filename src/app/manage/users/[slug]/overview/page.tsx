import Link from "next/link";
import { Pencil, ChevronLeft } from "lucide-react";

// slug used for prototype nav links
const SLUG = "ed-socrates";

// ─── Reusable Card ─────────────────────────────────────────────────────────
// Spec: width 792px, bg --card, border-radius 4px, padding 24px,
//       box-shadow rgba(134,135,168,0.1) 0px 4px 20px 0px

function Card({
  title,
  children,
  showEdit = true,
}: {
  title: string;
  children?: React.ReactNode;
  showEdit?: boolean;
}) {
  return (
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
      <div className="flex items-start justify-between mb-4">
        {/* Spec: section heading 24px, font-weight 500, --card-foreground */}
        <h2
          className="text-card-foreground"
          style={{ fontSize: "24px", fontWeight: 500, margin: 0 }}
        >
          {title}
        </h2>
        {showEdit && (
          // Spec: 16×16px pencil icon, transparent bg, --muted-foreground
          <button
            className="text-muted-foreground hover:text-foreground transition-colors"
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: "2px" }}
            aria-label="Edit"
          >
            <Pencil style={{ width: "16px", height: "16px" }} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Skill Chip ─────────────────────────────────────────────────────────────
// Spec: bg light cyan tint (color-mix from --chart-2), pill, 12px 500,
//       small colored underline bar, padding 3px 12px 5px

function SkillChip({ label }: { label: string }) {
  return (
    <span
      className="text-foreground"
      style={{
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "center",
        background: "color-mix(in oklch, var(--color-chart-2) 12%, white)",
        borderRadius: "100px",
        padding: "3px 12px 5px",
        fontSize: "12px",
        fontWeight: 500,
        border: "none",
        gap: "2px",
      }}
    >
      <span>{label}</span>
      {/* Spec: small colored underline/bar beneath the text */}
      <span
        style={{
          display: "block",
          height: "2px",
          width: "60%",
          borderRadius: "1px",
          background: "var(--color-chart-2)",
          opacity: 0.6,
        }}
      />
    </span>
  );
}

// ─── Q&A Pair ───────────────────────────────────────────────────────────────
// Spec: question 16px 500 --foreground, answer 12px 400 --muted-foreground,
//       divider 1px solid --border

function QAPair({
  question,
  answer,
  last = false,
}: {
  question: string;
  answer: string;
  last?: boolean;
}) {
  return (
    <>
      <div style={{ padding: "12px 0" }}>
        {/* Spec: question 16px, font-weight 500, --foreground */}
        <p className="text-foreground" style={{ fontSize: "16px", fontWeight: 500, margin: "0 0 4px" }}>
          {question}
        </p>
        {/* Spec: answer 12px, font-weight 400, --muted-foreground */}
        <p className="text-muted-foreground" style={{ fontSize: "12px", fontWeight: 400, margin: 0 }}>
          {answer}
        </p>
      </div>
      {/* Spec: divider 1px solid --border between pairs */}
      {!last && <hr className="border-border" style={{ margin: 0 }} />}
    </>
  );
}

// ─── Sub-nav (main tabs) ─────────────────────────────────────────────────────
// Reuses exact same style as users page

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
};

// ─── Profile sub-nav ────────────────────────────────────────────────────────
// Spec: Overview(active) | Assessments | Roadmap | Progress | Recommended | Job Tracker
// Active: 16px, 500, border-bottom 2px solid --primary, padding 8px 0
// Inactive: 16px, 400, padding 8px 0

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
  cursor: "default",
  opacity: 0.6,
};

// ─── Page ───────────────────────────────────────────────────────────────────

export default function UserOverviewPage() {
  const technicalSkills = [
    "Brand development",
    "Copywriting techniques",
    "Creative advertising strategies",
    "Customer Service",
    "Digital marketing skills",
    "Market research and analysis",
    "Scheduling",
  ];

  const foundationalSkills = [
    "Communication Skills",
    "Detail-Oriented",
    "Developing Relationships",
    "Organizational Skills",
    "Problem Solving",
    "Teamwork",
  ];

  const educationSkills = [
    "Creative advertising strategies",
    "Market research and analysis",
    "Copywriting techniques",
    "Brand development",
  ];

  const personalInfo = [
    { q: "What is your phone number?", a: "Not available" },
    { q: "When is your birthday (mm/dd/yyyy)?", a: "Not available" },
    { q: "What is your gender?", a: "Not available" },
    { q: "What ethnic group(s) do you identify with?", a: "Not Available" },
    { q: "What communities do you identify with?", a: "Not Available" },
    { q: "What is your highest level of education?", a: "Not available" },
    { q: "What is your current employment status?", a: "Not Available" },
    { q: "Industries", a: "Not available" },
  ];

  return (
    <div className="flex flex-col flex-1" style={{ background: "var(--color-background)" }}>

      {/* ── Main sub-nav: Users | Links | Reports | Tags ──────── */}
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

      {/* ── Content area ─────────────────────────────────────── */}
      <div style={{ padding: "24px 32px", display: "flex", flexDirection: "column", gap: "0" }}>

        {/* Spec: "← Back to search results", 16px 400, color --primary */}
        <Link
          href="/manage/users"
          className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity mb-4"
          style={{ fontSize: "16px", fontWeight: 400, textDecoration: "none" }}
        >
          <ChevronLeft style={{ width: "16px", height: "16px" }} />
          Back to search results
        </Link>

        {/* ── Profile sub-nav: Overview | Assessments | Roadmap | Progress | Recommended | Job Tracker */}
        <nav
          className="flex items-end gap-7"
          style={{
            borderBottom: "1px solid var(--color-border)",
            marginBottom: "24px",
          }}
        >
          <span style={profileActiveStyle}>Overview</span>
          <span style={profileInactiveStyle}>Assessments</span>
          <span style={profileInactiveStyle}>Roadmap</span>
          <Link href={`/manage/users/${SLUG}/progress`} style={profileInactiveStyle}>Progress</Link>
          <span style={profileInactiveStyle}>Recommended</span>
          <Link href={`/manage/users/${SLUG}/application-activity`} style={profileInactiveStyle}>Application Activity</Link>
        </nav>

        {/* ── Cards stack ──────────────────────────────────────── */}
        <div className="flex flex-col gap-4">

          {/* ── 1. Profile Card ─────────────────────────────── */}
          <Card title="" showEdit={true}>
            <div className="flex items-start justify-between">
              <div className="flex flex-col gap-1">
                {/* Spec: name 24px, 500, --foreground */}
                <h1
                  className="text-foreground"
                  style={{ fontSize: "24px", fontWeight: 500, margin: 0 }}
                >
                  Ed Socrates
                </h1>
                {/* Spec: email 14px, 400, --foreground */}
                <p
                  className="text-foreground"
                  style={{ fontSize: "14px", fontWeight: 400, margin: 0, opacity: 0.8 }}
                >
                  m.jones@coaching.com
                </p>
                {/* Spec: location 14px, 400, --muted-foreground */}
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "14px", fontWeight: 400, margin: 0 }}
                >
                  Vancouver, BC
                </p>
              </div>
              <button
                className="text-muted-foreground hover:text-foreground transition-colors"
                style={{ background: "transparent", border: "none", cursor: "pointer", padding: "2px" }}
                aria-label="Edit profile"
              >
                <Pencil style={{ width: "16px", height: "16px" }} />
              </button>
            </div>

            <div className="flex flex-col gap-3 mt-5">
              {/* TAGS section */}
              <div>
                {/* Spec: section labels 10px, 600, uppercase, --muted-foreground */}
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", margin: "0 0 4px", letterSpacing: "0.05em" }}
                >
                  TAGS
                </p>
                {/* Spec: label values 12px, 400 */}
                <p style={{ fontSize: "12px", fontWeight: 400, margin: 0 }} className="text-foreground">
                  Not Available
                </p>
              </div>

              {/* INSTANCES section */}
              <div>
                <p
                  className="text-muted-foreground"
                  style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", margin: "0 0 4px", letterSpacing: "0.05em" }}
                >
                  INSTANCES
                </p>
                <p style={{ fontSize: "12px", fontWeight: 400, margin: 0 }} className="text-foreground">
                  FFAI
                </p>
              </div>
            </div>
          </Card>

          {/* ── 2. Skills Card ───────────────────────────────── */}
          <Card title="Skills">
            <div className="flex flex-col gap-5">
              {/* Technical */}
              <div>
                {/* Spec: sub-heading h3, 14px, 500, --foreground */}
                <h3
                  className="text-foreground"
                  style={{ fontSize: "14px", fontWeight: 500, margin: "0 0 10px" }}
                >
                  Technical
                </h3>
                <div className="flex flex-wrap gap-2">
                  {technicalSkills.map((s) => <SkillChip key={s} label={s} />)}
                </div>
              </div>

              {/* Foundational */}
              <div>
                <h3
                  className="text-foreground"
                  style={{ fontSize: "14px", fontWeight: 500, margin: "0 0 10px" }}
                >
                  Foundational
                </h3>
                <div className="flex flex-wrap gap-2">
                  {foundationalSkills.map((s) => <SkillChip key={s} label={s} />)}
                </div>
              </div>
            </div>
          </Card>

          {/* ── 3. Work Experience Card (empty) ──────────────── */}
          <Card title="Work Experience">
            <p className="text-muted-foreground" style={{ fontSize: "14px", margin: 0 }}>
              No work experience added.
            </p>
          </Card>

          {/* ── 4. Education Experience Card ─────────────────── */}
          <Card title="Education Experience">
            <div className="flex flex-col gap-2">
              <p
                className="text-foreground"
                style={{ fontSize: "14px", fontWeight: 500, margin: 0 }}
              >
                Advertising
              </p>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "14px", fontWeight: 400, margin: 0 }}
              >
                {"Bachelor's Degree (or equivalent)"}
              </p>
              <p
                className="text-muted-foreground"
                style={{ fontSize: "14px", fontWeight: 400, margin: 0 }}
              >
                2026 – Current
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {educationSkills.map((s) => <SkillChip key={s} label={s} />)}
                {/* +1 more chip */}
                <span
                  className="text-muted-foreground"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    background: "var(--color-muted)",
                    borderRadius: "100px",
                    padding: "3px 12px 5px",
                    fontSize: "12px",
                    fontWeight: 500,
                    border: "none",
                  }}
                >
                  +1
                </span>
              </div>
            </div>
          </Card>

          {/* ── 5. Credentials and Licenses Card (empty) ─────── */}
          <Card title="Credentials and Licenses">
            <p className="text-muted-foreground" style={{ fontSize: "14px", margin: 0 }}>
              No credentials added.
            </p>
          </Card>

          {/* ── 6. Personal Information Card ─────────────────── */}
          <Card title="Personal information">
            <div>
              {personalInfo.map((item, i) => (
                <QAPair
                  key={item.q}
                  question={item.q}
                  answer={item.a}
                  last={i === personalInfo.length - 1}
                />
              ))}
            </div>
          </Card>

          {/* ── 7. Custom Registration Questions (no edit icon) ─ */}
          <Card title="Custom Registration Questions" showEdit={false}>
            <p className="text-muted-foreground" style={{ fontSize: "14px", margin: 0 }}>
              No custom questions added.
            </p>
          </Card>

        </div>
      </div>
    </div>
  );
}
