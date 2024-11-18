import { BsThreeDots } from "react-icons/bs";
import { useOpenMenu } from "@/context/OpenMenuContext";
import FolderSettingMenu from "./FolderSettingMenu";

const FolderSettingButton = ({ id }: { id: string | null }) => {
  const { openMenuId, setOpenMenuId } = useOpenMenu();
  const handleMenuToggle = () => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <>
      <button
        className="px-2 block h-full folder-setting-button"
        onClick={handleMenuToggle}
      >
        <BsThreeDots />
      </button>
      {openMenuId === id && <FolderSettingMenu id={id} />}
    </>
  );
};
export default FolderSettingButton;
