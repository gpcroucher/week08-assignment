import pg from "pg";
import Post from "@/components/Post";
import { notFound } from "next/navigation";

export default function PostIdPage({ params }) {
  const post_id = params.post_id;
  const db = new pg.Pool({
    connectionString: process.env.DB_CONN_STRING,
  });

  // TODO return 1 post and many comments
  // TODO and a comment form to INSERT a new comment

  return <div>{getPost(post_id)}</div>;

  async function getPost(id) {
    if (typeof id !== "number") {
      notFound();
    }
    const dbResult = await db.query(
      `
        SELECT * 
        FROM week08_posts 
        INNER JOIN week08_users AS users ON created_by = user_id
        WHERE post_id = $1
        `,
      [id]
    );
    console.log("getting post with post_id =", id, "\n", dbResult);
    if (dbResult.rowCount === 0) {
      console.log("post is undefined so notFound should fire now");
      notFound();
    }

    const post = dbResult.rows[0];
    return <Post post={post} />;
  }
}
