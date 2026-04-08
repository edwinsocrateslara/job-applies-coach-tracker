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

// ─── Style constants ───────────────────────────────────────────────────────────

const CARD_STYLE: React.CSSProperties = {
  background: "var(--color-card)",
  borderRadius: "4px",
  padding: "16px 20px",
  boxShadow: "rgba(134, 135, 168, 0.1) 0px 4px 20px 0px",
};

const SECTION_HEADING: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#000022",
  margin: "0 0 8px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.04em",
};

const META_LABEL: React.CSSProperties = {
  fontSize: "12px",
  fontWeight: 400,
  color: "#8687A8",
};

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

// ─── Lane header accent colors ─────────────────────────────────────────────────

const LANE_COLORS: Record<string, string> = {
  Saved: "#6B11F9",
  Applied: "#0D9488",
  Interviewing: "#F59E0B",
  Hired: "#10B981",
};

// ─── Job data ─────────────────────────────────────────────────────────────────

const JOB_LANES = [
  {
    label: "Saved",
    jobs: [
      { title: "Marketing Coordinator", company: "Shopify", location: "Ottawa, ON, Canada" },
      { title: "Operations Analyst", company: "RBC", location: "Toronto, ON, Canada" },
    ],
  },
  {
    label: "Applied",
    jobs: [
      { title: "Customer Service Representative (02804) - 2504 N Water St", company: "Domino's", location: "Decatur, IL, USA" },
      { title: "Administrative Assistant", company: "TD Bank", location: "Toronto, ON, Canada" },
      { title: "Data Entry Clerk", company: "Telus", location: "Vancouver, BC, Canada" },
      { title: "Office Coordinator", company: "Shopify", location: "Ottawa, ON, Canada" },
      { title: "Client Services Associate", company: "RBC", location: "Toronto, ON, Canada" },
      { title: "Administrative Support Specialist", company: "Bell Canada", location: "Mississauga, ON, Canada" },
      { title: "Reception & Admin Coordinator", company: "Bruce Power", location: "Tiverton, ON, Canada" },
      { title: "Office Services Clerk", company: "Canada Post", location: "Ottawa, ON, Canada" },
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

const MAX_VISIBLE = 3;

// ─── Components ───────────────────────────────────────────────────────────────

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
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "8px" }}>
        <p style={{ fontSize: "13px", fontWeight: 600, color: "#000022", margin: 0, lineHeight: "1.4" }}>{title}</p>
        <button style={{ background: "transparent", border: "none", cursor: "pointer", padding: "0", flexShrink: 0, marginTop: "1px" }}>
          <Trash2 style={{ width: "13px", height: "13px", color: "#8687A8" }} />
        </button>
      </div>
      <p style={{ fontSize: "12px", fontWeight: 500, color: "#6B11F9", margin: 0 }}>{company}</p>
      <p style={{ fontSize: "12px", fontWeight: 400, color: "#8687A8", margin: 0 }}>{location}</p>
      <a href="#" style={{ fontSize: "12px", fontWeight: 500, color: "#6B11F9", textDecoration: "none", marginTop: "6px" }}>
        See more ↗
      </a>
    </div>
  );
}

function CircularProgress({ percent }: { percent: number }) {
  const r = 22;
  const cx = 28;
  const cy = 28;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - circumference * (percent / 100);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
      <svg
        width="56" height="56" viewBox="0 0 56 56"
        style={{ transform: "rotate(-90deg)" }}
        aria-label={`${percent}% match`}
      >
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--color-border)" strokeWidth="4" />
        <circle
          cx={cx} cy={cy} r={r} fill="none"
          stroke="var(--color-primary)" strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
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
      <span
        className="text-muted-foreground"
        style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
      >
        MATCH
      </span>
    </div>
  );
}

