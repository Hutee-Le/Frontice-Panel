import constantLocalStorage from "../constants/localstorage";

// related tokens
const saveAccessToken: (accessToken: string) => void = (accessToken) => {
  localStorage.setItem(constantLocalStorage.token.accessToken, accessToken);
};

const removeAccessToken: () => void = () => {
  localStorage.removeItem(constantLocalStorage.token.accessToken);
};

const getAccessToken: () => string | null = () => {
  const accessToken = localStorage.getItem(
    constantLocalStorage.token.accessToken,
  );
  return accessToken;
};

// save refreshToken
const saveRefreshToken: (refreshToken: string) => void = (refreshToken) => {
  localStorage.setItem(constantLocalStorage.token.refreshToken, refreshToken);
};

const getRefreshToken: () => string | null = () => {
  const refreshToken = localStorage.getItem(
    constantLocalStorage.token.refreshToken,
  );
  if (refreshToken) return refreshToken;

  return null;
};

const removeRefreshToken: () => void = () => {
  localStorage.removeItem(constantLocalStorage.token.refreshToken);
};

export {
  getAccessToken,
  getRefreshToken,
  saveRefreshToken,
  saveAccessToken,
  removeRefreshToken,
  removeAccessToken,
};
