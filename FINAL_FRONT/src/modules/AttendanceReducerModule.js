import { handleActions } from "redux-actions";

// 액션 타입
const POST_ABSENTEEISM = 'MyPage/POST_ABSENTEEISM';
const UPDATE_ATTENDANCE_STATUS = 'MyPage/UPDATE_ATTENDANCE_STATUS';
const POST_LAZYTIME = 'MyPage/POST_LAZYTIME';
const POST_MANAGERENDTIME = 'MyPage/POST_MANAGERENDTIME';
const DELETE_DELETETIME = 'MyPage/DELETE_DELETETIME';

// 액션 생성자
export const postAbsenteeism = (AbsenteeismCode) => ({
  type: POST_ABSENTEEISM,
  payload: AbsenteeismCode,
});

//지각
export const postLazyTime = (lazyTimeCode) => ({
  type: POST_LAZYTIME,
  payload: lazyTimeCode,
});

//관리자권한 퇴근
export const managerEndTime = (managerEndTimeCode) => ({
  type: POST_MANAGERENDTIME,
  payload: managerEndTimeCode,
});

//상태값
export const updateAttendanceStatus = (attendanceCode, status) => ({
  type: UPDATE_ATTENDANCE_STATUS,
  payload: { attendanceCode, status },
});

//삭제
export const deleteTime = (deleteTimeCode) => ({
  type: DELETE_DELETETIME,
  payload: deleteTimeCode,
});

// 초기 상태
const initialState = {
  attendances: [],
  AbsenteeismCode: null,
  lazyTimeCode: null,
  managerEndTimeCode: null,
  deleteTimeCode:null
};

// 리듀서
const attendanceReducer = handleActions(
  {
    //삭제
    [DELETE_DELETETIME]: (state, { payload }) => {
      return {
        ...state,
        deleteTimeCode: payload.deleteTimeCode,
      };
    },

    [POST_ABSENTEEISM]: (state, { payload }) => {
      return {
        ...state,
        AbsenteeismCode: payload.AbsenteeismCode,
      };
    },

    [POST_LAZYTIME]: (state, { payload }) => {
      return {
        ...state,
        lazyTimeCode: payload.lazyTimeCode,
      };
    },

    [POST_MANAGERENDTIME]: (state, { payload }) => {
      return {
        ...state,
        managerEndTimeCode: payload.managerEndTimeCode,
      };
    },


    [UPDATE_ATTENDANCE_STATUS]: (state, { payload }) => {
      return {
        ...state,
        attendances: state.attendances.map((attendance) =>
          attendance.attendanceCode === payload.attendanceCode
            ? { ...attendance, status: payload.status }
            : attendance
        ),
      };
    },
  },
  initialState
);

export default attendanceReducer;
