import CreateFolderForm from "@/components/Form/CreateFolderForm/CreateFolderForm";

export default async function CreateFolderPage() {
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

  return <CreateFolderForm folderData={folderData} />;
}
