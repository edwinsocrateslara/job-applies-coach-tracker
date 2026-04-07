"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const SLUG = "ed-socrates";

// ─── Shared style constants (same as Overview page) ──────────────────────────

const CARD_STYLE: React.CSSProperties = {
  background: "var(--color-card)",
  borderRadius: "4px",
  padding: "16px 20px",
  boxShadow: "rgba(134, 135, 168, 0.1) 0px 4px 20px 0px",
};

const SECTION_HEADING: React.CSSProperties = {
  fontSize: "24px",
  fontWeight: 500,
  margin: 0,
};

const META_LABEL: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 600,
  textTransform: "uppercase" as const,
  letterSpacing: "0.05em",
  margin: "0 0 4px",
};

// ─── Sub-nav styles ───────────────────────────────────────────────────────────

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
  display: "inline-block",
  opacity: 0.6,
  cursor: "default",
};

// ─── Left column card with + button ──────────────────────────────────────────

function LeftCard({
  title,
  onAdd,
  children,
}: {
  title: string;
  onAdd: () => void;
  children?: React.ReactNode;
}) {
  return (
    <div style={CARD_STYLE}>
      <div className="flex items-start justify-between mb-2">
        <h2 className="text-card-foreground" style={SECTION_HEADING}>{title}</h2>
        {/* Spec: + icon button, --muted-foreground */}
        <button
          onClick={onAdd}
          className="text-muted-foreground hover:text-foreground transition-colors"
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: "2px" }}
          aria-label={`Add ${title}`}
        >
          <Plus style={{ width: "16px", height: "16px" }} />
        </button>
      </div>
      {children}
    </div>
  );
}

// ─── Circular progress ring (SVG) ────────────────────────────────────────────
// Spec: 56×56px, ring showing 66% filled, --primary for filled portion

function CircularProgress({ percent }: { percent: number }) {
  const r = 22;
  const cx = 28;
  const cy = 28;
  const circumference = 2 * Math.PI * r; // ≈ 138.2
  const filled = circumference * (percent / 100);
  const offset = circumference - filled;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <svg
        width="56"
        height="56"
        viewBox="0 0 56 56"
        style={{ transform: "rotate(-90deg)" }}
        aria-label={`${percent}% match`}
      >
        {/* Unfilled track — use --border */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="4"
        />
        {/* Filled arc — use --primary */}
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      {/* Percentage text centered — positioned over the SVG */}
      <div
        style={{
          position: "absolute",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "56px",
          height: "56px",
        }}
      >
        <span style={{ fontSize: "14px", fontWeight: 500 }} className="text-foreground">
          {percent}%
        </span>
      </div>
      {/* MATCH label — spec: uppercase, small, --muted-foreground */}
      <span
        className="text-muted-foreground"
        style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
      >
        MATCH
      </span>
    </div>
  );
}

// ─── Right column profile summary card ───────────────────────────────────────

