"use client";

export default function NewPostForm({ serverAction }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 max-h-screen w-3/4 bg-gray-100 border-2 border-black p-5"
    >
      <label htmlFor="titleInput">Title:</label>
      <input type="text" name="title" id="titleInput" />
      <label htmlFor="messageInput">Message:</label>
      <textarea name="message" id="messageInput" />
      <button type="submit" className="border border-gray-500">
        Submit
      </button>
    </form>
  );

  function getUsername() {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername !== null && storedUsername.length > 0) {
      return storedUsername;
    } else {
      return "anonymous";
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    console.log(serverAction);
    serverAction({ ...data, username: getUsername() });
  }
}
