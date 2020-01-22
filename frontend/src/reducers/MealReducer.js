let initialState = {
  meals: [],
  selectedMeal: null,
  cities: [],
  cuisines: []
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
        meal: action.meal
      };
    case 'REMOVE':
      return { ...state, meals: state.meals.filter(meal => meal._id !== action.id) };
    case 'LOAD_CITIES':
      return { ...state, cities: [...action.citiesToReducer] }
    case 'LOAD_CUISINES':
      return { ...state, cuisines: [...action.cuisineTypesToReducer] }
    default:
      return state;
  }
}

/*
const MealReducer = reducerUtility.createReducer(initialValues, {
  LOAD: load,
  GET_BY_ID: getById,
  ADD: add,
  UPDATE: update,
  REMOVE: remove,
});


function load(state, action) {
  return {
    ...state,
    meals: action.meals,
  };
}

function getById(state, action) {
  return {
    ...state,
    meal: action.meal,
  };
}

function add(state, action) {
  return {
    ...state,
    meals: [...state.meals, action.meal],
  };
}

function update(state, action) {
  return {
    ...state,
    meals: state.meals.map(meal => (action.meal._id === meal._id ? action.meal : meal))
  };
}

function remove(state, action) {
  return  { ...state, meals: state.meals.filter(meal => meal._id !== action.id) };
}
*/
