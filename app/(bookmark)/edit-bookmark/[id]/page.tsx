import CreateBookmarkForm from "@/components/Form/CreateBookmarkForm/CreateBookmarkForm";

export default async function EditBookmarkPage({
  params,
}: {
  params: { id: string };
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/folders`, {
    method: "GET",
    cache: "no-store",
  });

  if (!res.ok) {
    console.error("Failed to fetch folders:", res.statusText);
    return null;
  }

  const data = await res.json();
  const folderData = data.folders;

  const res2 = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/${params.id}/bookmark/`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  if (!res2.ok) {
    console.error("Failed to fetch bookmark:", res2.statusText);
    return null;
  }

  const data2 = await res2.json();
  const bookmarkData = data2.bookmark;

  return (
    <>
      <CreateBookmarkForm folderData={folderData} bookmarkData={bookmarkData} />
    </>
  );
}
