import { format } from "date-fns";

export default function Post({ post }) {
  return (
    <div className="p-4">
      <h1 className="text-4xl text-center">{post.title}</h1>
      <div className="flex gap-4 justify-center">
        <p>{post.name}</p>
        <p className="italic text-gray-500">
          {format(post.created_at, "E do MMM y, kk:mm:ss")}
        </p>
      </div>
      <p className="mt-8">{post.message}</p>
    </div>
  );
}
