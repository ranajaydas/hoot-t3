import { useUser } from "@clerk/nextjs";
import { type NextPage } from "next";
import { api } from "~/utils/api";
import { CreatePostWizard } from "~/components/createPost";
import { Feed } from "~/components/feed";
import { SignInOrOut } from "~/components/signInOrOut";

const Home: NextPage = () => {
  const { isLoaded: userLoaded, isSignedIn } = useUser();

  // Start fetching ASAP
  api.posts.getAll.useQuery();

  if (!userLoaded) return <div />;

  return (
    <main className="flex h-screen justify-center">
      <div className="flex h-full flex-col border-indigo-600 md:max-w-2xl">
        <div className="flex p-4">
          {isSignedIn && (
            <div className="flex w-full flex-col">
              <CreatePostWizard />
            </div>
          )}
        </div>
        <Feed />
      </div>
      <SignInOrOut />
    </main>
  );
};

export default Home;
