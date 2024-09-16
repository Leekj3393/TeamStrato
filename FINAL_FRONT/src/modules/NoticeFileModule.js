import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_NOTITCEIMAGE = "noticeImg/GET_NOTITCEIMAGE";

export const { noticeImg : { getNoticeimage, }} = createActions ({
    [GET_NOTITCEIMAGE] : res => res.data,
})

const noticeFileReducer = handleActions(
    {
        [GET_NOTITCEIMAGE] : (state, {payload}) => ({ noticeImg : payload }),
    }
, initialState)

export default noticeFileReducer;