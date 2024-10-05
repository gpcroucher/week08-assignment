"use client";

export default function UserForm({ serverAction }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="usernameInput">
        Enter a username to view or submit posts or comments.
      </label>
      <input type="text" name="username" id="usernameInput" />
      <button type="submit">Submit</button>
    </form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const username = new FormData(form).get("username");
    serverAction(username);
    form.reset();
  }
}
