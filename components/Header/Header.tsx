import HeaderNav from "./HeaderNav";

const Header = () => {
  return (
    <header className="shrink-0 sm:h-screen min-w-[500px] bg-gray-500 flex sm:flex-col relative w-full sm:w-auto justify-between">
      <h1 className="text-3xl px-4 py-4 text-white font-bold flex justify-center items-center">
        ブックマーク管理
      </h1>
      <HeaderNav />
    </header>
  );
};
export default Header;
