import NewPostForm from "@/components/NewPostForm";
import pg from "pg";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function NewPostPage() {
  async function serverSubmitPost({ title, message, username }) {
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
      `INSERT INTO week08_posts (title, message, created_by) VALUES ($1, $2, $3)`,
      [title, message, user_id]
    );

    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <NewPostForm serverAction={serverSubmitPost} />
    </div>
  );
}
