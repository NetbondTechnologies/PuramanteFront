export function Isauthanticate() {
  const token = localStorage.getItem("token");
  if (token) {
    return true;
  } else {
    return false;
  }
}
export function IsAdmin() {
  return localStorage.getItem("role") === "admin";
}



export function Logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("role")
  window.location.reload();
}
