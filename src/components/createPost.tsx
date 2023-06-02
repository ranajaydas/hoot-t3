import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";

export const CreatePostWizard = () => {
  const { user } = useUser();
  const [input, setInput] = useState<string>("");
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
    },
    onError: (e) => {
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage && errorMessage[0]) {
        toast.error(errorMessage[0]);
      } else {
        toast.error("Failed to post 😢...try again later");
      }
    },
  });

  if (!user) return null;

  return (
    <div className="flex w-full">
      <Image
        src={user.profileImageUrl}
        alt="Profile image of user"
        className="mr-4 h-14 w-14 rounded-full"
        width={56}
        height={56}
      />
      <input
        placeholder="⌨️ 🇪Ⓜ️😀🇯📍💲(type some emojis)"
        className="grow bg-transparent placeholder-gray-50 placeholder-opacity-30 outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            if (input !== "") {
              mutate({ content: input });
            }
          }
        }}
        disabled={isPosting}
      />
      <button
        className="rounded-md p-2 pt-0 text-xl transition-colors duration-300 ease-in-out hover:bg-indigo-600"
        onClick={() => mutate({ content: input })}
      >
        📨
      </button>
    </div>
  );
};
