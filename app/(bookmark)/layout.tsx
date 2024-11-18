import Header from "@/components/Header/Header";
import { OpenMenuProvider } from "@/context/OpenMenuContext";

export default function BookmarkLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col sm:flex-row">
      <OpenMenuProvider>
        <Header />
        <main className="flex-1 p-4">{children}</main>
      </OpenMenuProvider>
    </div>
  );
}
