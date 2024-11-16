import BookmarkButtons from "@/components/Bookmark/BookmarkButtons";
import BookmarkList from "@/components/Bookmark/BookmarkList";

export default function FolderPage({ params }: { params: { id: string } }) {
  return (
    <>
      <BookmarkButtons folderId={params.id} />
      <BookmarkList />
    </>
  );
}
