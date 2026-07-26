"use client";

import { Fragment, useMemo, useState } from "react";

export type LeadStatus = "NEW" | "IN_PROGRESS" | "CLOSED";

export interface Lead {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
  industry: string | null;
  service: string | null;
  budget: string | null;
  message: string;
  sourcePage: string | null;
  status: LeadStatus;
  notes: string | null;
  createdAt: string;
}

const STATUS_META: Record<LeadStatus, { label: string; cls: string }> = {
  NEW:         { label: "New",         cls: "bg-[var(--color-navy)] text-white" },
  IN_PROGRESS: { label: "In Progress", cls: "bg-amber-100 text-amber-800" },
  CLOSED:      { label: "Closed",      cls: "bg-green-100 text-green-700" },
};

const STATUS_ORDER: LeadStatus[] = ["NEW", "IN_PROGRESS", "CLOSED"];

function csvEscape(v: string | null): string {
  const s = v ?? "";
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export default function ContactsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"ALL" | LeadStatus>("ALL");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((l) => {
      if (statusFilter !== "ALL" && l.status !== statusFilter) return false;
      if (!q) return true;
      return (
        l.name.toLowerCase().includes(q) ||
        l.email.toLowerCase().includes(q) ||
        (l.company ?? "").toLowerCase().includes(q)
      );
    });
  }, [leads, query, statusFilter]);

  async function patchLead(id: string, data: { status?: LeadStatus; notes?: string | null; read?: boolean }) {
    setBusyId(id);
    setError(null);
    const prev = leads;
    // optimistic update
    setLeads((cur) => cur.map((l) => (l.id === id ? { ...l, ...data } as Lead : l)));
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Update failed");
    } catch {
      setLeads(prev); // rollback
      setError("Could not save changes. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  async function deleteLead(id: string) {
    if (!confirm("Delete this lead permanently? This cannot be undone.")) return;
    setBusyId(id);
    setError(null);
    const prev = leads;
    setLeads((cur) => cur.filter((l) => l.id !== id));
    try {
      const res = await fetch(`/api/admin/contacts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
    } catch {
      setLeads(prev); // rollback
      setError("Could not delete lead. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  function exportCsv() {
    const headers = ["Name", "Company", "Email", "Phone", "Industry", "Service", "Budget", "Message", "Source Page", "Status", "Notes", "Date"];
    const rows = filtered.map((l) => [
      l.name, l.company, l.email, l.phone, l.industry, l.service, l.budget,
      l.message, l.sourcePage, STATUS_META[l.status].label, l.notes,
      new Date(l.createdAt).toISOString(),
    ].map(csvEscape).join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([`﻿${csv}`], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, or company…"
            className="w-full sm:max-w-xs px-4 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)]"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as "ALL" | LeadStatus)}
            className="px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)]"
          >
            <option value="ALL">All statuses</option>
            {STATUS_ORDER.map((s) => (
              <option key={s} value={s}>{STATUS_META[s].label}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[var(--color-muted)]">{filtered.length} of {leads.length}</span>
          <button
            onClick={exportCsv}
            disabled={!filtered.length}
            className="px-4 py-2 rounded-[var(--radius-md)] bg-[var(--color-navy)] text-white text-sm font-semibold hover:bg-[var(--color-navy-bright)] transition-colors disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-500" role="alert">{error}</p>}

      {/* Table */}
      <div className="rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-background)] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[var(--color-off-white)] border-b border-[var(--color-border)]">
            <tr>
              {["Name", "Email", "Service", "Budget", "Date", "Status", ""].map((h, i) => (
                <th key={i} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {filtered.map((l) => (
              <Fragment key={l.id}>
                <tr className="hover:bg-[var(--color-off-white)] transition-colors align-top">
                  <td className="px-4 py-3 font-medium text-[var(--color-navy)]">
                    <button onClick={() => setExpanded(expanded === l.id ? null : l.id)} className="text-left hover:underline">
                      {l.name}
                    </button>
                    {l.company && <p className="text-xs text-[var(--color-muted)] font-normal">{l.company}</p>}
                  </td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{l.email}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{l.service ?? "—"}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)]">{l.budget ?? "—"}</td>
                  <td className="px-4 py-3 text-[var(--color-muted)] whitespace-nowrap">{new Date(l.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <select
                      value={l.status}
                      disabled={busyId === l.id}
                      onChange={(e) => patchLead(l.id, { status: e.target.value as LeadStatus })}
                      className={`px-2 py-1 rounded-full text-[11px] font-semibold border-0 focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)] cursor-pointer ${STATUS_META[l.status].cls}`}
                    >
                      {STATUS_ORDER.map((s) => (
                        <option key={s} value={s} className="bg-white text-[var(--color-foreground)]">{STATUS_META[s].label}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => setExpanded(expanded === l.id ? null : l.id)}
                      className="text-xs font-semibold text-[var(--color-navy)] hover:text-[var(--color-navy-bright)] mr-3"
                    >
                      {expanded === l.id ? "Hide" : "View"}
                    </button>
                    <button
                      onClick={() => deleteLead(l.id)}
                      disabled={busyId === l.id}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                {expanded === l.id && (
                  <tr className="bg-[var(--color-off-white)]">
                    <td colSpan={7} className="px-4 py-5">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 text-sm">
                          <Detail label="Phone" value={l.phone} />
                          <Detail label="Industry" value={l.industry} />
                          <Detail label="Source Page" value={l.sourcePage} />
                          <Detail label="Submitted" value={new Date(l.createdAt).toLocaleString()} />
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Message</p>
                            <p className="mt-1 text-[var(--color-foreground)] whitespace-pre-wrap">{l.message}</p>
                          </div>
                        </div>
                        <div>
                          <label htmlFor={`notes-${l.id}`} className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">Internal Notes</label>
                          <textarea
                            id={`notes-${l.id}`}
                            defaultValue={l.notes ?? ""}
                            rows={5}
                            placeholder="Add internal notes about this lead…"
                            onBlur={(e) => {
                              const val = e.target.value.trim() || null;
                              if (val !== (l.notes ?? null)) patchLead(l.id, { notes: val });
                            }}
                            className="mt-1 w-full px-3 py-2 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-background)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-navy)]"
                          />
                          <p className="mt-1 text-xs text-[var(--color-muted)]">Notes save automatically when you click away.</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
            {!filtered.length && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-[var(--color-muted)]">No leads match your filters.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Detail({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <span className="text-xs font-semibold uppercase tracking-wide text-[var(--color-muted)]">{label}: </span>
      <span className="text-[var(--color-foreground)]">{value ?? "—"}</span>
    </div>
  );
}
