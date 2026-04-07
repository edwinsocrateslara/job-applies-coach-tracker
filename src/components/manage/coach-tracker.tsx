"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ChevronsUpDown, TrendingUp, Users, BarChart2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MOCK_COACHES, MOCK_USERS } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

type SortKey = "name" | "assignedUsers" | "totalApplies" | "avgApplies";
type SortDir = "asc" | "desc";

export function CoachTrackerContent() {
  const [sortKey, setSortKey] = useState<SortKey>("totalApplies");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selectedCoach, setSelectedCoach] = useState<string | null>(null);

  const sorted = [...MOCK_COACHES].sort((a, b) => {
    let cmp = 0;
    if (sortKey === "name") cmp = a.name.localeCompare(b.name);
    else if (sortKey === "assignedUsers") cmp = a.assignedUsers - b.assignedUsers;
    else if (sortKey === "totalApplies") cmp = a.totalApplies - b.totalApplies;
    else if (sortKey === "avgApplies") cmp = a.avgApplies - b.avgApplies;
    return sortDir === "asc" ? cmp : -cmp;
  });

  function handleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("desc"); }
  }

  function SortIcon({ col }: { col: SortKey }) {
    if (sortKey !== col) return <ChevronsUpDown className="w-3 h-3 ml-1 opacity-40" />;
    return sortDir === "asc"
      ? <ChevronUp className="w-3 h-3 ml-1" />
      : <ChevronDown className="w-3 h-3 ml-1" />;
  }

  // Summary stats
  const totalUsers = MOCK_USERS.filter((u) => u.role === "User").length;
  const totalApplies = MOCK_USERS.filter((u) => u.role === "User").reduce((s, u) => s + u.jobAppliesCount, 0);
  const totalCoaches = MOCK_COACHES.length;

  // Users for selected coach (mock: just show all users with applies > 0 as sample)
  const drillUsers = selectedCoach
    ? MOCK_USERS.filter((u) => u.role === "User").slice(0, 6)
    : [];

  return (
    <div className="flex flex-col gap-6">
      {/* Stats summary */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard
          icon={<Users className="w-4 h-4 text-primary" />}
          label="Total Coaches"
          value={totalCoaches}
        />
        <StatCard
          icon={<Users className="w-4 h-4 text-blue-600" />}
          label="Total Users"
          value={totalUsers}
        />
        <StatCard
          icon={<TrendingUp className="w-4 h-4 text-green-600" />}
          label="Total Job Applies"
          value={totalApplies}
        />
      </div>

      <div className="flex gap-6 items-start">
        {/* Coach table */}
        <div className="flex-1 flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-primary" />
            Coach Performance — Job Applies Visibility
          </h2>
          <p className="text-xs text-muted-foreground">
            Click a coach row to see their users&apos; apply activity.
          </p>
          <div className="border border-border rounded-sm bg-white overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/40 hover:bg-muted/40">
                  <TableHead
                    className="text-xs font-semibold cursor-pointer select-none"
                    onClick={() => handleSort("name")}
                  >
                    <span className="flex items-center">Coach <SortIcon col="name" /></span>
                  </TableHead>
                  <TableHead
                    className="text-xs font-semibold cursor-pointer select-none whitespace-nowrap"
                    onClick={() => handleSort("assignedUsers")}
                  >
                    <span className="flex items-center">Assigned Users <SortIcon col="assignedUsers" /></span>
                  </TableHead>
                  <TableHead
                    className="text-xs font-semibold cursor-pointer select-none whitespace-nowrap text-primary"
                    onClick={() => handleSort("totalApplies")}
                  >
                    <span className="flex items-center">Total Job Applies <SortIcon col="totalApplies" /></span>
                  </TableHead>
                  <TableHead
                    className="text-xs font-semibold cursor-pointer select-none whitespace-nowrap"
                    onClick={() => handleSort("avgApplies")}
                  >
                    <span className="flex items-center">Avg Applies/User <SortIcon col="avgApplies" /></span>
                  </TableHead>
                  <TableHead className="text-xs font-semibold">Activity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sorted.map((coach) => {
                  const isSelected = selectedCoach === coach.id;
                  const activityLevel =
                    coach.avgApplies >= 20 ? "high" :
                    coach.avgApplies >= 12 ? "medium" : "low";
                  return (
                    <TableRow
                      key={coach.id}
                      className={cn(
                        "cursor-pointer border-b border-border/60 transition-colors",
                        isSelected ? "bg-primary/5" : "bg-white hover:bg-muted/40"
                      )}
                      onClick={() => setSelectedCoach(isSelected ? null : coach.id)}
                    >
                      <TableCell className="text-xs font-medium">{coach.name}</TableCell>
                      <TableCell className="text-xs text-center">{coach.assignedUsers}</TableCell>
                      <TableCell className="text-xs font-semibold text-center">
                        <span className="inline-flex items-center justify-center w-10 h-6 rounded-sm bg-primary/10 text-primary font-semibold text-xs">
                          {coach.totalApplies}
                        </span>
                      </TableCell>
                      <TableCell className="text-xs text-center">{coach.avgApplies.toFixed(1)}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] font-medium px-1.5 py-0",
                            activityLevel === "high" ? "bg-green-50 text-green-700 border-green-200" :
                            activityLevel === "medium" ? "bg-amber-50 text-amber-700 border-amber-200" :
                            "bg-gray-50 text-gray-500 border-gray-200"
                          )}
                        >
                          {activityLevel === "high" ? "High" : activityLevel === "medium" ? "Medium" : "Low"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Drill-down panel */}
        {selectedCoach && (
          <div className="w-80 shrink-0 flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-foreground">
              Users under {sorted.find((c) => c.id === selectedCoach)?.name}
            </h3>
            <p className="text-xs text-muted-foreground">Showing sample users with apply counts.</p>
            <div className="border border-border rounded-sm bg-white">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40 hover:bg-muted/40">
                    <TableHead className="text-xs font-semibold">User</TableHead>
                    <TableHead className="text-xs font-semibold text-primary whitespace-nowrap">Job Applies</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {drillUsers.map((u) => (
                    <TableRow key={u.id} className="border-b border-border/60">
                      <TableCell className="text-xs">
                        {`${u.firstName} ${u.lastName}`.trim() || <span className="italic text-muted-foreground">—</span>}
                      </TableCell>
                      <TableCell className="text-xs font-semibold text-center">
                        <span
                          className={cn(
                            "inline-flex items-center justify-center w-8 h-5 rounded-sm text-xs font-semibold",
                            u.jobAppliesCount === 0
                              ? "text-muted-foreground"
                              : u.jobAppliesCount >= 20
                              ? "bg-green-100 text-green-700"
                              : "bg-blue-50 text-blue-700"
                          )}
                        >
                          {u.jobAppliesCount}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-white border border-border rounded-sm p-4 flex items-center gap-3">
      <div className="p-2 rounded-sm bg-muted">{icon}</div>
      <div>
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="text-xl font-bold text-foreground">{value.toLocaleString()}</div>
      </div>
    </div>
  );
}
