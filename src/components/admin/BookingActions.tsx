"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, X, Banknote, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface BookingActionsProps {
  bookingId: string;
  status: string;
  paymentStatus: string;
  size?: "default" | "large";
}

export function BookingActions({
  bookingId,
  status,
  paymentStatus,
  size = "default",
}: BookingActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const isLarge = size === "large";

  async function updateBooking(updates: Record<string, string>) {
    setLoading(true);
    try {
      await fetch(`/api/bookings/${bookingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <Loader2 className="h-5 w-5 animate-spin text-muted" />;
  }

  const btnClass = cn(
    "flex items-center justify-center gap-2 font-semibold uppercase tracking-wide transition active:scale-[0.98]",
    isLarge
      ? "min-h-[48px] flex-1 px-4 text-xs"
      : "px-3 py-2.5 text-[10px] min-h-[44px]"
  );

  return (
    <div className={cn("flex flex-wrap gap-2", isLarge && "w-full")}>
      {status === "PENDING" && (
        <button
          type="button"
          onClick={() => updateBooking({ status: "CONFIRMED" })}
          className={cn(
            btnClass,
            "border border-green-200 bg-green-50 text-green-700 hover:bg-green-100"
          )}
        >
          <Check className="h-4 w-4" />
          Confirm
        </button>
      )}
      {status !== "CANCELLED" && status !== "COMPLETED" && (
        <button
          type="button"
          onClick={() => updateBooking({ status: "CANCELLED" })}
          className={cn(
            btnClass,
            "border border-red-200 bg-red-50 text-red-600 hover:bg-red-100",
            !isLarge && "px-2.5"
          )}
          aria-label="Cancel booking"
        >
          <X className="h-4 w-4" />
          {isLarge && "Cancel"}
        </button>
      )}
      {paymentStatus === "PENDING" && (
        <button
          type="button"
          onClick={() => updateBooking({ paymentStatus: "PAID" })}
          className={cn(
            btnClass,
            "border border-gold/40 bg-gold/10 text-gold hover:bg-gold/20"
          )}
        >
          <Banknote className="h-4 w-4" />
          Mark Paid
        </button>
      )}
    </div>
  );
}
