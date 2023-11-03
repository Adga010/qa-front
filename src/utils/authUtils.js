// ../utils/authUtils.js
export function isAuthenticated() {
  const token = localStorage.getItem("authToken");
  // Aquí puedes agregar más lógica para validar el token si es necesario.
  return !!token;
}


export function getToken() {
  return localStorage.getItem("authToken");
}
