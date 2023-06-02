import type { RouterOutputs } from "~/utils/api";
import Image from "next/image";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <div
      key={post.id}
      className="flex border-b border-indigo-800 p-4 last:border-b-0"
    >
      <Image
        src={author?.profileImageUrl}
        alt="Profile image of author"
        className="mr-4 h-12 w-12 rounded-full"
        width={48}
        height={48}
      />
      <div>
        <div>
          <span className="font-medium text-indigo-300">
            @{author.username}
          </span>
          <span> · </span>
          <span className="text-indigo-400">
            {dayjs(post.createdAt).fromNow()}
          </span>
        </div>
        <div className="flex break-all text-xl ">{post.content}</div>
      </div>
    </div>
  );
};