function ProfileSummaryCard() {
  return (
    <div style={{ ...CARD_STYLE, width: "384px" }}>
      {/* Name */}
      <h2 className="text-foreground" style={{ fontSize: "24px", fontWeight: 500, margin: "0 0 4px" }}>
        Ed Socrates
      </h2>
      {/* Email */}
      <p className="text-foreground" style={{ fontSize: "14px", fontWeight: 400, margin: "0 0 2px", opacity: 0.8 }}>
        m.jones@coaching.com
      </p>
      {/* Location */}
      <p className="text-muted-foreground" style={{ fontSize: "14px", fontWeight: 400, margin: "0 0 20px" }}>
        Vancouver, BC
      </p>

      {/* TAGS */}
      <div style={{ marginBottom: "16px" }}>
        <p className="text-muted-foreground" style={META_LABEL}>TAGS</p>
        <p className="text-foreground" style={{ fontSize: "12px", fontWeight: 400, margin: 0 }}>Not Available</p>
      </div>

      {/* TARGET CAREER */}
      <div>
        <p className="text-muted-foreground" style={META_LABEL}>TARGET CAREER</p>
        <p className="text-foreground" style={{ fontSize: "16px", fontWeight: 500, margin: "0 0 16px" }}>
          Customer Service Manager
        </p>

        {/* Circular progress — 66% */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0" }}>
          <CircularProgress percent={66} />
        </div>
      </div>
    </div>
  );
}

// ─── Job Tracker data ─────────────────────────────────────────────────────────

const JOB_LANES: { label: string; jobs: { title: string; company: string; location: string }[] }[] = [
  {
    label: "Saved",
    jobs: [
      { title: "Marketing Coordinator",  company: "Shopify",  location: "Ottawa, ON, Canada"    },
      { title: "Operations Analyst",      company: "RBC",      location: "Toronto, ON, Canada"   },
    ],
  },
  {
    label: "Applied",
    jobs: [
      { title: "Customer Service Representative (02804) - 2504 N Water St", company: "Domino's", location: "Decatur, IL, USA"         },
      { title: "Administrative Assistant", company: "TD Bank",  location: "Toronto, ON, Canada"   },
      { title: "Data Entry Clerk",          company: "Telus",   location: "Vancouver, BC, Canada"  },
    ],
  },
  {
    label: "Interviewing",
    jobs: [
      { title: "Office Manager", company: "Bruce Telecom", location: "Owen Sound, ON, Canada" },
    ],
  },
  {
    label: "Hired",
    jobs: [],
  },
];

// ─── Job Card ─────────────────────────────────────────────────────────────────

function JobCard({ title, company, location }: { title: string; company: string; location: string }) {
  return (
    <div
      style={{
        background: "#FFFFFF",
        borderRadius: "6px",
        padding: "12px 14px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
        display: "flex",
        flexDirection: "column",
        gap: "2px",
      }}
    >
      {/* Title row with trash icon */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "#000022", margin: 0, lineHeight: "1.4" }}>
          {title}
        </p>
        <button
          style={{ background: "transparent", border: "none", cursor: "pointer", padding: "0", flexShrink: 0, marginTop: "1px" }}
          aria-label="Remove job"
        >
          <Trash2 style={{ width: "13px", height: "13px", color: "#8687A8" }} />
        </button>
      </div>
      {/* Company */}
      <p style={{ fontSize: "12px", fontWeight: 500, color: "#6B11F9", margin: 0 }}>{company}</p>
      {/* Location */}
      <p style={{ fontSize: "12px", fontWeight: 400, color: "#8687A8", margin: 0 }}>{location}</p>
      {/* See more link */}
      <a
        href="#"
        style={{ fontSize: "12px", fontWeight: 500, color: "#6B11F9", textDecoration: "none", marginTop: "6px", display: "inline-flex", alignItems: "center", gap: "2px" }}
      >
        See more ↗
      </a>
    </div>
  );
}

// ─── Add Service Modal ────────────────────────────────────────────────────────

function AddServiceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const currentYear = 2026;
  const years = Array.from({ length: 10 }, (_, i) => String(currentYear - i));

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add service</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">
              Title <span className="text-destructive">*</span>
            </label>
            <input
              type="text"
              placeholder="E.g. Training program"
              className="border border-border rounded px-3 py-2 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">Provider</label>
            <input
              type="text"
              placeholder="E.g. ABC Training Company"
              className="border border-border rounded px-3 py-2 text-sm bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground">
              Stage <span className="text-destructive">*</span>
            </label>
            <select className="border border-border rounded px-3 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option value="">Select stage</option>
              {["Assess","Explore","Learn","Work","Offboard"].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-3">
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium text-foreground">Start date</label>
              <div className="flex gap-2">
                <select className="border border-border rounded px-2 py-2 text-sm bg-card text-foreground flex-1 focus:outline-none">
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select className="border border-border rounded px-2 py-2 text-sm bg-card text-foreground flex-1 focus:outline-none">
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-1 flex-1">
              <label className="text-sm font-medium text-foreground">End date</label>
              <div className="flex gap-2">
                <select className="border border-border rounded px-2 py-2 text-sm bg-card text-foreground flex-1 focus:outline-none">
                  <option value="">Month</option>
                  {months.map(m => <option key={m} value={m}>{m}</option>)}
                </select>
                <select className="border border-border rounded px-2 py-2 text-sm bg-card text-foreground flex-1 focus:outline-none">
                  <option value="">Year</option>
                  {years.map(y => <option key={y} value={y}>{y}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={onClose}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Add Outcome Modal ────────────────────────────────────────────────────────

function AddOutcomeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add outcome</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Select a type below to continue the form entry with additional fields.
        </p>
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-foreground">
            Type <span className="text-destructive">*</span>
          </label>
          <select className="border border-border rounded px-3 py-2 text-sm bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20">
            <option value="">Select type</option>
            {["Employed","Education","Referral","Disengaged","Other"].map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <DialogFooter>
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={onClose}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Unsaved Changes Modal ────────────────────────────────────────────────────

function UnsavedChangesModal({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Unsaved changes</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Discarding before saving your note will result in the loss of any unsaved changes. Are you sure you want to continue?
        </p>
        <DialogFooter className="gap-2">
          <Button variant="outline" size="sm" onClick={onClose}>Cancel</Button>
          <Button size="sm" onClick={onConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function UserProgressPage() {
  const [noteText, setNoteText] = useState("");
  const [serviceModalOpen, setServiceModalOpen] = useState(false);
  const [outcomeModalOpen, setOutcomeModalOpen] = useState(false);
  const [unsavedModalOpen, setUnsavedModalOpen] = useState(false);

  function handleCancelNote() {
    if (noteText.trim()) {
      setUnsavedModalOpen(true);
    } else {
      setNoteText("");
    }
  }

  function handleConfirmDiscard() {
    setNoteText("");
    setUnsavedModalOpen(false);
  }

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
        <Link href="/manage/reports" style={mainInactiveStyle}>Reports</Link>
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

        {/* Profile sub-nav: Overview | Assessments | Roadmap | Progress* | Recommended | Job Tracker */}
        <nav
          className="flex items-end gap-7"
          style={{ borderBottom: "1px solid var(--color-border)", marginBottom: "24px" }}
        >
          <Link href={`/manage/users/${SLUG}/overview`} style={profileInactiveStyle}>Overview</Link>
          <span style={profileInactiveStyle}>Assessments</span>
          <span style={profileInactiveStyle}>Roadmap</span>
          <span style={profileActiveStyle}>Progress</span>
          <span style={profileInactiveStyle}>Recommended</span>
          <Link href={`/manage/users/${SLUG}/application-activity`} style={profileInactiveStyle}>Application Activity</Link>
        </nav>

        {/* ── Two-column layout ────────────────────────────────── */}
        {/* Spec: left 792px, right 384px, gap 24px, right column sticky */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>

          {/* ── Left column ──────────────────────────────────── */}
          <div style={{ flex: "0 0 792px", maxWidth: "792px", display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Services card */}
            <LeftCard title="Services" onAdd={() => setServiceModalOpen(true)}>
              <p className="text-muted-foreground" style={{ fontSize: "14px", margin: 0 }}>
                No services added.
              </p>
            </LeftCard>

            {/* Outcomes card */}
            <LeftCard title="Outcomes" onAdd={() => setOutcomeModalOpen(true)}>
              <p className="text-muted-foreground" style={{ fontSize: "14px", margin: 0 }}>
                No outcomes added.
              </p>
            </LeftCard>

            {/* Notes card */}
            <LeftCard title="Notes" onAdd={() => {}}>
              {/* Spec: textarea "Add a note...", Cancel (text), Add Note (primary pill) */}
              <div className="flex flex-col gap-2">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add a note..."
                  rows={3}
                  className="text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
                  style={{
                    width: "100%",
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "4px",
                    padding: "12px",
                    fontSize: "14px",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
                <div className="flex items-center justify-end gap-3">
                  {/* Spec: Cancel — text-only, --foreground */}
                  <button
                    onClick={handleCancelNote}
                    className="text-foreground hover:opacity-70 transition-opacity"
                    style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 400 }}
                  >
                    Cancel
                  </button>
                  {/* Spec: Add Note — --primary bg, white text, fully rounded pill */}
                  <button
                    className="hover:opacity-90 transition-opacity"
                    style={{
                      background: "var(--color-primary)",
                      color: "var(--color-primary-foreground)",
                      border: "none",
                      borderRadius: "9999px",
                      padding: "8px 20px",
                      fontSize: "14px",
                      fontWeight: 500,
                      cursor: "pointer",
                    }}
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </LeftCard>

            {/* Job tracker section */}
            <div>
              <h2 style={{ fontSize: "30px", fontWeight: 700, color: "#000022", margin: "0 0 16px" }}>
                Job tracker
              </h2>
              <div style={{ display: "flex", gap: "16px" }}>
                {JOB_LANES.map((lane) => (
                  <div
                    key={lane.label}
                    style={{
                      flex: 1,
                      background: "#EFEFF7",
                      borderRadius: "8px",
                      padding: "16px 14px",
                      minHeight: "450px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    <p style={{ fontSize: "15px", fontWeight: 600, color: "#000022", margin: "0 0 4px", paddingLeft: "6px" }}>
                      {lane.label}: {lane.jobs.length}
                    </p>
                    {lane.jobs.map((job, i) => (
                      <JobCard key={i} title={job.title} company={job.company} location={job.location} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right column — sticky profile summary ─────────── */}
          <div style={{ position: "sticky", top: "88px", flex: "0 0 384px" }}>
            <ProfileSummaryCard />
          </div>
        </div>
      </div>

      {/* ── Modals ────────────────────────────────────────────── */}
      <AddServiceModal open={serviceModalOpen} onClose={() => setServiceModalOpen(false)} />
      <AddOutcomeModal open={outcomeModalOpen} onClose={() => setOutcomeModalOpen(false)} />
      <UnsavedChangesModal
        open={unsavedModalOpen}
        onClose={() => setUnsavedModalOpen(false)}
        onConfirm={handleConfirmDiscard}
      />
    </div>
  );
}
