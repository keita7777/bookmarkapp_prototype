import Header from "@/components/Header/Header";

export default function BookmarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col sm:flex-row">
      <Header />
      <main className="flex-1">{children}</main>
    </div>
  );
}
