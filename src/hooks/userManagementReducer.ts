import { User } from "../types/User";

export type UserManagementState = User[];

export type UserManagementAction = {
  type: "ADD_USER" | "REMOVE_USER" | "UPDATE_USER";
  user: User;
};

export default function userManagementReducer(
  prevState: UserManagementState,
  action: UserManagementAction
) {
  let updatedState: UserManagementState;

  switch (action.type) {
    case "ADD_USER": {
      updatedState = [...prevState, action.user];
      break;
    }
    case "REMOVE_USER": {
      updatedState = prevState.filter((user) => user.id !== action.user.id);
      break;
    }
    case "UPDATE_USER": {
      updatedState = prevState.map((user) => {
        console.log(user, action);
        return user.id === action.user.id ? action.user : user;
      });
      break;
    }
    default: {
      updatedState = prevState;
      break;
    }
  }
  console.log(updatedState);
  localStorage.setItem("users", JSON.stringify(updatedState));
  return updatedState;
}
