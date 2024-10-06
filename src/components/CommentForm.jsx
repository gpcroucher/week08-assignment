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
      <div className="flex items-center gap-2">
        <label htmlFor="commentInput" className="">
          Comment as {username}:
        </label>
        <div className="flex flex-col flex-1 items-left">
          <textarea id="commentInput" name="comment" className="" />
          <button type="submit" className="border border-gray-500">
            Submit
          </button>
        </div>
      </div>
    </form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const data = Object.fromEntries(new FormData(form));
    if (data.comment.trim().length === 0) {
      return;
    }
    serverAction({ ...data, username: getUsername() });
    form.reset();
  }
}
