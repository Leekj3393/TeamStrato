import { createActions, handleActions } from 'redux-actions';

// Initial state
// Initial state
const initialState = {
    getMyNotice: '',  // or '', {} 등의 적절한 기본값으로 초기화
    MyNoticeDetail: '',
    getMyNoticeFile:''
  };
  

// Action types
const GET_MY_NOTICE = 'MyPage/GET_MY_NOTICE';
const GET_MY_NOTICE_CODE = 'MyPage/GET_MY_NOTICE_CODE';
const GET_MY_FILE = 'MyPage/GET_MY_FILE';

// Action creators
export const getMyNoticeFile = (noticeData) => {
  console.log('getMyNotice:', noticeData);
  return {
    type: GET_MY_NOTICE,
    payload: noticeData,
  };
};

//겟 마이 노티스
export const getMyNotice = (noticeData) => {
  console.log('getMyNotice:', noticeData);
  return {
    type: GET_MY_NOTICE,
    payload: noticeData,
  };
};

//겟 마이 파일
export function getMyFile(noticeFiles) {
  return {
    type: GET_MY_FILE,
    payload: noticeFiles
  };
}

//겟 마이 노티스 디테일
export const MyNoticeDetail = (noticeCodeData) => {
    console.log('MyNoticeDetail:', noticeCodeData);
    return {
      type: GET_MY_NOTICE_CODE,
      payload: noticeCodeData,
    };
  };

// Reducer
const myPageNoticeReducer = handleActions(
  {

    [GET_MY_FILE]: (state, { payload }) => {
      console.log('리듀서 노티스파일:', payload);
      return {
        ...state,
        getMyNoticeFile: payload,
      };
    },
    


    [GET_MY_NOTICE]: (state, { payload }) => {
      console.log('Reducer getMyNotice:', payload);
      return {
        ...state,
        getMyNotice: payload,
      };
    },

    [GET_MY_NOTICE_CODE]: (state, { payload }) => {
        console.log('Reducer MyNoticeDetail:', payload);
        return {
          ...state,
          MyNoticeDetail: payload.MyNoticeDetail,
        };
      },
      

  },
  initialState
);

export default myPageNoticeReducer;
