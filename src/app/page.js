import UserForm from "@/components/UserForm";
import pg from "pg";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default function Home() {
  async function serverSubmitUsername(username) {
    "use server";

    const db = new pg.Pool({
      connectionString: process.env.DB_CONN_STRING,
    });
    const selectResult = await db.query(
      `SELECT * FROM week08_users WHERE name = $1`,
      [username]
    );
    if (selectResult.rowCount === 0) {
      await db.query(`INSERT INTO week08_users (name) VALUES ($1)`, [username]);
    }
    revalidatePath("/posts");
    redirect("/posts");
  }

  return (
    <div>
      <UserForm serverAction={serverSubmitUsername} />
    </div>
  );
}
