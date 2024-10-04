import { format } from "date-fns";

export default function Post({ post }) {
  return (
    <div>
      <p>{post.title}</p>
      <p>{post.name}</p>
      <p>{post.message}</p>
      <p>{format(post.created_at, "E do MMM y, kk:mm:ss")}</p>
    </div>
  );
}
