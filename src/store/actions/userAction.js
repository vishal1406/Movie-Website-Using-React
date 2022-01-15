export function setMovies(data) {
  return function (dispatch) {
    dispatch({ type: "SET_MOVIES", payload: data });
  };
}

export function addToFavourite(data) {
  return function (dispatch) {
    dispatch({ type: "ADD_TO_FAVOURITES", payload: data });
  };
}

export function removeFromFavourite(data) {
  return function (dispatch) {
    dispatch({ type: "REMOVE_FROM_FAVOURITES", payload: data });
  };
}
