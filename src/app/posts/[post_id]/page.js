import pg from "pg";
import Post from "@/components/Post";

export default function PostIdPage({ params }) {
  const post_id = params.post_id;
  const db = new pg.Pool({
    connectionString: process.env.DB_CONN_STRING,
  });

  // TODO return 1 post and many comments
  // TODO and a comment form to INSERT a new comment

  return <>{getPost(post_id)}</>;

  async function getPost(id) {
    const post = (
      await db.query(
        `
        SELECT * 
        FROM week08_posts 
        INNER JOIN week08_users AS users ON created_by = user_id
        WHERE post_id = $1
        `,
        [id]
      )
    ).rows[0];
    console.log("getting post with post_id =", id, "\n", post);

    if (post === undefined) {
      return <p>Post not found</p>;
    }

    return <Post post={post} />;
  }
}
