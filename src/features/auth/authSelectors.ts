import { RootState } from "../../store/store";

export const selectIsAuthenticated = (state: RootState) => !!state.auth.token || !!localStorage.getItem("tkn");

export const IsAuthenticated = () => {
  return localStorage.getItem("tkn");
};
