import { useState } from "react";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import Image from "next/image";
import { PostView } from "~/components/post";
import { api } from "~/utils/api";
import { LoadingPage } from "~/components/loading";

const CreatePostWizard = () => {
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
      <button onClick={() => mutate({ content: input })}>Post</button>
    </div>
  );
};

const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  return (
    <div>
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching ASAP
  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <>
      <main className="flex h-screen justify-center">
        <div className="h-full w-full border-indigo-600  md:max-w-2xl">
          <div className="flex p-4">
            {!isSignedIn && <SignInButton />}
            {isSignedIn && (
              <div className="flex w-full flex-col">
                <CreatePostWizard />
              </div>
            )}
          </div>
          <Feed />
          <div className="absolute bottom-3 p-4">
            {isSignedIn && <SignOutButton />}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
