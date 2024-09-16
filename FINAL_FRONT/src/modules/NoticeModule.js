import { createActions, handleActions } from "redux-actions";

/* 초기값 */
const initialState = [];

/* 액션 */
const GET_NOTICES = 'notice/GET_NOTICES';
const GET_NOTICE = 'notice/GET_NOTICE';
const GET_NOTICES_DELETED = 'notice/GET_NOTICES_DELETED';
const POST_NOTICE = 'notice/POST_NOTICE';
const PUT_NOTICE = 'notice/PUT_NOTICE';
const PUT_NOTICE_DELETE = 'notice/PUT_NOTICE_DELETE';

export const { notice : {getNotices, getNotice, getNoticesDeleted,  postNotice, putNotice , putNoticeDelete } } = createActions({
 [GET_NOTICES] : res => res.data,
 [GET_NOTICE] : res => res.data,
 [GET_NOTICES_DELETED] : res => res.data,
 [POST_NOTICE] : res => res,
 [PUT_NOTICE] : res => res,
 [PUT_NOTICE_DELETE] : res => res,

});

/* 리듀서 */
const noticeReducer = handleActions (
    {
        [GET_NOTICES] : (state, { payload }) => payload,
        [GET_NOTICE] : (state, { payload }) => ({noticeDetail: payload}),
        [GET_NOTICES_DELETED] : (state, { payload }) => ({noticesDeleted: payload}),
        [POST_NOTICE] : (state, { payload }) => ({ regist : payload }),
        [PUT_NOTICE] : (state, { payload }) => ({ modify : payload }),
        [PUT_NOTICE_DELETE] : (state , {payload}) => ({pDelete : payload}),
    }
, initialState);

export default noticeReducer;