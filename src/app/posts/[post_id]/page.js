import pg from "pg";
import Post from "@/components/Post";
import { notFound } from "next/navigation";
import CommentForm from "@/components/CommentForm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { format } from "date-fns";

export default function PostIdPage({ params }) {
  const post_id = params.post_id;
  const db = new pg.Pool({
    connectionString: process.env.DB_CONN_STRING,
  });

  async function displayComments(id) {
    const array = await getComments(id);
    return array.map(({ comment_id, comment_body, name, created_at }) => {
      return (
        <div
          key={comment_id}
          className="w-fit ml-4 mb-4 border border-gray-500 p-1"
        >
          <p>
            {name} @ {format(created_at, "E do MMM y, kk:mm:ss")}
          </p>
          <p>{comment_body}</p>
        </div>
      );
    });
  }

  async function getComments(id) {
    const dbResult = await db.query(
      `SELECT * FROM week08_comments INNER JOIN week08_users ON created_by = user_id WHERE post_id = $1`,
      [id]
    );
    const comments = await dbResult.rows;
    return comments;
  }

  async function getPost(id) {
    // check that the ID param is actually a number
    if (isNaN(Number(id))) {
      return notFound();
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
    if (dbResult.rowCount === 0) {
      notFound();
    }

    const post = dbResult.rows[0];
    return <Post post={post} />;
  }

  async function serverSubmitComment({ comment, username }) {
    "use server";
    const db = new pg.Pool({
      connectionString: process.env.DB_CONN_STRING,
    });

    // TODO handle if no rows are returned
    const user_id = (
      await db.query(`SELECT user_id FROM week08_users WHERE name = $1`, [
        username,
      ])
    ).rows[0].user_id;

    await db.query(
      `INSERT INTO week08_comments (post_id, comment_body, created_by) VALUES ($1, $2, $3)`,
      [post_id, comment, user_id]
    );

    revalidatePath(`/posts/${post_id}`);
    redirect(`/posts/${post_id}`);
  }

  return (
    <>
      <div className="m-4 bg-gray-100 border-2 border-black">
        {getPost(post_id)}
      </div>
      <CommentForm serverAction={serverSubmitComment} />
      {displayComments(post_id)}
    </>
  );
}
