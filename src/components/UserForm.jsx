"use client";

export default function UserForm({ serverAction }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-gray-100 border-2 border-black p-5"
    >
      <label htmlFor="usernameInput">
        Enter a username to view or submit posts or comments.
      </label>
      <input
        type="text"
        name="username"
        id="usernameInput"
        placeholder="username here"
        className="text-center"
      />
      <button type="submit" className="border border-gray-500">
        Submit
      </button>
    </form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const username = new FormData(form).get("username");
    serverAction(username);
  }
}
