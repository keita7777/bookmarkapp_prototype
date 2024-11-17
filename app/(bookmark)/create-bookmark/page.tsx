import CreateBookmarkForm from "@/components/Form/CreateBookmarkForm/CreateBookmarkForm";

export default async function CreateBookmarkPage() {
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

  return (
    <>
      <CreateBookmarkForm folderData={folderData} />
    </>
  );
}
