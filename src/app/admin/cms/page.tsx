import { prisma } from "@/lib/prisma";
import { FileText } from "lucide-react";
import { CmsEditor } from "@/components/admin/CmsEditor";

export default async function AdminCmsPage() {
  const pages = await prisma.cmsPage.findMany({
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy sm:text-3xl">
            Content Management
          </h1>
          <p className="mt-1 text-sm text-muted">
            Create and publish site pages — About, Terms, Privacy, and more
          </p>
        </div>
        <CmsEditor mode="create" />
      </div>

      <div className="border border-border bg-white shadow-sm">
        {pages.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <FileText className="mx-auto h-12 w-12 text-light-blue" />
            <p className="mt-4 font-medium text-navy">No pages yet</p>
            <p className="mt-1 text-sm text-muted">
              Create your first CMS page to manage site content
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {pages.map((page) => (
              <li
                key={page.id}
                className="flex flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <p className="font-display font-bold text-navy">{page.title}</p>
                  <p className="mt-0.5 font-mono text-xs text-muted">/{page.slug}</p>
                  <p className="mt-2 line-clamp-1 text-xs text-muted">
                    {page.content.slice(0, 120)}…
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-3">
                  <span
                    className={`border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${
                      page.isPublished
                        ? "border-green-200 bg-green-50 text-green-700"
                        : "border-gray-200 bg-gray-50 text-gray-600"
                    }`}
                  >
                    {page.isPublished ? "Published" : "Draft"}
                  </span>
                  <CmsEditor
                    mode="edit"
                    page={{
                      id: page.id,
                      slug: page.slug,
                      title: page.title,
                      content: page.content,
                      isPublished: page.isPublished,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="border-l-4 border-gold bg-white p-6">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gold">
          Tip
        </p>
        <p className="mt-2 text-sm text-muted">
          Use CMS pages for content that changes occasionally — Terms of Service,
          Privacy Policy, or seasonal promotions. Static pages like About and
          Corporate are built directly into the site for premium design control.
        </p>
      </div>
    </div>
  );
}
