import { ADD_ACCOUNT, DELETE_ACCOUNT } from "./actionTypes";

export const addAccount = (account) => ({
  type: ADD_ACCOUNT,
  payload: account,
});

export const deleteAccount = (id) => ({
  type: DELETE_ACCOUNT,
  payload: id,
});
