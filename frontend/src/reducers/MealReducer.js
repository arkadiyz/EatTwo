let initialState = {
  meals: [],
  selectedMeal: null,
};

export default function MealReducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD':
      return {
        ...state,
        meals: action.meals,
      };

    case 'GET_BY_ID':
      return {
        ...state,
        meal: action.meal,
        selectedMeal: action.meal,
      };

    case 'ADD':
      return {
        ...state,
        meals: [...state.meals, action.meal],
        selectedMeal: action.meal,
      };
    case 'UPDATE':
      return {
        ...state,
        meals: state.meals.map(meal => (action.meal._id === meal._id ? action.meal : meal)),
        meal: action.meal,
      };
    case 'REMOVE':
      return { ...state, meals: state.meals.filter(meal => meal._id !== action.id) };
    default:
      return state;
  }
}
