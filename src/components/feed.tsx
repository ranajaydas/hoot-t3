import { api } from "~/utils/api";
import { PostView } from "~/components/post";
import { LoadingPage } from "~/components/loading";

export const Feed = () => {
  const { data, isLoading: postsLoading } = api.posts.getAll.useQuery();

  if (postsLoading) return <LoadingPage />;

  return (
    <div className="pb-12">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};
