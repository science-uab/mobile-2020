import { ADD_REMINDER, DELETE_REMINDER } from "../constants";

export const addReminder = (text, dataLimita) => {
  const action = {
    type: ADD_REMINDER,
    text,
    dataLimita
  };
  console.log("actiune in addRemainder", action);
  return action;
};
export const deleteReminder = id => {
  const action = {
    type: DELETE_REMINDER,
    id
  };
  console.log("deleting in actions", action);
  return action;
};

export const increment = () => ({
  type: "INCREMENT_COUNTER"
});
export const clickme = () => ({
  type: "CLICKME"
});
