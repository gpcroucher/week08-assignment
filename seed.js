/*
create table users_parent (
    user_id     varchar(50),
    full_name   varchar(240),
    login_id_1  varchar(50),
    date        timestamp NOT NULL DEFAULT NOW()
);
*/
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_CONN_STRING,
});

makeTables();

async function makeTables() {
  await dropTableComments();
  await dropTablePosts();
  await createTablePosts();
  await createTableComments();
}

async function dropTableComments() {
  await db.query(`DROP TABLE IF EXISTS week08_comments CASCADE`);
  console.log("Dropped comments table.");
}

async function dropTablePosts() {
  await db.query(`DROP TABLE IF EXISTS week08_posts CASCADE`);
  console.log("Dropped posts table.");
}

async function createTableComments() {
  await db.query(`CREATE TABLE week08_comments (
        comment_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        post_id INTEGER NOT NULL REFERENCES week08_posts (post_id), 
        comment VARCHAR(1000),
        author VARCHAR(100),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )`);
  console.log("Created comments table.");
}

async function createTablePosts() {
  await db.query(`CREATE TABLE week08_posts (
        post_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        title VARCHAR(255),
        message TEXT,
        author VARCHAR(100),
        created_at TIMESTAMP NOT NULL DEFAULT NOW()
        )`);
  console.log("Created posts table.");
}
