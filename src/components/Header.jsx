import NavBar from "./NavBar";

export default function Header() {
  return (
    <header className="p-4 w-screen flex gap-10">
      <h1 className="text-4xl">CommentForm&trade;</h1>
      <NavBar />
    </header>
  );
}
