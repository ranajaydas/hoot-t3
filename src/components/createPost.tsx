import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { api } from "~/utils/api";

export const CreatePostWizard = () => {
  const { user } = useUser();
  const [input, setInput] = useState<string>("");
  const ctx = api.useContext();

  const { mutate, isLoading: isPosting } = api.posts.create.useMutation({
    onSuccess: () => {
      setInput("");
      void ctx.posts.getAll.invalidate();
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
        placeholder="Type some emojis!"
        className="grow bg-transparent outline-none"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
