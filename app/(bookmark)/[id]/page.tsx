import BookmarkList from "@/components/Bookmark/BookmarkList";
import BookmarkToolbar from "@/components/Bookmark/BookmarkToolbar";

export default function FolderPage({ params }: { params: { id: string } }) {
  return (
    <>
      <BookmarkToolbar folderId={params.id} />
      <BookmarkList folderId={params.id} />
    </>
  );
}
