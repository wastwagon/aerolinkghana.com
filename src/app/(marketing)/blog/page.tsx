import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BlogCard } from "@/components/BlogCard";
import { getBlogPosts } from "@/lib/blog";
import { createMetadata } from "@/lib/metadata";
import { IMAGES } from "@/lib/images";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Travel Blog & Guides",
  description:
    "Airport transfer tips, Kotoka International guides, and destination advice for travellers arriving in Accra, Ghana.",
  openGraph: {
    title: "Travel Blog | AeroLink Ghana",
    description:
      "Guides for Kotoka airport transfers, East Legon routes, and first-time visitors to Accra.",
    images: [{ url: IMAGES.hero, width: 1200, height: 630, alt: "AeroLink Ghana blog" }],
  },
});

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const sorted = [...posts].sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
  const [featured, ...rest] = sorted;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Travel guides & airport tips"
        description="Practical advice for arriving at Kotoka International and getting around Greater Accra with confidence."
        image={IMAGES.hero}
        imageAlt="Accra travel guides"
        minHeight="min-h-[42vh]"
      />

      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                Featured
              </p>
              <h2 className="font-display mt-3 text-2xl font-bold text-navy sm:text-3xl">
                Editor&apos;s pick
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted">
              {posts.length} guides covering Kotoka transfers, neighbourhoods,
              and corporate travel in Accra.
            </p>
          </div>

          {featured && (
            <BlogCard post={featured} variant="featured" priority />
          )}

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {rest.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
