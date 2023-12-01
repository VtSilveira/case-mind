export const TOKEN_KEY = "@airbnb-Token";
export const ACESS_KEY = "@airbnb-Acess";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const getAcesso = () => localStorage.getItem(ACESS_KEY);
export const login = data => {
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(ACESS_KEY, data.acesso);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ACESS_KEY);
};