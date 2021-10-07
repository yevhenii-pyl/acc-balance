import { ADD_ACCOUNT, DELETE_ACCOUNT } from "../actions/actionTypes";

type Account = {
  id: number;
  key: string;
  balance: number;
};

type state = {
  accounts: Account[];
};

const initialState: state = {
  accounts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ACCOUNT: {
      const { account } = action.payload;
      return {
        ...state,
        accounts: [account, ...state.accounts],
      };
    }

    case DELETE_ACCOUNT: {
      const { id } = action.payload;
      return {
        ...state,
        accounts: state.accounts.filter((acc) => acc.id !== id),
      };
    }

    default:
      return state;
  }
}
