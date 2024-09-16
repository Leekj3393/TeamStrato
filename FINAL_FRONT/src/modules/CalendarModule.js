import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = {};

/* 액션 */
const POST_CALENDAR = "calendar/POST_CALENDAR";
const POST_COMPANYCAL = "calendar/POST_COMPANYCAL";
const POST_INSERTCAL = "calendar/POST_INSERTCAL";
const POST_UPDATECAL = "calendar/POST_UPDATECAL";
const POST_DELETECAL = "calendar/POST_DELETECAL";
const GET_CALENDAR = "calendar/GET_CALENDAR";

export const {
  calendar : { postCalendar, postCompanycal, postInsertcal, postUpdatecal, postDeletecal, getCalendar },
} = createActions({
  [POST_CALENDAR]: res => res.data,
  [POST_COMPANYCAL]: res => res.data,
  [POST_INSERTCAL]: res => res,
  [POST_UPDATECAL]: res => res,
  [POST_DELETECAL]: res => res,
  [GET_CALENDAR]: res => res.data,
});

/* 리듀서 */
const calendarReducer = handleActions(
  {
    [POST_CALENDAR]: (state, { payload }) => ({ ...state,calendar : payload }),
    [POST_COMPANYCAL]: (state, { payload }) => ({ ...state,companycal : payload }),
    [POST_INSERTCAL]: (state, { payload }) => ({ ...state,insert : payload }),
    [POST_UPDATECAL]: (state, { payload }) => ({ ...state,update : payload }),
    [POST_DELETECAL]: (state, { payload }) => ({ ...state,deletecal : payload }),
    [GET_CALENDAR]: (state, { payload }) => ({ ...state,allsch : payload }),
  },
  initialState
);

export default calendarReducer;