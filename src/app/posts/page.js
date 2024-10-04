// display a list of post titles, maybe with a little preview of each

import pg from "pg";
import Link from "next/link";

export default async function AllPostsPage() {
  const db = new pg.Pool({
    connectionString: process.env.DB_CONN_STRING,
  });

  return (
    <div>
      {(await getPosts()).map(({ title, post_id }) => {
        return (
          <div key={post_id}>
            <Link href={`/posts/${post_id}`}>{title}</Link>
            <br />
          </div>
        );
      })}
    </div>
  );

  async function getPosts() {
    const posts = (await db.query(`SELECT title, post_id FROM week08_posts`))
      .rows;
    console.log(posts);
    return posts;
  }
}
