import { IoIosArrowDown } from "react-icons/io";

const FolderOpenButton = ({
  // hasChild,
  isSubFolderVisible,
  setIsSubFolderVisible,
}: {
  // hasChild: boolean;
  isSubFolderVisible: boolean;
  setIsSubFolderVisible: () => void;
}) => {
  // const handleClick = () => {
  //   setIsSubFolderVisible();
  // };

  return (
    <button onClick={setIsSubFolderVisible} className="px-2 block h-full">
      <IoIosArrowDown className={`${isSubFolderVisible ? "rotate-180" : ""}`} />
    </button>
  );
};
export default FolderOpenButton;
