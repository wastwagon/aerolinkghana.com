"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  FileText,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";
import { useScrollLock } from "@/lib/use-scroll-lock";

const navItems = [
  { href: "/admin", label: "Bookings", icon: LayoutDashboard, exact: true },
  { href: "/admin/cms", label: "Content", icon: FileText },
];

interface AdminShellProps {
  userEmail: string;
  children: React.ReactNode;
}

export function AdminShell({ userEmail, children }: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useScrollLock(sidebarOpen);

  return (
    <div className="flex min-h-screen bg-[#f4f7fb]">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-navy/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(100vw-3rem,18rem)] flex-col bg-navy transition-transform duration-300 ease-out safe-top safe-bottom lg:static lg:w-64 lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div>
            <Logo variant="light" showTagline={false} />
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
              Operations
            </p>
          </div>
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="touch-target flex items-center justify-center rounded-full bg-white/10 text-white lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto overscroll-contain px-3 py-4">
          {navItems.map((item) => {
            const active = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex min-h-[48px] items-center gap-3 px-4 text-sm font-medium transition active:scale-[0.98]",
                  active
                    ? "bg-gold text-white"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                )}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/"
            target="_blank"
            className="flex min-h-[48px] items-center gap-3 px-4 text-sm font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-5 w-5" />
            View Website
          </Link>
        </nav>

        <div className="border-t border-white/10 p-4">
          <p className="truncate px-2 text-xs text-white/50">{userEmail}</p>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-3 flex min-h-[48px] w-full items-center gap-2 px-4 text-sm text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-5 w-5" />
            Sign Out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex min-h-14 items-center justify-between border-b border-border bg-white/95 px-4 backdrop-blur-xl safe-top sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="touch-target flex items-center justify-center text-navy lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted">
                {pathname === "/admin/cms" ? "Content" : "Bookings"}
              </p>
              <p className="truncate text-xs text-navy lg:hidden">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden max-w-[200px] truncate text-xs text-muted lg:block">
              {userEmail}
            </span>
            <span className="rounded-full bg-green-100 px-2.5 py-1 text-[10px] font-semibold uppercase text-green-700">
              Live
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
