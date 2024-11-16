import Header from "@/components/Header/Header";

export default function BookmarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Header />
      <main>{children}</main>
    </div>
  );
}
