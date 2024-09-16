import { createActions, handleActions } from "redux-actions";

const initialState = {};

const POST_CLASS = "class/POST_CLASS";
const PUT_CLASS = "class/PUT_CLASS";
const GET_CLASS_VIEW_LIST ="class/GET_CLASS_VIEW_LIST";
const GET_CLASS_LIST = "class/GET_CLASS_LIST";
const GET_CLASS_INFO = "class/GET_CLASS_INFO";

export const { class : { postClass, putClass, getClassInfo ,getClassViewList, getClassList }} = createActions({
    [POST_CLASS] : res => res,
    [PUT_CLASS] : res => res,
    [GET_CLASS_VIEW_LIST] : res => res.data,
    [GET_CLASS_LIST] : res => res.data,
    [GET_CLASS_INFO] : res => res.data,
})

const classReducer = handleActions(
    {   
        [POST_CLASS] : (state, {payload}) => ({classRegist : payload}),
        [PUT_CLASS] : (state, {payload}) => ({classUpdate : payload}),
        [GET_CLASS_VIEW_LIST] : (state, {payload}) => ({classViewList : payload}),
        [GET_CLASS_LIST] : (state, {payload}) => ({classList : payload}),
        [GET_CLASS_INFO] : (state, {payload}) => ({classInfo : payload}),
    }
,initialState)

export default classReducer;