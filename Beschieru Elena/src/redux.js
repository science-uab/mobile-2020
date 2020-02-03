const STARE_INITIALA = {
  counter: 0
};

const my_reducer = (state = STARE_INITIALA, action) => {
  switch (action.type) {
    case "INCREMENT_COUNTER":
      return {
        ...state,
        counter: 2
      };
    default:
      return state;
  }
};

export default my_reducer;
