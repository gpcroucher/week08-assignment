"use client";
import { getUsername } from "@/utils/localStorageUtils";
import { useEffect, useState } from "react";

export default function CommentForm({ serverAction }) {
  const [username, setUsername] = useState("");
  useEffect(() => {
    setUsername(getUsername());
  }, []);

  return (
    <form onSubmit={handleSubmit} className="m-4 mt-0">
      <label htmlFor="commentInput" className="align-middle">
        Comment as {username}:
      </label>
      <textarea id="commentInput" name="comment" />
      <button type="submit">Submit</button>
    </form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    serverAction({ ...data, username: getUsername() });
  }
}