function ProfileSummaryCard() {
  return (
    <div style={{ ...CARD_STYLE, width: "384px" }}>
      <h2 className="text-foreground" style={{ fontSize: "24px", fontWeight: 500, margin: "0 0 4px" }}>
        Ed Socrates
      </h2>
      <p className="text-foreground" style={{ fontSize: "14px", fontWeight: 400, margin: "0 0 2px", opacity: 0.8 }}>
        m.jones@coaching.com
      </p>
      <p className="text-muted-foreground" style={{ fontSize: "14px", fontWeight: 400, margin: "0 0 20px" }}>
        Vancouver, BC
      </p>

      <div style={{ marginBottom: "16px" }}>
        <p className="text-muted-foreground" style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>TAGS</p>
        <p className="text-foreground" style={{ fontSize: "12px", fontWeight: 400, margin: 0 }}>Not Available</p>
      </div>

      <div>
        <p className="text-muted-foreground" style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 4px" }}>TARGET CAREER</p>
        <p className="text-foreground" style={{ fontSize: "16px", fontWeight: 500, margin: "0 0 16px" }}>
          Customer Service Manager
        </p>
        <div style={{ position: "relative", display: "flex", alignItems: "center", gap: "0" }}>
          <CircularProgress percent={66} />
        </div>
      </div>
    </div>
  );
}

