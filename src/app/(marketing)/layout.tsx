import { MarketingChrome } from "@/components/MarketingChrome";
import { Footer } from "@/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingChrome>
        <main className="flex-1">{children}</main>
      </MarketingChrome>
      <Footer />
    </>
  );
}
