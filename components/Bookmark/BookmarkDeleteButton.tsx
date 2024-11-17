import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";

type BookmarkDeleteButtonProps = {
  id: string;
  setIsDeleteClick: Dispatch<SetStateAction<boolean>>;
};

const BookmarkDeleteButton = ({
  id,
  setIsDeleteClick,
}: BookmarkDeleteButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/${id}/bookmark`,
      {
        method: "DELETE",
      }
    );

    if (!res.ok) {
      console.error("削除に失敗しました", res.statusText);
      return;
    }

    setIsDeleteClick(false);
    router.refresh();
  };

  return (
    <button
      onClick={handleDelete}
      className="w-36 text-center border border-black rounded-md bg-red-600 text-white text-xl py-1"
    >
      削除する
    </button>
  );
};
export default BookmarkDeleteButton;
