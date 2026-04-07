"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Plus, Tag, Users, MoreHorizontal, Trash2, X, FileDown } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MOCK_USERS, type User, type Role } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

// Spec role badge colors
const ROLE_BADGE: Record<Role, { bg: string; color: string }> = {
  User:          { bg: "#E1FAEC", color: "#297373" },
  Client:        { bg: "#E1FAEC", color: "#297373" },
  Coach:         { bg: "#f4ecfe", color: "#6B11F9" },
  Admin:         { bg: "#FFE5B7", color: "#FF6600" },
  "Super Admin": { bg: "#FFE5B7", color: "#FF6600" },
};

type SortKey = "name" | "role" | "dateCreated";
type SortDir = "asc" | "desc";

// Spec: table cell font-size 14px, font-weight 500, color #000000, padding 20px 24px
const TD: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#000000",
  padding: "20px 24px",
  verticalAlign: "middle",
};

// Spec: th font-size 14px, font-weight 500, color #000000, padding 16px 24px, bg #EFEFF7
const TH: React.CSSProperties = {
  fontSize: "14px",
  fontWeight: 500,
  color: "#000000",
  padding: "16px 24px",
  background: "#EFEFF7",
  whiteSpace: "nowrap",
};

export function UsersTable() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [sortKey, setSortKey] = useState<SortKey>("dateCreated");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [removeCoachOpen, setRemoveCoachOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  const sorted = [...MOCK_USERS].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "name") {
      cmp = `${a.firstName} ${a.lastName}`.localeCompare(`${b.firstName} ${b.lastName}`);
    } else if (sortKey === "role") {
      cmp = a.role.localeCompare(b.role);
    } else if (sortKey === "dateCreated") {
      cmp = new Date(a.dateCreated).getTime() - new Date(b.dateCreated).getTime();
    }
    return sortDir === "asc" ? cmp : -cmp;
  });

  const allSelected = sorted.length > 0 && sorted.every((u) => selected.has(u.id));
  const someSelected = selected.size > 0;

  function toggleAll() {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(sorted.map((u) => u.id)));
  }

  function toggleOne(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  }

  function SortIcon({ col }: { col: SortKey }) {
    const active = sortKey === col;
    return (
      <ChevronDown
        style={{ width: "12px", height: "12px", marginLeft: "4px", display: "inline", opacity: active ? 1 : 0.4 }}
        className={cn(active && sortDir === "asc" ? "rotate-180" : "")}
      />
    );
  }

  const displayName = (u: User) => {
    const name = `${u.firstName} ${u.lastName}`.trim();
    return name || "—";
  };

  return (
    <div className="flex flex-col">

      {/* ── Action bar ────────────────────────────────────────── */}
      <div
        className="flex items-center gap-4"
        style={{ padding: "12px 32px", borderBottom: "1px solid #EFEFF7" }}
      >
        <span style={{ fontSize: "14px", color: "#576B85", marginRight: "4px" }}>
          {MOCK_USERS.length} users
        </span>

        <button
          className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
          style={{
            background: "transparent",
            color: "#000000",
            border: "1px solid #000000",
            borderRadius: "9999px",
            fontSize: "14px",
            fontWeight: 500,
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          <Plus style={{ width: "14px", height: "14px" }} />
          Invite coach
        </button>

        <button
          disabled
          className="flex items-center gap-1.5"
          style={{ color: "#576B85", fontSize: "14px", cursor: "default", opacity: 0.6 }}
        >
          <Tag style={{ width: "14px", height: "14px" }} />
          Assign tag
        </button>

        <button
          disabled
          className="flex items-center gap-1.5"
          style={{ color: "#576B85", fontSize: "14px", cursor: "default", opacity: 0.6 }}
        >
          <Users style={{ width: "14px", height: "14px" }} />
          Manage coach
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex items-center gap-1 hover:opacity-70 transition-opacity"
            style={{ fontSize: "14px", color: "#000022" }}
          >
            More
            <ChevronDown style={{ width: "14px", height: "14px" }} />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem className="text-sm gap-2" onClick={() => setExportOpen(true)}>
              <FileDown className="w-3.5 h-3.5" /> Export
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-sm gap-2 text-destructive"
              disabled={!someSelected}
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 className="w-3.5 h-3.5" /> Delete selected
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-sm gap-2"
              disabled={!someSelected}
              onClick={() => setRemoveCoachOpen(true)}
            >
              <X className="w-3.5 h-3.5" /> Remove coach assignment
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Pagination — far right */}
        <div
          className="flex items-center gap-2 ml-auto"
          style={{ fontSize: "14px", color: "#576B85" }}
        >
          <span>1-{MOCK_USERS.length} of {MOCK_USERS.length}</span>
          <button
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "#576B85", padding: "2px 4px", fontSize: "16px", lineHeight: 1 }}
          >
            ←
          </button>
          <button
            style={{ background: "transparent", border: "none", cursor: "pointer", color: "#576B85", padding: "2px 4px", fontSize: "16px", lineHeight: 1 }}
          >
            →
          </button>
        </div>
      </div>

      {/* ── Table ─────────────────────────────────────────────── */}
      <div className="overflow-x-auto">
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ ...TH, width: "60px", padding: "16px 24px" }}>
                <div className="flex items-center gap-0.5">
                  <Checkbox
                    checked={allSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                  />
                  <ChevronDown style={{ width: "12px", height: "12px", color: "#8687A8" }} />
                </div>
              </th>
              <th style={{ ...TH, cursor: "pointer" }} onClick={() => handleSort("name")}>
                Name <SortIcon col="name" />
              </th>
              <th style={{ ...TH, cursor: "pointer" }} onClick={() => handleSort("role")}>
                Role <SortIcon col="role" />
              </th>
              <th style={TH}>Coach</th>
              <th style={TH}>
                Email <ChevronDown style={{ width: "12px", height: "12px", marginLeft: "4px", display: "inline", opacity: 0.4 }} />
              </th>
              <th style={TH}>
                Location <ChevronDown style={{ width: "12px", height: "12px", marginLeft: "4px", display: "inline", opacity: 0.4 }} />
              </th>
              <th style={TH}>Postal Code</th>
              <th style={{ ...TH, cursor: "pointer" }} onClick={() => handleSort("dateCreated")}>
                Date Created <SortIcon col="dateCreated" />
              </th>
              <th style={TH}>Date Assigned</th>
              <th style={TH}>Group/Employer</th>
              <th style={TH}>Tag</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((user) => {
              const isSelected = selected.has(user.id);
              const badge = ROLE_BADGE[user.role];
              return (
                <tr
                  key={user.id}
                  onClick={() => toggleOne(user.id)}
                  style={{
                    height: "80px",
                    background: isSelected ? "#F4ECFE" : "#FFFFFF",
                    borderBottom: "1px solid #F1F6FB",
                    cursor: "pointer",
                    transition: "background 0.1s",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = "#FAFAFA";
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) (e.currentTarget as HTMLTableRowElement).style.background = "#FFFFFF";
                  }}
                >
                  {/* Checkbox */}
                  <td style={{ ...TD, width: "60px" }}>
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleOne(user.id)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`Select ${displayName(user)}`}
                    />
                  </td>

                  {/* Name — Ed Socrates (id "2") links to his overview page */}
                  <td style={TD} onClick={(e) => e.stopPropagation()}>
                    {user.id === "2" ? (
                      <Link
                        href="/manage/users/ed-socrates/overview"
                        style={{ color: "#000000", textDecoration: "none", fontWeight: 500 }}
                        className="hover:underline"
                      >
                        {displayName(user)}
                      </Link>
                    ) : (
                      displayName(user)
                    )}
                  </td>

                  {/* Role badge */}
                  <td style={TD}>
                    <span
                      className="inline-flex items-center gap-1"
                      style={{
                        background: badge.bg,
                        color: badge.color,
                        padding: "3px 10px",
                        borderRadius: "9999px",
                        fontSize: "13px",
                        fontWeight: 500,
                        cursor: "default",
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {user.role}
                      <ChevronDown style={{ width: "11px", height: "11px", opacity: 0.7 }} />
                    </span>
                  </td>

                  {/* Coach — + button, filled/purple if already a Coach */}
                  <td style={TD}>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "9999px",
                        border: user.role === "Coach" ? "none" : "1px solid #C9CBE3",
                        background: user.role === "Coach" ? "#6B11F9" : "transparent",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        flexShrink: 0,
                      }}
                      title={user.role === "Coach" ? "Already a coach" : "Designate as coach"}
                    >
                      <Plus style={{ width: "12px", height: "12px", color: user.role === "Coach" ? "#ffffff" : "#8687A8" }} />
                    </button>
                  </td>

                  {/* Email */}
                  <td style={{ ...TD, maxWidth: "220px" }}>
                    <span style={{ display: "block", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {user.email}
                    </span>
                  </td>

                  {/* Location */}
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>{user.location ?? "—"}</td>

                  {/* Postal Code */}
                  <td style={{ ...TD, color: user.postalCode ? "#000000" : "#8687A8" }}>
                    {user.postalCode ?? "—"}
                  </td>

                  {/* Date Created */}
                  <td style={{ ...TD, whiteSpace: "nowrap" }}>{user.dateCreated}</td>

                  {/* Date Assigned */}
                  <td style={{ ...TD, whiteSpace: "nowrap", color: user.dateAssigned ? "#000000" : "#8687A8" }}>
                    {user.dateAssigned ?? "—"}
                  </td>

                  {/* Group/Employer */}
                  <td style={{ ...TD, color: user.group ? "#000000" : "#8687A8" }}>
                    {user.group ?? "—"}
                  </td>

                  {/* Tag */}
                  <td style={{ ...TD, color: user.tag ? "#000000" : "#8687A8" }}>
                    {user.tag ?? "—"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* ── Delete Modal ──────────────────────────────────────── */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delete {selected.size} users?</DialogTitle>
          </DialogHeader>
          <p className="text-sm" style={{ color: "#576B85" }}>This action cannot be undone.</p>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setDeleteOpen(false)}>Cancel</Button>
            <Button variant="destructive" size="sm" onClick={() => { setSelected(new Set()); setDeleteOpen(false); }}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Remove Coach Modal ────────────────────────────────── */}
      <Dialog open={removeCoachOpen} onOpenChange={setRemoveCoachOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Remove Coach assignment from {selected.size} users?</DialogTitle>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setRemoveCoachOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setRemoveCoachOpen(false)}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Export Modal ──────────────────────────────────────── */}
      <Dialog open={exportOpen} onOpenChange={setExportOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Export</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2">
            <label style={{ fontSize: "12px", color: "#576B85" }}>Report name</label>
            <input
              type="text"
              placeholder="My report"
              style={{
                border: "1px solid #C9CBE3",
                borderRadius: "6px",
                padding: "8px 12px",
                fontSize: "14px",
                outline: "none",
              }}
            />
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" size="sm" onClick={() => setExportOpen(false)}>Cancel</Button>
            <Button size="sm" onClick={() => setExportOpen(false)}>Create report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
