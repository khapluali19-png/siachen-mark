"use client";

import { useState } from "react";
import Input from "@/components/ui/Input";
import Label from "@/components/ui/Label";
import Button from "@/components/ui/Button";

interface NavItem {
  id: string;
  label: string;
  href: string;
  order: number;
  enabled: boolean;
  isExternal: boolean;
}

export default function NavigationManager({ initialItems }: { initialItems: NavItem[] }) {
  const [items, setItems] = useState<NavItem[]>(initialItems);
  const [newLabel, setNewLabel] = useState("");
  const [newHref, setNewHref] = useState("");
  const [adding, setAdding] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  async function handleAddItem(e: React.FormEvent) {
    e.preventDefault();
    if (!newLabel || !newHref) return;

    setAdding(true);
    try {
      const res = await fetch("/api/admin/navigation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          label: newLabel,
          href: newHref,
          order: items.length,
          enabled: true,
          isExternal: newHref.startsWith("http"),
        }),
      });

      if (!res.ok) throw new Error("Failed to add item");
      const created = await res.json();
      setItems([...items, created]);
      setNewLabel("");
      setNewHref("");
      setStatusMsg("✓ Item added successfully");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch {
      setStatusMsg("Error adding navigation item");
    } finally {
      setAdding(false);
    }
  }

  async function handleToggle(id: string, current: boolean) {
    try {
      const res = await fetch(`/api/admin/navigation/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enabled: !current }),
      });
      if (!res.ok) throw new Error("Failed to update item");
      const updated = await res.json();
      setItems(items.map((it) => (it.id === id ? updated : it)));
    } catch {
      alert("Error updating item");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this navigation item?")) return;

    try {
      const res = await fetch(`/api/admin/navigation/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete item");
      setItems(items.filter((it) => it.id !== id));
      setStatusMsg("✓ Item deleted");
      setTimeout(() => setStatusMsg(""), 3000);
    } catch {
      alert("Error deleting item");
    }
  }

  return (
    <div className="space-y-8 max-w-4xl">
      {statusMsg && (
        <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-sm text-emerald-800 font-semibold">
          {statusMsg}
        </div>
      )}

      {/* Add New Item Form */}
      <form onSubmit={handleAddItem} className="bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] p-6 shadow-sm">
        <h2 className="text-base font-bold text-[var(--color-navy)] mb-4">Add Navigation Link</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <Label htmlFor="newLabel">Link Label *</Label>
            <Input
              id="newLabel"
              value={newLabel}
              onChange={(e) => setNewLabel(e.target.value)}
              placeholder="e.g. Case Studies"
              required
            />
          </div>
          <div>
            <Label htmlFor="newHref">Destination URL *</Label>
            <Input
              id="newHref"
              value={newHref}
              onChange={(e) => setNewHref(e.target.value)}
              placeholder="e.g. /portfolio or /about"
              required
            />
          </div>
          <div>
            <Button type="submit" disabled={adding} className="w-full">
              {adding ? "Adding…" : "+ Add Link"}
            </Button>
          </div>
        </div>
      </form>

      {/* Current Navigation Items Table */}
      <div className="bg-white border border-[var(--color-border)] rounded-[var(--radius-xl)] overflow-hidden shadow-sm">
        <div className="p-5 border-b border-[var(--color-border)] bg-[var(--color-off-white)]">
          <h2 className="text-sm font-bold text-[var(--color-navy)] uppercase tracking-wider">Active Header Menu Links</h2>
          <p className="text-xs text-[var(--color-muted)] mt-0.5">Control the labels, URLs, and visibility of links in desktop navbar and mobile drawer.</p>
        </div>

        <table className="w-full text-sm">
          <thead className="border-b border-[var(--color-border)] bg-gray-50/50">
            <tr>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Label</th>
              <th className="px-5 py-3 text-left text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">URL / Path</th>
              <th className="px-5 py-3 text-center text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Status</th>
              <th className="px-5 py-3 text-right text-xs font-bold uppercase tracking-wider text-[var(--color-muted)]">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--color-border)]">
            {items.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50/50">
                <td className="px-5 py-3.5 font-bold text-[var(--color-navy)]">{item.label}</td>
                <td className="px-5 py-3.5 font-mono text-xs text-[var(--color-muted)]">{item.href}</td>
                <td className="px-5 py-3.5 text-center">
                  <button
                    type="button"
                    onClick={() => handleToggle(item.id, item.enabled)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold cursor-pointer transition-colors ${
                      item.enabled ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {item.enabled ? "Enabled" : "Disabled"}
                  </button>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-xs text-red-600 hover:underline font-semibold"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {!items.length && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-xs text-[var(--color-muted)]">
                  No database navigation items yet. Default system menu (Home, Services, Portfolio, About, Contact) is active.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
