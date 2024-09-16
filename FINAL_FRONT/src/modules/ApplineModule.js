import { createActions, handleActions } from "redux-actions";

const initialState = [];

const GET_APP_LINES = 'appline/GET_APP_LINES';
const GET_APP_LINE = 'appline/GET_APP_LINE';
const GET_APPLINE_MEMBERS = 'appline/GET_APPLINE_MEMBERS';
const GET_APPROVAL_INFO = 'appline/GET_APPROVAL_INFO';
const POST_APPLINE = 'appline/POST_APPLINE';



export const { appline : {getAppLines, getAppLine, getApplineMembers, getApprovalInfo, postAppline}} = createActions({
    [GET_APP_LINES] : res => res.data,
    [GET_APP_LINE] : res => res.data,
    [GET_APPLINE_MEMBERS] : res => res.data,
    [GET_APPROVAL_INFO] : res => res.data,
    [POST_APPLINE] : res => res,
    
}); 

const applineReducer = handleActions(
    {
        [GET_APP_LINES] : (state, {payload}) => ({appLineDetail: payload}),
        [GET_APP_LINE] : (state, {payload}) => ({appLineInfo: payload}),
        [GET_APPLINE_MEMBERS] : (state, {payload}) => ({accessors: payload}),
        [GET_APPROVAL_INFO] : (state, {payload}) => ({approvalInfo: payload}),
        [POST_APPLINE] : (state, {payload}) => ({regist2: payload}),
    }
    , initialState);

export default applineReducer;