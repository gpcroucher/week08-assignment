import Link from "next/link";

export default function NavBar() {
  return (
    <nav className="flex gap-4 items-center">
      <Link href="/">Login</Link>
      <Link href="/posts">Posts</Link>
      <Link href="/posts/new">New Post</Link>
    </nav>
  );
}
