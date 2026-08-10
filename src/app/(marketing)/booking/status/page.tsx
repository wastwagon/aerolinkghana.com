"use client";

import { useState } from "react";
import { Search, Loader2, CheckCircle2 } from "lucide-react";
import { formatCurrency, formatDate } from "@/lib/utils";

interface BookingResult {
  reference: string;
  type: string;
  status: string;
  paymentStatus: string;
  paymentMethod: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  passengerCount: number;
  quotedPrice: string | number;
  vehicle: { name: string };
}

export default function BookingStatusPage() {
  const [reference, setReference] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState<BookingResult | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setBooking(null);

    try {
      const res = await fetch(
        `/api/bookings/lookup?reference=${encodeURIComponent(reference)}&email=${encodeURIComponent(email)}`
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Booking not found");
      setBooking(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking not found");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-light-blue-bg/30 py-16 sm:py-24">
        <div className="mx-auto max-w-lg px-4 sm:px-6">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              Track Booking
            </p>
            <h1 className="font-display mt-4 text-3xl font-bold text-navy">
              Check your reservation
            </h1>
            <p className="mt-3 text-sm text-muted">
              Enter your booking reference and email — no account required.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Booking Reference
                </label>
                <input
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="e.g. ALG-XXXX-XXXX"
                  required
                  className="w-full border border-border px-4 py-3.5 font-mono text-sm outline-none focus:border-navy"
                />
              </div>
              <div>
                <label className="mb-2 block text-[10px] font-semibold uppercase tracking-widest text-muted">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-border px-4 py-3.5 text-sm outline-none focus:border-navy"
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex min-h-[48px] w-full touch-manipulation items-center justify-center gap-2 bg-navy py-4 text-xs font-bold uppercase tracking-widest text-white disabled:opacity-50 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <Search className="h-4 w-4" />
                  Find Booking
                </>
              )}
            </button>
          </form>

          {booking && (
            <div className="mt-8 border-l-4 border-gold bg-white p-6 sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                  <p className="mt-3 font-mono text-sm font-semibold text-navy">
                    {booking.reference}
                  </p>
                  <p className="font-display mt-1 text-lg font-bold text-navy">
                    {booking.type === "PICKUP" ? "Airport Pickup" : "Airport Drop-off"}
                  </p>
                </div>
                <span className="rounded-full bg-light-blue-bg px-3 py-1 text-[10px] font-semibold uppercase text-navy">
                  {booking.status.replace("_", " ")}
                </span>
              </div>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted">Date</dt>
                  <dd className="font-medium text-navy">{formatDate(booking.pickupDate)}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border pb-2">
                  <dt className="shrink-0 text-muted">Route</dt>
                  <dd className="text-right text-sm font-medium leading-snug text-navy">
                    <span className="block">{booking.pickupLocation}</span>
                    <span className="text-muted">→</span>{" "}
                    <span className="block">{booking.dropoffLocation}</span>
                  </dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted">Vehicle</dt>
                  <dd className="font-medium text-navy">{booking.vehicle.name}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted">Passengers</dt>
                  <dd className="font-medium text-navy">{booking.passengerCount}</dd>
                </div>
                <div className="flex justify-between border-b border-border pb-2">
                  <dt className="text-muted">Payment</dt>
                  <dd className="font-medium capitalize text-navy">
                    {booking.paymentMethod.replace("_", " ").toLowerCase()} ·{" "}
                    {booking.paymentStatus.toLowerCase()}
                  </dd>
                </div>
                <div className="flex justify-between pt-1">
                  <dt className="text-muted">Total</dt>
                  <dd className="font-display text-xl font-bold text-gold">
                    {formatCurrency(Number(booking.quotedPrice))}
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
    </div>
  );
}
