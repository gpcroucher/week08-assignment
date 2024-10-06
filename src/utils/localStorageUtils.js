export function getUsername() {
  const storedUsername = localStorage.getItem("username");
  if (storedUsername !== null && storedUsername.length > 0) {
    return storedUsername;
  } else {
    return "anonymous";
  }
}

export function setUsername(username) {
  localStorage.setItem("username", username);
}
