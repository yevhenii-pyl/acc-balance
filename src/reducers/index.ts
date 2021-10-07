import { combineReducers } from "redux";
import accounts from "./accounts";

const accountsApp = combineReducers({ accounts });

export default accountsApp;
