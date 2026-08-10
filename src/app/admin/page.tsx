import { prisma } from "@/lib/prisma";
import { formatCurrency } from "@/lib/utils";
import {
  Calendar,
  DollarSign,
  Clock,
  TrendingUp,
} from "lucide-react";
import { AdminBookingsPanel } from "@/components/admin/AdminBookingsPanel";
import type { AdminBookingRow } from "@/components/admin/BookingDetailSheet";

export default async function AdminPage() {
  const [bookings, stats] = await Promise.all([
    prisma.booking.findMany({
      orderBy: { createdAt: "desc" },
      take: 100,
      include: { vehicle: true },
    }),
    prisma.booking.groupBy({
      by: ["status"],
      _count: true,
    }),
  ]);

  const rows: AdminBookingRow[] = bookings.map((b) => ({
    id: b.id,
    reference: b.reference,
    customerName: b.customerName,
    customerEmail: b.customerEmail,
    customerPhone: b.customerPhone,
    type: b.type,
    status: b.status,
    paymentStatus: b.paymentStatus,
    paymentMethod: b.paymentMethod,
    pickupLocation: b.pickupLocation,
    dropoffLocation: b.dropoffLocation,
    pickupDate: b.pickupDate.toISOString(),
    flightNumber: b.flightNumber,
    passengerCount: b.passengerCount,
    luggageCount: b.luggageCount,
    quotedPrice: Number(b.quotedPrice),
    specialRequests: b.specialRequests,
    vehicleName: b.vehicle.name,
  }));

  const totalRevenue = bookings
    .filter((b) => b.paymentStatus === "PAID")
    .reduce((sum, b) => sum + Number(b.quotedPrice), 0);

  const pendingCount = stats.find((s) => s.status === "PENDING")?._count ?? 0;
  const confirmedCount = stats.find((s) => s.status === "CONFIRMED")?._count ?? 0;

  const thisMonth = bookings.filter((b) => {
    const d = new Date(b.createdAt);
    const now = new Date();
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
          Bookings Overview
        </h1>
        <p className="mt-1 text-sm text-muted">
          Manage reservations, payments, and transfer status
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <StatCard
          icon={Calendar}
          label="Total Bookings"
          value={bookings.length.toString()}
        />
        <StatCard
          icon={Clock}
          label="Awaiting Action"
          value={pendingCount.toString()}
          accent="gold"
        />
        <StatCard
          icon={TrendingUp}
          label="This Month"
          value={thisMonth.toString()}
        />
        <StatCard
          icon={DollarSign}
          label="Revenue Collected"
          value={formatCurrency(totalRevenue)}
          accent="navy"
        />
      </div>

      <div className="flex flex-wrap gap-4 border border-border bg-white px-4 py-4 sm:px-5">
        <SummaryPill label="Pending" count={pendingCount} color="yellow" />
        <SummaryPill label="Confirmed" count={confirmedCount} color="blue" />
        <SummaryPill
          label="Paid"
          count={bookings.filter((b) => b.paymentStatus === "PAID").length}
          color="green"
        />
      </div>

      <div className="overflow-hidden border border-border bg-white shadow-sm">
        <div className="border-b border-border px-4 py-4 sm:px-6">
          <h2 className="font-display text-lg font-bold text-navy">
            Recent Reservations
          </h2>
          <p className="text-xs text-muted">{rows.length} records</p>
        </div>
        <div className="p-4 sm:p-6">
          {rows.length > 0 ? (
            <AdminBookingsPanel bookings={rows} />
          ) : (
            <div className="py-12 text-center">
              <Calendar className="mx-auto h-12 w-12 text-light-blue" />
              <p className="mt-4 font-medium text-navy">No bookings yet</p>
              <p className="mt-1 text-sm text-muted">
                Share your website to start receiving reservations
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  accent?: "gold" | "navy";
}) {
  const styles = {
    default: "bg-white border border-border",
    gold: "bg-gold text-white border border-gold",
    navy: "gradient-navy text-white border border-navy",
  };
  const key = accent ?? "default";

  return (
    <div className={`p-4 sm:p-6 ${styles[key]}`}>
      <Icon
        className={`mb-2 h-5 w-5 sm:mb-3 ${
          accent === "navy" ? "text-gold" : accent === "gold" ? "text-white/70" : "text-gold"
        }`}
      />
      <p
        className={`text-[9px] font-semibold uppercase tracking-widest sm:text-[10px] ${
          accent === "navy" || accent === "gold" ? "text-white/60" : "text-muted"
        }`}
      >
        {label}
      </p>
      <p className="font-display mt-1 text-xl font-bold sm:mt-2 sm:text-2xl">{value}</p>
    </div>
  );
}

function SummaryPill({
  label,
  count,
  color,
}: {
  label: string;
  count: number;
  color: "yellow" | "blue" | "green";
}) {
  const dot = { yellow: "bg-yellow-400", blue: "bg-blue-400", green: "bg-green-500" };
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className={`h-2 w-2 rounded-full ${dot[color]}`} />
      <span className="text-muted">{label}</span>
      <span className="font-semibold text-navy">{count}</span>
    </div>
  );
}
