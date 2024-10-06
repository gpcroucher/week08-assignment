import pg from "pg";
import Link from "next/link";

export default async function AllPostsPage() {
  const db = new pg.Pool({
    connectionString: process.env.DB_CONN_STRING,
  });

  return (
    <div className="ml-4">
      {(await getPosts()).map(({ title, post_id, name }) => {
        return (
          <div key={post_id}>
            <span className="text-gray-500">{post_id}. </span>
            <Link className="underline" href={`/posts/${post_id}`}>
              {title}{" "}
              <span className="italic text-sm text-gray-500">by {name}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );

  async function getPosts() {
    const posts = (
      await db.query(
        `SELECT title, post_id, name FROM week08_posts INNER JOIN week08_users ON created_by = user_id`
      )
    ).rows;
    return posts;
  }
}
