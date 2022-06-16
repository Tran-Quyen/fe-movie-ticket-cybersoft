import * as ActionType from "../constants/ActionType";
let initialState = {
  listMovie: [],
  listMovieUpcoming: [],
  movie: {},
  movieDate: [],
  theaterDateInformation: [],
  loading: false,
  checkedSucessMovie: false,
  room: {},
  userList: [],
  userInformation: {},
  keyWord: [],
  tickets: [],
  theaterInfo: [],
  comment: [],
  loginedstt: "",
  signuped: "",
  theaterSchedule: [],
  errorData: "",
  errorSignup: "",
  success: false
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.GET_LIST_MOVIE: {
      state.listMovie = action.listMovie;
      return { ...state, loading: false, checkedSucessMovie: false };
    }
    case ActionType.GET_USER_LIST: {
      state.userList = action.userList;
      return { ...state, deleted: false };
    }
    case ActionType.GET_DETAIL_MOVIE: {
      state.movie = action.movie;
      return { ...state, loading: false, checkedSucessMovie: true };
    }
    case ActionType.UPDATE_MOVIE: {
      return { ...state };
    }
    case ActionType.ADD_MOVIE: {
      return { ...state };
    }
    case ActionType.GET_USER_INFORMATION: {
      state.userInformation = action.userInformation;
      return { ...state, loading: false };
    }
    case ActionType.GET_LIST_MOVIE_UPCOMING: {
      state.listMovieUpcoming = action.listMovieUpcoming;
      return { ...state };
    }
    case ActionType.GET_DETAIL_DATETIME_MOVIE: {
      state.movieDate = action.movieDate;
      return { ...state };
    }
    case ActionType.GET_INFORMATION_THEATER_DATETIME: {
      state.theaterDateInformation = action.theaterDateInformation;
      return { ...state };
    }
    case ActionType.UPDATESUCCESS:
      state.success = action.success;
      return { ...state };
    case ActionType.GET_COMMENT: {
      state.comment = action.comment;
      return { ...state };
    }
    case ActionType.BOOKING_MOVIE: {
      return { ...state };
    }
    case ActionType.GET_TICKET_DETAIL: {
      state.tickets = action.tickets;
      return { ...state };
    }
    case ActionType.GET_INFO_THEATER: {
      state.theaterInfo = action.theaterInfo;
      return { ...state };
    }
    case ActionType.GET_THEATER_SCHEDULE: {
      state.theaterSchedule = action.theaterSchedule;
      return { ...state };
    }
    case ActionType.UPDATE_USER_INFORMATION: {
      return { ...state, loading: false };
    }
    case ActionType.UPDATE_USER_ADMIN_INFORMATION: {
      return { ...state };
    }
    case ActionType.LOADING: {
      return { ...state, loading: true };
    }
    case ActionType.DELETED: {
      return { ...state, deleted: true };
    }
    case ActionType.LOGIN:
      state.loginedstt = action.loginedstt;
      state.errorData = action.errorData;
      return { ...state };
    case ActionType.LOGOUT:
      return { ...state };
    case ActionType.SIGNUP:
      state.signuped = action.signuped;
      state.errorSignup = action.errorSignup;
      return { ...state };
    case ActionType.GET_ROOM_LIST:
      state.room = action.room;
      return { ...state, loading: false };
    case ActionType.CHECK_AUTHENTICATION:
      return { ...state };
    case ActionType.SEARCH_USER:
      state.keyWord = action.keyWord;
      return { ...state };
    case ActionType.DELETE_USER:
      return { ...state };
    case ActionType.DELETE_MOVIE:
      return { ...state };
    case ActionType.UPLOAD_MOVIE_IMAGE_CHECKED:
      return { ...state, checkedSucessMovie: true };
    default:
      return { ...state };
  }
};
export default movieReducer;
