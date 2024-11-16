import {
  createContext,
  useContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";

type OpenMenuContextType = {
  openMenuId: string | null;
  setOpenMenuId: Dispatch<SetStateAction<string | null>>;
};

const OpenMenuContext = createContext<OpenMenuContextType | undefined>(
  undefined
);

export const OpenMenuProvider = ({ children }: { children: ReactNode }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // FolderSettingButtonの要素がクリックされていない場合のみメニューを閉じる
      const target = event.target as HTMLElement;
      if (!target.closest(".folder-setting-button")) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <OpenMenuContext.Provider value={{ openMenuId, setOpenMenuId }}>
      {children}
    </OpenMenuContext.Provider>
  );
};

export const useOpenMenu = () => {
  const context = useContext(OpenMenuContext);
  if (!context) {
    throw new Error("useOpenMenu must be used within an OpenMenuProvider");
  }
  return context;
};
