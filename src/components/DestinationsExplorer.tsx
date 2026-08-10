"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DESTINATION_GROUPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface DestinationsExplorerProps {
  showHeader?: boolean;
  onSelect?: (destination: string) => void;
}

export function DestinationsExplorer({
  showHeader = true,
  onSelect,
}: DestinationsExplorerProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(DESTINATION_GROUPS[0].id);

  const activeGroup = DESTINATION_GROUPS.find((g) => g.id === activeTab)!;

  function handleSelect(destination: string) {
    onSelect?.(destination);
    sessionStorage.setItem("aerolink:prefill-destination", destination);
    router.push("/book");
  }

  return (
    <section id="destinations" className="bg-navy py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {showHeader && (
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-lg">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                Destinations
              </p>
              <h2 className="font-display mt-3 text-3xl font-bold sm:text-4xl">
                Where we take you from Kotoka
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Leading hotels, serviced residences, embassies, and residential
                districts across Greater Accra — select any destination to
                pre-populate your reservation.
              </p>
            </div>

            <div className="relative lg:static">
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none lg:pb-0">
                {DESTINATION_GROUPS.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveTab(group.id)}
                    className={cn(
                      "shrink-0 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition active:scale-95",
                      activeTab === group.id
                        ? "bg-gold text-white"
                        : "border border-white/20 text-white/70 hover:border-gold/50"
                    )}
                  >
                    {group.label}
                  </button>
                ))}
              </div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-navy to-transparent lg:hidden" />
            </div>
          </div>
        )}

        {!showHeader && (
          <div className="relative mb-8">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {DESTINATION_GROUPS.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => setActiveTab(group.id)}
                  className={cn(
                    "shrink-0 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider transition active:scale-95",
                    activeTab === group.id
                      ? "bg-gold text-white"
                      : "border border-white/20 text-white/70 hover:border-gold/50"
                  )}
                >
                  {group.label}
                </button>
              ))}
            </div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-navy to-transparent" />
          </div>
        )}

        <div className={cn("grid gap-2 sm:grid-cols-2 lg:grid-cols-4", showHeader && "mt-10")}>
          {activeGroup.destinations.map((dest) => (
            <button
              key={dest}
              type="button"
              onClick={() => handleSelect(dest)}
              className="group flex items-center justify-between border border-white/10 px-4 py-4 text-left text-sm transition hover:border-gold hover:bg-white/5"
            >
              <span className="text-white/90 group-hover:text-gold">{dest}</span>
              <span className="text-gold opacity-0 transition group-hover:opacity-100">
                →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
