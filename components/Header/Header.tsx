import Link from "next/link";
import HeaderNav from "./HeaderNav";

const Header = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folders`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch folders:", res.statusText);
    return null;
  }

  const data = await res.json();
  const folders = data.folders;

  return (
    <header className="shrink-0 sm:h-screen min-w-[500px] bg-gray-500 flex sm:flex-col relative w-full sm:w-auto justify-between">
      <h1 className="text-3xl px-4 py-4 text-white font-bold flex justify-center items-center">
        <Link href="/">ブックマーク管理</Link>
      </h1>
      <HeaderNav folders={folders} />
    </header>
  );
};
export default Header;
