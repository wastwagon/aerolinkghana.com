"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Loader2, X } from "lucide-react";
import { useScrollLock } from "@/lib/use-scroll-lock";

interface CmsPage {
  id: string;
  slug: string;
  title: string;
  content: string;
  isPublished: boolean;
}

interface CmsEditorProps {
  mode: "create" | "edit";
  page?: CmsPage;
}

export function CmsEditor({ mode, page }: CmsEditorProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    slug: page?.slug ?? "",
    title: page?.title ?? "",
    content: page?.content ?? "",
    isPublished: page?.isPublished ?? true,
  });

  useScrollLock(open);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/cms", {
        method: page ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(page ? { id: page.id, ...form } : form),
      });
      setOpen(false);
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={
          mode === "create"
            ? "inline-flex min-h-[44px] items-center gap-2 bg-navy px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition hover:bg-navy-dark active:scale-[0.98]"
            : "flex min-h-[44px] min-w-[44px] items-center justify-center border border-border text-navy transition hover:border-gold hover:text-gold active:scale-[0.98]"
        }
      >
        {mode === "create" ? (
          <>
            <Plus className="h-4 w-4" /> New Page
          </>
        ) : (
          <Pencil className="h-4 w-4" />
        )}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center bg-navy/50 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl safe-bottom sm:max-h-[90vh] sm:rounded-none">
        <div className="flex shrink-0 items-center justify-between border-b border-border bg-navy px-6 py-4">
          <h3 className="font-display text-lg font-bold text-white">
            {mode === "create" ? "New Page" : "Edit Page"}
          </h3>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="touch-target flex items-center justify-center text-white/70 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 space-y-5 overflow-y-auto overscroll-contain p-6">
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
              Page Title
            </label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-navy"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
              URL Slug
            </label>
            <input
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              required
              placeholder="privacy-policy"
              className="w-full border border-border px-4 py-3 font-mono text-sm outline-none focus:border-navy"
            />
          </div>
          <div>
            <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
              Content
            </label>
            <textarea
              value={form.content}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              required
              rows={8}
              className="w-full border border-border px-4 py-3 text-sm outline-none focus:border-navy"
            />
          </div>
          <label className="flex items-center gap-3 text-sm text-navy">
            <input
              type="checkbox"
              checked={form.isPublished}
              onChange={(e) =>
                setForm({ ...form, isPublished: e.target.checked })
              }
              className="h-4 w-4 accent-gold"
            />
            Publish immediately
          </label>
          <div className="flex shrink-0 gap-3 border-t border-border bg-white p-4 safe-bottom">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex min-h-[48px] flex-1 items-center justify-center border border-border text-xs font-semibold uppercase tracking-widest text-muted active:scale-[0.98]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex min-h-[48px] flex-1 items-center justify-center gap-2 bg-gold text-xs font-bold uppercase tracking-widest text-white disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save Page"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
