import pg from "pg";

export default function PostIdPage({ params }) {
  const id = params.id;
  const db = new pg.Pool({
    connectionString: process.env.DB_CONN_STRING,
  });

  async function getPost(id) {
    const post = await db.query(`SELECT * FROM week08_posts WHERE id = $1`, [
      id,
    ]);
  }

  // another query to SELECT comments WHERE post_id = id

  // return 1 post and many comments
  // and a comment form to INSERT a new comment
}
