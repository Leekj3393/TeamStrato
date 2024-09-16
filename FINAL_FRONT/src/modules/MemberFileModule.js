import { createActions, handleActions } from "redux-actions";

const initialState = {};

const GET_MEMBERIMAGE = "memberImg/GET_MEMBERIMAGE";

export const { memberImg : { getMemberimage, }} = createActions ({
    [GET_MEMBERIMAGE] : res => res.data,
})

const memberFileReducer = handleActions(
    {
        [GET_MEMBERIMAGE] : (state, {payload}) => ({ memberImg : payload }),
    }
, initialState)

export default memberFileReducer;