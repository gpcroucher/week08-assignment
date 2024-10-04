export default function Post({ post }) {
  return (
    <div>
      <p>{post.title}</p>
      <p>{post.author}</p>
      <p>{post.message}</p>
    </div>
  );
}
