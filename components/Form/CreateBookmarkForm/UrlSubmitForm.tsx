import { getUrlInfo } from "@/utils/linkpreview";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { IoSend } from "react-icons/io5";

type UrlSubmitFormProps = {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  setUrlData: (newUrlData: {
    title: string;
    image: string;
    url: string;
    description: string;
  }) => void;
  setIsUrlSubmit: Dispatch<SetStateAction<boolean>>;
};

const UrlSubmitForm = ({
  url,
  setUrl,
  setUrlData,
  setIsUrlSubmit,
}: UrlSubmitFormProps) => {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    setError,
    setValue,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();

  const handleCancel = (e: any) => {
    e.preventDefault();
    router.back();
    router.refresh();
  };

  // URLからサイトのデータを取得
  const handleUrlSubmit = async (e: any) => {
    e.preventDefault();

    if (url) {
      const data = await getUrlInfo(url);
      setUrlData(data);
    }
    setIsUrlSubmit(true);
  };

  const onSubmit = () => {};

  return (
    <form onSubmit={handleUrlSubmit} className="bg-white flex gap-4">
      <input
        type="text"
        placeholder="URLを入力してください"
        className="border border-black rounded-md p-2 flex-1"
        onChange={(e) => setUrl(e.target.value)}
      />
      <button type="submit" className="bg-gray-400 px-4 rounded-md">
        <IoSend />
      </button>
    </form>
  );
};
export default UrlSubmitForm;
