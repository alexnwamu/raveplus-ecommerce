import { Header, Footer } from "@/components/layout";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-brand-cream/30">{children}</main>
      <Footer />
    </>
  );
}