function LeftCard({ title, onAdd, children }: { title: string; onAdd?: () => void; children?: React.ReactNode }) {
  return (
    <div style={CARD_STYLE}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
        <h3 style={SECTION_HEADING}>{title}</h3>
        {onAdd && (
          <button
            onClick={onAdd}
            style={{ background: "transparent", border: "none", cursor: "pointer", padding: "2px", color: "#6B11F9" }}
          >
            <Plus style={{ width: "16px", height: "16px" }} />
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProgressAPage() {
  const [addServiceOpen, setAddServiceOpen] = useState(false);
  const [addOutcomeOpen, setAddOutcomeOpen] = useState(false);
  const [noteText, setNoteText] = useState("");
  // Track which lanes are expanded (by label)
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  function toggleExpand(label: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(label)) next.delete(label);
      else next.add(label);
      return next;
    });
  }

  return (
    <div className="flex flex-col flex-1" style={{ background: "var(--color-background)" }}>

      {/* ── Top nav ───────────────────────────────────────────── */}
      <nav
        className="flex items-end gap-7"
        style={{ padding: "0 32px", borderBottom: "1px solid var(--color-border)", background: "var(--color-card)" }}
      >
        <Link href="/manage/users" style={mainActiveStyle}>Users</Link>
        <Link href="/manage/reports" style={mainInactiveStyle}>Reports</Link>
      </nav>

      {/* ── Content ───────────────────────────────────────────── */}
      <div style={{ padding: "24px 32px" }}>
        <Link
          href="/manage/users"
          className="flex items-center gap-1 text-primary hover:opacity-80 transition-opacity mb-4"
          style={{ fontSize: "16px", fontWeight: 400, textDecoration: "none", width: "fit-content" }}
        >
          <ChevronLeft style={{ width: "16px", height: "16px" }} />
          Back to search results
        </Link>

        {/* Profile sub-nav */}
        <nav className="flex items-end gap-7" style={{ borderBottom: "1px solid var(--color-border)", marginBottom: "24px" }}>
          <Link href={`/manage/users/${SLUG}/overview`} style={profileInactiveStyle}>Overview</Link>
          <span style={profileInactiveStyle}>Assessments</span>
          <span style={profileInactiveStyle}>Roadmap</span>
          <span style={profileActiveStyle}>Progress</span>
          <span style={profileInactiveStyle}>Recommended</span>
          <Link href={`/manage/users/${SLUG}/application-activity`} style={profileInactiveStyle}>Application Activity</Link>
        </nav>

        {/* Two-column layout */}
        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start" }}>

          {/* ── Left column ─────────────────────────────────────── */}
          <div style={{ flex: "0 0 792px", display: "flex", flexDirection: "column", gap: "16px" }}>

            {/* Services */}
            <LeftCard title="Services" onAdd={() => setAddServiceOpen(true)}>
              <p style={META_LABEL}>No services added.</p>
            </LeftCard>

            {/* Outcomes */}
            <LeftCard title="Outcomes" onAdd={() => setAddOutcomeOpen(true)}>
              <p style={META_LABEL}>No outcomes added.</p>
            </LeftCard>

            {/* Notes */}
            <LeftCard title="Notes">
              <div className="flex flex-col gap-2">
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="Add a note…"
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
                  <button
                    onClick={() => setNoteText("")}
                    className="text-foreground hover:opacity-70 transition-opacity"
                    style={{ background: "transparent", border: "none", cursor: "pointer", fontSize: "14px", fontWeight: 400 }}
                  >
                    Cancel
                  </button>
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

            {/* ── Job Tracker — Concept A ─────────────────────────── */}
            <div style={CARD_STYLE}>
              <h3 style={{ ...SECTION_HEADING, marginBottom: "16px" }}>Job Tracker</h3>
              <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                {JOB_LANES.map((lane) => {
                  const color = LANE_COLORS[lane.label];
                  const isExpanded = expanded.has(lane.label);
                  const overflow = lane.jobs.length - MAX_VISIBLE;
                  const visibleJobs = isExpanded ? lane.jobs : lane.jobs.slice(0, MAX_VISIBLE);
                  const hiddenCount = isExpanded ? 0 : Math.max(0, overflow);

                  return (
                    <div
                      key={lane.label}
                      style={{
                        flex: 1,
                        background: "#EFEFF7",
                        borderRadius: "6px",
                        padding: "12px 10px",
                        minHeight: "120px",
                      }}
                    >
                      {/* Column header */}
                      <p style={{ fontSize: "15px", fontWeight: 600, color: "#000022", margin: "0 0 4px", paddingLeft: "6px" }}>
                        {lane.label}: {lane.jobs.length}
                      </p>

                      {/* Visible job cards */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {visibleJobs.map((job, i) => (
                          <JobCard key={i} {...job} />
                        ))}
                      </div>

                      {/* Ghost stack + expand button (when collapsed and overflow exists) */}
                      {!isExpanded && hiddenCount > 0 && (
                        <div style={{ position: "relative", marginTop: "8px" }}>
                          {/* Ghost cards stacked behind */}
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: "4px",
                              right: "4px",
                              height: "32px",
                              background: "#FFFFFF",
                              borderRadius: "6px",
                              opacity: 0.25,
                              pointerEvents: "none",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: "8px",
                              right: "8px",
                              height: "32px",
                              background: "#FFFFFF",
                              borderRadius: "6px",
                              opacity: 0.12,
                              pointerEvents: "none",
                            }}
                          />
                          {/* "Show X more" pill button */}
                          <button
                            onClick={() => toggleExpand(lane.label)}
                            style={{
                              position: "relative",
                              zIndex: 1,
                              width: "100%",
                              background: "#6B11F9",
                              border: "none",
                              borderRadius: "9999px",
                              padding: "6px 12px",
                              fontSize: "12px",
                              fontWeight: 600,
                              color: "#FFFFFF",
                              cursor: "pointer",
                              textAlign: "center",
                              marginTop: "28px",
                            }}
                          >
                            Show {hiddenCount} More
                          </button>
                        </div>
                      )}

                      {/* "Show less" button when expanded */}
                      {isExpanded && overflow > 0 && (
                        <button
                          onClick={() => toggleExpand(lane.label)}
                          style={{
                            marginTop: "8px",
                            width: "100%",
                            background: "#6B11F9",
                            border: "none",
                            borderRadius: "9999px",
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: 600,
                            color: "#FFFFFF",
                            cursor: "pointer",
                            textAlign: "center",
                          }}
                        >
                          Show Less
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right column ────────────────────────────────────── */}
          <div style={{ flex: "0 0 384px", position: "sticky", top: "24px" }}>
            <ProfileSummaryCard />
          </div>
        </div>
      </div>

      {/* ── Add Service Modal ──────────────────────────────────── */}
      <Dialog open={addServiceOpen} onOpenChange={setAddServiceOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Add Service</DialogTitle></DialogHeader>
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: "12px", color: "#576B85" }}>Service Name</label>
            <input
              type="text"
              placeholder="Enter service…"
              style={{ border: "1px solid #C9CBE3", borderRadius: "6px", padding: "8px 12px", fontSize: "14px", outline: "none" }}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => setAddServiceOpen(false)}>Cancel</Button>
            <Button size="sm" className="rounded-full" onClick={() => setAddServiceOpen(false)}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Add Outcome Modal ──────────────────────────────────── */}
      <Dialog open={addOutcomeOpen} onOpenChange={setAddOutcomeOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader><DialogTitle>Add Outcome</DialogTitle></DialogHeader>
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: "12px", color: "#576B85" }}>Outcome</label>
            <input
              type="text"
              placeholder="Enter outcome…"
              style={{ border: "1px solid #C9CBE3", borderRadius: "6px", padding: "8px 12px", fontSize: "14px", outline: "none" }}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" className="rounded-full" onClick={() => setAddOutcomeOpen(false)}>Cancel</Button>
            <Button size="sm" className="rounded-full" onClick={() => setAddOutcomeOpen(false)}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
