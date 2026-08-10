import Link from "next/link";
import { Star } from "lucide-react";
import { GOOGLE_REVIEWS, TESTIMONIALS } from "@/lib/trust";

export function TestimonialsSection() {
  return (
    <section className="bg-light-blue-bg/40 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
            Google Reviews
          </p>
          <h2 className="font-display mt-4 text-3xl font-bold text-navy sm:text-4xl">
            Trusted by travellers across Ghana
          </h2>
          <div className="mt-5 flex items-center justify-center gap-2">
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-5 w-5 fill-gold text-gold"
                  strokeWidth={0}
                />
              ))}
            </div>
            <span className="font-display text-xl font-bold text-navy">
              {GOOGLE_REVIEWS.rating}
            </span>
            <span className="text-sm text-muted">
              · {GOOGLE_REVIEWS.totalReviews}+ reviews on Google
            </span>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((review) => (
            <article
              key={review.id}
              className="flex flex-col border border-border bg-white p-6"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-gold text-gold"
                    strokeWidth={0}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted">
                &ldquo;{review.quote}&rdquo;
              </p>
              <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                <div className="flex h-10 w-10 items-center justify-center bg-navy text-xs font-bold text-white">
                  {review.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-navy">{review.name}</p>
                  <p className="text-xs text-muted">
                    {review.location} · {review.date}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={GOOGLE_REVIEWS.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-navy px-8 py-3.5 text-xs font-bold uppercase tracking-widest text-navy transition hover:bg-navy hover:text-white"
          >
            Leave us a review on Google
          </a>
        </div>
      </div>
    </section>
  );
}
